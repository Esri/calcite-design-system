import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import { getSlotted } from "../../utils/dom";

@Component({
  tag: "calcite-nav-menu",
  styleUrl: "nav-menu.scss",
  shadow: true
})
//--------------------------------------------------------------------------
//
//  Element
//
//--------------------------------------------------------------------------
export class CalciteNavMenu {
  @Element() el: HTMLCalciteNavMenuElement;

  @Prop({ mutable: true }) collapsed?;

  @Prop({ mutable: true }) inactive = false;

  @Prop({ mutable: true, reflect: true }) disableCollapse?;

  // todo evaluate slotted content and determine if it is a nav menu item, then limit # rendered when auto-collapsing based on width of parent
  @Prop({ mutable: true }) minCollapsedItems?;

  @Prop({ reflect: true }) layout?: "horizontal" | "vertical";

  @State() childNavMenuItems?: HTMLCalciteNavMenuItemElement[];

  @State() overflowedNavMenuItems?: HTMLCalciteNavMenuItemElement[] = [];

  private overflowMenuItem: HTMLCalciteNavMenuItemElement;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  // todo - shell prevent double border like shell panel when in shell header slot

  connectedCallback() {
    this.childNavMenuItems = getSlotted(this.el, "", {
      all: true,
      matches: "calcite-nav-menu-item"
    }) as HTMLCalciteNavMenuItemElement[];

    // todo determine indentation level to support fly out
    // ensure any items slotted as dropdown menu children are vertical mode
    this.childNavMenuItems.map((el: HTMLCalciteNavMenuItemElement) => {
      el.layout = this.layout;
    });
  }

  render() {
    return (
      <Host>
        <slot />
        {this.overflowedNavMenuItems.length > 0 && (
          <calcite-nav-menu-item
            ref={(el) => (this.overflowMenuItem = el)}
            icon-start="ellipsis"
            title="overflow-items"
          />
        )}
      </Host>
    );
  }
}
