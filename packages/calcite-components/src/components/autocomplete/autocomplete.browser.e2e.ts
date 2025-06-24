import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser/cancelableResource";

describe("autocomplete", () => {
  describe("cancelable behavior", () => {
    cancelable("calcite-autocomplete");
  });
});
