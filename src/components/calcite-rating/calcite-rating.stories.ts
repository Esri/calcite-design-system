import { number, select, text } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Controls/Rating",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
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
`;

export const DarkMode = (): string => html`
  <calcite-rating
    theme="dark"
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
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};

export const WrappedInCalciteLabel = (): string => html`
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

WrappedInCalciteLabel.story = {
  name: "Wrapped in calcite-label"
};

export const Rtl = (): string => html`
  <div dir="rtl">
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
  </div>
`;

Rtl.story = {
  name: "RTL"
};
