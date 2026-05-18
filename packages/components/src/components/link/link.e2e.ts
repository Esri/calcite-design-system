// @ts-strict-ignore
import { newE2EPage, E2EElement } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

describe("accessible", () => {
  accessible("<calcite-link href='/'>link</calcite-link>");
  accessible("<calcite-link>link</calcite-link>");
  accessible("<calcite-link icon-start='plus' icon-end='plus' href='/'>Go</calcite-link>");
});

it("sets download attribute on internal anchor", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-link href="file.jpg">Continue</calcite-link>`);

  const elementAsLink = await page.find("calcite-link >>> a");

  expect(elementAsLink).not.toBeNull();
  expect(await elementAsLink.getProperty("download")).toBe("");
  expect(elementAsLink).not.toHaveAttribute("download");

  const element = await page.find("calcite-link");

  element.setProperty("download", true);
  await page.waitForChanges();

  expect(await elementAsLink.getProperty("download")).toBe("");
  expect(elementAsLink).toHaveAttribute("download");
  expect(elementAsLink.getAttribute("download")).toBe("");

  const newFilename = "my-cool-file.jpg";
  element.setProperty("download", newFilename);
  await page.waitForChanges();

  expect(await elementAsLink.getProperty("download")).toBe(newFilename);
  expect(elementAsLink.getAttribute("download")).toBe(newFilename);

  element.setProperty("download", false);
  await page.waitForChanges();

  expect(await elementAsLink.getProperty("download")).toBe("");
  expect(elementAsLink).not.toHaveAttribute("download");
});

it('renders as role="button" with default props', async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-link>Continue</calcite-link>`);

  const element = await page.find("calcite-link");
  const elementAsLink = await page.find("calcite-link >>> a");
  const iconStart = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconStart}`);
  const iconEnd = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconEnd}`);

  expect(element).not.toHaveAttribute("icon-flip-rtl");
  expect(elementAsLink).not.toBeNull();
  expect(elementAsLink).toEqualAttribute("role", "button");
  expect(iconStart).toBeNull();
  expect(iconEnd).toBeNull();
});

it('should update to include role="button" when href removed', async () => {
  const page = await newE2EPage({ html: `<calcite-link href="https://google.com">Continue</calcite-link>` });
  const link = await page.find("calcite-link");
  let elementAsLink: E2EElement;

  elementAsLink = await page.find("calcite-link >>> a");
  expect(elementAsLink).not.toBeNull();
  expect(elementAsLink).not.toHaveAttribute("role");

  link.setProperty("href", "");
  await page.waitForChanges();

  elementAsLink = await page.find("calcite-link >>> a");
  expect(elementAsLink).not.toBeNull();
  expect(elementAsLink).toEqualAttribute("role", "button");
});

it("renders as a link with default props", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-link href="/">Continue</calcite-link>`);
  const element = await page.find("calcite-link");
  const elementAsLink = await page.find("calcite-link >>> a");
  const iconStart = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconStart}`);
  const iconEnd = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconEnd}`);

  expect(element).not.toHaveAttribute("icon-flip-rtl");
  expect(elementAsLink).not.toBeNull();
  expect(iconStart).toBeNull();
  expect(iconEnd).toBeNull();
});

it("renders as a link with requested props", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-link href="/">Continue</calcite-link>`);
  const elementAsLink = await page.find("calcite-link >>> a");
  const iconStart = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconStart}`);
  const iconEnd = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconEnd}`);

  expect(elementAsLink).not.toBeNull();
  expect(iconStart).toBeNull();
  expect(iconEnd).toBeNull();
});

it("passes attributes to rendered child link", async () => {
  const page = await newE2EPage();
  await page.setContent(
    `<calcite-link rel="noopener noreferrer" target="_blank" class="my-custom-class" href="https://google.com">Continue</calcite-link>`,
  );
  const elementAsLink = await page.find("calcite-link >>> a");
  const iconStart = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconStart}`);
  const iconEnd = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconEnd}`);

  expect(elementAsLink).not.toBeNull();
  expect(elementAsLink).not.toHaveClass("my-custom-class");
  expect(elementAsLink).toEqualAttribute("href", "https://google.com");
  expect(elementAsLink).toEqualAttribute("rel", "noopener noreferrer");
  expect(elementAsLink).toEqualAttribute("target", "_blank");
  expect(iconStart).toBeNull();
  expect(iconEnd).toBeNull();
});

it("renders with an icon-start", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-link icon-start='plus'>Continue</calcite-link>`);
  const elementAsLink = await page.find("calcite-link >>> a");
  const iconStart = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconStart}`);
  const iconEnd = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconEnd}`);

  expect(elementAsLink).not.toBeNull();
  expect(elementAsLink).toEqualAttribute("role", "button");
  expect(iconStart).not.toBeNull();
  expect(iconEnd).toBeNull();
});

it("renders with an icon-end", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-link icon-end='plus'>Continue</calcite-link>`);
  const elementAsLink = await page.find("calcite-link >>> a");
  const iconStart = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconStart}`);
  const iconEnd = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconEnd}`);

  expect(elementAsLink).not.toBeNull();
  expect(iconStart).toBeNull();
  expect(iconEnd).not.toBeNull();
});

it('renders with an icon-start and icon-end and role="button"', async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-link icon-start='plus' icon-end='plus'>Continue</calcite-link>`);
  const elementAsLink = await page.find("calcite-link >>> a");
  const iconStart = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconStart}`);
  const iconEnd = await page.find(`calcite-link >>> .${CSS.calciteLinkIcon}.${CSS.iconEnd}`);
  expect(elementAsLink).not.toBeNull();
  expect(iconStart).not.toBeNull();
  expect(elementAsLink).toEqualAttribute("role", "button");
  expect(iconEnd).not.toBeNull();
});

describe("theme", () => {
  describe("default", () => {
    themed(html` <calcite-link href="#" icon-start="banana" icon-end="information">link</calcite-link> `, {
      "--calcite-link-text-color": {
        shadowSelector: "a",
        targetProp: "color",
      },
    });
  });
});
