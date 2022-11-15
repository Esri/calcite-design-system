export interface FocusableComponent {
  /**
   * Sets focus on the component.
   */
  setFocus: () => Promise<void>;
}
