Use `StatValue` for any headline number. Always give it `bench` — a score of 0.75 means nothing until
the reader sees the 0.70 threshold and the 0.68 peer average beside it. A KPI without a benchmark is a
report card; with one it is an index.

```jsx
<StatValue label="Readiness" value="0.75" delta="+0.08 since 12 Aug"
  deltaDirection="up" bench="Peer average 0.68 · agent-ready at 0.70" />
```
