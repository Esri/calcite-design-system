import { html } from "../../../support/formatting";
import { accessible, focusable, hidden, reflects, renders, defaults } from "../../tests/commonTests";

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

  describe("reflects", () => {
    reflects("calcite-navigation-logo", [
      {
        propertyName: "active",
        value: "true",
      },
      {
        propertyName: "href",
        value: "#logo",
      },
      {
        propertyName: "rel",
        value: "external",
      },
      {
        propertyName: "target",
        value: "_self",
      },
      {
        propertyName: "headingLevel",
        value: 1,
      },
    ]);
  });

  describe("is focusable", () => {
    focusable(html`<calcite-navigation-logo href=" " heading="esri"></calcite-navigation-logo>`);
  });

  describe("defaults", () => {
    defaults("calcite-navigation-logo", [
      {
        propertyName: "active",
        defaultValue: undefined,
      },
      {
        propertyName: "href",
        defaultValue: undefined,
      },
      {
        propertyName: "rel",
        defaultValue: undefined,
      },
      {
        propertyName: "target",
        defaultValue: undefined,
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
    ]);
  });
});
