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
   * Hook for components to provide custom label click behavior.
   */
  onLabelClick: (...args: any[]) => void;
}

export const EVENTS = {
  labelClick: "calciteInternalLabelClick"
};

export const removeLabelClickListener = (
  effectiveLabel: HTMLCalciteLabelElement,
  callback: (...args: any[]) => void
): void => {
  effectiveLabel?.removeEventListener(EVENTS.labelClick, callback);
};

export const addLabelClickListener = (
  effectiveLabel: HTMLCalciteLabelElement,
  callback: (...args: any[]) => void
): void => {
  effectiveLabel?.addEventListener(EVENTS.labelClick, callback);
};

export const findLabelForComponent = (componentEl: HTMLElement): HTMLCalciteLabelElement => {
  const labelTagName = "calcite-label";
  // I'm not sold on the aria-labelledby support.
  // It assumes that whatever aria-labelledby is set on a component should be passed to the internals of the component.
  // I think a label property is better suited for that.

  const id = componentEl.id;
  const labelSelectors: string[] = [labelTagName];

  if (id) {
    labelSelectors.unshift(`${labelTagName}[for="${id}"]`);
  }

  return componentEl.closest(labelSelectors.join(","));
};

/**
 * Helper to set up label interactions on connectedCallback.

 */
export function connectLabel(component: CalciteLabelableComponent): void {
  removeLabelClickListener(component.labelEl, component.onLabelClick);
  component.labelEl = findLabelForComponent(component.el);
  addLabelClickListener(component.labelEl, component.onLabelClick);
}

/**
 * Helper to tear down label interactions on connectedCallback.

 */
export function disconnectLabel(component: CalciteLabelableComponent): void {
  removeLabelClickListener(component.labelEl, component.onLabelClick);
}
