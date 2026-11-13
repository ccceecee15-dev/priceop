Use `RuleCheck` wherever an automated decision claims to respect a constraint. Always include the
limit and the actual value in `detail`; "Guardrails passed" on its own is the promise this component
exists to replace.

```jsx
<RuleCheck name="Minimum margin after markdown" detail="limit 30% · actual 30.4% after cut" />
<RuleCheck fail name="Below-cost bound" detail="floor waived — 3 units, inside relaxation trigger" />
```

This is one of the two places semantic colour is correct, because a check genuinely is pass/fail.
