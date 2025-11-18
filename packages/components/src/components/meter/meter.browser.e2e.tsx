import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-meter", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-meter"),
      [
        {
          propertyName: "appearance",
          defaultValue: "outline-fill",
        },
        {
          propertyName: "disabled",
          defaultValue: false,
        },
        {
          propertyName: "fillType",
          defaultValue: "range",
        },
        {
          propertyName: "groupSeparator",
          defaultValue: false,
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
          propertyName: "rangeLabelType",
          defaultValue: "percent",
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "unitLabel",
          defaultValue: "",
        },
        {
          propertyName: "valueLabel",
          defaultValue: false,
        },
        {
          propertyName: "valueLabelType",
          defaultValue: "percent",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-meter"),
      [
        {
          propertyName: "appearance",
          value: "outline-fill",
        },
        {
          propertyName: "fillType",
          value: "range",
        },
        {
          propertyName: "max",
          value: 100,
        },
        {
          propertyName: "min",
          value: 0,
        },
        {
          propertyName: "rangeLabelType",
          value: "percent",
        },
        {
          propertyName: "scale",
          value: "m",
        },
        {
          propertyName: "valueLabelType",
          value: "percent",
        },
      ],
    );
  });
});
