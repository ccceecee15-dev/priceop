Use `Pill` for filters over a result set. Always render the whole set including an "All" pill, so the
filter's cardinality is visible.

```jsx
<Pill active>All</Pill>
<Pill count={31}>High confidence</Pill>
```

The selected pill uses a copper tint rather than a solid fill deliberately — with a solid copper pill the
selected filter out-ranked the primary action next to it.
