import { describe } from "vitest";
import { accessible } from "../../tests/commonTests";

describe("accessible", () => {
  accessible("<calcite-focus-trap><button>inside</button></calcite-focus-trap>");
});
