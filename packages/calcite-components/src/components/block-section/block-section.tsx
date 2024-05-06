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
import { FlipContext } from "../interfaces";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { Status } from "../interfaces";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
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
export class BlockSection implements LocalizedComponent, T9nComponent, LoadableComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: string;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: string;

  /**
   * When `true`, expands the component and its contents.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

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

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the header has been clicked.
   */
  @Event({ cancelable: false }) calciteBlockSectionToggle: EventEmitter<void>;

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

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
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

    return !!statusIcon ? (
      <calcite-icon class={statusIconClasses} icon={statusIcon} scale="s" />
    ) : null;
  }

  renderIcon(icon: string): VNode {
    const { iconFlipRtl } = this;

    const flipRtlStart = iconFlipRtl === "both" || iconFlipRtl === "start";
    const flipRtlEnd = iconFlipRtl === "both" || iconFlipRtl === "end";

    const isIconStart = icon === this.iconStart;

    /** Icon scale is not variable as the component does not have a scale property */
    return (
      <calcite-icon
        class={isIconStart ? this.iconStart : this.iconEnd}
        flipRtl={isIconStart ? flipRtlStart : flipRtlEnd}
        icon={isIconStart ? this.iconStart : this.iconEnd}
        key={isIconStart ? CSS.iconStart : CSS.iconEnd}
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
            {/* we use calcite-label to use a simple component that will allow us to prevent keyboard focus by setting tabindex="-1" on the host */}
            <calcite-label class="label" layout="inline" tabIndex={-1}>
              <calcite-switch checked={open} class={CSS.switch} label={toggleLabel} scale="s" />
            </calcite-label>
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
        <section aria-labelledby={IDS.toggle} class={CSS.content} hidden={!open} id={IDS.content}>
          <slot />
        </section>
      </Host>
    );
  }
}
