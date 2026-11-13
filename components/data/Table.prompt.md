Use `Table` for tabular data, and wrap every numeric cell in `<span className="dr-num">` so columns
align. Add `<div className="dr-table__meta">` under a cell's primary text for its secondary line.

```jsx
<Table columns={['Source', 'Type', 'Rows']}
  rows={[['Orders', <Badge tone="ok" dot>Connected</Badge>, <span className="dr-num">1.24M</span>]]} />
```

Never leave a column of em-dashes. If an action isn't built, omit the column.
