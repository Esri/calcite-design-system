import { html } from "../../../support/formatting";

export default {
  title: "Components/InputMessage",
};

export const status = (): string => html`
  <calcite-input-message status="invalid" icon="frown">Message</calcite-input-message>
  <calcite-input-message status="valid" icon="smile">Message</calcite-input-message>
  <calcite-input-message status="idle" icon="information">Message</calcite-input-message>
`;
