import {
  Component,
  h,
  Host,
  Prop,
  State,
  Listen,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import { UP, DOWN, TAB, HOME, END, ESCAPE } from "../../utils/keys";
import { filter } from "../../utils/filter";
import { debounce } from "lodash-es";

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

  @Prop() disabled = false;

  /** specify the scale of the combobox, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "xs" | "s" | "m" | "l" | "xl" =
    "m";

  @Prop() placeholder: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLElement;

  @State() selectedItems = [];

  @Prop({ reflect: true }) active = false;

  textInput: HTMLInputElement = null;

  items: HTMLCalciteComboboxItemElement[] = null;

  visibleItems: HTMLCalciteComboboxItemElement[] = null;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback() {
    // prop validations
    let scale = ["xs", "s", "m", "l", "xl"];
    if (!scale.includes(this.scale)) this.scale = "m";
  }

  componentDidLoad() {
    this.items = Array.from(this.el.querySelectorAll("calcite-combobox-item"));
    this.setParentItems();
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  @Event() calciteLookupChange: EventEmitter;
  @Event() calciteComboboxChipDismiss: EventEmitter;

  @Listen("calciteComboboxItemChange") calciteComboboxItemChangeHandler(
    event: CustomEvent
  ) {
    this.toggleSelection(event.detail);
  }

  @Listen("calciteChipDismiss") calciteChipDismissHandler(event: CustomEvent) {
    const value = event.detail.value;
    this.textInput.focus();
    this.deselectItem(value);
    this.toggleSelection({ value, selected: false });
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

  handleInputKeyDown(e) {
    if (e.target === this.textInput) {
      if (e.shiftKey && e.KeyCode === "TAB") {
        return;
      } else if (e.keyCode === ESCAPE) {
        this.active = false;
      } else if (e.keyCode === DOWN) {
        this.focusFirstItem();
      } else if (e.keyCode === UP) {
        this.focusLastItem();
      } else {
        this.active = true;
        this.textInput.focus();
      }
    } else return;
  }

  filterItems = debounce(value => {
    const filteredData = filter(this.items, value);
    const values = filteredData.map(item => item.value);
    this.items.forEach(item => {
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
    this.visibleItems = Array.from(
      this.el.querySelectorAll("calcite-combobox-item:not([hidden])")
    );
  }, 100);

  toggleSelection(item): void {
    if (!item.selected) {
      this.selectedItems = this.selectedItems.filter(currentValue => {
        return currentValue !== item.value;
      });
    } else {
      this.selectedItems = [...this.selectedItems, item.value];
    }
    this.calciteLookupChange.emit(this.selectedItems);
  }

  deselectItem(value): void {
    const comboboxItem = this.items.find(item => item.value === value);

    if (comboboxItem) {
      comboboxItem.toggleSelected(false);
    }
  }

  setParentItems(): void {
    this.items.forEach(item => {
      const { parentElement } = item;

      item.parentItem = parentElement.matches("calcite-combobox-item")
        ? (parentElement as HTMLCalciteComboboxItemElement)
        : null;
    });
  }

  @Listen("calciteComboboxItemKeyEvent") calciteComboboxItemKeyEventHandler(
    item: CustomEvent
  ) {
    let e = item.detail.item;
    let isFirstItem = this.itemIndex(e.target) === 0;
    let isLastItem = this.itemIndex(e.target) === this.items.length - 1;
    switch (e.keyCode) {
      case TAB:
        if (isFirstItem && e.shiftKey) this.closeCalciteCombobox();
        if (isLastItem && !e.shiftKey) this.closeCalciteCombobox();
        else if (isFirstItem && e.shiftKey) this.textInput.focus();
        else if (e.shiftKey) this.focusPrevItem(e.target);
        else this.focusNextItem(e.target);
        break;
      case DOWN:
        this.focusNextItem(e.target);
        break;
      case UP:
        this.focusPrevItem(e.target);
        break;
      case HOME:
        this.focusFirstItem();
        break;
      case END:
        this.focusLastItem();
        break;
      case ESCAPE:
        this.closeCalciteCombobox();
        break;
    }
  }

  private closeCalciteCombobox() {
    this.textInput.focus();
    this.active = false;
  }

  private focusFirstItem() {
    const firstItem = this.items[0];
    firstItem.focus();
  }

  private focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    lastItem.focus();
  }
  private focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.items[index + 1] || this.items[0];
    nextItem.focus();
  }

  private focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    prevItem.focus();
  }

  private itemIndex(e) {
    return this.items.indexOf(e);
  }

  comboboxFocusHandler = event => {
    this.active = event.type === "focusin";
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render() {
    const listBoxId = "listbox";
    return (
      <Host
        active={this.active}
        onFocusin={this.comboboxFocusHandler}
        onFocusout={this.comboboxFocusHandler}
      >
        <div class="selections">
          {this.selectedItems.map(item => {
            return (
              <calcite-chip active scale={this.scale} value={item}>
                {item}
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
            aria-autocomplete="list"
            aria-controls={listBoxId}
            onInput={this.inputHandler}
            disabled={this.disabled}
            onKeyDown={e => this.handleInputKeyDown(e)}
            ref={el => (this.textInput = el as HTMLInputElement)}
          />
        </div>
        <ul
          id={listBoxId}
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
