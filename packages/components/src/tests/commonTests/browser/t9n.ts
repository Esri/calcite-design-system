import { afterEach, expect, it, vi } from "vitest";
import { mount, RenderResult } from "@arcgis/lumina-compiler/testing";
import { IntrinsicElementsWithProp } from "../../utils/interfaces";

type TagName = keyof DeclareElements;

/**
 * Helper to test t9n component setup.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("translation support", () => {
 *   t9n(() => mount("calcite-input-date-picker"), ["calcite-date-picker"]);
 * });
 */
export async function t9n(setup: () => ReturnType<typeof mount>, subComponents?: TagName[]): Promise<void> {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("has defined default messages", async () => await assertDefaultMessages());
  it("overrides messages", async () => await assertOverrides(subComponents));
  it("switches messages", async () => await assertLangSwitch());
  it("does not throw when removed during message loading", async () => await assertNoErrorOnRemovalDuringMessageLoad());

  type ComponentWithMessageOverrides = IntrinsicElementsWithProp<"messageOverrides">;

  async function getCurrentMessages(
    component: ComponentWithMessageOverrides,
  ): Promise<ComponentWithMessageOverrides["messages"]> {
    if (component.messages._loading) {
      await vi.waitUntil(() => !component.messages._loading);
    }

    return component.messages;
  }

  const findSubComponentElement = (host: Element, tagName: TagName): Element | null => {
    const root = host.shadowRoot ?? host;
    return root.querySelector(tagName);
  };

  async function assertDefaultMessages(): Promise<void> {
    const { component } = (await setup()) as RenderResult<ComponentWithMessageOverrides>;
    expect(await getCurrentMessages(component)).toBeDefined();
  }

  async function assertOverrides(subComponents?: TagName[]): Promise<void> {
    const { el, component, reRender } = (await setup()) as RenderResult<ComponentWithMessageOverrides>;
    const messages = await getCurrentMessages(component);
    const firstMessageProp = Object.keys(messages).find((key) => !key.startsWith("_"));
    const overrideValue = "override test";
    const messageOverride = { [firstMessageProp]: overrideValue };
    el.messageOverrides = messageOverride;
    await reRender();

    expect(await getCurrentMessages(component)).toMatchObject({
      ...messages,
      ...messageOverride,
    });

    // reset test changes
    el.messageOverrides = undefined;
    await reRender();

    if (subComponents?.length) {
      el.messageOverrides = messageOverride;
      await reRender();

      for (const subComponent of subComponents) {
        const subComponentEl = findSubComponentElement(el, subComponent) as DeclareElements[TagName];
        expect(subComponentEl).not.toBeNull();
        const subComponentManager = subComponentEl.manager.component as ComponentWithMessageOverrides;
        // Assert whether parent component passed the override value to the sub-component.
        expect(subComponentManager.messageOverrides[firstMessageProp]).toBe(overrideValue);
      }
    }

    el.messageOverrides = undefined;
    await reRender();
  }

  async function assertLangSwitch(): Promise<void> {
    const { el, component, reRender } = (await setup()) as RenderResult<ComponentWithMessageOverrides>;
    const enMessages = await getCurrentMessages(component);
    const fakeBundleIdentifier = "__fake__";

    const originalFetch = window.fetch;
    vi.spyOn(window, "fetch").mockImplementation(async (input, init) => {
      if (typeof input === "string" && input.endsWith(".es.json")) {
        const fakeEsMessages = { ...enMessages, [fakeBundleIdentifier]: true };
        return new Response(new Blob([JSON.stringify(fakeEsMessages, null, 2)], { type: "application/json" }));
      }
      return originalFetch(input, init);
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
