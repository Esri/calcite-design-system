import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-popover", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-popover"),
      [
        {
          propertyName: "placement",
          defaultValue: "auto",
        },
        {
          propertyName: "referenceElement",
          defaultValue: undefined,
        },
        {
          propertyName: "offsetDistance",
          defaultValue: 6,
        },
        {
          propertyName: "offsetSkidding",
          defaultValue: 0,
        },
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "closable",
          defaultValue: false,
        },
        {
          propertyName: "flipDisabled",
          defaultValue: false,
        },
        {
          propertyName: "pointerDisabled",
          defaultValue: false,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount(<calcite-popover open />));
  });
});
