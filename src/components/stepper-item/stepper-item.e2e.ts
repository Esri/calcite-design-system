import { disabled, renders, hidden } from "../../tests/commonTests";

describe("calcite-stepper-item", () => {
  describe("renders", () => {
    renders("calcite-stepper-item", { display: "flex" });
  });

  it("honors hidden attribute", async () => hidden("calcite-stepper-item"));

  it("can be disabled", () => disabled("calcite-stepper-item"));
});
