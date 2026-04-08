# Diseño: Enriquecimiento del Sitio Estaleiro Village (Plan B)

**Fecha:** 2026-04-07  
**Estado:** Aprobado por usuario

---

## Resumen

Enriquecer el sitio Next.js de Pousada Estaleiro Village con:
1. Corrección de año en la timeline (2024 → 2026)
2. Botones "Reserve Agora" apuntando al sistema real de reservas (Omnibees)
3. Fotos nuevas de Flickr en galería de A Pousada + sección desayuno
4. Fotos históricas en la timeline de Nossa História
5. CTA de reserva al final de Nossa História

---

## Decisiones de diseño (consensuadas con usuario)

- **Estrategia de fotos:** Opción C — ampliar galería de A Pousada + fotos históricas en timeline. Sin página /galeria nueva.
- **Nossa História:** Solo agregar CTA de reserva al final (Opción D). No expandir intro ni agregar más hitos en la timeline.
- **Nivel de implementación:** Plan B (enriquecido pero no reescritura completa)

---

## Cambios por archivo

### 1. `src/components/sections/timeline.tsx`

**Cambio:** Actualizar el último ítem de la timeline:
- `year`: "2024" → "2026"  
- `title`: "Presente" (sin cambio)
- `description`: Reemplazar "Com 30 anos de história..." → "Com mais de 30 anos de história, continuamos a escrever nossa história à beira-mar, renovando espaços e mantendo vivo o espírito acolhedor que nos define desde 1994."

Además, agregar una foto (de los archivos ya existentes en `/public/assets/images/`) a cada ítem de la timeline. Usar un layout con imagen al lado del texto en pantallas grandes:
- 1994 Fundação → usar `47aad0_749ac6df1a064052b333b452692f9592_mv2_d_3968_2976_s_4_2.jpg` (foto histórica)
- 2000 Crescimento → usar `jardim_202.jpg`
- 2010 Renovação → usar `47aad0_33762d8f54c04590aeb08d2109eceeb3_mv2.png`
- 2018 Reconhecimento → usar `frente_20mar_202.jpg`
- 2026 Presente → usar `IMG_20251125_150745.jpg`

Layout de cada ítem (alternando): en desktop, imagen a la derecha en ítems impares, a la izquierda en ítems pares. En mobile, imagen arriba del texto.

### 2. `src/app/a-historia/page.tsx`

**Cambio:** Agregar sección CTA al final, antes del cierre del `<>`. Colocarla después del bloque del blockquote (`<section className="bg-[#F7F3EE]">`).

```tsx
<section className="bg-white">
  <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
    <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
      Venha fazer parte dessa história
    </h2>
    <p className="mt-4 text-base leading-7 text-muted-foreground">
      Mais de 30 anos de hospitalidade te esperam na Praia do Estaleiro.
    </p>
    <a
      href="https://book.omnibees.com/hotel/18298?lang=pt-BR&currencyId=16"
      target="_blank"
      rel="noreferrer"
      className="mt-8 inline-flex rounded-md bg-[#1B6CA8] px-8 py-3 text-white transition hover:bg-[#155a8e]"
    >
      Reserve sua estadia
    </a>
  </div>
</section>
```

### 3. `src/components/layout/header.tsx`

**Cambio:** El botón "Reserve Agora" (línea 96) apunta a `/#contato`. Cambiar a:
```tsx
href="https://book.omnibees.com/hotel/18298?lang=pt-BR&currencyId=16"
```
Y agregar `target="_blank" rel="noreferrer"` ya que es link externo. Cambiar `Link` a `<a>`.

También en el menú mobile (línea 131-139): el mismo cambio.

### 4. `src/app/a-pousada/page.tsx`

**Cambio A:** Ampliar `galleryImages` con 6-8 fotos nuevas descargadas de Flickr.

Fotos a descargar de Flickr (usando el feed API, guardando en `/public/assets/images/flickr/`):

Del álbum "Pousada Estaleiro Village / SC - Brasil" (ID: 72057594142294093):
- Descargar las primeras 8 fotos en tamaño `_c.jpg` (800px)
- Nombres de archivo: `flickr-pousada-01.jpg` a `flickr-pousada-08.jpg`

Del álbum "A Praia do Estaleiro" (ID: 72057594142287973):
- Descargar las primeras 4 fotos en tamaño `_c.jpg`
- Nombres: `flickr-praia-01.jpg` a `flickr-praia-04.jpg`

**Cambio B:** Agregar nueva sección "Café da Manhã" después de la sección de Comodidades, antes de la galería:

```tsx
<section className="bg-white">
  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src="/assets/images/flickr/flickr-cafe-01.jpg"
          alt="Café da manhã na Pousada Estaleiro Village"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div>
        <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
          Café da Manhã
        </h2>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Todas as manhãs, o café da manhã é preparado com produtos frescos e regionais,
          para começar o dia com sabor e energia em um ambiente aconchegante.
        </p>
      </div>
    </div>
  </div>
</section>
```

Fotos de café da manhã: Del álbum "Café da manhã" (ID: 72177720327111126):
- Descargar 4 fotos en `_c.jpg`
- Nombres: `flickr-cafe-01.jpg` a `flickr-cafe-04.jpg`

**Cambio C:** En `galleryImages`, expandir de 6 a 12-14 fotos incluyendo las nuevas de Flickr.

### 5. `src/app/a-pousada/page.tsx` — CTA final

Actualmente el CTA final usa `href="/#contato"`. Cambiar a:
```tsx
href="https://book.omnibees.com/hotel/18298?lang=pt-BR&currencyId=16"
```
Cambiar `Link` a `<a>` con `target="_blank" rel="noreferrer"`.

### 6. `src/components/sections/hero.tsx`

El CTA secundario "Fale conosco" puede quedar en `/#contato` (es correcto, lleva al mapa/contacto).  
El CTA primario "Conheça as acomodações" ya apunta a `/acomodacoes` ✓  
**Sin cambios necesarios aquí.**

---

## Script de descarga de fotos de Flickr

Crear y ejecutar `scripts/download-flickr-photos.sh`:

```bash
#!/bin/bash
NSID="46449934@N00"
OUTPUT_DIR="C:/Maxi/EV/estaleiro-village/public/assets/images/flickr"
mkdir -p "$OUTPUT_DIR"

download_album() {
  local album_id=$1
  local prefix=$2
  local count=$3
  
  curl -s "https://www.flickr.com/services/feeds/photoset.gne?set=${album_id}&nsid=${NSID}&lang=en-us&format=json" | \
  python3 -c "
import sys, json, re
data = sys.stdin.read()
data = re.sub(r'^jsonFlickrFeed\(', '', data.rstrip(')'))
j = json.loads(data)
for i, item in enumerate(j.get('items', [])[:${count}], 1):
    url = item['media']['m'].replace('_m.jpg', '_c.jpg')
    print(url)
" | while IFS= read -r url; do
    filename="${prefix}-$(printf '%02d' $i).jpg"
    i=$((i+1))
    curl -s -o "$OUTPUT_DIR/$filename" "$url"
    echo "Downloaded: $filename"
  done
}

download_album "72057594142294093" "pousada" 8   # General pousada
download_album "72057594142287973" "praia" 4     # Beach/praia
download_album "72177720327111126" "cafe" 4      # Breakfast
```

---

## Checklist de implementación

- [ ] Descargar fotos de Flickr a `/public/assets/images/flickr/`
- [ ] Actualizar `timeline.tsx`: año 2026, texto, fotos en cada ítem
- [ ] Agregar CTA de reserva al final de `a-historia/page.tsx`
- [ ] Cambiar links "Reserve Agora" en `header.tsx` (desktop + mobile) → Omnibees
- [ ] Cambiar CTA final de `a-pousada/page.tsx` → Omnibees
- [ ] Agregar sección "Café da Manhã" en `a-pousada/page.tsx`
- [ ] Expandir `galleryImages` en `a-pousada/page.tsx` con fotos Flickr
- [ ] Build de producción para verificar que compila sin errores

---

## URLs clave

- **Reservas Omnibees:** `https://book.omnibees.com/hotel/18298?lang=pt-BR&currencyId=16`
- **Flickr NSID:** `46449934@N00`
- **Álbum general pousada:** `72057594142294093`
- **Álbum playa:** `72057594142287973`
- **Álbum café da manhã:** `72177720327111126`
