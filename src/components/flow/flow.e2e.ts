import { newE2EPage } from "@stencil/core/testing";

import { CSS } from "./resources";
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

  it("back() method should remove item", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow><calcite-flow-item>Hello World</calcite-flow-item></calcite-flow>");

    const flow = await page.find("calcite-flow");
    const flowItems = await page.findAll("calcite-flow-item");

    expect(flowItems).toHaveLength(2);
    expect(await flowItems[0].getProperty("open")).toBe(false);
    expect(flowItems[0].getAttribute("hidden")).toBe("");
    expect(await flowItems[1].getProperty("open")).toBe(true);
    expect(flowItems[1].getAttribute("hidden")).toBe(null);

    await flow.callMethod("back");

    await page.waitForChanges();

    expect(flowItems).toHaveLength(2);
    expect(await flowItems[0].getProperty("open")).toBe(true);
    expect(flowItems[0].getAttribute("hidden")).toBe(null);
    expect(await flowItems[1].getProperty("open")).toBe(false);
    expect(flowItems[1].getAttribute("hidden")).toBe("");
    const flowItem = await page.find("calcite-flow-item");

    expect(flowItem).toBeNull();
  });

  it("setting 'beforeBack' should be called in 'back()'", async () => {
    const page = await newE2EPage();

    const mockCallBack = jest.fn().mockReturnValue(Promise.resolve());
    await page.exposeFunction("beforeBack", mockCallBack);

    await page.setContent(`<calcite-flow><calcite-flow-item id="last-item"></calcite-flow-item></calcite-flow>`);

    await page.$eval(
      "#last-item",
      (elm: HTMLCalciteFlowItemElement) =>
        (elm.beforeBack = (window as typeof window & Pick<typeof elm, "beforeBack">).beforeBack)
    );

    const flow = await page.find("calcite-flow");

    const backValue = await flow.callMethod("back");

    expect(backValue).toBeDefined();
    expect(mockCallBack).toBeCalledTimes(1);
  });

  it("frame advancing should add animation class", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow><calcite-flow-item></calcite-flow-item></calcite-flow>");

    const items = await page.findAll("calcite-flow-item");

    expect(items).toHaveLength(1);

    const element = await page.find("calcite-flow");

    element.innerHTML = "<calcite-flow-item>test</calcite-flow-item><calcite-flow-item>test</calcite-flow-item>";

    await page.waitForChanges();

    const items2 = await page.findAll("calcite-flow-item");

    expect(items2).toHaveLength(2);

    const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

    expect(frame).toHaveClass(CSS.frameAdvancing);
  });

  it("frame advancing should add animation class when subtree is modified", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow><calcite-flow-item>flow1</calcite-flow-item></calcite-flow>");

    const element = await page.find("calcite-flow");

    element.innerHTML = `<calcite-flow-item>flow1</calcite-flow-item><calcite-flow-item id="flow2">flow2</calcite-flow-item>`;

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

    await page.$eval("calcite-flow", (elm: HTMLElement) => {
      elm.innerHTML = `
      <calcite-flow-item>Hello World</calcite-flow-item>
      <calcite-flow-item>Hello World</calcite-flow-item>
      <calcite-flow-item>Hello World</calcite-flow-item>
      `;
    });

    await page.waitForChanges();

    const items = await page.findAll("calcite-flow-item");

    expect(items).toHaveLength(3);

    const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

    expect(frame).not.toHaveClass(CSS.frameRetreating);
    expect(frame).not.toHaveClass(CSS.frameAdvancing);

    await page.$eval("calcite-flow", (elm: HTMLCalciteFlowElement) => elm.back());

    await page.waitForChanges();

    const items2 = await page.findAll("calcite-flow-item");

    expect(items2).toHaveLength(3);

    const frame2 = await page.find(`calcite-flow >>> .${CSS.frame}`);

    expect(frame2).toHaveClass(CSS.frameRetreating);
    expect(frame2).not.toHaveClass(CSS.frameAdvancing);
  });

  it("frame animation class should not exist if frame count remains the same", async () => {
    const page = await newE2EPage();

    await page.setContent(
      "<calcite-flow><calcite-flow-item>test</calcite-flow-item><calcite-flow-item>test</calcite-flow-item></calcite-flow>"
    );

    const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

    expect(frame).not.toHaveClass(CSS.frameRetreating);
    expect(frame).not.toHaveClass(CSS.frameAdvancing);

    const element = await page.find("calcite-flow");

    element.innerHTML = "<calcite-flow-item>test</calcite-flow-item><calcite-flow-item>test</calcite-flow-item>";

    await page.waitForChanges();

    expect(frame).not.toHaveClass(CSS.frameRetreating);
    expect(frame).not.toHaveClass(CSS.frameAdvancing);
  });

  it("flowItem properties should be set", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow></calcite-flow>");

    await page.$eval("calcite-flow", (elm: HTMLElement) => {
      elm.innerHTML = `
      <calcite-flow-item>Hello World</calcite-flow-item>
      <calcite-flow-item>Hello World</calcite-flow-item>
      <calcite-flow-item>Hello World</calcite-flow-item>
      `;
    });

    const items = await page.findAll("calcite-flow-item");

    expect(items).toHaveLength(3);

    expect(await items[0].getProperty("open")).toBe(false);
    expect(await items[0].getProperty("showBackButton")).toBe(false);
    expect(items[0].getAttribute("hidden")).toBe("");

    expect(await items[1].getProperty("open")).toBe(false);
    expect(await items[1].getProperty("showBackButton")).toBe(false);
    expect(items[1].getAttribute("hidden")).toBe("");

    expect(await items[2].getProperty("open")).toBe(true);
    expect(await items[2].getProperty("showBackButton")).toBe(true);
    expect(items[2].getAttribute("hidden")).toBe(null);
  });

  it("should be accessible", async () =>
    accessible(`
    <calcite-flow>
    <calcite-flow-item>Hello World</calcite-flow-item>
    <calcite-flow-item>Hello World</calcite-flow-item>
    <calcite-flow-item>Hello World</calcite-flow-item>
    </calcite-flow>
    `));

  it("should also work with descendant slotted flowItems", async () => {
    const page = await newE2EPage();

    await page.setContent(html`<calcite-flow>
      <calcite-flow-item>Valid flowItem</calcite-flow-item>
      <calcite-flow-item>Valid flowItem</calcite-flow-item>
      <div>
        <calcite-flow-item
          >Allowed flowItem <calcite-flow-item>Disallowed flowItem</calcite-flow-item></calcite-flow-item
        >
      </div>
    </calcite-flow>`);

    const items = await page.findAll("calcite-flow-item");

    expect(items).toHaveLength(4);

    expect(await items[0].getProperty("open")).toBe(false);
    expect(await items[0].getProperty("showBackButton")).toBe(false);
    expect(items[0].getAttribute("hidden")).toBe("");

    expect(await items[1].getProperty("open")).toBe(false);
    expect(await items[1].getProperty("showBackButton")).toBe(false);
    expect(items[1].getAttribute("hidden")).toBe("");

    expect(await items[2].getProperty("open")).toBe(true);
    expect(await items[2].getProperty("showBackButton")).toBe(true);
    expect(items[2].getAttribute("hidden")).toBe(null);

    expect(await items[3].getProperty("open")).toBe(false);
    expect(items[3].getAttribute("hidden")).toBe(null);
    expect(await items[3].getProperty("showBackButton")).toBe(false);
  });
});
