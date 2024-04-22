import { E2EPage } from "@stencil/core/testing";
import type { JSX } from "../../components";

export type ComponentTag = keyof JSX.IntrinsicElements;
export type ComponentHTML = string;
export type TagOrHTML = ComponentTag | ComponentHTML;
export type BeforeContent = (page: E2EPage) => Promise<void>;

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

export type ComponentTestContent = TagOrHTML | TagAndPage;
export type ComponentTestSetupProvider = (() => ComponentTestContent) | (() => Promise<ComponentTestContent>);
export type ComponentTestSetup = ComponentTestContent | ComponentTestSetupProvider;
