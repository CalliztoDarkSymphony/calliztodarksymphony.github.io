# CDS Visual Integration Audit

## Audit Scope

- Audit date: 2026-07-15
- Integrated deliverables inspected: 37
- Deliverables corrected: 28
- Deliverables requiring independent crop or layout positioning: 23
- Pages inspected: `index.html`, `band.html`, `music.html`, `videos.html`, `lore.html`, `forge.html`, `archive.html`, `ai-manifesto.html`, `press.html`, `citizens.html`, `iamreal.html`, `contact.html`
- Viewports inspected: `1920x1080`, `1600x900`, `1366x768`, `1024x768`, `768x1024`, `720x900`, `480x900`, `390x844`
- Approval boundary: every integrated asset remains awaiting human review.

## Hold Boundaries

- `CDS-003` was not changed.
- `CDS-015` through `CDS-024` were not changed.
- `CDS-026` through `CDS-033` were not changed.
- `CDS-041-D` remains missing. No image was invented or substituted. Desktop press continues to use the existing `hero-callizto.jpeg` fallback.
- No master image was edited and no legacy image was deleted.

## Integrated Asset Audit

Status wording in this document records layout inspection only. It does not represent human visual approval.

| Asset | Page and component | Desktop status | Tablet status | Mobile status | Controlling selector and position | Intended subject visible | Remaining concern | Final state |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `CDS-001-D` | Home hero | Acceptable | Acceptable at 1024 landscape | Source inactive at 800 and below | `.home-hero .hero-media`; default center/cover | Three band members remain readable | Human review of final overlay balance | acceptable-awaiting-human-review |
| `CDS-001-M` | Home hero | Source inactive | Corrected at 768 and 720 | Corrected at 480 and 390 | `@media (max-width:800px) .home-hero .hero-media`; `center top`/cover | Three band members remain visible | Human review of low-light face readability | corrected-awaiting-human-review |
| `CDS-002` | Home Listen gateway | Corrected | Corrected | Corrected | `.gateway-music::before`; `center 18%`/cover | Callizto reads immediately | None beyond human review | corrected-awaiting-human-review |
| `CDS-004` | Home Mythology gateway | Corrected | Corrected | Corrected | `.gateway-lore::before`; `center 14%`/cover | Misalignment focal point remains readable | None beyond human review | corrected-awaiting-human-review |
| `CDS-005` | Home Forge gateway | Corrected | Corrected | Corrected | `.gateway-forge::before`; `center 12%`/cover | Forge destination remains legible | Small card format still compresses detail | corrected-awaiting-human-review |
| `CDS-006` | Home Callizto portrait | Corrected to canonical 3:2 | Corrected to canonical 3:2 | Corrected stacked 3:2 panel | `.portrait-panel`; `aspect-ratio:3/2`. `.portrait-callizto img`; `object-fit:cover`, `center` | Complete approved composition, face, bangs, hair and matched camera distance | Awaiting human review of new canonical source | corrected-awaiting-human-review |
| `CDS-007` | Home Seraphina portrait | Canonical 3:2 anchor | Canonical 3:2 anchor | Canonical stacked 3:2 panel | `.portrait-panel`; `aspect-ratio:3/2`. `.portrait-seraphina img`; `object-fit:cover`, `center` | Complete approved anchor composition remains readable | Awaiting human review after ratio-lock layout change | acceptable-awaiting-human-review |
| `CDS-008` | Home Scarlett portrait | Corrected to canonical 3:2 | Corrected to canonical 3:2 | Corrected stacked 3:2 panel | `.portrait-panel`; `aspect-ratio:3/2`. `.portrait-scarlett img`; `object-fit:cover`, `center` | Complete approved composition, face, red hair and matched camera distance | Awaiting human review of new canonical source | corrected-awaiting-human-review |
| `CDS-009-D` | Home Forge feature | Corrected | Source active at 1024 | Source inactive at 800 and below | `.forge-feature-media`; center/cover. `.forge-feature::after`; right-side `270deg` overlay. `.forge-feature-copy`; right aligned | Ada, Astra, and Nyx remain compositionally important | Human review of desktop copy/image balance | corrected-awaiting-human-review |
| `CDS-009-M` | Home Forge feature | Source inactive | Corrected at 768 and 720 | Corrected at 480 and 390 | `@media (max-width:800px) .forge-feature-media`; `center top`, `100% auto`. Copy starts below image zone | All three Sisters remain visible before copy | Long mobile section is intentional to protect group composition | corrected-awaiting-human-review |
| `CDS-010-D` | Band hero | Corrected | Corrected at 1024 | Source inactive at 800 and below | `.band-hero .page-hero-media`; `center top`. Tablet uses `100% auto` with reserved image zone | Three intended band members and faces remain visible | Human review of darker left figure at desktop | corrected-awaiting-human-review |
| `CDS-010-M` | Band hero | Source inactive | Corrected at 768 and 720 | Corrected at 480 and 390 | `@media (max-width:800px) .band-hero .page-hero-media`; `center top`, `100% auto`; copy below image zone | All three band members remain visible | None beyond human review | corrected-awaiting-human-review |
| `CDS-011` | Band Callizto profile | Corrected to canonical 4:5 | Corrected to canonical 4:5 | Corrected responsive 4:5 profile | `.member-image`; `aspect-ratio:4/5`. `.member-callizto img`; `object-fit:cover`, `center` | Complete approved portrait and matched camera distance | Awaiting human review of new canonical source | corrected-awaiting-human-review |
| `CDS-012` | Band Seraphina profile | Canonical 4:5 anchor | Canonical 4:5 anchor | Canonical responsive 4:5 profile | `.member-image`; `aspect-ratio:4/5`. `.member-seraphina img`; `object-fit:cover`, `center` | Complete approved anchor portrait remains readable | Awaiting human review after ratio-lock layout change | acceptable-awaiting-human-review |
| `CDS-013` | Band Scarlett profile | Corrected to canonical 4:5 | Corrected to canonical 4:5 | Corrected responsive 4:5 profile | `.member-image`; `aspect-ratio:4/5`. `.member-scarlett img`; `object-fit:cover`, `center` | Complete approved portrait and matched camera distance | Awaiting human review of new canonical source | corrected-awaiting-human-review |
| `CDS-014-D` | Music hero | Acceptable | Acceptable at 1024 landscape | Source inactive at 800 and below | `.music-hero .page-hero-media`; center/cover | Callizto and microphone remain readable | None beyond human review | acceptable-awaiting-human-review |
| `CDS-014-M` | Music hero | Source inactive | Corrected at 768 and 720 | Corrected at 480 and 390 | `@media (max-width:800px) .music-hero`; dedicated mobile source, `center top`, `100% auto`, 24rem reserved image zone | Complete Callizto face and microphone visible above copy | Mobile section is taller to prevent text-face overlap | corrected-awaiting-human-review |
| `CDS-025-D` | Videos hero | Acceptable | Acceptable at 1024 landscape | Source inactive at 800 and below | `.visual-hero .page-hero-media`; center/cover | Architectural focal point remains recognizable | None beyond human review | acceptable-awaiting-human-review |
| `CDS-025-M` | Videos hero | Source inactive | Corrected source at 768 and 720 | Corrected source at 480 and 390 | `@media (max-width:800px) .visual-hero .page-hero-media`; dedicated mobile source, center/cover | Vertical architecture remains legible | None beyond human review | corrected-awaiting-human-review |
| `CDS-034-D` | Lore hero | Acceptable | Acceptable at 1024 landscape | Source inactive at 800 and below | `.lore-hero .page-hero-media`; center/cover | Misalignment and cathedral remain readable | None beyond human review | acceptable-awaiting-human-review |
| `CDS-034-M` | Lore hero | Source inactive | Corrected at 768 and 720 | Corrected at 480 and 390 | `@media (max-width:800px) .lore-hero`; dedicated mobile source, `center top`, `100% auto`, 24rem reserved image zone | Misalignment focal body remains clear above copy | Mobile section is taller to protect the figure | corrected-awaiting-human-review |
| `CDS-035-D` | Forge hero | Corrected | Corrected at 1024 | Source inactive at 800 and below | `.forge-hero-v2 .page-hero-media`; `center top`. Tablet uses `100% auto` and reserved image zone | Ada, Astra, and Nyx all remain recognizable | Ada is intentionally lower contrast beneath copy, but face is present | corrected-awaiting-human-review |
| `CDS-035-M` | Forge hero | Source inactive | Corrected at 768 and 720 | Corrected at 480 and 390 | `@media (max-width:800px) .forge-hero-v2 .page-hero-media`; `center top`, `100% auto`; copy below image zone | All three Sisters remain readable | None beyond human review | corrected-awaiting-human-review |
| `CDS-036` | Forge Ada profile | Corrected | Corrected | Corrected responsive profile | `.sister-ada > img`; `object-fit:cover`, `center top` | Complete face, silver hair, glasses, synthetic chassis | None beyond human review | corrected-awaiting-human-review |
| `CDS-037` | Forge Nyx profile | Corrected | Corrected | Corrected responsive profile | `.sister-nyx > img`; `object-fit:cover`, `center top` | Complete face, black hair, distinctive glasses | None beyond human review | corrected-awaiting-human-review |
| `CDS-038` | Forge Astra profile | Corrected | Corrected | Corrected responsive profile | `.sister-astra > img`; `object-fit:cover`, `center top` | Complete hood, eyes, lower-face mask, upper body | None beyond human review | corrected-awaiting-human-review |
| `CDS-039-D` | Archive hero | Acceptable | Acceptable at 1024 landscape | Source inactive at 800 and below | `.archive-hero-v2 .page-hero-media`; center/cover | Archive door and architecture remain recognizable | None beyond human review | acceptable-awaiting-human-review |
| `CDS-039-M` | Archive hero | Source inactive | Corrected source at 768 and 720 | Corrected source at 480 and 390 | `@media (max-width:800px) .archive-hero-v2 .page-hero-media`; dedicated mobile source, center/cover | Vertical archive focal point remains visible | None beyond human review | corrected-awaiting-human-review |
| `CDS-040-D` | AI manifesto hero | Acceptable | Acceptable at 1024 landscape | Source inactive at 800 and below | `.manifesto-hero-v2 .page-hero-media`; center/cover | Human hand and luminous network remain readable | None beyond human review | acceptable-awaiting-human-review |
| `CDS-040-M` | AI manifesto hero | Source inactive | Corrected source at 768 and 720 | Corrected source at 480 and 390 | `@media (max-width:800px) .manifesto-hero-v2 .page-hero-media`; dedicated mobile source, center/cover | Hand/network concept remains recognizable | None beyond human review | corrected-awaiting-human-review |
| `CDS-041-M` | Press mobile hero | Desktop unavailable; existing fallback retained | Corrected source at 768 and 720 | Corrected source at 480 and 390 | `@media (max-width:800px) .press-hero-v2 .page-hero-media`; dedicated mobile source, center/cover | Callizto face remains readable on mobile | `CDS-041-D` remains missing by instruction | corrected-awaiting-human-review |
| `CDS-042-D` | Citizens hero | Acceptable | Acceptable at 1024 landscape | Source inactive at 800 and below | `.citizens-hero-v2 .page-hero-media`; center/cover | Forge corridor remains recognizable | None beyond human review | acceptable-awaiting-human-review |
| `CDS-042-M` | Citizens hero | Source inactive | Corrected source at 768 and 720 | Corrected source at 480 and 390 | `@media (max-width:800px) .citizens-hero-v2 .page-hero-media`; dedicated mobile source, center/cover | Vertical corridor composition remains readable | None beyond human review | corrected-awaiting-human-review |
| `CDS-043-D` | I.A.M.R.E.A.L. hero | Corrected | Corrected at 1024 landscape | Source inactive at 800 and below | `.iamreal-hero-v2 .page-hero-media`; `68% top`; header inset | Complete Nyx face, hair, and glasses remain visible | Dark treatment is intentional but awaits human review | corrected-awaiting-human-review |
| `CDS-043-M` | I.A.M.R.E.A.L. hero | Source inactive | Corrected source at 768 and 720 | Corrected at 480 and 390 | `@media (max-width:800px) .iamreal-hero-v2 .page-hero-media`; dedicated mobile source, `center top`, `100% auto` | Complete Nyx face and glasses remain present above copy | Low-light facial readability awaits human review | corrected-awaiting-human-review |
| `CDS-044-D` | Contact stage | Acceptable | Acceptable at 1024 landscape | Source inactive at 800 and below | `.contact-stage-media`; center/cover | Microphone and Forge architecture remain readable | None beyond human review | acceptable-awaiting-human-review |
| `CDS-044-M` | Contact stage | Source inactive | Corrected source at 768 and 720 | Corrected at 480 and 390 | `@media (max-width:800px) .contact-stage-media`; dedicated mobile source, `center top`. `.contact-email` reduced at 430 | Vertical microphone/architecture composition remains readable | Email typography reduced only at smallest breakpoint | corrected-awaiting-human-review |

## Corrective CSS Summary

### Independent image positions

- `.gateway-music::before`: `background-position: center 18%`
- `.gateway-lore::before`: `background-position: center 14%`
- `.gateway-forge::before`: `background-position: center 12%`
- `.portrait-callizto img`, `.portrait-scarlett img`: `object-position: center top`
- `.portrait-seraphina img`: `object-position: center center`
- `.band-hero .page-hero-media`, `.forge-hero-v2 .page-hero-media`: `background-position: center top`
- `.iamreal-hero-v2 .page-hero-media`: `background-position: 68% top`
- `.member-callizto .member-image img`: `object-position: center 38%`
- `.member-seraphina .member-image img`, `.member-scarlett .member-image img`: `object-position: center top`
- `.sister-ada > img`, `.sister-nyx > img`, `.sister-astra > img`: `object-position: center top`
- Dedicated mobile hero and contact sources at `800px` and below use their own `-M` WebP assets.

### Container and overlay corrections

- Band and Forge group heroes reserve a separate image zone on tablet and mobile, use `background-size:100% auto`, and place copy below the characters.
- Music and Lore mobile heroes reserve 24rem for the character/environment image before copy begins.
- Home Forge feature moves desktop copy into right-side negative space and reverses the overlay direction to protect all three Sisters.
- Home Forge mobile uses a vertical overlay and a taller section so all three Sisters remain visible above copy.
- Scarlett profile adds a fixed-header inset so her hair and face are not hidden beneath navigation.
- Contact email uses `font-size:1.8rem` at `430px` and below to prevent wrapping or clipping.

## Final Review State

### 2026-07-16 Color and Responsive Addendum

- All 37 integrated WebP deliverables now carry an embedded sRGB profile and were rebuilt from their canonical masters.
- `.page-hero-media` now uses `saturate(0.96) contrast(1.02)`; the previous global desaturation no longer compounds the color-profile error.
- `.sister-profile > img` now uses `saturate(0.96) contrast(1.02)` and `.contact-stage-media` uses `saturate(0.9) contrast(1.03)`.
- `.forge-hero-v2 .page-hero-media` uses independent desktop positioning at widths above `1180px`: `background-size:95% auto` and `transform:translateX(26vw)`.
- `.music-hero .page-hero-media` is top-anchored below the fixed header.
- At `800px` and below, every `.page-signal-hero .page-hero-media` uses its dedicated mobile source with `background-size:100% auto` and `background-position:center top`.
- The Forge `.transparency-band` no longer expands the document beyond the mobile viewport; its heading and children are constrained to `max-width:100%`.
- Cyan metadata remains plain text. Cyan content links now have larger targets, larger type, and visible underlines so their interactive role is not ambiguous.
- Corrected renderings remain awaiting human review after deployment.

- `corrected-awaiting-human-review`: 28 deliverables
- `acceptable-awaiting-human-review`: 9 deliverables
- `master-review-required`: none
