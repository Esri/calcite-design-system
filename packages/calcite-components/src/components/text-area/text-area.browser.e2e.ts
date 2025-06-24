import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser/cancelableResource";

describe("text-area", () => {
  describe("cancelable behavior", () => {
    cancelable("calcite-text-area");
  });
});
