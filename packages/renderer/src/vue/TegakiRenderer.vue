<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { TegakiEngine, type TegakiEngineOptions } from '../core/engine.ts';
import type { TegakiEffects } from '../types.ts';

interface Props extends /* @vue-ignore */ Omit<TegakiEngineOptions, 'effects'> {
  /** Visual effects applied during canvas rendering. */
  effects?: TegakiEffects<Record<string, any>>;
}

const props = defineProps<Props>();

const container = ref<HTMLDivElement>();
let engine: TegakiEngine | null = null;

const engineOptions = computed<TegakiEngineOptions>(() => ({
  text: props.text,
  font: props.font,
  time: props.time,
  effects: props.effects as Record<string, any>,
  segmentSize: props.segmentSize,
  timing: props.timing,
  showOverlay: props.showOverlay,
  onComplete: props.onComplete,
}));

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function htmlCreateElement(tag: string, nodeProps: Record<string, any>, ...children: string[]): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(nodeProps)) {
    if (value == null || value === false) continue;
    if (key === 'style' && typeof value === 'object') {
      const css = Object.entries(value)
        .filter(([, v]) => v != null)
        .map(([k, v]) => {
          const prop = k.startsWith('--') ? k : k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
          const val = typeof v === 'number' && !k.startsWith('--') ? `${v}px` : String(v);
          return `${prop}:${val}`;
        })
        .join(';');
      if (css) parts.push(`style="${escapeAttr(css)}"`);
    } else if (typeof value === 'boolean') {
      parts.push(key);
    } else {
      parts.push(`${key}="${escapeAttr(String(value))}"`);
    }
  }
  const open = parts.length > 0 ? `<${tag} ${parts.join(' ')}>` : `<${tag}>`;
  const content = children.map((c) => (typeof c === 'string' && !c.startsWith('<') ? escapeHtml(c) : c)).join('');
  return `${open}${content}</${tag}>`;
}

// biome-ignore lint/correctness/noUnusedVariables: used in Vue template
const innerHtml = computed(() => TegakiEngine.renderElements(engineOptions.value, htmlCreateElement));

onMounted(() => {
  if (!container.value) return;
  engine = new TegakiEngine(container.value, { adopt: true });
});

onUnmounted(() => {
  engine?.destroy();
  engine = null;
});

watch(
  engineOptions,
  (options) => {
    engine?.update(options);
  },
  { deep: true },
);

defineExpose({ engine, element: container });
</script>

<template>
  <div ref="container" v-html="innerHtml" />
</template>
