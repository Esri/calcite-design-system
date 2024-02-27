import { newE2EPage } from "@stencil/core/testing";
import { accessible, disabled, hidden, renders, defaults } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-fab", () => {
  describe("renders", () => {
    renders("calcite-fab", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-fab");
  });

  describe("defaults", () => {
    defaults("calcite-fab", [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
    ]);
  });

  describe("disabled", () => {
    disabled("calcite-fab");
  });

  it(`should set all internal calcite-button types to 'button'`, async () => {
    const page = await newE2EPage({
      html: "<calcite-fab></calcite-fab>",
    });

    const buttons = await page.findAll("calcite-fab >>> calcite-button");

    expect(buttons).toHaveLength(1);

    for (const button of buttons) {
      expect(await button.getProperty("type")).toBe("button");
    }
  });

  it("should have visible text when text is enabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-fab text="hello world" text-enabled></calcite-fab>`);

    const button = await page.find(`calcite-fab >>> .${CSS.button}`);
    const text = button.textContent;

    expect(text).toBe("hello world");
  });

  it("should not have a tooltip when text-enabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-fab text="hello world" text-enabled></calcite-fab>`);

    const button = await page.find(`calcite-fab >>> .${CSS.button}`);
    expect(button.getAttribute("title")).toBe(null);
  });

  it("should have a tooltip when not text-enabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-fab text="hello world"></calcite-fab>`);
    const button = await page.find(`calcite-fab >>> .${CSS.button}`);
    expect(button.getAttribute("title")).toBe("hello world");

    const fab = await page.find("calcite-fab");
    fab.setProperty("label", "label");
    await page.waitForChanges();

    expect(button.getAttribute("title")).toBe("label");
  });

  it("should not have visible text when text is not enabled", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-fab text="hello world"></calcite-fab>`);

    const button = await page.find(`calcite-fab >>> .${CSS.button}`);
    const text = button.textContent;

    expect(text).toBe("");
  });

  it("should have label", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-fab text="hello world" label="hi"></calcite-fab>`);

    const calciteButton = await page.find(`calcite-fab >>> .${CSS.button}`);
    expect(calciteButton.getAttribute("title")).toBe("hi");
    expect(await calciteButton.getProperty("label")).toBe("hi");
  });

  it("should have appearance=solid", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-fab text="hello world"></calcite-fab>`);

    const fab = await page.find(`calcite-fab >>> .${CSS.button}`);
    expect(fab.getAttribute("appearance")).toBe("solid");
  });

  it("should have appearance=outline-fill", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-fab appearance="outline-fill" text="hello world"></calcite-fab>`);

    const fab = await page.find(`calcite-fab >>> .${CSS.button}`);
    expect(fab.getAttribute("appearance")).toBe("outline-fill");
  });

  describe("accessible", () => {
    accessible(`<calcite-fab label="hello world" text="hello world"></calcite-fab>`);
    accessible(`<calcite-fab label="hello world" text="hello world" disabled text-enabled></calcite-fab>`);
  });

  describe("when invalid appearance values are passed", () => {
    describe("when value is 'transparent'", () => {
      it("should render with default 'outline-fill' appearance", async () => {
        const page = await newE2EPage({
          html: `
          <calcite-fab
            text="FAB"
            text-enabled
            appearance="transparent"
          ></calcite-fab>
          `,
        });
        const fab = await page.find(`calcite-fab >>> .${CSS.button}`);
        expect(fab.getAttribute("appearance")).toBe("outline-fill");
      });
    });

    describe("when value is 'clear'", () => {
      it("should render with default 'outline-fill' appearance", async () => {
        const page = await newE2EPage({
          html: `
          <calcite-fab
            text="FAB"
            text-enabled
            appearance="outline"
          ></calcite-fab>
          `,
        });
        const fab = await page.find(`calcite-fab >>> .${CSS.button}`);
        expect(fab.getAttribute("appearance")).toBe("outline-fill");
      });
    });
  });
});
