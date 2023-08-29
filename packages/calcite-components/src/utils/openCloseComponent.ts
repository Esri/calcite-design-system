import { readTask } from "@stencil/core";
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
  open?: boolean;

  /**
   *  Specifies the name of transitionProp.
   */
  transitionProp?: string;

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

const componentToTransitionListeners = new WeakMap<
  OpenCloseComponent,
  [HTMLDivElement, typeof transitionStart, typeof transitionEnd]
>();

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

function emitImmediately(component: OpenCloseComponent, nonOpenCloseComponent = false): void {
  (nonOpenCloseComponent ? component[component.transitionProp] : component.open)
    ? component.onBeforeOpen()
    : component.onBeforeClose();
  (nonOpenCloseComponent ? component[component.transitionProp] : component.open)
    ? component.onOpen()
    : component.onClose();
}

/**
 * Helper to determine globally set transition duration on the given openTransitionProp, which is imported and set in the @Watch("open").
 * Used to emit (before)open/close events both for when the opacity transition is present and when there is none (transition-duration is set to 0).
 *
 * @example
 * import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
 *
 * async componentWillLoad() {
 * // When component initially renders, if `open` was set we need to trigger on load as watcher doesn't fire.
 * if (this.open) {
 *    onToggleOpenCloseComponent(this);
 * }
 * @Watch("open")
 * async toggleModal(value: boolean): Promise<void> {
 *    onToggleOpenCloseComponent(this);
 * }
 *
 * @param component - OpenCloseComponent uses `open` prop to emit (before)open/close.
 * @param nonOpenCloseComponent - OpenCloseComponent uses `expanded` prop to emit (before)open/close.
 */
export function onToggleOpenCloseComponent(component: OpenCloseComponent, nonOpenCloseComponent = false): void {
  readTask((): void => {
    if (component.transitionEl) {
      const { transitionDuration: allDurations, transitionProperty: allProps } = getComputedStyle(
        component.transitionEl
      );
      const allTransitionDurationsArray = allDurations.split(",");
      const allTransitionPropsArray = allProps.split(",");
      const openTransitionPropIndex = allTransitionPropsArray.indexOf(component.openTransitionProp);

      const transitionDuration =
        allTransitionDurationsArray[openTransitionPropIndex] ??
        /* Safari will have a single transition value if multiple props share it,
        so we fall back to it if there's no matching prop duration */
        allTransitionDurationsArray[0];

      if (transitionDuration === "0s") {
        emitImmediately(component, nonOpenCloseComponent);
        return;
      }

      const fallbackTimeoutId = setTimeout((): void => {
        component.transitionEl.removeEventListener("transitionstart", onStart);
        component.transitionEl.removeEventListener("transitionend", onEndOrCancel);
        component.transitionEl.removeEventListener("transitioncancel", onEndOrCancel);
        emitImmediately(component, nonOpenCloseComponent);
      }, parseFloat(transitionDuration) * 1000);

      component.transitionEl.addEventListener("transitionstart", onStart);
      component.transitionEl.addEventListener("transitionend", onEndOrCancel);
      component.transitionEl.addEventListener("transitioncancel", onEndOrCancel);

      function onStart(event: TransitionEvent): void {
        if (event.propertyName === component.openTransitionProp && event.target === component.transitionEl) {
          clearTimeout(fallbackTimeoutId);
          component.transitionEl.removeEventListener("transitionstart", onStart);
          (nonOpenCloseComponent ? component[component.transitionProp] : component.open)
            ? component.onBeforeOpen()
            : component.onBeforeClose();
        }
      }

      function onEndOrCancel(event: TransitionEvent): void {
        if (event.propertyName === component.openTransitionProp && event.target === component.transitionEl) {
          (nonOpenCloseComponent ? component[component.transitionProp] : component.open)
            ? component.onOpen()
            : component.onClose();

          component.transitionEl.removeEventListener("transitionend", onEndOrCancel);
          component.transitionEl.removeEventListener("transitioncancel", onEndOrCancel);
        }
      }
    }
  });
}

/**
 * Helper to keep track of transition listeners on setTransitionEl and connectedCallback on OpenCloseComponent components.
 *
 * For component which do not have open prop, use `onToggleOpenCloseComponent` implementation.
 *
 * @param component
 * @deprecated Call `onToggleOpenClose` in `componentWillLoad` and `open` property watchers instead.
 */
export function connectOpenCloseComponent(component: OpenCloseComponent): void {
  disconnectOpenCloseComponent(component);
  if (component.transitionEl) {
    const boundOnTransitionStart: (event: TransitionEvent) => void = transitionStart.bind(component);
    const boundOnTransitionEnd: (event: TransitionEvent) => void = transitionEnd.bind(component);

    componentToTransitionListeners.set(component, [
      component.transitionEl,
      boundOnTransitionStart,
      boundOnTransitionEnd,
    ]);

    component.transitionEl.addEventListener("transitionstart", boundOnTransitionStart);
    component.transitionEl.addEventListener("transitionend", boundOnTransitionEnd);
  }
}
/**
 * Helper to tear down transition listeners on disconnectedCallback on OpenCloseComponent components.
 *
 * @param component
 * @deprecated Call `onToggleOpenClose` in `componentWillLoad` and `open` property watchers instead.
 */
export function disconnectOpenCloseComponent(component: OpenCloseComponent): void {
  if (!componentToTransitionListeners.has(component)) {
    return;
  }
  const [transitionEl, start, end] = componentToTransitionListeners.get(component);
  transitionEl.removeEventListener("transitionstart", start);
  transitionEl.removeEventListener("transitionend", end);

  componentToTransitionListeners.delete(component);
}
