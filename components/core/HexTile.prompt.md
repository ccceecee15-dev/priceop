Use `HexTile` for any object avatar: a data source, an agent, a profile, a workflow stage. This is the
system's signature — do not substitute a rounded square.

```jsx
<HexTile><Icon name="i-db" /></HexTile>
<HexTile variant="soft" size={30} label="07" />
```

The hexagon mask tapers to points left and right, so a label wider than ~80% of the tile gets clipped.
For three characters ("MD4") use `size={60}` or more.
