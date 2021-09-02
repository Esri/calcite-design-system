export interface CalciteLabelableComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  /**
   * The label this component is associated with.
   */
  labelEl: HTMLCalciteLabelElement;

  /**
   * Connects this component to a label element.
   */
  connectLabel: () => void;

  /**
   * Connects this component from a label element.
   */
  disconnectLabel: () => void;

  /**
   * Hook for components to provide custom label click behavior.
   */
  onLabelClick: (...args: any[]) => void;
}
