import {
  activateFocusTrap,
  connectFocusTrap,
  deactivateFocusTrap,
  updateFocusTrapElements
} from "./focusTrapComponent";

describe("focusTrapComponent", () => {
  it("focusTrapComponent lifecycle", () => {
    const fakeComponent = {} as any;
    fakeComponent.focusTrapEl = document.createElement("div");

    connectFocusTrap(fakeComponent);

    expect(fakeComponent.focusTrap).toBeDefined();
    expect(fakeComponent.focusTrap.active).toBe(false);

    const activateSpy = jest.fn();
    fakeComponent.focusTrap.activate = activateSpy;

    const deactivateSpy = jest.fn();
    fakeComponent.focusTrap.deactivate = deactivateSpy;

    const updateSpy = jest.fn();
    fakeComponent.focusTrap.updateContainerElements = updateSpy;

    activateFocusTrap(fakeComponent);
    expect(activateSpy).toHaveBeenCalledTimes(1);

    updateFocusTrapElements(fakeComponent);
    expect(updateSpy).toHaveBeenCalledTimes(1);

    deactivateFocusTrap(fakeComponent);
    expect(deactivateSpy).toHaveBeenCalledTimes(1);
  });
});
