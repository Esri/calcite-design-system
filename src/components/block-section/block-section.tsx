import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  VNode,
  Watch
} from "@stencil/core";

import { getElementDir, toAriaBoolean } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { isActivationKey } from "../../utils/key";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { Status } from "../interfaces";
import { BlockSectionMessages } from "./assets/block-section/t9n";
import { BlockSectionToggleDisplay } from "./interfaces";
import { CSS, ICONS } from "./resources";

/**
 * @slot - A slot for adding custom content.
 */
@Component({
  tag: "calcite-block-section",
  styleUrl: "block-section.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class BlockSection implements LocalizedComponent, T9nComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, expands the component and its contents.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  /**
   * Displays a status-related indicator icon.
   */
  @Prop({ reflect: true }) status: Status;

  /**
   * The component header text.
   */
  @Prop() text: string;

  /**
   * Specifies the component's toggle display -
   *
   * `"button"` (selectable header), or
   *
   * `"switch"` (toggle switch).
   */
  @Prop({ reflect: true }) toggleDisplay: BlockSectionToggleDisplay = "button";

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) messages: BlockSectionMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop({ mutable: true }) messageOverrides: Partial<BlockSectionMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteBlockSectionElement;

  private guid = guid();

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
   * Emits when the header has been clicked.
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

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
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
      [CSS.invalid]: status == "invalid"
    };

    return !!statusIcon ? (
      <calcite-icon class={statusIconClasses} icon={statusIcon} scale="s" />
    ) : null;
  }

  render(): VNode {
    const { el, messages, open, text, toggleDisplay } = this;
    const dir = getElementDir(el);
    const arrowIcon = open
      ? ICONS.menuOpen
      : dir === "rtl"
      ? ICONS.menuClosedLeft
      : ICONS.menuClosedRight;

    const toggleLabel = open ? messages.collapse : messages.expand;

    const { guid } = this;
    const regionId = `${guid}-region`;
    const buttonId = `${guid}-button`;

    const headerNode =
      toggleDisplay === "switch" ? (
        <div
          aria-controls={regionId}
          aria-label={toggleLabel}
          class={{
            [CSS.toggle]: true,
            [CSS.toggleSwitch]: true
          }}
          id={buttonId}
          onClick={this.toggleSection}
          onKeyDown={this.handleHeaderKeyDown}
          tabIndex={0}
          title={toggleLabel}
        >
          <div class={CSS.toggleSwitchContent}>
            <span class={CSS.toggleSwitchText}>{text}</span>
          </div>
          <calcite-switch checked={open} label={toggleLabel} scale="s" tabIndex={-1} />
          {this.renderStatusIcon()}
        </div>
      ) : (
        <button
          aria-controls={regionId}
          aria-label={toggleLabel}
          class={{
            [CSS.sectionHeader]: true,
            [CSS.toggle]: true
          }}
          id={buttonId}
          name={toggleLabel}
          onClick={this.toggleSection}
        >
          <calcite-icon icon={arrowIcon} scale="s" />
          <span class={CSS.sectionHeaderText}>{text}</span>
          {this.renderStatusIcon()}
        </button>
      );

    return (
      <Host>
        {headerNode}
        <section
          aria-expanded={toAriaBoolean(open)}
          aria-labelledby={buttonId}
          class={CSS.content}
          hidden={!open}
          id={regionId}
        >
          <slot />
        </section>
      </Host>
    );
  }
}
