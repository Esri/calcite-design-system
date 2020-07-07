import { newE2EPage } from "@stencil/core/testing";

describe("calcite-link", () => {
  it("renders as a span with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link>Continue</calcite-link>`);

    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const icon = await page.find("calcite-link >>> .calcite-link--icon");

    expect(element).toHaveAttribute("calcite-hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(icon).toBeNull();
  });

  it("renders as a link with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link href="/">Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const icon = await page.find("calcite-link >>> .calcite-link--icon");

    expect(element).toHaveAttribute("calcite-hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(elementAsLink).not.toBeNull();
    expect(elementAsSpan).toBeNull();
    expect(icon).toBeNull();
  });

  it("renders as a span with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link color="red">Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const icon = await page.find("calcite-link >>> .calcite-link--icon");

    expect(element).toHaveAttribute("calcite-hydrated");
    expect(element).toEqualAttribute("color", "red");
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(icon).toBeNull();
  });

  it("renders as a link with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-link href="/" color="red">Continue</calcite-link>`
    );
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const icon = await page.find("calcite-link >>> .calcite-link--icon");

    expect(element).toHaveAttribute("calcite-hydrated");
    expect(element).toEqualAttribute("color", "red");
    expect(elementAsLink).not.toBeNull();
    expect(elementAsSpan).toBeNull();
    expect(icon).toBeNull();
  });

  it("passes attributes to rendered child link", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-link rel="noopener noreferrer" target="_blank" class="mycustomclass" href="google.com">Continue</calcite-link>`
    );
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const icon = await page.find("calcite-link >>> .calcite-link--icon");
    expect(element).toHaveAttribute("calcite-hydrated");
    expect(elementAsLink).not.toBeNull();
    expect(elementAsSpan).toBeNull();
    expect(elementAsLink).toHaveClass("mycustomclass");
    expect(elementAsLink).toEqualAttribute("href", "google.com");
    expect(elementAsLink).toEqualAttribute("rel", "noopener noreferrer");
    expect(elementAsLink).toEqualAttribute("target", "_blank");
    expect(icon).toBeNull();
  });

  it("passes attributes to rendered child span", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-link name="myname" class="mycustomclass">Continue</calcite-link>`
    );
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const icon = await page.find("calcite-link >>> .calcite-link--icon");
    expect(element).toHaveAttribute("calcite-hydrated");
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(elementAsSpan).toHaveClass("mycustomclass");
    expect(elementAsSpan).toEqualAttribute("name", "myname");
    expect(icon).toBeNull();
  });

  it("validates incorrect props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link color="zip">Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const icon = await page.find("calcite-link >>> .calcite-link--icon");
    expect(element).toHaveAttribute("calcite-hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(icon).toBeNull();
  });

  it("renders with an icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-link icon='plus'>Continue</calcite-link>`);
    const element = await page.find("calcite-link");
    const elementAsSpan = await page.find("calcite-link >>> span");
    const elementAsLink = await page.find("calcite-link >>> a");
    const icon = await page.find("calcite-link >>> .calcite-link--icon");
    expect(element).toHaveAttribute("calcite-hydrated");
    expect(elementAsLink).toBeNull();
    expect(elementAsSpan).not.toBeNull();
    expect(icon).not.toBeNull();
  });
});
