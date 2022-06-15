import {
  Component,
  Element,
  Prop,
  h,
  VNode,
  Host,
  Method,
  Event,
  EventEmitter,
  State
} from "@stencil/core";
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
   * todo
   */
  @Prop({ reflect: true }) active = false;

  /**
   * An optional description for this item.  This will appear below the label text.
   */
  @Prop() description: string;

  /**
   * todo
   */
  @Prop({ mutable: true, reflect: true }) expanded = false;

  /**
   * When true, prevents user interaction.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The label text of the list item. Displays above the description text.
   */
  @Prop() label: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted whenever the list item content is clicked.
   */
  @Event({ bubbles: true }) calciteListItemClick: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListItemElement;

  @State() expandable = false;

  containerEl: HTMLTableRowElement;

  contentEl: HTMLTableCellElement;

  actionsStartEl: HTMLTableCellElement;

  actionsEndEl: HTMLTableCellElement;

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
    this.containerEl?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderActionsStart(): VNode {
    const { el } = this;
    return getSlotted(el, SLOTS.actionsStart) ? (
      <td class={CSS.actionsStart} ref={(el) => (this.actionsStartEl = el)} role="gridcell">
        <slot name={SLOTS.actionsStart} />
      </td>
    ) : null;
  }

  renderActionsEnd(): VNode {
    const { el } = this;
    return getSlotted(el, SLOTS.actionsEnd) ? (
      <td class={CSS.actionsEnd} ref={(el) => (this.actionsEndEl = el)} role="gridcell">
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
    const { description, disabled, label } = this;
    const hasCenterContent = !!label || !!description;
    const content = [this.renderContentStart(), this.renderContent(), this.renderContentEnd()];

    return (
      <td
        class={{
          [CSS.contentContainer]: true,
          [CSS.hasCenterContent]: hasCenterContent,
          [CSS.contentContainerDisabled]: disabled // todo: styling
        }}
        ref={(el) => (this.contentEl = el)}
        role="gridcell"
      >
        {content}
      </td>
    );
  }

  render(): VNode {
    return (
      <Host>
        <tr
          class={CSS.container}
          onClick={this.handleItemClick}
          onKeyDown={this.handleItemKeyDown}
          ref={(el) => (this.containerEl = el)}
          role="row"
          tabIndex={this.active ? 0 : -1}
        >
          {this.renderActionsStart()}
          {this.renderContentContainer()}
          {this.renderActionsEnd()}
        </tr>
        <div class={CSS.nestedContainer}>
          <slot />
        </div>
      </Host>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleItemKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    const composedPath = event.composedPath();
    const { containerEl, contentEl, actionsStartEl, actionsEndEl, expanded, expandable } = this;

    if (key === "ArrowRight") {
      event.preventDefault();
      if (composedPath.includes(actionsStartEl)) {
        this.focusCell(contentEl);
      } else if (composedPath.includes(contentEl)) {
        this.focusCell(actionsEndEl);
      } else if (composedPath.includes(actionsEndEl)) {
        // noop do nothing
      } else if (composedPath.includes(containerEl)) {
        if (!expanded && expandable) {
          this.expanded = true;
          this.focusCell(null);
        } else {
          this.focusCell(actionsStartEl);
        }
      }
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      if (composedPath.includes(actionsStartEl)) {
        this.focusCell(null);
        containerEl.focus();
      } else if (composedPath.includes(contentEl)) {
        this.focusCell(actionsStartEl);
      } else if (composedPath.includes(actionsEndEl)) {
        this.focusCell(contentEl);
      } else if (composedPath.includes(containerEl)) {
        this.focusCell(null);
        // todo: expandable state
        if (expanded && expandable) {
          this.expanded = false;
        } else {
          // todo: focus parent row if available.
        }
      }
    } else if (key === "ArrowDown") {
      event.preventDefault();
    } else if (key === "ArrowDown") {
      event.preventDefault();
    } else if (key === " " || key === "Enter") {
      event.preventDefault();
      this.emitListItemClick();
    }
  };

  emitListItemClick = (): void => {
    this.calciteListItemClick.emit();
  };

  handleItemClick = (event: PointerEvent): void => {
    event.stopPropagation();
    const composedPath = event.composedPath();

    console.log({ composedPath, currentTarget: event.currentTarget, target: event.target });

    // todo?
    if (document.activeElement === document.body) {
      this.containerEl.focus();
    }

    this.emitListItemClick();
  };

  focusCell = (focusEl: HTMLTableCellElement): void => {
    const { contentEl, actionsStartEl, actionsEndEl } = this;

    [contentEl, actionsStartEl, actionsEndEl].forEach((tableCell) => {
      tableCell.tabIndex = tableCell === focusEl ? 0 : null;
    });

    focusEl?.focus();
  };
}
