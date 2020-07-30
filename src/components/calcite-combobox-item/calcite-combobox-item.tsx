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
  Watch,
  VNode
} from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { CSS } from "./resources";
import { getKey } from "../../utils/key";

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
  @Prop({ reflect: true }) disabled = false;

  /* The parent combobox item element */
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

  @Element() el: HTMLCalciteComboboxItemElement;

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

  @Listen("keydown") keyDownHandler(event): void {
    event.stopPropagation();
    switch (getKey(event.key)) {
      case " ":
      case "Enter":
        this.isSelected = !this.isSelected;
        this.calciteComboboxItemChange.emit(this.el);
        event.preventDefault();
        break;
      case "ArrowUp":
      case "ArrowDown":
      case "Home":
      case "End":
      case "Tab":
      case "Escape":
        this.calciteComboboxItemKeyEvent.emit({
          event: event,
          item: this.el
        });
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
    this.calciteComboboxItemChange.emit(this.el);
  };

  getDepth(): boolean {
    return !!this.el.parentElement?.closest("calcite-combobox-item");
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderIcon(scale): VNode {
    const iconScale = scale !== "l" ? "s" : "m";
    const iconPath = this.disabled ? "circle-disallowed" : "check";
    return <calcite-icon class={CSS.icon} scale={iconScale} icon={iconPath} />;
  }

  renderChildren(): VNode {
    if (!this.hasDefaultSlot) {
      return null;
    }
    return (
      <ul>
        <slot />
      </ul>
    );
  }

  render(): VNode {
    const classes = {
      [CSS.label]: true,
      [CSS.selected]: this.isSelected,
      [CSS.nested]: this.isNested,
      [CSS.parent]: !this.isNested
    };
    const scale = getElementProp(this.el, "scale", "m");
    const dir = getElementDir(this.el);

    return (
      <Host
        dir={dir}
        scale={scale}
        role="option"
        aria-selected={this.isSelected}
        disabled={this.disabled}
        tabIndex={this.disabled ? null : 0}
      >
        <div
          class={classes}
          onClick={this.itemClickHandler}
          ref={(el) => (this.comboboxItemEl = el as HTMLElement)}
        >
          {this.renderIcon(scale)}
          <span class={CSS.title}>{this.textLabel}</span>
        </div>
        {this.renderChildren()}
      </Host>
    );
  }
}
