import { Component, Element, h, Host, Listen, Prop } from "@stencil/core";
import { focusElement } from "../../utils/dom";
import { GroupRegistration } from "../../interfaces/Dropdown";
import { getKey } from "../../utils/key";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-dropdown",
  styleUrl: "calcite-dropdown.scss",
  shadow: true,
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

  /** specify the alignment of dropdown, defaults to start */
  @Prop({ mutable: true, reflect: true }) alignment:
    | "start"
    | "center"
    | "end" = "start";

  /** specify the max items to display before showing the scroller, must be greater than 0 **/
  @Prop() maxItems: number = 0;

  /** specify the theme of the dropdown, defaults to light */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark";

  /** specify the scale of dropdown, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify the width of dropdown, defaults to m */
  @Prop({ mutable: true, reflect: true }) width: "s" | "m" | "l" = "m";

  /** specify whether the dropdown is opened by hover or click of the trigger element */
  @Prop({ mutable: true, reflect: true }) type: "hover" | "click" = "click";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // validate props
    let alignment = ["start", "center", "end"];
    if (!alignment.includes(this.alignment)) this.alignment = "start";

    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let width = ["s", "m", "l"];
    if (!width.includes(this.width)) this.width = "m";

    let type = ["hover", "click"];
    if (!type.includes(this.type)) this.type = "hover";
  }

  componentDidLoad() {
    this.trigger = this.el.querySelector(
      "[slot=dropdown-trigger]"
    ) as HTMLSlotElement;

    if (!this.sorted) {
      const groups = this.items.sort(
        (a, b) => a.position - b.position
      ) as GroupRegistration[];

      this.maxScrollerHeight = this.getMaxScrollerHeight(groups);

      this.items = groups.reduce(
        (items, group) => [...items, ...group.items],
        []
      );

      this.sorted = true;
    }
  }

  render() {
    const { maxScrollerHeight } = this;
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>
        <slot
          name="dropdown-trigger"
          aria-haspopup="true"
          aria-expanded={this.active.toString()}
        />
        <div
          class="calcite-dropdown-wrapper"
          role="menu"
          style={{
            maxHeight: maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "",
          }}
        >
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
    if (e.target === this.trigger || this.trigger.contains(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      this.openCalciteDropdown();
    }
  }

  @Listen("click", { target: "window" }) closeCalciteDropdownOnClick(e) {
    if (this.active && e.target.offsetParent !== this.el)
      this.closeCalciteDropdown();
  }

  @Listen("closeCalciteDropdown") closeCalciteDropdownOnEvent() {
    this.closeCalciteDropdown();
  }

  @Listen("keydown") keyDownHandler(e) {
    const key = getKey(e.key);
    if (e.target === this.trigger || this.trigger.contains(e.target)) {
      if (
        e.target.nodeName !== "BUTTON" &&
        e.target.nodeName !== "CALCITE-BUTTON"
      ) {
        switch (key) {
          case " ":
          case "Enter":
            this.openCalciteDropdown();
            break;
          case "Escape":
            this.closeCalciteDropdown();
            break;
        }
      } else if (key === "Escape" || (e.shiftKey && key === "Tab")) {
        this.closeCalciteDropdown();
      }
    }
  }

  @Listen("mouseenter") mouseoverHandler() {
    if (this.type === "hover") {
      this.openCalciteDropdown();
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
    switch (getKey(e.key)) {
      case "Tab":
        if (isLastItem && !e.shiftKey) this.closeCalciteDropdown();
        else if (isFirstItem && e.shiftKey) this.closeCalciteDropdown();
        else if (e.shiftKey) this.focusPrevItem(itemToFocus);
        else this.focusNextItem(itemToFocus);
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
  }

  @Listen("registerCalciteDropdownGroup") registerCalciteDropdownGroup({
    detail: { items, position, titleEl },
  }: CustomEvent<GroupRegistration>) {
    this.items.push({
      items: items,
      position: position,
      titleEl,
    });
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

  /** trigger element */
  private trigger: HTMLSlotElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getMaxScrollerHeight(groups: GroupRegistration[]): number {
    const { maxItems } = this;
    let itemsToProcess = 0;
    let maxScrollerHeight = 0;

    groups.forEach((group) => {
      if (maxItems > 0 && itemsToProcess < maxItems) {
        maxScrollerHeight += group?.titleEl?.offsetHeight || 0;

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
    this.active = false;
    this.trigger.focus();
  }

  private focusOnFirstActiveOrFirstItem(): void {
    this.getFocusableElement(
      this.items.find((item) => item.active) || this.items[0]
    );
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
    this.active = !this.active;
    const animationDelayInMs = 50;

    if (this.active) {
      setTimeout(
        () => this.focusOnFirstActiveOrFirstItem(),
        animationDelayInMs
      );
    }
  }
}
