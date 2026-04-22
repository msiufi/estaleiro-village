#!/usr/bin/env node
/**
 * Classifies images from flickr-index.json + wix-index.json into buckets:
 *   - room:<id> for each of the 11 accommodation ids
 *   - theme:piscina-lazer, theme:gastronomia, theme:praia,
 *     theme:exterior-jardim, theme:eventos
 *
 * Signals:
 *   Flickr → album title is the primary signal (the user's albums map directly
 *            onto the site's accommodation types). Photo title/description/tags
 *            act as tiebreakers.
 *   Wix    → source page slug is the primary signal (each room has its own
 *            page, and thematic pages group images by topic).
 *
 * A photo can belong to multiple buckets (e.g. a pool photo in the generic
 * "Pousada" album classifies into theme:exterior-jardim + theme:piscina-lazer
 * if its title mentions piscina).
 *
 * Output: scripts/selection.json
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOM_IDS = [
  'suite-jardim',
  'studio',
  'studio-superior',
  'flat',
  'loft',
  'suite-frente-mar',
  'torre-oceano',
  'chale-b',
  'chale-c',
  'duplex-c',
  'sobrado-frente-mar',
];

const THEMES = ['piscina-lazer', 'gastronomia', 'praia', 'exterior-jardim', 'eventos'];

/**
 * Map a Flickr album title → list of buckets it primarily feeds.
 * Order matters — first match wins in some downstream tooling, but here we
 * simply assign all hits.
 */
const FLICKR_ALBUM_RULES = [
  { match: /flats?\b.*dormitório/i, buckets: ['room:flat'] },
  { match: /duplex\s*tipo\s*c/i, buckets: ['room:duplex-c'] },
  { match: /duplex\s*frente.*mar/i, buckets: ['room:sobrado-frente-mar'] }, // "Duplex Frente/mar" → the sobrado with 3 dorms facing sea
  { match: /suites?\s*frente\s*mar/i, buckets: ['room:suite-frente-mar'] },
  { match: /suíte\s*frente\s*mar.*hidromassagem/i, buckets: ['room:suite-frente-mar'] },
  { match: /torre\s*oceano/i, buckets: ['room:torre-oceano'] },
  { match: /loft/i, buckets: ['room:loft'] },
  { match: /suites?\s*vista\s*jardim/i, buckets: ['room:suite-jardim'] },
  { match: /studio\s*superior/i, buckets: ['room:studio-superior'] },
  { match: /studio\s*c.*mini.*cozinha/i, buckets: ['room:studio'] },
  { match: /chalés?\s*tipo\s*b/i, buckets: ['room:chale-b'] },
  { match: /chalé?\s*tipo\s*c/i, buckets: ['room:chale-c'] },
  { match: /café\s*da\s*manhã/i, buckets: ['theme:gastronomia'] },
  { match: /praia/i, buckets: ['theme:praia'] },
  { match: /natureza/i, buckets: ['theme:exterior-jardim'] },
  // Generic album — assign to exterior-jardim; per-photo rules below may also tag piscina-lazer
  { match: /pousada\s*estaleiro\s*village/i, buckets: ['theme:exterior-jardim'] },
  { match: /interiores/i, buckets: ['theme:exterior-jardim'] },
  { match: /^eventos?\s*$/i, buckets: ['theme:eventos'] },
  { match: /casamentos?/i, buckets: ['theme:eventos'] },
  // "Interiores" album mixes pool, café, common areas → leave it to per-photo rules
  // (no direct bucket), which will pick up piscina/café/exterior mentions.
  // "Expedições / excursões" and "Pet Friendly" → no clean bucket, ignore.
  // "Cabana da mata" / "Casa da mata" → rooms not on the site, ignore.
];

/**
 * Per-photo content-level rules — applied ONLY to photo title/description,
 * NOT album title (album is already handled above). Purpose: catch photos
 * that belong to a theme on top of their room bucket (e.g. a pool photo
 * inside the generic "Pousada" album).
 *
 * Keep patterns narrow: words like `mar`, `vista`, `jardim`, `cozinha` appear
 * in room names too and would cause cross-bucket leakage if we matched them.
 */
const PHOTO_CONTENT_RULES = [
  // Note: `hidromassagem` excluded — it matches in-unit bathtubs ("banheira hidromassagem"),
  // not the pool/spa area. `Piscinas Naturais` (beach rock pools) filtered separately below.
  { re: /\bpiscina\b|\bpool\b|jacuzzi|\bdeck\b|v[oó]lei|sauna/i, bucket: 'theme:piscina-lazer' },
  { re: /caf[eé]\s*da\s*manh|restaurante|gastronom|almo[çc]o|mesa\s*posta/i, bucket: 'theme:gastronomia' },
  { re: /\bpraia\b|\bbeach\b/i, bucket: 'theme:praia' },
  { re: /fachada|recep[çc][aã]o|acesso\s*[àa]|mata|natureza|trilha|flora|fauna|p[aá]ssar/i, bucket: 'theme:exterior-jardim' },
  { re: /\bevento\b|casamento|festa|cerim[oô]nia/i, bucket: 'theme:eventos' },
];

/**
 * Exclusion patterns: photos whose title/description contains these are NOT
 * counted for the bucket even if a broader rule matched.
 */
const EXCLUSIONS = [
  { bucket: 'theme:piscina-lazer', re: /piscinas\s*naturais/i }, // those are tide pools on the beach
];

/** Wix source slug → buckets. */
const WIX_SOURCE_RULES = {
  'chale-b': ['room:chale-b'],
  'chale-c': ['room:chale-c'],
  'duplex-c': ['room:duplex-c'],
  flat: ['room:flat'],
  loft: ['room:loft'],
  'sobrado-frente-mar': ['room:sobrado-frente-mar'],
  studio: ['room:studio'],
  'studio-superior': ['room:studio-superior'],
  'suite-frente-mar': ['room:suite-frente-mar'],
  'suite-jardim': ['room:suite-jardim'],
  'torre-oceano': ['room:torre-oceano'],
  eventos: ['theme:eventos'],
  atividades: ['theme:piscina-lazer', 'theme:exterior-jardim'],
  'a-pousada': ['theme:exterior-jardim', 'theme:piscina-lazer'],
  'a-historia': ['theme:exterior-jardim'],
  servicos: [],
  home: ['theme:exterior-jardim'],
};

function classifyFlickr(photo) {
  const buckets = new Set();
  const albumTitle = photo.album_title || '';
  const albumDesc = photo.album_description || '';
  const title = photo.title || '';
  const desc = photo.description || '';
  const tags = Array.isArray(photo.tags) ? photo.tags.join(' ') : '';

  for (const rule of FLICKR_ALBUM_RULES) {
    if (rule.match.test(albumTitle) || rule.match.test(albumDesc)) {
      for (const b of rule.buckets) buckets.add(b);
    }
  }
  // Content rules: only fire when the photo isn't already locked to a room by
  // its album (room-specific albums already know what the photo is of). This
  // lets generic albums like "Pousada Estaleiro Village" still contribute
  // theme-tagged photos (e.g. "Piscina à noite").
  const inRoomAlbum = [...buckets].some((b) => b.startsWith('room:'));
  if (!inRoomAlbum) {
    const photoHay = `${title} ${desc} ${tags}`;
    for (const rule of PHOTO_CONTENT_RULES) {
      if (rule.re.test(photoHay)) buckets.add(rule.bucket);
    }
    for (const ex of EXCLUSIONS) {
      if (ex.re.test(photoHay)) buckets.delete(ex.bucket);
    }
  }
  return [...buckets];
}

/**
 * Wix images appearing on many pages (>= 5) are almost always site-wide banners,
 * headers, or shared hero strips — not content photos for any specific page.
 * Skip assigning them to room buckets; only let them contribute to thematic
 * buckets when they're on a thematic page.
 */
const WIX_SITEWIDE_THRESHOLD = 5;

function classifyWix(image) {
  const buckets = new Set();
  const breadth = image.sources.length;
  const isSitewide = breadth >= WIX_SITEWIDE_THRESHOLD;
  // PNG site-wide images are almost always logos/icons/UI chrome — not content.
  // JPG site-wide images may be legit hero photos, so we keep their theme
  // assignment but still skip their room assignment.
  const isPngSitewide = isSitewide && (image.ext === 'png' || image.ext === 'webp');
  if (isPngSitewide) return [];
  for (const src of image.sources) {
    const rules = WIX_SOURCE_RULES[src] || [];
    for (const b of rules) {
      if (isSitewide && b.startsWith('room:')) continue;
      buckets.add(b);
    }
  }
  return [...buckets];
}

async function main() {
  const flickr = JSON.parse(await fs.readFile('scripts/flickr-index.json', 'utf8'));
  const wix = JSON.parse(await fs.readFile('scripts/wix-index.json', 'utf8'));

  const bucketMap = new Map(); // bucket → [entry,…]
  const addTo = (bucket, entry) => {
    if (!bucketMap.has(bucket)) bucketMap.set(bucket, []);
    bucketMap.get(bucket).push(entry);
  };

  const unassigned = [];

  for (const p of flickr.photos) {
    const buckets = classifyFlickr(p);
    const entry = {
      source: 'flickr',
      id: p.id,
      url: p.url_k || p.url_b,
      url_page: p.url_page,
      title: p.title,
      description: p.description,
      tags: p.tags,
      album_title: p.album_title,
      buckets,
    };
    if (buckets.length === 0) {
      unassigned.push(entry);
      continue;
    }
    for (const b of buckets) addTo(b, entry);
  }

  for (const img of wix.images) {
    const buckets = classifyWix(img);
    const entry = {
      source: 'wix',
      fingerprint: img.fingerprint,
      url: img.url,
      sources: img.sources,
      buckets,
    };
    if (buckets.length === 0) {
      unassigned.push(entry);
      continue;
    }
    for (const b of buckets) addTo(b, entry);
  }

  // Build final selection with reasonable caps per bucket
  const PER_ROOM_CAP = 12;
  const PER_THEME_CAP = 20;

  const selection = {
    generated_at: new Date().toISOString(),
    rooms: {},
    themes: {},
    unassigned_count: unassigned.length,
    totals: {
      flickr: flickr.total_photos,
      wix: wix.total_images,
    },
  };

  for (const roomId of ROOM_IDS) {
    const key = `room:${roomId}`;
    const items = bucketMap.get(key) || [];
    // Prefer wix (site-used) + flickr with exclusive album match
    const sorted = [...items].sort((a, b) => {
      const wa = a.source === 'wix' ? 0 : 1;
      const wb = b.source === 'wix' ? 0 : 1;
      if (wa !== wb) return wa - wb;
      // within flickr, prefer single-bucket (more specific) matches
      const sa = a.buckets?.length ?? 1;
      const sb = b.buckets?.length ?? 1;
      return sa - sb;
    });
    selection.rooms[roomId] = {
      count: items.length,
      picked: sorted.slice(0, PER_ROOM_CAP),
      overflow_count: Math.max(0, items.length - PER_ROOM_CAP),
    };
  }

  for (const theme of THEMES) {
    const key = `theme:${theme}`;
    const items = bucketMap.get(key) || [];
    const sorted = [...items].sort((a, b) => {
      const wa = a.source === 'wix' ? 0 : 1;
      const wb = b.source === 'wix' ? 0 : 1;
      return wa - wb;
    });
    selection.themes[theme] = {
      count: items.length,
      picked: sorted.slice(0, PER_THEME_CAP),
      overflow_count: Math.max(0, items.length - PER_THEME_CAP),
    };
  }

  selection.unassigned = unassigned.slice(0, 40); // keep first 40 for review

  await fs.writeFile(path.join('scripts', 'selection.json'), JSON.stringify(selection, null, 2));

  // Report
  console.log('\n=== SELECTION SUMMARY ===');
  console.log('\nRooms:');
  for (const roomId of ROOM_IDS) {
    const r = selection.rooms[roomId];
    const wixCount = r.picked.filter((e) => e.source === 'wix').length;
    const flickrCount = r.picked.filter((e) => e.source === 'flickr').length;
    console.log(
      `  ${roomId.padEnd(22)} picked=${String(r.picked.length).padStart(2)}/${String(
        r.count,
      ).padStart(2)}  (wix=${wixCount}, flickr=${flickrCount})`,
    );
  }
  console.log('\nThemes:');
  for (const theme of THEMES) {
    const t = selection.themes[theme];
    const wixCount = t.picked.filter((e) => e.source === 'wix').length;
    const flickrCount = t.picked.filter((e) => e.source === 'flickr').length;
    console.log(
      `  ${theme.padEnd(22)} picked=${String(t.picked.length).padStart(2)}/${String(
        t.count,
      ).padStart(2)}  (wix=${wixCount}, flickr=${flickrCount})`,
    );
  }
  console.log(`\nUnassigned: ${unassigned.length}`);
  console.log(`\n✓ wrote scripts/selection.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
