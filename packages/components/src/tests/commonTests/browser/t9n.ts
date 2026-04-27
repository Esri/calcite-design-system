import { afterEach, expect, it, vi } from "vitest";
import { mount, RenderResult } from "@arcgis/lumina-compiler/testing";
import { IntrinsicElementsWithProp } from "../../utils/interfaces";

type ComponentWithMessageOverrides = IntrinsicElementsWithProp<"messageOverrides">;
type TagName = keyof DeclareElements;
type MessagesBundle = Record<string, string>;

type T9nComponent = {
  messages: Record<string, string> & { _loading?: boolean };
  messageOverrides?: Record<string, string>;
};

const isT9nComponent = (el: unknown): el is HTMLElement & T9nComponent => {
  return Boolean(
    el &&
    typeof el === "object" &&
    "messages" in (el as any) &&
    (el as any).messages &&
    typeof (el as any).messages === "object",
  );
};

const tagNameToComponentFolder = (tagName: TagName): string => String(tagName).replace(/^calcite-/, "");

async function importMessagesJson(tagName: TagName): Promise<MessagesBundle> {
  const folder = tagNameToComponentFolder(tagName);

  // eslint-disable-next-line import/no-dynamic-require
  const messages = await import(`../../../components/${folder}/assets/t9n/messages.json`);

  return (messages.default ?? messages) as MessagesBundle;
}

const getRenderedRoot = (host: Element): ParentNode => host.shadowRoot ?? host;

const findSubComponentElement = (host: Element, tagName: TagName): HTMLElement | null => {
  const root = getRenderedRoot(host);
  return root.querySelector(tagName);
};

const getMessages = async (el: HTMLElement): Promise<void> => {
  if (el["messages"]._loading) {
    await vi.waitUntil(() => !el["messages"]._loading);
  }
  return el["messages"];
};

export async function t9n(setup: () => ReturnType<typeof mount>, subComponents?: TagName[]): Promise<void> {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("has defined default messages", async () => await assertDefaultMessages());
  it("overrides messages", async () => await assertOverrides(subComponents));
  it("switches messages", async () => await assertLangSwitch());
  it("does not throw when removed during message loading", async () => await assertNoErrorOnRemovalDuringMessageLoad());

  async function getCurrentMessages(
    component: ComponentWithMessageOverrides,
  ): Promise<ComponentWithMessageOverrides["messages"]> {
    if (component.messages._loading) {
      await vi.waitUntil(() => !component.messages._loading);
    }

    return component.messages;
  }

  async function assertDefaultMessages(): Promise<void> {
    const { component } = (await setup()) as RenderResult<ComponentWithMessageOverrides>;
    expect(await getCurrentMessages(component)).toBeDefined();
  }

  async function assertOverrides(subComponents?: TagName[]): Promise<void> {
    const { el, component, reRender } = (await setup()) as RenderResult<ComponentWithMessageOverrides>;
    const messages = await getCurrentMessages(component);
    const firstMessageProp = Object.keys(messages).find((key) => !key.startsWith("_"));
    if (!firstMessageProp) {
      return;
    }
    const overrideValue = "override test";
    const messageOverride = { [firstMessageProp]: overrideValue };
    el.messageOverrides = messageOverride;
    await reRender();

    expect(await getCurrentMessages(component)).toMatchObject({
      ...messages,
      ...messageOverride,
    });

    if (subComponents?.length) {
      // for prototyping we are only supporting a single sub-component, but this could be easily extended to support multiple sub-components and message overrides for each
      const subComponent = subComponents[0];
      const subComponentMessages = await importMessagesJson(subComponent);
      const firstSubComponentMessageKey = Object.keys(subComponentMessages).find((key) => !key.startsWith("_"))[0];

      if (!firstSubComponentMessageKey) {
        return;
      }

      el.messageOverrides = { [firstSubComponentMessageKey]: overrideValue } as any;
      await reRender();

      const subComponentEl = findSubComponentElement(el, subComponent);
      expect(subComponentEl).toBeTruthy();
      expect(isT9nComponent(subComponentEl)).toBe(true);

      const childMessages = await getMessages(subComponentEl);
      expect(childMessages).toBeDefined();
      expect(childMessages[firstSubComponentMessageKey]).toBe(overrideValue);
    }

    el.messageOverrides = undefined;
    await reRender();
  }

  async function assertLangSwitch(): Promise<void> {
    const { el, component, reRender } = (await setup()) as RenderResult<ComponentWithMessageOverrides>;
    const enMessages = await getCurrentMessages(component);
    const fakeBundleIdentifier = "__fake__";

    const originalFetch = window.fetch;
    vi.spyOn(window, "fetch").mockImplementation(async (input) => {
      if (typeof input === "string" && input.endsWith(".es.json")) {
        const fakeEsMessages = { ...enMessages, [fakeBundleIdentifier]: true };
        return new Response(new Blob([JSON.stringify(fakeEsMessages, null, 2)], { type: "application/json" }));
      }
      return originalFetch(input);
    });

    el.lang = "es";
    await reRender();

    await expect.poll(() => getCurrentMessages(component)).toHaveProperty(fakeBundleIdentifier);

    // reset test changes
    el.removeAttribute("lang");
  }

  async function assertNoErrorOnRemovalDuringMessageLoad(): Promise<void> {
    async function runTest(): Promise<void> {
      const { el } = (await setup()) as RenderResult<ComponentWithMessageOverrides>;
      el.messageOverrides = {
        ...el.messageOverrides,
      };
      el.remove();
    }

    await expect(runTest()).resolves.toBeUndefined();
  }
}
