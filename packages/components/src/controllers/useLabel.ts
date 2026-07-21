import { makeGenericController } from "@arcgis/lumina/controllers";
import type { Label } from "../components/label/label";
import { closestElementCrossShadowBoundary, isBefore, queryElementRoots } from "../utils/dom";
import type { LitElement } from "@arcgis/lumina";

export interface LabelableComponent extends LitElement {
  /** When true, disabled prevents interaction. */
  disabled: boolean;

  /** Text label. */
  label?: string;

  /** The label this component is associated with. */
  labelEl?: Label["el"];

  /** Hook for components to provide custom label click behavior. */
  onLabelClick: (event: CustomEvent<any>) => void;
}

/**
 * A controller for managing label interaction
 */
export const useLabel = makeGenericController<void, LabelableComponent>((component, controller) => {
  controller.onConnected(() => {
    connectLabel(component);
  });

  controller.onDisconnected(() => {
    disconnectLabel(component);
  });
});

/**
 * Exported for testing purposes only
 *
 * @private
 */
export const labelClickEvent = "calciteInternalLabelClick";
export const labelConnectedEvent = "calciteInternalLabelConnected";
export const labelDisconnectedEvent = "calciteInternalLabelDisconnected";

export function getPrimaryLabelableForLabel(label: Label["el"]): LabelableComponent | null {
  return labelToLabelables.get(label)?.[0] ?? null;
}

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
  let traversedElements: HTMLElement[];
  const customElementAncestorCheckEventType = "custom-element-ancestor-check";

  const listener = ((event: CustomEvent<void>) => {
    event.stopImmediatePropagation();
    const composedPath = event.composedPath() as HTMLElement[];
    traversedElements = composedPath.slice(composedPath.indexOf(componentEl), composedPath.indexOf(label));
  }) as EventListener;

  label.addEventListener(customElementAncestorCheckEventType, listener, { once: true });

  componentEl.dispatchEvent(new CustomEvent(customElementAncestorCheckEventType, { composed: true, bubbles: true }));
  label.removeEventListener(customElementAncestorCheckEventType, listener);

  const ancestorCustomElements = traversedElements!
    .filter((el) => el !== componentEl && el !== label)
    .filter((el) => el.tagName?.includes("-"));

  return ancestorCustomElements.length > 0;
}

/**
 * Helper to set up label interactions on connectedCallback.
 *
 * @param component
 */
function connectLabel(component: LabelableComponent): void {
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
    component.disabled = labelEl.disabled;

    const labelables = labelToLabelables.get(labelEl) || [];
    labelables.push(component);
    labelToLabelables.set(labelEl, labelables.sort(sortByDOMOrder));

    if (!onLabelClickMap.has(component.labelEl)) {
      onLabelClickMap.set(component.labelEl, onLabelClick);
      component.labelEl.addEventListener(labelClickEvent, onLabelClick as EventListener);
    }

    unlabeledComponents.delete(component);
    document.removeEventListener(labelConnectedEvent, onLabelConnectedMap.get(component) as EventListener);
    onLabelDisconnectedMap.set(component, boundOnLabelDisconnected);
    document.addEventListener(labelDisconnectedEvent, boundOnLabelDisconnected);
  } else if (!unlabeledComponents.has(component)) {
    boundOnLabelDisconnected();
    document.removeEventListener(labelDisconnectedEvent, onLabelDisconnectedMap.get(component) as EventListener);
  }
}
/**
 * Helper to tear down label interactions on disconnectedCallback on labelable components.
 *
 * @param component
 */
function disconnectLabel(component: LabelableComponent): void {
  if (!component) {
    return;
  }

  unlabeledComponents.delete(component);
  document.removeEventListener(labelConnectedEvent, onLabelConnectedMap.get(component)! as EventListener);
  document.removeEventListener(labelDisconnectedEvent, onLabelDisconnectedMap.get(component)! as EventListener);
  onLabelConnectedMap.delete(component);
  onLabelDisconnectedMap.delete(component);

  if (!component.labelEl) {
    return;
  }

  const labelables = labelToLabelables.get(component.labelEl)!;

  if (labelables.length === 1) {
    component.labelEl.removeEventListener(labelClickEvent, onLabelClickMap.get(component.labelEl)! as EventListener);
    onLabelClickMap.delete(component.labelEl);
  }

  labelToLabelables.set(
    component.labelEl,
    labelables.filter((labelable) => labelable !== component).sort(sortByDOMOrder),
  );

  component.labelEl = undefined;
}

function sortByDOMOrder(a: LabelableComponent, b: LabelableComponent): number {
  return isBefore(a.el, b.el) ? -1 : 1;
}

function onLabelClick(this: Label["el"], event: CustomEvent<{ sourceEvent: MouseEvent }>): void {
  const labelClickTarget = event.detail.sourceEvent.target as HTMLElement;
  const labelables = labelToLabelables.get(this)!;
  const clickedLabelable = labelables.find((labelable) => labelable.el === labelClickTarget);
  const labelableChildClicked = clickedLabelable && labelables.includes(clickedLabelable);

  if (labelableChildClicked) {
    // no need to forward click as labelable will receive focus
    return;
  }

  const firstLabelable = labelables[0];

  if (this.disabled || firstLabelable.disabled) {
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

/**
 * Helper to associate an explicit label (i.e., using `for`) with a labelable component that does not have an associated label.
 */
export async function associateExplicitLabelToUnlabeledComponent(label: Label["el"]): Promise<void> {
  await label.componentOnReady();

  const alreadyLabeled = labelToLabelables.has(label);

  if (alreadyLabeled) {
    return;
  }

  const forComponentEl = label.for && label.ownerDocument?.getElementById(label.for);

  if (!forComponentEl) {
    return;
  }

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      for (const labelable of unlabeledComponents) {
        if (labelable.el === forComponentEl) {
          connectLabel(labelable);
          break;
        }
      }

      resolve();
    });
  });
}
