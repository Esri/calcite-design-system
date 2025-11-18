import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";

describe("calcite-fab", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-fab"),
      [
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "appearance",
          defaultValue: "solid",
        },
      ],
    );
  });
});
