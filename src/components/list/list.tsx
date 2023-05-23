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
  Watch
} from "@stencil/core";
import { debounce } from "lodash-es";
import { toAriaBoolean } from "../../utils/dom";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import { SelectionMode } from "../interfaces";
import { ItemData } from "../list-item/interfaces";
import { MAX_COLUMNS } from "../list-item/resources";
import { getListItemChildren, updateListItemChildren } from "../list-item/utils";
import { CSS, debounceTimeout, SelectionAppearance } from "./resources";

const listItemSelector = "calcite-list-item";

import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";

/**
 * A general purpose list that enables users to construct list items that conform to Calcite styling.
 *
 * @slot - A slot for adding `calcite-list-item` elements.
 */
@Component({
  tag: "calcite-list",
  styleUrl: "list.scss",
  shadow: true
})
export class List implements InteractiveComponent, LoadableComponent {
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
   * When `true`, an input appears at the top of the component that can be used by end users to filter `calcite-list-item`s.
   */
  @Prop({ reflect: true }) filterEnabled = false;

  @Watch("filterEnabled")
  handleFilterEnabledChange(): void {
    this.updateListItems();
  }

  /**
   * The currently filtered `calcite-list-item`s.
   *
   * @readonly
   */
  @Prop({ mutable: true }) filteredItems: HTMLCalciteListItemElement[] = [];

  /**
   * The currently filtered `calcite-list-item` data.
   *
   * @readonly
   */
  @Prop({ mutable: true }) filteredData: ItemData = [];

  /**
   * Placeholder text for the component's filter input field.
   */
  @Prop({ reflect: true }) filterPlaceholder: string;

  /**
   * Text for the component's filter input field.
   */
  @Prop({ reflect: true, mutable: true }) filterText: string;

  /**
   * Specifies an accessible name for the component.
   */
  @Prop() label: string;

  /**
   * When `true`, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * One of the items within the list can be opened.
   *
   * @internal
   */
  @Prop() openable = false;

  /**
   * The currently selected items.
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItems: HTMLCalciteListItemElement[] = [];

  /**
   * Specifies the selection mode - `"multiple"` (allow any number of selected items), `"single"` (allow one selected item), `"single-persist"` (allow one selected item and prevent de-selection), or `"none"` (no selected items).
   */
  @Prop({ reflect: true }) selectionMode: Extract<
    "none" | "multiple" | "single" | "single-persist",
    SelectionMode
  > = "none";

  /**
   * Specifies the selection appearance - `"icon"` (displays a checkmark or dot) or `"border"` (displays a border).
   */
  @Prop({ reflect: true }) selectionAppearance: SelectionAppearance = "icon";

  @Watch("selectionMode")
  @Watch("selectionAppearance")
  handleSelectionAppearanceChange(): void {
    this.updateListItems();
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /**
   * Emits when any of the list item selections have changed.
   */
  @Event({ cancelable: false }) calciteListChange: EventEmitter<void>;

  /**
   * Emits when the component's filter has changed.
   */
  @Event({ cancelable: false }) calciteListFilter: EventEmitter<void>;

  @Listen("calciteInternalFocusPreviousItem")
  handleCalciteInternalFocusPreviousItem(event: CustomEvent): void {
    event.stopPropagation();

    const { enabledListItems } = this;
    const currentIndex = enabledListItems.findIndex((listItem) => listItem.active);

    const prevIndex = currentIndex - 1;

    if (enabledListItems[prevIndex]) {
      this.focusRow(enabledListItems[prevIndex]);
    }
  }

  @Listen("calciteInternalListItemActive")
  handleCalciteInternalListItemActive(event: CustomEvent): void {
    const target = event.target as HTMLCalciteListItemElement;
    const { listItems } = this;

    listItems.forEach((listItem) => {
      listItem.active = listItem === target;
    });
  }

  @Listen("calciteListItemSelect")
  handleCalciteListItemSelect(): void {
    this.updateSelectedItems(true);
  }

  @Listen("calciteInternalListItemSelect")
  handleCalciteInternalListItemSelect(event: CustomEvent): void {
    const target = event.target as HTMLCalciteListItemElement;
    const { listItems, selectionMode } = this;

    listItems.forEach((listItem) => {
      if (selectionMode === "single" || selectionMode === "single-persist") {
        listItem.selected = listItem === target;
      }
    });

    this.updateSelectedItems();
  }

  @Listen("calciteListItemClose")
  handleCalciteListItemClose(): void {
    this.updateListItems(true);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.updateListItems();
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
    const { filterEl } = this;
    const filteredItems = filterEl?.filteredItems as ItemData;

    if (filteredItems) {
      this.filteredData = filteredItems;
    }

    this.updateListItems();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteListElement;

  listItems: HTMLCalciteListItemElement[] = [];

  enabledListItems: HTMLCalciteListItemElement[] = [];

  mutationObserver = createObserver("mutation", () => this.updateListItems());

  @State() dataForFilter: ItemData = [];

  filterEl: HTMLCalciteFilterElement;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component's first focusable element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);
    this.enabledListItems.find((listItem) => listItem.active)?.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const {
      loading,
      label,
      disabled,
      dataForFilter,
      filterEnabled,
      filterPlaceholder,
      filterText
    } = this;
    return (
      <div class={CSS.container}>
        {loading ? <calcite-scrim class={CSS.scrim} loading={loading} /> : null}
        <table
          aria-busy={toAriaBoolean(loading)}
          aria-label={label || ""}
          class={CSS.table}
          onKeyDown={this.handleListKeydown}
          role="treegrid"
        >
          {filterEnabled ? (
            <thead>
              <tr class={{ [CSS.sticky]: true }}>
                <th colSpan={MAX_COLUMNS}>
                  <calcite-filter
                    aria-label={filterPlaceholder}
                    disabled={loading || disabled}
                    items={dataForFilter}
                    onCalciteFilterChange={this.handleFilter}
                    placeholder={filterPlaceholder}
                    value={filterText}
                    // eslint-disable-next-line react/jsx-sort-props
                    ref={(el) => (this.filterEl = el)}
                  />
                </th>
              </tr>
            </thead>
          ) : null}
          <tbody class={CSS.tableContainer}>
            <slot onSlotchange={this.handleDefaultSlotChange} />
          </tbody>
        </table>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleDefaultSlotChange = (event: Event): void => {
    updateListItemChildren(getListItemChildren(event));
  };

  setActiveListItem = (): void => {
    const { enabledListItems } = this;

    if (!enabledListItems.some((item) => item.active)) {
      if (enabledListItems[0]) {
        enabledListItems[0].active = true;
      }
    }
  };

  private updateSelectedItems = (emit = false): void => {
    this.selectedItems = this.enabledListItems.filter((item) => item.selected);
    if (emit) {
      this.calciteListChange.emit();
    }
  };

  private filterElements({
    el,
    filteredItems,
    visibleParents,
    visible
  }: {
    el: HTMLCalciteListItemElement | HTMLCalciteListItemGroupElement;
    filteredItems: HTMLCalciteListItemElement[];
    visibleParents: WeakSet<HTMLElement>;
    visible?: boolean;
  }): void {
    const isVisible = filteredItems.includes(el as HTMLCalciteListItemElement) || visible;

    el.hidden = visibleParents.has(el) ? false : !isVisible;

    if (isVisible) {
      visibleParents.add(el);
    }

    const parent = el.parentElement as HTMLCalciteListItemElement | HTMLCalciteListItemGroupElement;

    if (parent?.matches("calcite-list-item-group, calcite-list-item")) {
      this.filterElements({
        el: parent,
        filteredItems,
        visibleParents,
        visible: isVisible
      });
    }
  }

  private updateFilteredItems = (emit = false): void => {
    const { listItems, filteredData, filterText } = this;

    const values = filteredData.map((item) => item.value);

    const lastDescendantItems = listItems?.filter((listItem) =>
      listItems.every((li) => (li !== listItem ? !listItem.contains(li) : true))
    );

    const filteredItems =
      listItems.filter((item) => (filterText ? values.includes(item.value) : true)) || [];

    const visibleParents = new WeakSet<HTMLElement>();

    lastDescendantItems.forEach((listItem) =>
      this.filterElements({ el: listItem, filteredItems, visibleParents })
    );

    this.filteredItems = filteredItems;

    if (emit) {
      this.calciteListFilter.emit();
    }
  };

  handleFilter = (event: CustomEvent): void => {
    event.stopPropagation();
    const { filteredItems, value } = event.currentTarget as HTMLCalciteFilterElement;
    this.filteredData = filteredItems as ItemData;
    this.filterText = value;
    this.updateListItems(true);
  };

  getItemData = (): ItemData => {
    return this.listItems.map((item) => ({
      label: item.label,
      description: item.description,
      metadata: item.metadata,
      value: item.value
    }));
  };

  private updateListItems = debounce((emit = false): void => {
    const { selectionAppearance, selectionMode } = this;
    const items = this.queryListItems();
    items.forEach((item) => {
      item.selectionAppearance = selectionAppearance;
      item.selectionMode = selectionMode;
    });
    this.listItems = items;
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
      if (this.filterEl) {
        this.filterEl.items = this.dataForFilter;
      }
    }
    this.updateFilteredItems(emit);
    this.enabledListItems = items.filter((item) => !item.disabled && !item.closed);
    this.setActiveListItem();
    this.updateSelectedItems(emit);
  }, debounceTimeout);

  queryListItems = (): HTMLCalciteListItemElement[] => {
    return Array.from(this.el.querySelectorAll(listItemSelector));
  };

  focusRow = (focusEl: HTMLCalciteListItemElement): void => {
    const { enabledListItems } = this;

    if (!focusEl) {
      return;
    }

    enabledListItems.forEach((listItem) => (listItem.active = listItem === focusEl));

    focusEl.setFocus();
  };

  isNavigable = (listItem: HTMLCalciteListItemElement): boolean => {
    const parentListItemEl = listItem.parentElement?.closest(listItemSelector);

    if (!parentListItemEl) {
      return true;
    }

    return parentListItemEl.open && this.isNavigable(parentListItemEl);
  };

  handleListKeydown = (event: KeyboardEvent): void => {
    const { key } = event;
    const filteredItems = this.enabledListItems.filter((listItem) => this.isNavigable(listItem));
    const currentIndex = filteredItems.findIndex((listItem) => listItem.active);

    if (key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = currentIndex + 1;

      if (filteredItems[nextIndex]) {
        this.focusRow(filteredItems[nextIndex]);
      }
    } else if (key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = currentIndex - 1;

      if (filteredItems[prevIndex]) {
        this.focusRow(filteredItems[prevIndex]);
      }
    } else if (key === "Home") {
      event.preventDefault();
      const homeItem = filteredItems[0];

      if (homeItem) {
        this.focusRow(homeItem);
      }
    } else if (key === "End") {
      event.preventDefault();
      const endItem = filteredItems[filteredItems.length - 1];

      if (endItem) {
        this.focusRow(endItem);
      }
    }
  };
}
