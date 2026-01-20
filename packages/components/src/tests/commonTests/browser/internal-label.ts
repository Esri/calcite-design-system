import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import { IntrinsicElementsWithProp } from "../../utils/interfaces";

function hasLabelText(el: HTMLElement): el is IntrinsicElementsWithProp<"labelText"> & HTMLElement {
  return "labelText" in el;
}

function hasLabelTextStart(el: HTMLElement): el is IntrinsicElementsWithProp<"labelTextStart"> & HTMLElement {
  return "labelTextStart" in el;
}

function hasLabelTextEnd(el: HTMLElement): el is IntrinsicElementsWithProp<"labelTextEnd"> & HTMLElement {
  return "labelTextEnd" in el;
}

function hasRequired(el: HTMLElement): el is IntrinsicElementsWithProp<"required"> & HTMLElement {
  return "required" in el;
}

async function expectLabelText(expected: string): Promise<void> {
  const label = page.getByText(expected);

  await expect.element(label).not.toBeNull();
  await expect.element(label).toHaveTextContent(expected);
}

async function expectRequiredIndicator(): Promise<void> {
  const indicator = page.getByTitle(`Required`);

  await expect.element(indicator).not.toBeNull();
  await expect.element(indicator).toHaveTextContent("*");
}

/**
 * Helper to test InternalLabel functional component.
 * Verifies rendering and all configuration options.
 * Use within a describe block.
 *
 * @example
 * describe("internal label", () => {
 *   internalLabel(`calcite-input`);
 * });
 */
export function internalLabel(setup: () => ReturnType<typeof mount>): void {
  it("renders an internal label", async () => {
    const { el, component, reRender } = await setup();

    if (hasLabelText(el)) {
      el.labelText = "Test Label";
      await reRender();

      await expectLabelText("Test Label");
    } else if (!hasLabelTextEnd(el) && hasLabelTextStart(el)) {
      el.labelTextStart = "Test Label Start";
      await reRender();

      await expectLabelText("Test Label Start");
    } else if (!hasLabelTextStart(el) && hasLabelTextEnd(el)) {
      el.labelTextEnd = "Test Label End";
      await reRender();

      await expectLabelText("Test Label End");
    } else if (hasLabelTextStart(el) && hasLabelTextEnd(el)) {
      el.labelTextStart = "Test Label Start";
      el.labelTextEnd = "Test Label End";
      await reRender();

      await expectLabelText("Test Label Start");
      await expectLabelText("Test Label End");
    } else {
      expect.fail("component does not have an internal label");
    }

    const usesRequiredLabel = (el: HTMLElement) => !["calcite-radio-button", "calcite-switch"].includes(el.localName);

    if (hasRequired(el) && usesRequiredLabel(el)) {
      el.required = true;
      await reRender();

      type T9nComponent = IntrinsicElementsWithProp<"messages">;
      const t9nComponent = component as T9nComponent;

      // required indicator has associated tooltip, so we need to ensure messages are loaded
      if (t9nComponent.messages._loading) {
        await new Promise<void>((resolve) => {
          const intervalId = setInterval(async () => {
            if (!t9nComponent.messages._loading) {
              clearInterval(intervalId);
              resolve();
            }
          }, 25);
        });
      }

      await expectRequiredIndicator();
    }
  });
}
