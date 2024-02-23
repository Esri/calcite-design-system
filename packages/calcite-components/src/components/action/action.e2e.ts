import { newE2EPage } from "@stencil/core/testing";
import { accessible, disabled, hidden, renders, slots, t9n, defaults } from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";

describe("calcite-action", () => {
  describe("defaults", () => {
    defaults("calcite-action", [
      {
        propertyName: "active",
        defaultValue: false,
      },
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
      {
        propertyName: "compact",
        defaultValue: false,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "indicator",
        defaultValue: false,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "textEnabled",
        defaultValue: false,
      },
    ]);
  });

  describe("renders", () => {
    renders("calcite-action", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-action");
  });

  describe("disabled", () => {
    disabled("calcite-action");
  });

  describe("slots", () => {
    slots("calcite-action", SLOTS);
  });

  it("should have visible text when text is enabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world" text-enabled></calcite-action>`);

    const textContainer = await page.find(`calcite-action >>> .${CSS.textContainer}`);
    const isVisible = await textContainer.isVisible();

    expect(isVisible).toBe(true);
  });

  it("should not have visible text when text is not enabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world"></calcite-action>`);

    const textContainer = await page.find(`calcite-action >>> .${CSS.textContainer}`);
    const isVisible = await textContainer.isVisible();

    expect(isVisible).toBe(false);
  });

  it("should have icon container with icon prop", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action icon="hamburger"></calcite-action>`);

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).not.toBeNull();
  });

  it("should have icon container with calcite-icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action><calcite-icon icon="hamburger" scale="s"></calcite-icon></calcite-action>`);

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).not.toBeNull();
  });

  it("should have icon container with calcite-icon: after delay", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action></calcite-action>`);

    const action = await page.find("calcite-action");

    await page.waitForTimeout(1);

    action.innerHTML = `<calcite-icon icon="hamburger" scale="s"></calcite-icon>`;

    await page.waitForChanges();

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).not.toBeNull();
  });

  it("should have icon container with svg", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action><svg></svg></calcite-action>`);

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).not.toBeNull();
  });

  it("should not have icon container if no icon present", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action></calcite-action>`);

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).toBeNull();
  });

  it("should have icon container if loading", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action loading></calcite-action>`);

    const iconContainer = await page.find(`calcite-action >>> .${CSS.iconContainer}`);
    expect(iconContainer).not.toBeNull();
  });

  it("should use text prop for a11y attributes when text is not enabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world"></calcite-action>`);

    const button = await page.find(`calcite-action >>> button`);
    expect(button.getAttribute("aria-label")).toBe("hello world");
  });

  it("should set aria-label with indicator", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action indicator text="hello world"></calcite-action>`);

    const button = await page.find(`calcite-action >>> button`);
    expect(button.getAttribute("aria-label")).toBe(`hello world (Indicator present)`);
  });

  it("should have label", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world" label="hi"></calcite-action>`);

    const button = await page.find(`calcite-action >>> button`);
    expect(button.getAttribute("aria-label")).toBe("hi");
  });

  it("should have appearance=solid", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world"></calcite-action>`);

    const action = await page.find("calcite-action");
    expect(action.getAttribute("appearance")).toBe("solid");
  });

  describe("accessible", () => {
    accessible(`<calcite-action text="hello world"></calcite-action>`);
    accessible(`<calcite-action text="hello world" disabled text-enabled></calcite-action>`);
    accessible(`<calcite-action indicator text="hello world"></calcite-action>`);
  });

  it("should have a tooltip", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-action text="hello world"><calcite-tooltip slot="tooltip">Hello World!</calcite-tooltip></calcite-action>`,
    );
    await page.waitForChanges();

    const tooltip = await page.find("calcite-tooltip");
    const referenceElement: HTMLElement = await tooltip.getProperty("referenceElement");
    expect(referenceElement).toBeDefined();
  });

  describe("translation support", () => {
    t9n("calcite-action");
  });

  it("should have a indicator live region", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action></calcite-action>`);
    await page.waitForChanges();

    const action = await page.find("calcite-action");
    const liveRegion = await page.find(`calcite-action >>> .${CSS.indicatorText}`);

    expect(liveRegion.getAttribute("aria-live")).toBe("polite");
    expect(liveRegion.getAttribute("role")).toBe("region");
    expect(liveRegion.textContent).toBe("");

    action.setProperty("indicator", true);
    await page.waitForChanges();

    expect(liveRegion.getAttribute("aria-live")).toBe("polite");
    expect(liveRegion.getAttribute("role")).toBe("region");
    expect(liveRegion.textContent).toBe("Indicator present");
  });
});
