import { Component, Element, Fragment, h, Prop, VNode } from "@stencil/core";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import { getSlotted } from "../../utils/dom";
import { Position, Scale } from "../interfaces";
import { CSS, SLOTS } from "./resources";

/**
 * @slot - A slot for adding content to the `calcite-shell-panel`.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the `calcite-shell-panel`.
 */
@Component({
  tag: "calcite-shell-center-row",
  styleUrl: "shell-center-row.scss",
  shadow: true,
})
export class ShellCenterRow implements ConditionalSlotComponent {
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
   */
  @Prop({ reflect: true }) heightScale: Scale = "s";

  /**
   * Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`).
   */
  @Prop({ reflect: true }) position: Position = "end";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteShellCenterRowElement;

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
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { el } = this;

    const contentNode = (
      <div class={CSS.content}>
        <slot />
      </div>
    );

    const actionBar = getSlotted<HTMLCalciteActionBarElement>(el, SLOTS.actionBar);

    const actionBarNode = actionBar ? (
      <div class={CSS.actionBarContainer} key="action-bar">
        <slot name={SLOTS.actionBar} />
      </div>
    ) : null;

    const children: VNode[] = [actionBarNode, contentNode];

    if (actionBar?.position === "end") {
      children.reverse();
    }

    return <Fragment>{children}</Fragment>;
  }
}
