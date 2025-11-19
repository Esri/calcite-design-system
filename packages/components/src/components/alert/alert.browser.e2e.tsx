import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-alert", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-alert"),
      [
        {
          propertyName: "autoCloseDuration",
          defaultValue: "medium",
        },
        {
          propertyName: "embedded",
          defaultValue: false,
        },
        {
          propertyName: "queue",
          defaultValue: "last",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-alert"),
      [
        {
          propertyName: "queue",
          value: "last",
        },
      ],
    );
  });
});
