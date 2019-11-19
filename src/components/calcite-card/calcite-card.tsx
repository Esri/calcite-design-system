import { Component, Element, Host, Prop, h } from "@stencil/core";

import { getElementDir } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { VNode } from "@stencil/core/dist/declarations";

import { CSS, SLOTS } from "./resources";
import CalciteScrim from "../../utils/CalciteScrim";

/**
 * @slot thumbnail - [Required] A slot for adding a thumnail to the card.
 * @slot header - [Required] A slot for adding a heading and an icon to the card.
 * @slot - A slot for adding summary/description content.
 * @slot action - A slot for adding a single action as a button.
 * @slot footer-leading - A slot for adding a leading footer.
 * @slot footer-trailing - A slot for adding a trailing footer.
 */

@Component({
  tag: "calcite-card",
  styleUrl: "./calcite-card.scss",
  shadow: true
})
export class CalciteCard {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When true, the card can't be clicked and is visually muted.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * When true, the cards content is waiting to be loaded. This state shows a busy indicator.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * Indicates whether the image's height is respected for the crop of the thumbnail.
   * When false (default), the image fills the whole thumbnail space.
   * When true, the height of the thumbnail is used to crop and may not fill the container for the thumbnail.
   */
  @Prop({ reflect: true }) respectImageHeight = false;

  /**
   * Indicates whether the card is selected.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /**
   * The theme of the card.
   */
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteCardElement;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback() {
      let themes = ["dark", "light"];
      if (!themes.includes(this.theme)) this.theme = "light";
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderHeader(): VNode {
    const hasHeader = this.el.querySelector(`[slot=${SLOTS.header}]`);

    return hasHeader ? (
      <header class={CSS.header}>
        <slot name={SLOTS.header} />
      </header>
    ) : null;
  }

  renderThumbnail(): VNode {
    const hasThumbnail = this.el.querySelector(`[slot=${SLOTS.thumbnail}]`);

    return hasThumbnail ? (
      <div class={CSS.thumbnail}>
        <slot name={SLOTS.thumbnail} />
      </div>
    ) : null;
  }

  renderFooter(): VNode {
    const leadingFooter = this.el.querySelector(
      `[slot=${SLOTS.footerLeading}]`
    );
    const trailingFooter = this.el.querySelector(
      `[slot=${SLOTS.footerTrailing}]`
    );

    const hasFooter = leadingFooter || trailingFooter;

    return hasFooter ? (
      <footer class={CSS.footer}>
        <slot name={SLOTS.footerLeading} />
        <slot name={SLOTS.footerTrailing} />
      </footer>
    ) : null;
  }

  renderScrim(): VNode {
    return this.loading || this.disabled ? (
      <CalciteScrim loading={this.loading} disabled={this.disabled}></CalciteScrim>
    ) : null;
  }
  render() {
    const { loading, el } = this;
    const rtl = getElementDir(el) === "rtl";
    return (
      <Host>
        <section
          class={{
            [CSS.container]: true,
            [CSS_UTILITY.rtl]: rtl
            }}
          aria-busy={loading}
        >
          {this.renderThumbnail()}
          {this.renderHeader()}
          < slot/>
          <div class="action-button">
            <slot name={SLOTS.buttonAction} />
          </div>
          {this.renderFooter()}
        </section>
        {this.renderScrim()}
      </Host>
    );
  }
}
