import "../components/input-time-zone/input-time-zone";
import { html } from "../../support/formatting";

export const inputTimeZoneTokens = {
  calciteInputTimeZoneCornerRadius: "",
};

export const inputTimeZone = html`
  <calcite-input-time-zone reference-date="2020-01-01" value="-60"></calcite-input-time-zone>
`;
