import { activateFocusTrap, connectFocusTrap, deactivateFocusTrap } from "./focusTrapComponent";

describe("focusTrapComponent", () => {
  it("focusTrapComponent lifecycle", () => {
    const fakeComponent = {} as any;
    fakeComponent.focusTrapEl = document.createElement("div");

    connectFocusTrap(fakeComponent);

    expect(fakeComponent.focusTrapEl.tabIndex).toBe(-1);
    expect(fakeComponent.focusTrap).toBeDefined();
    expect(fakeComponent.focusTrap.active).toBe(false);

    const activateSpy = jest.fn();
    fakeComponent.focusTrap.activate = activateSpy;

    const deactivateSpy = jest.fn();
    fakeComponent.focusTrap.deactivate = deactivateSpy;

    activateFocusTrap(fakeComponent);
    expect(activateSpy).toHaveBeenCalledTimes(1);

    deactivateFocusTrap(fakeComponent);
    expect(deactivateSpy).toHaveBeenCalledTimes(1);
  });

  it("focusTrapEl with tabIndex`", () => {
    const fakeComponent = {} as any;
    fakeComponent.focusTrapEl = document.createElement("div");
    fakeComponent.focusTrapEl.tabIndex = 0;

    connectFocusTrap(fakeComponent);
    expect(fakeComponent.focusTrapEl.tabIndex).toBe(0);
    expect(fakeComponent.focusTrap).toBeDefined();
  });
});
