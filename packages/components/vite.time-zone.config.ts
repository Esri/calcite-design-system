import { defineConfig } from "vite";
import { playwright } from "@vitest/browser-playwright";
import type { BrowserInstanceOption } from "vitest/node";
import { createConfig } from "./vite.config";
import { timeZoneTestSuites } from "./src/tests/time-zone";

const browserTimeZone = process.env.BROWSER_TIME_ZONE;
const includesByTimeZone = new Map<string, Set<string>>();

for (const { include, timeZones } of timeZoneTestSuites) {
  for (const timeZone of timeZones) {
    const includes = includesByTimeZone.get(timeZone) ?? new Set<string>();
    include.forEach((pattern) => includes.add(pattern));
    includesByTimeZone.set(timeZone, includes);
  }
}

if (browserTimeZone !== undefined && !includesByTimeZone.has(browserTimeZone)) {
  throw new Error(
    `Unsupported BROWSER_TIME_ZONE "${browserTimeZone}". Expected one of: ${[...includesByTimeZone.keys()].join(", ")}.`,
  );
}

const instances: BrowserInstanceOption[] = [...includesByTimeZone]
  .filter(([timeZone]) => browserTimeZone === undefined || timeZone === browserTimeZone)
  .map(([timeZone, include]) => ({
    browser: "chromium",
    name: `time-zone:${timeZone}`,
    include: [...include],
    provider: playwright({ contextOptions: { timezoneId: timeZone } }),
    provide: { timeZone },
  }));

export default defineConfig({
  ...createConfig({
    puppeteerTestingEnabled: false,
    test: {
      browser: {
        enabled: true,
        instances,
        screenshotFailures: false,
        headless: process.env.HEADLESS !== "false",
        ui: false,
      },
      include: [],
      // Dedicated/CI runs must find tests; aggregate commands allow empty lanes for component filters.
      passWithNoTests: false,
      setupFiles: ["./src/tests/setup.ts", "./src/tests/setup.time-zone.ts"],
    },
  }),
  // CI runs the main and timezone browser lanes concurrently.
  cacheDir: "node_modules/.pnpm/.vite/time-zone",
  optimizeDeps: {
    // The root include is empty; scan the instances' test files before starting browser sessions.
    entries: timeZoneTestSuites.flatMap(({ include }) => include),
  },
});
