import { describe } from "vitest";
import { cancelable } from "../../tests/commonTests/browser/cancelableResource";

describe("combobox", () => {
  describe("cancelable behavior", () => {
    cancelable("calcite-combobox");
  });
});
