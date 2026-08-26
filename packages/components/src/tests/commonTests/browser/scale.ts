import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import type { Scale } from "../../../components/types";

const initialScale: Scale = "s";
const scales: Scale[] = ["m", "l"];

/**
 * Verifies that scale-controlled elements match their parent's scale initially and after scale change.
 *
 * Callers provide a selector for scale-controlled elements. The selector is searched in the document and the mounted parent's shadow root.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("scale propagation", () => {
 *   scalePropagates(
 *     (scale) => mount(
 *         <calcite-card-group scale={scale}>
 *           <calcite-card />
 *           <calcite-card />
 *         </calcite-card-group>,
 *       ),
 *     { targetSelector: "calcite-card" },
 *   );
 * });
 */
export function scalePropagates(
  setup: (initialScale: Scale) => ReturnType<typeof mount>,
  {
    /** Selector for the elements whose scale should match the parent. */
    targetSelector,
  }: { targetSelector: string },
): void {
  it("propagates scale to targets", async () => {
    const { el, reRender } = await setup(initialScale);
    const parent = el as typeof el & { scale: Scale };

    expect(parent.scale).toBe(initialScale);

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
