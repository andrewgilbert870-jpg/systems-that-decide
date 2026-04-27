# Copy Fix: Soften Agency-Negative Language

## Context

The site currently contains several lines that frame agencies as adversaries — implying deliberate opacity, misreporting, or exploitation of clients. These need to be reframed as structural and systemic issues rather than character flaws. The analytical rigour stays. The accusatory framing goes.

**Principle:** The problem is structural incentive misalignment across the whole ecosystem, not individual bad actors. Most opacity in these systems is a consequence of how commercial models are designed, not deliberate deception by agencies.

Make only the specific string replacements listed below. Do not alter any surrounding code, layout, or other copy.

---

## File 1: `app/page.tsx`

**Line ~293** — inside the Practitioner's Thesis body text string.

Find:
```
The vendor needs you to believe the measurement is clean. The agency needs the complexity to justify the fee. The platform needs you to accept its attribution as neutral.
```

Replace with:
```
The vendor needs you to believe the measurement is clean. The system rewards intermediaries for managing complexity, not reducing it. The platform needs you to accept its attribution as neutral.
```

---

## File 2: `app/the-systems-audit/page.tsx`

Make all seven replacements below in this file.

---

**Change 1** — Hero subheadline (~line 233)

Find:
```
Built for the gap between what your agency reports and what is actually happening.
```

Replace with:
```
Built to give you an independent view of how your programme is actually configured.
```

---

**Change 2** — Framework 01 description (~line 34)

Find:
```
'Maps the full path from budget to publisher impression. Identifies where fees are extracted, where inventory quality degrades, and where the supply chain has been configured in the interests of the agency or vendor rather than the advertiser.'
```

Replace with:
```
'Maps the full path from budget to publisher impression. Identifies where fees are extracted, where inventory quality degrades, and where supply path decisions have created fee structures or inventory outcomes that do not serve the advertiser\'s interest.'
```

---

**Change 3** — Framework 02 description (~line 40)

Find:
```
'A review of the commercial architecture of the agency relationship. How the agency earns, what is disclosed, where principal media arrangements exist, and where the financial incentives diverge from the client\'s interest.'
```

Replace with:
```
'A review of the commercial architecture of the agency relationship. How the agency earns, what is contractually disclosed, how principal media arrangements are structured, and where commercial incentives and client interests are not fully aligned.'
```

---

**Change 4** — Framework 03 description (~line 46)

Find:
```
'An assessment of the measurement framework in use. What is being measured, how the methodology is constructed, whether it is fit for purpose, and where it has been structured to produce results that favour the agency or platform over the advertiser.'
```

Replace with:
```
'An assessment of the measurement framework in use. What is being measured, how the methodology is constructed, whether it is fit for purpose, and where measurement design or attribution methodology may not reflect true performance.'
```

---

**Change 5** — Health Score dimension 02 (~line 70)

Find:
```
{ label: 'Dimension 02', name: 'Agency Commercial Integrity' },
```

Replace with:
```
{ label: 'Dimension 02', name: 'Commercial Transparency' },
```

---

**Change 6** — Score interpretation band 75–99 (~line 79)

Find:
```
{ score: '75–99', assessment: 'Functional but exposed. Structural gaps exist that a well-briefed agency or vendor will exploit. Prioritise the lowest-scoring dimensions.' },
```

Replace with:
```
{ score: '75–99', assessment: 'Functional but exposed. Structural gaps exist. Where they appear, they tend to be resolved in favour of intermediaries rather than the advertiser. Prioritise the lowest-scoring dimensions.' },
```

---

**Change 7** — Deliverable 01 description (~line 113)

Find:
```
'A hand-built map of your media ecosystem showing the supply chain, technology stack, and data flows as they actually exist. Not as the agency has presented them.'
```

Replace with:
```
'A hand-built map of your media ecosystem showing the supply chain, technology stack, and data flows as they actually exist — independent of any single stakeholder\'s account of them.'
```

---

## After making all changes

Run `npm run build` to confirm no TypeScript errors, then commit and push:

```bash
git add app/page.tsx app/the-systems-audit/page.tsx
git commit -m "Soften agency language: reframe as structural not adversarial"
git push origin main
```
