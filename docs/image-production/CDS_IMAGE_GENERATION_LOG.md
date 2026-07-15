# CDS Image Generation Log

## Baseline

- Workspace: `C:\CDS\calliztodarksymphony.github.io`
- Branch: `main`
- Starting commit: `b62870c Complete Sol Ultra CDS website rebuild`
- Starting worktree: clean
- Inventory: 44 unique roles / 57 final files
- Canon source: linked project conversation plus seven high-resolution character sheets

## Reference Priority

1. Latest decisions in the linked project conversation
2. High-resolution character sheets on `D:`
3. Earlier drafts only when consistent with the above

Nyx uses `giga Nyx Character Sheet Revision 3.5 - gigapixel-gigapixel-standard v2-3840w.jpeg` as the primary production reference.

## Generation Status

Integration pass completed for the approved non-album assets present in `assets/images/masters/`. All integrated assets are now awaiting human crop review after the corrective responsive audit.

| Asset | Deliverables | Status |
| --- | ---: | --- |
| `CDS-001` | desktop + mobile | integrated / awaiting human review |
| `CDS-002` | desktop | integrated / awaiting human review |
| `CDS-003` | none | HOLD - review later |
| `CDS-004` | desktop | integrated / awaiting human review |
| `CDS-005` | desktop | integrated / awaiting human review |
| `CDS-006` | desktop | integrated / awaiting human review |
| `CDS-007` | desktop | integrated / awaiting human review |
| `CDS-008` | desktop | integrated / awaiting human review |
| `CDS-009` | desktop + mobile | integrated / awaiting human review |
| `CDS-010` | desktop + mobile | integrated / awaiting human review |
| `CDS-011` | desktop | integrated / awaiting human review |
| `CDS-012` | desktop | integrated / awaiting human review |
| `CDS-013` | desktop | integrated / awaiting human review |
| `CDS-014` | desktop + mobile | integrated / awaiting human review |
| `CDS-015`-`CDS-024` | none | HOLD - release covers / album artwork |
| `CDS-025` | desktop + mobile | integrated / awaiting human review |
| `CDS-026`-`CDS-033` | none | HOLD - Visual Archive cards pending YouTube decision |
| `CDS-034` | desktop + mobile | integrated / awaiting human review |
| `CDS-035` | desktop + mobile | integrated / awaiting human review |
| `CDS-036` | desktop | integrated / awaiting human review |
| `CDS-037` | desktop | integrated / awaiting human review |
| `CDS-038` | desktop | integrated / awaiting human review |
| `CDS-039` | desktop + mobile | integrated / awaiting human review |
| `CDS-040` | desktop + mobile | integrated / awaiting human review |
| `CDS-041-D` | none | unresolved - master was not present; desktop keeps existing `hero-callizto.jpeg` fallback |
| `CDS-041-M` | mobile | integrated / awaiting human review |
| `CDS-042` | desktop + mobile | integrated / awaiting human review |
| `CDS-043` | desktop + mobile | integrated / awaiting human review |
| `CDS-044` | desktop + mobile | integrated / awaiting human review |

### Derivative and Integration Summary

- 37 optimized WebP files created from the accepted PNG masters.
- Dedicated mobile compositions are used at the `800px` breakpoint; desktop images are not cropped into mobile substitutes when a `-M` master exists.
- Homepage gateways, homepage portraits, homepage Forge feature, band profiles, Forge profiles, page heroes, I.A.M.R.E.A.L., and contact imagery are connected to their intended components.
- Responsive crop audit completed at `1920x1080`, `1600x900`, `1366x768`, `1024x768`, `768x1024`, `720x900`, `480x900`, and `390x844`.
- Corrected crops remain explicitly awaiting human review.
- Band and Forge portrait crops were corrected independently; no shared global portrait crop was used.
- I.A.M.R.E.A.L. mobile title sizing was adjusted to prevent overflow over the new mobile hero.
- Local browser rendering completed without broken image paths observed.
- No album, song catalog, player, or Visual Archive card work was performed.

## Acceptance Rules

- Correct faces, hair, eyes, body class, materials, clothing language, and identity accessories
- Correct left-to-right character placement for groups
- No duplicates, merged identities, costume swaps, extra limbs, nonsense text, logos, or watermarks
- Correct crop-safe composition for the target component
- Nyx glasses preserve the wide angular temple arm with violet side accent whenever visible
- Human characters remain human; synthetic characters retain their correct chassis
- Public presentation uses structured opaque stagewear
