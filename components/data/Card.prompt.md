Use `Card` for every panel. Pass `head`/`foot` rather than nesting your own bordered divs so the
padding and rules stay consistent.

```jsx
<Card head={<h3>Review periodicity</h3>} foot={<Button size="sm">Save</Button>}>
  <Table>…</Table>
</Card>
```

`interactive` and `selected` compose. Cards are never rounded beyond `--dr-r-lg` and never carry a
coloured left border — that is the `Callout` pattern, deliberately distinct.
