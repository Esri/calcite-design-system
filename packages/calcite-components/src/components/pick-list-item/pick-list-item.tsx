import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import { getSlotted, toAriaBoolean } from "../../utils/dom";
import {
  connectInteractive,
  disconnectInteractive,
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { ICON_TYPES } from "../pick-list/resources";
import { PickListItemMessages } from "./assets/pick-list-item/t9n";
import { CSS, ICONS, SLOTS } from "./resources";

/**
 * @deprecated Use the `list` component instead.
 * @slot actions-end - A slot for adding `calcite-action`s or content to the end side of the component.
 * @slot actions-start - A slot for adding `calcite-action`s or content to the start side of the component.
 */
@Component({
  tag: "calcite-pick-list-item",
  styleUrl: "pick-list-item.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class PickListItem
  implements ConditionalSlotComponent, InteractiveComponent, LoadableComponent, T9nComponent
{
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * A description for the component that displays below the label text.
   */
  @Prop({ reflect: true }) description: string;

  @Watch("description")
  descriptionWatchHandler(): void {
    this.calciteInternalListItemPropsChange.emit();
  }

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When `false`, the component cannot be deselected by user interaction.
   */
  @Prop({ reflect: true }) deselectDisabled = false;

  /**
   * @internal
   */
  @Prop({ reflect: true }) nonInteractive = false;

  /**
   * Determines the icon SVG symbol that will be shown. Options are `"circle"`, `"square"`, `"grip"` or `null`.
   *
   * @see [ICON_TYPES](https://github.com/Esri/calcite-design-system/blob/main/src/components/pick-list/resources.ts#L5)
   */
  @Prop({ reflect: true }) icon: ICON_TYPES | null = null;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /**
   * Label and accessible name for the component. Appears next to the icon.
   */
  @Prop({ reflect: true }) label!: string;

  @Watch("label")
  labelWatchHandler(): void {
    this.calciteInternalListItemPropsChange.emit();
  }

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<PickListItemMessages>;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: PickListItemMessages;

  @Watch("defaultMessages")
  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Provides additional metadata to the component. Primary use is for a filter on the parent list.
   */
  @Prop() metadata: Record<string, unknown>;

  @Watch("metadata")
  metadataWatchHandler(): void {
    this.calciteInternalListItemPropsChange.emit();
  }

  /**
   * When `true`, displays a remove action that removes the item from the list.
   */
  @Prop({ reflect: true }) removable = false;

  /**
   * When `true`, selects an item. Toggles when an item is checked/unchecked.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  @Watch("selected")
  selectedWatchHandler(): void {
    this.calciteListItemChange.emit({
      item: this.el,
      value: this.value,
      selected: this.selected,
      shiftPressed: this.shiftPressed,
    });

    this.shiftPressed = false;
  }

  /**
   * The component's value.
   */
  @Prop() value!: any;

  @Watch("value")
  valueWatchHandler(newValue: any, oldValue: any): void {
    this.calciteInternalListItemValueChange.emit({ oldValue, newValue });
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalcitePickListItemElement;

  private focusEl: HTMLLabelElement;

  shiftPressed: boolean;

  @State() defaultMessages: PickListItemMessages;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
    connectConditionalSlotComponent(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
    disconnectLocalized(this);
    disconnectMessages(this);
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
   * Fires when the component is selected or unselected.
   */
  @Event({ cancelable: false }) calciteListItemChange: EventEmitter<{
    item: HTMLCalcitePickListItemElement;
    value: any;
    selected: boolean;
    shiftPressed: boolean;
  }>;

  /**
   * Fires when the remove button is pressed.
   */
  @Event({ cancelable: true }) calciteListItemRemove: EventEmitter<void>;

  /**
   * Emits when the component's label, description, value, or metadata properties are modified.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalListItemPropsChange: EventEmitter<void>;

  /**
   * Emits when the component's value property is modified.
   *
   * @internal
   */
  @Event({ cancelable: false }) calciteInternalListItemValueChange: EventEmitter<{
    oldValue: any;
    newValue: any;
  }>;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Toggles the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   *
   * @param coerce
   */
  @Method()
  async toggleSelected(coerce?: boolean): Promise<void> {
    this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
  }

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.focusEl?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  pickListClickHandler = (event: MouseEvent): void => {
    if (this.disabled || (this.deselectDisabled && this.selected) || this.nonInteractive) {
      return;
    }

    this.shiftPressed = event.shiftKey;
    this.selected = !this.selected;
  };

  pickListKeyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === " ") {
      event.preventDefault();
      if ((this.deselectDisabled && this.selected) || this.nonInteractive) {
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
    const { icon, iconFlipRtl } = this;

    if (!icon) {
      return null;
    }

    return (
      <span
        class={{
          [CSS.icon]: true,
          [CSS.iconDot]: icon === ICON_TYPES.circle,
        }}
        onClick={this.pickListClickHandler}
      >
        {icon === ICON_TYPES.square ? (
          <calcite-icon flipRtl={iconFlipRtl} icon={ICONS.checked} scale="s" />
        ) : null}
      </span>
    );
  }

  renderRemoveAction(): VNode {
    return this.removable ? (
      <calcite-action
        class={CSS.remove}
        icon={ICONS.remove}
        onClick={this.removeClickHandler}
        slot={SLOTS.actionsEnd}
        text={this.messages.remove}
      />
    ) : null;
  }

  renderActionsStart(): VNode {
    const { el } = this;
    const hasActionsStart = getSlotted(el, SLOTS.actionsStart);

    return hasActionsStart ? (
      <div class={{ [CSS.actions]: true, [CSS.actionsStart]: true }}>
        <slot name={SLOTS.actionsStart} />
      </div>
    ) : null;
  }

  renderActionsEnd(): VNode {
    const { el, removable } = this;
    const hasActionsEnd = getSlotted(el, SLOTS.actionsEnd);

    return hasActionsEnd || removable ? (
      <div class={{ [CSS.actions]: true, [CSS.actionsEnd]: true }}>
        <slot name={SLOTS.actionsEnd} />
        {this.renderRemoveAction()}
      </div>
    ) : null;
  }

  render(): VNode {
    const { description, label } = this;

    return (
      <InteractiveContainer disabled={this.disabled}>
        {this.renderIcon()}
        {this.renderActionsStart()}
        <label
          aria-label={label}
          class={CSS.label}
          onClick={this.pickListClickHandler}
          onKeyDown={this.pickListKeyDownHandler}
          tabIndex={0}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={(focusEl): HTMLLabelElement => (this.focusEl = focusEl)}
        >
          <div
            aria-checked={toAriaBoolean(this.selected)}
            class={CSS.textContainer}
            role="menuitemcheckbox"
          >
            <span class={CSS.title}>{label}</span>
            {description ? <span class={CSS.description}>{description}</span> : null}
          </div>
        </label>
        {this.renderActionsEnd()}
      </InteractiveContainer>
    );
  }
}
