import { E2EPage, newE2EPage } from "@stencil/core/testing";

export async function setUpPage(content: string): Promise<E2EPage> {
  const page = await newE2EPage();
  await page.setContent(content);

  return page;
}
