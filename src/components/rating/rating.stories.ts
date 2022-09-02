import { number, select, text } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Controls/Rating",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-rating
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="${number("value", 0)}"
    ${boolean("show-chip", true)}
    average="${number("average", 4.4)}"
    count="${number("count", 10)}"
    ${boolean("read-only", false)}
    ${boolean("disabled", false)}
    intl-rating="${text("intl-rating", "Rating")}"
    intl-stars="${text("intl-rating", "Stars: ${num}")}"
  ></calcite-rating>
`;

export const darkThemeRTL = (): string => html`
  <calcite-rating
    class="calcite-theme-dark"
    dir="rtl"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="${number("value", 0)}"
    ${boolean("show-chip", true)}
    average="${number("average", 4.4)}"
    count="${number("count", 10)}"
    ${boolean("read-only", false)}
    ${boolean("disabled", false)}
    intl-rating="${text("intl-rating", "Rating")}"
    intl-stars="${text("intl-rating", "Stars: ${num}")}"
  ></calcite-rating>
`;

darkThemeRTL.parameters = { themes: themesDarkDefault };

export const wrappedInCalciteLabel = (): string => html`
  <calcite-label layout="${select("input layout", ["default", "inline", "inline-space-between"], "default")}">
    Rate this!
    <calcite-rating
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${number("value", 0)}"
      ${boolean("show-chip", false)}
      average="${number("average", 0)}"
      count="${number("count", 0)}"
      ${boolean("read-only", false)}
      ${boolean("disabled", false)}
      intl-rating="${text("intl-rating", "Rating")}"
      intl-stars="${text("intl-rating", "Stars: ${num}")}"
    ></calcite-rating>
  </calcite-label>
`;

export const disabled = (): string => html`<calcite-rating disabled value="3"></calcite-rating>`;
