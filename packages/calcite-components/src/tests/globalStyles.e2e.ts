import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../support/formatting";

describe("global styles", () => {
  describe("animation", () => {
    const snippet = html` <calcite-notice width="half" id="in" class="calcite-animate">
      <div slot="title">Hello world</div>
      <div slot="message">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna.
      </div>
    </calcite-notice>`;

    const globalClasses = [
      "calcite-animate__in",
      "calcite-animate__in-down",
      "calcite-animate__in-up",
      "calcite-animate__in-left",
      "calcite-animate__in-right",
      "calcite-animate__in-scale",
    ] as const;

    globalClasses.forEach((className) => {
      it(`should support rendering component with ${className} animation`, async () => {
        const page = await newE2EPage();
        await page.setContent(snippet);
        const element = await page.find("calcite-notice");
        element.classList.add(className);
        await page.waitForChanges();
        element.setProperty("active", true);
        await page.waitForChanges();

        const noticeAnimation = await page.$eval("calcite-notice", (noticeEl) => {
          const { animationName: name, animationDuration: duration, opacity } = window.getComputedStyle(noticeEl);
          return {
            name,
            duration,
            opacity,
          };
        });

        expect(noticeAnimation.duration).toEqual("0.15s");
        expect(noticeAnimation.name).toEqual(className.slice(className.indexOf("_") + 2));
        expect(noticeAnimation.opacity).not.toBe("0");
      });
    });

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
