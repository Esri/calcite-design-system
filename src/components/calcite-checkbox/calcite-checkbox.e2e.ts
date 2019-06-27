import { newE2EPage } from "@stencil/core/testing";
let page, element, switchElement;
beforeEach(async () => {
  page = await newE2EPage();
  await page.setContent(
    '<calcite-checkbox text="Test switch"></calcite-checkbox>'
  );
  await page.waitForChanges();
  element = await page.find("calcite-checkbox");
  switchElement = await page.find("calcite-checkbox >>> label");
});

describe("calcite-checkbox", () => {
  it("renders", async () => {
    expect(element).toHaveClass("hydrated");
  });

  it("renders text data", async () => {
    expect(switchElement.textContent).toEqual(`Test switch`);
  });

  it("renders switch at correct position", async () => {
    element.setProperty("position", "right");
    await page.waitForChanges();
    let pageEl = await page.find(
      "calcite-checkbox >>> .toggle-checkbox__track"
    );
    expect(pageEl).toHaveClass("toggle-checkbox__track--right");

    element.setProperty("position", "left");
    await page.waitForChanges();
    expect(pageEl).toHaveClass("toggle-checkbox__track--left");
  });

  it("changes the internal state of checked", async () => {
    const input = await page.find("calcite-checkbox >>> input");
    switchElement.click();
    await page.waitForChanges();
    let value = await input.getProperty("checked");
    expect(value).toBe(true);

    switchElement.click();
    await page.waitForChanges();
    value = await input.getProperty("checked");
    expect(value).toBe(false);
  });
});
