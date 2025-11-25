import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { getNlsData, requestCache, translationCache } from "./utils";

describe("utils", () => {
  describe("getLocaleData", () => {
    mockConsole();

    beforeEach(() => {
      const fakeData = { fake: "fake data not meant to be checked" };
      globalThis.fetch = vi.fn().mockResolvedValue({ json: async () => fakeData });
    });

    afterEach(() => {
      vi.restoreAllMocks();
      Object.keys(requestCache).forEach((key) => delete requestCache[key]);
      Object.keys(translationCache).forEach((key) => delete translationCache[key]);
    });

    it("defaults to en locale if lang code is invalid", async () => {
      const locale = "invalid-locale";

      await getNlsData(locale);
      expect(requestCache).toHaveProperty("en");
    });

    it("falls to lang code locale if regional code is not found", async () => {
      const locale = "es-UnsupportedRegion";

      await getNlsData(locale);
      expect(requestCache).toHaveProperty("es");
    });

    it("falls to pt-PT lang code locale if regional code is not found", async () => {
      const locale = "pt-UnsupportedRegion";

      await getNlsData(locale);
      expect(requestCache).toHaveProperty("pt-PT");
    });

    it("fetches locale with conventional-cased lang code", async () => {
      const locale = "es";

      await getNlsData(locale);
      expect(requestCache).toHaveProperty("es");
    });

    it("fetches locale with uppercased lang code", async () => {
      const locale = "AR";

      await getNlsData(locale);
      expect(requestCache).toHaveProperty("ar");
    });

    it("fetches locale with lowercased region code", async () => {
      const locale = "zh-cn";

      await getNlsData(locale);
      expect(requestCache).toHaveProperty("zh-CN");
    });

    it("fetches locale with uppercased region code", async () => {
      const locale = "ES-MX";

      await getNlsData(locale);
      expect(requestCache).toHaveProperty("es-MX");
    });

    it("fetches locale with conventional-cased lang and region code", async () => {
      const locale = "pt-PT";

      await getNlsData(locale);
      expect(requestCache).toHaveProperty("pt-PT");
    });
  });
});
