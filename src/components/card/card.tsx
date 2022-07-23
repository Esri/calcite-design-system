import { Component, Element, Event, EventEmitter, h, Prop, VNode } from "@stencil/core";
import { getSlotted, toAriaBoolean } from "../../utils/dom";
import { CSS, SLOTS, TEXT } from "./resources";
import { LogicalFlowPosition } from "../interfaces";
import {
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent,
  ConditionalSlotComponent
} from "../../utils/conditionalSlot";

/**
 * Cards do not include a grid or bounding container
 * - cards will expand to fit the width of their container
 */

/**
 * @slot - A slot for adding subheader/description content.
 * @slot thumbnail - A slot for adding a thumbnail to the card.
 * @slot title - A slot for adding a card title.
 * @slot subtitle - A slot for adding a card subtitle or short summary.
 * @slot footer-leading - A slot for adding a leading footer.
 * @slot footer-trailing - A slot for adding a trailing footer.
 */

@Component({
  tag: "calcite-card",
  styleUrl: "card.scss",
  shadow: true
})
export class Card implements ConditionalSlotComponent {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteCardElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**  When true, the cards content is waiting to be loaded. This state shows a busy indicator.*/
  @Prop({ reflect: true }) loading = false;

  /** Indicates whether the card is selected. */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /** Indicates whether the card is selectable. */
  @Prop({ reflect: true }) selectable = false;

  /**
   * string to override English loading text
   *
   * @default "Loading"
   */
  @Prop() intlLoading?: string = TEXT.loading;

  /**
   * string to override English select text for checkbox when selectable is true
   *
   * @default "Select"
   */
  @Prop({ reflect: false }) intlSelect: string = TEXT.select;

  /**
   * string to override English deselect text for checkbox when selectable is true
   *
   * @default "Deselect"
   */
  @Prop({ reflect: false }) intlDeselect: string = TEXT.deselect;

  @Prop() thumbnailPosition: LogicalFlowPosition = "block-start";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fired when a selectable card is selected */
  @Event() calciteCardSelect: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectConditionalSlotComponent(this);
  }

  disonnectedCallback(): void {
    disconnectConditionalSlotComponent(this);
  }

  render(): VNode {
    const thumbnailInline = this.thumbnailPosition.startsWith("inline");
    const thumbnailStart = this.thumbnailPosition.endsWith("start");
    return (
      <div class={{ "calcite-card-container": true, inline: thumbnailInline }}>
        {this.loading ? (
          <div class="calcite-card-loader-container">
            <calcite-loader active label={this.intlLoading} />
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
    const checkboxLabel = this.selected ? this.intlDeselect : this.intlSelect;

    return (
      <calcite-label
        class={CSS.checkboxWrapper}
        onClick={this.cardSelectClick}
        onKeyDown={this.cardSelectKeyDown}
      >
        <calcite-checkbox checked={this.selected} label={checkboxLabel} />
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
    const leadingFooter = getSlotted(el, SLOTS.footerLeading);
    const trailingFooter = getSlotted(el, SLOTS.footerTrailing);

    const hasFooter = leadingFooter || trailingFooter;
    return hasFooter ? (
      <footer class={CSS.footer}>
        <slot name={SLOTS.footerLeading} />
        <slot name={SLOTS.footerTrailing} />
      </footer>
    ) : null;
  }
}
