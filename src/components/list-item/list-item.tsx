import { Component, Element, Prop, h, VNode, Method, Host } from "@stencil/core";
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
 * @slot actions-start - A slot for adding actionable `calcite-action` elements before the content of the list item.
 * @slot content-start - A slot for adding non-actionable elements before the label and description of the list item.
 * @slot content-end - A slot for adding non-actionable elements after the label and description of the list item.
 * @slot actions-end - A slot for adding actionable `calcite-action` elements after the content of the list item.
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
   * An optional description for this item.  This will appear below the label text.
   */
  @Prop() description: string;

  /**
   * When true, prevents user interaction.
   */
  @Prop({ reflect: true }) disabled = false; // todo: styling

  /**
   * The label text of the list item. Displays above the description text.
   */
  @Prop() label: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListItemElement;

  focusEl: HTMLTableCellElement;

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

  componentDidRender(): void {
    updateHostInteraction(this, "managed");
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
      <td class={CSS.actionsStart} role="gridcell" tabIndex={-1}>
        <slot name={SLOTS.actionsStart} />
      </td>
    ) : null;
  }

  renderActionsEnd(): VNode {
    const { el } = this;
    return getSlotted(el, SLOTS.actionsEnd) ? (
      <td class={CSS.actionsEnd} role="gridcell" tabIndex={-1}>
        <slot name={SLOTS.actionsEnd} />
      </td>
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
    const { description, label } = this;
    const hasCenterContent = !!label || !!description;
    const content = [this.renderContentStart(), this.renderContent(), this.renderContentEnd()];

    return (
      <td
        class={{ [CSS.contentContainer]: true, [CSS.hasCenterContent]: hasCenterContent }}
        ref={(el) => (this.focusEl = el)}
        role="gridcell"
        tabIndex={-1}
      >
        {content}
      </td>
    );
  }

  render(): VNode {
    return (
      <Host tabIndex={-1}>
        <tr class={CSS.container} role="row">
          {this.renderActionsStart()}
          {this.renderContentContainer()}
          {this.renderActionsEnd()}
          {/* // todo <div class={CSS.nestedContainer}>
          <slot />
        </div> */}
        </tr>
      </Host>
    );
  }
}
