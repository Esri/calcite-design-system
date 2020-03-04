import { newE2EPage } from "@stencil/core/testing";

describe("calcite-input", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-input></calcite-input>");
    const input = await page.find("calcite-input");
    expect(input).toHaveClass("hydrated");
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input></calcite-input>
    `);

    const element = await page.find("calcite-input");
    expect(element).toEqualAttribute("status", "idle");
    expect(element).toEqualAttribute("theme", "light");
    expect(element).toEqualAttribute("layout", "default");
  });

  it("renders default props when invalid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input status="zip" theme="zap"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    expect(element).toEqualAttribute("status", "idle");
    expect(element).toEqualAttribute("theme", "light");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input status="invalid" theme="dark"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("inherits requested props when from wrapping calcite-label when props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label status="invalid" theme="dark" layout="inline-space-between">
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-input");
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("renders an icon when explicit Calcite UI is requested, if the input type does not have a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon="key" type="number"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(icon).toBeNull();
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("renders an icon when explicit Calcite UI is requested, and is a type with a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon="key" type="date"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(icon).toBeNull();
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("renders an icon when requested without an explicit Calcite UI, and is a type with a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon type="date"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(icon).toBeNull();
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("does not render an icon when requested without an explicit Calcite UI, if the input type does not have a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon type="date"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(icon).toBeNull();
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("renders a child textarea populated with value contents when requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="textarea" value="Example textarea value"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(icon).toBeNull();
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("renders number buttons in default vertical alignment when type=number", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input status="invalid" theme="dark"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("renders number buttons in horizontal alignment when requested and type=number", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input status="invalid" theme="dark" number-button-type="horizontal"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(icon).toBeNull();
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("renders no buttons in horizontal alignment when requested and type=number", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input status="invalid" theme="dark" number-button-type="none"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(icon).toBeNull();
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("correctly increment and decrements value when number buttons are clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input status="invalid" theme="dark"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(icon).toBeNull();
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });

  it("renders a slotted input-action when provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input status="invalid" theme="dark" number-button-type="none">
    <calcite-button slot="input-action>Submit</calcite-button>
    </calcite-input>
    `);

    const element = await page.find("calcite-input");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(icon).toBeNull();
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
  });
});
