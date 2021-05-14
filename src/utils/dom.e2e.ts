import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { queryElementRelativeTo, queryElementsRelativeTo, getRootNode, getHost } from "./dom";

describe("utils/dom", () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({
      html: "<span>Test</span><button>Outside Host</button>"
    });

    function setupTestComponent() {
      class TestComponent extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML = "<div><button>Not queryable</button></div>";
        }
      }

      customElements.define("test-component", TestComponent);

      const testComponent = document.createElement("test-component");
      testComponent.innerHTML = "<button>Inside Host</button>";
      document.body.appendChild(testComponent);
    }

    await page.addScriptTag({
      content: `
      ${getRootNode}
      ${getHost}
      ${queryElementRelativeTo}
      ${queryElementsRelativeTo}
      ${setupTestComponent}
      `
    });

    await page.waitForFunction(() => (window as any).queryElementRelativeTo);
  });

  it("queryElementRelativeTo: should query from inside host element", async () => {
    const text = await page.evaluate((): string => {
      (window as any).setupTestComponent();

      const testComponent = document.querySelector("test-component");
      const queryEl = testComponent.shadowRoot.querySelector("div");
      const resultEl: HTMLElement = (window as any).queryElementRelativeTo("button", queryEl);

      return resultEl?.textContent;
    });

    expect(text).toBe("Inside Host");
  });

  it("queryElementRelativeTo: should query from outside host element", async () => {
    const text = await page.evaluate((): string => {
      (window as any).setupTestComponent();

      const queryEl = document.body.querySelector("span");
      const resultEl: HTMLElement = (window as any).queryElementRelativeTo("button", queryEl);

      return resultEl?.textContent;
    });

    expect(text).toBe("Outside Host");
  });

  it("queryElementsRelativeTo: should query multiple elements", async () => {
    const results = await page.evaluate((): string[] => {
      (window as any).setupTestComponent();

      const testComponent = document.querySelector("test-component");
      const queryEl = testComponent.shadowRoot.querySelector("div");
      const resultEls: HTMLElement[] = (window as any).queryElementsRelativeTo("button", queryEl);

      return resultEls.map((el: HTMLElement) => el.textContent);
    });

    expect(results).toHaveLength(2);
    expect(results[0]).toBe("Inside Host");
    expect(results[1]).toBe("Outside Host");
  });
});
