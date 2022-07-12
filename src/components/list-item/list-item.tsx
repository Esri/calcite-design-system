import { Component, Element, Prop, h, VNode, Host, Method } from "@stencil/core";
import { SLOTS, CSS } from "./resources";
import { getSlotted } from "../../utils/dom";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

/**
 * @slot - A slot for adding `calcite-list-item` and `calcite-list-item-group` elements.
 * @slot actions-start - A slot for adding actionable `calcite-action` elements before the content of the component.
 * @slot content-start - A slot for adding non-actionable elements before the label and description of the component.
 * @slot content-end - A slot for adding non-actionable elements after the label and description of the component.
 * @slot actions-end - A slot for adding actionable `calcite-action` elements after the content of the component.
 */
@Component({
  tag: "calcite-list-item",
  styleUrl: "list-item.scss",
  shadow: true
})
export class ListItem implements ConditionalSlotComponent, InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, prevents the content of the component from user interaction.
   */
  @Prop({ reflect: true }) nonInteractive = false;

  /**
   * A description for the component. Displays below the label text.
   */
  @Prop() description?: string;

  /**
   * When true, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The label text of the component. Displays above the description text.
   */
  @Prop() label: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListItemElement;

  focusEl: HTMLButtonElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidRender(): void {
    updateHostInteraction(this);
  }

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
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.focusEl?.focus();
  }

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

    return !!label || !!description ? (
      <div class={CSS.content}>
        {label ? <div class={CSS.label}>{label}</div> : null}
        {description ? <div class={CSS.description}>{description}</div> : null}
      </div>
    ) : null;
  }

  renderContentContainer(): VNode {
    const { description, disabled, label, nonInteractive } = this;
    const hasCenterContent = !!label || !!description;
    const content = [this.renderContentStart(), this.renderContent(), this.renderContentEnd()];

    return !nonInteractive ? (
      <button
        class={{
          [CSS.contentContainer]: true,
          [CSS.contentContainerButton]: true,
          [CSS.hasCenterContent]: hasCenterContent
        }}
        disabled={disabled}
        ref={(focusEl) => (this.focusEl = focusEl)}
      >
        {content}
      </button>
    ) : (
      <div
        class={{ [CSS.contentContainer]: true, [CSS.hasCenterContent]: hasCenterContent }}
        ref={() => (this.focusEl = null)}
      >
        {content}
      </div>
    );
  }

  render(): VNode {
    return (
      <Host role="listitem">
        <div class={CSS.container}>
          {this.renderActionsStart()}
          {this.renderContentContainer()}
          {this.renderActionsEnd()}
        </div>
        <div class={CSS.nestedContainer}>
          <slot />
        </div>
      </Host>
    );
  }
}
