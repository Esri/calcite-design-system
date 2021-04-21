import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { accessible } from "../../tests/commonTests";

describe("calcite-link", () => {
  it("is accessible", async () => {
    await accessible("<calcite-link href='/'>link</calcite-link>");
    await accessible("<calcite-link>link</calcite-link>");
    await accessible("<calcite-link icon-start='plus' icon-end='plus' href='/'>Go</calcite-link>");
  });

  it("renders as a span with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link>Continue</calcite-link>`);

    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(element).not.toHaveAttribute("icon-flip-rtl");
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders as a link with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link href="/">Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(element).not.toHaveAttribute("icon-flip-rtl");
    expect(elementAsLink).not.toBeNull();
    expect(elementAsSpan).toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders as a span with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link>Continue</calcite-link>`);
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders as a link with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link href="/">Continue</calcite-link>`);
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(elementAsLink).not.toBeNull();
    expect(elementAsSpan).toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("passes attributes to rendered child link", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-link rel="noopener noreferrer" target="_blank" class="mycustomclass" href="google.com">Continue</calcite-link>`
    );
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(elementAsLink).not.toBeNull();
    expect(elementAsSpan).toBeNull();
    expect(elementAsLink).not.toHaveClass("mycustomclass");
    expect(elementAsLink).toEqualAttribute("href", "google.com");
    expect(elementAsLink).toEqualAttribute("rel", "noopener noreferrer");
    expect(elementAsLink).toEqualAttribute("target", "_blank");
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("passes attributes to rendered child span", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link name="myname" class="mycustomclass">Continue</calcite-link>`);
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(elementAsSpan).not.toHaveClass("mycustomclass");
    expect(elementAsSpan).toEqualAttribute("name", "myname");
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders with an icon-start", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link icon-start='plus'>Continue</calcite-link>`);
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders with an icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link icon-end='plus'>Continue</calcite-link>`);
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).not.toBeNull();
  });

  it("renders with an icon-start and icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link icon-start='plus' icon-end='plus'>Continue</calcite-link>`);
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
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
        html: `<calcite-link href="/${targetPage}">link</calcite-link>`
      });

      pageUrl = page.url();
      targetUrl = `${pageUrl}${targetPage}`;
    });

    it("keyboard", async () => {
      const element = await page.find("calcite-link");
      await element.callMethod("setFocus");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(page.url()).toBe(targetUrl);
    });

    it("mouse", async () => {
      // workaround for https://github.com/puppeteer/puppeteer/issues/2977
      await page.$eval("calcite-link", (link: HTMLElement): void => {
        link.shadowRoot.querySelector("a").click();
      });
      await page.waitForChanges();

      expect(page.url()).toBe(targetUrl);
    });
  });
});
