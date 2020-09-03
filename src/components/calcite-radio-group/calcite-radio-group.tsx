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
  Build,
  Method,
  VNode
} from "@stencil/core";

import { getElementDir, getElementProp, hasLabel } from "../../utils/dom";
import { getKey } from "../../utils/key";

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

  @Element() el: HTMLCalciteRadioGroupElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * The group's name. Gets submitted with the form.
   */
  @Prop() name: string;

  @Watch("name")
  protected handleNameChange(value: string): void {
    this.hiddenInput.name = value;
  }

  /**
   * The group's selected item.
   */
  @Prop() selectedItem: HTMLCalciteRadioGroupItemElement;

  @Watch("selectedItem")
  protected handleSelectedItemChange<T extends HTMLCalciteRadioGroupItemElement>(
    newItem: T,
    oldItem: T
  ): void {
    if (newItem === oldItem) {
      return;
    }
    const items = this.getItems();
    const match = Array.from(items)
      .filter((item) => item === newItem)
      .pop();

    if (match) {
      this.selectItem(match);
      this.calciteRadioGroupChange.emit();
    } else if (items[0]) {
      items[0].tabIndex = 0;
    }
  }

  /** The component's theme. */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** The scale of the radio group */
  @Prop({ reflect: true }) scale: "s" | "m" | "l";

  /** specify the appearance style of the radio group, defaults to solid. */
  @Prop({ mutable: true, reflect: true }) appearance: "solid" | "outline" = "solid";

  /** specify the layout of the radio group, defaults to horizontal */
  @Prop({ mutable: true, reflect: true }) layout: "horizontal" | "vertical" = "horizontal";

  /** specify the width of the group, defaults to auto */
  @Prop({ mutable: true, reflect: true }) width: "auto" | "full" = "auto";

  /** is the radio group disabled  */
  @Prop({ reflect: true }) disabled?: boolean;
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    // prop validations
    const scale = ["s", "m", "l"];
    if (!scale.includes(this.scale))
      this.scale = getElementProp(this.el.parentElement, "scale", "m");

    const appearance = ["solid", "outline"];
    if (!appearance.includes(this.appearance)) this.appearance = "solid";

    const layout = ["horizontal", "vertical"];
    if (!layout.includes(this.layout)) this.layout = "horizontal";

    const width = ["auto", "full"];
    if (!width.includes(this.width)) this.width = "auto";

    const items = this.getItems();
    const lastChecked = Array.from(items)
      .filter((item) => item.checked)
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

  componentDidLoad(): void {
    this.hasLoaded = true;
  }

  render(): VNode {
    return (
      <Host role="radiogroup" tabIndex={this.disabled ? -1 : null}>
        <slot />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteLabelFocus", { target: "window" }) handleLabelFocus(
    e: Record<string, any>
  ): void {
    if (hasLabel(e.detail.labelEl, this.el)) {
      this.setFocus();
    }
  }

  @Listen("click") protected handleClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).localName === "calcite-radio-group-item") {
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
    const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
    const key = getKey(event.key);
    const { el, selectedItem } = this;

    if (keys.indexOf(key) === -1) {
      return;
    }

    let adjustedKey = key;

    if (getElementDir(el) === "rtl") {
      if (key === "ArrowRight") {
        adjustedKey = "ArrowLeft";
      }
      if (key === "ArrowLeft") {
        adjustedKey = "ArrowRight";
      }
    }

    const items = this.getItems();
    let selectedIndex = -1;

    items.forEach((item, index) => {
      if (item === selectedItem) {
        selectedIndex = index;
      }
    });

    switch (adjustedKey) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        const previous =
          selectedIndex < 1 ? items.item(items.length - 1) : items.item(selectedIndex - 1);
        this.selectItem(previous);
        return;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        const next =
          selectedIndex === -1 ? items.item(1) : items.item(selectedIndex + 1) || items.item(0);
        this.selectItem(next);
        return;
      case " ":
        event.preventDefault();
        this.selectItem(event.target as HTMLCalciteRadioGroupItemElement);
        return;
      default:
        return;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteRadioGroupChange: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Focuses the selected item. If there is no selection, it focuses the first item. */
  @Method()
  async setFocus(): Promise<void> {
    (this.selectedItem || this.getItems()[0])?.focus();
  }

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

    items.forEach((item) => {
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
