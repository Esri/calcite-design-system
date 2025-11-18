import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-shell-panel", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-shell-panel"),
      [
        {
          propertyName: "collapsed",
          defaultValue: false,
        },
        {
          propertyName: "resizable",
          defaultValue: false,
        },
        {
          propertyName: "displayMode",
          defaultValue: "dock",
        },
        {
          propertyName: "widthScale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-shell-panel"),
      [
        {
          propertyName: "widthScale",
          value: "m",
        },
        {
          propertyName: "width",
          value: "m",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-shell-panel"));
  });
});
