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

const labelTagName = "calcite-label";
const onLabelClickMap = new WeakMap<HTMLCalciteLabelElement, typeof onLabelClick>();
const labelListenerMap = new WeakMap<LabelableComponent, EventListenerOrEventListenerObject>();

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

  const addClickEventListenerToComponentLabel = () => {
    component.labelEl = labelEl;
    const boundOnLabelClick = onLabelClick.bind(component);
    onLabelClickMap.set(component.labelEl, boundOnLabelClick);
    component.labelEl.addEventListener(labelClickEvent, boundOnLabelClick);
  };

  if (onLabelClickMap.has(labelEl)) {
    return;
  }

  if (labelEl) {
    addClickEventListenerToComponentLabel();

    //when label is added for the existing component, remove label event listener for this component
    const componentLabelAddedEventListener = labelListenerMap.get(component);
    if (componentLabelAddedEventListener) {
      document.removeEventListener("labelAdded", componentLabelAddedEventListener);
      labelListenerMap.delete(component);
    }

    console.log("componentLabelAddedEventListener", componentLabelAddedEventListener);
  }

  if (!labelEl) {
    const componentLabelAddedEventListener = labelListenerMap.get(component);
    if (!componentLabelAddedEventListener) {
      const labelAddedListener = () => {
        connectLabel(component);
      };
      document.addEventListener("labelAdded", labelAddedListener);
      labelListenerMap.set(component, labelAddedListener);
    }
  }
}

/**
 * Helper to tear down label interactions on disconnectedCallback on labelable components.
 */
export function disconnectLabel(component: LabelableComponent): void {
  //remove label event listener for this component when removing component
  const componentLabelAddedEventListener = labelListenerMap.get(component);
  if (componentLabelAddedEventListener) {
    document.removeEventListener("labelAdded", componentLabelAddedEventListener);
    labelListenerMap.delete(component);
  }
  console.log("componentLabelAddedEventListener", componentLabelAddedEventListener);

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
