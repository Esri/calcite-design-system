// @ts-strict-ignore
import { whenTransitionDone } from "./dom";

/**
 * Defines interface for components with open/close public emitter.
 * All implementations of this interface must handle the following events: `beforeOpen`, `open`, `beforeClose`, `close`.
 */
export interface OpenCloseComponent {
  /** The host element. */
  readonly el: HTMLElement;

  /** When true, the component closes. */
  closed?: boolean;

  /** When true, the component collapses. */
  collapsed?: boolean;

  /** When true, the component is expanded. */
  expanded?: boolean;

  /** When true, the component opens. */
  open?: boolean;

  /** When true, the component is open. */
  opened?: boolean;

  /** The name of the transition to watch for completion. */
  transitionProp?: string;

  /** Specifies element that the transition is allowed to emit on. */
  transitionEl: HTMLElement;

  /** Defines method for `beforeOpen` event handler. */
  onBeforeOpen?: () => void;

  /** Defines method for `open` event handler: */
  onOpen?: () => void;

  /** Defines method for `beforeClose` event handler: */
  onBeforeClose?: () => void;

  /** Defines method for `close` event handler: */
  onClose?: () => void;

  /** Defines method for `beforeExpanded` event handler. */
  onBeforeExpanded?: () => void;

  /** Defines method for `expanded` event handler: */
  onExpanded?: () => void;

  /** Defines method for `beforeCollapsed` event handler: */
  onBeforeCollapsed?: () => void;

  /** Defines method for `collapsed` event handler: */
  onCollapsed?: () => void;
}

function isOpenOrExpanded(component: OpenCloseComponent): boolean {
  switch (true) {
    case "expanded" in component:
      return component.expanded;
    case "opened" in component || "open" in component:
      return component.open;
    case "collapsed" in component:
      return component.collapsed;
    case "closed" in component:
      return component.closed;
    default:
      return false;
  }
}

/**
 * Helper to determine globally set transition duration on the given openTransitionProp, which is imported and set in the `@Watch`("open").
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
 * @Watch ("open")
 * async toggleModal(value: boolean): Promise<void> {
 *    onToggleOpenCloseComponent(this);
 * }
 * @param component - OpenCloseComponent uses `open`/`close` or `expanded`/`collapsed` props to emit (before)open/close or (before)expanded/collapsed respectively.
 */
export function onToggleOpenCloseComponent(component: OpenCloseComponent): void {
  requestAnimationFrame((): void => {
    if (!component.transitionEl) {
      return;
    }

    whenTransitionDone(
      component.transitionEl,
      component.transitionProp,
      () => {
        if (isOpenOrExpanded(component)) {
          switch (true) {
            case component.expanded:
              component.onBeforeExpanded();
              break;
            case component.open:
              component.onBeforeOpen();
              break;
            case component.collapsed || (component.expanded !== undefined && !component.expanded):
              component.onBeforeCollapsed();
              break;
            case component.closed || (component.open !== undefined && !component.open):
              component.onBeforeClose();
              break;
          }
        }
      },
      () => {
        if (isOpenOrExpanded(component)) {
          switch (true) {
            case component.expanded:
              component.onExpanded();
              break;
            case component.open:
              component.onOpen();
              break;
            case component.collapsed || (component.expanded !== undefined && !component.expanded):
              component.onCollapsed();
              break;
            case component.closed || (component.open !== undefined && !component.open):
              component.onClose();
              break;
          }
        }
      },
    );
  });
}
