import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-action", () => {
  it("renders", async () => renders("calcite-action"));

  it("honors hidden attribute", async () => hidden("calcite-action"));

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

    const button = await page.find(`calcite-action >>> .${CSS.button}`);
    expect(button.getAttribute("aria-label")).toBe("hello world");
  });

  it("should have label", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world" label="hi"></calcite-action>`);

    const button = await page.find(`calcite-action >>> .${CSS.button}`);
    expect(button.getAttribute("aria-label")).toBe("hi");
  });

  it("should be disabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action disabled></calcite-action>`);

    const button = await page.find(`calcite-action >>> .${CSS.button}`);
    expect(button).toHaveAttribute("disabled");
  });

  it("should have appearance=solid", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action text="hello world"></calcite-action>`);

    const action = await page.find("calcite-action");
    expect(action.getAttribute("appearance")).toBe("solid");
  });

  it("should be accessible", async () => {
    await accessible(`<calcite-action text="hello world"></calcite-action>`);
    await accessible(`<calcite-action text="hello world" disabled text-enabled></calcite-action>`);
  });

  it("should not emit click event when disabled", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-action text="hello world" disabled></calcite-action>`);

    const action = await page.find("calcite-action");

    const clickSpy = await action.spyOnEvent("click");

    await action.click();

    expect(clickSpy).toHaveReceivedEventTimes(0);
  });

  it("should emit 'calciteActionClick' event", async () => {
    const page = await newE2EPage({
      html: `<calcite-action text="hello world"></calcite-action>`
    });

    await page.waitForChanges();

    const clickSpy = await page.spyOnEvent("calciteActionClick");

    const button = await page.find("calcite-action >>> button");

    await button.click();

    await page.waitForChanges();

    expect(clickSpy).toHaveReceivedEventTimes(1);
  });

  it("should not emit 'calciteActionClick' event when disabled", async () => {
    const page = await newE2EPage({
      html: `<calcite-action text="hello world" disabled></calcite-action>`
    });

    await page.waitForChanges();

    const clickSpy = await page.spyOnEvent("calciteActionClick");

    const button = await page.find("calcite-action >>> button");

    await button.click();

    await page.waitForChanges();

    expect(clickSpy).toHaveReceivedEventTimes(0);
  });
});
