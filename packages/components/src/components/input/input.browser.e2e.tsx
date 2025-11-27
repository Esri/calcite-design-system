import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { internalLabel, renders, focusable } from "../../tests/commonTests/browser";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";

describe("calcite-input", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-input"),
      [
        {
          propertyName: "status",
          defaultValue: "idle",
        },
        {
          propertyName: "alignment",
          defaultValue: "start",
        },
        {
          propertyName: "numberButtonType",
          defaultValue: "vertical",
        },
        {
          propertyName: "type",
          defaultValue: "text",
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "value",
          defaultValue: "",
        },
        {
          propertyName: "validationIcon",
          defaultValue: undefined,
        },
        {
          propertyName: "validationMessage",
          defaultValue: undefined,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-input"),
      [
        {
          propertyName: "status",
          value: "valid",
        },
        {
          propertyName: "alignment",
          value: "center",
        },
        {
          propertyName: "numberButtonType",
          value: "horizontal",
        },
        {
          propertyName: "type",
          value: "color",
        },
        {
          propertyName: "scale",
          value: "s",
        },
        {
          propertyName: "validationIcon",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-input"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-input`));
  });

  describe("renders", () => {
    renders(() => mount("calcite-input"), { display: "block" });
  });

  describe("is focusable", () => {
    focusable(() => mount(`calcite-input`), {
      shadowFocusTargetSelector: "input",
    });
  });
});
