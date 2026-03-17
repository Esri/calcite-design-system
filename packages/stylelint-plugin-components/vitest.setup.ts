import { getTestRule, type TestRule } from "vitest-stylelint-utils";

import plugins from "./src/index.ts";

globalThis.testRule = getTestRule({ plugins });

declare global {
  var testRule: TestRule;
}
