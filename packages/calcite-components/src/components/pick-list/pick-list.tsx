import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { createObserver } from "../../utils/observers";
import { HeadingLevel } from "../functional/Heading";
import type { ValueUnion } from "../types";
import { logger } from "../../utils/logger";
import { toAriaBoolean } from "../../utils/dom";
import type { PickListItem } from "../pick-list-item/pick-list-item";
import type { Filter } from "../filter/filter";
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
import { styles } from "./pick-list.scss";

declare global {
  interface DeclareElements {
    "calcite-pick-list": PickList;
  }
}

logger.deprecated("component", {
  name: "pick-list",
  removalVersion: 3,
  suggested: "list",
});

/**
 * @deprecated Use the `calcite-list` component instead.
 * @slot - A slot for adding `calcite-pick-list-item` or `calcite-pick-list-group` elements. Items are displayed as a vertical list.
 * @slot menu-actions - A slot for adding a button and menu combination for performing actions, such as sorting.
 */
export class PickList<ItemElement extends PickListItem["el"] = PickListItem["el"]>
  extends LitElement
  implements InteractiveComponent, LoadableComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  deselectRemovedItems = deselectRemovedItems.bind(this);

  deselectSiblingItems = deselectSiblingItems.bind(this);

  emitCalciteListChange: () => void;

  emitCalciteListFilter: () => void;

  filterEl: Filter["el"];

  getItemData = getItemData.bind(this);

  handleFilter = handleFilter.bind(this);

  handleFilterEvent = handleFilterEvent.bind(this);

  items: ItemElement[];

  private keyDownHandler = keyDownHandler.bind(this);

  lastSelectedItem: ItemElement = null;

  mutationObserver = createObserver("mutation", mutationObserverCallback.bind(this));

  selectSiblings = selectSiblings.bind(this);

  setFilterEl = (el: Filter["el"]): void => {
    this.filterEl = el;
  };

  // #endregion

  // #region State Properties

  @state() dataForFilter: ItemData = [];

  @state() selectedValues: Map<string, ItemElement> = new Map();

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, an input appears at the top of the list that can be used by end users to filter items in the list. */
  @property({ reflect: true }) filterEnabled = false;

  /** Placeholder text for the filter input field. */
  @property({ reflect: true }) filterPlaceholder: string;

  /** Text for the filter input field. */
  @property({ reflect: true }) filterText: string;

  /**
   * The component's filtered data.
   *
   * @readonly
   */
  @property() filteredData: ItemData = [];

  /**
   * The component's filtered items.
   *
   * @readonly
   */
  @property() filteredItems: PickListItem["el"][] = [];

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /**
   * Similar to standard radio buttons and checkboxes.
   * When `true`, a user can select multiple `calcite-pick-list-item`s at a time.
   * When `false`, only a single `calcite-pick-list-item` can be selected at a time,
   * and a new selection will deselect previous selections.
   */
  @property({ reflect: true }) multiple = false;

  /** When `true` and single selection is enabled, the selection changes when navigating `calcite-pick-list-item`s via keyboard. */
  @property({ reflect: true }) selectionFollowsFocus = false;

  // #endregion

  // #region Public Methods

  /** Returns the component's selected `calcite-pick-list-item`s. */
  @method()
  async getSelectedItems(): Promise<Map<string, PickListItem["el"]>> {
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

  /** Emits when any of the `calcite-pick-list-item` selections have changed. */
  calciteListChange = createEvent<Map<string, PickListItem["el"]>>({ cancelable: false });

  /** Emits when a filter has changed. */
  calciteListFilter = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
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
    this.listen("focusout", this.calciteListFocusOutHandler);
    this.listen("keydown", this.keyDownHandler);
  }

  override connectedCallback(): void {
    initialize.call(this);
    initializeObserver.call(this);
  }

  load(): void {
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
    cleanUpObserver.call(this);
  }

  // #endregion

  // #region Private Methods

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

  private calciteListFocusOutHandler(event: FocusEvent): void {
    calciteListFocusOutHandler.call(this, event);
  }

  setUpItems(): void {
    setUpItems.call(this, "calcite-pick-list-item");
  }

  setUpFilter(): void {
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
  }

  setFilteredItems(filteredItems: any[]): void {
    this.filteredItems = filteredItems;
  }

  getIconType(): ValueUnion<typeof ICON_TYPES> {
    return this.multiple ? ICON_TYPES.square : ICON_TYPES.circle;
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
