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

Integration pass completed for the approved non-album assets present in `assets/images/masters/`.

| Asset | Deliverables | Status |
| --- | ---: | --- |
| `CDS-001` | desktop + mobile | accepted / integrated / validated |
| `CDS-002` | desktop | accepted / integrated / validated |
| `CDS-003` | none | HOLD - review later |
| `CDS-004` | desktop | accepted / integrated / validated |
| `CDS-005` | desktop | accepted / integrated / validated |
| `CDS-006` | desktop | accepted / integrated / validated |
| `CDS-007` | desktop | accepted / integrated / validated |
| `CDS-008` | desktop | accepted / integrated / validated |
| `CDS-009` | desktop + mobile | accepted / integrated / validated |
| `CDS-010` | desktop + mobile | accepted / integrated / validated |
| `CDS-011` | desktop | accepted / integrated / validated |
| `CDS-012` | desktop | accepted / integrated / validated |
| `CDS-013` | desktop | accepted / integrated / validated |
| `CDS-014` | desktop + mobile | accepted / integrated / validated |
| `CDS-015`-`CDS-024` | none | HOLD - release covers / album artwork |
| `CDS-025` | desktop + mobile | accepted / integrated / validated |
| `CDS-026`-`CDS-033` | none | HOLD - Visual Archive cards pending YouTube decision |
| `CDS-034` | desktop + mobile | accepted / integrated / validated |
| `CDS-035` | desktop + mobile | accepted / integrated / validated |
| `CDS-036` | desktop | accepted / integrated / validated |
| `CDS-037` | desktop | accepted / integrated / validated |
| `CDS-038` | desktop | accepted / integrated / validated |
| `CDS-039` | desktop + mobile | accepted / integrated / validated |
| `CDS-040` | desktop + mobile | accepted / integrated / validated |
| `CDS-041-D` | none | unresolved - master was not present; desktop keeps existing `hero-callizto.jpeg` fallback |
| `CDS-041-M` | mobile | accepted / integrated / validated |
| `CDS-042` | desktop + mobile | accepted / integrated / validated |
| `CDS-043` | desktop + mobile | accepted / integrated / validated |
| `CDS-044` | desktop + mobile | accepted / integrated / validated |

### Derivative and Integration Summary

- 37 optimized WebP files created from the accepted PNG masters.
- Dedicated mobile compositions are used at the `680px` breakpoint; desktop images are not cropped into mobile substitutes when a `-M` master exists.
- Homepage gateways, homepage portraits, homepage Forge feature, band profiles, Forge profiles, page heroes, I.A.M.R.E.A.L., and contact imagery are connected to their intended components.
- Desktop QA passed at `1440 x 900`.
- Mobile QA passed at `390 x 844`.
- Band and Forge portrait crops passed at both viewport sizes.
- I.A.M.R.E.A.L. mobile title sizing was adjusted to prevent overflow over the new mobile hero.
- Browser console QA completed with no warnings or errors.
- No album, song catalog, player, or Visual Archive card work was performed.

## Acceptance Rules

- Correct faces, hair, eyes, body class, materials, clothing language, and identity accessories
- Correct left-to-right character placement for groups
- No duplicates, merged identities, costume swaps, extra limbs, nonsense text, logos, or watermarks
- Correct crop-safe composition for the target component
- Nyx glasses preserve the wide angular temple arm with violet side accent whenever visible
- Human characters remain human; synthetic characters retain their correct chassis
- Public presentation uses structured opaque stagewear
