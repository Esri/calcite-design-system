import { accessible, defaults, focusable, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-navigation-logo", () => {
  describe("renders", () => {
    renders("calcite-navigation-logo", { display: "inline-flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-navigation-logo");
  });

  describe("accessible", () => {
    accessible("calcite-navigation-logo");
  });

  it("reflects", () =>
    reflects("calcite-navigation-logo", [
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

  it("defaults", () =>
    defaults("calcite-navigation-logo", [
      {
        propertyName: "textEnabled",
        defaultValue: false
      }
    ]));

  describe("is focusable", () => {
    focusable("calcite-navigation-logo");
  });
});
