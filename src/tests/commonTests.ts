import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { JSX } from "../components";
import axe from "axe-core";
import { toHaveNoViolations } from "jest-axe";
import { config } from "../../stencil.config";

export const HYDRATED_ATTR = config.hydratedFlag.name;

expect.extend(toHaveNoViolations);

type CalciteComponentTag = keyof JSX.IntrinsicElements;
type AxeOwningWindow = Window & { axe: typeof axe };
type ComponentHTML = string;
type TagOrHTML = CalciteComponentTag | ComponentHTML;

function isHTML(tagOrHTML: string): boolean {
  return tagOrHTML.trim().startsWith("<");
}

function getTag(tagOrHTML: string): CalciteComponentTag {
  if (isHTML(tagOrHTML)) {
    const regex = /[>\s]/;
    const trimmedTag = tagOrHTML.trim();
    return trimmedTag.substring(
      1,
      trimmedTag.search(regex)
    ) as CalciteComponentTag;
  }

  return tagOrHTML as CalciteComponentTag;
}

async function simplePageSetup(
  componentTagOrHTML: TagOrHTML
): Promise<E2EPage> {
  const componentTag = getTag(componentTagOrHTML);

  return newE2EPage({
    html: isHTML(componentTagOrHTML)
      ? componentTagOrHTML
      : `<${componentTag}><${componentTag}/>`,
    failOnConsoleError: true,
  });
}

export async function accessible(componentTagOrHTML: TagOrHTML): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  await page.addScriptTag({ path: require.resolve("axe-core") });

  expect(
    await page.evaluate(
      async (componentTag: CalciteComponentTag) =>
        (window as AxeOwningWindow & typeof globalThis).axe.run(componentTag),
      getTag(componentTagOrHTML)
    )
  ).toHaveNoViolations();
}

export async function renders(
  componentTagOrHTML: TagOrHTML,
  invisible?: true
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const element = await page.find(getTag(componentTagOrHTML));

  expect(element).toHaveAttribute(HYDRATED_ATTR);
  expect(await element.isVisible()).toBe(!invisible);
}

export async function reflects(
  componentTagOrHTML: TagOrHTML,
  propsToTest: {
    propertyName: string;
    value: any;
  }[]
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const componentTag = getTag(componentTagOrHTML);
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
  componentTagOrHTML: TagOrHTML,
  propsToTest: {
    propertyName: string;
    defaultValue: any;
  }[]
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const element = await page.find(getTag(componentTagOrHTML));

  for (const propAndValue of propsToTest) {
    const { propertyName, defaultValue } = propAndValue;
    const prop = await element.getProperty(propertyName);
    expect(prop).toEqual(defaultValue);
  }
}

export async function hidden(componentTagOrHTML: TagOrHTML): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const element = await page.find(getTag(componentTagOrHTML));

  element.setAttribute("hidden", "");
  await page.waitForChanges();

  expect(await element.isVisible()).toBe(false);
}
