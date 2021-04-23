import { Component, Element, Event, EventEmitter, h, Host, Prop, VNode } from "@stencil/core";
import { CSS, SLOTS, TEXT } from "./resources";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { Theme } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";

/**
 * @slot thumbnail - A slot for adding a thumnail to the card.
 * @slot - A slot for adding subheader/description content.
 * @slot title - A slot for adding a card title.
 * @slot subtitle - A slot for adding a card subtitle or short summary.
 * @slot footer-leading - A slot for adding a leading footer.
 * @slot footer-trailing - A slot for adding a trailing footer.
 */

/** Cards do not include a grid or bounding container
 * - cards will expand to fit the width of their container
 */

@Component({
  tag: "calcite-card",
  styleUrl: "calcite-card.scss",
  shadow: true
})
export class CalciteCard {
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

  /**  The theme of the card.*/
  @Prop({ reflect: true }) theme: Theme;

  /** string to override English loading text */
  @Prop() intlLoading?: string = TEXT.loading;

  /** string to override English select text for checkbox when selectable is true */
  @Prop({ reflect: false }) intlSelect: string = TEXT.select;

  /** string to override English deselect text for checkbox when selectable is true */
  @Prop({ reflect: false }) intlDeselect: string = TEXT.deselect;

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

  render(): VNode {
    const dir = getElementDir(this.el);
    return (
      <Host>
        <div class={{ "calcite-card-container": true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
          {this.loading ? (
            <div class="calcite-card-loader-container">
              <calcite-loader active label={this.intlLoading} />
            </div>
          ) : null}
          <section aria-busy={this.loading.toString()} class={{ [CSS.container]: true }}>
            {this.selectable ? this.renderCheckbox() : null}
            {this.renderThumbnail()}
            {this.renderHeader()}
            <div class="card-content">
              <slot />
            </div>
            {this.renderFooter()}
          </section>
        </div>
      </Host>
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

  private cardSelectKeyDown = (e: KeyboardEvent): void => {
    switch (getKey(e.key)) {
      case " ":
      case "Enter":
        this.selectCard();
        e.preventDefault();
        break;
    }
  };

  private selectCard() {
    this.selected = !this.selected;
    this.calciteCardSelect.emit();
  }

  private renderThumbnail(): VNode {
    const hasThumbnail = this.el.querySelector(`[slot=${SLOTS.thumbnail}]`);
    return hasThumbnail ? (
      <div class={CSS.thumbnailWrapper}>
        <slot name={SLOTS.thumbnail} />
      </div>
    ) : null;
  }

  private renderCheckbox(): VNode {
    const checkboxLabel = this.selected ? this.intlDeselect : this.intlSelect;

    return (
      <label
        aria-label={checkboxLabel}
        class={CSS.checkboxWrapper}
        onClick={this.cardSelectClick}
        onKeyDown={this.cardSelectKeyDown}
        title={checkboxLabel}
      >
        <calcite-checkbox checked={this.selected} theme={this.theme} />
      </label>
    );
  }

  private renderHeader(): VNode {
    const title = this.el.querySelector(`[slot=${SLOTS.title}]`);
    const subtitle = this.el.querySelector(`[slot=${SLOTS.subtitle}]`);
    const hasHeader = title || subtitle;

    return hasHeader ? (
      <header class={CSS.header}>
        <slot name={SLOTS.title} />
        <slot name={SLOTS.subtitle} />
      </header>
    ) : null;
  }

  private renderFooter(): VNode {
    const leadingFooter = this.el.querySelector(`[slot=${SLOTS.footerLeading}]`);
    const trailingFooter = this.el.querySelector(`[slot=${SLOTS.footerTrailing}]`);

    const hasFooter = leadingFooter || trailingFooter;
    return hasFooter ? (
      <footer class={CSS.footer}>
        <slot name={SLOTS.footerLeading} />
        <slot name={SLOTS.footerTrailing} />
      </footer>
    ) : null;
  }
}
