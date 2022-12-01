import { Component, Element, h, Prop, Watch } from "@stencil/core";
import { ICONS, SLOTS, TEXT } from "./resources";
import { Fragment, VNode } from "@stencil/core/internal";
import { getSlotted } from "../../utils/dom";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import { Columns, Layout, Scale } from "../interfaces";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { CalciteActionMenuCustomEvent } from "../../components";

/**
 * @slot - A slot for adding a group of `calcite-action`s.
 * @slot menu-actions - A slot for adding an overflow menu with `calcite-action`s inside a `calcite-dropdown`.
 * @slot menu-tooltip - A slot for adding a `calcite-tooltip` for the menu.
 */
@Component({
  tag: "calcite-action-group",
  styleUrl: "action-group.scss",
  shadow: true
})
export class ActionGroup implements ConditionalSlotComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, the component is expanded.
   */
  @Prop({ reflect: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(): void {
    this.menuOpen = false;
  }

  /**
   * Indicates the layout of the component.
   */
  @Prop({ reflect: true }) layout: Layout = "vertical";

  /**
   * Indicates number of columns.
   */
  @Prop({ reflect: true }) columns?: Columns;

  /**
   * Specifies a text string for the `calcite-action-menu`.
   */
  @Prop() intlMore?: string;

  /**
   * When `true`, the `calcite-action-menu` is open.
   */
  @Prop({ reflect: true, mutable: true }) menuOpen = false;

  /**
   * Specifies the size of the `calcite-action-menu`.
   */
  @Prop({ reflect: true }) scale: Scale;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionGroupElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

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
    const { el, expanded, intlMore, menuOpen, scale, layout } = this;

    const hasMenuItems = getSlotted(el, SLOTS.menuActions);

    return hasMenuItems ? (
      <calcite-action-menu
        expanded={expanded}
        flipPlacements={["left", "right"]}
        label={intlMore || TEXT.more}
        onCalciteActionMenuOpenChange={this.setMenuOpen}
        open={menuOpen}
        placement={layout === "horizontal" ? "bottom-start" : "leading-start"}
        scale={scale}
      >
        <calcite-action
          icon={ICONS.menu}
          scale={scale}
          slot={ACTION_MENU_SLOTS.trigger}
          text={intlMore || TEXT.more}
          textEnabled={expanded}
        />
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

  setMenuOpen = (event: CalciteActionMenuCustomEvent<void>): void => {
    this.menuOpen = !!(event.target as HTMLCalciteActionMenuElement).open;
  };
}
