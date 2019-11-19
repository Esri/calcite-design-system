import { Component, Element, Host, Method, Prop, h } from "@stencil/core";

import { getElementDir } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";
import { VNode } from "@stencil/core/dist/declarations";

import { CSS, SLOTS } from "./resources";
import CalciteScrim from "../../utils/CalciteScrim";
import classnames from "classnames";

/**
 * @slot thumbnail - [Required] A slot for adding a thumnail to the card.
 * @slot header - [Required] A slot for adding a heading and an icon to the card.
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
   * Indicates whether the image's height or width is prioritized.
   * When false, the image fills the whole thumbnail space.
   * When true, the height of the thumbnail is used to crop.
   */
  @Prop({ reflect: true }) imgHeightPriority = false;

  /**
   * The scale of the image.
   */
  @Prop({ reflect: true }) imageScale: "s" | "m" | "l" = "m";

  /**
   * Indicates whether the card is selected. Toggles when a card is clicked.
   */
  @Prop({ reflect: true }) selected = false;

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
    //prop validations
      let scales = ["s", "m", "l"];
      if (!scales.includes(this.imageScale)) this.imageScale = "m";

      let themes = ["dark", "light"];
      if (!themes.includes(this.theme)) this.theme = "light";
  }

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Used to toggle the selection state.
   */
  @Method() async toggleSelected(coerce?: boolean) {
    if (this.disabled) {
      return;
    }
    this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  cardClickHandler = (event: MouseEvent): void => {
    event.preventDefault();
    if (this.disabled) {
      return;
    }
    this.toggleSelected();
  };

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
      <CalciteScrim loading={this.loading}></CalciteScrim>
    ) : null;
  }
  render() {
    const { loading, el } = this;
    const rtl = getElementDir(el) === "rtl";
    return (
      <Host selected={this.selected}>
        <div
          class={classnames(CSS.container, {
            [CSS_UTILITY.rtl]: rtl
          })}
          onClick={this.cardClickHandler}
          aria-busy={loading}
        >
          {this.renderThumbnail()}
          {this.renderHeader()}
          <slot name={SLOTS.buttonAction} />
          {this.renderFooter()}
        </div>
        {this.renderScrim()}
      </Host>
    );
  }
}
