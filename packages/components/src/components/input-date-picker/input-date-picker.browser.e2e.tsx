import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { internalLabel } from "../../tests/commonTests/browser";
import { defaults, hidden } from "../../tests/commonTests/browser";

describe("calcite-input-date-picker", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-input-date-picker"),
      [
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "flipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "status",
          defaultValue: "idle",
        },
        {
          propertyName: "validationIcon",
          defaultValue: undefined,
        },
        {
          propertyName: "validationMessage",
          defaultValue: undefined,
        },
        {
          propertyName: "calendars",
          defaultValue: 2,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-input-date-picker"));
  });

  describe("InternalLabel", () => {
    internalLabel(() => mount(`calcite-input-date-picker`));
  });
});
