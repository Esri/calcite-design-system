import { html } from "../../support/formatting";

export const comboboxTokens = {
  calciteComboboxInputHeight: "",
  calciteComboboxInputBackgroundColor: "",
  calciteComboboxInputTextColor: "",
  calciteComboboxInputBorderColor: "",
  calciteComboboxIconColor: "",
  calciteComboboxIconColorHover: "",
  calciteComboboxBackgroundColor: "",
  calciteChipBackgroundColor: "",
  calciteChipTextColor: "",
  calciteChipIconColor: "",
  calciteChipCloseIconColor: "",
  calciteChipCornerRadius: "",
  calciteComboboxItemGroupTextColor: "",
  calciteComboboxItemGroupBorderColor: "",
};

export const defaultCombobox = html`<calcite-combobox label="test" max-items="6" open>
  <calcite-combobox-item-group value="Trees" label="Trees">
    <calcite-combobox-item value="Pine" heading="Pine">
      <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
  <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`;

export const singleSelectCombobox = html`<calcite-combobox label="test" selection-mode="single">
  <calcite-combobox-item value="Trees" heading="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`;

export const comboboxWithPlaceHolderIcon = html`<calcite-combobox label="test" placeholder-icon="layers">
  <calcite-combobox-item value="Trees" heading="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
</calcite-combobox>`;

export const noMatches = html`
  <calcite-combobox open filter-text="Three" selection-mode="single">
    <calcite-combobox-item value="one" heading="One"></calcite-combobox-item>
    <calcite-combobox-item value="two" heading="Two"></calcite-combobox-item>
  </calcite-combobox>
`;
