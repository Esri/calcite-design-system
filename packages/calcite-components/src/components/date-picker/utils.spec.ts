import { getLocaleData, requestCache } from "./utils";

function fetchFakeData(data: any): () => Promise<any> {
  return () =>
    new Promise((resolve) => {
      resolve({
        json: () => Promise.resolve({ data }),
      });
    });
}

describe("utils", () => {
  describe("getLocaleData", () => {
    beforeEach(() => {
      const fakeData = { fake: "fake data not meant to be checked" };
      global.fetch = jest.fn().mockImplementation(fetchFakeData(fakeData));
    });

    afterEach(() => {
      jest.fn().mockClear();
      Object.keys(requestCache).forEach((key) => delete requestCache[key]);
    });

    it("defaults to en locale if lang code is invalid", async () => {
      const locale = "invalid-locale";

      await getLocaleData(locale);
      expect(requestCache).toHaveProperty("en");
    });

    it("falls to lang code locale if regional code is not found", async () => {
      const locale = "pt-UnsupportedRegion";

      await getLocaleData(locale);
      expect(requestCache).toHaveProperty("pt");
    });

    it("fetches locale with conventional-cased lang code", async () => {
      const locale = "es";

      await getLocaleData(locale);
      expect(requestCache).toHaveProperty("es");
    });

    it("fetches locale with uppercased lang code", async () => {
      const locale = "AR";

      await getLocaleData(locale);
      expect(requestCache).toHaveProperty("ar");
    });

    it("fetches locale with lowercased region code", async () => {
      const locale = "zh-cn";

      await getLocaleData(locale);
      expect(requestCache).toHaveProperty("zh-CN");
    });

    it("fetches locale with uppercased region code", async () => {
      const locale = "ES-MX";

      await getLocaleData(locale);
      expect(requestCache).toHaveProperty("es-MX");
    });

    it("fetches locale with conventional-cased lang and region code", async () => {
      const locale = "pt-PT";

      await getLocaleData(locale);
      expect(requestCache).toHaveProperty("pt-PT");
    });
  });
});
