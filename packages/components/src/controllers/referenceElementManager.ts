import { nil } from "@arcgis/toolkit/type";
import { ReferenceElement } from "../utils/floating-ui";
import { getShadowRootNode, isKeyboardTriggeredClick, isPrimaryPointerButton } from "../utils/dom";
import { isActivationKey } from "../utils/key";
import { toAriaBoolean } from "../utils/aria";
import { ReferenceElementComponent } from "./useReferenceElement";

export type ReferenceElementManagerOptions = {
  /** Enables click and keyboard-activation interactions for registered reference elements. */
  click?: boolean;
  /** Enables hover and focus interactions for registered reference elements. */
  hover?: boolean;
};

export interface ReferenceElementComponentManager {
  /** Registers a component and wires global listeners when needed. */
  registerElement: (component: ReferenceElementComponent) => void;
  /** Removes a component and removes global listeners when no elements remain. */
  unregisterElement: (component: ReferenceElementComponent) => void;
  /** Synchronizes ARIA state from a component to its reference element. */
  updateElement: (component: ReferenceElementComponent) => void;
}

const clickTolerance = 5;

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
  let activeHoverComponents: ReferenceElementComponent[] | nil = null;
  let clickedHoverComponents: ReferenceElementComponent[] | nil = null;
  let hoverCloseTimeout: number | nil = null;
  let hoverOpenTimeout: number | nil = null;
  let hoveredComponents: ReferenceElementComponent[] = [];
  let pointerDownPosition: { x: number; y: number } | nil = null;
  let registeredElementCount = 0;

  const queryComponents = (composedPath: EventTarget[]): ReferenceElementComponent[] | undefined => {
    const registeredElement = (composedPath as HTMLElement[]).find((pathEl) => registeredElements.has(pathEl))!;

    return registeredElements.get(registeredElement);
  };

  const toggleComponents = (event: KeyboardEvent | PointerEvent): void => {
    const composedPath = event.composedPath();
    const toggleComponents = queryComponents(composedPath);

    toggleComponents?.forEach((toggleComponent) => {
      if (toggleComponent && !toggleComponent.triggerDisabled) {
        toggleComponent.open = !toggleComponent.open;
      }
    });

    Array.from(registeredElements.values())
      .flat()
      .filter(
        (component) =>
          !toggleComponents?.includes(component) &&
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

    toggleComponents(event);
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

  const pathHasOpenHoverComponent = (components: ReferenceElementComponent[], composedPath: EventTarget[]): boolean => {
    return (
      activeHoverComponents?.some((component) => component?.open && composedPath.includes(component.el)) ||
      components?.some((component) => component?.open && composedPath.includes(component.el))
    );
  };

  const toggleHoverComponents = (components: ReferenceElementComponent[], open: boolean): void => {
    components?.forEach((component) => (component.open = open));

    activeHoverComponents = open ? components : null;
  };

  const closeActiveHoverComponents = (): void => {
    toggleHoverComponents(activeHoverComponents, false);
  };

  const hoverKeyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && !event.defaultPrevented) {
      const openActiveHoverComponents = activeHoverComponents?.filter((component) => component?.open);

      if (openActiveHoverComponents?.length) {
        clearHoverTimeout();
        closeActiveHoverComponents();

        openActiveHoverComponents.some((component) => {
          const composedPath = event.composedPath();

          if (
            (component.referenceEl instanceof Element && composedPath.includes(component.referenceEl)) ||
            composedPath.includes(component.el)
          ) {
            event.preventDefault();
          }
        });
      }
    }
  };

  const hoverClickHandler = (event: PointerEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    clickedHoverComponents = null;
    const composedPath = event.composedPath();
    const components = queryComponents(composedPath);

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
      clickedHoverComponents = closeOnClickHoverComponents;
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
      toggleComponents(event);
    }
  };

  const closeAllComponents = (): void => {
    Array.from(registeredElements.values())
      .flat()
      .forEach((component) => (component.open = false));
  };

  const closeComponentsIfNotActive = (components: ReferenceElementComponent[]): void => {
    if (components !== activeHoverComponents) {
      closeActiveHoverComponents();
    }
  };

  const openHoveredComponents = (components: ReferenceElementComponent[]): void => {
    hoverOpenTimeout = window.setTimeout(
      () => {
        if (hoverOpenTimeout === null || components !== hoveredComponents) {
          return;
        }

        clearHoverCloseTimeout();
        closeComponentsIfNotActive(components);
        toggleHoverComponents(components, true);
      },
      activeHoverComponents?.some((component) => component.open) ? HOVER_QUICK_OPEN_DELAY_MS : HOVER_OPEN_DELAY_MS,
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

    const components = queryComponents(composedPath);

    if (pathHasOpenHoverComponent(components, composedPath)) {
      clearHoverTimeout();
      return;
    }

    if (components?.some((component) => clickedHoverComponents?.includes(component))) {
      return;
    }

    if (!components?.some((component) => hoveredComponents?.includes(component))) {
      clearHoverOpenTimeout();
    }

    hoveredComponents = components;

    if (components?.length) {
      openHoveredComponents(components);
    } else if (activeHoverComponents?.some((component) => component?.open)) {
      closeHoveredComponents();
    }

    clickedHoverComponents = null;
  };

  const blurHandler = (): void => {
    closeActiveHoverComponents();
  };

  const pointerLeaveHandler = (event: PointerEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    clearHoverTimeout();
    closeHoveredComponents();
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
    const components = queryComponents(composedPath);

    if (pathHasOpenHoverComponent(components, composedPath)) {
      clearHoverTimeout();
      return;
    }

    if (components?.some((component) => clickedHoverComponents?.includes(component))) {
      return;
    }

    clickedHoverComponents = null;

    closeComponentsIfNotActive(components);

    if (!components?.length) {
      return;
    }

    toggleFocusedComponents(components, true);
  };

  const referenceHasOpenComponent = (referenceEl: ReferenceElement): boolean => {
    return registeredElements.get(referenceEl)?.some((component) => component.open) ?? false;
  };

  const updateElement = (component: ReferenceElementComponent): void => {
    const { referenceEl, open } = component;

    if (!referenceEl) {
      return;
    }

    if ("ariaExpanded" in referenceEl) {
      referenceEl.ariaExpanded = toAriaBoolean(open || referenceHasOpenComponent(referenceEl));
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
    } else {
      registeredShadowRootCounts.delete(shadowRoot);
    }
  };

  const registerElement = (component: ReferenceElementComponent): void => {
    const { referenceEl } = component;

    if (!referenceEl) {
      return;
    }

    const existingComponents = registeredElements.get(referenceEl) ?? [];

    if (existingComponents.includes(component)) {
      return;
    }

    if ("ariaControlsElements" in referenceEl) {
      const currentElements = referenceEl.ariaControlsElements ?? [];

      if (!currentElements.includes(component)) {
        const updatedElements = [...currentElements, component];
        referenceEl.ariaControlsElements = updatedElements;
      }
    }

    registeredElementCount++;

    registeredElements.set(referenceEl, [...existingComponents, component]);

    const shadowRoot = options.hover && getReferenceElShadowRootNode(referenceEl);

    if (shadowRoot) {
      registerShadowRoot(shadowRoot);
    }

    if (registeredElementCount === 1) {
      addListeners();
    }

    updateElement(component);
  };

  const unregisterElement = (component: ReferenceElementComponent): void => {
    const { referenceEl } = component;

    if (!referenceEl) {
      return;
    }

    const shadowRoot = options.hover && getReferenceElShadowRootNode(referenceEl);

    if (shadowRoot) {
      unregisterShadowRoot(shadowRoot);
    }

    const existingComponents = registeredElements.get(referenceEl) ?? [];
    const updatedComponents = existingComponents.filter((p) => p !== component);

    if (updatedComponents.length > 0) {
      registeredElements.set(referenceEl, updatedComponents);
      if (updatedComponents.length !== existingComponents.length) {
        registeredElementCount--;
      }
    } else if (registeredElements.delete(referenceEl)) {
      registeredElementCount--;
    }

    if (registeredElementCount === 0) {
      removeListeners();
    }

    if ("ariaControlsElements" in referenceEl) {
      const newElements = referenceEl.ariaControlsElements?.filter((element) => element !== component);
      referenceEl.ariaControlsElements = newElements ?? null;
    }

    if ("ariaExpanded" in referenceEl) {
      const refHasOpenComponent = referenceHasOpenComponent(referenceEl);
      referenceEl.ariaExpanded = refHasOpenComponent ? toAriaBoolean(refHasOpenComponent) : null;
    }
  };

  return {
    registerElement,
    unregisterElement,
    updateElement,
  };
};
