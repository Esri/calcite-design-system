import { html } from "../../support/formatting";
import { newE2EPage } from "./utils/e2e";
describe("global styles", () => {
  describe("animation", () => {
    const snippet = `<calcite-notice width="half" id="in" class="calcite-animate ">
      <div slot="title">Hello world</div>
      <div slot="message">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
        <pre></pre>
      </div>
    </calcite-notice>`;
    const globalClasses = [
      "calcite-animate__in",
      "calcite-animate__in-down",
      "calcite-animate__in-up",
      "calcite-animate__in-left",
      "calcite-animate__in-right",
      "calcite-animate__in-scale",
    ];

    globalClasses.forEach((className) => {
      it(`should support rendering component with ${className} animation`, async () => {
        const page = await newE2EPage(snippet, undefined, true);
        const element = await page.find("calcite-notice");
        await element.setProperty("active", true);
        await element.classList.add(className);
        await page.waitForChanges();
        const noticeAnimation = await page.evaluate(() => {
          const noticeEl = document.querySelector("calcite-notice");
          if (!noticeEl) {
            return null;
          }
          const { animationName, animationDuration, opacity } = window.getComputedStyle(noticeEl);
          return {
            name: animationName,
            duration: animationDuration,
            opacity: opacity,
          };
        });
        expect(noticeAnimation?.duration).toEqual("0.15s");
        expect(noticeAnimation?.name).toEqual(className.slice(className.indexOf("_") + 2));
        expect(noticeAnimation?.opacity).not.toBe("0");
      });
    });

    it("should set animation duration to 0ms when --calcite-duration-factor set to zero", async () => {
      const page = await newE2EPage(
        html`
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
        undefined,
        true,
      );
      const elTransitionDuration = await page.evaluate(() => {
        const el = document.querySelector("div");
        return el ? window.getComputedStyle(el).transitionDuration : null;
      });
      expect(elTransitionDuration).toEqual("0s");
    });
  });

  it("should not be able to disable animations with --calcite-duration-factor at component level", async () => {
    const page = await newE2EPage(
      html` <div style="transition: all var(--calcite-animation-timing) linear;"></div>`,
      undefined,
      true,
    );
    await page.$eval("div", (element: any) => {
      element.style.setProperty("--calcite-duration-factor", 0);
    });
    const elTransitionDuration = await page.evaluate(() => {
      const el = document.querySelector("div");
      return el ? window.getComputedStyle(el).transitionDuration : null;
    });
    expect(elTransitionDuration).toEqual("0.15s");
  });

  it("should set animation duration to default value 150ms", async () => {
    const page = await newE2EPage(
      html` <div style="transition: all var(--calcite-animation-timing) linear;"></div>`,
      undefined,
      true,
    );
    const elTransitionDuration = await page.evaluate(() => {
      const el = document.querySelector("div");
      return el ? window.getComputedStyle(el).transitionDuration : null;
    });
    expect(elTransitionDuration).toEqual("0.15s");
  });
});
