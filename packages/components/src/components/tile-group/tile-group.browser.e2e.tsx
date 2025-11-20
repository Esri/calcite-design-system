import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects } from "../../tests/commonTests/browser";

describe("calcite-tile-group", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-tile-group"),
      [
        { propertyName: "layout", defaultValue: "horizontal" },
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "selectionAppearance", defaultValue: "icon" },
        { propertyName: "selectionMode", defaultValue: "none" },
      ],
    );
  });

  describe("hidden", () => {
    hidden(() => mount("calcite-tile-group"));
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-tile-group"),
      [
        { propertyName: "layout", value: "horizontal" },
        { propertyName: "scale", value: "m" },
        { propertyName: "selectionAppearance", value: "icon" },
        { propertyName: "selectionMode", value: "none" },
      ],
    );
  });
});
