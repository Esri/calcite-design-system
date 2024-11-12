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
import {
  FlipPlacement,
  MenuPlacement,
  OverlayPositioning,
  defaultMenuPlacement,
} from "../../utils/floating-ui";
import { SortHandleMessages } from "./assets/sort-handle/t9n";
import { CSS, ICONS, REORDER_VALUES, SUBSTITUTIONS } from "./resources";
import { MoveEventDetail, MoveTo, Reorder, ReorderEventDetail } from "./interfaces";

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
  @Prop() moveToItems: MoveTo[];

  /**
   * When `true`, displays and positions the component.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(): void {
    if (this.disabled) {
      this.open = false;
      return;
    }

    // we set the property instead of the attribute to ensure dropdown's open/close events are emitted properly
    this.dropdownEl.open = this.open;
  }

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

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteSortHandleBeforeClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteSortHandleBeforeOpen: EventEmitter<void>;

  /**
   * Fires when a reorder has been selected.
   */
  @Event({ cancelable: false }) calciteSortHandleReorder: EventEmitter<ReorderEventDetail>;

  /**
   * Fires when a move item has been selected.
   */
  @Event({ cancelable: false }) calciteSortHandleMove: EventEmitter<MoveEventDetail>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteSortHandleClose: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteSortHandleOpen: EventEmitter<void>;

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
    this.openHandler();
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

  private handleBeforeOpen = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.calciteSortHandleBeforeOpen.emit();
  };

  private handleOpen = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.calciteSortHandleOpen.emit();
    this.open = true;
  };

  private handleBeforeClose = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.calciteSortHandleBeforeClose.emit();
  };

  private handleClose = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.calciteSortHandleClose.emit();
    this.open = false;
  };

  private handleReorder = (event: Event): void => {
    this.calciteSortHandleReorder.emit({
      reorder: (event.target as HTMLElement).dataset.value as Reorder,
    });
  };

  private handleMoveTo = (event: Event): void => {
    const id = (event.target as HTMLElement).dataset.id;
    const moveTo = this.moveToItems.find((item) => item.id === id);
    this.calciteSortHandleMove.emit({ moveTo });
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
          onCalciteDropdownBeforeClose={this.handleBeforeClose}
          onCalciteDropdownBeforeOpen={this.handleBeforeOpen}
          onCalciteDropdownClose={this.handleClose}
          onCalciteDropdownOpen={this.handleOpen}
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
            icon={disabled ? ICONS.blank : ICONS.drag}
            label={text}
            scale="s"
            slot="trigger"
            text={text}
            title={text}
          />
          <calcite-dropdown-group
            groupTitle={messages.reorder}
            key="reorder"
            scale={scale}
            selectionMode="none"
          >
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

  private renderMoveToItem(moveToItem: MoveTo): VNode {
    return (
      <calcite-dropdown-item
        data-id={moveToItem.id}
        key={moveToItem.id}
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
      <calcite-dropdown-group
        groupTitle={messages.moveTo}
        key="move-to-items"
        scale={scale}
        selectionMode="none"
      >
        {moveToItems.map((moveToItem) => this.renderMoveToItem(moveToItem))}
      </calcite-dropdown-group>
    ) : null;
  }

  private renderDropdownItem(positionIndex: number, label: string): VNode {
    return (
      <calcite-dropdown-item
        data-value={REORDER_VALUES[positionIndex]}
        key={REORDER_VALUES[positionIndex]}
        label={label}
        onCalciteDropdownItemSelect={this.handleReorder}
      >
        {label}
      </calcite-dropdown-item>
    );
  }

  private renderTop(): VNode | null {
    const { setPosition } = this;

    return setPosition !== 1 && setPosition !== 2
      ? this.renderDropdownItem(0, this.messages.moveToTop)
      : null;
  }

  private renderUp(): VNode | null {
    return this.setPosition !== 1 ? this.renderDropdownItem(1, this.messages.moveUp) : null;
  }

  private renderDown(): VNode | null {
    return this.setPosition !== this.setSize
      ? this.renderDropdownItem(2, this.messages.moveDown)
      : null;
  }

  private renderBottom(): VNode | null {
    const { setPosition, setSize } = this;

    return setPosition !== setSize && setPosition !== setSize - 1
      ? this.renderDropdownItem(3, this.messages.moveToBottom)
      : null;
  }
}
