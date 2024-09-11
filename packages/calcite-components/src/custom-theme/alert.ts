import { html } from "../../support/formatting";
import { SLOTS } from "../components/alert/resources";

export const alertTokens = {
  calciteAlertBackgroundColor: "",
  calciteAlertCornerRadius: "",
};

export const alert = html`<calcite-alert label="this is a default alert" scale="s" open>
  <div slot="${SLOTS.title}">Test title</div>
  <div slot="${SLOTS.message}">Test message</div>
</calcite-alert>`;
