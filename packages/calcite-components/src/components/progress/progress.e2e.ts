import { html } from "../../../support/formatting";
import { accessible, hidden, renders, themed } from "../../tests/commonTests";
import { CSS } from "./resources";

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
    themed(html`<calcite-progress text="optional text" type="determinate" value="0.5"></calcite-progress>`, {
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
