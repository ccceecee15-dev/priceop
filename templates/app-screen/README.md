# Template — app screen

Copy this folder, rename it, and edit `index.html`. It is the starting point for any new DeepRoot
product screen and every comment in it is a rule from `readme.md`.

What it already gets right, and what you must not remove:

| In the file | Why |
|---|---|
| `box-sizing: border-box` block | The theme does not set it. Without this every padded full-width field overflows its column. This is the most common integration mistake. |
| `class="dr dr-app"` on `<body>` | The whole component layer is scoped to `.dr`. Nothing styles without it. |
| The inlined sprite | External `<use href="file.svg#id">` resolves inconsistently and is slow. |
| Graphite `--primary` button | Copper as a commit action puts *approve* in the same hue band as *alarm* — 39 apart under deuteranopia. |
| Scope label outside `.dr-flow` | The spine scrolls horizontally and would clip it. |
| `dr-bench` under every KPI | A number without its benchmark is a report card, not an index. |
| `.dr-rule` with limit **and** actual | Guardrails are proof, not promise. Never "checks passed". |
| `.dr-hex` on the object card | The hexagon is the signature device. Never substitute a rounded square. |

Currency in this product is **GBP**. Figures in the template are zeroed placeholders — replace them,
and never ship invented numbers to a customer.

Paths assume this folder sits at `templates/<name>/`, two levels below the system root. If you move it,
fix `../../styles.css` and `../../assets/deeproot-logo.png`.
