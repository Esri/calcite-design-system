import { Component, Element, h, Host, Listen, Prop, State } from "@stencil/core";
import { focusElementInGroup, getHost, getRootNode, getSlotted } from "../../utils/dom";

@Component({
  tag: "calcite-nav-menu",
  styleUrl: "nav-menu.scss",
  shadow: true
})
export class CalciteNavMenu {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteNavMenuElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  @Prop({ mutable: true }) collapsed?;

  // disable the automatic collapse based on width
  @Prop({ mutable: true, reflect: true }) disableCollapse?;

  // todo evaluate slotted content and determine if it is a nav menu item, then limit # rendered when auto-collapsing based on width of parent
  @Prop({ mutable: true }) minCollapsedItems?;

  @Prop({ reflect: true }) layout?: "horizontal" | "vertical";

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() childNavMenuItems?: HTMLCalciteNavMenuItemElement[];

  @State() overflowedNavMenuItems?: HTMLCalciteNavMenuItemElement[] = [];

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    const hostElement = getHost(getRootNode(this.el));
    this.childNavMenuItems = getSlotted(hostElement ? hostElement : this.el, "menu-item-dropdown", {
      all: true,
      matches: "calcite-nav-menu-item"
    }) as HTMLCalciteNavMenuItemElement[];

    // todo use slot change
    // this.childNavMenuItems.map((el: HTMLCalciteNavMenuItemElement) => {
    //   el.layout = this.layout;
    // });
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalNavItemKeyEvent")
  calciteInternalNavMenuItemKeyEvent(event: KeyboardEvent): void {
    const target = event.target as HTMLCalciteNavMenuItemElement;
    // console.log(event.detail["key"]);
    console.log(this.el, this.childNavMenuItems);
    switch (event.detail["key"]) {
      case "ArrowDown":
        if (this.layout === "vertical") {
          focusElementInGroup(this.childNavMenuItems, target, "next");
        }
        break;
      case "ArrowUp":
        if (this.layout === "vertical") {
          focusElementInGroup(this.childNavMenuItems, target, "previous");
        }
        break;
      case "ArrowRight":
        if (this.layout === "horizontal") {
          focusElementInGroup(this.childNavMenuItems, target, "next");
        }
        break;
      case "ArrowLeft":
        if (this.layout === "horizontal") {
          focusElementInGroup(this.childNavMenuItems, target, "previous");
        }
        break;
      case "Home":
        if (this.el === target.parentElement) {
          focusElementInGroup(this.childNavMenuItems, target, "first");
        }
        break;
      case "End":
        if (this.el === target.parentElement) {
          focusElementInGroup(this.childNavMenuItems, target, "last");
        }
        break;
      case "Tab":
        console.log("leave?");
        break;
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <ul aria-label="todo" role="menubar">
          <slot />
          {this.overflowedNavMenuItems.length > 0 && (
            <calcite-nav-menu-item icon-start="ellipsis" text="overflow" title="overflow-items" />
          )}
        </ul>
      </Host>
    );
  }
}
