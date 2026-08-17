# Pixel assets v2

Production asset pack generated from the approved high-detail pixel-art sheets.

## Current quality pass

The atlases in this folder use the refined v2 artwork at the highest practical WebP quality for the current mobile-first UI. Sprite coordinates remain stable, so visual upgrades do not break React components.

- `dog.webp` - dachshund states and reactions
- `care.webp` - care and action icons
- `navigation.webp` - app navigation icons
- `currency-effects.webp` - bone, coin, heart and effects
- `room.webp` - room furniture and decor
- `manifest.json` - exact atlas coordinates and compatibility aliases

Rendering rules:

- `image-rendering: pixelated` for crisp edges;
- one visual palette and outline language across all groups;
- transparent production atlases without labels or sheet backgrounds;
- source artwork is treated as the visual source of truth, not recreated from CSS primitives.
