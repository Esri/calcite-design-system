describe("config", () => {
  let config: typeof import("./config");

  /**
   * Need to load the config at runtime to allow test to specify custom configuration if needed.
   */
  async function loadConfig(): Promise<typeof import("./config")> {
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

  describe("stampVersion", () => {
    const calciteVersionPreBuildPlaceholder = "__CALCITE_VERSION__";

    beforeEach(() => delete globalThis.calciteConfig);

    it("creates global config and stamps the version onto it", async () => {
      config = await loadConfig();
      config.stampVersion();
      expect(globalThis.calciteConfig.version).toBe(calciteVersionPreBuildPlaceholder);
    });

    it("stamps the version onto existing config if there's no version present", async () => {
      globalThis.calciteConfig = {};
      config = await loadConfig();
      config.stampVersion();
      expect(globalThis.calciteConfig.version).toBe(calciteVersionPreBuildPlaceholder);
    });

    it("bails if version is already stamped onto existing config", async () => {
      const testVersion = "1.33.7";
      globalThis.calciteConfig = { version: testVersion };
      config = await loadConfig();
      config.stampVersion();
      expect(globalThis.calciteConfig.version).toBe(testVersion);
    });

    it("logs info with registered version", async () => {
      expect(console.info).not.toHaveBeenCalled();
      config = await loadConfig();
      config.stampVersion();
      expect(console.info).toHaveBeenCalled();
    });
  });
});
