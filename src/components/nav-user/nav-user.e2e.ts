import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-nav-user", () => {
  it("renders", async () => renders("calcite-nav-user", { display: "inline-flex" }));

  it("honors hidden attribute", async () => hidden("calcite-nav-user"));

  it("is accessible", async () => accessible("calcite-nav-user"));

  it("reflects", async () =>
    reflects("calcite-nav-user", [
      {
        propertyName: "active",
        value: "true"
      },
      {
        propertyName: "userId",
        value: "123"
      },
      {
        propertyName: "username",
        value: "Spock123"
      },
      {
        propertyName: "hideText",
        value: ""
      }
    ]));

  it("should emit calciteNavUserSelect event on user click", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-nav-user id="batman" username="batman"></calcite-nav-user> `);

    const element = await page.find("calcite-nav-user");
    const eventSpy = await element.spyOnEvent("calciteNavUserSelect");

    await element.click();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("batman");
    expect(eventSpy).toHaveReceivedEventTimes(1);
  });

  it("should emit calciteNavUserSelect event when user select using Enter or Space key", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-nav-user username="batman" id="batman"></calcite-nav-user> `);

    const element = await page.find("calcite-nav-user");
    const eventSpy = await element.spyOnEvent("calciteNavUserSelect");

    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.activeElement.id)).toBe("batman");
    expect(eventSpy).not.toHaveReceivedEvent();

    await page.keyboard.press("Enter");
    expect(await page.evaluate(() => document.activeElement.id)).toBe("batman");
    expect(eventSpy).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Space");
    expect(await page.evaluate(() => document.activeElement.id)).toBe("batman");
    expect(eventSpy).toHaveReceivedEventTimes(2);
  });
});
