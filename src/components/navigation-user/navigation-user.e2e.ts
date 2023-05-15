import { accessible, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-navigation-user", () => {
  describe("renders", () => {
    renders("calcite-navigation-user", { display: "inline-flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-navigation-user");
  });

  describe("accessible", () => {
    accessible("calcite-navigation-user");
  });

  it("reflects", () =>
    reflects("calcite-navigation-user", [
      {
        propertyName: "active",
        value: "true"
      },
      {
        propertyName: "textDisabled",
        value: ""
      }
    ]));
});
