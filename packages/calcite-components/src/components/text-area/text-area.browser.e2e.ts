import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { cancelableBehavior } from "../../tests/commonTests/cancelableResource";

describe("text-area", () => {
  mockConsole("warn");

  describe("cancelable behavior", () => {
    cancelableBehavior("<calcite-text-area>", "updateSizeToAuto");
  });
});
