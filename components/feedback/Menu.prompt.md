Use `Menu` for mode switching and overflow actions — D.A.V.E.'s answer modes are picked this way.
Entries carry descriptions, so this is a chooser rather than a bare action list.

```jsx
<Menu label="Answer mode" items={[
  { title: 'Grounded', desc: 'Only what the connected sources support.', active: true },
  { title: 'Exploratory', desc: 'Adds inference. Flags what it inferred.' },
]} />
```
