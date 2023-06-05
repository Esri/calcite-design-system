import { disabled, renders, hidden } from "../../tests/commonTests";

describe("calcite-stepper-item", () => {
  describe("renders", () => {
    renders("calcite-stepper-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-stepper-item");
  });

  describe("disabled", () => {
    disabled("calcite-stepper-item");
  });
});
