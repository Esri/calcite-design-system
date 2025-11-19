import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";

describe("calcite-list-item-group", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-list-item-group"),
      [
        {
          propertyName: "heading",
          defaultValue: undefined,
        },
        {
          propertyName: "disabled",
          defaultValue: false,
        },
        {
          propertyName: "filterHidden",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });
});
