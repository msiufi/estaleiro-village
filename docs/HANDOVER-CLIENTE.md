# Handover — Pousada Estaleiro Village

Guía de operación del sitio web reconstruido en Next.js 16. Pensada para el
equipo del hotel (no-técnico) y para quien retome tareas técnicas después de
la entrega.

---

## 1. Sitio en producción

- **URL:** pendiente de deploy (ver `pending-work.md`).
- **Integraciones activas:**
  - Motor de reservas: **Omnibees**, hotel ID `18298`.
  - WhatsApp: `+55 47 99112-5300` (link `https://wa.me/5547991125300`).
  - Teléfono: `+55 47 99112-5200`.
  - Email: `pousada@estaleirovillage.com`.
  - Instagram: `@pousadaestaleirovillageoficial`.

---

## 2. Actualizaciones comunes (editar el contenido del sitio)

Todos los textos e imágenes viven en archivos de datos en
`src/data/`. Cambiar ahí y volver a desplegar; no hace falta tocar
componentes.

| Qué se cambia | Archivo |
|---|---|
| Acomodaciones, precios, descripciones, fotos | `src/data/accommodations.ts` |
| Testimonios de huéspedes (home) | `src/data/homepage.ts` |
| Línea del tiempo e historia familiar | `src/data/historia.ts` |
| Tipos de eventos (casamentos, corporativos, etc.) | `src/data/eventos.ts` |
| Actividades locales y regionales | `src/data/atividades.ts` |
| Galería (fotos destacadas por categoría) | `src/data/galeria.ts` |

### Cómo cambiar precios

Editar `priceFrom` en la acomodación correspondiente dentro de
`src/data/accommodations.ts` (el número es en BRL, sin separadores).

### Cómo cambiar fotos

1. Reemplazar el archivo en `public/assets/images/` **manteniendo el mismo
   nombre** (y preferentemente las mismas proporciones).
2. Si se quiere cambiar el nombre, buscar las referencias al nombre viejo
   con un find-in-files y actualizar los paths en `src/data/*.ts`.
3. Formatos aceptados: `.jpg`, `.jpeg`, `.png`, `.webp`. Next.js genera
   automáticamente versiones AVIF/WebP optimizadas.

### Cómo agregar testimonios

Agregar un objeto nuevo al array `testimonials` en `src/data/homepage.ts`
con `id`, `name`, `location`, `quote` y `rating`. Orden visual = orden del
array.

### Cómo cambiar datos de contacto globales

- Header/Footer: teléfono, WhatsApp y email en
  `src/components/layout/footer.tsx`.
- Schema.org y metadata SEO: `src/components/schema-org.tsx` y
  `src/lib/metadata.ts` (`siteConfig`).

---

## 3. Cómo correr el sitio localmente

Requisitos: Node 20+.

```bash
cd estaleiro-village
npm install
npm run dev           # desarrollo en http://localhost:3000
npm run build         # build de producción
npm run start         # servir build de producción
npm run lint          # verificar estilo
```

---

## 4. Stack y decisiones técnicas

- **Framework:** Next.js 16 (App Router) con React 19.
- **Estilos:** Tailwind CSS 4 (configuración inline en `globals.css`
  via `@theme`, no `tailwind.config.js`).
- **Fonts:** Playfair Display (titulares) + Inter (cuerpo), cargadas con
  `next/font/google`.
- **Imágenes:** `next/image` con AVIF/WebP y cache de 30 días
  (`next.config.ts`). Los `deviceSizes` están topeados a 1280 porque las
  fotos fuente miden ~1258 px — no tiene sentido pedir tamaños mayores
  (ver `docs/pending-work.md` si se procesan las fotos con
  `scripts/enhance_images_nanobanana.py` para subir a 4K).
- **SEO:** metadata OG+Twitter+canonical centralizada en `src/lib/metadata.ts`,
  `/robots.txt` y `/sitemap.xml` auto-generados, JSON-LD `LodgingBusiness`
  en `src/components/schema-org.tsx`.
- **Nota sobre Next.js 16:** esta versión tiene breaking changes respecto
  a 14/15 (cache defaults, qualities, etc.). Antes de tocar código, leer
  el archivo correspondiente en `node_modules/next/dist/docs/`.

---

## 5. Verificación antes de cada deploy

- `npm run build` pasa sin errores.
- `npm run lint` pasa sin errores.
- Visual check manual: `/`, `/a-pousada`, `/a-historia`, `/acomodacoes`,
  `/acomodacoes/[slug]` (al menos 3), `/atividades`, `/galeria`,
  `/eventos`.
- En mobile: header hamburger, botón flotante de WhatsApp, lightbox de
  galería con touch.

---

## 6. Riesgos / datos a confirmar con el hotel

1. **Precios por acomodación** — los valores en `accommodations.ts` son
   estimaciones conservadoras; validar con el equipo del hotel antes de
   publicar.
2. **Comodidades específicas** — confirmar que realmente hay piscina,
   restaurante propio e hidromasaje en las acomodaciones marcadas.
3. **Ortografía portuguesa** — ideal que un hablante nativo revise los
   textos (especialmente `a-historia`, `a-pousada`).
4. **Fotos únicas por acomodación** — actualmente algunas comparten fotos
   del pool general. Si el hotel entrega fotos nuevas, reemplazar en
   `public/assets/images/` y actualizar `gallery` en `accommodations.ts`.
5. **Rating Booking.com** — el `9.1` sobre `405 avaliações` está hardcodeado
   en `SocialProofStrip` y Schema.org. Actualizar periódicamente o
   convertir en valor leído desde una API.
6. **PEV Hall of Fame** — confirmar año exacto y validez actual del sello.

---

## 7. Plan de ejecución original

Todo el rediseño siguió el plan en
`docs/superpowers/plans/2026-04-21-completar-hotel-entregable.md` (12 fases,
de correcciones críticas hasta SEO y QA). Útil para entender por qué cada
pedazo existe.

---

## 8. Soporte

Contacto técnico y hosting por definir al momento de la entrega formal.
