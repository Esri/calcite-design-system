import { accessible, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-nav-user", () => {
  describe("renders", () => {
    renders("calcite-nav-user", { display: "inline-flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-nav-user");
  });

  describe("accessible", () => {
    accessible("calcite-nav-user");
  });

  it("reflects", () =>
    reflects("calcite-nav-user", [
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
