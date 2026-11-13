Use `Choice` inside a `Modal` when the user picks between routes rather than filling a form. Give
every option a `desc` — an unexplained option is a guess.

```jsx
<Choice icon={<HexTile size={30}><Icon name="i-db" /></HexTile>}
  title="PostgreSQL" desc="Live connection. Schema discovered on connect." />
```
