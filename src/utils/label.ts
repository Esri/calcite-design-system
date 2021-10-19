import { closestElementCrossShadowBoundary, queryElementRoots } from "./dom";

export interface LabelableComponent {
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
const onLabelClickMap = new WeakMap<HTMLCalciteLabelElement, typeof onLabelClick>();

const findLabelForComponent = (componentEl: HTMLElement): HTMLCalciteLabelElement | null => {
  const id = componentEl.id;
  return (
    (id && (queryElementRoots(componentEl, `${labelTagName}[for="${id}"]`) as HTMLCalciteLabelElement)) ||
    closestElementCrossShadowBoundary(componentEl, labelTagName)
  );
};

/**
 * Helper to set up label interactions on connectedCallback.
 */
export function connectLabel(component: LabelableComponent): void {
  const labelEl = findLabelForComponent(component.el);

  if (!labelEl || onLabelClickMap.has(labelEl)) {
    return;
  }

  component.labelEl = labelEl;
  const boundOnLabelClick = onLabelClick.bind(component);
  onLabelClickMap.set(component.labelEl, boundOnLabelClick);
  component.labelEl.addEventListener(labelClickEvent, boundOnLabelClick);
}

/**
 * Helper to tear down label interactions on disconnectedCallback.
 */
export function disconnectLabel(component: LabelableComponent): void {
  if (!component.labelEl) {
    return;
  }

  const boundOnLabelClick = onLabelClickMap.get(component.labelEl);
  component.labelEl.removeEventListener(labelClickEvent, boundOnLabelClick);
  onLabelClickMap.delete(component.labelEl);
}

/**
 * Helper to get the label text from a component.
 */
export function getLabelText(component: LabelableComponent): string {
  return component.label || component.labelEl?.textContent?.trim() || "";
}

function onLabelClick(this: LabelableComponent, event: CustomEvent<{ sourceEvent: MouseEvent }>): void {
  const containedLabelableChildClicked = this.el.contains(event.detail.sourceEvent.target as HTMLElement);

  if (containedLabelableChildClicked) {
    return;
  }

  this.onLabelClick(event);
}
