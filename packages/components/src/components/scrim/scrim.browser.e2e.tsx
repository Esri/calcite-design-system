import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-scrim", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-scrim"),
      [
        {
          propertyName: "loading",
          defaultValue: false,
        },
      ],
    );
  });
});
