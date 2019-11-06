import {
  Component,
  Event,
  h,
  EventEmitter,
  Listen,
  Element,
  Prop,
  Watch,
  Host,
  Build
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
  protected handleNameChange(value): void {
    this.hiddenInput.name = value;
  }

  /**
   * The group's selected item.
   */
  @Prop()
  selectedItem: HTMLCalciteRadioGroupItemElement;

  @Watch("selectedItem")
  protected handleSelectedItemChange<
    T extends HTMLCalciteRadioGroupItemElement
  >(newItem: T, oldItem: T) {
    if (newItem === oldItem) {
      return;
    }
    const items = this.getItems();
    const match = Array.from(items)
      .filter(item => item === newItem)
      .pop();

    if (match) {
      this.selectItem(match);
      this.calciteRadioGroupChange.emit();
    } else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }

  /** The component's theme. */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  /** The scale of the button */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // prop validations
    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";

    let theme = ["dark", "light"];
    if (!theme.includes(this.theme)) this.theme = "light";

    const items = this.getItems();
    let lastChecked = Array.from(items)
      .filter(item => item.checked)
      .pop();

    if (lastChecked) {
      this.selectItem(lastChecked);
    } else if (items[0]) {
      items[0].tabIndex = 0;
    }

    const { hiddenInput, name } = this;

    if (name) {
      hiddenInput.name = name;
    }

    if (lastChecked) {
      hiddenInput.value = lastChecked.value;
    }
  }

  componentDidLoad() {
    this.hasLoaded = true;
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
  protected handleClick(event: MouseEvent): void {
    if (
      (event.target as HTMLElement).localName === "calcite-radio-group-item"
    ) {
      this.selectItem(event.target as HTMLCalciteRadioGroupItemElement);
    }
  }

  @Listen("calciteRadioGroupItemChange")
  protected handleSelected(event: Event): void {
    // only fire after initial setup to prevent semi-infinite loops
    if (this.hasLoaded) {
      event.stopPropagation();
      event.preventDefault();
      this.selectItem(event.target as HTMLCalciteRadioGroupItemElement);
    }
  }

  @Listen("keydown")
  protected handleKeyDown(event: KeyboardEvent): void {
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
  calciteRadioGroupChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  private hiddenInput: HTMLInputElement = (() => {
    const input = document.createElement("input");
    input.type = "hidden";
    this.el.appendChild(input);
    return input;
  })();

  private hasLoaded: boolean;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private getItems(): NodeListOf<HTMLCalciteRadioGroupItemElement> {
    return this.el.querySelectorAll("calcite-radio-group-item");
  }

  private selectItem(selected: HTMLCalciteRadioGroupItemElement): void {
    if (selected === this.selectedItem) {
      return;
    }

    const items = this.getItems();
    let match: HTMLCalciteRadioGroupItemElement = null;

    items.forEach(item => {
      const matches = item.value === selected.value;

      if ((matches && !item.checked) || (!matches && item.checked)) {
        item.checked = matches;
      }

      item.tabIndex = matches ? 0 : -1;

      if (matches) {
        match = item;
      }
    });

    this.selectedItem = match;
    this.syncWithInputProxy(match);
    if (Build.isBrowser && match) {
      match.focus();
    }
  }

  private syncWithInputProxy(item: HTMLCalciteRadioGroupItemElement): void {
    this.hiddenInput.value = item ? item.value : "";
  }
}
