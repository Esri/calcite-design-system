import { HTMLStencilElement } from "@stencil/core/internal";
import { html } from "../../support/formatting";
import * as componentUtils from "./component";
const { componentFocusable, componentOnReady, getIconScale } = componentUtils;

describe("getIconScale", () => {
  it('should return "m" when input is "l"', () => {
    expect(getIconScale("l")).toBe("m");
  });

  it('should return "s" when input is not "l"', () => {
    expect(getIconScale("m")).toBe("s");
    expect(getIconScale("s")).toBe("s");
  });
});

describe("componentOnReady", () => {
  let requestAnimationFrameSpy: jest.SpyInstance;
  let fakeComponent: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = html`<fake-component></fake-component> `;
    fakeComponent = document.querySelector<HTMLElement>("fake-component");

    const originalRaf = globalThis.requestAnimationFrame;
    requestAnimationFrameSpy = jest
      .spyOn(globalThis, "requestAnimationFrame")
      .mockImplementation((callback) => originalRaf(callback));
  });

  afterEach(() => requestAnimationFrameSpy.mockRestore());

  it("should call componentOnReady if it exists on the element (lazy-loaded)", async () => {
    const componentOnReadyStub = ((fakeComponent as HTMLStencilElement).componentOnReady = jest.fn());

    const promise = componentOnReady(fakeComponent);
    expect(promise).toBeInstanceOf(Promise);

    await promise;
    expect(componentOnReadyStub).toHaveBeenCalled();
  });

  it("waits for an animation frame if componentOnReady does not exist on the element", async () => {
    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();

    const promise = componentOnReady(fakeComponent);
    expect(promise).toBeInstanceOf(Promise);

    await promise;
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });
});

describe("componentFocusable", () => {
  let componentOnReadyStub: jest.SpyInstance;
  let fakeComponent: HTMLStencilElement;
  let forceUpdateSpy: jest.SpyInstance;
  let requestAnimationFrameSpy: jest.SpyInstance;
  let componentOnReadyResolver: (el: HTMLStencilElement) => void;

  beforeEach(async () => {
    document.body.innerHTML = html`<fake-component></fake-component> `;
    fakeComponent = document.querySelector<HTMLStencilElement>("fake-component");

    const componentOnReadyPromise = new Promise<HTMLStencilElement>(
      (resolve: (el: HTMLStencilElement) => void) => (componentOnReadyResolver = resolve),
    );
    componentOnReadyStub = fakeComponent.componentOnReady = jest.fn(() => componentOnReadyPromise);
    forceUpdateSpy = jest.spyOn(componentUtils, "forceUpdate").mockImplementation(jest.fn());

    const originalRaf = globalThis.requestAnimationFrame;
    requestAnimationFrameSpy = jest
      .spyOn(globalThis, "requestAnimationFrame")
      .mockImplementation((callback) => originalRaf(callback));
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
    forceUpdateSpy.mockRestore();
  });

  it("should resolve when ready and rendered", async () => {
    const promise = componentFocusable(fakeComponent);
    expect(promise).toBeInstanceOf(Promise);

    expect(componentOnReadyStub).toHaveBeenCalled();
    expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
    expect(forceUpdateSpy).not.toHaveBeenCalled();

    componentOnReadyResolver(fakeComponent);
    await promise;

    expect(forceUpdateSpy).toHaveBeenCalled();
    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });
});
