// @ts-strict-ignore
import { E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it, vi } from "vitest";
import { html } from "../../../support/formatting";
import { accessible, focusable, hidden, renders, themed } from "../../tests/commonTests";
import { CSS as ITEM_CSS } from "../flow-item/resources";
import { findAll, isElementFocused } from "../../tests/utils/puppeteer";
import type { Action } from "../action/action";
import type { FlowItem } from "../flow-item/flow-item";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";
import { FlowItemLikeElement } from "./interfaces";
import type { Flow } from "./flow";

async function slowPageAnimations(page: E2EPage): Promise<void> {
  await page.addStyleTag({
    content: `:root { --calcite-duration-factor: 9999; }`,
  });
}

describe("calcite-flow", () => {
  mockConsole();

  describe("renders", () => {
    renders("calcite-flow", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-flow");
  });

  describe("is focusable", () => {
    focusable(
      html`<calcite-flow>
        <calcite-flow-item id="one" heading="one">Hello World</calcite-flow-item>
        <calcite-flow-item id="two" heading="two">Hello World</calcite-flow-item>
      </calcite-flow>`,
      {
        focusTargetSelector: "#two",
      },
    );
  });

  describe("is focusable on selected flow item", () => {
    focusable(
      html`<calcite-flow>
        <calcite-flow-item id="one" heading="one">Hello World</calcite-flow-item>
        <calcite-flow-item id="two" selected heading="two">Hello World</calcite-flow-item>
        <calcite-flow-item id="three" heading="three">Hello World</calcite-flow-item>
      </calcite-flow>`,
      {
        focusTargetSelector: "#two",
      },
    );
  });

  it("frame defaults", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow></calcite-flow>");

    const element = await page.find(`calcite-flow >>> .${CSS.frame}`);

    expect(element).toHaveClass(CSS.frame);
    expect(element).not.toHaveClass(CSS.frameAdvancing);
    expect(element).not.toHaveClass(CSS.frameRetreating);
  });

  describe("works with flow-items", () => {
    it("back() method should set previous flowItem to be selected", async () => {
      const page = await newE2EPage();

      await page.setContent(
        html`<calcite-flow>
          <calcite-flow-item>Hello World</calcite-flow-item>
          <calcite-flow-item>Hello World 2</calcite-flow-item>
        </calcite-flow>`,
      );

      await page.waitForChanges();

      const flow = await page.find("calcite-flow");
      const flowItems = await findAll(page, "calcite-flow-item");

      expect(flowItems).toHaveLength(2);
      expect(await flowItems[0].getProperty("selected")).toBe(false);
      expect(await flowItems[0].isVisible()).toBe(false);
      expect(await flowItems[1].getProperty("selected")).toBe(true);
      expect(await flowItems[1].isVisible()).toBe(true);

      await flow.callMethod("back");
      await page.waitForChanges();

      expect(flowItems).toHaveLength(2);
      expect(await flowItems[0].getProperty("selected")).toBe(true);
      expect(await flowItems[0].isVisible()).toBe(true);
      expect(await flowItems[1].getProperty("selected")).toBe(false);
      expect(await flowItems[1].isVisible()).toBe(false);
    });

    it("should call setFocus() on back button click", async () => {
      const page = await newE2EPage();

      await page.setContent(
        html`<calcite-flow
          ><calcite-flow-item id="one"></calcite-flow-item><calcite-flow-item id="two"></calcite-flow-item
        ></calcite-flow>`,
      );

      await page.$eval(
        "#two",
        (elm: FlowItem["el"], backButtonCSS: string) => {
          elm.shadowRoot.querySelector<Action["el"]>(`.${backButtonCSS}`)?.click();
        },
        ITEM_CSS.backButton,
      );
      await page.waitForChanges();

      await isElementFocused(page, "#one");
    });

    it("does not go back when item back button is clicked and defaultPrevented", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-flow>
          <calcite-flow-item id="first"></calcite-flow-item>
          <calcite-flow-item id="second"></calcite-flow-item>
        </calcite-flow>`,
      );
      await page.waitForChanges();

      let items = await findAll(page, "calcite-flow-item");

      expect(items).toHaveLength(2);
      expect(items[0].id).toBe("first");
      expect(items[1].id).toBe("second");
      expect(await items[0].getProperty("selected")).toBe(false);
      expect(await items[1].getProperty("selected")).toBe(true);

      await page.evaluate((backButtonSelector) => {
        const lastFlowItem = document.querySelector("calcite-flow-item:last-of-type");

        lastFlowItem?.addEventListener("calciteFlowItemBack", (event) => event.preventDefault());

        lastFlowItem?.shadowRoot.querySelector<HTMLElement>(backButtonSelector)?.click();
      }, `.${ITEM_CSS.backButton}`);
      await page.waitForChanges();

      items = await findAll(page, "calcite-flow-item");
      expect(items).toHaveLength(2);
      expect(items[0].id).toBe("first");
      expect(items[1].id).toBe("second");
      expect(await items[0].getProperty("selected")).toBe(false);
      expect(await items[1].getProperty("selected")).toBe(true);
    });

    it("setting 'beforeBack' should be called in 'back()'", async () => {
      const page = await newE2EPage();

      const mockCallBack = vi.fn().mockReturnValue(Promise.resolve());
      await page.exposeFunction("beforeBack", mockCallBack);

      await page.setContent(
        html`<calcite-flow>
          <calcite-flow-item>Hello World</calcite-flow-item>
          <calcite-flow-item id="last-item">Hello World</calcite-flow-item>
        </calcite-flow>`,
      );

      await page.$eval(
        "#last-item",
        (elm: FlowItem["el"]) =>
          (elm.beforeBack = (window as typeof window & Pick<typeof elm, "beforeBack">).beforeBack),
      );

      const flow = await page.find("calcite-flow");

      const backValue = await flow.callMethod("back");

      expect(backValue).toBeDefined();
      expect(mockCallBack).toHaveBeenCalledTimes(1);
    });

    it("should handle rejected 'beforeBack' promise'", async () => {
      const page = await newE2EPage();

      const mockCallBack = vi.fn().mockReturnValue(() => Promise.reject());
      await page.exposeFunction("beforeBack", mockCallBack);

      await page.setContent(
        html`<calcite-flow>
          <calcite-flow-item></calcite-flow-item>
          <calcite-flow-item id="two"></calcite-flow-item
        ></calcite-flow>`,
      );

      await page.$eval(
        "#two",
        (elm: FlowItem["el"]) =>
          (elm.beforeBack = (window as typeof window & Pick<typeof elm, "beforeBack">).beforeBack),
      );

      const flow = await page.find("calcite-flow");

      await flow.callMethod("back");

      expect(mockCallBack).toHaveBeenCalledTimes(1);
    });

    it("frame advancing should add animation class", async () => {
      const page = await newE2EPage();

      await page.setContent(
        html`<calcite-flow>
          <calcite-flow-item></calcite-flow-item>
        </calcite-flow>`,
      );

      await slowPageAnimations(page);

      const items = await findAll(page, "calcite-flow-item");

      expect(items).toHaveLength(1);

      const element = await page.find("calcite-flow");

      element.innerHTML = "<calcite-flow-item>test</calcite-flow-item><calcite-flow-item>test</calcite-flow-item>";

      await page.waitForChanges();

      const items2 = await findAll(page, "calcite-flow-item");

      expect(items2).toHaveLength(2);

      const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

      expect(frame).toHaveClass(CSS.frameAdvancing);
    });

    it("frame advancing should add animation class when subtree is modified", async () => {
      const page = await newE2EPage();

      await page.setContent(html`<calcite-flow><calcite-flow-item>flow1</calcite-flow-item></calcite-flow>`);

      await slowPageAnimations(page);

      const element = await page.find("calcite-flow");

      element.innerHTML = html`<calcite-flow-item>flow1</calcite-flow-item
        ><calcite-flow-item id="flow2">flow2</calcite-flow-item>`;

      await page.waitForChanges();

      const item2 = await page.find(`calcite-flow-item[id=flow2]`);

      item2.innerHTML = "new flow2 subtree content";

      await page.waitForChanges();

      const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

      expect(frame).toHaveClass(CSS.frameAdvancing);
    });

    it("frame retreating should add animation class", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-flow></calcite-flow>");

      await slowPageAnimations(page);

      await page.$eval("calcite-flow", (elm: HTMLElement) => {
        elm.innerHTML = `
      <calcite-flow-item>Hello World</calcite-flow-item>
      <calcite-flow-item>Hello World</calcite-flow-item>
      <calcite-flow-item>Hello World</calcite-flow-item>
      `;
      });

      await page.waitForChanges();

      const items = await findAll(page, "calcite-flow-item");

      expect(items).toHaveLength(3);

      const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

      expect(frame).not.toHaveClass(CSS.frameRetreating);
      expect(frame).not.toHaveClass(CSS.frameAdvancing);

      await page.$eval("calcite-flow", (elm: Flow["el"]) => elm.back());

      await page.waitForChanges();

      const items2 = await findAll(page, "calcite-flow-item");

      expect(items2).toHaveLength(3);

      const frame2 = await page.find(`calcite-flow >>> .${CSS.frame}`);

      expect(frame2).toHaveClass(CSS.frameRetreating);
      expect(frame2).not.toHaveClass(CSS.frameAdvancing);
    });

    it("frame animation class should not exist if frame count remains the same", async () => {
      const page = await newE2EPage();

      await page.setContent(
        html`<calcite-flow
          ><calcite-flow-item>test</calcite-flow-item><calcite-flow-item>test</calcite-flow-item></calcite-flow
        >`,
      );

      const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

      expect(frame).not.toHaveClass(CSS.frameRetreating);
      expect(frame).not.toHaveClass(CSS.frameAdvancing);

      const element = await page.find("calcite-flow");

      element.innerHTML = html`<calcite-flow-item>test</calcite-flow-item><calcite-flow-item>test</calcite-flow-item>`;

      await page.waitForChanges();

      expect(frame).not.toHaveClass(CSS.frameRetreating);
      expect(frame).not.toHaveClass(CSS.frameAdvancing);
    });

    it("item properties should be set", async () => {
      const page = await newE2EPage();

      await page.setContent("<calcite-flow></calcite-flow>");

      await page.$eval("calcite-flow", (elm: HTMLElement): void => {
        elm.innerHTML = `
      <calcite-flow-item></calcite-flow-item>
      <calcite-flow-item></calcite-flow-item>
      <calcite-flow-item></calcite-flow-item>
      `;
      });
      await page.waitForChanges();

      const items = await findAll(page, "calcite-flow-item");

      expect(items).toHaveLength(3);

      expect(await items[0].getProperty("selected")).toBe(false);
      expect(await items[0].getProperty("showBackButton")).toBe(false);

      expect(await items[1].getProperty("selected")).toBe(false);
      expect(await items[1].getProperty("showBackButton")).toBe(false);

      expect(await items[2].getProperty("selected")).toBe(true);
      expect(await items[2].getProperty("showBackButton")).toBe(true);
    });

    describe("accessible", () => {
      accessible(html`
        <calcite-flow>
          <calcite-flow-item> </calcite-flow-item>
          <calcite-flow-item> </calcite-flow-item>
          <calcite-flow-item> </calcite-flow-item>
        </calcite-flow>
      `);
    });

    it("should also work with descendant slotted items", async () => {
      const page = await newE2EPage();

      await page.setContent(
        html`<calcite-flow>
          <calcite-flow-item>Assigned item</calcite-flow-item>
          <calcite-flow-item>Assigned item</calcite-flow-item>
          <div>
            <calcite-flow-item>
              Assigned item
              <calcite-flow-item>Assigned item</calcite-flow-item>
              <calcite-flow>
                <calcite-flow-item>Unassigned item</calcite-flow-item>
              </calcite-flow>
            </calcite-flow-item>
          </div>
        </calcite-flow>`,
      );

      const items = await findAll(page, "calcite-flow-item");

      expect(items).toHaveLength(5);

      expect(await items[0].getProperty("selected")).toBe(false);
      expect(await items[0].getProperty("showBackButton")).toBe(false);
      expect(await items[0].isVisible()).toBe(false);

      expect(await items[1].getProperty("selected")).toBe(false);
      expect(await items[1].getProperty("showBackButton")).toBe(false);
      expect(await items[1].isVisible()).toBe(false);

      expect(await items[2].getProperty("selected")).toBe(false);
      expect(await items[2].getProperty("showBackButton")).toBe(false);
      expect(await items[2].isVisible()).toBe(false);

      expect(await items[3].getProperty("selected")).toBe(true);
      expect(await items[3].getProperty("showBackButton")).toBe(true);
      expect(await items[3].isVisible()).toBe(true);

      expect(await items[4].getProperty("selected")).toBe(true);
      expect(await items[4].getProperty("showBackButton")).toBe(false);
      expect(await items[4].isVisible()).toBe(true);
    });
  });

  it("supports custom flow-items", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-flow custom-item-selectors="custom-flow-item">
        <calcite-flow-item heading="flow-item-1" id="first">
          <p>😃</p>
        </calcite-flow-item>
        <custom-flow-item heading="custom-flow-item" id="second">
          <p>🥸</p>
        </custom-flow-item>
        <calcite-flow-item heading="flow-item-2" id="third">
          <p>😃</p>
        </calcite-flow-item>
      </calcite-flow>
    `);

    await page.evaluate(async () => {
      class CustomFlowItem extends HTMLElement implements FlowItemLikeElement {
        private flowItemEl: FlowItem["el"];

        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });

          shadow.innerHTML = `
                <style>
                  :host {
                    display: none;
                    background: #bdf2c4;
                  }
                  :host([selected]) {
                    @apply flex;
                  }

                </style>
                <calcite-flow-item id="internalFlowItem">
                  <slot></slot>
                </calcite-flow-item>
              `;

          this.flowItemEl = shadow.getElementById("internalFlowItem") as FlowItem["el"];
        }

        connectedCallback(): void {
          this.flowItemEl.setAttribute("heading", this.getAttribute("heading"));
          this.flowItemEl.setAttribute("selected", this.getAttribute("selected"));
          this.flowItemEl.setAttribute("show-back-button", this.getAttribute("show-back-button"));
          this.flowItemEl.setAttribute("menu-open", this.getAttribute("menu-open"));
          this.flowItemEl.setAttribute("selected", this.getAttribute("selected"));
          this.selected = this.hasAttribute("selected");
          this.showBackButton = this.hasAttribute("show-back-button");
          this.menuOpen = this.hasAttribute("menu-open");
          this.heading = this.getAttribute("heading");
        }

        get heading(): string {
          return this.getAttribute("heading");
        }

        set heading(value: string) {
          this.flowItemEl.heading = value;
        }

        get hidden(): boolean {
          return this.hasAttribute("hidden");
        }

        set hidden(value: boolean) {
          this.toggleAttribute("hidden", value);
          this.flowItemEl.toggleAttribute("hidden", value);
        }

        get selected(): boolean {
          return this.hasAttribute("selected");
        }

        set selected(value: boolean) {
          this.toggleAttribute("selected", value);
          this.flowItemEl.toggleAttribute("selected", value);
        }

        get menuOpen(): boolean {
          return this.hasAttribute("menu-open");
        }

        set menuOpen(value: boolean) {
          this.toggleAttribute("menu-open", value);
          this.flowItemEl.menuOpen = value;
        }

        get showBackButton(): boolean {
          return this.hasAttribute("show-back-button");
        }

        set showBackButton(value: boolean) {
          this.toggleAttribute("show-back-button", value);
          this.flowItemEl.showBackButton = value;
        }

        async beforeBack(): Promise<void> {
          // no op
        }

        async setFocus(options?: FocusOptions): Promise<void> {
          await this.flowItemEl.setFocus(options);
        }
      }

      customElements.define("custom-flow-item", CustomFlowItem);
    });
    await page.waitForChanges();

    const flow = await page.find("calcite-flow");
    const displayedItemSelector = "calcite-flow > [selected]";
    let displayedItem = await page.find(displayedItemSelector);

    expect(await flow.getProperty("childElementCount")).toBe(3);
    expect(displayedItem.id).toBe("third");

    await page.evaluate(
      async (displayedItemSelector: string, ITEM_CSS) => {
        document
          .querySelector(displayedItemSelector)
          .shadowRoot.querySelector<Action["el"]>(`.${ITEM_CSS.backButton}`)
          .click();
      },
      displayedItemSelector,
      ITEM_CSS,
    );
    await page.waitForChanges();

    displayedItem = await page.find(displayedItemSelector);
    expect(await flow.getProperty("childElementCount")).toBe(3);
    expect(displayedItem.id).toBe("second");

    await page.evaluate(
      async (displayedItemSelector: string, ITEM_CSS) => {
        document
          .querySelector(displayedItemSelector)
          .shadowRoot.querySelector("calcite-flow-item")
          .shadowRoot.querySelector<Action["el"]>(`.${ITEM_CSS.backButton}`)
          .click();
      },
      displayedItemSelector,
      ITEM_CSS,
    );
    await page.waitForChanges();

    displayedItem = await page.find(displayedItemSelector);
    expect(await flow.getProperty("childElementCount")).toBe(3);
    expect(displayedItem.id).toBe("first");
  });

  describe("theme", () => {
    themed("calcite-flow", {
      "--calcite-flow-background-color": {
        shadowSelector: `.${CSS.frame}`,
        targetProp: "backgroundColor",
      },
    });
  });
});
