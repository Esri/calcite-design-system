import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, slots } from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("calcite-accordion-item", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-accordion-item"),
      [
        {
          propertyName: "headingLevel",
          defaultValue: undefined,
        },
        {
          propertyName: "scale",
          defaultValue: undefined,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-accordion-item"),
      [
        {
          propertyName: "headingLevel",
          value: 2,
        },
        {
          propertyName: "scale",
          value: "m",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-accordion-item"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-accordion-item"), { display: "flex" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-accordion-item"), SLOTS);
  });
});
