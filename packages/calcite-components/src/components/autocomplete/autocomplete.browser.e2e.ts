import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { cancelable } from "../../tests/commonTests/browser/cancelableResource";

describe("autocomplete", () => {
  mockConsole("warn");

  describe("cancelable behavior", () => {
    cancelable("calcite-autocomplete");
  });
});
