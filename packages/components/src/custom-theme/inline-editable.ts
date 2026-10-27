import "../components/inline-editable/inline-editable";
import "../components/input/input";
import { html } from "../../support/formatting";

// Deprecated in v5.2.0, removal target v7.0.0

export const inlineEditableTokens = {
  calciteInlineEditableBackgroundColor: "",
  calciteInlineEditableBackgroundColorHover: "",
  calciteInlineEditableButtonBackgroundColor: "",
  calciteInlineEditableButtonBackgroundColorHover: "",
  calciteInlineEditableButtonBackgroundColorPress: "",
  calciteInlineEditableButtonCornerRadius: "",
  calciteInlineEditableButtonLoaderColor: "",
  calciteInlineEditableButtonTextColor: "",
  calciteInlineEditableButtonTextColorPress: "",
};

export const inlineEditable = html`
  <calcite-inline-editable>
    <calcite-input />
  </calcite-inline-editable>
`;
