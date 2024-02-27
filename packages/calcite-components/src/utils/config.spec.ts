import type { CalciteConfig } from "./config";

describe("config", () => {
  let config: CalciteConfig;

  /**
   * Need to load the config at runtime to allow test to specify custom configuration if needed.
   */
  async function loadConfig(): Promise<CalciteConfig> {
    return import("./config");
  }

  beforeEach(() => jest.resetModules());

  it("has defaults", async () => {
    config = await loadConfig();
    expect(config.focusTrapStack).toHaveLength(0);
  });

  it("allows custom configuration", async () => {
    const customFocusTrapStack = [];

    globalThis.calciteConfig = {
      focusTrapStack: customFocusTrapStack,
    };

    config = await loadConfig();

    expect(config.focusTrapStack).toBe(customFocusTrapStack);
  });
});
