import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { queryElementRoots, queryElementsRoots, getRootNode, getHost } from "./dom";

interface SetUpTestComponentOptions {
  insideHostHTML: string;
  componentTag: string;
  insideShadowHTML: string;
  myButtonClass: string;
}

type TestWindow = typeof window & {
  getRootNode: (el: Element) => HTMLDocument | ShadowRoot;
  getHost: (root: HTMLDocument | ShadowRoot) => Element | null;
  queryElementRoots: <T extends Element = Element>(element: Element, selector: string) => T | null;
  queryElementsRoots: <T extends Element = Element>(element: Element, selector: string) => T[];
  setUpTestComponent: (options: SetUpTestComponentOptions) => void;
};

const myButtonClass = "my-class";
const insideHost = "Inside Host";
const outsideHost = "Outside Host";
const insideShadow = "Inside Shadow";
const componentTag = "test-component";
const insideHostHTML = `<button class="${myButtonClass}">${insideHost}</button>`;
const insideShadowHTML = `<div><button>${insideShadow}</button></div>`;
const outsideHostHTML = `<span>Test</span><button>${outsideHost}</button>`;

describe("queries", () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({
      html: outsideHostHTML
    });

    function setUpTestComponent({ insideHostHTML, componentTag, insideShadowHTML }: SetUpTestComponentOptions) {
      class TestComponent extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML = insideShadowHTML;
        }
      }

      customElements.define(componentTag, TestComponent);

      const testComponent = document.createElement(componentTag);
      testComponent.innerHTML = insideHostHTML;
      document.body.appendChild(testComponent);
    }

    await page.addScriptTag({
      content: `
      ${getRootNode}
      ${getHost}
      ${queryElementRoots}
      ${queryElementsRoots}
      ${setUpTestComponent}
      `
    });

    await page.waitForFunction(() => (window as TestWindow).queryElementRoots);
  });

  it("queryElementRoots: should query from inside host element", async () => {
    const text = await page.evaluate(
      ({ insideHostHTML, componentTag, insideShadowHTML, myButtonClass }: SetUpTestComponentOptions): string => {
        (window as TestWindow).setUpTestComponent({
          insideHostHTML,
          componentTag,
          insideShadowHTML,
          myButtonClass
        });

        const testComponent = document.querySelector("test-component");
        const queryEl = testComponent.shadowRoot.querySelector("div");
        const resultEl: HTMLElement = (window as TestWindow).queryElementRoots(queryEl, `button.${myButtonClass}`);

        return resultEl?.textContent;
      },
      { insideHostHTML, componentTag, insideShadowHTML, myButtonClass }
    );

    expect(text).toBe(insideHost);
  });

  it("queryElementRoots: should query from outside host element", async () => {
    const text = await page.evaluate(
      ({ insideHostHTML, componentTag, insideShadowHTML, myButtonClass }: SetUpTestComponentOptions): string => {
        (window as TestWindow).setUpTestComponent({
          insideHostHTML,
          componentTag,
          insideShadowHTML,
          myButtonClass
        });

        const queryEl = document.body.querySelector("span");
        const resultEl: HTMLElement = (window as TestWindow).queryElementRoots(queryEl, "button");

        return resultEl?.textContent;
      },
      { insideHostHTML, componentTag, insideShadowHTML, myButtonClass }
    );

    expect(text).toBe(outsideHost);
  });

  it("queryElementsRoots: should query multiple elements", async () => {
    const results = await page.evaluate(
      ({ insideHostHTML, componentTag, insideShadowHTML, myButtonClass }: SetUpTestComponentOptions): string[] => {
        (window as TestWindow).setUpTestComponent({
          insideHostHTML,
          componentTag,
          insideShadowHTML,
          myButtonClass
        });

        const testComponent = document.querySelector("test-component");
        const queryEl = testComponent.shadowRoot.querySelector("div");
        const resultEls: HTMLElement[] = (window as TestWindow).queryElementsRoots(queryEl, "button");

        return resultEls.map((el: HTMLElement) => el.textContent);
      },
      { insideHostHTML, componentTag, insideShadowHTML, myButtonClass }
    );

    expect(results).toHaveLength(3);
    expect(results[0]).toBe(insideShadow);
    expect(results[1]).toBe(outsideHost);
    expect(results[2]).toBe(insideHost);
  });
});
