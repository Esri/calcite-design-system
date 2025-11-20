import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden } from "../../tests/commonTests/browser";

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

  describe("honors hidden attribute", () => {
    hidden(() => mount(<calcite-alert open />));
  });
});
