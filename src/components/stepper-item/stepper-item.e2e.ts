import { disabled, renders } from "../../tests/commonTests";

describe("calcite-stepper-item", () => {
  it("renders", () => renders("calcite-stepper-item", { display: "flex" }));
  it("can be disabled", () => disabled("calcite-stepper-item"));
});
