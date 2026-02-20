import { ReferenceElement } from "../utils/floating-ui";
import { isKeyboardTriggeredClick, isPrimaryPointerButton } from "../utils/dom";
import { isActivationKey } from "../utils/key";
import { toAriaBoolean } from "../utils/aria";
import { ReferenceElementComponent } from "./useReferenceElement";

export interface ReferenceElementComponentManager {
  registerElement: (referenceElementComponent: ReferenceElementComponent) => void;
  unregisterElement: (referenceElementComponent: ReferenceElementComponent) => void;
  setExpanded: (referenceElementComponent: ReferenceElementComponent) => void;
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
export const referenceElementManager = (): ReferenceElementComponentManager => {
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
        (referenceElementComponent) =>
          !toggleComponents?.includes(referenceElementComponent) &&
          referenceElementComponent.autoClose &&
          referenceElementComponent.open &&
          !composedPath.includes(referenceElementComponent),
      )
      .forEach((referenceElementComponent) => (referenceElementComponent.open = false));
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
      .forEach((referenceElementComponent) => (referenceElementComponent.open = false));
  };

  const addListeners = (): void => {
    // todo: referenceElementOptions
    window.addEventListener("pointerdown", pointerDownHandler);
    window.addEventListener("click", clickHandler);
    window.addEventListener("keydown", keyDownHandler);
  };

  const removeListeners = (): void => {
    window.removeEventListener("pointerdown", pointerDownHandler);
    window.removeEventListener("click", clickHandler);
    window.removeEventListener("keydown", keyDownHandler);
  };

  const setExpanded = (referenceElementComponent: ReferenceElementComponent): void => {
    const { referenceEl, open } = referenceElementComponent;

    if (!referenceEl) {
      return;
    }

    if ("ariaExpanded" in referenceEl) {
      referenceEl.ariaExpanded = toAriaBoolean(open);
    }
  };

  const registerElement = (referenceElementComponent: ReferenceElementComponent): void => {
    const { referenceEl } = referenceElementComponent;

    if (!referenceEl) {
      return;
    }

    if ("ariaControlsElements" in referenceEl) {
      const currentElements = referenceEl.ariaControlsElements ?? [];
      const updatedElements = [...currentElements, referenceElementComponent];
      referenceEl.ariaControlsElements = updatedElements;
    }

    registeredElementCount++;

    const existingComponents = registeredElements.get(referenceEl) ?? [];
    registeredElements.set(referenceEl, [...existingComponents, referenceElementComponent]);

    if (registeredElementCount === 1) {
      addListeners();
    }

    setExpanded(referenceElementComponent);
  };

  const unregisterElement = (referenceElementComponent: ReferenceElementComponent): void => {
    const { referenceEl } = referenceElementComponent;

    if (!referenceEl) {
      return;
    }

    if ("ariaControlsElements" in referenceEl) {
      const newElements = referenceEl.ariaControlsElements?.filter((element) => element !== referenceElementComponent);
      referenceEl.ariaControlsElements = newElements ?? null;
    }

    if ("ariaExpanded" in referenceEl) {
      referenceEl.ariaExpanded = null;
    }

    const existingComponents = registeredElements.get(referenceEl) ?? [];
    const updatedComponents = existingComponents.filter((p) => p !== referenceElementComponent);

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
    setExpanded,
  };
};
