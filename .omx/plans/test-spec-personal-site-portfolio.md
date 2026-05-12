# Test Spec: Personal Portfolio Site V1

Status: approved plan draft
Scope: static GitHub Pages portfolio

## Verification Strategy

Use lightweight static-site verification first. Add browser verification once `index.html` exists.

## Static Checks

Run after implementation:

```bash
find . -maxdepth 3 -type f
```

Expected:

- `index.html`
- `styles.css`
- optional `script.js`
- existing assets under `photo/` and `video/`
- no generated secret/config files

## Content Safety Checks

Run targeted scans before publishing:

```bash
grep -RInE "sk-[A-Za-z0-9]|api[_-]?key|secret|token|password|private key|portfolio.private|decision_journal" .
```

Expected:

- no exposed secrets;
- no private investment files;
- no raw credential-like strings;
- intentional prose matches reviewed manually if grep finds generic wording.

## Link Checks

Manual or scripted checks:

- GitHub profile links open.
- Case-study repo links open.
- Anchor navigation works.
- Contact links are correct or marked pending.
- Local assets load with relative paths.

## Browser Checks

Use a local static server:

```bash
python3 -m http.server 4173
```

Verify:

- Desktop viewport around `1440 x 900`.
- Mobile viewport around `390 x 844`.
- No horizontal scroll.
- No text overlap.
- Hero leaves a hint of the next section.
- Case-study visuals render.
- Video fallback does not break layout.

## Media Checks

Current metadata for `video/雙北黑客松.webm`:

- codec: H.264
- format: WebM/Matroska
- size: `3200 x 2000`
- frame rate: 60 fps
- duration: 88.002 sec
- file size: 12,434,747 bytes

Before publishing:

- test playback in Chromium and Safari if video is embedded;
- if Safari fails, convert or add MP4 fallback;
- generate a poster image so the page is useful before playback.

## GitHub Pages Checks

Before deployment:

- confirm whether repo is user site or project site;
- use relative asset paths;
- avoid root-absolute paths unless final deployment path is known;
- if custom domain is used, add `CNAME` separately.

## Acceptance Tests

The implementation is acceptable when:

- `index.html` can be served locally without build tools;
- all selected case-study sections are visible;
- at least three proof visuals or links render correctly;
- no private raw artifact is exposed;
- mobile and desktop screenshots look coherent;
- deployment requires only GitHub Pages static hosting.

## Known Risks

- H.264 inside WebM may not be portable enough for production.
- Some candidate case-study screenshots are not yet sanitized.
- `Personal_site` is not currently a git repo.
- Fork/upstream-derived repos need careful attribution.
