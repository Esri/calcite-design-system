// eslint-disable-next-line no-restricted-imports -- this is our replacement util, so we need to use original import
import { E2EPage, newE2EPage as newStencilE2EPage } from "@stencil/core/testing";
import { skipAnimations } from "../utils";

/**
 * Create a new E2E page with the given HTML and options.
 *
 * @param testHtml
 * @param beforeContent
 * @param allowAnimations
 */
export async function newE2EPage(
  testHtml?: string,
  beforeContent?: (page: E2EPage) => Promise<void>,
  allowAnimations = false,
): Promise<E2EPage> {
  const page = await newStencilE2EPage({
    failOnConsoleError: true,
  });
  await beforeContent?.(page);

  if (testHtml) {
    await page.setContent(testHtml);
  }

  if (!allowAnimations) {
    // eslint-disable-next-line no-restricted-syntax -- this is our replacement util, so we need to skip animations here
    await skipAnimations(page);
  }

  return page;
}
