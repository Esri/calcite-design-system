import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  getElementDir,
  getFirstTabbable,
  slotChangeHasAssignedElement,
  toAriaBoolean,
} from "../../utils/dom";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { SelectionMode } from "../interfaces";
import { SelectionAppearance } from "../list/resources";
import { CSS, dataTestActiveCellAttr, ICONS, SLOTS } from "./resources";
import {
  getDepth,
  getListItemChildren,
  getListItemChildLists,
  updateListItemChildren,
} from "./utils";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { ListItemMessages } from "./assets/list-item/t9n";

const focusMap = new Map<HTMLCalciteListElement, number>();

const listSelector = "calcite-list";

import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { SortableComponentItem } from "../../utils/sortableComponent";

/**
 * @slot - A slot for adding `calcite-list-item` and `calcite-list-item-group` elements.
 * @slot actions-start - A slot for adding actionable `calcite-action` elements before the content of the component.
 * @slot content-start - A slot for adding non-actionable elements before the label and description of the component.
 * @slot content - A slot for adding non-actionable, centered content in place of the `label` and `description` of the component.
 * @slot content-end - A slot for adding non-actionable elements after the label and description of the component.
 * @slot actions-end - A slot for adding actionable `calcite-action` elements after the content of the component.
 * @slot content-bottom - A slot for adding content below the component's `label` and `description`.
 */
@Component({
  tag: "calcite-list-item",
  styleUrl: "list-item.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class ListItem
  implements
    InteractiveComponent,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent,
    SortableComponentItem
{
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

  /** When `true`, a close button is added to the component. */
  @Prop({ reflect: true }) closable = false;

  /** When `true`, hides the component. */
  @Prop({ reflect: true, mutable: true }) closed = false;

  @Watch("closed")
  handleClosedChange(): void {
    this.emitCalciteInternalListItemChange();
  }

  /**
   * A description for the component. Displays below the label text.
   */
  @Prop() description: string;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  handleDisabledChange(): void {
    this.emitCalciteInternalListItemChange();
  }

  /**
   * When `true`, the item is not draggable.
   */
  @Prop({ reflect: true }) dragDisabled = false;

  /**
   * When `true`, the component displays a draggable button.
   *
   * @internal
   */
  @Prop() dragHandle = false;

  /**
   * The label text of the component. Displays above the description text.
   */
  @Prop() label: string;

  /**
   * Provides additional metadata to the component. Primary use is for a filter on the parent `calcite-list`.
   */
  @Prop() metadata: Record<string, unknown>;

  /**
   * When `true`, the item is open to show child components.
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
   * When `true` and the parent `calcite-list`'s `selectionMode` is `"single"`, `"single-persist"', or `"multiple"`, the component is selected.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  @Watch("selected")
  handleSelectedChange(): void {
    this.calciteInternalListItemSelect.emit();
  }

  /**
   * The component's value.
   */
  @Prop() value: any;

  /**
   * Specifies the selection mode - `"multiple"` (allow any number of selected items), `"single"` (allow one selected item), `"single-persist"` (allow one selected item and prevent de-selection), or `"none"` (no selected items).
   *
   * @internal
   */
  @Prop({ mutable: true }) selectionMode: Extract<
    "none" | "multiple" | "single" | "single-persist",
    SelectionMode
  > = null;

  /**
   * Specifies the selection appearance - `"icon"` (displays a checkmark or dot) or `"border"` (displays a border).
   *
   * @internal
   */
  @Prop({ mutable: true }) selectionAppearance: SelectionAppearance = null;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ListItemMessages>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ListItemMessages;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emits when the item's content is selected.
   */
  @Event({ cancelable: false }) calciteListItemSelect: EventEmitter<void>;

  /**
   * Fires when the close button is clicked.
   */
  @Event({ cancelable: false }) calciteListItemClose: EventEmitter<void>;

  /**
   * Fires when the open button is clicked.
   */
  @Event({ cancelable: false }) calciteListItemToggle: EventEmitter<void>;

  /**
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalListItemSelect: EventEmitter<void>;

  /**
   *
   * @internal
   */
  @Event({ cancelable: false })
  calciteInternalListItemSelectMultiple: EventEmitter<{
    selectMultiple: boolean;
  }>;

  /**
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalListItemActive: EventEmitter<void>;

  /**
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalFocusPreviousItem: EventEmitter<void>;

  /**
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalListItemChange: EventEmitter<void>;

  @Listen("calciteInternalListItemGroupDefaultSlotChange")
  @Listen("calciteInternalListDefaultSlotChange")
  handleCalciteInternalListDefaultSlotChanges(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.handleOpenableChange(this.defaultSlotEl);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListItemElement;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: ListItemMessages;

  @State() level: number = null;

  @State() visualLevel: number = null;

  @State() parentListEl: HTMLCalciteListElement;

  @State() openable = false;

  @State() hasActionsStart = false;

  @State() hasActionsEnd = false;

  @State() hasCustomContent = false;

  @State() hasContentStart = false;

  @State() hasContentEnd = false;

  @State() hasContentBottom = false;

  containerEl: HTMLTableRowElement;

  contentEl: HTMLTableCellElement;

  actionsStartEl: HTMLTableCellElement;

  actionsEndEl: HTMLTableCellElement;

  handleGridEl: HTMLTableCellElement;

  defaultSlotEl: HTMLSlotElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
    const { el } = this;
    this.parentListEl = el.closest(listSelector);
    this.level = getDepth(el) + 1;
    this.visualLevel = getDepth(el, true);
    this.setSelectionDefaults();
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    const { containerEl, parentListEl } = this;
    const focusIndex = focusMap.get(parentListEl);

    if (typeof focusIndex === "number") {
      const cells = this.getGridCells();
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
      <td class={CSS.selectionContainer} key="selection-container" onClick={this.handleItemClick}>
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

  renderDragHandle(): VNode {
    const { label, dragHandle, dragDisabled, setPosition, setSize } = this;

    return dragHandle ? (
      <td
        aria-label={label}
        class={CSS.dragContainer}
        key="drag-handle-container"
        onFocusin={this.focusCellHandle}
        role="gridcell"
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={(el) => (this.handleGridEl = el)}
      >
        <calcite-handle
          disabled={dragDisabled}
          label={label}
          setPosition={setPosition}
          setSize={setSize}
        />
      </td>
    ) : null;
  }

  renderOpen(): VNode {
    const { el, open, openable, parentListEl } = this;
    const dir = getElementDir(el);

    const icon = openable
      ? open
        ? ICONS.open
        : dir === "rtl"
          ? ICONS.closedRTL
          : ICONS.closedLTR
      : ICONS.blank;

    const clickHandler = openable ? this.handleToggleClick : this.handleItemClick;

    return openable || parentListEl?.openable ? (
      <td class={CSS.openContainer} key="open-container" onClick={clickHandler}>
        <calcite-icon icon={icon} key={icon} scale="s" />
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
        key="actions-start-container"
        onFocusin={this.focusCellActionsStart}
        role="gridcell"
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={(el) => (this.actionsStartEl = el)}
      >
        <slot name={SLOTS.actionsStart} onSlotchange={this.handleActionsStartSlotChange} />
      </td>
    );
  }

  renderActionsEnd(): VNode {
    const { label, hasActionsEnd, closable, messages } = this;
    return (
      <td
        aria-label={label}
        class={CSS.actionsEnd}
        hidden={!(hasActionsEnd || closable)}
        key="actions-end-container"
        onFocusin={this.focusCellActionsEnd}
        role="gridcell"
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={(el) => (this.actionsEndEl = el)}
      >
        <slot name={SLOTS.actionsEnd} onSlotchange={this.handleActionsEndSlotChange} />
        {closable ? (
          <calcite-action
            appearance="transparent"
            icon={ICONS.close}
            key="close-action"
            label={messages.close}
            onClick={this.handleCloseClick}
            text={messages.close}
          />
        ) : null}
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

  renderCustomContent(): VNode {
    const { hasCustomContent } = this;
    return (
      <div class={CSS.customContent} hidden={!hasCustomContent}>
        <slot name={SLOTS.content} onSlotchange={this.handleContentSlotChange} />
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

  renderContentBottom(): VNode {
    const { hasContentBottom, visualLevel } = this;
    return (
      <div
        class={CSS.contentBottom}
        hidden={!hasContentBottom}
        style={{ "--calcite-list-item-spacing-indent-multiplier": `${visualLevel}` }}
      >
        <slot name={SLOTS.contentBottom} onSlotchange={this.handleContentBottomSlotChange} />
      </div>
    );
  }

  renderDefaultContainer(): VNode {
    return (
      <div
        class={{
          [CSS.nestedContainer]: true,
          [CSS.nestedContainerHidden]: this.openable && !this.open,
        }}
      >
        <slot
          onSlotchange={this.handleDefaultSlotChange}
          ref={(el: HTMLSlotElement) => (this.defaultSlotEl = el)}
        />
      </div>
    );
  }

  renderContentProperties(): VNode {
    const { label, description, hasCustomContent } = this;

    return !hasCustomContent && (!!label || !!description) ? (
      <div class={CSS.content} key="content">
        {label ? (
          <div class={CSS.label} key="label">
            {label}
          </div>
        ) : null}
        {description ? (
          <div class={CSS.description} key="description">
            {description}
          </div>
        ) : null}
      </div>
    ) : null;
  }

  renderContentContainer(): VNode {
    const { description, label, selectionMode, hasCustomContent } = this;
    const hasCenterContent = hasCustomContent || !!label || !!description;
    const content = [
      this.renderContentStart(),
      this.renderCustomContent(),
      this.renderContentProperties(),
      this.renderContentEnd(),
    ];

    return (
      <td
        aria-label={label}
        class={{
          [CSS.contentContainer]: true,
          [CSS.contentContainerSelectable]: selectionMode !== "none",
          [CSS.contentContainerHasCenterContent]: hasCenterContent,
        }}
        key="content-container"
        onClick={this.handleItemClick}
        onFocusin={this.focusCellContent}
        role="gridcell"
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref={(el) => (this.contentEl = el)}
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
      selectionMode,
      closed,
      visualLevel,
    } = this;

    const showBorder = selectionMode !== "none" && selectionAppearance === "border";
    const borderSelected = showBorder && selected;
    const borderUnselected = showBorder && !selected;

    return (
      <Host>
        <InteractiveContainer disabled={this.disabled}>
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
              [CSS.containerBorderUnselected]: borderUnselected,
            }}
            hidden={closed}
            onFocus={this.focusCellNull}
            onFocusin={this.emitInternalListItemActive}
            onKeyDown={this.handleItemKeyDown}
            role="row"
            style={{ "--calcite-list-item-spacing-indent-multiplier": `${visualLevel}` }}
            tabIndex={active ? 0 : -1}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={(el) => (this.containerEl = el)}
          >
            {this.renderDragHandle()}
            {this.renderSelected()}
            {this.renderOpen()}
            {this.renderActionsStart()}
            {this.renderContentContainer()}
            {this.renderActionsEnd()}
          </tr>
          {this.renderContentBottom()}
          {this.renderDefaultContainer()}
        </InteractiveContainer>
      </Host>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private emitInternalListItemActive = (): void => {
    this.calciteInternalListItemActive.emit();
  };

  private focusCellHandle = (): void => {
    this.focusCell(this.handleGridEl);
  };

  private focusCellActionsStart = (): void => {
    this.focusCell(this.actionsStartEl);
  };

  private focusCellContent = (): void => {
    this.focusCell(this.contentEl);
  };

  private focusCellActionsEnd = (): void => {
    this.focusCell(this.actionsEndEl);
  };

  private emitCalciteInternalListItemChange(): void {
    this.calciteInternalListItemChange.emit();
  }

  private handleCloseClick = (): void => {
    this.closed = true;
    this.calciteListItemClose.emit();
  };

  private handleContentSlotChange = (event: Event): void => {
    this.hasCustomContent = slotChangeHasAssignedElement(event);
  };

  private handleActionsStartSlotChange = (event: Event): void => {
    this.hasActionsStart = slotChangeHasAssignedElement(event);
  };

  private handleActionsEndSlotChange = (event: Event): void => {
    this.hasActionsEnd = slotChangeHasAssignedElement(event);
  };

  private handleContentStartSlotChange = (event: Event): void => {
    this.hasContentStart = slotChangeHasAssignedElement(event);
  };

  private handleContentEndSlotChange = (event: Event): void => {
    this.hasContentEnd = slotChangeHasAssignedElement(event);
  };

  private handleContentBottomSlotChange = (event: Event): void => {
    this.hasContentBottom = slotChangeHasAssignedElement(event);
  };

  private setSelectionDefaults(): void {
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

  private handleOpenableChange(slotEl: HTMLSlotElement): void {
    if (!slotEl) {
      return;
    }

    const { parentListEl } = this;
    const listItemChildren = getListItemChildren(slotEl);
    const listItemChildLists = getListItemChildLists(slotEl);
    updateListItemChildren(listItemChildren);
    const openable = !!listItemChildren.length || !!listItemChildLists.length;

    if (openable && parentListEl && !parentListEl.openable) {
      parentListEl.openable = true;
    }

    this.openable = openable;

    if (!openable) {
      this.open = false;
    }
  }

  private handleDefaultSlotChange = (event: Event): void => {
    this.handleOpenableChange(event.target as HTMLSlotElement);
  };

  private handleToggleClick = (): void => {
    this.toggle();
  };

  private toggle = (value = !this.open): void => {
    this.open = value;
    this.calciteListItemToggle.emit();
  };

  private handleItemClick = (event: PointerEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    this.toggleSelected(event.shiftKey);
  };

  private toggleSelected = (shiftKey: boolean): void => {
    const { selectionMode, selected } = this;

    if (this.disabled) {
      return;
    }

    if (selectionMode === "multiple" || selectionMode === "single") {
      this.selected = !selected;
    } else if (selectionMode === "single-persist") {
      this.selected = true;
    }

    this.calciteInternalListItemSelectMultiple.emit({
      selectMultiple: shiftKey && selectionMode === "multiple",
    });
    this.calciteListItemSelect.emit();
  };

  private getGridCells(): HTMLTableCellElement[] {
    return [this.handleGridEl, this.actionsStartEl, this.contentEl, this.actionsEndEl].filter(
      (el) => el && !el.hidden,
    );
  }

  private handleItemKeyDown = (event: KeyboardEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    const { key } = event;
    const composedPath = event.composedPath();
    const { containerEl, actionsStartEl, actionsEndEl, open, openable } = this;

    const cells = this.getGridCells();
    const currentIndex = cells.findIndex((cell) => composedPath.includes(cell));

    if (
      key === "Enter" &&
      !composedPath.includes(actionsStartEl) &&
      !composedPath.includes(actionsEndEl)
    ) {
      event.preventDefault();
      this.toggleSelected(event.shiftKey);
    } else if (key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = currentIndex + 1;
      if (currentIndex === -1) {
        if (!open && openable) {
          this.toggle(true);
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
          this.toggle(false);
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

  private focusCellNull = (): void => {
    this.focusCell(null);
  };

  private focusCell = (focusEl: HTMLTableCellElement, saveFocusIndex = true): void => {
    const { parentListEl } = this;

    if (saveFocusIndex) {
      focusMap.set(parentListEl, null);
    }

    const focusedEl = getFirstTabbable(focusEl);

    this.getGridCells().forEach((tableCell, cellIndex) => {
      // Only one cell within a list-item should be focusable at a time. Ensures the active cell is focusable.
      if (tableCell === focusEl) {
        tableCell.tabIndex = focusEl === focusedEl ? 0 : -1;
        saveFocusIndex && focusMap.set(parentListEl, cellIndex);
        tableCell.setAttribute(dataTestActiveCellAttr, "");
      } else {
        tableCell.tabIndex = -1;
        tableCell.removeAttribute(dataTestActiveCellAttr);
      }
    });

    focusedEl?.focus();
  };
}
