import { newE2EPage } from "@stencil/core/testing";
import { accessible, focusable, renders } from "../../tests/commonTests";
import { CSS, SLOTS } from "./calcite-notice.resources";
import { html } from "../../tests/utils";

describe("calcite-notice", () => {
  const noticeContent = `
  <div slot="title">Title Text</div>
  <div slot="message">Message Text</div>
  <calcite-link slot="link" href="">Action</calcite-link>
`;
  it("renders", async () => renders(`<calcite-notice active>${noticeContent}</calcite-notice>`));

  it("is accessible", async () => accessible(`<calcite-notice active>${noticeContent}</calcite-notice>`));
  it("is accessible with icon", async () =>
    accessible(`<calcite-notice icon active>${noticeContent}</calcite-notice>`));
  it("is accessible with close button", async () =>
    accessible(`<calcite-notice dismissible active>${noticeContent}</calcite-notice>`));
  it("is accessible with icon and close button", async () =>
    accessible(`<calcite-notice icon dismissible active>${noticeContent}</calcite-notice>`));

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice>
    <div slot="title">Title Text</div>
    <div slot="message">Message Text</div>
    <calcite-link slot="link" href="">Action</calcite-link>
    </calcite-notice>`);
    const element = await page.find("calcite-notice");
    const close = await page.find(`calcite-notice >>> .${CSS.close}`);
    const icon = await page.find(`calcite-notice >>> .${CSS.icon}`);
    expect(element).toEqualAttribute("color", "blue");
    expect(close).toBeNull();
    expect(icon).toBeNull();
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice color="yellow" dismissible>
    ${noticeContent}
    </calcite-notice>`);

    const element = await page.find("calcite-notice");
    const close = await page.find(`calcite-notice >>> .${CSS.close}`);
    const icon = await page.find(`calcite-notice >>> .${CSS.icon}`);

    expect(element).toEqualAttribute("color", "yellow");
    expect(close).not.toBeNull();
    expect(icon).toBeNull();
  });

  it("renders an icon and close button when requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice icon dismissible>
    ${noticeContent}
    </calcite-notice>`);

    const close = await page.find(`calcite-notice >>> .${CSS.close}`);
    const icon = await page.find(`calcite-notice >>> .${CSS.icon}`);
    expect(close).not.toBeNull();
    expect(icon).not.toBeNull();
  });

  it("successfully closes a dismissible notice", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice id="notice-1" active dismissible>
    ${noticeContent}
    </calcite-notice>
    `);

    const notice1 = await page.find("#notice-1");
    const noticeclose1 = await page.find(`#notice-1 >>> .${CSS.close}`);
    const animationDurationInMs = 400;

    expect(await notice1.isVisible()).toBe(true);

    await noticeclose1.click();
    await page.waitForTimeout(animationDurationInMs);
    expect(await notice1.isVisible()).not.toBe(true);
  });

  it("allows users to slot in a trailing action", async () => {
    const page = await newE2EPage({
      html: html` <calcite-notice active dismissible>
        ${noticeContent}
        <calcite-action label="banana" icon="banana" slot=${SLOTS.actionEnd}></calcite-action>
      </calcite-notice>`
    });

    const actionAssignedSlot = await page.$eval("calcite-action", (action) => action.assignedSlot.name);

    expect(actionAssignedSlot).toBe(SLOTS.actionEnd);
  });
});
