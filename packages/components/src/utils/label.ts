import type { Label } from "../components/label/label";
import { closestElementCrossShadowBoundary, isBefore, queryElementRoots } from "./dom";

export interface LabelableComponent {
  /** When true, disabled prevents interaction. */
  disabled: boolean;

  /** The host element. */
  readonly el: HTMLElement;

  /** Text label. */
  label?: string;

  /** The label this component is associated with. */
  labelEl?: Label["el"];

  /** Hook for components to provide custom label click behavior. */
  onLabelClick: (event: CustomEvent<any>) => void;
}

/**
 * Exported for testing purposes only
 *
 * @private
 */
export const labelClickEvent = "calciteInternalLabelClick";
export const labelConnectedEvent = "calciteInternalLabelConnected";
export const labelDisconnectedEvent = "calciteInternalLabelDisconnected";

const labelTagName = "calcite-label";
const labelToLabelables = new WeakMap<Label["el"], LabelableComponent[]>();
const onLabelClickMap = new WeakMap<Label["el"], typeof onLabelClick>();
const onLabelConnectedMap = new WeakMap<LabelableComponent, typeof onLabelConnected>();
const onLabelDisconnectedMap = new WeakMap<LabelableComponent, typeof onLabelDisconnected>();
const unlabeledComponents = new Set<LabelableComponent>();

const findLabelForComponent = (componentEl: HTMLElement): Label["el"] | null => {
  const { id } = componentEl;

  const forLabel = id && queryElementRoots<Label["el"]>(componentEl, { selector: `${labelTagName}[for="${id}"]` });

  if (forLabel) {
    return forLabel;
  }

  const parentLabel = closestElementCrossShadowBoundary<Label["el"]>(componentEl, labelTagName);

  if (
    !parentLabel ||
    // labelable components within other custom elements are not considered labelable
    hasAncestorCustomElements(parentLabel, componentEl)
  ) {
    return null;
  }

  return parentLabel;
};

function hasAncestorCustomElements(label: Label["el"], componentEl: HTMLElement): boolean {
  let traversedElements: HTMLElement[] = [];
  const customElementAncestorCheckEventType = "custom-element-ancestor-check";

  const listener = (event: Event): void => {
    event.stopImmediatePropagation();
    const composedPath = (event as CustomEvent).composedPath() as HTMLElement[];
    const startIdx = composedPath.indexOf(componentEl);
    const endIdx = composedPath.indexOf(label);
    traversedElements =
      startIdx !== -1 && endIdx !== -1 && startIdx < endIdx ? composedPath.slice(startIdx, endIdx) : [];
  };

  label.addEventListener(customElementAncestorCheckEventType, listener as EventListenerOrEventListenerObject, {
    once: true,
  });
  componentEl.dispatchEvent(new CustomEvent(customElementAncestorCheckEventType, { composed: true, bubbles: true }));
  label.removeEventListener(customElementAncestorCheckEventType, listener as EventListenerOrEventListenerObject);

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
  if (!component) {
    return;
  }

  const labelEl = findLabelForComponent(component.el);

  if (
    (labelEl && onLabelClickMap.has(labelEl) && labelEl === component.labelEl) ||
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
      onLabelClickMap.set(component.labelEl, onLabelClick as EventListener);
      component.labelEl.addEventListener(labelClickEvent, onLabelClick as EventListener);
    }

    unlabeledComponents.delete(component);
    const connectedListener = onLabelConnectedMap.get(component);
    if (connectedListener) {
      document.removeEventListener(labelConnectedEvent, connectedListener as EventListener);
    }
    onLabelDisconnectedMap.set(component, boundOnLabelDisconnected);
    document.addEventListener(labelDisconnectedEvent, boundOnLabelDisconnected);
  } else if (!unlabeledComponents.has(component)) {
    boundOnLabelDisconnected();
    const disconnectedListener = onLabelDisconnectedMap.get(component);
    if (disconnectedListener) {
      document.removeEventListener(labelDisconnectedEvent, disconnectedListener as EventListener);
    }
  }
}
/**
 * Helper to tear down label interactions on disconnectedCallback on labelable components.
 *
 * @param component
 */
export function disconnectLabel(component: LabelableComponent): void {
  if (!component) {
    return;
  }

  unlabeledComponents.delete(component);
  const connectedListener = onLabelConnectedMap.get(component);
  if (connectedListener) {
    document.removeEventListener(labelConnectedEvent, connectedListener as EventListener);
  }
  const disconnectedListener = onLabelDisconnectedMap.get(component);
  if (disconnectedListener) {
    document.removeEventListener(labelDisconnectedEvent, disconnectedListener as EventListener);
  }
  onLabelConnectedMap.delete(component);
  onLabelDisconnectedMap.delete(component);

  if (!component.labelEl) {
    return;
  }

  const labelables = labelToLabelables.get(component.labelEl);

  if (labelables && labelables.length === 1) {
    const clickListener = onLabelClickMap.get(component.labelEl);
    if (clickListener) {
      component.labelEl.removeEventListener(labelClickEvent, clickListener as EventListener);
      onLabelClickMap.delete(component.labelEl);
    }
  }

  labelToLabelables.set(
    component.labelEl,
    (labelables || []).filter((labelable) => labelable !== component).sort(sortByDOMOrder),
  );

  component.labelEl = undefined;
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

function onLabelClick(this: Label["el"], event: Event): void {
  const customEvent = event as CustomEvent<{ sourceEvent: MouseEvent }>;
  const labelClickTarget = customEvent.detail.sourceEvent.target as HTMLElement;
  const labelables = labelToLabelables.get(this);
  const clickedLabelable = labelables?.find((labelable) => labelable.el === labelClickTarget);
  const labelableChildClicked = clickedLabelable ? labelables?.includes(clickedLabelable) : false;

  if (labelableChildClicked) {
    // no need to forward click as labelable will receive focus
    return;
  }

  const firstLabelable = labelables && labelables[0];

  if (!firstLabelable || firstLabelable.disabled) {
    return;
  }

  firstLabelable.onLabelClick(customEvent);
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

/**
 * Helper to associate an explicit label (i.e., using `for`) with a labelable component that does not have an associated label.
 *
 * @param label - the label element
 */
export async function associateExplicitLabelToUnlabeledComponent(label: Label["el"]): Promise<void> {
  await label.componentOnReady();

  const alreadyLabeled = labelToLabelables.has(label);

  if (alreadyLabeled) {
    return;
  }

  const forId = label.for;
  if (!forId) {
    return;
  }
  const forComponentEl = label.ownerDocument?.getElementById(forId);

  if (!forComponentEl) {
    return;
  }

  requestAnimationFrame(() => {
    for (const labelable of unlabeledComponents) {
      if (labelable.el === forComponentEl) {
        connectLabel(labelable);
        break;
      }
    }
  });
}
