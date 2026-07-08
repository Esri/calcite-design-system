import { describe, expect, it } from "vitest";
import { JsxNode, LitElement } from "@arcgis/lumina";
import { queryElementRoots } from "./dom";
import { mount } from "@arcgis/lumina-compiler/testing";
import { html } from "lit";

const myButtonId = "my.id";
const myButtonClass = "my-class";
const insideHost = "Inside Host";
const outsideHost = "Outside Host";
const insideShadow = "Inside Shadow";

describe("queries", () => {
  class TestComponent extends LitElement {
    static tagName = "test-component";

    override render(): JsxNode {
      return (
        <div data-testid="container">
          <button id={myButtonId} type="button">
            {insideShadow}
            <slot />
          </button>
        </div>
      );
    }
  }

  it("queryElementRoots: should query from inside host element", async () => {
    const { el } = await mount(
      html`
        <span>Test</span>
        <button id="${myButtonId}">${outsideHost}</button>
        <test-component><button class="${myButtonClass}">${insideHost}</button></test-component>
      `,
      { dynamicComponents: [TestComponent] },
    );
    const queryEl = el.shadowRoot.querySelector("div")!;

    const resultEl = queryElementRoots<HTMLButtonElement>(queryEl, {
      selector: `button.${myButtonClass}`,
    })!;

    await expect.element(resultEl).toHaveTextContent(insideHost);
  });

  it("queryElementRoots: should query id from inside shadow element", async () => {
    const { el } = await mount(
      html`
        <span>Test</span>
        <button id="${myButtonId}">${outsideHost}</button>
        <test-component><button class="${myButtonClass}">${insideHost}</button></test-component>
      `,
      { dynamicComponents: [TestComponent] },
    );
    const queryEl = el.shadowRoot.querySelector("div")!;

    const resultEl = queryElementRoots<HTMLDivElement>(queryEl, {
      id: myButtonId,
    })!;

    await expect.element(resultEl).toHaveTextContent(insideShadow);
  });

  it("queryElementRoots: should query from outside host element", async () => {
    const { container } = await mount(
      html`
        <span>Test</span>
        <button id="${myButtonId}">${outsideHost}</button>
        <test-component><button class="${myButtonClass}">${insideHost}</button></test-component>
      `,
      { dynamicComponents: [TestComponent] },
    );
    const queryEl = container.querySelector("span")!;

    const resultEl = queryElementRoots<HTMLButtonElement>(queryEl, { selector: "button" })!;

    await expect.element(resultEl).toHaveTextContent(outsideHost);
  });

  it("queryElementRoots: should query id from outside host element", async () => {
    const { container } = await mount(
      html`
        <span>Test</span>
        <button id="${myButtonId}">${outsideHost}</button>
        <test-component><button class="${myButtonClass}">${insideHost}</button></test-component>
      `,
      { dynamicComponents: [TestComponent] },
    );
    const queryEl = container.querySelector("span")!;

    const resultEl = queryElementRoots<HTMLButtonElement>(queryEl, { id: myButtonId })!;

    await expect.element(resultEl).toHaveTextContent(outsideHost);
  });
});
