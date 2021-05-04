import Sortable from "sortablejs";
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
  VNode
} from "@stencil/core";
import { CSS, ICON_TYPES } from "./resources";
import {
  ListFocusId,
  calciteListItemChangeHandler,
  calciteListItemValueChangeHandler,
  cleanUpObserver,
  deselectSiblingItems,
  getItemData,
  handleFilter,
  initialize,
  initializeObserver,
  ItemData,
  keyDownHandler,
  mutationObserverCallback,
  removeItem,
  selectSiblings,
  setFocus,
  setUpItems
} from "../calcite-pick-list/shared-list-logic";
import List from "../calcite-pick-list/shared-list-render";
import { getRoundRobinIndex } from "../../utils/array";
import { Theme } from "../interfaces";

/**
 * @slot - A slot for adding `calcite-pick-list-item` elements or `calcite-pick-list-group` elements. Items are displayed as a vertical list.
 * @slot menu-actions - A slot for adding a button + menu combo for performing actions like sorting.
 */
@Component({
  tag: "calcite-value-list",
  styleUrl: "./calcite-value-list.scss",
  shadow: true
})
export class CalciteValueList<
  ItemElement extends HTMLCalciteValueListItemElement = HTMLCalciteValueListItemElement
> {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When true, the items will be sortable via drag and drop.
   */
  @Prop({ reflect: true }) dragEnabled = false;

  /**
   * When true, an input appears at the top of the list that can be used by end users to filter items in the list.
   */
  @Prop({ reflect: true }) filterEnabled = false;

  /**
   * Placeholder text for the filter input field.
   */
  @Prop({ reflect: true }) filterPlaceholder: string;

  /**
   * If this is set and drag is enabled, items can be dropped between lists of the same group.
   */
  @Prop() group: string;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Multiple Works similar to standard radio buttons and checkboxes.
   * When true, a user can select multiple items at a time.
   * When false, only a single item can be selected at a time
   * and selecting a new item will deselect any other selected items.
   */
  @Prop({ reflect: true }) multiple = false;

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: Theme;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @State() selectedValues: Map<string, ItemElement> = new Map();

  @State() dataForFilter: ItemData = [];

  items: ItemElement[];

  lastSelectedItem: ItemElement = null;

  observer = new MutationObserver(mutationObserverCallback.bind(this));

  sortable: Sortable;

  @Element() el: HTMLCalciteValueListElement;

  emitCalciteListChange: () => void;

  filterEl: HTMLCalciteFilterElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    initialize.call(this);
    initializeObserver.call(this);
  }

  componentDidLoad(): void {
    this.setUpDragAndDrop();
  }

  disconnectedCallback(): void {
    cleanUpObserver.call(this);
    this.cleanUpDragAndDrop();
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when any of the item selections have changed.
   */
  @Event() calciteListChange: EventEmitter;

  /**
   * Emitted when the order of the list has changed.
   */
  @Event() calciteListOrderChange: EventEmitter;

  @Listen("calciteListItemRemove")
  calciteListItemRemoveHandler(event: CustomEvent<void>): void {
    removeItem.call(this, event);
  }

  @Listen("calciteListItemChange")
  calciteListItemChangeHandler(event: CustomEvent): void {
    calciteListItemChangeHandler.call(this, event);
  }

  @Listen("calciteListItemPropsChange")
  calciteListItemPropsChangeHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.setUpFilter();
  }

  @Listen("calciteListItemValueChange")
  calciteListItemValueChangeHandler(event: CustomEvent): void {
    calciteListItemValueChangeHandler.call(this, event);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setUpItems(): void {
    setUpItems.call(this, "calcite-value-list-item");
  }

  setUpFilter(): void {
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
  }

  setFilterEl = (el: HTMLCalciteFilterElement): void => {
    this.filterEl = el;
  };

  setUpDragAndDrop(): void {
    if (!this.dragEnabled) {
      return;
    }

    this.sortable = Sortable.create(this.el, {
      dataIdAttr: "id",
      handle: `.${CSS.handle}`,
      draggable: "calcite-value-list-item",
      group: this.group,
      onSort: () => {
        this.items = Array.from(this.el.querySelectorAll<ItemElement>("calcite-value-list-item"));
        const values = this.items.map((item) => item.value);
        this.calciteListOrderChange.emit(values);
      }
    });
  }

  cleanUpDragAndDrop(): void {
    if (!this.dragEnabled) {
      return;
    }
    this.sortable.destroy();
  }

  deselectSiblingItems = deselectSiblingItems.bind(this);

  selectSiblings = selectSiblings.bind(this);

  handleFilter = handleFilter.bind(this);

  getItemData = getItemData.bind(this);

  keyDownHandler = (event: KeyboardEvent): void => {
    const handleElement = event
      .composedPath()
      .find(
        (item: HTMLElement) => item.dataset?.jsHandle !== undefined
      ) as HTMLCalciteHandleElement;

    const item = event
      .composedPath()
      .find(
        (item: HTMLElement) => item.tagName?.toLowerCase() === "calcite-value-list-item"
      ) as ItemElement;

    // Only trigger keyboard sorting when the internal drag handle is focused and activated
    if (!handleElement || !item.handleActivated) {
      keyDownHandler.call(this, event);
      return;
    }

    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
      return;
    }

    event.preventDefault();

    const { el, items } = this;
    const moveOffset = event.key === "ArrowDown" ? 1 : -1;
    const currentIndex = items.indexOf(item);
    const nextIndex = getRoundRobinIndex(currentIndex + moveOffset, items.length);

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

    requestAnimationFrame(() => handleElement.focus());
    item.handleActivated = true;
  };

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  @Method()
  async getSelectedItems(): Promise<Map<string, HTMLCalciteValueListItemElement>> {
    return this.selectedValues;
  }

  @Method()
  async setFocus(focusId?: ListFocusId): Promise<void> {
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

  render(): VNode {
    return <List onKeyDown={this.keyDownHandler} props={this} />;
  }
}
