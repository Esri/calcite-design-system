import { Component, Host, h, Prop, Watch } from "@stencil/core";
import { SLOTS } from "./resources";
import { VNode } from "@stencil/core/internal";

@Component({
  tag: "calcite-action-group",
  styleUrl: "calcite-action-group.scss",
  shadow: true
})
/**
 * @slot - A slot for adding a group of `calcite-action`s.
 * @slot menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 */
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
   * 'Options' text string for the actions menu.
   */
  @Prop() intlOptions?: string;

  /**
   * 'Close' text string for the menu.
   */
  @Prop() intlClose?: string;

  /**
   * 'Open' text string for the menu.
   */
  @Prop() intlOpen?: string;

  /**
   * Opens the action menu.
   */
  @Prop({ reflect: true }) menuOpen = false;

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  renderMenu(): VNode {
    const { expanded, intlClose, intlOpen, intlOptions, menuOpen } = this;

    return (
      <calcite-action-menu
        expanded={expanded}
        intlClose={intlClose}
        intlOpen={intlOpen}
        intlOptions={intlOptions}
        open={menuOpen}
      >
        <slot name={SLOTS.menuActions} />
      </calcite-action-menu>
    );
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
