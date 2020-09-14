import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  Watch,
  h,
  VNode
} from "@stencil/core";
import { CSS, ICONS, SLOTS, TEXT } from "./resources";
import { ICON_TYPES } from "../calcite-pick-list/resources";
import { getSlotted } from "../../utils/dom";

/**
 * @slot secondary-action - A slot intended for adding a `calcite-action` or `calcite-button` to the right side of the card.
 * This is placed at the end of the item.
 */
@Component({
  tag: "calcite-pick-list-item",
  styleUrl: "./calcite-pick-list-item.scss",
  shadow: true
})
export class CalcitePickListItem {
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
   * When false, the item cannot be deselected by user interaction.
   */
  @Prop() disableDeselect = false;

  /**
   * Determines the icon SVG symbol that will be shown. Options are circle, square, grid or null.
   */
  @Prop({ reflect: true }) icon?: ICON_TYPES | null = null;

  /**
   * Used to provide additional metadata to an item, primarily used when the parent list has a filter.
   */
  @Prop() metadata?: Record<string, unknown>;

  @Watch("metadata")
  metadataWatchHandler(): void {
    this.calciteListItemPropsChange.emit();
  }

  /**
   * Set this to true to display a remove action that removes the item from the list.
   */
  @Prop({ reflect: true }) removable? = false;

  /**
   * Set this to true to pre-select an item. Toggles when an item is checked/unchecked.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  @Watch("selected")
  selectedWatchHandler(): void {
    this.calciteListItemChange.emit({
      item: this.el,
      value: this.value,
      selected: this.selected,
      shiftPressed: this.shiftPressed
    });

    this.shiftPressed = false;
  }

  /**
   * An optional description for this item.  This will appear below the label text.
   */
  @Prop({ reflect: true }) textDescription?: string;

  @Watch("textDescription")
  textDescriptionWatchHandler(): void {
    this.calciteListItemPropsChange.emit();
  }

  /**
   * The main label for this item. This will appear next to the icon.
   */
  @Prop({ reflect: true }) textLabel: string;

  @Watch("textLabel")
  textLabelWatchHandler(): void {
    this.calciteListItemPropsChange.emit();
  }

  /**
   * The text for the remove item buttons. Only applicable if removable is true.
   */
  @Prop({ reflect: true }) textRemove = TEXT.remove;

  /**
   * A unique value used to identify this item - similar to the value attribute on an <input>.
   */
  @Prop({ reflect: true }) value!: string;

  @Watch("value")
  valueWatchHandler(newValue: string, oldValue: string): void {
    this.calciteListItemValueChange.emit({ oldValue, newValue });
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePickListItemElement;

  private focusEl: HTMLLabelElement;

  shiftPressed: boolean;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted whenever the item is selected or unselected.
   * @event calciteListItemChange
   */
  @Event() calciteListItemChange: EventEmitter<{
    item: HTMLCalcitePickListItemElement;
    value: string;
    selected: boolean;
    shiftPressed: boolean;
  }>;

  /**
   * Emitted whenever the remove button is pressed.
   * @event calciteListItemRemove
   */
  @Event() calciteListItemRemove: EventEmitter<void>;

  /**
   * Emitted whenever the the item's textLabel, textDescription, value or metadata properties are modified.
   * @event calciteListItemPropsChange
   * @internal
   */
  @Event() calciteListItemPropsChange: EventEmitter<void>;

  /**
   * Emitted whenever the the item's value property is modified.
   * @event calciteListItemValueChange
   * @internal
   */
  @Event() calciteListItemValueChange: EventEmitter<{
    oldValue: string;
    newValue: string;
  }>;

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

    this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
  }

  @Method()
  async setFocus(): Promise<void> {
    this.focusEl?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  pickListClickHandler = (event: MouseEvent): void => {
    if (this.disabled || (this.disableDeselect && this.selected)) {
      return;
    }

    this.shiftPressed = event.shiftKey;
    this.selected = !this.selected;
  };

  pickListKeyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === " ") {
      event.preventDefault();
      if (this.disableDeselect && this.selected) {
        return;
      }
      this.selected = !this.selected;
    }
  };

  removeClickHandler = (): void => {
    this.calciteListItemRemove.emit();
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderIcon(): VNode {
    const { icon } = this;

    if (!icon) {
      return null;
    }

    return (
      <span
        class={{
          [CSS.icon]: true,
          [CSS.iconDot]: icon === ICON_TYPES.circle
        }}
      >
        {icon === ICON_TYPES.square ? (
          <calcite-icon icon={ICONS.checked} scale="s"></calcite-icon>
        ) : null}
      </span>
    );
  }

  renderRemoveAction(): VNode {
    if (!this.removable) {
      return null;
    }

    return (
      <calcite-action
        class={CSS.remove}
        icon={ICONS.remove}
        onClick={this.removeClickHandler}
        scale="s"
        text={this.textRemove}
      />
    );
  }

  renderSecondaryAction(): VNode {
    const hasSecondaryAction = getSlotted(this.el, SLOTS.secondaryAction);
    return hasSecondaryAction || this.removable ? (
      <div class={CSS.action}>
        <slot name={SLOTS.secondaryAction}>{this.renderRemoveAction()}</slot>
      </div>
    ) : null;
  }

  render(): VNode {
    const description = this.textDescription ? (
      <span class={CSS.description}>{this.textDescription}</span>
    ) : null;

    return (
      <Host aria-checked={this.selected.toString()} role="menuitemcheckbox">
        <label
          aria-label={this.textLabel}
          class={CSS.label}
          onClick={this.pickListClickHandler}
          onKeyDown={this.pickListKeyDownHandler}
          ref={(focusEl): HTMLLabelElement => (this.focusEl = focusEl)}
          tabIndex={0}
        >
          {this.renderIcon()}
          <div class={CSS.textContainer}>
            <span class={CSS.title}>{this.textLabel}</span>
            {description}
          </div>
        </label>
        {this.renderSecondaryAction()}
      </Host>
    );
  }
}
