import { queryElementsRoots } from "../../utils/dom";

export default class PopoverManager {
  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  private registeredElements = new WeakMap<HTMLElement, HTMLCalcitePopoverElement>();

  private registeredElementCount = 0;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  registerElement(referenceEl: HTMLElement, popover: HTMLCalcitePopoverElement): void {
    this.registeredElementCount++;

    this.registeredElements.set(referenceEl, popover);

    if (this.registeredElementCount === 1) {
      this.addListeners();
    }
  }

  unregisterElement(referenceEl: HTMLElement): void {
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
    const popover = this.queryPopover(composedPath);

    if (popover && !popover.triggerDisabled) {
      popover.toggle();
      return;
    }

    (queryElementsRoots(event.target as HTMLElement, "calcite-popover") as HTMLCalcitePopoverElement[])
      .filter((popover) => popover.autoClose && popover.open && !composedPath.includes(popover))
      .forEach((popover) => popover.toggle(false));
  };

  private keyHandler = (event: KeyboardEvent): void => {
    if (event.key !== "Enter" && event.key !== " ") {
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
