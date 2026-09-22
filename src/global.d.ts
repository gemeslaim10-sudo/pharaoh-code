// Global type declarations for browser libraries bundled with the application.

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

// ─── Window augmentation ─────────────────────────────────────────────────────
declare global {
  interface Window {
    Swiper: SwiperConstructor;
  }
}

export {};
