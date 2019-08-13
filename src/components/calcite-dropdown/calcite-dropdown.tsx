import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { guid } from "../../utils/guid";

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

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  @State() active: boolean = false;

  /** specify the alignment of dropdrown, defaults to left */
  @Prop({ mutable: true, reflect: true }) alignment:
    | "left"
    | "right"
    | "center" = "left";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // validate props
    let alignment = ["left", "right", "center"];
    if (!alignment.includes(this.alignment)) this.alignment = "left";
  }

  componentWillUpdate() {
    if (!this.sorted) this.sortItems();
  }

  render() {
    const dir = getElementDir(this.el);
    const expanded = this.active ? "true" : "false";
    return (
      <Host dir={dir} active={!!this.active} id={this.dropdownId}>
        <slot
          name="dropdown-trigger"
          aria-haspopup="true"
          aria-expanded={expanded}
        ></slot>
        <div class="calcite-dropdown-wrapper" role="menu">
          <slot />
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") openDropdown(e) {
    if (e.target.slot === "dropdown-trigger") {
      this.openCalciteDropdown();
    }
  }

  @Listen("click", { target: "window" }) closeCalciteDropdownOnClick(e) {
    if (this.active && e.target.offsetParent.id !== this.dropdownId)
      this.closeCalciteDropdown();
  }

  @Listen("closeCalciteDropdown") closeCalciteDropdownOnEvent() {
    this.closeCalciteDropdown();
  }

  @Listen("keydown") keyDownHandler(e) {
    if (e.target.slot === "dropdown-trigger") {
      if (
        e.target.nodeName !== "BUTTON" &&
        e.target.nodeName !== "CALCITE-BUTTON"
      ) {
        switch (e.key) {
          case " ":
          case "Enter":
            this.openCalciteDropdown();
            break;
          case "Escape":
            this.closeCalciteDropdown();
            break;
        }
      } else if (e.key === "Escape" || (e.shiftKey && e.key === "Tab")) {
        this.closeCalciteDropdown();
      }
    }
  }

  @Listen("calciteDropdownItemKeyEvent") calciteDropdownItemKeyEvent(
    item: CustomEvent
  ) {
    let e = item.detail.item;
    let isFirstItem = this.itemIndex(e.target) === 0;
    let isLastItem = this.itemIndex(e.target) === this.items.length - 1;
    switch (e.key) {
      case "Tab":
        if (isLastItem && !e.shiftKey) this.closeCalciteDropdown();
        if (isFirstItem && e.shiftKey) this.closeCalciteDropdown();
        break;
      case "ArrowDown":
        this.focusNextItem(e.target);
        break;
      case "ArrowUp":
        this.focusPrevItem(e.target);
        break;
      case "Home":
        this.focusFirstItem();
        break;
      case "End":
        this.focusLastItem();
        break;
    }
  }

  @Listen("registerCalciteDropdownGroup") registerCalciteDropdownGroup(
    e: CustomEvent
  ) {
    const items = {
      items: e.detail.items as HTMLCalciteDropdownItemElement,
      position: e.detail.position
    };
    this.items.push(items);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** created list of dropdown items */
  @State() private items = [];

  @State() private sorted = false;

  /** unique id for dropdown */
  /** @internal */
  private dropdownId = `calcite-dropdown-${guid()}`;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private closeCalciteDropdown() {
    this.active = false;
  }

  private focusFirstItem() {
    const firstItem = this.items[0];
    firstItem.focus();
  }

  private focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    lastItem.focus();
  }

  private focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.items[index + 1] || this.items[0];
    nextItem.focus();
  }

  private focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    prevItem.focus();
  }

  private itemIndex(e) {
    return this.items.indexOf(e);
  }

  private openCalciteDropdown() {
    this.active = !this.active;
    this.focusFirstItem();
  }

  private sortItems() {
    this.items = this.items
      .sort(function(a, b) {
        return a.position - b.position;
      })
      .concat.apply([], this.items.map(item => item.items));
    this.sorted = true;
  }
}
