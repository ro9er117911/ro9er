# Context Snapshot: Personal Portfolio Site

Created: 2026-05-12T05:56:08Z
Scope: `/Users/ro9air/projects/Personal_site`
Workflow: ralplan intake

## Task Statement

Create a GitHub Pages-ready personal portfolio plan for Roger's scattered project work. The current workflow should stop at a consensus plan and handoff artifacts, not implement the site yet.

## Desired Outcome

Produce a bounded implementation plan for a static personal portfolio that:

- presents Roger as a product-builder / collaborator first;
- can later expand toward hiring, research, and professor-review credibility;
- uses public-safe project evidence;
- avoids backend/CMS/runtime dependencies in the first release;
- can be verified locally and deployed to GitHub Pages.

## Known Facts And Evidence

- `DESIGN.md` defines the design direction and confirmed audience decision.
- `WORKS_INVENTORY.md` inventories project candidates and local assets.
- Local staged assets include three MATSim PNGs and one twin-city hackathon WebM.
- `ffprobe` has been repaired by upgrading Homebrew `ffmpeg` from `8.0.1_1` to `8.1.1`.
- Video metadata now reads as:
  - codec: H.264
  - format: WebM/Matroska
  - size: `3200 x 2000`
  - frame rate: 60 fps
  - duration: 88.002 sec
  - file size: 12,434,747 bytes
- Public GitHub profiles to use as source links:
  - `https://github.com/ro9er117911`
  - `https://github.com/t109ab0014`

## Constraints

- First release must be static GitHub Pages-compatible files.
- No backend, database, CMS, auth, paid runtime, or server-side rendering for v1.
- Do not publish raw internal handoff files, credentials, private investment details, application PDFs, or unreviewed internal artifacts.
- Forked or upstream-derived work must be attributed clearly.
- The site should be dark editorial / logic-first, inspired by FORRM Studio without copying it.
- The site should not become a full project archive.

## Unknowns

- Final GitHub Pages repo name and whether this is a user site or project site.
- Final public contact routes.
- Which screenshots can be sanitized for Taipei Dashboard, AIg0v, and AI Tutor.
- Whether the H.264-in-WebM video plays consistently in target browsers, or should be converted to MP4/VP9 WebM.
- Whether to build bilingual content in v1 or reserve English for v1.1.

## Likely Touchpoints

- `index.html`
- `styles.css`
- optional `script.js`
- `photo/matsim/*`
- `video/雙北黑客松.webm`
- optional generated poster image for the WebM
- `DESIGN.md`
- `WORKS_INVENTORY.md`

## Planning Decision

Continue with a single-page static prototype first, using a few strong case-study clusters and a compact supporting-work index.
