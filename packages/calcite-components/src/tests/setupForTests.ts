/* eslint-disable jest/no-conditional-expect -- Using conditional logic in a confined test helper to handle specific scenarios, reducing duplication, balancing test readability and maintainability. **/
/* eslint-disable jest/no-export -- Util functions are now imported to be used as `it` blocks within `describe` instead of assertions within `it` blocks. */
import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
import type { JSX } from "../components";
expect.extend(toHaveNoViolations);
import { config } from "../../stencil.config";

type ComponentTag = keyof JSX.IntrinsicElements;
type ComponentHTML = string;
type TagOrHTML = ComponentTag | ComponentHTML;
type BeforeContent = (page: E2EPage) => Promise<void>;

export const HYDRATED_ATTR = config.hydratedFlag?.name;

export type TagAndPage = {
  tag: ComponentTag;
  page: E2EPage;
};

export type TagOrHTMLWithBeforeContent = {
  tagOrHTML: TagOrHTML;

  /**
   * Allows for custom setup of the page.
   *
   * This is useful for test helpers that need to create and configure the test page before running tests.
   *
   * @param page
   */
  beforeContent: BeforeContent;
};

export function isHTML(tagOrHTML: string): boolean {
  return tagOrHTML.trim().startsWith("<");
}

export function getTag(tagOrHTML: string): ComponentTag {
  if (isHTML(tagOrHTML)) {
    const calciteTagRegex = /<calcite-[a-z0-9-]+/i;
    const trimmedTag = tagOrHTML.trim();
    const calciteTagMatchResult = trimmedTag.match(calciteTagRegex);
    if (calciteTagMatchResult) {
      return calciteTagMatchResult[0].substring(1) as ComponentTag;
    }
    throw new Error(`Could not extract tag from HTML: ${trimmedTag}`);
  }

  return tagOrHTML as ComponentTag;
}

export async function simplePageSetup(componentTagOrHTML: TagOrHTML): Promise<E2EPage> {
  const componentTag = getTag(componentTagOrHTML);
  const page = await newE2EPage({
    html: isHTML(componentTagOrHTML) ? componentTagOrHTML : `<${componentTag}></${componentTag}>`,
    failOnConsoleError: true,
  });
  await page.waitForChanges();

  return page;
}

export async function getTagAndPage(componentTestSetup: ComponentTestSetup): Promise<TagAndPage> {
  if (typeof componentTestSetup === "function") {
    componentTestSetup = await componentTestSetup();
  }

  if (typeof componentTestSetup === "string") {
    const page = await simplePageSetup(componentTestSetup);
    const tag = getTag(componentTestSetup);

    return { page, tag };
  }

  return componentTestSetup;
}

export type ComponentTestContent = TagOrHTML | TagAndPage;
export type ComponentTestSetupProvider = (() => ComponentTestContent) | (() => Promise<ComponentTestContent>);
export type ComponentTestSetup = ComponentTestContent | ComponentTestSetupProvider;

export function getTagOrHTMLWithBeforeContent(componentTestSetup: TagOrHTML | TagOrHTMLWithBeforeContent): {
  tagOrHTML: TagOrHTML;
  beforeContent?: BeforeContent;
} {
  if (typeof componentTestSetup === "string") {
    return { tagOrHTML: componentTestSetup };
  }

  return {
    tagOrHTML: componentTestSetup.tagOrHTML,
    beforeContent: componentTestSetup.beforeContent,
  };
}
