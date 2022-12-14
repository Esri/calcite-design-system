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
import { DeprecatedEventPayload, Scale } from "../interfaces";
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

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When `true`, the component is selected.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /** When `true`, the component is active. */
  @Prop({ reflect: true }) active = false;

  /** Specifies the parent and grandparent items, which are set on `calcite-combobox`. */
  @Prop({ mutable: true }) ancestors: ComboboxChildElement[];

  /** The `id` attribute of the component. When omitted, a globally unique identifier is used. */
  @Prop({ reflect: true }) guid = guid();

  /** Specifies an icon to display. */
  @Prop({ reflect: true }) icon: string;

  @Watch("selected")
  selectedWatchHandler(): void {
    this.calciteComboboxItemChange.emit(this.el);
  }

  /** The component's text. */
  @Prop({ reflect: true }) textLabel!: string;

  /** The component's value. */
  @Prop() value!: any;

  /**
   * When `true`, omits the component from the `calcite-combobox` filtered search results.
   */
  @Prop({ reflect: true }) filterDisabled: boolean;

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
   * Emits whenever the component is selected or unselected.
   *
   * **Note:**: The event's payload is deprecated, please use the event's `target`/`currentTarget` instead
   */
  @Event({ cancelable: false }) calciteComboboxItemChange: EventEmitter<DeprecatedEventPayload>;

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
    this.toggleSelected();
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
