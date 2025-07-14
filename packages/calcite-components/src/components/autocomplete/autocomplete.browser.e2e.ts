import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser";

describe("autocomplete", () => {
  describe("cancelable", () => {
    cancelable("calcite-autocomplete");
  });
});
