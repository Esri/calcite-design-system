import { E2EPage } from "@stencil/core/testing";
import { JSX } from "../components";
import { toHaveNoViolations } from "jest-axe";
import axe from "axe-core";
import { SetUpPageOptions, setUpPage } from "./utils";

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
  componentTagOrHTML: TagOrHTML,
  options?: SetUpPageOptions
): Promise<E2EPage> {
  const componentTag = getTag(componentTagOrHTML);
  return setUpPage(
    isHTML(componentTagOrHTML)
      ? componentTagOrHTML
      : `<${componentTag}><${componentTag}/>`,
    options
  );
}

export async function accessible(
  componentTagOrHTML: TagOrHTML,
  options?: SetUpPageOptions
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML, options);
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
  options?: SetUpPageOptions
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML, options);
  const element = await page.find(getTag(componentTagOrHTML));

  expect(element).toHaveClass("hydrated");
  expect(await element.isVisible()).toBe(true);
}

export async function reflects(
  componentTagOrHTML: TagOrHTML,
  propsToTest: {
    propertyName: string;
    value: any;
  }[],
  options?: SetUpPageOptions
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML, options);
  const componentTag = getTag(componentTagOrHTML);
  const element = await page.find(componentTag);

  for (const propAndValue of propsToTest) {
    const { propertyName, value } = propAndValue;
    const componentAttributeSelector = `${componentTag}[${propToAttr(
      propertyName
    )}]`;

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

function propToAttr(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export async function defaults(
  componentTagOrHTML: TagOrHTML,
  propsToTest: {
    propertyName: string;
    defaultValue: any;
  }[],
  options?: SetUpPageOptions
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML, options);
  const element = await page.find(getTag(componentTagOrHTML));

  for (const propAndValue of propsToTest) {
    const { propertyName, defaultValue } = propAndValue;
    const prop = await element.getProperty(propertyName);
    expect(prop).toBe(defaultValue);
  }
}

export async function hidden(
  componentTagOrHTML: TagOrHTML,
  options?: SetUpPageOptions
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML, options);
  const element = await page.find(getTag(componentTagOrHTML));

  element.setAttribute("hidden", "");
  await page.waitForChanges();

  expect(await element.isVisible()).toBe(false);
}
