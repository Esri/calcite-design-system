import { Component, Host, h, Prop, Watch, Element } from "@stencil/core";
import { SLOTS } from "./resources";
import { VNode } from "@stencil/core/internal";
import { getSlotted } from "../../utils/dom";

/**
 * @slot - A slot for adding a group of `calcite-action`s.
 * @slot menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 */
@Component({
  tag: "calcite-action-group",
  styleUrl: "calcite-action-group.scss",
  shadow: true
})
export class CalciteActionGroup {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Indicates whether widget is expanded.
   */
  @Prop({ reflect: true }) expanded = false;

  /**
   * Text string for the actions menu.
   */
  @Prop() intlOptions?: string;

  /**
   * Opens the action menu.
   */
  @Prop({ reflect: true, mutable: true }) menuOpen = false;

  @Watch("expanded")
  expandedHandler(): void {
    this.menuOpen = false;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionGroupElement;

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  renderMenu(): VNode {
    const { el, expanded, intlOptions, menuOpen } = this;

    const hasMenuItems = getSlotted(el, SLOTS.menuActions);

    return hasMenuItems ? (
      <calcite-action-menu
        expanded={expanded}
        flipPlacements={["left", "right"]}
        intlOptions={intlOptions}
        open={menuOpen}
        placement="leading-start"
      >
        <slot name={SLOTS.menuActions} />
      </calcite-action-menu>
    ) : null;
  }

  render(): VNode {
    return (
      <Host>
        <slot />
        {this.renderMenu()}
      </Host>
    );
  }
}
