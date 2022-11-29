import { newE2EPage } from "@stencil/core/testing";

import { CSS } from "./resources";
import { CSS as ITEM_CSS } from "../flow-item/resources";
import { accessible, hidden, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-flow", () => {
  it("renders", async () => renders("calcite-flow", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-flow"));

  it("frame defaults", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow></calcite-flow>");

    const element = await page.find(`calcite-flow >>> .${CSS.frame}`);

    expect(element).toHaveClass(CSS.frame);
    expect(element).not.toHaveClass(CSS.frameAdvancing);
    expect(element).not.toHaveClass(CSS.frameRetreating);
  });

  describe("works with flow-items", () => {
    testItemBehavior("flow-item");

    function testItemBehavior(itemType: "flow-item"): void {
      const itemTag = `calcite-${itemType}`;

      it("back() method should remove item", async () => {
        const page = await newE2EPage();

        await page.setContent(`<calcite-flow><${itemTag}></${itemTag}></calcite-flow>`);

        const flow = await page.find("calcite-flow");

        await flow.callMethod("back");

        await page.waitForChanges();

        const flowItem = await page.find(itemTag);

        expect(flowItem).toBeNull();
      });

      it("goes back when item back button is clicked", async () => {
        const page = await newE2EPage();

        await page.setContent(html`<calcite-flow show-back-button>
          <${itemTag} id="first"></${itemTag}>
          <${itemTag} id="second"></${itemTag}>
        </calcite-flow>`);

        const activeItemBackButton = await page.find(`${itemTag}:last-of-type >>> .${ITEM_CSS.backButton}`);
        await activeItemBackButton.click();

        const items = await page.findAll(itemTag);

        expect(items).toHaveLength(1);
        expect(items[0].id).toBe("first");
      });

      it("setting 'beforeBack' should be called in 'back()'", async () => {
        const page = await newE2EPage();

        const mockCallBack = jest.fn().mockReturnValue(Promise.resolve());
        await page.exposeFunction("beforeBack", mockCallBack);

        await page.setContent(`<calcite-flow><${itemTag}></${itemTag}></calcite-flow>`);

        await page.$eval(
          itemTag,
          (elm: HTMLCalciteFlowItemElement) =>
            (elm.beforeBack = (window as typeof window & Pick<typeof elm, "beforeBack">).beforeBack)
        );

        const flow = await page.find("calcite-flow");

        const backValue = await flow.callMethod("back");

        expect(backValue).toBeDefined();
        expect(mockCallBack).toHaveBeenCalledTimes(1);
      });

      it("frame advancing should add animation class", async () => {
        const page = await newE2EPage();

        await page.setContent(`<calcite-flow><${itemTag}></${itemTag}></calcite-flow>`);

        const items = await page.findAll(itemTag);

        expect(items).toHaveLength(1);

        const element = await page.find("calcite-flow");

        element.innerHTML = `<${itemTag}>test</${itemTag}><${itemTag}>test</${itemTag}>`;

        await page.waitForChanges();

        const items2 = await page.findAll(itemTag);

        expect(items2).toHaveLength(2);

        const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

        expect(frame).toHaveClass(CSS.frameAdvancing);
      });

      it("frame advancing should add animation class when subtree is modified", async () => {
        const page = await newE2EPage();

        await page.setContent(`<calcite-flow><${itemTag}>flow1</${itemTag}></calcite-flow>`);

        const element = await page.find("calcite-flow");

        element.innerHTML = `<${itemTag}>flow1</${itemTag}><${itemTag} id="flow2">flow2</${itemTag}>`;

        await page.waitForChanges();

        const item2 = await page.find(`${itemTag}[id=flow2]`);

        item2.innerHTML = "new flow2 subtree content";

        await page.waitForChanges();

        const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

        expect(frame).toHaveClass(CSS.frameAdvancing);
      });

      it("frame retreating should add animation class", async () => {
        const page = await newE2EPage();

        await page.setContent("<calcite-flow></calcite-flow>");

        await page.$eval(
          "calcite-flow",
          (elm: HTMLElement, itemTag: string): void => {
            elm.innerHTML = `
      <${itemTag}></${itemTag}>
      <${itemTag}></${itemTag}>
      <${itemTag}></${itemTag}>
      `;
          },
          itemTag
        );

        await page.waitForChanges();

        const items = await page.findAll(itemTag);

        expect(items).toHaveLength(3);

        const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

        expect(frame).not.toHaveClass(CSS.frameRetreating);
        expect(frame).not.toHaveClass(CSS.frameAdvancing);

        await page.$eval("calcite-flow", (elm: HTMLCalciteFlowElement) => elm.back());

        await page.waitForChanges();

        const items2 = await page.findAll(itemTag);

        expect(items2).toHaveLength(2);

        const frame2 = await page.find(`calcite-flow >>> .${CSS.frame}`);

        expect(frame2).toHaveClass(CSS.frameRetreating);
        expect(frame2).not.toHaveClass(CSS.frameAdvancing);
      });

      it("frame animation class should not exist if frame count remains the same", async () => {
        const page = await newE2EPage();

        await page.setContent(
          `<calcite-flow><${itemTag}>test</${itemTag}><${itemTag}>test</${itemTag}></calcite-flow>`
        );

        const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

        expect(frame).not.toHaveClass(CSS.frameRetreating);
        expect(frame).not.toHaveClass(CSS.frameAdvancing);

        const element = await page.find("calcite-flow");

        element.innerHTML = `<${itemTag}>test</${itemTag}><${itemTag}>test</${itemTag}>`;

        await page.waitForChanges();

        expect(frame).not.toHaveClass(CSS.frameRetreating);
        expect(frame).not.toHaveClass(CSS.frameAdvancing);
      });

      it("item properties should be set", async () => {
        const page = await newE2EPage();

        await page.setContent("<calcite-flow></calcite-flow>");

        await page.$eval(
          "calcite-flow",
          (elm: HTMLElement, itemTag: string): void => {
            elm.innerHTML = `
      <${itemTag}></${itemTag}>
      <${itemTag}></${itemTag}>
      <${itemTag}></${itemTag}>
      `;
          },
          itemTag
        );

        const items = await page.findAll(itemTag);

        expect(items).toHaveLength(3);

        const showBackButton0 = await items[0].getProperty("showBackButton");
        const showBackButton2 = await items[2].getProperty("showBackButton");

        expect(items[0].getAttribute("hidden")).not.toBe(null);
        expect(showBackButton0).not.toBe(null);

        expect(items[2].getAttribute("hidden")).toBe(null);
        expect(showBackButton2).not.toBe(null);
      });

      it("should be accessible", async () =>
        accessible(html`
    <calcite-flow>
      <${itemTag}>
      </${itemTag}>
      <${itemTag}>
      </${itemTag}>
      <${itemTag}>
      </${itemTag}>
    </calcite-flow>
    `));

      it("should also work with descendant slotted items", async () => {
        const page = await newE2EPage();

        await page.setContent(html`<calcite-flow>
      <${itemTag}>Valid item</${itemTag}>
      <${itemTag}>Valid item</${itemTag}>
      <div>
        <${itemTag}>Allowed item <${itemTag}>Disallowed item</${itemTag}></${itemTag}>
      </div>
    </calcite-flow>`);

        const items = await page.findAll(itemTag);

        expect(items).toHaveLength(4);

        expect(items[0].getAttribute("hidden")).toBe("");
        expect(await items[0].getProperty("showBackButton")).toBe(false);

        expect(items[1].getAttribute("hidden")).toBe("");
        expect(await items[1].getProperty("showBackButton")).toBe(false);

        expect(items[2].getAttribute("hidden")).toBe(null);
        expect(await items[2].getProperty("showBackButton")).toBe(true);

        expect(items[3].getAttribute("hidden")).toBe(null);
        expect(await items[3].getProperty("showBackButton")).toBe(false);
      });
    }
  });
});
