import { html } from "../../support/formatting";

export const comboboxItemTokens = {
  calciteComboboxItemTextColor: "",
  calciteComboboxItemTextColorHover: "",
  calciteComboboxItemBackgroundColorActive: "",
  calciteComboboxItemBackgroundColorHover: "",
  calciteComboboxSelectedIconColor: "",
  calciteComboboxDescriptionTextColor: "",
  calciteComboboxDescriptionTextColorPress: "",
  calciteComboboxHeadingTextColor: "",
};

export const comboboxItem = html` <calcite-combobox-item
  value="Pikachu"
  heading="Pikachu"
  description="Pokemon's mascot"
  short-heading="0025"
  icon="tree"
></calcite-combobox-item>`;

export const selectedComboboxItem = html`<calcite-combobox-item
  value="Pikachu"
  heading="Pikachu"
  description="Pokemon's mascot"
  short-heading="0025"
  icon="tree"
  selected
></calcite-combobox-item>`;
