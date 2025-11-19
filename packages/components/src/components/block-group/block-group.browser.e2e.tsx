import { mount } from "@arcgis/lumina-compiler/testing";
import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { cancelable, defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-block-group", () => {
  mockConsole();

  describe("cancelable", () => {
    cancelable("calcite-block-group");
  });

  describe("defaults", () => {
    defaults(
      () => mount("calcite-block-group"),
      [
        {
          propertyName: "disabled",
          defaultValue: false,
        },
        {
          propertyName: "dragEnabled",
          defaultValue: false,
        },
        {
          propertyName: "group",
          defaultValue: undefined,
        },
        {
          propertyName: "label",
          defaultValue: undefined,
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
          propertyName: "sortDisabled",
          defaultValue: false,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-block-group"),
      [
        {
          propertyName: "disabled",
          value: true,
        },
        {
          propertyName: "dragEnabled",
          value: true,
        },
        {
          propertyName: "group",
          value: "test",
        },
        {
          propertyName: "loading",
          value: true,
        },
        {
          propertyName: "sortDisabled",
          value: true,
        },
        {
          propertyName: "scale",
          value: "m",
        },
      ],
    );
  });
});
