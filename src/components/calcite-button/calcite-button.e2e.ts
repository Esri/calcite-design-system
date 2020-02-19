import { newE2EPage } from "@stencil/core/testing";

describe("calcite-button", () => {
  it("renders as a button with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button>Continue</calcite-button>`);

    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const icon = await page.find(
      "calcite-button >>> .calcite-button--icon"
    );
    const loader = await page.find(
      "calcite-button >>> .calcite-button--loader"
    );

    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("width", "auto");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(icon).toBeNull();
    expect(loader).toBeNull();
  });

  it("renders as a link with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-button href="/">Continue</calcite-button>`);
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const icon = await page.find(
      "calcite-button >>> .calcite-button--icon"
    );
    const loader = await page.find(
      "calcite-button >>> .calcite-button--loader"
    );

    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("width", "auto");
    expect(elementAsLink).not.toBeNull();
    expect(elementAsButton).toBeNull();
    expect(icon).toBeNull();
    expect(loader).toBeNull();
  });

  it("renders as a button with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button color="red" scale="xl" width="half" appearance="outline">Continue</calcite-button>`
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const icon = await page.find(
      "calcite-button >>> .calcite-button--icon"
    );
    const loader = await page.find(
      "calcite-button >>> .calcite-button--loader"
    );

    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "red");
    expect(element).toEqualAttribute("appearance", "outline");
    expect(element).toEqualAttribute("scale", "xl");
    expect(element).toEqualAttribute("width", "half");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(icon).toBeNull();
    expect(loader).toBeNull();
  });

  it("renders as a link with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button href="/" color="red" scale="xl" width="half" appearance="outline">Continue</calcite-button>`
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const icon = await page.find(
      "calcite-button >>> .calcite-button--icon"
    );
    const loader = await page.find(
      "calcite-button >>> .calcite-button--loader"
    );

    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "red");
    expect(element).toEqualAttribute("appearance", "outline");
    expect(element).toEqualAttribute("scale", "xl");
    expect(element).toEqualAttribute("width", "half");
    expect(elementAsLink).not.toBeNull();
    expect(elementAsButton).toBeNull();
    expect(icon).toBeNull();
    expect(loader).toBeNull();
  });

  it("passes attributes to rendered child link", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button rel="noopener noreferrer" target="_blank" class="mycustomclass" href="google.com">Continue</calcite-button>`
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const icon = await page.find(
      "calcite-button >>> .calcite-button--icon"
    );
    const loader = await page.find(
      "calcite-button >>> .calcite-button--loader"
    );
    expect(element).toHaveClass("hydrated");
    expect(elementAsLink).not.toBeNull();
    expect(elementAsButton).toBeNull();
    expect(elementAsLink).toHaveClass("mycustomclass");
    expect(elementAsLink).toEqualAttribute("href", "google.com");
    expect(elementAsLink).toEqualAttribute("rel", "noopener noreferrer");
    expect(elementAsLink).toEqualAttribute("target", "_blank");
    expect(icon).toBeNull();
    expect(loader).toBeNull();
  });

  it("passes attributes to rendered child button", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button type="reset" name="myname" class="mycustomclass">Continue</calcite-button>`
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const icon = await page.find(
      "calcite-button >>> .calcite-button--icon"
    );
    const loader = await page.find(
      "calcite-button >>> .calcite-button--loader"
    );
    expect(element).toHaveClass("hydrated");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(elementAsButton).toHaveClass("mycustomclass");
    expect(elementAsButton).toEqualAttribute("type", "reset");
    expect(elementAsButton).toEqualAttribute("name", "myname");
    expect(icon).toBeNull();
    expect(loader).toBeNull();
  });

  it("validates incorrect props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button color="zip" scale="zot" width="zap" appearance="zom">Continue</calcite-button>`
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const icon = await page.find(
      "calcite-button >>> .calcite-button--icon"
    );
    const loader = await page.find(
      "calcite-button >>> .calcite-button--loader"
    );
    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("width", "auto");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(icon).toBeNull();
    expect(loader).toBeNull();
  });

  it("renders with an icon", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button icon='plus'>Continue</calcite-button>`
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const icon = await page.find(
      "calcite-button >>> .calcite-button--icon"
    );
    const loader = await page.find(
      "calcite-button >>> .calcite-button--loader"
    );
    expect(element).toHaveClass("hydrated");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(icon).not.toBeNull();
    expect(loader).toBeNull();
  });

  it("renders with a loader and an icon element when both icon and loader are present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button loading icon='plus'>Continue</calcite-button>`
    );
    const element = await page.find("calcite-button");
    const elementAsButton = await page.find("calcite-button >>> button");
    const elementAsLink = await page.find("calcite-button >>> a");
    const icon = await page.find(
      "calcite-button >>> .calcite-button--icon"
    );
    const loader = await page.find(
      "calcite-button >>> .calcite-button--loader"
    );
    expect(element).toHaveClass("hydrated");
    expect(elementAsLink).toBeNull();
    expect(elementAsButton).not.toBeNull();
    expect(icon).not.toBeNull();
    expect(loader).not.toBeNull();
  });

  it("hastext is true when text is present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button>Continue</calcite-button>`
    );
    const element = await page.find("calcite-button");
    expect(element).toHaveAttribute("hastext");
  });

  it("hastext is false when text is not present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-button icon='plus'></calcite-button>`
    );
    const element = await page.find("calcite-button");
    expect(element).not.toHaveAttribute("hastext");
  });
});
