import { html } from "../../support/formatting";

export const blockTokens = {
  calciteBlockSectionBorderColor: "",
  calciteBlockSectionHeaderTextColor: "",
  calciteBlockSectionHeaderTextColorHover: "",
  calciteBlockSectionTextColor: "",
};

export const block = html`<calcite-block-section
  text="Planes, trains, and automobiles"
  open
  icon-end="pen"
  icon-start="pen"
  toggle-display="switch"
  text="a block-section"
  status="valid"
>
</calcite-block-section>`;
