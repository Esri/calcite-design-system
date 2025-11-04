import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser";

describe("text-area", () => {
  describe("cancelable", () => {
    cancelable("calcite-text-area");
  });
});
