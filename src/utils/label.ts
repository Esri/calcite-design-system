import { closestElementCrossShadowBoundary, queryElementRoots } from "./dom";

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
 * @internal
 */
export const labelClickEvent = "calciteInternalLabelClick";
export const labelConnectedEvent = "calciteInternalLabelConnected";
export const labelDisconnectedEvent = "calciteInternaLabelDisconnected";

const labelTagName = "calcite-label";
const onLabelClickMap = new WeakMap<HTMLCalciteLabelElement, typeof onLabelClick>();
const unlabeledComponents = new Set<LabelableComponent>();

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
 */
export function connectLabel(component: LabelableComponent): void {
  const labelEl = findLabelForComponent(component.el);

  if (onLabelClickMap.has(labelEl)) {
    return;
  }

  const boundOnLabelConnected = onLabelConnected.bind(component);
  const boundOnLabelDisconnected = onLabelDisconnected.bind(component);

  if (labelEl) {
    const addClickEventListenerToComponentLabel = () => {
      component.labelEl = labelEl;
      const boundOnLabelClick = onLabelClick.bind(component);
      onLabelClickMap.set(component.labelEl, boundOnLabelClick);
      component.labelEl.addEventListener(labelClickEvent, boundOnLabelClick);
    };
    addClickEventListenerToComponentLabel();
    unlabeledComponents.delete(component);
    document.removeEventListener(labelConnectedEvent, boundOnLabelConnected);
    document.addEventListener(labelDisconnectedEvent, boundOnLabelDisconnected);
  } else if (!labelEl && !unlabeledComponents.has(component)) {
    boundOnLabelDisconnected();
    document.removeEventListener(labelDisconnectedEvent, boundOnLabelDisconnected);
  }
}
/**
 * Helper to tear down label interactions on disconnectedCallback on labelable components.
 */
export function disconnectLabel(component: LabelableComponent): void {
  const boundOnLabelConnected = onLabelConnected.bind(component);
  const boundOnLabelDisconnected = onLabelDisconnected.bind(component);
  unlabeledComponents.delete(component);
  document.removeEventListener(labelConnectedEvent, boundOnLabelConnected);
  document.removeEventListener(labelDisconnectedEvent, boundOnLabelDisconnected);

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
  if (this.disabled) {
    return;
  }

  const containedLabelableChildClicked = this.el.contains(event.detail.sourceEvent.target as HTMLElement);

  if (containedLabelableChildClicked) {
    return;
  }

  this.onLabelClick(event);
}

function onLabelConnected(this: LabelableComponent): void {
  if (unlabeledComponents.has(this)) {
    connectLabel(this);
  }
}

function onLabelDisconnected(this: LabelableComponent): void {
  unlabeledComponents.add(this);
  const boundOnLabelConnected = onLabelConnected.bind(this);
  document.addEventListener(labelConnectedEvent, boundOnLabelConnected);
}
