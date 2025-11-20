import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { internalLabel } from "../../tests/commonTests/browser";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";

describe("calcite-radio-button", () => {
  describe("defaults", () => {
    defaults(() => mount("calcite-radio-button"), [{ propertyName: "scale", defaultValue: "m" }]);
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-radio-button"),
      [
        { propertyName: "checked", value: true },
        { propertyName: "disabled", value: true },
        { propertyName: "focused", value: true },
        { propertyName: "hidden", value: true },
        { propertyName: "name", value: "reflects-name" },
        { propertyName: "required", value: true },
        { propertyName: "scale", value: "m" },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-radio-button"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-radio-button`));
  });
});
