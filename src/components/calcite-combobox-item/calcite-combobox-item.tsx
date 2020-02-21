import {
  Component,
  Element,
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
  @Prop({ reflect: true }) textLabel!: string;

  /**
   * A unique value used to identify this item - similar to the value attribute on an <input>.
   */
  @Prop({ reflect: true }) value!: string;


  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLElement;

  @State() isSelected = this.selected;

  isNested : boolean;

  hasDefaultSlot: boolean;

  anchorElement: HTMLAnchorElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentWillLoad() {
    this.isNested = this.getDepth();
    this.hasDefaultSlot = this.el.querySelector(":not([slot])") !== null;
  }

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

  /**
   * Used to set keyboard focus on the internal anchor tag.
   */
  @Method() async setFocus() {
    this.anchorElement.focus();
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

  getDepth() {
    return this.el.parentElement.nodeName === "CALCITE-COMBOBOX-ITEM";
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderIcon() {
    return (
      <calcite-icon class={CSS.icon} scale="s" icon="check" />
    );
  }

  renderChildren() {
    if (!this.hasDefaultSlot) { return null; }
    return (
      <ul>
        <slot />
      </ul>
    );
  }

  render() {
    const classes= {[CSS.label]: true, [CSS.selected]: this.isSelected, [CSS.nested] : this.isNested };
    return (
      <Host role="option" aria-selected={this.isSelected} disabled={this.disabled} >
        <a class={classes} onClick={this.itemClickHandler} href="#" ref={(el) => this.anchorElement = el as HTMLAnchorElement} >
          {this.renderIcon()}
          <span class={CSS.title}>{this.textLabel}</span>
        </a>
        {this.renderChildren()}
      </Host>
    );
  }
}
