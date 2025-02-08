// @ts-strict-ignore
import { BigDecimal, isValidNumber, sanitizeExponentialNumberString } from "./number";

export const defaultLocale = "en";

export const t9nLocales = [
  "ar",
  "bg",
  "bs",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  defaultLocale,
  "es",
  "et",
  "fi",
  "fr",
  "he",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "lt",
  "lv",
  "no",
  "nl",
  "pl",
  "pt-BR",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW",
];

export const locales = [
  "ar",
  "bg",
  "bs",
  "ca",
  "cs",
  "da",
  "de",
  "de-AT",
  "de-CH",
  "el",
  defaultLocale,
  "en-AU",
  "en-CA",
  "en-GB",
  "es",
  "es-MX",
  "et",
  "fi",
  "fr",
  "fr-CH",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "it-CH",
  "ja",
  "ko",
  "lt",
  "lv",
  "mk",
  "no",
  "nl",
  "pl",
  "pt",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW",
];

export const numberingSystems = ["arab", "arabext", "latn"] as const;

export const supportedLocales = [...new Set([...t9nLocales, ...locales])] as const;

export type NumberingSystem = (typeof numberingSystems)[number];

export type SupportedLocale = (typeof supportedLocales)[number];

const isNumberingSystemSupported = (numberingSystem: string): numberingSystem is NumberingSystem =>
  numberingSystems.includes(numberingSystem as NumberingSystem);

const browserNumberingSystem = new Intl.NumberFormat().resolvedOptions().numberingSystem;

// for consistent browser behavior, we normalize numberingSystem to prevent the browser-inferred value
// see https://github.com/Esri/calcite-design-system/issues/3079#issuecomment-1168964195 for more info
export const defaultNumberingSystem =
  browserNumberingSystem === "arab" || !isNumberingSystemSupported(browserNumberingSystem)
    ? "latn"
    : browserNumberingSystem;

export const getSupportedNumberingSystem = (numberingSystem: string): NumberingSystem =>
  isNumberingSystemSupported(numberingSystem) ? numberingSystem : defaultNumberingSystem;

/**
 * Gets the locale that best matches the context.
 *
 * @param locale – the BCP 47 locale code
 * @param context - specifies whether the locale code should match in the context of CLDR or T9N (translation)
 */
export function getSupportedLocale(locale: string, context: "cldr" | "t9n" = "cldr"): SupportedLocale {
  const contextualLocales = context === "cldr" ? locales : t9nLocales;

  if (!locale) {
    return defaultLocale;
  }

  if (contextualLocales.includes(locale)) {
    return locale;
  }

  locale = locale.toLowerCase();

  // we support both 'nb' and 'no' (BCP 47) for Norwegian but only `no` has corresponding bundle
  if (locale === "nb") {
    return "no";
  }

  // we use `pt-BR` as it will have the same translations as `pt`, which has no corresponding bundle
  if (context === "t9n" && locale === "pt") {
    return "pt-BR";
  }

  if (locale.includes("-")) {
    locale = locale.replace(/(\w+)-(\w+)/, (_match, language, region) => `${language}-${region.toUpperCase()}`);

    if (!contextualLocales.includes(locale)) {
      locale = locale.split("-")[0];
    }
  }

  // we can `zh-CN` as base translation for chinese locales which has no corresponding bundle.
  if (locale === "zh") {
    return "zh-CN";
  }

  if (!contextualLocales.includes(locale)) {
    console.warn(
      `Translations for the "${locale}" locale are not available and will fall back to the default, English (en).`,
    );
    return defaultLocale;
  }

  return locale;
}

/**
 * Gets the locale that best matches the context for date formatting.
 *
 * Intl date formatting has some quirks with certain locales. This handles those quirks by mapping a locale to another for date formatting.
 *
 * See https://github.com/Esri/calcite-design-system/issues/9387
 *
 * @param locale – the BCP 47 locale code
 * @returns {string} a BCP 47 locale code
 */
export function getDateFormatSupportedLocale(locale: string): string {
  switch (locale) {
    case "it-CH":
      return "de-CH";
    case "bs":
      return "bs-Cyrl";
    default:
      return locale;
  }
}

export interface NumberStringFormatOptions extends Intl.NumberFormatOptions {
  numberingSystem: NumberingSystem;
  locale: string;
}

/** This util formats and parses numbers for localization */
export class NumberStringFormat {
  /**
   * The actual group separator for the specified locale.
   * White-space group separators are changed to the non-breaking space (nbsp) unicode character.
   * so we replace them with a normal <SPACE>.
   */
  private _actualGroup: string;

  /** the corrected group separator */
  private _group: string;

  get group(): string {
    return this._group;
  }

  private _decimal: string;

  get decimal(): string {
    return this._decimal;
  }

  private _minusSign: string;

  get minusSign(): string {
    return this._minusSign;
  }

  private _digits: Array<string>;

  get digits(): Array<string> {
    return this._digits;
  }

  private _getDigitIndex;

  private _numberFormatter: Intl.NumberFormat;

  get numberFormatter(): Intl.NumberFormat {
    return this._numberFormatter;
  }

  private _numberFormatOptions: NumberStringFormatOptions;

  get numberFormatOptions(): NumberStringFormatOptions {
    return this._numberFormatOptions;
  }

  /** numberFormatOptions needs to be set before localize/delocalize is called to ensure the options are up to date */
  set numberFormatOptions(options: NumberStringFormatOptions) {
    options.locale = getSupportedLocale(options?.locale);
    options.numberingSystem = getSupportedNumberingSystem(options?.numberingSystem);

    if (
      // No need to create the formatter if `locale` and `numberingSystem`
      // are the default values and `numberFormatOptions` has not been set
      (!this._numberFormatOptions &&
        options.locale === defaultLocale &&
        options.numberingSystem === defaultNumberingSystem &&
        // don't skip initialization if any options besides locale/numberingSystem are set
        Object.keys(options).length === 2) ||
      // cache formatter by only recreating when options change
      JSON.stringify(this._numberFormatOptions) === JSON.stringify(options)
    ) {
      return;
    }

    this._numberFormatOptions = options;

    this._numberFormatter = new Intl.NumberFormat(
      this._numberFormatOptions.locale,
      this._numberFormatOptions as Intl.NumberFormatOptions,
    );

    this._digits = [
      ...new Intl.NumberFormat(this._numberFormatOptions.locale, {
        useGrouping: false,
        numberingSystem: this._numberFormatOptions.numberingSystem,
      } as Intl.NumberFormatOptions).format(9876543210),
    ].reverse();

    const index = new Map(this._digits.map((d, i) => [d, i]));

    // numberingSystem is parsed to return consistent decimal separator across browsers.
    const parts = new Intl.NumberFormat(this._numberFormatOptions.locale, {
      numberingSystem: this._numberFormatOptions.numberingSystem,
    } as Intl.NumberFormatOptions).formatToParts(-12345678.9);

    this._actualGroup = parts.find((d) => d.type === "group").value;
    // change whitespace group separators to the unicode non-breaking space (nbsp)
    this._group = this._actualGroup.trim().length === 0 || this._actualGroup == " " ? "\u00A0" : this._actualGroup;
    this._decimal = parts.find((d) => d.type === "decimal").value;
    this._minusSign = parts.find((d) => d.type === "minusSign").value;
    this._getDigitIndex = (d: string) => index.get(d);
  }

  delocalize = (numberString: string): string =>
    // For performance, (de)localization is skipped if the formatter isn't initialized.
    // In order to localize/delocalize, e.g. when lang/numberingSystem props are not default values,
    // `numberFormatOptions` must be set in a component to create and cache the formatter.
    this._numberFormatOptions
      ? sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string =>
          nonExpoNumString
            .replace(new RegExp(`[${this._minusSign}]`, "g"), "-")
            .replace(new RegExp(`[${this._group}]`, "g"), "")
            .replace(new RegExp(`[${this._decimal}]`, "g"), ".")
            .replace(new RegExp(`[${this._digits.join("")}]`, "g"), this._getDigitIndex),
        )
      : numberString;

  localize = (numberString: string): string =>
    this._numberFormatOptions
      ? sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string =>
          isValidNumber(nonExpoNumString.trim())
            ? new BigDecimal(nonExpoNumString.trim())
                .format(this)
                .replace(new RegExp(`[${this._actualGroup}]`, "g"), this._group)
            : nonExpoNumString,
        )
      : numberString;
}

export const numberStringFormatter = new NumberStringFormat();

export type LocaleDateTimeOptionKey = string;

/**
 * Exported for testing purposes only.
 *
 * @private
 */
export let dateTimeFormatCache: Map<LocaleDateTimeOptionKey, Intl.DateTimeFormat>;

/**
 * Used to ensure all cached formats are for the same locale.
 *
 * @private
 */
let previousLocaleUsedForCaching: string;

/**
 * Generates a cache key for date time format lookups.
 *
 * @private
 */
function buildDateTimeFormatCacheKey(options: Intl.DateTimeFormatOptions = {}): string {
  return Object.entries(options)
    .sort(([key1], [key2]) => key1.localeCompare(key2))
    .map((keyValue) => `${keyValue[0]}-${keyValue[1]}`)
    .flat()
    .join(":");
}

/**
 * Returns an instance of Intl.DateTimeFormat and reuses it if requested with the same locale and options.
 *
 * **Note**: the cache will be cleared if a different locale is provided
 *
 * @private
 */
export function getDateTimeFormat(locale: string, options?: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  locale = getSupportedLocale(locale);

  if (!dateTimeFormatCache) {
    dateTimeFormatCache = new Map();
  }

  if (previousLocaleUsedForCaching !== locale) {
    dateTimeFormatCache.clear();
    previousLocaleUsedForCaching = locale;
  }

  const key = buildDateTimeFormatCacheKey(options);
  const cached = dateTimeFormatCache.get(key);

  if (cached) {
    return cached;
  }

  const format = new Intl.DateTimeFormat(locale, options);
  dateTimeFormatCache.set(key, format);

  return format;
}
