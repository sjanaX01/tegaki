<script lang="ts">
import { TegakiRenderer } from 'tegaki/svelte';
import type { TegakiBundle } from 'tegaki/core';

let { fontSize = 48 }: { fontSize?: number } = $props();

let bundle = $state<TegakiBundle | null>(null);
let time = $state(0);

$effect(() => {
  import('tegaki/fonts/caveat').then((mod) => {
    bundle = (mod as any).default;
  });
});
</script>

<div class="not-content live-demo">
  <div class="live-demo-card">
    {#if bundle}
      <input type="range" min={0} max={10} step={0.01} bind:value={time} class="live-demo-slider" />
      <TegakiRenderer font={bundle} text="Scrub me!" {time} style="font-size: {fontSize}px" />
    {:else}
      <div class="live-demo-loading">Loading...</div>
    {/if}
  </div>
  <div class="live-demo-caption">Drag the slider to scrub through the animation</div>
</div>
