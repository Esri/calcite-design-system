import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { queryElementRelativeTo, queryElementsRelativeTo, getRootNode, getHost } from "./dom";

interface SetUpTestComponentOptions {
  insideHostHTML: string;
  componentTag: string;
  insideShadowHTML: string;
}

type TestWindow = typeof window & {
  getRootNode: (el: Element) => HTMLDocument | ShadowRoot;
  getHost: (root: HTMLDocument | ShadowRoot) => Element | null;
  queryElementRelativeTo: <T extends Element = Element>(element: Element, selector: string) => T | null;
  queryElementsRelativeTo: <T extends Element = Element>(element: Element, selector: string) => T[];
  setUpTestComponent: (options: SetUpTestComponentOptions) => void;
};

const insideHost = "Inside Host";
const componentTag = "test-component";
const insideHostHTML = `<button>${insideHost}</button>`;
const insideShadowHTML = "<div><button>Not queryable</button></div>";
const outsideHost = "Outside Host";
const outsideHostHTML = `<span>Test</span><button>${outsideHost}</button>`;

describe("utils/dom", () => {
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
      ${queryElementRelativeTo}
      ${queryElementsRelativeTo}
      ${setUpTestComponent}
      `
    });

    await page.waitForFunction(() => (window as TestWindow).queryElementRelativeTo);
  });

  it("queryElementRelativeTo: should query from inside host element", async () => {
    const text = await page.evaluate(
      ({ insideHostHTML, componentTag, insideShadowHTML }: SetUpTestComponentOptions): string => {
        (window as TestWindow).setUpTestComponent({
          insideHostHTML,
          componentTag,
          insideShadowHTML
        });

        const testComponent = document.querySelector("test-component");
        const queryEl = testComponent.shadowRoot.querySelector("div");
        const resultEl: HTMLElement = (window as TestWindow).queryElementRelativeTo(queryEl, "button");

        return resultEl?.textContent;
      },
      { insideHostHTML, componentTag, insideShadowHTML }
    );

    expect(text).toBe(insideHost);
  });

  it("queryElementRelativeTo: should query from outside host element", async () => {
    const text = await page.evaluate(
      ({ insideHostHTML, componentTag, insideShadowHTML }: SetUpTestComponentOptions): string => {
        (window as TestWindow).setUpTestComponent({
          insideHostHTML,
          componentTag,
          insideShadowHTML
        });

        const queryEl = document.body.querySelector("span");
        const resultEl: HTMLElement = (window as TestWindow).queryElementRelativeTo(queryEl, "button");

        return resultEl?.textContent;
      },
      { insideHostHTML, componentTag, insideShadowHTML }
    );

    expect(text).toBe(outsideHost);
  });

  it("queryElementsRelativeTo: should query multiple elements", async () => {
    const results = await page.evaluate(
      ({ insideHostHTML, componentTag, insideShadowHTML }: SetUpTestComponentOptions): string[] => {
        (window as TestWindow).setUpTestComponent({
          insideHostHTML,
          componentTag,
          insideShadowHTML
        });

        const testComponent = document.querySelector("test-component");
        const queryEl = testComponent.shadowRoot.querySelector("div");
        const resultEls: HTMLElement[] = (window as TestWindow).queryElementsRelativeTo(queryEl, "button");

        return resultEls.map((el: HTMLElement) => el.textContent);
      },
      { insideHostHTML, componentTag, insideShadowHTML }
    );

    expect(results).toHaveLength(2);
    expect(results[0]).toBe(insideHost);
    expect(results[1]).toBe("Outside Host");
  });
});
