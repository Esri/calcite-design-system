import { accessible, hidden, renders, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-progress", () => {
  describe("renders", () => {
    renders("calcite-progress", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-progress");
  });

  describe("accessible", () => {
    accessible(`<calcite-progress label="my progress"></calcite-progress>`);
  });

  describe("accessible with value", () => {
    accessible(`<calcite-progress value="50" type="indeterminate" text="percentage"></calcite-progress>`);
  });

  describe("theme", () => {
    describe("default", () => {
      themed("calcite-progress", {
        "--calcite-progress-background-color": {
          shadowSelector: ".track",
          targetProp: "backgroundColor",
        },
        "--calcite-progress-fill-color": {
          shadowSelector: ".bar",
          targetProp: "backgroundColor",
        },
      });
    });

    describe("indeterminate", () => {
      themed(html` <calcite-progress value="50" type="indeterminate" text="percentage"></calcite-progress>`, {
        "--calcite-progress-text-color": {
          shadowSelector: ".text",
          targetProp: "color",
        },
      });
    });
  });
});
