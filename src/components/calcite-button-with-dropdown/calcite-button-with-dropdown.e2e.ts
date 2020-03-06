import { newE2EPage } from "@stencil/core/testing";

describe("calcite-button-with-dropdown", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-button-with-dropdown>
      </calcite-button-with-dropdown>`);
    const element = await page.find("calcite-button-with-dropdown");
    expect(element).toHaveClass("hydrated");
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-button-with-dropdown>
      </calcite-button-with-dropdown>`);
    const element = await page.find("calcite-button-with-dropdown");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("theme", "light");
  });

  it("renders default props when invalid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-button-with-dropdown color="green" scale="fairly small" theme="some theme">
      </calcite-button-with-dropdown>`);
    const element = await page.find("calcite-button-with-dropdown");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("theme", "light");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-button-with-dropdown scale="xs" color="red" theme="dark" loading="true" disabled="true" dropdown-label="more actions">
      </calcite-button-with-dropdown>`);
    const element = await page.find("calcite-button-with-dropdown");
    const dropdownButton = await page.find("calcite-button-with-dropdown >>> calcite-dropdown calcite-button");
    expect(element).toEqualAttribute("scale", "xs");
    expect(element).toEqualAttribute("color", "red");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toHaveAttribute("loading");
    expect(element).toHaveAttribute("disabled");
    expect(dropdownButton).toEqualAttribute("aria-label", "more actions");
  });

  it("renders primaryText + primaryIcon as inner content of primary button", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-button-with-dropdown primary-text="primary action" primary-icon="save">
      </calcite-button-with-dropdown>`);
    const primaryButton = await page.find("calcite-button-with-dropdown >>> calcite-button");
    const icon = await page.find("calcite-button-with-dropdown >>> calcite-button >>> .calcite-button--icon");
    expect(primaryButton).toEqualText("primary action");
    expect(icon).not.toBeNull()
  });

  it("changes the size and width of the dropdown + primary button based on scale", async () => {
    const elementScaleToDropdownScale = {
      s: "s",
      m: "s",
      l: "m",
    };
    const elementScaleToButtonScale = {
      s: "xs",
      m: "s",
      l: "m",
    };
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-button-with-dropdown>
      </calcite-button-with-dropdown>`);
    const element = await page.find("calcite-button-with-dropdown");
    const primaryButton = await page.find("calcite-button-with-dropdown >>> calcite-button");
    const dropdown = await page.find("calcite-button-with-dropdown >>> calcite-dropdown");
    for (const elementScale of Object.keys(elementScaleToDropdownScale)) {
      element.setProperty("scale", elementScale);
      await page.waitForChanges();
      const dropdownScale = elementScaleToDropdownScale[elementScale];
      expect(dropdown).toEqualAttribute("width", dropdownScale);
      expect(dropdown).toEqualAttribute("scale", dropdownScale);
      expect(primaryButton).toEqualAttribute("scale", elementScaleToButtonScale[elementScale]);
    }
  });
});
