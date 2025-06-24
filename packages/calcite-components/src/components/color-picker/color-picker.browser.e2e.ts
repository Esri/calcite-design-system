import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser/cancelableResource";

describe("color-picker", () => {
  describe("cancelable behavior", () => {
    cancelable("calcite-color-picker");
  });
});
