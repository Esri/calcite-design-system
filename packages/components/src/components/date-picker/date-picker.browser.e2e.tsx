import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, focusable } from "../../tests/commonTests/browser";

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

  describe("renders", () => {
    renders(() => mount("calcite-date-picker"), { display: "inline-block" });
  });

  describe("focusable", () => {
    focusable(() => mount("calcite-date-picker"), {
      shadowFocusTargetSelector: "calcite-date-picker-month",
    });
  });
});
