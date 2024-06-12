export interface AnimationEventDispatcher {
  (element: HTMLElement, type: "animationstart" | "animationend", animationName: string): void;
}

/**
 * Must be called in a `beforeEach` block to create a animation event dispatcher.
 */
export function createAnimationEventDispatcher(): AnimationEventDispatcher {
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
