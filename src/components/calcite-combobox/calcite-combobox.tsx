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

const COMBO_BOX_ITEM = "calcite-combobox-item";

const DEFAULT_PLACEMENT = "bottom-start";

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

  @Watch("active")
  activeHandler(): void {
    this.reposition();
  }

  @Prop({ reflect: true }) disabled = false;

  @Prop() label!: string;

  @Prop() placeholder?: string;

  /** specify the scale of the combobox, defaults to m */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

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

  private popper: Popper;

  private menuEl: HTMLDivElement;

  private referenceEl: HTMLDivElement;

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
  }

  disconnectedCallback(): void {
    this.observer?.disconnect();
    this.destroyPopper();
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async reposition(): Promise<void> {
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

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  @Event() calciteLookupChange: EventEmitter;

  @Event() calciteComboboxChipDismiss: EventEmitter;

  @Listen("click", { target: "document" })
  documentClickHandler(event: Event): void {
    const target = event.target as HTMLElement;
    this.setInactiveIfNotContained(target);
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

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setInactiveIfNotContained = (target: HTMLElement): void => {
    if (!this.active || this.el.contains(target)) {
      return;
    }

    this.active = false;
  };

  setMenuEl = (el: HTMLDivElement): void => {
    this.menuEl = el;
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

  inputHandler = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.filterItems(target.value);
  };

  handleInputKeyDown = (event: KeyboardEvent): void => {
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
  };

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

  @Listen("calciteComboboxItemKeyEvent")
  calciteComboboxItemKeyEventHandler(
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

  comboboxFocusHandler = (): void => {
    this.active = true;
  };

  comboboxBlurHandler = (event: FocusEvent): void => {
    const relatedTarget = event.relatedTarget as HTMLElement;
    this.setInactiveIfNotContained(relatedTarget);
  };

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const { active, disabled, el, label, placeholder, scale, selectedItems } = this;
    const dir = getElementDir(el);
    const listBoxId = "listbox";
    return (
      <Host active={active} dir={dir}>
        <div class="selections">
          {selectedItems.map((item) => {
            return (
              <calcite-chip dir={dir} dismissible key={item.value} scale={scale} value={item.value}>
                {item.textLabel}
              </calcite-chip>
            );
          })}
        </div>
        <div
          aria-expanded={active.toString()}
          aria-haspopup="listbox"
          aria-owns={listBoxId}
          ref={this.setReferenceEl}
          role="combobox"
        >
          <input
            aria-autocomplete="list"
            aria-controls={listBoxId}
            aria-label={label}
            disabled={disabled}
            onBlur={this.comboboxBlurHandler}
            onFocus={this.comboboxFocusHandler}
            onInput={this.inputHandler}
            onKeyDown={this.handleInputKeyDown}
            placeholder={placeholder}
            ref={(el) => (this.textInput = el as HTMLInputElement)}
            type="text"
          />
        </div>
        <div aria-hidden={(!active).toString()} class="list-container" ref={this.setMenuEl}>
          <ul
            aria-label={label}
            aria-multiselectable="true"
            class={{
              list: true,
              [PopperCSS.animation]: true,
              [PopperCSS.animationActive]: active
            }}
            id={listBoxId}
            role="listbox"
          >
            <slot />
          </ul>
        </div>
      </Host>
    );
  }
}
