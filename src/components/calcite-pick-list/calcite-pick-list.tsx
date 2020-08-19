import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Method,
  Prop,
  State,
  h,
  VNode
} from "@stencil/core";
import { ICON_TYPES, TEXT } from "./resources";
import {
  calciteListItemChangeHandler,
  calciteListItemValueChangeHandler,
  cleanUpObserver,
  deselectSiblingItems,
  getItemData,
  handleFilter,
  initialize,
  initializeObserver,
  mutationObserverCallback,
  selectSiblings,
  setUpItems,
  keyDownHandler,
  setFocus,
  ItemData
} from "./shared-list-logic";
import List from "./shared-list-render";

/**
 * @slot - A slot for adding `calcite-pick-list-item` elements or `calcite-pick-list-group` elements. Items are displayed as a vertical list.
 * @slot menu-actions - A slot for adding a button + menu combo for performing actions like sorting.
 */
@Component({
  tag: "calcite-pick-list",
  styleUrl: "./calcite-pick-list.scss",
  shadow: true
})
export class CalcitePickList<
  ItemElement extends HTMLCalcitePickListItemElement = HTMLCalcitePickListItemElement
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
   * When true, an input appears at the top of the list that can be used by end users to filter items in the list.
   */
  @Prop({ reflect: true }) filterEnabled = false;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Multiple works similar to standard radio buttons and checkboxes.
   * When true, a user can select multiple items at a time.
   * When false, only a single item can be selected at a time
   * and selecting a new item will deselect any other selected items.
   */
  @Prop({ reflect: true }) multiple = false;

  /**
   * Placeholder text for the filter input field.
   */
  @Prop({ reflect: true }) textFilterPlaceholder: string = TEXT.filterPlaceholder;

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

  @Element() el: HTMLCalcitePickListElement;

  emitCalciteListChange: () => void;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    initialize.call(this);
    initializeObserver.call(this);
  }

  disconnectedCallback(): void {
    cleanUpObserver.call(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when any of the item selections have changed.
   * @event calciteListChange
   */
  @Event() calciteListChange: EventEmitter;

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
    setUpItems.call(this, "calcite-pick-list-item");
  }

  setUpFilter(): void {
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
  }

  deselectSiblingItems = deselectSiblingItems.bind(this);

  selectSiblings = selectSiblings.bind(this);

  handleFilter = handleFilter.bind(this);

  getItemData = getItemData.bind(this);

  keyDownHandler = keyDownHandler.bind(this);

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  @Method()
  async getSelectedItems(): Promise<Map<string, HTMLCalcitePickListItemElement>> {
    return this.selectedValues;
  }

  @Method()
  async setFocus(): Promise<void> {
    return setFocus.call(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  getIconType(): ICON_TYPES {
    return this.multiple ? ICON_TYPES.square : ICON_TYPES.circle;
  }

  render(): VNode {
    return <List props={this} onKeyDown={this.keyDownHandler} />;
  }
}
