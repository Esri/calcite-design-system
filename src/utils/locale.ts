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

const allDecimalsExceptLast = new RegExp(`[.](?=.*[.])`, "g");
const everythingExceptNumbersDecimalsAndMinusSigns = new RegExp("[^0-9-.]", "g");
const defaultGroupSeparator = new RegExp(",", "g");

const browserNumberingSystem = new Intl.NumberFormat().resolvedOptions().numberingSystem;
const defaultNumberingSystem = browserNumberingSystem === "arab" ? "latn" : browserNumberingSystem;

export function createLocaleNumberFormatter(
  locale: string,
  numberingSystem = defaultNumberingSystem,
  signDisplay: "auto" | "never" | "always" | "exceptZero" = "auto"
): Intl.NumberFormat {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
    numberingSystem,
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
  numberingSystem?: string
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
