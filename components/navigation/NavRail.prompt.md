Use `NavRail` as the left edge of every signed-in screen. It stays graphite in the dark theme too, so
the app always has one dark anchor.

```jsx
<NavRail
  brand={<img src="assets/deeproot-logo.png" alt="deeproot.ai" style={{ width: 138 }} />}
  items={NAV.map(n => <NavItem key={n.id} {...n} />)}
  footer={<UserCard name="Joonil Kim" email="joonil.kim@whs.com" initials="JK" role="ADMIN" />}
/>
```
