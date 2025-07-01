import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("filter", () => {
  describe("cancelable", () => {
    mockConsole();
    cancelable("calcite-filter");
  });
});
