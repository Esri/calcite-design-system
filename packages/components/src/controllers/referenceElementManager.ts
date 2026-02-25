import { nil } from "@arcgis/toolkit/type";
import { ReferenceElement } from "../utils/floating-ui";
import { getShadowRootNode, isKeyboardTriggeredClick, isPrimaryPointerButton } from "../utils/dom";
import { isActivationKey } from "../utils/key";
import { toAriaBoolean } from "../utils/aria";
import { ReferenceElementComponent, ReferenceElementType } from "./useReferenceElement";

// todo: arrow keys for component. Maybe a function for when to open?
// todo: fix shift tabindex on hover

function haveSameComponents(a1: ReferenceElementComponent[], a2: ReferenceElementComponent[]): boolean {
  if (a1 === a2) {
    return true;
  }

  if (a1.length !== a2.length) {
    return false;
  }

  const s1 = new Set(a1);
  const s2 = new Set(a2);

  if (s1.size !== s2.size) {
    return false;
  }

  for (const item of s1) {
    if (!s2.has(item)) {
      return false;
    }
  }

  return true;
}

export type ReferenceElementManagerOptions = {
  /** Enables click and keyboard-activation interactions for registered reference elements. */
  click?: boolean;
  /** Enables context menu interactions for registered reference elements. */
  context?: boolean;
  /** Enables hover and focus interactions for registered reference elements. */
  hover?: boolean;
};

export interface ReferenceElementComponentManager {
  /** Registers a component and wires global listeners when needed. */
  registerElement: (component: ReferenceElementComponent, referenceEl: ReferenceElement | nil) => void;
  /** Removes a component and removes global listeners when no elements remain. */
  unregisterElement: (component: ReferenceElementComponent, referenceEl: ReferenceElement | nil) => void;
  /** Synchronizes ARIA state from a component to its reference element. */
  updateElement: (component: ReferenceElementComponent, referenceEl: ReferenceElement | nil) => void;
}

const clickTolerance = 5;
const pressTimerDuration = 800;

/** Standard delay before hover-triggered components open. */
export const HOVER_OPEN_DELAY_MS = 300;
/** Reduced open delay used when another hover component is already open. */
export const HOVER_QUICK_OPEN_DELAY_MS = HOVER_OPEN_DELAY_MS / 3;
/** Delay before hover-triggered components close after pointer exit. */
export const HOVER_CLOSE_DELAY_MS = HOVER_OPEN_DELAY_MS * 1.5;

/**
 * Determines whether pointer movement between down/up events exceeded click tolerance.
 *
 * @param startX Pointer-down client X coordinate.
 * @param startY Pointer-down client Y coordinate.
 * @param endX Pointer-up client X coordinate.
 * @param endY Pointer-up client Y coordinate.
 * @returns `true` when movement distance is greater than the click tolerance.
 */
export function isDrag({
  startX,
  startY,
  endX,
  endY,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}): boolean {
  const distance = Math.hypot(endX - startX, endY - startY);
  return distance > clickTolerance;
}

/**
 * Creates a controller for managing components that share a reference element trigger.
 *
 * The manager handles registration, interaction listeners, hover timing, and ARIA synchronization.
 *
 * Note: reference elements are managed automatically when the component is disconnected.
 *
 * @param options Interaction modes to enable for the manager instance.
 * @returns A manager with methods to register, unregister, and update components.
 */
export const referenceElementManager = (options: ReferenceElementManagerOptions): ReferenceElementComponentManager => {
  const registeredElements = new Map<ReferenceElement, ReferenceElementComponent[]>();
  const registeredShadowRootCounts = new WeakMap<ShadowRoot, number>();
  let activeComponents: ReferenceElementComponent[] | nil = null;
  let clickedComponents: ReferenceElementComponent[] | nil = null;
  let hoverCloseTimeout: number | nil = null;
  let hoverOpenTimeout: number | nil = null;
  let hoveredComponents: ReferenceElementComponent[] | nil = null;
  let pointerDownPosition: { x: number; y: number } | nil = null;
  let registeredComponentCount = 0;
  let pressTimer: number | nil = null;

  const queryComponents = (
    composedPath: EventTarget[],
    type: ReferenceElementType,
  ): ReferenceElementComponent[] | undefined => {
    const registeredElement = (composedPath as HTMLElement[]).find((pathEl) => registeredElements.has(pathEl));

    if (!registeredElement) {
      return undefined;
    }

    const components = registeredElements.get(registeredElement);

    return components?.filter((component) => component.referenceElementType === type);
  };

  const toggleComponents = (event: KeyboardEvent | PointerEvent, type: ReferenceElementType): void => {
    const composedPath = event.composedPath();
    const components = queryComponents(composedPath, type);

    components?.forEach((component) => {
      if (component && !component.triggerDisabled) {
        component.open = !component.open;
      }
    });

    Array.from(registeredElements.values())
      .flat()
      .filter(
        (component) =>
          !components?.includes(component) &&
          component.autoClose &&
          component.open &&
          !composedPath.includes(component.el),
      )
      .forEach((component) => (component.open = false));
  };

  const clickHandler = (event: PointerEvent): void => {
    if (
      isKeyboardTriggeredClick(event) ||
      event.defaultPrevented ||
      (pointerDownPosition &&
        isDrag({
          endY: event.clientY,
          endX: event.clientX,
          startY: pointerDownPosition.y,
          startX: pointerDownPosition.x,
        }))
    ) {
      return;
    }

    pointerDownPosition = null;

    toggleComponents(event, "click");
  };

  const clearHoverOpenTimeout = (): void => {
    window.clearTimeout(hoverOpenTimeout);
    hoverOpenTimeout = null;
  };

  const clearHoverCloseTimeout = (): void => {
    window.clearTimeout(hoverCloseTimeout);
    hoverCloseTimeout = null;
  };

  const clearHoverTimeout = (): void => {
    clearHoverOpenTimeout();
    clearHoverCloseTimeout();
  };

  const pathHasOpenHoverComponent = (
    components: ReferenceElementComponent[] | nil,
    composedPath: EventTarget[],
  ): boolean => {
    return (
      activeComponents?.some((component) => component?.open && composedPath.includes(component.el)) ||
      components?.some((component) => component?.open && composedPath.includes(component.el))
    );
  };

  const toggleHoverComponents = (components: ReferenceElementComponent[] | nil, open: boolean): void => {
    components?.forEach((component) => (component.open = open));

    activeComponents = open ? components : null;
  };

  const closeActiveHoverComponents = (): void => {
    toggleHoverComponents(activeComponents, false);
  };

  const hoverKeyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && !event.defaultPrevented) {
      const openActiveHoverComponents = activeComponents?.filter((component) => component?.open);

      if (openActiveHoverComponents?.length) {
        clearHoverTimeout();
        closeActiveHoverComponents();

        const composedPath = event.composedPath();

        if (
          openActiveHoverComponents.some(
            (component) =>
              (component.referenceEl instanceof Element && composedPath.includes(component.referenceEl)) ||
              composedPath.includes(component.el),
          )
        ) {
          event.preventDefault();
        }
      }
    }
  };

  const hoverClickHandler = (event: PointerEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    clickedComponents = null;
    const composedPath = event.composedPath();
    const components = queryComponents(composedPath, "hover");

    if (pathHasOpenHoverComponent(components, composedPath)) {
      clearHoverTimeout();
      return;
    }

    closeActiveHoverComponents();

    if (!components?.length) {
      return;
    }

    clearHoverTimeout();

    const closeOnClickHoverComponents = components.filter((component) => component.closeOnClick);
    const nonCloseOnClickHoverComponents = components.filter((component) => !component.closeOnClick);

    if (closeOnClickHoverComponents?.length) {
      clickedComponents = closeOnClickHoverComponents;
      toggleHoverComponents(closeOnClickHoverComponents, false);
    }

    toggleHoverComponents(nonCloseOnClickHoverComponents, true);
  };

  const pointerDownHandler = (event: PointerEvent): void => {
    if (event.defaultPrevented || !isPrimaryPointerButton(event)) {
      return;
    }

    const { clientX, clientY } = event;
    pointerDownPosition = { x: clientX, y: clientY };
  };

  const keyDownHandler = (event: KeyboardEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "Escape") {
      closeAllComponents();
    } else if (isActivationKey(event.key)) {
      toggleComponents(event, "click");
    }
  };

  const closeAllComponents = (): void => {
    Array.from(registeredElements.values())
      .flat()
      .forEach((component) => (component.open = false));
  };

  const closeComponentsIfNotActive = (components: ReferenceElementComponent[] | nil): void => {
    if (!haveSameComponents(components ?? [], activeComponents ?? [])) {
      closeActiveHoverComponents();
    }
  };

  const openHoveredComponents = (components: ReferenceElementComponent[]): void => {
    hoverOpenTimeout = window.setTimeout(
      () => {
        if (hoverOpenTimeout === null || !haveSameComponents(components ?? [], hoveredComponents ?? [])) {
          return;
        }

        clearHoverCloseTimeout();
        closeComponentsIfNotActive(components);
        toggleHoverComponents(components, true);
      },
      activeComponents?.some((component) => component.open) ? HOVER_QUICK_OPEN_DELAY_MS : HOVER_OPEN_DELAY_MS,
    );
  };

  const closeHoveredComponents = (): void => {
    hoverCloseTimeout = window.setTimeout(() => {
      if (hoverCloseTimeout === null) {
        return;
      }

      closeActiveHoverComponents();
    }, HOVER_CLOSE_DELAY_MS);
  };

  const pointerMoveHandler = (event: PointerEvent): void => {
    if (event.defaultPrevented) {
      closeActiveHoverComponents();
      return;
    }

    const composedPath = event.composedPath();

    const components = queryComponents(composedPath, "hover");

    if (pathHasOpenHoverComponent(components, composedPath)) {
      clearHoverTimeout();
      return;
    }

    if (components?.some((component) => clickedComponents?.includes(component))) {
      return;
    }

    if (!components?.some((component) => hoveredComponents?.includes(component))) {
      clearHoverOpenTimeout();
    }

    hoveredComponents = components;

    if (components?.length) {
      openHoveredComponents(components);
    } else if (activeComponents?.some((component) => component?.open)) {
      closeHoveredComponents();
    }

    clickedComponents = null;
  };

  const blurHandler = (): void => {
    closeActiveHoverComponents();
  };

  const setContextVirtualElement = (components: ReferenceElementComponent[], x: number, y: number): void => {
    components?.forEach((component) => {
      if (!component.disabled) {
        component.virtualReferenceEl = {
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x,
              y,
              top: y,
              left: x,
              right: x,
              bottom: y,
            };
          },
        };
        component.open = true;
      }
    });
  };

  const pressed = (path: EventTarget[], x: number, y: number): void => {
    setContextVirtualElement(queryComponents(path, "context"), x, y);
  };

  const contextMenuHandler = (event: MouseEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    const composedPath = event.composedPath();
    const components = queryComponents(composedPath, "context");

    if (components?.length) {
      event.preventDefault();
      setContextVirtualElement(components, event.clientX, event.clientY);
    }
  };

  const pointerLeaveHandler = (event: PointerEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    clearHoverTimeout();
    closeHoveredComponents();
  };

  const startPress = (event: TouchEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    if (pressTimer) {
      clearTimeout(pressTimer);
    }

    const composedPath = event.composedPath();
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;

    pressTimer = window.setTimeout(() => pressed(composedPath, x, y), pressTimerDuration);
  };

  const startMove = (): void => {
    clearTimeout(pressTimer);
    pressTimer = null;
  };

  const endPress = (event: TouchEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    clearTimeout(pressTimer);
    pressTimer = null;
  };

  const addListeners = (): void => {
    if (options.click) {
      window.addEventListener("click", clickHandler);
      window.addEventListener("keydown", keyDownHandler);
      window.addEventListener("pointerdown", pointerDownHandler);
    }
    if (options.hover) {
      window.addEventListener("click", hoverClickHandler);
      window.addEventListener("keydown", hoverKeyDownHandler);
      window.addEventListener("pointermove", pointerMoveHandler);
      window.addEventListener("focusin", focusInHandler);
      window.addEventListener("blur", blurHandler);
      document.addEventListener("pointerleave", pointerLeaveHandler);
    }
    if (options.context) {
      window.addEventListener("contextmenu", contextMenuHandler);
      window.addEventListener("touchstart", startPress);
      window.addEventListener("touchend", endPress);
      window.addEventListener("touchcancel", endPress);
      window.addEventListener("touchmove", startMove);
    }
  };

  const removeListeners = (): void => {
    if (options.click) {
      window.removeEventListener("pointerdown", pointerDownHandler);
      window.removeEventListener("click", clickHandler);
      window.removeEventListener("keydown", keyDownHandler);
    }
    if (options.hover) {
      window.removeEventListener("click", hoverClickHandler);
      window.removeEventListener("keydown", hoverKeyDownHandler);
      window.removeEventListener("pointermove", pointerMoveHandler);
      window.removeEventListener("focusin", focusInHandler);
      window.removeEventListener("blur", blurHandler);
      document.removeEventListener("pointerleave", pointerLeaveHandler);
    }
    if (options.context) {
      window.removeEventListener("contextmenu", contextMenuHandler);
      window.removeEventListener("touchstart", startPress);
      window.removeEventListener("touchend", endPress);
      window.removeEventListener("touchcancel", endPress);
      window.removeEventListener("touchmove", startMove);
    }
  };

  const toggleFocusedComponents = (components: ReferenceElementComponent[], open: boolean): void => {
    if (open) {
      clearHoverTimeout();
    }

    toggleHoverComponents(components, open);
  };

  const getReferenceElShadowRootNode = (referenceEl: ReferenceElement): ShadowRoot | null => {
    return referenceEl instanceof Element ? getShadowRootNode(referenceEl) : null;
  };

  const focusInHandler = (event: FocusEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    const composedPath = event.composedPath();
    const components = queryComponents(composedPath, "hover");

    if (pathHasOpenHoverComponent(components, composedPath)) {
      clearHoverTimeout();
      return;
    }

    if (components?.some((component) => clickedComponents?.includes(component))) {
      return;
    }

    clickedComponents = null;

    closeComponentsIfNotActive(components);

    if (!components?.length) {
      return;
    }

    toggleFocusedComponents(components, true);
  };

  const updateElement = (component: ReferenceElementComponent): void => {
    const { referenceEl, open } = component;

    if (!referenceEl || !component.referenceElementType) {
      return;
    }

    if (options.click && "ariaExpanded" in referenceEl) {
      const existingComponents = registeredElements.get(referenceEl) ?? [];
      const existingComponentOpen = existingComponents?.some((component) => component.open) ?? false;
      referenceEl.ariaExpanded = toAriaBoolean(open || existingComponentOpen);
    }
  };

  const addShadowListeners = (shadowRoot: ShadowRoot): void => {
    shadowRoot.addEventListener("focusin", focusInHandler);
  };

  const removeShadowListeners = (shadowRoot: ShadowRoot): void => {
    shadowRoot.removeEventListener("focusin", focusInHandler);
  };

  const registerShadowRoot = (shadowRoot: ShadowRoot): void => {
    const count = registeredShadowRootCounts.get(shadowRoot);
    const newCount = (typeof count === "number" ? count : 0) + 1;

    if (newCount === 1) {
      addShadowListeners(shadowRoot);
    }

    registeredShadowRootCounts.set(shadowRoot, newCount);
  };

  const unregisterShadowRoot = (shadowRoot: ShadowRoot): void => {
    const count = registeredShadowRootCounts.get(shadowRoot);
    const currentCount = typeof count === "number" ? count : 0;
    const newCount = Math.max(0, currentCount - 1);

    if (currentCount > 0 && newCount === 0) {
      removeShadowListeners(shadowRoot);
      registeredShadowRootCounts.delete(shadowRoot);
      return;
    }

    if (newCount > 0) {
      registeredShadowRootCounts.set(shadowRoot, newCount);
    }
  };

  const registerElement = (component: ReferenceElementComponent, referenceEl: ReferenceElement | nil): void => {
    if (!referenceEl || !component.referenceElementType) {
      return;
    }

    const existingComponents = registeredElements.get(referenceEl) ?? [];

    if (existingComponents.includes(component)) {
      return;
    }

    if (options.click && "ariaControlsElements" in referenceEl) {
      const currentElements = referenceEl.ariaControlsElements ?? [];

      if (!currentElements.includes(component)) {
        const updatedElements = [...currentElements, component];
        referenceEl.ariaControlsElements = updatedElements;
      }
    }

    if (options.hover && "ariaDescribedByElements" in referenceEl) {
      const currentElements = referenceEl.ariaDescribedByElements ?? [];

      if (!currentElements.includes(component)) {
        const updatedElements = [...currentElements, component];
        referenceEl.ariaDescribedByElements = updatedElements;
      }
    }

    registeredComponentCount++;

    registeredElements.set(referenceEl, [...existingComponents, component]);

    const shadowRoot = options.hover ? getReferenceElShadowRootNode(referenceEl) : null;

    if (shadowRoot) {
      registerShadowRoot(shadowRoot);
    }

    if (registeredComponentCount === 1) {
      addListeners();
    }

    updateElement(component);
  };

  const decrementRegisteredElementCount = (shadowRoot: ShadowRoot | nil): void => {
    registeredComponentCount--;

    if (shadowRoot) {
      unregisterShadowRoot(shadowRoot);
    }
  };

  const unregisterElement = (component: ReferenceElementComponent, referenceEl: ReferenceElement | nil): void => {
    if (!referenceEl || !component.referenceElementType) {
      return;
    }

    const shadowRoot = options.hover ? getReferenceElShadowRootNode(referenceEl) : null;
    const existingComponents = registeredElements.get(referenceEl) ?? [];
    const updatedComponents = existingComponents.filter((p) => p !== component);

    if (updatedComponents.length > 0) {
      registeredElements.set(referenceEl, updatedComponents);
      if (updatedComponents.length !== existingComponents.length) {
        decrementRegisteredElementCount(shadowRoot);
      }
    } else if (registeredElements.delete(referenceEl)) {
      decrementRegisteredElementCount(shadowRoot);
    }

    if (registeredComponentCount === 0) {
      removeListeners();
      clearHoverTimeout();
    }

    if (options.click && "ariaControlsElements" in referenceEl) {
      const newElements = referenceEl.ariaControlsElements?.filter((element) => element !== component);
      referenceEl.ariaControlsElements = newElements?.length > 0 ? newElements : null;
    }

    if (options.click && "ariaExpanded" in referenceEl) {
      const hasRegisteredComponents = (updatedComponents?.length ?? 0) > 0;

      if (hasRegisteredComponents) {
        const existingComponentOpen = updatedComponents?.some((component) => component.open) ?? false;
        referenceEl.ariaExpanded = toAriaBoolean(existingComponentOpen);
      } else {
        referenceEl.ariaExpanded = null;
      }
    }

    if (options.hover && "ariaDescribedByElements" in referenceEl) {
      const newElements = referenceEl.ariaDescribedByElements?.filter((element) => element !== component);
      referenceEl.ariaDescribedByElements = newElements?.length > 0 ? newElements : null;
    }
  };

  return {
    registerElement,
    unregisterElement,
    updateElement,
  };
};
