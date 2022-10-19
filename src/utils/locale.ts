import { BigDecimal, isValidNumber, sanitizeExponentialNumberString } from "./number";
import { createObserver } from "./observers";
import { closestElementCrossShadowBoundary, containsCrossShadowBoundary } from "./dom";

const defaultLocale = "en";
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

const isNumberingSystemSupported = (numberingSystem: string): numberingSystem is NumberingSystem =>
  numberingSystems.includes(numberingSystem as NumberingSystem);

const browserNumberingSystem = new Intl.NumberFormat().resolvedOptions().numberingSystem;

export const defaultNumberingSystem =
  browserNumberingSystem === "arab" || !isNumberingSystemSupported(browserNumberingSystem)
    ? "latn"
    : browserNumberingSystem;

export const getSupportedNumberingSystem = (numberingSystem: string): NumberingSystem =>
  isNumberingSystemSupported(numberingSystem) ? numberingSystem : defaultNumberingSystem;

export function getSupportedLocale(locale: string): string {
  if (locales.indexOf(locale) > -1) {
    return locale;
  }

  locale = locale.toLowerCase();

  // we support both 'nb' and 'no' (BCP 47) for Norwegian
  if (locale === "nb") {
    return "no";
  }

  if (locale.includes("-")) {
    locale = locale.replace(/(\w+)-(\w+)/, (_match, language, region) => `${language}-${region.toUpperCase()}`);

    if (!locales.includes(locale)) {
      locale = locale.split("-")[0];
    }
  }

  return locales.includes(locale) ? locale : "en";
}

/**
 * This interface is for components that need to determine locale from the lang attribute.
 */
export interface LocalizedComponent {
  el: HTMLElement;

  /**
   * BCP 47 language tag for desired language and country format
   *
   * **Note**: this prop was added exclusively for backwards-compatibility
   *
   * @deprecated set the global `lang` attribute on the element instead.
   * @mdn [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
   */
  locale?: string;

  /**
   * Used to store the effective locale to avoid multiple lookups.
   *
   * This is an internal property and should:
   *
   * - use the `@State` decorator
   * - be initialized to ""
   *
   * Components should watch this prop to ensure messages are updated.
   *
   * @Watch("effectiveLocale")
   * effectiveLocaleChange(): void {
   *   updateMessages(this, this.effectiveLocale);
   * }
   */
  effectiveLocale: string;
}

const connectedComponents = new Set<LocalizedComponent>();

/**
 * This utility sets up internals for messages support.
 *
 * It needs to be called in `connectedCallback` before any logic that depends on locale
 *
 * @param component
 */
export function connectLocalized(component: LocalizedComponent): void {
  updateEffectiveLocale(component);

  if (connectedComponents.size === 0) {
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
      subtree: true
    });
  }

  connectedComponents.add(component);
}

/**
 * This is only exported for components that implemented the now deprecated `locale` prop.
 *
 * Do not use this utils for new components.
 *
 * @param component
 */
export function updateEffectiveLocale(component: LocalizedComponent): void {
  component.effectiveLocale = getLocale(component);
}

/**
 * This utility tears down internals for messages support.
 *
 * It needs to be called in `disconnectedCallback`
 *
 * @param component
 */
export function disconnectLocalized(component: LocalizedComponent): void {
  connectedComponents.delete(component);

  if (connectedComponents.size === 0) {
    mutationObserver.disconnect();
  }
}

const mutationObserver = createObserver("mutation", (records) => {
  records.forEach((record) => {
    const el = record.target as HTMLElement;

    connectedComponents.forEach((component) => {
      const hasOverridingLocale = !!(component.locale && !component.el.lang);
      const inUnrelatedSubtree = !containsCrossShadowBoundary(el, component.el);

      if (hasOverridingLocale || inUnrelatedSubtree) {
        return;
      }

      const closestLangEl = closestElementCrossShadowBoundary<HTMLElement>(component.el, "[lang]");

      if (!closestLangEl) {
        component.effectiveLocale = defaultLocale;
        return;
      }

      const closestLang = closestLangEl.lang;

      component.effectiveLocale =
        // user set lang="" means unknown language, so we use default
        closestLangEl.hasAttribute("lang") && closestLang === "" ? defaultLocale : closestLang;
    });
  });
});

/**
 * This util helps resolve a component's locale.
 * It will also fall back on the deprecated `locale` if a component implemented this previously.
 *
 * @param component
 */
function getLocale(component: LocalizedComponent): string {
  return (
    component.el.lang ||
    component.locale ||
    closestElementCrossShadowBoundary<HTMLElement>(component.el, "[lang]")?.lang ||
    document.documentElement.lang ||
    defaultLocale
  );
}

interface NumberStringFormatOptions extends Intl.NumberFormatOptions {
  numberingSystem: NumberingSystem;
  locale: string;
}

/**
 * This util formats and parses numbers for localization
 */
class NumberStringFormat {
  /**
   * The actual group separator for the specified locale.
   * Some white space group separators don't render correctly in the browser,
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

  /**
   * numberFormatOptions needs to be set before localize/delocalize is called to ensure the options are up to date
   */
  set numberFormatOptions(options: NumberStringFormatOptions) {
    options.locale = getSupportedLocale(options.locale);
    options.numberingSystem = getSupportedNumberingSystem(options.numberingSystem);

    // cache formatter by only recreating when options change
    if (JSON.stringify(this._numberFormatOptions) === JSON.stringify(options)) {
      return;
    }

    this._numberFormatOptions = options;

    this._numberFormatter = new Intl.NumberFormat(
      this._numberFormatOptions.locale,
      this._numberFormatOptions as Intl.NumberFormatOptions
    );

    this._digits = [
      ...new Intl.NumberFormat(this._numberFormatOptions.locale, {
        useGrouping: false,
        numberingSystem: this._numberFormatOptions.numberingSystem
      } as Intl.NumberFormatOptions).format(9876543210)
    ].reverse();

    const index = new Map(this._digits.map((d, i) => [d, i]));
    const parts = new Intl.NumberFormat(this._numberFormatOptions.locale).formatToParts(-12345678.9);

    this._actualGroup = parts.find((d) => d.type === "group").value;
    // change whitespace group characters that don't render correctly
    this._group = this._actualGroup.trim().length === 0 ? " " : this._actualGroup;
    this._decimal = parts.find((d) => d.type === "decimal").value;
    this._minusSign = parts.find((d) => d.type === "minusSign").value;
    this._getDigitIndex = (d: string) => index.get(d);
  }

  delocalize = (numberString: string) =>
    sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string =>
      nonExpoNumString
        .trim()
        .replace(new RegExp(`[${this._minusSign}]`, "g"), "-")
        .replace(new RegExp(`[${this._group}]`, "g"), "")
        .replace(new RegExp(`[${this._decimal}]`, "g"), ".")
        .replace(new RegExp(`[${this._digits.join("")}]`, "g"), this._getDigitIndex)
    );

  localize = (numberString: string) =>
    sanitizeExponentialNumberString(numberString, (nonExpoNumString: string): string =>
      isValidNumber(nonExpoNumString)
        ? new BigDecimal(nonExpoNumString.trim())
            .format(this._numberFormatter)
            .replace(new RegExp(`[${this._actualGroup}]`, "g"), this._group)
        : nonExpoNumString
    );
}

export const numberStringFormatter = new NumberStringFormat();
