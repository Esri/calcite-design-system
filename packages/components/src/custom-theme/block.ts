import "../components/block/block";
import "../components/icon/icon";
import { html } from "../../support/formatting";

export const blockTokens = {
  calciteBlockBorderColor: "",
  calciteBlockContentSpace: "",
  calciteBlockBackgroundColor: "",
  calciteBlockHeaderBackgroundColor: "",
  calciteBlockHeaderBackgroundColorHover: "",
  calciteBlockTextColor: "",
  calciteBlockHeadingTextColor: "",
  calciteBlockHeadingTextColorPress: "",
  calciteBlockDescriptionTextColor: "",
  calciteBlockIconColor: "",
  calciteBlockIconColorHover: "",
  calciteBlockIconStartColor: "",
  calciteBlockIconEndColor: "",
  calciteBlockCollapsibleIconColor: "",
  calciteBlockCollapsibleIconColorHover: "",
};

export const block = html` <calcite-block
  heading="heading"
  description="description"
  open
  expandable
  icon-end="pen"
  icon-start="pen"
>
  <calcite-icon icon="compass" slot="content-start"></calcite-icon>
  <div>content</div>
</calcite-block>`;
