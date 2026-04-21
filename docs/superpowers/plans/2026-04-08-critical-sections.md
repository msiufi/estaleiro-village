# Critical Sections — Piscina, Gastronomia & Social Proof Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar tres secciones críticas de conversión al sitio de Estaleiro Village: strip de social proof en home, sección Piscina & Lazer en /a-pousada, y sección Gastronomia en /a-pousada.

**Architecture:** SocialProofStrip es un nuevo Server Component independiente inyectado en home. Las dos secciones de /a-pousada se agregan como bloques JSX inline en `a-pousada/page.tsx` siguiendo los patrones existentes (no se crean componentes separados ya que son de uso único). No hay estado cliente en ninguna de las tres secciones.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, Lucide React, `next/image`

---

## Mapa de archivos

| Acción | Archivo | Responsabilidad |
|--------|---------|-----------------|
| CREATE | `src/components/sections/social-proof-strip.tsx` | Strip oscuro con rating Booking, TripAdvisor, Blue Flag, 30 años |
| MODIFY | `src/app/page.tsx` | Importar y renderizar `<SocialProofStrip />` entre `<Hero />` e `<IntroStrip />` |
| MODIFY | `src/app/a-pousada/page.tsx` | Agregar sección Piscina & Lazer (después de Comodidades) y sección Gastronomia (después de Piscina, antes de Café da Manhã) |

---

## Task 1: Componente SocialProofStrip

**Files:**
- Create: `src/components/sections/social-proof-strip.tsx`

- [ ] **Step 1: Crear el componente**

Crear `src/components/sections/social-proof-strip.tsx` con el siguiente contenido:

```tsx
import { Award, Star, ThumbsUp } from "lucide-react";

export default function SocialProofStrip() {
  return (
    <section className="bg-[#1C1C1B]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:flex md:items-center md:justify-center md:gap-0 md:divide-x md:divide-white/10">

          <div className="flex items-center gap-3 md:px-8">
            <div className="flex flex-col">
              <span className="text-3xl font-black leading-none text-[#C9A96E]">9.1</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40">/ 10</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Booking.com</span>
              <span className="text-xs text-white/50">405 avaliações verificadas</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-8">
            <Star className="size-5 shrink-0 text-[#C9A96E]" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">TripAdvisor</span>
              <span className="text-xs text-white/50">Excelente</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-8">
            <Award className="size-5 shrink-0 text-[#C9A96E]" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Praia Bandeira Azul</span>
              <span className="text-xs text-white/50">Certificação Blue Flag</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-8">
            <ThumbsUp className="size-5 shrink-0 text-[#C9A96E]" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">+30 anos</span>
              <span className="text-xs text-white/50">de hospitalidade</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Agregar a home entre Hero e IntroStrip**

Editar `src/app/page.tsx`. Agregar el import y el componente:

```tsx
import AccommodationsPreview from "@/components/sections/accommodations-preview";
import AboutTeaser from "@/components/sections/about-teaser";
import EventsTeaser from "@/components/sections/events-teaser";
import Hero from "@/components/sections/hero";
import IntroStrip from "@/components/sections/intro-strip";
import Location from "@/components/sections/location";
import SocialProofStrip from "@/components/sections/social-proof-strip";
import Testimonials from "@/components/sections/testimonials";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Estaleiro Village | Pousada à Beira-Mar em Balneário Camboriú",
  description:
    "Pousada boutique na Praia do Estaleiro, Balneário Camboriú, SC. 30 anos de história, natureza e tranquilidade à beira-mar.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProofStrip />
      <IntroStrip />
      <AccommodationsPreview />
      <AboutTeaser />
      <EventsTeaser />
      <Testimonials />
      <Location />
    </>
  );
}
```

- [ ] **Step 3: Verificar build**

```bash
cd c:/Maxi/EV/estaleiro-village && npm run build
```

Esperado: build exitoso sin errores TypeScript ni de compilación. Si hay error de import de icono de Lucide, verificar nombre exacto con `grep -r "from 'lucide-react'" src/`.

- [ ] **Step 4: Verificar visual en dev**

```bash
npm run dev --webpack
```

Abrir http://localhost:3000 — verificar que la banda oscura aparece entre el hero y el strip blanco de "30 anos · beira-mar · natureza". En mobile debe verse en 2×2.

- [ ] **Step 5: Commit**

```bash
cd c:/Maxi/EV/estaleiro-village
git add src/components/sections/social-proof-strip.tsx src/app/page.tsx
git commit -m "feat: add social proof strip to home with Booking 9.1 rating and certifications"
```

---

## Task 2: Sección "Piscina & Lazer" en /a-pousada

**Files:**
- Modify: `src/app/a-pousada/page.tsx`

La sección va después del `</section>` de Comodidades (línea ~157) y antes del `<section className="bg-[#F7F3EE]">` de Café da Manhã (línea ~159). Usa fondo `bg-[#F7F3EE]` para alternar con el `bg-white` de Comodidades.

- [ ] **Step 1: Agregar la sección Piscina & Lazer**

En `src/app/a-pousada/page.tsx`, insertar este bloque JSX entre el cierre de la sección Comodidades y la apertura de la sección Café da Manhã (entre las líneas 157 y 159):

```tsx
      {/* Piscina & Lazer */}
      <section className="bg-[#F7F3EE]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-ev-primary">
            Lazer &amp; Bem-estar
          </p>
          <h2 className="mt-1 font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            Piscinas &amp; Área de Lazer
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Relaxe em meio à natureza com vista para o mar
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/assets/images/flickr/pousada-08.jpg"
                alt="Área de lazer e piscina externa da Estaleiro Village"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative flex-1 overflow-hidden rounded-xl">
                <Image
                  src="/assets/images/frente_20mar_202.jpg"
                  alt="Vista do mar na Estaleiro Village"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="relative flex-1 overflow-hidden rounded-xl">
                <Image
                  src="/assets/images/flickr/praia-04.jpg"
                  alt="Praia do Estaleiro com acesso exclusivo para hóspedes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Piscina externa",
              "Piscina climatizada",
              "Jacuzzis",
              "Vôlei de praia",
              "Área de descanso",
              "Duchas externas",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm text-ev-neutral-dark"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verificar build**

```bash
cd c:/Maxi/EV/estaleiro-village && npm run build
```

Esperado: build exitoso. Posibles errores: `Image` ya está importado desde línea 1 (no reimportar). Verificar que el JSX está entre los bloques correctos.

- [ ] **Step 3: Verificar visual en dev**

```bash
npm run dev --webpack
```

Abrir http://localhost:3000/a-pousada — verificar:
- La sección aparece después de Comodidades (grid de 8 amenidades)
- El grid de imágenes se ve correcto (imagen grande izquierda, 2 pequeñas apiladas derecha)
- Los chips aparecen en fila con wrap en mobile
- Fondo beige (#F7F3EE) alterna correctamente con el blanco de Comodidades

- [ ] **Step 4: Commit**

```bash
cd c:/Maxi/EV/estaleiro-village
git add src/app/a-pousada/page.tsx
git commit -m "feat: add Piscina & Lazer section to /a-pousada page"
```

---

## Task 3: Sección "Gastronomia" en /a-pousada

**Files:**
- Modify: `src/app/a-pousada/page.tsx`

La sección va después del cierre de Piscina & Lazer y antes de la sección `bg-[#F7F3EE]` de Café da Manhã. Usa fondo `bg-white` para alternar.

- [ ] **Step 1: Agregar la sección Gastronomia**

En `src/app/a-pousada/page.tsx`, insertar este bloque JSX inmediatamente después del cierre `</section>` de Piscina & Lazer (el que agregamos en Task 2), y antes del `<section className="bg-[#F7F3EE]">` de Café da Manhã:

```tsx
      {/* Gastronomia */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/assets/images/36829524845_8e2b17b5b4_c.jpg"
                alt="Gastronomia à beira-mar na Estaleiro Village"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-ev-primary">
                Restaurante
              </p>
              <h2 className="mt-1 font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
                Gastronomia à Beira-Mar
              </h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Sabores da culinária regional e internacional com vista
                privilegiada para o mar. Ingredientes frescos de Santa
                Catarina em pratos que celebram a gastronomia local.
              </p>

              <ul className="mt-6 space-y-2">
                {[
                  { label: "Jantar", detail: "Qui – Sáb · 19h às 22h" },
                  { label: "Almoço", detail: "Diário · 12h às 15h" },
                  { label: "Café da manhã", detail: "Incluso na estadia" },
                ].map(({ label, detail }) => (
                  <li key={label} className="flex items-center gap-3 text-sm">
                    <span className="size-1.5 shrink-0 rounded-full bg-ev-primary" />
                    <span className="font-medium text-ev-neutral-dark">{label}</span>
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>

              <a
                href="mailto:contato@estaleirovillage.com?subject=Reserva%20restaurante"
                className="mt-8 inline-flex items-center rounded-md border border-[#1B6CA8] px-6 py-2.5 text-sm font-medium text-ev-primary transition hover:bg-[#1B6CA8] hover:text-white"
              >
                Reservar mesa →
              </a>
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verificar build**

```bash
cd c:/Maxi/EV/estaleiro-village && npm run build
```

Esperado: build exitoso sin errores. Si hay error con `bg-ev-primary` en el `<span>`, reemplazar por `bg-[#1B6CA8]` ya que Tailwind 4 puede no resolver variables CSS en clases utilitarias de bg sin configuración explícita.

- [ ] **Step 3: Verificar visual en dev y orden final de secciones**

```bash
npm run dev --webpack
```

Abrir http://localhost:3000/a-pousada — verificar el orden completo de secciones:
1. Hero (imagen + título "A Pousada")
2. Refúgio à Beira-Mar (texto + imagen, fondo blanco)
3. Comodidades (grid 8 amenidades, fondo blanco)
4. **Piscinas & Área de Lazer** (grid imágenes + chips, fondo beige)
5. **Gastronomia à Beira-Mar** (imagen izq + texto der con horarios + CTA, fondo blanco)
6. Café da Manhã (imagen + texto, fondo beige)
7. Galeria (grid fotos)
8. CTA "Pronto para sua estadia?"

Verificar también:
- El layout imagen+texto de Gastronomia es idéntico en estructura al de Café da Manhã
- El CTA "Reservar mesa" abre el cliente de mail con subject prellenado
- En mobile el grid colapsa a columna única (imagen arriba, texto abajo)

- [ ] **Step 4: Commit final**

```bash
cd c:/Maxi/EV/estaleiro-village
git add src/app/a-pousada/page.tsx
git commit -m "feat: add Gastronomia section to /a-pousada page with restaurant hours and booking CTA"
```

---

## Self-Review

**Cobertura de spec:**
- ✅ Strip social proof en home (Task 1) — rating 9.1/10, 405 reseñas, Blue Flag, 30 años
- ✅ Piscina & Lazer en /a-pousada después de Comodidades (Task 2)
- ✅ Gastronomia en /a-pousada después de Piscina & Lazer (Task 3)
- ✅ Sin nombre de chef
- ✅ CTA Gastronomia enlaza a mailto con subject prellenado
- ✅ Orden de secciones en /a-pousada coincide con spec

**Sin placeholders:** verificado — todos los pasos tienen código completo.

**Consistencia de tipos:** `Image` ya importado en `a-pousada/page.tsx` desde línea 1, no se reimporta. El import de `SocialProofStrip` sigue la convención `@/components/sections/...`.

**Posible issue con `bg-ev-primary`:** Tailwind 4 resuelve variables CSS en texto (`text-ev-primary`) pero puede no resolverlas en `bg-ev-primary`. Si falla, usar `bg-[#1B6CA8]` como fallback. Anotado en el step de verificación de Task 3.
