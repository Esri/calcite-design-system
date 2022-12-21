import { waitForAnimationFrame } from "../tests/utils";
import { componentLoaded } from "./loadable";

describe("loadable", () => {
  it("should honor loadable component lifecyce", async () => {
    const el = document.createElement("div");

    (el as any).componentOnReady = async () => undefined;

    const afterLoad = jest.fn();
    componentLoaded(el as any)?.then(afterLoad);

    await waitForAnimationFrame();
    expect(afterLoad).not.toHaveBeenCalled();

    (el as any).componentOnReady();

    componentLoaded(el as any).then(afterLoad);
    await waitForAnimationFrame();
    expect(afterLoad).toHaveBeenCalledTimes(1);
  });
});
