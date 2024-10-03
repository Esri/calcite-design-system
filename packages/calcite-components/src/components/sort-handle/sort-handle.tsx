import {
  Event,
  Component,
  Element,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
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
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Scale } from "../interfaces";
import { FlipPlacement, MenuPlacement, OverlayPositioning } from "../../components";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { SortHandleMessages } from "./assets/sort-handle/t9n";
import { CSS, ICONS, REORDER_VALUES, SUBSTITUTIONS } from "./resources";
import { MoveEventDetail, MoveToItem, Reorder, ReorderEventDetail } from "./interfaces";

@Component({
  tag: "calcite-sort-handle",
  styleUrl: "sort-handle.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class SortHandle implements LoadableComponent, T9nComponent, InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Specifies the component's fallback `calcite-dropdown-item` `placement` when it's initial or specified `placement` has insufficient space available.
   */
  @Prop() flipPlacements: FlipPlacement[];

  /**
   * Specifies the maximum number of `calcite-dropdown-item`s to display before showing a scroller.
   * Value must be greater than `0`, and does not include `groupTitle`'s from `calcite-dropdown-group`.
   */
  @Prop({ reflect: true }) maxItems = 0;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the component will be positioned relative to the container element.
   *
   * @default "bottom-start"
   */
  @Prop({ reflect: true }) placement: MenuPlacement = defaultMenuPlacement;

  /**
   * Made into a prop for testing purposes only.
   *
   * @internal
   * @readonly
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: SortHandleMessages;

  /**
   * Specifies the label of the component.
   */
  @Prop() label: string;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<SortHandleMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Defines the "Move to" items.
   */
  @Prop() moveToItems: MoveToItem[];

  /**
   * When `true`, displays and positions the component.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  /** Specifies the size of the component. */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * The current position of the handle.
   */
  @Prop() setPosition: number;

  /**
   * The total number of sortable items.
   */
  @Prop() setSize: number;

  /**
   * Specifies the width of the component.
   */
  @Prop({ reflect: true }) widthScale: Scale;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    connectMessages(this);
    connectLocalized(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  disconnectedCallback(): void {
    disconnectMessages(this);
    disconnectLocalized(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteSortHandleElement;

  @State() defaultMessages: SortHandleMessages;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  dropdownEl: HTMLCalciteDropdownElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when a reorder has been selected.
   */
  @Event({ cancelable: false }) calciteSortHandleReorder: EventEmitter<ReorderEventDetail>;

  /**
   * Fires when a move item has been selected.
   */
  @Event({ cancelable: false }) calciteSortHandleMove: EventEmitter<MoveEventDetail>;

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    this.dropdownEl?.setFocus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private setDropdownEl = (el: HTMLCalciteDropdownElement): void => {
    this.dropdownEl = el;
  };

  private getLabel(): string {
    const { label, messages, setPosition, setSize } = this;

    let formattedLabel = label
      ? messages.repositionLabel.replace(SUBSTITUTIONS.label, label)
      : messages.reposition;

    formattedLabel = formattedLabel.replace(
      SUBSTITUTIONS.position,
      setPosition ? setPosition.toString() : "",
    );

    return formattedLabel.replace(SUBSTITUTIONS.total, setSize ? setSize.toString() : "");
  }

  private handleOpen = (): void => {
    this.open = true;
  };

  private handleClose = (): void => {
    this.open = false;
  };

  private handleReorder = (event: Event): void => {
    this.calciteSortHandleReorder.emit({
      reorder: (event.target as HTMLElement).dataset.value as Reorder,
    });
  };

  private handleMoveTo = (event: Event): void => {
    this.calciteSortHandleMove.emit({ value: (event.target as HTMLElement).dataset.value });
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const {
      disabled,
      flipPlacements,
      messages,
      open,
      overlayPositioning,
      placement,
      scale,
      setPosition,
      setSize,
      widthScale,
    } = this;
    const text = this.getLabel();

    const isDisabled = disabled || !setPosition || !setSize;

    return (
      <InteractiveContainer disabled={disabled}>
        <calcite-dropdown
          class={CSS.dropdown}
          disabled={isDisabled}
          flipPlacements={flipPlacements}
          onCalciteDropdownClose={this.handleClose}
          onCalciteDropdownOpen={this.handleOpen}
          open={open}
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
            disabled={isDisabled}
            icon={ICONS.drag}
            label={text}
            scale="s"
            slot="trigger"
            text={text}
            title={text}
          />
          <calcite-dropdown-group groupTitle={messages.reorder} scale={scale} selectionMode="none">
            {this.renderTop()}
            {this.renderUp()}
            {this.renderDown()}
            {this.renderBottom()}
          </calcite-dropdown-group>
          {this.renderMoveToGroup()}
        </calcite-dropdown>
      </InteractiveContainer>
    );
  }

  private renderMoveToItem(moveToItem: MoveToItem): VNode {
    return (
      <calcite-dropdown-item
        data-value={moveToItem.value}
        key={moveToItem.value}
        label={moveToItem.label}
        onCalciteDropdownItemSelect={this.handleMoveTo}
      >
        {moveToItem.label}
      </calcite-dropdown-item>
    );
  }

  private renderMoveToGroup(): VNode {
    const { messages, moveToItems, scale } = this;

    return moveToItems?.length ? (
      <calcite-dropdown-group groupTitle={messages.moveTo} scale={scale} selectionMode="none">
        {moveToItems.map((moveToItem) => this.renderMoveToItem(moveToItem))}
      </calcite-dropdown-group>
    ) : null;
  }

  private renderTop(): VNode {
    const { setPosition, messages } = this;

    return setPosition !== 1 && setPosition !== 2 ? (
      <calcite-dropdown-item
        data-value={REORDER_VALUES[0]}
        key={REORDER_VALUES[0]}
        label={messages.moveToTop}
        onCalciteDropdownItemSelect={this.handleReorder}
      >
        {messages.moveToTop}
      </calcite-dropdown-item>
    ) : null;
  }

  private renderUp(): VNode {
    const { setPosition, messages } = this;

    return setPosition !== 1 ? (
      <calcite-dropdown-item
        data-value={REORDER_VALUES[1]}
        key={REORDER_VALUES[1]}
        label={messages.moveUp}
        onCalciteDropdownItemSelect={this.handleReorder}
      >
        {messages.moveUp}
      </calcite-dropdown-item>
    ) : null;
  }

  private renderDown(): VNode {
    const { setPosition, setSize, messages } = this;

    return setPosition !== setSize ? (
      <calcite-dropdown-item
        data-value={REORDER_VALUES[2]}
        key={REORDER_VALUES[2]}
        label={messages.moveDown}
        onCalciteDropdownItemSelect={this.handleReorder}
      >
        {messages.moveDown}
      </calcite-dropdown-item>
    ) : null;
  }

  private renderBottom(): VNode {
    const { setPosition, setSize, messages } = this;

    return setPosition !== setSize && setPosition !== setSize - 1 ? (
      <calcite-dropdown-item
        data-value={REORDER_VALUES[3]}
        key={REORDER_VALUES[3]}
        label={messages.moveToBottom}
        onCalciteDropdownItemSelect={this.handleReorder}
      >
        {messages.moveToBottom}
      </calcite-dropdown-item>
    ) : null;
  }
}
