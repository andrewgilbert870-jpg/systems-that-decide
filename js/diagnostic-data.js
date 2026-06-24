/* ============================================================
   SYSTEMS THAT DECIDE — Diagnostic question data + encouragement copy
   Loaded by diagnostic.html. Vanilla globals on window.
   Question IDs, options and follow-up logic are unchanged from the
   original so the admin scoring tool + Formspree payload still align.
   ============================================================ */

const BRAND_CONTEXT = {
  id: 'context',
  label: 'Organisation Background',
  short: 'Background',
  intro: 'A short warm-up. These questions set the context for your assessment — they are not scored. Answer as accurately as you can.',
  questions: [
    { id:'ctx_1', text:'Organisation name and primary industry.', type:'textarea', required:true },
    { id:'ctx_2', text:'Approximate total annual advertising investment (all channels, including agency fees).',
      type:'radio', required:true,
      options:['Under $1M','$1M–$5M','$5M–$15M','$15M–$50M','Over $50M'] },
    { id:'ctx_3', text:'How is media currently managed?', type:'radio', required:true,
      options:['Fully managed by an external agency (no in-house media function)',
        'Primarily agency-managed with an internal oversight role',
        'Hybrid: some channels in-house, some agency-managed',
        'Primarily in-house with agency support for specific channels or markets',
        'Fully in-house'] },
    { id:'ctx_4', text:'How many people in your organisation have a primary responsibility for advertising technology or media operations? (Include agency-side staff dedicated to your account.)',
      type:'radio', required:true,
      options:['1–2 people','3–5 people','6–10 people','More than 10 people'] },
    { id:'ctx_5', text:'Which of the following platforms are you currently active on? (Select all that apply.)',
      type:'checkbox', required:true,
      options:['Google Ads (Search, Display, YouTube)','Google DV360','Meta (Facebook / Instagram)',
        'The Trade Desk','Amazon DSP','Yahoo DSP','Nexxen','MiQ','StackAdapt','Adform',
        'Retail media network(s) (e.g. Cartology, Coles360, Amazon Ads)',
        'TikTok','Programmatic Out-of-Home Platforms (Vistar Media, Hivestack etc)','Other'],
      followUp:{ triggers:['Other'], text:'Please list the other platforms you actively use:' } },
    { id:'ctx_6', text:'What is the primary business objective your advertising investment is working toward right now?',
      type:'textarea', required:true }
  ]
};

const BRAND_DIMENSIONS = [
  {
    number:1, title:'Data Infrastructure Maturity', short:'Data Infrastructure',
    intro:'What this section assesses: the quality, accessibility, and structural coherence of your first-party data, and whether it is in a condition that automated systems can act on.',
    questions:[
      { id:'d1_1', rationale:'Select what\'s actually true today, not the aspiration. The gap between the two is one of the most common findings in this diagnostic.', text:'How would you describe the current state of your customer data? Select the option that most accurately describes your situation — not your aspiration.', type:'radio', required:true,
        options:[
          'Our customer data lives in separate systems (CRM, email platform, website analytics, transaction records) with no consistent connection between them. We cannot easily combine them for media activation.',
          'We have centralised some data, but it is not consistently used for media targeting. The connection between our data and our media platforms is manual and intermittent.',
          'We use first-party data for audience targeting in at least one channel. Identity resolution across systems is partial — we can match some records but not all.',
          'Our first-party data is actively used across multiple channels with a consistent approach to identity resolution. We can reliably build and activate audiences from our own data.',
          'Our data infrastructure is production-grade. It supports near-real-time signal processing and is structured in a way that automated systems can act on it directly.'
        ]},
      { id:'d1_2', rationale:'A specific, credible answer here tells us more about your real data readiness than a general statement about having first-party data.', text:'If someone asked you to upload a first-party audience segment to your DSP or social platform tomorrow, what would that process look like? Describe the actual steps, including who would need to be involved and how long it would take.', type:'textarea', required:true },
      { id:'d1_3', text:'Do you have a Customer Data Platform (CDP) or equivalent centralised data infrastructure?', type:'radio', required:true,
        options:['No','We are evaluating options but have not implemented anything','Yes, but it is not fully configured or actively used for media activation','Yes, and it is actively used for media activation'],
        followUp:{ triggers:['Yes, but it is not fully configured or actively used for media activation','Yes, and it is actively used for media activation'], text:'If yes, which platform?' } },
      { id:'d1_4', rationale:'A single retail media clean room relationship is a starting point, not a functioning data infrastructure. This question is about whether the outputs are actually informing decisions.', text:'Does a data clean room relationship exist in your organisation?', type:'radio', required:true,
        options:['No, and we have not explored this','We have had vendor briefings but nothing is operational','Yes, through a single retail media network relationship (e.g., Amazon, Everyday Rewards, Cartology)','Yes, across two or more partners, and we are actively using the outputs to inform media decisions'] },
      { id:'d1_5', text:'Who owns data governance for your marketing and advertising data?', type:'radio', required:true,
        options:['There is no named owner. Data governance is managed informally across teams.','There is a named owner but no documented governance policy.','There is a named owner and a governance policy, but it is not consistently applied across all platforms and use cases.','There is a named owner, a documented policy, and it is consistently applied. We have a clear framework for how customer data can be collected, stored, and used.'] },
      { id:'d1_6', text:'Can your media platforms access your first-party signal in real time or near-real time — for example, to suppress a recent purchaser from a campaign within hours of their transaction?', type:'radio', required:true,
        options:['No. We have no real-time data connection between our CRM or transaction systems and our media platforms.','Partially. Some channels have near-real-time connections; others are batch-updated weekly or monthly.','Yes, for most of our major channels.','Yes, across all channels, and it is a standard part of our campaign configuration.'] }
    ]
  },
  {
    number:2, title:'Platform Architecture and Dependency Risk', short:'Platform Architecture',
    intro:'What this section assesses: the degree to which your advertising infrastructure is structurally dependent on a small number of platform vendors, and the consequent exposure to lock-in and loss of decisioning autonomy.',
    questions:[
      { id:'d2_1', rationale:'High concentration is not automatically a problem. The question is whether it is a deliberate choice you have examined, or a default no one has looked at.', text:'Approximately what proportion of your total advertising investment sits within Google and Meta combined?', type:'radio', required:true,
        options:['Less than 30%','30–50%','50–70%','70–90%','More than 90%'] },
      { id:'d2_2', text:'Who manages your DSP configuration, and does your internal team have direct access?', type:'radio', required:true,
        options:['Our agency manages the DSP entirely. We have no direct access and do not review the configuration.','Our agency manages the DSP. We have read-only access and occasionally review it.','Our agency manages day-to-day configuration, but we have direct access and are involved in strategic decisions about how it is set up.','We have direct access and primary responsibility for DSP configuration. We may use agency support, but the decisions are ours.'] },
      { id:'d2_3', rationale:'An agency earning meaningful revenue from a platform relationship has a structural incentive to recommend that platform\'s products — including agentic ones — regardless of whether they are right for you. You are not at fault if you have never asked. The risk exists either way.', text:'Do you know whether your agency has preferred partner or volume commitment arrangements with any of the platforms in your media plan?', type:'radio', required:true,
        options:['No. We have never asked and it has not been disclosed.','We are aware that our agency has platform relationships but have not been given details of the commercial terms.','Yes. Our agency has disclosed the nature of their platform arrangements to us.','Yes. Our agency provides full disclosure and we have reviewed the commercial terms. We have criteria for ensuring recommendations are made on our behalf, not theirs.'] },
      { id:'d2_4', rationale:'This is often where the most important risk in the whole diagnostic surfaces. If your only measurement comes from the platforms you are trying to evaluate, every later decision inherits that problem.', text:'Do you have independent measurement that sits outside your media platforms? (Examples: a Marketing Mix Model, multi-touch attribution model, third-party measurement partner, or internal analytics function that verifies what your platforms are reporting.)', type:'radio', required:true,
        options:['No. Our primary measurement comes from within the platforms themselves (e.g., Google Ads, Meta Ads Manager).','We have some independent measurement but it is not used systematically to verify platform-reported results.','Yes. We have an independent measurement layer and we use it to interrogate platform-reported results.','Yes. Independent measurement is our primary source of truth. Platform-reported results are a secondary signal.'] },
      { id:'d2_5', text:'In the last two years, has your organisation needed to migrate audiences, data, or campaign history from one platform to another?', type:'radio', required:true,
        options:['No, we have not done this.','Yes.'],
        followUp:{ triggers:['Yes.'], text:'Briefly describe what happened and how straightforward it was.' } },
      { id:'d2_6', rationale:'A rough, candid answer tells us more than a considered one. This question is about whether dependency risk is real to you or still abstract.', text:'If your primary DSP relationship ended tomorrow — by your choice or theirs — what would the impact on your business be?', type:'textarea', required:true }
    ]
  },
  {
    number:3, title:'Decisioning Architecture', short:'Decisioning Architecture',
    intro:'What this section assesses: the clarity and coherence of your existing decision-making structures for advertising technology. Agentic systems will insert themselves into these structures. If the structures do not exist, the systems will make decisions by default.',
    questions:[
      { id:'d3_1', rationale:'Vagueness in this answer is itself a finding. \'It depends\' or \'usually the agency handles it\' tells us the decision right does not actually exist yet.', text:'Who has authority to onboard a new advertising platform or make a significant change to an existing platform configuration? Describe the actual decision-making structure, including who is involved and what approval is required.', type:'textarea', required:true },
      { id:'d3_2', text:'Does a documented process exist for evaluating new advertising technology?', type:'radio', required:true,
        options:['No. Platform adoption is typically driven by agency recommendations or vendor introductions.','Informally. There are implicit criteria but they are not written down.','Yes, for significant investments. Smaller platform additions are less formally evaluated.','Yes, for all platform decisions regardless of scale.'] },
      { id:'d3_3', rationale:'This is the single most revealing question in the diagnostic. We ask it cold, without prompting, because the specificity of the answer — not its polish — is what separates real decisioning capability from decisioning by default.', text:'In your own words, describe what your highest-spend automated campaign type is currently optimising for. For example: if you run Performance Max, what signal is it optimising toward, and what data is feeding that signal?', type:'textarea', required:true },
      { id:'d3_4', text:'In the last 12 months, have you overridden or rejected a recommendation from a media platform or agency on how to configure an automated campaign?', type:'radio', required:true,
        options:['No.','Yes.'],
        followUp:{ triggers:['Yes.'], text:'Briefly describe the situation and the outcome.' } },
      { id:'d3_5', text:'Are there documented thresholds at which a human must review or approve a platform decision before it is implemented? (Examples: budget changes above a certain amount, new audience configurations, changes to bidding strategy.)', type:'radio', required:true,
        options:['No. Platform and agency decisions are implemented without a formal human review threshold.','Informally. Major changes are flagged, but there are no documented thresholds.','Yes, for budget decisions. Other platform changes are less formally governed.','Yes. We have documented thresholds across budget, audience, and configuration decisions.'] },
      { id:'d3_6', text:'How would you describe the primary driver of technology adoption in your advertising stack?', type:'radio', required:true,
        options:['Vendor-led: we typically adopt what a platform or vendor introduces to us, often through an agency relationship.','Agency-led: our agency recommends platforms and tools, and we approve significant decisions.','Criteria-led: we have defined what we need from our technology stack and evaluate options against those criteria.','Internal-led: we drive our own technology evaluation process and use agency or vendor input as one data source.'] },
      { id:'d3_7',
        rationale:'We ask this because the Privacy Act obligations carry civil penalty exposure and commence 10 December 2026 — that part is confirmed. The Children\'s Code\'s industry compliance date isn\'t confirmed yet, but the registration deadline is the same day. Treat that as a planning window rather than a reason to wait.',
        text:'Two regulatory obligations are landing on automated decisioning in the second half of 2026: the Privacy Act\'s automated decision-making transparency obligations (in effect 10 December 2026 — a decision-level explanation must be available on request) and the OAIC\'s Children\'s Online Privacy Code (must be registered by the same date, though the OAIC hasn\'t yet confirmed when industry has to comply). Have you assessed your exposure to either?',
        type:'radio', required:true,
        options:[
          'No. We haven\'t assessed our exposure to either obligation.',
          'We\'re aware these are coming but haven\'t mapped our specific exposure.',
          'We\'ve assessed our exposure to one of the two, not both.',
          'Yes. We\'ve assessed both and have a documented position, even with the Children\'s Code compliance date still unconfirmed.'
        ],
        followUp:{
          triggers:[
            'No. We haven\'t assessed our exposure to either obligation.',
            'We\'re aware these are coming but haven\'t mapped our specific exposure.'
          ],
          text:'What would need to be true for this to become a named priority before December?'
        }
      }
    ]
  },
  {
    number:4, title:'Human-to-Machine Handoff Readiness', short:'Human-Machine Handoff',
    intro:'What this section assesses: your organisation\'s operational readiness to govern a media operation where consequential decisions are increasingly made by automated systems. This is about process and oversight, not AI literacy.',
    questions:[
      { id:'d4_1', rationale:'This tells us your actual working model of what your automated systems are doing — not the model in the platform\'s documentation.', text:'Describe, in plain language, what Google Performance Max or Meta Advantage+ (or your primary automated campaign format) is doing inside your current campaigns. What is it optimising toward? What data is it using? What decisions is it making without human input?', type:'textarea', required:true },
      { id:'d4_2', text:'How frequently does your team review the configuration of your automated platform tools — not the results they produce, but the settings and signals they are operating on?', type:'radio', required:true,
        options:['We do not have a formal process for reviewing configuration separate from results.','Occasionally, when something unusual shows up in performance data.','Quarterly, as part of a structured review process.','Monthly or more frequently. Configuration review is a standard part of how we operate.'] },
      { id:'d4_3', rationale:'Named people and specific actions matter more than a polished description. \'We would escalate to the agency\' usually means the oversight structure exists in principle but not in practice.', text:'If an automated platform decision produced a significant negative outcome — for example, an unexpected budget spike, a brand safety issue, or a sudden audience targeting shift — walk me through what would happen. Who would notice, who would be called, what would they change, and how long would it take?', type:'textarea', required:true },
      { id:'d4_4', text:'Does your team have the capability to explain an automated platform decision to a client or leadership team — including what signal drove it, whether it was appropriate, and how it could be changed?', type:'radio', required:true,
        options:['No. We rely on the agency or the platform to explain automated decisions.','Partially. We can explain outcomes but not the decisions that produced them.','Yes, for most platforms. There are some areas where we rely on the agency for technical explanation.','Yes. We can interrogate and explain automated decisions across our major platforms.'] },
      { id:'d4_5', text:'Who in your team is specifically responsible for governing automated platform decisions, as distinct from running campaigns?', type:'textarea', required:true },
      { id:'d4_6', text:'Have you explicitly defined which decisions you want automated systems to make independently, and which decisions must involve a human?', type:'radio', required:true,
        options:['No. This boundary has not been defined.','Informally. There is a general understanding, but it is not documented.','Yes, for some decision types. Others are less clearly defined.','Yes. We have a documented framework for human vs. machine decision authority.'] }
    ]
  },
  {
    number:5, title:'Organisational Alignment', short:'Organisational Alignment',
    intro:'What this section assesses: whether your organisation\'s structure, governance, and leadership alignment support coherent advertising infrastructure decisions.',
    questions:[
      { id:'d5_1', text:'Who is the named owner of advertising technology decisions in your organisation? Please give their title and a brief description of their remit. If the answer is your agency, name the relevant role there.', type:'textarea', required:true },
      { id:'d5_2', text:'Does that person have the authority to make a significant platform change — for example, replacing a DSP or implementing a new data integration — without requiring sign-off from IT, procurement, or a more senior leader?', type:'radio', required:true,
        options:['No. Significant platform changes require cross-functional approval.','Partially. Some decisions can be made independently; others require sign-off.','Yes, within a defined budget threshold.','Yes, effectively. The named owner has genuine authority over the advertising technology stack.'] },
      { id:'d5_3', text:'How engaged is your most senior marketing leader — CMO, GM Marketing, or equivalent — with advertising technology decisions?', type:'radio', required:true,
        options:['Not engaged. Technology decisions are fully delegated and rarely discussed at leadership level.','Aware of outcomes. Technology is discussed in terms of results (ROAS, CPM) but not in terms of how the stack is configured.','Involved in major decisions. Technology strategy is discussed at leadership level when significant investments are required.','Actively engaged. The CMO treats advertising infrastructure as a strategic asset and is directly involved in technology decisions.'] },
      { id:'d5_4', text:'Does a technology roadmap exist for your marketing stack, with budget allocated to executing it?', type:'radio', required:true,
        options:['No roadmap exists.','An informal roadmap exists, but it is not documented and budget is not explicitly allocated.','A documented roadmap exists, but budget is allocated reactively rather than proactively.','A documented roadmap exists with budget allocated and a named owner responsible for execution.'] },
      { id:'d5_5', text:'How are vendor relationships managed in your organisation?', type:'radio', required:true,
        options:['Vendors have direct access to our decision-makers and often drive the agenda for what we adopt.','Our agency manages vendor relationships on our behalf. We engage vendors when the agency introduces them.','We manage vendor relationships directly, but decisions are made on an ad-hoc basis without formal evaluation criteria.','Vendor relationships are managed at arm\'s length from technology selection. We have documented evaluation criteria and we use them.'] },
      { id:'d5_6', text:'In the last 12 months, has your organisation made a deliberate investment in building internal capability around advertising technology — for example, hiring a specialist role, running structured training, or funding a team member to develop expertise?', type:'radio', required:true,
        options:['No.','Yes.'],
        followUp:{ triggers:['Yes.'], text:'Briefly describe what the investment was.' } }
    ]
  },
  {
    number:6, title:'Measurement Independence', short:'Measurement Independence',
    intro:'What this section assesses: whether your organisation has the capability to independently verify what your agentic advertising systems are doing and whether they are producing genuine business outcomes.',
    questions:[
      { id:'d6_1', rationale:'If Google reported a 4x return on Performance Max today, what would you use to check that number? If the honest answer is nothing, you are in the two-black-box position: the same system makes the decision and grades its own work.', text:'For your AI-managed campaign formats — Performance Max, Advantage+, or equivalent — where does the primary performance measurement come from?', type:'radio', required:true,
        options:['Entirely from the platform running the AI. We use Google\'s or Meta\'s own reporting as our primary source of truth.','Primarily from the platform, with some cross-referencing from internal analytics or a third-party tool, though this is not systematic.','We use a combination of platform reporting and independent measurement. We flag discrepancies between the two.','Independent measurement is our primary source of truth. Platform-reported results are a secondary signal we interrogate rather than accept.'] },
      { id:'d6_2', rationale:'The absence of any incrementality testing is itself a finding worth naming plainly: there is no independent basis for any performance claim made by any platform in this engagement.', text:'Has your organisation ever run a holdout test or incrementality experiment for any of your AI-managed campaign formats?', type:'radio', required:true,
        options:['No. We have never run an incrementality test for any campaign.','Yes, for one channel or campaign type, at some point in the last three years.','Yes, for multiple channels. Incrementality testing is a periodic part of how we evaluate media.','Yes. Holdout testing is a standard part of our measurement practice and informs budget allocation decisions.'] },
      { id:'d6_3', rationale:'Platform-suggested KPIs are designed to maximise engagement with that platform. This question is about whether your goals were set independently of that incentive.', text:'Who defined the KPIs your AI-managed campaigns are currently optimising toward?', type:'radio', required:true,
        options:['The platform suggested them and we accepted the recommendation.','Our agency defined them, drawing on platform-recommended benchmarks.','Our agency defined them, based on our business objectives, independently of platform recommendations.','We defined them internally based on a clear analysis of what our business needs, with no platform input shaping the framework.'] },
      { id:'d6_4', text:'Do you have visibility into what your AI-managed campaigns are actually buying — for example, what inventory PMax is purchasing, what audience segments Advantage+ is serving, or what placements your automated DSP buying is selecting?', type:'radio', required:true,
        options:['No. We see aggregated performance reports but not the specific decisions the systems are making.','Partially. We can see some of what the systems are buying, but the level of transparency varies significantly by platform.','Yes, for most platforms. We review placement and audience data regularly as part of campaign management.','Yes. We have full or near-full visibility into what our automated systems are purchasing and we review it systematically.'] },
      { id:'d6_5', rationale:'This tells us whether independent measurement — where it exists — actually changes decisions, or just runs in parallel without being acted on.', text:'If your measurement framework produced a result that contradicted what a platform was reporting — for example, your MMM showed a channel contributing less than the platform claimed — what would happen?', type:'textarea', required:true },
      { id:'d6_6', text:'What is your approximate agentic exposure percentage — meaning, what proportion of your total advertising spend is currently in AI-managed or algorithmic campaign modes?', type:'textarea', required:true }
    ]
  }
];

const AGENCY_CONTEXT = {
  id: 'context',
  label: 'Agency Background',
  short: 'Background',
  intro: 'A short warm-up. These questions set the context for your assessment — they are not scored. Answer as accurately as you can.',
  questions: [
    { id:'ctx_1', text:'Agency name, ownership structure (independent, network-owned, holding company), and primary service model.', type:'textarea', required:true },
    { id:'ctx_2', text:'Approximate total annual billings under management (all clients, all channels).', type:'radio', required:true,
      options:['Under $20M','$20M–$50M','$50M–$150M','$150M–$500M','Over $500M'] },
    { id:'ctx_3', text:'How many full-time staff are dedicated to performance media, programmatic, and paid social operations? (Include agency-embedded roles if applicable.)', type:'textarea', required:true },
    { id:'ctx_4', text:'What is your primary commercial model?', type:'radio', required:true,
      options:['Fee-based (retainer or project fees, no media margin)','Commission-based (percentage of media spend)','Hybrid (fees plus some media margin or technology margin)','Performance-based (fees tied to client outcomes)','Other'] },
    { id:'ctx_5', text:'Across your client base, which of the following platforms do you actively manage spend on? (Select all that apply.)',
      type:'checkbox', required:true,
      options:['Google Ads (Search, Display, YouTube)','Google DV360','Meta (Facebook / Instagram)','The Trade Desk','Amazon DSP','Yahoo DSP','Nexxen','MiQ','StackAdapt','Adform','Retail media network(s) (e.g. Cartology, Coles360, Amazon Ads)','TikTok','Programmatic Out-of-Home Platforms (Vistar Media, Hivestack etc)','Other'],
      followUp:{ triggers:['Other'], text:'Please list the other platforms you actively use:' } },
    { id:'ctx_6', text:'Do you participate in any platform preferred partner, reseller, or certification programs?', type:'radio', required:true,
      options:['No','Yes'],
      followUp:{ triggers:['Yes'], text:'Please list the programs and the primary obligations they carry.' } }
  ]
};

const AGENCY_DIMENSIONS = [
  {
    number:1, title:'Data Infrastructure and Client Data Governance', short:'Data Governance',
    intro:'What this section assesses: how the agency handles client first-party data, whether it has consistent data governance across its client base, and whether it has proprietary data capability or is entirely dependent on platform-native data.',
    questions:[
      { id:'d1_1', rationale:'An agency that cannot describe how it separates client data is exposing every client on its roster to the same risk, not just you.', text:'How is client first-party data currently managed within your agency? Select the option that most accurately describes your situation.', type:'radio', required:true,
        options:['Client data is managed separately for each client with no consistent framework. Each client\'s data setup is determined by the client or the individual account team.','We have informal standards for how client data is handled, but they are not documented or consistently applied.','We have documented data governance standards that apply to all client engagements. Client data is logically separated and access is controlled.','We have a formal client data governance framework, documented data handling policies, and technical controls that enforce separation between client datasets. Clients have been briefed on how their data is managed within our systems.'] },
      { id:'d1_2', rationale:'The answer reveals whether your data is genuinely portable or effectively locked into agency systems. A specific answer protects the client. A vague one is itself useful information.', text:'If a client terminated their relationship with your agency tomorrow, what would happen to their first-party data, their audience segments, and their campaign history? Describe the actual process — what data would they take with them, what would remain in your systems, and how long would it take to complete the transition?', type:'textarea', required:true },
      { id:'d1_3', text:'Does your agency have proprietary data capability — for example, a first-party data asset, a proprietary audience segment, or a data product — that you offer to clients?', type:'radio', required:true,
        options:['No. Our data capability is entirely derived from the platforms we activate on.','We have some proprietary data assets but they are not a core part of our offering.','Yes. We have proprietary data products that supplement client and platform data.','Yes. Proprietary data is a significant part of our commercial offering and a differentiator in new business.'] },
      { id:'d1_4', text:'Does your agency have a clean room capability — either your own or through a platform partnership — that you actively use on behalf of clients?', type:'radio', required:true,
        options:['No.','We have explored this but nothing is operational.','Yes, through a platform or retail media network relationship, for specific clients.','Yes. Clean room capability is operationally active for multiple clients and producing outputs that inform media decisions.'] },
      { id:'d1_5', text:'How does your agency approach identity resolution across a client\'s customer data? Describe the approach you use — whether you use a third-party identity resolution partner, rely on platform-native identity tools, or have another approach. If this varies by client, describe the most common approach.', type:'textarea', required:true },
      { id:'d1_6', text:'When a client provides first-party data for media activation, is there a documented process for how that data is ingested, stored, and used — including how long it is retained and how it is deleted?', type:'radio', required:true,
        options:['No documented process exists. Data handling is managed case by case.','An informal process exists but it is not documented.','Yes, a documented process exists, though it is not consistently applied across all clients.','Yes. A documented data handling policy covers ingestion, storage, use, retention, and deletion. All clients are briefed on it.'] }
    ]
  },
  {
    number:2, title:'Platform Architecture and Commercial Dependency Risk', short:'Commercial Dependency',
    intro:'What this section assesses: the degree to which the agency\'s commercial model and operational capability are structurally dependent on a small number of platform relationships, and what that dependency means for the agency\'s ability to act in clients\' interests.',
    questions:[
      { id:'d2_1', rationale:'We ask this to establish how exposed your agency is to platform policy and algorithm changes, since that exposure shapes every recommendation downstream.', text:'Approximately what proportion of total client billings flows through Google and Meta combined?', type:'radio', required:true,
        options:['Less than 30%','30–50%','50–70%','70–90%','More than 90%'] },
      { id:'d2_2', rationale:'Where an agency\'s revenue comes from shapes which platforms it has an incentive to recommend, including agentic products. This is not an accusation — it is the one fact a client needs to weigh your recommendations fairly. An approximate range is enough. \'I don\'t know, here\'s who would know\' is a complete answer.', text:'What proportion of the agency\'s total revenue is derived from platform rebates, volume bonuses, preferred partner arrangements, or technology margin — as distinct from client fees? (This question is asked in confidence. An approximate range is sufficient.)', type:'radio', required:true,
        options:['None. All revenue is derived from client fees.','Less than 10% of revenue','10–25% of revenue','More than 25% of revenue','I do not know (please flag who would know this)'] },
      { id:'d2_3', rationale:'Non-disclosure of material commercial arrangements is a live legal and reputational risk in ANZ right now. This question establishes whether the risk is visible and managed — not whether the arrangement itself is acceptable.', text:'Are your platform preferred partner or volume commitment arrangements disclosed to clients?', type:'radio', required:true,
        options:['No. These arrangements are not disclosed.','Partially. Clients are aware we have platform relationships but specific terms are not shared.','Yes. We proactively disclose the nature of our platform arrangements to clients.','Yes. Full disclosure is a standard part of our client agreements and we provide documentation on request.'] },
      { id:'d2_4', rationale:'We ask this to see whether you have modelled your own revenue exposure to a single platform relationship. A rough, candid answer is more useful than a polished one.', text:'If your primary platform partner significantly changed their preferred partner program terms tomorrow — for example, reducing rebates, increasing volume commitments, or changing the commercial structure — what would the impact be on your agency\'s revenue and on your ability to serve clients?', type:'textarea', required:true },
      { id:'d2_5', text:'Does your agency have genuine technical capability across DSPs beyond your primary platform? For example, if a major client wanted to run The Trade Desk instead of DV360 (or vice versa), could your team configure and manage that engagement to a high standard?', type:'radio', required:true,
        options:['No. We have deep capability in one or two platforms and limited capability outside them.','Partial capability. We can manage multiple DSPs but some are significantly stronger than others.','Yes. We have genuine operational capability across multiple DSPs.','Yes. We actively manage clients across multiple DSPs as a standard part of our operation.'] },
      { id:'d2_6', text:'Has your agency conducted a formal review of its platform concentration risk in the last 12 months?', type:'radio', required:true,
        options:['No.','Informally. The risk is understood by leadership but has not been formally assessed.','Yes, and the findings have informed decisions about platform strategy or commercial arrangements.'] }
    ]
  },
  {
    number:3, title:'Decisioning Architecture', short:'Decisioning Architecture',
    intro:'What this section assesses: how the agency makes technology and platform recommendations for clients, whether those recommendations are driven by client criteria or agency economics, and whether there is a governance structure that manages conflicts of interest explicitly.',
    questions:[
      { id:'d3_1', text:'When you recommend a platform or technology to a client, walk me through the actual process. What criteria are applied, who is involved in the recommendation, and how is the final recommendation documented?', type:'textarea', required:true },
      { id:'d3_2', text:'Who inside the agency has authority over technology recommendations to clients — and is that person independent of the agency\'s commercial relationships with platforms?', type:'textarea', required:true },
      { id:'d3_3', rationale:'This is the single most revealing question in the diagnostic. It is not a test of any one person\'s knowledge — it is a check on whether your agency\'s expertise is real decisioning capability or platform dependency dressed as expertise.', text:'Can you describe, for your largest or most complex client, what their primary automated campaign format is currently optimising for — and what data is feeding it?', type:'textarea', required:true },
      { id:'d3_4', text:'Does your agency have a documented framework for managing conflicts of interest between the agency\'s commercial interests and client outcomes?', type:'radio', required:true,
        options:['No documented framework exists.','An informal approach exists. Conflicts are managed case by case.','Yes. A framework exists for significant conflicts, though not all scenarios are covered.','Yes. A comprehensive conflict of interest framework is documented, reviewed annually, and disclosed to clients on request.'] },
      { id:'d3_5', rationale:'We ask this to see whether prioritising the client\'s outcome over your own commercial interest is something your agency has actually done — not just something it would claim to do.', text:'In the last 12 months, have you recommended that a client move to a platform or configuration that reduced your agency\'s revenue or made your operation more complex to manage?', type:'radio', required:true,
        options:['No.','Yes.'],
        followUp:{ triggers:['Yes.'], text:'Briefly describe the situation.' } },
      { id:'d3_6', text:'How does your agency make decisions about its own internal technology adoption — for example, adding a new reporting platform, an AI tool, or a measurement capability to your stack?', type:'radio', required:true,
        options:['Primarily vendor-driven. We adopt tools when platforms or technology providers present them to us.','Leadership-driven. Senior leaders evaluate and approve new tools, usually prompted by vendor introductions.','Criteria-driven. We have defined what we need from our technology stack and evaluate tools against those criteria.','Strategically planned. Technology adoption is part of a documented agency strategy with defined investment and evaluation processes.'] },
      { id:'d3_7',
        rationale:'We ask this because the Privacy Act obligations carry civil penalty exposure and commence 10 December 2026 — that part is confirmed. The Children\'s Code\'s industry compliance date isn\'t confirmed yet, but the registration deadline is the same day. Treat that as a planning window rather than a reason to wait.',
        text:'Two regulatory obligations are landing on automated decisioning in the second half of 2026: the Privacy Act\'s automated decision-making transparency obligations (in effect 10 December 2026 — a decision-level explanation must be available on request) and the OAIC\'s Children\'s Online Privacy Code (must be registered by the same date, though the OAIC hasn\'t yet confirmed when industry has to comply). Have you assessed your exposure to either?',
        type:'radio', required:true,
        options:[
          'No. We haven\'t assessed what either obligation would require of our clients or of us.',
          'We\'re aware these are coming but haven\'t mapped what they mean for how we run client campaigns.',
          'We\'ve assessed what one of the two obligations requires, not both.',
          'Yes. We\'ve assessed both, and could produce a decision-level explanation for a client\'s automated targeting decisions if asked.'
        ],
        followUp:{
          triggers:[
            'No. We haven\'t assessed what either obligation would require of our clients or of us.',
            'We\'re aware these are coming but haven\'t mapped what they mean for how we run client campaigns.'
          ],
          text:'What would need to be true for this to become a named priority before December?'
        }
      }
    ]
  },
  {
    number:4, title:'Human-to-Machine Handoff Readiness', short:'Human-Machine Handoff',
    intro:'What this section assesses: the agency\'s operational capability to govern a media operation where automated systems are making an increasing proportion of the consequential decisions, and the structural risk that agentic buying poses to the agency\'s current operating model.',
    questions:[
      { id:'d4_1', text:'Across your client base, what proportion of media spend is currently managed through automated campaign formats — such as Performance Max, Meta Advantage+, DV360 automated bidding, or equivalent?', type:'radio', required:true,
        options:['Less than 25% of spend under management','25–50%','50–75%','More than 75%'] },
      { id:'d4_2', rationale:'An agency that can only report outcomes — not explain the decisions behind them — is managing platforms in name only.', text:'For the automated campaign formats you manage on behalf of clients, can your team explain — to a client\'s satisfaction — what the system is optimising for, what data it is using, and how the outcome was produced?', type:'radio', required:true,
        options:['No. We can report on outcomes but not on the decisions that produced them.','Partially. We can explain the setup and general intent, but detailed interrogation of automated decisions is difficult.','Yes, for most platforms. Some platforms are more opaque than others.','Yes. We have the capability to interrogate and explain automated decisions across our major platforms.'] },
      { id:'d4_3', rationale:'The specificity of this answer matters more than the content. Named people and real timeframes. A vague answer here usually means the process only exists on paper.', text:'If an automated platform decision produced a significant negative outcome for a client — an unexpected budget spike, a brand safety incident, a sudden drop in performance — walk me through what would actually happen inside your agency. Who would notice, who would be called, what would they do, and how long would it take?', type:'textarea', required:true },
      { id:'d4_4', text:'Does your agency have a formal process for reviewing platform configurations across accounts — separate from reviewing campaign performance?', type:'radio', required:true,
        options:['No. Configuration review happens reactively when performance changes.','Informally. Senior team members review configurations periodically without a defined process.','Yes, for major clients. Smaller accounts are reviewed less systematically.','Yes. Configuration review is a standard, documented process that applies across all accounts above a defined spend threshold.'] },
      { id:'d4_5', rationale:'There is no right answer to this one. Agencies that have thought seriously about how their value holds up as agentic buying automates more of the work are in a structurally different position than agencies that have not — regardless of how they score elsewhere.', text:'As agentic advertising systems — where platforms make more decisions with less human input — become the operational default, how does your agency plan to maintain the expertise and oversight capability that clients are currently paying for?', type:'textarea', required:true },
      { id:'d4_6', text:'Does your agency currently have a defined position on how it will govern agentic platforms operating across its client base — for example, an internal policy on when automated decisions require human review, or a client disclosure standard for AI-assisted campaign management?', type:'radio', required:true,
        options:['No. We have not developed a formal position on this.','Informally. There is a general approach but it is not documented.','In development. We are working on a framework but it is not finalised.','Yes. We have a documented policy covering human oversight thresholds, client disclosure, and configuration governance for automated campaign management.'] }
    ]
  },
  {
    number:5, title:'Organisational Alignment', short:'Organisational Alignment',
    intro:'What this section assesses: whether the agency\'s organisational structure, leadership alignment, and investment priorities support coherent technology decisions — both for clients and for the agency itself.',
    questions:[
      { id:'d5_1', text:'Who is the named owner of technology strategy inside your agency — covering both the tools the agency uses to operate and the technology recommendations it makes to clients? If these are separate roles, name both.', type:'textarea', required:true },
      { id:'d5_2', text:'Does that person have genuine authority to make technology decisions — including decisions that might affect platform commercial relationships or require investment in capability?', type:'radio', required:true,
        options:['No. Technology decisions require approval from ownership or the broader leadership team, and commercial relationships significantly influence what is considered.','Partial authority. Technology decisions within a defined scope are theirs to make; significant changes require broader sign-off.','Yes. The named technology leader has meaningful authority over both internal tooling and client-facing technology recommendations.'] },
      { id:'d5_3', text:'Does your agency have a documented technology strategy — covering what you believe the advertising technology landscape will look like in 2–3 years, and how your agency is positioning itself within it?', type:'radio', required:true,
        options:['No. Technology adoption is primarily reactive.','Informally. Leadership has a view but it is not documented or resourced.','Yes. A documented strategy exists and has informed specific investment or hiring decisions.','Yes. Technology strategy is a standing agenda item at leadership level and is reviewed formally at least annually.'] },
      { id:'d5_4', text:'How does your agency invest in its own capability development around advertising technology? Describe specific investments — training, tools, hires, or partnerships — made in the last 12 months.', type:'textarea', required:true },
      { id:'d5_5', text:'Is technology excellence — meaning deep expertise in how advertising platforms actually work, not just certification — a genuine differentiator in how your agency wins new business?', type:'radio', required:true,
        options:['No. We compete primarily on service, relationships, and creative capability.','Partially. Technology is part of our pitch but not the primary differentiator.','Yes. Technology expertise is a consistent reason clients choose us over competitors.','Yes, and we can point to specific examples of winning business or retaining clients directly because of our technology capability.'] },
      { id:'d5_6', rationale:'We ask this to see whether this risk has already become commercial reality — not just a theoretical exposure.', text:'In the last 12 months, has your agency lost a client relationship — or had a significant conversation about losing one — where the agency\'s technology capability or platform governance was a factor?', type:'radio', required:true,
        options:['No.','Yes.'],
        followUp:{ triggers:['Yes.'], text:'Briefly describe the situation, without naming the client.' } }
    ]
  },
  {
    number:6, title:'Measurement Independence', short:'Measurement Independence',
    intro:'What this section assesses: whether the agency has independent measurement capability for the AI-managed campaigns it runs on clients\' behalf — or whether it is, by default, reporting what the platforms tell it to report.',
    questions:[
      { id:'d6_1', rationale:'If a platform both runs your client\'s automated campaigns and reports on how well they performed, there is no independent check on either. This question establishes whether that is the case.', text:'For clients whose media spend is primarily managed through AI-automated formats (PMax, Advantage+, DV360 automated bidding, etc.), what measurement approach do you use to verify the platform\'s reported performance? Describe what measurement sits outside the platform\'s own reporting for a typical client in this situation.', type:'textarea', required:true },
      { id:'d6_2', text:'Do you currently run incrementality testing (holdout tests, geo-based experiments, or equivalent) for clients on their AI-managed campaign formats?', type:'radio', required:true,
        options:['No. Incrementality testing is not part of our standard capability.','Rarely. We have done it for specific clients but it is not standard practice.','For some clients. We recommend it to larger clients or where the question has been raised.','Yes. Incrementality testing is a standard part of how we validate performance for clients with significant AI-managed spend.'] },
      { id:'d6_3', text:'When you present performance results for AI-managed campaigns to clients, how do you characterise the reliability of platform-reported attribution?', type:'radio', required:true,
        options:['We present platform-reported results as the primary performance indicator without caveats about attribution methodology.','We note that platform attribution has limitations but do not provide an alternative measurement source.','We present platform data alongside a separate measurement source and note where they diverge.','We actively manage the gap between platform-reported and independently verified performance, and our client reporting reflects both.'] },
      { id:'d6_4', rationale:'Most agencies have never calculated this number for their own largest account. The act of calculating it is often more revealing than the number itself.', text:'For your largest or most significant client, can you identify what percentage of their performance media spend is in AI-managed modes — and do you have any independent verification of what those systems are producing?', type:'textarea', required:true },
      { id:'d6_5', rationale:'KPIs suggested by a platform are designed to maximise engagement with that platform, not necessarily your client\'s actual business outcome.', text:'Does the agency have any clients where the performance KPIs for AI-managed campaigns were defined by the platform (or derived from the platform\'s own success metrics) rather than by an independent assessment of what the client\'s business actually needs?', type:'radio', required:true,
        options:['Yes, this is common. Platform-defined KPIs are the default for most AI-managed campaign types.','In some cases. It varies by client and campaign type.','No. KPIs for all AI-managed activity are defined by us or the client, independently of platform-suggested benchmarks.'] },
      { id:'d6_6', text:'If a client asked you today to show them independent evidence of what their Performance Max campaigns are actually achieving — as distinct from what Google reports — could you do it?', type:'radio', required:true,
        options:['No. We do not have independent measurement of PMax performance for this client.','Partially. We have some cross-referencing capability but not a full independent measurement of PMax specifically.','Yes. We have independent measurement that lets us verify or challenge Google\'s reported PMax performance.'],
        followUp:{ triggers:['Partially. We have some cross-referencing capability but not a full independent measurement of PMax specifically.','Yes. We have independent measurement that lets us verify or challenge Google\'s reported PMax performance.'], text:'Briefly describe the measurement approach.' } }
    ]
  }
];

/* ============================================================
   ENCOURAGEMENT COPY — dry, on-brand, advertising/data flavoured.
   Used by the survey to keep momentum without breaking the
   editorial tone. Puns are understated by design.
   ============================================================ */
const STD_COPY = {
  // Quiet rotating lines shown under the progress bar. Picked by question index.
  rotating: [
    'Accuracy beats aspiration. Answer for the system you have.',
    'No optimism required — honest signal is the whole point.',
    'Every answer sharpens the picture. Keep going.',
    'There are no wrong answers here, only un-instrumented ones.',
    'Take your time. This is the high-attention portion of your day.',
    'Plain language is fine. We are scoring substance, not polish.'
  ],
  // Threshold lines keyed by percent reached. Shown once when crossed.
  thresholds: [
    { at: 25, line: 'A quarter in. Your responses are already better organised than most first-party stacks.' },
    { at: 50, line: 'Halfway. Brand-safe, viewable, fully in-view — and no remarketing.' },
    { at: 75, line: 'Three-quarters. Strong signal, low churn. The finish is in sight.' },
    { at: 90, line: 'Almost converted. One short sequence to go.' }
  ],
  // Milestone shown on the interstitial AFTER a section is completed.
  // Keyed by the dimension number just finished (0 = background).
  sectionDone: {
    0: 'Context logged. Now the part that actually gets scored.',
    1: 'Dimension one, done. Your infrastructure just left a clean audit trail.',
    2: 'Two down. Concentration risk noted — diversification is a journey, not a destination.',
    3: 'Halfway through the dimensions. The decisioning is getting clearer by the question.',
    4: 'Four complete. The human is still very much in the loop — namely, you.',
    5: 'Five down, one to go. Alignment achieved, at least for the next ninety seconds.'
  },
  // Section intro encouragement (small line under the dimension intro).
  sectionStart: {
    context: 'Six quick questions to set the scene. None of these are scored.',
    1: 'Six questions on the data underneath everything else.',
    2: 'Six questions on who your stack actually depends on.',
    3: 'Seven questions on how decisions get made — before the machines make them for you.',
    4: 'Six questions on the handoff between your team and the algorithms.',
    5: 'Six questions on whether the org behind the stack is pulling the same direction.',
    6: 'The final six. Then the picture is complete.'
  },
  lastQuestionLine: 'Last one. We promise not to retarget you.'
};

window.STD_DATA = {
  BRAND_CONTEXT, BRAND_DIMENSIONS, AGENCY_CONTEXT, AGENCY_DIMENSIONS, STD_COPY
};


// ============================================================
// PER-PLATFORM REPEATING BLOCK
// Added after Q0.5 for both brand and agency tracks.
// Each template has a {platform} placeholder replaced at step-build time.
// _qNum is 1–5 and forms part of the answer key: plt_{key}_{_qNum}
// ============================================================

const PLATFORM_OPTIONS = [
  'Google Ads (Search, Display, YouTube)',
  'Google DV360',
  'Meta (Facebook / Instagram)',
  'The Trade Desk',
  'Amazon DSP',
  'Yahoo DSP',
  'Nexxen',
  'MiQ',
  'StackAdapt',
  'Adform',
  'Retail media network(s) (e.g. Cartology, Coles360, Amazon Ads)',
  'TikTok',
  'Programmatic Out-of-Home Platforms (Vistar Media, Hivestack etc)',
  'Other'
];

const PLATFORM_BLOCK_BRAND = [
  { _qNum:1,
    text:'Is media on {platform} currently running through an automated or AI-managed format — for example, Performance Max, Advantage+, automated DSP bidding, or equivalent?',
    type:'radio', required:true,
    options:['No — all campaigns use manual settings and bidding','Partially — some campaigns use automated formats, others are manual','Yes, primarily — most spend runs through an automated format'] },
  { _qNum:2,
    text:'Roughly what percentage of your spend on {platform} sits in that automated format?',
    type:'radio', required:true,
    options:['Less than 25%','25 to 50%','50 to 75%','More than 75%','Not applicable — no automated formats in use'] },
  { _qNum:3,
    text:'Does your first-party data — CRM records, conversion events, customer match lists — flow into {platform} to inform targeting or bidding?',
    type:'radio', required:true,
    options:['No — we do not pass first-party data into {platform}','Partially — some first-party signals are connected','Yes — first-party data is actively connected and used for targeting or bidding'] },
  { _qNum:4,
    text:'Do you have measurement for {platform} that sits outside {platform}\'s own reporting — for example, a third-party attribution tool, a media mix model, or an independent incrementality test?',
    type:'radio', required:true,
    options:['No — {platform}\'s own reporting is our only measurement source','Partially — we have some independent measurement but it is not systematic','Yes — we have independent measurement that covers this spend'] },
  { _qNum:5,
    text:'If your {platform} relationship ended tomorrow, how would you describe your ability to move your data, audiences, and campaign history elsewhere?',
    type:'radio', required:true,
    options:['Locked in — we would lose significant data and campaign history and could not easily move','Some optionality — we could move with meaningful effort and some data loss','Portable — our data and audiences are not dependent on {platform} and we could move cleanly'] }
];

const PLATFORM_BLOCK_AGENCY = [
  { _qNum:1,
    text:'Across the clients you manage on {platform}, is the typical campaign format automated or AI-managed — Performance Max, Advantage+, automated DSP bidding, or equivalent?',
    type:'radio', required:true,
    options:['No — client campaigns on {platform} primarily use manual settings','Partially — a mix of automated and manual formats across the client base','Yes, primarily — most client spend on {platform} runs through automated formats'] },
  { _qNum:2,
    text:'Roughly what percentage of spend on {platform} across your client base sits in that automated format?',
    type:'radio', required:true,
    options:['Less than 25%','25 to 50%','50 to 75%','More than 75%','Not applicable — no automated formats in use on {platform}'] },
  { _qNum:3,
    text:'For clients on {platform}, does their first-party data — CRM, conversion events, customer match — typically flow into {platform} to inform targeting or bidding?',
    type:'radio', required:true,
    options:['No — we do not connect client first-party data to {platform}','Partially — this is done for some clients but not consistently','Varies significantly by client — some have it, others do not'] },
  { _qNum:4,
    text:'Do you provide clients on {platform} with measurement that sits outside {platform}\'s own reporting?',
    type:'radio', required:true,
    options:['No — platform-reported results are what we provide to clients for {platform} spend','Partially — we supplement platform reporting for some clients on {platform}','Varies significantly by client — some have independent measurement, others rely on platform data'] },
  { _qNum:5,
    text:'If your standing with {platform} changed significantly tomorrow — lost preferred status, a policy change, a product deprecation — how portable would your clients\' data and campaign history be?',
    type:'radio', required:true,
    options:['Locked in — client data and campaign history are tightly bound to our {platform} relationship','Some optionality — portability is possible but would require significant effort','Portable — client data and audiences are not dependent on our {platform} relationship'] }
];

// Attach the platform-block templates to the shared namespace too, so
// page-diagnostic.jsx can rely solely on window.STD_DATA regardless of
// how the Babel-standalone script execution scopes top-level consts.
Object.assign(window.STD_DATA, { PLATFORM_OPTIONS, PLATFORM_BLOCK_BRAND, PLATFORM_BLOCK_AGENCY });
