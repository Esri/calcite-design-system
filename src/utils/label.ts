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

/**
 * Exported for testing purposes only
 * @internal
 */
export const labelClickEvent = "calciteInternalLabelClick";

const labelTagName = "calcite-label";
const onLabelClickMap = new WeakMap<HTMLCalciteLabelElement, typeof onLabelClick>();

const findLabelForComponent = (componentEl: HTMLElement): HTMLCalciteLabelElement | null => {
  const { id } = componentEl;

  const forLabel = id && (queryElementRoots(componentEl, `${labelTagName}[for="${id}"]`) as HTMLCalciteLabelElement);

  if (forLabel) {
    return forLabel;
  }

  const parentLabel = closestElementCrossShadowBoundary<HTMLCalciteLabelElement>(componentEl, labelTagName);

  if (
    !parentLabel ||
    // labelable components within other custom elements are not considered labelable
    hasAncestorCustomElements(parentLabel, componentEl)
  ) {
    return null;
  }

  return parentLabel;
};

function hasAncestorCustomElements(label: HTMLCalciteLabelElement, componentEl: HTMLElement): boolean {
  let traversedElements: HTMLElement[];
  const customElementAncestorCheckEventType = "custom-element-ancestor-check";

  const listener = (event) => {
    event.stopImmediatePropagation();
    const composedPath = event.composedPath() as HTMLElement[];
    traversedElements = composedPath.slice(composedPath.indexOf(componentEl), composedPath.indexOf(label));
  };

  label.addEventListener(customElementAncestorCheckEventType, listener, { once: true });

  componentEl.dispatchEvent(new CustomEvent(customElementAncestorCheckEventType, { composed: true, bubbles: true }));
  label.removeEventListener(customElementAncestorCheckEventType, listener);

  const ancestorCustomElements = traversedElements
    .filter((el) => el !== componentEl && el !== label)
    .filter((el) => el.tagName?.includes("-"));

  return ancestorCustomElements.length > 0;
}

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
