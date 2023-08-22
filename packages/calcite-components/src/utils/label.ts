import { closestElementCrossShadowBoundary, isBefore, queryElementRoots } from "./dom";

export interface LabelableComponent {
  /**
   * When true, disabled prevents interaction.
   */
  disabled: boolean;

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
 *
 * @internal
 */
export const labelClickEvent = "calciteInternalLabelClick";
export const labelConnectedEvent = "calciteInternalLabelConnected";
export const labelDisconnectedEvent = "calciteInternalLabelDisconnected";

const labelTagName = "calcite-label";
const labelToLabelables = new WeakMap<HTMLCalciteLabelElement, LabelableComponent[]>();
const onLabelClickMap = new WeakMap<HTMLCalciteLabelElement, typeof onLabelClick>();
const onLabelConnectedMap = new WeakMap<LabelableComponent, typeof onLabelConnected>();
const onLabelDisconnectedMap = new WeakMap<LabelableComponent, typeof onLabelDisconnected>();
const unlabeledComponents = new WeakSet<LabelableComponent>();

const findLabelForComponent = (componentEl: HTMLElement): HTMLCalciteLabelElement | null => {
  const { id } = componentEl;

  const forLabel =
    id && (queryElementRoots(componentEl, { selector: `${labelTagName}[for="${id}"]` }) as HTMLCalciteLabelElement);

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
 *
 * @param component
 */
export function connectLabel(component: LabelableComponent): void {
  const labelEl = findLabelForComponent(component.el);

  if (
    (onLabelClickMap.has(labelEl) && labelEl === component.labelEl) ||
    (!labelEl && unlabeledComponents.has(component))
  ) {
    return;
  }

  const boundOnLabelDisconnected = onLabelDisconnected.bind(component);

  if (labelEl) {
    component.labelEl = labelEl;

    const labelables = labelToLabelables.get(labelEl) || [];
    labelables.push(component);
    labelToLabelables.set(labelEl, labelables.sort(sortByDOMOrder));

    if (!onLabelClickMap.has(component.labelEl)) {
      onLabelClickMap.set(component.labelEl, onLabelClick);
      component.labelEl.addEventListener(labelClickEvent, onLabelClick);
    }

    unlabeledComponents.delete(component);
    document.removeEventListener(labelConnectedEvent, onLabelConnectedMap.get(component));
    onLabelDisconnectedMap.set(component, boundOnLabelDisconnected);
    document.addEventListener(labelDisconnectedEvent, boundOnLabelDisconnected);
  } else if (!unlabeledComponents.has(component)) {
    boundOnLabelDisconnected();
    document.removeEventListener(labelDisconnectedEvent, onLabelDisconnectedMap.get(component));
  }
}
/**
 * Helper to tear down label interactions on disconnectedCallback on labelable components.
 *
 * @param component
 */
export function disconnectLabel(component: LabelableComponent): void {
  unlabeledComponents.delete(component);
  document.removeEventListener(labelConnectedEvent, onLabelConnectedMap.get(component));
  document.removeEventListener(labelDisconnectedEvent, onLabelDisconnectedMap.get(component));
  onLabelConnectedMap.delete(component);
  onLabelDisconnectedMap.delete(component);

  if (!component.labelEl) {
    return;
  }

  const labelables = labelToLabelables.get(component.labelEl);

  if (labelables.length === 1) {
    component.labelEl.removeEventListener(labelClickEvent, onLabelClickMap.get(component.labelEl));
    onLabelClickMap.delete(component.labelEl);
  }

  labelToLabelables.set(
    component.labelEl,
    labelables.filter((labelable) => labelable !== component).sort(sortByDOMOrder)
  );

  component.labelEl = null;
}

function sortByDOMOrder(a: LabelableComponent, b: LabelableComponent): number {
  return isBefore(a.el, b.el) ? -1 : 1;
}

/**
 * Helper to get the label text from a component.
 *
 * @param component
 */
export function getLabelText(component: LabelableComponent): string {
  return component.label || component.labelEl?.textContent?.trim() || "";
}

function onLabelClick(this: HTMLCalciteLabelElement, event: CustomEvent<{ sourceEvent: MouseEvent }>): void {
  const labelClickTarget = event.detail.sourceEvent.target as HTMLElement;
  const labelables = labelToLabelables.get(this);
  const clickedLabelable = labelables.find((labelable) => labelable.el === labelClickTarget);
  const labelableChildClicked = labelables.includes(clickedLabelable);

  if (labelableChildClicked) {
    // no need to forward click as labelable will receive focus
    return;
  }

  const firstLabelable = labelables[0];

  if (firstLabelable.disabled) {
    return;
  }

  firstLabelable.onLabelClick(event);
}

function onLabelConnected(this: LabelableComponent): void {
  if (unlabeledComponents.has(this)) {
    connectLabel(this);
  }
}

function onLabelDisconnected(this: LabelableComponent): void {
  unlabeledComponents.add(this);
  const boundOnLabelConnected = onLabelConnectedMap.get(this) || onLabelConnected.bind(this);
  onLabelConnectedMap.set(this, boundOnLabelConnected);
  document.addEventListener(labelConnectedEvent, boundOnLabelConnected);
}
