import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  VNode,
  Watch,
  Method
} from "@stencil/core";
import { DropdownPlacement, GroupRegistration, ItemKeyboardEvent } from "./interfaces";
import { getKey } from "../../utils/key";
import { focusElement, getElementDir } from "../../utils/dom";
import {
  createPopper,
  updatePopper,
  CSS as PopperCSS,
  OverlayPositioning
} from "../../utils/popper";
import { StrictModifiers, Instance as Popper } from "@popperjs/core";
import { Scale } from "../interfaces";
import { DefaultDropdownPlacement } from "./resources";
import { CSS_UTILITY } from "../../utils/resources";

@Component({
  tag: "calcite-dropdown",
  styleUrl: "calcite-dropdown.scss",
  shadow: true
})
export class CalciteDropdown {
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

  @Prop({ reflect: true, mutable: true }) active = false;

  @Watch("active")
  activeHandler(): void {
    this.reposition();
  }

  /**
   allow the dropdown to remain open after a selection is made
   if the selection-mode of the selected item's containing group is "none", the dropdown will always close
   */
  @Prop({ reflect: true }) disableCloseOnSelect = false;

  /** is the dropdown disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  /**
   specify the maximum number of calcite-dropdown-items to display before showing the scroller, must be greater than 0 -
   this value does not include groupTitles passed to calcite-dropdown-group
  */
  @Prop() maxItems = 0;

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the dropdown will be positioned relative to the button.
   */
  @Prop({ reflect: true }) placement: DropdownPlacement = DefaultDropdownPlacement;

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

  /** specify the width of dropdown, defaults to m */
  @Prop({ reflect: true }) width: Scale = "m";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.createPopper();
  }

  componentWillLoad(): void {
    // get initially selected items
    this.updateSelectedItems();
  }

  componentDidLoad(): void {
    this.triggers = Array.from(
      this.el.querySelectorAll("[slot=dropdown-trigger]")
    ) as HTMLSlotElement[];

    if (!this.sorted) {
      const groups = this.items.sort((a, b) => a.position - b.position) as GroupRegistration[];
      this.maxScrollerHeight = this.getMaxScrollerHeight(groups);

      this.items = groups.reduce((items, group) => [...items, ...group.items], []);

      this.sorted = true;
    }
  }

  disconnectedCallback(): void {
    this.destroyPopper();
  }

  render(): VNode {
    const { active, maxScrollerHeight } = this;
    const dir = getElementDir(this.el);

    return (
      <Host tabIndex={this.disabled ? -1 : null}>
        <div
          class={{ ["calcite-dropdown-trigger-container"]: true, [CSS_UTILITY.rtl]: dir === "rtl" }}
          onClick={this.openDropdown}
          onKeyDown={this.keyDownHandler}
          ref={this.setReferenceEl}
        >
          <slot aria-expanded={active.toString()} aria-haspopup="true" name="dropdown-trigger" />
        </div>
        <div
          aria-hidden={(!active).toString()}
          class="calcite-dropdown-wrapper"
          ref={this.setMenuEl}
        >
          <div
            class={{
              ["calcite-dropdown-content"]: true,
              [PopperCSS.animation]: true,
              [PopperCSS.animationActive]: active
            }}
            style={{
              maxHeight: maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : ""
            }}
          >
            <slot />
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

  @Method()
  async reposition(): Promise<void> {
    const { popper, menuEl, placement } = this;
    const modifiers = this.getModifiers();

    popper
      ? updatePopper({
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

  /** fires when a dropdown item has been selected or deselected **/
  @Event() calciteDropdownSelect: EventEmitter<void>;

  /** fires when a dropdown has been opened **/
  @Event() calciteDropdownOpen: EventEmitter<void>;

  /** fires when a dropdown has been closed **/
  @Event() calciteDropdownClose: EventEmitter<void>;

  @Listen("click", { target: "window" })
  closeCalciteDropdownOnClick(e: Event): void {
    const target = e.target as HTMLElement;
    if (
      this.active &&
      target.nodeName !== "CALCITE-DROPDOWN-ITEM" &&
      target.nodeName !== "CALCITE-DROPDOWN-GROUP"
    ) {
      this.closeCalciteDropdown();
    }
  }

  @Listen("calciteDropdownCloseRequest")
  closeCalciteDropdownOnEvent(): void {
    this.closeCalciteDropdown();
  }

  @Listen("calciteDropdownOpen", { target: "window" })
  closeCalciteDropdownOnOpenEvent(e: Event): void {
    if (e.target !== this.el) {
      this.active = false;
    }
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

  @Listen("calciteDropdownItemKeyEvent")
  calciteDropdownItemKeyEvent(e: CustomEvent<ItemKeyboardEvent>): void {
    const { keyboardEvent } = e.detail;
    // handle edge
    const target = keyboardEvent.target as HTMLCalciteDropdownItemElement;
    const itemToFocus = target.nodeName !== "A" ? target : target.parentNode;
    const isFirstItem = this.itemIndex(itemToFocus) === 0;
    const isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
    switch (getKey(keyboardEvent.key)) {
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

  @Listen("calciteDropdownItemSelect")
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
  }

  @Listen("calciteDropdownGroupRegister")
  registerCalciteDropdownGroup(e: CustomEvent<GroupRegistration>): void {
    const {
      detail: { items, position, titleEl, separatorEl }
    } = e;

    this.items.push({
      items,
      position,
      titleEl,
      separatorEl
    });

    e.stopPropagation();

    this.updateSelectedItems();
  }
  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** created list of dropdown items */
  private items = [];

  /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
  private maxScrollerHeight = 0;

  /** keep track of whether the groups have been sorted so we don't re-sort */
  private sorted = false;

  /** trigger elements */
  private triggers: HTMLSlotElement[];

  private popper: Popper;

  private menuEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  private dropdownFocusTimeout: number;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  setReferenceEl = (el: HTMLDivElement): void => {
    this.referenceEl = el;
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
      fallbackPlacements: ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    };

    return [flipModifier];
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

  private openDropdown = (e: Event): void => {
    const target = e.target as HTMLSlotElement;
    if (
      this.triggers.includes(target) ||
      this.triggers.some((trigger) => trigger.contains(target))
    ) {
      e.preventDefault();
      e.stopPropagation();
      this.openCalciteDropdown();
    }
  };

  private keyDownHandler = (e: KeyboardEvent): void => {
    const target = e.target as HTMLSlotElement;
    const key = getKey(e.key);
    if (
      this.triggers.includes(target) ||
      this.triggers.some((trigger) => trigger.contains(target))
    ) {
      if (target.nodeName !== "BUTTON" && target.nodeName !== "CALCITE-BUTTON") {
        switch (key) {
          case " ":
          case "Enter":
            this.openCalciteDropdown();
            break;
          case "Escape":
            this.closeCalciteDropdown();
            break;
        }
      } else if (this.active && (key === "Escape" || (e.shiftKey && key === "Tab"))) {
        this.closeCalciteDropdown();
      }
    }
  };

  private updateSelectedItems(): void {
    const items = Array.from(
      this.el.querySelectorAll<HTMLCalciteDropdownItemElement>("calcite-dropdown-item")
    );
    this.selectedItems = items.filter((item) => item.active);
  }

  private getMaxScrollerHeight(groups: GroupRegistration[]): number {
    const { maxItems } = this;
    let itemsToProcess = 0;
    let maxScrollerHeight = 0;

    groups.forEach((group) => {
      if (maxItems > 0 && itemsToProcess < maxItems) {
        maxScrollerHeight += group?.titleEl?.offsetHeight || 0;
        maxScrollerHeight += group?.separatorEl?.offsetHeight || 0;

        group.items.forEach((item) => {
          if (itemsToProcess < maxItems) {
            maxScrollerHeight += item.offsetHeight;
            itemsToProcess += 1;
          }
        });
      }
    });

    return maxScrollerHeight;
  }

  private closeCalciteDropdown() {
    this.calciteDropdownClose.emit();
    this.active = false;
    focusElement(this.triggers[0]);
  }

  private focusOnFirstActiveOrFirstItem(): void {
    this.getFocusableElement(this.items.find((item) => item.active) || this.items[0]);
  }

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

  private openCalciteDropdown() {
    this.calciteDropdownOpen.emit();
    this.active = !this.active;
    const animationDelayInMs = 50;
    clearTimeout(this.dropdownFocusTimeout);

    if (this.active) {
      this.dropdownFocusTimeout = window.setTimeout(
        () => this.focusOnFirstActiveOrFirstItem(),
        animationDelayInMs
      );
    } else {
      this.calciteDropdownClose.emit();
    }
  }
}
