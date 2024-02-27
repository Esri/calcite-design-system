import {
  dateTimeFormatCache,
  defaultLocale,
  defaultNumberingSystem,
  getDateTimeFormat,
  getSupportedLocale,
  locales,
  numberingSystems,
  NumberStringFormatOptions,
  numberStringFormatter,
} from "./locale";

describe("NumberStringFormat", () => {
  it("NumberFormat formatter is not initialized until necessary", () => {
    const num = "123.456";

    // should still work with options set
    expect(numberStringFormatter.numberFormatOptions).toBeUndefined();
    expect(numberStringFormatter.delocalize(numberStringFormatter.localize(num))).toBe(num);

    // adding the default locale/numberingSystem should
    // not create the formatter
    numberStringFormatter.numberFormatOptions = {
      locale: defaultLocale,
      numberingSystem: defaultNumberingSystem,
    };
    expect(numberStringFormatter.numberFormatter).toBeUndefined();
    expect(numberStringFormatter.numberFormatOptions).toBeUndefined();

    // setting a non-locale/numberingSystem option creates the formatter
    // with the default locale/numberingSystem values
    numberStringFormatter.numberFormatOptions = {
      useGrouping: true,
    } as NumberStringFormatOptions;

    expect(numberStringFormatter.numberFormatter).toBeDefined();
    expect(numberStringFormatter.numberFormatOptions.numberingSystem).toBe(defaultNumberingSystem);
    expect(numberStringFormatter.numberFormatOptions.locale).toBe(defaultLocale);
  });

  describe("locales", () => {
    locales.forEach((locale) => {
      it(`integers localize and delocalize in "${locale}"`, () => {
        const numberString = "555";
        numberStringFormatter.numberFormatOptions = {
          locale,
          numberingSystem: "latn",
          useGrouping: false,
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`negative numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "-123";
        numberStringFormatter.numberFormatOptions = {
          locale,
          numberingSystem: "latn",
          useGrouping: false,
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`locale: floating point numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "4.321";
        numberStringFormatter.numberFormatOptions = {
          locale,
          numberingSystem: "latn",
          useGrouping: false,
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`exponential numbers localize and delocalize in "${locale}"`, () => {
        const numberString = "2.5e-3";
        numberStringFormatter.numberFormatOptions = {
          locale,
          numberingSystem: "latn",
          useGrouping: false,
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`numbers with group separators localize and delocalize in "${locale}"`, () => {
        const numberString = "1234567890";
        numberStringFormatter.numberFormatOptions = {
          locale,
          // the group separator is different in arabic depending on the numberingSystem
          numberingSystem: locale === "ar" ? "arab" : "latn",
          useGrouping: true,
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });

      it(`floating point numbers with group separators localize and delocalize in "${locale}"`, () => {
        const numberString = "12345678.0123456789";
        numberStringFormatter.numberFormatOptions = {
          locale,
          // the group separator is different in arabic depending on the numberingSystem
          numberingSystem: locale === "ar" ? "arab" : "latn",
          useGrouping: true,
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });
    });
  });

  describe("numberingSystems", () => {
    numberingSystems.forEach((numberingSystem) => {
      const numberString = "0.0123456789";
      it(`floating point numbers with group separators localize and delocalize in "${numberingSystem}"`, () => {
        numberStringFormatter.numberFormatOptions = {
          locale: numberingSystem === "arab" ? "ar" : "en",
          numberingSystem,
          useGrouping: true,
        };
        const localizedNumberString = numberStringFormatter.localize(numberString);
        const delocalizedNumberString = numberStringFormatter.delocalize(localizedNumberString);
        expect(delocalizedNumberString).toBe(numberString);
      });
    });
  });
});

describe("getDateTimeFormat()", () => {
  beforeEach(() => dateTimeFormatCache?.clear());

  it("generates an instance of DateTimeFormat by locale", () => {
    const enDateTimeFormat = getDateTimeFormat("en");
    expect(enDateTimeFormat).toBeInstanceOf(Intl.DateTimeFormat);
    expect(enDateTimeFormat.resolvedOptions().locale).toBe("en");

    const esDateTimeFormat = getDateTimeFormat("es");
    expect(esDateTimeFormat).toBeInstanceOf(Intl.DateTimeFormat);
    expect(esDateTimeFormat.resolvedOptions().locale).toBe("es");
  });

  it("supports passing options", () => {
    const options: Intl.DateTimeFormatOptions = { dateStyle: "full", numberingSystem: "latn" }; // using a subset and assuming other props will work the same
    const enDateTimeFormat = getDateTimeFormat("en", options);

    for (const [key, value] of Object.entries(options)) {
      expect(enDateTimeFormat.resolvedOptions()[key]).toBe(value);
    }
  });

  it("returns the same instance when given the same parameters", () => {
    const simpleEnDateTimeFormat = getDateTimeFormat("en");

    expect(simpleEnDateTimeFormat).toBe(getDateTimeFormat("en"));
    expect(dateTimeFormatCache.size).toBe(1);

    const options: Intl.DateTimeFormatOptions = { dateStyle: "full" };
    const customizedEnDateTimeFormat = getDateTimeFormat("en", options);

    expect(customizedEnDateTimeFormat).toBe(getDateTimeFormat("en", options));
    expect(simpleEnDateTimeFormat).not.toBe(customizedEnDateTimeFormat);
    expect(dateTimeFormatCache.size).toBe(2);

    const simpleEsDateTimeFormat = getDateTimeFormat("es");

    expect(simpleEsDateTimeFormat).toBe(getDateTimeFormat("es"));
    expect(simpleEsDateTimeFormat).not.toBe(simpleEnDateTimeFormat);
    expect(dateTimeFormatCache.size).toBe(1);

    const customizedEsDateTimeFormat = getDateTimeFormat("es", options);

    expect(customizedEsDateTimeFormat).toBe(getDateTimeFormat("es", options));
    expect(simpleEsDateTimeFormat).not.toBe(customizedEsDateTimeFormat);
    expect(dateTimeFormatCache.size).toBe(2);
  });
});

describe("getSupportedLocale", () => {
  function assertAllContexts(locale: string, expectedLocale: string): void {
    expect(getSupportedLocale(locale, "cldr")).toBe(expectedLocale);
    expect(getSupportedLocale(locale, "t9n")).toBe(expectedLocale);
  }

  it("returns `en` if there is no locale", () => {
    assertAllContexts(null, "en");
  });

  it("falls back to `en` if the language tag or language + region tag isn't supported", () => {
    assertAllContexts("zz", "en");
    assertAllContexts("zz-ZZ", "en");
  });

  it("falls back to the language tag if the language + region tag isn't supported", () => {
    assertAllContexts("es-AR", "es");
    assertAllContexts("es-AR", "es");
  });

  it("matches locale with subregion if supported", () => {
    // using pt-PT since it is supported in both cldr and t9n locale lists
    assertAllContexts("pt-PT", "pt-PT");
  });

  it("matches regardless of casing", () => {
    assertAllContexts("pt-pt", "pt-PT");
    assertAllContexts("PT-PT", "pt-PT");

    assertAllContexts("es-ar", "es");
    assertAllContexts("ES-AR", "es");
  });

  describe("locale mappings", () => {
    it("maps `nb` to `no`", () => {
      assertAllContexts("nb", "no");
    });

    it("maps `zh` to `zh-CN`", () => {
      assertAllContexts("zh", "zh-CN");
    });

    it("maps `pt` to `pt-BR` with t9n context", () => {
      expect(getSupportedLocale("pt", "t9n")).toBe("pt-BR");
      expect(getSupportedLocale("pt", "cldr")).toBe("pt");
    });
  });
});
