import { hidden, renders, disabled } from "../../tests/commonTests";
import { defaults } from "../../tests/commonTests";

describe("calcite-list-item-group", () => {
  describe("renders", () => {
    renders("calcite-list-item-group", { display: "flex" });
  });

  it("honors hidden attribute", async () => hidden("calcite-list-item-group"));

  it("can be disabled", () => disabled("calcite-list-item-group", { focusTarget: "none" }));

  it("has property defaults", async () =>
    defaults("calcite-list-item-group", [
      {
        propertyName: "heading",
        defaultValue: undefined
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined
      },
      {
        propertyName: "disabled",
        defaultValue: false
      }
    ]));
});
