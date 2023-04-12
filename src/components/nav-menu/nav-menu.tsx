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
  @Prop({ mutable: true }) collapsed: boolean;

  // disable the automatic collapse based on width
  @Prop({ mutable: true, reflect: true }) disableCollapse: boolean;

  /**
   * Specifies the layout of the component.
   */
  @Prop({ reflect: true }) layout: "horizontal" | "vertical" = "horizontal";

  /**
   * Specifies accessible label for the component
   */
  @Prop() label: string;

  // todo evaluate slotted content and determine if it is a nav menu item, then limit # rendered when auto-collapsing based on width of parent
  @Prop({ mutable: true }) minCollapsedItems?;

  /**
   * @internal
   */
  @Prop() role = "menubar";

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
    // get host of nav-menu which is added for nested submenu and is not part of lightDOM.
    const hostElement = getHost(getRootNode(this.el));

    this.childNavMenuItems = getSlotted(
      hostElement ? hostElement : this.el,
      hostElement ? "menu-item-dropdown" : "",
      {
        all: true,
        matches: "calcite-nav-menu-item"
      }
    ) as HTMLCalciteNavMenuItemElement[];
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalNavItemKeyEvent")
  calciteInternalNavMenuItemKeyEvent(event: KeyboardEvent): void {
    const target = event.target as HTMLCalciteNavMenuItemElement;
    event.stopPropagation();
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
      case "Escape":
        if (target.subMenuOpen) {
          target.subMenuOpen = false;
        }
        break;
    }
    event.preventDefault();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <ul aria-label={this.label} role={this.role}>
          <slot />
          {this.overflowedNavMenuItems.length > 0 && (
            <calcite-nav-menu-item icon-start="ellipsis" text="overflow" title="overflow-items" />
          )}
        </ul>
      </Host>
    );
  }
}
