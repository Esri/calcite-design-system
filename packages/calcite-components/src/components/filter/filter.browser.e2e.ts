import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { cancelableBehavior } from "../../tests/commonTests/cancelableResource";

describe("filter", () => {
  mockConsole("warn");

  describe("cancelable behavior", () => {
    cancelableBehavior("<calcite-filter>", "filterDebounced");
  });
});
