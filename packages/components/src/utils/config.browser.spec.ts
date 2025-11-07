import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearConfig, defaultConfig, getConfig, stampVersion } from "./config";

describe("config", () => {
  beforeEach(() => {
    clearConfig();
  });

  it("has defaults", async () => {
    const config = getConfig();

    expect(config.focusTrapStack).toEqual(defaultConfig.focusTrapStack);
    expect(config.logLevel).toBe(defaultConfig.logLevel);
  });

  it("allows custom configuration", async () => {
    const customFocusTrapStack = [];

    globalThis.calciteConfig = {
      focusTrapStack: customFocusTrapStack,
    };

    const config = getConfig();

    expect(config.focusTrapStack).toBe(customFocusTrapStack);
  });

  describe("stampVersion", () => {
    const buildVersion = __CALCITE_VERSION__;

    beforeEach(() => delete globalThis.calciteConfig);

    it("creates global config and stamps the version onto it", async () => {
      stampVersion();
      expect(globalThis.calciteConfig.version).toBe(buildVersion);
    });

    it("stamps the version onto existing config if there's no version present", async () => {
      globalThis.calciteConfig = {};
      stampVersion();
      expect(globalThis.calciteConfig.version).toBe(buildVersion);
    });

    it("bails if version is already stamped onto existing config", async () => {
      const testVersion = "1.33.7";
      globalThis.calciteConfig = { version: testVersion };
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
      stampVersion();
      expect(console.info).toHaveBeenCalled();
    });
  });
});
