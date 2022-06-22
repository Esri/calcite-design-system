export interface OpenCloseState {
  beforeOpen: () => void;
  open: () => void;
  beforeClose: () => void;
  close: () => void;
}

/**
 * Defines interface for components with open/close public emitter.
 */
export interface OpenCloseComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;
}
