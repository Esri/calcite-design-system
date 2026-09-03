import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { Locator, page } from "vitest/browser";
import { getEventPrefix, waitForEvent } from "./utils";
import { FocusTrapComponent } from "../../../controllers/useFocusTrap";
import { afterFocusShiftDelay } from "../../utils/focus-trap";

interface FocusTrapOptions {
  /**
   * The locator for the element expected to receive focus when the component is opened.
   * If not provided, the component itself will be used as the target.
   */
  focusTarget?: () => Locator;

  /**
   * The property that toggles the opening of the component.
   */
  toggleProp: string;
}

type FocusTrapTestElement = FocusTrapComponent;

async function toggleComponent(el: FocusTrapTestElement, toggleProp: string): Promise<void> {
  const openEvent = waitForEvent(el, `${getEventPrefix(el)}Open`);

  Object.assign(el, { [toggleProp]: true });
  await openEvent;
  await afterFocusShiftDelay();
}

/**
 * Helper for testing focus-trapping behavior in components.
 *
 * Note: this assumes the component under test is closed and will be opened before running assertions.
 */
export function focusTrap(setUp: () => ReturnType<typeof mount>, options: FocusTrapOptions): void {
  const { focusTarget, toggleProp } = options;

  describe("initialFocus", () => {
    async function setUpTest(): Promise<{ el: FocusTrapTestElement; target: Locator }> {
      const { el } = await setUp();
      const component = el as FocusTrapTestElement;
      const target = focusTarget?.() ?? page.elementLocator(el);

      return { el: component, target };
    }

    it("does not focus when false", async () => {
      const { el, target } = await setUpTest();

      await expect.element(target).not.toHaveFocus();

      el.focusTrapOptions = { initialFocus: false };
      await toggleComponent(el, toggleProp);

      await expect.element(target).not.toHaveFocus();
    });

    it("focuses by default", async () => {
      const { el, target } = await setUpTest();

      await expect.element(target).not.toHaveFocus();

      await toggleComponent(el, toggleProp);

      await expect.element(target).toHaveFocus();
    });

    it("focuses when set to undefined (default behavior)", async () => {
      const { el, target } = await setUpTest();

      await expect.element(target).not.toHaveFocus();

      el.focusTrapOptions = { initialFocus: undefined };
      await toggleComponent(el, toggleProp);

      await expect.element(target).toHaveFocus();
    });

    describe("when focusTrapDisabled = true", () => {
      it("focuses when false", async () => {
        const { el, target } = await setUpTest();
        el.focusTrapDisabled = true;
        el.focusTrapOptions = { initialFocus: false };

        await expect.element(target).not.toHaveFocus();

        await toggleComponent(el, toggleProp);

        await expect.element(target).toHaveFocus();
      });

      it("focuses by default", async () => {
        const { el, target } = await setUpTest();
        el.focusTrapDisabled = true;

        await expect.element(target).not.toHaveFocus();

        await toggleComponent(el, toggleProp);

        await expect.element(target).toHaveFocus();
      });

      it("focuses when set to undefined (default behavior)", async () => {
        const { el, target } = await setUpTest();

        el.focusTrapDisabled = true;
        await expect.element(target).not.toHaveFocus();

        el.focusTrapOptions = { initialFocus: undefined };
        await toggleComponent(el, toggleProp);

        await expect.element(target).toHaveFocus();
      });
    });
  });
}
