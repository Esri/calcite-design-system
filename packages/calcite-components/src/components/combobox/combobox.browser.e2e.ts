import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { cancelableBehavior } from "../../tests/commonTests/cancelableResource";

describe("combobox", () => {
  mockConsole("warn");

  describe("cancelable behavior", () => {
    cancelableBehavior("<calcite-combobox>", "filterItems");
  });
});
