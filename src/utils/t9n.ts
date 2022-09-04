import { getAssetPath } from "@stencil/core";
import { getSupportedLang } from "./locale";

export type StringBundle = Record<string, string>;

export async function getStringBundle(lang: string, component: string): Promise<StringBundle> {
  let strings: StringBundle;

  try {
    strings = await fetchBundle(lang, component);
  } catch (error) {
    strings = await fetchBundle("en", component);
  }

  return strings;
}

async function fetchBundle(lang: string, component: string): Promise<StringBundle> {
  let response: Response;

  try {
    response = await fetch(getAssetPath(`./assets/${component}/t9n/${lang}.json`));
  } catch (error) {
    throwStringFetchError();
  } finally {
    if (!response.ok) {
      throwStringFetchError();
    }
  }

  return response.json() as Promise<StringBundle>;
}

function throwStringFetchError(): never {
  throw new Error("could not fetch component strings");
}

/**
 * This util helps preserve existing intlProp usage when they have not been replaced by overrides.
 *
 * @param component
 */
export function mergeIntlPropsIntoOverrides(component: T9nComponent): void {
  const { el } = component;
  let overrides = component.stringOverrides;

  // overrides have precedence
  if (overrides) {
    return;
  }

  for (const prop in el) {
    if (prop.startsWith("intl")) {
      const assignedString = el[prop];

      if (assignedString) {
        let mappedProp = prop.replace("intl", "");
        mappedProp = `${mappedProp[0].toLowerCase()}${mappedProp.slice(1)}`;

        if (!overrides) {
          overrides = {};
        }

        overrides[mappedProp] = assignedString;
      }
    }
  }

  component.stringOverrides = overrides;
}

export function mergeStrings(component: T9nComponent): void {
  component.mergedStrings = {
    ...component.builtInStrings,
    ...component.stringOverrides
  };
}

/**
 * This utility sets up the strings used by the component. It should be awaited in the `componentWillLoad` lifecycle hook.
 *
 * @param component
 */
export async function fetchStrings(component: T9nComponent): Promise<void> {
  const { el } = component;
  const lang = el.lang || document.documentElement.lang || navigator.language;
  const locale = getSupportedLang(lang);

  const tag = el.tagName.toLowerCase();
  const componentName = tag.replace("calcite-", "");

  component.builtInStrings = await getStringBundle(locale, componentName);
  mergeIntlPropsIntoOverrides(component);
  mergeStrings(component);
}

export function connectStrings(component: T9nComponent): void {
  component.onStringsChange = defaultOnStringsChange;
}

export function disconnectStrings(component: T9nComponent): void {
  component.onStringsChange = undefined;
}

export function defaultOnStringsChange(this: T9nComponent): void {
  mergeStrings(this);
}

export interface T9nComponent {
  el: HTMLElement;

  /**
   * This property holds all strings used by the component's rendering.
   *
   * This prop should use the `@State` decorator.
   */
  mergedStrings: StringBundle;

  /**
   * This property holds the component's default strings.
   *
   * This prop should use the `@State` decorator.
   */
  builtInStrings: StringBundle;

  /**
   * This property holds all user string overrides.
   *
   * This prop should use the `@Prop` decorator.
   */
  stringOverrides: Partial<StringBundle>;

  /**
   * This private method ensures strings are kept in sync.
   *
   * This method should be configured to watch for changes on `builtInStrings` and `stringOverrides`.
   *
   * @Watch("builtInStrings")
   * @Watch("stringOverrides")
   * onStringsChange(): void {
   *  \/* wired up by t9n util *\/
   * }
   */
  onStringsChange(): void;
}
