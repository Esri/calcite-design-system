import { describe } from "vitest";
import { themed } from "../../tests/commonTests";

describe("theme", () => {
  describe("default", () => {
    themed("calcite-icon", {
      "--calcite-icon-color": {
        targetProp: "color",
      },
    });
  });
  describe("deprecated", () => {
    themed("calcite-icon", {
      "--calcite-ui-icon-color": {
        targetProp: "color",
      },
    });
  });
});
