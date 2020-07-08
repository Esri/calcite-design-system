import { E2EPage, newE2EPage } from "@stencil/core/testing";

export interface SetUpPageOptions {
  withPeerDependencies: boolean;
}

export async function setUpPage(
  content: string,
  options?: SetUpPageOptions
): Promise<E2EPage> {
  const page = await newE2EPage();
  await page.setContent(content);

  if (options?.withPeerDependencies) {
    await page.addScriptTag({
      url: "vendor/@esri/calcite-components/calcite.esm.js",
      type: "module",
    });

    await page.waitForChanges();
    await page.waitFor(1000);
  }

  return page;
}
