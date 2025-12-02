import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { internalLabel, renders, t9n } from "../../tests/commonTests/browser";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";

describe("calcite-rating", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-rating"),
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
      () => mount("calcite-rating"),
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
    hidden(() => mount("calcite-rating"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-rating`));
  });

  describe("renders", () => {
    renders(() => mount(<calcite-rating />), { display: "flex" });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-rating"));
  });
});
