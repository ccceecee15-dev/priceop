/* Illustrative data lifted from the source prototype. Every figure is invented
   for layout — see readme.md, "A standing caveat about data". */

export const SOURCES = [
  { name: 'WHS_Retail_DW', type: 'Data Source', fmt: 'PostgreSQL 15', icon: 'i-db', live: true, updated: '2 min ago',
    objects: '42 tables', ingest: '42 tables discovered · 1.24M rows profiled · 3 PII columns flagged', setup: '6 min' },
  { name: 'Supplier_Contracts', type: 'Enterprise App', fmt: 'SharePoint', icon: 'i-cloud', live: true, updated: '18 min ago',
    objects: '1,284 documents', ingest: '1,284 docs parsed · 96% text-extractable · 11 scanned PDFs OCR\u2019d', setup: '14 min' },
  { name: 'Buying_Team_Mailbox', type: 'Mail', fmt: 'Outlook archive', icon: 'i-mail', live: false, updated: 'Imported Aug 21',
    objects: '8,410 messages', ingest: '8,410 messages · 2,190 threads · 640 attachments indexed', setup: '9 min' },
  { name: 'Markdown_data', type: 'Flatfile', fmt: 'Excel', icon: 'i-file', live: true, updated: '12 hours ago',
    objects: '6 tables', ingest: '6 sheets · 48k rows · headers inferred, 2 type conflicts resolved', setup: '2 min' },
  { name: 'Promotion_Analysis_Data', type: 'Flatfile', fmt: 'Excel', icon: 'i-file', live: true, updated: 'Aug 21, 12:06 AM',
    objects: '1 table', ingest: '1 sheet · 3.2k rows · clean', setup: '1 min' }
];

export const PROFILES = [
  { name: 'Markdown_Agent_Test', dri: 0.75, prev: 0.67, band: 'Good', srcs: ['Markdown_data'], agents: 2, tables: 6,
    lastQ: 'Sales Volume and Markdown Depth', ago: '4h ago', next: 'Review 4 DRI fixes worth +0.11', nextTo: 'dri' },
  { name: 'Supplier_Risk_Q3', dri: 0.82, prev: 0.79, band: 'Strong',
    srcs: ['WHS_Retail_DW', 'Supplier_Contracts', 'Buying_Team_Mailbox'], agents: 1, tables: 45,
    lastQ: 'Which suppliers slipped on lead time?', ago: 'yesterday', next: '3 use cases now viable in AI Compass', nextTo: 'compass' },
  { name: 'Promo_Effectiveness', dri: null, prev: null, band: null, srcs: ['Promotion_Analysis_Data'], agents: 0, tables: 1,
    lastQ: null, ago: null, next: 'Run DRI assessment to unlock agents', nextTo: 'dri' }
];

/* Weakest first — the ranking IS the insight. */
export const DIMS = [
  ['Fairness & Bias', 0.62, 'Poor'],
  ['Clarity & Documentation', 0.67, 'Fair'],
  ['Governance', 0.70, 'Fair'],
  ['Analytics Readiness', 0.74, 'Fair'],
  ['Quality Metrics', 0.77, 'Good'],
  ['Structure & Format', 0.80, 'Good'],
  ['Business & Analytical Value', 0.88, 'Strong']
];

export const NEXT_STEPS = [
  ['Document data collection & processing practices', 'Governance', 'High', '+0.05', '~2 days'],
  ['Resolve 41% value-clarity gap in style attributes', 'Clarity', 'High', '+0.04', '~3 days'],
  ['Add protected-attribute review to store dimension', 'Fairness', 'Medium', '+0.02', '~1 day'],
  ['Register lineage for 3 undeclared source columns', 'Governance', 'Low', '+0.01', '~2 hours']
];

export const BIZ_AGENTS = [
  ['Markdown Optimization Agent', 'Recommends store-level clearance markdowns, pre-checked against your guardrails, for buyer approval.', 'v1.0.0', '2h ago', '5 styles reviewed', '\u00a314.2k margin protected'],
  ['Merchandising Intelligence Agent', 'Multi-agent merchandising intelligence for off-price retail buying decisions.', 'v2.0.0', 'yesterday', '1,204 SKUs scored', '38 buys flagged'],
  ['Supplier Performance Insights', 'Supplier reliability, quality, trend, risk and backup-readiness analysis.', 'v2.0.0', '3 days ago', '86 suppliers ranked', '4 at-risk identified'],
  ['Promotion Analysis Agent', 'Analyses promotion effectiveness across date ranges and filters.', 'v3.0.0', 'Never run', '\u2014', '\u2014']
];

export const COMPONENTS = [
  ['Data Agent', 'Shared ingestion service — resolves a connector and returns rows.', 'v1.1.0'],
  ['decision-agent', 'Buckets, scores or waterfalls records against caller-supplied tier bands.', 'v1.0.0'],
  ['exceptions-agent', 'Evaluates metrics datasets against rules and flags threshold breaches.', 'v2.0.0'],
  ['geo-risk-agent', 'Geocodes addresses and matches points within a radius.', 'v1.0.0'],
  ['notification-agent', 'Delivers reports and alerts to Slack or Email.', 'v1.0.0']
];

export const USE_CASES = [
  { name: 'Automated markdown recommendations', dept: 'Merchandising', need: 0.70, roi: '\u00a3180k / yr', eff: '2 weeks', why: 'Needs clean style + on-hand data' },
  { name: 'Supplier lead-time risk alerts', dept: 'Supply chain', need: 0.72, roi: '\u00a395k / yr', eff: '2 weeks', why: 'Needs supplier history and mail context' },
  { name: 'Invoice exception triage', dept: 'Finance', need: 0.75, roi: '\u00a3140k / yr', eff: '3 weeks', why: 'Needs document extraction at volume' },
  { name: 'Contract obligation monitoring', dept: 'Legal', need: 0.80, roi: '\u00a3220k / yr', eff: '4 weeks', why: 'Blocked by clarity & documentation at 0.67' },
  { name: 'Demand forecasting by store cluster', dept: 'Planning', need: 0.82, roi: '\u00a3410k / yr', eff: '6 weeks', why: 'Blocked by governance at 0.70' },
  { name: 'Dynamic pricing engine', dept: 'Trading', need: 0.85, roi: '\u00a3650k / yr', eff: '8 weeks', why: 'Blocked by fairness & bias at 0.62' },
  { name: 'Customer-level personalisation', dept: 'Marketing', need: 0.88, roi: '\u00a3520k / yr', eff: '10 weeks', why: 'Blocked by fairness & bias at 0.62' }
];

export const bandTone = (b) => (b === 'Strong' ? 'ok' : b === 'Good' ? 'brand' : b === 'Fair' ? 'warn' : 'danger');

/* The spine's completion state is derived from the profile, not hard-coded. */
export const SPINE = (p) => [
  { id: 'connect', label: 'Connect', done: true },
  { id: 'profile', label: 'Profile', done: true },
  { id: 'assess', label: 'Assess', done: p.dri !== null },
  { id: 'ask', label: 'Ask', done: p.lastQ !== null },
  { id: 'act', label: 'Act' }
];
