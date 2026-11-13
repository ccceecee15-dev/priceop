# DataLLM UI kit

A recreation of the product's core screens on this design system. Visual and interaction fidelity is
the goal; the logic is deliberately shallow.

Open `index.html` — it is a self-contained click-through of all seven screens with working profile
switching, ⌘K, tab switching and a fake D.A.V.E. turn. The `.jsx` files are the factored equivalents
for consumers to copy, composing the components in `../../components/`.

| File | Screen | What it demonstrates |
|---|---|---|
| `AppShell.jsx` | Chrome | NavRail + NavItem + UserCard + the ⌘K affordance |
| `ProfilesScreen.jsx` | **Profiles (home)** | Profile-as-hub IA, StatValue with benchmark, source chips, one next action per card |
| `ConnectorsScreen.jsx` | Connectors | "What ingestion achieved" rather than a status pill; Archive vs Connected |
| `DriScreen.jsx` | DRI | RankList weakest-first, benchmark + threshold, fixes surfaced out of a tab, Export in the topbar |
| `DaveScreen.jsx` | D.A.V.E. | Message + Lineage; provenance derived from the active profile |
| `WorkbenchScreen.jsx` | Agent Workbench | Business agents vs components split; outcome KPIs |
| `data.js` | — | The illustrative dataset, shared by all screens |

`index.html` additionally includes **Data Explorer** (federation-first framing) and **AI Compass**
(use cases gated on readiness, with the blocking dimension named). Those two have no `.jsx` counterpart
yet — see "Not yet built" below.

## Interactions in `index.html`

- Click any **profile card** — or the topbar scope chip — to change scope. DRI, D.A.V.E. and Compass all
  re-derive from it, including the spine's completion ticks and the lineage chips.
- **⌘K** opens the command palette; Escape or a scrim click closes it.
- Pick a **starter question** on D.A.V.E., or type and press send.
- Switch **Business agents / Components** on the Workbench.
- Select `Promo_Effectiveness` to see the unassessed-profile empty states.

## Not yet built

Faithful to the source prototype, these exist there but not here: **Sign in** (SSO above the email form,
plus the "explore with sample data" path), **Settings** (SSO/SCIM cards, four roles, audit log) and
**Agent detail** (guardrails shown passing with limit and actual, bulk recommend). Say the word and I
will add them.
