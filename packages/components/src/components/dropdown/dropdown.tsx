// @ts-strict-ignore
import { PropertyValues } from "lit";
import { createEvent, h, JsxNode, LitElement, method, property } from "@arcgis/lumina";
import { useDirection } from "@arcgis/lumina/controllers";
import { nextFrame } from "../../utils/dom";
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
import { isActivationKey } from "../../utils/key";
import { createObserver, updateRefObserver } from "../../utils/observers";
import { toggleOpenClose } from "../../utils/openCloseComponent";
import { getDimensionClass } from "../../utils/dynamicClasses";
import { RequestedItem } from "../dropdown-group/interfaces";
import { Scale, Width } from "../interfaces";
import type { DropdownItem } from "../dropdown-item/dropdown-item";
import type { DropdownGroup } from "../dropdown-group/dropdown-group";
import { useSetFocus } from "../../controllers/useSetFocus";
import { useInteractive } from "../../controllers/useInteractive";
import { useTopLayer } from "../../controllers/useTopLayer";
import { CSS, SLOTS } from "./resources";
import { styles } from "./dropdown.scss";

declare global {
  interface DeclareElements {
    "calcite-dropdown": Dropdown;
  }
}

/**
 * @slot - A slot for adding `calcite-dropdown-group` elements. Every `calcite-dropdown-item` must have a parent `calcite-dropdown-group`, even if the `groupTitle` property is not set.
 * @slot trigger - A slot for the element that triggers the component.
 */
export class Dropdown extends LitElement implements FloatingUIComponent {
  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private direction = useDirection();

  private filteredFlipPlacements: FlipPlacement[];

  floatingEl: HTMLDivElement;

  private focusLastDropdownItem = false;

  private activeItemIndex = -1;

  private activeDescendantElement: DropdownItem["el"] = null;

  private groups: DropdownGroup["el"][] = [];

  private items: DropdownItem["el"][] = [];

  private mutationObserver = createObserver("mutation", () => this.updateItems());

  transitionProp = "opacity" as const;

  referenceEl: HTMLDivElement;

  private resizeObserver = createObserver("resize", (entries) =>
    this.resizeObserverCallback(entries),
  );

  private scrollerEl: HTMLDivElement;

  transitionEl: HTMLDivElement;

  private focusSetter = useSetFocus<this>()(this);

  private interactiveContainer = useInteractive(this);

  private topLayer = useTopLayer<this>({
    target: () => this.floatingEl,
  })(this);

  //#endregion

  //#region Public Properties

  /**
   * When `true`, the component will remain open after a selection is made.
   *
   * If the `selectionMode` of the selected `calcite-dropdown-item`'s containing `calcite-dropdown-group` is `"none"`, the component will always close.
   */
  @property({ reflect: true }) closeOnSelectDisabled = false;

  /** When `true`, prevents interaction and decreases the component's opacity. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the component's fallback `placement` for slotted `calcite-dropdown-item`s when their initial or specified `placement` has insufficient space available. */
  @property() flipPlacements: FlipPlacement[];

  /**
   * Specifies the maximum number of `calcite-dropdown-item`s to display before showing a scrollbar.
   * Value must be greater than `0`, and does not include `groupTitle`s from `calcite-dropdown-group`.
   */
  @property({ reflect: true }) maxItems = 0;

  /**
   * Specifies the distance to position the component away from the `referenceElement`.
   */
  @property({ type: Number, reflect: true }) offsetDistance = 0;

  /** Specifies the distance to position the component along the `referenceElement`. */
  @property({ reflect: true }) offsetSkidding = 0;

  /** When `true`, displays and positions the component. */
  @property({ reflect: true }) open = false;

  /**
   * Specifies the type of positioning to use for overlaid content, where:
   *
   * `"absolute"` works for most cases - positioning the component inside of overflowing parent containers, which affects the container's layout, and
   *
   * `"fixed"` is used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines the component's placement relative to the container element.
   */
  @property({ reflect: true }) placement: MenuPlacement = defaultMenuPlacement;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * The component's selected items.
   *
   * @readonly
   */
  @property() selectedItems: DropdownItem["el"][] = [];

  /**
   * When `true` and the component is `open`, disables top layer placement.
   *
   * Only set this if you need complex z-index control or if top layer placement causes conflicts with third-party components.
   *
   * @mdn [Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

  /** Specifies the type of action on the container element to open the component. */
  @property({ reflect: true }) type: "hover" | "click" = "click";

  /**
   * Specifies the component's width.
   *
   * @deprecated in v3.0.0, removal target v6.0.0 - Use the `width` property instead.
   */
  @property({ reflect: true }) widthScale: Scale;

  /** Specifies the component's width. */
  @property({ reflect: true }) width: Extract<Width, Scale>;

  //#endregion

  //#region Public Methods

  /**
   * Updates the component's position.
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
        direction: this.direction,
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

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.referenceEl, options);
  }

  //#endregion

  //#region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteDropdownBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteDropdownBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteDropdownClose = createEvent({ cancelable: false });

  /** Fires when the component is opened and animation is complete. */
  calciteDropdownOpen = createEvent({ cancelable: false });

  /** Fires when a `calcite-dropdown-item`'s selection changes. */
  calciteDropdownSelect = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    this.listenOn(window, "click", this.closeCalciteDropdownOnClick);
    this.listen("calciteInternalDropdownCloseRequest", this.closeCalciteDropdownOnEvent);
    this.listenOn(window, "calciteDropdownOpen", this.closeCalciteDropdownOnOpenEvent);
    this.listen("pointerenter", this.pointerEnterHandler);
    this.listen("pointerleave", this.pointerLeaveHandler);
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
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
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

  loaded(): void {
    this.updateSelectedItems();
    connectFloatingUI(this);
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    disconnectFloatingUI(this);
  }

  //#endregion

  //#region Private Methods

  private openHandler(): void {
    if (this.disabled) {
      return;
    }

    toggleOpenClose(this);
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

    this.closeCalciteDropdown();
  }

  private closeCalciteDropdownOnEvent(event: Event): void {
    this.closeCalciteDropdown();
    event.stopPropagation();
  }

  private closeCalciteDropdownOnOpenEvent(event: Event): void {
    if (event.composedPath().includes(this.el)) {
      return;
    }

    this.closeCalciteDropdown();
  }

  private pointerEnterHandler(): void {
    if (this.disabled || this.type !== "hover") {
      return;
    }

    this.open = true;
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

  private async handleItemSelect(event: CustomEvent<RequestedItem>): Promise<void> {
    this.updateSelectedItems();
    this.syncActiveItemFromTraversableItems();
    event.stopPropagation();
    this.calciteDropdownSelect.emit();
    await this.setFocus();
    if (!this.closeOnSelectDisabled) {
      this.closeCalciteDropdown();
    }
  }

  private setFilteredPlacements(): void {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterValidFlipPlacements(flipPlacements, el)
      : null;
  }

  private updateItems(): void {
    this.items = this.groups
      .map((group) => Array.from(group?.querySelectorAll("calcite-dropdown-item")))
      .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);

    this.updateSelectedItems();
    this.syncActiveItemFromTraversableItems();

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
    entries.forEach(({ target }) => {
      if (target === this.referenceEl) {
        this.setDropdownWidth();
      } else if (target === this.scrollerEl) {
        this.setMaxScrollerHeight();
      }
    });
  }

  private setDropdownWidth(): void {
    const { referenceEl, scrollerEl } = this;

    if (!scrollerEl || !referenceEl) {
      return;
    }

    scrollerEl.style.minWidth = `${referenceEl.clientWidth}px`;
  }

  private setMaxScrollerHeight(): void {
    const { maxItems, items, scrollerEl } = this;

    if (!scrollerEl) {
      return;
    }

    const maxScrollerHeight =
      items.length >= maxItems && maxItems > 0
        ? this.getYDistanceFromScroller(items.at(maxItems - 1))
        : 0;
    scrollerEl.style.maxBlockSize = maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "";
    this.reposition(true);
  }

  private setScrollerAndTransitionEl(el: HTMLDivElement): void {
    updateRefObserver(this.resizeObserver, this.scrollerEl, el);
    this.scrollerEl = el;
    this.transitionEl = el;
  }

  onBeforeOpen(): void {
    this.setInitialActiveItem();
    this.calciteDropdownBeforeOpen.emit();
    this.topLayer.show();
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
    this.topLayer.hide();
  }

  private setReferenceEl(el: HTMLDivElement): void {
    updateRefObserver(this.resizeObserver, this.referenceEl, el);
    this.referenceEl = el;

    if (this.referenceEl) {
      this.referenceEl.ariaActiveDescendantElement = this.activeDescendantElement;
    }

    connectFloatingUI(this);
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

    if (!this.open && isActivationKey(key)) {
      this.open = true;
      event.preventDefault();
      return;
    }

    if (!this.open && (key === "ArrowDown" || key === "ArrowUp")) {
      event.preventDefault();
      this.focusLastDropdownItem = key === "ArrowUp";
      this.open = true;
      return;
    }

    if (!this.open) {
      return;
    }

    if (key === "Tab") {
      this.closeCalciteDropdown();
      return;
    }

    if (key === "ArrowDown") {
      event.preventDefault();
      this.navigateActiveItem("next");
      return;
    }

    if (key === "ArrowUp") {
      event.preventDefault();
      this.navigateActiveItem("previous");
      return;
    }

    if (key === "Home") {
      event.preventDefault();
      this.navigateActiveItem("first");
      return;
    }

    if (key === "End") {
      event.preventDefault();
      this.navigateActiveItem("last");
      return;
    }

    if (isActivationKey(key)) {
      event.preventDefault();
      this.activateActiveItem();
    }
  }

  private updateSelectedItems(): void {
    this.selectedItems = this.items.filter((item) => item.selected);
  }

  private getYDistanceFromScroller(last: HTMLElement): number {
    const style = last.getBoundingClientRect();
    return last.offsetTop + style.height;
  }

  private closeCalciteDropdown(): void {
    this.open = false;
    this.setActiveItemByIndex(-1);
  }

  private async setInitialActiveItem(): Promise<void> {
    const selectedItem = this.getTraversableItems().find((item) => item.selected);
    const traversableItems = this.getTraversableItems();
    const target: DropdownItem["el"] =
      selectedItem || (this.focusLastDropdownItem ? traversableItems.at(-1) : traversableItems[0]);

    this.focusLastDropdownItem = false;

    if (!target) {
      this.setActiveItemByIndex(-1);
      return;
    }

    const targetIndex = traversableItems.findIndex((item) => item === target);
    this.setActiveItemByIndex(targetIndex);

    await this.scrollActiveItemIntoView(target);
  }

  private syncActiveItemFromTraversableItems(): void {
    const traversableItems = this.getTraversableItems();

    if (!traversableItems.length) {
      this.setActiveItemByIndex(-1);
      return;
    }

    if (this.activeItemIndex < 0 || this.activeItemIndex >= traversableItems.length) {
      this.setActiveItemByIndex(0);
      return;
    }

    this.updateActiveDescendantElement(traversableItems[this.activeItemIndex]);
  }

  private setActiveItemByIndex(index: number): void {
    this.activeItemIndex = index;
    const traversableItems = this.getTraversableItems();
    const activeItem = index >= 0 ? traversableItems[index] : null;

    this.updateActiveDescendantElement(activeItem);
  }

  private updateActiveDescendantElement(activeItem: DropdownItem["el"]): void {
    this.items.forEach((item) => {
      item.activeDescendant = item === activeItem;
    });

    this.activeDescendantElement = activeItem || null;

    if (this.referenceEl) {
      this.referenceEl.ariaActiveDescendantElement = this.activeDescendantElement;
    }
  }

  private navigateActiveItem(direction: "next" | "previous" | "first" | "last"): void {
    const traversableItems = this.getTraversableItems();

    if (!traversableItems.length) {
      return;
    }

    const totalItems = traversableItems.length;
    let index = this.activeItemIndex;

    if (index < 0 || index >= totalItems) {
      index = direction === "previous" || direction === "last" ? totalItems - 1 : 0;
    } else if (direction === "next") {
      index = (index + 1) % totalItems;
    } else if (direction === "previous") {
      index = (index - 1 + totalItems) % totalItems;
    } else if (direction === "first") {
      index = 0;
    } else if (direction === "last") {
      index = totalItems - 1;
    }

    const activeItem = traversableItems[index];
    this.setActiveItemByIndex(index);
    this.scrollActiveItemIntoView(activeItem);
  }

  private async scrollActiveItemIntoView(target: DropdownItem["el"]): Promise<void> {
    if (!target) {
      return;
    }

    // ensure element is rendered/visible before focus or scrollIntoView
    // https://github.com/Esri/calcite-design-system/issues/10703 should help improve this
    await this.updateComplete;
    await nextFrame();
    await nextFrame();

    target.scrollIntoView({ block: "nearest" });
  }

  private activateActiveItem(): void {
    const traversableItems = this.getTraversableItems();
    const activeItem = traversableItems[this.activeItemIndex] || traversableItems[0];

    if (!activeItem) {
      return;
    }

    this.setActiveItemByIndex(traversableItems.findIndex((item) => item === activeItem));
    activeItem.activateItem();
  }

  private openHoverDropdown(): void {
    if (this.open || this.disabled || this.type !== "hover") {
      return;
    }

    this.open = true;
  }

  //#endregion
  private closeHoverDropdown(event: FocusEvent): void {
    if (
      !this.open ||
      this.disabled ||
      this.type !== "hover" ||
      event.relatedTarget === this.referenceEl ||
      event.composedPath().includes(this.el)
    ) {
      return;
    }

    this.open = false;
  }

  private toggleClickDropdown(): void {
    if (this.disabled || this.type !== "click") {
      return;
    }

    this.open = !this.open;
  }

  //#region Rendering

  override render(): JsxNode {
    const { open } = this;
    return (
      <this.interactiveContainer disabled={this.disabled}>
        <div
          class={CSS.triggerContainer}
          onClick={this.toggleClickDropdown}
          onFocusIn={this.openHoverDropdown}
          onFocusOut={this.closeHoverDropdown}
          onKeyDown={this.keyDownHandler}
          ref={this.setReferenceEl}
        >
          <slot
            ariaControlsElements={this.scrollerEl ? [this.scrollerEl] : undefined}
            ariaExpanded={open}
            ariaHasPopup="menu"
            name={SLOTS.trigger}
          />
        </div>
        <div
          class={{
            [CSS.wrapper]: true,
            [getDimensionClass("width", this.width, this.widthScale)]: !!(
              this.width || this.widthScale
            ),
          }}
          inert={!open}
          popover="manual"
          ref={this.setFloatingEl}
        >
          <div
            ariaLabelledByElements={this.referenceEl ? [this.referenceEl] : undefined}
            class={{
              [CSS.content]: true,
              [FloatingCSS.animation]: true,
              [FloatingCSS.animationActive]: open,
            }}
            ref={this.setScrollerAndTransitionEl}
            role="menu"
          >
            <slot onSlotChange={this.updateGroups} />
          </div>
        </div>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
