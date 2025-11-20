import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { CSS } from "../../../components/functional/InternalLabel";
import { shadowQuery } from "./utils";

type FilterPropsByPropertyName<T, PropName extends string> = {
  [K in keyof T]: PropName extends keyof T[K] ? T[K] : never;
};

/** Helper to extract a type by filtering the type by the property name. */
export type IntrinsicElementsWithProp<T extends string> = FilterPropsByPropertyName<
  DeclareElements,
  T
>[keyof FilterPropsByPropertyName<DeclareElements, T>];

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

function expectLabelText(el: HTMLElement, selector: string, expected: string) {
  const label = shadowQuery(el, selector);
  expect(label).not.toBeNull();
  expect(label.textContent).toContain(expected);
}

function expectRequiredIndicator(el: HTMLElement) {
  const indicator = shadowQuery(el, `.${CSS.requiredIndicator}`);
  expect(indicator).not.toBeNull();
  expect(indicator.textContent).toBe("*");
  expect(indicator.getAttribute("title")).toBe("Required");
}

/**
 * Helper to test InternalLabel functional component.
 * Verifies rendering and all configuration options.
 * Use within a describe block.
 *
 * @example
 * describe("InternalLabel", () => {
 *   internalLabel(`calcite-input`);
 * });
 */
export function internalLabel(setup: () => ReturnType<typeof mount>): void {
  it("renders an internal label", async () => {
    const { el, component, reRender } = await setup();

    if (hasLabelText(el)) {
      el.labelText = "Test Label";
      await reRender();

      expectLabelText(el, `.${CSS.container}`, "Test Label");
    } else if (!hasLabelTextEnd(el) && hasLabelTextStart(el)) {
      el.labelTextStart = "Test Label Start";
      await reRender();

      expectLabelText(el, `.${CSS.container}`, "Test Label Start");
    } else if (!hasLabelTextStart(el) && hasLabelTextEnd(el)) {
      el.labelTextEnd = "Test Label End";
      await reRender();

      expectLabelText(el, `.${CSS.container}`, "Test Label End");
    } else if (hasLabelTextStart(el) && hasLabelTextEnd(el)) {
      el.labelTextStart = "Test Label Start";
      el.labelTextEnd = "Test Label End";
      await reRender();

      expectLabelText(el, `.${CSS.container}:first-of-type`, "Test Label Start");
      expectLabelText(el, `.${CSS.container}:last-of-type`, "Test Label End");
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
          }, 0);
        });
      }

      expectRequiredIndicator(el);
    }
  });
}
