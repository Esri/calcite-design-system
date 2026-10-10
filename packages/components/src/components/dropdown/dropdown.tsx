import { PropertyValues } from "lit";
import {
  createEvent,
  h,
  JsxNode,
  LitElement,
  method,
  property,
  state,
  ToEvents,
} from "@arcgis/lumina";
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
  LogicalPlacement,
  OverlayPositioning,
  ReferenceElement,
  reposition,
} from "../../utils/floating-ui";
import { isActivationKey } from "../../utils/key";
import { createObserver, updateRefObserver } from "../../utils/observers";
import { toggleOpenClose } from "../../utils/openCloseComponent";
import { getDimensionClass } from "../../utils/dynamicClasses";
import { RequestedItem } from "../dropdown-group/types";
import { Scale, Width } from "../types";
import type { DropdownItem } from "../dropdown-item/dropdown-item";
import type { DropdownGroup } from "../dropdown-group/dropdown-group";
import { isDropdownGroup } from "../dropdown-group/resources";
import { useFocusable } from "../../controllers/useFocusable";
import { useRovingTabIndex } from "../../controllers/useRovingTabIndex";
import { useInteractive } from "../../controllers/useInteractive";
import { useTopLayer } from "../../controllers/useTopLayer";
import {
  ReferenceElementComponent,
  ReferenceElementType,
  useReferenceElement,
} from "../../controllers/useReferenceElement";
import { referenceElementManager } from "../../controllers/useReferenceElement/manager";
import { CSS, SLOTS } from "./resources";
import { styles } from "./dropdown.scss";

declare global {
  interface DeclareElements {
    "calcite-dropdown": Dropdown;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the width of the component's wrapper.
     */
    "--calcite-dropdown-width": "*";
    /**
     * Specifies the component's background color.
     */
    "--calcite-dropdown-background-color": "*";
    /**
     * Specifies the maximum height of the component's wrapper.
     */
    "--calcite-dropdown-max-height": "*";
  }
}

interface DropdownSlots {
  /**
   * A slot for adding `calcite-dropdown-group` elements. Every `calcite-dropdown-item` must have a parent `calcite-dropdown-group`, even if the `groupTitle` property is not set.
   */
  "": Node[];
  /**
   * A slot for the element that triggers the component.
   *
   * @deprecated in v5.1.0, removal target v7.0.0 - Use the `referenceElement` property instead.
   */
  trigger: Node[];
}

const manager = referenceElementManager({ click: true, hover: true });

export class Dropdown extends LitElement implements FloatingUIComponent, ReferenceElementComponent {
  //#region Type-only metadata members

  override ["@slots"]!: DropdownSlots;

  //#endregion

  //#region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  //#endregion

  //#region Private Properties

  get referenceElementType(): ReferenceElementType | undefined {
    return this.referenceElement ? this.type : undefined;
  }

  // @ts-expect-error -- updating public type at v6.0.0 (see #14582)
  referenceElementController = useReferenceElement({ manager })(this);

  private direction = useDirection();

  private filteredFlipPlacements?: FlipPlacement[];

  floatingEl?: HTMLDivElement;

  private focusLastDropdownItem = false;

  get autoClose(): true {
    return true;
  }

  private groups: DropdownGroup["el"][] = [];

  private items: DropdownItem["el"][] = [];

  private mutationObserver = createObserver("mutation", () => this.updateItems());

  transitionProp = "opacity" as const;

  private resizeObserver = createObserver("resize", (entries) =>
    this.resizeObserverCallback(entries),
  );

  private scrollerEl?: HTMLDivElement;

  transitionEl: HTMLDivElement | undefined;

  onReferenceElementKeyDown = (event: KeyboardEvent): void => this.keyDownHandler(event);

  private focusSetter = useFocusable<this>()(this);

  private rovingTabIndex = useRovingTabIndex<DropdownItem["el"]>({
    getElements: () => this.items,
    getEntryElement: () => (this.referenceEl instanceof HTMLElement ? this.referenceEl : undefined),
    getTraversableElements: () => this.getTraversableItems(),
    isActive: () => this.open && !this.disabled,
  })(this);

  private interactiveContainer = useInteractive(this);

  private topLayer = useTopLayer<this>({
    target: () => this.floatingEl,
  })(this);

  //#endregion

  //#region State Properties

  @state() referenceEl?: ReferenceElement;

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

  /** @copyDoc */
  @property() flipPlacements?: FlipPlacement[];

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

  /** @copyDoc */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines the component's placement relative to the container element.
   */
  @property({ reflect: true }) placement: LogicalPlacement = defaultMenuPlacement;

  /** @copyDoc */
  // @ts-expect-error -- updating public type at v6.0.0 (see #14582)
  @property() referenceElement: ReferenceElement | string | null;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * The component's selected items.
   *
   * @readonly
   */
  @property() selectedItems: DropdownItem["el"][] = [];

  /**
   * @copyDoc
   *
   * @see [MDN - Top Layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
   */
  @property({ reflect: true }) topLayerDisabled = false;

  /**
   * Specifies the type of action on the container element to open the component.
   *
   * [Deprecated] The `"hover"` value is deprecated in 5.2.0, removal target v7.0.0 - use `"click"` instead.
   */
  @property({ reflect: true }) type: "hover" | "click" = "click";

  /**
   * Specifies the component's width.
   *
   * @deprecated in v3.0.0, removal target v6.0.0 - Use the `width` property instead.
   */
  @property({ reflect: true }) widthScale?: Scale;

  /** Specifies the component's width. */
  @property({ reflect: true }) width?: Extract<Width, Scale>;

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
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(
      () => (this.referenceEl instanceof HTMLElement ? this.referenceEl : this.floatingEl),
      options,
    );
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
    this.listen("pointerenter", this.pointerEnterHandler);
    this.listen("pointerleave", this.pointerLeaveHandler);
    this.listen<ToEvents<DropdownItem>["calciteInternalDropdownItemSelect"]>(
      "calciteInternalDropdownItemSelect",
      this.handleItemSelect,
    );
  }

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, {
      attributeFilter: ["disabled", "hidden", "inert"],
      attributes: true,
      childList: true,
      subtree: true,
    });
    this.setFilteredPlacements();
    this.updateItems();
    connectFloatingUI(this);
  }

  load(): void {
    this.listenOn(document, "click", this.closeCalciteDropdownOnClick);
    this.listenOn(document, "calciteDropdownOpen", this.closeCalciteDropdownOnOpenEvent);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://webgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.handleDisabledChange(this.disabled);
    }

    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
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

    if (changes.has("referenceElement") && !this.referenceElement && this.open) {
      this.topLayer.hide();
    }
  }

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("referenceEl") && this.referenceElementType) {
      this.syncTabStops();
      connectFloatingUI(this);
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
    if (this.disabled && this.open) {
      this.rovingTabIndex.setActiveIndex(-1);
      return;
    }

    toggleOpenClose(this);
    if (!this.open) {
      this.rovingTabIndex.setActiveIndex(-1);
    }
    this.reposition(true);
  }

  private handleDisabledChange(value: boolean): void {
    if (value) {
      this.open = false;
      this.rovingTabIndex.setActiveIndex(-1);
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
    if (
      this.referenceElementType ||
      this.disabled ||
      !this.open ||
      event.composedPath().includes(this.el)
    ) {
      return;
    }

    this.closeCalciteDropdown();
  }

  private closeCalciteDropdownOnOpenEvent(event: Event): void {
    if (this.referenceElementType || event.composedPath().includes(this.el)) {
      return;
    }

    this.closeCalciteDropdown();
  }

  private pointerEnterHandler(): void {
    if (this.referenceElementType || this.disabled || this.type !== "hover") {
      return;
    }

    this.open = true;
  }

  private pointerLeaveHandler(): void {
    if (this.referenceElementType || this.disabled || this.type !== "hover") {
      return;
    }

    this.closeCalciteDropdown();
  }

  private getTraversableItems(): DropdownItem["el"][] {
    return this.items.filter((item) => !item.disabled && !item.closest("[hidden], [inert]"));
  }

  private async handleItemSelect(event: CustomEvent<RequestedItem>): Promise<void> {
    this.updateSelectedItems();
    this.syncActiveItemFromTraversableItems();
    event.stopPropagation();
    this.calciteDropdownSelect.emit();
    if (!this.closeOnSelectDisabled) {
      this.closeCalciteDropdown();
      this.rovingTabIndex.restoreFocus();
    } else {
      const index = this.getTraversableItems().indexOf(event.detail.requestedDropdownItem);
      this.rovingTabIndex.setActiveIndex(index);
      await this.scrollActiveItemIntoView(event.detail.requestedDropdownItem);
    }
  }

  private setFilteredPlacements(): void {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterValidFlipPlacements(flipPlacements, el)
      : undefined;
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
      .filter(isDropdownGroup);

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

    if (!scrollerEl || !(referenceEl instanceof HTMLElement)) {
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
    this.rovingTabIndex.restoreFocusIfWithin();
    this.calciteDropdownBeforeClose.emit();
  }

  onClose(): void {
    this.calciteDropdownClose.emit();
    hideFloatingUI(this);
    this.topLayer.hide();
  }

  private setReferenceEl(el: HTMLDivElement): void {
    const previousReferenceEl =
      this.referenceEl instanceof HTMLElement ? this.referenceEl : undefined;
    const nextReferenceEl = el instanceof HTMLElement ? el : undefined;

    updateRefObserver(this.resizeObserver, previousReferenceEl, nextReferenceEl);

    if (this.referenceElementType || !nextReferenceEl) {
      return;
    }

    this.referenceEl = el;
    this.syncTabStops();

    connectFloatingUI(this);
  }

  private setFloatingEl(el: HTMLDivElement): void {
    this.floatingEl = el;
    connectFloatingUI(this);
  }

  private handleTriggerSlotChange(): void {
    this.syncTabStops();
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (
      this.disabled ||
      (!event.composedPath().includes(this.floatingEl!) &&
        (!(this.referenceEl instanceof HTMLElement) ||
          !event.composedPath().includes(this.referenceEl)))
    ) {
      return;
    }

    const { defaultPrevented, key } = event;

    if (defaultPrevented) {
      return;
    }

    if (this.open && key === "Escape") {
      this.closeCalciteDropdown();
      this.rovingTabIndex.restoreFocus();
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
      this.rovingTabIndex.restoreFocus();
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

  private getYDistanceFromScroller(last: HTMLElement | undefined): number {
    const { scrollerEl } = this;

    if (!last || !scrollerEl) {
      return NaN;
    }

    // we measure relative to the scroller instead of using `offsetTop` because the latter is relative to an ancestor
    // outside of the scroller (`offsetParent` is unreliable across shadow boundaries), which would include the
    // floating-ui open/close animation offset applied to the scroller
    return (
      last.getBoundingClientRect().bottom -
      scrollerEl.getBoundingClientRect().top +
      scrollerEl.scrollTop
    );
  }

  private closeCalciteDropdown(): void {
    this.open = false;
    this.rovingTabIndex.setActiveIndex(-1);
  }

  private async setInitialActiveItem(): Promise<void> {
    const traversableItems = this.getTraversableItems();
    const target: DropdownItem["el"] | undefined = this.focusLastDropdownItem
      ? traversableItems.at(-1)
      : traversableItems[0];

    this.focusLastDropdownItem = false;

    if (!target) {
      this.rovingTabIndex.setActiveIndex(-1);
      return;
    }

    const targetIndex = traversableItems.findIndex((item) => item === target);
    this.rovingTabIndex.setActiveIndex(targetIndex);

    await this.scrollActiveItemIntoView(target);
  }

  private syncActiveItemFromTraversableItems(): void {
    const traversableItems = this.getTraversableItems();
    const previousActiveItem = this.rovingTabIndex.activeElement;

    if (!this.open || !traversableItems.length) {
      this.rovingTabIndex.setActiveIndex(-1);
      if (this.open && previousActiveItem) {
        void this.setFocus();
      }
      return;
    }

    const previousIndex = previousActiveItem ? traversableItems.indexOf(previousActiveItem) : -1;
    this.rovingTabIndex.setActiveIndex(
      previousIndex >= 0
        ? previousIndex
        : Math.min(Math.max(this.rovingTabIndex.activeIndex, 0), traversableItems.length - 1),
    );
    const activeItem = this.rovingTabIndex.activeElement;
    if (previousActiveItem && previousActiveItem !== activeItem && activeItem) {
      void this.scrollActiveItemIntoView(activeItem);
    }
  }

  private syncTabStops(): void {
    this.rovingTabIndex.update(this.items, this.rovingTabIndex.activeElement);
  }

  private handleItemFocus(event: FocusEvent): void {
    const focusedItem = this.getTraversableItems().find((item) =>
      event.composedPath().includes(item),
    );
    if (focusedItem) {
      this.rovingTabIndex.setActiveIndex(this.getTraversableItems().indexOf(focusedItem));
    }
  }

  private navigateActiveItem(direction: "next" | "previous" | "first" | "last"): void {
    const traversableItems = this.getTraversableItems();

    if (!traversableItems.length) {
      return;
    }

    const totalItems = traversableItems.length;
    let index = this.rovingTabIndex.activeIndex;

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
    this.rovingTabIndex.setActiveIndex(index);
    void this.scrollActiveItemIntoView(activeItem);
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

    if (!this.open || this.rovingTabIndex.activeElement !== target || !target.isConnected) {
      return;
    }

    await target.setFocus({ preventScroll: true });
    target.scrollIntoView({ block: "nearest" });
  }

  private activateActiveItem(): void {
    const traversableItems = this.getTraversableItems();
    const activeItem = traversableItems[this.rovingTabIndex.activeIndex] || traversableItems[0];

    if (!activeItem) {
      return;
    }

    this.rovingTabIndex.setActiveIndex(traversableItems.findIndex((item) => item === activeItem));
    activeItem.activateItem();
  }

  private openHoverDropdown(): void {
    if (this.disabled || this.rovingTabIndex.isRestoringFocus || this.type !== "hover") {
      return;
    }

    if (this.open) {
      if (this.rovingTabIndex.activeElement) {
        void this.scrollActiveItemIntoView(this.rovingTabIndex.activeElement);
      }
      return;
    }

    this.open = true;
  }

  private closeHoverDropdown(event: FocusEvent): void {
    if (!this.open || this.disabled || this.type !== "hover") {
      return;
    }
    const relatedTarget = event.relatedTarget as Node | null;
    if (
      relatedTarget &&
      (this.el.contains(relatedTarget) ||
        (this.referenceEl != null &&
          this.referenceEl instanceof HTMLElement &&
          this.referenceEl.contains(relatedTarget)))
    ) {
      return;
    }

    this.closeCalciteDropdown();
  }

  private toggleClickDropdown(): void {
    if (this.disabled || this.type !== "click") {
      return;
    }

    this.open = !this.open;
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { open } = this;
    return (
      <this.interactiveContainer disabled={this.disabled}>
        {!this.referenceElementType ? (
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
              onSlotChange={this.handleTriggerSlotChange}
            />
          </div>
        ) : null}
        <div
          class={{
            [CSS.wrapper]: true,
            [getDimensionClass("width", this.width, this.widthScale)]: !!(
              this.width || this.widthScale
            ),
          }}
          inert={!open}
          onFocusIn={this.handleItemFocus}
          onFocusOut={this.closeHoverDropdown}
          onKeyDown={this.keyDownHandler}
          popover="manual"
          ref={this.setFloatingEl}
        >
          <div
            ariaLabelledByElements={
              this.referenceEl instanceof HTMLElement ? [this.referenceEl] : undefined
            }
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
