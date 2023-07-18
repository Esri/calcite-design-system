import { html } from "../../../support/formatting";
import { accessible, defaults, focusable, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-navigation-user", () => {
  describe("renders", () => {
    renders("calcite-navigation-user", { display: "inline-flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-navigation-user");
  });

  describe("accessible", () => {
    accessible(html`<calcite-navigation-user label="user"></calcite-navigation-user>`);
  });

  describe("reflects", () => {
    reflects("calcite-navigation-user", [
      {
        propertyName: "active",
        value: "true",
      },
      {
        propertyName: "textDisabled",
        value: "",
      },
    ]);
  });

  describe("defaults", () => {
    defaults("calcite-navigation-user", [
      {
        propertyName: "textDisabled",
        defaultValue: false,
      },
    ]);
  });

  describe("is focusable", () => {
    focusable("calcite-navigation-user");
  });
});
