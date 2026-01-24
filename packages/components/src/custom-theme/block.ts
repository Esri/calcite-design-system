import { html } from "../../support/formatting";

export const blockTokens = {
  calciteBlockBorderColor: "",
  calciteBlockContentSpace: "",
  calciteBlockHeaderBackgroundColor: "",
  calciteBlockHeaderBackgroundColorHover: "",
  calciteBlockTextColor: "",
  calciteBlockHeadingTextColor: "",
  calciteBlockHeadingTextColorPress: "",
  calciteBlockDescriptionTextColor: "",
  calciteBlockIconColor: "",
  calciteBlockIconColorHover: "",
};

export const block = html` <calcite-block
  heading="heading"
  description="description"
  open
  collapsible
  icon-end="pen"
  icon-start="pen"
>
  <calcite-icon icon="compass" slot="content-start"></calcite-icon>
  <div>content</div>
</calcite-block>`;
