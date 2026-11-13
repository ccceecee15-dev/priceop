# DataLLM → DeepRoot: theme + UX rebuild

| File | What it is |
|---|---|
| `deeproot-ui-redesign.html` | Clickable prototype, 10 screens. Pill bar at the bottom switches screens. Live: profile switching, ⌘K, D.A.V.E. modes, modals. |
| `deeproot-theme.css` | Production drop-in. Design tokens + component classes. No duplicate selectors. |
| `INTEGRATION.md` | This file. |

---

## Part 1 — The colour system  (Scheme A · Graphite & Copper)

### Why actions are not copper

Copper sits at hue 15°, between amber and red. Using it for primary actions put *commit* in the same hue band as *alarm*. Measured under deuteranopia, the Approve button and a risk badge separated by only **39** — below the 40 threshold at which users confuse them. Warning vs risk was worse, at **29**.

The fix is a role split:

| Role | Colour | Where |
|---|---|---|
| **Commit action** | Graphite `#2A2522` | Buttons, send, approve, focus, meters |
| **Identity** | Copper `#C07860` | Logo, hexagons, headline scores, watermark |
| **Selection** | Copper tint | Active tabs, pills, segments, nav, links |
| **Status** | Semantic | ok / warn / risk only |

Warn `#A36A09` and risk `#8E2F1C` are separated by **luminance, not hue** — deliberately light against deliberately dark. Under CVD hue separation collapses and luminance survives; a "more yellow" warning actually scored 3. Worst-case separation across all status pairs is now **53, up from 29**, and every contrast pair passes AA.

Selection uses a copper *tint* rather than a solid fill so a filter never outranks the commit action — with solid copper pills, the selected filter read as more important than Approve.

### Palette

Every value is sampled from the logo PNGs, not invented:

| Sampled from | Hex | Role |
|---|---|---|
| Hexagon mark + "root" | `#C07860` | Identity and selection only — never a commit action |
| "root" on dark lockup | `#D8A088` | Accents on the nav rail |
| "deep" wordmark | `#181010` | Body text (warm near-black, red cast) |
| ".ai" wordmark | `#888078` | Muted text |
| Off-white on dark lockup | `#F0E8E8` | Text on the nav rail |

Copper is hue 15–18°, **warmer and redder than the v4 pitch deck's `#C0876A`**. Deck and app are now slightly out of step — I'd move the deck to these, since they're measured off the artwork, but it's your call which is canonical.

`#C07860` only reaches 3.4:1 on white, so it can't carry small text. The ramp steps down to `#9E5942` (5.3:1) for links and button fills, `#8C4C36` (6.6:1) for emphasis. All text pairs meet WCAG AA.

**The scheme:** graphite nav rail + warm paper workspace + achromatic commit actions, with copper carrying identity and selection. The old UI used five unrelated accents (blue buttons, indigo tiles, violet chips, mint pills, orange avatar), none from the brand. Every grey is warmed — cool `#F9FAFB` beside copper makes the copper look muddy.

Two known trade-offs of this scheme, stated plainly: it is the **least distinctive** of the three directions considered (graphite buttons are what Linear, Vercel and Stripe converged on), and it does not fully escape the warm-palette reading of "craft rather than infrastructure" — the canvas and rail are still warm. It was chosen for lowest risk and highest contrast. Petrol and Midnight remain on the table if distinctiveness matters more later.

**Signature device:** the hexagon from the logo mark replaces rounded-square icon tiles on every object — sources, agents, profiles, scope chips.

### Replacement map

| Current | Replace with |
|---|---|
| `blue-600` `#2563EB` (buttons) | `var(--dr-action)` `#2A2522` |
| `blue-600` `#2563EB` (links) | `var(--dr-copper-700)` `#9E5942` |
| `indigo/violet-500` | `.dr-hex` (copper gradient) |
| `violet-100` `#EDE9FE` | `var(--dr-copper-100)` |
| `green-100/700` | `--dr-ok-bg` / `--dr-ok` |
| `amber-500` | `--dr-warn` / `--dr-warn-bg` |
| `orange-500` (avatar) | `.dr-avatar` |
| `gray-50` `#F9FAFB` | `var(--dr-canvas)` `#FAF6F2` |
| `gray-200` `#E5E7EB` | `var(--dr-line)` `#E8DED5` |
| `gray-500` | `var(--dr-ink-3)` `#7A736B` |
| `gray-900` | `var(--dr-ink)` `#181010` |
| white sidebar | `var(--dr-shell)` `#1C1412` |

```js
// tailwind.config.js
colors: {
  action: { DEFAULT:'#2A2522', hover:'#1C1917', active:'#14110F' },
  copper: { 50:'#FBF1EC',100:'#F4E1D8',200:'#E9C6B6',300:'#E0A890',400:'#D8A088',
            500:'#C07860',600:'#B87058',700:'#9E5942',800:'#8C4C36',900:'#7C4230' },
  ink:    { DEFAULT:'#181010', 2:'#5A544E', 3:'#7A736B', 4:'#A79C93' },
  shell:  { DEFAULT:'#1C1412', 2:'#241A18', 3:'#2E221E', line:'#382924' },
  canvas: '#FAF6F2',
  line:   { DEFAULT:'#E8DED5', 2:'#D8CBC0' },
}
```

---

## Part 2 — Two bugs worth porting regardless of the redesign

**1. Hover beats active.** `.dr-pill:hover` is specificity (0,2,0); `.dr-pill--active` is (0,1,0). So hovering an active pill repainted its white label copper-on-copper — invisible. The same trap hit tabs, the segmented control, nav items and selected cards. Six explicit `--active:hover` rules now out-specify it. **If you use Tailwind `hover:` variants on active states you likely have this bug**, because Tailwind orders by utility, not by state precedence.

**2. Duplicate selectors silently break layout.** My own theme accumulated 19 duplicated selectors across successive edits; one stale `.dr-rank` set `grid-template-columns: 1fr 46px`, which wrapped ranked rows out of their card and over the score panel. The shipped file is deduplicated (250 → 174 rules). Worth adding a duplicate-selector lint to CI.

---

## Part 3 — The UX rebuild

### Information architecture: Profiles is now home

**A profile is the central object of the product** — DRI, D.A.V.E., agents and Compass are all scoped to one — yet it was buried third in the nav and was the emptiest screen. Landing on Connectors made DeepRoot feel like a configuration tool.

Profiles is now the hub. Each card carries readiness score and trend, its sources by type, attached agents, last question asked, and one next action. Every other screen becomes a drill-down from something meaningful.

**A workflow spine** (`Connect · Profile · Assess · Ask · Act`) sits at the top of each screen, completed steps ticked and the current one highlighted. This is the fix for a demo feeling like a screen tour — a tour happens when there's no spine to walk along.

**A profile scope chip** in the topbar of DRI, D.A.V.E. and Compass makes explicit that those screens follow one profile, and lets you switch without navigating away.

### Screen by screen

**Sign in** — SSO (Okta, Entra) above the email form; the security story raised out of the 11px footnote into three legible claims. Added an "explore with sample data" path — probably the highest-ROI thing you could build for sales, since every demo currently depends on someone's spreadsheets being connected correctly.

**Connectors** — demo data is now genuinely heterogeneous: PostgreSQL, SharePoint, an Outlook archive, Excel. Previously all four sources were Excel, which quietly disproved the "databases, documents, spreadsheets and mail together" pitch. Each source shows **what ingestion achieved** — "42 tables discovered · 1.24M rows profiled · 3 PII columns flagged · ready in 6 min" — because connection is where "2–4 week deployment" gets proven, not a status pill. Mail is labelled **Archive**, not Connected, since it's a one-time import and a Connected pill implies a sync that doesn't exist. The dead `—` Schema/Test columns are now working actions.

**Data Explorer** — leads with federation: "One query. Whichever engine each source needs." That was the most impressive sentence in your product and it was 12px grey body copy.

**DRI** — five changes: the weakest three dimensions are named at the top; peer benchmark (0.68) and agent-ready threshold (0.70) shown, so 0.75 means something; trend (+0.08 since Aug 12), turning a report card into an index; **Next Steps surfaced out from behind a tab** as "4 fixes to reach 0.87" with per-fix score gain and effort; Export/Share promoted to the topbar, because a shared DRI report is how you reach the decision-maker instead of a proxy evaluator.

**D.A.V.E.** — every answer carries **lineage**: which sources, how many tables, rows, documents and messages, plus a query-plan link. "Where did this number come from" is the enterprise buying question, and answering it visibly is both trust and proof of federation in one component. Conversations and lineage derive from the active profile, so a one-source profile can't claim three.

**Agent Workbench** — split into **Business agents** (4, each with last run, records processed and outcome) and **Components** (7, behind a tab, with a note that they carry no business logic). Seven of your eleven agents were plumbing whose descriptions say they have "zero built-in notion of any caller's business" — a merchandiser scrolling past those learns the catalog isn't for them. Header KPIs are now outcomes (runs, records, £ protected) rather than the undifferentiated 11 / 11 / 0.

**Agent detail** — guardrails are **visible and shown passing**, with the limit and the actual value for each; that proof is the trust story the description was only promising. Added a bulk action ("Recommend all 3", with combined £ impact), since the agent's value is reasoning across the assortment rather than one style at a time. Every recommendation carries projected margin protected — which turns a tool into the business case your deck is missing.

**AI Compass** — rebuilt as the **DRI-to-money bridge**. Use cases are gated on readiness: 3 viable now at 0.75 (£415k), 4 blocked, each naming the dimension in the way and how far short it falls, with a "Fix in DRI" link. £2.2m identified in total. This is the CEO/CFO screen you didn't have. The old copy promised "explore and filter by complexity and feasibility" over a two-step form with no explore and no filter.

**Settings** — SSO and SCIM status cards, four roles instead of one, per-profile access, auth method per user, and an audit log tab. These are procurement checklist items; their absence is noticed during security review, not during the demo.

**Global ⌘K** — search across profiles, sources and screens.

---

## Component reference

| Pattern | Class |
|---|---|
| Hexagon object tile | `.dr-hex`, `.dr-hex--soft` |
| Buttons | `.dr-btn--primary/secondary/ghost/danger`, `--sm/--block` |
| Filter pills | `.dr-pill`, `.dr-pill--active` |
| Status badges | `.dr-badge--ok/warn/danger/brand/neutral` |
| Cards | `.dr-card`, `__head/__body/__foot`, `--interactive/--selected` |
| Workflow spine | `.dr-flow`, `.dr-flow__step--done/--now` |
| KPI + movement | `.dr-kpi__value`, `.dr-delta--up/down`, `.dr-bench` |
| Ranked bars | `.dr-rank`, `.dr-rank__row--weak` |
| Meters | `.dr-meter`, `.dr-meter__fill--ok/warn/danger` |
| Answer lineage | `.dr-lineage`, `.dr-src` |
| Chat | `.dr-msg`, `.dr-msg--me`, `.dr-composer`, `.dr-suggest` |
| Guardrail proof | `.dr-rule`, `.dr-rule--fail` |
| Modal / menu / palette | `.dr-overlay` + `.dr-modal` + `.dr-choice`, `.dr-menu`, `.dr-cmdk` |
| Tabs / segmented | `.dr-tabs`, `.dr-seg` |

## Notes

- Fonts from Google Fonts: Poppins (display/brand), Inter (UI), JetBrains Mono (identifiers). Self-host for enterprise deployments.
- `data-dr-theme="dark"` on `<html>` switches to the dark workspace. The nav rail is dark in both.
- Numeric cells use `.dr-num` for tabular figures so columns align.
- DRI meters are copper regardless of score; the badge carries good/fair/poor. Colouring both double-encodes and breaks the uniform scheme.
- `prefers-reduced-motion` respected; focus rings copper and visible; modals and menus close on outside click and Escape.
- **The prototype's data is illustrative.** Every £ figure, ROI estimate and readiness threshold is invented for layout purposes. Replace them with real numbers before this goes near a customer — the same credibility risk as the unverified Gartner/IBM/McKinsey stats in the deck.
