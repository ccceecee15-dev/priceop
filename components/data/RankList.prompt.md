Use `RankList` to name the weak dimensions instead of making the reader decode a radar chart. Sort
worst-first and mark the bottom two or three `weak`.

```jsx
<RankList items={[
  { label: 'Lineage', value: 41, display: '0.41', weak: true },
  { label: 'Freshness', value: 58, display: '0.58', weak: true },
  { label: 'Completeness', value: 88, display: '0.88' },
]} />
```

The grid is explicitly one column; do not override `grid-template-columns` on `.dr-rank` — a stale
two-column rule in an earlier build wrapped the rows out of their card.
