import { html } from "../../support/formatting";

export const buttonTokens = {
  calciteButtonBackgroundColor: "",
  calciteButtonBorderColor: "",
  calciteButtonCornerRadius: "",
  calciteButtonIconColor: "",
  calciteButtonLoaderColor: "",
  calciteButtonTextColor: "",
  calciteButtonShadow: "",
};

export const buttons = html`
  <calcite-button appearance="outline">Outline</calcite-button>
  <calcite-button kind="danger">Danger</calcite-button>
  <calcite-button loading>Loading</calcite-button>
  <calcite-button icon-start="banana">Icon</calcite-button>
`;
