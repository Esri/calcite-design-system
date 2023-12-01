import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  VNode,
  Watch,
} from "@stencil/core";
import { ItemKeyboardEvent } from "./interfaces";

import {
  focusElement,
  focusElementInGroup,
  isPrimaryPointerButton,
  toAriaBoolean,
} from "../../utils/dom";
import {
  connectFloatingUI,
  defaultMenuPlacement,
  disconnectFloatingUI,
  EffectivePlacement,
  filterComputedPlacements,
  FloatingCSS,
  FloatingUIComponent,
  MenuPlacement,
  OverlayPositioning,
  reposition,
} from "../../utils/floating-ui";
import { guid } from "../../utils/guid";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  updateHostInteraction,
} from "../../utils/interactive";
import { isActivationKey } from "../../utils/key";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { createObserver } from "../../utils/observers";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { RequestedItem } from "../dropdown-group/interfaces";
import { Scale } from "../interfaces";
import { SLOTS } from "./resources";

/**
 * @slot - A slot for adding `calcite-dropdown-group` elements. Every `calcite-dropdown-item` must have a parent `calcite-dropdown-group`, even if the `groupTitle` property is not set.
 * @slot trigger - A slot for the element that triggers the `calcite-dropdown`.
 */
@Component({
  tag: "calcite-dropdown",
  styleUrl: "dropdown.scss",
  shadow: {
    delegatesFocus: true,
  },
})
export class Dropdown
  implements InteractiveComponent, LoadableComponent, OpenCloseComponent, FloatingUIComponent
{
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When `true`, displays and positions the component.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(): void {
    if (!this.disabled) {
      onToggleOpenCloseComponent(this);
      return;
    }

    this.open = false;
  }

  /**
   * When `true`, the component will remain open after a selection is made.
   *
   * If the `selectionMode` of the selected `calcite-dropdown-item`'s containing `calcite-dropdown-group` is `"none"`, the component will always close.
   *
   */
  @Prop({ reflect: true }) closeOnSelectDisabled = false;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  handleDisabledChange(value: boolean): void {
    if (!value) {
      this.open = false;
    }
  }

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements: EffectivePlacement[];

  @Watch("flipPlacements")
  flipPlacementsHandler(): void {
    this.setFilteredPlacements();
    this.reposition(true);
  }

  /**
   * Specifies the maximum number of `calcite-dropdown-item`s to display before showing a scroller.
   * Value must be greater than `0`, and does not include `groupTitle`'s from `calcite-dropdown-group`.
   */
  @Prop({ reflect: true }) maxItems = 0;

  @Watch("maxItems")
  maxItemsHandler(): void {
    this.setMaxScrollerHeight();
  }

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  @Watch("overlayPositioning")
  overlayPositioningHandler(): void {
    this.reposition(true);
  }

  /**
   * Determines where the component will be positioned relative to the container element.
   *
   * @default "bottom-start"
   */
  @Prop({ reflect: true }) placement: MenuPlacement = defaultMenuPlacement;

  @Watch("placement")
  placementHandler(): void {
    this.reposition(true);
  }

  /**
   * Specifies the component's selected items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItems: HTMLCalciteDropdownItemElement[] = [];

  /**
   * Specifies the action to open the component from the container element.
   */
  @Prop({ reflect: true }) type: "hover" | "click" = "click";

  /**
   * Specifies the width of the component.
   */
  @Prop({ reflect: true }) width: Scale;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  @Watch("scale")
  handlePropsChange(): void {
    this.updateItems();
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component's first focusable element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.el.focus();
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.setFilteredPlacements();
    this.reposition(true);
    if (this.open) {
      this.openHandler();
      onToggleOpenCloseComponent(this);
    }
    connectInteractive(this);
    this.updateItems();
    connectFloatingUI(this, this.referenceEl, this.floatingEl);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    this.reposition(true);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    disconnectInteractive(this);
    disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
  }

  render(): VNode {
    const { open, guid } = this;
    return (
      <Host>
        <div
          class="calcite-trigger-container"
          id={`${guid}-menubutton`}
          onClick={this.openCalciteDropdown}
          onKeyDown={this.keyDownHandler}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.setReferenceEl}
        >
          <slot
            aria-controls={`${guid}-menu`}
            aria-expanded={toAriaBoolean(open)}
            aria-haspopup="menu"
            name={SLOTS.dropdownTrigger}
            onSlotchange={this.updateTriggers}
          />
        </div>
        <div
          aria-hidden={toAriaBoolean(!open)}
          class="calcite-dropdown-wrapper"
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.setFloatingEl}
        >
          <div
            aria-labelledby={`${guid}-menubutton`}
            class={{
              ["calcite-dropdown-content"]: true,
              [FloatingCSS.animation]: true,
              [FloatingCSS.animationActive]: open,
            }}
            id={`${guid}-menu`}
            role="menu"
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={this.setScrollerAndTransitionEl}
          >
            <slot onSlotchange={this.updateGroups} />
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Updates the position of the component.
   *
   * @param delayed
   */
  @Method()
  async reposition(delayed = false): Promise<void> {
    const { floatingEl, referenceEl, placement, overlayPositioning, filteredFlipPlacements } = this;

    return reposition(
      this,
      {
        floatingEl,
        referenceEl,
        overlayPositioning,
        placement,
        flipPlacements: filteredFlipPlacements,
        type: "menu",
      },
      delayed
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when a `calcite-dropdown-item`'s selection changes. */
  @Event({ cancelable: false }) calciteDropdownSelect: EventEmitter<void>;

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteDropdownBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteDropdownClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteDropdownBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteDropdownOpen: EventEmitter<void>;

  @Listen("pointerdown", { target: "window" })
  closeCalciteDropdownOnClick(event: PointerEvent): void {
    if (
      this.disabled ||
      !isPrimaryPointerButton(event) ||
      !this.open ||
      event.composedPath().includes(this.el)
    ) {
      return;
    }

    this.closeCalciteDropdown(false);
  }

  @Listen("calciteInternalDropdownCloseRequest")
  closeCalciteDropdownOnEvent(event: Event): void {
    this.closeCalciteDropdown();
    event.stopPropagation();
  }

  @Listen("calciteDropdownOpen", { target: "window" })
  closeCalciteDropdownOnOpenEvent(event: Event): void {
    if (event.composedPath().includes(this.el)) {
      return;
    }

    this.open = false;
  }

  @Listen("pointerenter")
  pointerEnterHandler(): void {
    if (this.disabled || this.type !== "hover") {
      return;
    }

    this.openCalciteDropdown();
  }

  @Listen("pointerleave")
  pointerLeaveHandler(): void {
    if (this.disabled || this.type !== "hover") {
      return;
    }

    this.closeCalciteDropdown();
  }

  private getTraversableItems(): HTMLCalciteDropdownItemElement[] {
    return this.items.filter((item) => !item.disabled);
  }

  @Listen("calciteInternalDropdownItemKeyEvent")
  calciteInternalDropdownItemKeyEvent(event: CustomEvent<ItemKeyboardEvent>): void {
    const { keyboardEvent } = event.detail;
    const target = keyboardEvent.target as HTMLCalciteDropdownItemElement;
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

  @Listen("calciteInternalDropdownItemSelect")
  handleItemSelect(event: CustomEvent<RequestedItem>): void {
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

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDropdownElement;

  filteredFlipPlacements: EffectivePlacement[];

  private items: HTMLCalciteDropdownItemElement[] = [];

  private groups: HTMLCalciteDropdownGroupElement[] = [];

  /** trigger elements */
  private triggers: HTMLElement[];

  floatingEl: HTMLDivElement;

  referenceEl: HTMLDivElement;

  private scrollerEl: HTMLDivElement;

  mutationObserver = createObserver("mutation", () => this.updateItems());

  resizeObserver = createObserver("resize", (entries) => this.resizeObserverCallback(entries));

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  guid = `calcite-dropdown-${guid()}`;

  defaultAssignedElements: Element[] = [];

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  slotChangeHandler = (event: Event): void => {
    this.defaultAssignedElements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true,
    });

    this.updateItems();
  };

  setFilteredPlacements = (): void => {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterComputedPlacements(flipPlacements, el)
      : null;
  };

  updateTriggers = (event: Event): void => {
    this.triggers = (event.target as HTMLSlotElement).assignedElements({
      flatten: true,
    }) as HTMLElement[];

    this.reposition(true);
  };

  updateItems = (): void => {
    this.items = this.groups
      .map((group) => Array.from(group?.querySelectorAll("calcite-dropdown-item")))
      .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);

    this.updateSelectedItems();

    this.reposition(true);

    this.items.forEach((item) => (item.scale = this.scale));
  };

  updateGroups = (event: Event): void => {
    const groups = (event.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((el) => el?.matches("calcite-dropdown-group")) as HTMLCalciteDropdownGroupElement[];

    this.groups = groups;

    this.updateItems();
  };

  resizeObserverCallback = (entries: ResizeObserverEntry[]): void => {
    entries.forEach((entry) => {
      const { target } = entry;
      if (target === this.referenceEl) {
        this.setDropdownWidth();
      } else if (target === this.scrollerEl) {
        this.setMaxScrollerHeight();
      }
    });
  };

  setDropdownWidth = (): void => {
    const { referenceEl, scrollerEl } = this;
    const referenceElWidth = referenceEl?.clientWidth;

    if (!referenceElWidth || !scrollerEl) {
      return;
    }

    scrollerEl.style.minWidth = `${referenceElWidth}px`;
  };

  setMaxScrollerHeight = (): void => {
    const { scrollerEl } = this;
    if (!scrollerEl) {
      return;
    }

    this.reposition(true);
    const maxScrollerHeight = this.getMaxScrollerHeight();
    scrollerEl.style.maxHeight = maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "";
    this.reposition(true);
  };

  setScrollerAndTransitionEl = (el: HTMLDivElement): void => {
    this.resizeObserver.observe(el);
    this.scrollerEl = el;

    this.transitionEl = el;
  };

  onBeforeOpen(): void {
    this.reposition(true);
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
    this.reposition(true);
  }

  setReferenceEl = (el: HTMLDivElement): void => {
    this.referenceEl = el;
    connectFloatingUI(this, this.referenceEl, this.floatingEl);
    this.resizeObserver.observe(el);
  };

  setFloatingEl = (el: HTMLDivElement): void => {
    this.floatingEl = el;
    connectFloatingUI(this, this.referenceEl, this.floatingEl);
  };

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (!event.composedPath().includes(this.referenceEl)) {
      return;
    }

    const { defaultPrevented, key } = event;

    if (defaultPrevented) {
      return;
    }

    if (this.open) {
      if (key === "Escape") {
        this.closeCalciteDropdown();
        event.preventDefault();
        return;
      } else if (event.shiftKey && key === "Tab") {
        this.closeCalciteDropdown();
        event.preventDefault();
        return;
      }
    }

    if (isActivationKey(key)) {
      this.openCalciteDropdown();
      event.preventDefault();
    } else if (key === "Escape") {
      this.closeCalciteDropdown();
      event.preventDefault();
    }
  };

  private updateSelectedItems(): void {
    this.selectedItems = this.items.filter((item) => item.selected);
  }

  private getMaxScrollerHeight(): number {
    const { maxItems, items } = this;
    let itemsToProcess = 0;
    let maxScrollerHeight = 0;
    let groupHeaderHeight: number;

    this.groups.forEach((group) => {
      if (maxItems > 0 && itemsToProcess < maxItems) {
        Array.from(group.children).forEach((item: HTMLCalciteDropdownItemElement, index) => {
          if (index === 0) {
            if (isNaN(groupHeaderHeight)) {
              groupHeaderHeight = item.offsetTop;
            }

            maxScrollerHeight += groupHeaderHeight;
          }

          if (itemsToProcess < maxItems) {
            maxScrollerHeight += item.offsetHeight;
            itemsToProcess += 1;
          }
        });
      }
    });

    return items.length > maxItems ? maxScrollerHeight : 0;
  }

  private closeCalciteDropdown(focusTrigger = true) {
    this.open = false;

    if (focusTrigger) {
      focusElement(this.triggers[0]);
    }
  }

  private focusOnFirstActiveOrFirstItem = (): void => {
    this.getFocusableElement(
      this.getTraversableItems().find((item) => item.selected) || this.items[0]
    );
  };

  private getFocusableElement(item): void {
    if (!item) {
      return;
    }

    const target = item.attributes.isLink
      ? item.shadowRoot.querySelector("a")
      : (item as HTMLCalciteDropdownItemElement);

    focusElement(target);
  }

  private toggleOpenEnd = (): void => {
    this.focusOnFirstActiveOrFirstItem();
    this.el.removeEventListener("calciteDropdownOpen", this.toggleOpenEnd);
  };

  private openCalciteDropdown = () => {
    this.open = !this.open;
    if (this.open) {
      this.el.addEventListener("calciteDropdownOpen", this.toggleOpenEnd);
    }
  };

  private updateTabIndexOfItems(target: HTMLCalciteDropdownItemElement): void {
    this.items.forEach((item: HTMLCalciteDropdownItemElement) => {
      item.tabIndex = target !== item ? -1 : 0;
    });
  }
}
