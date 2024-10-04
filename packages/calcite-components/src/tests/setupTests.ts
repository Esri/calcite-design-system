/**
 * By default Lumina will fail the test if warnings were emitted.
 * Instead, make Lumina ignore warnings.
 *
 * See https://github.com/Esri/calcite-design-system/issues/10376
 */

import { vi, beforeEach, afterEach } from "vitest";

const originalConsoleWarn = console.warn;

beforeEach(() => {
  console.warn = vi.fn((...rest) => console.log("WARN:", ...rest));
});

afterEach(() => {
  console.warn = originalConsoleWarn;
});
