// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, JsxNode, state } from "@arcgis/lumina";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Scale } from "../interfaces";
import {
  FlipPlacement,
  MenuPlacement,
  OverlayPositioning,
  defaultMenuPlacement,
} from "../../utils/floating-ui";
import { useT9n } from "../../controllers/useT9n";
import type { Dropdown } from "../dropdown/dropdown";
import { useSetFocus } from "../../controllers/useSetFocus";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, IDS, REORDER_VALUES, SLOTS, SUBSTITUTIONS } from "./resources";
import {
  MoveEventDetail,
  SortMenuItem,
  Reorder,
  ReorderEventDetail,
  AddEventDetail,
} from "./interfaces";
import { styles } from "./sort-handle.scss";

declare global {
  interface DeclareElements {
    "calcite-sort-handle": SortHandle;
  }
}

export class SortHandle extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private dropdownEl: Dropdown["el"];

  private focusSetter = useSetFocus<this>()(this);

  // #endregion

  // #region State Properties

  @state() get hasSetInfo(): boolean {
    return typeof this.setPosition === "number" && typeof this.setSize === "number";
  }

  @state() get hasValidSetInfo(): boolean {
    return this.hasSetInfo ? this.setPosition > 0 && this.setSize > 1 : true;
  }

  @state() get hasReorderItems(): boolean {
    return !this.sortDisabled && this.hasValidSetInfo;
  }

  @state() get hasNoItems(): boolean {
    return !this.hasReorderItems && this.moveToItems.length < 1 && this.addToItems.length < 1;
  }

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the component's fallback `calcite-dropdown-item` `placement` when it's initial or specified `placement` has insufficient space available. */
  @property() flipPlacements: FlipPlacement[];

  /** Specifies the label of the component. */
  @property() label: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only.
   *
   * @private
   */
  @property() messages = useT9n<typeof T9nStrings>({ blocking: true });

  /** Defines the "Add to" items. */
  @property() addToItems: SortMenuItem[] = [];

  /** Defines the "Move to" items. */
  @property() moveToItems: SortMenuItem[] = [];

  /** When `true`, displays and positions the component. */
  @property({ reflect: true }) open = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the component will be positioned relative to the container element.
   *
   * @default "bottom-start"
   */
  @property({ reflect: true }) placement: MenuPlacement = defaultMenuPlacement;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** The current position of the handle. */
  @property() setPosition: number;

  /** The total number of sortable items. */
  @property() setSize: number;

  /** When `true`, items are no longer sortable. */
  @property({ reflect: true }) sortDisabled = false;

  /** Specifies the width of the component. */
  @property({ reflect: true }) widthScale: Scale;

  // #endregion

  // #region Public Methods

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.dropdownEl;
    }, options);
  }

  // #endregion

  // #region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteSortHandleBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteSortHandleBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteSortHandleClose = createEvent({ cancelable: false });

  /** Fires when a move item has been selected. */
  calciteSortHandleMove = createEvent<MoveEventDetail>({ cancelable: true });

  /** Fires when an add item has been selected. */
  calciteSortHandleAdd = createEvent<AddEventDetail>({ cancelable: true });

  /** Fires when the component is open and animation is complete. */
  calciteSortHandleOpen = createEvent({ cancelable: false });

  /** Fires when a reorder has been selected. */
  calciteSortHandleReorder = createEvent<ReorderEventDetail>({ cancelable: true });

  // #endregion

  // #region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Private Methods

  private openHandler(): void {
    if (this.disabled) {
      this.open = false;
      return;
    }

    if (this.dropdownEl) {
      // we set the property instead of the attribute to ensure dropdown's open/close events are emitted properly
      this.dropdownEl.open = this.open;
    }
  }

  private setDropdownEl(el: Dropdown["el"]): void {
    if (!el) {
      return;
    }
    this.dropdownEl = el;
    this.openHandler();
  }

  private getLabel(): string {
    const { label, messages, setPosition, setSize, hasSetInfo } = this;

    if (!hasSetInfo) {
      return label ?? "";
    }

    let formattedLabel = label
      ? messages.repositionLabel.replace(SUBSTITUTIONS.label, label)
      : messages.reposition;

    formattedLabel = formattedLabel.replace(
      SUBSTITUTIONS.position,
      setPosition ? setPosition.toString() : "",
    );

    return formattedLabel.replace(SUBSTITUTIONS.total, setSize ? setSize.toString() : "");
  }

  private handleBeforeOpen(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteSortHandleBeforeOpen.emit();
  }

  private handleOpen(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteSortHandleOpen.emit();
    this.open = true;
  }

  private handleBeforeClose(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteSortHandleBeforeClose.emit();
  }

  private handleClose(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteSortHandleClose.emit();
    this.open = false;
  }

  private handleReorder(event: Event): void {
    this.calciteSortHandleReorder.emit({
      reorder: (event.target as HTMLElement).dataset.value as Reorder,
    });
  }

  private handleMoveTo(event: Event): void {
    const id = (event.target as HTMLElement).dataset.id;
    const moveTo = this.moveToItems.find((item) => item.id === id);
    this.calciteSortHandleMove.emit({ moveTo });
  }

  private handleAddTo(event: Event): void {
    const id = (event.target as HTMLElement).dataset.id;
    const addTo = this.addToItems.find((item) => item.id === id);
    this.calciteSortHandleAdd.emit({ addTo });
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const {
      disabled,
      flipPlacements,
      open,
      overlayPositioning,
      placement,
      scale,
      widthScale,
      hasNoItems,
    } = this;

    const text = this.getLabel();
    const isDisabled = disabled || hasNoItems;

    return (
      <InteractiveContainer disabled={disabled}>
        <calcite-dropdown
          class={CSS.dropdown}
          disabled={isDisabled}
          flipPlacements={flipPlacements}
          oncalciteDropdownBeforeClose={this.handleBeforeClose}
          oncalciteDropdownBeforeOpen={this.handleBeforeOpen}
          oncalciteDropdownClose={this.handleClose}
          oncalciteDropdownOpen={this.handleOpen}
          overlayPositioning={overlayPositioning}
          placement={placement}
          ref={this.setDropdownEl}
          scale={scale}
          widthScale={widthScale}
        >
          <calcite-action
            active={open}
            appearance="transparent"
            class={CSS.handle}
            dragHandle
            icon={disabled ? ICONS.blank : ICONS.drag}
            label={text}
            scale={scale}
            slot={SLOTS.trigger}
            text={text}
            title={text}
          />
          {this.renderReorderGroup()}
          {this.renderMoveToGroup()}
          {this.renderAddToGroup()}
        </calcite-dropdown>
      </InteractiveContainer>
    );
  }

  private renderAddToItem(addToItem: SortMenuItem): JsxNode {
    return (
      <calcite-dropdown-item
        data-id={addToItem.id}
        key={addToItem.id}
        label={addToItem.label}
        oncalciteDropdownItemSelect={this.handleAddTo}
      >
        {addToItem.label}
      </calcite-dropdown-item>
    );
  }

  private renderMoveToItem(moveToItem: SortMenuItem): JsxNode {
    return (
      <calcite-dropdown-item
        data-id={moveToItem.id}
        key={moveToItem.id}
        label={moveToItem.label}
        oncalciteDropdownItemSelect={this.handleMoveTo}
      >
        {moveToItem.label}
      </calcite-dropdown-item>
    );
  }

  private renderReorderGroup(): JsxNode {
    return this.hasReorderItems ? (
      <calcite-dropdown-group
        groupTitle={this.messages.reorder}
        id={IDS.reorder}
        key="reorder"
        scale={this.scale}
        selectionMode="none"
      >
        {this.renderTop()}
        {this.renderUp()}
        {this.renderDown()}
        {this.renderBottom()}
      </calcite-dropdown-group>
    ) : null;
  }

  private renderAddToGroup(): JsxNode {
    const { messages, addToItems, scale } = this;

    return addToItems.length ? (
      <calcite-dropdown-group
        groupTitle={messages.addTo}
        id={IDS.add}
        key="add-to-items"
        scale={scale}
        selectionMode="none"
      >
        {addToItems.map((addToItem) => this.renderAddToItem(addToItem))}
      </calcite-dropdown-group>
    ) : null;
  }

  private renderMoveToGroup(): JsxNode {
    const { messages, moveToItems, scale } = this;

    return moveToItems.length ? (
      <calcite-dropdown-group
        groupTitle={messages.moveTo}
        id={IDS.move}
        key="move-to-items"
        scale={scale}
        selectionMode="none"
      >
        {moveToItems.map((moveToItem) => this.renderMoveToItem(moveToItem))}
      </calcite-dropdown-group>
    ) : null;
  }

  private renderDropdownItem(positionIndex: number, label: string): JsxNode {
    return (
      <calcite-dropdown-item
        data-value={REORDER_VALUES[positionIndex]}
        key={REORDER_VALUES[positionIndex]}
        label={label}
        oncalciteDropdownItemSelect={this.handleReorder}
      >
        {label}
      </calcite-dropdown-item>
    );
  }

  private renderTop(): JsxNode | null {
    const { setPosition } = this;

    return setPosition !== 1 && setPosition !== 2
      ? this.renderDropdownItem(0, this.messages.moveToTop)
      : null;
  }

  private renderUp(): JsxNode | null {
    return this.setPosition !== 1 ? this.renderDropdownItem(1, this.messages.moveUp) : null;
  }

  private renderDown(): JsxNode | null {
    return this.setPosition !== this.setSize
      ? this.renderDropdownItem(2, this.messages.moveDown)
      : null;
  }

  private renderBottom(): JsxNode | null {
    const { setPosition, setSize } = this;

    return setPosition !== setSize && setPosition !== setSize - 1
      ? this.renderDropdownItem(3, this.messages.moveToBottom)
      : null;
  }

  // #endregion
}
