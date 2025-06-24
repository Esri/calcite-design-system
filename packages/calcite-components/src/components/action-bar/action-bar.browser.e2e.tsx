import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser/cancelableResource";

describe("action-bar", () => {
  describe("cancelable behavior", () => {
    cancelable("calcite-action-bar");
  });
});
