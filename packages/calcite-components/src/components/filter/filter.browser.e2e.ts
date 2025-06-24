import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser/cancelableResource";

describe("filter", () => {
  describe("cancelable behavior", () => {
    cancelable("calcite-filter");
  });
});
