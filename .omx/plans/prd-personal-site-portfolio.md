# PRD: Personal Portfolio Site V1

Status: approved plan draft
Owner: Roger
Target host: GitHub Pages
Scope: `/Users/ro9air/projects/Personal_site`

## Goal

Build a static personal portfolio that presents Roger as a practical AI / data / civic systems product-builder and collaborator.

The first version should make the work coherent without pretending every project is equally important.

## Primary Audience

Confirmed priority:

1. Product-builder credibility
2. Collaborator credibility
3. Later expansion: hiring credibility, research credibility, professor-review credibility

## User Story

As a potential collaborator, reviewer, or evaluator, I want to quickly understand what Roger builds, inspect a few credible proof artifacts, and find a reliable way to contact or evaluate him further.

## Product Principles

- Lead with systems and proof, not a resume chronology.
- Use a small number of strong case-study clusters.
- Keep public-safety boundaries visible in the content model.
- Prefer static, inspectable, easy-to-maintain files.
- Use visual evidence where it clarifies the work.

## V1 Scope

V1 includes:

- A single static `index.html`.
- A dedicated stylesheet.
- Optional small JavaScript for progressive enhancement only.
- A hero section with positioning and CTAs.
- Four or five primary case-study clusters.
- A compact supporting-work strip.
- A contact section.
- Local MATSim visuals.
- Public-safe GitHub links.
- No backend or CMS.

## V1 Case Study Order

Recommended homepage order:

1. Urban Simulation / MATSim / PlanB
2. Taipei Dashboard / Civic Data AI
3. AI Governance Pre-Review / AskMe
4. Auto Research / AI-Scientist-v2
5. AI Tutor / Bank Tutor

Supporting strip:

- Stock Research Operator
- SDD Kit
- Speech emotion / Whisper historical cluster
- Utility automation

## Content Requirements

Each primary case study must include:

- problem;
- Roger's role;
- methods / stack;
- proof artifact;
- public-safe link or local asset;
- verified evidence;
- limitation / boundary.

## Non-Goals

V1 will not include:

- a CMS;
- backend services;
- authentication;
- analytics-heavy tracking;
- a blog engine;
- private project artifacts;
- raw internal handoffs;
- private financial holdings;
- application-package PDFs;
- unreviewed credentials or config;
- a complete archive of every repo.

## Design Requirements

- Dark editorial interface.
- Strong typography and section numbering.
- restrained accent color.
- Dense but readable evidence modules.
- No decorative orb / stock hero treatment.
- Mobile-first readability.
- No text overlap at desktop or mobile breakpoints.

## Technical Requirements

- Serve as static files.
- Work when opened through a local static server.
- Use path-safe asset references for GitHub Pages.
- Avoid absolute local filesystem paths in browser assets.
- Keep video optional/fallback-safe.
- Ensure the H.264 WebM has a poster/fallback or is converted before production if browser tests fail.

## Public-Safety Requirements

Before publishing, inspect content for:

- secrets / API keys;
- private banking or governance details;
- personal application documents;
- private investment data;
- unsupported safety or compliance claims;
- fork/upstream ownership confusion.

## Acceptance Criteria

- A visitor understands Roger's positioning within the first screen.
- At least three primary case studies have concrete proof artifacts.
- The page is usable at mobile and desktop viewport sizes.
- All links either work or are visibly marked as pending.
- No private or sensitive raw artifact is published.
- The site can be deployed to GitHub Pages without a backend.

## Open Decisions For Execution

- GitHub Pages repo name.
- Final public contact links.
- Which screenshots need redaction.
- Whether to convert `video/雙北黑客松.webm` to MP4 for production.
- Whether first release is Traditional Chinese only or bilingual.
