import { hidden, renders } from "../../tests/commonTests";
import { defaults } from "../../tests/commonTests";

describe("calcite-list-item-group", () => {
  it("renders", async () => renders("calcite-list-item-group"));

  it("honors hidden attribute", async () => hidden("calcite-list-item-group"));

  it("has property defaults", async () =>
    defaults("calcite-list-item-group", [
      {
        propertyName: "heading",
        defaultValue: undefined
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined
      }
    ]));
});
