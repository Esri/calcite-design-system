import { Component, Element, h, Host, Listen, Prop } from "@stencil/core";
import {
  UP,
  DOWN,
  TAB,
  ENTER,
  ESCAPE,
  HOME,
  END,
  SPACE
} from "../../utils/keys";
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

  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /** specify the alignment of dropdrown, defaults to left */
  @Prop({ mutable: true, reflect: true }) alignment:
    | "left"
    | "right"
    | "center" = "left";

  /** specify the theme of the dropdown, defaults to light */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

  /** specify the scale of dropdrown, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify whether the dropdown is opened by hover or click of the trigger element */
  @Prop({ mutable: true, reflect: true }) type: "hover" | "click" = "click";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // validate props
    let alignment = ["left", "right", "center"];
    if (!alignment.includes(this.alignment)) this.alignment = "left";

    let theme = ["light", "dark"];
    if (!theme.includes(this.theme)) this.theme = "light";

    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let type = ["hover", "click"];
    if (!type.includes(this.type)) this.type = "hover";
  }

  componentDidLoad() {
    this.trigger = this.el.querySelector(
      "[slot=dropdown-trigger]"
    ) as HTMLSlotElement;
    if (!this.sorted) {
      this.items = this.sortItems(this.items);
      this.sorted = true;
    }
  }

  render() {
    const dir = getElementDir(this.el);
    const expanded = this.active.toString();
    return (
      <Host dir={dir} active={this.active} id={this.dropdownId}>
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
    if (e.target.getAttribute("slot") === "dropdown-trigger") {
      this.openCalciteDropdown(e);
      e.preventDefault();
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
    if (e.target.getAttribute("slot") === "dropdown-trigger") {
      if (
        e.target.nodeName !== "BUTTON" &&
        e.target.nodeName !== "CALCITE-BUTTON"
      ) {
        switch (e.keyCode) {
          case SPACE:
          case ENTER:
            this.openCalciteDropdown(e);
            break;
          case ESCAPE:
            this.closeCalciteDropdown();
            break;
        }
      } else if (e.keyCode === ESCAPE || (e.shiftKey && e.keyCode === TAB)) {
        this.closeCalciteDropdown();
      }
    }
  }

  @Listen("mouseenter") mouseoverHandler(e) {
    if (this.type === "hover") {
      this.openCalciteDropdown(e);
    }
  }

  @Listen("mouseleave") mouseoffHandler() {
    if (this.type === "hover") {
      this.closeCalciteDropdown();
    }
  }

  @Listen("calciteDropdownItemKeyEvent") calciteDropdownItemKeyEvent(
    item: CustomEvent
  ) {
    let e = item.detail.item;
    // handle edge
    let itemToFocus =
      e.target.nodeName !== "A" ? e.target : e.target.parentNode;
    let isFirstItem = this.itemIndex(itemToFocus) === 0;
    let isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
    switch (e.keyCode) {
      case TAB:
        if (isLastItem && !e.shiftKey) this.closeCalciteDropdown();
        else if (isFirstItem && e.shiftKey) this.closeCalciteDropdown();
        else if (e.shiftKey) this.focusPrevItem(itemToFocus);
        else this.focusNextItem(itemToFocus);
        break;
      case DOWN:
        this.focusNextItem(itemToFocus);
        break;
      case UP:
        this.focusPrevItem(itemToFocus);
        break;
      case HOME:
        this.focusFirstItem();
        break;
      case END:
        this.focusLastItem();
        break;
    }
  }

  @Listen("calciteDropdownItemMouseover") calciteDropdownMouseover(
    item: CustomEvent
  ) {
    const itemToFocus = item.detail.target as HTMLCalciteDropdownItemElement;
    itemToFocus.focus();
  }

  @Listen("registerCalciteDropdownGroup") registerCalciteDropdownGroup(
    e: CustomEvent
  ) {
    const items = {
      items: e.detail.items,
      position: e.detail.position
    };
    this.items.push(items);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** trigger element */
  private trigger: HTMLSlotElement;

  /** created list of dropdown items */
  private items = [];

  /** keep track of whether the groups have been sorted so we don't re-sort */
  private sorted = false;

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
    this.trigger.focus();
  }

  private focusFirstItem() {
    const firstItem = this.items[0];
    this.getFocusableElement(firstItem);
  }

  private focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    this.getFocusableElement(lastItem);
  }

  private focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.items[index + 1] || this.items[0];
    this.getFocusableElement(nextItem);
  }

  private focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    this.getFocusableElement(prevItem);
  }

  private itemIndex(e) {
    return this.items.indexOf(e);
  }

  private getFocusableElement(item) {
    const target =
      item && item.attributes.isLink
        ? item.shadowRoot.querySelector("a")
        : (item as HTMLCalciteDropdownItemElement);
    target.focus();
  }

  private openCalciteDropdown(e) {
    this.active = !this.active;
    // if invoked by key, focus item, and accomodate animation time
    if (!e.detail && e.type !== "mouseenter") {
      setTimeout(() => this.focusFirstItem(), 50);
    }
  }

  private sortItems = (items: any[]): any[] =>
    items
      .sort((a, b) => a.position - b.position)
      .concat.apply([], this.items.map(item => item.items));
}
