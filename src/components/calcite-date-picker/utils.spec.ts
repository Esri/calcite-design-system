import { getLocaleData, requestCache, translationCache } from "./utils";
import { getAssetPath } from "@stencil/core";

function setupFetchStub(data: any) {
  return function fetchStub(): Promise<any> {
    return new Promise((resolve) => {
      resolve({
        json: () => Promise.resolve({ data })
      });
    });
  };
}

describe("utils", () => {
  describe("getLocaleData", () => {
    const fakeData = { fake: "fake data not meant to be checked" };
    global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData));

    it("defaults to en locale if lang code is invalid", async () => {
      const locale = "american";
      await getLocaleData(locale);
      const localeData = await requestCache;

      expect(localeData).toHaveProperty("en");
      delete localeData.en;
      jest.fn().mockClear();
    });

    it("fetches locale with conventional-cased lang code", async () => {
      const locale = "es";
      await getLocaleData(locale);
      const localeData = await requestCache;

      expect(localeData).toHaveProperty("es");
      delete localeData.es;
      jest.fn().mockClear();
    });

    it("fetches locale with uppercased lang code", async () => {
      const locale = "AR";
      await getLocaleData(locale);
      const localeData = await requestCache;

      expect(localeData).toHaveProperty("ar");
      delete localeData.ar;
      jest.fn().mockClear();
    });

    it("fetches locale with lowercased region code", async () => {
      const locale = "zh-cn";
      await getLocaleData(locale);
      const localeData = await requestCache;

      expect(localeData).toHaveProperty("zh-CN");
      delete localeData["zh-CN"];
      jest.fn().mockClear();
    });

    it("fetches locale with uppercased region code", async () => {
      const locale = "ES-MX";
      await getLocaleData(locale);
      const localeData = await requestCache;

      expect(localeData).toHaveProperty("es-MX");
      delete localeData["es-MX"];
      jest.fn().mockClear();
    });

    it("fetches locale with conventional-cased lang and region code", async () => {
      const locale = "pt-PT";
      await getLocaleData(locale);
      const localeData = await requestCache;

      expect(localeData).toHaveProperty("pt-PT");
      delete localeData["pt-PT"];
      jest.fn().mockClear();
    });
  });
});
