import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import Sortable from "sortablejs";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  updateHostInteraction,
} from "../../utils/interactive";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { createObserver } from "../../utils/observers";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import {
  calciteInternalListItemValueChangeHandler,
  calciteListFocusOutHandler,
  calciteListItemChangeHandler,
  cleanUpObserver,
  deselectRemovedItems,
  deselectSiblingItems,
  getItemData,
  handleFilter,
  handleFilterEvent,
  handleInitialFilter,
  initialize,
  initializeObserver,
  ItemData,
  keyDownHandler,
  ListFocusId,
  moveItemIndex,
  mutationObserverCallback,
  removeItem,
  selectSiblings,
  setFocus,
  setUpItems,
} from "../pick-list/shared-list-logic";
import List from "../pick-list/shared-list-render";
import { ListItemAndHandle } from "../value-list-item/interfaces";
import { ValueListMessages } from "./assets/value-list/t9n";
import { CSS, ICON_TYPES } from "./resources";
import { getHandleAndItemElement, getScreenReaderText } from "./utils";
import {
  DragDetail,
  connectSortableComponent,
  disconnectSortableComponent,
  SortableComponent,
  dragActive,
} from "../../utils/sortableComponent";
import { focusElement } from "../../utils/dom";

/**
 * @deprecated Use the `list` component instead.
 * @slot - A slot for adding `calcite-value-list-item` elements. List items are displayed as a vertical list.
 * @slot menu-actions - A slot for adding a button and menu combination for performing actions, such as sorting.
 */
@Component({
  tag: "calcite-value-list",
  styleUrl: "value-list.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class ValueList<
    ItemElement extends HTMLCalciteValueListItemElement = HTMLCalciteValueListItemElement,
  >
  implements
    InteractiveComponent,
    LoadableComponent,
    LocalizedComponent,
    T9nComponent,
    SortableComponent
{
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When provided, the method will be called to determine whether the element can  move from the list.
   */
  @Prop() canPull: (detail: DragDetail) => boolean;

  /**
   * When provided, the method will be called to determine whether the element can be added from another list.
   */
  @Prop() canPut: (detail: DragDetail) => boolean;

  /**
   * When `true`, `calcite-value-list-item`s are sortable via a draggable button.
   */
  @Prop({ reflect: true }) dragEnabled = false;

  /**
   * The currently filtered items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) filteredItems: HTMLCalciteValueListItemElement[] = [];

  /**
   * The currently filtered data.
   *
   * @readonly
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by shared-list-logic module
  @Prop({ mutable: true }) filteredData: ItemData = [];

  /**
   * When `true`, an input appears at the top of the component that can be used by end users to filter list items.
   */
  @Prop({ reflect: true }) filterEnabled = false;

  /**
   * Placeholder text for the filter's input field.
   */
  @Prop({ reflect: true }) filterPlaceholder: string;

  /**
   * Text for the filter input field.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by shared-list-logic module
  @Prop({ reflect: true, mutable: true }) filterText: string;

  /**
   * The component's group identifier.
   *
   * To drag elements from one list into another, both lists must have the same group value.
   */
  @Prop({ reflect: true }) group?: string;

  /**
   * When `true`, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Similar to standard radio buttons and checkboxes.
   * When `true`, a user can select multiple `calcite-value-list-item`s at a time.
   * When `false`, only a single `calcite-value-list-item` can be selected at a time,
   * and a new selection will deselect previous selections.
   */
  @Prop({ reflect: true }) multiple = false;

  /**
   * When `true` and single-selection is enabled, the selection changes when navigating `calcite-value-list-item`s via keyboard.
   */
  @Prop({ reflect: true }) selectionFollowsFocus = false;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ValueListMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ValueListMessages;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteValueListElement;

  @State() dataForFilter: ItemData = [];

  @State() defaultMessages: ValueListMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() selectedValues: Map<string, ItemElement> = new Map();

  items: ItemElement[];

  lastSelectedItem: ItemElement = null;

  mutationObserver = createObserver("mutation", mutationObserverCallback.bind(this));

  sortable: Sortable;

  emitCalciteListChange: () => void;

  emitCalciteListFilter: () => void;

  filterEl: HTMLCalciteFilterElement;

  assistiveTextEl: HTMLSpanElement;

  handleSelector = `.${CSS.handle}`;

  dragSelector = "calcite-value-list-item";

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    if (dragActive(this)) {
      return;
    }

    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
    initialize.call(this);
    initializeObserver.call(this);
    this.setUpSorting();
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    handleInitialFilter.call(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    if (dragActive(this)) {
      return;
    }

    disconnectInteractive(this);
    disconnectSortableComponent(this);
    disconnectLocalized(this);
    disconnectMessages(this);
    cleanUpObserver.call(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits when any of the list item selections have changed.
   */
  @Event({ cancelable: false }) calciteListChange: EventEmitter<
    Map<string, HTMLCalciteValueListItemElement>
  >;

  /**
   * Emits when the order of the list has changed.
   */
  @Event({ cancelable: false }) calciteListOrderChange: EventEmitter<any[]>;

  /**
   * Emits when a filter has changed.
   */
  @Event({ cancelable: false }) calciteListFilter: EventEmitter<void>;

  @Listen("focusout")
  calciteListFocusOutHandler(event: FocusEvent): void {
    calciteListFocusOutHandler.call(this, event);
  }

  @Listen("calciteListItemRemove")
  calciteListItemRemoveHandler(event: CustomEvent<void>): void {
    removeItem.call(this, event);
  }

  @Listen("calciteListItemChange")
  calciteListItemChangeHandler(event: CustomEvent): void {
    calciteListItemChangeHandler.call(this, event);
  }

  @Listen("calciteInternalListItemPropsChange")
  calciteInternalListItemPropsChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.setUpFilter();
  }

  @Listen("calciteInternalListItemValueChange")
  calciteInternalListItemValueChangeHandler(event: CustomEvent): void {
    calciteInternalListItemValueChangeHandler.call(this, event);
    event.stopPropagation();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  onGlobalDragStart(): void {
    cleanUpObserver.call(this);
  }

  onGlobalDragEnd(): void {
    initializeObserver.call(this);
  }

  onDragEnd(): void {}

  onDragStart(): void {}

  onDragSort(): void {
    this.items = Array.from(this.el.querySelectorAll<ItemElement>("calcite-value-list-item"));
    const values = this.items.map((item) => item.value);
    this.calciteListOrderChange.emit(values);
  }

  getItems(): ItemElement[] {
    return Array.from(this.el.querySelectorAll<ItemElement>("calcite-value-list-item"));
  }

  setUpItems(): void {
    setUpItems.call(this, "calcite-value-list-item");
    this.setUpSorting();
  }

  setUpFilter(): void {
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
  }

  setFilterEl = (el: HTMLCalciteFilterElement): void => {
    this.filterEl = el;
  };

  setFilteredItems = (filteredItems: HTMLCalciteValueListItemElement[]): void => {
    this.filteredItems = filteredItems;
  };

  setUpSorting(): void {
    const { dragEnabled } = this;

    if (!dragEnabled) {
      return;
    }

    connectSortableComponent(this);
  }

  deselectRemovedItems = deselectRemovedItems.bind(this);

  deselectSiblingItems = deselectSiblingItems.bind(this);

  selectSiblings = selectSiblings.bind(this);

  handleFilter = handleFilter.bind(this);

  handleFilterEvent = handleFilterEvent.bind(this);

  getItemData = getItemData.bind(this);

  keyDownHandler = (event: KeyboardEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    const { handle, item } = getHandleAndItemElement(event);
    if (handle && !item.handleActivated && event.key === " ") {
      this.updateScreenReaderText(getScreenReaderText(item, "commit", this));
    }

    if (!handle || !item.handleActivated) {
      keyDownHandler.call(this, event);
      return;
    }

    event.preventDefault();

    const { items } = this;

    if (event.key === " ") {
      this.updateScreenReaderText(getScreenReaderText(item, "active", this));
    }

    if ((event.key !== "ArrowUp" && event.key !== "ArrowDown") || items.length <= 1) {
      return;
    }

    const { el } = this;
    const nextIndex = moveItemIndex(this, item, event.key === "ArrowUp" ? "up" : "down");
    if (nextIndex === items.length - 1) {
      el.appendChild(item);
    } else {
      const itemAtNextIndex = el.children[nextIndex];
      const insertionReferenceItem =
        itemAtNextIndex === item.nextElementSibling
          ? itemAtNextIndex.nextElementSibling
          : itemAtNextIndex;
      el.insertBefore(item, insertionReferenceItem);
    }

    this.items = this.getItems();
    this.calciteListOrderChange.emit(this.items.map(({ value }) => value));

    requestAnimationFrame(() => focusElement(handle));
    item.handleActivated = true;

    this.updateHandleAriaLabel(handle, getScreenReaderText(item, "change", this));
  };

  handleBlur(): void {
    if (this.dragEnabled) {
      this.updateScreenReaderText("");
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Returns the currently selected items */
  @Method()
  async getSelectedItems(): Promise<Map<string, HTMLCalciteValueListItemElement>> {
    return this.selectedValues;
  }

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param focusId
   */
  @Method()
  async setFocus(focusId?: ListFocusId): Promise<void> {
    await componentFocusable(this);

    return setFocus.call(this, focusId);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  getIconType(): ICON_TYPES | null {
    let type = null;
    if (this.dragEnabled) {
      type = ICON_TYPES.grip;
    }
    return type;
  }

  updateScreenReaderText(text: string): void {
    this.assistiveTextEl.textContent = text;
  }

  updateHandleAriaLabel(handleElement: HTMLSpanElement, text: string): void {
    handleElement.ariaLabel = text;
  }

  storeAssistiveEl = (el: HTMLSpanElement): void => {
    this.assistiveTextEl = el;
  };

  handleFocusIn = (event: FocusEvent): void => {
    const { handle, item } = getHandleAndItemElement(event);
    if (!item?.handleActivated && item && handle) {
      this.updateHandleAriaLabel(handle, getScreenReaderText(item, "idle", this));
    }
  };

  @Listen("calciteValueListItemDragHandleBlur")
  handleValueListItemBlur(event: CustomEvent<ListItemAndHandle>): void {
    const { item, handle } = event.detail;
    if (!item?.handleActivated && item) {
      this.updateHandleAriaLabel(handle, getScreenReaderText(item, "idle", this));
    }
    event.stopPropagation();
  }

  render(): VNode {
    return (
      <List
        onBlur={this.handleBlur}
        onFocusin={this.handleFocusIn}
        onKeyDown={this.keyDownHandler}
        props={this}
      />
    );
  }
}
