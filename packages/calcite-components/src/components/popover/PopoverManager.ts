// @ts-strict-ignore
import { ReferenceElement } from "../../utils/floating-ui";
import { isActivationKey } from "../../utils/key";
import { isKeyboardTriggeredClick, isPrimaryPointerButton } from "../../utils/dom";
import type { Popover } from "./popover";

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

export default class PopoverManager {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private registeredElements = new Map<ReferenceElement, Popover["el"]>();

  private registeredElementCount = 0;

  private pointerDownPosition?: { x: number; y: number };

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  registerElement(referenceEl: ReferenceElement, popover: Popover["el"]): void {
    this.registeredElementCount++;

    this.registeredElements.set(referenceEl, popover);

    if (this.registeredElementCount === 1) {
      this.addListeners();
    }
  }

  unregisterElement(referenceEl: ReferenceElement): void {
    if (this.registeredElements.delete(referenceEl)) {
      this.registeredElementCount--;
    }

    if (this.registeredElementCount === 0) {
      this.removeListeners();
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private queryPopover = (composedPath: EventTarget[]): Popover["el"] => {
    const { registeredElements } = this;

    const registeredElement = (composedPath as HTMLElement[]).find((pathEl) => registeredElements.has(pathEl));

    return registeredElements.get(registeredElement);
  };

  private togglePopovers = (event: KeyboardEvent | PointerEvent): void => {
    const composedPath = event.composedPath();
    const togglePopover = this.queryPopover(composedPath);

    if (togglePopover && !togglePopover.triggerDisabled) {
      togglePopover.open = !togglePopover.open;
    }

    Array.from(this.registeredElements.values())
      .filter(
        (popover) => popover !== togglePopover && popover.autoClose && popover.open && !composedPath.includes(popover),
      )
      .forEach((popover) => (popover.open = false));
  };

  private closeAllPopovers(): void {
    Array.from(this.registeredElements.values()).forEach((popover) => (popover.open = false));
  }

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "Escape") {
      this.closeAllPopovers();
    } else if (isActivationKey(event.key)) {
      this.togglePopovers(event);
    }
  };

  private pointerDownHandler = (event: PointerEvent): void => {
    if (event.defaultPrevented || !isPrimaryPointerButton(event)) {
      return;
    }

    const { clientX, clientY } = event;
    this.pointerDownPosition = { x: clientX, y: clientY };
  };

  private clickHandler = (event: PointerEvent): void => {
    if (
      isKeyboardTriggeredClick(event) ||
      event.defaultPrevented ||
      (this.pointerDownPosition &&
        isDrag({
          endY: event.clientY,
          endX: event.clientX,
          startY: this.pointerDownPosition.y,
          startX: this.pointerDownPosition.x,
        }))
    ) {
      return;
    }

    this.pointerDownPosition = undefined;

    this.togglePopovers(event);
  };

  private addListeners(): void {
    window.addEventListener("pointerdown", this.pointerDownHandler);
    window.addEventListener("click", this.clickHandler);
    window.addEventListener("keydown", this.keyDownHandler);
  }

  private removeListeners(): void {
    window.removeEventListener("pointerdown", this.pointerDownHandler);
    window.removeEventListener("click", this.clickHandler);
    window.removeEventListener("keydown", this.keyDownHandler);
  }
}
