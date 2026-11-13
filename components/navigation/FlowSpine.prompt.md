Use `FlowSpine` directly under the topbar on every workspace screen. This is the system's strongest
IA device: the product is a sequence, and a demo feels like a screen tour precisely when there is no
spine to walk along.

```jsx
<FlowSpine current="act" aside={<span>Scope: <strong>Halloween 2026</strong></span>} steps={[
  { id: 'connect', label: 'Connect', done: true },
  { id: 'profile', label: 'Profile', done: true },
  { id: 'assess', label: 'Assess', done: true },
  { id: 'ask', label: 'Ask', done: true },
  { id: 'act', label: 'Act' },
]} />
```

Pass the scope label through `aside`, not as a spine child — the spine scrolls horizontally and would
clip it.
