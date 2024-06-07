import { readTask } from "@stencil/core";
import { whenTransitionDone } from "./dom";

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
   * When true, the component is open.
   */
  opened?: boolean;

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
  transitionEl: HTMLElement;

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

function isOpen(component: OpenCloseComponent): boolean {
  return "opened" in component ? component.opened : component.open;
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
 */
export function onToggleOpenCloseComponent(component: OpenCloseComponent): void {
  readTask(async (): Promise<void> => {
    if (!component.transitionEl) {
      return;
    }

    await whenTransitionDone(component.transitionEl, component.openTransitionProp);

    if (isOpen(component)) {
      component.onBeforeOpen();
      component.onOpen();
      return;
    }

    component.onBeforeClose();
    component.onClose();
  });
}
