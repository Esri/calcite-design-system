import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser";

describe("color-picker", () => {
  describe("cancelable", () => {
    cancelable("calcite-color-picker");
  });
});
