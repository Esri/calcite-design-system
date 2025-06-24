import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { cancelable } from "../../tests/commonTests/browser/cancelableResource";

describe("text-area", () => {
  mockConsole("warn");

  describe("cancelable behavior", () => {
    cancelable("calcite-text-area");
  });
});
