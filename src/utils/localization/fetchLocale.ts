import { locales } from "../locale";

/**
 * Get supported locale code from raw user input
 * Exported for testing purposes.
 *
 * @param lang
 * @private
 * @returns {string}
 */
export function getSupportedLocale(lang = ""): string {
  if (locales.indexOf(lang) > -1) {
    return lang;
  }

  lang = lang.toLowerCase();

  if (lang.includes("-")) {
    lang = lang.replace(/(\w+)-(\w+)/, (_match, language, region) => `${language}-${region.toUpperCase()}`);

    if (!locales.includes(lang)) {
      lang = lang.split("-")[0];
    }
  }
  return locales.includes(lang) ? lang : "en";
}

//TODO : Get the locale of the component or look for closest one if needed.
//lookup DOM utils

// export function getLocale(selector: string): string {
//   const el = document.querySelector(selector) as HTMLElement;
//   const localeAttr = el.getProperty("locale");
// }
