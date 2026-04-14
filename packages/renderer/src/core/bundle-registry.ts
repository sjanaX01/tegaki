import type { TegakiBundle } from '../types.ts';

const bundles = new Map<string, TegakiBundle>();

/** Register a font bundle so it can be referenced by family name. */
export function registerBundle(bundle: TegakiBundle): void {
  bundles.set(bundle.family, bundle);
}

/** Look up a registered bundle by family name. */
export function getBundle(family: string): TegakiBundle | undefined {
  return bundles.get(family);
}

export function resolveBundle(font: TegakiBundle | string | undefined): TegakiBundle | undefined {
  if (typeof font === 'string') {
    const bundle = getBundle(font);
    if (!bundle) throw new Error(`TegakiEngine: no bundle registered for "${font}". Call TegakiEngine.registerBundle() first.`);
    return bundle;
  }
  return font;
}
