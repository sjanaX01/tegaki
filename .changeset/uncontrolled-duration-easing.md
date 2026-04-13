---
"tegaki": patch
---

Add `duration` and `easing` options to uncontrolled time mode.

- `duration` stretches or compresses one iteration to take exactly N seconds, derived from the natural timeline inside the engine. Mutually exclusive with `speed` / `catchUp` at the type level (discriminated union); when both are set at runtime, `duration` takes precedence.
- `easing: (t: number) => number` maps linear progress (0–1) to displayed progress (0–1). Applied at read-time, so `currentTime`, `onTimeChange`, and the `--tegaki-time` / `--tegaki-progress` CSS custom properties all reflect the eased value. Completion is evaluated against linear progress so overshoot/undershoot curves (e.g. `easeOutBack`) don't trip completion early or late.
- The web component adapter accepts a `duration` attribute; `easing` is available via the `time` JS property only (it's function-valued).
