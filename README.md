# Munavath Vijay Portfolio

A responsive portfolio and protected admin editor hosted privately on Sites.

## Routes

- `/`: portfolio, selected work, skills, about, journal and contact.
- `/projects/[id]`: detailed project case studies.
- `/admin`: portfolio editor, photo controls and contact inbox.

## Data and security

Portfolio content and messages persist in SQLite via Cloudflare D1. Photos persist in R2. Schema changes are versioned in `drizzle/` and applied by Sites during deployment. Initialization seeds the portfolio only when empty.

Admin pages and editing/upload/inbox endpoints require a platform-authenticated user whose email matches `PORTFOLIO_ADMIN_EMAIL`. Anonymous writes, non-owners and cross-origin changes are rejected. Content is validated server-side, database writes are parameterized, and revision checks prevent stale tabs overwriting newer edits. Photos accept JPEG, PNG or WebP, check file signatures, and are capped at 5 MB. The deployment also remains owner-private in Sites.

Browser storage is used only for theme preference. Light mode has a white page background. Sharing access does not grant editing rights.

## Content source

Adapted from https://github.com/munavathvijay00-spec/munavath-vijay-portfolio-page.git.

Vijay’s name, bio, role, contact details, projects, case studies, skills, journal and project images come from that source. GitHub uses the account owning the supplied repository. Generic destination links were cleared. Default State University, Tech Solutions Inc. and Google Cloud certification entries remain editable but start hidden for review. No Arun portfolio content was imported. The repository had no profile portrait; the owner can upload one through the editor.

## Local development

Use Node.js 22.13 or newer and install dependencies with pnpm. Copy `.env.example` to `.env`, then set `PORTFOLIO_ADMIN_EMAIL` to the ChatGPT account email authorized to edit.

Run `pnpm dev` for local development. The portable development profile simulates ChatGPT sign-in as `seedy@sites.test`; use that email as the local admin email when testing that profile. Hosted sign-in is provided by Sites. Local mock authentication is absent from production.

Generate migrations with `pnpm db:generate` and build with `pnpm build`. Apply pending migrations with Wrangler using `dist/server/wrangler.json` and `.wrangler/state`. Do not replay applied migrations.

## Verification

`node checks/verify-site.mjs` exercises the compiled Worker with an isolated persistent D1/R2 runtime: authorization, cross-origin rejection, validation, content edits, stale revisions, persistence across restart, photo upload/retrieval/removal, project creation/deletion, contact messages, protected inbox, rendered routes and both theme directions with preference restoration. It does not substitute for browser visual QA.

`node node_modules/typescript/bin/tsc --noEmit` checks application types.

## Publishing

Publish through Sites with its owner-private operation. Set `PORTFOLIO_ADMIN_EMAIL` in Sites runtime environment settings. Do not change to public access without approval. Preserve appended migration history and D1/R2 bindings so content and photos survive deployments.

## Profile and design update

The hero now uses CSS 3D transforms for a layered development stack, rotating cube and pointer tilt, with reduced-motion support. Skills are explored through keyboard-accessible tabs. The navigation labels the Projects section explicitly. The provided resume is served unchanged at `/resume.pdf`.

The requested role, finance and AI additions and resume skills are applied once by a guarded runtime content upgrade. A schema-only migration records the content version, and the update retains unrelated data, photos and links while incrementing the content revision. All listed resume skills and tools named in its project descriptions are included.

## Reviewed project selection

The three visible projects cover full stack (TrustMemory AI), blockchain (Blockchain Intelligence), and finance (AegisDoc). The review covers all 22 public repositories and records source snapshots, authorship, evidence and limitations in `docs/project-review.md`. Old project records remain in the editor with visibility off. Version 3 preserves profile and skill edits from version 2.

The hero has keyboard-accessible, interactive domain layers linked to the selected case studies. Project cards respond to pointer movement with restrained 3D depth. Motion can be paused, touch avoids pointer tilt, and reduced-motion preferences disable animation. Architecture previews are labeled diagrams; only TrustMemory uses a real repository screenshot.

## Contact email notifications

Contact submissions are saved to SQLite first. When configured, the backend sends a plain-text notification using Resend to the current portfolio contact email (Vijay’s address by default). The visitor’s email is the Reply-To address; public submissions cannot select another notification recipient. Set `RESEND_API_KEY` as a Sites secret and `PORTFOLIO_EMAIL_FROM` to a verified sender email address, then deploy to apply them. Neither value is exposed to the browser or stored in source control. A ChatGPT plugin connection alone is not a deployed runtime key.

The inbox reports whether email is unconfigured, being sent, accepted by the provider, failed or unconfirmed. Accepted means the provider accepted the request, not proof of inbox delivery. Owner-only retries reuse a persisted payload and idempotency key, suppress repeat sends after acceptance, and block ambiguous retries beyond the provider’s duplicate-suppression window. Email failures never discard the saved message. Existing messages can be retried after setup. No automatic replies are sent to visitors.

Verification: `node checks/verify-email.mjs` exercises configuration and provider outcomes with an injected transport. `node checks/verify-site.mjs` exercises the compiled Worker routes, recipient, reply-to, retry access controls, duplicate suppression, provider errors and message retention against a mocked provider. No real emails are sent during these checks.
