# Plan: Scraping de imágenes reales y remapeo a acomodaciones/secciones

**Fecha:** 2026-04-22
**Autor:** Maxi + Claude
**Estado:** Borrador — pendiente aprobación

---

## 1. Problema

La pousada tiene **16 imágenes en total** en `estaleiro-village/public/assets/images/`, reutilizadas a través de 11 acomodaciones y múltiples secciones. Esto produce dos síntomas visibles:

### 1.1 Acomodaciones con imágenes compartidas / incorrectas

`src/data/accommodations.ts` tiene 11 tipos de habitación, pero solo 5-6 archivos reales cubren todas las galerías:

| Imagen                     | Acomodaciones que la usan                                                       |
| -------------------------- | ------------------------------------------------------------------------------- |
| `jardim_202.jpg`           | Suíte Jardim, Loft, Chalé B, Chalé C, Duplex C                                  |
| `frente_20mar_202.jpg`     | Flat, Suíte Frente Mar, Torre Oceano, Sobrado Frente Mar, sección Piscina/Lazer |
| `sobrado_20ricardo.jpg`    | Chalé B, Chalé C, Duplex C, Sobrado Frente Mar                                  |
| `flat1.jpg`                | Flat, Loft                                                                      |
| `Studio_20Sup_20cama.jpg`  | Studio, Studio Superior                                                         |
| `54661554235_216e580305.jpg` | Suíte Frente Mar, Torre Oceano, Sobrado Frente Mar                            |

Resultado: un chalé "familiar" y un "sobrado de lujo" muestran exactamente la misma foto.

### 1.2 Sección "Piscinas & Área de Lazer" descohesionada

`src/app/a-pousada/page.tsx:208-271` arma un grid de 3 imágenes para la sección de piscinas:

- ✅ `flickr/pousada-08.jpg` — imagen real de piscina
- ❌ `frente_20mar_202.jpg` — vista al **mar**, no piscina
- ❌ `jardim_202.jpg` — **jardín**, no piscina

El usuario lo describió como *"se ven como si faltaran imágenes, además algunas imágenes no están relacionadas con piscina o área de lazer"*. Diagnóstico correcto: el grid tiene 3 slots pero solo 1 es temáticamente correcta.

---

## 2. Fuentes de imágenes

Investigación confirmada:

1. **Flickr oficial:** https://www.flickr.com/photos/estaleirovillage/ — **2.262 fotos** públicas desde 2006. Fuente principal.
2. **Sitio Wix original:** https://www.estaleirovillage.com.br/ — imágenes de producción usadas en el sitio anterior (subset curado).
3. **Instagram:** https://www.instagram.com/pousadaestaleirovillageoficial/ — fotos recientes (scraping riesgoso por bloqueo; fallback).
4. **Omnibees booking:** https://book.omnibees.com/chain/9131/hotel/18298 — galería oficial del motor de reservas.

Carpeta local ya existente con 3 fotos tomadas de Flickr previamente: `public/assets/images/flickr/{cafe-04.jpg, pousada-08.jpg, praia-04.jpg}`.

---

## 3. Alcance

**Dentro del alcance:**

- Descargar, clasificar y optimizar imágenes reales de Flickr + Wix para cubrir las 11 acomodaciones y las secciones Piscina/Lazer, Gastronomia, Jardins/Exterior, Praia.
- Re-mapear `src/data/accommodations.ts` con galerías específicas por acomodación (4–6 imágenes cada una).
- Reemplazar el grid de `a-pousada/page.tsx` (Piscina/Lazer) con imágenes realmente de piscina/área de lazer.
- Actualizar `src/data/galeria.ts` con el inventario final.
- Validar build + QA visual en las páginas afectadas.

**Fuera del alcance:**

- No se edita/retoca fotografía con IA (ya hay pipeline existente, no parte de este plan).
- No se cambia el diseño de las secciones, solo el contenido visual.
- No se toca Instagram salvo si Flickr + Wix no alcanzan.

---

## 4. Fases

### Fase 1 — Inventario de fuentes (descubrimiento)

**Objetivo:** saber exactamente qué fotos existen y dónde, sin descargar aún.

1. Scrapear el álbum de Flickr `estaleirovillage`:
   - Enumerar páginas (`/photos/estaleirovillage/page1`, `page2`, …).
   - Para cada foto, capturar: URL de la foto, `title`, `description`, `tags`, URL al tamaño `_b.jpg` (1024px) o `_k.jpg` (2048px).
   - Flickr permite descarga directa con URLs canónicas `https://live.staticflickr.com/{server}/{id}_{secret}_{size}.jpg`.
   - Guardar JSON `scripts/flickr-index.json` con todos los metadatos.
2. Scrapear el sitio Wix (`estaleirovillage.com.br`):
   - Descargar HTML de las páginas clave (home, acomodações, gastronomia, eventos, galeria).
   - Extraer URLs `https://static.wixstatic.com/media/...` y descripciones contextuales (alt, caption, título de sección donde aparece).
   - Guardar JSON `scripts/wix-index.json`.
3. Scrapear Omnibees si la galería es HTML estático (fallback).

**Entregable:** `scripts/flickr-index.json` + `scripts/wix-index.json` (total esperado: ~2.000+ fotos catalogadas).

**Riesgos y mitigación:**
- Flickr puede rate-limitar scraping anónimo → usar delay de 1s entre requests, `User-Agent` real.
- Wix puede servir imágenes a través de CDN con tokens temporales → descargar inmediato una vez encontrada.

### Fase 2 — Clasificación y selección

**Objetivo:** reducir 2.000+ candidatas a ~60–80 imágenes curadas por tema.

1. Clasificación automatizada **por metadatos** (sin análisis visual):
   - Reglas de matching en `tags`, `title`, `description`:
     - `piscina|pool|jacuzzi` → bucket `piscina-lazer`
     - `chalé|chale|sobrado|duplex|loft|flat|studio|suíte` → bucket `acomodacao-{match}`
     - `café|manhã|restaurante|gastronomia|almoço` → bucket `gastronomia`
     - `praia|beach|estaleiro|mar` → bucket `praia`
     - `jardim|mata|natureza|exterior|fachada` → bucket `exterior-jardim`
     - `evento|casamento|festa` → bucket `eventos`
2. Clasificación **manual asistida** para lo que quede ambiguo:
   - Generar HTML índice (`scripts/review.html`) con thumbnails + metadatos para que el usuario (o yo) marque bucket correcto desde el browser.
   - *Alternativa más rápida*: usar análisis visual (Claude vision vía Read de imagen) sobre subset de top candidatas por bucket.
3. Selección final:
   - **Piscina/Lazer:** 6–8 fotos (piscina externa, climatizada, jacuzzi, vôlei, duchas, deck).
   - **Gastronomia:** 3–4 fotos (café, mesa, salón).
   - **Exterior/Jardim:** 4–6 fotos.
   - **Praia:** 3–4 fotos.
   - **Por acomodación** (11 tipos): 4–6 fotos cada una = ~50 fotos de interiores/habitaciones.

**Entregable:** `scripts/selection.json` con mapping `{bucket → [url_flickr/wix]}` y `{roomId → [url_flickr/wix]}`.

**Riesgos y mitigación:**
- Flickr puede tener pocas fotos etiquetadas por acomodación específica → fallback: usar análisis visual para distinguir interiores similares; si no es distinguible, aceptar imágenes genéricas de "habitación" pero marcar en el código que es genérica.
- El Wix original también tuvo solo 4 tipos (vs 11 del rediseño) → varios chalés pueden terminar con fotos genéricas; documentarlo en el plan y reportar al cliente.

### Fase 3 — Descarga y organización en filesystem

**Objetivo:** tener las imágenes descargadas, optimizadas, en estructura final.

1. Script Node (`scripts/download-images.mjs`) que lee `selection.json` y descarga a:
   ```
   public/assets/images/
     acomodacoes/
       suite-jardim/       [1-5].jpg
       studio/             [1-5].jpg
       studio-superior/    [1-5].jpg
       flat/               [1-5].jpg
       loft/               [1-5].jpg
       suite-frente-mar/   [1-5].jpg
       torre-oceano/       [1-5].jpg
       chale-b/            [1-5].jpg
       chale-c/            [1-5].jpg
       duplex-c/           [1-5].jpg
       sobrado-frente-mar/ [1-5].jpg
     piscina-lazer/        [1-8].jpg
     gastronomia/          [1-4].jpg
     exterior-jardim/      [1-6].jpg
     praia/                [1-4].jpg
     eventos/              [1-4].jpg
   ```
2. Optimización con el pipeline existente (ya hay `.nanobanana-tmp/` y `.backup-originals/`):
   - Mantener original en `.backup-originals/`
   - JPG/PNG → WebP (usado por Next.js image config ya habilitado en `next.config.ts`).
   - Next.js se encarga de AVIF en runtime (`formats: ['avif', 'webp']` según memoria).
3. Nombres de archivo: `{slug}-{idx}.jpg` legibles (ej. `chale-b-01.jpg`).

**Entregable:** carpetas pobladas, `.gitignore` respetado, tamaño razonable (<10MB total extra tras WebP).

**Riesgos y mitigación:**
- Fotos de Flickr en alta resolución pueden pesar >2MB/c → convertir a WebP con quality 82, max 2400px lado mayor.
- El repo ya tiene `.backup-originals/` fuera de git → confirmar si se commitean originales o solo WebP.

### Fase 4 — Integración en el código

**Objetivo:** los componentes apuntan a las nuevas imágenes.

1. Actualizar `src/data/accommodations.ts`:
   - `mainImage` → primera foto del bucket de cada acomodación.
   - `gallery` → 4-6 fotos del bucket (incluyendo `mainImage` como primera).
2. Reemplazar grid en `src/app/a-pousada/page.tsx:221-251`:
   - Opción A (mínima): mantener layout 1+2 pero con las 3 fotos todas de piscina.
   - Opción B (recomendada): expandir a grid 2x3 (6 fotos) con piscinas externa/climatizada/jacuzzi/deck.
   - Mantener chips "Piscina externa / climatizada / Jacuzzi / Vôlei / Descanso / Duchas" ya presentes.
3. Actualizar `src/data/galeria.ts` con inventario completo (~25-30 items) y `alt` descriptivos por bucket.
4. Revisar `src/app/page.tsx` (homepage) y `src/components/sections/*.tsx` por si quedan referencias a imágenes retiradas.

**Entregable:** diff de ~3-5 archivos en `src/` + carpetas de `public/`.

**Riesgos y mitigación:**
- Eliminar imágenes en uso → antes de borrar, grep `grep -r <filename> src/` para detectar referencias rezagadas.
- Dejar imágenes antiguas en `public/` aunque no se referencien no rompe build, pero hincha el repo → limpieza al final, con commit separado.

### Fase 5 — Verificación

1. `npm run build` en `estaleiro-village/` — debe pasar 23 páginas estáticas sin errores.
2. `npm run dev` + QA visual en browser:
   - `/a-pousada` — sección piscina se ve coherente.
   - `/acomodacoes` + cada `/acomodacoes/{id}` — galerías con fotos reales del tipo correcto.
   - `/galeria` — grid completo con categorías.
3. Lighthouse spot-check en `/a-pousada` (perfil home):
   - Performance ≥90, CLS 0, LCP estable (las imágenes nuevas respetan `sizes` existente).
4. Git: commits atómicos por fase (descarga / código / limpieza).

**Entregable:** PR/commit único en submódulo `estaleiro-village`, actualizar puntero en parent repo.

---

## 5. Secuencia de ejecución propuesta

| Paso | Acción                                                                         | Duración estimada |
| ---- | ------------------------------------------------------------------------------ | ----------------- |
| 1    | Fase 1: scripts de scraping Flickr + Wix, generar índices JSON                 | 30-45 min         |
| 2    | Fase 2: clasificación automática por tags, generar selection.json              | 15-20 min         |
| 3    | **Checkpoint humano:** revisar selection.json y ajustar manualmente si hace falta | 10-15 min (Maxi) |
| 4    | Fase 3: descarga + conversión WebP + organización en carpetas                  | 15-20 min         |
| 5    | Fase 4: actualizar `accommodations.ts`, `a-pousada/page.tsx`, `galeria.ts`     | 20-30 min         |
| 6    | Fase 5: build + QA visual + commits                                            | 15-20 min         |

**Tiempo total estimado:** ~2-2.5 horas de trabajo, con un checkpoint corto del usuario en paso 3.

---

## 6. Preguntas abiertas (pre-ejecución)

1. **Límite de imágenes a descargar:** ¿OK con ~60-80 imágenes finales (~20-30MB en disco tras WebP)? Si querés más/menos, ajustamos.
2. **Checkpoint de Fase 2:** ¿preferís revisar el `selection.json` antes de que descargue, o confío en la clasificación automática y corregimos después?
3. **Fotos genéricas para chalés sin fotos propias:** si Flickr no tiene fotos distinguibles del "Chalé B" vs "Chalé C", ¿aceptás que compartan fotos genéricas de chalé pero con alt-text distinto, o preferís reportar al cliente para que saque fotos nuevas?
4. **Imágenes viejas sin uso:** después de reemplazar, ¿borramos las actuales (jardim_202, frente_20mar_202, etc.) o las dejamos como fallback?
5. **Commits:** ¿un único commit al final o uno por fase (más granular pero más ruido en el log)?

---

## 7. Definición de éxito

- Cada una de las 11 acomodaciones tiene una galería con **al menos 4 imágenes**, donde al menos la principal es distinguible de las otras acomodaciones del mismo tipo.
- La sección Piscina/Lazer de `/a-pousada` muestra solo imágenes de piscina/área de lazer (sin mar ni jardín genéricos).
- La página `/galeria` tiene 25+ imágenes categorizadas correctamente.
- `npm run build` pasa sin warnings de imágenes faltantes.
- QA visual manual confirma coherencia temática en las 4 páginas afectadas.
