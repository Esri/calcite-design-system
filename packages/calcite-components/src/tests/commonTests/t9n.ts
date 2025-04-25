// @ts-strict-ignore
import { LitElement, PublicLitElement } from "@arcgis/lumina";
import { E2EPage, E2EElement } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it, beforeEach } from "vitest";
import { MessageBundle } from "../../utils/t9n";
import { IntrinsicElementsWithProp, newProgrammaticE2EPage } from "../utils/puppeteer";
import { getTagAndPage } from "./utils";
import { ComponentTag, ComponentTestSetup } from "./interfaces";

/**
 * Helper to test t9n component setup.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("translation support", () => {
 *   t9n("calcite-action");
 * });
 * @param {ComponentTestSetup} componentTestSetup - A component tag, html, or the tag and e2e page for setting up a test.
 */

export async function t9n(componentTestSetup: ComponentTestSetup): Promise<void> {
  let component: E2EElement;
  let page: E2EPage;
  let getCurrentMessages: () => Promise<MessageBundle>;

  beforeEach(async () => {
    const { page: e2ePage, tag } = await getTagAndPage(componentTestSetup);
    page = e2ePage;

    type CalciteComponentsWithMessages = LitElement & {
      manager: {
        component: IntrinsicElementsWithProp<"messages">;
      };
    };

    component = await page.find(tag);
    getCurrentMessages = async (): Promise<MessageBundle> => {
      return page.$eval(tag, (el: CalciteComponentsWithMessages) => el.manager.component.messages);
    };
  });

  it("has defined default messages", async () => await assertDefaultMessages());
  it("overrides messages", async () => await assertOverrides());
  it("switches messages", async () => await assertLangSwitch());
  it("does not throw when removed during message loading", async () => await assertNoErrorOnRemovalDuringMessageLoad());

  async function assertDefaultMessages(): Promise<void> {
    expect(await getCurrentMessages()).toBeDefined();
  }

  async function assertOverrides(): Promise<void> {
    const messages = await getCurrentMessages();
    const firstMessageProp = Object.keys(messages)[0];
    const messageOverride = { [firstMessageProp]: "override test" };

    component.setProperty("messageOverrides", messageOverride);
    await page.waitForChanges();

    expect({ ...(await getCurrentMessages()), _original: undefined }).toEqual({
      ...messages,
      ...messageOverride,
    });

    // reset test changes
    component.setProperty("messageOverrides", undefined);
    await page.waitForChanges();
  }

  async function assertLangSwitch(): Promise<void> {
    const enMessages = await getCurrentMessages();
    const fakeBundleIdentifier = "__fake__";
    await page.evaluate(
      (enMessages, fakeBundleIdentifier) => {
        const orig = window.fetch;
        window.fetch = async function (input, init) {
          if (typeof input === "string" && input.endsWith(".es.json")) {
            const fakeEsMessages = {
              ...enMessages, // reuse real message bundle in case component rendering depends on strings

              [fakeBundleIdentifier]: true, // we inject a fake identifier for assertion-purposes
            };
            window.fetch = orig;
            return new Response(new Blob([JSON.stringify(fakeEsMessages, null, 2)], { type: "application/json" }));
          }

          return orig.call(window, input, init);
        };
      },
      enMessages,
      fakeBundleIdentifier,
    );

    component.setAttribute("lang", "es");
    await page.waitForChanges();
    const esMessages = await getCurrentMessages();

    expect(esMessages).toHaveProperty(fakeBundleIdentifier);

    // reset test changes
    component.removeAttribute("lang");
    await page.waitForChanges();
  }

  async function assertNoErrorOnRemovalDuringMessageLoad(): Promise<void> {
    async function runTest(): Promise<void> {
      type CalciteComponentsWithMessageOverrides = IntrinsicElementsWithProp<"messageOverrides"> & PublicLitElement;

      const page = await newProgrammaticE2EPage();
      await page.evaluate(async (tag: ComponentTag) => {
        const component = document.createElement(tag) as CalciteComponentsWithMessageOverrides;
        document.body.append(component);
        await customElements.whenDefined(tag);
        await component.componentOnReady();
        component.messageOverrides = { ...component.messageOverrides };
        component.remove();
      }, component.tagName.toLowerCase());
      await page.waitForChanges();
    }

    await expect(runTest()).resolves.toBeUndefined();
  }
}
