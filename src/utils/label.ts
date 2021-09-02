import { closestElementCrossShadowBoundary, queryElementRoots } from "./dom";

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
  onLabelClick: (event: CustomEvent<any>) => void;
}

const labelTagName = "calcite-label";
const labelClickEvent = "calciteInternalLabelClick";

const findLabelForComponent = (componentEl: HTMLElement): HTMLCalciteLabelElement => {
  const id = componentEl.id;
  return (
    (id && (queryElementRoots(componentEl, `${labelTagName}[for="${id}"]`) as HTMLCalciteLabelElement)) ||
    closestElementCrossShadowBoundary(componentEl, labelTagName)
  );
};

/**
 * Helper to set up label interactions on connectedCallback.
 */
export function connectLabel(component: CalciteLabelableComponent): void {
  component.labelEl = findLabelForComponent(component.el);
  component.labelEl?.addEventListener(labelClickEvent, component.onLabelClick);
}

/**
 * Helper to tear down label interactions on disconnectedCallback.
 */
export function disconnectLabel(component: CalciteLabelableComponent): void {
  component.labelEl?.removeEventListener(labelClickEvent, component.onLabelClick);
}

/**
 * Helper to get the label text from a component.
 */
export function getlabelElText(component: CalciteLabelableComponent): string {
  return component.label || component.labelEl?.textContent;
}
