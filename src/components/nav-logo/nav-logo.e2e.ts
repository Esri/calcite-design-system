import { accessible, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-nav-logo", () => {
  describe("renders", () => {
    renders("calcite-nav-logo", { display: "inline-flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-nav-logo");
  });

  describe("accessible", () => {
    accessible("calcite-nav-logo");
  });

  it("reflects", () =>
    reflects("calcite-nav-logo", [
      {
        propertyName: "active",
        value: "true"
      },
      {
        propertyName: "href",
        value: "#logo"
      },
      {
        propertyName: "textEnabled",
        value: "true"
      }
    ]));
});
