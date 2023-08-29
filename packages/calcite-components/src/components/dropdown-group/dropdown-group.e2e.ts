import { defaults, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-dropdown-group", () => {
  describe("defaults", () => {
    defaults("calcite-dropdown-group", [
      {
        propertyName: "selectionMode",
        defaultValue: "single",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-dropdown-group", [
      {
        propertyName: "selectionMode",
        value: "single",
      },
    ]);
  });

  describe("renders", () => {
    renders("calcite-dropdown-group", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-dropdown-group");
  });
});
