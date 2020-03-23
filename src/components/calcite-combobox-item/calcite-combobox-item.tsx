import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  h,
  State,
  Watch
} from "@stencil/core";
import {
  UP,
  DOWN,
  TAB,
  ENTER,
  ESCAPE,
  HOME,
  END,
  SPACE
} from "../../utils/keys";

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

  /* When true, the item cannot be clicked and is visually muted. */
  @Prop({ reflect: true }) disabled? = false;

  @Prop() parentItem?: HTMLCalciteComboboxItemElement;

  /* Set this to true to pre-select an item. Toggles when an item is checked/unchecked. */
  @Prop({ reflect: true }) selected = false;

  @Watch("selected") selectedWatchHandler(newValue: boolean) {
    this.isSelected = newValue;
  }

  /* The main label for this item. */
  @Prop({ reflect: true }) textLabel!: string;

  /* A unique value used to identify this item - similar to the value attribute on an <input>. */
  @Prop({ reflect: true }) value!: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLElement;

  @State() isSelected = this.selected;

  isNested: boolean;

  hasDefaultSlot: boolean;

  comboboxItemEl: HTMLElement;

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
   * @event calciteComboboxItemChange
   */
  @Event() calciteComboboxItemChange: EventEmitter;
  @Event() calciteComboboxItemKeyEvent: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  // --------------------------------------------------------------------------

  @Listen("keydown") keyDownHandler(event) {
    event.stopPropagation();
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        this.isSelected = !this.isSelected;
        this.calciteComboboxItemChange.emit({
          value: this.value,
          selected: this.isSelected
        });
        event.preventDefault();
        break;
      case UP:
      case DOWN:
      case HOME:
      case END:
      case TAB:
      case ESCAPE:
        this.calciteComboboxItemKeyEvent.emit({ item: event });
        event.preventDefault();
        break;
    }
  }

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
    this.calciteComboboxItemChange.emit({
      value: this.value,
      selected: this.isSelected
    });
  };

  // todo check for levels deep
  getDepth() {
    return this.el.parentElement.nodeName === "CALCITE-COMBOBOX-ITEM";
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderIcon() {
    return <calcite-icon class={CSS.icon} scale="s" icon="check" />;
  }

  renderChildren() {
    if (!this.hasDefaultSlot) {
      return null;
    }
    return (
      <ul>
        <slot />
      </ul>
    );
  }

  render() {
    const classes = {
      [CSS.label]: true,
      [CSS.selected]: this.isSelected,
      [CSS.nested]: this.isNested,
      [CSS.parent]: !this.isNested
    };
    return (
      <Host
        role="option"
        aria-selected={this.isSelected}
        disabled={this.disabled}
        tabIndex={0}
      >
        <div
          class={classes}
          onClick={this.itemClickHandler}
          ref={el => (this.comboboxItemEl = el as HTMLElement)}
        >
          {this.renderIcon()}
          <span class={CSS.title}>{this.textLabel}</span>
        </div>
        {this.renderChildren()}
      </Host>
    );
  }
}
