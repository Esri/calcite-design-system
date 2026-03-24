import { describe } from "vitest";
import { html } from "../../../support/formatting";
import { accessible, themed } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("accessible", () => {
  accessible(`<calcite-meter label="A great meter"></calcite-meter>`);
});

describe("theme", () => {
  themed(
    html`<calcite-meter
      group-separator
      unit-label="GB"
      value-label
      range-labels
      min="0"
      max="12400"
      low="4600"
      high="7600"
      value="-2200"
      value-label-type="units"
    ></calcite-meter>`,
    {
      "--calcite-meter-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-meter-fill-color": {
        shadowSelector: `.${CSS.fill}`,
        targetProp: "backgroundColor",
      },
      "--calcite-meter-range-text-color": {
        shadowSelector: `.${CSS.labelValue}`,
        targetProp: "color",
      },
      "--calcite-meter-value-text-color": {
        shadowSelector: `.${CSS.labelValue}`,
        targetProp: "color",
      },
      "--calcite-meter-shadow": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "boxShadow",
      },
      "--calcite-meter-border-color": [
        {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderColor",
        },
        {
          shadowSelector: `.${CSS.stepLine}`,
          targetProp: "backgroundColor",
        },
      ],
      "--calcite-meter-corner-radius": [
        {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderRadius",
        },
        {
          shadowSelector: `.${CSS.fill}`,
          targetProp: "borderRadius",
        },
      ],
    },
  );
});
