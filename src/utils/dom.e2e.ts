import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { queryElementRelativeTo, getRootNode, getHost } from "./dom";

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
    }

    await page.addScriptTag({
      content: `${getRootNode} ${getHost} ${queryElementRelativeTo} ${setupTestComponent}`
    });

    await page.waitForFunction(() => (window as any).queryElementRelativeTo);
  });

  it("should query from inside host element", async () => {
    const text = await page.evaluate((): string => {
      (window as any).setupTestComponent();

      const testComponent = document.createElement("test-component");
      testComponent.innerHTML = "<button>Inside Host</button>";
      document.body.appendChild(testComponent);

      const queryEl = testComponent.shadowRoot.querySelector("div");
      const resultEl = (window as any).queryElementRelativeTo("button", queryEl);

      return resultEl?.textContent;
    });

    expect(text).toBe("Inside Host");
  });

  it("should query from outside host element", async () => {
    const text = await page.evaluate((): string => {
      (window as any).setupTestComponent();

      const testComponent = document.createElement("test-component");
      testComponent.innerHTML = "<button>Inside Host</button>";
      document.body.appendChild(testComponent);

      const queryEl = document.body.querySelector("span");
      const resultEl = (window as any).queryElementRelativeTo("button", queryEl);

      return resultEl?.textContent;
    });

    expect(text).toBe("Outside Host");
  });
});
