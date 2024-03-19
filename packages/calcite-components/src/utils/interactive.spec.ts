import { InteractiveHTMLElement, updateHostInteraction } from "./interactive";

describe("interactive", () => {
  it("updateHostInteraction", () => {
    document.body.innerHTML = `
          <fake-interactive></fake-interactive>
      `;

    const fakeInteractiveEl = document.querySelector<HTMLElement>("fake-interactive");

    const fakeInteractive = {
      el: fakeInteractiveEl as InteractiveHTMLElement,
      disabled: false,
    };

    updateHostInteraction(fakeInteractive);

    expect(fakeInteractiveEl.getAttribute("aria-disabled")).toBeNull();

    fakeInteractive.disabled = true;

    updateHostInteraction(fakeInteractive);

    expect(fakeInteractiveEl.getAttribute("aria-disabled")).toBe("true");
  });
});
