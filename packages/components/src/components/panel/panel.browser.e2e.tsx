import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders } from "../../tests/commonTests/browser";
import { defaultEndMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-panel", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-panel"),
      [
        {
          propertyName: "beforeClose",
          defaultValue: undefined,
        },
        {
          propertyName: "headingLevel",
          defaultValue: undefined,
        },
        {
          propertyName: "collapsible",
          defaultValue: false,
        },
        {
          propertyName: "collapseDirection",
          defaultValue: "down",
        },
        {
          propertyName: "collapsed",
          defaultValue: false,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "menuPlacement",
          defaultValue: defaultEndMenuPlacement,
        },
        {
          propertyName: "menuFlipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "icon",
          defaultValue: undefined,
        },
        {
          propertyName: "iconFlipRtl",
          defaultValue: false,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-panel"),
      [
        {
          propertyName: "headingLevel",
          value: 2,
        },
        {
          propertyName: "collapsible",
          value: true,
        },
        {
          propertyName: "collapsed",
          value: true,
        },
        {
          propertyName: "overlayPositioning",
          value: "fixed",
        },
        {
          propertyName: "menuPlacement",
          value: "bottom",
        },
        {
          propertyName: "icon",
          value: "x",
        },
        {
          propertyName: "iconFlipRtl",
          value: "true",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-panel"));
  });

  describe("renders", () => {
    renders(() => mount(<calcite-panel>content</calcite-panel>), { display: "flex" });
  });
});
