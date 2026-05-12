# Ralplan: Personal Portfolio Site

Status: terminal planning handoff
Generated: 2026-05-12T05:56:08Z
Scope: `/Users/ro9air/projects/Personal_site`

## RALPLAN-DR Summary

### Principles

1. Product-builder / collaborator credibility first.
2. Evidence beats exhaustive listing.
3. Static-first GitHub Pages delivery.
4. Public-safety boundaries are product requirements, not polish.
5. Design should be editorial and logic-first, not decorative.

### Decision Drivers

1. The work is scattered and needs clustering.
2. GitHub Pages strongly favors static files and path-safe assets.
3. Several source projects include sensitive/private material that must not leak.

### Viable Options

Option A: Single-page static editorial portfolio.

- Pros: fastest to verify, easiest to deploy, lowest maintenance.
- Cons: less depth per project until case-study pages exist.

Option B: Static site with separate case-study pages.

- Pros: stronger long-term proof depth.
- Cons: requires more content cleanup and screenshot redaction.

Option C: Interactive systems-map portfolio.

- Pros: memorable and aligned with systems identity.
- Cons: high risk of overbuilding before copy and hierarchy are proven.

Chosen option: Option A, structured so Option B can grow naturally.

Invalidated alternative:

- Option C is deferred because it optimizes novelty before clarity.

## Planner Synthesis

Build a single-page static site first. The page should lead with a positioning hero, then 4-5 case-study clusters, then supporting work, method, and contact. The implementation should consume the existing `DESIGN.md` and `WORKS_INVENTORY.md` as source-of-truth planning files.

## Architect Review

The architecture should remain plain static HTML/CSS with optional minimal JavaScript. This preserves GitHub Pages compatibility and avoids framework/deployment complexity before the content hierarchy is proven.

Strongest antithesis:

> A static single page may undersell the depth of the work and make complex systems look shallow.

Synthesis:

> Use a strong single-page V1 with compact evidence modules and obvious expansion points. Add dedicated case-study pages only after the first public-safe content set is stable.

Tradeoff:

> More interaction would make the portfolio feel more technically impressive, but also increases verification burden and can distract from credibility.

## Critic Review

Verdict: APPROVE for planning handoff.

Reasons:

- Scope is bounded.
- Acceptance criteria are testable.
- Public-safety constraints are explicit.
- Alternatives were considered and deferred with rationale.
- Verification plan matches the risk level.

Required execution guardrails:

- Do not publish raw handoff files.
- Do not use private investment data.
- Do not imply single-store food safety judgments.
- Do not claim forked/upstream projects as wholly original.
- Do not add dependencies unless a later execution plan explicitly justifies them.

## ADR

Decision:

> Build V1 as a single-page static editorial portfolio for GitHub Pages.

Drivers:

- Product-builder / collaborator credibility is the confirmed priority.
- Current assets already support a visually strong MATSim/simulation lead.
- Static files are enough for the first credibility test.
- Public-safety review is simpler in a small surface.

Alternatives considered:

- Dedicated case-study site from day one.
- Interactive visual systems map.
- CMS or framework-based portfolio.

Why chosen:

- The chosen path is the fastest credible prototype with the least runtime risk.
- It preserves expansion into case-study pages and bilingual content.
- It keeps maintenance understandable for a personal site.

Consequences:

- V1 may be less deep than a full case-study site.
- The copy and information hierarchy matter more than technical novelty.
- Some projects must stay summarized until public-safe screenshots are prepared.

Follow-ups:

- Decide final GitHub Pages repo name.
- Confirm contact links.
- Redact or replace sensitive screenshots.
- Test video playback and add fallback/MP4 if needed.

## Execution Lanes

Solo execution is sufficient for V1 implementation.

Suggested lanes if using `ralph`:

- `executor`, medium reasoning: implement static files and layout.
- `verifier`, high reasoning: run content-safety, browser, and deployment-path checks.

Suggested lanes if using `team`:

- Lane 1 `executor`: homepage structure and content modules.
- Lane 2 `designer`: CSS system, responsive layout, media treatment.
- Lane 3 `verifier`: link/media/content-safety/browser checks.

Available agent roster:

- `explore`
- `planner`
- `architect`
- `executor`
- `designer`
- `test-engineer`
- `verifier`
- `code-reviewer`
- `security-reviewer`
- `writer`

Reasoning guidance:

- Implementation: medium.
- Visual QA: high if layout/media issues appear.
- Content-safety review: high.
- Simple file lookup: low.

## Launch Hints

Sequential:

```text
$ralph implement the Personal_site static portfolio V1 from .omx/plans/prd-personal-site-portfolio.md and .omx/plans/test-spec-personal-site-portfolio.md
```

Parallel:

```text
$team implement Personal_site V1 with lanes: homepage structure, visual system, verification
```

Native Codex app fallback:

> Implement directly in `/Users/ro9air/projects/Personal_site`, keep changes scoped, then verify with local static server and browser checks.

## Team Verification Path

1. Inspect final changed files.
2. Run content-safety grep.
3. Serve with `python3 -m http.server 4173`.
4. Check desktop and mobile browser render.
5. Verify image/video assets and fallback behavior.
6. Confirm no private artifacts are linked or copied into the public page.
7. Confirm GitHub Pages path assumptions.

## Terminal State

Planning is complete when these artifacts exist:

- `.omx/context/personal-site-portfolio-20260512T055608Z.md`
- `.omx/plans/prd-personal-site-portfolio.md`
- `.omx/plans/test-spec-personal-site-portfolio.md`
- `.omx/plans/ralplan-personal-site-portfolio.md`

Execution is intentionally not started in this ralplan step.
