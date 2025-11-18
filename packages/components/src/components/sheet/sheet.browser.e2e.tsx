import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-sheet", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-sheet"),
      [
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "embedded",
          defaultValue: false,
        },
        {
          propertyName: "displayMode",
          defaultValue: "overlay",
        },
        {
          propertyName: "focusTrapDisabled",
          defaultValue: false,
        },
        {
          propertyName: "outsideCloseDisabled",
          defaultValue: false,
        },
        {
          propertyName: "position",
          defaultValue: "inline-start",
        },
        {
          propertyName: "escapeDisabled",
          defaultValue: false,
        },
        {
          propertyName: "opened",
          defaultValue: false,
        },
        {
          propertyName: "resizable",
          defaultValue: false,
        },
        {
          propertyName: "widthScale",
          defaultValue: "m",
        },
        {
          propertyName: "heightScale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-sheet"),
      [
        {
          propertyName: "height",
          value: "m",
        },
        {
          propertyName: "heightScale",
          value: "m",
        },
        {
          propertyName: "resizable",
          value: true,
        },
        {
          propertyName: "width",
          value: "m",
        },
        {
          propertyName: "widthScale",
          value: "m",
        },
      ],
    );
  });
});
