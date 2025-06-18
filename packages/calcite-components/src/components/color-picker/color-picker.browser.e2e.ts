import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { cancelableBehavior } from "../../tests/commonTests/cancelableResource";

describe("color-picker", () => {
  mockConsole("warn");

  describe("cancelable behavior", () => {
    cancelableBehavior("<calcite-color-picker>", "drawColorControls", "throttled", "canvas");
    cancelableBehavior("<calcite-color-picker>", "resizeCanvas", "throttled", "canvas");
  });
});
