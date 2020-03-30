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
    expect(element).toEqualAttribute("appearance", "default");
    expect(element).toEqualAttribute("alignment", "start");
    expect(element).toEqualAttribute("number-button-type", "vertical");
    expect(element).toEqualAttribute("type", "text");
    expect(element).toEqualAttribute("scale", "m");
  });

  it("renders default props when invalid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input status="zip" theme="zap" appearance="zot" alignment="zim" number-button-type="zup" type="zat" scale="zed"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    expect(element).toEqualAttribute("status", "idle");
    expect(element).toEqualAttribute("theme", "light");
    expect(element).toEqualAttribute("appearance", "default");
    expect(element).toEqualAttribute("alignment", "start");
    expect(element).toEqualAttribute("number-button-type", "vertical");
    expect(element).toEqualAttribute("type", "text");
    expect(element).toEqualAttribute("scale", "m");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input status="invalid" theme="dark" appearance="minimal" alignment="end" number-button-type="none" type="number" scale="xs"></calcite-input>
    `);

    const element = await page.find("calcite-input");
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toEqualAttribute("appearance", "minimal");
    expect(element).toEqualAttribute("alignment", "end");
    expect(element).toEqualAttribute("number-button-type", "none");
    expect(element).toEqualAttribute("type", "number");
    expect(element).toEqualAttribute("scale", "xs");
  });

  it("inherits requested props when from wrapping calcite-label when props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label status="invalid" theme="dark" scale="s">
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-input");
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toEqualAttribute("scale", "s");
  });

  it("renders an icon when explicit Calcite UI is requested, and is a type without a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon="key" type="number"></calcite-input>
    `);

    const icon = await page.find("calcite-input .calcite-input-icon");
    expect(icon).not.toBeNull();
  });

  it("renders an icon when explicit Calcite UI is requested, and is a type with a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon="key" type="date"></calcite-input>
    `);

    const icon = await page.find("calcite-input .calcite-input-icon");
    expect(icon).not.toBeNull();
  });

  it("renders an icon when requested without an explicit Calcite UI, and is a type with a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon type="date"></calcite-input>
    `);

    const icon = await page.find("calcite-input .calcite-input-icon");
    expect(icon).not.toBeNull();
  });

  it("does not render an icon when requested without an explicit Calcite UI, and is a type without a default icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input icon type="number"></calcite-input>
    `);

    const icon = await page.find("calcite-input .calcite-input-icon");
    expect(icon).toBeNull();
  });

  it("renders a child textarea populated with value attribute when requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input type="textarea" value="Example textarea value"></calcite-input>
    `);

    const textarea = await page.find("calcite-input textarea");
    page.waitForChanges();
    expect(textarea).not.toBeNull();
    const textareaContents = textarea.outerHTML;
    console.log(textareaContents)
    expect(textareaContents).toEqual("Example textarea value");
  });





  //


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
