import {
  Component,
  Event,
  h,
  EventEmitter,
  Listen,
  Element,
  Prop,
  Watch,
  Host
} from "@stencil/core";

import { getElementDir } from "../../utils/dom";

const navigationKeys = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  space: " "
};

@Component({
  tag: "calcite-radio-group",
  styleUrl: "calcite-radio-group.scss",
  shadow: true
})
export class CalciteRadioGroup {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element()
  el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * The group's name. Gets submitted with the form.
   */
  @Prop()
  name: string;

  @Watch("name")
  handleNameChange(value): void {
    this.hiddenInput.name = value;
  }

  /**
   * The group's selected item.
   */
  @Prop()
  selectedItem: HTMLCalciteRadioGroupItemElement;

  @Watch("selectedItem")
  handleSelectedItemChange<T extends HTMLCalciteRadioGroupItemElement>(
    newItem: T,
    oldItem: T
  ) {
    if (newItem === oldItem) {
      return;
    }

    let match: HTMLCalciteRadioGroupItemElement = null;

    const items = this.getItems();

    items.forEach(item => {
      const matches = item === newItem;

      if (matches) {
        match = item;
      }
    });

    if (match) {
      this.selectItem(match);
      this.calciteRadioGroupItemSelect.emit();
    } else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }

  /**
   * The component's theme.
   */
  @Prop({
    reflect: true
  })
  theme: "light" | "dark" = "light";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    const items = this.getItems();
    let lastChecked: HTMLCalciteRadioGroupItemElement;

    items.forEach((item, index) => {
      item.tabIndex = -1;

      const next = items[index + 1];

      if (item.checked) {
        lastChecked = item;
      }

      if (next && next.checked && item.checked) {
        item.checked = false;
      }
    });

    if (lastChecked) {
      this.selectItem(lastChecked);
    } else if (items[0]) {
      items[0].tabIndex = 0;
    }

    const { hiddenInput } = this;

    if (this.name) {
      hiddenInput.name = this.name;
    }

    if (lastChecked) {
      hiddenInput.value = lastChecked.value;
    }
  }

  render() {
    return (
      <Host role="radiogroup">
        <slot />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click")
  handleClick(event: MouseEvent): void {
    if (
      (event.target as HTMLElement).localName === "calcite-radio-group-item"
    ) {
      this.selectItem(event.target as HTMLCalciteRadioGroupItemElement);
    }
  }

  @Listen("calciteRadioGroupItemChange")
  handleSelected(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.selectItem(event.target as HTMLCalciteRadioGroupItemElement);
  }

  @Listen("keydown")
  handleKeyDown(event: KeyboardEvent): void {
    const { key } = event;

    if (Object.values(navigationKeys).indexOf(key) === -1) {
      return;
    }

    event.preventDefault();

    const { el, selectedItem } = this;
    const dir = getElementDir(el);
    const moveBackwardKey =
            (dir === "rtl"
             ? key === navigationKeys.right
             : key === navigationKeys.left) || key === navigationKeys.up;
    const items = this.getItems();

    let selectedIndex = -1;

    items.forEach((item, index) => {
      if (item === selectedItem) {
        selectedIndex = index;
      }
    });

    if (moveBackwardKey) {
      const previous =
              selectedIndex === -1 || selectedIndex === 0
              ? items.item(items.length - 1)
              : items.item(selectedIndex - 1);
      this.selectItem(previous);
      return;
    }

    const moveForwardKey =
            (dir === "rtl"
             ? key === navigationKeys.left
             : key === navigationKeys.right) || key === navigationKeys.down;

    if (moveForwardKey) {
      const next =
              selectedIndex === -1
              ? items.item(1)
              : items.item(selectedIndex + 1) || items.item(0);
      this.selectItem(next);
      return;
    }

    if (key === navigationKeys.space) {
      this.selectItem(event.target as HTMLCalciteRadioGroupItemElement);
      return;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event()
  calciteRadioGroupItemSelect: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  hiddenInput: HTMLInputElement = (() => {
    const input = document.createElement("input");
    input.type = "hidden";
    this.el.appendChild(input);
    return input;
  })();

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  getItems(): NodeListOf<HTMLCalciteRadioGroupItemElement> {
    return this.el.querySelectorAll("calcite-radio-group-item");
  }

  selectItem(selected: HTMLCalciteRadioGroupItemElement): void {
    if (selected === this.selectedItem) {
      return;
    }

    const items = this.getItems();
    let match: HTMLCalciteRadioGroupItemElement = null;

    items.forEach(item => {
      const matches = item.value === selected.value;

      item.checked = matches;
      item.tabIndex = matches ? 0 : -1;

      if (matches) {
        match = item;
      }
    });

    this.selectedItem = match;
    this.syncWithInputProxy(match);
    match && match.focus();
  }

  syncWithInputProxy(item: HTMLCalciteRadioGroupItemElement): void {
    this.hiddenInput.value = item ? item.value : "";
  }
}
