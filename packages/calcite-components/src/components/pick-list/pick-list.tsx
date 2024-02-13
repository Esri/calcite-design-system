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
} from "@stencil/core";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { createObserver } from "../../utils/observers";
import { HeadingLevel } from "../functional/Heading";
import { ICON_TYPES } from "./resources";
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
  mutationObserverCallback,
  removeItem,
  selectSiblings,
  setFocus,
  setUpItems,
} from "./shared-list-logic";
import List from "./shared-list-render";

/**
 * @deprecated Use the `list` component instead.
 * @slot - A slot for adding `calcite-pick-list-item` or `calcite-pick-list-group` elements. Items are displayed as a vertical list.
 * @slot menu-actions - A slot for adding a button and menu combination for performing actions, such as sorting.
 */
@Component({
  tag: "calcite-pick-list",
  styleUrl: "pick-list.scss",
  shadow: true,
})
export class PickList<
    ItemElement extends HTMLCalcitePickListItemElement = HTMLCalcitePickListItemElement,
  >
  implements InteractiveComponent, LoadableComponent
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
   * The component's filtered items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) filteredItems: HTMLCalcitePickListItemElement[] = [];

  /**
   * The component's filtered data.
   *
   * @readonly
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by shared-list-logic
  @Prop({ mutable: true }) filteredData: ItemData = [];

  /**
   * When `true`, an input appears at the top of the list that can be used by end users to filter items in the list.
   */
  @Prop({ reflect: true }) filterEnabled = false;

  /**
   * Placeholder text for the filter input field.
   */
  @Prop({ reflect: true }) filterPlaceholder: string;

  /**
   * Text for the filter input field.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by shared-list-logic
  @Prop({ reflect: true, mutable: true }) filterText: string;

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /**
   * When `true`, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Similar to standard radio buttons and checkboxes.
   * When `true`, a user can select multiple `calcite-pick-list-item`s at a time.
   * When `false`, only a single `calcite-pick-list-item` can be selected at a time,
   * and a new selection will deselect previous selections.
   */
  @Prop({ reflect: true }) multiple = false;

  /**
   * When `true` and single selection is enabled, the selection changes when navigating `calcite-pick-list-item`s via keyboard.
   */
  @Prop({ reflect: true }) selectionFollowsFocus = false;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePickListElement;

  @State() selectedValues: Map<string, ItemElement> = new Map();

  @State() dataForFilter: ItemData = [];

  items: ItemElement[];

  lastSelectedItem: ItemElement = null;

  mutationObserver = createObserver("mutation", mutationObserverCallback.bind(this));

  emitCalciteListChange: () => void;

  emitCalciteListFilter: () => void;

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

  disconnectedCallback(): void {
    cleanUpObserver.call(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    handleInitialFilter.call(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits when any of the `calcite-pick-list-item` selections have changed.
   */
  @Event({ cancelable: false }) calciteListChange: EventEmitter<
    Map<string, HTMLCalcitePickListItemElement>
  >;

  /**
   * Emits when a filter has changed.
   */
  @Event({ cancelable: false }) calciteListFilter: EventEmitter<void>;

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

  @Listen("focusout")
  calciteListFocusOutHandler(event: FocusEvent): void {
    calciteListFocusOutHandler.call(this, event);
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

  setFilterEl = (el: HTMLCalciteFilterElement): void => {
    this.filterEl = el;
  };

  setFilteredItems = (filteredItems: any[]): void => {
    this.filteredItems = filteredItems;
  };

  deselectRemovedItems = deselectRemovedItems.bind(this);

  deselectSiblingItems = deselectSiblingItems.bind(this);

  selectSiblings = selectSiblings.bind(this);

  handleFilter = handleFilter.bind(this);

  handleFilterEvent = handleFilterEvent.bind(this);

  getItemData = getItemData.bind(this);

  keyDownHandler = keyDownHandler.bind(this);

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Returns the component's selected `calcite-pick-list-item`s. */
  @Method()
  async getSelectedItems(): Promise<Map<string, HTMLCalcitePickListItemElement>> {
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

  getIconType(): ICON_TYPES {
    return this.multiple ? ICON_TYPES.square : ICON_TYPES.circle;
  }

  render(): VNode {
    return <List onKeyDown={this.keyDownHandler} props={this} />;
  }
}
