// eslint-disable-next-line no-restricted-imports -- this is our replacement util, so we need to use original import
import { E2EPage, newE2EPage as newStencilE2EPage } from "@stencil/core/testing";
import { skipAnimations } from "../utils";

/**
 * Create a new E2E page with the given HTML and options.
 *
 * @param testHtml
 * @param beforeContent
 */
export async function newE2EPage(
  testHtml?: string,
  beforeContent?: (page: E2EPage) => Promise<void>,
): Promise<E2EPage> {
  const page = await newStencilE2EPage({
    failOnConsoleError: true,
  });
  await beforeContent?.(page);
  await page.setContent(testHtml);
  await skipAnimations(page);
  return page;
}
