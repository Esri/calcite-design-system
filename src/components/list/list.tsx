import { Component, Element, h, VNode, Prop, Method, Listen, Watch, State } from "@stencil/core";
import { CSS, debounceTimeout, SelectionAppearance, SelectionMode } from "./resources";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { createObserver } from "../../utils/observers";
import { getListItemChildren, updateListItemChildren } from "../list-item/utils";
import { toAriaBoolean } from "../../utils/dom";
import { debounce } from "lodash-es";
import { HeadingLevel } from "../functional/Heading";
import { ItemData } from "../list-item/interfaces";
import { MAX_COLUMNS } from "../list-item/resources";

const listItemSelector = "calcite-list-item";

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
export class List implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When true, an input appears at the top of the list that can be used by end users to filter items in the list.
   */
  @Prop({ reflect: true }) filterEnabled = false;

  @Watch("filterEnabled")
  handleFilterEnabledChange(): void {
    this.updateListItems();
  }

  /**
   * Placeholder text for the filter input field.
   */
  @Prop({ reflect: true }) filterPlaceholder: string;

  /**
   * Specifies the number at which section headings should start.
   *
   * @deprecated no longer necessary.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /**
   * Specifies an accessible name for the component.
   */
  @Prop() label?: string;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * **read-only** The currently selected items
   *
   * @readonly
   */
  @Prop({ mutable: true }) selectedItems: HTMLCalciteListItemElement[] = [];

  /**
   * specify the selection mode - multiple (allow any number of (or no) selected items), single (allow and require one selected item), none (no selected items), defaults to single
   */
  @Prop({ reflect: true }) selectionMode: SelectionMode = "single";

  /**
   * specify the selection appearance - icon (displays a checkmark or dot), border (displays a border), defaults to icon
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

  @Listen("calciteInternalListItemSelect")
  handleCalciteListItemSelect(event: CustomEvent): void {
    const target = event.target as HTMLCalciteListItemElement;
    const { listItems, selectionMode } = this;

    listItems.forEach((listItem) => {
      listItem.active = listItem === target;
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

  componentDidRender(): void {
    updateHostInteraction(this);
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

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.enabledListItems.find((listItem) => listItem.active)?.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { loading, label, disabled, dataForFilter, filterEnabled, filterPlaceholder } = this;
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

  handleFilter = (event: CustomEvent): void => {
    let groups: Set<HTMLCalcitePickListGroupElement>;
    const { filteredItems } = event.currentTarget as HTMLCalciteFilterElement;
    const values = filteredItems.map((item: ItemData[number]) => item.value);
    let hasSelectedMatch = false;

    if (!groups) {
      groups = new Set<HTMLCalcitePickListGroupElement>();
    }

    this.listItems?.filter((item) => {
      const parent = item.parentElement;
      const grouped = parent.matches("calcite-pick-list-group");

      if (grouped) {
        groups.add(parent as HTMLCalcitePickListGroupElement);
      }

      const matches = values.includes(item.value);

      item.hidden = !matches;

      if (!hasSelectedMatch) {
        hasSelectedMatch = matches && item.selected;
      }

      return matches;
    });
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
