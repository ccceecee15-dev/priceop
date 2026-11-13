Use `Message` for D.A.V.E. turns. Every agent answer should carry `lineage` — "where did this number
come from" is the enterprise buying question, and answering it visibly is trust and proof of federation
in one component.

```jsx
<Message avatar={<HexTile size={32}><Icon name="i-bot" /></HexTile>}
  lineage={<Lineage sources={[{ icon: <Icon name="i-db" />, label: 'Orders · 42 tables' }]} />}>
  Sell-through is 61% against a required 55%.
</Message>
```

Lineage must be derived from the active profile — a one-source profile cannot claim three.
