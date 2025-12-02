import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  t9n,
} from "../../tests/commonTests/browser";

describe("calcite-action", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-action"),
      [
        {
          propertyName: "active",
          defaultValue: false,
        },
        {
          propertyName: "appearance",
          defaultValue: "solid",
        },
        {
          propertyName: "compact", // (deprecated)
          defaultValue: false,
        },
        {
          propertyName: "disabled",
          defaultValue: false,
        },
        {
          propertyName: "indicator",
          defaultValue: false,
        },
        {
          propertyName: "loading",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "textEnabled",
          defaultValue: false,
        },
        {
          propertyName: "width",
          defaultValue: "auto",
        },
        {
          propertyName: "form",
          defaultValue: undefined,
        },
        {
          propertyName: "type",
          defaultValue: "button",
        },
        {
          propertyName: "selectionAppearance",
          defaultValue: undefined,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-action"),
      [
        {
          propertyName: "active",
          value: true,
        },
        {
          propertyName: "alignment",
          value: "end",
        },
        {
          propertyName: "appearance",
          value: "solid",
        },
        {
          propertyName: "compact",
          value: true,
        },
        {
          propertyName: "disabled",
          value: true,
        },
        {
          propertyName: "icon",
          value: "hamburger",
        },
        {
          propertyName: "iconFlipRtl",
          value: true,
        },
        {
          propertyName: "indicator",
          value: true,
        },
        {
          propertyName: "loading",
          value: true,
        },
        {
          propertyName: "scale",
          value: "m",
        },
        {
          propertyName: "textEnabled",
          value: true,
        },
        {
          propertyName: "width",
          value: "full",
        },
        {
          propertyName: "type",
          value: "button",
        },
        {
          propertyName: "selectionAppearance",
          value: "neutral",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-action"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-action"), { display: "flex" });
  });

  describe("focusable", () => {
    focusable(() => mount("calcite-action"));
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-action"));
  });
});
