import { E2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
import { newE2EPage } from "../utils/e2e-setup";
import { config } from "../../../stencil.config";
import { html } from "../../../support/formatting";
import type {
  ComponentTag,
  TagOrHTML,
  ComponentTestSetup,
  TagAndPage,
  TagOrHTMLWithBeforeContent,
  BeforeContent,
  WithBeforeContent,
  ComponentTestContent,
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
  const page = await newE2EPage(
    isHTML(componentTagOrHTML) ? componentTagOrHTML : html`<${componentTag}></${componentTag}>`,
  );
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

export async function noopBeforeContent(): Promise<void> {
  /* noop */
}

export function getBeforeContent<TestContent = ComponentTestContent>(
  componentTestSetup: WithBeforeContent<TestContent>,
): BeforeContent {
  return typeof componentTestSetup === "string"
    ? noopBeforeContent
    : componentTestSetup?.beforeContent || noopBeforeContent;
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
