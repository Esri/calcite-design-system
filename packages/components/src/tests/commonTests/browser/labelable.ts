import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, onTestFinished } from "vitest";
import { type Locator, page } from "vitest/browser";
import type { Label } from "../../../components/label/label";
import { afterNextFrame } from "../../utils/timing";

type BooleanPropertyElement = HTMLElement & Record<string, boolean>;

interface LabelableMountOptions {
  readonly parent: HTMLElement;

  /**
   * Helper required for test setup.
   */
  afterConnect: NonNullable<Parameters<typeof mount>[1]>["afterConnect"];
}

export interface LabelableOptions {
  /** Locator used to assert the focused element. */
  focusTarget?: () => Locator;

  /** If clicking on a label toggles the labelable component, use this prop to specify the name of the toggled prop. */
  propertyToToggle?: string;
}

function createLabel(): Label["el"] {
  return document.createElement("calcite-label");
}

function connectLabel(label: Label["el"]): void {
  document.body.append(label);
  onTestFinished(() => label.remove());
}

function hasBooleanProperty(element: HTMLElement, property: string): element is BooleanPropertyElement {
  return typeof Reflect.get(element, property) === "boolean";
}

async function waitForExplicitLabelAssociation(label: Label["el"]): Promise<void> {
  await label.componentOnReady();
  // `for` is processed during the label update, which then schedules its association on the next frame.
  await afterNextFrame();
  await afterNextFrame();
}

async function waitForLabelConnection(result: Awaited<ReturnType<typeof mount>>, label: Label["el"]): Promise<void> {
  await result.el.componentOnReady();
  await label.componentOnReady();
  await afterNextFrame();
}

/**
 * Helper for asserting label clicking functionality.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("labelable", () => {
 *   labelable((mountOptions) => mount(<calcite-button>Continue</calcite-button>, mountOptions));
 * });
 */
export function labelable(
  setup: (mountOptions: LabelableMountOptions) => ReturnType<typeof mount>,
  options?: LabelableOptions,
): void {
  const id = "labelable-id";

  const mountLabelable = (parent: HTMLElement, elementId = id) =>
    setup({
      parent,
      afterConnect: (el) => {
        el.id = elementId;
      },
    });

  async function assertLabelable(result: Awaited<ReturnType<typeof mount>>, label: Label["el"]): Promise<void> {
    const { el, reRender } = result;
    const focusTarget = options?.focusTarget?.() ?? page.elementLocator(el);
    const propertyToToggle = options?.propertyToToggle;
    const toggleableElement = propertyToToggle && hasBooleanProperty(el, propertyToToggle) ? el : undefined;

    if (propertyToToggle && !toggleableElement) {
      expect.fail(`Element does not have boolean "${propertyToToggle}" property.`);
    }

    const toggleState =
      propertyToToggle && toggleableElement
        ? {
            element: toggleableElement,
            initialValue: toggleableElement[propertyToToggle],
            property: propertyToToggle,
          }
        : undefined;

    label.click();
    await afterNextFrame();
    await reRender();

    assertFocus(focusTarget);

    if (toggleState) {
      const toggledPropertyValue = !toggleState.initialValue;

      expect(toggleState.element[toggleState.property]).toBe(toggledPropertyValue);

      toggleState.element[toggleState.property] = toggleState.initialValue;
      await reRender();
      el.click();
      await reRender();

      expect(toggleState.element[toggleState.property]).toBe(toggledPropertyValue);
    }

    el.click();
    await reRender();

    assertFocus(focusTarget);
  }

  function assertFocus(focusTarget: Locator): void {
    const focusTargetElement = focusTarget.element();
    const focusRoot = focusTargetElement.getRootNode();

    if (focusRoot instanceof ShadowRoot) {
      expect(focusRoot.activeElement?.contains(focusTargetElement)).toBe(true);
    } else {
      expect(focusTargetElement).toHaveFocus();
    }
  }

  describe("label wraps labelables", () => {
    it("is labelable when component is wrapped in a label", async () => {
      const label = createLabel();
      connectLabel(label);
      const result = await mountLabelable(label);
      await waitForLabelConnection(result, label);

      await assertLabelable(result, label);
    });

    it("is labelable when wrapping label is set prior to component", async () => {
      const label = createLabel();
      connectLabel(label);
      await label.componentOnReady();
      const result = await mountLabelable(label);
      await waitForLabelConnection(result, label);

      await assertLabelable(result, label);
    });

    it("is labelable when a component is set first before being wrapped in a label", async () => {
      const result = await mountLabelable(document.body);
      const label = createLabel();
      connectLabel(label);
      label.append(result.el);
      await label.componentOnReady();
      await result.reRender();
      await waitForLabelConnection(result, label);

      await assertLabelable(result, label);
    });

    it("only sets focus on the first labelable when label is clicked", async () => {
      const label = createLabel();
      connectLabel(label);
      const firstResult = await mountLabelable(label);
      await mountLabelable(label, `${id}-2`);
      await mountLabelable(label, `${id}-3`);
      await waitForLabelConnection(firstResult, label);

      await assertLabelable(firstResult, label);
    });
  });

  describe("label is sibling to labelables", () => {
    it("is labelable with label set as a sibling to the component", async () => {
      const label = createLabel();
      label.for = id;
      connectLabel(label);
      const result = await mountLabelable(document.body);
      await waitForExplicitLabelAssociation(label);

      await assertLabelable(result, label);
    });

    it("is labelable when sibling label is set prior to component", async () => {
      const label = createLabel();
      label.for = id;
      connectLabel(label);
      await label.componentOnReady();
      const result = await mountLabelable(document.body);
      label.for = undefined;
      label.for = id;
      await waitForExplicitLabelAssociation(label);

      await assertLabelable(result, label);
    });

    it("is labelable for a component set before sibling label", async () => {
      const result = await mountLabelable(document.body);
      const label = createLabel();
      label.for = id;
      connectLabel(label);
      await waitForExplicitLabelAssociation(label);

      await assertLabelable(result, label);
    });

    it("is labelable when label's for is set after initialization", async () => {
      const label = createLabel();
      connectLabel(label);
      const result = await mountLabelable(document.body);
      await label.componentOnReady();
      label.for = id;
      await waitForExplicitLabelAssociation(label);

      await assertLabelable(result, label);
    });
  });
}
