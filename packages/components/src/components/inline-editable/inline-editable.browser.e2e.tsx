import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults } from "../../tests/commonTests/browser";

describe("calcite-inline-editable", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-inline-editable"),
      [
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });
});
