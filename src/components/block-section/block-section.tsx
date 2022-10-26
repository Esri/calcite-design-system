import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h,
  VNode,
  Host,
  Watch,
  State
} from "@stencil/core";

import { getElementDir, toAriaBoolean } from "../../utils/dom";
import { CSS, ICONS } from "./resources";
import { BlockSectionToggleDisplay } from "./interfaces";
import { Status } from "../interfaces";
import { guid } from "../../utils/guid";
import { isActivationKey } from "../../utils/key";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { Messages } from "./assets/block-section/t9n";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";

/**
 * @slot - A slot for adding content to the block section.
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
   * Tooltip used for the toggle when expanded.
   *
   * @deprecated - translations are now built-in, if you need to override a string, please use `messageOverrides`
   */
  @Prop() intlCollapse?: string;

  /**
   * Tooltip used for the toggle when collapsed.
   *
   * @deprecated - translations are now built-in, if you need to override a string, please use `messageOverrides`
   */
  @Prop() intlExpand?: string;

  /**
   * When true, the block's section content will be displayed.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  /**
   * BlockSection status. Adds indicator to show valid or invalid status.
   */
  @Prop({ reflect: true }) status?: Status;

  /**
   * Text displayed in the button.
   */
  @Prop() text: string;

  /**
   * This property determines the look of the section toggle.
   * If the value is "switch", a toggle-switch will be displayed.
   * If the value is "button", a clickable header is displayed.
   */
  @Prop({ reflect: true }) toggleDisplay: BlockSectionToggleDisplay = "button";

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  @Prop({ mutable: true }) messages: Messages;

  /**
   * Use this property to override individual strings used by the component.
   */
  @Prop({ mutable: true }) messageOverrides: Partial<Messages>;

  @Watch("intlCollapse")
  @Watch("intlExpand")
  @Watch("defaultMessages")
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

  @State() defaultMessages: Messages;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the header has been clicked.
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
