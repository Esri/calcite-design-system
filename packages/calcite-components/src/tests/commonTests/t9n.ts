/* eslint-disable jest/no-export -- Util functions are now imported to be used as `it` blocks within `describe` instead of assertions within `it` blocks. */
import { E2EElement, E2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
import { MessageBundle } from "../../utils/t9n";
import { IntrinsicElementsWithProp } from "./../utils";
import { getTagAndPage, ComponentTestSetup } from "./utils";

expect.extend(toHaveNoViolations);

/**
 * Helper to test t9n component setup.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("translation support", () => {
 *   t9n("calcite-action");
 * });
 *
 * @param {ComponentTestSetup} componentTestSetup - A component tag, html, or the tag and e2e page for setting up a test.
 */

export async function t9n(componentTestSetup: ComponentTestSetup): Promise<void> {
  let component: E2EElement;
  let page: E2EPage;
  let getCurrentMessages: () => Promise<MessageBundle>;

  beforeEach(async () => {
    const { page: e2ePage, tag } = await getTagAndPage(componentTestSetup);
    page = e2ePage;

    type CalciteComponentsWithMessages = IntrinsicElementsWithProp<"messages"> & HTMLElement;

    component = await page.find(tag);
    getCurrentMessages = async (): Promise<MessageBundle> => {
      return page.$eval(tag, (component: CalciteComponentsWithMessages) => component.messages);
    };
  });

  it("has defined default messages", async () => await assertDefaultMessages());
  it("overrides messages", async () => await assertOverrides());
  it("switches messages", async () => await assertLangSwitch());

  async function assertDefaultMessages(): Promise<void> {
    expect(await getCurrentMessages()).toBeDefined();
  }

  async function assertOverrides(): Promise<void> {
    const messages = await getCurrentMessages();
    const firstMessageProp = Object.keys(messages)[0];
    const messageOverride = { [firstMessageProp]: "override test" };

    component.setProperty("messageOverrides", messageOverride);
    await page.waitForChanges();

    expect(await getCurrentMessages()).toEqual({
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
          if (typeof input === "string" && input.endsWith("messages_es.json")) {
            const fakeEsMessages = {
              ...enMessages, // reuse real message bundle in case component rendering depends on strings

              [fakeBundleIdentifier]: true, // we inject a fake identifier for assertion-purposes
            };
            window.fetch = orig;
            return new Response(new Blob([JSON.stringify(fakeEsMessages, null, 2)], { type: "application/json" }));
          }

          return orig.call(input, init);
        };
      },
      enMessages,
      fakeBundleIdentifier,
    );

    component.setAttribute("lang", "es");
    await page.waitForChanges();
    await page.waitForTimeout(3000);
    const esMessages = await getCurrentMessages();

    expect(esMessages).toHaveProperty(fakeBundleIdentifier);

    // reset test changes
    component.removeAttribute("lang");
    await page.waitForChanges();
  }
}
