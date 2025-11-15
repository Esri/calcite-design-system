import { describe, expect, it, afterEach } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { getLocaleData, translationCache } from "./utils";

describe("utils", () => {
  describe("getLocaleData", () => {
    mockConsole();

    afterEach(() => {
      Object.keys(translationCache).forEach((key) => delete translationCache[key]);
    });

    it("defaults to en locale if lang code is invalid", async () => {
      const locale = "invalid-locale";

      getLocaleData(locale);
      expect(translationCache).toHaveProperty("en");
    });

    it("falls to lang code locale if regional code is not found", async () => {
      const locale = "pt-UnsupportedRegion";

      getLocaleData(locale);
      expect(translationCache).toHaveProperty("pt");
    });

    it("fetches locale with conventional-cased lang code", async () => {
      const locale = "es";

      getLocaleData(locale);
      expect(translationCache).toHaveProperty("es");
    });

    it("fetches locale with uppercased lang code", async () => {
      const locale = "AR";

      getLocaleData(locale);
      expect(translationCache).toHaveProperty("ar");
    });

    it("fetches locale with lowercased region code", async () => {
      const locale = "zh-cn";

      getLocaleData(locale);
      expect(translationCache).toHaveProperty("zh-CN");
    });

    it("fetches locale with uppercased region code", async () => {
      const locale = "ES-MX";

      getLocaleData(locale);
      expect(translationCache).toHaveProperty("es-MX");
    });

    it("fetches locale with conventional-cased lang and region code", async () => {
      const locale = "pt-PT";

      getLocaleData(locale);
      expect(translationCache).toHaveProperty("pt-PT");
    });
  });
});
