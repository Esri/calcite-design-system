import { storiesOf } from "@storybook/html";
import { text, number, array } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Slider", module)
  .addParameters({ notes: readme })
  .add(
    "Single value",
    () => `
    <calcite-slider
      min="${number("min", 0)}"
      max="${number("max", 100)}"
      value="${number("value", 50)}"
      step="${number("step", 1)}"
      label="${text("label", "Temperature")}"
      ${boolean("disabled", false)}
      ${boolean("label-handles", false)}
      ${boolean("label-ticks", false)}
      ticks="${number("ticks", undefined)}
      page-step="${number("page-step", false)}"
      ${boolean("precise", false)}
      ${boolean("snap", true)}
    ></calcite-slider>
  `
  )
  .add(
    "Range",
    () => `
    <calcite-slider
      min="${number("min", 0)}"
      min-label="${text("min-label", "Temperature, lower bound")}"
      min-value="${number("min-value", 25)}"
      max="${number("max", 100)}"
      max-label="${text("max-label", "Temperature, upper bound")}"
      max-value="${number("max-value", 75)}"
      step="${number("step", 1)}"
      ${boolean("label-handles", false)}
      ${boolean("label-ticks", false)}
      ticks="${number("ticks", 20)}"
      ${boolean("precise", false)}
      ${boolean("snap", true)}
    ></calcite-slider>
  `
  )
  .add("Histogram", () => {
    const slider = document.createElement("calcite-slider");
    slider.min = number("min", 0);
    slider.minValue = number("min-value", 25);
    slider.max = number("max", 100);
    slider.maxValue = number("max-value", 75);
    slider.histogram = array(
      "histogram",
      [
        [0, 0],
        [20, 12],
        [40, 25],
        [60, 55],
        [80, 10],
        [100, 0]
      ],
      "  "
    );
    return slider;
  })
  .add(
    "Dark mode",
    () => `
    <calcite-slider
      min="0"
      max="100"
      value="50"
      step="1"
      label="Temperature"
      theme="dark"
    ></calcite-slider>
  `,
    { backgrounds: darkBackground }
  );
