import { describe } from "vitest";
import { themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("themed", () => {
  describe("default", () => {
    themed(html`<calcite-list-item-group heading="Buildings"></calcite-list-item-group>`, {
      "--calcite-list-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-list-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "color",
      },
    });
  });
});
