import { describe } from "vitest";
import { accessible, themed } from "../../tests/commonTests";

describe("accessible", () => {
  accessible(`<calcite-icon icon="a-z" text-label="sort options"></calcite-icon>`);
});

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
