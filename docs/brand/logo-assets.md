# Cirro Brand Assets

Generated from:

- `ChatGPT Image Mar 27, 2026, 03_29_37 PM.png`

Key outputs:

- `public/brand/cirro-logo-source.png`
- `public/brand/cirro-logo-full.png`
- `public/brand/cirro-logo-full-1024.png`
- `public/brand/cirro-logo-full-512.png`
- `public/brand/cirro-logo-full-inverse.png`
- `public/brand/cirro-logo-lockup-light.png`
- `public/brand/cirro-logo-lockup-dark.png`
- `public/brand/cirro-mark-512.png`
- `public/brand/cirro-mark-white.png`
- `public/brand/cirro-app-icon-512.png`
- `public/brand/android-chrome-512x512.png`
- `public/brand/android-chrome-192x192.png`
- `public/brand/apple-touch-icon.png`
- `public/brand/favicon-32x32.png`
- `public/brand/favicon-16x16.png`
- `app/favicon.ico`

Notes:

- The shared UI mark assets are now transparent square canvases derived from the supplied PNG.
- Small app and favicon exports use a dedicated square icon composition built from the same mark so they stay legible at tiny sizes.

Reusable iconography lives in:

- `components/icons/cirro-icons.tsx`

Legacy imports can continue using:

- `components/marketing/landing-icons.tsx`

To regenerate the raster brand assets:

```bash
python scripts/generate_brand_assets.py
```
