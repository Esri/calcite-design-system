import { Component, Element, h, Prop, State, VNode } from "@stencil/core";
import { slotChangeGetAssignedElements } from "../../utils/dom";
import { Height, Position, Scale } from "../interfaces";
import { getDimension } from "../../utils/getDimensionClass";
import { logger } from "../../utils/logger";
import { CSS, SLOTS } from "./resources";

/**
 * @deprecated Use the `calcite-shell-panel` component instead.
 * @slot - A slot for adding content to the `calcite-shell-panel`.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the `calcite-shell-panel`.
 */
@Component({
  tag: "calcite-shell-center-row",
  styleUrl: "shell-center-row.scss",
  shadow: true,
})
export class ShellCenterRow {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, the content area displays like a floating panel.
   */
  @Prop({ reflect: true }) detached = false;

  /**
   * Specifies the maximum height of the component.
   *
   * @deprecated Use the `height` property instead.
   */
  @Prop({ reflect: true }) heightScale: Scale = "s";

  /** Specifies the height of the component. */
  @Prop({ reflect: true }) height: Height = "s";

  /**
   * Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`).
   */
  @Prop({ reflect: true }) position: Extract<"start" | "end", Position> = "end";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteShellCenterRowElement;

  @State() actionBar: HTMLCalciteActionBarElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    logger.deprecated("component", {
      name: "shell-center-row",
      removalVersion: 4,
      suggested: "shell-panel",
    });
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { actionBar } = this;

    const contentNode = (
      <div class={CSS.content}>
        <slot />
      </div>
    );

    const actionBarNode = (
      <div class={CSS.actionBarContainer} hidden={!this.actionBar} key="action-bar">
        <slot name={SLOTS.actionBar} onSlotchange={this.handleActionBarSlotChange} />
      </div>
    );

    const children: VNode[] = [actionBarNode, contentNode];

    if (actionBar?.position === "end") {
      children.reverse();
    }

    return (
      <div
        class={{
          [CSS.container]: true,
          [getDimension("height", this.height, this.heightScale)]: !!(
            this.height || this.heightScale
          ),
        }}
      >
        {children}
      </div>
    );
  }

  private handleActionBarSlotChange = (event: Event): void => {
    this.actionBar = slotChangeGetAssignedElements(event).filter(
      (el): el is HTMLCalciteActionBarElement => el.matches("calcite-action-bar"),
    )[0];
  };
}
