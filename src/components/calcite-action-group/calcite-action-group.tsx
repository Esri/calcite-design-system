import { Component, h, Prop, Watch, Element } from "@stencil/core";
import { SLOTS, TEXT } from "./resources";
import { Fragment, VNode } from "@stencil/core/internal";
import { getSlotted } from "../../utils/dom";
import { SLOTS as ACTION_MENU_SLOTS } from "../calcite-action-menu/resources";
import { Columns, Layout } from "../interfaces";

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

  @Watch("expanded")
  expandedHandler(): void {
    this.menuOpen = false;
  }

  /**
   * Indicates the horizontal, vertical, or grid layout of the component.
   */
  @Prop({ reflect: true }) layout: Layout = "vertical";

  /**
   * Indicates number of columns.
   */
  @Prop({ reflect: true }) columns?: Columns;

  /**
   * Text string for the actions menu.
   */
  @Prop() intlMore?: string;

  /**
   * Opens the action menu.
   */
  @Prop({ reflect: true, mutable: true }) menuOpen = false;

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
    const { el, expanded, intlMore, menuOpen } = this;

    const hasMenuItems = getSlotted(el, SLOTS.menuActions);

    return hasMenuItems ? (
      <calcite-action-menu
        expanded={expanded}
        flipPlacements={["left", "right"]}
        label={intlMore || TEXT.more}
        onCalciteActionMenuOpenChange={this.setMenuOpen}
        open={menuOpen}
        placement="leading-start"
      >
        <slot name={SLOTS.menuActions} />
        {this.renderTooltip()}
      </calcite-action-menu>
    ) : null;
  }

  render(): VNode {
    return (
      <Fragment>
        <slot />
        {this.renderMenu()}
      </Fragment>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setMenuOpen = (event: CustomEvent<boolean>): void => {
    this.menuOpen = !!event.detail;
  };
}
