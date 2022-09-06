import { ReferenceElement } from "../../utils/floating-ui";
import { isActivationKey } from "../../utils/key";

export default class PopoverManager {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private registeredElements = new Map<ReferenceElement, HTMLCalcitePopoverElement>();

  private registeredElementCount = 0;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  registerElement(referenceEl: ReferenceElement, popover: HTMLCalcitePopoverElement): void {
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

  private queryPopover = (composedPath: EventTarget[]): HTMLCalcitePopoverElement => {
    const { registeredElements } = this;

    const registeredElement = (composedPath as HTMLElement[]).find((pathEl) => registeredElements.has(pathEl));

    return registeredElements.get(registeredElement);
  };

  private togglePopovers = (event: KeyboardEvent | MouseEvent): void => {
    const composedPath = event.composedPath();
    const togglePopover = this.queryPopover(composedPath);

    if (togglePopover && !togglePopover.triggerDisabled) {
      togglePopover.toggle();
    }

    Array.from(this.registeredElements.values())
      .filter(
        (popover) => popover !== togglePopover && popover.autoClose && popover.open && !composedPath.includes(popover)
      )
      .forEach((popover) => popover.toggle(false));
  };

  private keyHandler = (event: KeyboardEvent): void => {
    if (event.defaultPrevented || !isActivationKey(event.key)) {
      return;
    }

    this.togglePopovers(event);
  };

  private clickHandler = (event: MouseEvent): void => {
    this.togglePopovers(event);
  };

  private addListeners(): void {
    document.addEventListener("pointerdown", this.clickHandler, { capture: true });
    document.addEventListener("keydown", this.keyHandler, { capture: true });
  }

  private removeListeners(): void {
    document.removeEventListener("pointerdown", this.clickHandler, { capture: true });
    document.removeEventListener("keydown", this.keyHandler, { capture: true });
  }
}
