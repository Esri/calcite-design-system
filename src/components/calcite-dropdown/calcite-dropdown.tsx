import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State
} from "@stencil/core";
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

  @State() active: boolean = false;

  /** specify the alignment of dropdrown, defaults to left */
  @Prop({ mutable: true, reflect: true }) alignment:
    | "left"
    | "right"
    | "center" = "left";

  /** specify the alignment of dropdrown, defaults to left */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

  /** specify the scale of dropdrown, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

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
  }

  componentWillUpdate() {
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
        switch (e.keyCode) {
          case SPACE:
          case ENTER:
            this.openCalciteDropdown();
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

  @Listen("calciteDropdownItemKeyEvent") calciteDropdownItemKeyEvent(
    item: CustomEvent
  ) {
    let e = item.detail.item;
    let isFirstItem = this.itemIndex(e.target) === 0;
    let isLastItem = this.itemIndex(e.target) === this.items.length - 1;
    e.preventDefault();
    switch (e.keyCode) {
      case TAB:
        if (isLastItem && !e.shiftKey) this.closeCalciteDropdown();
        else if (isFirstItem && e.shiftKey) this.closeCalciteDropdown();
        else if (e.shiftKey) this.focusPrevItem(e.target);
        else this.focusNextItem(e.target);
        break;
      case DOWN:
        this.focusNextItem(e.target);
        break;
      case UP:
        this.focusPrevItem(e.target);
        break;
      case HOME:
        this.focusFirstItem();
        break;
      case END:
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

  /** keep track of whether the groups have been sorted so we don't re-sort */
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
    const focusableItem = this.getFocusableElement(firstItem);
    focusableItem.focus();
  }

  private focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    const focusableItem = this.getFocusableElement(lastItem);
    focusableItem.focus();
  }

  private focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.items[index + 1] || this.items[0];
    const focusableItem = this.getFocusableElement(nextItem);
    focusableItem.focus();
  }

  private focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    const focusableItem = this.getFocusableElement(prevItem);
    focusableItem.focus();
  }

  private itemIndex(e) {
    return this.items.indexOf(e);
  }

  private getFocusableElement(item) {
    return item.attributes.islink ? item.shadowRoot.querySelector("a") : item;
  }

  private openCalciteDropdown() {
    this.active = !this.active;
    // time for animation
    setTimeout(() => this.focusFirstItem(), 50);
  }

  private sortItems = (items: any[]): any[] =>
    items
      .sort((a, b) => a.position - b.position)
      .concat.apply([], this.items.map(item => item.items));
}
