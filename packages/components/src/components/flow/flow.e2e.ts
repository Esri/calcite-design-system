import { E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it, vi } from "vitest";
import { html } from "../../../support/formatting";

import { CSS as ITEM_CSS } from "../flow-item/resources";
import { findAll, isElementFocused } from "../../tests/utils/puppeteer";
import type { Action } from "../action/action";
import type { FlowItem } from "../flow-item/flow-item";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";
import type { Flow } from "./flow";

async function slowPageAnimations(page: E2EPage): Promise<void> {
  await page.addStyleTag({
    content: `:root { --calcite-duration-factor: 9999; }`,
  });
}

mockConsole();

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
      (elm, backButtonCSS: string) => {
        elm.shadowRoot!.querySelector<Action["el"]>(`.${backButtonCSS}`)!.click();
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

      lastFlowItem?.shadowRoot!.querySelector<HTMLElement>(backButtonSelector)!.click();
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
      (elm) =>
        ((elm as FlowItem["el"]).beforeBack = (
          window as typeof window & Pick<FlowItem["el"], "beforeBack">
        ).beforeBack),
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
      (elm) =>
        ((elm as FlowItem["el"]).beforeBack = (
          window as typeof window & Pick<FlowItem["el"], "beforeBack">
        ).beforeBack),
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

  it("should ignore descendant flow items and only track top-level slotted items", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-flow>
        <calcite-flow-item id="first">Top-level item</calcite-flow-item>
        <calcite-flow-item id="second"
          >Top-level item
          <calcite-flow-item id="nested">Nested descendant item</calcite-flow-item>
        </calcite-flow-item>
      </calcite-flow>`,
    );

    const first = await page.find("#first");
    const second = await page.find("#second");
    const nested = await page.find("#nested");

    expect(await first.getProperty("selected")).toBe(false);
    expect(await first.getProperty("showBackButton")).toBe(false);
    expect(await first.isVisible()).toBe(false);

    expect(await second.getProperty("selected")).toBe(true);
    expect(await second.getProperty("showBackButton")).toBe(true);
    expect(await second.isVisible()).toBe(true);

    expect(await nested.getProperty("selected")).toBe(false);
    expect(await nested.getProperty("showBackButton")).toBe(false);
    expect(await nested.isVisible()).toBe(false);
  });
});
