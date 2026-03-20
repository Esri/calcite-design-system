import { assert, describe, expect, it } from "vitest";
import { createTestUtils } from "@morev/stylelint-testing-library";
import type { CreateTestRule, CreateTestRuleConfig } from "@morev/stylelint-testing-library";
import plugins from "./src/index.ts";

const { createTestRule, createTestRuleConfig } = createTestUtils({
  testFunctions: { assert, describe, expect, it },
  plugins,
});

globalThis.createTestRule = createTestRule;
globalThis.createTestRuleConfig = createTestRuleConfig;

declare global {
  var createTestRule: CreateTestRule;
  var createTestRuleConfig: CreateTestRuleConfig;
}
