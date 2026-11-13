Use `Modal` for a decision that blocks progress. Wire Escape as well as the scrim click.

```jsx
<Modal onClose={close} head={<div><h3>Schedule this run</h3></div>}
  foot={<><Button block>Schedule</Button><Button variant="secondary" block onClick={close}>Cancel</Button></>}>
  <Choice title="Every 7 days" desc="The shortest legal interval." />
</Modal>
```
