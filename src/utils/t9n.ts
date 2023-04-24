import { getAssetPath } from "@stencil/core";
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

/**
 * This util helps preserve existing intlProp usage when they have not been replaced by overrides.
 *
 * @param component
 */
export function overridesFromIntlProps(component: T9nComponent): MessageBundle {
  const { el } = component;
  const overrides = {};

  Object.keys(el.constructor.prototype)
    .filter((prop) => prop.startsWith("intl"))
    .forEach((prop) => {
      const assignedValue = el[prop];
      if (assignedValue) {
        let mappedProp = prop.replace("intl", "");
        mappedProp = `${mappedProp[0].toLowerCase()}${mappedProp.slice(1)}`;
        overrides[mappedProp] = assignedValue;
      }
    });

  return overrides;
}

function mergeMessages(component: T9nComponent): void {
  component.messages = {
    ...component.defaultMessages,
    ...getEffectiveMessageOverrides(component),
    ...component.getExtraMessageOverrides?.()
  };
}

function getEffectiveMessageOverrides(component: T9nComponent): MessageBundle {
  return component.messageOverrides ?? overridesFromIntlProps(component);
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
   * This method should be empty and configured to watch for changes on  `messageOverrides` and any associated Intl prop.
   *
   * @Watch("intlMyPropA")
   * @Watch("intlMyPropZ")
   * @Watch("messageOverrides")
   * onMessagesChange(): void {
   *  \/* wired up by t9n util *\/
   * }
   */
  onMessagesChange(): void;

  /**
   * This private method provides a hook for non-intl props to be merged into `messages`.
   *
   * For example, this helps merge strings from props exclusive for screen reader markup.
   */
  getExtraMessageOverrides?(): Partial<MessageBundle>;
}

function defaultOnMessagesChange(this: T9nComponent): void {
  mergeMessages(this);
}
