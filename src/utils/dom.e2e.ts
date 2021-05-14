import { newE2EPage } from "@stencil/core/testing";
import { queryElementRelativeTo, getRootNode, getHost } from "./dom";

describe("utils/dom", () => {
  it("queryElementRelativeTo: shadow dom element", async () => {
    const page = await newE2EPage({
      html: "<button>Light</button>"
    });

    await page.addScriptTag({
      content: `${getRootNode} ${getHost} ${queryElementRelativeTo}`
    });
    await page.waitForFunction(() => (window as any).queryElementRelativeTo);

    const text = await page.evaluate((): string => {
      console.log(document.head.innerHTML);
      class TestComponent extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML = "<div><button>Shadow</button></div>";
        }
      }

      customElements.define("test-component", TestComponent);

      const testComponent = document.createElement("test-component");
      document.body.appendChild(testComponent);

      const queryEl = testComponent.shadowRoot.querySelector("div");
      const resultEl = (window as any).queryElementRelativeTo("button", queryEl);

      return resultEl?.textContent;
    });

    expect(text).toBe("Shadow");
  });
});
