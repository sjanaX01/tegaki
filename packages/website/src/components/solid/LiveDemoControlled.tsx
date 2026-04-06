/** @jsxImportSource solid-js */
import { createResource, createSignal, Show } from 'solid-js';
import type { TegakiBundle } from 'tegaki/core';
import { TegakiRenderer } from 'tegaki/solid';

async function loadBundle(): Promise<TegakiBundle> {
  const mod = await import('tegaki/fonts/caveat');
  return (mod as any).default;
}

export function LiveDemoControlled(props: { fontSize?: number }) {
  const [bundle] = createResource(loadBundle);
  const [time, setTime] = createSignal(0);

  return (
    <div class="not-content live-demo">
      <div class="live-demo-card">
        <Show when={bundle()} fallback={<div class="live-demo-loading">Loading...</div>}>
          {(b) => (
            <>
              <input
                type="range"
                min={0}
                max={10}
                step={0.01}
                value={time()}
                onInput={(e) => setTime(Number(e.currentTarget.value))}
                class="live-demo-slider"
              />
              <TegakiRenderer font={b()} text="Scrub me!" time={time()} style={{ 'font-size': `${props.fontSize ?? 48}px` }} />
            </>
          )}
        </Show>
      </div>
      <div class="live-demo-caption">Drag the slider to scrub through the animation</div>
    </div>
  );
}
