---
name: deeproot-design
description: Use this skill to generate well-branded interfaces and assets for DeepRoot (deeproot.ai) and its DataLLM product, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create
static HTML files for the user to view. If working on production code, you can copy assets and read the
rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design,
ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code,
depending on the need.

## Start here

1. `readme.md` — the design guide. Read VISUAL FOUNDATIONS, CONTENT FUNDAMENTALS and ICONOGRAPHY before
   writing anything.
2. `styles.css` — link this one file and you have every token and component class.
3. `ui_kits/datallm/index.html` — a working seven-screen recreation of the product. The fastest way to
   see how the pieces compose.
4. `components/*/​*.prompt.md` — what each component is for, and the rule behind it.

## The three rules you must not get wrong

1. **Copper is identity and selection. Graphite is every commit action.** Primary buttons, send, approve
   and focus rings are `--dr-action` `#2A2522`. Copper as a button fill puts *commit* in the same hue
   band as *alarm* — measured at 39 apart under deuteranopia, below the 40 confusion threshold.
2. **Selection is a copper tint, never a solid fill.** A selected filter must not look more important
   than the action beside it.
3. **Set `box-sizing: border-box` yourself.** The theme does not, and every padded full-width field
   overflows its column without it:
   ```css
   .dr, .dr *, .dr *::before, .dr *::after { box-sizing: border-box }
   ```

## Working quickly

Minimum viable page:

```html
<link rel="stylesheet" href="styles.css">
<style>.dr,.dr *,.dr *::before,.dr *::after{box-sizing:border-box}</style>
<body class="dr dr-app">
  <svg style="display:none" aria-hidden="true"><!-- paste assets/dr-icons.svg contents --></svg>
  …
</body>
```

Everything needs `class="dr"` on an ancestor — the component layer is scoped to it.

Icons come from `assets/dr-icons.svg` (54 symbols), inlined once then referenced with
`<svg><use href="#i-db"></use></svg>`. Never hand-roll an SVG path and never use an emoji.

Objects wear the copper hexagon (`.dr-hex`), not a rounded square. That is the signature.

## Voice

A specialist explaining their reasoning to another specialist. Sentence case, no emoji, numerate.
State the magnitude ("42 tables discovered · 1.24M rows profiled"), give every number its comparison
("0.75 · peer average 0.68 · agent-ready at 0.70"), show the arithmetic rather than the reassurance
("limit 30% · actual 30.4%"), and name the trade-off rather than hiding it.

## Caveat

Every figure in the UI kits and specimen cards is illustrative — invented for layout. Replace with real
numbers before anything reaches a customer.
