import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { it } from "vitest";

it("should call onDisconnected on test tear down ❌", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-repro></calcite-repro>`);
});
