import { getCalciteConfig, type CalciteConfig } from "./config";

describe("config", () => {
  let config: CalciteConfig;

  beforeEach(() => jest.resetModules());

  it("has defaults", async () => {
    config = getCalciteConfig();
    expect(config.focusTrapStack).toHaveLength(0);
  });

  it("allows custom configuration", async () => {
    const customFocusTrapStack = [];

    globalThis.calciteConfig = {
      focusTrapStack: customFocusTrapStack,
    };

    config = getCalciteConfig();

    expect(config.focusTrapStack).toBe(customFocusTrapStack);
  });
});
