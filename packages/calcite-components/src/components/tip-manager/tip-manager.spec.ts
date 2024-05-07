import { TipManager } from "./tip-manager";

describe("TipManager", () => {
  it("should increment/decrement the selectedIndex when the public next/prev methods are called", async () => {
    const tipManager = new TipManager();
    tipManager.total = 2;
    expect(tipManager.selectedIndex).toBe(0);
    await tipManager.nextTip();
    expect(tipManager.selectedIndex).toBe(1);
    await tipManager.previousTip();
    expect(tipManager.selectedIndex).toBe(0);
  });
});
