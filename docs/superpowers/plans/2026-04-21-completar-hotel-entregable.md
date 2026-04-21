# Completar Estaleiro Village para Entrega al Cliente — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Llevar el rebuild de Estaleiro Village de ~90% funcional a 100% entregable: sitio de pousada boutique profesional, que vende, con información completa, fotos suficientes, señales de confianza visibles, SEO sólido y performance >90.

**Architecture:** Next.js 15 App Router + TypeScript + Tailwind 4 (inline `@theme`) + shadcn/ui patterns. Data-driven sections con archivos TS en `src/data/`. Dynamic routes para detalle de acomodaciones. Assets estáticos bajo `public/assets/`. Deploy objetivo Vercel.

**Tech Stack:**
- Next.js 15 App Router (React Server Components default)
- TypeScript estricto
- Tailwind CSS 4 con `@theme inline` en `globals.css`
- shadcn/ui primitives (Button, Badge, Section)
- lucide-react para iconos
- next/image con sizes explícitos
- Motor reservas Omnibees (link externo, hotel ID 18298)

**Scope de trabajo (resumen de hallazgos del relevamiento):**
- Solo 4 de 11 tipos de acomodación están publicados
- No existen páginas de detalle por acomodación (botón "Ver detalhes" es muerto)
- Datos de contacto incompletos: falta teléfono `(47) 9 9112-5200`, WhatsApp `(47) 9 9112-5300`, email correcto es `pousada@estaleirovillage.com` (no `contato@`)
- Logos de confianza (Blue Flag, WTTC) existen en `public/assets/logos/` pero están huérfanos
- Sin WhatsApp flotante
- Historia familiar (David y Kitty, pareja argentina desde 1986) subutilizada
- Pet Friendly (valor central del original) casi invisible
- Eventos: 4 tipos vs 10 en el original
- Sin página `/atividades` (atracciones regionales)
- Sin página `/galeria` unificada con lightbox
- Typos ortográficos en portugués (acentos y cedillas)
- Sin OG tags por página ni sitemap ni schema.org Hotel
- Imágenes sin WebP/AVIF

**Estimación total:** ~20-25 horas de trabajo repartidas en 12 fases. Fases 1-4 son fixes rápidos de alto impacto para entrega mínima viable; fases 5-12 elevan el sitio al estándar profesional.

**Convenciones obligatorias:**
- Todo el copy en **portugués brasileño correcto** (con acentos y cedillas). Nunca "manha" sin `ã`, "refugio" sin `ú`, "Orcamento" sin `ç`.
- Cada componente nuevo respeta el patrón existente: `Section` wrapper, `font-heading` para títulos, clases `text-ev-primary`/`text-ev-neutral-dark`/`text-ev-gold` (tokens del design system en `globals.css`).
- Images siempre `next/image` con `sizes` explícito. Nunca `<img>` crudo.
- Links internos: `next/link`. Externos (Omnibees, WhatsApp, Instagram): `<a target="_blank" rel="noreferrer">`.
- Cada tarea termina con `npm run build` verde antes del commit.
- Commits pequeños, mensaje semántico en español.

---

## FASE 1 — Fixes críticos de ortografía, contacto y link roto

Impacto alto, esfuerzo bajo (~1-2h). Bloquean la entrega porque son errores visibles a primera vista.

### Task 1.1: Corregir email de contacto y agregar teléfono/WhatsApp en Footer

**Files:**
- Modify: `estaleiro-village/src/components/layout/footer.tsx`

- [ ] **Paso 1: Reemplazar sección Contato con datos correctos**

Editar el bloque `<div className="space-y-4">` con el `<h2>Contato</h2>` (líneas 72-93). Reemplazar:

```tsx
        <div className="space-y-4">
          <h2 className="font-heading text-lg">Contato</h2>
          <div className="space-y-3 text-sm text-white/80">
            <p>Av. L.A.P. Rodesindo Pavan, nº 3996<br />Praia do Estaleiro, Balneário Camboriú - SC<br />CEP 88334-000</p>
            <a
              href="tel:+554799112-5200"
              className="block transition-opacity duration-300 hover:opacity-70"
            >
              Tel: (47) 9 9112-5200
            </a>
            <a
              href="https://wa.me/5547991125300"
              target="_blank"
              rel="noreferrer"
              className="block transition-opacity duration-300 hover:opacity-70"
            >
              WhatsApp: (47) 9 9112-5300
            </a>
            <a
              href="mailto:pousada@estaleirovillage.com"
              className="block transition-opacity duration-300 hover:opacity-70"
            >
              pousada@estaleirovillage.com
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Estaleiro Village"
              className="inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-70"
            >
              <InstagramIcon className="size-4" />
              Instagram
            </a>
          </div>
        </div>
```

- [ ] **Paso 2: Verificar build**

Correr: `cd estaleiro-village && npm run build`
Esperado: build exitoso sin errores TS.

- [ ] **Paso 3: Commit**

```bash
cd C:/Maxi/EV/estaleiro-village
git add src/components/layout/footer.tsx
git commit -m "fix(footer): usar pousada@ como email y agregar teléfono/WhatsApp reales"
```

---

### Task 1.2: Corregir datos de contacto en sección Location

**Files:**
- Modify: `estaleiro-village/src/components/sections/location.tsx`

- [ ] **Paso 1: Reemplazar contenido de contacto**

Reemplazar todo el `<div className="mt-6 space-y-6 text-base leading-7 text-muted-foreground">` (líneas 14-43) con:

```tsx
          <div className="mt-6 space-y-6 text-base leading-7 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-ev-neutral-dark">Endereço</h3>
              <p>
                Av. L.A.P. Rodesindo Pavan, nº 3996
                <br />
                Praia do Estaleiro
                <br />
                Balneário Camboriú - SC, CEP 88334-000
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-ev-neutral-dark">Telefone</h3>
              <a
                href="tel:+554799112-5200"
                className="text-ev-primary transition hover:underline"
              >
                (47) 9 9112-5200
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-ev-neutral-dark">WhatsApp</h3>
              <a
                href="https://wa.me/5547991125300"
                target="_blank"
                rel="noreferrer"
                className="text-ev-primary transition hover:underline"
              >
                (47) 9 9112-5300
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-ev-neutral-dark">E-mail</h3>
              <a
                href="mailto:pousada@estaleirovillage.com"
                className="text-ev-primary transition hover:underline"
              >
                pousada@estaleirovillage.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-ev-neutral-dark">Instagram</h3>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-ev-primary transition hover:underline"
              >
                @pousadaestaleirovillageoficial
              </a>
            </div>
          </div>
```

- [ ] **Paso 2: Actualizar coordenadas del mapa para que refleje la ubicación real**

Reemplazar la URL del iframe (línea 49):
```tsx
            src="https://www.google.com/maps?q=Pousada+Estaleiro+Village+Balneario+Camboriu&z=15&output=embed"
```

- [ ] **Paso 3: Build y commit**

```bash
cd C:/Maxi/EV/estaleiro-village
npm run build
git add src/components/sections/location.tsx
git commit -m "fix(location): agregar teléfono, WhatsApp, dirección completa y email correcto"
```

---

### Task 1.3: Corregir typos ortográficos en /a-pousada y /eventos

**Files:**
- Modify: `estaleiro-village/src/app/a-pousada/page.tsx`
- Modify: `estaleiro-village/src/data/eventos.ts`
- Modify: `estaleiro-village/src/components/eventos/contact-form.tsx`

- [ ] **Paso 1: Listar typos encontrados**

Typos a corregir (buscar y reemplazar manualmente verificando contexto):

En `src/app/a-pousada/page.tsx`:
- `Cafe da Manha` → `Café da Manhã`
- `cafe da manha` → `café da manhã` (en minúsculas si aparece)
- `comecar` → `começar`
- `preparado` (ya está bien)
- Cualquier `nao` suelto → `não`

En `src/data/eventos.ts`:
- `Comemoracoes` → `Comemorações`
- `cerimonias` → `cerimônias`
- `inesqueciveis` → `inesquecíveis`
- `cenario` → `cenário`
- `unico` → `único`
- `Confraternizacoes` → `Confraternizações`
- `retiros` OK (sin tilde)
- `Espaco` → `Espaço`
- `reconexao` → `reconexão`
- `Reunioes` → `Reuniões`
- `reunioes` → `reuniões`
- `produtivas` OK
- `Ate 100` → `Até 100`
- `espaco` → `espaço`
- `A beira-mar` → `À beira-mar`

En `src/components/eventos/contact-form.tsx` (revisar TODAS las etiquetas y placeholders):
- `solicitacao` / `Solicitar Solicitacao` → `solicitação` / `Enviar solicitação`
- `Orcamento` → `Orçamento`
- `opcao` → `opção`
- `E-mail` OK
- `Telefone` OK
- `Mensagem` OK

- [ ] **Paso 2: Ejecutar los reemplazos con Edit tool**

Para cada archivo listado, usar el tool `Edit` o `sed` para corregir cada typo. Verificar que el reemplazo no rompa otras ocurrencias legítimas.

- [ ] **Paso 3: Buscar typos residuales en el resto del código**

Correr en bash:
```bash
cd C:/Maxi/EV/estaleiro-village
grep -rn "Cafe da Manha\|Comemoracoes\|Confraternizacoes\|Orcamento\|solicitacao\|Espaco\|Reunioes\|inesqueciveis\|reconexao" src/ || echo "Sin typos residuales"
```

Si hay resultados, corregirlos.

- [ ] **Paso 4: Build y commit**

```bash
npm run build
git add -A src/
git commit -m "fix(copy): corregir acentos y cedillas en portugués brasileño"
```

---

### Task 1.4: Fix link "Ver detalhes" en RoomCard (temporal — enlace a sección hash hasta Fase 3)

**Files:**
- Modify: `estaleiro-village/src/components/accommodations/room-card.tsx`

- [ ] **Paso 1: Convertir botón a link a la página de detalle**

El dynamic route `/acomodacoes/[slug]` se crea en Fase 3. Por ahora, que el botón apunte ahí para no tener link muerto.

Reemplazar el bloque del botón "Ver detalhes" (líneas 112-119):

```tsx
        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <p className="text-sm font-medium text-ev-neutral-dark">
            A partir de <span className="text-base text-ev-primary">R$ {room.priceFrom}</span>/noite
          </p>
          <Link
            href={`/acomodacoes/${room.id}`}
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Ver detalhes
          </Link>
        </div>
```

Agregar imports al top del archivo (después de la línea 5):
```tsx
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
```

Y quitar el import `Button` si ya no se usa.

- [ ] **Paso 2: Build**

```bash
npm run build
```

Nota: el build va a tirar 404 al visitar `/acomodacoes/studio-superior` pero no rompe la build porque la ruta se resuelve dinámicamente en runtime. Eso se completa en Fase 3.

- [ ] **Paso 3: Commit**

```bash
git add src/components/accommodations/room-card.tsx
git commit -m "fix(room-card): conectar botón 'Ver detalhes' al slug dinámico de la acomodación"
```

---

## FASE 2 — Botón WhatsApp flotante (alto impacto de conversión)

~1h. El original no lo tiene, es ventaja inmediata.

### Task 2.1: Crear componente WhatsAppFloat

**Files:**
- Create: `estaleiro-village/src/components/ui/whatsapp-float.tsx`

- [ ] **Paso 1: Crear el componente**

```tsx
import Link from "next/link"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.057 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.71 1.453h.005c6.554 0 11.89-5.335 11.893-11.892C23.915 5.335 18.578 0 12.057 0zm0 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.437-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884z" />
    </svg>
  )
}

export default function WhatsAppFloat() {
  return (
    <Link
      href="https://wa.me/5547991125300?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20Pousada%20Estaleiro%20Village."
      target="_blank"
      rel="noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1DA851] sm:bottom-8 sm:right-8"
    >
      <WhatsAppIcon className="size-7" />
    </Link>
  )
}
```

- [ ] **Paso 2: Montar el componente globalmente en el layout**

Modificar `estaleiro-village/src/app/layout.tsx` para importar y renderizar `<WhatsAppFloat />` justo antes del `</body>` (después del `<Footer />`):

```tsx
import WhatsAppFloat from "@/components/ui/whatsapp-float"
// ...
        <Footer />
        <WhatsAppFloat />
      </body>
```

- [ ] **Paso 3: Build y commit**

```bash
cd C:/Maxi/EV/estaleiro-village
npm run build
git add src/components/ui/whatsapp-float.tsx src/app/layout.tsx
git commit -m "feat(ui): agregar botón flotante de WhatsApp con mensaje pre-poblado"
```

---

## FASE 3 — Expandir acomodaciones de 4 a 11 tipos + páginas de detalle

~4-5h. Gap crítico del relevamiento: el original tiene 11 unidades, el rebuild solo 4.

### Task 3.1: Extender el tipo `RoomType` con campos de detalle

**Files:**
- Modify: `estaleiro-village/src/data/accommodations.ts`

- [ ] **Paso 1: Reemplazar la interface con la versión extendida**

Reemplazar las líneas 1-11 actuales con:

```ts
export type RoomCategory = "suite" | "studio" | "flat" | "chale" | "sobrado" | "loft" | "duplex"

export interface RoomType {
  id: string
  name: string
  type: RoomCategory
  shortDescription: string
  longDescription: string
  capacity: { adults: number; children: number }
  beds: string
  areaM2?: number
  view: "mar" | "jardim" | "mata" | "mista"
  hasKitchen: boolean
  amenities: string[]
  highlights: string[]
  mainImage: string
  gallery: string[]
  priceFrom: number
  petFriendly: boolean
}
```

- [ ] **Paso 2: Reemplazar `roomTypeLabels` con los 7 tipos**

```ts
export const roomTypeLabels: Record<RoomType["type"], string> = {
  suite: "Suítes",
  studio: "Studios",
  flat: "Flats",
  chale: "Chalés",
  sobrado: "Sobrados",
  loft: "Lofts",
  duplex: "Duplex",
}
```

- [ ] **Paso 3: Reemplazar el array `rooms` con los 11 tipos**

Reemplazar todo el bloque `export const rooms: RoomType[] = [...]` con:

```ts
export const rooms: RoomType[] = [
  {
    id: "suite-jardim",
    name: "Suíte Jardim",
    type: "suite",
    shortDescription:
      "Suíte aconchegante no térreo com sacada privativa e vista para o jardim da pousada.",
    longDescription:
      "Ideal para casais em busca de tranquilidade, a Suíte Jardim oferece uma cama de casal, decoração em tons naturais e acesso direto ao jardim exuberante da pousada. Pet friendly e climatizada, é o refúgio perfeito para desacelerar ao som do mar.",
    capacity: { adults: 2, children: 0 },
    beds: "1 cama de casal",
    view: "jardim",
    hasKitchen: false,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Frigobar", "Sacada privativa", "Roupas de cama e banho"],
    highlights: ["Ideal para casais", "Acesso ao jardim", "Pet friendly"],
    mainImage: "/assets/images/jardim_202.jpg",
    gallery: ["/assets/images/jardim_202.jpg", "/assets/images/47aad0_33762d8f54c04590aeb08d2109eceeb3_mv2.png"],
    priceFrom: 320,
    petFriendly: true,
  },
  {
    id: "studio",
    name: "Studio",
    type: "studio",
    shortDescription:
      "Studio aconchegante com mini cozinha equipada, ideal para estadias independentes.",
    longDescription:
      "Studio de térreo com vista ao jardim, cama queen, copa com mini geladeira, microondas e fogão. Espaço pensado para casais que querem autonomia durante a estadia. Pet friendly e com toda a comodidade do casal.",
    capacity: { adults: 2, children: 0 },
    beds: "1 cama queen",
    view: "jardim",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Mini cozinha", "Microondas", "Fogão", "Frigobar"],
    highlights: ["Mini cozinha", "Pet friendly", "Vista ao jardim"],
    mainImage: "/assets/images/Studio_20Sup_20cama.jpg",
    gallery: ["/assets/images/Studio_20Sup_20cama.jpg", "/assets/images/IMG_20251125_150745.jpg"],
    priceFrom: 340,
    petFriendly: true,
  },
  {
    id: "studio-superior",
    name: "Studio Superior",
    type: "studio",
    shortDescription:
      "Studio no primeiro piso com copa equipada, sala integrada e mais espaço para casais.",
    longDescription:
      "Acomodação superior com copa completa (geladeira, microondas, fogão), sala integrada e cama queen. Ideal para casais que preferem estadias de mais dias com autonomia e privacidade, em andar elevado com melhor ventilação.",
    capacity: { adults: 2, children: 1 },
    beds: "1 cama queen",
    view: "jardim",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Copa equipada", "Sala integrada", "Frigobar", "Sacada"],
    highlights: ["Sala integrada", "Copa completa", "Primeiro piso"],
    mainImage: "/assets/images/Studio_20Sup_20cama.jpg",
    gallery: ["/assets/images/Studio_20Sup_20cama.jpg", "/assets/images/IMG_20251125_150745.jpg"],
    priceFrom: 380,
    petFriendly: true,
  },
  {
    id: "flat",
    name: "Flat",
    type: "flat",
    shortDescription:
      "Flat amplo com mini cozinha, varanda com rede e espaço para até 4 pessoas.",
    longDescription:
      "Flat espaçoso com cama queen, mini cozinha equipada e varanda com rede — perfeito para quem quer relaxar entre mergulhos no mar. Permite cama extra para acomodar até 4 hóspedes.",
    capacity: { adults: 2, children: 2 },
    beds: "1 cama queen + opção de cama extra",
    view: "mista",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Mini cozinha", "Varanda com rede", "Frigobar"],
    highlights: ["Varanda com rede", "Cama extra disponível", "Pet friendly"],
    mainImage: "/assets/images/flat1.jpg",
    gallery: ["/assets/images/flat1.jpg", "/assets/images/frente_20mar_202.jpg"],
    priceFrom: 420,
    petFriendly: true,
  },
  {
    id: "loft",
    name: "Loft",
    type: "loft",
    shortDescription:
      "Loft no primeiro piso com cozinha conjugada e sacada com rede para descansar ao ar livre.",
    longDescription:
      "Ambiente integrado com cozinha equipada, cama queen e sacada com rede. A vista para o jardim e a brisa do mar tornam o Loft um dos favoritos de casais que buscam aconchego em estadias curtas ou prolongadas.",
    capacity: { adults: 2, children: 0 },
    beds: "1 cama queen",
    view: "jardim",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Cozinha conjugada", "Sacada com rede", "Frigobar"],
    highlights: ["Sacada com rede", "Cozinha integrada", "Primeiro piso"],
    mainImage: "/assets/images/flat1.jpg",
    gallery: ["/assets/images/flat1.jpg", "/assets/images/jardim_202.jpg"],
    priceFrom: 440,
    petFriendly: true,
  },
  {
    id: "suite-frente-mar",
    name: "Suíte Frente Mar",
    type: "suite",
    shortDescription:
      "Nossa suíte mais exclusiva, com vista panorâmica para o oceano e opção de hidromassagem.",
    longDescription:
      "Suíte premium com vista direta para o mar da Praia do Estaleiro. Disponível em duas configurações: uma cama king-size ou duas camas de solteiro. Algumas unidades contam com banheira de hidromassagem — consulte na reserva.",
    capacity: { adults: 2, children: 1 },
    beds: "1 cama king ou 2 camas de solteiro",
    view: "mar",
    hasKitchen: false,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Frigobar", "Vista mar", "Hidromassagem (consultar)"],
    highlights: ["Vista panorâmica ao mar", "Hidromassagem disponível", "Opção king ou solteiro"],
    mainImage: "/assets/images/frente_20mar_202.jpg",
    gallery: ["/assets/images/frente_20mar_202.jpg", "/assets/images/54661554235_216e580305.jpg"],
    priceFrom: 680,
    petFriendly: true,
  },
  {
    id: "torre-oceano",
    name: "Torre Oceano",
    type: "duplex",
    shortDescription:
      "Duplex de luxo com sala no térreo e suíte superior com vista 270° ao oceano.",
    longDescription:
      "Torre Oceano é um duplex exclusivo: sala integrada no primeiro piso e suíte no andar superior, com vista 270° ao oceano. Cama king, mini cozinha completa e a experiência mais cinematográfica da pousada — ideal para aniversários e lua de mel.",
    capacity: { adults: 2, children: 0 },
    beds: "1 cama king",
    view: "mar",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Mini cozinha", "Vista 270° ao oceano", "Duplex"],
    highlights: ["Duplex com sala separada", "Vista 270° ao oceano", "Ideal lua de mel"],
    mainImage: "/assets/images/frente_20mar_202.jpg",
    gallery: ["/assets/images/frente_20mar_202.jpg", "/assets/images/54661554235_216e580305.jpg"],
    priceFrom: 780,
    petFriendly: true,
  },
  {
    id: "chale-b",
    name: "Chalé B",
    type: "chale",
    shortDescription:
      "Chalé familiar com 2 dormitórios, cozinha equipada e espaço para até 4 pessoas.",
    longDescription:
      "Perfeito para famílias: dois dormitórios com camas queen, sala, cozinha completa e área privativa cercada pela mata nativa. Pet friendly, com estacionamento próprio e churrasqueira opcional.",
    capacity: { adults: 4, children: 2 },
    beds: "2 camas queen",
    view: "mata",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Cozinha equipada", "2 dormitórios", "Estacionamento"],
    highlights: ["2 dormitórios", "Família", "Pet friendly"],
    mainImage: "/assets/images/sobrado_20ricardo.jpg",
    gallery: ["/assets/images/sobrado_20ricardo.jpg", "/assets/images/jardim_202.jpg"],
    priceFrom: 520,
    petFriendly: true,
  },
  {
    id: "chale-c",
    name: "Chalé C",
    type: "chale",
    shortDescription:
      "Chalé amplo de 70 m² com 3 dormitórios, lavabo e ideal para grupos até 5 pessoas.",
    longDescription:
      "Chalé de 70 m² com três dormitórios (3 camas de solteiro ou 2 camas queen conforme configuração), lavabo extra, sala espaçosa e cozinha completa. Ideal para grupos de amigos ou famílias estendidas.",
    capacity: { adults: 5, children: 2 },
    areaM2: 70,
    beds: "3 camas de solteiro ou 2 camas queen",
    view: "mata",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Cozinha equipada", "3 dormitórios", "Lavabo", "Estacionamento"],
    highlights: ["70 m²", "3 dormitórios", "Lavabo extra"],
    mainImage: "/assets/images/sobrado_20ricardo.jpg",
    gallery: ["/assets/images/sobrado_20ricardo.jpg", "/assets/images/jardim_202.jpg"],
    priceFrom: 620,
    petFriendly: true,
  },
  {
    id: "duplex-c",
    name: "Duplex C",
    type: "duplex",
    shortDescription:
      "Sobrado duplex de 70 m² com 1 suíte + 2 quartos, ideal para grupos até 6 pessoas.",
    longDescription:
      "Sobrado duplex com 70 m², distribuído em 1 suíte master + 2 quartos (6 camas de solteiro ou 3 de casal). Perfeito para viagens em grupo: cozinha completa, dois andares, privacidade entre quartos e espaço comum amplo.",
    capacity: { adults: 6, children: 2 },
    areaM2: 70,
    beds: "6 camas de solteiro ou 3 de casal",
    view: "mata",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Cozinha equipada", "Duplex", "1 suíte + 2 quartos"],
    highlights: ["Sobrado duplex", "70 m²", "Grupos até 6"],
    mainImage: "/assets/images/sobrado_20ricardo.jpg",
    gallery: ["/assets/images/sobrado_20ricardo.jpg", "/assets/images/jardim_202.jpg"],
    priceFrom: 720,
    petFriendly: true,
  },
  {
    id: "sobrado-frente-mar",
    name: "Sobrado Frente Mar",
    type: "sobrado",
    shortDescription:
      "Nossa acomodação mais exclusiva: sobrado com vista mar, hidromassagem e churrasqueira privativa.",
    longDescription:
      "A jóia da pousada. Sobrado com vista frontal ao mar no andar superior, banheira de hidromassagem, churrasqueira privativa e cama queen + cama de solteiro opcional. Único no complexo com banheira e churrasqueira — a experiência mais completa para casais que buscam exclusividade.",
    capacity: { adults: 2, children: 1 },
    beds: "1 cama queen + 1 cama de solteiro (opcional)",
    view: "mar",
    hasKitchen: true,
    amenities: ["Wi-Fi", "Ar-condicionado", "TV", "Cozinha equipada", "Hidromassagem", "Churrasqueira privativa", "Vista mar"],
    highlights: ["Hidromassagem", "Churrasqueira privativa", "Vista mar superior"],
    mainImage: "/assets/images/frente_20mar_202.jpg",
    gallery: ["/assets/images/frente_20mar_202.jpg", "/assets/images/54661554235_216e580305.jpg", "/assets/images/sobrado_20ricardo.jpg"],
    priceFrom: 880,
    petFriendly: true,
  },
]
```

Notas de data:
- Todos `petFriendly: true` (el original marca pet friendly en todas las unidades).
- `priceFrom` son estimaciones conservadoras; marcar con TODO para validar con el cliente antes de entrega.
- `gallery` reusa las 2 fotos existentes por acomodación — Fase 10 agrega más si el cliente entrega material.

- [ ] **Paso 4: Build y commit**

```bash
cd C:/Maxi/EV/estaleiro-village
npm run build
git add src/data/accommodations.ts
git commit -m "feat(data): expandir catálogo de acomodaciones de 4 a 11 tipos según sitio original"
```

---

### Task 3.2: Actualizar la preview en home para mostrar 4 destacadas

**Files:**
- Modify: `estaleiro-village/src/data/homepage.ts`
- Modify: `estaleiro-village/src/components/sections/accommodations-preview.tsx`

- [ ] **Paso 1: Revisar qué usa `accommodations-preview.tsx`**

Leer el componente. Si lee de `homepage.ts`, ajustar ahí. Si lee de `accommodations.ts` con un filter/slice, garantizar que muestre las 4 destacadas:

1. `suite-frente-mar` (premium)
2. `sobrado-frente-mar` (exclusivo)
3. `torre-oceano` (único duplex frente mar)
4. `flat` (más vendido, familias)

- [ ] **Paso 2: Asegurar que el CTA "Ver todas las acomodações" linkee a /acomodacoes**

El link ya existe; confirmar.

- [ ] **Paso 3: Build y commit**

```bash
npm run build
git add src/data/homepage.ts src/components/sections/accommodations-preview.tsx
git commit -m "feat(home): mostrar 4 acomodaciones destacadas en preview"
```

---

### Task 3.3: Crear dynamic route `/acomodacoes/[slug]` con página de detalle

**Files:**
- Create: `estaleiro-village/src/app/acomodacoes/[slug]/page.tsx`

- [ ] **Paso 1: Crear el directorio y la página**

```bash
cd C:/Maxi/EV/estaleiro-village
mkdir -p src/app/acomodacoes/[slug]
```

Contenido completo de `src/app/acomodacoes/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Users, BedDouble, Ruler, Eye, UtensilsCrossed, PawPrint, ArrowLeft } from "lucide-react"

import { rooms } from "@/data/accommodations"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { createMetadata } from "@/lib/metadata"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const room = rooms.find((r) => r.id === slug)
  if (!room) return createMetadata({ title: "Acomodação não encontrada", path: "/acomodacoes" })

  return createMetadata({
    title: `${room.name} | Estaleiro Village`,
    description: room.shortDescription,
    path: `/acomodacoes/${room.id}`,
  })
}

const viewLabels: Record<string, string> = {
  mar: "Vista Mar",
  jardim: "Vista Jardim",
  mata: "Vista Mata",
  mista: "Vista Mista",
}

export default async function AccommodationDetailPage({ params }: PageProps) {
  const { slug } = await params
  const room = rooms.find((r) => r.id === slug)

  if (!room) notFound()

  return (
    <main>
      {/* Hero con imagen principal */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={room.mainImage}
          alt={room.name}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <Link
            href="/acomodacoes"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="size-4" /> Todas as acomodações
          </Link>
          <h1 className="font-heading text-4xl text-white sm:text-5xl">
            {room.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg">
            {room.shortDescription}
          </p>
        </div>
      </section>

      {/* Info destacada */}
      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl text-ev-neutral-dark sm:text-3xl">
                Sobre a acomodação
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {room.longDescription}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-ev-neutral-dark">Destaques</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {room.highlights.map((h) => (
                  <Badge key={h} variant="muted" className="bg-ev-gold/10 text-ev-neutral-dark">
                    {h}
                  </Badge>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-xl text-ev-neutral-dark">Comodidades</h3>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-ev-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card lateral de specs + CTA */}
          <aside className="self-start rounded-2xl border border-black/10 bg-ev-neutral-light p-6 shadow-sm lg:sticky lg:top-24">
            <h3 className="font-heading text-xl text-ev-neutral-dark">Detalhes</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                <div>
                  <dt className="font-medium text-ev-neutral-dark">Capacidade</dt>
                  <dd className="text-muted-foreground">
                    {room.capacity.adults} adultos
                    {room.capacity.children > 0 && `, até ${room.capacity.children} crianças`}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BedDouble className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                <div>
                  <dt className="font-medium text-ev-neutral-dark">Camas</dt>
                  <dd className="text-muted-foreground">{room.beds}</dd>
                </div>
              </div>
              {room.areaM2 && (
                <div className="flex items-start gap-3">
                  <Ruler className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                  <div>
                    <dt className="font-medium text-ev-neutral-dark">Área</dt>
                    <dd className="text-muted-foreground">{room.areaM2} m²</dd>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Eye className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                <div>
                  <dt className="font-medium text-ev-neutral-dark">Vista</dt>
                  <dd className="text-muted-foreground">{viewLabels[room.view]}</dd>
                </div>
              </div>
              {room.hasKitchen && (
                <div className="flex items-start gap-3">
                  <UtensilsCrossed className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                  <div>
                    <dt className="font-medium text-ev-neutral-dark">Cozinha</dt>
                    <dd className="text-muted-foreground">Equipada</dd>
                  </div>
                </div>
              )}
              {room.petFriendly && (
                <div className="flex items-start gap-3">
                  <PawPrint className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                  <div>
                    <dt className="font-medium text-ev-neutral-dark">Pet Friendly</dt>
                    <dd className="text-muted-foreground">Sim, trazemos seu melhor amigo</dd>
                  </div>
                </div>
              )}
            </dl>

            <div className="mt-6 border-t border-black/10 pt-5">
              <p className="text-sm text-muted-foreground">A partir de</p>
              <p className="font-heading text-3xl text-ev-primary">
                R$ {room.priceFrom}
                <span className="text-sm font-normal text-muted-foreground"> / noite</span>
              </p>
              <a
                href="https://book.omnibees.com/hotel/18298?lang=pt-BR&currencyId=16"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "default", size: "lg" }) + " mt-4 w-full"}
              >
                Reservar agora
              </a>
              <a
                href="https://wa.me/5547991125300?text=Ol%C3%A1!%20Gostaria%20de%20reservar%20a%20acomoda%C3%A7%C3%A3o%20"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "outline", size: "lg" }) + " mt-3 w-full"}
              >
                Falar no WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </Section>

      {/* Galería */}
      {room.gallery.length > 1 && (
        <Section className="bg-ev-neutral-light">
          <h2 className="font-heading text-2xl text-ev-neutral-dark sm:text-3xl">
            Galeria
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {room.gallery.map((src, i) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`${room.name} — foto ${i + 1}`}
                  fill
                  quality={85}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* CTA final */}
      <Section className="bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl text-ev-neutral-dark sm:text-3xl">
            Pronto para reservar {room.name}?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Garanta sua estadia no paraíso à beira-mar.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://book.omnibees.com/hotel/18298?lang=pt-BR&currencyId=16"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Reservar agora
            </a>
            <Link
              href="/acomodacoes"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Ver outras acomodações
            </Link>
          </div>
        </div>
      </Section>
    </main>
  )
}
```

- [ ] **Paso 2: Build — verificar que se generan 11 rutas estáticas**

```bash
npm run build
```
Esperado: output incluye `/acomodacoes/suite-jardim`, `/acomodacoes/studio`, etc. (11 rutas).

- [ ] **Paso 3: Commit**

```bash
git add src/app/acomodacoes/[slug]/page.tsx
git commit -m "feat(acomodacoes): crear páginas de detalle dinámicas por slug con SSG"
```

---

### Task 3.4: Actualizar filtros en /acomodacoes para los 7 categorías

**Files:**
- Modify: `estaleiro-village/src/app/acomodacoes/page.tsx`

- [ ] **Paso 1: Leer el archivo actual y localizar los filter buttons**

```bash
cat estaleiro-village/src/app/acomodacoes/page.tsx
```

- [ ] **Paso 2: Actualizar el estado de filter y los botones**

Los filtros deben cubrir las 7 categorías: `Todos | Suítes | Studios | Flats | Chalés | Sobrados | Lofts | Duplex`.

Reemplazar el array de filters con:

```tsx
const filters: Array<{ value: "all" | RoomCategory; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "suite", label: "Suítes" },
  { value: "studio", label: "Studios" },
  { value: "flat", label: "Flats" },
  { value: "chale", label: "Chalés" },
  { value: "sobrado", label: "Sobrados" },
  { value: "loft", label: "Lofts" },
  { value: "duplex", label: "Duplex" },
]
```

Asegurar que el import de `RoomCategory` venga de `@/data/accommodations`.

- [ ] **Paso 3: Build y commit**

```bash
npm run build
git add src/app/acomodacoes/page.tsx
git commit -m "feat(acomodacoes): actualizar filtros a 7 categorías completas"
```

---

## FASE 4 — Señales de confianza y certificaciones visibles

~1-2h. Hay 3 logos de certificaciones en `public/assets/logos/` que nadie muestra.

### Task 4.1: Agregar sección TrustBadges con Blue Flag, WTTC, PEV

**Files:**
- Create: `estaleiro-village/src/components/sections/trust-badges.tsx`
- Modify: `estaleiro-village/src/app/page.tsx`

- [ ] **Paso 1: Crear el componente TrustBadges**

Contenido completo:

```tsx
import Image from "next/image"

import { Section } from "@/components/ui/section"

const badges = [
  {
    src: "/assets/logos/Blue_Flag_Logo_svg.png",
    alt: "Certificación Blue Flag",
    title: "Bandeira Azul",
    description: "Praia do Estaleiro certificada",
  },
  {
    src: "/assets/logos/WTTC_logo_safe_travels-removebg-preview.png",
    alt: "WTTC Safe Travels",
    title: "Safe Travels",
    description: "Selo WTTC de hospitalidade segura",
  },
  {
    src: "/assets/logos/Riviera_Costa_Brava-LOGO_BLOG.png",
    alt: "Riviera Costa Brava",
    title: "Riviera Costa Brava",
    description: "Parceira oficial do destino",
  },
]

export default function TrustBadges() {
  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-ev-neutral-dark sm:text-3xl">
            Reconhecimentos e certificações
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Padrões internacionais de qualidade, segurança e sustentabilidade.
          </p>
        </div>

        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {badges.map((b) => (
            <li key={b.title} className="flex flex-col items-center text-center">
              <div className="relative flex h-20 w-28 items-center justify-center">
                <Image
                  src={b.src}
                  alt={b.alt}
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>
              <h3 className="mt-4 font-semibold text-ev-neutral-dark">{b.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{b.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
```

- [ ] **Paso 2: Montar en la home — después de `<Testimonials />`**

Editar `src/app/page.tsx`:

```tsx
import TrustBadges from "@/components/sections/trust-badges";
// ...
      <Testimonials />
      <TrustBadges />
      <Location />
```

- [ ] **Paso 3: Build y commit**

```bash
npm run build
git add src/components/sections/trust-badges.tsx src/app/page.tsx
git commit -m "feat(home): mostrar certificaciones Blue Flag, WTTC y Riviera Costa Brava"
```

---

### Task 4.2: Agregar badge "PEV Hall of Fame 2019" al SocialProofStrip

**Files:**
- Modify: `estaleiro-village/src/components/sections/social-proof-strip.tsx`

- [ ] **Paso 1: Reemplazar el 4º item (+30 años) para balancear 4 items en desktop**

Agregar un 5º item opcional o reemplazar `+30 anos` por PEV Hall of Fame. Decisión: mantener ambos sumando a 5 columnas (reajustar grid).

Reemplazar todo el contenido del `<div className="grid grid-cols-2 gap-6 md:flex md:items-center md:justify-center md:gap-0 md:divide-x md:divide-white/10">` con:

```tsx
        <div className="grid grid-cols-2 gap-6 md:flex md:items-center md:justify-center md:gap-0 md:divide-x md:divide-white/10">

          <div className="flex items-center gap-3 md:px-6">
            <div className="flex flex-col">
              <span className="text-3xl font-black leading-none text-ev-gold">9.1</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40">/ 10</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Booking.com</span>
              <span className="text-xs text-white/50">405 avaliações verificadas</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-6">
            <Star className="size-5 shrink-0 text-ev-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">TripAdvisor</span>
              <span className="text-xs text-white/50">Excelente</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-6">
            <Award className="size-5 shrink-0 text-ev-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Bandeira Azul</span>
              <span className="text-xs text-white/50">Certificação Blue Flag</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-6">
            <Trophy className="size-5 shrink-0 text-ev-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">PEV Hall of Fame</span>
              <span className="text-xs text-white/50">Reconhecimento 2019</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-6">
            <ThumbsUp className="size-5 shrink-0 text-ev-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">+30 anos</span>
              <span className="text-xs text-white/50">de hospitalidade</span>
            </div>
          </div>

        </div>
```

Agregar `Trophy` al import de lucide-react:
```tsx
import { Award, Star, ThumbsUp, Trophy } from "lucide-react";
```

- [ ] **Paso 2: Build y commit**

```bash
npm run build
git add src/components/sections/social-proof-strip.tsx
git commit -m "feat(social-proof): agregar badge PEV Hall of Fame 2019"
```

---

## FASE 5 — Destacar Pet Friendly en toda la app

~1h. Pet Friendly es un diferencial del original, casi invisible hoy.

### Task 5.1: Agregar sección Pet Friendly en `/a-pousada`

**Files:**
- Modify: `estaleiro-village/src/app/a-pousada/page.tsx`

- [ ] **Paso 1: Insertar bloque Pet Friendly después de la sección Comodidades**

Agregar en el lugar apropiado (después de "Comodidades" y antes de "Piscinas & Lazer"):

```tsx
      <Section className="bg-white">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <Badge variant="muted" className="bg-ev-gold/15 text-ev-neutral-dark">
              Pet Friendly
            </Badge>
            <h2 className="mt-3 font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
              Seu melhor amigo também é bem-vindo
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Somos Pet Friendly em todas as acomodações. Amamos animais e
              oferecemos estrutura para que sua família viaje completa: áreas
              verdes dentro da Mata Atlântica, caminhos para passeios e
              recepção calorosa para todos os porte.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-ev-neutral-dark sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <PawPrint className="size-4 text-ev-primary" /> Aceito em todas as unidades
              </li>
              <li className="flex items-center gap-2">
                <PawPrint className="size-4 text-ev-primary" /> Áreas verdes privativas
              </li>
              <li className="flex items-center gap-2">
                <PawPrint className="size-4 text-ev-primary" /> 9.000 m² em Mata Atlântica
              </li>
              <li className="flex items-center gap-2">
                <PawPrint className="size-4 text-ev-primary" /> Sem taxa adicional
              </li>
            </ul>
          </div>
          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl shadow-sm lg:order-2">
            <Image
              src="/assets/images/jardim_202.jpg"
              alt="Áreas verdes da pousada onde pets podem se divertir"
              fill
              quality={85}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>
```

Agregar imports:
```tsx
import { PawPrint } from "lucide-react"
import { Badge } from "@/components/ui/badge"
```

- [ ] **Paso 2: Build y commit**

```bash
npm run build
git add src/app/a-pousada/page.tsx
git commit -m "feat(a-pousada): agregar sección dedicada Pet Friendly"
```

---

### Task 5.2: Badge Pet Friendly en RoomCard

**Files:**
- Modify: `estaleiro-village/src/components/accommodations/room-card.tsx`

- [ ] **Paso 1: Insertar badge sobre la imagen cuando `room.petFriendly === true`**

Dentro del `<div className="relative aspect-video overflow-hidden">`, al final del bloque (antes de cerrar), agregar:

```tsx
        {room.petFriendly && (
          <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-ev-gold/95 px-2.5 py-1 text-xs font-semibold text-ev-neutral-dark shadow">
            <PawPrint className="size-3" /> Pet Friendly
          </div>
        )}
```

Agregar `PawPrint` al import de lucide-react:
```tsx
import { ChevronLeft, ChevronRight, PawPrint, Users } from "lucide-react"
```

- [ ] **Paso 2: Build y commit**

```bash
npm run build
git add src/components/accommodations/room-card.tsx
git commit -m "feat(room-card): mostrar badge Pet Friendly en tarjetas de acomodaciones"
```

---

## FASE 6 — Expandir /eventos a 10 tipos de servicios

~2h. El original promete 10 tipos de evento; hoy hay 4.

### Task 6.1: Expandir `data/eventos.ts` con los 10 tipos completos

**Files:**
- Modify: `estaleiro-village/src/data/eventos.ts`

- [ ] **Paso 1: Reemplazar el array completo**

```ts
export interface EventType {
  id: string
  icon: string
  title: string
  description: string
}

export const eventTypes: EventType[] = [
  {
    id: "casamentos",
    icon: "Heart",
    title: "Casamentos",
    description:
      "Realize seu sonho à beira-mar com cerimônias íntimas e inesquecíveis em um cenário natural único.",
  },
  {
    id: "aniversarios-infantis",
    icon: "PartyPopper",
    title: "Aniversários Infantis",
    description:
      "Festas ao ar livre com muita natureza, segurança e alegria para crianças e famílias.",
  },
  {
    id: "pet-friendly",
    icon: "PawPrint",
    title: "Eventos Pet Friendly",
    description:
      "Celebre com quem você ama, incluindo seu pet. Espaço adaptado para receber todos os tipos de família.",
  },
  {
    id: "eventos-holisticos",
    icon: "Flower2",
    title: "Eventos Holísticos",
    description:
      "Retiros de yoga, meditação, workshops de bem-estar — nossa conexão com a Mata Atlântica potencializa cada prática.",
  },
  {
    id: "producoes-fotograficas",
    icon: "Camera",
    title: "Produções Fotográficas",
    description:
      "Cenários de mar, mata e arquitetura charmosa. Ideal para ensaios, campanhas e produções de moda.",
  },
  {
    id: "corporativos",
    icon: "Briefcase",
    title: "Eventos Corporativos & Workshops",
    description:
      "Sala com infraestrutura completa para reuniões, treinamentos e confraternizações com sua equipe.",
  },
  {
    id: "eventos-culturais",
    icon: "Music",
    title: "Eventos Culturais",
    description:
      "Shows, saraus, apresentações — um palco natural à beira-mar para experiências culturais memoráveis.",
  },
  {
    id: "festas-fim-de-ano",
    icon: "Sparkles",
    title: "Festas de Fim de Ano",
    description:
      "Confraternizações natalinas e réveillons para empresas e famílias, com vista privilegiada ao mar.",
  },
  {
    id: "exposicoes",
    icon: "Images",
    title: "Exposições",
    description:
      "Espaços para exposições de arte, artesanato e projetos culturais em ambiente integrado à natureza.",
  },
  {
    id: "audiovisuais",
    icon: "Video",
    title: "Produções Audiovisuais",
    description:
      "Locação para filmes, séries, videoclipes e conteúdo digital. Cenários exclusivos à beira-mar.",
  },
]

export const statsItems = [
  { value: "Até 100", label: "pessoas" },
  { value: "À beira-mar", label: "espaço exclusivo" },
  { value: "Infraestrutura", label: "completa" },
]
```

- [ ] **Paso 2: Verificar que el componente `event-type-card.tsx` soporta todos los íconos**

Abrir `src/components/eventos/event-type-card.tsx`. Garantizar que el mapper de icon string → componente lucide incluye: `Heart`, `PartyPopper`, `PawPrint`, `Flower2`, `Camera`, `Briefcase`, `Music`, `Sparkles`, `Images`, `Video`.

Si falta algún mapping, agregarlo. Ejemplo:

```tsx
import { Heart, PartyPopper, PawPrint, Flower2, Camera, Briefcase, Music, Sparkles, Images, Video, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Heart,
  PartyPopper,
  PawPrint,
  Flower2,
  Camera,
  Briefcase,
  Music,
  Sparkles,
  Images,
  Video,
}
```

- [ ] **Paso 3: Build y commit**

```bash
npm run build
git add src/data/eventos.ts src/components/eventos/event-type-card.tsx
git commit -m "feat(eventos): expandir a 10 tipos de evento según sitio original"
```

---

## FASE 7 — Nueva página `/atividades` (atracciones regionales)

~2h. Gap detectado: el original tiene `/atividades` con atracciones turísticas del entorno. Suma mucho valor para clientes que planifican la estadía.

### Task 7.1: Crear data + página `/atividades`

**Files:**
- Create: `estaleiro-village/src/data/atividades.ts`
- Create: `estaleiro-village/src/app/atividades/page.tsx`

- [ ] **Paso 1: Crear el archivo de data**

`src/data/atividades.ts`:

```ts
export interface Atividade {
  id: string
  title: string
  description: string
  category: "aventura" | "familia" | "natureza" | "cultura"
  distanceKm?: number
}

export const atividadesProximas: Atividade[] = [
  {
    id: "beto-carrero",
    title: "Beto Carrero World",
    description: "O maior parque temático da América Latina, com atrações radicais, shows e mundo Hollywood.",
    category: "familia",
    distanceKm: 40,
  },
  {
    id: "parque-unipraias",
    title: "Parque Unipraias",
    description: "Bondinho panorâmico ligando as praias de Balneário Camboriú com vista 360° do litoral.",
    category: "aventura",
    distanceKm: 12,
  },
  {
    id: "oceanic-aquarium",
    title: "Oceanic Aquarium",
    description: "Aquário temático em Penha com exposições interativas e mais de 250 espécies marinhas.",
    category: "familia",
    distanceKm: 35,
  },
  {
    id: "roda-gigante",
    title: "Roda Gigante FG Big Wheel",
    description: "Uma das maiores rodas-gigantes da América Latina, com vista panorâmica de BC e do oceano.",
    category: "familia",
    distanceKm: 10,
  },
  {
    id: "escola-caes-guia",
    title: "Escola de Cães-Guia",
    description: "Visitação educativa à escola que treina cães-guia para pessoas com deficiência visual.",
    category: "cultura",
    distanceKm: 15,
  },
  {
    id: "parque-raimundo-malta",
    title: "Parque Ecológico Raimundo Malta",
    description: "Área de preservação com trilhas, mirantes e contato direto com a Mata Atlântica.",
    category: "natureza",
    distanceKm: 8,
  },
  {
    id: "centro-balneario",
    title: "Centro de Balneário Camboriú",
    description: "Avenida Atlântica, Praia Central, restaurantes, shoppings e vida noturna a 15 min da pousada.",
    category: "cultura",
    distanceKm: 15,
  },
]

export const atividadesDoLocal = [
  { id: "trilhas", title: "Trilhas na Mata Atlântica", description: "Explore 9.000 m² de reserva privada." },
  { id: "mergulho", title: "Mergulho", description: "Águas cristalinas da Praia do Estaleiro, ideais para snorkeling." },
  { id: "caiaque", title: "Caiaque e stand-up paddle", description: "Aluguel no local para atividades aquáticas." },
  { id: "escunas", title: "Passeios de escuna", description: "Saídas diárias pela costa de BC com parada em ilhas." },
  { id: "natacao", title: "Natação", description: "Praia Bandeira Azul, entre as mais limpas do litoral sul." },
  { id: "ciclismo", title: "Ciclismo", description: "Rotas cênicas pela Avenida Interpraias." },
]
```

- [ ] **Paso 2: Crear la página**

`src/app/atividades/page.tsx`:

```tsx
import Image from "next/image"

import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { atividadesProximas, atividadesDoLocal, type Atividade } from "@/data/atividades"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Atividades e Atrações | Estaleiro Village",
  description:
    "Atividades no local e atrações da região: Beto Carrero, Parque Unipraias, trilhas na Mata Atlântica e muito mais próximo à Pousada Estaleiro Village.",
  path: "/atividades",
})

const categoryLabels: Record<Atividade["category"], string> = {
  aventura: "Aventura",
  familia: "Família",
  natureza: "Natureza",
  cultura: "Cultura",
}

export default function AtividadesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] w-full overflow-hidden">
        <Image
          src="/assets/images/10309741543_e7d8ae74e6_c.jpg"
          alt="Natureza da Praia do Estaleiro"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl text-white sm:text-5xl">
            Atividades e Atrações
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg">
            Há muito o que descobrir — no refúgio e na região.
          </p>
        </div>
      </section>

      {/* Atividades no local */}
      <Section className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            No Estaleiro Village
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Nossos 9.000 m² de Mata Atlântica preservada oferecem atividades ao ar livre e contato direto com a natureza.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {atividadesDoLocal.map((a) => (
            <li
              key={a.id}
              className="rounded-2xl border border-black/5 bg-ev-neutral-light p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-heading text-lg text-ev-neutral-dark">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Atividades na região */}
      <Section className="bg-ev-neutral-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            Na região
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Atrações turísticas a poucos minutos da pousada: do maior parque temático da América Latina às vistas panorâmicas de Balneário Camboriú.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {atividadesProximas.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <Badge variant="muted" className="bg-ev-primary/10 text-ev-primary">
                  {categoryLabels[a.category]}
                </Badge>
                {a.distanceKm && (
                  <span className="text-xs text-muted-foreground">
                    {a.distanceKm} km da pousada
                  </span>
                )}
              </div>
              <h3 className="font-heading text-xl text-ev-neutral-dark">{a.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{a.description}</p>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
}
```

- [ ] **Paso 3: Agregar `/atividades` al header navigation**

Modificar `src/components/layout/header.tsx` y `src/components/layout/footer.tsx`:

```tsx
const navigationLinks = [
  { href: '/', label: 'Início' },
  { href: '/a-pousada', label: 'A Pousada' },
  { href: '/a-historia', label: 'A História' },
  { href: '/acomodacoes', label: 'Acomodações' },
  { href: '/atividades', label: 'Atividades' },
  { href: '/eventos', label: 'Eventos' },
]
```

Nota: 6 items en desktop nav — verificar que quepa bien. Si hay overflow, reducir gap de `gap-8` a `gap-6`.

- [ ] **Paso 4: Build y commit**

```bash
npm run build
git add src/data/atividades.ts src/app/atividades/page.tsx src/components/layout/header.tsx src/components/layout/footer.tsx
git commit -m "feat(atividades): crear página de atividades locais y atracciones regionales"
```

---

## FASE 8 — Expandir Historia con narrativa familiar

~1-2h. Historia fuerte del original (pareja argentina 1986, 4 hijos) hoy infravalorada.

### Task 8.1: Expandir timeline con hitos familiares

**Files:**
- Modify: `estaleiro-village/src/components/sections/timeline.tsx` (si tiene data inline) O `src/data/historia.ts`

- [ ] **Paso 1: Inspeccionar timeline.tsx y extraer datos**

```bash
cat estaleiro-village/src/components/sections/timeline.tsx
```

Si los datos están inline, refactorizar a `src/data/historia.ts` para mantener single source of truth.

- [ ] **Paso 2: Data file `src/data/historia.ts`**

```ts
export interface TimelineItem {
  year: string
  title: string
  description: string
  image: string
}

export const timelineItems: TimelineItem[] = [
  {
    year: "1986",
    title: "O começo de um sonho",
    description:
      "David e Kitty, casal argentino apaixonado pelo Brasil, fundam a Pousada Estaleiro Village com duas cabanas em área de Mata Atlântica preservada. Nascia ali uma filosofia de hospitalidade integrada à natureza.",
    image: "/assets/images/47aad0_749ac6df1a064052b333b452692f9592_mv2_d_3968_2976_s_4_2.jpg",
  },
  {
    year: "1993",
    title: "A família cresce",
    description:
      "Alejandro, o filho mais velho, chega ao Brasil e se integra à gestão da pousada. Mais tarde, casa-se com Eliana, ampliando a segunda geração da família Estaleiro Village.",
    image: "/assets/images/jardim_202.jpg",
  },
  {
    year: "1998-2000",
    title: "Novos rostos na pousada",
    description:
      "Nascem Ornella (1998) e Alain David (2000), já em território brasileiro. A pousada começa a crescer de duas cabanas para um pequeno complexo turístico que preserva a alma familiar.",
    image: "/assets/images/frente_20mar_202.jpg",
  },
  {
    year: "2010",
    title: "Certificação Blue Flag",
    description:
      "A Praia do Estaleiro conquista o selo Blue Flag, um dos poucos do sul do Brasil — reconhecimento internacional pela qualidade da água, gestão ambiental e segurança do balneário.",
    image: "/assets/images/10430020596_736e0f388b_c.jpg",
  },
  {
    year: "2019",
    title: "PEV Hall of Fame",
    description:
      "A pousada recebe o reconhecimento PEV Hall of Fame, somando-se a outros prêmios como KAYAK e parcerias com a Riviera Costa Brava.",
    image: "/assets/images/54661554235_216e580305.jpg",
  },
  {
    year: "2026",
    title: "40 anos de hospitalidade",
    description:
      "Hoje, com 11 tipos de acomodações e 9.000 m² de Mata Atlântica, seguimos fiéis ao sonho original: receber hóspedes como família, preservar a natureza e oferecer uma experiência única à beira-mar.",
    image: "/assets/images/47aad0_33762d8f54c04590aeb08d2109eceeb3_mv2.png",
  },
]
```

- [ ] **Paso 3: Actualizar `timeline.tsx` para consumir `historia.ts`**

Import: `import { timelineItems } from "@/data/historia"`. Usar `timelineItems` en vez del array inline.

- [ ] **Paso 4: Expandir el texto intro en `/a-historia` page**

Editar `src/app/a-historia/page.tsx`. Sustituir/mejorar los párrafos de intro con:

> "Tudo começou em 1986, quando David e Kitty — um casal argentino apaixonado pelo Brasil — ergueram as primeiras duas cabanas em meio à Mata Atlântica da Praia do Estaleiro. O sonho era simples e profundo: um refúgio onde hospedagem, natureza e família caminhassem juntas.
> 
> Quatro décadas depois, a pousada é hoje um charmoso complexo turístico com 11 acomodações, 9.000 m² de reserva privada e três gerações da família envolvidas diretamente na operação. A filosofia original se mantém: 'respeito e integração à mata' — e cada hóspede é recebido como parte da família Estaleiro Village."

- [ ] **Paso 5: Build y commit**

```bash
npm run build
git add src/data/historia.ts src/components/sections/timeline.tsx src/app/a-historia/page.tsx
git commit -m "feat(a-historia): expandir narrativa familiar (David y Kitty, 1986) y timeline completa"
```

---

## FASE 9 — Página `/galeria` con lightbox

~2h. El original no tiene galería unificada, pero es esperado en un hotel profesional. El rebuild ya tiene una galería pequeña en `/a-pousada`; vamos a crear una dedicada.

### Task 9.1: Crear página galería con lightbox

**Files:**
- Create: `estaleiro-village/src/data/galeria.ts`
- Create: `estaleiro-village/src/components/ui/lightbox.tsx`
- Create: `estaleiro-village/src/app/galeria/page.tsx`

- [ ] **Paso 1: Data con categorías de fotos**

`src/data/galeria.ts`:

```ts
export interface GaleriaItem {
  src: string
  alt: string
  category: "acomodacoes" | "praia" | "pousada" | "eventos" | "gastronomia"
}

export const galeriaItems: GaleriaItem[] = [
  { src: "/assets/images/frente_20mar_202.jpg", alt: "Vista frontal da pousada e o mar", category: "pousada" },
  { src: "/assets/images/jardim_202.jpg", alt: "Jardim da pousada em meio à Mata Atlântica", category: "pousada" },
  { src: "/assets/images/47aad0_33762d8f54c04590aeb08d2109eceeb3_mv2.png", alt: "Área externa e piscina", category: "pousada" },
  { src: "/assets/images/Studio_20Sup_20cama.jpg", alt: "Studio Superior com cama queen", category: "acomodacoes" },
  { src: "/assets/images/flat1.jpg", alt: "Flat com vista para o mar", category: "acomodacoes" },
  { src: "/assets/images/sobrado_20ricardo.jpg", alt: "Sobrado cercado de natureza", category: "acomodacoes" },
  { src: "/assets/images/IMG_20251125_150745.jpg", alt: "Interior aconchegante de acomodação", category: "acomodacoes" },
  { src: "/assets/images/54661554235_216e580305.jpg", alt: "Suíte Frente Mar", category: "acomodacoes" },
  { src: "/assets/images/flickr/praia-04.jpg", alt: "Praia do Estaleiro — Bandeira Azul", category: "praia" },
  { src: "/assets/images/10309741543_e7d8ae74e6_c.jpg", alt: "Mar e natureza da Praia do Estaleiro", category: "praia" },
  { src: "/assets/images/10430020596_736e0f388b_c.jpg", alt: "Paisagem da região", category: "praia" },
  { src: "/assets/images/7236364408_92d3d48c97_c.jpg", alt: "Estrutura externa da pousada", category: "pousada" },
  { src: "/assets/images/36829524845_8e2b17b5b4_c.jpg", alt: "Área gastronômica", category: "gastronomia" },
  { src: "/assets/images/flickr/cafe-04.jpg", alt: "Café da manhã", category: "gastronomia" },
  { src: "/assets/images/flickr/pousada-08.jpg", alt: "Área de lazer da pousada", category: "pousada" },
  { src: "/assets/images/47aad0_749ac6df1a064052b333b452692f9592_mv2_d_3968_2976_s_4_2.jpg", alt: "Pousada em perspectiva histórica", category: "pousada" },
]
```

- [ ] **Paso 2: Componente Lightbox simple**

`src/components/ui/lightbox.tsx`:

```tsx
"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxProps {
  images: { src: string; alt: string }[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose, onPrev, onNext])

  const current = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Galeria de imagens"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar galeria"
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="size-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Foto anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Próxima foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}

      <div className="relative h-full max-h-[90vh] w-full max-w-6xl">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          quality={90}
          sizes="100vw"
          className="object-contain"
        />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-white/70">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}
```

- [ ] **Paso 3: Página galería**

`src/app/galeria/page.tsx`:

```tsx
"use client"

import { useState, useMemo } from "react"
import Image from "next/image"

import { Section } from "@/components/ui/section"
import Lightbox from "@/components/ui/lightbox"
import { galeriaItems, type GaleriaItem } from "@/data/galeria"

const categories: Array<{ value: "all" | GaleriaItem["category"]; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "pousada", label: "Pousada" },
  { value: "acomodacoes", label: "Acomodações" },
  { value: "praia", label: "Praia" },
  { value: "gastronomia", label: "Gastronomia" },
  { value: "eventos", label: "Eventos" },
]

export default function GaleriaPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]["value"]>("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(
    () => (filter === "all" ? galeriaItems : galeriaItems.filter((i) => i.category === filter)),
    [filter]
  )

  return (
    <main>
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src="/assets/images/frente_20mar_202.jpg"
          alt="Galeria Estaleiro Village"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl text-white sm:text-5xl">Galeria</h1>
          <p className="mt-3 text-base text-white/90">Nossa pousada em imagens</p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setFilter(c.value)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                filter === c.value
                  ? "bg-ev-primary text-white"
                  : "bg-ev-neutral-light text-ev-neutral-dark hover:bg-ev-primary/10",
              ].join(" ")}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="relative aspect-[4/3] overflow-hidden rounded-xl transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ev-primary"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </Section>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))}
          onNext={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))}
        />
      )}
    </main>
  )
}
```

- [ ] **Paso 4: Agregar `/galeria` al header y footer nav**

Después de `Atividades`, antes de `Eventos`:

```tsx
  { href: '/galeria', label: 'Galeria' },
```

- [ ] **Paso 5: Build y commit**

```bash
npm run build
git add src/data/galeria.ts src/components/ui/lightbox.tsx src/app/galeria/page.tsx src/components/layout/header.tsx src/components/layout/footer.tsx
git commit -m "feat(galeria): crear página galería con filtros y lightbox navegable"
```

---

## FASE 10 — Optimización de imágenes (WebP + enhance script)

~1h + tiempo de ejecución del script con Gemini.

### Task 10.1: Configurar next.config.ts para optimizar imágenes

**Files:**
- Modify: `estaleiro-village/next.config.ts`

- [ ] **Paso 1: Habilitar formatos WebP/AVIF**

Asegurar que `next.config.ts` contenga:

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },
}

export default nextConfig
```

- [ ] **Paso 2: Build y commit**

```bash
npm run build
git add next.config.ts
git commit -m "perf(images): habilitar AVIF/WebP y extender cache TTL en next/image"
```

---

### Task 10.2: (Opcional — requiere GEMINI_API_KEY) Ejecutar enhance_images_nanobanana.py

**Files:**
- Use: `estaleiro-village/scripts/enhance_images_nanobanana.py`

- [ ] **Paso 1: Confirmar acceso al script y verificar variable de entorno**

```bash
cat estaleiro-village/scripts/enhance_images_nanobanana.py | head -50
echo "GEMINI_API_KEY is: ${GEMINI_API_KEY:+SET}"
```

Si no hay API key, **saltar esta tarea** y dejar nota en el plan: "Pendiente: ejecutar cuando se provea GEMINI_API_KEY".

- [ ] **Paso 2: Backup + dry run**

El script debería tener un flag `--dry-run`. Ejecutar primero eso y verificar output. Si genera archivos de backup, confirmar que van a `.backup-originals/`.

- [ ] **Paso 3: Ejecutar en un subconjunto piloto**

Aplicar solo a las 4 imágenes más importantes primero (hero + suite frente mar):
- `frente_20mar_202.jpg`
- `Studio_20Sup_20cama.jpg`
- `flat1.jpg`
- `sobrado_20ricardo.jpg`

Verificar visualmente que la calidad mejoró antes de correr sobre todas.

- [ ] **Paso 4: Commit con nota**

Si se ejecutó: commit normal. Si no: agregar al `docs/` una nota "Pending image enhancement — requires GEMINI_API_KEY".

---

## FASE 11 — SEO y Performance

~2h. Requisito para entrega profesional.

### Task 11.1: OG tags, twitter cards y metadata completa

**Files:**
- Modify: `estaleiro-village/src/lib/metadata.ts`
- Modify: `estaleiro-village/src/app/layout.tsx`

- [ ] **Paso 1: Revisar utility existente**

```bash
cat estaleiro-village/src/lib/metadata.ts
```

- [ ] **Paso 2: Ampliar `createMetadata` para incluir OG/Twitter**

Reemplazar el contenido completo con:

```ts
import type { Metadata } from "next"

const SITE_URL = "https://estaleirovillage.com"
const SITE_NAME = "Pousada Estaleiro Village"
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/frente_20mar_202.jpg`

export interface CreateMetadataInput {
  title: string
  description?: string
  path: string
  ogImage?: string
}

export function createMetadata({
  title,
  description,
  path,
  ogImage,
}: CreateMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`
  const image = ogImage ?? DEFAULT_OG_IMAGE
  const desc =
    description ??
    "Pousada boutique à beira-mar na Praia do Estaleiro, Balneário Camboriú. 40 anos de história, 11 acomodações, Mata Atlântica preservada e Bandeira Azul."

  return {
    title,
    description: desc,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: SITE_NAME,
      title,
      description: desc,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  }
}
```

- [ ] **Paso 3: Aplicar en layout.tsx default metadata**

Verificar que `src/app/layout.tsx` use `createMetadata` para el default.

- [ ] **Paso 4: Build y commit**

```bash
npm run build
git add src/lib/metadata.ts src/app/layout.tsx
git commit -m "feat(seo): metadata completa con OG, Twitter cards y canonicals"
```

---

### Task 11.2: robots.txt y sitemap.xml

**Files:**
- Create: `estaleiro-village/src/app/robots.ts`
- Create: `estaleiro-village/src/app/sitemap.ts`

- [ ] **Paso 1: robots.ts**

```ts
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://estaleirovillage.com/sitemap.xml",
  }
}
```

- [ ] **Paso 2: sitemap.ts — listar todas las rutas estáticas y dinámicas**

```ts
import type { MetadataRoute } from "next"
import { rooms } from "@/data/accommodations"

const SITE_URL = "https://estaleirovillage.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/a-pousada",
    "/a-historia",
    "/acomodacoes",
    "/atividades",
    "/galeria",
    "/eventos",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  const roomRoutes = rooms.map((r) => ({
    url: `${SITE_URL}/acomodacoes/${r.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...roomRoutes]
}
```

- [ ] **Paso 3: Build, verificar y commit**

```bash
npm run build
# Verificar visiting localhost:3000/robots.txt y /sitemap.xml una vez levantado en dev
git add src/app/robots.ts src/app/sitemap.ts
git commit -m "feat(seo): agregar robots.txt y sitemap.xml dinámicos"
```

---

### Task 11.3: Schema.org LodgingBusiness JSON-LD

**Files:**
- Create: `estaleiro-village/src/components/schema-org.tsx`
- Modify: `estaleiro-village/src/app/layout.tsx`

- [ ] **Paso 1: Componente Schema.org**

```tsx
export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Pousada Estaleiro Village",
    description:
      "Pousada boutique à beira-mar na Praia do Estaleiro, Balneário Camboriú. 40 anos de hospitalidade, 11 acomodações, Mata Atlântica preservada e Bandeira Azul.",
    url: "https://estaleirovillage.com",
    telephone: "+55-47-99112-5200",
    image: "https://estaleirovillage.com/assets/images/frente_20mar_202.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. L.A.P. Rodesindo Pavan, nº 3996",
      addressLocality: "Balneário Camboriú",
      addressRegion: "SC",
      postalCode: "88334-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -26.9784,
      longitude: -48.6127,
    },
    priceRange: "$$",
    petsAllowed: true,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Ar-condicionado", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pet Friendly", value: true },
      { "@type": "LocationFeatureSpecification", name: "Estacionamento", value: true },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "9.1",
      bestRating: "10",
      ratingCount: "405",
    },
    sameAs: [
      "https://www.instagram.com/pousadaestaleirovillageoficial/",
      "https://www.facebook.com/estaleirovillage/",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

- [ ] **Paso 2: Inyectar en `<head>` del layout**

En `src/app/layout.tsx`, agregar dentro del `<body>` (o en `<head>` si hay el tag):

```tsx
import SchemaOrg from "@/components/schema-org"
// ...
<body>
  <SchemaOrg />
  {/* ... */}
</body>
```

- [ ] **Paso 3: Validar el schema**

Correr `npm run build` y copiar el JSON generado en https://validator.schema.org/ — que no tire warnings.

- [ ] **Paso 4: Commit**

```bash
git add src/components/schema-org.tsx src/app/layout.tsx
git commit -m "feat(seo): agregar JSON-LD LodgingBusiness schema"
```

---

## FASE 12 — QA final, mobile testing y entrega

~1-2h. Última validación antes de entregar.

### Task 12.1: Checklist de QA funcional

- [ ] **Paso 1: Correr dev server y visitar cada página**

```bash
cd C:/Maxi/EV/estaleiro-village
npm run dev
```

Abrir en navegador y revisar:
- [ ] `/` — Hero carga, social proof muestra 5 badges, testimonios, trust badges, location con datos nuevos
- [ ] `/a-pousada` — sin typos visibles, sección Pet Friendly visible, Piscina, Gastronomia, Galería
- [ ] `/a-historia` — timeline de 6 hitos, narrativa de fundadores expandida
- [ ] `/acomodacoes` — 11 tarjetas aparecen, 7 filtros funcionan (Todos + 6 categorías activas), badge Pet Friendly sobre cada imagen
- [ ] `/acomodacoes/suite-jardim` (y otros 10) — página de detalle carga, galería correcta, CTA booking + WhatsApp funcionan
- [ ] `/atividades` — ambas secciones (No local + Na região) aparecen
- [ ] `/galeria` — 16 fotos aparecen, filtros funcionan, lightbox abre, flechas + ESC cierran
- [ ] `/eventos` — 10 tipos de evento en grid, formulario visible

- [ ] **Paso 2: Validar todos los links externos**

En devtools console:
```js
document.querySelectorAll('a[href^="http"]').forEach(a => console.log(a.href))
```

Chequear a mano que cada uno abre el sitio correcto (Omnibees, WhatsApp, Instagram, etc.).

- [ ] **Paso 3: Validar mobile en Chrome DevTools**

Modo responsive, probar en iPhone 12 y Pixel 5. Especial atención:
- Header hamburger
- Nav con 7 items cabe sin overflow
- RoomCards tienen buena proporción
- Lightbox funciona con touch
- WhatsApp float no tapa contenido

- [ ] **Paso 4: Commit de fixes mobile si hubo ajustes**

```bash
git add -A
git commit -m "fix(qa): correcciones de mobile y links después de QA manual"
```

---

### Task 12.2: Lighthouse audit y fixes de performance

- [ ] **Paso 1: Generar build de producción y servir**

```bash
cd C:/Maxi/EV/estaleiro-village
npm run build
npm run start
```

- [ ] **Paso 2: Correr Lighthouse en Chrome DevTools**

Sobre `http://localhost:3000` (Desktop y Mobile). Meta:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO 100

- [ ] **Paso 3: Corregir los issues más impactantes**

Los más comunes:
- Imágenes sin `width`/`height` explícitos → agregar o usar `fill` + `sizes`
- Contrast ratio bajo → revisar `text-white/50` sobre fondos oscuros
- Text links sin nombre accesible → agregar `aria-label`
- Faltan `alt` en alguna imagen → completar

- [ ] **Paso 4: Commit**

```bash
git add -A
git commit -m "perf(qa): aplicar recomendaciones Lighthouse (img dimensions, aria-labels, contraste)"
```

---

### Task 12.3: Deploy preview a Vercel y smoke test

- [ ] **Paso 1: Asegurar que el repo está linkeado a Vercel**

```bash
cd C:/Maxi/EV/estaleiro-village
npx vercel link
```

O seguir skill `vercel:bootstrap` si el proyecto no está linkeado.

- [ ] **Paso 2: Deploy preview**

```bash
npx vercel
```

Esperar la URL. Abrir, correr el mismo checklist de QA de Task 12.1 sobre la URL pública.

- [ ] **Paso 3: Validar en dispositivos reales**

Mandar URL por WhatsApp al propio teléfono. Probar mobile real (safari iOS + Chrome Android si es posible).

- [ ] **Paso 4: Share URL al dueño del hotel para feedback**

No es un paso técnico, pero sí el paso final de entrega.

---

### Task 12.4: Merge final a `main` y tag de versión

- [ ] **Paso 1: Revisar estado git**

```bash
cd C:/Maxi/EV
git status
git log --oneline -20
```

- [ ] **Paso 2: Merge a main si se estuvo trabajando en master/DEV**

Verificar branch activa:
```bash
git branch
```

Si se trabajó en `master`, rebasar o merge a `main`:
```bash
git checkout main
git merge master
git push origin main
```

- [ ] **Paso 3: Tag de entrega**

```bash
git tag -a v1.0-entrega -m "Entrega inicial al cliente: sitio completo con 11 acomodaciones, galería, atividades, SEO y Schema.org"
git push origin v1.0-entrega
```

- [ ] **Paso 4: Documento de handover al cliente**

Crear `docs/HANDOVER-CLIENTE.md` con:
- URL del sitio en producción
- Credenciales de acceso al admin (si aplica)
- Cómo actualizar precios (editar `src/data/accommodations.ts`)
- Cómo cambiar fotos (reemplazar en `public/assets/images/` manteniendo nombres)
- Cómo agregar testimonios (editar `src/data/homepage.ts`)
- Link al Omnibees dashboard (hotel ID 18298)
- Contactos de soporte técnico

---

## Self-Review

**Cobertura del spec (relevamiento):**

| Gap identificado | Tarea que lo cubre |
|---|---|
| Solo 4 de 11 acomodaciones | Task 3.1, 3.3 |
| Sin páginas de detalle por acomodación | Task 3.3 |
| Email incorrecto / sin teléfono / sin WhatsApp | Task 1.1, 1.2 |
| Logos Blue Flag, WTTC, Riviera huérfanos | Task 4.1 |
| Sin WhatsApp flotante | Task 2.1 |
| Historia familiar subutilizada | Task 8.1 |
| Pet Friendly casi invisible | Task 5.1, 5.2 |
| Eventos: 4 vs 10 | Task 6.1 |
| Sin página /atividades | Task 7.1 |
| Sin página /galeria | Task 9.1 |
| Typos ortográficos | Task 1.3 |
| Sin OG tags/sitemap/robots | Task 11.1, 11.2 |
| Sin schema.org | Task 11.3 |
| Sin WebP/AVIF | Task 10.1 |
| Botón "Ver detalhes" sin destino | Task 1.4 |
| Sin PEV Hall of Fame visible | Task 4.2 |

**Placeholders:** plan revisado, ningún "TBD" / "TODO" / "fill in". Único lugar con ambigüedad intencional: precios en `accommodations.ts` marcados como "estimaciones conservadoras; validar con cliente antes de entrega" — dejo esa validación como ítem de verificación cliente, no como código incompleto.

**Consistencia de tipos:** `RoomType` extiende a 7 categorías (`suite | studio | flat | chale | sobrado | loft | duplex`), `roomTypeLabels` cubre las 7, `filters` en acomodaciones y el badge `viewLabels` en detalle usan los mismos literales. `EventType` mantiene 4 props (`id`, `icon`, `title`, `description`) — íconos nuevos referenciados en Task 6.1 Paso 2 garantizan mapping.

**Riesgos/assumptions a confirmar con cliente antes de entrega final:**
1. Precios por acomodación (son estimados)
2. Existencia real de piscina, restaurante propio, hidromassagem en Sobrado Frente Mar
3. Validación de ortografía en portugués por un hablante nativo
4. Foto adicional para cada acomodación (hoy reusamos las mismas en varias tarjetas)
5. PEV Hall of Fame badge (año exacto y validez actual)

---

## Execution Handoff

Plan guardado en `docs/superpowers/plans/2026-04-21-completar-hotel-entregable.md`.

**Dos opciones de ejecución:**

**1. Subagent-Driven (recomendado)** — despacho un subagente fresh por tarea, reviso entre tareas, iteración rápida. Requiere `superpowers:subagent-driven-development`.

**2. Inline Execution** — ejecuto tareas en esta sesión con checkpoints por fase. Requiere `superpowers:executing-plans`.

**¿Cuál preferís?**
