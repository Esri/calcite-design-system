import { html } from "../../support/formatting";

export const icon = (icon: string = "3d-glasses"): string =>
  html`<calcite-icon icon="${icon}"></calcite-icon>`;
