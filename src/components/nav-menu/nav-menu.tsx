import { Component, Element, h, Host, Prop } from "@stencil/core";

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

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <slot />
        <div class="overflow-temp">
          <slot name="overflow-nav-items" />
        </div>
      </Host>
    );
  }
}
