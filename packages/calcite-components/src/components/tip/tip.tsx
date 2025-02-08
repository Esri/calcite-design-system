import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { constrainHeadingLevel, Heading, HeadingLevel } from "../functional/Heading";
import { logger } from "../../utils/logger";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { TipMessages } from "./assets/tip/t9n";
import { CSS, ICONS, SLOTS } from "./resources";

logger.deprecated("component", {
  name: "tip",
  removalVersion: 4,
  suggested: ["card", "notice", "panel", "tile"],
});

/**
 * @deprecated Use the `calcite-card`, `calcite-notice`, `calcite-panel`, or `calcite-tile` component instead.
 * @slot - A slot for adding text and a hyperlink.
 * @slot thumbnail - A slot for adding an HTML image element.
 */
@Component({
  tag: "calcite-tip",
  styleUrl: "tip.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Tip implements LocalizedComponent, T9nComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------
  /**
   * When `true`, the component does not display.
   */
  @Prop({ reflect: true, mutable: true }) closed = false;

  /**
   * When `true`, the close button is not present on the component.
   */
  @Prop({ reflect: true }) closeDisabled = false;

  /**
   * The component header text.
   */
  @Prop() heading: string;

  /**
   * Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /**
   * When `true`, the component is selected if it has a parent `calcite-tip-manager`.
   *
   * Only one tip can be selected within the `calcite-tip-manager` parent.
   */
  @Prop({ reflect: true }) selected = false;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: TipMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<TipMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteTipElement;

  @State() defaultMessages: TipMessages;

  @State() hasThumbnail = false;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

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
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits when the component has been closed.
   */
  @Event({ cancelable: false }) calciteTipDismiss: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  hideTip = (): void => {
    this.closed = true;

    this.calciteTipDismiss.emit();
  };

  private handleThumbnailSlotChange = (event: Event): void => {
    this.hasThumbnail = slotChangeHasAssignedElement(event);
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderHeader(): VNode {
    const { heading, headingLevel, el } = this;
    const parentLevel = el.closest("calcite-tip-manager")?.headingLevel;
    const relativeLevel = parentLevel ? constrainHeadingLevel(parentLevel + 1) : null;
    const level = headingLevel || relativeLevel;

    return heading ? (
      <header class={CSS.header}>
        <Heading class={CSS.heading} level={level}>
          {heading}
        </Heading>
      </header>
    ) : null;
  }

  renderDismissButton(): VNode {
    const { closeDisabled, hideTip } = this;
    return !closeDisabled ? (
      <calcite-action
        class={CSS.close}
        icon={ICONS.close}
        onClick={hideTip}
        scale="l"
        text={this.messages.close}
      />
    ) : null;
  }

  renderImageFrame(): VNode {
    return (
      <div class={CSS.imageFrame} hidden={!this.hasThumbnail} key="thumbnail">
        <slot name={SLOTS.thumbnail} onSlotchange={this.handleThumbnailSlotChange} />
      </div>
    );
  }

  renderInfoNode(): VNode {
    return (
      <div class={{ [CSS.info]: true, [CSS.infoNoThumbnail]: !this.hasThumbnail }}>
        <slot />
      </div>
    );
  }

  renderContent(): VNode {
    return (
      <div class={CSS.content}>
        {this.renderImageFrame()}
        {this.renderInfoNode()}
      </div>
    );
  }

  render(): VNode {
    return (
      <Fragment>
        <article class={CSS.container}>
          {this.renderHeader()}
          {this.renderContent()}
        </article>
        {this.renderDismissButton()}
      </Fragment>
    );
  }
}
