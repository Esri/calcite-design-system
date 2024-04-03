import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  VNode,
} from "@stencil/core";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import { getSlotted } from "../../utils/dom";
import { guid } from "../../utils/guid";
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
import { CSS, SLOTS as PICK_LIST_SLOTS } from "../pick-list-item/resources";
import { ICON_TYPES } from "../pick-list/resources";
import { ListItemAndHandle } from "./interfaces";
import { ICONS, SLOTS } from "./resources";

/**
 * @deprecated Use the `list` component instead.
 * @slot actions-end - A slot for adding `calcite-action`s or content to the end side of the component.
 * @slot actions-start - A slot for adding `calcite-action`s or content to the start side of the component.
 */
@Component({
  tag: "calcite-value-list-item",
  styleUrl: "value-list-item.scss",
  shadow: true,
})
export class ValueListItem
  implements ConditionalSlotComponent, InteractiveComponent, LoadableComponent
{
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * A description for the component that displays below the label text.
   */
  @Prop({ reflect: true }) description?: string;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * @internal
   */
  @Prop() deselectDisabled = false;

  /**
   * When `true`, prevents the content of the component from user interaction.
   */
  @Prop({ reflect: true }) nonInteractive = false;

  /**
   * @internal
   */
  @Prop({ mutable: true }) handleActivated? = false;

  /**
   * Determines the icon SVG symbol that will be shown. Options are circle, square, grip or null.
   *
   * @see [ICON_TYPES](https://github.com/Esri/calcite-design-system/blob/main/src/components/pick-list/resources.ts#L5)
   */
  @Prop({ reflect: true }) icon?: ICON_TYPES | null = null;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl = false;

  /**
   * Label and accessible name for the component. Appears next to the icon.
   */
  @Prop({ reflect: true }) label!: string;

  /**
   * Provides additional metadata to the component. Primary use is for a filter on the parent list.
   */
  @Prop() metadata?: Record<string, unknown>;

  /**
   * When `true`, adds an action to remove the component.
   */
  @Prop({ reflect: true }) removable = false;

  /**
   * When `true`, the component is selected.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /**
   * The component's value.
   */
  @Prop() value!: any;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteValueListItemElement;

  pickListItem: HTMLCalcitePickListItemElement = null;

  handleEl: HTMLSpanElement;

  guid = `calcite-value-list-item-${guid()}`;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
    connectInteractive(this);
  }

  disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
    disconnectInteractive(this);
  }

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Toggle the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   *
   * @param coerce
   */
  @Method()
  async toggleSelected(coerce?: boolean): Promise<void> {
    this.pickListItem.toggleSelected(coerce);
  }

  /** Set focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    return this.pickListItem?.setFocus();
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
    item: HTMLCalciteValueListItemElement;
    value: any;
    selected: boolean;
    shiftPressed: boolean;
  }>;

  /**
   * Fires when the remove button is pressed.
   */
  @Event({ cancelable: true }) calciteListItemRemove: EventEmitter<void>; // wrapped pick-list-item emits this

  /**
   * @internal
   */
  @Event({ cancelable: false })
  calciteValueListItemDragHandleBlur: EventEmitter<ListItemAndHandle>;

  @Listen("calciteListItemChange")
  calciteListItemChangeHandler(event: CustomEvent): void {
    // adjust item payload from wrapped item before bubbling
    event.detail.item = this.el;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  getPickListRef = (el: HTMLCalcitePickListItemElement): HTMLCalcitePickListItemElement =>
    (this.pickListItem = el);

  handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === " ") {
      this.handleActivated = !this.handleActivated;
    }
  };

  handleBlur = (): void => {
    this.handleActivated = false;
    this.calciteValueListItemDragHandleBlur.emit({ item: this.el, handle: this.handleEl });
  };

  handleSelectChange = (event: CustomEvent): void => {
    this.selected = event.detail.selected;
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderActionsEnd(): VNode {
    const { el } = this;
    const hasActionsEnd = getSlotted(el, SLOTS.actionsEnd);

    return hasActionsEnd ? (
      <slot name={SLOTS.actionsEnd} slot={PICK_LIST_SLOTS.actionsEnd} />
    ) : null;
  }

  renderActionsStart(): VNode {
    const { el } = this;
    const hasActionsStart = getSlotted(el, SLOTS.actionsStart);

    return hasActionsStart ? (
      <slot name={SLOTS.actionsStart} slot={PICK_LIST_SLOTS.actionsStart} />
    ) : null;
  }

  renderHandle(): VNode {
    const { icon, iconFlipRtl } = this;
    if (icon === ICON_TYPES.grip) {
      return (
        <span
          class={{
            [CSS.handle]: true,
            [CSS.handleActivated]: this.handleActivated,
          }}
          data-js-handle
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          role="button"
          tabindex="0"
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={(el) => (this.handleEl = el as HTMLSpanElement)}
        >
          <calcite-icon flipRtl={iconFlipRtl} icon={ICONS.drag} scale="s" />
        </span>
      );
    }
  }

  render(): VNode {
    return (
      <Host id={this.el.id || this.guid}>
        <InteractiveContainer disabled={this.disabled}>
          {this.renderHandle()}
          <calcite-pick-list-item
            description={this.description}
            deselectDisabled={this.deselectDisabled}
            disabled={this.disabled}
            label={this.label}
            metadata={this.metadata}
            nonInteractive={this.nonInteractive}
            onCalciteListItemChange={this.handleSelectChange}
            removable={this.removable}
            selected={this.selected}
            value={this.value}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={this.getPickListRef}
          >
            {this.renderActionsStart()}
            {this.renderActionsEnd()}
          </calcite-pick-list-item>
        </InteractiveContainer>
      </Host>
    );
  }
}
