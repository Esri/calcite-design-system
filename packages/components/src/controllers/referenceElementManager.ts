import { ReferenceElement } from "../utils/floating-ui";
import { isKeyboardTriggeredClick, isPrimaryPointerButton } from "../utils/dom";
import { isActivationKey } from "../utils/key";
import { toAriaBoolean } from "../utils/aria";
import { ReferenceElementComponent } from "./useReferenceElement";

export type ReferenceElementManagerOptions = {
  click?: boolean;
  hover?: boolean;
};

export interface ReferenceElementComponentManager {
  registerElement: (component: ReferenceElementComponent) => void;
  unregisterElement: (component: ReferenceElementComponent) => void;
  updateElement: (component: ReferenceElementComponent) => void;
}

const clickTolerance = 5;

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
 * A controller for managing reference elements.
 *
 * Note: reference elements will be managed automatically when the component is disconnected.
 */
export const referenceElementManager = (options: ReferenceElementManagerOptions): ReferenceElementComponentManager => {
  const registeredElements = new Map<ReferenceElement, ReferenceElementComponent[]>();

  let registeredElementCount = 0;

  let pointerDownPosition: { x: number; y: number };

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

    pointerDownPosition = undefined;

    toggleComponents(event);
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

  const addListeners = (): void => {
    if (options.click) {
      window.addEventListener("click", clickHandler);
      window.addEventListener("keydown", keyDownHandler);
      window.addEventListener("pointerdown", pointerDownHandler);
    }
    if (options.hover) {
      // todo
    }
  };

  const removeListeners = (): void => {
    if (options.click) {
      window.removeEventListener("pointerdown", pointerDownHandler);
      window.removeEventListener("click", clickHandler);
      window.removeEventListener("keydown", keyDownHandler);
    }
    if (options.hover) {
      // todo
    }
  };

  const updateElement = (component: ReferenceElementComponent): void => {
    const { referenceEl, open } = component;

    if (!referenceEl) {
      return;
    }

    if ("ariaExpanded" in referenceEl) {
      referenceEl.ariaExpanded = toAriaBoolean(open);
    }
  };

  const registerElement = (component: ReferenceElementComponent): void => {
    const { referenceEl } = component;

    if (!referenceEl) {
      return;
    }

    if ("ariaControlsElements" in referenceEl) {
      const currentElements = referenceEl.ariaControlsElements ?? [];
      const updatedElements = [...currentElements, component];
      referenceEl.ariaControlsElements = updatedElements;
    }

    registeredElementCount++;

    const existingComponents = registeredElements.get(referenceEl) ?? [];
    registeredElements.set(referenceEl, [...existingComponents, component]);

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

    if ("ariaControlsElements" in referenceEl) {
      const newElements = referenceEl.ariaControlsElements?.filter((element) => element !== component);
      referenceEl.ariaControlsElements = newElements ?? null;
    }

    if ("ariaExpanded" in referenceEl) {
      referenceEl.ariaExpanded = null;
    }

    const existingComponents = registeredElements.get(referenceEl) ?? [];
    const updatedComponents = existingComponents.filter((p) => p !== component);

    if (updatedComponents.length > 0) {
      registeredElements.set(referenceEl, updatedComponents);
      registeredElementCount--;
    } else if (registeredElements.delete(referenceEl)) {
      registeredElementCount--;
    }

    if (registeredElementCount === 0) {
      removeListeners();
    }
  };

  return {
    registerElement,
    unregisterElement,
    updateElement,
  };
};
