import { html } from "../../support/formatting";

export const blockSectionTokens = {
  calciteBlockSectionBorderColor: "",
  calciteBlockSectionContentSpace: "",
  calciteBlockSectionHeaderTextColor: "",
  calciteBlockSectionHeaderTextColorHover: "",
  calciteBlockSectionTextColor: "",
};

export const blockSection = html`
  <calcite-block-section text="Planes" open icon-end="pen" icon-start="pen" text="a block-section">
    <p>Block section content</p>
  </calcite-block-section>
`;
