// @ts-strict-ignore
import { ReferenceElement } from "../../utils/floating-ui";
import { isActivationKey } from "../../utils/key";
import { isKeyboardTriggeredClick } from "../../utils/dom";
import type { Popover } from "./popover";

export default class PopoverManager {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private registeredElements = new Map<ReferenceElement, Popover["el"]>();

  private registeredElementCount = 0;

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

  private clickHandler = (event: PointerEvent): void => {
    if (isKeyboardTriggeredClick(event) || event.defaultPrevented) {
      return;
    }

    this.togglePopovers(event);
  };

  private addListeners(): void {
    window.addEventListener("click", this.clickHandler);
    window.addEventListener("keydown", this.keyDownHandler);
  }

  private removeListeners(): void {
    window.removeEventListener("click", this.clickHandler);
    window.removeEventListener("keydown", this.keyDownHandler);
  }
}
