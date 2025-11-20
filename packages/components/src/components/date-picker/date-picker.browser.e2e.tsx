import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden } from "../../tests/commonTests/browser";

describe("calcite-date-picker", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-date-picker"),
      [
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "calendars",
          defaultValue: 2,
        },
        {
          propertyName: "monthStyle",
          defaultValue: "wide",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-date-picker"));
  });
});
