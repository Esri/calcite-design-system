import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-action-group", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-action-group"),
      [
        {
          propertyName: "layout",
          defaultValue: "vertical",
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "menuPlacement",
          defaultValue: undefined,
        },
        {
          propertyName: "menuFlipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-action-group"),
      [
        {
          propertyName: "menuPlacement",
          value: "bottom",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-action-group"));
  });
});
