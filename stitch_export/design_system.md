# Stitch Design System Export: RANCHOSANJOSE
## Project ID: `14637091961287473294`

## Design Theme: "Editorial Equestrianism"

### Color Mode: LIGHT
### Fonts
- **Headlines:** Noto Serif
- **Body:** Manrope
- **Labels:** Manrope

### Corner Roundness: ROUND_EIGHT (0.5rem)

### Core Colors
| Token | Hex | Usage |
|-------|-----|-------|
| primary | `#154212` | Forest Green – primary actions |
| primary_container | `#2D5A27` | Deep green containers |
| secondary | `#79573f` | Earthy Brown – accents |
| secondary_container | `#ffd1b3` | Warm peach containers |
| tertiary | `#483611` | Dark Timber decorative |
| tertiary_container | `#614d26` | Timber containers |
| surface | `#fcf9f4` | Sand/Beige background |
| surface_container | `#f0ede8` | Subtle section backgrounds |
| surface_container_low | `#f6f3ee` | Low elevation surfaces |
| surface_container_lowest | `#ffffff` | Cards/elevated items |
| surface_container_high | `#ebe8e3` | Higher elevation |
| surface_container_highest | `#e5e2dd` | Highest elevation |
| on_surface | `#1c1c19` | Text on surface (NOT pure black) |
| on_primary | `#ffffff` | Text on primary |
| outline | `#72796e` | Outline color |
| outline_variant | `#c2c9bb` | Ghost borders at 20% |
| error | `#ba1a1a` | Error red |
| error_container | `#ffdad6` | Error background |
| background | `#fcf9f4` | Page base |

### Override Colors
- Override Primary: `#2D5A27`
- Override Secondary: `#6F4E37`
- Override Tertiary: `#A68D60`
- Override Neutral: `#F5F2ED`

### Spacing Scale: 3

---

## Design Principles (from designMd)

1. **No-Line Rule**: No 1px borders for sectioning. Use background color shifts.
2. **Tonal Layering**: Depth through nested surface tiers, not drop shadows.
3. **Ghost Borders**: `outline_variant` at 20% opacity max.
4. **Glassmorphism**: Surface at 80% opacity + `backdrop-filter: blur(12px)`.
5. **Primary Gradient**: `#154212` → `#2D5A27` at 135°.
6. **Intentional Asymmetry**: Left-aligned typography, organic imagery.
7. **Editorial Caps**: Manrope labels with `tracking: +10%` for small captions.
8. **Animations**: `cubic-bezier(0.4, 0, 0.2, 1)` for all transitions.
9. **Never pure black**: Always use `on_surface` (#1c1c19).
10. **Corner radii**: md (0.75rem) or lg (1rem), never 4px.
