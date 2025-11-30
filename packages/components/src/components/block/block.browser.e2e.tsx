import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, slots, t9n } from "../../tests/commonTests/browser";
import { defaultEndMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";

describe("calcite-block", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-block"),
      [
        {
          propertyName: "collapsible",
          defaultValue: false,
        },
        {
          propertyName: "dragDisabled",
          defaultValue: false,
        },
        {
          propertyName: "headingLevel",
          defaultValue: undefined,
        },
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "expanded",
          defaultValue: false,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
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
          propertyName: "sortHandleOpen",
          defaultValue: false,
        },
        {
          propertyName: "sortDisabled",
          defaultValue: false,
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
      () => mount("calcite-block"),
      [
        {
          propertyName: "collapsible",
          value: true,
        },
        {
          propertyName: "headingLevel",
          value: 2,
        },
        {
          propertyName: "open",
          value: true,
        },
        {
          propertyName: "expanded",
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
          propertyName: "dragDisabled",
          value: true,
        },
        {
          propertyName: "sortHandleOpen",
          value: true,
        },
        {
          propertyName: "scale",
          value: "m",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-block"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-block"), { display: "flex" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-block"), SLOTS);
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-block"));
  });
});
