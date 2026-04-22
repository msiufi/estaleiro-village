# Trabajo pendiente post-entrega

## Pending image enhancement — requires GEMINI_API_KEY

El script `scripts/enhance_images_nanobanana.py` mejora la calidad y resolución de
las fotos del hotel (las fuentes actuales miden ~1258px de ancho). No se ejecutó
durante la Fase 10 del plan porque `GEMINI_API_KEY` no estaba disponible en el
entorno de build.

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

Cuando las imágenes suban a >=1920px (Gemini reescala a 4K), ampliar
`deviceSizes` en `next.config.ts` a `[640, 750, 828, 1080, 1200, 1920, 2048]`
para aprovechar el upscale.
