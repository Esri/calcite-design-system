import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";

describe("calcite-tabs", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-tabs"),
      [
        { propertyName: "layout", defaultValue: "inline" },
        { propertyName: "position", defaultValue: "top" },
        { propertyName: "scale", defaultValue: "m" },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-tabs"),
      [
        { propertyName: "layout", value: "inline" },
        { propertyName: "position", value: "top" },
        { propertyName: "scale", value: "m" },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-tabs"));
  });
});
