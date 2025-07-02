// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createEvent, h, JsxNode, LitElement, method, property } from "@arcgis/lumina";
import { focusElement, focusElementInGroup } from "../../utils/dom";
import {
  connectFloatingUI,
  defaultMenuPlacement,
  disconnectFloatingUI,
  filterValidFlipPlacements,
  FlipPlacement,
  FloatingCSS,
  FloatingUIComponent,
  hideFloatingUI,
  MenuPlacement,
  OverlayPositioning,
  reposition,
} from "../../utils/floating-ui";
import { guid } from "../../utils/guid";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import { createObserver } from "../../utils/observers";
import { toggleOpenClose, OpenCloseComponent } from "../../utils/openCloseComponent";
import { getDimensionClass } from "../../utils/dynamicClasses";
import { RequestedItem } from "../dropdown-group/interfaces";
import { Scale, Width } from "../interfaces";
import type { DropdownItem } from "../dropdown-item/dropdown-item";
import type { DropdownGroup } from "../dropdown-group/dropdown-group";
import { useSetFocus } from "../../controllers/useSetFocus";
import { ItemKeyboardEvent } from "./interfaces";
import { CSS, SLOTS } from "./resources";
import { styles } from "./dropdown.scss";

declare global {
  interface DeclareElements {
    "calcite-dropdown": Dropdown;
  }
}

/**
 * @slot - A slot for adding `calcite-dropdown-group` elements. Every `calcite-dropdown-item` must have a parent `calcite-dropdown-group`, even if the `groupTitle` property is not set.
 * @slot trigger - A slot for the element that triggers the `calcite-dropdown`.
 */
export class Dropdown
  extends LitElement
  implements InteractiveComponent, OpenCloseComponent, FloatingUIComponent
{
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private filteredFlipPlacements: FlipPlacement[];

  floatingEl: HTMLDivElement;

  private focusLastDropdownItem = false;

  private groups: DropdownGroup["el"][] = [];

  private guid = `calcite-dropdown-${guid()}`;

  private items: DropdownItem["el"][] = [];

  private mutationObserver = createObserver("mutation", () => this.updateItems());

  transitionProp = "opacity" as const;

  referenceEl: HTMLDivElement;

  private resizeObserver = createObserver("resize", (entries) =>
    this.resizeObserverCallback(entries),
  );

  private scrollerEl: HTMLDivElement;

  transitionEl: HTMLDivElement;

  /** trigger elements */
  private triggers: HTMLElement[];

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region Public Properties

  /**
   * When `true`, the component will remain open after a selection is made.
   *
   * If the `selectionMode` of the selected `calcite-dropdown-item`'s containing `calcite-dropdown-group` is `"none"`, the component will always close.
   */
  @property({ reflect: true }) closeOnSelectDisabled = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the component's fallback `calcite-dropdown-item` `placement` when it's initial or specified `placement` has insufficient space available. */
  @property() flipPlacements: FlipPlacement[];

  /**
   * Specifies the maximum number of `calcite-dropdown-item`s to display before showing a scroller.
   * Value must be greater than `0`, and does not include `groupTitle`'s from `calcite-dropdown-group`.
   */
  @property({ reflect: true }) maxItems = 0;

  /**
   * Offset the position of the component away from the `referenceElement`.
   *
   * @default 0
   */
  @property({ type: Number, reflect: true }) offsetDistance = 0;

  /** Offset the position of the component along the `referenceElement`. */
  @property({ reflect: true }) offsetSkidding = 0;

  /** When `true`, displays and positions the component. */
  @property({ reflect: true }) open = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the component will be positioned relative to the container element.
   *
   * @default "bottom-start"
   */
  @property({ reflect: true }) placement: MenuPlacement = defaultMenuPlacement;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @property() selectedItems: DropdownItem["el"][] = [];

  /** Specifies the action to open the component from the container element. */
  @property({ reflect: true }) type: "hover" | "click" = "click";

  /**
   * Specifies the width of the component.
   *
   * @deprecated Use the `width` property instead.
   */
  @property({ reflect: true }) widthScale: Scale;

  /** Specifies the width of the component. */
  @property({ reflect: true }) width: Extract<Width, Scale>;

  // #endregion

  // #region Public Methods

  /**
   * Updates the position of the component.
   *
   * @param delayed
   */
  @method()
  async reposition(delayed = false): Promise<void> {
    const {
      filteredFlipPlacements,
      floatingEl,
      offsetDistance,
      offsetSkidding,
      overlayPositioning,
      placement,
      referenceEl,
    } = this;

    return reposition(
      this,
      {
        floatingEl,
        referenceEl,
        offsetDistance,
        offsetSkidding,
        overlayPositioning,
        placement,
        flipPlacements: filteredFlipPlacements,
        type: "menu",
      },
      delayed,
    );
  }

  /** Sets focus on the component's first focusable element. */
  @method()
  async setFocus(): Promise<void> {
    return this.focusSetter(() => {
      return this.referenceEl;
    });
  }

  // #endregion

  // #region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteDropdownBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteDropdownBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteDropdownClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteDropdownOpen = createEvent({ cancelable: false });

  /** Fires when a `calcite-dropdown-item`'s selection changes. */
  calciteDropdownSelect = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listenOn(window, "click", this.closeCalciteDropdownOnClick);
    this.listen("calciteInternalDropdownCloseRequest", this.closeCalciteDropdownOnEvent);
    this.listenOn(window, "calciteDropdownOpen", this.closeCalciteDropdownOnOpenEvent);
    this.listen("pointerenter", this.pointerEnterHandler);
    this.listen("pointerleave", this.pointerLeaveHandler);
    this.listen("calciteInternalDropdownItemKeyEvent", this.calciteInternalDropdownItemKeyEvent);
    this.listen("calciteInternalDropdownItemSelect", this.handleItemSelect);
  }

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.setFilteredPlacements();
    this.updateItems();
    connectFloatingUI(this);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
    }

    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.handleDisabledChange(this.disabled);
    }

    if (changes.has("flipPlacements")) {
      this.flipPlacementsHandler();
    }

    if (changes.has("maxItems") && this.hasUpdated) {
      this.setMaxScrollerHeight();
    }

    if (
      this.hasUpdated &&
      ((changes.has("offsetDistance") && this.offsetDistance !== 0) ||
        (changes.has("offsetSkidding") && this.offsetSkidding !== 0) ||
        (changes.has("overlayPositioning") && this.overlayPositioning !== "absolute") ||
        (changes.has("placement") && this.placement !== defaultMenuPlacement))
    ) {
      this.reposition(true);
    }

    if (changes.has("scale") && (this.hasUpdated || this.scale !== "m")) {
      this.handlePropsChange();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    this.updateSelectedItems();
    connectFloatingUI(this);
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    disconnectFloatingUI(this);
  }

  // #endregion

  // #region Private Methods

  private openHandler(): void {
    toggleOpenClose(this);

    if (this.disabled) {
      return;
    }

    this.reposition(true);
  }

  private handleDisabledChange(value: boolean): void {
    if (!value) {
      this.open = false;
    }
  }

  private flipPlacementsHandler(): void {
    this.setFilteredPlacements();
    this.reposition(true);
  }

  private handlePropsChange(): void {
    this.updateItems();
    this.updateGroupProps();
  }

  private closeCalciteDropdownOnClick(event: MouseEvent): void {
    if (this.disabled || !this.open || event.composedPath().includes(this.el)) {
      return;
    }

    this.closeCalciteDropdown(false);
  }

  private closeCalciteDropdownOnEvent(event: Event): void {
    this.closeCalciteDropdown();
    event.stopPropagation();
  }

  private closeCalciteDropdownOnOpenEvent(event: Event): void {
    if (event.composedPath().includes(this.el)) {
      return;
    }

    this.open = false;
  }

  private pointerEnterHandler(): void {
    if (this.disabled || this.type !== "hover") {
      return;
    }

    this.toggleDropdown();
  }

  private pointerLeaveHandler(): void {
    if (this.disabled || this.type !== "hover") {
      return;
    }

    this.closeCalciteDropdown();
  }

  private getTraversableItems(): DropdownItem["el"][] {
    return this.items.filter((item) => !item.disabled && !item.hidden);
  }

  private calciteInternalDropdownItemKeyEvent(event: CustomEvent<ItemKeyboardEvent>): void {
    const { keyboardEvent } = event.detail;
    const target = keyboardEvent.target as DropdownItem["el"];
    const traversableItems = this.getTraversableItems();

    switch (keyboardEvent.key) {
      case "Tab":
        this.open = false;
        this.updateTabIndexOfItems(target);
        break;
      case "ArrowDown":
        focusElementInGroup(traversableItems, target, "next");
        break;
      case "ArrowUp":
        focusElementInGroup(traversableItems, target, "previous");
        break;
      case "Home":
        focusElementInGroup(traversableItems, target, "first");
        break;
      case "End":
        focusElementInGroup(traversableItems, target, "last");
        break;
    }

    event.stopPropagation();
  }

  private handleItemSelect(event: CustomEvent<RequestedItem>): void {
    this.updateSelectedItems();
    event.stopPropagation();
    this.calciteDropdownSelect.emit();
    if (
      !this.closeOnSelectDisabled ||
      event.detail.requestedDropdownGroup.selectionMode === "none"
    ) {
      this.closeCalciteDropdown();
    }
    event.stopPropagation();
  }

  private setFilteredPlacements(): void {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterValidFlipPlacements(flipPlacements, el)
      : null;
  }

  private updateTriggers(event: Event): void {
    this.triggers = (event.target as HTMLSlotElement).assignedElements({
      flatten: true,
    }) as HTMLElement[];

    this.reposition(true);
  }

  private updateItems(): void {
    this.items = this.groups
      .map((group) => Array.from(group?.querySelectorAll("calcite-dropdown-item")))
      .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);

    this.updateSelectedItems();

    this.reposition(true);

    this.items.forEach((item) => (item.scale = this.scale));
  }

  private updateGroups(event: Event): void {
    const groups = (event.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((el): el is DropdownGroup["el"] => el?.matches("calcite-dropdown-group"));

    this.groups = groups;

    this.updateItems();
    this.updateGroupProps();
  }

  private updateGroupProps(): void {
    this.groups.forEach((group, index) => {
      group.scale = this.scale;
      group.position = index;
    });
  }

  private resizeObserverCallback(entries: ResizeObserverEntry[]): void {
    entries.forEach((entry) => {
      const { target } = entry;

      if (!this.hasUpdated) {
        return;
      }

      if (target === this.referenceEl) {
        this.setDropdownWidth();
      } else if (target === this.scrollerEl) {
        this.setMaxScrollerHeight();
      }
    });
  }

  private setDropdownWidth(): void {
    const { referenceEl, scrollerEl } = this;
    const referenceElWidth = referenceEl?.clientWidth;

    scrollerEl.style.minWidth = `${referenceElWidth}px`;
  }

  private setMaxScrollerHeight(): void {
    const maxScrollerHeight = this.getMaxScrollerHeight();
    this.scrollerEl.style.maxBlockSize = maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "";
    this.reposition(true);
  }

  private setScrollerAndTransitionEl(el: HTMLDivElement): void {
    if (!el) {
      return;
    }

    this.resizeObserver?.observe(el);
    this.scrollerEl = el;
    this.transitionEl = el;
  }

  onBeforeOpen(): void {
    this.focusOnFirstActiveOrDefaultItem();
    this.calciteDropdownBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteDropdownOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteDropdownBeforeClose.emit();
  }

  onClose(): void {
    this.calciteDropdownClose.emit();
    hideFloatingUI(this);
  }

  private setReferenceEl(el: HTMLDivElement): void {
    this.referenceEl = el;
    connectFloatingUI(this);
    if (el) {
      this.resizeObserver?.observe(el);
    }
  }

  private setFloatingEl(el: HTMLDivElement): void {
    this.floatingEl = el;
    connectFloatingUI(this);
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (!event.composedPath().includes(this.referenceEl)) {
      return;
    }

    const { defaultPrevented, key } = event;

    if (defaultPrevented) {
      return;
    }

    if (key === "Escape") {
      this.closeCalciteDropdown();
      event.preventDefault();
      return;
    }

    if (this.open && event.shiftKey && key === "Tab") {
      this.closeCalciteDropdown();
      event.preventDefault();
      return;
    }

    if (isActivationKey(key)) {
      this.toggleDropdown();
      event.preventDefault();
    } else if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      this.focusLastDropdownItem = key === "ArrowUp";
      this.open = true;
    }
  }

  private updateSelectedItems(): void {
    this.selectedItems = this.items.filter((item) => item.selected);
  }

  private getMaxScrollerHeight(): number {
    const { maxItems, items } = this;

    return items.length >= maxItems && maxItems > 0
      ? this.getYDistance(this.scrollerEl, items[maxItems - 1])
      : 0;
  }

  private getYDistance(parent: HTMLElement, child: HTMLElement): number {
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    return childRect.bottom - parentRect.top;
  }

  private closeCalciteDropdown(focusTrigger = true) {
    this.open = false;

    if (focusTrigger) {
      focusElement(this.triggers[0]);
    }
  }

  private focusOnFirstActiveOrDefaultItem(): void {
    const selectedItem = this.getTraversableItems().find((item) => item.selected);
    const target: DropdownItem["el"] =
      selectedItem ||
      (this.focusLastDropdownItem ? this.items[this.items.length - 1] : this.items[0]);

    this.focusLastDropdownItem = false;

    if (!target) {
      return;
    }

    focusElement(target);
  }

  private toggleDropdown() {
    this.open = !this.open;
  }

  private updateTabIndexOfItems(target: DropdownItem["el"]): void {
    this.items.forEach((item: DropdownItem["el"]) => {
      item.tabIndex = target !== item ? -1 : 0;
    });
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { open, guid } = this;
    return (
      <InteractiveContainer disabled={this.disabled}>
        <div
          class="calcite-trigger-container"
          id={`${guid}-menubutton`}
          onClick={this.toggleDropdown}
          onKeyDown={this.keyDownHandler}
          ref={this.setReferenceEl}
        >
          <slot
            aria-controls={`${guid}-menu`}
            ariaExpanded={open}
            ariaHasPopup="menu"
            name={SLOTS.dropdownTrigger}
            onSlotChange={this.updateTriggers}
          />
        </div>
        <div
          ariaHidden={!open}
          class={{
            [CSS.wrapper]: true,
            [getDimensionClass("width", this.width, this.widthScale)]: !!(
              this.width || this.widthScale
            ),
          }}
          ref={this.setFloatingEl}
        >
          <div
            aria-labelledby={`${guid}-menubutton`}
            class={{
              [CSS.content]: true,
              [FloatingCSS.animation]: true,
              [FloatingCSS.animationActive]: open,
            }}
            id={`${guid}-menu`}
            ref={this.setScrollerAndTransitionEl}
            role="menu"
          >
            <slot onSlotChange={this.updateGroups} />
          </div>
        </div>
      </InteractiveContainer>
    );
  }

  // #endregion
}
