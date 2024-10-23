import { PropertyValues } from "lit";
import { createRef } from "lit-html/directives/ref.js";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import { getSlotted } from "../../utils/dom";
import {
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
import { ICON_TYPES } from "../pick-list/resources";
import { logger } from "../../utils/logger";
import { useT9n } from "../../controllers/useT9n";
import T9nStrings from "./assets/t9n/pick-list-item.t9n.en.json";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./pick-list-item.scss";

declare global {
  interface DeclareElements {
    "calcite-pick-list-item": PickListItem;
  }
}

logger.deprecated("component", {
  name: "pick-list-item",
  removalVersion: 3,
  suggested: "list-item",
});

/**
 * @deprecated Use the `calcite-list` component instead.
 * @slot actions-end - A slot for adding `calcite-action`s or content to the end side of the component.
 * @slot actions-start - A slot for adding `calcite-action`s or content to the start side of the component.
 */
export class PickListItem
  extends LitElement
  implements ConditionalSlotComponent, InteractiveComponent, LoadableComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private focusEl = createRef<HTMLLabelElement>();

  private shiftPressed: boolean;

  // #endregion

  // #region Public Properties

  /** A description for the component that displays below the label text. */
  @property({ reflect: true }) description: string;

  /** When `false`, the component cannot be deselected by user interaction. */
  @property({ reflect: true }) deselectDisabled = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Determines the icon SVG symbol that will be shown. Options are `"circle"`, `"square"`, `"grip"` or `null`.
   *
   * @see [ICON_TYPES](https://github.com/Esri/calcite-design-system/blob/dev/src/components/pick-list/resources.ts#L5)
   */
  @property({ reflect: true }) icon: ICON_TYPES | null = null;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /**
   * Label and accessible name for the component. Appears next to the icon.
   * TODO: [MIGRATION] This property was marked as required in your Stencil component. If you didn't mean it to be required, feel free to remove `@required` tag.
   * Otherwise, read the documentation about required properties: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-properties--docs#string-properties
   *
   * @required
   */
  @property({ reflect: true }) label: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @notPublic
   */
  /** TODO: [MIGRATION] This component has been updated to use the useT9n() controller. Documentation: https://qawebgis.esri.com/arcgis-components/?path=/docs/references-t9n-for-components--docs */
  messages = useT9n<typeof T9nStrings>();

  /** Provides additional metadata to the component. Primary use is for a filter on the parent list. */
  @property() metadata: Record<string, unknown>;

  /** @notPublic */
  @property({ reflect: true }) nonInteractive = false;

  /** When `true`, displays a remove action that removes the item from the list. */
  @property({ reflect: true }) removable = false;

  /** When `true`, selects an item. Toggles when an item is checked/unchecked. */
  @property({ reflect: true }) selected = false;

  /**
   * The component's value.
   * TODO: [MIGRATION] This property was marked as required in your Stencil component. If you didn't mean it to be required, feel free to remove `@required` tag.
   * Otherwise, read the documentation about required properties: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-properties--docs#string-properties
   *
   * @required
   */
  @property() value: any;

  // #endregion

  // #region Public Methods

  /** Sets focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.focusEl.value?.focus();
  }

  /**
   * Toggles the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   *
   * @param coerce
   */
  @method()
  async toggleSelected(coerce?: boolean): Promise<void> {
    this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
  }

  // #endregion

  // #region Events

  /**
   * Emits when the component's label, description, value, or metadata properties are modified.
   *
   * @notPublic
   */
  calciteInternalListItemPropsChange = createEvent({ cancelable: false });

  /**
   * Emits when the component's value property is modified.
   *
   * @notPublic
   */
  calciteInternalListItemValueChange = createEvent<{
    oldValue: any;
    newValue: any;
  }>({ cancelable: false });

  /** Fires when the component is selected or unselected. */
  calciteListItemChange = createEvent<{
    item: PickListItem["el"];
    value: any;
    selected: boolean;
    shiftPressed: boolean;
  }>({ cancelable: false });

  /** Fires when the remove button is pressed. */
  calciteListItemRemove = createEvent();

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  async load(): Promise<void> {
    setUpLoadableComponent(this);
  }

  /**
   * TODO: [MIGRATION] Consider inlining some of the watch functions called inside of this method to reduce boilerplate code
   *
   * @param changes
   */
  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("description")) {
      this.descriptionWatchHandler();
    }

    if (changes.has("label")) {
      this.labelWatchHandler();
    }

    if (changes.has("metadata")) {
      this.metadataWatchHandler();
    }

    if (changes.has("selected") && (this.hasUpdated || this.selected !== false)) {
      this.selectedWatchHandler();
    }

    if (changes.has("value")) {
      this.valueWatchHandler(this.value, changes.get("value"));
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  override disconnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  // #endregion

  // #region Private Methods

  private descriptionWatchHandler(): void {
    this.calciteInternalListItemPropsChange.emit();
  }

  private labelWatchHandler(): void {
    this.calciteInternalListItemPropsChange.emit();
  }

  private metadataWatchHandler(): void {
    this.calciteInternalListItemPropsChange.emit();
  }

  private selectedWatchHandler(): void {
    this.calciteListItemChange.emit({
      item: this.el,
      value: this.value,
      selected: this.selected,
      shiftPressed: this.shiftPressed,
    });

    this.shiftPressed = false;
  }

  private valueWatchHandler(newValue: any, oldValue?: any): void {
    this.calciteInternalListItemValueChange.emit({ oldValue, newValue });
  }

  private pickListClickHandler(event: MouseEvent): void {
    if (this.disabled || (this.deselectDisabled && this.selected) || this.nonInteractive) {
      return;
    }

    this.shiftPressed = event.shiftKey;
    this.selected = !this.selected;
  }

  private pickListKeyDownHandler(event: KeyboardEvent): void {
    if (event.key === " ") {
      event.preventDefault();
      if ((this.deselectDisabled && this.selected) || this.nonInteractive) {
        return;
      }
      this.selected = !this.selected;
    }
  }

  private removeClickHandler(): void {
    this.calciteListItemRemove.emit();
  }

  // #endregion

  // #region Rendering

  private renderIcon(): JsxNode {
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

  private renderRemoveAction(): JsxNode {
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

  private renderActionsStart(): JsxNode {
    const { el } = this;
    const hasActionsStart = getSlotted(el, SLOTS.actionsStart);

    return hasActionsStart ? (
      <div class={{ [CSS.actions]: true, [CSS.actionsStart]: true }}>
        <slot name={SLOTS.actionsStart} />
      </div>
    ) : null;
  }

  private renderActionsEnd(): JsxNode {
    const { el, removable } = this;
    const hasActionsEnd = getSlotted(el, SLOTS.actionsEnd);

    return hasActionsEnd || removable ? (
      <div class={{ [CSS.actions]: true, [CSS.actionsEnd]: true }}>
        <slot name={SLOTS.actionsEnd} />
        {this.renderRemoveAction()}
      </div>
    ) : null;
  }

  override render(): JsxNode {
    const { description, label } = this;

    return (
      <InteractiveContainer disabled={this.disabled}>
        {this.renderIcon()}
        {this.renderActionsStart()}
        <label
          ariaLabel={label}
          class={CSS.label}
          onClick={this.pickListClickHandler}
          onKeyDown={this.pickListKeyDownHandler}
          ref={this.focusEl}
          tabIndex={0}
        >
          <div ariaChecked={this.selected} class={CSS.textContainer} role="menuitemcheckbox">
            <span class={CSS.title}>{label}</span>
            {description ? <span class={CSS.description}>{description}</span> : null}
          </div>
        </label>
        {this.renderActionsEnd()}
      </InteractiveContainer>
    );
  }

  // #endregion
}
