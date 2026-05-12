# Personal Portfolio Website Design

Status: draft, grill-me audience decision confirmed
Target host: GitHub Pages
Primary visual reference: https://forrm.studio/
Design workflow reference: https://github.com/google-labs-code/stitch-skills
Works inventory: `WORKS_INVENTORY.md`
Ralplan handoff: `.omx/plans/ralplan-personal-site-portfolio.md`

## Direction

Build a static personal portfolio that presents Roger as a practical AI / data / product systems builder.

Primary audience decision:

> Product-builder / collaborator credibility first. Later versions can extend into hiring, research, and professor-review credibility as thesis and work systems mature.

The homepage should not behave like a complete archive. It should make a small number of strong, public-safe work clusters easy to inspect:

1. Urban Simulation / MATSim / PlanB
2. Taipei Dashboard / Civic Data AI
3. AI Governance Pre-Review / AskMe
4. Auto Research / AI-Scientist-v2
5. AI Tutor / Bank Tutor

Supporting work can appear in a secondary strip or compact index.

## Design Principles

- Logic before pixels.
- Evidence over decoration.
- Typography as interface.
- Few strong case studies before broad project listing.
- Static-first, GitHub Pages-safe implementation.
- Public-safe content only.

## Visual Language

Use a dark editorial interface inspired by FORRM Studio's logic-first tone, without copying its layout or wording.

Recommended visual traits:

- near-black background;
- warm white primary text;
- muted gray secondary text;
- one sharp accent color;
- strong section numbering;
- large but controlled typography;
- dense evidence modules;
- no decorative orbs, generic gradients, or stock-photo hero.

## Content Model

Each primary case study should answer:

- What problem did this work address?
- What did Roger build or operate?
- What artifacts prove the work exists?
- What was verified?
- What is safe to show publicly?
- What should not be claimed?

Suggested card fields:

- title;
- short positioning sentence;
- problem;
- role;
- methods / stack;
- artifacts;
- public-safe links;
- proof visual;
- limitation or boundary.

## First Prototype Scope

First release should be a single static page:

- `index.html`
- `styles.css`
- optional small `script.js`
- local assets under `photo/` and `video/`

No backend, CMS, auth, database, or paid runtime should be introduced for the first release.

## Public-Safety Boundaries

Do not publish:

- raw internal handoff files;
- credentials, API keys, or config containing secrets;
- private investment holdings or decision journal content;
- unreviewed application PDFs or personal documents;
- forked-template claims without attribution;
- internal-only banking or governance details.

Use sanitized summaries and screenshots instead.

## GitHub Pages Notes

- Keep asset links path-safe for GitHub Pages.
- Decide whether this will be a user site (`<user>.github.io`) or project site (`<user>.github.io/<repo>`).
- If a custom domain is added later, use a `CNAME` file and configure DNS separately.
- Keep the first version fully static so deployment is a simple Pages publish.

## Confirmed Grill-Me Decision

Question:

> What should the homepage optimize for: hiring/career credibility, research/professor credibility, collaborator credibility, or product-founder credibility?

Confirmed answer:

> Product-builder and collaborator credibility first. Hiring, research, and professor-review credibility should become expansion layers after the thesis and work systems mature.
