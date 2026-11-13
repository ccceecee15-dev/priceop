Use `Button` for every action; `variant="primary"` is the one committing action on a view.

```jsx
<Button icon={<Icon name="i-check" />}>Approve plan</Button>
<Button variant="secondary">Export</Button>
<Button variant="ghost" size="sm">Clear filters</Button>
```

Variants: `primary` (graphite fill — commit), `secondary` (white, hairline border — the default for
everything else), `ghost` (copper text, no fill — tertiary), `danger` (only for destructive, irreversible
actions). `size="sm"` for table rows and toolbars; `block` for modal and sign-in buttons.

Do not use copper as a button fill. Copper is identity and selection; making it a commit action puts
"approve" in the same hue band as "alarm".
