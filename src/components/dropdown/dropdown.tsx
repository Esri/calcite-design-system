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
  Watch
} from "@stencil/core";
import { ItemKeyboardEvent } from "./interfaces";

import { focusElement, toAriaBoolean } from "../../utils/dom";
import {
  ComputedPlacement,
  createPopper,
  CSS as PopperCSS,
  OverlayPositioning,
  updatePopper,
  popperMenuComputedPlacements,
  MenuPlacement,
  defaultMenuPlacement,
  filterComputedPlacements
} from "../../utils/popper";
import { Instance as Popper, StrictModifiers } from "@popperjs/core";
import { Scale } from "../interfaces";
import { SLOTS } from "./resources";
import { createObserver } from "../../utils/observers";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { OpenCloseComponent } from "../../utils/openCloseComponent";

/**
 * @slot - A slot for adding `calcite-dropdown-group`s or `calcite-dropdown-item`s.
 * @slot dropdown-trigger - A slot for the element that triggers the dropdown.
 */
@Component({
  tag: "calcite-dropdown",
  styleUrl: "dropdown.scss",
  shadow: true
})
export class Dropdown implements InteractiveComponent, OpenCloseComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteDropdownElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * Opens or closes the dropdown
   *
   * @deprecated use open instead.
   */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** When true, opens the dropdown */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("active")
  @Watch("open")
  activeHandler(): void {
    if (!this.disabled) {
      this.reposition();
      return;
    }

    this.active = false;
    this.open = false;
  }

  /**
   allow the dropdown to remain open after a selection is made
   if the selection-mode of the selected item's containing group is "none", the dropdown will always close
   */
  @Prop({ reflect: true }) disableCloseOnSelect = false;

  /** is the dropdown disabled  */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  handleDisabledChange(value: boolean): void {
    if (!value) {
      this.active = false;
      this.open = false;
    }
  }

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements?: ComputedPlacement[];

  @Watch("flipPlacements")
  flipPlacementsHandler(): void {
    this.setFilteredPlacements();
  }

  /**
   specify the maximum number of calcite-dropdown-items to display before showing the scroller, must be greater than 0 -
   this value does not include groupTitles passed to calcite-dropdown-group
   */
  @Prop() maxItems = 0;

  @Watch("maxItems")
  maxItemsHandler(): void {
    this.setMaxScrollerHeight();
  }

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the dropdown will be positioned relative to the button.
   *
   * @default "bottom-leading"
   */
  @Prop({ reflect: true }) placement: MenuPlacement = defaultMenuPlacement;

  @Watch("placement")
  placementHandler(): void {
    this.reposition();
  }

  /** specify the scale of dropdown, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * **read-only** The currently selected items
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItems: HTMLCalciteDropdownItemElement[] = [];

  /** specify whether the dropdown is opened by hover or click of a trigger element */
  @Prop({ reflect: true }) type: "hover" | "click" = "click";

  /** specify the width of dropdown */
  @Prop({ reflect: true }) width?: Scale;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.createPopper();
    this.setFilteredPlacements();
  }

  componentDidLoad(): void {
    this.reposition();
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.destroyPopper();
    this.scrollerEl?.removeEventListener("transitionstart", this.transitionStartHandler);
  }

  render(): VNode {
    const { active, open } = this;
    return (
      <Host>
        <div
          class="calcite-dropdown-trigger-container"
          onClick={this.openCalciteDropdown}
          onKeyDown={this.keyDownHandler}
          ref={this.setReferenceEl}
        >
          <slot
            aria-expanded={toAriaBoolean(active || open)}
            aria-haspopup="true"
            name={SLOTS.dropdownTrigger}
            onSlotchange={this.updateTriggers}
          />
        </div>
        <div
          aria-hidden={toAriaBoolean(!(active || open))}
          class="calcite-dropdown-wrapper"
          ref={this.setMenuEl}
        >
          <div
            class={{
              ["calcite-dropdown-content"]: true,
              [PopperCSS.animation]: true,
              [PopperCSS.animationActive]: active || open
            }}
            onTransitionEnd={this.transitionEnd}
            ref={this.setScrollerEl}
          >
            <div hidden={!(open || active)}>
              <slot onSlotchange={this.updateGroups} />
            </div>
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

  /** Updates the position of the component. */
  @Method()
  async reposition(): Promise<void> {
    const { popper, menuEl, placement } = this;

    const modifiers = this.getModifiers();

    popper
      ? await updatePopper({
          el: menuEl,
          modifiers,
          placement,
          popper
        })
      : this.createPopper();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** fires when a dropdown item has been selected or deselected */
  @Event() calciteDropdownSelect: EventEmitter<void>;

  /* Fires when the component is requested to be closed and before the closing transition begins. */
  @Event() calciteDropdownBeforeClose: EventEmitter<void>;

  /* Fires when the component is closed and animation is complete. */
  @Event() calciteDropdownClose: EventEmitter<void>;

  /* Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event() calciteDropdownBeforeOpen: EventEmitter<void>;

  /* Fires when the component is open and animation is complete. */
  @Event() calciteDropdownOpen: EventEmitter<void>;

  @Listen("click", { target: "window" })
  closeCalciteDropdownOnClick(e: Event): void {
    const isOpen = !(this.open || this.active);
    if (isOpen || e.composedPath().includes(this.el)) {
      return;
    }

    this.closeCalciteDropdown(false);
  }

  @Listen("calciteInternalDropdownCloseRequest")
  closeCalciteDropdownOnEvent(e: Event): void {
    this.closeCalciteDropdown();
    e.stopPropagation();
  }

  @Listen("calciteDropdownOpen", { target: "window" })
  closeCalciteDropdownOnOpenEvent(e: Event): void {
    if (e.composedPath().includes(this.el)) {
      return;
    }

    this.active = false;
    this.open = false;
  }

  @Listen("mouseenter")
  mouseEnterHandler(): void {
    if (this.type === "hover") {
      this.openCalciteDropdown();
    }
  }

  @Listen("mouseleave")
  mouseLeaveHandler(): void {
    if (this.type === "hover") {
      this.closeCalciteDropdown();
    }
  }

  @Listen("calciteInternalDropdownItemKeyEvent")
  calciteInternalDropdownItemKeyEvent(e: CustomEvent<ItemKeyboardEvent>): void {
    const { keyboardEvent } = e.detail;
    // handle edge
    const target = keyboardEvent.target as HTMLCalciteDropdownItemElement;
    const itemToFocus = target.nodeName !== "A" ? target : target.parentNode;
    const isFirstItem = this.itemIndex(itemToFocus) === 0;
    const isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
    switch (keyboardEvent.key) {
      case "Tab":
        if (isLastItem && !keyboardEvent.shiftKey) {
          this.closeCalciteDropdown();
        } else if (isFirstItem && keyboardEvent.shiftKey) {
          this.closeCalciteDropdown();
        } else if (keyboardEvent.shiftKey) {
          this.focusPrevItem(itemToFocus);
        } else {
          this.focusNextItem(itemToFocus);
        }
        break;
      case "ArrowDown":
        this.focusNextItem(itemToFocus);
        break;
      case "ArrowUp":
        this.focusPrevItem(itemToFocus);
        break;
      case "Home":
        this.focusFirstItem();
        break;
      case "End":
        this.focusLastItem();
        break;
    }

    e.stopPropagation();
  }

  @Listen("calciteInternalDropdownItemSelect")
  handleItemSelect(event: CustomEvent): void {
    this.updateSelectedItems();
    event.stopPropagation();
    this.calciteDropdownSelect.emit();
    if (
      !this.disableCloseOnSelect ||
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

  filteredFlipPlacements: ComputedPlacement[];

  private items: HTMLCalciteDropdownItemElement[] = [];

  private groups: HTMLCalciteDropdownGroupElement[] = [];

  /** trigger elements */
  private triggers: HTMLElement[];

  private popper: Popper;

  private menuEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  private activeTransitionProp = "visibility";

  private scrollerEl: HTMLDivElement;

  mutationObserver = createObserver("mutation", () => this.updateItems());

  resizeObserver = createObserver("resize", (entries) => this.resizeObserverCallback(entries));

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  setFilteredPlacements = (): void => {
    const { el, flipPlacements } = this;

    this.filteredFlipPlacements = flipPlacements
      ? filterComputedPlacements(flipPlacements, el)
      : null;
  };

  updateTriggers = (event: Event): void => {
    this.triggers = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    }) as HTMLElement[];

    this.reposition();
  };

  updateItems = (): void => {
    this.items = this.groups
      .map((group) => Array.from(group?.querySelectorAll("calcite-dropdown-item")))
      .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);

    this.updateSelectedItems();

    this.reposition();
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
    const { active, scrollerEl, open } = this;
    const isOpen = !(active || open);
    if (!scrollerEl || isOpen) {
      return;
    }

    this.reposition();
    const maxScrollerHeight = this.getMaxScrollerHeight();
    scrollerEl.style.maxHeight = maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "";
    this.reposition();
  };

  setScrollerEl = (scrollerEl: HTMLDivElement): void => {
    this.resizeObserver.observe(scrollerEl);
    this.scrollerEl = scrollerEl;
    this.scrollerEl.addEventListener("transitionstart", this.transitionStartHandler);
  };

  transitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === this.activeTransitionProp) {
      this.open || this.active ? this.onOpen() : this.onClose();
    }
  };

  transitionStartHandler = (event: TransitionEvent): void => {
    if (event.propertyName === this.activeTransitionProp) {
      this.open || this.active ? this.onBeforeOpen() : this.onBeforeClose();
    }
  };

  onBeforeOpen(): void {
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
  }

  setReferenceEl = (el: HTMLDivElement): void => {
    this.referenceEl = el;
    this.resizeObserver.observe(el);
  };

  setMenuEl = (el: HTMLDivElement): void => {
    this.menuEl = el;
  };

  getModifiers(): Partial<StrictModifiers>[] {
    const flipModifier: Partial<StrictModifiers> = {
      name: "flip",
      enabled: true
    };

    flipModifier.options = {
      fallbackPlacements: this.filteredFlipPlacements || popperMenuComputedPlacements
    };

    const eventListenerModifier: Partial<StrictModifiers> = {
      name: "eventListeners",
      enabled: this.open || this.active
    };

    return [flipModifier, eventListenerModifier];
  }

  createPopper(): void {
    this.destroyPopper();
    const { menuEl, referenceEl, placement, overlayPositioning } = this;
    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement,
      referenceEl
    });
  }

  destroyPopper(): void {
    const { popper } = this;

    if (popper) {
      popper.destroy();
    }

    this.popper = null;
  }

  private keyDownHandler = (e: KeyboardEvent): void => {
    const target = e.target as HTMLElement;

    if (target !== this.referenceEl) {
      return;
    }

    const key = e.key;

    if ((this.open || this.active) && (key === "Escape" || (e.shiftKey && key === "Tab"))) {
      this.closeCalciteDropdown();
      return;
    }

    switch (key) {
      case " ":
      case "Enter":
        this.openCalciteDropdown();
        break;
      case "Escape":
        this.closeCalciteDropdown();
        break;
    }
  };

  private updateSelectedItems(): void {
    this.selectedItems = this.items.filter((item) => item.active);
  }

  private getMaxScrollerHeight(): number {
    const { maxItems } = this;
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

    return maxScrollerHeight;
  }

  private closeCalciteDropdown(focusTrigger = true) {
    this.active = false;
    this.open = false;

    if (focusTrigger) {
      focusElement(this.triggers[0]);
    }
  }

  private focusOnFirstActiveOrFirstItem = (): void => {
    this.getFocusableElement(this.items.find((item) => item.active) || this.items[0]);
  };

  private focusFirstItem() {
    const firstItem = this.items[0];
    this.getFocusableElement(firstItem);
  }

  private focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    this.getFocusableElement(lastItem);
  }

  private focusNextItem(e): void {
    const index = this.itemIndex(e);
    const nextItem = this.items[index + 1] || this.items[0];
    this.getFocusableElement(nextItem);
  }

  private focusPrevItem(e): void {
    const index = this.itemIndex(e);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    this.getFocusableElement(prevItem);
  }

  private itemIndex(e): number {
    return this.items.indexOf(e);
  }

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
    this.active = !this.active;
    this.open = !this.open;
    if (this.active || this.open) {
      this.el.addEventListener("calciteDropdownOpen", this.toggleOpenEnd);
    }
  };
}
