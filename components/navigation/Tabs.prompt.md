Use `Tabs` to partition a long list into tiers the reader treats differently — confidence buckets,
business agents vs components. Show `count` so the split's shape is visible before clicking.

```jsx
<Tabs value={tab} onChange={setTab} items={[
  { id: 'high', label: 'High confidence', count: 31 },
  { id: 'med', label: 'Medium confidence', count: 16 },
]} />
```

Use `Segmented` instead when the options are a setting rather than a section.
