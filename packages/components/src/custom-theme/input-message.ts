import { html } from "../../support/formatting";

export const inputMessageTokens = {
  calciteInputMessageIconColor: "",
  calciteInputMessageSpacing: "",
  calciteInputMessageSpacingValue: "",
};

export const inputMessageInvalid = html`<calcite-input-message status="invalid" icon="frown"
  >Message</calcite-input-message
>`;
export const inputMessageValid = html`<calcite-input-message status="valid" icon="smile"
  >Message</calcite-input-message
>`;
export const inputMessageIdle = html`<calcite-input-message status="idle" icon="information"
  >Message</calcite-input-message
>`;
