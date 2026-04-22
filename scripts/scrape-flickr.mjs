#!/usr/bin/env node
/**
 * Scrapes Flickr for the estaleirovillage user.
 *
 * Flickr embeds photo/album metadata in a `<script class='modelExport'>` block
 * with the pattern `modelExport: { ... },`. We slice that object out, JSON.parse
 * it, and walk the `main.sets-models[0].data...` tree.
 *
 * Strategy (per plan, ~300 varied photos):
 *  1. GET /photos/estaleirovillage/albums  → album list
 *  2. Pick albums topically relevant (accommodation / pool / gastronomy / beach / etc.)
 *  3. For each picked album, GET its first page and harvest photos with title+url
 *  4. Write scripts/flickr-index.json
 *
 * Stays within rate limits: 1s delay between requests, real User-Agent.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const USER = 'estaleirovillage';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const DELAY_MS = 1000;
const TARGET_TOTAL = 420;
const MAX_PER_ALBUM = 30;
const OUT_FILE = path.join('scripts', 'flickr-index.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

/**
 * Extract the JSON object assigned to `modelExport:` inside a <script class='modelExport'>.
 * Returns the parsed object or null.
 */
function extractModelExport(html) {
  const marker = 'modelExport: ';
  const start = html.indexOf(marker);
  if (start === -1) return null;
  let i = start + marker.length;
  if (html[i] !== '{') return null;
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) {
        esc = false;
      } else if (c === '\\') {
        esc = true;
      } else if (c === '"') {
        inStr = false;
      }
      continue;
    }
    if (c === '"') {
      inStr = true;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        const jsonStr = html.slice(start + marker.length, i + 1);
        try {
          return JSON.parse(jsonStr);
        } catch (e) {
          console.error('JSON.parse failed:', e.message);
          return null;
        }
      }
    }
  }
  return null;
}

function getAlbumsFromModel(model) {
  const setsModels = model?.main?.['sets-models'];
  if (!setsModels) return [];
  const albumsList = setsModels[0]?.data?.albumsList?.data?._data;
  if (!Array.isArray(albumsList)) return [];
  const albums = [];
  for (const entry of albumsList) {
    const d = entry?.data;
    if (!d || !d.id) continue;
    albums.push({
      id: String(d.id),
      title: d.title?._content ?? d.title ?? '',
      description: d.description?._content ?? d.description ?? '',
      count_photos: d.count_photos ?? d.photos ?? 0,
      date_create: d.date_create,
      date_update: d.date_update,
      url: `https://www.flickr.com/photos/${USER}/albums/${d.id}`,
    });
  }
  return albums;
}

/**
 * Derive photo id / server / secret from a Flickr static URL like
 * //live.staticflickr.com/65535/54613040117_c2d90534cd_s.jpg
 */
function parseStaticUrl(url) {
  if (!url) return null;
  const m = url.match(/live\.staticflickr\.com\/(\d+)\/(\d+)_([a-z0-9]+)_[a-z]\.jpg/i);
  if (!m) return null;
  return { server: m[1], id: m[2], secret: m[3] };
}

function getPhotosFromAlbumModel(model) {
  // Album page: main['set-models'][0].data.photoPageList.data._data[i].data
  const setModels = model?.main?.['set-models'];
  const list = setModels?.[0]?.data?.photoPageList?.data?._data;
  if (!Array.isArray(list)) return [];
  const out = [];
  for (const entry of list) {
    const d = entry?.data;
    if (!d) continue;
    const sizes = d.sizes?.data ?? {};
    // Prefer a mid-size URL we can reliably convert; fallback across keys.
    const pickUrl = (key) => sizes[key]?.data?.url ?? sizes[key]?.data?.displayUrl ?? null;
    const sampleUrl = pickUrl('n') ?? pickUrl('s') ?? pickUrl('m') ?? pickUrl('sq') ?? null;
    const parsed = parseStaticUrl(sampleUrl);
    if (!parsed) continue;
    const { server, id, secret } = parsed;
    const title = d.title?._content ?? d.title ?? '';
    const description = d.description?._content ?? d.description ?? '';
    // Tags aren't in album listing — will rely on album context.
    const tags = Array.isArray(d.tags)
      ? d.tags.map((t) => (typeof t === 'string' ? t : t._content ?? t.raw ?? '')).filter(Boolean)
      : [];
    const staticBase = `https://live.staticflickr.com/${server}/${id}_${secret}`;
    out.push({
      id,
      server,
      secret,
      title,
      description,
      tags,
      url_page: `https://www.flickr.com/photos/${USER}/${id}`,
      url_b: `${staticBase}_b.jpg`, // 1024
      url_k: `${staticBase}_k.jpg`, // 2048
      url_c: `${staticBase}_c.jpg`, // 800
    });
  }
  return out;
}

/** Heuristic relevance score: higher = more relevant for our plan. */
function albumRelevance(album) {
  const t = `${album.title} ${album.description}`.toLowerCase();
  const hits = [
    'piscina',
    'pool',
    'jacuzzi',
    'chalé',
    'chale',
    'sobrado',
    'duplex',
    'loft',
    'flat',
    'studio',
    'suíte',
    'suite',
    'café',
    'manhã',
    'gastronom',
    'restaurante',
    'praia',
    'beach',
    'estaleiro',
    'jardim',
    'mata',
    'natureza',
    'exterior',
    'fachada',
    'pousada',
    'apartament',
    'hospedagem',
    'quarto',
    'habitaci',
    'bangalô',
    'bangalo',
    'interior',
    'evento',
    'casamento',
    'atividade',
    'passeio',
    'excurs',
    'pet',
  ];
  let score = 0;
  for (const w of hits) if (t.includes(w)) score += 1;
  return score;
}

async function main() {
  console.log(`[flickr] fetching albums list for ${USER}...`);
  const albumsHtml = await fetchHtml(`https://www.flickr.com/photos/${USER}/albums`);
  const albumsModel = extractModelExport(albumsHtml);
  if (!albumsModel) {
    throw new Error('Could not extract modelExport from albums page');
  }
  const albums = getAlbumsFromModel(albumsModel);
  console.log(`[flickr] found ${albums.length} albums`);
  if (albums.length === 0) {
    // Save the model for debugging and bail
    await fs.writeFile('scripts/.tmp/albums-model.json', JSON.stringify(albumsModel, null, 2));
    throw new Error('No albums parsed — dumped model to scripts/.tmp/albums-model.json');
  }

  // Rank albums: relevance desc, then count_photos desc
  const ranked = [...albums].sort((a, b) => {
    const ra = albumRelevance(a);
    const rb = albumRelevance(b);
    if (rb !== ra) return rb - ra;
    return (b.count_photos || 0) - (a.count_photos || 0);
  });

  // Pick all relevant albums (score >= 1) plus top-N largest as fallback for variety
  const relevant = ranked.filter((a) => albumRelevance(a) >= 1);
  const fallback = ranked.filter((a) => albumRelevance(a) < 1).slice(0, 6);
  const picked = [...relevant, ...fallback];
  console.log(
    `[flickr] picked ${picked.length} albums (relevant=${relevant.length}, fallback=${fallback.length})`,
  );

  const allPhotos = [];
  const seen = new Set();
  const albumSummaries = [];

  for (const album of picked) {
    if (allPhotos.length >= TARGET_TOTAL) break;
    await sleep(DELAY_MS);
    console.log(
      `[flickr] fetching album ${album.id} "${album.title}" (${album.count_photos} photos)...`,
    );
    let albumHtml;
    try {
      albumHtml = await fetchHtml(album.url);
    } catch (e) {
      console.warn(`  ! fetch failed: ${e.message}`);
      continue;
    }
    const albumModel = extractModelExport(albumHtml);
    if (!albumModel) {
      console.warn('  ! no modelExport');
      continue;
    }
    const photos = getPhotosFromAlbumModel(albumModel);
    console.log(`  → ${photos.length} photos parsed`);
    let taken = 0;
    for (const p of photos) {
      if (taken >= MAX_PER_ALBUM) break;
      if (allPhotos.length >= TARGET_TOTAL) break;
      if (!p.url_b) continue; // skip photos without a usable static URL
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      allPhotos.push({
        ...p,
        album_id: album.id,
        album_title: album.title,
        album_description: album.description,
      });
      taken++;
    }
    albumSummaries.push({
      id: album.id,
      title: album.title,
      description: album.description,
      count_photos: album.count_photos,
      taken,
    });
  }

  const out = {
    source: 'flickr',
    user: USER,
    scraped_at: new Date().toISOString(),
    albums: albumSummaries,
    photos: allPhotos,
    total_photos: allPhotos.length,
  };
  await fs.writeFile(OUT_FILE, JSON.stringify(out, null, 2));
  console.log(`\n[flickr] ✓ wrote ${allPhotos.length} photos to ${OUT_FILE}`);
  console.log(`[flickr] album summary:`);
  for (const a of albumSummaries) {
    console.log(`  - ${a.title.padEnd(40)} taken=${a.taken}/${a.count_photos}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
