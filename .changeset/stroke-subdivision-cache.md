---
"tegaki": minor
---

Cache stroke subdivision across glyph instances. Subdivision now depends
only on (stroke points, fontSize, segmentSize) and is reused by every
occurrence of the same glyph in the rendered text. Wobble, progress
truncation, pressure, taper, and gradient are applied at draw time on
top of the shared geometry, and effect config changes no longer
invalidate the cache. Glow draws the full truncated polyline in a single
stroke() call, removing the previous per-sub-segment shadowBlur cost.

Wobble is now sampled per sub-vertex (fractional original-point index
keeps phase continuous), giving smoother curves than the previous
lerp-between-wobbled-raw-vertices.
