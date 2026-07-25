# Beese Flash Studio — Asset Workflow

## Decision: Save the Wrap and the Elements

Yes: each finished wrap should be saved as a complete production file **and** each strong reusable illustration should become its own asset.

The wrap is the sellable composition. The isolated elements are the long-term library.

## Recommended Structure

```text
beese-flash-studio/
├── 00-master-production-prompt.md
├── collection-catalog.csv
├── asset-workflow.md
├── themes/
│   ├── dragon-reader.md
│   ├── cozy-romantasy.md
│   └── readers-court.md
└── artwork/
    ├── dragon-reader/
    │   ├── wraps/
    │   │   ├── dragon-reader-wrap-v01.ai
    │   │   ├── dragon-reader-wrap-v01.svg
    │   │   └── dragon-reader-wrap-v01.png
    │   ├── elements/
    │   │   ├── dragon-coiled-treasure-v01.svg
    │   │   ├── dragon-on-books-v01.svg
    │   │   ├── flying-dragon-v01.svg
    │   │   ├── dragon-egg-books-v01.svg
    │   │   ├── rose-v01.svg
    │   │   └── ornate-key-v01.svg
    │   └── proofs/
    │       └── laser-test-pink-tumbler.jpg
    └── cozy-romantasy/
        ├── wraps/
        ├── elements/
        └── proofs/
```

## Why Elements Should Be Separate

- Reuse a proven rose, key, book stack, star, or flourish across future collections.
- Build new wraps faster without regenerating everything.
- Preserve the exact objects that traced and engraved successfully.
- Create stickers, bookmarks, ornaments, and small products from the same art.
- Replace one weak object without rebuilding the full wrap.
- Develop a recognizable Beese illustration language over time.

## What Deserves Its Own File

Save an object separately when it:
- has a strong readable silhouette
- Image Traces cleanly
- engraved successfully or is production-ready
- could work on another product
- is distinctive enough to reuse

Do not save every tiny sparkle as a separate file. Group small fillers into reusable sets such as:
- `celestial-fillers-set-v01.svg`
- `rose-and-leaf-fillers-v01.svg`
- `mystery-clue-fillers-v01.svg`

## File Formats

For each approved wrap:
- `.ai` — editable production master
- `.svg` — cleaned vector export
- `.png` — transparent preview or production raster
- `.jpg` — product or laser-test photograph only

For each approved element:
- `.ai` when it contains meaningful editable construction
- `.svg` as the primary reusable library asset
- transparent `.png` preview when helpful

## Naming Standard

Use lowercase kebab-case:

`collection-object-description-v##.ext`

Examples:
- `dragon-reader-dragon-coiled-treasure-v01.svg`
- `readers-court-celestial-crest-v02.svg`
- `cozy-romantasy-wax-letter-roses-v01.svg`

Do not use names such as `final`, `final-final`, or `new-version`.

## Approval Status

Use these statuses in the catalog and folders:
- Idea
- Planned
- Testing
- Proven
- Retired

**Proven** means the artwork has been traced, cleaned, and successfully manufactured.

## Production Rule

Never overwrite a proven production asset while experimenting. Create a new numbered version and preserve the successful file.
