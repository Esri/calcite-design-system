import { describe } from "vitest";
import { hidden, renders, disabled, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("calcite-list-item-group", () => {
  describe("renders", () => {
    renders("calcite-list-item-group", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-list-item-group");
  });

  describe("disabled", () => {
    disabled("calcite-list-item-group", { focusTarget: "none" });
  });

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
});
