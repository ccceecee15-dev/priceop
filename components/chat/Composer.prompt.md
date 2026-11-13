Use `Composer` at the foot of a conversation. Put the answer-mode trigger and the profile scope in
`tools` so the user can see what the question will be answered against before they send it.

```jsx
<Composer tools={<Badge>Profile: Merch EU</Badge>} onSend={send} />
```
