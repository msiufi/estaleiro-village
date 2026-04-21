# Diseño: Secciones críticas faltantes — Estaleiro Village

**Fecha:** 2026-04-08  
**Proyecto:** estaleiro-village (Next.js 16 App Router)  
**Scope:** Brechas críticas de conversión — 3 secciones nuevas

---

## Contexto

El sitio rediseñado de Estaleiro Village tiene una buena base (5 páginas, acomodaciones filtrables, timeline, formulario de eventos), pero le faltan tres elementos que el sitio original tiene y que son determinantes para vender habitaciones:

1. **Piscinas y área de lazer** — el original tiene piscina externa vista al mar, piscina climatizada y jacuzzis. No se mencionan en ninguna parte del nuevo sitio.
2. **Restaurante propio** — restaurante frente al mar, horarios definidos y menú regional/internacional. Ausente en el nuevo sitio.
3. **Social proof con rating real** — Booking.com 9.0/10 con 337 reseñas verificadas. Los testimonios actuales son genéricos y sin respaldo externo.

Estas brechas se atacan en este sprint. Las demás mejoras (página /atividades, FAQ, galería lightbox, etc.) quedan para un sprint posterior.

---

## Qué se construye

### 1. Strip de Social Proof — Home (`/`)

**Ubicación:** Inmediatamente después del Hero, antes del IntroStrip actual.

**Contenido:**
- Rating Booking.com: **9.1 / 10** con "405 avaliações verificadas"
- TripAdvisor: "Excelente" (sin nota numérica para no inventar dato)
- Certificação Blue Flag (playa)
- "+30 anos de hospitalidade"

**Diseño:**
- Fondo oscuro (`--ev-neutral-dark` / `#1C1C1B`) para contrastar con el hero claro
- 4 ítems en fila con separadores verticales
- Responsive: 2×2 en mobile
- No es un componente de selección — es informativo, no interactivo

**Componente:** `src/components/sections/social-proof-strip.tsx` (Server Component)  
**Datos:** hardcodeados en el componente (no necesita archivo de datos separado)

---

### 2. Sección "Piscina & Lazer" — `/a-pousada`

**Ubicación:** En la página `/a-pousada`, después de la sección de Amenidades existente.

**Contenido:**
- Badge: "Lazer & Bem-estar"
- Título: "Piscinas & Área de Lazer"
- Subtítulo: "Relaxe em meio à natureza com vista para o mar"
- Grid de imágenes: imagen principal grande (piscina externa) + 2 imágenes pequeñas (piscina climatizada, jacuzzi). Usar fotos disponibles en `public/assets/images/flickr/` y otras existentes.
- Chips de amenidades: Piscina externa · Piscina climatizada · Jacuzzis · Vôlei de praia · Área de descanso · Duchas externas

**Diseño:**
- Fondo: `--ev-neutral-light` (`#F7F3EE`) — igual a las secciones alternas de /a-pousada
- Grid: `grid-cols-1 md:grid-cols-[1.4fr_1fr]` para imagen principal + columna de 2 imágenes pequeñas
- Chips: mismo estilo Badge que las amenidades existentes

**Componente:** Sección inline en `src/app/a-pousada/page.tsx` (no necesita componente separado por ser uso único)  
**Imágenes:** Priorizar fotos de piscina/playa del directorio `flickr/`. Si no hay fotos específicas de piscina, usar fotos exteriores de la pousada con el label correcto.

---

### 3. Sección "Gastronomia" — `/a-pousada`

**Ubicación:** En la página `/a-pousada`, después de "Piscina & Lazer" y antes del CTA final.

**Contenido:**
- Badge: "Restaurante"
- Título: "Gastronomia à Beira-Mar"
- Layout: imagen izquierda + texto derecha (igual que la sección "Café da Manhã" existente)
- Texto: descripción del restaurante, culinária regional e internacional (sin nombrar al chef — los chefs cambian)
- Detalles operativos:
  - Jantar: Qui–Sáb 19h–22h
  - Almoço: diário 12h–15h
  - Café da manhã: incluso na estadia
- CTA: "Reservar mesa →" que enlaza al email de contacto (`mailto:contato@estaleirovillage.com?subject=Reserva restaurante`)

**Diseño:**
- Fondo: blanco (igual que "Café da Manhã")
- Layout: `grid-cols-1 md:grid-cols-2` con imagen a la izquierda
- Usar foto de gastronomía/restaurante disponible (flickr/cafe-04.jpg o similar)
- CTA como `<Button variant="outline">` para no competir con el CTA principal de reserva de habitación

**Componente:** Sección inline en `src/app/a-pousada/page.tsx`

---

## Orden de secciones resultante en `/a-pousada`

1. Hero Header
2. Sección "Refúgio" (texto + imagen) ← existente
3. Amenidades (grid 8 items) ← existente
4. **Piscina & Lazer** ← NUEVO
5. **Gastronomia** ← NUEVO
6. Café da Manhã ← existente
7. Galería ← existente
8. CTA Final ← existente

---

## Orden en Home (`/`)

1. Hero ← existente
2. **Social Proof Strip** ← NUEVO
3. IntroStrip (30 anos · beira-mar · natureza) ← existente
4. Accommodations Preview ← existente
5. About Teaser ← existente
6. Events Teaser ← existente
7. Testimonials ← existente
8. Location ← existente

---

## Restricciones técnicas

- **Next.js 16 App Router** — leer `node_modules/next/dist/docs/` antes de escribir código
- **Tailwind CSS 4** — usar clases de Tailwind 4, no v3
- **Colores:** usar variables CSS `--ev-primary`, `--ev-neutral-dark`, `--ev-neutral-light`, `--ev-gold` ya definidas en el proyecto
- **Componentes Server por defecto** — ninguna de las 3 secciones necesita estado cliente
- **Imágenes:** usar `next/image` con los archivos ya existentes en `public/assets/images/`

---

## Fuera de scope (sprint siguiente)

- Página `/atividades`
- FAQ section
- Galería lightbox
- Integración real con Booking.com / TripAdvisor API
- Video del lugar
- Mascotas y otros servicios adicionales
