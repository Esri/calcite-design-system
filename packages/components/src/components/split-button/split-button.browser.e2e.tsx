import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";

describe("calcite-split-button", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-split-button"),
      [
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "flipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "placement",
          defaultValue: "bottom-end",
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
          propertyName: "rel",
          defaultValue: undefined,
        },
        {
          propertyName: "target",
          defaultValue: undefined,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-split-button"),
      [
        {
          propertyName: "placement",
          value: "bottom-end",
        },
        {
          propertyName: "download",
          value: true,
        },
        {
          propertyName: "href",
          value: "/",
        },
        {
          propertyName: "rel",
          value: "external",
        },
        {
          propertyName: "target",
          value: "_blank",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-split-button"));
  });
});
