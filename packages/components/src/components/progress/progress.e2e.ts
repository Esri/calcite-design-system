import { describe } from "vitest";
import { html } from "../../../support/formatting";
import { themed } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-progress", () => {
  describe("theme", () => {
    themed(html`<calcite-progress text="optional text" type="determinate" value="50"></calcite-progress>`, {
      "--calcite-progress-background-color": {
        shadowSelector: `.${CSS.track}`,
        targetProp: "backgroundColor",
      },
      "--calcite-progress-fill-color": {
        shadowSelector: `.${CSS.bar}`,
        targetProp: "backgroundColor",
      },
      "--calcite-progress-text-color": {
        shadowSelector: `.${CSS.text}`,
        targetProp: "color",
      },
    });
  });
});
