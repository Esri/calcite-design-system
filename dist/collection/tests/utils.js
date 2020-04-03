import { newE2EPage } from "@stencil/core/testing";
export async function setUpPage(content, options) {
    const page = await newE2EPage();
    await page.setContent(content);
    if (options && options.withPeerDependencies) {
        await page.addScriptTag({
            url: "https://unpkg.com/@esri/calcite-components@1.0.0-beta.10/dist/calcite/calcite.esm.js",
            type: "module"
        });
        await page.waitForChanges();
        await page.waitFor(1000);
    }
    return page;
}
