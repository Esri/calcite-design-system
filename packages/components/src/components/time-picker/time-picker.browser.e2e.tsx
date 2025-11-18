import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";

describe("calcite-time-picker", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-time-picker"),
      [
        { propertyName: "hourFormat", defaultValue: "user" },
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "step", defaultValue: 60 },
      ],
    );
  });
});
