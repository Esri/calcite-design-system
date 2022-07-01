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
