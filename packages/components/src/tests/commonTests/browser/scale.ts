import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import type { Scale } from "../../../components/types";
import type { IntrinsicElementsWithProp } from "../../utils/types";

const initialScale: Scale = "s";
const scales: Scale[] = ["m", "l"];
type ScaleComponent = IntrinsicElementsWithProp<"scale">;

interface TestSetupMountOptions {
  /** Helper required for initializing scale propagation testing. */
  afterConnect: NonNullable<Parameters<typeof mount>[1]>["afterConnect"];
}

/**
 * Verifies that scale-controlled elements match their parent's scale initially and after scale change.
 *
 * Callers provide a selector for scale-controlled elements.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("propagates", () => {
 *   scalePropagates(
 *     (mountOptions) => mount(
 *         <calcite-card-group>
 *           <calcite-card />
 *           <calcite-card />
 *         </calcite-card-group>,
 *         mountOptions,
 *       ),
 *     { targetSelector: "calcite-card" },
 *   );
 * });
 */
export function scalePropagates(
  setup: (mountOptions: TestSetupMountOptions) => ReturnType<typeof mount>,
  { targetSelector }: { targetSelector: string },
): void {
  it("propagates scale to targets", async () => {
    const { el, reRender } = await setup({
      afterConnect: (el) => {
        (el as ScaleComponent).scale = initialScale;
      },
    });
    const parent = el as ScaleComponent;

    expect(parent.scale).toBe(initialScale);

    const assertTargetsMatchParent = async (): Promise<void> => {
      const targets = page.getBySelector(targetSelector);
      const targetCount = targets.elements().length;

      expect(targetCount).toBeGreaterThan(0);

      for (let index = 0; index < targetCount; index++) {
        await expect.element(targets.nth(index)).toHaveProperty("scale", parent.scale);
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
