import { describe, expect, it, vi } from "vitest";
import { waitForAnimationFrame } from "../tests/utils";
import { createControlledPromise } from "../tests/utils/promises";
import { componentLoaded } from "./loadable";

describe("loadable", () => {
  it("should honor loadable component lifecycle", async () => {
    const controlledPromise = createControlledPromise<void>();

    const fakeComponent: any = {
      componentOnReady: () => controlledPromise.promise,
    };

    const afterLoad = vi.fn();
    componentLoaded(fakeComponent)?.then(afterLoad);
    expect(afterLoad).toHaveBeenCalledTimes(0);

    controlledPromise.resolve();
    await waitForAnimationFrame();
    expect(afterLoad).toHaveBeenCalledTimes(1);
  });
});
