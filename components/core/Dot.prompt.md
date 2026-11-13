Use `Dot` where a status needs a glyph but not a full badge — a legend row, or beside a source name.
It takes `currentColor`, so set the colour on the parent.

```jsx
<span style={{ color: 'var(--dr-ok)' }}><Dot /> Syncing</span>
```
