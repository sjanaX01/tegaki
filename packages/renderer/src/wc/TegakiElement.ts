import { TegakiEngine, type TegakiEngineOptions, type TimeControlProp } from '../core/engine.ts';
import type { TegakiBundle } from '../types.ts';

/**
 * Observed attribute names.
 * - `text`: the text to render (also settable via textContent)
 * - `font`: registered bundle name (see {@link TegakiEngine.registerBundle})
 * - `time`: time control — a number for controlled mode, `"css"` for CSS mode, omit for uncontrolled
 * - `speed`: playback speed multiplier (uncontrolled mode, default `1`)
 * - `playing`: whether animation is playing (uncontrolled mode, default `true`)
 * - `loop`: loop animation (uncontrolled mode, default `false`)
 * - `segment-size`: segment size for rendering
 * - `show-overlay`: show debug overlay
 */
const OBSERVED_ATTRS = ['text', 'font', 'time', 'speed', 'playing', 'loop', 'segment-size', 'show-overlay'] as const;

export class TegakiElement extends HTMLElement {
  static observedAttributes = [...OBSERVED_ATTRS];

  private _engine: TegakiEngine | null = null;
  private _container: HTMLDivElement;
  private _font: TegakiBundle | string | undefined;
  private _effects: TegakiEngineOptions['effects'];
  private _timing: TegakiEngineOptions['timing'];
  private _onComplete: (() => void) | undefined;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Host styles: the element itself is just an inline-block wrapper
    const style = document.createElement('style');
    style.textContent = `:host { display: inline-block; }`;
    shadow.appendChild(style);

    this._container = document.createElement('div');
    shadow.appendChild(this._container);
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  connectedCallback(): void {
    this._engine = new TegakiEngine(this._container, this._buildOptions());
  }

  disconnectedCallback(): void {
    this._engine?.destroy();
    this._engine = null;
  }

  attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null): void {
    this._engine?.update(this._buildOptions());
  }

  // ---------------------------------------------------------------------------
  // Property API (for JS usage)
  // ---------------------------------------------------------------------------

  /** The underlying engine instance. */
  get engine(): TegakiEngine | null {
    return this._engine;
  }

  /** Set the font bundle directly (alternative to the `font` attribute for registered names). */
  get font(): TegakiBundle | string | undefined {
    return this._font;
  }

  set font(value: TegakiBundle | string | undefined) {
    this._font = value;
    this._engine?.update(this._buildOptions());
  }

  /** Visual effects configuration. */
  get effects(): TegakiEngineOptions['effects'] {
    return this._effects;
  }

  set effects(value: TegakiEngineOptions['effects']) {
    this._effects = value;
    this._engine?.update(this._buildOptions());
  }

  /** Timeline timing configuration. */
  get timing(): TegakiEngineOptions['timing'] {
    return this._timing;
  }

  set timing(value: TegakiEngineOptions['timing']) {
    this._timing = value;
    this._engine?.update(this._buildOptions());
  }

  /** Callback when animation completes. */
  get onComplete(): (() => void) | undefined {
    return this._onComplete;
  }

  set onComplete(value: (() => void) | undefined) {
    this._onComplete = value;
    this._engine?.update(this._buildOptions());
  }

  // Playback controls (delegate to engine)

  play(): void {
    this._engine?.play();
  }

  pause(): void {
    this._engine?.pause();
  }

  seek(time: number): void {
    this._engine?.seek(time);
  }

  restart(): void {
    this._engine?.restart();
  }

  get currentTime(): number {
    return this._engine?.currentTime ?? 0;
  }

  get duration(): number {
    return this._engine?.duration ?? 0;
  }

  get isPlaying(): boolean {
    return this._engine?.isPlaying ?? false;
  }

  get isComplete(): boolean {
    return this._engine?.isComplete ?? false;
  }

  // ---------------------------------------------------------------------------
  // Internal
  // ---------------------------------------------------------------------------

  private _buildOptions(): TegakiEngineOptions {
    const text = this.getAttribute('text') ?? this.textContent ?? '';
    const fontAttr = this.getAttribute('font');
    const font = this._font ?? (fontAttr || undefined);
    const time = this._resolveTime();

    return {
      text,
      font,
      time,
      effects: this._effects,
      timing: this._timing,
      segmentSize: this._getNumberAttr('segment-size'),
      showOverlay: this.hasAttribute('show-overlay'),
      onComplete: this._onComplete,
    };
  }

  private _resolveTime(): TimeControlProp {
    const timeAttr = this.getAttribute('time');

    if (timeAttr === 'css') return 'css';
    if (timeAttr != null) {
      const num = Number(timeAttr);
      if (!Number.isNaN(num)) return num;
    }

    // Check for uncontrolled mode attributes
    const hasSpeed = this.hasAttribute('speed');
    const hasPlaying = this.hasAttribute('playing');
    const hasLoop = this.hasAttribute('loop');

    if (hasSpeed || hasPlaying || hasLoop) {
      return {
        mode: 'uncontrolled',
        speed: this._getNumberAttr('speed') ?? 1,
        playing: this.getAttribute('playing') !== 'false',
        loop: this.hasAttribute('loop'),
      };
    }

    return undefined;
  }

  private _getNumberAttr(name: string): number | undefined {
    const value = this.getAttribute(name);
    if (value == null) return undefined;
    const num = Number(value);
    return Number.isNaN(num) ? undefined : num;
  }
}

/**
 * Register the `<tegaki-renderer>` custom element.
 * Call this once before using the element in HTML.
 *
 * @param tagName - Custom element tag name. Default: `'tegaki-renderer'`.
 *   Note: custom element names must contain a hyphen per the HTML spec.
 */
export function registerTegakiElement(tagName = 'tegaki-renderer'): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, TegakiElement);
  }
}
