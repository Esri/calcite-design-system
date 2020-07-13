import { E2EPage, newE2EPage } from "@stencil/core/testing";

export async function setUpPage(html: string): Promise<E2EPage> {
  return await newE2EPage({
    html,
    failOnConsoleError: true,
  });
}
