import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser/cancelableResource";

describe("list", () => {
  describe("cancelable behavior", () => {
    cancelable("calcite-list");
  });
});
