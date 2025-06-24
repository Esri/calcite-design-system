import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser/cancelableResource";

describe("block-group", () => {
  describe("cancelable behavior", () => {
    cancelable("calcite-block-group");
  });
});
