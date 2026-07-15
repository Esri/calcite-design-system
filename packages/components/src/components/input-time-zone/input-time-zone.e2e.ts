import { describe } from "vitest";
import { labelable } from "../../tests/commonTests";
import { mockConsole } from "../../tests/utils/logging";

/*
 * **Notes**
 *
 * - labelable tests remain in legacy E2E because they use a shared Puppeteer-based common test
 * - behavioral tests live in input-time-zone.time-zone.browser.e2e.tsx and run with vite.time-zone.config.ts
 */

mockConsole();

describe("labelable", () => {
  labelable("calcite-input-time-zone");
});
