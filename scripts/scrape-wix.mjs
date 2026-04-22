#!/usr/bin/env node
/**
 * Scrapes estaleirovillage.com (a Wix-hosted site) for the production images
 * currently used by the client. Each room has a dedicated page at /<slug>, and
 * the homepage links to thematic pages (/a-pousada, /atividades, /eventos).
 *
 * The plan originally referenced `.com.br`, but DNS for that TLD no longer
 * resolves — the live site is at `estaleirovillage.com` (without `.br`).
 *
 * Strategy:
 *  1. For each known slug (room or section), GET https://www.estaleirovillage.com/<slug>
 *  2. Extract unique `static.wixstatic.com/media/<hash>~mv2.{jpg,png}` URLs
 *  3. Filter to account hash `47aad0_*` (the pousada's account; 035244 is shared icon set)
 *  4. Canonicalize to the no-transform URL (= full original resolution)
 *  5. Pair each URL with its source page so Phase 2 gets automatic context
 *
 * Output: scripts/wix-index.json
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://www.estaleirovillage.com';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const DELAY_MS = 800;
const OUT_FILE = path.join('scripts', 'wix-index.json');

// Room slugs must match src/data/accommodations.ts
const ROOM_SLUGS = [
  'chale-b',
  'chale-c',
  'duplex-c',
  'flat',
  'loft',
  'sobrado-frente-mar',
  'studio',
  'studio-superior',
  'suite-frente-mar',
  'suite-jardim',
  'torre-oceano',
];

// Thematic pages exposed by the Wix nav
const SECTION_SLUGS = ['', 'a-pousada', 'atividades', 'eventos', 'a-historia', 'servicos'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'pt-BR,pt;q=0.9' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

/**
 * Wix URL patterns we want:
 *   https://static.wixstatic.com/media/47aad0_<hash>~mv2.jpg
 *   https://static.wixstatic.com/media/47aad0_<hash>%7Emv2.jpg  (url-encoded ~)
 *   …/v1/fill/w_1024,h_684,al_c,q_90/<filename>.jpg
 *
 * We dedupe by the `<account>_<hash>` fingerprint so we don't count the same
 * image multiple times at different resolutions.
 */
function extractWixImages(html, sourceSlug) {
  const results = new Map(); // fingerprint → image object
  // Match both ~ and %7E (urlencoded ~)
  const re =
    /https?:\/\/static\.wixstatic\.com\/media\/([a-z0-9]+)_([a-z0-9]+)(?:~|%7E)mv2\.(jpg|jpeg|png|webp)(?:\/v1\/([a-z]+)\/([^"' )>]+))?/gi;
  let m;
  while ((m = re.exec(html))) {
    const account = m[1];
    const hash = m[2];
    const ext = m[3].toLowerCase();
    const transform = m[4] || null;
    const transformArgs = m[5] || null;
    // Skip the shared icon bundle
    if (account === '035244') continue;
    // Skip obvious sprite/icon sizes if we can see width in the transform
    if (transformArgs) {
      const wMatch = transformArgs.match(/w_(\d+)/);
      if (wMatch && parseInt(wMatch[1], 10) < 200) continue;
    }
    const fingerprint = `${account}_${hash}`;
    const canonical = `https://static.wixstatic.com/media/${account}_${hash}~mv2.${ext}`;
    const existing = results.get(fingerprint);
    if (!existing) {
      results.set(fingerprint, {
        fingerprint,
        account,
        hash,
        ext,
        url: canonical,
        filename: `${account}_${hash}.${ext}`,
        sources: [sourceSlug],
      });
    } else if (!existing.sources.includes(sourceSlug)) {
      existing.sources.push(sourceSlug);
    }
  }
  return [...results.values()];
}

/** Page-level title from the Wix page HTML (fallback to slug). */
function extractPageTitle(html) {
  const t = html.match(/<title>([^<]+)<\/title>/i);
  return t ? t[1].trim() : '';
}

async function main() {
  const pages = [];
  const imageMap = new Map(); // fingerprint → image (merged across pages)

  const allSlugs = [...SECTION_SLUGS, ...ROOM_SLUGS];
  for (const slug of allSlugs) {
    const url = `${BASE}/${slug}`;
    const label = slug || '(home)';
    try {
      await sleep(DELAY_MS);
      console.log(`[wix] fetching ${label}...`);
      const html = await fetchHtml(url);
      const title = extractPageTitle(html);
      const pageImages = extractWixImages(html, slug || 'home');
      pages.push({
        slug: slug || 'home',
        url,
        title,
        image_count: pageImages.length,
        kind: ROOM_SLUGS.includes(slug) ? 'room' : 'section',
      });
      for (const img of pageImages) {
        const existing = imageMap.get(img.fingerprint);
        if (!existing) {
          imageMap.set(img.fingerprint, img);
        } else {
          for (const src of img.sources) {
            if (!existing.sources.includes(src)) existing.sources.push(src);
          }
        }
      }
      console.log(`  → ${pageImages.length} unique wix images`);
    } catch (e) {
      console.warn(`  ! ${label} failed: ${e.message}`);
      pages.push({ slug: slug || 'home', url, error: e.message });
    }
  }

  const images = [...imageMap.values()];
  const out = {
    source: 'wix',
    base: BASE,
    scraped_at: new Date().toISOString(),
    pages,
    images,
    total_images: images.length,
  };
  await fs.writeFile(OUT_FILE, JSON.stringify(out, null, 2));

  // Quick summary per page
  console.log(`\n[wix] ✓ wrote ${images.length} unique images to ${OUT_FILE}`);
  console.log('[wix] page summary:');
  for (const p of pages) {
    const kind = p.kind ? `(${p.kind})` : '';
    console.log(`  - ${p.slug.padEnd(22)} ${kind.padEnd(10)} images=${p.image_count ?? 'ERR'}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
