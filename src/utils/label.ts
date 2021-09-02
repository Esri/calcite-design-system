export interface CalciteLabelableComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  /**
   * Text label.
   */
  label?: string;

  /**
   * The label this component is associated with.
   */
  labelEl: HTMLCalciteLabelElement;

  /**
   * Hook for components to provide custom label click behavior.
   */
  onLabelClick: (...args: any[]) => void;
}

const labelTagName = "calcite-label";
const labelClickEvent = "calciteInternalLabelClick";

const removeLabelClickListener = (
  effectiveLabel: HTMLCalciteLabelElement,
  callback: (...args: any[]) => void
): void => {
  effectiveLabel?.removeEventListener(labelClickEvent, callback);
};

const addLabelClickListener = (effectiveLabel: HTMLCalciteLabelElement, callback: (...args: any[]) => void): void => {
  effectiveLabel?.addEventListener(labelClickEvent, callback);
};

const findLabelForComponent = (componentEl: HTMLElement): HTMLCalciteLabelElement => {
  // I'm not sold on the aria-labelledby support.
  // It assumes that whatever aria-labelledby is set on a component should be passed to the internals of the component.
  // I think a label property is better suited for that.
  // It also leaves the aria-labelledby on the component

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
 * Helper to tear down label interactions on disconnectedCallback.
 */
export function disconnectLabel(component: CalciteLabelableComponent): void {
  removeLabelClickListener(component.labelEl, component.onLabelClick);
}

/**
 * Helper to get the label text from a component.
 */
export function getlabelElText(component: CalciteLabelableComponent): string {
  return component.label || component.labelEl?.textContent;
}
