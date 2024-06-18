import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
import { config } from "../../../stencil.config";
import type {
  ComponentTag,
  TagOrHTML,
  ComponentTestSetup,
  TagAndPage,
  TagOrHTMLWithBeforeContent,
  BeforeContent,
} from "./interfaces";
expect.extend(toHaveNoViolations);

export const HYDRATED_ATTR = config.hydratedFlag?.name;

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

export function propToAttr(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function validateCaretIndex({
  page,
  componentTag,
  position,
}: {
  page: E2EPage;
  componentTag: string;
  position?: number;
}): Promise<boolean> {
  return page.evaluate(
    (position, componentTag) => {
      const element = document.querySelector(componentTag) as HTMLElement;
      const el = element.shadowRoot.querySelector("input");
      return el.selectionStart === (position !== undefined ? position : el.value.length);
    },
    position,
    componentTag,
  );
}
