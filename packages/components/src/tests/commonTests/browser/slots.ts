import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { waitForAnimationFrame } from "../../utils/timing";

/**
 * Helper for asserting slots.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("slots", () => {
 *    slots(() => mount("calcite-stack"), SLOTS)
 * })
 */
export function slots(
  setup: () => ReturnType<typeof mount>,
  slots: Record<string, string> | string[],
  includeDefaultSlot = false,
): void {
  it("has slots", async () => {
    const { el } = await setup();
    const slotNames = Array.isArray(slots) ? slots : Object.values(slots);

    async function slotTestElement(testClass: string, slotName?: string): Promise<void> {
      const elToSlot = document.createElement("div"); // slotting a <div> will suffice for our purposes
      elToSlot.classList.add(testClass);

      if (slotName) {
        elToSlot.slot = slotName;
      }

      el.append(elToSlot);
      await waitForAnimationFrame();
    }

    const namedSlotTestClass = "slotted-into-named-slot";
    const defaultSlotTestClass = "slotted-into-default-slot";

    for (let i = 0; i < slotNames.length; i++) {
      await slotTestElement(namedSlotTestClass, slotNames[i]);
    }

    if (includeDefaultSlot) {
      await slotTestElement(defaultSlotTestClass);
    }

    const slotted = Array.from(document.querySelectorAll(`.${namedSlotTestClass}`))
      .filter((slotted) => slotted.assignedSlot)
      .map((slotted) => slotted.slot);

    expect(slotNames).toEqual(slotted);

    if (includeDefaultSlot) {
      const defaultSlotted = document.querySelector(`.${defaultSlotTestClass}`)!;
      const hasDefaultSlotted = defaultSlotted.assignedSlot?.name === "" && defaultSlotted.slot === "";

      expect(hasDefaultSlotted).toBe(true);
    }
  });
}
