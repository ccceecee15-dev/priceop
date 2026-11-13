Use `Badge` for state and metadata. Tone is meaning, not decoration.

```jsx
<Badge tone="ok" dot>Connected</Badge>
<Badge tone="warn">Archive</Badge>
<Badge tone="brand">Agent-ready</Badge>
<Badge>v1.2.0</Badge>
```

`warn` and `danger` are separated by luminance, not hue (light amber vs dark rust), so they stay
distinguishable under colour-vision deficiency. Do not swap them for same-luminance alternatives.
