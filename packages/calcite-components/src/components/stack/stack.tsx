import { Component, h, Host, Prop, State, VNode } from "@stencil/core";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { CSS, SLOTS } from "./resources";

/**
 * @slot - A slot for adding content.
 * @slot actions-start - A slot for adding actionable `calcite-action` elements before the content of the component.
 * @slot content-start - A slot for adding non-actionable elements before content of the component.
 * @slot content-end - A slot for adding non-actionable elements after content of the component.
 * @slot actions-end - A slot for adding actionable `calcite-action` elements after the content of the component.
 */
@Component({
  tag: "calcite-stack",
  styleUrl: "stack.scss",
  shadow: true,
})
export class Stack {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**  When `true`, content interaction is prevented and displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @State() hasActionsStart = false;

  @State() hasActionsEnd = false;

  @State() hasContentStart = false;

  @State() hasContentEnd = false;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderActionsStart(): VNode {
    const { hasActionsStart } = this;
    return (
      <div class={CSS.actionsStart} hidden={!hasActionsStart} key="actions-start-container">
        <slot name={SLOTS.actionsStart} onSlotchange={this.handleActionsStartSlotChange} />
      </div>
    );
  }

  renderActionsEnd(): VNode {
    const { hasActionsEnd } = this;
    return (
      <div class={CSS.actionsEnd} hidden={!hasActionsEnd} key="actions-end-container">
        <slot name={SLOTS.actionsEnd} onSlotchange={this.handleActionsEndSlotChange} />
      </div>
    );
  }

  renderContentStart(): VNode {
    const { hasContentStart } = this;
    return (
      <div class={CSS.contentStart} hidden={!hasContentStart}>
        <slot name={SLOTS.contentStart} onSlotchange={this.handleContentStartSlotChange} />
      </div>
    );
  }

  renderDefaultContent(): VNode {
    return (
      <div class={CSS.content}>
        <slot />
      </div>
    );
  }

  renderContentEnd(): VNode {
    const { hasContentEnd } = this;
    return (
      <div class={CSS.contentEnd} hidden={!hasContentEnd}>
        <slot name={SLOTS.contentEnd} onSlotchange={this.handleContentEndSlotChange} />
      </div>
    );
  }

  render(): VNode {
    return (
      <Host>
        <div class={CSS.container}>
          {this.renderActionsStart()}
          {this.renderContentStart()}
          {this.renderDefaultContent()}
          {this.renderContentEnd()}
          {this.renderActionsEnd()}
        </div>
      </Host>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleActionsStartSlotChange = (event: Event): void => {
    this.hasActionsStart = slotChangeHasAssignedElement(event);
  };

  handleActionsEndSlotChange = (event: Event): void => {
    this.hasActionsEnd = slotChangeHasAssignedElement(event);
  };

  handleContentStartSlotChange = (event: Event): void => {
    this.hasContentStart = slotChangeHasAssignedElement(event);
  };

  handleContentEndSlotChange = (event: Event): void => {
    this.hasContentEnd = slotChangeHasAssignedElement(event);
  };
}
