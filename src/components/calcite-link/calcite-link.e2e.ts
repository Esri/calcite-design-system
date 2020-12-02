import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-link", () => {
  it("renders as a span with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link>Continue</calcite-link>`);

    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(element).toHaveAttribute(HYDRATED_ATTR);
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

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(element).not.toHaveAttribute("icon-flip-rtl");
    expect(elementAsLink).not.toBeNull();
    expect(elementAsSpan).toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders as a span with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link>Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders as a link with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link href="/">Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(element).toHaveAttribute(HYDRATED_ATTR);
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
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).not.toBeNull();
    expect(elementAsSpan).toBeNull();
    expect(elementAsLink).toHaveClass("mycustomclass");
    expect(elementAsLink).toEqualAttribute("href", "google.com");
    expect(elementAsLink).toEqualAttribute("rel", "noopener noreferrer");
    expect(elementAsLink).toEqualAttribute("target", "_blank");
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("passes attributes to rendered child span", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link name="myname" class="mycustomclass">Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(elementAsSpan).toHaveClass("mycustomclass");
    expect(elementAsSpan).toEqualAttribute("name", "myname");
    expect(iconStart).toBeNull();
    expect(iconEnd).toBeNull();
  });

  it("renders with an icon-start", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link icon-start='plus'>Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(iconEnd).toBeNull();
  });
  it("renders with an icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link icon-end='plus'>Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(iconStart).toBeNull();
    expect(iconEnd).not.toBeNull();
  });

  it("renders with an icon-start and icon-end", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link icon-start='plus' icon-end='plus'>Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const iconStart = await page.find("calcite-link >>> .calcite-link--icon.icon-start");
    const iconEnd = await page.find("calcite-link >>> .calcite-link--icon.icon-end");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(iconStart).not.toBeNull();
    expect(iconEnd).not.toBeNull();
  });
});
