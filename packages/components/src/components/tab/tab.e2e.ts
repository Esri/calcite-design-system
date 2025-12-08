import { describe } from "vitest";
import { themed } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-tab", () => {
  describe("theme", () => {
    describe("default", () => {
      themed("calcite-tab", {
        "--calcite-tab-content-space-y": {
          shadowSelector: `.${CSS.content}`,
          targetProp: "paddingBlock",
        },
      });
    });
  });
});
