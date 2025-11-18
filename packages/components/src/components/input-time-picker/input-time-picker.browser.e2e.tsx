import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-input-time-picker", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-input-time-picker"),
      [
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "step", defaultValue: 60 },
        { propertyName: "overlayPositioning", defaultValue: "absolute" },
        { propertyName: "status", defaultValue: "idle" },
        { propertyName: "validationIcon", defaultValue: undefined },
        { propertyName: "validationMessage", defaultValue: undefined },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount(`calcite-input-time-picker`),
      [
        { propertyName: "open", value: true },
        { propertyName: "disabled", value: true },
        { propertyName: "scale", value: "m" },
        { propertyName: "status", value: "invalid" },
        { propertyName: "validationIcon", value: true },
      ],
    );
  });
});
