import { setUpLoadableComponent, setComponentLoaded, componentLoaded } from "./loadable";

describe("loadable", () => {
  it("should honor loadable component lifecyce", async () => {
    const status: {
      willLoad: boolean;
      loaded: boolean;
      promise: Promise<void>;
    } = {
      willLoad: false,
      loaded: false,
      promise: null
    };
    const fakeComponent: any = {
      componentWillLoad: () => {
        setUpLoadableComponent(fakeComponent);
        status.willLoad = true;
      },
      componentDidLoad: () => {
        setComponentLoaded(fakeComponent);
        status.loaded = true;
      },
      load: () => {
        status.promise = componentLoaded(fakeComponent);
      }
    };

    expect(status.willLoad).toBe(false);
    expect(status.loaded).toBe(false);
    expect(status.promise).toBeNull();

    fakeComponent.componentWillLoad();

    expect(status.willLoad).toBe(true);
    expect(status.loaded).toBe(false);
    expect(status.promise).toBeNull();

    fakeComponent.load();

    expect(status.willLoad).toBe(true);
    expect(status.loaded).toBe(false);
    expect(status.promise).toBeDefined();
    expect(status.promise).toBeInstanceOf(Promise);

    fakeComponent.componentDidLoad();

    await status.promise;

    expect(status.willLoad).toBe(true);
    expect(status.loaded).toBe(true);
    expect(status.promise).toBeDefined();
    expect(status.promise).toBeInstanceOf(Promise);
  });
});
