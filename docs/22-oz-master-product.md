# 22 oz Master Product Experience

Issue: #4  
Template: `beese-co-theme-v1-7-navigation-restore/templates/product.json`  
Section: `beese-co-theme-v1-7-navigation-restore/sections/main-product.liquid`

## Purpose

The 22 oz product is the reusable baseline for Beese & Co. tumbler product pages. It keeps laser engraving and full-color UV printing inside one buying experience, supports uploaded-artwork visualization, captures production details as line-item properties, and requires taped-proof approval before the product can be added to cart.

## Shopify product setup

Create one draft Shopify product for the 22 oz tumbler with two options:

1. `Color` — the 23 values listed below.
2. `Customization Area` — `Single-Sided`, `Double-Sided`, and `Full Wrap`.

This creates 69 made-to-order variants. Do not track inventory. Set every color's price by `Customization Area`:

| Customization Area | Price |
| --- | ---: |
| Single-Sided | $28.00 |
| Double-Sided | $32.00 |
| Full Wrap | $45.00 |

`Single-Sided` and `Double-Sided` may use Laser Engraved or Full Color. `Full Wrap` is Laser Engraved only. The storefront automatically selects Laser Engraved, disables Full Color, and explains the rule whenever Full Wrap is selected.

Upload each matching source image as product media, use the listed descriptive alt text, and assign that media item to all three matching color variants.

| Shopify color value | Repository source image | Product media alt text |
| --- | --- | --- |
| Army Green | `22 oz/Blank army green.png` | `22 oz personalized tumbler in Army Green` |
| Black Multi | `22 oz/Blank black multi.png` | `22 oz personalized tumbler in Black Multi` |
| Black Ghost | `22 oz/Blank black ghost.png` | `22 oz personalized tumbler in Black Ghost` |
| Black Rose | `22 oz/Blank black rose.png` | `22 oz personalized tumbler in Black Rose` |
| Black | `22 oz/Blank black.png` | `22 oz personalized tumbler in Black` |
| Blue | `22 oz/Blank blue.png` | `22 oz personalized tumbler in Blue` |
| Coral | `22 oz/Blank coral.png` | `22 oz personalized tumbler in Coral` |
| Gray | `22 oz/Blank gray.png` | `22 oz personalized tumbler in Gray` |
| Green | `22 oz/Blank green.png` | `22 oz personalized tumbler in Green` |
| Light Blue | `22 oz/Blank light blue.png` | `22 oz personalized tumbler in Light Blue` |
| Light Purple | `22 oz/Blank light purple.png` | `22 oz personalized tumbler in Light Purple` |
| Light Teal | `22 oz/Blank light teal.png` | `22 oz personalized tumbler in Light Teal` |
| Maroon | `22 oz/Blank maroon.png` | `22 oz personalized tumbler in Maroon` |
| Navy | `22 oz/Blank navy.png` | `22 oz personalized tumbler in Navy` |
| Orange | `22 oz/Blank orange.png` | `22 oz personalized tumbler in Orange` |
| Pink | `22 oz/Blank pink.png` | `22 oz personalized tumbler in Pink` |
| Purple | `22 oz/Blank purple.png` | `22 oz personalized tumbler in Purple` |
| Red | `22 oz/Blank red.png` | `22 oz personalized tumbler in Red` |
| White Ghost | `22 oz/Blank white ghost.png` | `22 oz personalized tumbler in White Ghost` |
| White Multi | `22 oz/Blank white multi.png` | `22 oz personalized tumbler in White Multi` |
| White Rose | `22 oz/Blank white rose.png` | `22 oz personalized tumbler in White Rose` |
| White | `22 oz/Blank white.png` | `22 oz personalized tumbler in White` |
| Yellow | `22 oz/Blank yellow.png` | `22 oz personalized tumbler in Yellow` |

Use `22 oz/full lot.png` as optional comparison/gallery media with alt text `Available 22 oz personalized tumbler colors`.

The storefront JavaScript selects the variant-assigned media ID first. If no variant media is assigned, it falls back to matching the selected `Color` value against product media alt text.

## Preview boundary

The default `22 oz master` profile is calibrated against the 1800 × 1800 transparent source images:

- Left: 34%
- Top: 16%
- Width: 32%
- Height: 65%

The preview boundary is an overflow-hidden container. Uploaded artwork is positioned and resized inside it, so artwork never renders outside the printable tumbler body. These values remain configurable in the product section for future tumbler silhouettes.

## Line-item properties

The product form sends:

- Decoration Method
- Color and Customization Area as Shopify variant selections
- Artwork Upload
- Personalization
- Special Instructions
- Mobile Number for Taped Proof
- Taped Proof Agreement
- Instant Preview Profile
- Instant Preview Decoration
- Instant Preview Size
- Instant Preview Position

PNG, JPEG, and SVG files display in the instant preview. PDF files remain attached to the multipart product form and display a message explaining that an instant preview is unavailable.

## Product SEO setup

The theme supplies one product H1, canonical behavior, responsive product images, Product structured data, BreadcrumbList structured data, and internal links. In Shopify admin, complete the product-specific content:

- Product title: `Personalized 22 oz Skinny Tumbler`
- Search listing title: `Personalized 22 oz Tumbler | Beese & Co.`
- Meta description: `Create a personalized 22 oz skinny tumbler with permanent laser engraving or vibrant full-color printing. Choose your color, upload artwork and approve a complimentary taped proof before production.`
- Product description: explain size, decoration choices, care instructions, turnaround expectations, and taped-proof process in original customer-facing copy.

## Required live-store QA

After the real Shopify product and media are assigned:

1. Switch through all 23 colors and verify the matching image.
2. Test laser engraved and full-color preview treatments.
3. Upload PNG, JPEG, SVG, and PDF files.
4. Move both preview controls to their minimum and maximum values.
5. Confirm artwork never renders outside the safe boundary.
6. Verify missing and malformed mobile numbers are blocked.
7. Verify taped-proof acknowledgment is required.
8. Add each decoration path to cart and inspect all line-item properties.
9. Verify Single-Sided is $28 and permits Laser Engraved or Full Color.
10. Verify Double-Sided is $32 and permits Laser Engraved or Full Color.
11. Verify Full Wrap is $45, automatically selects Laser Engraved, and disables Full Color.
12. Confirm quantity and checkout handoff.
13. Repeat on mobile, tablet, desktop, keyboard-only navigation, and reduced-motion mode.
