import { Component, Element, h, Host, Listen, Prop, State } from "@stencil/core";
import { focusElement, focusElementInGroup, slotChangeGetAssignedElements } from "../../utils/dom";

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
  @State() childMenuItems: HTMLCalciteMenuItemElement[];

  @State() overflowedNavMenuItems?: HTMLCalciteMenuItemElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInternalNavItemKeyEvent")
  calciteInternalNavMenuItemKeyEvent(event: CustomEvent): void {
    const target = event.target as HTMLCalciteMenuItemElement;
    const subMenuItems = event.detail.children;
    event.stopPropagation();
    switch (event.detail.event.key) {
      case "ArrowDown":
        if (target.layout === "vertical") {
          focusElementInGroup(this.childMenuItems, target, "next");
        } else {
          if (event.detail.isOpen) {
            subMenuItems[0].setFocus();
          }
        }
        break;
      case "ArrowUp":
        if (this.layout === "vertical") {
          focusElementInGroup(this.childMenuItems, target, "previous");
        } else {
          if (event.detail.isOpen) {
            subMenuItems[subMenuItems.length - 1].setFocus();
          }
        }
        break;
      case "ArrowRight":
        if (this.layout === "horizontal") {
          focusElementInGroup(this.childMenuItems, target, "next");
        } else {
          if (event.detail.isOpen) {
            subMenuItems[0].setFocus();
          }
        }
        break;
      case "ArrowLeft":
        if (this.layout === "horizontal") {
          focusElementInGroup(this.childMenuItems, target, "previous");
        } else {
          if (event.detail.isOpen) {
            this.focusParentElement(event.target as HTMLCalciteMenuItemElement);
          }
        }
        break;
      case "Escape":
        this.focusParentElement(event.target as HTMLCalciteMenuItemElement);
        break;
    }
    event.preventDefault();
  }

  handleMenuSlotChange = (event: Event): void => {
    this.childMenuItems = slotChangeGetAssignedElements(event) as HTMLCalciteMenuItemElement[];
    this.childMenuItems.forEach((item: HTMLCalciteMenuItemElement) => {
      item.layout = this.layout;
    });
  };

  focusParentElement = (el: Element): void => {
    const parentEl = el.parentElement as HTMLCalciteMenuItemElement;
    if (parentEl) {
      focusElement(parentEl);
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <ul aria-label={this.label} role={this.role}>
          <slot onSlotchange={this.handleMenuSlotChange} />
          {this.overflowedNavMenuItems.length > 0 && (
            <calcite-menu-item icon-start="ellipsis" text="overflow" title="overflow-items" />
          )}
        </ul>
      </Host>
    );
  }
}
