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
  Build
} from "@stencil/core";
import { filter } from "../../utils/filter";
import { getElementDir } from "../../utils/dom";
import { debounce } from "lodash-es";
import { getKey } from "../../utils/key";

const COMBO_BOX_ITEM = "calcite-combobox-item";

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
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  @Prop({ reflect: true }) active = false;

  @Prop({ reflect: true }) disabled = false;

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** specify the scale of the combobox, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  @Prop() label!: string;

  @Prop() placeholder?: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteComboboxElement;

  @State() items: HTMLCalciteComboboxItemElement[] = [];

  @State() selectedItems: HTMLCalciteComboboxItemElement[] = [];

  @State() visibleItems: HTMLCalciteComboboxItemElement[] = [];

  textInput: HTMLInputElement = null;

  data: ItemData[];

  observer: MutationObserver = null;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    // prop validations
    const scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";
    if (Build.isBrowser) {
      this.observer = new MutationObserver(this.updateItems);
    }
  }

  componentWillLoad(): void {
    this.updateItems();
  }

  componentDidLoad(): void {
    this.observer?.observe(this.el, { childList: true, subtree: true });
  }

  disconnectedCallback(): void {
    this.observer?.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  @Event() calciteLookupChange: EventEmitter;

  @Event() calciteComboboxChipDismiss: EventEmitter;

  @Listen("calciteComboboxItemChange") calciteComboboxItemChangeHandler(
    event: CustomEvent<HTMLCalciteComboboxItemElement>
  ): void {
    this.toggleSelection(event.detail);
  }

  @Listen("calciteChipDismiss") calciteChipDismissHandler(
    event: CustomEvent<HTMLCalciteChipElement>
  ): void {
    this.textInput.focus();

    const value = event.detail?.value;
    const comboboxItem = this.items.find((item) => item.value === value);

    if (comboboxItem) {
      this.toggleSelection(comboboxItem, false);
    }
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  inputHandler = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.filterItems(target.value);
  };

  handleInputKeyDown(event: KeyboardEvent): void {
    if (event.target === this.textInput) {
      const key = getKey(event.key);
      if (event.shiftKey && key === "Tab") {
        return;
      } else if (key === "Escape") {
        this.active = false;
      } else if (key === "ArrowDown") {
        this.focusFirstItem();
      } else if (key === "ArrowUp") {
        this.focusLastItem();
      } else {
        this.active = true;
        this.textInput.focus();
      }
    }
  }

  filterItems = debounce((value: string): void => {
    const filteredData = filter(this.data, value);
    const values = filteredData.map((item) => item.value);
    this.items.forEach((item) => {
      item.hidden = values.indexOf(item.value) === -1;
      // If item is nested inside another item...
      const { parentItem } = item;
      if (parentItem) {
        // If the parent item is a match, show me.
        if (values.indexOf(parentItem.value) !== -1) {
          item.hidden = false;
        }
        // If I am a match, show my parent.
        if (values.indexOf(item.value) !== -1) {
          parentItem.hidden = false;
        }
      }
    });

    this.visibleItems = this.getVisibleItems();
  }, 100);

  toggleSelection(item: HTMLCalciteComboboxItemElement, value = !item.selected): void {
    item.selected = value;
    this.selectedItems = this.getSelectedItems();
    this.calciteLookupChange.emit(this.selectedItems);
  }

  getVisibleItems(): HTMLCalciteComboboxItemElement[] {
    return this.items.filter((item) => !item.hidden);
  }

  getSelectedItems(): HTMLCalciteComboboxItemElement[] {
    return this.items.filter((item) => item.selected);
  }

  updateItems(): void {
    this.items = this.getItems();
    this.data = this.getData();
    this.selectedItems = this.getSelectedItems();
    this.visibleItems = this.getVisibleItems();
  }

  getData(): ItemData[] {
    return this.items.map((item) => ({
      value: item.value,
      label: item.textLabel
    }));
  }

  getItems(): HTMLCalciteComboboxItemElement[] {
    const items = Array.from(this.el.querySelectorAll(COMBO_BOX_ITEM));

    return items
      .filter((item) => !item.disabled)
      .map((item) => {
        const { parentElement } = item;

        item.parentItem = parentElement.matches(COMBO_BOX_ITEM)
          ? (parentElement as HTMLCalciteComboboxItemElement)
          : null;

        return item;
      });
  }

  @Listen("calciteComboboxItemKeyEvent") calciteComboboxItemKeyEventHandler(
    event: CustomEvent<{
      event: KeyboardEvent;
      item: HTMLCalciteComboboxItemElement;
    }>
  ): void {
    const { item, event: keyboardEvent } = event.detail;
    const isFirstItem = this.itemIndex(item) === 0;
    const isLastItem = this.itemIndex(item) === this.items.length - 1;
    const shiftKey = keyboardEvent.shiftKey;
    const keyCode = getKey(keyboardEvent.key);
    switch (keyCode) {
      case "Tab":
        if (isFirstItem && shiftKey) this.closeCalciteCombobox();
        if (isLastItem && !shiftKey) this.closeCalciteCombobox();
        else if (isFirstItem && shiftKey) this.textInput.focus();
        else if (shiftKey) this.focusPrevItem(item);
        else this.focusNextItem(item);
        break;
      case "ArrowDown":
        this.focusNextItem(item);
        break;
      case "ArrowUp":
        this.focusPrevItem(item);
        break;
      case "Home":
        this.focusFirstItem();
        break;
      case "End":
        this.focusLastItem();
        break;
      case "Escape":
        this.closeCalciteCombobox();
        break;
    }
  }

  closeCalciteCombobox(): void {
    this.textInput.focus();
    this.active = false;
  }

  focusFirstItem(): void {
    const firstItem = this.items[0];
    firstItem.focus();
  }

  focusLastItem(): void {
    const lastItem = this.items[this.items.length - 1];
    lastItem.focus();
  }

  focusNextItem(item: HTMLCalciteComboboxItemElement): void {
    const index = this.itemIndex(item);
    const nextItem = this.items[index + 1] || this.items[0];
    nextItem.focus();
  }

  focusPrevItem(item: HTMLCalciteComboboxItemElement): void {
    const index = this.itemIndex(item);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    prevItem.focus();
  }

  itemIndex(item: HTMLCalciteComboboxItemElement): number {
    return this.items.indexOf(item);
  }

  comboboxFocusHandler = (event: Event): void => {
    this.active = event.type === "focusin";
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const dir = getElementDir(this.el);
    const listBoxId = "listbox";
    return (
      <Host
        active={this.active}
        onFocusin={this.comboboxFocusHandler}
        onFocusout={this.comboboxFocusHandler}
        dir={dir}
      >
        <div class="selections">
          {this.selectedItems.map((item) => {
            return (
              <calcite-chip
                key={item.value}
                scale={this.scale}
                value={item.value}
                dir={dir}
                dismissible
              >
                {item.textLabel}
              </calcite-chip>
            );
          })}
        </div>
        <div
          role="combobox"
          aria-expanded={this.active.toString()}
          aria-owns={listBoxId}
          aria-haspopup="listbox"
        >
          <input
            type="text"
            placeholder={this.placeholder}
            aria-label={this.label}
            aria-autocomplete="list"
            aria-controls={listBoxId}
            onInput={this.inputHandler}
            disabled={this.disabled}
            onKeyDown={(e) => this.handleInputKeyDown(e)}
            ref={(el) => (this.textInput = el as HTMLInputElement)}
          />
        </div>
        <ul
          id={listBoxId}
          aria-label={this.label}
          role="listbox"
          class={{ list: true }}
          aria-multiselectable="true"
        >
          <slot />
        </ul>
      </Host>
    );
  }
}
