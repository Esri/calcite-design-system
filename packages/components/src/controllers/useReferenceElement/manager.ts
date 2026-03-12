import { nil } from "@arcgis/toolkit/type";
import { ReferenceElement } from "../../utils/floating-ui";
import { getShadowRootNode, isKeyboardTriggeredClick, isPrimaryPointerButton } from "../../utils/dom";
import { isActivationKey } from "../../utils/key";
import { toAriaBoolean } from "../../utils/aria";
import type { ReferenceElementComponent, ReferenceElementType } from "../useReferenceElement";

function haveSameComponents(
  components: ReferenceElementComponent[],
  activeComponents: ReferenceElementComponent[],
): boolean {
  if (components === activeComponents) {
    return true;
  }

  if (components.length !== activeComponents.length) {
    return false;
  }

  const s1 = new Set(components);
  const s2 = new Set(activeComponents);

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
  click?: boolean;
  hover?: boolean;
};

export interface ReferenceElementComponentManager {
  registerElement: (component: ReferenceElementComponent, referenceEl: ReferenceElement | nil) => void;
  unregisterElement: (component: ReferenceElementComponent, referenceEl: ReferenceElement | nil) => void;
  updateElement: (component: ReferenceElementComponent, referenceEl: ReferenceElement | nil) => void;
}

const clickTolerance = 5;

export const HOVER_OPEN_DELAY_MS = 300;
export const HOVER_QUICK_OPEN_DELAY_MS = HOVER_OPEN_DELAY_MS / 3;
export const HOVER_CLOSE_DELAY_MS = HOVER_OPEN_DELAY_MS * 1.5;

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

  const updateElement = (component: ReferenceElementComponent, referenceEl: ReferenceElement | nil): void => {
    if (!referenceEl || !component.referenceElementType) {
      return;
    }

    if (options.click && "ariaExpanded" in referenceEl) {
      const existingComponents = registeredElements.get(referenceEl) ?? [];
      const existingComponentOpen = existingComponents?.some((component) => component.open) ?? false;
      referenceEl.ariaExpanded = toAriaBoolean(component.open || existingComponentOpen);
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

    updateElement(component, referenceEl);
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
