Use `Topbar` at the top of every view. On any profile-scoped screen (DRI, D.A.V.E., Compass) pass
`chip` — the reader must be able to see, and change, which profile they are looking at without
navigating away.

```jsx
<Topbar title="Data Readiness Index" chip={<Badge>Profile: Merch EU</Badge>}
  actions={<><Button variant="secondary" size="sm">Share</Button><Button size="sm">Export</Button></>} />
```

Put Export/Share here rather than at the foot of the page — a shared report is how this product reaches
the decision-maker.

The bar is a fixed 62px and the title ellipsizes, so keep titles short and let `actions` carry the
verbs. Below roughly 960px a title plus a scope chip plus three buttons will truncate the title first.
