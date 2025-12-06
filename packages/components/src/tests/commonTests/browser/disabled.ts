import { SetFieldType } from "type-fest";
import { expect, it, vi } from "vitest";
import { page, userEvent } from "@vitest/browser/context";
import { mount } from "@arcgis/lumina-compiler/testing";
import { waitForAnimationFrame, waitForNextTick } from "../../utils/timing";
import { IntrinsicElementsWithProp } from "../../utils/interfaces";

/** This interface is used to specify focus targets for different interactions. */
export interface TabAndClickFocusTargets {
  tab: string;
  click:
    | string
    | {
        pointer: string;
        method: string;
      };
}

export type FocusTarget = "host" | "child" | "none";

export interface DisabledOptions {
  /** The selector of the target element. When not provided, the component tag is used. */
  selector?: string;

  /** Use this to specify whether the test should cover focusing. */
  focusTarget?: FocusTarget | TabAndClickFocusTargets;
}

/**
 * Helper to test the disabled prop disabling user interaction.
 *
 * Note that this helper should be used within a describe block.
 *
 * @param setup
 * @param options
 * @example
 * describe("disabled", () => {
 *    disabled("calcite-input")
 * });
 */
export function disabled(setup: () => ReturnType<typeof mount>, options?: DisabledOptions): void {
  const effectiveOptions = { focusTarget: "host", ...options } as const;

  type InteractiveComponent = IntrinsicElementsWithProp<"disabled"> & HTMLElement;

  function isInteractiveComponent(el: HTMLElement): el is InteractiveComponent {
    return "disabled" in el;
  }

  function getDisabledTarget(el: HTMLElement, options?: DisabledOptions): InteractiveComponent {
    const target = options?.selector ? el.querySelector<HTMLElement>(options.selector)! : el;

    if (isInteractiveComponent(target)) {
      return target;
    }

    throw new Error(`The target element "${target.tagName.toLowerCase()}" does not have a "disabled" property.`);
  }

  function addRedirectPrevention(tag: string): void {
    const el = document.querySelector(tag)!;
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
  }

  function expectToBeFocused(tag: string, context: string): void {
    const focusedTag = document.activeElement?.tagName.toLowerCase();
    expect(`${context}:${focusedTag}`).toBe(`${context}:${tag}`);
  }

  function assertOnMouseAndPointerEvents(
    spies: ReturnType<typeof vi.fn>[],
    expectCallback: (spy: ReturnType<typeof vi.fn>) => void,
  ): void {
    for (const spy of spies) {
      expectCallback(spy);
    }
  }

  // only testing events from https://github.com/web-platform-tests/wpt/blob/master/html/semantics/disabled-elements/event-propagate-disabled.tentative.html#L66
  const eventsExpectedToBubble = ["mousemove", "pointermove", "pointerdown", "pointerup"];
  const eventsExpectedToNotBubble = ["mousedown", "mouseup", "click"];
  const allExpectedEvents = [...eventsExpectedToBubble, ...eventsExpectedToNotBubble];

  const createEventSpiesForExpectedEvents = (el: HTMLElement): ReturnType<typeof vi.fn>[] => {
    return allExpectedEvents.map((event) => {
      const listenerSpy = vi.fn();
      listenerSpy.mockName(event);
      el.addEventListener(event, listenerSpy);
      return listenerSpy;
    });
  };

  function getFocusTarget(tag: string, focusTarget: FocusTarget): string {
    return focusTarget === "host" ? tag : document.activeElement!.tagName.toLowerCase();
  }

  type EffectiveTabAndClickFocusTargets = SetFieldType<
    TabAndClickFocusTargets,
    "click",
    Exclude<TabAndClickFocusTargets["click"], string>
  >;

  const getTabAndClickFocusTarget = (
    tag: string,
    focusTarget: Exclude<DisabledOptions["focusTarget"], undefined>,
  ): EffectiveTabAndClickFocusTargets => {
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

    const sameClickAndTabFocusTarget = getFocusTarget(tag, focusTarget);

    return {
      tab: sameClickAndTabFocusTarget,
      click: {
        pointer: sameClickAndTabFocusTarget,
        method: defaultClickMethodTarget,
      },
    };
  };

  const getShadowFocusableCenterCoordinates = (tabFocusTarget: string): number[] => {
    const element = document.querySelector(tabFocusTarget)!;
    const focusTarget = element.shadowRoot!.activeElement || element;
    const rect = focusTarget.getBoundingClientRect();

    return [rect.x + rect.width / 2, rect.y + rect.height / 2];
  };

  it("prevents focusing via keyboard and mouse", async () => {
    const { el, reRender } = await setup();

    const target = getDisabledTarget(el, effectiveOptions);

    addRedirectPrevention(target.localName);

    // setting page size seems to improve consistency between local and CI runs, see https://github.com/Esri/calcite-design-system/pull/10141/ for more info
    await page.viewport(1200, 800);

    const eventSpies = createEventSpiesForExpectedEvents(target);

    expect(target.getAttribute("aria-disabled")).toBeNull();

    if (effectiveOptions.focusTarget === "none") {
      await userEvent.click(target, { force: true });
      expectToBeFocused("body", "none+click");

      assertOnMouseAndPointerEvents(eventSpies, (spy) => expect(spy).toHaveBeenCalledTimes(1));

      target.disabled = true;
      await reRender();

      expect(target.getAttribute("aria-disabled")).toBe("true");

      await userEvent.click(target, { force: true });
      expectToBeFocused("body", "none+disabled+click");

      target.click();
      expectToBeFocused("body", "none+disabled+click()");

      assertOnMouseAndPointerEvents(eventSpies, (spy) => {
        expect(spy).toHaveBeenCalledTimes(eventsExpectedToBubble.includes(spy.getMockName()) ? 2 : 1);
      });

      return;
    }

    await userEvent.keyboard("{Tab}");
    const effectiveFocusTarget = getTabAndClickFocusTarget(target.localName, effectiveOptions.focusTarget);

    expect(effectiveFocusTarget.tab).not.toBe("body");
    expectToBeFocused(effectiveFocusTarget.tab, "tab");

    const [shadowFocusableCenterX, shadowFocusableCenterY] = getShadowFocusableCenterCoordinates(
      effectiveFocusTarget.tab,
    );

    async function resetFocusOrder(): Promise<void> {
      // test page has default margin, so clicking on 0,0 will not hit the test element
      await userEvent.click(document.body, { delay: 100, position: { x: -8, y: -8 }, force: true }); // we need an extra click in case a component has focusing-on-blur behavior
      await userEvent.click(document.body, { position: { x: -8, y: -8 }, force: true });
    }

    await resetFocusOrder();
    expectToBeFocused("body", "pre-click reset");

    await userEvent.click(document.body, {
      position: { x: shadowFocusableCenterX, y: shadowFocusableCenterY },
      force: true,
    });

    // wait to ensure focus has been applied and browser has flushed layout
    await waitForAnimationFrame();

    expectToBeFocused(effectiveFocusTarget.click.pointer, "click");

    await resetFocusOrder();
    expectToBeFocused("body", "pre-click() reset");

    target.click();
    expectToBeFocused(effectiveFocusTarget.click.method, "click()");

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      if (spy.getMockName() === "click") {
        // some components emit more than one click event (e.g., from calling `click()`),
        // so we check if at least one event is received
        expect(spy.mock.calls.length).toBeGreaterThanOrEqual(2);
      } else {
        expect(spy).toHaveBeenCalledTimes(1);
      }
    });

    target.disabled = true;
    await reRender();

    // ensure focus has been applied and browser has flushed layout
    await waitForAnimationFrame();

    expect(target.getAttribute("aria-disabled")).toBe("true");

    await resetFocusOrder();
    expectToBeFocused("body", "disabled+pre-tab reset");

    await userEvent.keyboard("{Tab}");
    expect(effectiveFocusTarget.tab).not.toBe("body");

    await resetFocusOrder();
    expectToBeFocused("body", "disabled+pre-click reset");

    await userEvent.click(document.body, { position: { x: shadowFocusableCenterX, y: shadowFocusableCenterY } });
    expectToBeFocused("body", "disabled+click");

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      if (spy.getMockName() === "click") {
        // some components emit more than one click event (e.g., from calling `click()`),
        // so we check if at least one event is received
        expect(spy.mock.calls.length).toBeGreaterThanOrEqual(2);
      } else {
        expect(spy).toHaveBeenCalledTimes(eventsExpectedToBubble.includes(spy.getMockName()) ? 2 : 1);
      }
    });
  });

  it("events are no longer blocked right after enabling", async () => {
    const { el, reRender } = await setup();
    const target = getDisabledTarget(el, effectiveOptions);

    addRedirectPrevention(target.localName);

    const eventSpies = createEventSpiesForExpectedEvents(target);

    target.disabled = true;
    await reRender();
    await waitForNextTick();

    expect(target.getAttribute("aria-disabled")).toBe("true");

    await userEvent.click(target, { force: true });

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      expect(spy).toHaveBeenCalledTimes(eventsExpectedToBubble.includes(spy.getMockName()) ? 1 : 0);
    });

    // this ensures disabling and events fire immediately after being set
    target.disabled = false;
    await reRender();
    await waitForNextTick();

    const [clientX, clientY] = getShadowFocusableCenterCoordinates(target.tagName);

    allExpectedEvents.forEach((event) =>
      target.dispatchEvent(
        new MouseEvent(event, {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX,
          clientY,
        }),
      ),
    );

    target.disabled = true;
    await reRender();
    await waitForNextTick();
    allExpectedEvents.forEach((event) =>
      target.dispatchEvent(
        new MouseEvent(event, {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX,
          clientY,
        }),
      ),
    );

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      if (spy.getMockName() === "click") {
        // some components emit more than one click event (e.g., from calling `click()`),
        // so we check if at least one event is received
        expect(spy.mock.calls.length).toBeGreaterThanOrEqual(1);
      } else {
        expect(spy).toHaveBeenCalledTimes(eventsExpectedToBubble.includes(spy.getMockName()) ? 3 : 1);
      }
    });
  });
}
