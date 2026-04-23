/**
 * download-all-images.mjs
 *
 * Fase 1+2+3 combinadas:
 *   1. Scrapea álbumes de Flickr por categoría (raw HTML, sin API key)
 *   2. Descarga imágenes _b.jpg (1024px) a carpetas organizadas
 *   3. Usa Omnibees como fallback para acomodaciones sin fotos suficientes
 *   4. Guarda selection.json como registro de lo descargado
 *
 * Uso: cd estaleiro-village && node scripts/download-all-images.mjs
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_IMAGES = path.resolve(__dirname, '../public/assets/images');
const SCRIPTS_DIR = __dirname;

const DELAY_MS = 1500; // entre requests a Flickr para no ser bloqueados
const MAX_PER_BUCKET = 6; // máximo fotos por bucket
const MIN_SIZE_BYTES = 30 * 1024; // ignorar imágenes <30KB (thumbnails, placeholders)

// ─── Mapeo álbumes Flickr por bucket ─────────────────────────────────────────
// album IDs de https://www.flickr.com/photos/estaleirovillage/albums
const FLICKR_USER = 'estaleirovillage';
const FLICKR_ALBUMS = {
  'acomodacoes/suite-jardim':       ['72157631008784408'],
  'acomodacoes/studio':             ['72157636848565875'],
  'acomodacoes/studio-superior':    ['72177720320441034'],
  'acomodacoes/flat':               ['72157629820440136'],
  'acomodacoes/loft':               ['72157636618669744'],
  'acomodacoes/suite-frente-mar':   ['72157629820547292', '72177720310998954'],
  'acomodacoes/torre-oceano':       ['72157688134337735'],
  'acomodacoes/chale-b':            ['72157629820480598'],
  'acomodacoes/chale-c':            ['72157629820581462'],
  'acomodacoes/duplex-c':           ['72157629820515400'],
  'acomodacoes/sobrado-frente-mar': ['72157637647913614'], // Duplex Frente/mar — el más cercano disponible
  'praia':          ['72057594142287973'],
  'gastronomia':    ['72177720327111126'],
  'exterior-jardim':['72157609557095868', '72057594142294093'],
  'eventos':        ['72157623606914436', '72157651818452683'],
  'piscina-lazer':  ['72057594142294093'], // álbum general — filtrar visualmente después
};

// ─── Omnibees: 1 imagen por acomodación como fallback ────────────────────────
const OMNIBEES_ROOMS = {
  'acomodacoes/suite-jardim':       'https://media.omnibees.com/Images/18298/RoomTypes/1200x900/1383080.jpg',
  'acomodacoes/studio':             'https://media.omnibees.com/Images/18298/RoomTypes/1200x900/1383953.jpg',
  'acomodacoes/studio-superior':    'https://media.omnibees.com/Images/18298/RoomTypes/1200x900/1383994.jpg',
  'acomodacoes/flat':               'https://media.omnibees.com/Images/18298/RoomTypes/1200x900/5264086.jpg',
  'acomodacoes/loft':               'https://media.omnibees.com/Images/18298/RoomTypes/1200x900/1178064.png',
  'acomodacoes/suite-frente-mar':   'https://media.omnibees.com/Images/18298/RoomTypes/1200x900/1384289.jpg',
  'acomodacoes/torre-oceano':       'https://media.omnibees.com/Images/18298/RoomTypes/1200x900/1178162.png',
  'acomodacoes/chale-b':            'https://media.omnibees.com/Images/18298/RoomTypes/1200x900/1409844.jpg',
  'acomodacoes/chale-c':            'https://media.omnibees.com/Images/18298/RoomTypes/1200x900/2199943.jpg',
  'acomodacoes/duplex-c':           'https://media.omnibees.com/Images/18298/RoomTypes/1200x900/1383229.jpg',
  'acomodacoes/sobrado-frente-mar': 'https://media.omnibees.com/Images/18298/RoomTypes/1200x900/1383694.jpg',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    let body = '';
    const req = proto.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
      },
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchHTML(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.setEncoding('utf8');
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const tmpPath = destPath + '.tmp';
    const file = fs.createWriteStream(tmpPath);
    let size = 0;

    const req = proto.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageDownloader/1.0)',
        'Referer': 'https://www.flickr.com/',
        'Accept': 'image/*',
      },
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.on('data', chunk => { size += chunk.length; });
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        if (size < MIN_SIZE_BYTES) {
          fs.unlinkSync(tmpPath);
          return reject(new Error(`Too small (${size}B): ${url}`));
        }
        fs.renameSync(tmpPath, destPath);
        resolve(size);
      });
    });
    req.on('error', err => {
      file.close();
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      reject(err);
    });
    req.setTimeout(30000, () => {
      req.destroy();
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      reject(new Error(`Download timeout: ${url}`));
    });
  });
}

/**
 * Extrae URLs de fotos de la página HTML de un álbum de Flickr.
 * Flickr embeds thumbnail URLs directly in og:image meta and img tags.
 * Convierte los thumbnails a _b.jpg (1024px).
 */
function extractFlickrPhotoUrls(html) {
  const seen = new Set();
  const urls = [];

  // Patrón: live.staticflickr.com/{server}/{id}_{hash}_{size}.jpg
  const regex = /(?:https?:)?\/\/live\.staticflickr\.com\/(\d+)\/(\d+)_([a-f0-9]+)_([a-zA-Z0-9]+)\.(?:jpg|png)/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const [, server, id, hash] = match;
    // Convertir a _b.jpg (1024px wide)
    const fullResUrl = `https://live.staticflickr.com/${server}/${id}_${hash}_b.jpg`;
    if (!seen.has(id)) {
      seen.add(id);
      urls.push({ id, url: fullResUrl });
    }
  }

  // También buscar en JSON embebido de Flickr (modelExport / appContext)
  const jsonMatch = html.match(/"main":\{"url":"([^"]+)"/g);
  if (jsonMatch) {
    for (const m of jsonMatch) {
      const urlMatch = m.match(/"url":"([^"]+)"/);
      if (urlMatch) {
        const url = urlMatch[1].replace(/\\u002F/g, '/');
        if (url.includes('staticflickr.com') && !seen.has(url)) {
          seen.add(url);
          urls.push({ id: url, url });
        }
      }
    }
  }

  return urls;
}

/**
 * Scrapea un álbum de Flickr y retorna hasta maxPhotos URLs de fotos.
 */
async function scrapeFlickrAlbum(albumId, maxPhotos = MAX_PER_BUCKET) {
  const url = `https://www.flickr.com/photos/${FLICKR_USER}/albums/${albumId}`;
  console.log(`  📷 Álbum Flickr: ${albumId}`);

  let html;
  try {
    html = await fetchHTML(url);
  } catch (err) {
    console.warn(`     ⚠ No se pudo obtener álbum: ${err.message}`);
    return [];
  }

  const photos = extractFlickrPhotoUrls(html);
  console.log(`     → ${photos.length} fotos encontradas en HTML`);

  // Verificar si hay paginación: buscar link "next page"
  // Flickr paginates at 72 photos/page; si hay más, seguir
  if (photos.length >= 60 && html.includes('data-page-number')) {
    // Hay más páginas, pero para este plan 6 por bucket es suficiente
    // Si necesitamos más, se puede extender
  }

  return photos.slice(0, maxPhotos);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const selection = {};

async function main() {
  console.log('🚀 Descarga de imágenes Estaleiro Village');
  console.log('==========================================\n');

  // Copiar fotos existentes de flickr/ al nuevo layout
  const existingFlickr = [
    { src: 'flickr/pousada-08.jpg', dest: 'piscina-lazer/piscina-lazer-01.jpg' },
    { src: 'flickr/cafe-04.jpg',    dest: 'gastronomia/gastronomia-01.jpg' },
    { src: 'flickr/praia-04.jpg',   dest: 'praia/praia-01.jpg' },
  ];

  console.log('📂 Copiando fotos existentes...');
  for (const { src, dest } of existingFlickr) {
    const srcPath = path.join(PUBLIC_IMAGES, src);
    const destPath = path.join(PUBLIC_IMAGES, dest);
    if (fs.existsSync(srcPath)) {
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  ✓ ${src} → ${dest}`);
      } else {
        console.log(`  ✓ ya existe: ${dest}`);
      }
    } else {
      console.warn(`  ⚠ no encontrado: ${src}`);
    }
  }

  // Rastrear cuántas fotos se descargaron por bucket (contando las existentes)
  const bucketCounts = {
    'piscina-lazer': fs.existsSync(path.join(PUBLIC_IMAGES, 'piscina-lazer/piscina-lazer-01.jpg')) ? 1 : 0,
    'gastronomia': fs.existsSync(path.join(PUBLIC_IMAGES, 'gastronomia/gastronomia-01.jpg')) ? 1 : 0,
    'praia': fs.existsSync(path.join(PUBLIC_IMAGES, 'praia/praia-01.jpg')) ? 1 : 0,
  };

  console.log('\n📸 Descargando de álbumes Flickr...');

  for (const [bucket, albumIds] of Object.entries(FLICKR_ALBUMS)) {
    console.log(`\n🗂 Bucket: ${bucket}`);
    selection[bucket] = selection[bucket] || [];

    const bucketSlug = bucket.replace('acomodacoes/', '');
    const bucketDir = path.join(PUBLIC_IMAGES, bucket);
    if (!fs.existsSync(bucketDir)) fs.mkdirSync(bucketDir, { recursive: true });

    const currentCount = bucketCounts[bucket] || 0;
    let downloaded = currentCount;

    for (const albumId of albumIds) {
      if (downloaded >= MAX_PER_BUCKET) break;

      const remaining = MAX_PER_BUCKET - downloaded;
      let photos;
      try {
        photos = await scrapeFlickrAlbum(albumId, remaining + 2); // +2 para tener margen de fallas
      } catch (err) {
        console.warn(`  ⚠ Error scrapeando álbum ${albumId}: ${err.message}`);
        continue;
      }

      await sleep(DELAY_MS);

      for (const photo of photos) {
        if (downloaded >= MAX_PER_BUCKET) break;

        const idx = String(downloaded + 1).padStart(2, '0');
        const filename = `${bucketSlug}-${idx}.jpg`;
        const destPath = path.join(bucketDir, filename);

        if (fs.existsSync(destPath)) {
          console.log(`  ✓ ya existe: ${filename}`);
          selection[bucket].push(`/assets/images/${bucket}/${filename}`);
          downloaded++;
          continue;
        }

        try {
          const size = await downloadFile(photo.url, destPath);
          console.log(`  ✓ ${filename} (${Math.round(size / 1024)}KB) ← ${photo.url}`);
          selection[bucket].push(`/assets/images/${bucket}/${filename}`);
          downloaded++;
          await sleep(800); // pequeña pausa entre downloads
        } catch (err) {
          console.warn(`  ✗ ${filename}: ${err.message}`);
        }
      }

      bucketCounts[bucket] = downloaded;
    }

    console.log(`  📊 ${bucket}: ${downloaded} fotos`);
  }

  // ─── Omnibees fallback para acomodaciones con pocas fotos ────────────────
  console.log('\n🏨 Omnibees fallback para acomodaciones...');

  for (const [bucket, omnibeeUrl] of Object.entries(OMNIBEES_ROOMS)) {
    const bucketDir = path.join(PUBLIC_IMAGES, bucket);
    const existing = fs.existsSync(bucketDir)
      ? fs.readdirSync(bucketDir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i)).length
      : 0;

    if (existing >= 2) {
      console.log(`  ✓ ${bucket}: ya tiene ${existing} fotos, saltando Omnibees`);
      continue;
    }

    const bucketSlug = bucket.replace('acomodacoes/', '');
    if (!fs.existsSync(bucketDir)) fs.mkdirSync(bucketDir, { recursive: true });

    const idx = String(existing + 1).padStart(2, '0');
    const ext = omnibeeUrl.endsWith('.png') ? 'png' : 'jpg';
    const filename = `${bucketSlug}-${idx}.${ext}`;
    const destPath = path.join(bucketDir, filename);

    if (fs.existsSync(destPath)) {
      console.log(`  ✓ ya existe: ${filename} (Omnibees)`);
      continue;
    }

    try {
      const size = await downloadFile(omnibeeUrl, destPath);
      console.log(`  ✓ ${filename} (${Math.round(size / 1024)}KB) ← Omnibees`);
      if (!selection[bucket]) selection[bucket] = [];
      selection[bucket].push(`/assets/images/${bucket}/${filename}`);
      await sleep(800);
    } catch (err) {
      console.warn(`  ✗ ${bucket} Omnibees: ${err.message}`);
    }
  }

  // ─── Guardar selection.json ───────────────────────────────────────────────
  const selectionPath = path.join(SCRIPTS_DIR, 'selection.json');

  // Agregar fotos existentes al selection
  for (const [bucket, _] of Object.entries(FLICKR_ALBUMS)) {
    const bucketDir = path.join(PUBLIC_IMAGES, bucket);
    if (!fs.existsSync(bucketDir)) continue;
    const files = fs.readdirSync(bucketDir)
      .filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i))
      .sort()
      .map(f => `/assets/images/${bucket}/${f}`);
    if (files.length > 0) {
      selection[bucket] = files;
    }
  }

  // Agregar buckets de fotos existentes que no estaban en FLICKR_ALBUMS
  const existingBuckets = {
    'piscina-lazer': path.join(PUBLIC_IMAGES, 'piscina-lazer'),
    'gastronomia': path.join(PUBLIC_IMAGES, 'gastronomia'),
    'praia': path.join(PUBLIC_IMAGES, 'praia'),
  };
  for (const [bucket, dir] of Object.entries(existingBuckets)) {
    if (!selection[bucket] && fs.existsSync(dir)) {
      const files = fs.readdirSync(dir)
        .filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i))
        .sort()
        .map(f => `/assets/images/${bucket}/${f}`);
      if (files.length > 0) selection[bucket] = files;
    }
  }

  fs.writeFileSync(selectionPath, JSON.stringify(selection, null, 2));
  console.log(`\n📋 selection.json guardado en ${selectionPath}`);

  // ─── Resumen final ────────────────────────────────────────────────────────
  console.log('\n✅ Resumen:');
  for (const [bucket, paths] of Object.entries(selection)) {
    console.log(`  ${bucket}: ${paths.length} fotos`);
  }

  const totalDownloaded = Object.values(selection).flat().length;
  console.log(`\n🎉 Total: ${totalDownloaded} imágenes disponibles`);
  console.log('\n⚠️  Verificar visualmente piscina-lazer: pueden haber fotos no relacionadas.');
  console.log('    Si Flickr no sirvió las fotos (requiere JS), las carpetas tendrán 0-1 fotos.');
  console.log('    En ese caso, ejecutar: node scripts/omnibees-only.mjs (fallback)');
}

main().catch(err => {
  console.error('❌ Error fatal:', err);
  process.exit(1);
});
