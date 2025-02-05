import { html } from "../../support/formatting";

export const inlineEditableTokens = {
  calciteInlineEditableBackgroundColor: "",
  calciteInlineEditableBackgroundColorHover: "",
  calciteInlineEditableButtonBackgroundColor: "",
  calciteInlineEditableButtonCornerRadius: "",
  calciteInlineEditableButtonLoaderColor: "",
  calciteInlineEditableButtonShadowColor: "",
  calciteInlineEditableButtonTextColor: "",
};

export const inlineEditable = html`
  <calcite-inline-editable>
    <calcite-input />
  </calcite-inline-editable>
`;
