import { describe, expect, it, onTestFinished } from "vitest";
import { mount, type RenderResult } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import { css } from "../../../../support/formatting";
import type { IntrinsicElementsWithProp } from "../../utils/interfaces";
import type { FlipPlacement, FloatingUIComponent } from "../../../utils/floating-ui";
import { afterNextFrame } from "../../utils/timing";
import type { LitElement } from "@arcgis/lumina";

/**
 * This helper will test if a floating-ui-owning component has configured the floating-ui correctly for both `absolute` and `fixed` overlay positioning strategies.
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
  setup: () => Promise<RenderResult<FloatingUIComponent & LitElement>>,
  togglePropName: string,
  options?: {
    /** Use this to specify the selector in the shadow DOM for the floating-ui element. */
    shadowSelector?: string;
  },
): void {
  type OverlayPositioning = "absolute" | "fixed";

  async function testOverlayPositioning(overlayPositioning: OverlayPositioning): Promise<void> {
    const viewportSizeInPx = 800;
    const pageScrollDistanceInPx = viewportSizeInPx * 4;
    const scrollablePageSizeInPx = pageScrollDistanceInPx + viewportSizeInPx;
    const { el, reRender } = await setup();

    el.overlayPositioning = overlayPositioning;
    await reRender();

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

    onTestFinished(() => style.remove());

    const shadowSelector = options?.shadowSelector;
    const floatingUiEl = shadowSelector ? el.shadowRoot.querySelector<HTMLElement>(shadowSelector)! : el;

    type Translate = {
      x: number;
      y: number;
    };

    function getTransform(): string {
      return floatingUiEl.style.transform;
    }

    function scrollTo(x: number, y: number): void {
      window.scrollTo(x, y);
    }

    async function scrollToAndWait(x: number, y: number): Promise<void> {
      scrollTo(x, y);
      await afterNextFrame();
    }

    el[togglePropName] = false;
    await reRender();

    const initialClosedTransform = getTransform();

    // floating-ui's autoUpdate triggers on scroll, so we wait for the event + animation frame to ensure DOM updates take place
    await scrollToAndWait(pageScrollDistanceInPx, pageScrollDistanceInPx);

    function getTranslate(transform: string): Translate {
      const translateMatch = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(transform)!;

      return {
        x: Number(translateMatch[1]),
        y: Number(translateMatch[2]),
      };
    }

    expect(getTransform()).toBe(initialClosedTransform);
    await expect.element(floatingUiEl).not.toBeVisible();

    await scrollToAndWait(0, 0);

    expect(getTransform()).toBe(initialClosedTransform);
    await expect.element(floatingUiEl).not.toBeVisible();

    el[togglePropName] = true;
    await reRender();
    await afterNextFrame();

    await expect.element(floatingUiEl).toBeVisible();

    const elRect = el.getBoundingClientRect();
    const floatingUiElRect = floatingUiEl.getBoundingClientRect();
    const middleScrollDistanceInPx = elRect.height / 2;
    const initialOpenTranslate = getTranslate(getTransform());

    async function scrollToAndGetTranslate(x: number, y: number): Promise<Translate> {
      await scrollToAndWait(x, y);
      return getTranslate(getTransform());
    }

    function expectCoordinatesToBeCloseTo(actual: Translate, expected: Translate): void {
      expect(actual.x).toBeCloseTo(expected.x, 1);
      expect(actual.y).toBeCloseTo(expected.y, 1);
    }

    const isFixed = overlayPositioning === "fixed";
    const middleScrollXTarget = isFixed ? 0 : middleScrollDistanceInPx;
    const bottomScrollXTarget = isFixed ? 0 : pageScrollDistanceInPx;

    const middleTranslate = await scrollToAndGetTranslate(middleScrollXTarget, middleScrollDistanceInPx);
    const middleScrollX = window.scrollX;
    const middleScrollY = window.scrollY;

    await expect.element(floatingUiEl).toBeVisible();

    const bottomTranslate = await scrollToAndGetTranslate(bottomScrollXTarget, pageScrollDistanceInPx);
    const bottomScrollX = window.scrollX;

    await expect.element(floatingUiEl).not.toBeVisible();

    const finalTranslate = await scrollToAndGetTranslate(0, 0);

    await expect.element(floatingUiEl).toBeVisible();

    const expectedMiddleTranslate = isFixed
      ? { x: initialOpenTranslate.x, y: initialOpenTranslate.y - middleScrollY }
      : { x: initialOpenTranslate.x + middleScrollX, y: initialOpenTranslate.y };

    expectCoordinatesToBeCloseTo(middleTranslate, expectedMiddleTranslate);

    if (isFixed) {
      const didChangeAtBottom =
        Math.abs(bottomTranslate.x - initialOpenTranslate.x) > 0.5 ||
        Math.abs(bottomTranslate.y - initialOpenTranslate.y) > 0.5;

      expect(didChangeAtBottom).toBe(true);
    } else {
      const expectedBottomTranslate = {
        x: initialOpenTranslate.x + bottomScrollX - floatingUiElRect.x,
        y: initialOpenTranslate.y,
      };

      expectCoordinatesToBeCloseTo(bottomTranslate, expectedBottomTranslate);
    }

    expectCoordinatesToBeCloseTo(finalTranslate, initialOpenTranslate);
  }

  describe("overlay positioning", () => {
    it("owns a floating-ui with absolute positioning", async () => {
      await testOverlayPositioning("absolute");
    });

    it("owns a floating-ui with fixed positioning", async () => {
      await testOverlayPositioning("fixed");
    });
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
