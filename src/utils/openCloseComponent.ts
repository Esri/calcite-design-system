/**
 * Defines interface for components with open/close public emitter.
 * All implementations of this interface must handle the following events: `beforeOpen`, `open`, `beforeClose`, `close`.
 */
export interface OpenCloseComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  /**
   * When true, the component opens.
   */
  open: boolean;

  /**
   * Specifies property on which active transition is watched for.
   */
  openTransitionProp: string;

  /**
   * Specifies element that the transition is allowed to emit on.
   */
  transitionEl: HTMLDivElement;

  /**
   * Defines method for `beforeOpen` event handler.
   */
  onBeforeOpen: () => void;

  /**
   * Defines method for `open` event handler:
   */
  onOpen: () => void;

  /**
   * Defines method for `beforeClose` event handler:
   */
  onBeforeClose: () => void;

  /**
   * Defines method for `close` event handler:
   */
  onClose: () => void;
}

/**
 * Exported for testing purposes only
 *
 * @internal
 */
export const transitionStartEvent = "transitionstart";
export const transitionEndEvent = "transitionend";

const componentToTransitionStartListeners = new WeakMap<HTMLDivElement, typeof transitionStart>();
const componentToTransitionEndListeners = new WeakMap<HTMLDivElement, typeof transitionEnd>();

function transitionStart(event: TransitionEvent): void {
  if (event.propertyName === this.openTransitionProp && event.target === this.transitionEl) {
    this.open ? this.onBeforeOpen() : this.onBeforeClose();
  }
}

function transitionEnd(event: TransitionEvent): void {
  if (event.propertyName === this.openTransitionProp && event.target === this.transitionEl) {
    this.open ? this.onOpen() : this.onClose();
  }
}

let boundOnTransitionStart: (event: TransitionEvent) => void;
let boundOnTransitionEnd: (event: TransitionEvent) => void;

/* removes any existing listeners, adds listener and updates the map */
export const connectOpenCloseComponent = (component: OpenCloseComponent): void => {
  if (component.transitionEl) {
    document.removeEventListener(transitionStartEvent, componentToTransitionStartListeners.get(component.transitionEl));
    document.removeEventListener(transitionEndEvent, componentToTransitionEndListeners.get(component.transitionEl));

    componentToTransitionStartListeners.delete(component.transitionEl);
    componentToTransitionEndListeners.delete(component.transitionEl);

    boundOnTransitionStart = transitionStart.bind(component);
    boundOnTransitionEnd = transitionEnd.bind(component);

    componentToTransitionStartListeners.set(component.transitionEl, boundOnTransitionStart);
    componentToTransitionEndListeners.set(component.transitionEl, boundOnTransitionEnd);

    component.transitionEl.addEventListener(transitionStartEvent, boundOnTransitionStart);
    component.transitionEl.addEventListener(transitionEndEvent, boundOnTransitionEnd);
  }
};

/* uses map to remove the listener from transitionEl and updates the map */
export const disconnectOpenCloseComponent = (component: OpenCloseComponent): void => {
  document.removeEventListener(transitionStartEvent, componentToTransitionStartListeners.get(component.transitionEl));
  document.removeEventListener(transitionEndEvent, componentToTransitionEndListeners.get(component.transitionEl));

  componentToTransitionStartListeners.delete(component.transitionEl);
  componentToTransitionEndListeners.delete(component.transitionEl);
};
