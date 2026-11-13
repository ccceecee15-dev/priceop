# Importing DeepRoot into Figma

There is no way to author a genuine `.fig` binary outside Figma — it is a closed format, and no tool
here writes one. What this folder gives you instead is the whole system as **twelve self-contained HTML
files** that Figma can import as editable layers.

Each file has every stylesheet, font, icon and image inlined. Nothing is referenced; open one offline
and it renders.

## The import

1. In Figma, install **[html.to.design](https://www.figma.com/community/plugin/1159123024924461424)**
   (free tier covers this).
2. Run it, choose the **Upload / Import file** tab.
3. Drop the files in. Each becomes a frame of real Figma layers — frames, auto-layout, text nodes,
   vectors, fills — not a screenshot.

Import them in numeric order and you get the system in a sensible page order.

| File | What lands in Figma |
|---|---|
| `01-datallm-screens.html` | The seven product screens — the most useful single import |
| `02-buttons.html` | Every button variant in every state, tags, pills |
| `03-forms.html` | Fields, selects, segmented control, SSO buttons |
| `04-cards.html` | Card regions, KPIs, ranked bars, empty states |
| `05-navigation.html` | The full app shell — rail, topbar, spine, tabs |
| `06-tables.html` | Table with headers, meta lines, status badges |
| `07-overlays.html` | Modal, menu, command palette, callout, rule check |
| `08-color.html` | Every ramp with its contrast figures |
| `09-type.html` | The type scale at real sizes |
| `10-layout.html` | Radii, elevation, focus, the page frame |
| `11-icons.html` | All 54 icons — import this to build an icon component set |
| `12-template.html` | The blank screen template |

## What survives, and what you must fix by hand

**Survives well** — layout and auto-layout, text content and styling, fills, borders, radii, shadows,
the SVG icons as real vectors.

**Needs work after import:**

- **Fonts.** Poppins, Inter and JetBrains Mono must be installed locally or enabled in Figma, or it
  substitutes and every measurement shifts. Install them first, then import.
- **Variables.** The plugin brings colours in as raw hex, not as Figma variables. Build the collection
  by hand from `08-color.html` — it is about 40 entries and it is the difference between a themeable
  library and a pile of rectangles. Name them to match the CSS custom properties (`copper-500`,
  `action`, `ink-2`) so design and code stay in step.
- **Components.** Nothing arrives as a Figma component. Promote the pieces in files 02–07 yourself,
  with variants for the states each page shows.
- **The hexagon.** `.dr-hex` is a CSS `clip-path`. The plugin approximates clipping inconsistently —
  expect to redraw the hexagon once as a vector and reuse it.
- **Interaction states.** Hover, focus and pressed are painted statically on the component pages
  because CSS states cannot be captured. They arrive as separate static examples, which is exactly what
  you want for building variants.

## The honest recommendation

Import `01`, `05` and `11` first. Those three carry the product screens, the shell and the icon set, and
they are where hand-rebuilding costs the most. The foundations pages (`08`–`10`) are faster to
reconstruct natively in Figma than to import and clean up — read them and build the variable collection
directly.

## If the plugin route fails

`get_public_file_url` can mint a short-lived URL for any of these files, which html.to.design's
**Import from URL** tab accepts. Ask and I will generate one — they expire in about an hour.
