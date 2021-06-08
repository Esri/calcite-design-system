import { Component, Element, Prop, h, VNode } from "@stencil/core";
import { SLOTS, CSS } from "./resources";
import { getSlotted } from "../../utils/dom";

/**
 * @slot actions-start - todo document.
 * @slot content-start - todo document.
 * @slot content-end - todo document.
 * @slot actions-end - todo document.
 */
@Component({
  tag: "calcite-list-item",
  styleUrl: "calcite-list-item.scss",
  shadow: true
})
export class CalciteListItem {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * @todo document.
   */
  @Prop() description: string;

  /**
   * @todo document.
   */
  @Prop() label: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListItemElement;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderActionsStart(): VNode {
    const { el } = this;
    return getSlotted(el, SLOTS.actionsStart) ? (
      <div class={CSS.actionsStart}>
        <slot name={SLOTS.actionsStart} />
      </div>
    ) : null;
  }

  renderActionsEnd(): VNode {
    const { el } = this;
    return getSlotted(el, SLOTS.actionsEnd) ? (
      <div class={CSS.actionsEnd}>
        <slot name={SLOTS.actionsEnd} />
      </div>
    ) : null;
  }

  renderContentStart(): VNode {
    const { el } = this;
    return getSlotted(el, SLOTS.contentStart) ? (
      <div class={CSS.contentStart}>
        <slot name={SLOTS.contentStart} />
      </div>
    ) : null;
  }

  renderContentEnd(): VNode {
    const { el } = this;
    return getSlotted(el, SLOTS.contentEnd) ? (
      <div class={CSS.contentEnd}>
        <slot name={SLOTS.contentEnd} />
      </div>
    ) : null;
  }

  renderContent(): VNode {
    const { label, description } = this;

    return (
      <div class={CSS.content}>
        {label ? <div class={CSS.label}>{label}</div> : null}
        {description ? <div class={CSS.description}>{description}</div> : null}
      </div>
    );
  }

  renderContentContainer(): VNode {
    return (
      <div class={CSS.contentContainer}>
        {this.renderContentStart()}
        {this.renderContent()}
        {this.renderContentEnd()}
      </div>
    );
  }

  render(): VNode {
    return (
      <li class={CSS.container}>
        {this.renderActionsStart()}
        {this.renderContentContainer()}
        {this.renderActionsEnd()}
      </li>
    );
  }
}
