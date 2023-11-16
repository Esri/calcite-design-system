import { Build, getAssetPath } from "@stencil/core";
import { getSupportedLocale, LocalizedComponent } from "./locale";

export type MessageBundle = Record<string, string>;

export const componentLangToMessageBundleCache: Record<string, Promise<MessageBundle>> = {};

async function getMessageBundle(lang: string, component: string): Promise<MessageBundle> {
  const key = `${component}_${lang}`;

  if (componentLangToMessageBundleCache[key]) {
    return componentLangToMessageBundleCache[key];
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

function mergeMessages(component: T9nComponent): void {
  component.messages = {
    ...component.defaultMessages,
    ...component.messageOverrides,
  };
}

/**
 * This utility sets up the messages used by the component. It should be awaited in the `componentWillLoad` lifecycle hook.
 *
 * @param component
 */
export async function setUpMessages(component: T9nComponent): Promise<void> {
  component.defaultMessages = await fetchMessages(component, component.effectiveLocale);
  mergeMessages(component);
}

async function fetchMessages(component: T9nComponent, lang: string): Promise<MessageBundle> {
  if (!Build.isBrowser) {
    return {};
  }

  const { el } = component;
  const tag = el.tagName.toLowerCase();
  const componentName = tag.replace("calcite-", "");

  return getMessageBundle(getSupportedLocale(lang, "t9n"), componentName);
}

/**
 * This utility must be set up for the component to update its default message bundle if the locale changes.
 *
 * It can be set up in **either** of the following ways:
 *
 * 1. called from `LocalizedComponent`'s `onLocaleChange` method or
 * 2. called from a watcher configured to watch `LocalizedComponent`'s `effectiveLocale` prop
 *
 * @param component
 * @param lang
 */
export async function updateMessages(component: T9nComponent, lang: string): Promise<void> {
  component.defaultMessages = await fetchMessages(component, lang);
  mergeMessages(component);
}

/**
 * This utility sets up internals for messages support.
 *
 * It needs to be called in `connectedCallback`
 *
 * **Note**: this must be called after `LocalizedComponent`'s `connectLocalized` method.
 *
 * @param component
 */
export function connectMessages(component: T9nComponent): void {
  component.onMessagesChange = defaultOnMessagesChange;
}

/**
 * This utility tears down internals for messages support.
 *
 * It needs to be called in `disconnectedCallback`
 *
 * @param component
 */
export function disconnectMessages(component: T9nComponent): void {
  component.onMessagesChange = undefined;
}

/**
 * This interface enables components to support built-in translation strings.
 *
 * **Notes**:
 *
 * This requires `LocalizedComponent` to be implemented.
 * To avoid unnecessary lookups, composite components should set `lang` on internal t9n components.
 */
export interface T9nComponent extends LocalizedComponent {
  el: HTMLElement;

  /**
   * This property holds all messages used by the component's rendering.
   *
   * This prop should use the `@Prop` decorator. It uses `@Prop` decorator for testing purpose only.
   */
  messages: MessageBundle;

  /**
   * This property holds the component's default messages.
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
   * This method should be empty and configured to watch for changes on  `messageOverrides` property.
   *
   * @Watch("messageOverrides")
   * onMessagesChange(): void {
   *  \/* wired up by t9n util *\/
   * }
   */
  onMessagesChange(): void;
}

function defaultOnMessagesChange(this: T9nComponent): void {
  mergeMessages(this);
}
