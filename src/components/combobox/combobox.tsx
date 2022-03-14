import {
  Component,
  h,
  Prop,
  State,
  Listen,
  Event,
  EventEmitter,
  Element,
  VNode,
  Method,
  Watch,
  Host
} from "@stencil/core";
import { filter } from "../../utils/filter";
import { debounce } from "lodash-es";

import {
  createPopper,
  updatePopper,
  CSS as PopperCSS,
  OverlayPositioning
} from "../../utils/popper";
import { StrictModifiers, Instance as Popper } from "@popperjs/core";
import { guid } from "../../utils/guid";
import { Scale } from "../interfaces";
import { ComboboxSelectionMode, ComboboxChildElement } from "./interfaces";
import {
  ComboboxChildSelector,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxDefaultPlacement,
  TEXT
} from "./resources";
import { getItemAncestors, getItemChildren, hasActiveChildren } from "./utils";
import { LabelableComponent, connectLabel, disconnectLabel, getLabelText } from "../../utils/label";
import {
  afterConnectDefaultValueSet,
  connectForm,
  disconnectForm,
  FormComponent,
  HiddenFormInputSlot
} from "../../utils/form";
import { createObserver } from "../../utils/observers";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
interface ItemData {
  label: string;
  value: string;
}

const isGroup = (el: ComboboxChildElement): el is HTMLCalciteComboboxItemGroupElement =>
  el.tagName === ComboboxItemGroup;

const itemUidPrefix = "combobox-item-";
const chipUidPrefix = "combobox-chip-";
const labelUidPrefix = "combobox-label-";
const listboxUidPrefix = "combobox-listbox-";
const inputUidPrefix = "combobox-input-";

/**
 * @slot - A slot for adding `calcite-combobox-item`s.
 */
@Component({
  tag: "calcite-combobox",
  styleUrl: "combobox.scss",
  shadow: true
})
export class Combobox implements LabelableComponent, FormComponent, InteractiveComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteComboboxElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** Opens or closes the combobox */
  @Prop({ reflect: true, mutable: true }) active = false;

  @Watch("active")
  activeHandler(): void {
    if (this.disabled) {
      this.active = false;
      return;
    }

    this.reposition();
  }

  /** Disable combobox input */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  handleDisabledChange(value: boolean): void {
    if (!value) {
      this.active = false;
    }
  }

  /** Aria label for combobox (required) */
  @Prop() label!: string;

  /** Placeholder text for input */
  @Prop() placeholder?: string;

  /** Specify the maximum number of combobox items (including nested children) to display before showing the scroller */
  @Prop() maxItems = 0;

  @Watch("maxItems")
  maxItemsHandler(): void {
    this.setMaxScrollerHeight();
  }

  /** The name of the switch input */
  @Prop({ reflect: true }) name: string;

  /** Allow entry of custom values which are not in the original set of items */
  @Prop() allowCustomValues: boolean;

  /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

  /**
   * When true, makes the component required for form-submission.
   *
   * @internal
   */
  @Prop() required = false;

  /** specify the selection mode
   * - multi: allow any number of selected items (default)
   * - single: only one selection)
   * - ancestors: like multi, but show ancestors of selected items as selected, only deepest children shown in chips
   */
  @Prop({ reflect: true }) selectionMode: ComboboxSelectionMode = "multi";

  /** Specify the scale of the combobox, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** The value(s) of the selectedItem(s) */
  @Prop({ mutable: true }) value: string | string[] = null;

  @Watch("value")
  valueHandler(value: string | string[]): void {
    if (!this.internalValueChangeFlag) {
      const items = this.getItems();
      if (Array.isArray(value)) {
        items.forEach((item) => (item.selected = value.includes(item.value)));
      } else if (value) {
        items.forEach((item) => (item.selected = value === item.value));
      } else {
        items.forEach((item) => (item.selected = false));
      }
      this.updateItems();
    }
  }

  /** string to override the English "Remove tag" text for when an item is selected.
   * @default "Remove tag"
   */
  @Prop({ reflect: false }) intlRemoveTag: string = TEXT.removeTag;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click", { target: "document" })
  documentClickHandler(event: Event): void {
    this.setInactiveIfNotContained(event);
  }

  @Listen("calciteComboboxItemChange")
  calciteComboboxItemChangeHandler(event: CustomEvent<HTMLCalciteComboboxItemElement>): void {
    if (this.ignoreSelectedEventsFlag) {
      return;
    }

    const target = event.target as HTMLCalciteComboboxItemElement;
    this.toggleSelection(target, target.selected);
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Updates the position of the component. */
  @Method()
  async reposition(): Promise<void> {
    const { popper, menuEl } = this;
    const modifiers = this.getModifiers();
    popper
      ? await updatePopper({
          el: menuEl,
          modifiers,
          placement: ComboboxDefaultPlacement,
          popper
        })
      : this.createPopper();
  }

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    this.active = true;
    this.textInput?.focus();
    this.activeChipIndex = -1;
    this.activeItemIndex = -1;
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Called when the selected items set changes
   * @deprecated use calciteComboboxChange instead
   */
  @Event() calciteLookupChange: EventEmitter<HTMLCalciteComboboxItemElement[]>;

  /**
   * Called when the selected item(s) changes.
   */
  @Event() calciteComboboxChange: EventEmitter<{ selectedItems: HTMLCalciteComboboxItemElement[] }>;

  /** Called when the user has entered text to filter the options list */
  @Event() calciteComboboxFilterChange: EventEmitter<{
    visibleItems: HTMLCalciteComboboxItemElement[];
    text: string;
  }>;

  /** Called when a selected item in the combobox is dismissed via its chip **/
  @Event() calciteComboboxChipDismiss: EventEmitter;

  /**
   * Fired when the combobox is opened
   * @internal
   */
  @Event() calciteComboboxOpen: EventEmitter;

  /**
   *  Fired when the combobox is closed
   * @internal
   */
  @Event() calciteComboboxClose: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.internalValueChangeFlag = true;
    this.value = this.getValue();
    this.internalValueChangeFlag = false;
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.createPopper();
    connectLabel(this);
    connectForm(this);
  }

  componentWillLoad(): void {
    this.updateItems();
  }

  componentDidLoad(): void {
    afterConnectDefaultValueSet(this, this.getValue());
  }

  componentDidRender(): void {
    if (this.el.offsetHeight !== this.inputHeight) {
      this.reposition();
      this.inputHeight = this.el.offsetHeight;
    }

    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.destroyPopper();
    disconnectLabel(this);
    disconnectForm(this);
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  internalValueChangeFlag = false;

  labelEl: HTMLCalciteLabelElement;

  formEl: HTMLFormElement;

  defaultValue: Combobox["value"];

  @State() items: HTMLCalciteComboboxItemElement[] = [];

  @State() groupItems: HTMLCalciteComboboxItemGroupElement[] = [];

  @State() selectedItems: HTMLCalciteComboboxItemElement[] = [];

  @Watch("selectedItems")
  selectedItemsHandler(): void {
    this.internalValueChangeFlag = true;
    this.value = this.getValue();
    this.internalValueChangeFlag = false;
  }

  @State() visibleItems: HTMLCalciteComboboxItemElement[] = [];

  @State() needsIcon: boolean;

  @State() activeItemIndex = -1;

  @State() activeChipIndex = -1;

  @State() activeDescendant = "";

  @State() text = "";

  /** when search text is cleared, reset active to  */
  @Watch("text")
  textHandler(): void {
    this.updateActiveItemIndex(-1);
  }

  textInput: HTMLInputElement = null;

  data: ItemData[];

  mutationObserver = createObserver("mutation", () => this.updateItems());

  resizeObserver = createObserver("resize", () => this.setMaxScrollerHeight());

  private guid = guid();

  private inputHeight = 0;

  private popper: Popper;

  private menuEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  private listContainerEl: HTMLDivElement;

  private ignoreSelectedEventsFlag = false;

  private activeTransitionProp = "opacity";

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  getValue = (): string | string[] => {
    const items = this.selectedItems.map((item) => item?.value.toString());
    return items?.length ? (items.length > 1 ? items : items[0]) : "";
  };

  onLabelClick = (): void => {
    this.setFocus();
  };

  keydownHandler = (event: KeyboardEvent): void => {
    const { key } = event;

    switch (key) {
      case "Tab":
        this.activeChipIndex = -1;
        this.activeItemIndex = -1;
        if (this.allowCustomValues && this.text) {
          this.addCustomChip(this.text, true);
          event.preventDefault();
        } else {
          this.active = false;
        }
        break;
      case "ArrowLeft":
        this.previousChip();
        break;
      case "ArrowRight":
        this.nextChip();
        break;
      case "ArrowUp":
        event.preventDefault();
        this.active = true;
        this.shiftActiveItemIndex(-1);
        break;
      case "ArrowDown":
        event.preventDefault();
        this.active = true;
        this.shiftActiveItemIndex(1);
        break;
      case "Home":
        this.active = true;
        this.updateActiveItemIndex(0);
        break;
      case "End":
        this.active = true;
        this.updateActiveItemIndex(this.visibleItems.length - 1);
        break;
      case "Escape":
        this.active = false;
        break;
      case "Enter":
        if (this.activeItemIndex > -1) {
          this.toggleSelection(this.visibleItems[this.activeItemIndex]);
        } else if (this.activeChipIndex > -1) {
          this.removeActiveChip();
        } else if (this.allowCustomValues && this.text) {
          this.addCustomChip(this.text, true);
        }
        break;
      case "Delete":
      case "Backspace":
        if (this.activeChipIndex > -1) {
          this.removeActiveChip();
        } else if (!this.text && this.isMulti()) {
          this.removeLastChip();
        }
        break;
      default:
        if (!this.active) {
          this.setFocus();
        }
        break;
    }
  };

  private toggleCloseEnd = (): void => {
    this.active = false;
    this.el.removeEventListener("calciteComboboxClose", this.toggleCloseEnd);
  };

  private toggleOpenEnd = (): void => {
    this.active = true;
    this.el.removeEventListener("calciteComboboxOpen", this.toggleOpenEnd);
  };

  transitionEnd = (event: TransitionEvent): void => {
    if (event.propertyName === this.activeTransitionProp) {
      this.active ? this.calciteComboboxOpen.emit() : this.calciteComboboxClose.emit();
    }
  };

  setMaxScrollerHeight = (): void => {
    const { active, listContainerEl } = this;

    if (!listContainerEl || !active) {
      return;
    }

    this.reposition();
    const maxScrollerHeight = this.getMaxScrollerHeight();
    listContainerEl.style.maxHeight = maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "";
    this.reposition();
  };

  calciteChipDismissHandler = (
    event: CustomEvent<HTMLCalciteChipElement>,
    comboboxItem: HTMLCalciteComboboxItemElement
  ): void => {
    this.active = false;

    const selection = this.items.find((item) => item === comboboxItem);

    if (selection) {
      this.toggleSelection(selection, false);
    }

    this.calciteComboboxChipDismiss.emit(event.detail);
  };

  setFocusClick = (event: MouseEvent): void => {
    if (event.composedPath().some((node: HTMLElement) => node.tagName === "CALCITE-CHIP")) {
      return;
    }

    this.setFocus();
  };

  setInactiveIfNotContained = (event: Event): void => {
    const composedPath = event.composedPath();
    if (!this.active || composedPath.includes(this.el) || composedPath.includes(this.referenceEl)) {
      return;
    }

    if (this.allowCustomValues && this.text) {
      this.addCustomChip(this.text);
    }

    if (this.selectionMode === "single") {
      if (this.textInput) {
        this.textInput.value = "";
      }
      this.text = "";
      this.filterItems("");
      this.updateActiveItemIndex(-1);
    }

    this.active = false;
  };

  setMenuEl = (el: HTMLDivElement): void => {
    this.menuEl = el;
  };

  setListContainerEl = (el: HTMLDivElement): void => {
    this.resizeObserver.observe(el);
    this.listContainerEl = el;
  };

  setReferenceEl = (el: HTMLDivElement): void => {
    this.referenceEl = el;
  };

  getModifiers(): Partial<StrictModifiers>[] {
    const flipModifier: Partial<StrictModifiers> = {
      name: "flip",
      enabled: true
    };

    flipModifier.options = {
      fallbackPlacements: ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    };

    const eventListenerModifier: Partial<StrictModifiers> = {
      name: "eventListeners",
      enabled: this.active
    };

    return [flipModifier, eventListenerModifier];
  }

  createPopper(): void {
    this.destroyPopper();
    const { menuEl, referenceEl, overlayPositioning } = this;
    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement: ComboboxDefaultPlacement,
      referenceEl
    });
  }

  destroyPopper(): void {
    const { popper } = this;

    if (popper) {
      popper.destroy();
    }

    this.popper = null;
  }

  private getMaxScrollerHeight(): number {
    const items = this.getCombinedItems().filter((item) => !item.hidden);

    const { maxItems } = this;

    let itemsToProcess = 0;
    let maxScrollerHeight = 0;

    if (items.length > maxItems) {
      items.forEach((item) => {
        if (itemsToProcess < maxItems && maxItems > 0) {
          const height = this.calculateSingleItemHeight(item);
          if (height > 0) {
            maxScrollerHeight += height;
            itemsToProcess++;
          }
        }
      });
    }

    return maxScrollerHeight;
  }

  private calculateSingleItemHeight(item: ComboboxChildElement): number {
    let height = item.offsetHeight;
    // if item has children items, don't count their height twice
    const children = Array.from(item.querySelectorAll<ComboboxChildElement>(ComboboxChildSelector));
    children
      .map((child) => child?.offsetHeight)
      .forEach((offsetHeight) => {
        height -= offsetHeight;
      });
    return height;
  }

  inputHandler = (event: Event): void => {
    const value = (event.target as HTMLInputElement).value;
    this.text = value;
    this.filterItems(value);
    if (value) {
      this.activeChipIndex = -1;
    }
  };

  getCombinedItems(): ComboboxChildElement[] {
    return [...this.groupItems, ...this.items];
  }

  filterItems = (() => {
    const find = (item: ComboboxChildElement, filteredData: ItemData[]) =>
      item &&
      filteredData.some(({ label, value }) => {
        if (isGroup(item)) {
          return value === item.label || value === item.label;
        }

        return (
          value === item.textLabel ||
          value === item.value ||
          label === item.textLabel ||
          label === item.value
        );
      });

    return debounce((text: string): void => {
      const filteredData = filter(this.data, text);
      const items = this.getCombinedItems();
      items.forEach((item) => {
        const hidden = !find(item, filteredData);
        item.hidden = hidden;
        const [parent, grandparent] = item.ancestors;
        if (find(parent, filteredData) || find(grandparent, filteredData)) {
          item.hidden = false;
        }
        if (!hidden) {
          item.ancestors.forEach((ancestor) => (ancestor.hidden = false));
        }
      });

      this.visibleItems = this.getVisibleItems();
      this.calciteComboboxFilterChange.emit({ visibleItems: [...this.visibleItems], text: text });
    }, 100);
  })();

  internalCalciteLookupChangeEvent = (): void => {
    this.calciteLookupChange.emit(this.selectedItems);
  };

  emitCalciteLookupChange = debounce(this.internalCalciteLookupChangeEvent, 0);

  internalComboboxChangeEvent = (): void => {
    const { selectedItems } = this;
    this.calciteComboboxChange.emit({ selectedItems });
  };

  emitComboboxChange = debounce(this.internalComboboxChangeEvent, 0);

  toggleSelection(item: HTMLCalciteComboboxItemElement, value = !item.selected): void {
    if (!item) {
      return;
    }

    if (this.isMulti()) {
      item.selected = value;
      this.updateAncestors(item);
      this.selectedItems = this.getSelectedItems();
      this.emitCalciteLookupChange();
      this.emitComboboxChange();
      this.resetText();
      this.filterItems("");
    } else {
      this.ignoreSelectedEventsFlag = true;
      this.items.forEach((el) => (el.selected = el === item ? value : false));
      this.ignoreSelectedEventsFlag = false;
      this.selectedItems = this.getSelectedItems();
      this.emitComboboxChange();
      if (this.textInput) {
        this.textInput.value = item.textLabel;
      }
      this.active = false;
      this.updateActiveItemIndex(-1);
      this.resetText();
      this.filterItems("");
    }
  }

  updateAncestors(item: HTMLCalciteComboboxItemElement): void {
    if (this.selectionMode !== "ancestors") {
      return;
    }
    const ancestors = getItemAncestors(item);
    const children = getItemChildren(item);
    if (item.selected) {
      ancestors.forEach((el) => {
        (el as HTMLCalciteComboboxItemElement).selected = true;
      });
    } else {
      children.forEach((el) => (el.selected = false));
      [...ancestors].forEach((el) => {
        if (!hasActiveChildren(el)) {
          el.selected = false;
        }
      });
    }
  }

  getVisibleItems(): HTMLCalciteComboboxItemElement[] {
    return this.items.filter((item) => !item.hidden);
  }

  getSelectedItems(): HTMLCalciteComboboxItemElement[] {
    if (!this.isMulti()) {
      const match = this.items.find(({ selected }) => selected);
      return match ? [match] : [];
    }

    return (
      this.items
        .filter(
          (item) =>
            item.selected && (this.selectionMode !== "ancestors" || !hasActiveChildren(item))
        )
        /** Preserve order of entered tags */
        .sort((a, b) => {
          const aIdx = this.selectedItems.indexOf(a);
          const bIdx = this.selectedItems.indexOf(b);
          if (aIdx > -1 && bIdx > -1) {
            return aIdx - bIdx;
          }
          return bIdx - aIdx;
        })
    );
  }

  updateItems = (): void => {
    this.items = this.getItems();
    this.groupItems = this.getGroupItems();
    this.data = this.getData();
    this.selectedItems = this.getSelectedItems();
    this.visibleItems = this.getVisibleItems();
    this.needsIcon = this.getNeedsIcon();
    if (!this.allowCustomValues) {
      this.setMaxScrollerHeight();
    }
  };

  getData(): ItemData[] {
    return this.items.map((item) => ({
      constant: item.constant,
      value: item.value,
      label: item.textLabel,
      guid: item.guid
    }));
  }

  getNeedsIcon(): boolean {
    return this.selectionMode === "single" && this.items.some((item) => item.icon);
  }

  resetText(): void {
    if (this.textInput) {
      this.textInput.value = "";
    }
    this.text = "";
  }

  getItems(): HTMLCalciteComboboxItemElement[] {
    const items: HTMLCalciteComboboxItemElement[] = Array.from(
      this.el.querySelectorAll(ComboboxItem)
    );
    return items.filter((item) => !item.disabled);
  }

  getGroupItems(): HTMLCalciteComboboxItemGroupElement[] {
    return Array.from(this.el.querySelectorAll(ComboboxItemGroup));
  }

  addCustomChip(value: string, focus?: boolean): void {
    const existingItem = this.items.find((el) => el.textLabel === value);
    if (existingItem) {
      this.toggleSelection(existingItem, true);
    } else {
      if (!this.isMulti()) {
        this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], false);
      }
      const item = document.createElement(ComboboxItem) as HTMLCalciteComboboxItemElement;
      item.value = value;
      item.textLabel = value;
      item.selected = true;
      this.el.appendChild(item);
      this.resetText();
      if (focus) {
        this.setFocus();
      }
      this.updateItems();
      this.filterItems("");
      this.emitCalciteLookupChange();
      this.emitComboboxChange();
    }
  }

  removeActiveChip(): void {
    this.toggleSelection(this.selectedItems[this.activeChipIndex], false);
    this.setFocus();
  }

  removeLastChip(): void {
    this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], false);
    this.setFocus();
  }

  previousChip(): void {
    if (this.text) {
      return;
    }
    const length = this.selectedItems.length - 1;
    const active = this.activeChipIndex;
    this.activeChipIndex = active === -1 ? length : Math.max(active - 1, 0);
    this.updateActiveItemIndex(-1);
    this.focusChip();
  }

  nextChip(): void {
    if (this.text || this.activeChipIndex === -1) {
      return;
    }
    const last = this.selectedItems.length - 1;
    const newIndex = this.activeChipIndex + 1;
    if (newIndex > last) {
      this.activeChipIndex = -1;
      this.setFocus();
    } else {
      this.activeChipIndex = newIndex;
      this.focusChip();
    }
    this.updateActiveItemIndex(-1);
  }

  focusChip(): void {
    const guid = this.selectedItems[this.activeChipIndex]?.guid;

    const chip = guid
      ? this.referenceEl.querySelector<HTMLCalciteChipElement>(`#${chipUidPrefix}${guid}`)
      : null;
    chip?.setFocus();
  }

  shiftActiveItemIndex(delta: number): void {
    const length = this.visibleItems.length;
    const newIndex = (this.activeItemIndex + length + delta) % length;
    this.updateActiveItemIndex(newIndex);
    // ensure active item is in view if we have scrolling
    const activeItem = this.visibleItems[this.activeItemIndex];
    const height = this.calculateSingleItemHeight(activeItem);
    const { offsetHeight, scrollTop } = this.listContainerEl;
    if (offsetHeight + scrollTop < activeItem.offsetTop + height) {
      this.listContainerEl.scrollTop = activeItem.offsetTop - offsetHeight + height;
    } else if (activeItem.offsetTop < scrollTop) {
      this.listContainerEl.scrollTop = activeItem.offsetTop;
    }
  }

  updateActiveItemIndex(index: number): void {
    this.activeItemIndex = index;
    let activeDescendant: string = null;
    this.visibleItems.forEach((el, i) => {
      if (i === index) {
        el.active = true;
        activeDescendant = el.guid;
      } else {
        el.active = false;
      }
    });
    this.activeDescendant = activeDescendant;
    if (this.activeItemIndex > -1) {
      this.activeChipIndex = -1;
      this.textInput?.focus();
    }
  }

  isMulti(): boolean {
    return this.selectionMode !== "single";
  }

  comboboxFocusHandler = (): void => {
    this.active = true;
    this.textInput?.focus();
  };

  comboboxBlurHandler = (event: FocusEvent): void => {
    this.setInactiveIfNotContained(event);
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderChips(): VNode[] {
    const { activeChipIndex, scale, selectionMode, intlRemoveTag } = this;
    return this.selectedItems.map((item, i) => {
      const chipClasses = {
        chip: true,
        "chip--active": activeChipIndex === i
      };
      const ancestors = [...getItemAncestors(item)].reverse();
      const pathLabel = [...ancestors, item].map((el) => el.textLabel);
      const label = selectionMode !== "ancestors" ? item.textLabel : pathLabel.join(" / ");
      return (
        <calcite-chip
          class={chipClasses}
          dismissLabel={intlRemoveTag}
          dismissible
          icon={item.icon}
          id={item.guid ? `${chipUidPrefix}${item.guid}` : null}
          key={item.textLabel}
          onCalciteChipDismiss={(event) => this.calciteChipDismissHandler(event, item)}
          scale={scale}
          title={label}
          value={item.value}
        >
          {label}
        </calcite-chip>
      );
    });
  }

  renderInput(): VNode {
    const { guid, active, disabled, placeholder, selectionMode, needsIcon, selectedItems } = this;
    const single = selectionMode === "single";
    const selectedItem = selectedItems[0];
    const showLabel = !active && single && !!selectedItem;
    return (
      <span
        class={{
          "input-wrap": true,
          "input-wrap--single": single
        }}
      >
        {showLabel && (
          <span
            class={{
              label: true,
              "label--spaced": needsIcon
            }}
            key="label"
            onFocus={this.comboboxFocusHandler}
            tabindex="0"
          >
            {selectedItem.textLabel}
          </span>
        )}
        <input
          aria-activedescendant={this.activeDescendant}
          aria-autocomplete="list"
          aria-controls={`${listboxUidPrefix}${guid}`}
          aria-label={getLabelText(this)}
          class={{
            input: true,
            "input--single": true,
            "input--transparent": this.activeChipIndex > -1,
            "input--hidden": showLabel,
            "input--icon": single && needsIcon
          }}
          disabled={disabled}
          id={`${inputUidPrefix}${guid}`}
          key="input"
          onBlur={this.comboboxBlurHandler}
          onFocus={this.comboboxFocusHandler}
          onInput={this.inputHandler}
          placeholder={placeholder}
          ref={(el) => (this.textInput = el as HTMLInputElement)}
          type="text"
        />
      </span>
    );
  }

  renderListBoxOptions(): VNode[] {
    return this.visibleItems.map((item) => (
      <li
        aria-selected={(!!item.selected).toString()}
        id={item.guid ? `${itemUidPrefix}${item.guid}` : null}
        role="option"
        tabindex="-1"
      >
        {item.textLabel}
      </li>
    ));
  }

  renderPopperContainer(): VNode {
    const { active, setMenuEl, setListContainerEl } = this;
    const classes = {
      "list-container": true,
      [PopperCSS.animation]: true,
      [PopperCSS.animationActive]: active
    };

    return (
      <div
        aria-hidden="true"
        class={{ "popper-container": true, "popper-container--active": active }}
        ref={setMenuEl}
      >
        <div class={classes} onTransitionEnd={this.transitionEnd} ref={setListContainerEl}>
          <ul class={{ list: true, "list--hide": !active }}>
            <slot />
          </ul>
        </div>
      </div>
    );
  }

  renderIconStart(): VNode {
    const { selectionMode, needsIcon, selectedItems } = this;
    const selectedItem = selectedItems[0];
    return (
      selectionMode === "single" &&
      needsIcon && (
        <span class="icon-start">
          {selectedItem?.icon && (
            <calcite-icon class="selected-icon" icon={selectedItem.icon} scale="s" />
          )}
        </span>
      )
    );
  }

  renderIconEnd(): VNode {
    return (
      <span class="icon-end">
        <calcite-icon icon="chevron-down" scale="s" />
      </span>
    );
  }

  render(): VNode {
    const { active, guid, label } = this;
    const single = this.selectionMode === "single";

    return (
      <Host onKeyDown={this.keydownHandler}>
        <div
          aria-autocomplete="list"
          aria-expanded={active.toString()}
          aria-haspopup="listbox"
          aria-labelledby={`${labelUidPrefix}${guid}`}
          aria-owns={`${listboxUidPrefix}${guid}`}
          class={{
            wrapper: true,
            "wrapper--single": single || !this.selectedItems.length,
            "wrapper--active": active
          }}
          onClick={this.setFocusClick}
          ref={this.setReferenceEl}
          role="combobox"
        >
          <div class="grid-input">
            {this.renderIconStart()}
            {!single && this.renderChips()}
            <label
              class="screen-readers-only"
              htmlFor={`${inputUidPrefix}${guid}`}
              id={`${labelUidPrefix}${guid}`}
            >
              {label}
            </label>
            {this.renderInput()}
          </div>
          {this.renderIconEnd()}
        </div>
        <ul
          aria-labelledby={`${labelUidPrefix}${guid}`}
          aria-multiselectable="true"
          class="screen-readers-only"
          id={`${listboxUidPrefix}${guid}`}
          role="listbox"
          tabIndex={-1}
        >
          {this.renderListBoxOptions()}
        </ul>
        {this.renderPopperContainer()}
        <HiddenFormInputSlot component={this} />
      </Host>
    );
  }
}
