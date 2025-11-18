import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";

describe("calcite-slider", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-slider"),
      [
        {
          propertyName: "mirrored",
          defaultValue: false,
        },
        {
          propertyName: "disabled",
          defaultValue: false,
        },
        {
          propertyName: "hasHistogram",
          defaultValue: false,
        },
        {
          propertyName: "fillPlacement",
          defaultValue: "start",
        },
        {
          propertyName: "labelFormatter",
          defaultValue: undefined,
        },
        {
          propertyName: "max",
          defaultValue: 100,
        },
        {
          propertyName: "min",
          defaultValue: 0,
        },
        {
          propertyName: "mirrored",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "snap",
          defaultValue: false,
        },
        {
          propertyName: "step",
          defaultValue: 1,
        },
        {
          propertyName: "value",
          defaultValue: 0,
        },
        { propertyName: "status", defaultValue: "idle" },
        { propertyName: "validationIcon", defaultValue: undefined },
        { propertyName: "validationMessage", defaultValue: undefined },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-slider"),
      [
        {
          propertyName: "scale",
          value: "m",
        },
        {
          propertyName: "status",
          value: "invalid",
        },
        {
          propertyName: "validationIcon",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-slider"));
  });
});
