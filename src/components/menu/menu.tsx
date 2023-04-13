import { Component, Element, h, Host, Listen, Prop, State } from "@stencil/core";
import { focusElementInGroup, getHost, getRootNode, getSlotted } from "../../utils/dom";

@Component({
  tag: "calcite-menu",
  styleUrl: "menu.scss",
  shadow: true
})
export class CalciteMenu {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteMenuElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  @Prop() collapsed: boolean;

  // disable the automatic collapse based on width
  @Prop({ reflect: true }) disableCollapse: boolean;

  /**
   * Specifies the layout of the component.
   */
  @Prop({ reflect: true }) layout: "horizontal" | "vertical" = "horizontal";

  /**
   * Specifies accessible label for the component
   */
  @Prop() label: string;

  /**
   * @internal
   */
  @Prop() role = "menubar";

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() childNavMenuItems?: HTMLCalciteMenuItemElement[];

  @State() overflowedNavMenuItems?: HTMLCalciteMenuItemElement[] = [];

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    // get host of menu which is added for nested submenu and is not part of lightDOM.
    const hostElement = getHost(getRootNode(this.el));

    this.childNavMenuItems = getSlotted(
      hostElement ? hostElement : this.el,
      hostElement ? "menu-item-dropdown" : "",
      {
        all: true,
        matches: "calcite-menu-item"
      }
    ) as HTMLCalciteMenuItemElement[];
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalNavItemKeyEvent")
  calciteInternalNavMenuItemKeyEvent(event: KeyboardEvent): void {
    const target = event.target as HTMLCalciteMenuItemElement;
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
        if (target.open) {
          target.open = false;
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
            <calcite-menu-item icon-start="ellipsis" text="overflow" title="overflow-items" />
          )}
        </ul>
      </Host>
    );
  }
}
