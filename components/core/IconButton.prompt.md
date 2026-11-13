Use `IconButton` for row-level and toolbar affordances where a label would not fit — expand chevrons,
overflow menus, refresh. `label` is mandatory; an icon-only control with no accessible name is a bug.

```jsx
<IconButton label="Expand row"><Icon name="i-chev" /></IconButton>
```
