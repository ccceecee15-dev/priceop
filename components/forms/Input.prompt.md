Use `Input` for all free entry. Focus is graphite with the 3px ring — not copper, and never the browser
default.

```jsx
<FieldLabel>Margin floor</FieldLabel>
<Input value="1.40" />
<Input as="textarea" placeholder="Ask D.A.V.E. a question…" />
```

Consuming pages must set `box-sizing: border-box`; the theme does not, so a padded 100%-width field
otherwise overflows its column.
