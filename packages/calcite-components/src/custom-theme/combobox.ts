import { html } from "../../support/formatting";

export const comboboxTokens = {
  calciteComboboxInputHeight: "",
  calciteComboboxBackgroundColor: "",
  calciteComboboxTextColor: "",
  calciteComboboxBorderColor: "",
  calciteComboboxIconColor: "",
  calciteComboboxIconColorHover: "",
  calciteComboboxPlaceholderIconColor: "",
  calciteComboboxListboxBackgroundColor: "",
  calciteChipBackgroundColor: "",
  calciteComboboxChipBackgroundColorActive: "",
  calciteChipTextColor: "",
  calciteChipIconColor: "",
  calciteChipCloseIconColor: "",
  calciteChipCornerRadius: "",
  calciteComboboxItemGroupTextColor: "",
  calciteComboboxItemGroupBorderColor: "",
};

export const defaultCombobox = html`<calcite-combobox label="test" max-items="6" open>
  <calcite-combobox-item-group value="Trees" label="Trees">
    <calcite-combobox-item value="Pine" text-label="Pine">
      <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`;

export const singleSelectCombobox = html`<calcite-combobox label="test" selection-mode="single">
  <calcite-combobox-item value="Trees" text-label="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`;

export const comboboxWithPlaceHolderIcon = html`<calcite-combobox label="test" placeholder-icon="layers">
  <calcite-combobox-item value="Trees" text-label="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
</calcite-combobox>`;
