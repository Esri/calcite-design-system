import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
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
import {
  focusFirstTabbable,
  getSlotted,
  toAriaBoolean,
  slotChangeHasAssignedElement,
} from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { Heading, HeadingLevel } from "../functional/Heading";
import { Status, Position } from "../interfaces";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { FlipPlacement, LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
import { FlipContext } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { CSS, defaultMenuPlacement, ICONS, IDS, SLOTS } from "./resources";
import { BlockMessages } from "./assets/block/t9n";

/**
 * @slot - A slot for adding custom content.
 * @slot actions-end - A slot for adding actionable `calcite-action` elements after the content of the component. It is recommended to use two or fewer actions.
 * @slot icon - [Deprecated] A slot for adding a leading header icon with `calcite-icon`. Use `icon-start` instead.
 * @slot content-start - A slot for adding non-actionable elements before content of the component.
 * @slot control - [Deprecated] A slot for adding a single HTML input element in a header. Use `actions-end` instead.
 * @slot header-menu-actions - A slot for adding an overflow menu with `calcite-action`s inside a dropdown menu.
 */
@Component({
  tag: "calcite-block",
  styleUrl: "block.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Block
  implements
    ConditionalSlotComponent,
    InteractiveComponent,
    LocalizedComponent,
    T9nComponent,
    LoadableComponent,
    OpenCloseComponent
{
  // --------------------------------------------------------------------------
  //
  //  Public Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, the component is collapsible.
   */
  @Prop({ reflect: true }) collapsible = false;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When `true`, displays a drag handle in the header.
   */
  @Prop({ reflect: true }) dragHandle = false;

  /**
   * Specifies the component's fallback menu `placement` when it's initial or specified `placement` has insufficient space available.
   */
  @Prop() flipPlacements: FlipPlacement[];

  /**
   * The component header text.
   */
  @Prop() heading!: string;

  /**
   * Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: IconNameOrString;

  /**
   * When `true`, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * When `true`, expands the component and its contents.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(): void {
    onToggleOpenCloseComponent(this);
  }

  /**
   * Determines where the action menu will be positioned.
   */
  @Prop({ reflect: true }) placement: LogicalPlacement = defaultMenuPlacement;

  /**
   * Displays a status-related indicator icon.
   *
   * @deprecated Use `icon-start` instead.
   */
  @Prop({ reflect: true }) status: Status;

  /**
   * A description for the component, which displays below the heading.
   */
  @Prop() description: string;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: BlockMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<BlockMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Sets focus on the component's first tabbable element.
   *
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }

  onBeforeOpen(): void {
    this.calciteBlockBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteBlockOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteBlockBeforeClose.emit();
  }

  onClose(): void {
    this.calciteBlockClose.emit();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteBlockElement;

  @State() defaultMessages: BlockMessages;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() hasContentStart = false;

  @State() hasEndActions = false;

  openTransitionProp = "margin-top";

  transitionEl: HTMLElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
    connectLocalized(this);
    connectMessages(this);

    this.transitionEl = this.el;
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
    disconnectConditionalSlotComponent(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    setUpLoadableComponent(this);

    if (this.open) {
      onToggleOpenCloseComponent(this);
    }
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteBlockBeforeClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteBlockBeforeOpen: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteBlockClose: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteBlockOpen: EventEmitter<void>;

  /**
   * Fires when the component's header is clicked.
   *
   * @deprecated Use `openClose` events such as `calciteBlockOpen`, `calciteBlockClose`, `calciteBlockBeforeOpen`, and `calciteBlockBeforeClose` instead.
   */
  @Event({ cancelable: false }) calciteBlockToggle: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  onHeaderClick = (): void => {
    this.open = !this.open;
    this.calciteBlockToggle.emit();
  };

  private actionsEndSlotChangeHandler = (event: Event): void => {
    this.hasEndActions = slotChangeHasAssignedElement(event);
  };

  private handleContentStartSlotChange = (event: Event): void => {
    this.hasContentStart = slotChangeHasAssignedElement(event);
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderScrim(): VNode[] {
    const { loading } = this;
    const defaultSlot = <slot />;

    return [loading ? <calcite-scrim loading={loading} /> : null, defaultSlot];
  }

  private renderLoaderStatusIcon(): VNode[] {
    const { loading, messages, status } = this;

    const hasSlottedIcon = !!getSlotted(this.el, SLOTS.icon);

    return loading ? (
      <div class={CSS.icon} key="loader">
        <calcite-loader inline label={messages.loading} />
      </div>
    ) : status ? (
      <div class={CSS.icon} key="status-icon">
        <calcite-icon
          class={{
            [CSS.statusIcon]: true,
            [CSS.valid]: status == "valid",
            [CSS.invalid]: status == "invalid",
          }}
          icon={ICONS[status]}
          scale="s"
        />
      </div>
    ) : hasSlottedIcon ? (
      <div class={CSS.icon} key="icon-slot">
        <slot key="icon-slot" name={SLOTS.icon} />
      </div>
    ) : null;
  }

  private renderActionsEnd(): VNode {
    return (
      <div class={CSS.actionsEnd}>
        <slot name={SLOTS.actionsEnd} onSlotchange={this.actionsEndSlotChangeHandler} />
      </div>
    );
  }

  private renderContentStart(): VNode {
    const { hasContentStart } = this;
    return (
      <div class={CSS.contentStart} hidden={!hasContentStart}>
        <slot name={SLOTS.contentStart} onSlotchange={this.handleContentStartSlotChange} />
      </div>
    );
  }

  renderTitle(): VNode {
    const { heading, headingLevel, description } = this;
    return heading || description ? (
      <div class={CSS.title}>
        <Heading class={CSS.heading} level={headingLevel}>
          {heading}
        </Heading>
        {description ? <div class={CSS.description}>{description}</div> : null}
      </div>
    ) : null;
  }

  private renderIcon(position: Extract<"start" | "end", Position>): VNode {
    const { iconFlipRtl } = this;

    const flipRtl =
      iconFlipRtl === "both" || position === "start"
        ? iconFlipRtl === "start"
        : iconFlipRtl === "end";

    const iconValue = position === "start" ? this.iconStart : this.iconEnd;
    const iconClass = position === "start" ? CSS.iconStart : CSS.iconEnd;

    if (!iconValue) {
      return undefined;
    }

    /** Icon scale is not variable as the component does not have a scale property */
    return (
      <calcite-icon
        class={iconClass}
        flipRtl={flipRtl}
        icon={iconValue}
        key={iconValue}
        scale="s"
      />
    );
  }

  render(): VNode {
    const {
      collapsible,
      el,
      loading,
      open,
      heading,
      messages,
      description,
      flipPlacements,
      placement,
    } = this;

    const toggleLabel = open ? messages.collapse : messages.expand;

    const headerContent = (
      <header
        class={{ [CSS.header]: true, [CSS.headerHasText]: !!(heading || description) }}
        id={IDS.header}
      >
        {this.renderIcon("start")}
        {this.renderContentStart()}
        {this.renderLoaderStatusIcon()}
        {this.renderTitle()}
      </header>
    );

    const hasControl = !!getSlotted(el, SLOTS.control);
    const hasMenuActions = !!getSlotted(el, SLOTS.headerMenuActions);
    const collapseIcon = open ? ICONS.opened : ICONS.closed;

    const headerNode = (
      <div class={CSS.headerContainer}>
        {this.dragHandle ? <calcite-handle label={heading} /> : null}
        {collapsible ? (
          <button
            aria-controls={IDS.content}
            aria-describedby={IDS.header}
            aria-expanded={collapsible ? toAriaBoolean(open) : null}
            class={CSS.toggle}
            id={IDS.toggle}
            onClick={this.onHeaderClick}
            title={toggleLabel}
          >
            {headerContent}
            <div class={CSS.iconEndContainer}>
              {this.renderIcon("end")}
              <calcite-icon class={CSS.toggleIcon} icon={collapseIcon} scale="s" />
            </div>
          </button>
        ) : this.iconEnd ? (
          <div>
            {headerContent}
            <div class={CSS.iconEndContainer}>{this.renderIcon("end")}</div>
          </div>
        ) : (
          headerContent
        )}
        {hasControl ? (
          <div aria-labelledby={IDS.header} class={CSS.controlContainer}>
            <slot name={SLOTS.control} />
          </div>
        ) : null}
        {hasMenuActions ? (
          <calcite-action-menu
            flipPlacements={flipPlacements ?? ["top", "bottom"]}
            label={messages.options}
            overlayPositioning={this.overlayPositioning}
            placement={placement}
          >
            <slot name={SLOTS.headerMenuActions} />
          </calcite-action-menu>
        ) : null}
        {this.renderActionsEnd()}
      </div>
    );

    return (
      <Host>
        <InteractiveContainer disabled={this.disabled}>
          <article
            aria-busy={toAriaBoolean(loading)}
            class={{
              [CSS.container]: true,
            }}
          >
            {headerNode}
            <section
              aria-labelledby={IDS.toggle}
              class={CSS.content}
              hidden={!open}
              id={IDS.content}
            >
              {this.renderScrim()}
            </section>
          </article>
        </InteractiveContainer>
      </Host>
    );
  }
}
