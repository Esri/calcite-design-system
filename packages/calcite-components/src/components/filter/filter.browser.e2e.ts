import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { debounceBehavior } from "../../tests/commonTests/cancelableResource";

describe("action-bar", () => {
  mockConsole("warn");

  describe("debounce behavior", () => {
    debounceBehavior("<calcite-filter>", "filterDebounced");
  });
});
