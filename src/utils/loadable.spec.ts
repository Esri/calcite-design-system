import { componentLoaded } from "./loadable";

describe("loadable", () => {
  it("should honor loadable component lifecyce", async () => {
    const el = {
      componentOnReady: async () => undefined
    };

    const afterLoad = jest.fn();
    componentLoaded(el as any)?.then(afterLoad);

    expect(afterLoad).not.toHaveBeenCalled();

    await el.componentOnReady();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    componentLoaded(el as any).then(afterLoad);
    expect(afterLoad).toHaveBeenCalledTimes(1);
  });
});
