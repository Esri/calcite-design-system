import { Component, Host, h, Prop, Watch, Element } from "@stencil/core";
import { SLOTS } from "./resources";
import { VNode } from "@stencil/core/internal";
import { getSlotted } from "../../utils/dom";
import { SLOTS as ACTION_MENU_SLOTS } from "../calcite-action-menu/resources";

/**
 * @slot - A slot for adding a group of `calcite-action`s.
 * @slot menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 * @slot menu-tooltip - a slot for adding an tooltip for the menu.
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
  @Prop() label?: string;

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

  renderTooltip(): VNode {
    const { el } = this;
    const hasTooltip = getSlotted(el, SLOTS.menuTooltip);

    return hasTooltip ? <slot name={SLOTS.menuTooltip} slot={ACTION_MENU_SLOTS.tooltip} /> : null;
  }

  renderMenu(): VNode {
    const { el, expanded, label, menuOpen } = this;

    const hasMenuItems = getSlotted(el, SLOTS.menuActions);

    return hasMenuItems ? (
      <calcite-action-menu
        expanded={expanded}
        flipPlacements={["left", "right"]}
        label={label}
        open={menuOpen}
        placement="leading-start"
      >
        {this.renderTooltip()}
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
