import { JSDOM } from "jsdom";

export interface AnimationEventDispatcher {
  (element: HTMLElement, type: "animationstart" | "animationend", animationName: string): void;
}

/**
 * Must be called in a `beforeEach` block to create a animation event dispatcher.
 */
export function createAnimationEventDispatcher(): AnimationEventDispatcher {
  // we clobber Stencil's custom Mock document implementation
  const { window: win } = new JSDOM();

  // eslint-disable-next-line no-global-assign -- overriding to make window references use JSDOM (which is a subset, hence the type cast)
  window = win as any as Window & typeof globalThis;

  // we define AnimationEvent since JSDOM doesn't support it yet -

  class AnimationEvent extends window.Event {
    elapsedTime: number;

    animationName: string;

    constructor(type: string, eventInitDict: EventInit & Partial<{ elapsedTime: number; animationName: string }>) {
      super(type, eventInitDict);
      this.elapsedTime = eventInitDict.elapsedTime;
      this.animationName = eventInitDict.animationName;
    }
  }

  return (element: HTMLElement, type: "animationstart" | "animationend", animationName: string): void => {
    element.dispatchEvent(new AnimationEvent(type, { animationName }));
  };
}
