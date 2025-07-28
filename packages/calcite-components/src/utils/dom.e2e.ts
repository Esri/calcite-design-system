// @ts-strict-ignore
import { newE2EPage, E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { elementHasSelectionRange, getHost, getRootNode, queryElementRoots } from "./dom";

interface SetUpTestComponentOptions {
  insideHostHTML: string;
  componentTag: string;
  insideShadowHTML: string;
  myButtonClass: string;
  myButtonId: string;
}

type TestWindow = typeof window & {
  getRootNode: (el: Element) => HTMLDocument | ShadowRoot;
  getHost: (root: HTMLDocument | ShadowRoot) => Element | null;
  queryElementRoots: <T extends Element = Element>(
    element: Element,
    options: {
      selector?: string;
      id?: string;
    },
  ) => T | null;
  setUpTestComponent: (options: SetUpTestComponentOptions) => void;
};

const myButtonId = "my.id";
const myButtonClass = "my-class";
const insideHost = "Inside Host";
const outsideHost = "Outside Host";
const insideShadow = "Inside Shadow";
const componentTag = "test-component";
const insideHostHTML = `<button class="${myButtonClass}">${insideHost}</button>`;
const insideShadowHTML = `<div><button id="${myButtonId}">${insideShadow}</button></div>`;
const outsideHostHTML = `<span>Test</span><button id="${myButtonId}">${outsideHost}</button>`;

describe("queries", () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({
      html: outsideHostHTML,
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
      ${setUpTestComponent}
      `,
    });

    await page.waitForFunction(() => (window as TestWindow).queryElementRoots);
  });

  it("queryElementRoots: should query from inside host element", async () => {
    const text = await page.evaluate(
      ({
        insideHostHTML,
        componentTag,
        insideShadowHTML,
        myButtonClass,
        myButtonId,
      }: SetUpTestComponentOptions): string => {
        (window as TestWindow).setUpTestComponent({
          insideHostHTML,
          componentTag,
          insideShadowHTML,
          myButtonClass,
          myButtonId,
        });

        const testComponent = document.querySelector("test-component");
        const queryEl = testComponent.shadowRoot.querySelector("div");
        const resultEl: HTMLElement = (window as TestWindow).queryElementRoots(queryEl, {
          selector: `button.${myButtonClass}`,
        });

        return resultEl?.textContent;
      },
      { insideHostHTML, componentTag, insideShadowHTML, myButtonClass, myButtonId },
    );

    expect(text).toBe(insideHost);
  });

  it("queryElementRoots: should query id from inside shadow element", async () => {
    const text = await page.evaluate(
      ({
        insideHostHTML,
        componentTag,
        insideShadowHTML,
        myButtonClass,
        myButtonId,
      }: SetUpTestComponentOptions): string => {
        (window as TestWindow).setUpTestComponent({
          insideHostHTML,
          componentTag,
          insideShadowHTML,
          myButtonClass,
          myButtonId,
        });

        const testComponent = document.querySelector("test-component");
        const queryEl = testComponent.shadowRoot.querySelector("div");
        const resultEl: HTMLElement = (window as TestWindow).queryElementRoots(queryEl, {
          id: myButtonId,
        });

        return resultEl?.textContent;
      },
      { insideHostHTML, componentTag, insideShadowHTML, myButtonClass, myButtonId },
    );

    expect(text).toBe(insideShadow);
  });

  it("queryElementRoots: should query from outside host element", async () => {
    const text = await page.evaluate(
      ({
        insideHostHTML,
        componentTag,
        insideShadowHTML,
        myButtonClass,
        myButtonId,
      }: SetUpTestComponentOptions): string => {
        (window as TestWindow).setUpTestComponent({
          insideHostHTML,
          componentTag,
          insideShadowHTML,
          myButtonClass,
          myButtonId,
        });

        const queryEl = document.body.querySelector("span");
        const resultEl: HTMLElement = (window as TestWindow).queryElementRoots(queryEl, { selector: "button" });

        return resultEl?.textContent;
      },
      { insideHostHTML, componentTag, insideShadowHTML, myButtonClass, myButtonId },
    );

    expect(text).toBe(outsideHost);
  });

  it("queryElementRoots: should query id from outside host element", async () => {
    const text = await page.evaluate(
      ({
        insideHostHTML,
        componentTag,
        insideShadowHTML,
        myButtonClass,
        myButtonId,
      }: SetUpTestComponentOptions): string => {
        (window as TestWindow).setUpTestComponent({
          insideHostHTML,
          componentTag,
          insideShadowHTML,
          myButtonClass,
          myButtonId,
        });

        const queryEl = document.body.querySelector("span");
        const resultEl: HTMLElement = (window as TestWindow).queryElementRoots(queryEl, { id: myButtonId });

        return resultEl?.textContent;
      },
      { insideHostHTML, componentTag, insideShadowHTML, myButtonClass, myButtonId },
    );

    expect(text).toBe(outsideHost);
  });
});

describe("elementHasSelection", () => {
  let el: HTMLElement;
  let child: HTMLElement;

  beforeEach(() => {
    el = document.createElement("div");
    child = document.createElement("span");
    child.textContent = "Hello world";
    el.appendChild(child);
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
    window.getSelection().removeAllRanges();
  });

  it("returns false when there is no selection", () => {
    expect(elementHasSelectionRange(el)).toBe(false);
  });

  it("returns true when selection is inside the element", () => {
    const range = document.createRange();
    range.selectNodeContents(child);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    expect(elementHasSelectionRange(el)).toBe(true);
  });

  it("returns false when selection is outside the element", () => {
    const outside = document.createElement("div");
    outside.textContent = "Outside";
    document.body.appendChild(outside);
    const range = document.createRange();
    range.selectNodeContents(outside);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    expect(elementHasSelectionRange(el)).toBe(false);
    document.body.removeChild(outside);
  });

  it("returns false when selection is empty", () => {
    const selection = window.getSelection();
    selection.removeAllRanges();
    expect(elementHasSelectionRange(el)).toBe(false);
  });
});
