import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser";

describe("action-bar", () => {
  describe("cancelable", () => {
    cancelable("calcite-action-bar");
  });
});
