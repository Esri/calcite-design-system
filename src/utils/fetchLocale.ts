import { locales } from "./locale";

export function getSupportedLocale(lang: string): string {
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
