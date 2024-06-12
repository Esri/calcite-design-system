export interface TransitionEventDispatcher {
  (element: HTMLElement, type: "transitionstart" | "transitionend", propertyName: string): void;
}

/**
 * Must be called in a `beforeEach` block to create a transition event dispatcher.
 */
export function createTransitionEventDispatcher(): TransitionEventDispatcher {
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
