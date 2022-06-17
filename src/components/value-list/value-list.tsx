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
  calciteListFocusOutHandler,
  calciteListItemChangeHandler,
  calciteInternalListItemValueChangeHandler,
  cleanUpObserver,
  deselectSiblingItems,
  deselectRemovedItems,
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
  setUpItems,
  moveItemIndex,
  getItemIndex
} from "../pick-list/shared-list-logic";
import List from "../pick-list/shared-list-render";
import { createObserver } from "../../utils/observers";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { DragStatus } from "./interfaces";

/**
 * @slot - A slot for adding `calcite-value-list-item` elements. List items are displayed as a vertical list.
 * @slot menu-actions - A slot for adding a button and menu combination for performing actions, such as sorting.
 */
@Component({
  tag: "calcite-value-list",
  styleUrl: "value-list.scss",
  shadow: true
})
export class ValueList<
  ItemElement extends HTMLCalciteValueListItemElement = HTMLCalciteValueListItemElement
> implements InteractiveComponent
{
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, prevents user interaction. This state shows list items grayed out and with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When true, list items are sortable via a draggable button.
   */
  @Prop({ reflect: true }) dragEnabled = false;

  /**
   * When true, an input appears at the top of the list that can be used by end users to filter list items.
   */
  @Prop({ reflect: true }) filterEnabled = false;

  /**
   * Placeholder text for the filter's input field.
   */
  @Prop({ reflect: true }) filterPlaceholder: string;

  /**
   * The list's group identifier.
   *
   * To drag elements from one list into another, both lists must have the same group value.
   */
  @Prop() group?: string;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Similar to standard radio buttons and checkboxes.
   * When true, a user can select multiple list items at a time.
   * When false, only a single list item can be selected at a time,
   * and selecting a new list item will deselect any other selected list items.
   */
  @Prop({ reflect: true }) multiple = false;

  /**
   * When true and single-selection is enabled, the selection changes when navigating list items via the keyboard.
   */
  @Prop() selectionFollowsFocus = false;

  /**
   * localize the screen reader text when drag button is focused
   *
   * use ${itemposition} of ${totalitems} as place holder for indexes.
   */
  @Prop() intlDragHandleStart?: string;

  /**
   * localize the screen reader text when drag button is activated
   *
   * use ${itemposition} of ${totalitems} as place holder for displaying index.
   */
  @Prop() intlDragHandleActivated?: string;

  /**
   * localize the screen reader text when the item is moved to a new position
   *
   * use ${newPosition} of ${totalItems} as place holder for displaying index
   */
  @Prop() intlDragHandleNewPosition?: string;

  /**
   * localize the screen reader text after the item is moved to a new position and handle is deactivated.
   *
   * use ${itemposition} of ${totalitems} as place holder for displaying indexes.
   */
  @Prop() intlDragHandleCurrentPosition?: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @State() selectedValues: Map<string, ItemElement> = new Map();

  @State() dataForFilter: ItemData = [];

  items: ItemElement[];

  lastSelectedItem: ItemElement = null;

  mutationObserver = createObserver("mutation", mutationObserverCallback.bind(this));

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

  componentDidRender(): void {
    updateHostInteraction(this);
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
   * Emits when any of the list item selections have changed.
   */
  @Event() calciteListChange: EventEmitter<Map<string, HTMLCalciteValueListItemElement>>;

  /**
   * Emits when the order of the list has changed.
   */
  @Event() calciteListOrderChange: EventEmitter<any[]>;

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

  getItems(): ItemElement[] {
    return Array.from(this.el.querySelectorAll<ItemElement>("calcite-value-list-item"));
  }

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
    this.cleanUpDragAndDrop();

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
    this.sortable?.destroy();
    this.sortable = null;
  }

  deselectRemovedItems = deselectRemovedItems.bind(this);

  deselectSiblingItems = deselectSiblingItems.bind(this);

  selectSiblings = selectSiblings.bind(this);

  handleFilter = handleFilter.bind(this);

  role = "list";

  getItemData = getItemData.bind(this);

  keyDownHandler = (event: KeyboardEvent): void => {
    const { handleElement, item } = this.getHandleAndItemElement(event);

    if (handleElement && !item.handleActivated && event.key === " ") {
      this.updateScreenReaderText(
        this.intlDragHandleCurrentPosition
          ? this.intlDragHandleCurrentPosition
          : this.getScreenReaderText(item, "currentPosition")
      );
    }

    if (!handleElement || !item.handleActivated) {
      keyDownHandler.call(this, event);
      return;
    }

    const { items } = this;

    if (event.key === " ") {
      this.updateScreenReaderText(
        this.intlDragHandleActivated
          ? this.intlDragHandleActivated
          : this.getScreenReaderText(item, "activated")
      );
    }

    if ((event.key !== "ArrowUp" && event.key !== "ArrowDown") || items.length <= 1) {
      return;
    }

    event.preventDefault();

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

    requestAnimationFrame(() => handleElement?.focus());
    item.handleActivated = true;

    this.updateScreenReaderText(
      this.intlDragHandleNewPosition
        ? this.intlDragHandleNewPosition
        : this.getScreenReaderText(item, "newPosition")
    );
  };

  focusInHandler = (event: FocusEvent): void => {
    const { handleElement, item } = this.getHandleAndItemElement(event);
    if (!handleElement) {
      return;
    }
    if (!item.handleActivated) {
      this.updateScreenReaderText(
        this.intlDragHandleStart
          ? this.intlDragHandleStart
          : this.getScreenReaderText(item, "start")
      );
    }
  };

  getHandleAndItemElement(event: KeyboardEvent | FocusEvent): {
    handleElement: HTMLCalciteHandleElement;
    item: HTMLCalciteValueListItemElement;
  } {
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

    return { handleElement, item };
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
   * Sets focus on the component.
   *
   * @param focusId
   */
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

  updateScreenReaderText(assertiveText: string): void {
    //code to update text to our aria-live span element
    const screenReaderElement = this.el.shadowRoot.querySelector(".assistive-text");
    screenReaderElement.textContent = assertiveText;
  }

  getScreenReaderText(item: HTMLCalciteValueListItemElement, status: DragStatus): string {
    const { items } = this;
    const total = items.length;
    const position = getItemIndex(this, item) + 1;

    switch (status) {
      case "start":
        return `press space and use arrow keys to re-order content. current position ${position} of ${total}`;
      case "activated":
        return `Reordering.current position ${position} of ${total}`;
      case "newPosition":
        return `new position ${position} of ${total}. press space to confirm`;
      case "currentPosition":
        return `current position ${position} of ${total}`;
      default:
        break;
    }
  }

  render(): VNode {
    return <List onFocusin={this.focusInHandler} onKeyDown={this.keyDownHandler} props={this} />;
  }
}
