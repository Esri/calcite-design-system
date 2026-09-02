import type { ComponentTag, TagOrHTML, TagOrHTMLWithBeforeContent, BeforeContent } from "../types";

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

    throw new Error(
      `Could not extract tag from HTML: ${trimmedTag}. Please check that the HTML string contains a valid Calcite component tag.`,
    );
  }

  return tagOrHTML as ComponentTag;
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
