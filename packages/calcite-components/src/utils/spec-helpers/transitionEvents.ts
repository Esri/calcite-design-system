import { JSDOM } from "jsdom";

export interface TransitionEventDispatcher {
  (element: HTMLElement, type: "transitionstart" | "transitionend", propertyName: string): void;
}

/**
 * Must be called in a `beforeEach` block to create a transition event dispatcher.
 */
export function createTransitionEventDispatcher(): TransitionEventDispatcher {
  // we clobber Stencil's custom Mock document implementation
  const { window: win } = new JSDOM();

  // eslint-disable-next-line no-global-assign -- overriding to make window references use JSDOM (which is a subset, hence the type cast)
  window = win as any as Window & typeof globalThis;

  // we define TransitionEvent since JSDOM doesn't support it yet - https://github.com/jsdom/jsdom/issues/1781
  class TransitionEvent extends window.Event {
    elapsedTime: number;

    propertyName: string;

    constructor(type: string, eventInitDict: EventInit & Partial<{ elapsedTime: number; propertyName: string }>) {
      super(type, eventInitDict);
      this.elapsedTime = eventInitDict.elapsedTime;
      this.propertyName = eventInitDict.propertyName;
    }
  }

  return (element: HTMLElement, type: "transitionstart" | "transitionend", propertyName: string): void => {
    element.dispatchEvent(new TransitionEvent(type, { propertyName }));
  };
}
