import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden } from "../../tests/commonTests/browser";

describe("calcite-link", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-link"),
      [
        {
          propertyName: "download",
          defaultValue: false,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-link"));
  });
});
