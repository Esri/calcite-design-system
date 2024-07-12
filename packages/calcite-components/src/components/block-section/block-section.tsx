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
import { focusFirstTabbable, toAriaBoolean } from "../../utils/dom";
import { isActivationKey } from "../../utils/key";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { FlipContext, Status } from "../interfaces";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { IconName } from "../icon/interfaces";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { BlockSectionMessages } from "./assets/block-section/t9n";
import { BlockSectionToggleDisplay } from "./interfaces";
import { CSS, ICONS, IDS } from "./resources";

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-block-section",
  styleUrl: "block-section.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class BlockSection
  implements LocalizedComponent, T9nComponent, LoadableComponent, OpenCloseComponent
{
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: IconName;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: IconName;

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
   *
   * @deprecated Use `icon-start` instead.
   */
  @Prop({ reflect: true }) status: Status;

  /**
   * The component header text.
   */
  @Prop() text: string;

  /**
   * Specifies how the component's toggle is displayed, where:
   *
   * `"button"` sets the toggle to a selectable header, and
   *
   * `"switch"` sets the toggle to a switch.
   */
  @Prop({ reflect: true }) toggleDisplay: BlockSectionToggleDisplay = "button";

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: BlockSectionMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<BlockSectionMessages>;

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
    this.calciteBlockSectionBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteBlockSectionOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteBlockSectionBeforeClose.emit();
  }

  onClose(): void {
    this.calciteBlockSectionClose.emit();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteBlockSectionElement;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: BlockSectionMessages;

  openTransitionProp = "opacity";

  transitionEl: HTMLDivElement;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the header has been clicked.
   */
  @Event({ cancelable: false }) calciteBlockSectionToggle: EventEmitter<void>;

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  @Event({ cancelable: false }) calciteBlockSectionBeforeClose: EventEmitter<void>;

  /** Fires when the component is closed and animation is complete. */
  @Event({ cancelable: false }) calciteBlockSectionClose: EventEmitter<void>;

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  @Event({ cancelable: false }) calciteBlockSectionBeforeOpen: EventEmitter<void>;

  /** Fires when the component is open and animation is complete. */
  @Event({ cancelable: false }) calciteBlockSectionOpen: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleHeaderKeyDown = (event: KeyboardEvent): void => {
    if (isActivationKey(event.key)) {
      this.toggleSection();
      event.preventDefault();
      event.stopPropagation();
    }
  };

  toggleSection = (): void => {
    this.open = !this.open;
    this.calciteBlockSectionToggle.emit();
  };

  private setTransitionEl = (el: HTMLDivElement): void => {
    this.transitionEl = el;
  };

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    if (this.open) {
      onToggleOpenCloseComponent(this);
    }
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderStatusIcon(): VNode[] {
    const { status } = this;
    const statusIcon = ICONS[status] ?? false;
    const statusIconClasses = {
      [CSS.statusIcon]: true,
      [CSS.valid]: status == "valid",
      [CSS.invalid]: status == "invalid",
    };

    return statusIcon ? (
      <calcite-icon class={statusIconClasses} icon={statusIcon} scale="s" />
    ) : null;
  }

  renderIcon(icon: string): VNode {
    const { iconFlipRtl } = this;

    if (icon === undefined) {
      return null;
    }

    const flipRtlStart = iconFlipRtl === "both" || iconFlipRtl === "start";
    const flipRtlEnd = iconFlipRtl === "both" || iconFlipRtl === "end";

    const isIconStart = icon === this.iconStart;

    /** Icon scale is not variable as the component does not have a scale property */
    return (
      <calcite-icon
        class={isIconStart ? CSS.iconStart : CSS.iconEnd}
        flipRtl={isIconStart ? flipRtlStart : flipRtlEnd}
        icon={isIconStart ? this.iconStart : this.iconEnd}
        key={isIconStart ? this.iconStart : this.iconEnd}
        scale="s"
      />
    );
  }

  render(): VNode {
    const { messages, open, text, toggleDisplay } = this;
    const arrowIcon = open ? ICONS.menuOpen : ICONS.menuClosed;

    const toggleLabel = open ? messages.collapse : messages.expand;

    const headerNode =
      toggleDisplay === "switch" ? (
        <div
          class={{
            [CSS.toggleContainer]: true,
          }}
        >
          <div
            aria-controls={IDS.content}
            aria-expanded={toAriaBoolean(open)}
            class={{
              [CSS.toggle]: true,
              [CSS.toggleSwitch]: true,
            }}
            id={IDS.toggle}
            onClick={this.toggleSection}
            onKeyDown={this.handleHeaderKeyDown}
            role="button"
            tabIndex={0}
            title={toggleLabel}
          >
            {this.renderIcon(this.iconStart)}
            <div class={CSS.toggleSwitchContent}>
              <span class={CSS.toggleSwitchText}>{text}</span>
            </div>

            {this.renderIcon(this.iconEnd)}
            {this.renderStatusIcon()}
            <calcite-switch checked={open} class={CSS.switch} inert label={toggleLabel} scale="s" />
          </div>
        </div>
      ) : (
        <div
          class={{
            [CSS.toggleContainer]: true,
          }}
        >
          <button
            aria-controls={IDS.content}
            aria-expanded={toAriaBoolean(open)}
            class={{
              [CSS.sectionHeader]: true,
              [CSS.toggle]: true,
            }}
            id={IDS.toggle}
            onClick={this.toggleSection}
          >
            {this.renderIcon(this.iconStart)}
            <span class={CSS.sectionHeaderText}>{text}</span>
            {this.renderIcon(this.iconEnd)}
            {this.renderStatusIcon()}
            <calcite-icon class={CSS.chevronIcon} icon={arrowIcon} scale="s" />
          </button>
        </div>
      );

    return (
      <Host>
        {headerNode}
        <section
          aria-labelledby={IDS.toggle}
          class={CSS.content}
          hidden={!open}
          id={IDS.content}
          ref={this.setTransitionEl}
        >
          <slot />
        </section>
      </Host>
    );
  }
}
