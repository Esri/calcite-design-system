import { placeholderImage } from "../../.storybook/placeholder-image";
import { html } from "../../support/formatting";

export const cardTokens = {
  calciteCardAccentColorSelected: "",
  calciteCardBackgroundColor: "",
  calciteCardBorderColor: "",
  calciteCardSelectIndicatorColorHover: "",
  calciteCardSelectIndicatorColor: "",
  calciteCardCornerRadius: "",
  calciteCardShadow: "",
};

const thumbnailHtml = html`<img
  alt="thumbnail"
  slot="thumbnail"
  src="${placeholderImage({
    width: 380,
    height: 180,
  })}"
  style="width: 380px;"
/> `;

export const card = html`<calcite-card selected selectable>
  <img alt="thumbnail" slot="thumbnail" style="width:260px" src="${placeholderImage({ width: 260, height: 160 })}" />
  <h3 slot="title">Selectable card</h3>
  <calcite-link slot="footer-start">Lead füt</calcite-link>
  <calcite-link slot="footer-end">Trail füt</calcite-link>
</calcite-card>`;

export const cardThumbnail = html`<div id="card-container" style="width:260px;">
  <calcite-card>
    ${thumbnailHtml}
    <h3 slot="heading">Portland Businesses</h3>
    <span slot="description"
      >by
      <calcite-link>example_user</calcite-link>
    </span>
    <div>
      Created: Apr 22, 2019
      <br />
      Updated: Dec 9, 2019
      <br />
      View Count: 0
    </div>
    <calcite-button
      slot="footer-start"
      kind="neutral"
      scale="s"
      id="card-icon-test-1"
      icon-start="circle"
    ></calcite-button>
  </calcite-card>
</div>`;
