import { describe } from "vitest";
import { accessible, labelable } from "../../tests/commonTests";
import { mockConsole } from "../../tests/utils/logging";

/*
 * **Notes**
 *
 * - accessibility and labelable tests remain in legacy E2E because they use shared Puppeteer-based common tests
 * - behavioral tests live in input-time-zone.time-zone.browser.e2e.tsx and run with vite.time-zone.config.ts
 */

mockConsole();

describe("accessible", () => {
  accessible("calcite-input-time-zone");
});

describe("labelable", () => {
  labelable("calcite-input-time-zone");
});
