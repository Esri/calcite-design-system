import { getAssetPath } from "@stencil/core";

export async function fetchLocaleStrings(locale: string, component: string): Promise<any> {
  const response = await fetch(getAssetPath(`./assets/${component}/t9n/${locale}.json`));

  if (!response.ok) {
    return fetchLocaleStrings("en", component);
  }
  const localeStringsJSON = await response.json();
  return localeStringsJSON;
}
