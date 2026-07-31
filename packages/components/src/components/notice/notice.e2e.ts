import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";

import { html } from "../../../support/formatting";
import { CSS } from "./resources";

const noticeContent = html`
  <div slot="title">Title Text</div>
  <div slot="message">Message Text</div>
  <calcite-link slot="link" href="">Action</calcite-link>
`;

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
  expect(element).toEqualAttribute("kind", "brand");
  expect(close).toBeNull();
  expect(icon).toBeNull();
});

it("renders requested props when valid props are provided", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-notice kind="warning" closable>
    ${noticeContent}
    </calcite-notice>`);

  const element = await page.find("calcite-notice");
  const close = await page.find(`calcite-notice >>> .${CSS.close}`);
  const icon = await page.find(`calcite-notice >>> .${CSS.icon}`);

  expect(element).toEqualAttribute("kind", "warning");
  expect(close).not.toBeNull();
  expect(icon).toBeNull();
});

it("renders an icon and close button when requested", async () => {
  const page = await newE2EPage();
  await page.setContent(`
    <calcite-notice icon closable>
    ${noticeContent}
    </calcite-notice>`);

  const close = await page.find(`calcite-notice >>> .${CSS.close}`);
  const icon = await page.find(`calcite-notice >>> .${CSS.icon}`);
  expect(close).not.toBeNull();
  expect(icon).not.toBeNull();
});

it("successfully closes a closable notice", async () => {
  const page = await newE2EPage();
  await page.setContent(html`<calcite-notice id="notice-1" open closable> ${noticeContent} </calcite-notice>`);

  const notice1 = await page.find("#notice-1 >>> .container");
  const noticeClose1 = await page.find(`#notice-1 >>> .${CSS.close}`);
  const animationDurationInMs = 400;

  expect(await notice1.isVisible()).toBe(true);

  await noticeClose1.click();
  await page.waitForTimeout(animationDurationInMs);
  expect(await notice1.isVisible()).not.toBe(true);
});
