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
  State,
  Watch
} from "@stencil/core";
import { SLOTS, CSS } from "./resources";
import { getSlotted, toAriaBoolean } from "../../utils/dom";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

const focusMap = new Map<HTMLCalciteListElement, number>();

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

  parentListEl: HTMLCalciteListElement;

  parentListItemEl: HTMLCalciteListItemElement;

  @Watch("active")
  activeHandler(active: boolean): void {
    if (!active) {
      this.focusCell(null, false);
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
    const { el } = this;
    const parent = el.parentElement;
    this.parentListEl = parent?.closest("calcite-list");
    this.parentListItemEl = parent?.closest("calcite-list-item");
    this.expandable = !!this.parentListItemEl;
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
    const { containerEl, contentEl, actionsStartEl, actionsEndEl, parentListEl } = this;
    const focusIndex = focusMap.get(parentListEl);

    if (typeof focusIndex === "number") {
      const cells = [actionsStartEl, contentEl, actionsEndEl].filter(Boolean);
      this.focusCell(cells[focusIndex]);
      return;
    }

    containerEl?.focus();
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
          aria-expanded={this.expandable ? toAriaBoolean(this.expanded) : null}
          aria-level={1} // todo
          aria-posinset={1} // todo
          aria-setsize={1} // todo
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

    const cells = [actionsStartEl, contentEl, actionsEndEl].filter(Boolean);
    const currentIndex = cells.findIndex((cell) => composedPath.includes(cell));

    if (key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = currentIndex + 1;
      if (currentIndex === -1) {
        if (!expanded && expandable) {
          this.expanded = true;
          this.focusCell(null);
        } else if (cells[0]) {
          this.focusCell(cells[0]);
        }
      } else if (cells[currentIndex] && cells[nextIndex]) {
        this.focusCell(cells[nextIndex]);
      }
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = currentIndex - 1;
      if (currentIndex === -1) {
        this.focusCell(null);
        if (expanded && expandable) {
          this.expanded = false;
        } else {
          this.parentListItemEl?.setFocus();
        }
      } else if (currentIndex === 0) {
        this.focusCell(null);
        containerEl.focus();
      } else if (cells[currentIndex] && cells[prevIndex]) {
        this.focusCell(cells[prevIndex]);
      }
    } else if (key === " " || key === "Enter") {
      event.preventDefault();
      this.emitListItemClick();
    }
  };

  emitListItemClick = (): void => {
    this.calciteListItemClick.emit();
  };

  handleItemClick = (): void => {
    this.emitListItemClick();
  };

  focusCell = (focusEl: HTMLTableCellElement, saveFocusIndex = true): void => {
    const { contentEl, actionsStartEl, actionsEndEl, parentListEl } = this;

    saveFocusIndex && focusMap.set(parentListEl, null);

    [actionsStartEl, contentEl, actionsEndEl].filter(Boolean).forEach((tableCell, cellIndex) => {
      if (tableCell === focusEl) {
        tableCell.setAttribute("tabIndex", "0");
        saveFocusIndex && focusMap.set(parentListEl, cellIndex);
      } else {
        tableCell.removeAttribute("tabIndex");
      }
    });

    focusEl?.focus();
  };
}
