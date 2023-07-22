import { updateHostInteraction } from "./interactive";

describe("interactive", () => {
  it("updateHostInteraction", () => {
    document.body.innerHTML = `
          <fake-interactive></fake-interactive>
      `;

    const fakeInteractiveEl = document.querySelector<HTMLElement>("fake-interactive");

    const fakeInteractive = {
      el: fakeInteractiveEl,
      disabled: false,
    };

    updateHostInteraction(fakeInteractive);

    expect(fakeInteractiveEl.getAttribute("tabindex")).toBeNull();
    expect(fakeInteractiveEl.getAttribute("aria-disabled")).toBeNull();

    fakeInteractive.disabled = true;

    updateHostInteraction(fakeInteractive);

    expect(fakeInteractiveEl.getAttribute("tabindex")).toBe("-1");
    expect(fakeInteractiveEl.getAttribute("aria-disabled")).toBe("true");
  });
});
