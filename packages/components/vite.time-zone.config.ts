import { defineConfig } from "vite";
import { playwright } from "@vitest/browser-playwright";
import { createConfig } from "./vite.config";

const browserTimeZone = process.env.BROWSER_TIME_ZONE;

const allDirsAndFiles = "**/*";
const specAndE2EFileExtensions = `{e2e,spec}.?(c|m)[jt]s?(x)`;

// input-time-zone tests run separate from main tests due to Vitest not supporting dynamic time zone changes
const timeZoneBrowserTestMatch = `${allDirsAndFiles}.time-zone.browser.${specAndE2EFileExtensions}`;

export default defineConfig(
  createConfig({
    puppeteerTestingEnabled: false,
    test: {
      browser: {
        enabled: true,
        provider: playwright({
          contextOptions: browserTimeZone
            ? {
                timezoneId: browserTimeZone,
              }
            : undefined,
          launchOptions: {
            channel: "chromium",
          },
        }),
        screenshotFailures: false,
        headless: process.env.HEADLESS !== "false",
        ui: false,
      },
      include: [timeZoneBrowserTestMatch],
      passWithNoTests: true,
      setupFiles: "./src/tests/browser/setup.ts",
    },
  }),
);
