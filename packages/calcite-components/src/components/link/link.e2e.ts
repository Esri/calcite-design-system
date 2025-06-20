// @ts-strict-ignore
import { newE2EPage, E2EPage, E2EElement } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it, beforeEach } from "vitest";
import { accessible, defaults, disabled, hidden, renders, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-link", () => {
  describe("renders", () => {
    renders("<calcite-link href='/'>link</calcite-link>", { display: "inline" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-link");
  });

  describe("defaults", () => {
    defaults("calcite-link", [
      {
        propertyName: "download",
        defaultValue: false,
      },
    ]);
  });

  describe("accessible", () => {
    accessible("<calcite-link href='/'>link</calcite-link>");
    accessible("<calcite-link>link</calcite-link>");
    accessible("<calcite-link icon-start='plus' icon-end='plus' href='/'>Go</calcite-link>");
  });

  describe("disabled", () => {
    disabled(`<calcite-link href='/'>link</calcite-link>`);
  });

  it("sets download attribute on internal anchor", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link href="file.jpg">Continue</calcite-link>`);

    const elementAsLink = await page.find("calcite-link >>> a");

    expect(elementAsLink).not.toBeNull();
    expect(await elementAsLink.getProperty("download")).toBe("");
    expect(elementAsLink).not.toHaveAttribute("download");

    const element = await page.find("calcite-link");

    element.setProperty("download", true);
    await page.waitForChanges();

    expect(await elementAsLink.getProperty("download")).toBe("");
    expect(elementAsLink).toHaveAttribute("download");
    expect(elementAsLink.getAttribute("download")).toBe("");

    const newFilename = "my-cool-file.jpg";
    element.setProperty("download", newFilename);
    await page.waitForChanges();

    expect(await elementAsLink.getProperty("download")).toBe(newFilename);
    expect(elementAsLink.getAttribute("download")).toBe(newFilename);

    element.setProperty("download", false);
    await page.waitForChanges();

    expect(await elementAsLink.getProperty("download")).toBe("");
    expect(elementAsLink).not.toHaveAttribute("download");
  });

  it("renders as a button with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link>Continue</calcite-link>`);

    const element = await page.find("calcite-link");
    const elementAsButton = await page.find("calcite-link >>> button");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(element).not.toHaveAttribute("icon-flip-rtl");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("should update childElType when href changes", async () => {
    const page = await newE2EPage({ html: `<calcite-link>Continue</calcite-link>` });
    const link = await page.find("calcite-link");
    let elementAsLink: E2EElement;
    let elementAsButton: E2EElement;

    elementAsButton = await page.find("calcite-link >>> button");
    elementAsLink = await page.find("calcite-link >>> a");
    expect(elementAsButton).not.toBeNull();
    expect(elementAsLink).toBeNull();

    link.setProperty("href", "/");
    await page.waitForChanges();

    elementAsButton = await page.find("calcite-link >>> button");
    elementAsLink = await page.find("calcite-link >>> a");
    expect(elementAsButton).toBeNull();
    expect(elementAsLink).not.toBeNull();
  });

  it("renders as a link with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link href="/">Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsButton = await page.find("calcite-link >>> button");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(element).not.toHaveAttribute("icon-flip-rtl");
    expect(elementAsLink).not.toBeNull();
    expect(elementAsButton).toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders as a button with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link>Continue</calcite-link>`);
    const elementAsButton = await page.find("calcite-link >>> button");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders as a link with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link href="/">Continue</calcite-link>`);
    const elementAsButton = await page.find("calcite-link >>> button");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(elementAsLink).not.toBeNull();
    expect(elementAsButton).toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("passes attributes to rendered child link", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-link rel="noopener noreferrer" target="_blank" class="my-custom-class" href="google.com">Continue</calcite-link>`,
    );
    const elementAsButton = await page.find("calcite-link >>> button");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(elementAsLink).not.toBeNull();
    expect(elementAsButton).toBeNull();
    expect(elementAsLink).not.toHaveClass("my-custom-class");
    expect(elementAsLink).toEqualAttribute("href", "google.com");
    expect(elementAsLink).toEqualAttribute("rel", "noopener noreferrer");
    expect(elementAsLink).toEqualAttribute("target", "_blank");
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders with an icon-start", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link icon-start='plus'>Continue</calcite-link>`);
    const elementAsButton = await page.find("calcite-link >>> button");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders with an icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link icon-end='plus'>Continue</calcite-link>`);
    const elementAsButton = await page.find("calcite-link >>> button");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).not.toBeNull();
  });

  it("renders with an icon-start and icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link icon-start='plus' icon-end='plus'>Continue</calcite-link>`);
    const elementAsButton = await page.find("calcite-link >>> button");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(iconEnd).not.toBeNull();
  });

  describe("link interactivity", () => {
    const targetPage = "#test";

    let page: E2EPage;
    let pageUrl: string;
    let targetUrl: string;

    beforeEach(async () => {
      page = await newE2EPage({
        html: `<calcite-link href="/${targetPage}">link</calcite-link>`,
      });

      pageUrl = page.url();
      targetUrl = `${pageUrl}${targetPage}`;
    });

    it("keyboard", async () => {
      const element = await page.find("calcite-link");
      await element.callMethod("setFocus");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(page.url()).toBe(targetUrl);
    });

    it("keyboard without href", async () => {
      const element = await page.find("calcite-link");
      element.setProperty("href", undefined);
      const clickEvent = await element.spyOnEvent("click");

      await element.callMethod("setFocus");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(clickEvent).toHaveReceivedEventTimes(1);
    });

    it("mouse", async () => {
      // workaround for https://github.com/puppeteer/puppeteer/issues/2977
      await page.$eval("calcite-link", (link: HTMLElement): void => {
        link.shadowRoot.querySelector("a").click();
      });
      await page.waitForChanges();

      expect(page.url()).toBe(targetUrl);
    });

    it("non user-initiated click event", async () => {
      const link = await page.find("calcite-link");
      const clickEvent = await link.spyOnEvent("click");

      // helps test click behavior via HTMLElement.click()
      await link.callMethod("click");
      await page.waitForChanges();

      expect(page.url()).toBe(targetUrl);
      // make sure forwarded internal event does not propagate
      expect(clickEvent).toHaveReceivedEventTimes(1);
    });
  });

  describe("theme", () => {
    describe("default", () => {
      themed(html` <calcite-link href="#" icon-start="banana" icon-end="information">link</calcite-link> `, {
        "--calcite-link-text-color": {
          shadowSelector: "a",
          targetProp: "color",
        },
      });
    });
  });
});
