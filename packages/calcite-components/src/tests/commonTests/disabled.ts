// @ts-strict-ignore
import { SetFieldType } from "type-fest";
import { E2EPage, E2EElement, EventSpy } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { IntrinsicElementsWithProp, skipAnimations } from "../utils";
import { getTagAndPage } from "./utils";
import { ComponentTestSetup, DisabledOptions, FocusTarget, TabAndClickFocusTargets } from "./interfaces";

/**
 * Helper to test the disabled prop disabling user interaction.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("disabled", () => {
 *    disabled("calcite-input")
 * });
 * @param {ComponentTestSetup} componentTestSetup - A component tag, html, or the tag and e2e page for setting up a test.
 * @param {DisabledOptions} [options] - Disabled options.
 */
export function disabled(componentTestSetup: ComponentTestSetup, options?: DisabledOptions): void {
  options = { focusTarget: "host", ...options };

  const addRedirectPrevention = async (page: E2EPage, tag: string): Promise<void> => {
    await page.$eval(tag, (el) => {
      el.addEventListener(
        "click",
        (event) => {
          const path = event.composedPath() as HTMLElement[];
          const anchor = path.find((el) => el?.tagName === "A");

          if (anchor) {
            // we prevent the default behavior to avoid a page redirect
            anchor.addEventListener("click", (event) => event.preventDefault(), { once: true });
          }
        },
        true,
      );
    });
  };

  async function expectToBeFocused(page: E2EPage, tag: string, context: string): Promise<void> {
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(`${context}:${focusedTag}`).toBe(`${context}:${tag}`);
  }

  function assertOnMouseAndPointerEvents(spies: EventSpy[], expectCallback: (spy: EventSpy) => void): void {
    for (const spy of spies) {
      expectCallback(spy);
    }
  }

  // only testing events from https://github.com/web-platform-tests/wpt/blob/master/html/semantics/disabled-elements/event-propagate-disabled.tentative.html#L66
  const eventsExpectedToBubble = ["mousemove", "pointermove", "pointerdown", "pointerup"];
  const eventsExpectedToNotBubble = ["mousedown", "mouseup", "click"];
  const allExpectedEvents = [...eventsExpectedToBubble, ...eventsExpectedToNotBubble];

  const createEventSpiesForExpectedEvents = async (component: E2EElement): Promise<EventSpy[]> => {
    const eventSpies: EventSpy[] = [];

    for (const event of allExpectedEvents) {
      eventSpies.push(await component.spyOnEvent(event));
    }

    return eventSpies;
  };

  async function getFocusTarget(page: E2EPage, tag: string, focusTarget: FocusTarget): Promise<string> {
    return focusTarget === "host" ? tag : await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
  }

  type EffectiveTabAndClickFocusTargets = SetFieldType<
    TabAndClickFocusTargets,
    "click",
    Exclude<TabAndClickFocusTargets["click"], string>
  >;

  const getTabAndClickFocusTarget = async (
    page: E2EPage,
    tag: string,
    focusTarget: DisabledOptions["focusTarget"],
  ): Promise<EffectiveTabAndClickFocusTargets> => {
    const defaultClickMethodTarget = "body";

    if (typeof focusTarget === "object") {
      return typeof focusTarget.click === "string"
        ? {
            tab: focusTarget.tab,
            click: {
              pointer: focusTarget.click,
              method: defaultClickMethodTarget,
            },
          }
        : (focusTarget as EffectiveTabAndClickFocusTargets);
    }

    const sameClickAndTabFocusTarget = await getFocusTarget(page, tag, focusTarget);

    return {
      tab: sameClickAndTabFocusTarget,
      click: {
        pointer: sameClickAndTabFocusTarget,
        method: defaultClickMethodTarget,
      },
    };
  };

  const getShadowFocusableCenterCoordinates = async (page: E2EPage, tabFocusTarget: string): Promise<number[]> => {
    return await page.$eval(tabFocusTarget, (element: HTMLElement) => {
      const focusTarget = element.shadowRoot.activeElement || element;
      const rect = focusTarget.getBoundingClientRect();

      return [rect.x + rect.width / 2, rect.y + rect.height / 2];
    });
  };

  it("prevents focusing via keyboard and mouse", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);

    const component = await page.find(tag);
    const ariaAttributeTargetElement = options.shadowAriaAttributeTargetSelector
      ? await page.find(`${tag} >>> ${options.shadowAriaAttributeTargetSelector}`)
      : component;
    await skipAnimations(page);
    await addRedirectPrevention(page, tag);

    // setting page size seems to improve consistency between local and CI runs, see https://github.com/Esri/calcite-design-system/pull/10141/ for more info
    await page.setViewport({
      width: 1200,
      height: 800,
    });

    const eventSpies = await createEventSpiesForExpectedEvents(component);

    expect(ariaAttributeTargetElement.getAttribute("aria-disabled")).toBeNull();

    if (options.focusTarget === "none") {
      await page.click(tag);
      await page.waitForChanges();
      await expectToBeFocused(page, "body", "none+click");

      assertOnMouseAndPointerEvents(eventSpies, (spy) => expect(spy).toHaveReceivedEventTimes(1));

      component.setProperty("disabled", true);
      await page.waitForChanges();

      expect(ariaAttributeTargetElement.getAttribute("aria-disabled")).toBe("true");

      await page.click(tag);
      await page.waitForChanges();
      await expectToBeFocused(page, "body", "none+disabled+click");

      await component.callMethod("click");
      await page.waitForChanges();
      await expectToBeFocused(page, "body", "none+disabled+click()");

      assertOnMouseAndPointerEvents(eventSpies, (spy) => {
        expect(spy).toHaveReceivedEventTimes(eventsExpectedToBubble.includes(spy.eventName) ? 2 : 1);
      });

      return;
    }

    await page.keyboard.press("Tab");

    const effectiveFocusTarget = await getTabAndClickFocusTarget(page, tag, options.focusTarget);

    expect(effectiveFocusTarget.tab).not.toBe("body");
    await expectToBeFocused(page, effectiveFocusTarget.tab, "tab");

    const [shadowFocusableCenterX, shadowFocusableCenterY] = await getShadowFocusableCenterCoordinates(
      page,
      effectiveFocusTarget.tab,
    );

    async function resetFocusOrder(): Promise<void> {
      // test page has default margin, so clicking on 0,0 will not hit the test element
      await page.mouse.click(0, 0, { delay: 100 }); // we need an extra click in case a component has focusing-on-blur behavior
      await page.mouse.click(0, 0);
    }

    await resetFocusOrder();
    await expectToBeFocused(page, "body", "pre-click reset");

    await page.mouse.click(shadowFocusableCenterX, shadowFocusableCenterY);
    await page.waitForChanges();

    await expectToBeFocused(page, effectiveFocusTarget.click.pointer, "click");

    await resetFocusOrder();
    await expectToBeFocused(page, "body", "pre-click() reset");

    await component.callMethod("click");
    await page.waitForChanges();
    await expectToBeFocused(page, effectiveFocusTarget.click.method, "click()");

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      if (spy.eventName === "click") {
        // some components emit more than one click event (e.g., from calling `click()`),
        // so we check if at least one event is received
        expect(spy.length).toBeGreaterThanOrEqual(2);
      } else {
        expect(spy).toHaveReceivedEventTimes(1);
      }
    });

    component.setProperty("disabled", true);
    await page.waitForChanges();

    expect(ariaAttributeTargetElement.getAttribute("aria-disabled")).toBe("true");

    await resetFocusOrder();
    await expectToBeFocused(page, "body", "disabled+pre-tab reset");

    await page.keyboard.press("Tab");
    await expectToBeFocused(page, "body", "disabled+tab");

    await resetFocusOrder();
    await expectToBeFocused(page, "body", "disabled+pre-click reset");

    await page.mouse.click(shadowFocusableCenterX, shadowFocusableCenterY);
    await expectToBeFocused(page, "body", "disabled+click");

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      if (spy.eventName === "click") {
        // some components emit more than one click event (e.g., from calling `click()`),
        // so we check if at least one event is received
        expect(spy.length).toBeGreaterThanOrEqual(2);
      } else {
        expect(spy).toHaveReceivedEventTimes(eventsExpectedToBubble.includes(spy.eventName) ? 2 : 1);
      }
    });
  });

  it("events are no longer blocked right after enabling", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);

    const component = await page.find(tag);
    const ariaAttributeTargetElement = options.shadowAriaAttributeTargetSelector
      ? await page.find(`${tag} >>> ${options.shadowAriaAttributeTargetSelector}`)
      : component;

    await skipAnimations(page);
    await addRedirectPrevention(page, tag);

    const eventSpies = await createEventSpiesForExpectedEvents(component);

    component.setProperty("disabled", true);
    await page.waitForChanges();

    expect(ariaAttributeTargetElement.getAttribute("aria-disabled")).toBe("true");

    await page.click(tag);
    await page.waitForChanges();

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      expect(spy).toHaveReceivedEventTimes(eventsExpectedToBubble.includes(spy.eventName) ? 1 : 0);
    });

    type InteractiveCalciteComponents = IntrinsicElementsWithProp<"disabled"> & HTMLElement;

    // this needs to run in the browser context to ensure disabling and events fire immediately after being set
    await page.$eval(
      tag,
      (component: InteractiveCalciteComponents, allExpectedEvents: string[]) => {
        component.disabled = false;
        allExpectedEvents.forEach((event) => component.dispatchEvent(new MouseEvent(event)));

        component.disabled = true;
        allExpectedEvents.forEach((event) => component.dispatchEvent(new MouseEvent(event)));
      },
      allExpectedEvents,
    );

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      if (spy.eventName === "click") {
        // some components emit more than one click event (e.g., from calling `click()`),
        // so we check if at least one event is received
        expect(spy.length).toBeGreaterThanOrEqual(1);
      } else {
        expect(spy).toHaveReceivedEventTimes(eventsExpectedToBubble.includes(spy.eventName) ? 3 : 1);
      }
    });
  });
}
