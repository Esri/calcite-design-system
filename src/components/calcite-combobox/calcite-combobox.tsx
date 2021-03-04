import {
  Component,
  h,
  Host,
  Prop,
  State,
  Listen,
  Event,
  EventEmitter,
  Element,
  VNode,
  Build,
  Method,
  Watch
} from "@stencil/core";
import { filter } from "../../utils/filter";
import { getElementDir } from "../../utils/dom";
import { debounce } from "lodash-es";
import { getKey } from "../../utils/key";
import { createPopper, updatePopper, CSS as PopperCSS } from "../../utils/popper";
import { StrictModifiers, Instance as Popper } from "@popperjs/core";
import { guid } from "../../utils/guid";
import { Scale, Theme } from "../interfaces";
import { ComboboxSelectionMode } from "./interfaces";

const COMBO_BOX_ITEM = "calcite-combobox-item";

const DEFAULT_PLACEMENT = "bottom-start";

const TRANSITION_DURATION = 150;

interface ItemData {
  label: string;
  value: string;
}

@Component({
  tag: "calcite-combobox",
  styleUrl: "calcite-combobox.scss",
  shadow: true
})
export class CalciteCombobox {
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

  /** Open and close combobox */
  @Prop({ reflect: true, mutable: true }) active = false;

  @Watch("active") activeHandler(newValue: boolean, oldValue: boolean): void {
    // when closing, wait transition time then hide to prevent overscroll
    if (oldValue && !newValue) {
      setTimeout(() => {
        this.hideList = true;
      }, TRANSITION_DURATION);
    } else if (!oldValue && newValue) {
      this.hideList = false;
    }
    this.reposition();
  }

  /** Disable combobox input */
  @Prop({ reflect: true }) disabled = false;

  /** Aria label for combobox (required) */
  @Prop() label!: string;

  /** Placeholder text for input */
  @Prop() placeholder?: string;

  /** Specify the maximum number of combobox items (including nested children) to display before showing the scroller */
  @Prop() maxItems = 0;

  /** Allow entry of custom values which are not in the original set of items */
  @Prop() allowCustomValues: boolean;

  /** specify the selection mode - multi (allow any number of selected items), single (only one selction), defaults to multi */
  @Prop({ reflect: true }) selectionMode: ComboboxSelectionMode = "multi";

  /** Specify the scale of the combobox, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: Theme;

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
    this.toggleSelection(event.detail);
  }

  @Listen("calciteChipDismiss")
  calciteChipDismissHandler(event: CustomEvent<HTMLCalciteChipElement>): void {
    this.active = false;

    const value = event.detail?.value;
    const comboboxItem = this.items.find((item) => item.value === value);

    if (comboboxItem) {
      this.toggleSelection(comboboxItem, false);
    }

    this.calciteComboboxChipDismiss.emit(event.detail);
  }

  @Listen("keydown") keydownHandler(event: KeyboardEvent): void {
    const key = getKey(event.key, getElementDir(this.el));

    switch (key) {
      case "Tab":
        this.activeChipIndex = -1;
        this.activeItemIndex = -1;
        this.active = false;
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
          this.addCustomChip(this.text);
        }
        break;
      case "Delete":
      case "Backspace":
        if (this.activeChipIndex > -1) {
          this.removeActiveChip();
        } else if (!this.text && this.selectionMode === "multi") {
          this.removeLastChip();
        }
        break;
      default:
        if (!this.active) {
          this.setFocus();
        }
        break;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method() async reposition(): Promise<void> {
    const { popper, menuEl } = this;
    const modifiers = this.getModifiers();
    popper
      ? updatePopper({
          el: menuEl,
          modifiers,
          placement: DEFAULT_PLACEMENT,
          popper
        })
      : this.createPopper();
  }

  @Method() async setFocus(): Promise<void> {
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

  /** Called when the selected items set changes */
  @Event() calciteLookupChange: EventEmitter<HTMLCalciteComboboxItemElement[]>;

  /** Called when the user has entered text to filter the options list */
  @Event() calciteComboboxFilterChange: EventEmitter<{
    visibleItems: HTMLCalciteComboboxItemElement[];
    text: string;
  }>;

  @Event() calciteComboboxChipDismiss: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    if (Build.isBrowser) {
      this.observer = new MutationObserver(this.updateItems);
    }

    this.createPopper();
  }

  componentWillLoad(): void {
    this.updateItems();
  }

  componentDidLoad(): void {
    this.observer?.observe(this.el, { childList: true, subtree: true });
    this.maxScrollerHeight = this.getMaxScrollerHeight(this.items);
  }

  componentDidRender(): void {
    if (this.el.offsetHeight !== this.inputHeight) {
      this.reposition();
      this.inputHeight = this.el.offsetHeight;
    }
  }

  disconnectedCallback(): void {
    this.observer?.disconnect();
    this.destroyPopper();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() items: HTMLCalciteComboboxItemElement[] = [];

  @State() selectedItems: HTMLCalciteComboboxItemElement[] = [];

  @State() selectedItem: HTMLCalciteComboboxItemElement;

  @State() visibleItems: HTMLCalciteComboboxItemElement[] = [];

  @State() needsIcon: boolean;

  @State() hideList = !this.active;

  @State() activeItemIndex = -1;

  @State() activeChipIndex = -1;

  @State() activeDescendant = "";

  @State() text = "";

  /** when search text is cleared, reset active to  */
  @Watch("text") textHandler(): void {
    this.updateActiveItemIndex(-1);
  }

  textInput: HTMLInputElement = null;

  data: ItemData[];

  observer: MutationObserver = null;

  private guid: string = guid();

  /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
  private maxScrollerHeight = 0;

  private inputHeight = 0;

  private popper: Popper;

  private menuEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

  private listContainerEl: HTMLDivElement;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setInactiveIfNotContained = (event: Event): void => {
    if (!this.active || event.composedPath().includes(this.el)) {
      return;
    }

    if (this.selectionMode === "single") {
      this.textInput.value = "";
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

    return [flipModifier];
  }

  createPopper(): void {
    this.destroyPopper();
    const { menuEl, referenceEl } = this;
    const modifiers = this.getModifiers();

    this.popper = createPopper({
      el: menuEl,
      modifiers,
      placement: DEFAULT_PLACEMENT,
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

  private getMaxScrollerHeight(items: HTMLCalciteComboboxItemElement[]): number {
    const { maxItems } = this;
    let itemsToProcess = 0;
    let maxScrollerHeight = 0;
    items.forEach((item) => {
      if (itemsToProcess < maxItems && maxItems > 0) {
        maxScrollerHeight += this.calculateSingleItemHeight(item);
        itemsToProcess++;
      }
    });
    return maxScrollerHeight;
  }

  private calculateSingleItemHeight(item: HTMLCalciteComboboxItemElement): number {
    let height = item.offsetHeight;
    // if item has children items, don't count their height twice
    const children = item.querySelectorAll<HTMLCalciteComboboxItemElement>("calcite-combobox-item");
    children.forEach((child) => {
      height -= child.offsetHeight;
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

  filterItems = debounce((value: string): void => {
    const filteredData = filter(this.data, value);
    const values = filteredData.map((item) => item.value);
    this.items.forEach((item) => {
      const hidden = values.indexOf(item.value) === -1;
      item.hidden = hidden;
      const [parent, grandparent] = item.anscestors;
      if (
        (parent || grandparent) &&
        (values.indexOf(parent?.value) > -1 || values.indexOf(grandparent?.value) > -1)
      ) {
        item.hidden = false;
      }
      if (!hidden) {
        item.anscestors.forEach((anscestor) => (anscestor.hidden = false));
      }
    });

    this.visibleItems = this.getVisibleItems();
    this.calciteComboboxFilterChange.emit({ visibleItems: [...this.visibleItems], text: value });
  }, 100);

  toggleSelection(item: HTMLCalciteComboboxItemElement, value = !item.selected): void {
    if (this.selectionMode === "multi") {
      item.selected = value;
      this.selectedItems = this.getSelectedItems();
      this.calciteLookupChange.emit(this.selectedItems);
      this.resetText();
      this.textInput.focus();
      this.filterItems("");
    } else {
      this.items.forEach((el) => el.toggleSelected(false));
      item.toggleSelected(true);
      this.selectedItem = item;
      this.textInput.value = item.textLabel;
      this.active = false;
      this.updateActiveItemIndex(-1);
      this.resetText();
      this.filterItems("");
    }
  }

  getVisibleItems(): HTMLCalciteComboboxItemElement[] {
    return this.items.filter((item) => !item.hidden);
  }

  getSelectedItems(): HTMLCalciteComboboxItemElement[] {
    return (
      this.items
        .filter((item) => item.selected)
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
    this.data = this.getData();
    this.selectedItems = this.getSelectedItems();
    this.visibleItems = this.getVisibleItems();
    this.needsIcon = this.getNeedsIcon();
    if (this.selectionMode === "single" && this.selectedItems.length) {
      this.selectedItem = this.selectedItems[0];
    }
  };

  getData(): ItemData[] {
    return this.items.map((item) => ({
      value: item.value,
      label: item.textLabel,
      guid: item.guid
    }));
  }

  getNeedsIcon(): boolean {
    return this.selectionMode === "single" && this.items.some((item) => item.icon);
  }

  resetText(): void {
    this.textInput.value = "";
    this.text = "";
  }

  getItems(): HTMLCalciteComboboxItemElement[] {
    const items = Array.from(this.el.querySelectorAll(COMBO_BOX_ITEM));
    return items.filter((item) => !item.disabled);
  }

  addCustomChip(value: string): void {
    const existingItem = this.items.find((el) => el.value === value || el.textLabel === value);
    if (existingItem) {
      this.toggleSelection(existingItem, true);
    } else {
      const item = document.createElement("calcite-combobox-item");
      item.value = value;
      item.textLabel = value;
      item.guid = guid();
      item.selected = true;
      this.el.appendChild(item);
      this.resetText();
      this.setFocus();
      this.updateItems();
      this.filterItems("");
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
    const chip = this.referenceEl.querySelector<HTMLCalciteChipElement>(`#chip-${guid}`);
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
      this.textInput.focus();
    }
  }

  comboboxFocusHandler = (): void => {
    this.active = true;
    this.textInput.focus();
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
    const { activeChipIndex, scale } = this;
    return this.selectedItems.map((item, i) => {
      const chipClasses = { chip: true, "chip--active": activeChipIndex === i };
      return (
        <calcite-chip
          class={chipClasses}
          dismissLabel={"remove tag"}
          dismissible
          icon={item.icon}
          id={`chip-${item.guid}`}
          key={item.value}
          scale={scale}
          value={item.value}
        >
          {item.textLabel}
        </calcite-chip>
      );
    });
  }

  renderInput(): VNode {
    const { active, disabled, placeholder, selectionMode, needsIcon, label } = this;
    const single = selectionMode === "single";
    const showLabel = !active && single && !!this.selectedItem;
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
            {this.selectedItem.textLabel}
          </span>
        )}
        <input
          aria-activedescendant={this.activeDescendant}
          aria-autocomplete="list"
          aria-controls={guid}
          aria-label={label}
          class={{
            input: true,
            "input--transparent": this.activeChipIndex > -1,
            "input--single": single,
            "input--hidden": showLabel,
            "input--icon": single && needsIcon
          }}
          disabled={disabled}
          id={`${guid}-input`}
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
      <li aria-selected={(!!item.selected).toString()} id={item.guid} role="option" tabindex="-1">
        {item.textLabel || item.value}
      </li>
    ));
  }

  renderPopperContainer(): VNode {
    const { active, maxScrollerHeight, setMenuEl, setListContainerEl, hideList } = this;
    const classes = {
      "list-container": true,
      [PopperCSS.animation]: true,
      [PopperCSS.animationActive]: active
    };
    const style = {
      maxHeight: maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : ""
    };
    return (
      <div aria-hidden="true" class="popper-container" ref={setMenuEl}>
        <div class={classes} ref={setListContainerEl} style={style}>
          <ul class={{ list: true, "list--hide": hideList }}>
            <slot />
          </ul>
        </div>
      </div>
    );
  }

  renderIconStart(): VNode {
    const { selectionMode, needsIcon, selectedItem } = this;
    const scale = this.scale === "l" ? "m" : "s";
    return (
      selectionMode === "single" &&
      needsIcon && (
        <span class="icon-start">
          {selectedItem?.icon && (
            <calcite-icon class="selected-icon" icon={selectedItem?.icon} scale={scale} />
          )}
        </span>
      )
    );
  }

  renderIconEnd(): VNode {
    const scale = this.scale === "l" ? "m" : "s";
    return (
      this.selectionMode === "single" && (
        <span class="icon-end">
          <calcite-icon icon="chevron-down" scale={scale} />
        </span>
      )
    );
  }

  render(): VNode {
    const { guid, active, el, label } = this;
    const single = this.selectionMode === "single";
    const dir = getElementDir(el);
    const labelId = `${guid}-label`;
    return (
      <Host active={active} dir={dir}>
        <div
          aria-autocomplete="list"
          aria-expanded={active.toString()}
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          aria-owns={guid}
          class={{
            wrapper: true,
            "wrapper--active": active,
            "wrapper--single": single
          }}
          onClick={() => this.setFocus()}
          ref={this.setReferenceEl}
          role="combobox"
        >
          {this.renderIconStart()}
          {!single && this.renderChips()}
          <label class="screen-readers-only" htmlFor={`${guid}-input`} id={labelId}>
            {label}
          </label>
          {this.renderInput()}
          {this.renderIconEnd()}
        </div>
        <ul
          aria-labelledby={labelId}
          aria-multiselectable="true"
          class="screen-readers-only"
          id={guid}
          role="listbox"
          tabIndex={-1}
        >
          {this.renderListBoxOptions()}
        </ul>
        {this.renderPopperContainer()}
      </Host>
    );
  }
}
