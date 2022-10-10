import { sanitizeDecimalString, sanitizeExponentialNumberString, isValidNumber, BigDecimal } from "./number";
import { GlobalAttrComponent } from "./globalAttributes";

export const locales = [
  "ar",
  "bg",
  "bs",
  "ca",
  "cs",
  "da",
  "de",
  "de-CH",
  "el",
  "en",
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
  "nb",
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
  "zh-TW"
];

export const numberingSystems = [
  "arab",
  "arabext",
  "bali",
  "beng",
  "deva",
  "fullwide",
  "gujr",
  "guru",
  "hanidec",
  "khmr",
  "knda",
  "laoo",
  "latn",
  "limb",
  "mlym",
  "mong",
  "mymr",
  "orya",
  "tamldec",
  "telu",
  "thai",
  "tibt"
] as const;

export type NumberingSystem = typeof numberingSystems[number];

const allDecimalsExceptLast = new RegExp(`[.](?=.*[.])`, "g");
const everythingExceptNumbersDecimalsAndMinusSigns = new RegExp("[^0-9-.]", "g");
const defaultGroupSeparator = new RegExp(",", "g");

const browserNumberingSystem = new Intl.NumberFormat().resolvedOptions().numberingSystem;
export const defaultNumberingSystem =
  browserNumberingSystem === "arab" || !isNumberingSystemSupported(browserNumberingSystem)
    ? "latn"
    : browserNumberingSystem;

export function isNumberingSystemSupported(numberingSystem: string): numberingSystem is NumberingSystem {
  return numberingSystems.includes(numberingSystem as NumberingSystem);
}

export function createLocaleNumberFormatter(
  locale: string,
  numberingSystem = defaultNumberingSystem,
  signDisplay: "auto" | "never" | "always" | "exceptZero" = "auto"
): Intl.NumberFormat {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
    numberingSystem: isNumberingSystemSupported(numberingSystem) ? numberingSystem : defaultNumberingSystem,
    signDisplay
  } as Intl.NumberFormatOptions);
}

export function delocalizeNumberString(numberString: string, locale: string): string {
  return sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string => {
    const delocalizedNumberString = nonExpoNumString
      .replace(getMinusSign(locale), "-")
      .replace(getGroupSeparator(locale), "")
      .replace(getDecimalSeparator(locale), ".")
      .replace(allDecimalsExceptLast, "")
      .replace(everythingExceptNumbersDecimalsAndMinusSigns, "");

    return isValidNumber(delocalizedNumberString) ? delocalizedNumberString : nonExpoNumString;
  });
}

export function getGroupSeparator(locale: string): string {
  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(1234567);
  const value = parts.find((part) => part.type === "group").value;
  // change whitespace group characters that don't render correctly
  return value.trim().length === 0 ? " " : value;
}

export function getDecimalSeparator(locale: string): string {
  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(1.1);
  return parts.find((part) => part.type === "decimal").value;
}

export function getMinusSign(locale: string): string {
  const formatter = createLocaleNumberFormatter(locale);
  const parts = formatter.formatToParts(-9);
  return parts.find((part) => part.type === "minusSign").value;
}

export function localizeNumberString(
  numberString: string,
  locale: string,
  displayGroupSeparator = false,
  numberingSystem?: NumberingSystem
): string {
  return sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string => {
    if (nonExpoNumString) {
      const sanitizedNumberString = sanitizeDecimalString(nonExpoNumString.replace(defaultGroupSeparator, ""));
      if (isValidNumber(sanitizedNumberString)) {
        const parts = new BigDecimal(sanitizedNumberString).formatToParts(locale, numberingSystem);

        const localizedNumberString = parts
          .map(({ type, value }) => {
            switch (type) {
              case "group":
                return displayGroupSeparator ? getGroupSeparator(locale) : "";
              case "decimal":
                return getDecimalSeparator(locale);
              case "minusSign":
                return getMinusSign(locale);
              default:
                return value;
            }
          })
          .reduce((string, part) => string + part);
        return localizedNumberString;
      }
    }
    return nonExpoNumString;
  });
}

/**
 * This interface is for components that need to determine locale from the lang attribute.
 */
export interface LangComponent extends GlobalAttrComponent {
  /**
   * BCP 47 language tag for desired language and country format
   *
   * **Note**: this prop was added exclusively for backwards-compatibility
   *
   * @deprecated set the global `lang` attribute on the element instead.
   * @mdn [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
   */
  locale?: string;
}

/**
 * This util helps resolve a component's locale.
 * It will also fall back on the deprecated `locale` if a component implemented this previously.
 *
 * @param component
 */
export function getLocale(component: LangComponent): string {
  return component.el.lang || component.locale || document.documentElement.lang || "en";
}

interface NumberStringFormatOptions {
  numberingSystem: NumberingSystem;
  locale: string;
  useGrouping: boolean;
}

class NumberStringFormat {
  numberingSystem: string;

  locale: string;

  useGrouping: boolean;

  groupRegex: RegExp;

  decimalRegex: RegExp;

  numeralRegex: RegExp;

  getNumeralIndex;

  numberFormatter: Intl.NumberFormat;

  setOptions = (options: NumberStringFormatOptions) => {
    if (
      options?.numberingSystem === this.numberingSystem &&
      options?.locale === this.locale &&
      options?.useGrouping === this.useGrouping
    ) {
      return;
    }

    this.locale = options.locale;
    this.useGrouping = options.useGrouping;
    this.numberingSystem = isNumberingSystemSupported(options.numberingSystem)
      ? options.numberingSystem
      : defaultNumberingSystem;

    this.numberFormatter = new Intl.NumberFormat(this.locale, {
      useGrouping: this.useGrouping,
      numberingSystem: this.numberingSystem,
      minimumFractionDigits: 0,
      maximumFractionDigits: 20
    } as Intl.NumberFormatOptions);

    const numerals = [
      ...new Intl.NumberFormat(this.locale, {
        useGrouping: false,
        numberingSystem: this.numberingSystem
      } as Intl.NumberFormatOptions).format(9876543210)
    ].reverse();

    const parts = new Intl.NumberFormat(this.locale).formatToParts(12345.6);
    const index = new Map(numerals.map((d, i) => [d, i]));

    this.groupRegex = new RegExp(`[${parts.find((d) => d.type === "group").value}]`, "g");
    this.decimalRegex = new RegExp(`[${parts.find((d) => d.type === "decimal").value}]`);
    this.numeralRegex = new RegExp(`[${numerals.join("")}]`, "g");
    this.getNumeralIndex = (d) => index.get(d);
  };

  delocalize = (numberString: string) =>
    sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string =>
      nonExpoNumString
        .trim()
        .replace(this.groupRegex, "")
        .replace(this.decimalRegex, ".")
        .replace(this.numeralRegex, this.getNumeralIndex)
    );

  localize = (numberString: string) =>
    sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string =>
      isValidNumber(nonExpoNumString)
        ? new BigDecimal(numberString.trim()).format(this.numberFormatter)
        : nonExpoNumString
    );
}

export const numberStringFormatter = new NumberStringFormat();
