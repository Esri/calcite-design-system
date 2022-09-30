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
  Watch,
  State
} from "@stencil/core";
import { SLOTS, CSS, ICONS } from "./resources";
import { getElementDir, toAriaBoolean } from "../../utils/dom";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { getDepth, getListItemChildren, updateListItemChildren } from "./utils";
import { SelectionAppearance, SelectionMode } from "../list/resources";

const focusMap = new Map<HTMLCalciteListElement, number>();

const listSelector = "calcite-list";

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
export class ListItem implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Sets the item as focusable. Only one item should be focusable within a list.
   *
   * @internal
   */
  @Prop() active = false;

  @Watch("active")
  activeHandler(active: boolean): void {
    if (!active) {
      this.focusCell(null, false);
    }
  }

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

  /**
   * Provides additional metadata to the component. Primary use is for a filter on the parent list.
   */
  @Prop() metadata?: Record<string, unknown>;

  /**
   * When true, prevents the content of the component from user interaction.
   *
   * @deprecated no longer necessary.
   */
  @Prop({ reflect: true }) nonInteractive = false;

  /**
   * When true, item is open to show child components.
   */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * Used to specify the aria-setsize attribute to define the number of items in the current set of list for accessibility.
   *
   * @internal
   */
  @Prop() setSize: number = null;

  /**
   * Used to specify the aria-posinset attribute to define the number or position in the current set of list items for accessibility.
   *
   * @internal
   */
  @Prop() setPosition: number = null;

  /**
   * When true, the component is selected.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  @Watch("selected")
  handleSelectedChange(value: boolean): void {
    if (value) {
      this.calciteInternalListItemSelect.emit();
    }
  }

  /**
   * The component's value.
   */
  @Prop() value: any;

  /**
   * specify the selection mode - multiple (allow any number of (or no) selected items), single (allow and require one selected item), none (no selected items), defaults to single
   *
   * @internal
   */
  @Prop({ mutable: true }) selectionMode: SelectionMode = null;

  /**
   * specify the selection appearance - icon (displays a checkmark or dot), border (displays a border), defaults to icon
   *
   * @internal
   */
  @Prop({ mutable: true }) selectionAppearance: SelectionAppearance = null;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted whenever the list item content is selected.
   */
  @Event({ cancelable: false }) calciteListItemSelect: EventEmitter<void>;

  /**
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalListItemSelect: EventEmitter<void>;

  /**
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalFocusPreviousItem: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListItemElement;

  @State() level: number = null;

  @State() parentListEl: HTMLCalciteListElement;

  @State() parentListItemEl: HTMLCalciteListItemElement;

  @State() openable = false;

  @State() hasActionsStart = false;

  @State() hasActionsEnd = false;

  @State() hasContentStart = false;

  @State() hasContentEnd = false;

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
    const { el } = this;
    this.parentListEl = el.closest(listSelector);
    this.level = getDepth(el) + 1;
    this.setSelectionDefaults();
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

  renderSelected(): VNode {
    const { selected, selectionMode, selectionAppearance } = this;

    if (selectionMode === "none" || selectionAppearance === "border") {
      return null;
    }

    return (
      <td class={CSS.selectionContainer} onClick={this.toggleSelected}>
        <calcite-icon
          icon={
            selected
              ? selectionMode === "multiple"
                ? ICONS.selectedMultiple
                : ICONS.selectedSingle
              : ICONS.unselected
          }
          scale="s"
        />
      </td>
    );
  }

  renderOpen(): VNode {
    const { el, open, openable } = this;
    const dir = getElementDir(el);

    return openable ? (
      <td class={CSS.openContainer} onClick={this.toggleOpen}>
        <calcite-icon
          icon={open ? ICONS.open : dir === "rtl" ? ICONS.closedRTL : ICONS.closedLTR}
          scale="s"
        />
      </td>
    ) : null;
  }

  renderActionsStart(): VNode {
    const { label, hasActionsStart } = this;
    return (
      <td
        aria-label={label}
        class={CSS.actionsStart}
        hidden={!hasActionsStart}
        ref={(el) => (this.actionsStartEl = el)}
        role="gridcell"
      >
        <slot name={SLOTS.actionsStart} onSlotchange={this.handleActionsStartSlotChange} />
      </td>
    );
  }

  renderActionsEnd(): VNode {
    const { label, hasActionsEnd } = this;
    return (
      <td
        aria-label={label}
        class={CSS.actionsEnd}
        hidden={!hasActionsEnd}
        ref={(el) => (this.actionsEndEl = el)}
        role="gridcell"
      >
        <slot name={SLOTS.actionsEnd} onSlotchange={this.handleActionsEndSlotChange} />
      </td>
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

  renderContentEnd(): VNode {
    const { hasContentEnd } = this;
    return (
      <div class={CSS.contentEnd} hidden={!hasContentEnd}>
        <slot name={SLOTS.contentEnd} onSlotchange={this.handleContentEndSlotChange} />
      </div>
    );
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
    const { description, label, selectionMode } = this;
    const hasCenterContent = !!label || !!description;
    const content = [this.renderContentStart(), this.renderContent(), this.renderContentEnd()];

    return (
      <td
        aria-label={label}
        class={{
          [CSS.contentContainer]: true,
          [CSS.contentContainerSelectable]: selectionMode !== "none",
          [CSS.contentContainerHasCenterContent]: hasCenterContent
        }}
        onClick={this.toggleSelected}
        ref={(el) => (this.contentEl = el)}
        role="gridcell"
      >
        {content}
      </td>
    );
  }

  render(): VNode {
    const {
      openable,
      open,
      level,
      setPosition,
      setSize,
      active,
      label,
      selected,
      selectionAppearance,
      selectionMode
    } = this;

    const showBorder = selectionMode !== "none" && selectionAppearance === "border";
    const borderSelected = showBorder && selected;
    const borderUnselected = showBorder && !selected;

    return (
      <Host>
        <tr
          aria-expanded={openable ? toAriaBoolean(open) : null}
          aria-label={label}
          aria-level={level}
          aria-posinset={setPosition}
          aria-selected={toAriaBoolean(selected)}
          aria-setsize={setSize}
          class={{
            [CSS.container]: true,
            [CSS.containerBorderSelected]: borderSelected,
            [CSS.containerBorderUnselected]: borderUnselected
          }}
          onFocus={this.focusCellNull}
          onKeyDown={this.handleItemKeyDown}
          ref={(el) => (this.containerEl = el)}
          role="row"
          tabIndex={active ? 0 : -1}
        >
          {this.renderSelected()}
          {this.renderOpen()}
          {this.renderActionsStart()}
          {this.renderContentContainer()}
          {this.renderActionsEnd()}
        </tr>
        <div
          class={{
            [CSS.nestedContainer]: true,
            [CSS.nestedContainerHidden]: openable && !open
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

  handleActionsStartSlotChange = (event: Event): void => {
    const elements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    });

    this.hasActionsStart = !!elements.length;
  };

  handleActionsEndSlotChange = (event: Event): void => {
    const elements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    });

    this.hasActionsEnd = !!elements.length;
  };

  handleContentStartSlotChange = (event: Event): void => {
    const elements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    });

    this.hasContentStart = !!elements.length;
  };

  handleContentEndSlotChange = (event: Event): void => {
    const elements = (event.target as HTMLSlotElement).assignedElements({
      flatten: true
    });

    this.hasContentEnd = !!elements.length;
  };

  setSelectionDefaults(): void {
    const { parentListEl, selectionMode, selectionAppearance } = this;

    if (!parentListEl) {
      return;
    }

    if (!selectionMode) {
      this.selectionMode = parentListEl.selectionMode;
    }

    if (!selectionAppearance) {
      this.selectionAppearance = parentListEl.selectionAppearance;
    }
  }

  handleDefaultSlotChange = (event: Event): void => {
    const listItemChildren = getListItemChildren(event);
    updateListItemChildren(listItemChildren);
    const openable = !!listItemChildren.length;
    this.openable = openable;
    if (!openable) {
      this.open = false;
    }
  };

  toggleOpen = (): void => {
    this.open = !this.open;
  };

  toggleSelected = (): void => {
    if (this.disabled) {
      return;
    }

    if (this.selectionMode !== "none") {
      this.selected = !this.selected;
    }

    this.calciteListItemSelect.emit();
  };

  handleItemKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    const composedPath = event.composedPath();
    const { containerEl, contentEl, actionsStartEl, actionsEndEl, open, openable } = this;

    const cells = [actionsStartEl, contentEl, actionsEndEl].filter(Boolean);
    const currentIndex = cells.findIndex((cell) => composedPath.includes(cell));

    if (key === " ") {
      event.preventDefault();
      this.toggleSelected();
    } else if (key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = currentIndex + 1;
      if (currentIndex === -1) {
        if (!open && openable) {
          this.open = true;
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
        if (open && openable) {
          this.open = false;
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

  focusCellNull = (): void => {
    this.focusCell(null);
  };

  focusCell = (focusEl: HTMLTableCellElement, saveFocusIndex = true): void => {
    const { contentEl, actionsStartEl, actionsEndEl, parentListEl } = this;

    if (saveFocusIndex) {
      focusMap.set(parentListEl, null);
    }

    [actionsStartEl, contentEl, actionsEndEl].filter(Boolean).forEach((tableCell, cellIndex) => {
      const tabIndexAttr = "tabindex";
      if (tableCell === focusEl) {
        tableCell.setAttribute(tabIndexAttr, "0");
        saveFocusIndex && focusMap.set(parentListEl, cellIndex);
      } else {
        tableCell.removeAttribute(tabIndexAttr);
      }
    });

    focusEl?.focus();
  };
}
