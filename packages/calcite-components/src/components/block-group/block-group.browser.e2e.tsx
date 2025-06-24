import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { cancelable } from "../../tests/commonTests/cancelableResource";

describe("block-group", () => {
  mockConsole("warn");

  describe("cancelable behavior", () => {
    cancelable("calcite-block-group");
  });
});
