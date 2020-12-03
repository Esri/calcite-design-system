import { storiesOf } from "@storybook/html";
import { number, select, text } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Rating", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    () => `
   <calcite-rating
    scale="${select("scale", ["s", "m", "l"], "m")}"
    value="${number("value", 0)}"
    average="${number("average", 0)}"
    count="${number("count", 0)}"
    ${boolean("read-only", false)}
    ${boolean("disabled", false)}
    intl-rating="${text("intl-rating", "Rating")}"
    intl-stars="${text("intl-rating", "Stars: ${num}")}"
   ></calcite-rating>
  `
  )
  .add(
    "Dark mode",
    () => `
    <calcite-rating
      theme="dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${number("value", 0)}"
      average="${number("average", 0)}"
      count="${number("count", 0)}"
      ${boolean("read-only", false)}
      ${boolean("disabled", false)}
      intl-rating="${text("intl-rating", "Rating")}"
      intl-stars="${text("intl-rating", "Stars: ${num}")}"
    ></calcite-rating>
  `,
    { backgrounds: darkBackground }
  )
  .add(
    "Wrapped in calcite-label",
    () => `
    <calcite-label layout="${select("input layout", ["default", "inline", "inline-space-between"], "default")}">
    Rate this!
    <calcite-rating
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${number("value", 0)}"
      average="${number("average", 0)}"
      count="${number("count", 0)}"
      ${boolean("read-only", false)}
      ${boolean("disabled", false)}
      intl-rating="${text("intl-rating", "Rating")}"
      intl-stars="${text("intl-rating", "Stars: ${num}")}"
    ></calcite-rating>
   </calcite-label>
  `
  )
  .add(
    "RTL",
    () => `
    <div dir="rtl">
    <calcite-rating
      scale="${select("scale", ["s", "m", "l"], "m")}"
      value="${number("value", 0)}"
      average="${number("average", 0)}"
      count="${number("count", 0)}"
      ${boolean("read-only", false)}
      ${boolean("disabled", false)}
      intl-rating="${text("intl-rating", "Rating")}"
      intl-stars="${text("intl-rating", "Stars: ${num}")}"
    ></calcite-rating>
   </div>
  `
  );
