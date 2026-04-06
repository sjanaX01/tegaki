<script lang="ts">
import { TegakiRenderer } from 'tegaki/svelte';
import type { TegakiBundle } from 'tegaki/core';

let {
  text = 'Hello World',
  fontSize = 48,
  time = { mode: 'uncontrolled' as const, speed: 1, loop: true },
  effects,
  caption,
}: {
  text?: string;
  fontSize?: number;
  time?: any;
  effects?: Record<string, any>;
  caption?: string;
} = $props();

let bundle = $state<TegakiBundle | null>(null);

$effect(() => {
  import('tegaki/fonts/caveat').then((mod) => {
    bundle = (mod as any).default;
  });
});
</script>

<div class="not-content live-demo">
  <div class="live-demo-card">
    {#if bundle}
      <TegakiRenderer font={bundle} {text} {time} {effects} style="font-size: {fontSize}px" />
    {:else}
      <div class="live-demo-loading">Loading...</div>
    {/if}
  </div>
  {#if caption}
    <div class="live-demo-caption">{caption}</div>
  {/if}
</div>
