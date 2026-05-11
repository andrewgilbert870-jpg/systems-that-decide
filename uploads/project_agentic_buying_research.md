---
name: Agentic Buying in Advertising — Primary Research File
description: Deep research findings for the "Systems That Decide" Substack series, covering the agentic ad-buying infrastructure layer, brands, agencies, DSPs/supply stack, and measurement. Cut-off date: 1 May 2026.
type: project
originSessionId: 52c30696-3ca2-4a64-8fc7-101133fc9326
---
Research prepared for the "Systems That Decide" Substack series. Five domains covered below.

**Why:** Source material for the Substack series, combining primary research with synthesis from six AI tools (Perplexity, Elicit, DeepSeek, Gemini, GPT, KIMI). Andrew confirmed the three uploaded files should be stored for retrieval across conversations.

**How to apply:** Use this as the factual backbone for any Substack drafting, advisory content, or speaking prep related to agentic buying. Always check the comparative_analysis memory for source reliability before citing specific statistics.

---

## DOMAIN 1: INFRASTRUCTURE LAYER

The protocol stack (as of May 2026) has two coexisting standards routes:

- **AdCP** (Ad Context Protocol) — governed by AgenticAdvertising.org, founded 15 October 2025 by Yahoo, PubMatic, Scope3, Optable, Swivel, Triton Digital. 23+ members by May 2026. AdCP 3.0 at GA. Operates via `/.well-known/adagents.json` (publisher-side) and `/.well-known/brand.json` (brand-side). Governed by "Embedded Human Judgment" principle — humans stay in loop on material decisions.
- **AAMP** (Agentic Advertising Management Protocols) — IAB Tech Lab umbrella, named 26 Feb 2026, framework published 16 March 2026. Wraps ARTF, Agent Registry, Agentic Audiences, buyer/seller SDKs around existing OpenRTB/OpenDirect plumbing.
- **MCP** — Anthropic's Model Context Protocol (open-sourced Nov 2024), de facto tool-call layer underneath both.
- **A2A** — Google's Agent2Agent (Linux Foundation governance, v1.2 in 2026), the inter-agent transport.
- **UCP** — Google's Universal Commerce Protocol (NRF Jan 2026). A checkout/product-feed protocol, not strictly ad-buying.

First live agent-to-agent buy: 16 October 2025, LG Ads inventory, day after AgenticAdvertising.org founding.

Key live deployments: PubMatic AgenticOS (CES Jan 2026, live in AU/US/FR/NL/IN by 27 April 2026), Yahoo DSP "Yours, Mine, Ours" (live in AU and SG at GA), TTD Koa Agents (21 April 2026, Stagwell first partner, alpha), Amazon Ads MCP server (36 countries, Feb 2026 open beta), Google DV360 Ads Advisor (GA March 2026), Magnite seller agent in SpringServe (first AdCP test buy Dec 2025).

IAB Tech Lab Agent Registry went live 3 March 2026, reached 10 entries by 11 March 2026.

ANZ: PubMatic AgenticOS confirmed live in Australia 27 April 2026. Yahoo DSP live in Australia at GA. Amazon MCP open in Australia. IAB Australia formally adopted IAB Tech Lab roadmap. No ANZ DSP/SSP has publicly registered AdCP or AAMP commitment through May 2026. REA Group is most agentic-active local publisher.

---

## DOMAIN 2: BRANDS

The optimisation target has moved from human attention to machine parsability — "earn the citation, the cart slot, the agent recommendation."

**Key protocols:** OpenAI+Stripe ACP (powers ChatGPT Instant Checkout for 1m+ Shopify merchants; named brands: Glossier, SKIMS, Spanx, Vuori, Coach, Kate Spade, Revolve). Google UCP (NRF Jan 2026, 8 April 2026 release with Shopify, Walmart, Target, Wayfair, BigCommerce, PayPal, Stripe).

**AEO/GEO:** Jason Barnard coined AEO ~2018. GEO academic paper: Aggarwal et al., arXiv 2311.09735 (Princeton/Georgia Tech/Allen Institute/IIT Delhi), KDD 2024. Claims up to 40% citation visibility lift. A16z codified GEO as a category May 2025.

**Practitioner brand requirements:** complete GTINs, schema.org Product markup, video link attributes (mandatory GMC 30 June 2026), llms.txt, brand.json at `/.well-known/brand.json`.

**Counter-signal:** Walmart-OpenAI Instant Checkout had conversion rates 3x lower than website redirect (Wired). The most important counter-narrative to agentic commerce hype.

**ANZ specifics:** Woolworths first Australian retailer on Google Gemini Enterprise (Olive assistant). Coles signed with OpenAI 2025, data clean room Jan 2026. Bunnings Buddy = Australia's first consumer-facing agentic shopping assistant (Google Cloud Next 2026). Combined Cartology + Coles 360 approaching AUD 1bn retail media revenue. Agentic dynamics are duopoly-shaped in ANZ — an agent that can't transact at Coles or Woolworths can't do an Australian grocery basket.

**Key tension:** Amazon preliminary injunction against Perplexity Comet (Judge Chesney, 9 March 2026, N.D. Cal.) — platforms have a legal lever to keep third-party agents out.

---

## DOMAIN 3: AGENCIES

Work being compressed by agents: briefing-to-skeleton-plan, RFP drafting, audience research summarisation, pacing anomaly detection, post-buy log ingestion, three-way invoice match. What retains value: strategy, brand architecture, creative concept origination, complex orchestration, vendor leverage, audit/compliance.

**Holdco AI race:**
- Publicis: CoreAI (EUR 300m 3-year investment), Epsilon+Lotame (4bn consumer profiles), won Microsoft account from Dentsu (USD 700m). Acquired Atomic 212 (Jan 2025) as ANZ CoreAI vehicle.
- WPP: Cindy Rose CEO (1 Sept 2025). WPP Open + Agent Hub + WPP Production (absorbed Hogarth 23 Feb 2026). WPP Open Pro (Oct 2025) = SMB self-serve.
- Omnicom: IPG merger closed 26 Nov 2025. USD 1.5bn synergy target, USD 1bn labour reduction. Acxiom RealID (2.6bn verified IDs).
- Havas: AVA at CES 2026 (GPT-5, Claude Opus 4.5, Gemini 3 gateway on Converged.AI). ~EUR 1bn committed.
- Stagwell: The Machine (Jan 2026). First holdco partner on TTD Koa Agents.
- Dentsu: Takeshi Sano global CEO 27 March 2026. Restructuring after JPY 328bn loss. ~JPY 12bn into AI/data.
- S4 Capital: H1 2025 revenue down 12.7%. No longer credible at scale.

**TTD-Publicis dispute:** FirmDecisions audit alleged improper DSP fees, unauthorised tool opt-ins, no cost validation. Publicis memo 17 March 2026 advised clients to avoid TTD. WPP and Dentsu exited OpenPath February 2026. TTD stock ~40% YTD 2026, 68% in 2025, 63% trailing 12 months. CFO departed after 5 months.

**ANA principal media study (March 2026):** 58% used principal-based buying in past year (up from 47%), 90% concerned it's in their interest, only 57% have written guidelines.

**ANZ:** Publicis market position strengthened via Atomic 212 acquisition. Surviving independents: Hatched, Half Dome, Bohemia, Murmur, Ryvalmedia. Seven/SCA merger (Jan 2026) concentrates national TV+audio inventory. Agentic rollouts 6-12 months behind global in ANZ.

---

## DOMAIN 4: DSPs AND SUPPLY STACK

**Key DSP positions:**
- TTD Koa Agents: alpha, Stagwell first via Open Agentic Kit, closed-beta planned H2 2026.
- Yahoo DSP "Yours, Mine, Ours": live AU/SG. Yours (external MCP agents), Mine (Yahoo native), Ours (interoperable metadata layer).
- PubMatic AgenticOS: 20+ agents, NVIDIA-accelerated, live in AU/US/FR/NL/IN.
- Google DV360: Gemini at operating layer, Ads Advisor GA, Confidential Publisher Match (Roku named CTV partner).
- Amazon DSP: MCP server 36 countries, gaining share at TTD's expense.
- StackAdapt: Ivy agent, Forrester Wave Q1 2026 Strong Performer.
- Basis Technologies: Compass launched 2 April 2026, 90% task-time reduction in beta.
- Viant Outcomes: "first fully autonomous open internet ad product."
- Equativ Maestro: tested with Omnicom, 40% planning-time reduction.

**Supply side:** Magnite most credible agentic SSP (seller agent in SpringServe, first AdCP test buy Dec 2025; expanded with Kepler/MiQ/Disney April 2026). Index Exchange building containerised impression-level decisioning. OpenX launched OpenXBuild (Jan 2026, 70% CPConversion reductions claimed).

**Walled garden gap:** Meta Advantage+, Google PMax, TikTok Smart+, none expose external agent endpoints. Amazon MCP server is the first material crack. Bridge between open-web agents and walled-garden agents = most under-discussed gap in the stack.

**Butler/Till + Clubtails Dec 2025 campaign metrics (KIMI/DeepSeek, verify before citing):** 82% supply chain cost reduction, 40% impression lift, 30% CPM drop, 98% VCR, <1% MFA, 80% above DV benchmarks.

**ANZ retail media:** Cartology ~AUD 750m revenue (Morgan Stanley), 19.5% FY25 growth. Coles 360 +13.5% normalised. Combined ~AUD 1bn. Wesfarmers OneDigital (Flybuys, OnePass) + Bunnings Buddy = third major agentic surface. JCDecaux global programmatic via Viooh launched Feb 2026.

---

## DOMAIN 5: MEASUREMENT

**Core problem:** Agent clock runs in seconds; measurement clock runs in weeks/quarters. Gap is the central measurement challenge of 2026.

**Legacy attribution:** Last-click MTA broken. Privacy Sandbox formally abandoned (Google paused cookie deprecation April 2025; by 2026, 10 technologies axed; only CHIPS, FedCM, Private State Tokens persist).

**MMM renaissance:** Google Meridian open-sourced 29 Jan 2025 (hundreds of thousands of GitHub downloads, 20+ certified partners, Scenario Planner UI 19 Feb 2026). Meta Robyn older. Commercial stack: Mutinex, Sellforte, Analytic Partners, Nielsen Compass, Marketing Evolution, Ipsos, Recast, Lifesight, Provalytics, Prescient AI.

**Agentic MMM:**
- Sellforte: 3 agents (Media Planner, Media Buyer, Experiments Agent). Media Buyer Agent launched Q1 2026, pushes bid changes directly into Google/Meta/TikTok in self-drive or assisted mode. ~36 employees, ~USD 3m revenue (KIMI). Clients: bonprix, Represent, C&A, Tchibo, Lidl.
- Lifesight Mia: launched 24 March 2026.
- Mutinex MAITE: conversational AI on MMM, Claude + Gemini agentic layer.

**Hershey-Mutinex case study (most documented agentic MMM case):** Hershey total media+trade >USD 2bn. Prior: 3 MMM cycles/year on ~5 brands, 5+ month lag. New: monthly across full portfolio. Multi-agent system (econometrics, competitive pricing, model-failure diagnosis agents) on Claude + Gemini. Tracer = named data partner. Hershey internal forecast: 4-5% revenue lift attributable to media. Vinny Rinaldi = named Hershey executive.

**Data quality = binding constraint:** Gartner Oct 2025 — 45% of martech leaders say vendor AI agents fail to meet expectations. Gartner June-Aug 2025 — 50% lack data stack readiness for AI agents. Agents amplify bad data, they don't correct it.

**ANA Programmatic Transparency Benchmark (Q1 2025 update):** Working-media share risen from 36% to 43.9% per USD 1,000 entering DSP. MFA spend down from 15% to 6.2% (median 10% to 1.1%). ~56-59% of programmatic spend still not clearly tied to quality-defined impressions.

**ANZ measurement:** Mutinex Australian-founded (2018). Open MMM Validation Framework: formal NA launch 16 September 2025. Late-2024 capital raise ~AUD 132.5m valuation (Perplexity; verify). Mutinex ANZ clients: Domino's, Samsung, Lion, Asahi, Optus, SEEK, ING, TPG, REA Group, Honda, Freedom, Lendi, endota, One NZ, Bupa. Ehrenberg-Bass Institute (UniSA) = key institutional influence on ANZ effectiveness culture. Adelaide AU (attention metrics) integrated into Nielsen ONE from October 2025.

**Most differentiated research thread:** ANZ regulatory perimeter. Privacy Act ADM transparency obligations effective December 2026. ACMA AI-disclosure rule for commercial radio mandatory 1 July 2026. Children's Online Privacy Code mandated by 10 December 2026. None of the six AI sources covered this thread in depth — highest-value differentiator for the Substack series.
