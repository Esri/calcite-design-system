import { accessible, hidden, renders } from "../../tests/commonTests";

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
});
