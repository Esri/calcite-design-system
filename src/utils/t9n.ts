import { getAssetPath } from "@stencil/core";
import { getSupportedLang } from "./locale";

export type MessageBundle = Record<string, string>;

export const componentLangToMessageBundleCache: Record<string, Promise<MessageBundle>> = {};

export async function getMessageBundle(lang: string, component: string): Promise<MessageBundle> {
  let messages: MessageBundle;

  try {
    messages = await fetchBundle(lang, component);
  } catch (error) {
    messages = await fetchBundle("en", component);
  }

  return messages;
}

async function fetchBundle(lang: string, component: string): Promise<MessageBundle> {
  const key = `${component}_${lang}`;

  if (componentLangToMessageBundleCache[key]) {
    return await componentLangToMessageBundleCache[key];
  }

  componentLangToMessageBundleCache[key] = fetch(getAssetPath(`./assets/${component}/t9n/messages_${lang}.json`))
    .then((resp) => {
      if (!resp.ok) {
        throwMessageFetchError();
      }
      return resp.json();
    })
    .catch(() => throwMessageFetchError());

  return componentLangToMessageBundleCache[key];
}

function throwMessageFetchError(): never {
  throw new Error("could not fetch component message bundle");
}

/**
 * This util helps preserve existing intlProp usage when they have not been replaced by overrides.
 *
 * @param component
 */
export function mergeIntlPropsIntoOverrides(component: T9nComponent): void {
  const { el } = component;
  let overrides = component.messageOverrides;

  // overrides have precedence
  if (overrides) {
    return;
  }

  for (const prop in el) {
    if (prop.startsWith("intl")) {
      const assignedValue = el[prop];

      if (assignedValue) {
        let mappedProp = prop.replace("intl", "");
        mappedProp = `${mappedProp[0].toLowerCase()}${mappedProp.slice(1)}`;

        if (!overrides) {
          overrides = {};
        }

        overrides[mappedProp] = assignedValue;
      }
    }
  }

  component.messageOverrides = overrides;
}

export function mergeMessages(component: T9nComponent): void {
  component.messages = {
    ...component.defaultMessages,
    ...component.messageOverrides
  };
}

/**
 * This utility sets up the messages used by the component. It should be awaited in the `componentWillLoad` lifecycle hook.
 *
 * @param component
 */
export async function fetchMessages(component: T9nComponent): Promise<void> {
  const { el } = component;
  const lang = el.lang || document.documentElement.lang || navigator.language;
  const locale = getSupportedLang(lang);

  const tag = el.tagName.toLowerCase();
  const componentName = tag.replace("calcite-", "");

  component.defaultMessages = await getMessageBundle(locale, componentName);
  mergeIntlPropsIntoOverrides(component);
  mergeMessages(component);
}

export function connectMessages(component: T9nComponent): void {
  component.onMessagesChange = defaultOnMessagesChange;
}

export function disconnectMessages(component: T9nComponent): void {
  component.onMessagesChange = undefined;
}

export function defaultOnMessagesChange(this: T9nComponent): void {
  mergeMessages(this);
}

export interface T9nComponent {
  el: HTMLElement;

  /**
   * This property holds all messages used by the component's rendering.
   *
   * This prop should use the `@State` decorator.
   */
  messages: MessageBundle;

  /**
   * This property holds the component's default messages.
   *
   * This prop should use the `@State` decorator.
   */
  defaultMessages: MessageBundle;

  /**
   * This property holds all user message overrides.
   *
   * This prop should use the `@Prop` decorator.
   */
  messageOverrides: Partial<MessageBundle>;

  /**
   * This private method ensures messages are kept in sync.
   *
   * This method should be configured to watch for changes on `defaultMessages` and `messageOverrides`.
   *
   * @Watch("defaultMessages")
   * @Watch("messageOverrides")
   * onMessagesChange(): void {
   *  \/* wired up by t9n util *\/
   * }
   */
  onMessagesChange(): void;
}
