import { describe } from "vitest";
import { labelable } from "../../tests/commonTests";
import { ComponentTestTokens, themed } from "../../tests/commonTests/themed";
import { html } from "../../../support/formatting";
import { CSS as ComboboxCSS } from "../combobox/resources";
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

describe("theme", () => {
  const inputTimeZoneTokens: ComponentTestTokens = {
    "--calcite-input-time-zone-corner-radius": [
      {
        shadowSelector: "calcite-combobox",
        targetProp: "--calcite-combobox-corner-radius",
      },
      {
        shadowSelector: `calcite-combobox >>> .${ComboboxCSS.wrapper}`,
        targetProp: "borderRadius",
      },
    ],
  };

  themed(html`<calcite-input-time-zone></calcite-input-time-zone>`, inputTimeZoneTokens);
});
