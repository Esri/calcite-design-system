import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../support/formatting";

describe("global styles", () => {
  it("should set animation duration to 0ms when --calcite-duration-factor set to zero", async () => {
    const page = await newE2EPage({
      html: html`
        <html>
          <style>
            html {
              --calcite-duration-factor: 0;
            }
          </style>
          <body>
            <div style="transition: all var(--calcite-animation-timing) linear;"></div>
          </body>
        </html>
      `,
    });
    await page.waitForChanges();
    const elTransitionDuration = await page.$eval("div", (el) => window.getComputedStyle(el).transitionDuration);
    expect(elTransitionDuration).toEqual("0s");
  });

  it("should not be able to disable animations with --calcite-duration-factor at component level", async () => {
    const page = await newE2EPage({
      html: html` <div style="transition: all var(--calcite-animation-timing) linear;"></div> `,
    });
    await page.waitForChanges();
    await page.$eval("div", (element) => {
      element.style.setProperty("--calcite-duration-factor", "0");
    });
    const elTransitionDuration = await page.$eval("div", (el) => window.getComputedStyle(el).transitionDuration);
    expect(elTransitionDuration).toEqual("0.15s");
  });

  it("should set animation duration to default value 150ms", async () => {
    const page = await newE2EPage({
      html: html` <div style="transition: all var(--calcite-animation-timing) linear;"></div> `,
    });
    const elTransitionDuration = await page.$eval("div", (el) => window.getComputedStyle(el).transitionDuration);
    expect(elTransitionDuration).toEqual("0.15s");
  });
});
