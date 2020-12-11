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
import { guid } from "../../utils/guid";

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

  /** When true, the item cannot be clicked and is visually muted. */
  @Prop({ reflect: true }) disabled = false;

  /** Set this to true to pre-select an item. Toggles when an item is checked/unchecked. */
  @Prop({ reflect: true }) selected = false;

  /** True when item is highlighted either from keyboard or mouse hover */
  @Prop() active = false;

  @Prop({mutable: true}) anscestors: HTMLCalciteComboboxItemElement[];

  @Prop() guid: string = guid();

  @Watch("selected")
  selectedWatchHandler(newValue: boolean): void {
    this.isSelected = newValue;
  }

  /** The main label for this item. */
  @Prop({ reflect: true }) textLabel!: string;

  /** A unique value used to identify this item - similar to the value attribute on an <input>. */
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

  componentWillLoad(): void {
    const parent = this.el.parentElement?.closest("calcite-combobox-item");
    const grandparent = parent?.parentElement?.closest("calcite-combobox-item");
    this.anscestors = [parent, grandparent].filter(el => el);
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

  @Event() calciteComboboxItemHover: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  // --------------------------------------------------------------------------

  @Listen("keydown")
  keyDownHandler(event: KeyboardEvent): void {
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
  @Method()
  async toggleSelected(coerce?: boolean): Promise<void> {
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

  itemHoverHandler = (): void => {
    this.calciteComboboxItemHover.emit(this.el);
  };

  getDepth(): number {
    const parent = this.el.parentElement?.closest("calcite-combobox-item");
    if (!parent) {
      return 0;
    }
    const grandparent = parent.parentElement?.closest("calcite-combobox-item");
    if (!grandparent) {
      return 1;
    }
    return 2;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderIcon(scale: string): VNode {
    const level = `${CSS.icon}--indent-${this.getDepth()}`;
    const iconScale = scale !== "l" ? "s" : "m";
    const iconPath = this.disabled ? "circle-disallowed" : "check";
    return <calcite-icon class={`${CSS.icon} ${level}`} icon={iconPath} scale={iconScale} />;
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
      [CSS.active]: this.active,
      [CSS.nested]: this.isNested,
      [CSS.parent]: !this.isNested
    };
    const scale = getElementProp(this.el, "scale", "m");
    const dir = getElementDir(this.el);

    return (
      <Host
        dir={dir}
        disabled={this.disabled}
        scale={scale}
        aria-hidden
        tabIndex={-1}
      >
        <li
          id={this.guid}
          class={classes}
          onClick={this.itemClickHandler}
          onMouseOver={this.itemHoverHandler}
          ref={(el) => (this.comboboxItemEl = el as HTMLElement)}
          tabIndex={-1}
        >
          {this.renderIcon(scale)}
          <span class={CSS.title}>{this.textLabel}</span>
        </li>
        {this.renderChildren()}
      </Host>
    );
  }
}
