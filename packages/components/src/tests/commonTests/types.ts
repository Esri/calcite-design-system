import { E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";

export type ComponentTag = keyof DeclareElements;
export type ComponentHTML = string;
export type TagOrHTML = ComponentTag | ComponentHTML;
export type BeforeContent = (page: E2EPage) => Promise<void>;

export type TagOrHTMLWithBeforeContent = WithBeforeContent<{ tagOrHTML: TagOrHTML }>;

export type WithBeforeContent<TestContent> = TestContent & {
  /**
   * Allows for custom setup of the page.
   *
   * This is useful for test helpers that need to create and configure the test page before running tests.
   *
   * @param page
   */
  beforeContent: BeforeContent;
};
