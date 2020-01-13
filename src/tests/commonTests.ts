import { newE2EPage } from "@stencil/core/testing";
import { E2EPage } from "@stencil/core/dist/testing/puppeteer/puppeteer-declarations";
import { JSX } from "../components";
import axe from "axe-core";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

type CalciteComponentTag = keyof JSX.IntrinsicElements;
type ComponentHTML = string;
type AxeOwningWindow = Window & { axe: typeof axe };
type TagOrHTML = CalciteComponentTag | ComponentHTML;

export interface SetUpPageOptions {
  withPeerDependencies: boolean;
}

async function simplePageSetup(
  componentTag: CalciteComponentTag
): Promise<E2EPage> {
  const page = await newE2EPage();
  await page.setContent(`<${componentTag}><${componentTag}/>`);
  return page;
}

export async function renders(
  componentTag: CalciteComponentTag
): Promise<void> {
  const page = await simplePageSetup(componentTag);
  const element = await page.find(componentTag);

  expect(element).toHaveClass("hydrated");
  expect(await element.isVisible()).toBe(true);
}

export async function reflects(
  componentTag: CalciteComponentTag,
  propsToTest: {
    propertyName: string;
    value: any;
  }[]
): Promise<void> {
  const page = await simplePageSetup(componentTag);
  const element = await page.find(componentTag);

  for (const propAndValue of propsToTest) {
    const { propertyName, value } = propAndValue;
    const componentAttributeSelector = `${componentTag}[${propertyName}]`;

    element.setProperty(propertyName, value);
    await page.waitForChanges();

    expect(await page.find(componentAttributeSelector)).toBeTruthy();

    if (typeof value === "boolean") {
      element.setProperty(propertyName, !value);
      await page.waitForChanges();

      expect(await page.find(componentAttributeSelector)).toBeNull();

      element.setProperty(propertyName, value);
      await page.waitForChanges();

      expect(await page.find(componentAttributeSelector)).toBeTruthy();
    }
  }
}

export async function defaults(
  componentTag: CalciteComponentTag,
  propsToTest: {
    propertyName: string;
    defaultValue: any;
  }[]
): Promise<void> {
  const page = await simplePageSetup(componentTag);
  const element = await page.find(componentTag);

  for (const propAndValue of propsToTest) {
    const { propertyName, defaultValue } = propAndValue;
    const prop = await element.getProperty(propertyName);
    expect(prop).toBe(defaultValue);
  }
}

export async function hidden(componentTag: CalciteComponentTag): Promise<void> {
  const page = await simplePageSetup(componentTag);
  const element = await page.find(componentTag);

  element.setAttribute("hidden", "");
  await page.waitForChanges();

  expect(await element.isVisible()).toBe(false);
}

function isHTML(tagOrHTML: string): boolean {
  return tagOrHTML.trim().startsWith("<");
}

function getTag(tagOrHTML: string): CalciteComponentTag {
  if (isHTML(tagOrHTML)) {
    const regex = /[>\s]/;
    const trimmedTag = tagOrHTML.trim();
    return trimmedTag.substring(1, trimmedTag.search(regex)) as CalciteComponentTag;
  }

  return tagOrHTML as CalciteComponentTag;
}

export async function accessible(componentTagOrHTML: TagOrHTML): Promise<void> {
  const page = await simplePageSetup(getTag(componentTagOrHTML));
  await page.addScriptTag({ path: require.resolve("axe-core") });

  expect(
    await page.evaluate(
      async (componentTag: CalciteComponentTag) =>
        (window as AxeOwningWindow & typeof globalThis).axe.run(componentTag),
      getTag(componentTagOrHTML)
    )
  ).toHaveNoViolations();
}
