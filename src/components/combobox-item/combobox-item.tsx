import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  h,
  Watch,
  VNode
} from "@stencil/core";
import { getElementProp, getSlotted } from "../../utils/dom";
import { CSS } from "./resources";
import { guid } from "../../utils/guid";
import { ComboboxChildElement } from "../combobox/interfaces";
import { getAncestors, getDepth } from "../combobox/utils";
import { Scale } from "../interfaces";
import {
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
  ConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

/**
 * @slot - A slot for adding nested `calcite-combobox-item`s.
 */
@Component({
  tag: "calcite-combobox-item",
  styleUrl: "combobox-item.scss",
  shadow: true
})
export class ComboboxItem implements ConditionalSlotComponent, InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** When true, the item cannot be clicked and is visually muted. */
  @Prop({ reflect: true }) disabled = false;

  /** Set this to true to pre-select an item. Toggles when an item is checked/unchecked. */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /** True when item is highlighted either from keyboard or mouse hover */
  @Prop() active = false;

  /** Parent and grandparent combobox items, this is set internally for use from combobox */
  @Prop({ mutable: true }) ancestors: ComboboxChildElement[];

  /** Unique identifier, used for accessibility */
  @Prop() guid = guid();

  /** Custom icon to display both in combobox chips and next to combobox item text */
  @Prop() icon?: string;

  @Watch("selected")
  selectedWatchHandler(): void {
    this.calciteComboboxItemChange.emit(this.el);
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

  isNested: boolean;

  scale: Scale = "m";

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.ancestors = getAncestors(this.el);
    this.scale = getElementProp(this.el, "scale", this.scale);
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
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
   *
   * @param coerce
   */
  @Method()
  async toggleSelected(coerce?: boolean): Promise<void> {
    if (this.disabled) {
      return;
    }
    this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
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
    this.selected = !this.selected;
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderIcon(isSingle: boolean): VNode {
    const { icon, disabled, selected } = this;
    const level = `${CSS.icon}--indent`;
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
          [CSS.iconActive]: icon && selected,
          [level]: true
        }}
        icon={icon || iconPath}
        scale="s"
      />
    );
  }

  renderChildren(): VNode {
    if (getSlotted(this.el)) {
      return (
        <ul key="default-slot-container">
          <slot />
        </ul>
      );
    }

    return null;
  }

  render(): VNode {
    const isSingleSelect = getElementProp(this.el, "selection-mode", "multi") === "single";
    const classes = {
      [CSS.label]: true,
      [CSS.selected]: this.selected,
      [CSS.active]: this.active,
      [CSS.single]: isSingleSelect
    };
    const depth = getDepth(this.el);

    return (
      <Host aria-hidden="true">
        <div
          class={`container scale--${this.scale}`}
          style={{ "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` }}
        >
          <li class={classes} id={this.guid} onClick={this.itemClickHandler}>
            {this.renderIcon(isSingleSelect)}
            <span class={CSS.title}>{this.textLabel}</span>
          </li>
          {this.renderChildren()}
        </div>
      </Host>
    );
  }
}
