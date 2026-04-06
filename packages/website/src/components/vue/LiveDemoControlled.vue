<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import { TegakiRenderer } from 'tegaki/vue';
import type { TegakiBundle } from 'tegaki/core';

const props = withDefaults(defineProps<{ fontSize?: number }>(), { fontSize: 48 });

const bundle = shallowRef<TegakiBundle | null>(null);
const time = ref(0);

onMounted(() => {
  import('tegaki/fonts/caveat').then((mod) => {
    bundle.value = (mod as any).default;
  });
});
</script>

<template>
  <div class="not-content live-demo">
    <div class="live-demo-card">
      <template v-if="bundle">
        <input type="range" :min="0" :max="10" :step="0.01" v-model.number="time" class="live-demo-slider" />
        <TegakiRenderer :font="bundle" text="Scrub me!" :time="time" :style="{ fontSize: props.fontSize + 'px' }" />
      </template>
      <div v-else class="live-demo-loading">Loading...</div>
    </div>
    <div class="live-demo-caption">Drag the slider to scrub through the animation</div>
  </div>
</template>
