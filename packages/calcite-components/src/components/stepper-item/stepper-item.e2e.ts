import { disabled, renders, hidden, t9n } from "../../tests/commonTests";

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

  describe("translation support", () => {
    t9n(`<calcite-stepper-item heading="Step 1" id="step-1"></calcite-stepper-item>`);
  });
});
