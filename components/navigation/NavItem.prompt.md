Use `NavItem` for top-level destinations and `sub` for their children.

```jsx
<NavItem icon={<Icon name="i-node" />} label="Agent Workbench" badge={<Badge tone="brand">4</Badge>} active />
<NavItem sub label="Markdown agent" active />
```

The active state must out-specify hover. If you re-implement this in Tailwind, note that `hover:`
variants order by utility rather than state precedence, which repaints an active row's label on hover.
