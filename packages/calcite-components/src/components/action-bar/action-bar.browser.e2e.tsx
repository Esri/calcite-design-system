import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("action-bar", () => {
  describe("cancelable", () => {
    mockConsole();
    cancelable("calcite-action-bar");
  });
});
