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
   * Specifies the selection mode - `"multiple"` (allow any number of selected items), `"single"` (allows and require one selected item), `"none"` (no selected items).
   */
  @Prop({ reflect: true }) selectionMode: Extract<"none" | "multiple" | "single", SelectionMode> =
    "none";

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
  handleCalciteListItemActive(event: CustomEvent): void {
    const target = event.target as HTMLCalciteListItemElement;
    const { listItems } = this;

    listItems.forEach((listItem) => {
      listItem.active = listItem === target;
    });
  }

  @Listen("calciteInternalListItemSelect")
  handleCalciteListItemSelect(event: CustomEvent): void {
    const target = event.target as HTMLCalciteListItemElement;
    const { listItems, selectionMode } = this;

    listItems.forEach((listItem) => {
      if (selectionMode === "single") {
        listItem.selected = listItem === target;
      }
    });

    this.updateSelectedItems();
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

    this.updateFilteredItems();
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
                    ref={(el) => (this.filterEl = el)}
                    value={filterText}
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

  private updateSelectedItems = debounce((): void => {
    this.selectedItems = this.enabledListItems.filter((item) => item.selected);
  }, debounceTimeout);

  private updateFilteredItems = debounce((): void => {
    const { listItems, filteredData, filterText } = this;

    const values = filteredData.map((item) => item.value);

    const groups = new Set<HTMLCalciteListItemGroupElement>();
    let hasSelectedMatch = false;

    const filteredItems =
      listItems?.filter((item) => {
        const parent = item.parentElement;
        const grouped = parent.matches("calcite-list-item-group");

        if (grouped) {
          groups.add(parent as HTMLCalciteListItemGroupElement);
        }

        const matches = filterText ? values.includes(item.value) : true;

        item.hidden = !matches;

        if (!hasSelectedMatch) {
          hasSelectedMatch = matches && item.selected;
        }

        return matches;
      }) || [];

    this.filteredItems = filteredItems;

    groups.forEach((group) => {
      const hasAtLeastOneMatch = filteredItems.some((item) => group.contains(item));
      group.hidden = !hasAtLeastOneMatch;

      if (!hasAtLeastOneMatch) {
        return;
      }

      const parentItem = group.closest("calcite-list-item");

      if (parentItem) {
        parentItem.hidden = false;

        if (filteredItems.includes(parentItem)) {
          Array.from(group.querySelectorAll("calcite-list-item")).forEach(
            (child) => (child.hidden = false)
          );
        }
      }
    });

    groups.clear();
  });

  handleFilter = (event: CustomEvent): void => {
    event.stopPropagation();
    const { filteredItems, value } = event.currentTarget as HTMLCalciteFilterElement;

    this.filteredData = filteredItems as ItemData;
    this.filterText = value;
    this.updateFilteredItems();

    this.calciteListFilter.emit();
  };

  getItemData = (): ItemData => {
    return this.listItems.map((item) => ({
      label: item.label,
      description: item.description,
      metadata: item.metadata,
      value: item.value
    }));
  };

  private updateListItems = debounce((): void => {
    const { selectionAppearance, selectionMode } = this;
    const items = this.queryListItems();
    items.forEach((item) => {
      item.selectionAppearance = selectionAppearance;
      item.selectionMode = selectionMode;
    });
    this.listItems = items;
    this.enabledListItems = items.filter((item) => !item.disabled);
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
    this.setActiveListItem();
    this.updateSelectedItems();
    this.updateFilteredItems();
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
