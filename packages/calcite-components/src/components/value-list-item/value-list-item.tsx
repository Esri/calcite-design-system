import { createRef } from "lit-html/directives/ref.js";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  JsxNode,
  setAttribute,
} from "@arcgis/lumina";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
} from "../../utils/conditionalSlot";
import { getSlotted } from "../../utils/dom";
import { guid } from "../../utils/guid";
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
import { CSS, SLOTS as PICK_LIST_SLOTS } from "../pick-list-item/resources";
import { ICON_TYPES } from "../pick-list/resources";
import { logger } from "../../utils/logger";
import type { PickListItem } from "../pick-list-item/pick-list-item";
import { ListItemAndHandle } from "./interfaces";
import { ICONS, SLOTS } from "./resources";
import { styles } from "./value-list-item.scss";

declare global {
  interface DeclareElements {
    "calcite-value-list-item": ValueListItem;
  }
}

logger.deprecated("component", {
  name: "value-list-item",
  removalVersion: 3,
  suggested: "list-item",
});

/**
 * @deprecated Use the `calcite-list` component instead.
 * @slot actions-end - A slot for adding `calcite-action`s or content to the end side of the component.
 * @slot actions-start - A slot for adding `calcite-action`s or content to the start side of the component.
 */
export class ValueListItem
  extends LitElement
  implements ConditionalSlotComponent, InteractiveComponent, LoadableComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private guid = `calcite-value-list-item-${guid()}`;

  private handleEl = createRef<HTMLSpanElement>();

  private pickListItem: PickListItem["el"] = null;

  // #endregion

  // #region Public Properties

  /** A description for the component that displays below the label text. */
  @property({ reflect: true }) description?: string;

  /** @notPublic */
  @property() deselectDisabled = false;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** @notPublic */
  @property() handleActivated? = false;

  /**
   * Determines the icon SVG symbol that will be shown. Options are circle, square, grip or null.
   *
   * @see [ICON_TYPES](https://github.com/Esri/calcite-design-system/blob/dev/src/components/pick-list/resources.ts#L5)
   */
  @property({ reflect: true }) icon?: ICON_TYPES | null = null;

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

  /** Provides additional metadata to the component. Primary use is for a filter on the parent list. */
  @property() metadata?: Record<string, unknown>;

  /** When `true`, prevents the content of the component from user interaction. */
  @property({ reflect: true }) nonInteractive = false;

  /** When `true`, adds an action to remove the component. */
  @property({ reflect: true }) removable = false;

  /** When `true`, the component is selected. */
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

  /** Set focus on the component. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    return this.pickListItem?.setFocus();
  }

  /**
   * Toggle the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   *
   * @param coerce
   */
  @method()
  async toggleSelected(coerce?: boolean): Promise<void> {
    this.pickListItem.toggleSelected(coerce);
  }

  // #endregion

  // #region Events

  /** Fires when the component is selected or unselected. */
  calciteListItemChange = createEvent<{
    item: ValueListItem["el"];
    value: any;
    selected: boolean;
    shiftPressed: boolean;
  }>({ cancelable: false });
  /** Fires when the remove button is pressed. */

  // wrapped pick-list-item emits this
  calciteListItemRemove = createEvent();

  /** @notPublic */
  calciteValueListItemDragHandleBlur = createEvent<ListItemAndHandle>({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteListItemChange", this.calciteListItemChangeHandler);
  }

  override connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  load(): void {
    setUpLoadableComponent(this);
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

  private calciteListItemChangeHandler(event: CustomEvent): void {
    // adjust item payload from wrapped item before bubbling
    event.detail.item = this.el;
  }

  private getPickListRef(el: PickListItem["el"]): void {
    this.pickListItem = el;
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === " ") {
      this.handleActivated = !this.handleActivated;
    }
  }

  private handleBlur(): void {
    this.handleActivated = false;
    this.calciteValueListItemDragHandleBlur.emit({ item: this.el, handle: this.handleEl.value });
  }

  private handleSelectChange(event: CustomEvent): void {
    this.selected = event.detail.selected;
  }

  // #endregion

  // #region Rendering

  private renderActionsEnd(): JsxNode {
    const { el } = this;
    const hasActionsEnd = getSlotted(el, SLOTS.actionsEnd);

    return hasActionsEnd ? (
      <slot name={SLOTS.actionsEnd} slot={PICK_LIST_SLOTS.actionsEnd} />
    ) : null;
  }

  private renderActionsStart(): JsxNode {
    const { el } = this;
    const hasActionsStart = getSlotted(el, SLOTS.actionsStart);

    return hasActionsStart ? (
      <slot name={SLOTS.actionsStart} slot={PICK_LIST_SLOTS.actionsStart} />
    ) : null;
  }

  private renderHandle(): JsxNode {
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
          ref={this.handleEl}
          role="button"
          tabIndex="0"
        >
          <calcite-icon flipRtl={iconFlipRtl} icon={ICONS.drag} scale="s" />
        </span>
      );
    }
  }

  override render(): JsxNode {
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "id", this.el.id || this.guid);
    return (
      <InteractiveContainer disabled={this.disabled}>
        {this.renderHandle()}
        <calcite-pick-list-item
          description={this.description}
          deselectDisabled={this.deselectDisabled}
          disabled={this.disabled}
          label={this.label}
          metadata={this.metadata}
          nonInteractive={this.nonInteractive}
          oncalciteListItemChange={this.handleSelectChange}
          ref={this.getPickListRef}
          removable={this.removable}
          selected={this.selected}
          value={this.value}
        >
          {this.renderActionsStart()}
          {this.renderActionsEnd()}
        </calcite-pick-list-item>
      </InteractiveContainer>
    );
  }

  // #endregion
}
