# DeepRoot Design System

The design system for **deeproot.ai** and its product, **DataLLM** — an enterprise platform that
connects heterogeneous data sources, profiles them, scores their readiness, answers questions against
them, and runs business agents on top.

This system was derived from a completed redesign of the DataLLM product UI. It is not a proposal:
the colour scheme was measured, the component layer was deduplicated and shipped, and the reasoning
behind each decision is recorded below and in `guidelines/source-integration.md`.

---

## Sources this was built from

| Source | What it provided | Where it is now |
|---|---|---|
| `deeproot-theme.css` (688 lines) | The canonical token + component layer. Every colour sampled from the logo artwork. | Split into `tokens/` and `css/`, values unchanged |
| `deeproot-ui-redesign.html` (236 KB) | A clickable 10-screen prototype of the whole product. The component inventory and all real copy. | `assets/deeproot-ui-redesign-source.html` |
| `INTEGRATION.md` | The rationale: colour measurement, the CVD problem, two shipped bug fixes, the IA rebuild screen by screen. | `guidelines/source-integration.md` |
| `scheme-a-deuteranopia-check.png` | The simulation that justified graphite actions. | `assets/scheme-a-deuteranopia-check.png` |
| DeepRoot logo lockup | Extracted from the prototype's inlined base64. | `assets/deeproot-logo.png` |
| 54-symbol icon sprite | Extracted from the prototype. | `assets/dr-icons.svg` |

No Figma file or codebase was provided. Everything here traces to one of the five artefacts above; the
prototype is the ground truth for component inventory and copy.

---

## The one idea that explains the whole system

**Copper is who we are. Graphite is what you press.**

Copper sits at hue 15°, between amber and red. When it was used for primary actions, *commit* landed in
the same hue band as *alarm* — an Approve button and a risk badge measured only **39 apart under
deuteranopia**, below the 40 threshold at which users confuse two colours. Warning against risk was
worse, at 29.

So the roles were split:

| Role | Colour | Where it appears |
|---|---|---|
| **Commit action** | Graphite `#2A2522` | Buttons, send, approve, focus rings, meter fills |
| **Identity** | Copper `#C07860` | Logo, hexagon tiles, headline figures, watermark |
| **Selection** | Copper *tint* | Active tabs, filter pills, segments, nav rows, links |
| **Status** | Semantic | ok / warn / risk — and nothing else |

Two consequences worth internalising before you build anything:

1. **Selection is a tint, never a solid fill.** With solid copper pills, the selected filter visually
   out-ranked the Approve button beside it. A filter must never look more important than the action.
2. **Warn and risk are separated by luminance, not hue.** Warn is deliberately light (`#A36A09`), risk
   deliberately dark (`#8E2F1C`). Under colour-vision deficiency hue separation collapses and luminance
   survives — a "more yellow" warning scored 3. Worst-case separation across all status pairs is now
   **53, up from 29**, and every text pair meets WCAG AA.

Known trade-off, stated plainly: this is the **least distinctive** of the three directions considered —
graphite buttons are what Linear, Vercel and Stripe converged on. It was chosen for lowest risk and
highest contrast. Petrol and Midnight remain on the table if distinctiveness later matters more.

---

## VISUAL FOUNDATIONS

### Colour

A warm paper workspace (`--dr-canvas` `#FAF8F6`) against a graphite nav rail (`--dr-shell` `#1C1917`),
with copper carrying identity. **Every grey is warmed.** This is not a preference — a cool grey like
`#F9FAFB` placed beside copper makes the copper read muddy. Four text tones (`--dr-ink` through
`--dr-ink-4`), four surfaces, two line weights. `--dr-ink-4` is decorative and large-text only; never
set body copy in it.

The copper ramp runs 050–900. `--dr-copper-500` is the brand core but reaches only 3.4:1 on white, so it
**cannot carry small text** — step down to 700 for links and 800 for emphasis.

A dark workspace exists at `<html data-dr-theme="dark">`. The nav rail is dark in both themes, so the app
always has one fixed dark anchor.

### Type

**Poppins** for display (500/600/700), **Inter** for all UI text (400/500/600/700), **JetBrains Mono**
for identifiers. Headings are tracked tight at −0.015em at every size. Body sizes are 15 / 13.5 / 12.5 /
11.5px, with 13.5px the workhorse and 11.5px the on-screen floor. Slides and print use a 24px floor
instead.

The system has exactly **one all-caps style**: `.dr-field-label`, at 11px / 700 / .08em tracking. It
labels fields, heads sub-sections inside card bodies, and titles menu groups. Nothing else is uppercase.

Every number in a column carries `.dr-num` for tabular figures — KPI values, table cells, deltas, meter
readouts. Proportional digits make a column ragged and a live KPI jitter.

### Shape

Four radii, assigned by class rather than chosen per use: `6px` controls, `10px` callouts and menus,
`14px` cards, `18px` modals. Pills, badges and meters are fully round. Nothing in the system is a sharp
corner and nothing is more rounded than 18px.

### Depth and borders

Three shadows, all warm-tinted `rgba(24,16,16,…)` — never neutral black. `shadow-1` at rest, `shadow-2`
on hover, `shadow-3` for overlays. A card never elevates past shadow-2.

Every surface carries a **hairline border** (`--dr-line`) as well as its shadow; the border does the
structural work and the shadow only lifts. Dashed borders mark provisional or absent content —
`.dr-empty` and the dashed rule above `.dr-bench`.

**Exactly one component has a coloured left border: `.dr-callout`.** That is what makes a callout read as
commentary rather than content. Do not apply the treatment to cards.

### Backgrounds and imagery

No photography, no illustration, no gradient meshes. The only decorative element is
`.dr-hexwatermark` — outlined hexagons at 10–16% copper, for **dark full-bleed panels only**. On a light
card it reads as a printing fault.

Gradients appear in exactly three places, all short-range and all copper or graphite: the hexagon tile
fill, the avatar fill, and meter fills. There are no long or multi-hue gradients anywhere.

### Motion

One duration and one curve: `--dr-t` = `140ms cubic-bezier(.4,0,.2,1)`. Overlays fade in at 140ms;
modals additionally rise 8px and scale from .98 at 160ms; menus rise 4px at 120ms. No bounce, no spring,
no scroll-triggered animation. `prefers-reduced-motion` collapses every duration to 0.01ms and removes
overlay animation entirely.

### Interaction states

- **Hover** — a copper *border* and a copper-050 tint, not a darkening. Cards additionally gain
  shadow-2. Graphite buttons are the exception: they darken to `--dr-action-h`.
- **Press** — colour only (`--dr-action-a`). Nothing scales or shifts.
- **Focus** — `--dr-ring` (3px graphite at 24%) via `:focus-visible`, with the border switching to
  `--dr-action`. Graphite, not copper, because focus is about acting. Never the browser default.
- **Disabled** — surface-2 fill, ink-4 text, `not-allowed`. Never bare opacity.
- **Selected** — copper border + copper-050 fill + the ring.

⚠️ **Active states must out-specify hover.** `.dr-pill:hover` is specificity (0,2,0) and
`.dr-pill--active` is (0,1,0), so hovering an active pill repainted its label copper-on-copper —
invisible. Six explicit `--active:hover` rules exist for this reason, on pills, tabs, segments, nav
items, nav sub-items and selected cards. **If you port this to Tailwind you will likely reintroduce the
bug**, because Tailwind orders by utility rather than by state precedence.

### Layout

A dark rail (214px, fixed) plus a fluid workspace. Inside the workspace: a 62px topbar, then the
workflow spine, then content at 26px horizontal padding. Cards sit on `repeat(auto-fit, minmax(…, 1fr))`
grids so they reflow rather than scroll. Scrollbars are themed (10px, `--dr-line-2` thumb, copper on
hover).

**The theme sets no `box-sizing`.** Any consuming page must declare
`.dr, .dr *, .dr *::before, .dr *::after { box-sizing: border-box }` or every padded 100%-width field
overflows its column. This is the single most common integration mistake.

---

## CONTENT FUNDAMENTALS

The voice is **a specialist explaining their reasoning to another specialist.** Direct, numerate, and
willing to state a limitation. It never sells.

**Sentence case everywhere.** Headings, buttons, labels, badges — nothing is title-cased, and the only
all-caps is the tracked field label.

**No emoji. Ever.** Not in UI, not in copy, not in slides. The icon sprite covers every glyph need.

### Say what happened, with the number

Not a status, an outcome. A connector doesn't say "Connected" and stop — it says what ingestion
achieved:

> 42 tables discovered · 1.24M rows profiled · 3 PII columns flagged · ready in 6 min

Every claim carries its magnitude. A source chip reads "Orders · 42 tables, 1.24M rows", not "Orders".
The count is what proves federation actually happened instead of being asserted.

### Give a number its comparison

A readiness score of 0.75 means nothing alone. It is always shown with the peer benchmark and the
threshold that makes it actionable:

> **0.75** · +0.08 since 12 Aug · peer average 0.68 · agent-ready at 0.70

A KPI without a benchmark is a report card; with one it is an index. `StatValue` has a `bench` slot for
exactly this and it should almost never be empty.

### Show the arithmetic, not the reassurance

Guardrails are proof, not promise. Never "Guardrails passed" — always the limit and the actual value:

> Minimum margin after markdown — limit 30% · actual 30.4% after cut

### Name the trade-off

The product's own documentation says a scheme "is the least distinctive of the three directions
considered" and that prototype figures "are illustrative… replace them before this goes near a
customer". Carry that register. When a recommendation rests on thin evidence, the UI says so: *"Below
the observation threshold — the agent is reasoning from its cluster and says so."*

### Label honestly

A one-time email import is badged **Archive**, not Connected — a Connected pill implies a sync that
does not exist. If an action isn't built, omit the column rather than rendering a row of em-dashes.

### Second person for instruction, third for the system

"You may lengthen the interval." / "The agent sets the review interval." Never first person, and the
product never refers to itself as "we".

---

## ICONOGRAPHY

**One set: the brand's own 54-symbol SVG sprite**, at `assets/dr-icons.svg`. It is a thin-stroke
outline set — `fill="none"`, `stroke="currentColor"`, 24×24 viewBox, stroke-width 1.7–2.0 — closest in
character to Lucide, but it is the product's own and was copied out of the prototype rather than
substituted.

Inline the sprite once per document, then reference symbols:

```html
<svg style="display:none" aria-hidden="true"><symbol id="i-db" …>…</symbol>…</svg>
<svg><use href="#i-db"></use></svg>
```

External references (`href="assets/dr-icons.svg#i-db"`) resolve inconsistently and are slow — inline it.

Sizes are set by the consuming component, never on the icon: 12px in lineage chips, 15px in buttons,
17px in nav rows, 55% of the tile inside a hexagon.

**Available ids** — `i-layers` `i-plug` `i-db` `i-gauge` `i-bot` `i-node` `i-compass` `i-gear`
`i-search` `i-plus` `i-chev` `i-right` `i-back` `i-file` `i-cloud` `i-mail` `i-grid` `i-msg` `i-up`
`i-dots` `i-bell` `i-check` `i-checkc` `i-dl` `i-share` `i-refresh` `i-spark` `i-clock` `i-edit`
`i-trash` `i-user` `i-out` `i-x` `i-info` `i-shield` `i-key` `i-trend` `i-alert` `i-play` `i-coin`
`i-lock` `i-cmd` `i-server` `i-list` `i-tag` `i-eye` `i-brain` `i-cal` `i-zap` `i-usercheck` `i-hand`
`i-slash` `i-flag` `i-wifi`

**Never** hand-roll an SVG path, substitute an emoji, or use a unicode glyph as an icon. If the set
lacks a symbol you need, say so rather than drawing one.

### The hexagon is not an icon

The logo mark is a hexagon, so **every object in the product wears one** — sources, agents, profiles,
scope chips, workflow stages. It replaces the rounded-square icon tile that generic systems default to,
and it is the system's single strongest recognition device. See `components/core/HexTile`.

---

## Logo

`assets/deeproot-logo.png` — the full lockup: copper hexagon mark, "deep" in warm near-black `#181010`,
"root" in copper `#C07860`, ".ai" in warm grey `#888078`. Used at 124–168px wide in the nav rail and
300px on a title slide.

Only the light-ground lockup was present in the sources. **There is no dark-ground asset** — the
brand card currently filters the light one, which is a stopgap. Ask the brand owner for the reversed
lockup before shipping anything with a dark header.

---

## Index

### Root
- `styles.css` — **the only file consumers link.** An `@import` list; never add rules to it.
- `readme.md` — this guide.
- `SKILL.md` — Agent Skills manifest, for use in Claude Code.

### `tokens/`
`fonts.css` (webfont loading) · `colors.css` (39 colour tokens + the dark theme) ·
`typography.css` (3 families + `.dr-num`) · `shape.css` (4 radii, 3 shadows, ring, duration)

### `css/`
The component layer, split by concern and imported in order:
`base.css` · `hex.css` · `buttons.css` · `forms.css` · `badges.css` · `cards.css` · `tables.css` ·
`tabs.css` · `meters.css` · `navigation.css` · `flow.css` · `chat.css` · `overlays.css` · `chrome.css`

### `components/` — 38 components in 6 groups
| Group | Components |
|---|---|
| `core/` | Button · IconButton · Badge · Pill · Dot · Kbd · HexTile · Avatar · Divider · Icon |
| `forms/` | Input · FieldLabel · SearchInput · SsoButton |
| `data/` | Card · StatValue · Meter · RankList · Table · EmptyState · SectionHeading |
| `navigation/` | NavRail · NavItem · Topbar · Tabs · Segmented · FlowSpine · UserCard |
| `feedback/` | Callout · RuleCheck · Modal · Choice · Menu · CommandPalette |
| `chat/` | Message · Composer · Suggest · Lineage |

Each has `<Name>.jsx`, `<Name>.d.ts` (props contract) and `<Name>.prompt.md` (what & when, with the
rule behind it). Read the `.prompt.md` before using a component — several encode a decision that is not
obvious from the props.

**Intentional additions** — two components have no direct counterpart in the source CSS:
- `Icon` — a wrapper over the sprite, so consumers don't hand-write `<use>` blocks.
- `SectionHeading` — a component form of the existing `.dr-sec` class, which the prototype used inline.

### `ui_kits/datallm/`
Click-through recreations of the product's core screens. `README.md` in that folder maps each screen to
what it demonstrates.

### `foundations/` — reference pages
`color.html` · `type.html` · `layout.html` · `icons.html` · `image.html`

Full-page references in the standard design-system layout: ramps with their contrast figures, the type
scale at real sizes, the page frame and elevation steps, all 54 icons, and the imagery rules.

### `components/*.html` — variant & state pages
`buttons.html` · `forms.html` · `cards.html` · `navigation.html` · `table.html` · `dialog.html`

Every variant in every state — what the summary cards in each component folder don't show.

### Root records
`index.html` (the browsable system) · `theme.html` (parameters rendered) · `theme.json`
(machine-readable) · `thumbnail.html` (the project cover)

### `guidelines/`
17 foundation specimen cards (Colors, Type, Spacing, Brand) plus
`source-integration.md` — the original engineering note, kept verbatim. Read it for the screen-by-screen
IA reasoning; it is the best single explanation of *why the product is shaped this way*.

---

## Three bugs to carry forward

All three are properties of the pattern rather than of one file, so they will recur in any
reimplementation. The first two were found and fixed in the source theme; the third was found building
this system.

1. **Hover beats active** unless you make active more specific. See "Interaction states" above.
2. **Duplicate selectors silently break layout.** The source theme accumulated 19 duplicated selectors;
   one stale `.dr-rank` rule set two grid columns and wrapped ranked rows out of their card and over the
   panel beside it. The shipped file is deduplicated, 250 → 174 rules. Add a duplicate-selector lint to
   CI.
3. **A fixed-height bar plus `min-width: 0` clips its own text.** `.dr-topbar` is a hard 62px and
   consumers give the title `flex: 1; min-width: 0` so it can shrink past its content width. Below about
   960px the nowrap action buttons and scope chip took the remaining space, the title compressed to 90px
   and wrapped to three lines, and the fixed-height bar cut the first line off above its top edge.
   `.dr-topbar__title` and `.dr-nav__item > span` now carry
   `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` so they degrade to an ellipsis.
   **The general rule: any element inside a fixed-height flex row that is allowed to shrink below its
   content width must be told how to truncate.** Check this on every new component with a hard height.

---

## A standing caveat about data

Every figure in the prototype, in the UI kits here, and in the specimen cards is **illustrative** —
invented for layout. Readiness scores, row counts, currency amounts, ROI estimates and thresholds are
all placeholders. Replace them with real numbers before any of this goes near a customer.
