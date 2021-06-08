import { hidden, renders } from "../../tests/commonTests";
import { defaults } from "../../tests/commonTests";

describe("calcite-list-item", () => {
  it("renders", async () => renders("calcite-list-item"));

  it("honors hidden attribute", async () => hidden("calcite-list-item"));

  it("has property defaults", async () =>
    defaults("calcite-list-item", [
      {
        propertyName: "description",
        defaultValue: undefined
      },
      {
        propertyName: "disabled",
        defaultValue: false
      },
      {
        propertyName: "label",
        defaultValue: undefined
      }
    ]));
});
