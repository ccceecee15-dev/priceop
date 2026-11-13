Use `SsoButton` for enterprise identity providers, stacked ABOVE the email form — SSO is the primary
path for this product's buyers, and burying it below a password field misreads the audience.

```jsx
<SsoButton icon={<Icon name="i-shield" />}>Continue with Okta</SsoButton>
```
