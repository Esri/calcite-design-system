import { newE2EPage } from "@stencil/core/testing";

describe("calcite-split-button", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-split-button>
      </calcite-split-button>`);
    const element = await page.find("calcite-split-button");
    expect(element).toHaveClass("hydrated");
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-split-button>
      </calcite-split-button>`);
    const element = await page.find("calcite-split-button");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("theme", "light");
    expect(element).toEqualAttribute("dropdown-icon-type", "chevron");
  });

  it("renders default props when invalid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-split-button color="green" scale="fairly small" theme="some theme" dropdown-icon-type="circle">
      </calcite-split-button>`);
    const element = await page.find("calcite-split-button");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("theme", "light");
    expect(element).toEqualAttribute("dropdown-icon-type", "chevron");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-split-button
          scale="s"
          color="red"
          theme="dark"
          dropdown-icon-type="caret"
          loading="true"
          disabled="true"
          dropdown-label="more actions"
          primary-label="primary action">
      </calcite-split-button>`);
    const element = await page.find("calcite-split-button");
    const primaryButton = await page.find(
      "calcite-split-button >>> calcite-button"
    );
    const dropdownButton = await page.find(
      "calcite-split-button >>> calcite-dropdown calcite-button"
    );
    expect(element).toEqualAttribute("scale", "s");
    expect(element).toEqualAttribute("color", "red");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toEqualAttribute("dropdown-icon-type", "caret");
    expect(element).toHaveAttribute("loading");
    expect(element).toHaveAttribute("disabled");
    expect(primaryButton).toEqualAttribute("aria-label", "primary action");
    expect(dropdownButton).toEqualAttribute("aria-label", "more actions");
  });

  it("renders primaryText + primaryIcon as inner content of primary button", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-split-button primary-text="primary action" primary-icon="save">
      </calcite-split-button>`);
    const primaryButton = await page.find(
      "calcite-split-button >>> calcite-button"
    );
    const icon = await page.find(
      "calcite-split-button >>> calcite-button >>> .calcite-button--icon"
    );
    expect(primaryButton).toEqualText("primary action");
    expect(icon).not.toBeNull();
  });

  it("changes the size and width of the dropdown + primary button based on scale", async () => {
    const elementScaleToDropdownScale = {
      s: "s",
      m: "m",
      l: "l",
    };
    const elementScaleToButtonScale = {
      s: "s",
      m: "m",
      l: "l",
    };
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-split-button>
      </calcite-split-button>`);
    const element = await page.find("calcite-split-button");
    const primaryButton = await page.find(
      "calcite-split-button >>> calcite-button"
    );
    const dropdown = await page.find(
      "calcite-split-button >>> calcite-dropdown"
    );
    for (const elementScale of Object.keys(elementScaleToDropdownScale)) {
      element.setProperty("scale", elementScale);
      await page.waitForChanges();
      const dropdownScale = elementScaleToDropdownScale[elementScale];
      expect(dropdown).toEqualAttribute("width", dropdownScale);
      expect(dropdown).toEqualAttribute("scale", dropdownScale);
      expect(primaryButton).toEqualAttribute(
        "scale",
        elementScaleToButtonScale[elementScale]
      );
    }
  });
});
