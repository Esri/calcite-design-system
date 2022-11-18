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

    componentLoaded(fakeComponent).then(afterLoad);
    await waitForAnimationFrame();
    expect(afterLoad).toHaveBeenCalledTimes(1);
  });
});
