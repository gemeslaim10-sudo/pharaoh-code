// Global type declarations for external scripts loaded via CDN

// ─── jQuery-like chainable interface ────────────────────────────────────────
interface JQueryResult {
  // Core events — always return JQueryResult for chaining
  on(event: string, handler: (this: Element, e: Event) => void): JQueryResult;
  on(event: string, selector: string, handler: (this: Element, e: Event) => void): JQueryResult;
  off(event: string, handler?: (this: Element, e: Event) => void): JQueryResult;
  click(handler: (this: Element, e: Event) => void): JQueryResult;
  click(): JQueryResult;
  change(handler: (this: Element, e: Event) => void): JQueryResult;
  submit(handler: (this: Element, e: Event) => void): JQueryResult;
  keypress(handler: (this: Element, e: KeyboardEvent) => void): JQueryResult;

  // DOM traversal — always JQueryResult
  find(selector: string): JQueryResult;
  closest(selector: string): JQueryResult;
  parent(): JQueryResult;
  children(selector?: string): JQueryResult;
  siblings(selector?: string): JQueryResult;
  next(selector?: string): JQueryResult;
  prev(selector?: string): JQueryResult;
  first(): JQueryResult;
  last(): JQueryResult;
  eq(index: number): JQueryResult;
  filter(selector: string): JQueryResult;

  // DOM manipulation — always JQueryResult when setting
  append(content: string | JQueryResult): JQueryResult;
  prepend(content: string | JQueryResult): JQueryResult;
  html(): string;
  html(content: string): JQueryResult;
  text(): string;
  text(content: string): JQueryResult;
  val(): string;
  val(value: string): JQueryResult;
  empty(): JQueryResult;
  remove(): void;
  clone(): JQueryResult;
  replaceWith(content: string): JQueryResult;

  // CSS & classes — always JQueryResult
  addClass(cls: string): JQueryResult;
  removeClass(cls: string): JQueryResult;
  toggleClass(cls: string): JQueryResult;
  hasClass(cls: string): boolean;
  css(prop: string): string;
  css(prop: string, value: string): JQueryResult;

  // Show/hide/animations — always JQueryResult
  show(duration?: number): JQueryResult;
  hide(duration?: number): JQueryResult;
  fadeIn(duration?: number, callback?: () => void): JQueryResult;
  fadeOut(duration?: number, callback?: () => void): JQueryResult;
  slideUp(duration?: number, callback?: () => void): JQueryResult;
  slideDown(duration?: number, callback?: () => void): JQueryResult;
  animate(props: Record<string, string | number>, duration?: number): JQueryResult;

  // Attributes & data
  attr(name: string): string | undefined;
  attr(name: string, value: string): JQueryResult;
  removeAttr(name: string): JQueryResult;
  prop(name: string): boolean | string;
  prop(name: string, value: boolean | string): JQueryResult;
  data(key: string): unknown;
  data(key: string, value: unknown): JQueryResult;

  // Iteration
  each(fn: (this: Element, index: number, el: Element) => void): JQueryResult;
  length: number;

  // Form
  reset(): void;

  // Position
  offset(): { top: number; left: number } | undefined;
  scrollTop(value?: number): number | JQueryResult;

  // Misc jQuery methods
  ready(fn: () => void): JQueryResult;
  trigger(event: string): JQueryResult;
  is(selector: string): boolean;
  not(selector: string): JQueryResult;
  toArray(): Element[];
}

// The jQuery callable factory function
interface JQueryFactory {
  (selector: string | Element | Document | Window | null): JQueryResult;
  (selector: string, context: Element | Document): JQueryResult;
}

// ─── Swiper Constructor ──────────────────────────────────────────────────────
interface SwiperInstance {
  destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;
  update(): void;
  slideTo(index: number, speed?: number): void;
  slideNext(speed?: number): void;
  slidePrev(speed?: number): void;
  autoplay: { start(): void; stop(): void };
}

type SwiperConstructor = new (
  el: string | Element,
  options?: Record<string, unknown>
) => SwiperInstance;

// ─── Chart.js Constructor ────────────────────────────────────────────────────
interface ChartInstance {
  destroy(): void;
  update(mode?: string): void;
  render(): void;
  resize(): void;
  data: Record<string, unknown>;
}

type ChartConstructor = new (
  ctx: CanvasRenderingContext2D | HTMLCanvasElement | null,
  config: Record<string, unknown>
) => ChartInstance;

// ─── Window augmentation ─────────────────────────────────────────────────────
declare global {
  interface Window {
    $: JQueryFactory;
    Swiper: SwiperConstructor;
    Chart: ChartConstructor;
  }
}

export {};
