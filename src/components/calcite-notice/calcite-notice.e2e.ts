import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders } from "../../tests/commonTests";

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
    const close = await page.find("calcite-notice >>> .notice-close");
    const icon = await page.find("calcite-notice >>> .notice-icon");
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
    const close = await page.find("calcite-notice >>> .notice-close");
    const icon = await page.find("calcite-notice >>> .notice-icon");

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

    const close = await page.find("calcite-notice >>> .notice-close");
    const icon = await page.find("calcite-notice >>> .notice-icon");
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
    const noticeclose1 = await page.find("#notice-1 >>> .notice-close");
    const animationDurationInMs = 400;

    expect(await notice1.isVisible()).toBe(true);

    await noticeclose1.click();
    await page.waitForTimeout(animationDurationInMs);
    expect(await notice1.isVisible()).not.toBe(true);
  });
});
