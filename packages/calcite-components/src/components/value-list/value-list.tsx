import Sortable from "sortablejs";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { createObserver } from "../../utils/observers";
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
import {
  DragDetail,
  connectSortableComponent,
  disconnectSortableComponent,
  SortableComponent,
} from "../../utils/sortableComponent";
import { focusElement, toAriaBoolean } from "../../utils/dom";
import { logger } from "../../utils/logger";
import { useT9n } from "../../controllers/useT9n";
import type { ValueListItem } from "../value-list-item/value-list-item";
import type { Filter } from "../filter/filter";
import T9nStrings from "./assets/t9n/value-list.t9n.en.json";
import { CSS, ICON_TYPES } from "./resources";
import { getHandleAndItemElement, getScreenReaderText } from "./utils";
import { styles } from "./value-list.scss";

declare global {
  interface DeclareElements {
    "calcite-value-list": ValueList;
  }
}

logger.deprecated("component", {
  name: "value-list",
  removalVersion: 3,
  suggested: "list",
});

/**
 * @deprecated Use the `calcite-list` component instead.
 * @slot - A slot for adding `calcite-value-list-item` elements. List items are displayed as a vertical list.
 * @slot menu-actions - A slot for adding a button and menu combination for performing actions, such as sorting.
 */
export class ValueList<ItemElement extends ValueListItem["el"] = ValueListItem["el"]>
  extends LitElement
  implements InteractiveComponent, LoadableComponent, SortableComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private assistiveTextEl: HTMLSpanElement;

  deselectRemovedItems = deselectRemovedItems.bind(this);

  deselectSiblingItems = deselectSiblingItems.bind(this);

  dragSelector = "calcite-value-list-item";

  emitCalciteListChange: () => void;

  emitCalciteListFilter: () => void;

  filterEl: Filter["el"];

  getItemData = getItemData.bind(this);

  handleFilter = handleFilter.bind(this);

  handleFilterEvent = handleFilterEvent.bind(this);

  handleSelector = `.${CSS.handle}`;

  items: ItemElement[];

  lastSelectedItem: ItemElement = null;

  mutationObserver = createObserver("mutation", mutationObserverCallback.bind(this));

  selectSiblings = selectSiblings.bind(this);

  setFilterEl = (el: Filter["el"]): void => {
    this.filterEl = el;
  };

  sortable: Sortable;

  storeAssistiveEl = (el: HTMLSpanElement): void => {
    this.assistiveTextEl = el;
  };

  // #endregion

  // #region State Properties

  @state() dataForFilter: ItemData = [];

  @state() selectedValues: Map<string, ItemElement> = new Map();

  // #endregion

  // #region Public Properties

  /** When provided, the method will be called to determine whether the element can move from the list. */
  @property() canPull: (detail: DragDetail) => boolean;

  /** When provided, the method will be called to determine whether the element can be added from another list. */
  @property() canPut: (detail: DragDetail) => boolean;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, `calcite-value-list-item`s are sortable via a draggable button. */
  @property({ reflect: true }) dragEnabled = false;

  /** When `true`, an input appears at the top of the component that can be used by end users to filter list items. */
  @property({ reflect: true }) filterEnabled = false;

  /** Placeholder text for the filter's input field. */
  @property({ reflect: true }) filterPlaceholder: string;

  /** Text for the filter input field. */
  @property({ reflect: true }) filterText: string;

  /**
   * The currently filtered data.
   *
   * @readonly
   */
  @property() filteredData: ItemData = [];

  /**
   * The currently filtered items.
   *
   * @readonly
   */
  @property() filteredItems: ValueListItem["el"][] = [];

  /**
   * The component's group identifier.
   *
   * To drag elements from one list into another, both lists must have the same group value.
   */
  @property({ reflect: true }) group?: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @notPublic
   */
  /** TODO: [MIGRATION] This component has been updated to use the useT9n() controller. Documentation: https://qawebgis.esri.com/arcgis-components/?path=/docs/references-t9n-for-components--docs */
  private messages = useT9n<typeof T9nStrings>();

  /**
   * Similar to standard radio buttons and checkboxes.
   * When `true`, a user can select multiple `calcite-value-list-item`s at a time.
   * When `false`, only a single `calcite-value-list-item` can be selected at a time,
   * and a new selection will deselect previous selections.
   */
  @property({ reflect: true }) multiple = false;

  /** When `true` and single-selection is enabled, the selection changes when navigating `calcite-value-list-item`s via keyboard. */
  @property({ reflect: true }) selectionFollowsFocus = false;

  // #endregion

  // #region Public Methods

  /** Returns the component's selected items. */
  @method()
  async getSelectedItems(): Promise<Map<string, ValueListItem["el"]>> {
    return this.selectedValues;
  }

  /**
   * Sets focus on the component's first focusable element.
   *
   * @param focusId
   */
  @method()
  async setFocus(focusId?: ListFocusId): Promise<void> {
    await componentFocusable(this);

    return setFocus.call(this, focusId);
  }

  // #endregion

  // #region Events

  /** Emits when any of the list item selections have changed. */
  calciteListChange = createEvent<Map<string, ValueListItem["el"]>>({ cancelable: false });

  /** Emits when a filter has changed. */
  calciteListFilter = createEvent({ cancelable: false });

  /** Emits when the order of the list has changed. */
  calciteListOrderChange = createEvent<any[]>({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("focusout", this.calciteListFocusOutHandler);
    this.listen("calciteListItemRemove", this.calciteListItemRemoveHandler);
    this.listen("calciteListItemChange", this.calciteListItemChangeHandler);
    this.listen(
      "calciteInternalListItemPropsChange",
      this.calciteInternalListItemPropsChangeHandler,
    );
    this.listen(
      "calciteInternalListItemValueChange",
      this.calciteInternalListItemValueChangeHandler,
    );
    this.listen("calciteValueListItemDragHandleBlur", this.handleValueListItemBlur);
    this.listen("blur", this.handleBlur);
    this.listen("focusin", this.handleFocusIn);
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    initialize.call(this);
    initializeObserver.call(this);
    this.setUpSorting();
  }

  async load(): Promise<void> {
    setUpLoadableComponent(this);
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    setComponentLoaded(this);
    handleInitialFilter.call(this);
  }

  override disconnectedCallback(): void {
    disconnectSortableComponent(this);
    cleanUpObserver.call(this);
  }

  // #endregion

  // #region Private Methods

  private calciteListFocusOutHandler(event: FocusEvent): void {
    calciteListFocusOutHandler.call(this, event);
  }

  private calciteListItemRemoveHandler(event: CustomEvent<void>): void {
    removeItem.call(this, event);
  }

  private calciteListItemChangeHandler(event: CustomEvent): void {
    calciteListItemChangeHandler.call(this, event);
  }

  private calciteInternalListItemPropsChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.setUpFilter();
  }

  private calciteInternalListItemValueChangeHandler(event: CustomEvent): void {
    calciteInternalListItemValueChangeHandler.call(this, event);
    event.stopPropagation();
  }

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

  private getItems(): ItemElement[] {
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

  setFilteredItems(filteredItems: ValueListItem["el"][]): void {
    this.filteredItems = filteredItems;
  }

  private setUpSorting(): void {
    const { dragEnabled } = this;

    if (!dragEnabled) {
      return;
    }

    connectSortableComponent(this);
  }

  private keyDownHandler(event: KeyboardEvent): void {
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
  }

  private handleBlur(): void {
    if (this.dragEnabled) {
      this.updateScreenReaderText("");
    }
  }

  getIconType(): typeof ICON_TYPES | null {
    let type = null;
    if (this.dragEnabled) {
      type = ICON_TYPES.grip;
    }
    return type;
  }

  private updateScreenReaderText(text: string): void {
    this.assistiveTextEl.textContent = text;
  }

  private updateHandleAriaLabel(handleElement: HTMLSpanElement, text: string): void {
    handleElement.ariaLabel = text;
  }

  private handleFocusIn(event: FocusEvent): void {
    const { handle, item } = getHandleAndItemElement(event);
    if (!item?.handleActivated && item && handle) {
      this.updateHandleAriaLabel(handle, getScreenReaderText(item, "idle", this));
    }
  }

  private handleValueListItemBlur(event: CustomEvent<ListItemAndHandle>): void {
    const { item, handle } = event.detail;
    if (!item?.handleActivated && item) {
      this.updateHandleAriaLabel(handle, getScreenReaderText(item, "idle", this));
    }
    event.stopPropagation();
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaBusy = toAriaBoolean(this.loading);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = "menu";
    return <List props={this} />;
  }

  // #endregion
}
