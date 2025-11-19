import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";

describe("calcite-tab", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-tab"),
      [
        { propertyName: "tab", defaultValue: undefined },
        { propertyName: "selected", defaultValue: false },
        { propertyName: "scale", defaultValue: "m" },
      ],
    );
  });
});
