import { getAssetPath } from "@stencil/core";

export async function fetchLocaleStrings(locale: string, component: string): Promise<any> {
  const res = fetch(getAssetPath(`./assets/${component}/t9n/${locale}.json`))
    .then((resp) => resp.json())
    .catch(() => {
      console.error(`Translations for "${locale}" not found or invalid, falling back to english`);
      return fetchLocaleStrings("en", component);
    });
  return res;
}
