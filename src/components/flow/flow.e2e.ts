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

    await page.setContent(
      html`<calcite-flow
        ><calcite-panel>Hello World</calcite-panel><calcite-panel>Hello World</calcite-panel></calcite-flow
      >`
    );

    const flow = await page.find("calcite-flow");
    const panels = await page.findAll("calcite-panel");

    expect(panels).toHaveLength(2);
    expect(await panels[0].getProperty("active")).toBe(false);
    expect(panels[0].getAttribute("hidden")).toBe("");
    expect(await panels[1].getProperty("active")).toBe(true);
    expect(panels[1].getAttribute("hidden")).toBe(null);

    await flow.callMethod("back");

    await page.waitForChanges();

    expect(panels).toHaveLength(2);
    expect(await panels[0].getProperty("active")).toBe(true);
    expect(panels[0].getAttribute("hidden")).toBe(null);
    expect(await panels[1].getProperty("active")).toBe(false);
    expect(panels[1].getAttribute("hidden")).toBe("");
  });

  it("setting 'beforeBack' should be called in 'back()'", async () => {
    const page = await newE2EPage();

    const mockCallBack = jest.fn().mockReturnValue(Promise.resolve());
    await page.exposeFunction("beforeBack", mockCallBack);

    await page.setContent(
      html`<calcite-flow><calcite-panel></calcite-panel><calcite-panel id="last-panel"></calcite-panel></calcite-flow>`
    );

    await page.$eval(
      "#last-panel",
      (elm: HTMLCalcitePanelElement) =>
        (elm.beforeBack = (window as typeof window & Pick<typeof elm, "beforeBack">).beforeBack)
    );

    const flow = await page.find("calcite-flow");

    const backValue = await flow.callMethod("back");

    expect(backValue).toBeDefined();
    expect(mockCallBack).toBeCalledTimes(1);
  });

  it("frame advancing should add animation class", async () => {
    const page = await newE2EPage();

    await page.setContent(html`<calcite-flow><calcite-panel></calcite-panel></calcite-flow>`);

    const items = await page.findAll("calcite-panel");

    expect(items).toHaveLength(1);

    const element = await page.find("calcite-flow");

    element.innerHTML = html`<calcite-panel>test</calcite-panel><calcite-panel>test</calcite-panel>`;

    await page.waitForChanges();

    const items2 = await page.findAll("calcite-panel");

    expect(items2).toHaveLength(2);

    const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

    expect(frame).toHaveClass(CSS.frameAdvancing);
  });

  it("frame advancing should add animation class when subtree is modified", async () => {
    const page = await newE2EPage();

    await page.setContent(html`<calcite-flow><calcite-panel>flow1</calcite-panel></calcite-flow>`);

    const element = await page.find("calcite-flow");

    element.innerHTML = html`<calcite-panel>flow1</calcite-panel><calcite-panel id="flow2">flow2</calcite-panel>`;

    await page.waitForChanges();

    const item2 = await page.find(`calcite-panel[id=flow2]`);

    item2.innerHTML = "new flow2 subtree content";

    await page.waitForChanges();

    const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

    expect(frame).toHaveClass(CSS.frameAdvancing);
  });

  it("frame retreating should add animation class", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow></calcite-flow>");

    const newPanelsHTML = html`
      <calcite-panel>Hello World</calcite-panel>
      <calcite-panel>Hello World</calcite-panel>
      <calcite-panel>Hello World</calcite-panel>
    `;

    await page.$eval(
      "calcite-flow",
      (elm: HTMLElement, newPanelsHTML: string) => {
        elm.innerHTML = newPanelsHTML;
      },
      newPanelsHTML
    );

    await page.waitForChanges();

    const items = await page.findAll("calcite-panel");

    expect(items).toHaveLength(3);

    const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

    expect(frame).not.toHaveClass(CSS.frameRetreating);
    expect(frame).not.toHaveClass(CSS.frameAdvancing);

    await page.$eval("calcite-flow", (elm: HTMLCalciteFlowElement) => elm.back());

    await page.waitForChanges();

    const items2 = await page.findAll("calcite-panel");

    expect(items2).toHaveLength(3);

    const frame2 = await page.find(`calcite-flow >>> .${CSS.frame}`);

    expect(frame2).toHaveClass(CSS.frameRetreating);
    expect(frame2).not.toHaveClass(CSS.frameAdvancing);
  });

  it("frame animation class should not exist if frame count remains the same", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-flow><calcite-panel>test</calcite-panel><calcite-panel>test</calcite-panel></calcite-flow>`
    );

    const frame = await page.find(`calcite-flow >>> .${CSS.frame}`);

    expect(frame).not.toHaveClass(CSS.frameRetreating);
    expect(frame).not.toHaveClass(CSS.frameAdvancing);

    const element = await page.find("calcite-flow");

    element.innerHTML = html`<calcite-panel>test</calcite-panel><calcite-panel>test</calcite-panel>`;

    await page.waitForChanges();

    expect(frame).not.toHaveClass(CSS.frameRetreating);
    expect(frame).not.toHaveClass(CSS.frameAdvancing);
  });

  it("panel properties should be set", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow></calcite-flow>");

    const newPanelsHTML = html`
      <calcite-panel>Hello World</calcite-panel>
      <calcite-panel>Hello World</calcite-panel>
      <calcite-panel>Hello World</calcite-panel>
    `;

    await page.$eval(
      "calcite-flow",
      (elm: HTMLElement, newPanelsHTML: string) => {
        elm.innerHTML = newPanelsHTML;
      },
      newPanelsHTML
    );

    const items = await page.findAll("calcite-panel");

    expect(items).toHaveLength(3);

    expect(await items[0].getProperty("active")).toBe(false);
    expect(await items[0].getProperty("showBackButton")).toBe(false);
    expect(items[0].getAttribute("hidden")).toBe("");

    expect(await items[1].getProperty("active")).toBe(false);
    expect(await items[1].getProperty("showBackButton")).toBe(false);
    expect(items[1].getAttribute("hidden")).toBe("");

    expect(await items[2].getProperty("active")).toBe(true);
    expect(await items[2].getProperty("showBackButton")).toBe(true);
    expect(items[2].getAttribute("hidden")).toBe(null);
  });

  it("should be accessible", async () =>
    accessible(html`
      <calcite-flow>
        <calcite-panel> </calcite-panel>
        <calcite-panel> </calcite-panel>
        <calcite-panel> </calcite-panel>
      </calcite-flow>
    `));

  it("should only work with slotted panels", async () => {
    const page = await newE2EPage();

    await page.setContent(html`<calcite-flow>
      <calcite-panel>Valid panel</calcite-panel>
      <calcite-panel>Valid panel</calcite-panel>
      <div>
        <calcite-panel>Ignored panel</calcite-panel>
      </div>
    </calcite-flow>`);

    const items = await page.findAll("calcite-panel");

    expect(items).toHaveLength(3);

    expect(await items[0].getProperty("active")).toBe(false);
    expect(await items[0].getProperty("showBackButton")).toBe(false);
    expect(items[0].getAttribute("hidden")).toBe("");

    expect(await items[1].getProperty("active")).toBe(true);
    expect(await items[1].getProperty("showBackButton")).toBe(true);
    expect(items[1].getAttribute("hidden")).toBe(null);

    expect(await items[2].getProperty("active")).toBe(false);
    expect(await items[2].getProperty("showBackButton")).toBe(false);
    expect(items[2].getAttribute("hidden")).toBe(null);
  });
});
