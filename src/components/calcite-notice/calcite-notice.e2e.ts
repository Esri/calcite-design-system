import { newE2EPage } from "@stencil/core/testing";

describe("calcite-notice", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice>
    <div slot="notice-title">Title Text</div>
    <div slot="notice-message">Message Text</div>
    <a slot="notice-link" href="">Action</a>
    </calcite-notice>`);
    const element = await page.find("calcite-notice");
    expect(element).toHaveClass("hydrated");
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice>
    <div slot="notice-title">Title Text</div>
    <div slot="notice-message">Message Text</div>
    <a slot="notice-link" href="">Action</a>
    </calcite-notice>`);
    const element = await page.find("calcite-notice");
    const close = await page.find("calcite-notice >>> .notice-close");
    const icon = await page.find("calcite-notice >>> .notice-icon");
    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("theme", "light");
    expect(close).toBeNull();
    expect(icon).toBeNull();
  });

  it("renders default props when invalid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice color="zip" theme="zat">
    <div slot="notice-title">Title Text</div>
    <div slot="notice-message">Message Text</div>
    <a slot="notice-link" href="">Action</a>
    </calcite-notice>`);

    const element = await page.find("calcite-notice");
    const close = await page.find("calcite-notice >>> .notice-close");
    const icon = await page.find("calcite-notice >>> .notice-icon");
    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("theme", "light");
    expect(close).toBeNull();
    expect(icon).toBeNull();
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice theme="dark" color="yellow" dismissible>
    <div slot="notice-title">Title Text</div>
    <div slot="notice-message">Message Text</div>
    <a slot="notice-link" href="">Action</a>
    </calcite-notice>`);

    const element = await page.find("calcite-notice");
    const close = await page.find("calcite-notice >>> .notice-close");
    const icon = await page.find("calcite-notice >>> .notice-icon");

    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "yellow");
    expect(element).toEqualAttribute("theme", "dark");
    expect(close).not.toBeNull();
    expect(icon).toBeNull();
  });

  it("renders an icon and close button when requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice icon dismissible>
    <div slot="notice-title">Title Text</div>
    <div slot="notice-message">Message Text</div>
    <a slot="notice-link" href="">Action</a>
    </calcite-notice>`);

    const element = await page.find("calcite-notice");
    const close = await page.find("calcite-notice >>> .notice-close");
    const icon = await page.find("calcite-notice >>> .notice-icon");
    expect(element).toHaveClass("hydrated");
    expect(close).not.toBeNull();
    expect(icon).not.toBeNull();
  });

  it("successfully closes a dismissible notice", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-notice id="notice-1" active dismissible>
    <div slot="notice-title">Title Text</div>
    <div slot="notice-message">Message Text</div>
    <a slot="notice-link" href="">Action</a>
    </calcite-notice>
    `);

    const notice1 = await page.find("#notice-1");
    const noticeclose1 = await page.find("#notice-1 >>> .notice-close");

    expect(await notice1.isVisible()).toBe(true);

    await noticeclose1.click();
    // wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 400));
    expect(await notice1.isVisible()).not.toBe(true);
  });
});
