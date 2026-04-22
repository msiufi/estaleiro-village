# Trabajo pendiente post-entrega

Las Fases 1–11 del plan
`docs/superpowers/plans/2026-04-21-completar-hotel-entregable.md` están
completas. Este documento enumera los pasos que no se pudieron ejecutar
automáticamente y requieren acción humana.

---

## 1. Enhance de fotos — requiere `GEMINI_API_KEY` (Fase 10.2)

El script `scripts/enhance_images_nanobanana.py` mejora calidad y resolución
de las fotos (fuentes actuales miden ~1258 px de ancho). No se ejecutó
porque `GEMINI_API_KEY` no está en el entorno.

### Cómo ejecutar cuando se tenga la API key

```bash
cd estaleiro-village
export GEMINI_API_KEY=<clave>
python scripts/enhance_images_nanobanana.py
```

### Orden sugerido (piloto primero)

Correr sobre las 4 imágenes más visibles antes de procesar todo:

- `public/assets/images/frente_20mar_202.jpg`
- `public/assets/images/Studio_20Sup_20cama.jpg`
- `public/assets/images/flat1.jpg`
- `public/assets/images/sobrado_20ricardo.jpg`

Verificar visualmente la calidad antes de correr sobre el resto. El script
guarda los originales en `public/assets/images/.backup-originals/`.

### Considerar actualizar `next.config.ts` después

Cuando las imágenes suban a ≥1920 px (Gemini reescala a 4K), ampliar
`deviceSizes` en `next.config.ts` a `[640, 750, 828, 1080, 1200, 1920, 2048]`
para aprovechar el upscale.

---

## 2. QA funcional en navegador (Fase 12.1)

Correr `npm run dev` y recorrer cada página en Chrome + Safari, desktop
y mobile. Checklist:

- [ ] `/` — hero, social proof (5 badges), testimonios, trust badges,
      location con datos nuevos.
- [ ] `/a-pousada` — sin typos, sección Pet Friendly visible, Piscina,
      Gastronomia, Galería.
- [ ] `/a-historia` — timeline de 6 hitos, narrativa de fundadores.
- [ ] `/acomodacoes` — 11 tarjetas, 7 filtros funcionan, badge Pet
      Friendly sobre cada imagen.
- [ ] `/acomodacoes/[slug]` — página de detalle carga para las 11
      acomodaciones, galería correcta, CTA booking + WhatsApp funcionan.
- [ ] `/atividades` — secciones "No local" y "Na região".
- [ ] `/galeria` — 16 fotos, filtros, lightbox con flechas + ESC.
- [ ] `/eventos` — 10 tipos de evento en grid.

Mobile (DevTools o dispositivo real):

- [ ] Header hamburger abre/cierra sin saltos.
- [ ] Nav con 7 items no desborda.
- [ ] RoomCards mantienen proporción.
- [ ] Lightbox funciona con touch swipe.
- [ ] WhatsApp float no tapa contenido crítico.

---

## 3. Lighthouse audit (Fase 12.2)

```bash
npm run build
npm run start
```

Correr Lighthouse en Chrome DevTools sobre `http://localhost:3000`
(Desktop y Mobile). Metas:

- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO = 100

Issues frecuentes y dónde corregirlos:

| Síntoma | Archivo típico |
|---|---|
| `<Image>` sin `width/height` | buscar usos nuevos sin `fill` ni dimensiones |
| Contrast ratio bajo | `text-white/50` o `/60` sobre gradientes oscuros |
| Link sin nombre accesible | componentes con solo `Icon` — ya cubierto en header y whatsapp-float |
| `alt` vacío o genérico | `src/data/galeria.ts`, `src/data/accommodations.ts` |

Análisis estático pre-Lighthouse ya hecho en 2026-04-22: todas las
`<Image>` tienen `alt` y `sizes`/`fill`, header hamburger tiene
`aria-label` + `aria-expanded`, WhatsApp float tiene `aria-label`.

---

## 4. Deploy preview a Vercel (Fase 12.3)

Requiere autenticación interactiva del usuario.

```bash
cd estaleiro-village
npx vercel link
npx vercel              # preview
npx vercel --prod       # producción
```

Alternativamente, usar la skill `vercel:bootstrap` para linkear el
proyecto si no está linkeado.

Luego, correr el checklist de Sección 2 sobre la URL pública.

---

## 5. Merge a `main` y tag de versión (Fase 12.4)

**Estado actual:** branch activa = `master`. Si el remote convención es
`main`, coordinar con el owner antes de:

```bash
cd C:/Maxi/EV/estaleiro-village
git checkout main          # si existe
git merge master
git push origin main
git tag -a v1.0-entrega -m "Entrega inicial al cliente"
git push origin v1.0-entrega
```

**⚠ Pedir confirmación antes:** push a main y tag push son operaciones
visibles al equipo y al cliente.

---

## 6. Validación humana de datos (Self-Review del plan)

Confirmar con el dueño del hotel antes de la entrega final:

1. Precios por acomodación (actuales son estimados).
2. Piscina, restaurante propio e hidromasaje en Sobrado Frente Mar —
   confirmar que existen físicamente.
3. Revisión de ortografía portuguesa por hablante nativo.
4. Foto adicional para cada acomodación (hoy se reusan imágenes).
5. PEV Hall of Fame: año exacto y validez actual del sello.
6. Rating Booking.com (9.1 / 405) — actualizar si cambió.

---

Última actualización: 2026-04-22.
