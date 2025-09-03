import { LitElement, property, h, state, JsxNode } from "@arcgis/lumina";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { CSS, SLOTS } from "./resources";
import { styles } from "./stack.scss";

declare global {
  interface DeclareElements {
    "calcite-stack": Stack;
  }
}

/**
 * @slot - A slot for adding content.
 * @slot actions-start - A slot for adding actionable `calcite-action` elements before the content of the component.
 * @slot content-start - A slot for adding non-actionable elements before content of the component.
 * @slot content-end - A slot for adding non-actionable elements after content of the component.
 * @slot actions-end - A slot for adding actionable `calcite-action` elements after the content of the component.
 */
export class Stack extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region State Properties

  @state() hasActionsEnd = false;

  @state() hasActionsStart = false;

  @state() hasContentEnd = false;

  @state() hasContentStart = false;

  // #endregion

  // #region Public Properties

  /** When present, content interaction is prevented and displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  // #endregion

  // #region Private Methods

  private handleActionsStartSlotChange(event: Event): void {
    this.hasActionsStart = slotChangeHasAssignedElement(event);
  }

  private handleActionsEndSlotChange(event: Event): void {
    this.hasActionsEnd = slotChangeHasAssignedElement(event);
  }

  private handleContentStartSlotChange(event: Event): void {
    this.hasContentStart = slotChangeHasAssignedElement(event);
  }

  private handleContentEndSlotChange(event: Event): void {
    this.hasContentEnd = slotChangeHasAssignedElement(event);
  }

  // #endregion

  // #region Rendering

  private renderActionsStart(): JsxNode {
    const { hasActionsStart } = this;
    return (
      <div class={CSS.actionsStart} hidden={!hasActionsStart} key="actions-start-container">
        <slot name={SLOTS.actionsStart} onSlotChange={this.handleActionsStartSlotChange} />
      </div>
    );
  }

  private renderActionsEnd(): JsxNode {
    const { hasActionsEnd } = this;
    return (
      <div class={CSS.actionsEnd} hidden={!hasActionsEnd} key="actions-end-container">
        <slot name={SLOTS.actionsEnd} onSlotChange={this.handleActionsEndSlotChange} />
      </div>
    );
  }

  private renderContentStart(): JsxNode {
    const { hasContentStart } = this;
    return (
      <div class={CSS.contentStart} hidden={!hasContentStart}>
        <slot name={SLOTS.contentStart} onSlotChange={this.handleContentStartSlotChange} />
      </div>
    );
  }

  private renderDefaultContent(): JsxNode {
    return (
      <div class={CSS.content}>
        <slot />
      </div>
    );
  }

  private renderContentEnd(): JsxNode {
    const { hasContentEnd } = this;
    return (
      <div class={CSS.contentEnd} hidden={!hasContentEnd}>
        <slot name={SLOTS.contentEnd} onSlotChange={this.handleContentEndSlotChange} />
      </div>
    );
  }

  override render(): JsxNode {
    return (
      <div class={CSS.container}>
        {this.renderActionsStart()}
        {this.renderContentStart()}
        {this.renderDefaultContent()}
        {this.renderContentEnd()}
        {this.renderActionsEnd()}
      </div>
    );
  }

  // #endregion
}
