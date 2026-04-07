/**
 * extract-assets.ts
 * Downloads images and logos from estaleirovillage.com into public/assets/
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import { load } from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.estaleirovillage.com';
const PAGES = [
  '/',
  '/a-pousada',
  '/a-historia',
  '/acomoda%C3%A7%C3%B5es',
  '/eventos',
];

const OUT_IMAGES = path.resolve(__dirname, '../public/assets/images');
const OUT_LOGOS = path.resolve(__dirname, '../public/assets/logos');
const MANIFEST_PATH = path.resolve(__dirname, '../public/assets/manifest.json');
const MIN_SIZE_BYTES = 10 * 1024; // 10 KB

interface ManifestEntry {
  url: string;
  localPath: string;
  page: string;
  alt: string;
}

const manifest: ManifestEntry[] = [];
const seenUrls = new Set<string>();

function slugify(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 80);
}

function getExtension(url: string): string {
  const clean = url.split('?')[0].split('#')[0];
  const ext = path.extname(clean).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'].includes(ext)) return ext;
  return '.jpg';
}

function isLogo(url: string): boolean {
  const lower = url.toLowerCase();
  return lower.includes('logo') || lower.includes('svg') || lower.endsWith('.svg');
}

function downloadFile(url: string, destPath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    let size = 0;

    const req = proto.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AssetExtractor/1.0)',
        'Accept': 'image/*,*/*',
      },
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        downloadFile(res.headers.location!, destPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.on('data', (chunk: Buffer) => { size += chunk.length; });
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(size);
      });
    });

    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });

    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error(`Timeout: ${url}`));
    });
  });
}

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    let body = '';
    const req = proto.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      },
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchPage(res.headers.location!).then(resolve).catch(reject);
        return;
      }
      res.setEncoding('utf8');
      res.on('data', (chunk: string) => { body += chunk; });
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error(`Timeout fetching ${url}`)); });
  });
}

function resolveUrl(src: string, base: string): string | null {
  if (!src || src.startsWith('data:')) return null;
  if (src.startsWith('//')) return 'https:' + src;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return BASE_URL + src;
  try {
    return new URL(src, base).href;
  } catch {
    return null;
  }
}

function extractUrlsFromSrcset(srcset: string, base: string): string[] {
  return srcset
    .split(',')
    .map(s => s.trim().split(/\s+/)[0])
    .map(s => resolveUrl(s, base))
    .filter((s): s is string => s !== null);
}

async function processPage(pagePath: string): Promise<void> {
  const pageUrl = BASE_URL + pagePath;
  console.log(`\nFetching: ${pageUrl}`);

  let html: string;
  try {
    html = await fetchPage(pageUrl);
  } catch (err) {
    console.warn(`  ⚠ Could not fetch page: ${err}`);
    return;
  }

  const $ = load(html);
  const urls: Array<{ url: string; alt: string }> = [];

  // <img src / srcset>
  $('img').each((_, el) => {
    const alt = $(el).attr('alt') || '';
    const src = $(el).attr('src');
    const srcset = $(el).attr('srcset') || $(el).attr('data-srcset') || '';
    const dataSrc = $(el).attr('data-src');

    if (src) {
      const resolved = resolveUrl(src, pageUrl);
      if (resolved) urls.push({ url: resolved, alt });
    }
    if (dataSrc) {
      const resolved = resolveUrl(dataSrc, pageUrl);
      if (resolved) urls.push({ url: resolved, alt });
    }
    if (srcset) {
      for (const u of extractUrlsFromSrcset(srcset, pageUrl)) {
        urls.push({ url: u, alt });
      }
    }
  });

  // <source srcset>
  $('source').each((_, el) => {
    const srcset = $(el).attr('srcset') || '';
    if (srcset) {
      for (const u of extractUrlsFromSrcset(srcset, pageUrl)) {
        urls.push({ url: u, alt: '' });
      }
    }
  });

  // background-image in style attributes
  $('[style]').each((_, el) => {
    const style = $(el).attr('style') || '';
    const matches = style.match(/url\(['"]?([^'")\s]+)['"]?\)/g) || [];
    for (const match of matches) {
      const inner = match.replace(/url\(['"]?/, '').replace(/['"]?\)/, '');
      const resolved = resolveUrl(inner, pageUrl);
      if (resolved) urls.push({ url: resolved, alt: '' });
    }
  });

  console.log(`  Found ${urls.length} image URLs`);

  for (const { url, alt } of urls) {
    if (seenUrls.has(url)) continue;
    if (url.startsWith('data:')) continue;
    seenUrls.add(url);

    const ext = getExtension(url);
    const isLogoFile = isLogo(url);
    const dir = isLogoFile ? OUT_LOGOS : OUT_IMAGES;
    const slug = slugify(path.basename(url.split('?')[0]));
    const filename = slug.endsWith(ext) ? slug : slug + ext;
    const destPath = path.join(dir, filename);

    if (fs.existsSync(destPath)) {
      console.log(`  ✓ Already exists: ${filename}`);
      manifest.push({ url, localPath: destPath.replace(path.resolve(__dirname, '..'), ''), page: pagePath, alt });
      continue;
    }

    try {
      const size = await downloadFile(url, destPath);
      if (size < MIN_SIZE_BYTES) {
        fs.unlinkSync(destPath);
        console.log(`  ✗ Too small (${size}B): ${filename}`);
        continue;
      }
      const localPath = destPath.replace(path.resolve(__dirname, '..'), '').replace(/\\/g, '/');
      manifest.push({ url, localPath, page: pagePath, alt });
      console.log(`  ✓ ${isLogoFile ? '[LOGO]' : '[IMG]'} ${filename} (${Math.round(size / 1024)}KB)`);
    } catch (err) {
      console.warn(`  ✗ Failed: ${filename} — ${err}`);
    }
  }
}

async function main() {
  fs.mkdirSync(OUT_IMAGES, { recursive: true });
  fs.mkdirSync(OUT_LOGOS, { recursive: true });

  for (const page of PAGES) {
    await processPage(page);
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\n✅ Done. ${manifest.length} assets saved.`);
  console.log(`   Manifest: ${MANIFEST_PATH}`);
}

main().catch(console.error);
