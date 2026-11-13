Use `Segmented` for a setting with two to four short options — a review cadence, a units toggle, a
view mode. Beyond four, use a `Select`.

```jsx
<Segmented value={days} onChange={setDays} items={[
  { id: '7', label: '7 days' }, { id: '10', label: '10 days' }, { id: '14', label: '14 days' },
]} />
```
