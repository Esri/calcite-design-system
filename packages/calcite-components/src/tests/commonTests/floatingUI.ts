// @ts-strict-ignore

import { expect, it } from "vitest";
import { getTag, simplePageSetup } from "./utils";
import { ComponentTag, TagOrHTML } from "./interfaces";

/**
 * This helper will test if a floating-ui-owning component has configured the floating-ui correctly.
 * At the moment, this only tests if the scroll event listeners are only active when the floating-ui is displayed.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("owns a floating-ui", () => {
 *  floatingUIOwner(
 *    `<calcite-input-date-picker></calcite-input-date-picker>`,
 *      "open",
 *      { shadowSelector: ".menu-container" }
 *  )
 * });
 * @param {TagOrHTML} componentTagOrHTML - The component tag or HTML markup to test against.
 * @param {string} togglePropName - The component property that toggles the floating-ui.
 * @param [options] - additional options for asserting focus
 * @param {string} [options.shadowSelector] - The selector in the shadow DOM for the floating-ui element.
 */
export function floatingUIOwner(
  componentTagOrHTML: TagOrHTML,
  togglePropName: string,
  options?: {
    /** Use this to specify the selector in the shadow DOM for the floating-ui element. */
    shadowSelector?: string;
  },
): void {
  it("owns a floating-ui", async () => {
    const page = await simplePageSetup(componentTagOrHTML);

    const scrollablePageSizeInPx = 2400;
    await page.addStyleTag({
      content: `body {
      height: ${scrollablePageSizeInPx}px;
      width: ${scrollablePageSizeInPx}px;
    }`,
    });
    await page.waitForChanges();

    const tag = getTag(componentTagOrHTML);
    const component = await page.find(tag);

    async function getTransform(): Promise<string> {
      // need to get the style attribute from the browser context since the E2E element returns null
      return page.$eval(
        tag,
        (component: HTMLElement, shadowSelector: string): string => {
          const floatingUIEl = shadowSelector
            ? component.shadowRoot.querySelector<HTMLElement>(shadowSelector)
            : component;

          return floatingUIEl.getAttribute("style");
        },
        options?.shadowSelector,
      );
    }

    async function scrollTo(x: number, y: number): Promise<void> {
      await page.evaluate((x: number, y: number) => document.firstElementChild.scrollTo(x, y), x, y);
    }

    component.setProperty(togglePropName, false);
    await page.waitForChanges();

    const initialClosedTransform = await getTransform();

    await scrollTo(scrollablePageSizeInPx, scrollablePageSizeInPx);
    await page.waitForChanges();

    expect(await getTransform()).toBe(initialClosedTransform);

    await scrollTo(0, 0);
    await page.waitForChanges();

    expect(await getTransform()).toBe(initialClosedTransform);

    component.setProperty(togglePropName, true);
    await page.waitForChanges();

    const initialOpenTransform = await getTransform();

    await scrollTo(scrollablePageSizeInPx, scrollablePageSizeInPx);
    await page.waitForChanges();

    expect(await getTransform()).not.toBe(initialOpenTransform);

    await scrollTo(0, 0);
    await page.waitForChanges();

    expect(await getTransform()).toBe(initialOpenTransform);
  });
}

/**
 * Helper to test if a component has a floating-UI-owning component wired up.
 *
 * Note: this performs a shallow test and assumes the underlying component has floating-ui properly configured.
 *
 * @example
 * describe("delegates to floating-ui-owner component", () => {
 *   delegatesToFloatingUiOwningComponent("calcite-pad", "calcite-action-group");
 * });
 * @param componentTagOrHTML
 * @param floatingUiOwnerComponentTag
 */
export async function delegatesToFloatingUiOwningComponent(
  componentTagOrHTML: TagOrHTML,
  floatingUiOwnerComponentTag: ComponentTag,
): Promise<void> {
  it("delegates to floating-ui owning component", async () => {
    const page = await simplePageSetup(componentTagOrHTML);
    const tag = getTag(componentTagOrHTML);

    // we assume if `overlay-positioning` is used by an internal component that it is a floating-ui component

    const floatingUiOwningComponent = await page.find(`${tag} >>> ${floatingUiOwnerComponentTag}`);
    expect(await floatingUiOwningComponent.getProperty("overlayPositioning")).toBe("absolute");

    const component = await page.find(tag);
    await component.setProperty("overlayPositioning", "fixed");
    await page.waitForChanges();

    expect(await floatingUiOwningComponent.getProperty("overlayPositioning")).toBe("fixed");
  });
}

/**
 * Helper to test if a component has a calcite-action-menu wired up correctly with placement and flipPlacements.
 *
 * @example
 * describe("handles action-menu placement and flipPlacements", () => {
 *   handlesActionMenuPlacements(html`
 *    <calcite-panel placement="top">
 *      <calcite-action text="test" icon="banana" slot="${SLOTS.headerMenuActions}"></calcite-action>
 *     </calcite-panel>
 *   `);
 * });
 * @param componentTagOrHTML - The component tag or HTML markup to test against.
 */
export async function handlesActionMenuPlacements(componentTagOrHTML: TagOrHTML): Promise<void> {
  it("handles placement and flipPlacements", async () => {
    const page = await simplePageSetup(componentTagOrHTML);
    const tag = getTag(componentTagOrHTML);

    await page.waitForChanges();

    const flipPlacements = ["top", "bottom"];

    const component = await page.find(tag);
    component.setProperty("menuFlipPlacements", flipPlacements);
    component.setProperty("menuPlacement", "top");
    await page.waitForChanges();

    const actionMenu = await page.find(`${tag} >>> calcite-action-menu`);

    expect(await actionMenu.getProperty("placement")).toBe("top");
    expect(await actionMenu.getProperty("flipPlacements")).toEqual(flipPlacements);
  });
}
