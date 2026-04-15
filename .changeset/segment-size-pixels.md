---
"tegaki": patch
---

Breaking: `quality.segmentSize` is now measured in CSS pixels instead of
font units. Subdivision count now scales with rendered size, so small
glyphs are no longer over-subdivided. A 100px stroke with segmentSize=1
yields ~100 sub-segments; the same stroke at 10px yields ~10.
