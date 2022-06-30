/**
 * Defines interface for components with open/close public emitter.
 */
export interface OpenCloseComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  onBeforeOpen: () => void;
  onOpen: () => void;
  onBeforeClose: () => void;
  onClose: () => void;
}
