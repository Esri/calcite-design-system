// @ts-strict-ignore
import { expect, it } from "vitest";
import { getTag, simplePageSetup } from "./utils";
import { TagOrHTML } from "./interfaces";

/**
 * Helper for asserting slots.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("slots", () => {
 *    slots("calcite-stack", SLOTS)
 * })
 * @param {string} componentTagOrHTML - The component tag or HTML markup to test against.
 * @param {Record<string, string> | string[]} slots - A component's SLOTS resource object or an array of slot names.
 * @param {boolean} includeDefaultSlot - When true, it will run assertions on the default slot.
 */
export function slots(
  componentTagOrHTML: TagOrHTML,
  slots: Record<string, string> | string[],
  includeDefaultSlot = false,
): void {
  it("has slots", async () => {
    const page = await simplePageSetup(componentTagOrHTML);
    const tag = getTag(componentTagOrHTML);
    const slotNames = Array.isArray(slots) ? slots : Object.values(slots);

    await page.$eval(
      tag,
      async (component, slotNames: string[], includeDefaultSlot?: boolean) => {
        async function slotTestElement(testClass: string, slotName?: string): Promise<void> {
          const el = document.createElement("div"); // slotting a <div> will suffice for our purposes
          el.classList.add(testClass);

          if (slotName) {
            el.slot = slotName;
          }

          component.append(el);
          await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        }

        for (let i = 0; i < slotNames.length; i++) {
          await slotTestElement("slotted-into-named-slot", slotNames[i]);
        }

        if (includeDefaultSlot) {
          await slotTestElement("slotted-into-default-slot");
        }
      },
      slotNames,
      includeDefaultSlot,
    );

    await page.waitForChanges();

    const slotted = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".slotted-into-named-slot"))
        .filter((slotted) => slotted.assignedSlot)
        .map((slotted) => slotted.slot),
    );

    expect(slotNames).toEqual(slotted);

    if (includeDefaultSlot) {
      const hasDefaultSlotted = await page.evaluate(() => {
        const defaultSlotted = document.querySelector(".slotted-into-default-slot");
        return defaultSlotted.assignedSlot?.name === "" && defaultSlotted.slot === "";
      });

      expect(hasDefaultSlotted).toBe(true);
    }
  });
}
