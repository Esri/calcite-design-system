import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe } from "vitest";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";
import { Select } from "./select";

describe("calcite-select", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-select"),
      [
        { propertyName: "scale", defaultValue: "m" },
        { propertyName: "status", defaultValue: "idle" },
        { propertyName: "validationIcon", defaultValue: undefined },
        { propertyName: "validationMessage", defaultValue: undefined },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () =>
        mount<Select>(
          <calcite-select>
            <calcite-option>uno</calcite-option>
            <calcite-option>dos</calcite-option>
            <calcite-option>tres</calcite-option>
          </calcite-select>,
        ),
      [
        {
          propertyName: "disabled",
          value: true,
        },
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
    hidden(() => mount("calcite-select"));
  });
});
