import { newE2EPage } from "@stencil/core/testing";
import { POPOVER_REFERENCE } from "../popover/resources";
import { accessible, defaults, hidden, renders } from "../../tests/commonTests";

describe("calcite-popover-manager", () => {
  it("renders", async () => renders(`<calcite-popover-manager></calcite-popover-manager>`, { display: "block" }));

  it("is accessible", async () =>
    accessible(`<calcite-popover-manager>
  <calcite-popover reference-element="ref">Content</calcite-popover>
  <div id="ref">Button</div>
<calcite-popover-manager>`));

  it("honors hidden attribute", async () => hidden("calcite-popover-manager"));

  it("has property defaults", async () =>
    defaults("calcite-popover-manager", [
      {
        propertyName: "selector",
        defaultValue: `[${POPOVER_REFERENCE}]`
      },
      {
        propertyName: "autoClose",
        defaultValue: false
      },
      {
        propertyName: "group",
        defaultValue: undefined
      }
    ]));

  it("should open popovers", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <calcite-popover-manager>
        <calcite-popover reference-element="ref">Content</calcite-popover>
        <div id="ref">Button</div>
      <calcite-popover-manager>
      `
    );

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    expect(await popover.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref");

    await referenceElement.click();

    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("should open popovers 2", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <calcite-popover-manager>
        <calcite-popover reference-element="ref">Content</calcite-popover>
        <div id="ref"><span>Button</span></div>
      <calcite-popover-manager>
      `
    );

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    expect(await popover.getProperty("open")).toBe(false);

    const referenceElement = await page.find("#ref span");

    await referenceElement.click();

    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("do not autoClose popovers when clicked outside", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <div id="outsideNode">Outside node</div>
      <calcite-popover-manager>
        <calcite-popover reference-element="ref" open>Content</calcite-popover>
        <div id="ref">Button</div>
      <calcite-popover-manager>
      `
    );

    await page.waitForChanges();

    const outsideNode = await page.find("#outsideNode");

    await outsideNode.click();

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    expect(await popover.getProperty("open")).toBe(true);
  });

  it("autoClose popovers when clicked outside", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <div id="outsideNode">Outside node</div>
      <calcite-popover-manager auto-close>
        <calcite-popover reference-element="ref" open>
          <div id="insideNode">Inside node</div>
        </calcite-popover>
        <div id="ref">Button</div>
      <calcite-popover-manager>
      `
    );

    await page.waitForChanges();

    const popover = await page.find("calcite-popover");

    expect(await popover.getProperty("open")).toBe(true);

    const insideNode = await page.find("#insideNode");

    await insideNode.click();

    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(true);

    const outsideNode = await page.find("#outsideNode");

    await outsideNode.click();

    await page.waitForChanges();

    expect(await popover.getProperty("open")).toBe(false);
  });

  it("autoClose grouped popovers when clicked outside", async () => {
    const page = await newE2EPage();

    await page.setContent(
      `
      <div id="outsideNode">Outside node</div>
      <calcite-popover-manager auto-close group="test">
        <calcite-popover id="popover1" reference-element="ref" open>
          Popover1
        </calcite-popover>
        <calcite-popover id="popover2" group="test" reference-element="ref2" open>
          Popover2
        </calcite-popover>
        <div id="ref">Button</div>
        <div id="ref2">Button</div>
      <calcite-popover-manager>
      `
    );

    await page.waitForChanges();

    const outsideNode = await page.find("#outsideNode");

    await outsideNode.click();

    await page.waitForChanges();

    const popover1 = await page.find("#popover1");
    const popover2 = await page.find("#popover2");

    expect(await popover1.getProperty("open")).toBe(true);
    expect(await popover2.getProperty("open")).toBe(false);
  });
});
