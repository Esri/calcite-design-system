import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { cancelable } from "../../tests/commonTests/cancelableResource";

describe("color-picker", () => {
  mockConsole("warn");

  describe("cancelable behavior", () => {
    cancelable("calcite-color-picker");
  });
});
