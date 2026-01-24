import { mount } from "@arcgis/lumina-compiler/testing";
import { describe } from "vitest";
import { defaults, focusable, hidden, t9n, disabled } from "../../tests/commonTests/browser";

describe("calcite-button", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-button"),
      [
        {
          propertyName: "alignment",
          defaultValue: "center",
        },
        {
          propertyName: "appearance",
          defaultValue: "solid",
        },
        {
          propertyName: "label",
          defaultValue: undefined,
        },
        {
          propertyName: "kind",
          defaultValue: "brand",
        },
        {
          propertyName: "disabled",
          defaultValue: false,
        },
        {
          propertyName: "download",
          defaultValue: false,
        },
        {
          propertyName: "href",
          defaultValue: undefined,
        },
        {
          propertyName: "iconEnd",
          defaultValue: undefined,
        },
        {
          propertyName: "iconFlipRtl",
          defaultValue: undefined,
        },
        {
          propertyName: "iconStart",
          defaultValue: undefined,
        },
        {
          propertyName: "loading",
          defaultValue: false,
        },
        {
          propertyName: "name",
          defaultValue: undefined,
        },
        {
          propertyName: "rel",
          defaultValue: undefined,
        },
        {
          propertyName: "form",
          defaultValue: undefined,
        },
        {
          propertyName: "round",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "splitChild",
          defaultValue: false,
        },
        {
          propertyName: "target",
          defaultValue: undefined,
        },
        {
          propertyName: "type",
          defaultValue: "button",
        },
        {
          propertyName: "width",
          defaultValue: "auto",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-button"));
  });

  describe("focusable", () => {
    focusable(() => mount("calcite-button"));
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-button"));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-button"));
  });
});
