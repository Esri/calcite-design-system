import { newE2EPage } from "@stencil/core/testing";
import { accessible, focusable, reflects, renders } from "../../tests/commonTests";

describe("calcite-select", () => {
  it("renders", async () => renders("calcite-select"));

  it("is accessible", async () => accessible(`calcite-select`));

  it("is focusable", async () => focusable(`calcite-select`));

  it("reflects", async () =>
    reflects(`calcite-select`, [
      {
        propertyName: "disabled",
        value: true
      },
      {
        propertyName: "scale",
        value: "m"
      },
      {
        propertyName: "theme",
        value: "light"
      }
    ]));

  it("allows selecting items", async () => {
    const page = await newE2EPage({
      html: `<calcite-select>
              <calcite-option>uno</calcite-option>
              <calcite-option>dos</calcite-option>
              <calcite-option>tres</calcite-option>
            </calcite-select>`
    });
    const select = await page.find("calcite-select");
    const spy = select.spyOnEvent("change");

    const selection = "dos";
    await page.select("calcite-select", selection);

    expect(spy).toHaveReceivedEventTimes(1);
    expect(select.textContent).toBe(selection);
  });
});
