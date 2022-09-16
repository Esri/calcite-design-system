import { getAssetPath } from "@stencil/core";
import { getSupportedLang } from "./locale";
import { createObserver } from "./observers";
import { closestElementCrossShadowBoundary } from "./dom";

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

function mergeMessages(component: T9nComponent): void {
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
export async function setUpMessages(component: T9nComponent): Promise<void> {
  const lang = component.el.lang || document.documentElement.lang || navigator.language;

  component.defaultMessages = await fetchMessages(component, lang);
  mergeIntlPropsIntoOverrides(component);
  mergeMessages(component);
}

async function fetchMessages(component: T9nComponent, lang: string): Promise<MessageBundle> {
  const { el } = component;
  const tag = el.tagName.toLowerCase();
  const componentName = tag.replace("calcite-", "");

  return getMessageBundle(getSupportedLang(lang), componentName);
}

/**
 * @param component
 * @param lang
 * @internal
 */
export async function updateMessages(component: T9nComponent, lang: string): Promise<void> {
  component.defaultMessages = await fetchMessages(component, lang);
}

const connectedComponents = new Set<T9nComponent>();

const mutationObserver = createObserver("mutation", (records) => {
  records.forEach((record) => {
    const el = record.target as HTMLElement;

    connectedComponents.forEach((component) => {
      if ((component.el.lang && el !== component.el) || !el.contains(component.el)) {
        return;
      }

      const closestLangEl = closestElementCrossShadowBoundary<HTMLElement>(component.el, "[lang]");

      if (closestLangEl !== el) {
        return;
      }

      updateMessages(component, closestLangEl.lang);
    });
  });
});

/**
 * This utility sets up internals for messages support.
 *
 * It needs to be called in `connectedCallback`
 *
 * @param component
 */
export function connectMessages(component: T9nComponent): void {
  component.onMessagesChange = defaultOnMessagesChange;

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
 * This utility tears down internals for messages support.
 *
 * It needs to be called in `disconnectedCallback`
 *
 * @param component
 */
export function disconnectMessages(component: T9nComponent): void {
  component.onMessagesChange = undefined;
  connectedComponents.delete(component);

  if (connectedComponents.size === 0) {
    mutationObserver.disconnect();
  }
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
   * This method should be configured to watch for changes on `defaultMessages`, `messageOverrides` and any associated Intl prop.
   *
   * @Watch("intlMyPropA")
   * @Watch("intlMyPropZ")
   * @Watch("defaultMessages")
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
