import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders } from "../../tests/commonTests";

describe("calcite-input-message", () => {
  it("renders", async () => renders("calcite-input-message"));

  it("is accessible", async () => accessible(`<calcite-input-message>Text</calcite-input-message>`));
  it("is accessible with icon", async () => accessible(`<calcite-input-message icon>Text</calcite-input-message>`));

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input-message></calcite-input-message>
    `);

    const element = await page.find("calcite-input-message");
    expect(element).toEqualAttribute("status", "idle");
    expect(element).toEqualAttribute("type", "default");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input-message status="valid" theme="dark" type="floating">Text</calcite-input-message>
    `);

    const element = await page.find("calcite-input-message");
    expect(element).toEqualAttribute("status", "valid");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toEqualAttribute("type", "floating");
  });

  it("inherits requested props when from wrapping calcite-label when props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label status="invalid" theme="dark">
    Label text
    <calcite-input-message>Text</calcite-input-message>
    </calcite-label>
    `);

    const element = await page.find("calcite-input-message");
    expect(element).toEqualAttribute("status", "invalid");
  });

  it("does not render an icon if not requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input-message>Text</calcite-input-message>
    `);

    const icon = await page.find("calcite-input-message >>> .calcite-input-message-icon");
    expect(icon).toBeNull();
  });

  it("renders an icon if requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input-message icon>Text</calcite-input-message>
    `);

    const icon = await page.find("calcite-input-message >>> .calcite-input-message-icon");
    expect(icon).not.toBeNull();
  });
});
