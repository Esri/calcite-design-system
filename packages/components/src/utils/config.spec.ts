import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";
import { defaultConfig, setCalciteConfig, getCalciteConfig, stampVersion } from "./config";

describe("config", () => {
  beforeEach(() => {
    setCalciteConfig(defaultConfig);
  });

  it("has defaults", async () => {
    const config = getCalciteConfig();
    expect(config.focusTrapStack).toHaveLength(0);
    expect(config.logLevel).toBe("info");
  });

  it("allows custom configuration", async () => {
    const customFocusTrapStack = [];

    globalThis.calciteConfig = {
      focusTrapStack: customFocusTrapStack,
    };

    const config = getCalciteConfig();

    expect(config.focusTrapStack).toBe(customFocusTrapStack);
  });

  describe("stampVersion", () => {
    const buildVersion = __CALCITE_VERSION__;

    beforeEach(() => delete globalThis.calciteConfig);

    it("creates global config and stamps the version onto it", async () => {
      // const config = getCalciteConfig();
      stampVersion();
      expect(globalThis.calciteConfig.version).toBe(buildVersion);
    });

    it("stamps the version onto existing config if there's no version present", async () => {
      globalThis.calciteConfig = {};
      // const config = getCalciteConfig();
      stampVersion();
      expect(globalThis.calciteConfig.version).toBe(buildVersion);
    });

    it("bails if version is already stamped onto existing config", async () => {
      const testVersion = "1.33.7";
      globalThis.calciteConfig = { version: testVersion };
      // const config = getCalciteConfig();
      stampVersion();
      expect(globalThis.calciteConfig.version).toBe(testVersion);
    });

    const originalConsoleInfo = console.warn;

    beforeEach(() => {
      console.info = vi.fn();
    });

    afterEach(() => {
      console.info = originalConsoleInfo;
    });

    it("logs info with registered version", async () => {
      expect(console.info).not.toHaveBeenCalled();
      // const config = getCalciteConfig();
      stampVersion();
      expect(console.info).toHaveBeenCalled();
    });
  });
});
