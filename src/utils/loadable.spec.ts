import { waitForAnimationFrame } from "../tests/utils";
import { setUpLoadableComponent, setComponentLoaded, componentLoaded } from "./loadable";

describe("loadable", () => {
  it("should honor loadable component lifecyce", async () => {
    const fakeComponent: any = {};

    const afterLoad = jest.fn();
    componentLoaded(fakeComponent)?.then(afterLoad);

    await waitForAnimationFrame();
    expect(afterLoad).not.toHaveBeenCalled();

    setUpLoadableComponent(fakeComponent);
    await waitForAnimationFrame();
    expect(afterLoad).not.toHaveBeenCalled();

    setComponentLoaded(fakeComponent);
    await waitForAnimationFrame();
    expect(afterLoad).not.toHaveBeenCalled();

    componentLoaded(fakeComponent)?.then(afterLoad);
    await waitForAnimationFrame();
    expect(afterLoad).toHaveBeenCalledTimes(1);

    // expect(status.willLoad).toBe(false);
    // expect(status.loaded).toBe(false);
    // expect(status.promise).toBeNull();

    // fakeComponent.componentWillLoad();

    // expect(status.willLoad).toBe(true);
    // expect(status.loaded).toBe(false);
    // expect(status.promise).toBeNull();

    // fakeComponent.load();

    // expect(status.willLoad).toBe(true);
    // expect(status.loaded).toBe(false);
    // expect(status.promise).toBeDefined();
    // expect(status.promise).toBeInstanceOf(Promise);

    // fakeComponent.componentDidLoad();

    // await status.promise;

    // expect(status.willLoad).toBe(true);
    // expect(status.loaded).toBe(true);
    // expect(status.promise).toBeDefined();
    // expect(status.promise).toBeInstanceOf(Promise);
  });
});
