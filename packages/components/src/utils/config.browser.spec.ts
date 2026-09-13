import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FocusTrap } from "focus-trap";
import type { GlobalTestProps } from "../tests/utils/types";
import { type CalciteConfig, clearConfig, defaultConfig, getConfig, stampVersion } from "./config";
import { logger } from "./logger";

type TestGlobal = GlobalTestProps<{ calciteConfig?: Partial<CalciteConfig> }>;

beforeEach(() => {
  clearConfig();
});

it("has defaults", async () => {
  const config = getConfig();

  expect(config.focusTrapStack).toEqual(defaultConfig.focusTrapStack);
  expect(config.logLevel).toBe(defaultConfig.logLevel);
});

it("allows custom configuration", async () => {
  const customFocusTrapStack: FocusTrap[] = [];

  (globalThis as TestGlobal).calciteConfig = {
    focusTrapStack: customFocusTrapStack,
  };

  const config = getConfig();

  expect(config.focusTrapStack).toBe(customFocusTrapStack);
});

describe(stampVersion, () => {
  const buildVersion = __CALCITE_VERSION__;

  beforeEach(() => delete (globalThis as TestGlobal).calciteConfig);

  it("creates global config and stamps the version onto it", async () => {
    stampVersion();
    expect((globalThis as TestGlobal).calciteConfig!.version).toBe(buildVersion);
  });

  it("stamps the version onto existing config if there's no version present", async () => {
    (globalThis as TestGlobal).calciteConfig = {};
    stampVersion();
    expect((globalThis as TestGlobal).calciteConfig!.version).toBe(buildVersion);
  });

  it("bails if version is already stamped onto existing config", async () => {
    const testVersion = "1.33.7";
    (globalThis as TestGlobal).calciteConfig = { version: testVersion };
    stampVersion();
    expect((globalThis as TestGlobal).calciteConfig!.version).toBe(testVersion);
  });

  beforeEach(() => {
    vi.spyOn(logger, "info");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs info with registered version", async () => {
    expect(logger.info).not.toHaveBeenCalled();
    stampVersion();
    expect(logger.info).toHaveBeenCalled();
  });
});
