import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-tile", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-tile"),
      [
        { propertyName: "active", defaultValue: false },
        { propertyName: "alignment", defaultValue: "start" },
        { propertyName: "disabled", defaultValue: false },
        { propertyName: "embed", defaultValue: false },
        { propertyName: "hidden", defaultValue: false },
        { propertyName: "iconFlipRtl", defaultValue: false },
        { propertyName: "interactive", defaultValue: false },
        { propertyName: "layout", defaultValue: "horizontal" },
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "selected", defaultValue: false },
        { propertyName: "selectionAppearance", defaultValue: "icon" },
        { propertyName: "selectionMode", defaultValue: "none" },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-tile"),
      [
        { propertyName: "active", value: true },
        { propertyName: "alignment", value: "center" },
        { propertyName: "description", value: "My test description" },
        { propertyName: "disabled", value: true },
        { propertyName: "embed", value: true },
        { propertyName: "heading", value: "My test heading" },
        { propertyName: "href", value: "http://www.esri.com" },
        { propertyName: "icon", value: "layers" },
        { propertyName: "iconFlipRtl", value: true },
        { propertyName: "scale", value: "s" },
        { propertyName: "selected", value: true },
        { propertyName: "selectionAppearance", value: "border" },
        { propertyName: "selectionMode", value: "single-persist" },
      ],
    );
  });
});
