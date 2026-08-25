import { expect, it } from "vitest";
import { type mount } from "@arcgis/lumina-compiler/testing";
import type { Scale } from "../../../components/types";

const scales: Scale[] = ["s", "l"];

/**
 * Verifies that scale-controlled elements match their parent's scale initially and after scale change.
 *
 * Callers provide a selector for scale-controlled elements. The selector is searched in the document and the mounted
 * parent's shadow root.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("scale propagation", () => {
 *   scalePropagates(
 *     () => mount(
 *         <calcite-card-group>
 *           <calcite-card />
 *           <calcite-card />
 *         </calcite-card-group>,
 *       ),
 *     { targetSelector: "calcite-card" },
 *   );
 * });
 */
export function scalePropagates(
  setup: () => ReturnType<typeof mount>,
  {
    /** Selector for the elements whose scale should match the parent. */
    targetSelector,
  }: { targetSelector: string },
): void {
  it("propagates scale to targets", async () => {
    const { el, reRender } = await setup();
    const parent = el as typeof el & { scale: Scale };

    const assertTargetsMatchParent = async (): Promise<void> => {
      const targets = [
        ...document.querySelectorAll<HTMLElement>(targetSelector),
        ...(parent.shadowRoot?.querySelectorAll<HTMLElement>(targetSelector) ?? []),
      ];

      expect(targets.length).toBeGreaterThan(0);

      for (const target of targets) {
        await expect.element(target).toHaveProperty("scale", parent.scale);
      }
    };

    await assertTargetsMatchParent();

    for (const scale of scales) {
      if (scale === parent.scale) {
        continue;
      }

      parent.scale = scale;
      await reRender();

      await assertTargetsMatchParent();
    }
  });
}
