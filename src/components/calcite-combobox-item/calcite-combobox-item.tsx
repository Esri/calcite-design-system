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
  Watch,
  VNode
} from "@stencil/core";
import { getElementDir, getElementProp } from "../../utils/dom";
import { CSS } from "./resources";
import { guid } from "../../utils/guid";
import { ComboboxChildElement } from "../calcite-combobox/interfaces";
import { getAncestors, getDepth } from "../calcite-combobox/utils";
import { Scale } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";

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

  /** Parent and grandparent combobox items, this is set internally for use from combobox */
  @Prop({ mutable: true }) ancestors: ComboboxChildElement[];

  /** Unique identifier, used for accessibility */
  @Prop() guid: string = guid();

  /** Custom icon to display both in combobox chips and next to combobox item text */
  @Prop() icon?: string;

  @Watch("selected")
  selectedWatchHandler(newValue: boolean): void {
    this.isSelected = newValue;
  }

  /** The main label for this item. */
  @Prop({ reflect: true }) textLabel!: string;

  /** The item's associated value */
  @Prop() value!: any;

  /** Don't filter this item based on the search text */
  @Prop({ reflect: true }) constant: boolean;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteComboboxItemElement;

  @State() isSelected = this.selected;

  isNested: boolean;

  hasDefaultSlot: boolean;

  scale: Scale = "m";

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.ancestors = getAncestors(this.el);
    this.scale = getElementProp(this.el, "scale", this.scale);
  }

  componentWillLoad(): void {
    this.hasDefaultSlot = this.el.querySelector(":not([slot])") !== null;
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted whenever the item is selected or unselected.
   */
  @Event() calciteComboboxItemChange: EventEmitter;

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

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderIcon(scale: string, isSingle: boolean): VNode {
    const { icon, el, disabled, isSelected } = this;
    const level = `${CSS.icon}--indent-${getDepth(el)}`;
    const iconScale = scale !== "l" ? "s" : "m";
    const defaultIcon = isSingle ? "dot" : "check";
    const iconPath = disabled ? "circle-disallowed" : defaultIcon;
    const showDot = isSingle && !icon && !disabled;
    return showDot ? (
      <span
        class={{
          [CSS.icon]: true,
          [CSS.dot]: true,
          [level]: true
        }}
      />
    ) : (
      <calcite-icon
        class={{
          [CSS.icon]: !icon,
          [CSS.custom]: !!icon,
          [CSS.iconActive]: icon && isSelected,
          [level]: true
        }}
        icon={icon || iconPath}
        scale={iconScale}
      />
    );
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
    const isSingleSelect = getElementProp(this.el, "selection-mode", "multi") === "single";
    const dir = getElementDir(this.el);
    const classes = {
      [CSS_UTILITY.rtl]: dir === "rtl",
      [CSS.label]: true,
      [CSS.selected]: this.isSelected,
      [CSS.active]: this.active,
      [CSS.single]: isSingleSelect
    };

    return (
      <Host aria-hidden="true">
        <div class={`scale--${this.scale}`}>
          <li class={classes} id={this.guid} onClick={this.itemClickHandler}>
            {this.renderIcon(this.scale, isSingleSelect)}
            <span class={CSS.title}>{this.textLabel}</span>
          </li>
          {this.renderChildren()}
        </div>
      </Host>
    );
  }
}
