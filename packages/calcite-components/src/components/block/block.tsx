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
import { focusFirstTabbable, getSlotted, toAriaBoolean } from "../../utils/dom";
import {
  connectInteractive,
  disconnectInteractive,
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
import { Status } from "../interfaces";
import { BlockMessages } from "./assets/block/t9n";
import { CSS, ICONS, IDS, SLOTS } from "./resources";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";

/**
 * @slot - A slot for adding custom content.
 * @slot icon - A slot for adding a leading header icon with `calcite-icon`.
 * @slot control - A slot for adding a single HTML input element in a header.
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
   * The component header text.
   */
  @Prop() heading!: string;

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

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
   * Displays a status-related indicator icon.
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

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: BlockMessages;

  openTransitionProp = "opacity";

  transitionEl: HTMLElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
    connectInteractive(this);
    connectLocalized(this);
    connectMessages(this);
  }

  disconnectedCallback(): void {
    disconnectInteractive(this);
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

  private setTransitionEl = (el: HTMLElement): void => {
    this.transitionEl = el;
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

  renderIcon(): VNode[] {
    const { loading, messages, status } = this;

    const hasSlottedIcon = !!getSlotted(this.el, SLOTS.icon);

    return loading ? (
      <div class={CSS.icon} key="loader">
        <calcite-loader inline label={messages.loading} />
      </div>
    ) : !!status ? (
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

  render(): VNode {
    const { collapsible, el, loading, open, heading, messages } = this;

    const toggleLabel = open ? messages.collapse : messages.expand;

    const headerContent = (
      <header class={CSS.header} id={IDS.header}>
        {this.renderIcon()}
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
            <calcite-icon aria-hidden="true" class={CSS.toggleIcon} icon={collapseIcon} scale="s" />
          </button>
        ) : (
          headerContent
        )}
        {hasControl ? (
          <div class={CSS.controlContainer}>
            <slot name={SLOTS.control} />
          </div>
        ) : null}
        {hasMenuActions ? (
          <calcite-action-menu label={messages.options}>
            <slot name={SLOTS.headerMenuActions} />
          </calcite-action-menu>
        ) : null}
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
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={this.setTransitionEl}
            >
              {this.renderScrim()}
            </section>
          </article>
        </InteractiveContainer>
      </Host>
    );
  }
}
