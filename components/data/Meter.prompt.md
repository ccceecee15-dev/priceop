Use `Meter` for a proportion. Leave `tone` unset in almost every case.

```jsx
<Meter value={75} />
```

DRI meters stay copper/graphite regardless of score and let an adjacent `Badge` carry good/fair/poor.
Colouring the bar as well double-encodes the same fact and breaks the uniform scheme — reach for
`tone` only when the bar is the *only* status signal present.
