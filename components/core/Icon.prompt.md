Use `Icon` for every glyph. The set is the brand's own 54-symbol sprite — never hand-roll an SVG path
and never substitute an emoji.

```jsx
<Icon name="i-gauge" />
<Icon name="i-check" size={12} />
```

Inline `assets/dr-icons.svg` once near the top of the document body so the `<use href="#...">`
references resolve. Available ids are listed in readme.md under ICONOGRAPHY.
