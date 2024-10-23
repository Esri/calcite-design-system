/**
 * By default Lumina will fail the test if warnings were emitted.
 * Instead, make Lumina ignore warnings.
 *
 * See https://github.com/Esri/calcite-design-system/issues/10376
 */

import { vi, beforeEach, afterEach } from "vitest";

const originalConsoleWarn = console.warn;

const reported = new Set();

beforeEach(() => {
  console.warn = vi.fn((...args) => {
    /** Only log once if component is triggering re-render in updated() */
    if (typeof args[0] === "string" && args[0].includes("scheduled an update (generally because a property was set)")) {
      if (reported.has(args[0])) {
        return;
      }
      reported.add(args[0]);
    }
    originalConsoleWarn(...args);
  });
});

afterEach(() => {
  console.warn = originalConsoleWarn;
});
