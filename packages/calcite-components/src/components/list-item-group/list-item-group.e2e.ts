import { hidden, renders, disabled, defaults } from "../../tests/commonTests";

describe("calcite-list-item-group", () => {
  describe("renders", () => {
    renders("calcite-list-item-group", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-list-item-group");
  });

  describe("disabled", () => {
    disabled("calcite-list-item-group", { focusTarget: "none" });
  });

  describe("defaults", () => {
    defaults("calcite-list-item-group", [
      {
        propertyName: "heading",
        defaultValue: undefined,
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
    ]);
  });
});
