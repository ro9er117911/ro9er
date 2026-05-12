# Personal Site Works Inventory

Status: draft for grill-me requirement collection
Updated: 2026-05-12
Target use: personal portfolio content selection for GitHub Pages

## Source Map

This inventory was collected from:

- Local portfolio staging folder: `/Users/ro9air/projects/Personal_site`
- Public GitHub profiles:
  - `https://github.com/ro9er117911`
  - `https://github.com/t109ab0014`
- Local project folders under `/Users/ro9air/projects`
- Existing workspace memory about prior project outcomes

Important boundary: this is not yet a public copy deck. Several source folders include private, internal, or credential-like material. Public portfolio pages should summarize outcomes and show sanitized screenshots, not publish raw handoff files.

## Grill-Me Starting Position

Recommended portfolio direction from the prior brainstorm:

> Start with a static editorial portfolio on GitHub Pages, using one strong homepage that groups scattered work into a coherent systems-builder narrative.

Highest-risk assumption:

> The work is strong but scattered. If the homepage lists every project equally, it will read like an archive instead of a portfolio.

Recommended answer:

> Lead with 3-4 case-study clusters, then keep older/smaller repos as supporting proof.

Confirmed audience decision:

> Product-builder / collaborator credibility first. Later versions can extend into hiring, research, and professor-review credibility as thesis and work systems mature.

## Local Assets Already Staged

| Asset | Path | Read | Portfolio use |
| --- | --- | --- | --- |
| MATSim title slide | `photo/matsim/截圖 2026-05-12 上午11.49.22.png` | `1810 x 1010`, 4.5 MB | Hero/support visual for simulation case |
| MATSim iteration comparison | `photo/matsim/截圖 2026-05-12 上午11.49.47.png` | `1724 x 994`, 1.6 MB | Strong evidence visual for evacuation/simulation convergence |
| MATSim OD heatmap / 3D map | `photo/matsim/截圖 2026-05-12 上午11.49.59.png` | `1658 x 960`, 1.6 MB | Strong evidence visual for origin/destination demand analysis |
| Twin-city hackathon video | `video/雙北黑客松.webm` | WebM/Matroska, H.264, `3200 x 2000`, 60 fps, 88.002 sec, 12.4 MB | Demo video candidate; needs poster frame and web delivery check |

Note: `ffprobe` was repaired on 2026-05-12 by upgrading Homebrew `ffmpeg` from `8.0.1_1` to `8.1.1`. Root cause was stale ffmpeg linkage to `libx265.215.dylib` while installed `x265` provides `libx265.216.dylib`.

## Primary Case-Study Candidates

### 1. Urban Simulation / MATSim

Core story:

> Turn disaster or mobility scenarios into visible, inspectable simulation artifacts using MATSim-style routing, iteration comparison, OD heatmaps, and replay evidence.

Evidence found:

- Local staged visuals in `photo/matsim/`
- Public repo: `https://github.com/ro9er117911/matsim-example-project`
- Related local project: `/Users/ro9air/projects/PlanB_simulation`
- Related local project: `/Users/ro9air/projects/Urban-Tokyo`

Portfolio role:

- Strong homepage case study.
- Best visual proof currently available.

Public readiness:

- Medium-high.
- Needs a short plain-language framing: problem, simulation method, what the map proves, what it does not prove.

### 2. Taipei Dashboard / Food Safety AI / Data Concierge

Core story:

> Extend a civic dashboard into an official-data assistant that explains public datasets with guardrails, evidence packs, and map/UI actions.

Evidence found:

- Local archive: `/Users/ro9air/projects/Archive/Taipei_Dashdorad`
- Dashboard codebase under `Taipei-City-Dashboard/`
- Food safety context in `CONTEXT.md`
- BE/DE evidence: AI guide services, official-data ETL, food inspection transforms, validation reports

Portfolio role:

- Strong homepage case study if framed as civic-data product work.
- Should not be presented as a generic chatbot.

Public readiness:

- Medium.
- Needs sanitized screenshots and careful wording.
- Avoid claims about judging individual stores/products.

### 3. AI Governance Pre-Review / AIg0v

Core story:

> A submitter-side and committee-side AI governance workflow that turns weak AI application documents into missing-field lists, predicted questions, and review-ready drafts.

Evidence found:

- Local project: `/Users/ro9air/projects/AIg0v`
- PRD: `spec/assistant/PRD_v2.md`
- Agent A prototype: `demo/agent-a-precheck/`
- Risk questionnaire app and supervisor validation package under `demo/rba-questionnaire/`
- Backend API and tests under `backend/`

Portfolio role:

- Strong case study for AI governance, enterprise workflow, and document intelligence.

Public readiness:

- Medium-low until sanitized.
- Raw handoff material contains sensitive credential-like content and must not be published.
- Public page should describe architecture and workflow, not expose internal files.

### 4. AskMe / Bank Pre-Review Conductor

Core story:

> A banking pre-review conductor that takes de-identified fuzzy input and produces missing fields, expected questions, impact scope, and draft supplements before formal review.

Evidence found:

- Public repo: `https://github.com/ro9er117911/askme`
- Repo description: bank pre-review conductor; de-identification boundary; not final approval.

Portfolio role:

- Supporting or paired case with AIg0v.
- Good proof of repeated domain pattern: pre-review, missing-field detection, reviewer-oriented output.

Public readiness:

- Medium-high if the repo has no secrets and examples are sanitized.

### 5. AI Tutor / Bank Tutor

Core story:

> Translate abstract technical learning into department-ready adoption material, especially for Neo4j / knowledge graph learning in enterprise contexts.

Evidence found:

- Local project: `/Users/ro9air/projects/AI_tutor`
- Product brief: `Bank_tutor/docs/product-brief.md`
- Prototype: `Bank_tutor/prototype/index.html`
- Deliverables: `Bank_tutor/deliverables/neo4j-bank-knowledge-graph-intro.pptx`
- Tests and CLI-oriented tutor code under `tests/`, `tutor/`, `tools/`

Portfolio role:

- Strong secondary case study.
- Good for showing teaching systems, knowledge graphs, and enterprise downshift.

Public readiness:

- Medium.
- Needs screenshots and a concise explanation of who the learner is.

### 6. Auto Research / AI-Scientist-v2 Adaptation

Core story:

> Adapt AI-Scientist-v2 into a Codex/OMX-first research agent with redlines, domain packs, smoke tests, Docker config, and human-reviewed research generation.

Evidence found:

- Local project: `/Users/ro9air/projects/Auto_research/AI-Scientist-v2`
- Final report: `docs/final_deployment_report.md`
- Validation evidence: pytest, doctor, redline validation, orchestration manifests, smoke ledgers

Portfolio role:

- Strong technical systems case.
- Good proof of agent runtime design and verification discipline.

Public readiness:

- Medium.
- Needs plain-language framing and should avoid overclaiming scientific quality.

### 7. Stock Research Operator

Core story:

> A personal investment research OS that separates public-safe dashboards from local private portfolio overlays, with event ledgers, source registries, and review workflows.

Evidence found:

- Local project: `/Users/ro9air/projects/STOCK-rewritten-clean`
- README describes durable research decision OS, source registry, event ledgers, GitHub Actions, dashboard outputs

Portfolio role:

- Good supporting case for data workflow and personal operating systems.

Public readiness:

- Medium-low.
- Must not expose private holdings, local journal, or non-public decision data.
- Use architecture and public-safe dashboard only.

### 8. Career-Ops Adaptation / Application System

Core story:

> A job-search operating system for evaluating opportunities, generating targeted CVs, and managing application workflows with agentic tools.

Evidence found:

- Local project: `/Users/ro9air/projects/career-ops`
- Public-facing README is broad and polished, but appears upstream-inspired/fork-like in parts.
- Local deliverables include NJIT CV/study-plan materials and multilingual docs.

Portfolio role:

- Use carefully as "adapted and operationalized for personal workflow", not as a wholly original product unless ownership is clarified.

Public readiness:

- Medium.
- Good evidence for workflow automation, but attribution and originality need clarity.

## Supporting / Historical Repo Cluster

These repos are useful as supporting proof but probably should not dominate the homepage.

### Speech / Emotion / Transcript Pipeline

Repos:

- `https://github.com/t109ab0014/Emo-GPT`
- `https://github.com/t109ab0014/Flask_TIMnet_API`
- `https://github.com/t109ab0014/Whisper_folder`
- `https://github.com/t109ab0014/faster_whisper`
- `https://github.com/t109ab0014/3D_Emotion-visual`
- `https://github.com/t109ab0014/Download_Teach`
- Related forks under `ro9er117911`

Possible story:

> Early research and prototype work around speech emotion recognition, Whisper transcription, and 3D emotion visualization.

Recommended use:

- Put under "Earlier research prototypes" or "Selected older work".
- Use only if it supports the current AI/data systems narrative.

### SDD / Spec Tools

Repos:

- `https://github.com/ro9er117911/SDD_kit`
- `https://github.com/ro9er117911/test_Personal-Work-Assistant-Platform`

Possible story:

> Tools that convert loose language requirements into executable technical specifications.

Recommended use:

- Supporting proof for agent-assisted specification work.

### Taiwan Knowledge / Public Knowledge Base

Repos:

- `https://github.com/ro9er117911/taiwan-md`
- `https://github.com/ro9er117911/g0v`

Possible story:

> AI-friendly public knowledge-base and civic-data exploration.

Recommended use:

- Supporting proof if the homepage emphasizes civic systems.

### Utility Automation

Repo:

- `https://github.com/ro9er117911/Screenshot_py`

Possible story:

> Practical automation tool for converting restricted view-only document access into reviewable PDF artifacts.

Recommended use:

- Do not lead with it.
- If included, frame carefully around personal productivity and document review, not bypassing access restrictions.

## Public GitHub Inventory Snapshot

Collected from the public GitHub API on 2026-05-12.

### `ro9er117911`

Profile notes:

- Public repos: 15
- Bio: `應如是住`
- Created: 2023-03-05
- Updated: 2026-05-04

| Repo | Description | Language | Fork | Last pushed | Portfolio tier |
| --- | --- | --- | --- | --- | --- |
| `UROP` | none | Python | no | 2026-05-09 | inspect / likely research |
| `career-ops` | AI-powered job search system | JavaScript | yes | 2026-04-23 | supporting, attribution needed |
| `askme` | banking pre-review conductor | Python | no | 2026-04-16 | primary/supporting |
| `taiwan-md` | AI-friendly Taiwan knowledge base | Astro | yes | 2026-03-18 | supporting |
| `Fininno` | none | JavaScript | no | 2026-02-25 | inspect |
| `matsim-example-project` | MATSim example/library project | Java | no | 2026-01-27 | primary/supporting |
| `SDD_kit` | language requirements to executable specs | JavaScript | no | 2025-12-18 | supporting |
| `Screenshot_py` | screenshot-to-PDF utility | Python | no | 2025-12-05 | utility/supporting |
| `test_Personal-Work-Assistant-Platform` | none | Shell | no | 2025-11-06 | omit unless clarified |
| `Download_Teach` | manager vocal emotion and investor attention | none | yes | 2023-08-28 | historical |
| `Emo-GPT` | speech emotion recognition API | none | yes | 2023-11-28 | historical |
| `Whisper_folder` | video/audio to transcript | none | yes | 2023-12-06 | historical |
| `3D_Emotion-visual` | 3D emotion visualization | none | yes | 2023-11-27 | historical |
| `g0v` | none | none | no | 2025-03-24 | inspect |
| `gpt-ai-assistant` | OpenAI + LINE + Vercel assistant | none | yes | 2023-03-11 | historical |

### `t109ab0014`

Profile notes:

- Public repos: 12
- Display name: `ro9`
- Created: 2023-04-19
- Updated: 2025-04-18

| Repo | Description | Language | Fork | Last pushed | Portfolio tier |
| --- | --- | --- | --- | --- | --- |
| `Emo-GPT` | speech emotion recognition API | Python | no | 2023-11-28 | historical |
| `3D_Emotion-visual` | 3D emotion visualization | none | no | 2023-11-27 | historical |
| `Whisper_folder` | manager vocal emotion and investor attention transcript pipeline | Jupyter Notebook | no | 2023-12-06 | historical |
| `faster_whisper` | YouTube / Google Drive transcription batch analysis | Jupyter Notebook | no | 2023-11-22 | historical |
| `Emo-GPT_web` | learning | TypeScript | no | 2023-09-04 | historical |
| `whisper-diarization` | ASR with speaker diarization | Jupyter Notebook | yes | 2023-10-18 | historical/fork |
| `Flask_TIMnet_API` | speech emotion recognition API | Python | no | 2023-12-11 | historical |
| `nextjs-openai-doc-search` | ChatGPT-style doc search template | none | yes | 2023-09-02 | omit/fork |
| `speech-emotion-recognition-using-four-models` | SER using CNN, LSTM, TIMNet, Transformer | none | yes | 2023-03-16 | omit/fork |
| `Download_Teach` | manager vocal emotion and investor attention | Python | no | 2023-08-28 | historical |
| `learn` | none | Jupyter Notebook | no | 2023-07-05 | omit unless clarified |
| `gpt-ai-assistant` | OpenAI + LINE + Vercel assistant | Jupyter Notebook | yes | 2023-07-03 | historical/fork |

## Recommended Homepage Case Mix

Use this order unless you want the site to target a different audience:

1. Urban Simulation / MATSim / PlanB
2. Taipei Dashboard / Civic Data AI
3. AI Governance Pre-Review / AskMe
4. Auto Research / AI-Scientist-v2
5. AI Tutor / Bank Tutor

Supporting strip:

- Stock Research Operator
- SDD Kit
- Speech emotion / Whisper early research cluster
- Utility automation

## Omit From First Homepage Pass

Omit or delay:

- Raw internal handoff files
- Raw credentials or API config
- Private investment position data
- Full personal CV/application PDF archive
- Forked templates unless the page clearly says what Roger changed
- Small test repos with no clear story

## Content Questions Still Unresolved

Question 1: answered

> What should the homepage optimize for: hiring/career credibility, research/professor credibility, collaborator credibility, or product-founder credibility?

Confirmed answer:

> Product-builder and collaborator credibility first. This lets the site lead with working systems and proof, not a resume chronology. Hiring, research, and professor-review credibility should remain later expansion layers.

Question 2:

> Which projects are safe to show publicly with screenshots?

Recommended answer:

> Start with MATSim visuals, PlanB synthetic/sanitized artifacts, public GitHub repos, and sanitized Taipei/AIg0v screens. Do not publish raw AIg0v handoffs, private investment files, or application PDFs.

Question 3:

> Should older speech-emotion work be a main case or a historical cluster?

Recommended answer:

> Historical cluster. It shows continuity in speech/AI research, but the current identity is stronger around systems, governance, civic data, and agent workflows.

Question 4:

> Should the site show two GitHub identities?

Recommended answer:

> Yes, but quietly. Treat `ro9er117911` as the current primary account and `t109ab0014` as older research/prototype history unless you want a different public identity story.

## Ralplan Seed

Use this seed after grill-me decisions stabilize:

> Build a GitHub Pages-ready static personal portfolio in `/Users/ro9air/projects/Personal_site` using the DESIGN.md direction and WORKS_INVENTORY.md. First release should be a single-page dark editorial site with 4-5 selected case-study clusters, local MATSim assets, public-safe GitHub links, and no backend/CMS. It must avoid publishing sensitive handoff files, credentials, private investment details, or unreviewed internal artifacts. Verify with local static preview, desktop/mobile screenshots, link checks, and path-safe GitHub Pages asset references.
