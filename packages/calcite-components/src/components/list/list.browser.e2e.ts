import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { cancelableBehavior } from "../../tests/commonTests/cancelableResource";

describe("list", () => {
  mockConsole("warn");

  describe("cancelable behavior", () => {
    cancelableBehavior("<calcite-list>", "updateListItems");
  });
});
