import { describe } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { cancelable } from "../../tests/commonTests/cancelableResource";

describe("combobox", () => {
  mockConsole("warn");

  describe("cancelable behavior", () => {
    cancelable("calcite-combobox");
  });
});
