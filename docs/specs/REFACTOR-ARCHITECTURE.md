# Architecture Refactor Spec

**Status:** Draft — not started
**Target repo:** `gg-eng.me`
**Author:** Germán Gómez
**Baseline audit date:** 2026-08-14
**Baseline commit:** run `git rev-parse --short HEAD` before starting Phase 0 and record it here

---

## 1. Purpose

This site is a public code sample. Recruiters, hiring managers and peer engineers read the
repository as much as they read the rendered page. The current codebase works, ships and
performs well, but its structure does not communicate the engineering judgement behind it:
responsibilities are concentrated in a handful of very large files, so a reviewer skimming
`src/` sees volume rather than design.

The goal of this refactor is **legibility of architecture**, not new features. Every phase
below must be behaviour-preserving unless explicitly noted. If a phase would require a
visual or functional change to complete, stop and split that change into its own ticket.

**Non-goals:**

- No redesign. Rendered output must be pixel-identical after each phase.
- No new user-facing features.
- No framework migration. Astro 5 + Cloudflare adapter stay.
- No dependency additions beyond the dev tooling listed in Phase 6.

---

## 2. Baseline measurements

Recorded 2026-08-14 against `src/` (~11,800 lines total). These numbers are the "before"
side of the acceptance criteria — re-measure after each phase.

| File | Lines | Composition |
| --- | ---: | --- |
| `src/layouts/BaseLayout.astro` | 2,471 | 53% CSS, 35% JS, 9% markup, 3% frontmatter |
| `src/components/ContactForm.astro` | 724 | 68% inline `<script>`, 21% `<style>`, 9% markup |
| `src/lib/experience-data.ts` | 516 | hardcoded content, duplicated per locale |
| `src/lib/emailService.ts` | 496 | ~37% HTML email templates as string literals |
| `src/components/ExperienceEntry.astro` | 477 | 72% `<style>` |
| `src/pages/[lang]/contact/index.astro` | 455 | 66% `<style>` |
| `src/pages/[lang]/experience/[slug].astro` | 447 | 63% `<style>` |
| `src/components/FreelanceEntry.astro` | 370 | 68% `<style>` |
| `src/pages/[lang]/freelance/[slug].astro` | 386 | 66% `<style>` |

**Structural findings driving this spec:**

1. `BaseLayout.astro` is a god-layout: navigation, theme system, i18n switcher, a bespoke
   client-side router ("sliding door"), two marketing popups, a sticky page title, the footer,
   and an SSR side effect that sends an email on QR scan — all in one file.
2. `ExperienceEntry` / `FreelanceEntry` are ~65% identical, as are
   `experience/[slug].astro` / `freelance/[slug].astro` (~234 lines of parallel CSS).
3. Experience and freelance content is hardcoded in `.ts` as two parallel per-locale arrays
   joined by `slug`, while Content Collections are used only for two blog `.mdx` files.
4. The API layer repeats the same boilerplate across four endpoints with no shared response
   helpers, no shared `Result` type, and inconsistent error handling.
5. `emailService.ts` mixes transport with presentation; the same email CSS block is copied
   across three templates.
6. `ContactForm.astro` carries 496 lines of inline client JS and duplicates
   `NewsletterForm.astro`'s submit flow and ~90 lines of form CSS.

---

## 3. Conventions decided up front

These must be agreed before Phase 1 starts. Changing them mid-refactor causes churn across
every subsequent phase.

### 3.1 CSS naming: BEM

The codebase is predominantly hand-written CSS with Tailwind used only for utilities. Moving
styles out of `<style>` blocks removes Astro's automatic scoping, so shared stylesheets need
explicit namespacing.

- Block: `.timeline-card`
- Element: `.timeline-card__date`
- Modifier: `.timeline-card--highlight`
- Tailwind utilities remain allowed inline for spacing/layout one-offs.
- Do **not** introduce `@layer components` abstractions in this refactor; that is a separate
  decision with its own trade-offs.

### 3.2 File placement

- Shared, cross-page CSS → `src/styles/<domain>.css`
- Shell-specific CSS → `src/styles/shell/<component>.css`
- Client-side behaviour → `src/scripts/` (browser-only, imported by components)
- Pure logic, no DOM → `src/lib/` (must be unit-testable without a DOM)

The `src/scripts/` vs `src/lib/` split is load-bearing: anything in `src/lib/` must be
importable from a Vitest run with no `jsdom` environment.

### 3.3 Import aliases

Use the existing `@/` aliases from `tsconfig.json` and `astro.config.mjs`. Do not add new
alias entries; if a new top-level directory is created under `src/`, reach it via `@/`.

### 3.4 Commit and PR granularity

One phase per PR. Each PR must be independently revertable. Do not combine phases even when
they touch adjacent files — the point of the phasing is that a reviewer can follow it.

---

## 4. Blocking item (do before or alongside Phase 1)

### B-1 — `newsletter/send.ts` has no authentication

`src/pages/api/newsletter/send.ts` broadcasts to every confirmed subscriber and is publicly
reachable. Lines 7–8 carry a comment acknowledging this:

```ts
// Admin endpoint to send newsletters to all confirmed subscribers
// This should be protected with authentication in production
```

There is no auth check anywhere in the handler. Any unauthenticated `POST` with a `subject`
and `htmlContent` triggers a full send via `Promise.allSettled` over all subscribers
(lines 96–100).

**Required fix:** a shared secret in a `NEWSLETTER_ADMIN_TOKEN` environment variable, compared
against an `Authorization: Bearer` header using a constant-time comparison, rejecting with
`401` before the feature flag check. Add the variable to `.env.example` and to the Cloudflare
Worker secrets.

This is tracked here for visibility but should **not** wait for the refactor. Treat it as a
standalone PR. Also confirm whether the endpoint is currently reachable in production — if
`NEWSLETTER_ENABLED` is false in the deployed environment the exposure is latent rather than
live, which changes the urgency but not the fix.

---

## 5. Phases

### Phase 0 — Safety net

**Why first:** every later phase claims "behaviour-preserving". Without a way to verify that,
the claim is unverifiable and the refactor becomes risky.

**Scope:**

- Add Vitest with a Node environment (no jsdom needed yet).
- Write characterisation tests for the pure logic that later phases will move:
  `src/lib/validation.ts`, `src/lib/freelance-navigation.ts`, `src/utils/formatDate.ts`,
  `src/lib/version.ts`.
- Add an i18n key-parity test asserting that the `es` and `en` objects in
  `src/i18n/translations.ts` have identical key paths. This currently cannot fail at compile
  time because `interfaces.d.ts` only requires each locale to satisfy `Translations`, not that
  both are complete in the same way.
- Add a build smoke check: `astro check && astro build` must pass.

**Acceptance criteria:**

- `npm run test` exists and passes.
- The i18n parity test fails if a key is removed from one locale only (verify by temporarily
  deleting one, confirming red, restoring).
- No `src/` file outside test files is modified.

**Rollback:** delete the test files and the script entries. Zero production impact.

---

### Phase 1 — Decompose `BaseLayout.astro`

**Why:** it is 2,471 lines and it is the first file any reviewer opens. It is also the single
highest-leverage change: roughly 2,350 lines move out of one file into ~18 focused ones.

**Target:** `BaseLayout.astro` ends at ~120 lines containing only composition.

**Target tree:**

```
src/
  layouts/
    BaseLayout.astro              # composition only: SeoHead + SiteNav + SiteHeader + slot + SiteFooter + popups
  components/shell/
    SeoHead.astro
    SiteNav.astro
    SiteHeader.astro
    SiteFooter.astro
    DesktopQrPopup.astro
    RecruiterHint.astro
    LanguageLoadingOverlay.astro
  scripts/shell/
    theme.ts
    sticky-title.ts
    glassy-nav.ts
    scroll-to-top.ts
    nav-animations.ts
    i18n-switcher.ts
    popups/qr.ts
    popups/recruiter.ts
    popups/overlap.ts
  lib/router/
    sliding-door.ts
    sliding-door.types.ts         # the DOM contract, made explicit — see Risk R-1
  lib/server/
    qr-notification.ts            # the SSR side effect currently in the frontmatter
  styles/shell/
    nav.css
    header.css
    footer.css
    popups.css
    sticky-title.css
    language-overlay.css
```

**Source mapping** (line numbers against the 2,471-line baseline):

| Current lines | Destination |
| --- | --- |
| 33–49 (QR email SSR side effect) | `lib/server/qr-notification.ts` |
| 51–65 (desktop UA detection) | `lib/server/device.ts` or inline in `DesktopQrPopup.astro` |
| 71–95 (`<head>`) | `components/shell/SeoHead.astro` |
| 81–94 (anti-FOUC theme script) | **stays `is:inline` in `SeoHead.astro`** — see below |
| 97–157 (nav) | `components/shell/SiteNav.astro` |
| 158–190 (header + sticky title) | `components/shell/SiteHeader.astro` |
| 191–196 (overlays) | `LanguageLoadingOverlay.astro` + sliding-door mount point |
| 201–239 (QR popup) | `components/shell/DesktopQrPopup.astro` |
| 241–266 (recruiter hint) | `components/shell/RecruiterHint.astro` |
| 268–297 (footer) | `components/shell/SiteFooter.astro` |
| 299–569 (sliding door script) | `lib/router/sliding-door.ts` |
| 571–1156 (UI script monolith) | `scripts/shell/*` — one module per concern |
| 1160–2470 (`<style is:global>`) | `styles/shell/*.css` |

**Constraint — the anti-FOUC script must stay inline.** Lines 81–94 read `localStorage.theme`
and set `data-theme` before first paint. Moving it to a bundled module introduces a network
round-trip and reintroduces the theme flash. Keep it as `is:inline` inside `SeoHead.astro`.

**Opportunistic addition (allowed in this phase):** `SeoHead.astro` should add `canonical`,
`hreflang` alternates, Open Graph and Twitter Card tags. None of these exist anywhere in the
codebase today, which is a visible gap on a bilingual site. This is additive and cannot
regress existing behaviour, so it is acceptable inside an otherwise behaviour-preserving
phase. New optional props: `canonical`, `ogImage`, `noIndex`.

**Acceptance criteria:**

- `BaseLayout.astro` ≤ 150 lines.
- No single new file exceeds 300 lines.
- Rendered DOM is byte-identical for `/es/`, `/en/`, `/es/experience`, `/es/experience/<slug>`,
  `/es/freelance`, `/es/contact` and `/es/blog`. Verify by diffing saved HTML before/after.
- Theme toggle, language switcher, sliding-door navigation, both popups, sticky title and
  scroll-to-top all still work — manual checklist, on mobile viewport and desktop.
- No theme flash on hard reload in either theme.
- `astro check` clean.

**Rollback:** revert the PR. No data or config changes are involved.

---

### Phase 2 — Abstract the duplicated timeline entries

**Why:** `ExperienceEntry` (477) and `FreelanceEntry` (370) are the clearest duplication in the
repo, and the detail pages repeat it again. This phase is the one that most directly
demonstrates abstraction per line of code changed.

**Target tree:**

```
src/
  components/timeline/
    TimelineCard.astro            # base card: date, highlight badge, skills, CTA, stretched link
    EmployerLogo.astro            # logo + optional href wrapper
    SkillList.astro               # accepts maxVisible (replaces MAX_VISIBLE_SKILLS)
    DetailBlocks.astro            # the achievements/links block shared by both [slug] pages
  layouts/
    DetailPageLayout.astro        # absorbs the ~234 lines of parallel detail-page CSS
  styles/
    timeline.css                  # starPulse, skill-tag, view-detail-cta — defined once
```

`ExperienceEntry.astro` and `FreelanceEntry.astro` remain as thin wrappers that compose
`TimelineCard` and pass their differences through named slots:

- Experience-only: employer logo with `href`, always-visible company row, `freelance-badge`
  when `employmentType === 'freelance'`, untruncated description.
- Freelance-only: `PlatformBadge` list, skills capped at 3 with a `skillsMore` indicator,
  description clamped to 2 lines, footer with top border.

**Also in scope:** unify the `DetailBlock` interface, currently declared twice —
`experience-data.ts:10–14` and `freelance-data.ts:11–15` — into `src/lib/types/content.ts`.

**Acceptance criteria:**

- `ExperienceEntry.astro` and `FreelanceEntry.astro` each ≤ 120 lines.
- `@keyframes starPulse`, `.skill-tag` and `.view-detail-cta` each defined exactly once
  (verify with `rg -c` across `src/`).
- Both index pages and both detail pages render identically — diff saved HTML.
- Hover states, highlight animation, stretched-link click targets and the sliding-door
  transition from card to detail all still work.

**Rollback:** revert the PR.

**Note:** `src/components/FreelanceSidebar.astro` is currently untracked and
`FreelanceBanner.astro` / `FreelanceEntry.astro` have uncommitted changes as of the baseline.
Commit or stash that work before starting this phase, otherwise the diff will be unreadable.

---

### Phase 3 — Move content to Content Collections

**Why:** experience and freelance content lives in `.ts` as two parallel arrays per locale.
Adding a third language means duplicating ~150 lines, and nothing verifies that the locale
arrays stay in sync. Astro 5's Content Layer is already in the project — used for exactly two
blog files.

**Target tree:**

```
src/content/
  config.ts                       # blog + experience + freelance, all with Zod schemas
  experience/
    es/<slug>.md
    en/<slug>.md
  freelance/
    es/<slug>.md
    en/<slug>.md
```

**Migration strategy — keep the facade.** `getExperienceEntries(lang)`,
`getExperienceEntryBySlug(slug, lang)`, `getFreelanceEntries(lang)` and
`getFreelanceEntryBySlug(slug, lang)` keep their signatures and become thin wrappers over
`getCollection`. Pages do not change in this phase. That is what makes the migration
incremental and reviewable.

**Schema requirements:**

- Mirror the existing `ExperienceEntry` and `FreelanceEntry` interfaces.
- `employmentType` as `z.enum(['full-time', 'freelance'])`.
- `platforms` as `z.array(z.enum(['web', 'ios', 'android']))`.
- Keep `projects` out of the new schema — it is already marked `@deprecated` in favour of
  `details`. Migrate any remaining `projects` data to `details` as part of this phase.

**Also in scope:** move the locale-specific maps that currently live inside data helpers —
`getCategoryDisplayName` (`experience-data.ts:287–301`), `LOCALIZED_TECH_DOCS`,
`SOFT_SKILL_DOC_KEYS`, `SOFT_SKILL_DOC_URLS` — into `src/i18n/`, so translations live in one
place rather than three.

**Acceptance criteria:**

- `src/lib/experience-data.ts` and `src/lib/freelance-data.ts` contain only types and the
  getter facade; zero content strings.
- A slug-parity test asserts `es` and `en` collections expose identical slug sets.
- Every existing detail URL still resolves; no 404 or redirect regressions.
- Build fails loudly if a content file violates its schema — verify by temporarily breaking one.

**Rollback:** revert the PR. Content files are additive; the old `.ts` arrays return with the
revert.

**Deferred:** hardcoded strings found during the audit that are not covered by
`translations.ts` — `'Cerrar' : 'Close'` in `experience/index.astro:77`, the `"Skills"` label
in `SkillsModal.astro:30`, the `"- Germán Gómez"` title suffix in `experience/[slug].astro:27`.
Fold these into `translations.ts` opportunistically; they do not block the phase.

---

### Phase 4 — Harden the API and service layer

**Why:** four endpoints repeat the same env resolution, the same feature-flag check and the
same response construction, with inconsistent error semantics. One of them leaks
`error.message` to the client.

**Target tree:**

```
src/
  lib/http/
    responses.ts                  # ok, badRequest, validationError, unauthorized, serverError
    env.ts                        # resolveEnv(locals) — single source for locals.env ?? import.meta.env
    withHandler.ts                # wraps a handler: try/catch, logging, feature flags
  lib/email/
    EmailService.ts               # transport only
    templates/
      base.ts                     # shared shell + the CSS currently copy-pasted 3x
      cv-request.ts
      cv-notification.ts
      qr-scan.ts
      newsletter-confirmation.ts
  lib/types/
    api.ts                        # Result<T> = { success: true; data: T } | { success: false; error: string }
```

**Specific defects to fix in this phase:**

| Defect | Location | Fix |
| --- | --- | --- |
| Error message leaked to client | `request-cv.ts:158–175` | Log server-side, return a generic message |
| `NEWSLETTER_ENABLED` checked 3× | `subscribe.ts:10–11`, `confirm.ts:8–9`, `send.ts:11–12` | Single helper |
| `confirm.ts` returns plain text 503 while siblings return JSON | `confirm.ts:12–14` | Consistent shape |
| Two endpoints swallow errors with no logging | `subscribe.ts:103–114`, `send.ts:118–129` | Log via `withHandler` |
| `KVNamespace` redeclared locally | `newsletterService.ts:9–14` | Use the global Cloudflare type |
| `NewsletterSubscribeData` exported but unused | `validation.ts:40` | Use it or delete it |
| Email regex duplicated | `validation.ts:8–13` and `31–36` | Extract a shared refinement |

**Optional, higher-effort:** render email templates as `.astro` components via Astro's
Container API instead of template literals. This is a genuine improvement in separation of
concerns and is the kind of decision that reads well in review, but it adds runtime surface
area. Evaluate after the string-template extraction is done and measure the bundle impact
before committing to it.

**Acceptance criteria:**

- Each endpoint ≤ 60 lines.
- All four endpoints return the same JSON shape for the same class of failure.
- No `catch` block passes `error.message` to a response body.
- Unit tests cover `responses.ts` and `resolveEnv`.
- Contact form, CV request, newsletter subscribe and newsletter confirm all still work
  end-to-end against a real Resend key in a preview deployment.

**Rollback:** revert the PR. No schema or KV changes are involved, so no data migration.

---

### Phase 5 — Forms

**Why:** `ContactForm.astro` is 68% inline script, and its submit handler is a verbose superset
of `NewsletterForm.astro`'s.

**Target tree:**

```
src/
  lib/forms/
    createFormHandler.ts          # shared submit lifecycle: disable, serialise, fetch, field errors, restore
    form-persistence.ts           # the sessionStorage i18n persistence, ContactForm.astro:254–320
  scripts/
    turnstile.ts                  # ContactForm.astro:322–540
  styles/
    forms.css                     # the ~90 duplicated lines, defined once
```

Both form components declare only their fields, their variant classes and their endpoint.

**Note on `contact/index.astro`:** its `<style>` block reaches into `.contact-form`
(lines 164–167) and its script manipulates the child's `#submit-btn` (lines 398–414). That
coupling should be resolved with a prop or a custom event, not preserved.

**Acceptance criteria:**

- `ContactForm.astro` ≤ 150 lines.
- Form CSS defined once; both components reference it.
- Turnstile still gates submission; honeypot still silently accepts and discards.
- Language-switch persistence still restores field values.
- Validation errors still render per field in both languages.

**Rollback:** revert the PR.

---

### Phase 6 — Tooling and CI

**Why:** `tsconfig.json` extends `astro/tsconfigs/strict`, but nothing in the 14 npm scripts
runs a type check, a linter or a test. A reviewer reads that as "strict mode is decorative".

**Scope:**

- ESLint with `eslint-plugin-astro` and `@typescript-eslint`.
- Prettier with `prettier-plugin-astro`.
- Scripts: `lint`, `format`, `typecheck` (`astro check`), `test`, and `validate` running all four.
- GitHub Actions workflow: `validate` + `build` on push and PR.
- Status badges in `README.md`.

**Acceptance criteria:**

- `npm run validate` passes on a clean checkout.
- CI fails on a deliberately introduced type error (verify, then revert).
- Zero lint errors — configure rules to match the existing style rather than reformatting the
  entire codebase in this PR. A repo-wide format pass, if wanted, is a separate commit so it
  does not pollute the diff.

**Rollback:** delete the config files, workflow and script entries.

---

## 6. Risks

### R-1 — The sliding-door DOM contract is implicit

`lib/router/sliding-door.ts` depends on attributes that pages set with no compile-time link:

- `data-sliding-door` on navigating links
- `data-sliding-door-back`, `data-list-path`, `data-freelance-back` on back buttons
- `[data-page-heading]` for the sticky title observer
- `[data-sticky-title]` as the sync target

Extracting the script from the layout will not break these at build time — it will break them
silently at runtime. **Mitigation:** define the contract in `sliding-door.types.ts` and expose
small helper components or typed prop builders that emit the attributes, so the wiring is
checked rather than remembered. Test the full navigation flow on both experience and freelance
detail pages, including the browser back button and the `freelanceReturnTo` sessionStorage
path, before merging Phase 1.

### R-2 — Losing Astro's CSS scoping

Astro scopes `<style>` blocks per component. Moving ~1,300 lines to shared stylesheets removes
that guarantee, and selectors that were safe in isolation can start colliding. **Mitigation:**
BEM naming is decided in §3.1 and must be applied while moving, not retrofitted afterwards.
Run a visual diff on every route after Phase 1 and Phase 2.

### R-3 — Content migration and SEO

The site runs `output: "server"` and resolves slugs at request time. Any slug change during
Phase 3 breaks a live URL. **Mitigation:** slugs are treated as immutable in Phase 3. If a
slug genuinely must change, that is a separate PR with a redirect.

### R-4 — Phase 2 conflicts with in-flight work

The baseline has uncommitted changes in `FreelanceBanner.astro`, `FreelanceEntry.astro`,
`freelance/index.astro`, `i18n/translations.ts`, `i18n/interfaces.d.ts`, plus an untracked
`FreelanceSidebar.astro`. Land or discard that work before Phase 2.

---

## 7. Sequencing

Phases 1–5 have a soft dependency chain: Phase 2's `DetailPageLayout` is cleaner once Phase 1
has established `src/styles/` conventions, and Phase 3 is easier once Phase 2 has settled the
component interfaces. Phases 4 and 6 are independent and can run in parallel with any of the
others.

Recommended order if time is limited: **Phase 0 → Phase 1 → Phase 2 → Phase 6**, then 3, 4, 5
as capacity allows. Phases 1 and 2 together remove roughly 1,500 lines of duplication and are
the most legible in a diff. Blocking item B-1 ships independently of all of this.

---

## 8. Definition of done

The refactor is complete when:

- No file in `src/` exceeds 300 lines.
- No CSS rule is defined in more than one place.
- Content is data, not code.
- Every endpoint shares one response contract.
- `npm run validate` is green in CI on every PR.
- A reviewer opening `src/` can name the architecture from the directory tree alone.
