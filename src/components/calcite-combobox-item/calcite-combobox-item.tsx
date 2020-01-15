import {
  Component,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  h,
  State,
  Watch
} from "@stencil/core";

import { CSS } from "./resources";

@Component({
  tag: "calcite-combobox-item",
  styleUrl: "./calcite-combobox-item.scss",
  shadow: true
})
export class CalciteComboboxItem {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, the item cannot be clicked and is visually muted.
   */
  @Prop({ reflect: true }) disabled? = false;

  /**
   * Set this to true to pre-select an item. Toggles when an item is checked/unchecked.
   */
  @Prop({ reflect: true }) selected = false;

  @Watch("selected") selectedWatchHandler(newValue: boolean) {
    this.isSelected = newValue;
  }

  /**
   * The main label for this item.
   */
  // @Prop({ reflect: true }) textLabel!: string;

  /**
   * A unique value used to identify this item - similar to the value attribute on an <input>.
   */
  @Prop({ reflect: true }) value!: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @State() isSelected = this.selected;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted whenever the item is selected or unselected.
   * @event calciteItemChange
   */
  @Event() calciteItemChange: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Used to toggle the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   */
  @Method() async toggleSelected(coerce?: boolean) {
    if (this.disabled) {
      return;
    }

    this.isSelected = typeof coerce === "boolean" ? coerce : !this.isSelected;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  itemClickHandler = (event: MouseEvent): void => {
    event.preventDefault();
    if (this.disabled) {
      return;
    }

    this.isSelected = !this.isSelected;
    this.calciteItemChange.emit({value: this.value, selected: this.isSelected});
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderIcon() {
    return (
      <span class={{[CSS.icon]: true, [CSS.hidden]: !this.isSelected}}>
        <calcite-icon scale="s" icon="check" />
      </span>
    );
  }

  render() {
    return (
      <Host role="option" aria-selected={this.isSelected} disabled={this.disabled} >
        <a class={CSS.label} onClick={this.itemClickHandler} href="#" >
          {this.renderIcon()}
          <span class={CSS.title}><slot /></span>
        </a>
      </Host>
    );
  }
}
