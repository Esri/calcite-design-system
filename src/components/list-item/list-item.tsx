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
  Watch
} from "@stencil/core";
import { SLOTS, CSS } from "./resources";
import { getElementDir, getSlotted, toAriaBoolean } from "../../utils/dom";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { getDepth, getListItemChildren, updateListItemChildren } from "./utils";

const focusMap = new Map<HTMLCalciteListElement, number>();

const listSelector = "calcite-list";
const listItemSelector = "calcite-list-item";

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
   * A description for the component. Displays below the label text.
   */
  @Prop() description?: string;

  /**
   * todo: document
   */
  @Prop({ mutable: true, reflect: true }) expanded = false;

  /**
   * When true, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The label text of the component. Displays above the description text.
   */
  @Prop() label: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted whenever the list item content is selected.
   */
  @Event({ bubbles: true }) calciteListItemSelect: EventEmitter<void>;

  /**
   *
   * @internal
   */
  @Event() calciteInternalFocusPreviousItem: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListItemElement;

  /**
   *
   * @internal
   */
  @Prop() active = false;

  /**
   *
   * @internal
   */
  @Prop({ mutable: true }) level: number = null;

  /**
   *
   * @internal
   */
  @Prop() setSize: number = null;

  /**
   *
   * @internal
   */
  @Prop() posInSet: number = null;

  /**
   *
   * @internal
   */
  @Prop({ mutable: true }) parentListEl: HTMLCalciteListElement;

  /**
   *
   * @internal
   */
  @Prop({ mutable: true }) parentListItemEl: HTMLCalciteListItemElement;

  /**
   *
   * @internal
   */
  @Prop({ mutable: true }) expandable = false;

  containerEl: HTMLTableRowElement;

  contentEl: HTMLTableCellElement;

  actionsStartEl: HTMLTableCellElement;

  actionsEndEl: HTMLTableCellElement;

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
    this.parentListEl = el.closest(listSelector);
    this.parentListItemEl = el.parentElement?.closest(listItemSelector);
    this.level = getDepth(el) + 1;
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
      if (cells[focusIndex]) {
        this.focusCell(cells[focusIndex]);
      } else {
        containerEl?.focus();
      }
      return;
    }

    containerEl?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderExpand(): VNode {
    const { el, expanded, expandable } = this;
    const dir = getElementDir(el);

    return expandable ? (
      <td class={CSS.expandContainer} onClick={this.toggleExpanded}>
        <calcite-icon
          icon={expanded ? "caret-down" : dir === "rtl" ? "caret-left" : "caret-right"}
          scale="s"
        />
      </td>
    ) : null;
  }

  renderActionsStart(): VNode {
    const { el, label } = this;
    return getSlotted(el, SLOTS.actionsStart) ? (
      <td
        aria-label={label}
        class={CSS.actionsStart}
        ref={(el) => (this.actionsStartEl = el)}
        role="gridcell"
      >
        <slot name={SLOTS.actionsStart} />
      </td>
    ) : null;
  }

  renderActionsEnd(): VNode {
    const { el, label } = this;
    return getSlotted(el, SLOTS.actionsEnd) ? (
      <td
        aria-label={label}
        class={CSS.actionsEnd}
        ref={(el) => (this.actionsEndEl = el)}
        role="gridcell"
      >
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
        aria-label={label}
        class={{
          [CSS.contentContainer]: true,
          [CSS.hasCenterContent]: hasCenterContent,
          [CSS.contentContainerDisabled]: disabled // todo: Needs styling
        }}
        onClick={this.handleItemContentSelect}
        onKeyDown={this.handleItemContentKeyDown}
        ref={(el) => (this.contentEl = el)}
        role="gridcell"
      >
        {content}
      </td>
    );
  }

  render(): VNode {
    const { expandable, expanded, level, posInSet, setSize, active, label } = this;
    return (
      <Host>
        <tr
          aria-expanded={expandable ? toAriaBoolean(expanded) : null}
          aria-label={label}
          aria-level={level}
          aria-posinset={posInSet}
          aria-setsize={setSize}
          class={CSS.container}
          onFocus={this.focusCellNull}
          onKeyDown={this.handleItemKeyDown}
          ref={(el) => (this.containerEl = el)}
          role="row"
          tabIndex={active ? 0 : -1}
        >
          {this.renderExpand()}
          {this.renderActionsStart()}
          {this.renderContentContainer()}
          {this.renderActionsEnd()}
        </tr>
        <div
          class={{
            [CSS.nestedContainer]: true,
            [CSS.nestedContainerHidden]: expandable ? !expanded : false
          }}
        >
          <slot onSlotchange={this.handleDefaultSlotChange} />
        </div>
      </Host>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleDefaultSlotChange = (event: Event): void => {
    const listItemChildren = getListItemChildren(event);
    updateListItemChildren(listItemChildren);
    this.expandable = !!listItemChildren.length;
  };

  toggleExpanded = (): void => {
    this.expanded = !this.expanded;
  };

  handleItemContentKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (key === " " || key === "Enter") {
      event.preventDefault();
      this.emitListItemSelect();
    }
  };

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
          this.calciteInternalFocusPreviousItem.emit();
        }
      } else if (currentIndex === 0) {
        this.focusCell(null);
        containerEl.focus();
      } else if (cells[currentIndex] && cells[prevIndex]) {
        this.focusCell(cells[prevIndex]);
      }
    }
  };

  emitListItemSelect = (): void => {
    if (this.disabled) {
      return;
    }

    this.calciteListItemSelect.emit();
  };

  handleItemContentSelect = (): void => {
    if (this.disabled) {
      return;
    }

    this.emitListItemSelect();
  };

  focusCellNull = (): void => {
    this.focusCell(null);
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
