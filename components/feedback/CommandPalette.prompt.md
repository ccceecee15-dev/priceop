Use `CommandPalette` for the app-wide ⌘K. Group results by object type so the palette teaches the
product's vocabulary as the user searches.

```jsx
<CommandPalette groups={[
  { label: 'Profiles', items: [{ icon: <Icon name="i-layers" />, label: 'Merch EU', meta: 'DRI 0.75' }] },
  { label: 'Screens', items: [{ icon: <Icon name="i-gauge" />, label: 'DRI' }] },
]} />
```

Advertise it with a `Kbd` in the nav rail's search row; a palette nobody knows about is not a feature.
