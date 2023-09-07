import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
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
import { getSlotted, toAriaBoolean } from "../../utils/dom";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { LogicalFlowPosition } from "../interfaces";
import { CardMessages } from "./assets/card/t9n";
import { CSS, SLOTS } from "./resources";

/**
 * Cards do not include a grid or bounding container
 * - cards will expand to fit the width of their container
 */

/**
 * @slot - A slot for adding subheader/description content.
 * @slot thumbnail - A slot for adding a thumbnail to the component.
 * @slot title - A slot for adding a title.
 * @slot subtitle - A slot for adding a subtitle or short summary.
 * @slot footer-start - A slot for adding a leading footer.
 * @slot footer-end - A slot for adding a trailing footer.
 */

@Component({
  tag: "calcite-card",
  styleUrl: "card.scss",
  shadow: true,
  assetsDirs: ["assets"],
})
export class Card implements ConditionalSlotComponent, LocalizedComponent, T9nComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**  When `true`, a busy indicator is displayed. */
  @Prop({ reflect: true }) loading = false;

  /** When `true`, the component is selected. */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /** When `true`, the component is selectable. */
  @Prop({ reflect: true }) selectable = false;

  /** Sets the placement of the thumbnail defined in the `thumbnail` slot. */
  @Prop({ reflect: true }) thumbnailPosition: LogicalFlowPosition = "block-start";

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: CardMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<CardMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fires when `selectable` is `true` and the component is selected. */
  @Event({ cancelable: false }) calciteCardSelect: EventEmitter<void>;

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
    disconnectConditionalSlotComponent(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    await setUpMessages(this);
  }

  render(): VNode {
    const thumbnailInline = this.thumbnailPosition.startsWith("inline");
    const thumbnailStart = this.thumbnailPosition.endsWith("start");
    return (
      <div class={{ "calcite-card-container": true, inline: thumbnailInline }}>
        {this.loading ? (
          <div aria-live="polite" class="calcite-card-loader-container">
            <calcite-loader label={this.messages.loading} />
          </div>
        ) : null}
        {thumbnailStart && this.renderThumbnail()}
        <section aria-busy={toAriaBoolean(this.loading)} class={{ [CSS.container]: true }}>
          {this.selectable ? this.renderCheckbox() : null}
          {this.renderHeader()}
          <div class="card-content">
            <slot />
          </div>
          {this.renderFooter()}
        </section>
        {!thumbnailStart && this.renderThumbnail()}
      </div>
    );
  }
  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteCardElement;

  @State() effectiveLocale: string;

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: CardMessages;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private cardSelectClick = (): void => {
    this.selectCard();
  };

  private cardSelectKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case " ":
      case "Enter":
        this.selectCard();
        event.preventDefault();
        break;
    }
  };

  private selectCard() {
    this.selected = !this.selected;
    this.calciteCardSelect.emit();
  }

  private renderThumbnail(): VNode {
    return getSlotted(this.el, SLOTS.thumbnail) ? (
      <section class={CSS.thumbnailWrapper}>
        <slot name={SLOTS.thumbnail} />
      </section>
    ) : null;
  }

  private renderCheckbox(): VNode {
    return (
      <calcite-label
        class={CSS.checkboxWrapper}
        onClick={this.cardSelectClick}
        onKeyDown={this.cardSelectKeyDown}
      >
        <calcite-checkbox checked={this.selected} label={this.messages.select} />
      </calcite-label>
    );
  }

  private renderHeader(): VNode {
    const { el } = this;
    const title = getSlotted(el, SLOTS.title);
    const subtitle = getSlotted(el, SLOTS.subtitle);
    const hasHeader = title || subtitle;

    return hasHeader ? (
      <header class={CSS.header}>
        <slot name={SLOTS.title} />
        <slot name={SLOTS.subtitle} />
      </header>
    ) : null;
  }

  private renderFooter(): VNode {
    const { el } = this;
    const startFooter = getSlotted(el, SLOTS.footerStart);
    const endFooter = getSlotted(el, SLOTS.footerEnd);

    const hasFooter = startFooter || endFooter;
    return hasFooter ? (
      <footer class={CSS.footer}>
        <slot name={SLOTS.footerStart} />
        <slot name={SLOTS.footerEnd} />
      </footer>
    ) : null;
  }
}
