import { PublicLitElement } from "@arcgis/lumina";
import { describe, expect, it, afterEach, beforeEach, vi, MockInstance } from "vitest";
import { html } from "../../support/formatting";
import { componentOnReady, getIconScale } from "./component";

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
  let requestAnimationFrameSpy: MockInstance;
  let fakeComponent: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = html` <fake-component></fake-component> `;
    fakeComponent = document.querySelector<HTMLElement>("fake-component");

    const originalRaf = globalThis.requestAnimationFrame;
    requestAnimationFrameSpy = vi
      .spyOn(globalThis, "requestAnimationFrame")
      .mockImplementation((callback) => originalRaf(callback));
  });

  afterEach(() => requestAnimationFrameSpy.mockRestore());

  it("should call componentOnReady if it exists on the element (lazy-loaded)", async () => {
    const componentOnReadyStub = ((fakeComponent as PublicLitElement).componentOnReady = vi.fn());

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
