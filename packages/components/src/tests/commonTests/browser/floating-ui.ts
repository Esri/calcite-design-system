import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "@vitest/browser/context";
import { css } from "../../../../support/formatting";
import { IntrinsicElementsWithProp } from "../../utils/interfaces";
import { FlipPlacement } from "../../../utils/floating-ui";
import { waitForAnimationFrame } from "../../utils/timing";

/**
 * This helper will test if a floating-ui-owning component has configured the floating-ui correctly.
 * At the moment, this only tests if the scroll event listeners are only active when the floating-ui is displayed.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("floating-ui", () => {
 *   describe("owns a floating-ui", () => {
 *     floatingUIOwner(
 *       () => mount(<calcite-input-date-picker></calcite-input-date-picker>),
 *       "open",
 *       { shadowSelector: ".menu-container" }
 *     )
 *   });
 * });
 */
export function floatingUIOwner(
  setup: () => ReturnType<typeof mount>,
  togglePropName: string,
  options?: {
    /** Use this to specify the selector in the shadow DOM for the floating-ui element. */
    shadowSelector?: string;
  },
): void {
  it("owns a floating-ui", async () => {
    const viewportSizeInPx = 800;
    const scrollablePageSizeInPx = viewportSizeInPx * 4;
    const { el } = await setup();

    // use smaller viewport to enable scrolling
    await page.viewport(viewportSizeInPx, viewportSizeInPx);

    const style = document.createElement("style");
    style.innerHTML = css`
      body {
        height: ${scrollablePageSizeInPx}px;
        width: ${scrollablePageSizeInPx}px;
      }
    `;
    document.head.append(style);

    const shadowSelector = options?.shadowSelector;
    const floatingUIEl = shadowSelector ? el.shadowRoot.querySelector<HTMLElement>(shadowSelector)! : el;

    function getTransform(): string {
      return floatingUIEl.style.transform;
    }

    function scrollTo(x: number, y: number): void {
      window.scrollTo(x, y);
    }

    function waitForScrollEvent(): Promise<void> {
      return new Promise<void>((resolve) => {
        window.addEventListener("scroll", () => resolve(), { once: true });
      });
    }

    try {
      el[togglePropName] = false;
      await waitForAnimationFrame();

      const initialClosedTransform = getTransform();

      // floating-ui's autoUpdate triggers on scroll, so we wait for the event + animation frame to ensure DOM updates take place

      scrollTo(scrollablePageSizeInPx, scrollablePageSizeInPx);
      await waitForScrollEvent();
      await waitForAnimationFrame();

      expect(getTransform()).toBe(initialClosedTransform);
      await expect.element(floatingUIEl).not.toBeVisible();

      scrollTo(0, 0);
      await waitForScrollEvent();
      await waitForAnimationFrame();

      expect(getTransform()).toBe(initialClosedTransform);
      await expect.element(floatingUIEl).not.toBeVisible();

      el[togglePropName] = true;
      await waitForAnimationFrame();

      const initialOpenTransform = getTransform();

      scrollTo(scrollablePageSizeInPx, scrollablePageSizeInPx);
      await waitForScrollEvent();
      await waitForAnimationFrame();

      expect(getTransform()).not.toBe(initialOpenTransform);
      await expect.element(floatingUIEl).not.toBeVisible();

      scrollTo(0, 0);
      await waitForScrollEvent();
      await waitForAnimationFrame();

      expect(getTransform()).toBe(initialOpenTransform);
      await expect.element(floatingUIEl).toBeVisible();
    } finally {
      style.remove();
    }
  });
}

/**
 * Helper to test if a component has a floating-UI-owning component wired up.
 *
 * Note: this performs a shallow test and assumes the underlying component has floating-ui properly configured.
 *
 * @example
 * describe("floating-ui", () => {
 *   describe("delegates to floating-ui-owner component", () => {
 *     delegatesToFloatingUiOwningComponent(() => mount("calcite-action-pad"), "calcite-action-group");
 *   });
 * });
 */
export async function delegatesToFloatingUiOwningComponent(
  setup: () => ReturnType<typeof mount>,
  floatingUiOwnerComponentTag: keyof DeclareElements,
): Promise<void> {
  it("delegates to floating-ui owning component", async () => {
    const { el, reRender } = await setup();
    // we assume if `overlay-positioning` is used by an internal component that it is a floating-ui component
    const floatingUiOwningComponent = el.shadowRoot.querySelector(
      floatingUiOwnerComponentTag,
    )! as IntrinsicElementsWithProp<"overlayPositioning">;

    expect(floatingUiOwningComponent.overlayPositioning).toBe("absolute");

    (el as IntrinsicElementsWithProp<"overlayPositioning">).overlayPositioning = "fixed";
    await reRender();

    expect(floatingUiOwningComponent.overlayPositioning).toBe("fixed");
  });
}

/**
 * Helper to test if a component has a calcite-action-menu wired up correctly with placement and flipPlacements.
 *
 * @example
 * describe("floating-ui", () => {
 *   describe("handles action-menu placement and flipPlacements", () => {
 *     handlesActionMenuPlacements(
 *       () => mount(
 *         <calcite-panel placement="top">
 *           <calcite-action text="test" icon="banana" slot="${SLOTS.headerMenuActions}"></calcite-action>
 *         </calcite-panel>
 *       )
 *     );
 *   });
 * });
 */
export async function handlesActionMenuPlacements(setup: () => ReturnType<typeof mount>): Promise<void> {
  it("handles placement and flipPlacements", async () => {
    const { el, reRender } = await setup();
    const flipPlacements: FlipPlacement[] = ["top", "bottom"];
    const actionMenu = el.shadowRoot.querySelector("calcite-action-menu")!;

    (el as IntrinsicElementsWithProp<"menuFlipPlacements">).menuFlipPlacements = flipPlacements;
    (el as IntrinsicElementsWithProp<"menuPlacement">).menuPlacement = "top";
    await reRender();

    expect(actionMenu.placement).toBe("top");
    expect(actionMenu.flipPlacements).toEqual(flipPlacements);
  });
}
