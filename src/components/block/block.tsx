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
import { CSS, HEADING_LEVEL, ICONS, SLOTS, TEXT } from "./resources";
import { getSlotted, toAriaBoolean } from "../../utils/dom";
import { Heading, HeadingLevel } from "../functional/Heading";
import { Status } from "../interfaces";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";
import { guid } from "../../utils/guid";
import { connectMessages, disconnectMessages, setUpMessages, T9nComponent } from "../../utils/t9n";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import { Messages } from "./assets/block/t9n";

/**
 * @slot - A slot for adding content to the block.
 * @slot icon - A slot for adding a leading header icon.
 * @slot control - A slot for adding a single HTML input element in a header.
 * @slot header-menu-actions - a slot for adding an overflow menu with actions inside a dropdown.
 */
@Component({
  tag: "calcite-block",
  styleUrl: "block.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class Block
  implements ConditionalSlotComponent, InteractiveComponent, LocalizedComponent, T9nComponent
{
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, this block will be collapsible.
   */
  @Prop({ reflect: true }) collapsible = false;

  /**
   * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When true, displays a drag handle in the header.
   */
  @Prop({ reflect: true }) dragHandle = false;

  /**
   * Block heading.
   */
  @Prop() heading!: string;

  /**
   * Number at which section headings should start for this component.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /**
   * Aria-label for collapsing the toggle and tooltip used for the toggle when expanded.
   *
   * @default "Collapse"
   * @deprecated - translations are now built-in, if you need to override a string, please use `messageOverrides`
   */
  @Prop() intlCollapse?: string;

  /**
   * Aria-label for expanding the toggle and tooltip used for the toggle when collapsed.
   *
   * @default "Expand"
   * @deprecated - translations are now built-in, if you need to override a string, please use `messageOverrides`
   */
  @Prop() intlExpand?: string;

  /**
   * string to override English loading text
   *
   * @default "Loading"
   * @deprecated - translations are now built-in, if you need to override a string, please use `messageOverrides`
   */
  @Prop() intlLoading?: string;

  /**
   * Text string used for the actions menu
   *
   * @default "Options"
   * @deprecated - translations are now built-in, if you need to override a string, please use `messageOverrides`
   */
  @Prop() intlOptions?: string;

  /**
   * When true, content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * When true, the block's content will be displayed.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  /**
   * Block status. Updates or adds icon to show related icon and color.
   */
  @Prop({ reflect: true }) status?: Status;

  /**
   * Block summary.
   *
   * @deprecated use description instead
   */
  @Prop() summary: string;

  /**Block description */
  @Prop() description: string;

  /**
   * When true, removes padding for the slotted content
   *
   * @deprecated Use `--calcite-block-padding` CSS variable instead.
   */
  @Prop({ reflect: true }) disablePadding = false;

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
  @Watch("intlLoading")
  @Watch("intlOptions")
  @Watch("defaultMessages")
  @Watch("messageOverrides")
  onMessagesChange(): void {
    /** referred in t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteBlockElement;

  private guid = guid();

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    // updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: Messages;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
    connectLocalized(this);
    connectMessages(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
    disconnectConditionalSlotComponent(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emitted when the header has been clicked.
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
    const { el, status } = this;

    const showingLoadingStatus = this.loading && !this.open;

    const statusIcon = showingLoadingStatus ? ICONS.refresh : ICONS[status];

    const hasIcon = getSlotted(el, SLOTS.icon) || statusIcon;

    const iconEl = !statusIcon ? (
      <slot key="icon-slot" name={SLOTS.icon} />
    ) : (
      <calcite-icon
        class={{
          [CSS.statusIcon]: true,
          [CSS.valid]: status == "valid",
          [CSS.invalid]: status == "invalid",
          [CSS.loading]: showingLoadingStatus
        }}
        icon={statusIcon}
        scale="m"
      />
    );

    return hasIcon ? <div class={CSS.icon}>{iconEl}</div> : null;
  }

  renderTitle(): VNode {
    const { heading, headingLevel, summary, description } = this;
    return heading || summary || description ? (
      <div class={CSS.title}>
        <Heading class={CSS.heading} level={headingLevel || HEADING_LEVEL}>
          {heading}
        </Heading>
        {summary || description ? (
          <div class={CSS.description}>{summary || description}</div>
        ) : null}
      </div>
    ) : null;
  }

  render(): VNode {
    const { collapsible, el, loading, open, messages } = this;

    const toggleLabel = open ? messages.collapse : messages.expand;

    const headerContent = (
      <header class={CSS.header}>
        {this.renderIcon()}
        {this.renderTitle()}
      </header>
    );

    const hasControl = !!getSlotted(el, SLOTS.control);
    const hasMenuActions = !!getSlotted(el, SLOTS.headerMenuActions);
    const collapseIcon = open ? ICONS.opened : ICONS.closed;

    const { guid } = this;
    const regionId = `${guid}-region`;
    const buttonId = `${guid}-button`;

    const headerNode = (
      <div class={CSS.headerContainer}>
        {this.dragHandle ? <calcite-handle /> : null}
        {collapsible ? (
          <button
            aria-controls={regionId}
            aria-expanded={collapsible ? toAriaBoolean(open) : null}
            aria-label={toggleLabel}
            class={CSS.toggle}
            id={buttonId}
            onClick={this.onHeaderClick}
            title={toggleLabel}
          >
            {headerContent}
            {!hasControl && !hasMenuActions ? (
              <calcite-icon
                aria-hidden="true"
                class={CSS.toggleIcon}
                icon={collapseIcon}
                scale="s"
              />
            ) : null}
          </button>
        ) : (
          headerContent
        )}
        {loading ? (
          <calcite-loader inline is-active label={messages.loading} />
        ) : hasControl ? (
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
        <article
          aria-busy={toAriaBoolean(loading)}
          class={{
            [CSS.article]: true
          }}
        >
          {headerNode}
          <section
            aria-expanded={toAriaBoolean(open)}
            aria-labelledby={buttonId}
            class={{
              content: true,
              "content--spaced": !this.disablePadding
            }}
            hidden={!open}
            id={regionId}
          >
            {this.renderScrim()}
          </section>
        </article>
      </Host>
    );
  }
}
