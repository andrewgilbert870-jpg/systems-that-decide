# Website Restructure: Product Pages, Leadership Tab, ANZ Focus

## Overview

This instruction file covers a structural update to the Systems That Decide website. There are six distinct changes:

1. **Nav** — add a "Leadership" tab
2. **New page** — `/the-systems-audit` (brand/advertiser product page)
3. **New page** — `/the-agency-stack` (independent agency product page)
4. **New page** — `/leadership` (senior leadership and fractional executive)
5. **Update** — `/advisory` page (add product blocks, remove Senior Leadership section, tighten to ANZ)
6. **Update** — homepage `/` (update "How to Work Together" section to reference named products)

**Design system:** All new pages follow the existing site conventions exactly — `#0D0D0D` obsidian background, `#9A8B47` gold accent, `#F0EDE8` off-white text, `#B8B2AE` muted text, `#444444` mid text, `var(--font-playfair)` for headlines, `var(--font-inter)` for body, `FadeUp` for scroll animation, `MandateBlock` at the bottom of advisory pages.

---

## 1. Nav — Add "Leadership" tab

**File:** `components/Nav.tsx`

Update the `navLinks` array to add a Leadership entry between Advisory and About:

```ts
const navLinks = [
  { href: '/library', label: 'The Library' },
  { href: '/advisory', label: 'Advisory' },
  { href: '/leadership', label: 'Leadership' },
  { href: '/about', label: 'About' },
]
```

No other changes to Nav.tsx.

---

## 2. New page: `/the-systems-audit`

**File:** `app/the-systems-audit/page.tsx`

### Metadata
```ts
title: 'The Systems Audit — Systems That Decide'
description: 'A full-scope, independent assessment of your paid media ecosystem. For brands and large direct advertisers in ANZ.'
```

### Page structure (sections in order)

---

#### Section 1: Hero (dark, full-width)
Background `#0D0D0D`, padding `clamp(80px, 10vw, 120px) 0 clamp(60px, 8vw, 96px)`, gold bottom border `rgba(154,139,71,0.2)`.

- Eyebrow label (gold, caps, 11px, 0.12em tracking): `THE SYSTEMS AUDIT`
- H1 (Playfair, 700, clamp(40px,7vw,64px), `#F0EDE8`, -0.02em tracking, max-width 800px):
  `Independent analysis of your paid media ecosystem.`
- Body paragraph (Inter, 18px, `#B8B2AE`, 1.7 line-height, max-width 620px, margin-bottom 40px):
  `A full-scope, six-week audit for brands and large direct advertisers in ANZ. Six proprietary frameworks. A Media Systems Health Score out of 120. A board-ready written report you own.`
- Two buttons: `btn-primary` linking to `#frameworks`, `btn-secondary` linking to `/enquire` labelled "Enquire"

---

#### Section 2: What It Is (dark)
Background `#0D0D0D`, padding `clamp(64px, 8vw, 96px) 0`, two-column layout on desktop (60/40 split), single column on mobile.

Left column:
- Section label (gold, caps, 11px): `WHAT IT IS`
- H2 (Playfair, 400, clamp(26px,4vw,36px), `#F0EDE8`, max-width 520px):
  `Built for the gap between what your agency reports and what is actually happening.`
- Body paragraphs (Inter, 18px, `#B8B2AE`, 1.7):

  Para 1: `The Systems Audit is a structured, independent review of how your paid media ecosystem is configured, who controls it, and whether it is working in your interest. It covers your programmatic supply chain, agency commercial architecture, measurement framework, brand safety infrastructure, technology stack, and agentic systems governance.`

  Para 2: `The work is conducted entirely by Andrew Gilbert. Not delegated. 16 years of operator experience across every layer of the paid media ecosystem — agency media buying, brand-side management at scale, brand safety and verification (IAS ANZ), audience data infrastructure (Eyeota), programmatic DSP and SSP operations (Yahoo APAC), and retail media network design and leadership (Block / Afterpay). He did not read about these systems. He built them.`

Right column (styled callout block, background `#141414`, left border `4px solid #9A8B47`, padding 40px):
- Playfair italic, 20px, `#9A8B47`:
  `"The analysis is the product. I am not incentivised by what you buy next, but by how well you understand what you already have."`

---

#### Section 3: Six Frameworks (dark, id="frameworks")
Background `#0D0D0D`, padding `clamp(64px, 8vw, 96px) 0`, top border `1px solid #2A2825`.

- Section label: `THE SIX FRAMEWORKS`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`): `Six structured frameworks. One complete picture.`
- Body (Inter, 18px, `#B8B2AE`, max-width 640px, margin-bottom 48px): `Each framework is applied systematically across the engagement. Findings feed into the Media Systems Health Score and the written report.`

Six framework rows. Each row: top border `1px solid #2A2825` (first row `2px solid #9A8B47`), padding `32px 0`, two-column layout (25% / 75% on desktop).

Left: framework number (Inter, 700, 11px, `#9A8B47`, letter-spacing 0.12em) and name (Playfair, 500, 22px, `#F0EDE8`).
Right: description (Inter, 18px, `#B8B2AE`, 1.7).

Framework data:

| # | Name | Description |
|---|------|-------------|
| 01 | Supply Chain Map | Maps the full path from budget to publisher impression. Identifies where fees are extracted, where inventory quality degrades, and where the supply chain has been configured in the interests of the agency or vendor rather than the advertiser. |
| 02 | Agency Commercial Audit | A review of the commercial architecture of the agency relationship. How the agency earns, what is disclosed, where principal media arrangements exist, and where the financial incentives diverge from the client's interest. |
| 03 | Measurement Integrity Assessment | An assessment of the measurement framework in use. What is being measured, how the methodology is constructed, whether it is fit for purpose, and where it has been structured to produce results that favour the agency or platform over the advertiser. |
| 04 | Brand Safety Coverage Map | A systematic review of brand safety infrastructure across the media programme. Where coverage applies, where it does not, and whether the current configuration reflects the brand's actual risk tolerance or the vendor's default settings. |
| 05 | Technology Stack Assessment | A review of the technology stack supporting the paid media programme. What is in it, what it costs, who controls the vendor relationships, where the contracts sit, and where the stack is working against the brand's independence. |
| 06 | Agentic Systems Assessment | An assessment of what AI is currently doing in the media programme. Platform AI exposure (PMax, Advantage+, algorithmic DSP systems), agency AI tooling, and whether independent governance exists over systems making decisions on the brand's behalf. |

---

#### Section 4: Media Systems Health Score (background `#0F0F0F`, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`)

- Section label: `MEDIA SYSTEMS HEALTH SCORE`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`): `Six dimensions. Scored out of 120.`
- Body (Inter, 18px, `#B8B2AE`, max-width 640px, margin-bottom 48px): `The audit produces a Media Systems Health Score across six dimensions, each scored out of 20. The score is not a ranking — it is a diagnostic. It shows where the programme is exposed and where the most urgent work sits.`

Six score dimensions in a 2×3 grid (desktop), single column (mobile). Each card: background `#141414`, border `1px solid #2A2825`, padding `28px 32px`.

Card: gold label (11px, caps, tracking), dimension name (Playfair, 22px, `#F0EDE8`), score (Inter, 700, 36px, `#9A8B47`): `/20`

Dimensions:
1. Supply Chain Transparency · /20
2. Agency Commercial Integrity · /20
3. Measurement Integrity · /20
4. Brand Safety Coverage · /20
5. Technology Independence · /20
6. Agentic Governance · /20

Below the grid, a score interpretation table (full width, background `#141414`, border `1px solid #2A2825`):

| Score | Assessment |
|-------|------------|
| 100–120 | Strong. The programme is well-configured and the principal risks are understood. Maintain and monitor. |
| 75–99 | Functional but exposed. Structural gaps exist that a well-briefed agency or vendor will exploit. Prioritise the lowest-scoring dimensions. |
| 50–74 | Significant exposure. The programme is likely producing results that benefit intermediaries more than the advertiser. Structural change is warranted. |
| Below 50 | Critical. The programme has fundamental integrity problems. Independent review and likely renegotiation of key relationships is recommended. |

Style: header row background `#1C1B1B`, text `#9A8B47`, 700, 11px caps. Body rows alternating `#141414` / `#0F0F0F`. All text Inter, 17px, `#B8B2AE`. Score column bold, `#F0EDE8`.

---

#### Section 5: Three Phases (dark, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`)

- Section label: `HOW IT WORKS`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`): `Three phases. Six weeks.`

Three phase blocks in a row (desktop), stacked (mobile). Each block: left border `2px solid #2A2825` (first block: `2px solid #9A8B47`), padding `28px 32px`.

Phase 1 — EXPOSE (Weeks 1–2):
`Structured intake questionnaire completed before the first session. Kick-off session (2 hours) with key stakeholders. Document review: current and prior-year media plans, agency scopes of work, vendor contracts, measurement frameworks. Platform access (read-only) provisioned. Up to four stakeholder interviews. Goal: map what the client believes is true and gather the evidence to test it.`

Phase 2 — INTERROGATE (Weeks 2–4):
`Six frameworks applied systematically. Hypotheses formed in Expose are tested against the evidence. Platform AI exposure reviewed across PMax, Advantage+, and DSP automated systems. Agency AI tooling and governance assessed. Supply path analysis and fee verification completed.`

Phase 3 — CLARIFY (Weeks 4–6):
`Output production. Findings structured as a board-ready briefing: situation, complication, answer, supporting evidence. Recommendations prioritised by urgency and effort. Report delivered. Live readout session held.`

---

#### Section 6: Deliverables (background `#0F0F0F`, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`)

- Section label: `DELIVERABLES`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`): `Every engagement includes.`

Six deliverable rows in the same format as the frameworks section (border rows, two-column layout):

| # | Deliverable | Description |
|---|-------------|-------------|
| 01 | Systems Map | A hand-built map of your media ecosystem showing the supply chain, technology stack, and data flows as they actually exist. Not as the agency has presented them. |
| 02 | Media Systems Health Score | A scored assessment across six dimensions out of 120. Identifies where the programme is exposed and where the most urgent structural work sits. |
| 03 | Written Report | A board-ready written report structured as: situation, complication, findings, recommendations. Built to be taken to leadership without translation. |
| 04 | Independence Declaration | A signed declaration confirming the absence of vendor relationships, referral arrangements, or platform incentives affecting the assessment. |
| 05 | Live Readout Session | A 90-minute live session presenting findings and recommendations with key stakeholders. Session notes provided within 48 hours. |
| 06 | 30-Day Check-In | A call 30 days after delivery to address questions arising from the report and review progress on immediate recommendations. Included in every engagement. |

---

#### Section 7: Independence (background `#141414`, left border strip `4px solid #9A8B47` on the content block, padding `clamp(64px,8vw,96px) 0`)

Full-width section. Max-width container. Two columns on desktop (60/40).

Left column:
- Section label: `INDEPENDENCE`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`, max-width 520px):
  `No vendor relationships. No platform incentives.`
- Body paragraphs (Inter, 18px, `#B8B2AE`, 1.7):

  Para 1: `Andrew Gilbert does not hold equity in, receive referral fees from, or maintain commercial relationships with any adtech vendor, platform, or data provider. Every finding is based on what the evidence shows. Every recommendation is based on what is right for the client.`

  Para 2: `This is disclosed in writing in every engagement, alongside a full declaration of any prior employment or commercial involvement with vendors or platforms relevant to the assessment.`

  Para 3 (note, Inter, 16px, `#6B6560`, italic): `Note: Andrew Gilbert holds equity in Block, Inc. as a result of prior employment with Block / Afterpay. This is disclosed in all engagements and does not affect assessments that do not involve Block's retail media or payment infrastructure.`

Right column:
- Four independence points as a list. Each: gold dot, Inter 18px `#B8B2AE`:
  - No equity in any vendor, platform, or data provider relevant to this assessment
  - No referral fees or introductory commissions from any recommendation
  - No formal platform partnerships or certification obligations
  - Full prior involvement disclosure provided in writing at commencement

---

#### Section 8: Investment (dark, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`)

- Section label: `INVESTMENT`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`): `Pricing.`
- Body (Inter, 18px, `#B8B2AE`, max-width 640px, margin-bottom 48px): `The Systems Audit is priced on engagement scope. Pricing is confirmed at intake following a scoping conversation.`

Simple CTA block (background `#141414`, border `1px solid #2A2825`, padding 40px, max-width 560px):
- Playfair italic 22px `#F0EDE8`: `Enquire to confirm scope and pricing. The first conversation is a scoping call — no commitment required.`
- `btn-primary` linking to `/enquire`: "Start a Conversation"

---

#### Section 9: MandateBlock component (existing, no changes needed)

```tsx
<FadeUp>
  <MandateBlock />
</FadeUp>
```

---

## 3. New page: `/the-agency-stack`

**File:** `app/the-agency-stack/page.tsx`

### Metadata
```ts
title: 'The Agency Stack — Systems That Decide'
description: 'Senior adtech expertise. Fractional access. For independent agencies in ANZ.'
```

### Page structure

---

#### Section 1: Hero (dark)
Same structure as `/the-systems-audit` hero.

- Eyebrow: `THE AGENCY STACK`
- H1: `Senior adtech expertise. Fractional access.`
- Body (max-width 620px): `For independent agencies in ANZ. Two products that work together: a one-time assessment of your technology stack, and an ongoing monthly advisory to keep it current.`
- Buttons: `btn-primary` → `#products` "View Products", `btn-secondary` → `/enquire` "Enquire"

---

#### Section 2: The Problem (dark, id="products")
Background `#0D0D0D`, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`.

- Section label: `WHY THIS EXISTS`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`, max-width 720px): `Holding companies built infrastructure for scale. Independent agencies need it for one client at a time.`
- Body (Inter, 18px, `#B8B2AE`, max-width 680px, 1.7):

  Para 1: `Independent agencies are managing increasingly complex media technology stacks without the structural oversight capability that holding companies have built for scale. Platform AI is making buying decisions autonomously. Programmatic supply paths are longer and harder to audit. Clients are asking questions that require technical depth most independent agencies were not built with.`

  Para 2: `The Agency Stack fills that gap. Not as a consultant recommending tools. As an operator who built these systems from the inside — and can tell you what is working, what is not, and what to do about it.`

---

#### Section 3: Two Products (dark, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`)

- Section label: `TWO PRODUCTS`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`): `One builds the map. One keeps it current.`

Two large product cards side by side on desktop, stacked on mobile.

**Card 1 — The Stack Review** (background `#141414`, border `1px solid #2A2825`, border-top `3px solid #9A8B47`, padding `48px`):
- Gold label (11px, caps, 0.12em tracking): `THE STACK REVIEW`
- H3 (Playfair, 700, 32px, `#F0EDE8`): `A full assessment of your current technology architecture.`
- Body (Inter, 18px, `#B8B2AE`, 1.7, margin-bottom 32px): `One-time engagement. Six weeks. Four domains assessed systematically. Delivered as a Technology Architecture Report and a live presentation session.`
- Four domain tags (small caps labels, gold, displayed as a row of small pills or inline text separated by `·`): `Programmatic Infrastructure · Data & Measurement · AI & Automation · Vendor & Commercial`
- Pricing block (border-top `1px solid #2A2825`, padding-top 28px, margin-top 32px):
  - Label (11px, gold, caps): INVESTMENT
  - Price (Playfair, 700, 36px, `#F0EDE8`): AUD $12,000 – $15,000
  - Note (Inter, 14px, `#6B6560`): Founding Agency Rate available. Enquire for details.

**Card 2 — The Technology Retainer** (background `#0F0F0F`, border `2px solid #9A8B47`, padding `48px`):
- Gold label: `THE TECHNOLOGY RETAINER`
- H3 (Playfair, 700, 32px, `#F0EDE8`): `Senior adtech expertise available every month.`
- Body (Inter, 18px, `#B8B2AE`, 1.7, margin-bottom 32px): `Ongoing monthly engagement. Monthly tech review, brief response, vendor evaluation, and quarterly direction session. The stack review builds the foundation. The retainer keeps it current.`
- Four inclusion tags: `Monthly Review · Brief Response · Vendor Evaluation · Quarterly Direction`
- Pricing block:
  - Label: INVESTMENT
  - Price (Playfair, 700, 36px, `#F0EDE8`): AUD $3,500 – $4,500 <span style Inter, 400, 20px, `#B8B2AE`> / month</span>
  - Note (Inter, 14px, `#6B6560`): Minimum three-month initial term.

---

#### Section 4: Stack Review Scope (background `#0F0F0F`, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`)

- Section label: `THE STACK REVIEW`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`): `Four domains. Three phases. Six weeks.`

Four domain blocks in a 2×2 grid (desktop), single column (mobile). Each: background `#141414`, border `1px solid #2A2825`, padding `32px`.

| Domain | Description |
|--------|-------------|
| 01 · Programmatic Infrastructure | DSP and SSP configuration. Supply path transparency. Fee verification. Inventory quality and brand safety protocols. What is actually happening between the brief and the impression. |
| 02 · Data & Measurement | Identity and audience data strategy. Measurement framework design. Attribution methodology. First-party data infrastructure. Clean room readiness. |
| 03 · AI & Automation | Platform AI exposure across PMax, Advantage+, and algorithmic social. Agency AI tooling and governance. Agentic decision accountability — what the AI is doing and who knows. |
| 04 · Vendor & Commercial | Technology contracts and renewal terms. Vendor relationships and potential conflicts. Platform partnership obligations. Lock-in risk and exit conditions. |

Three phase blocks below (same format as Systems Audit page, horizontal row desktop / stacked mobile, left-border treatment):

- 01 DISCOVER (Weeks 1–2): `Intake questionnaire. Kick-off session. Platform access provisioned. Document review: technology contracts, vendor agreements, media plans, measurement frameworks.`
- 02 ASSESS (Weeks 2–4): `Four domains assessed systematically. Platform AI exposure reviewed. Supply path and fee analysis completed. Agency tooling and governance assessed.`
- 03 DESIGN (Weeks 4–6): `Output production. Technology Architecture Report drafted. Recommendations prioritised. Live presentation session delivered.`

---

#### Section 5: Deliverables (dark, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`)

- Section label: `DELIVERABLES`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`): `Technology Architecture Report.`
- Body (Inter, 18px, `#B8B2AE`, max-width 640px, margin-bottom 48px): `The primary deliverable is a Technology Architecture Report structured across six elements. It is accompanied by a live presentation session and a 30-day check-in call included in every engagement.`

Six deliverable rows (same border-row format, two-column):

| # | Element | Description |
|---|---------|-------------|
| 01 | Stack Inventory | Every tool, its purpose, its cost, and who owns the vendor relationship. The foundation for everything that follows. |
| 02 | Integration Map | How platforms connect, where data flows, and where it does not. Gaps and broken connections identified explicitly. |
| 03 | Gap Analysis | What is missing, duplicated, or working against the agency's interests. Tool overlap, redundant spend, and infrastructure decisions that cost more than they return. |
| 04 | Risk Register | Vendor lock-in, data governance exposure, contract risks, and commercial conflicts — prioritised by severity with a recommended response for each. |
| 05 | AI Exposure Report | What platform AI and agency AI tooling is currently doing in the stack. Accountability gaps identified. Who is responsible for what the AI decides. |
| 06 | Recommendations | Prioritised, scoped, and buildable. Structured by urgency and effort. A document you can take to a board or brief a developer with. |

---

#### Section 6: Technology Retainer (background `#0F0F0F`, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`)

- Section label: `THE TECHNOLOGY RETAINER`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`): `Build the map once. Keep it current every month.`
- Body (Inter, 18px, `#B8B2AE`, max-width 640px, margin-bottom 48px): `Most agencies that commission the Stack Review continue with the retainer — because the questions do not stop after the report is delivered. Platform changes, new briefs, vendor decisions, and stack questions are handled in real time, not at the start of the next audit cycle.`

Four retainer inclusion blocks (2×2 grid desktop, single column mobile). Same card style as domain blocks:

| Inclusion | Description |
|-----------|-------------|
| Monthly Tech Review | A structured monthly review covering platform changes, new tools worth evaluating, and emerging risks. Delivered as a written summary with session notes. |
| Brief Response | When a brief lands with a technology component or a platform makes a change mid-campaign, that is handled within the retainer. Responses delivered in writing. |
| Vendor Evaluation | Before committing to a new platform or signing a vendor contract, an independent assessment of whether it is the right tool, whether the terms are fair, and what the exit looks like. |
| Quarterly Direction | A structured quarterly session reviewing stack direction against agency growth, client mix, and commercial priorities. |

---

#### Section 7: Independence (same structure as Systems Audit independence section)

- Section label: `INDEPENDENCE`
- H2: `No vendor relationships. No referral fees.`
- Body:

  Para 1: `Andrew Gilbert does not hold equity in, receive referral fees from, or maintain commercial relationships with any adtech vendor, platform, or data provider. The Stack Review is not a technology sales process. It does not end with a vendor referral.`

  Para 2: `Every recommendation is based on what is right for the agency and its clients. This is disclosed in writing in every engagement.`

  Independence points (same four-point list format):
  - No equity in any vendor, platform, or data provider
  - No referral fees or introductory commissions from any recommendation
  - No formal platform partnerships or reseller arrangements
  - Full disclosure of any prior employment or commercial involvement with vendors assessed

---

#### Section 8: Investment (dark, same layout as Systems Audit investment section)

- Section label: `INVESTMENT`
- H2: `Pricing.`

Two-column pricing layout (desktop). Left: Stack Review pricing. Right: Retainer pricing.

Left block (background `#141414`, border `1px solid #2A2825`, border-top `3px solid #9A8B47`, padding `36px`):
- Label (gold, 11px, caps): THE STACK REVIEW
- Price row: Standard (Inter, 18px, `#B8B2AE`) → AUD $12,000 (Playfair, 700, 28px, `#F0EDE8`)
- Price row: Complex → AUD $15,000
- Note (Inter, 15px, `#6B6560`, italic, margin-top 20px): Standard for agencies up to approximately $5M in managed media spend. Complex for larger or multi-platform programmatic operations.
- Founding rate callout (background `rgba(154,139,71,0.08)`, border-left `3px solid #9A8B47`, padding `16px 20px`, margin-top 20px): Inter, 16px, `#9A8B47`: Founding Agency Rate: AUD $8,000 — available to the first three agencies to engage.

Right block (background `#141414`, border `1px solid #2A2825`, border-top `3px solid #9A8B47`, padding `36px`):
- Label: THE TECHNOLOGY RETAINER
- Price: AUD $3,500 – $4,500 / month
- Note: Minimum three-month initial term. Monthly in advance.

Below both blocks: `btn-primary` → `/enquire` "Enquire About The Agency Stack"

---

#### Section 9: MandateBlock
```tsx
<FadeUp><MandateBlock /></FadeUp>
```

---

## 4. New page: `/leadership`

**File:** `app/leadership/page.tsx`

### Metadata
```ts
title: 'Senior Leadership — Systems That Decide'
description: 'Open to senior leadership and fractional executive conversations in adtech, martech, retail media, and commerce infrastructure across ANZ.'
```

### Page structure

---

#### Section 1: Hero (dark)
- Eyebrow: `SENIOR LEADERSHIP`
- H1 (Playfair, 700, clamp(40px,7vw,64px), `#F0EDE8`, max-width 760px):
  `Open to senior leadership conversations.`
- Body (Inter, 18px, `#B8B2AE`, 1.7, max-width 620px, margin-bottom 40px):
  `Alongside advisory work, I am open to senior leadership and fractional executive roles in adtech, martech, retail media, and commerce infrastructure across ANZ. If you are building something in this space and need an operator who has done it before, get in touch.`
- One button: `btn-primary` → `/enquire` "Start a Conversation"

---

#### Section 2: The Record (dark, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`)

- Section label: `THE RECORD`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`, max-width 640px):
  `Sixteen years building and running the systems, not advising from the outside.`
- Body (Inter, 18px, `#B8B2AE`, 1.7, max-width 680px, margin-bottom 48px):
  `The value of this experience is not the seniority. It is the specific set of decisions made, systems built, and transitions managed across every structural layer of the modern media stack — from agency trading through adtech operations, verification, data, and retail media at significant scale.`

Three role blocks (same ServiceRow-style layout with Playfair 24px name, gold format label, body text):

**Vice President, Advertising — Afterpay / Block**
Format: `2020–2024 · Retail Media · Payments-Led Advertising`
Body: `Built Block's first global media network out of ANZ. Responsible for commercial, product, audience, integrations, and supply strategy across Afterpay, Cash App, and Square. The network became the model for Block's global advertising expansion. Started from zero. Built to a market-leading retail media operation.`

**Director of Commercial & Solutions — Yahoo**
Format: `2019–2020 · Programmatic · Platform Operations`
Body: `Led commercial and platform solutions across Yahoo's DSP and SSP technology in ANZ and SEA. Go-to-market, sales enablement, and product strategy developed alongside global counterparts. Delivered 2,550% revenue growth from the time of joining through to 2025.`

**Director of Sales — Integral Ad Science**
Format: `2016–2019 · Verification · Brand Safety`
Body: `Key member of the original ANZ leadership team. Grew IAS from limited ANZ presence to approximately 60% market share. Primary driver of new business across every major agency holding group and leading direct advertisers.`

---

#### Section 3: What I'm Open To (background `#0F0F0F`, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`)

- Section label: `WHAT I'M OPEN TO`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`, max-width 640px): `The roles that make sense.`

Four role type blocks. Two-column grid desktop, single column mobile. Each: background `#141414`, border `1px solid #2A2825`, border-top `2px solid #9A8B47`, padding `32px 36px`.

| Role Type | Description |
|-----------|-------------|
| Senior Leadership (VP / C-Suite) | VP or C-suite roles in adtech, martech, retail media, commerce platforms, or measurement businesses operating in ANZ. Preference for operators building in a space I know well — not for titles in adjacent categories. |
| Fractional Executive | CRO, VP Commercial, or VP Product on a fractional basis for technology businesses in the programmatic, retail media, or measurement space. Particularly suited to ANZ market entry or scale phases where a full-time hire is premature. |
| Board Advisory | Independent director or advisory board roles for technology companies in programmatic infrastructure, retail media, measurement, or commerce. Specifically where operator knowledge of how these systems actually function is the value — not general commercial governance. |
| Special Projects | Significant commercial, product, or transformation projects where an experienced operator is needed for a defined period. Examples: retail media network launch, commercial model redesign, major platform migration. |

---

#### Section 4: A Note on Advisory (dark, padding `clamp(64px,8vw,96px) 0`, top border `1px solid #2A2825`)

- Section label: `A NOTE ON ADVISORY`
- H2 (Playfair, 400, clamp(22px,3vw,30px), `#F0EDE8`, max-width 640px): `Advisory work and a leadership role are not mutually exclusive.`
- Body (Inter, 18px, `#B8B2AE`, 1.7, max-width 640px):

  Para 1: `Both are available simultaneously. Advisory clients are organisations that are not in a competitive or conflicted position with a leadership employer. This is assessed at engagement and disclosed where relevant.`

  Para 2: `Where a leadership appointment creates a conflict with an existing advisory client, that client relationship would be managed down or closed. This has not been required to date. The advisory practice is structured to avoid conflicts precisely so that leadership conversations can proceed without complications.`

- Link: `btn-secondary` → `/conflicts` "View Conflicts Policy"

---

#### Section 5: CTA (background `#141414`, left-border block, padding `clamp(64px,8vw,96px) 0`)

Centred or left-aligned callout block with left border `4px solid #9A8B47`, max-width 640px:
- Playfair italic, 22px, `#9A8B47`: `"If you are building something in this space and need an operator who has done it before, get in touch."`
- Body (Inter, 18px, `#B8B2AE`, margin-bottom 32px): `Conversations are taken selectively. The more specific you are about the role, the business, and the problem you need solved, the better I can assess whether it is a genuine fit.`
- `btn-primary` → `/enquire` "Start a Conversation"

---

## 5. Update `/advisory` page

**File:** `app/advisory/page.tsx`

### Changes required

**a) Metadata** — update description:
```ts
description: 'Independent advisory engagements for organisations in ANZ. Two named products for brands and agencies, plus strategic advisory, education, and transaction services.'
```

**b) Add a "Products" section** at the TOP of the page, before the existing Engagements section. Insert it after the hero section.

New section (background `#0F0F0F`, padding `clamp(64px,8vw,96px) 0`, bottom border `1px solid #2A2825`):

- Section label: `NAMED PRODUCTS`
- H2 (Playfair, 700, clamp(28px,4vw,40px), `#F0EDE8`): `Two products built for specific problems.`
- Body (Inter, 18px, `#B8B2AE`, max-width 640px, margin-bottom 48px): `Alongside strategic advisory, two named products are available for organisations with a specific, defined problem.`

Two product cards side by side (desktop), stacked (mobile). Each: background `#141414`, border `1px solid #2A2825`, border-top `3px solid #9A8B47`, padding `40px`.

**Card 1:**
- Gold label: `THE SYSTEMS AUDIT`
- H3 (Playfair, 700, 26px, `#F0EDE8`): `For brands and large direct advertisers in ANZ.`
- Body (Inter, 17px, `#B8B2AE`, 1.7, margin-bottom 28px): `A full-scope, six-week independent assessment of your paid media ecosystem. Six frameworks. A Media Systems Health Score out of 120. A board-ready report.`
- Link (Inter, 16px, `#9A8B47`, with arrow icon): `View The Systems Audit →` linking to `/the-systems-audit`

**Card 2:**
- Gold label: `THE AGENCY STACK`
- H3 (Playfair, 700, 26px, `#F0EDE8`): `For independent agencies in ANZ.`
- Body (Inter, 17px, `#B8B2AE`, 1.7, margin-bottom 28px): `A technology audit and monthly advisory for agencies that want the stack governance capability of a holding company at a fractional cost.`
- Link: `View The Agency Stack →` linking to `/the-agency-stack`

**c) Remove "Strategic Audit"** from the `engagements` array. It has been superseded by the two named products. The remaining four engagements stay.

**d) Update "Market Entry & Expansion"** — change `who` from `'Tech Companies Entering ANZ · APAC Market'` to `'Tech Companies Entering ANZ'`. Update the description to remove the second mention of "APAC":

New description:
```
'For technology companies outside ANZ looking to enter the market, and for those who have launched and want to sense-check their strategy before committing further.\n\nThis engagement is built on understanding what the ANZ market actually responds to, not what looks right from the outside. That judgment comes from having sat on both sides: winning the Afterpay business while at Yahoo, then moving to Afterpay and redirecting their entire channel strategy.'
```

**e) Update "Executive Advisory"** — change `who` from `'Independent Agencies · Tech Platforms · Brands in Transformation'` to `'Leadership Teams · Tech Platforms · Brands in Transformation'`. Independent agencies are now served by The Agency Stack product specifically; executive advisory is for strategic leadership counsel more broadly.

**f) Remove the "Senior Leadership" section** entirely. It now lives at `/leadership`.

**g) Keep `MandateBlock`** at the bottom. No change.

---

## 6. Update homepage `/`

**File:** `app/page.tsx`

### Changes required

**a) Update the `engagements` array** — replace "Strategic Audit" with two named product entries:

```ts
{
  name: 'The Systems Audit',
  format: 'For Brands · Single Engagement · 6 Weeks',
  description:
    'A full-scope, independent assessment of your paid media ecosystem. Six frameworks. A Media Systems Health Score out of 120. A board-ready written report.',
},
{
  name: 'The Agency Stack',
  format: 'For Agencies · Stack Review + Monthly Retainer',
  description:
    'A technology audit and monthly advisory for independent agencies in ANZ. Builds a structured view of the stack, then keeps it current.',
},
```

Keep the remaining four entries (Executive Advisory, Market Entry & Expansion, Team Education, Transaction Advisory) with the same ANZ update to Market Entry: change format from `'Project-Based · 4–8 Weeks'` and update description to remove "APAC" — use `'For technology companies outside ANZ looking to enter the ANZ market, and for those who have launched and want to sense-check their strategy before committing further.'`

**b) Update "View All Engagements" link** — change label to `"View Advisory"` and href to `/advisory`. The arrow icon and styling stay the same.

**c) Update the hero section** — the subheadline currently references "advertising, retail media, and commerce." No change needed here. The hero already positions the practice correctly.

---

## Summary of files to create / modify

| File | Action |
|------|--------|
| `components/Nav.tsx` | Add Leadership to navLinks |
| `app/the-systems-audit/page.tsx` | Create new |
| `app/the-agency-stack/page.tsx` | Create new |
| `app/leadership/page.tsx` | Create new |
| `app/advisory/page.tsx` | Update (add products section, remove Strategic Audit, remove Senior Leadership, tighten to ANZ) |
| `app/page.tsx` | Update (replace Strategic Audit with two named products, tighten Market Entry to ANZ, update link label) |

All pages use `FadeUp` for scroll animation, `MandateBlock` at the bottom of advisory-facing pages, and the existing global CSS classes (`btn-primary`, `btn-secondary`, `enquire-btn`, `label-caps`, `nav-link`).

Do not modify any other files. Do not change the design system, font configuration, colour variables, or layout behaviour of existing pages beyond the specific sections described above.
