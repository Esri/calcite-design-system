import { vi, beforeEach, afterEach } from "vitest";

type ConsoleMethod = Extract<keyof Console, "warn" | "error" | "debug" | "info" | "trace" | "log">;

/**
 * Mocks the specified console methods (or "warn" by default) to prevent them from logging to the console during tests.
 *
 * This method should be called within the scope of a test suite (e.g., inside a `describe` block).
 *
 * @param methods - The console methods to mock. Can be a single method or an array of methods.
 */
export function mockConsole(methods: ConsoleMethod | ConsoleMethod[] = "warn"): void {
  methods = Array.isArray(methods) ? methods : [methods];
  const spies: ReturnType<typeof vi.spyOn>[] = [];

  beforeEach(() => {
    methods.forEach((method) => {
      const spy = vi.spyOn(console, method).mockImplementation(() => {});
      spies.push(spy);
    });
  });

  afterEach(() => {
    spies.forEach((spy) => spy.mockRestore());
    spies.length = 0;
  });
}
