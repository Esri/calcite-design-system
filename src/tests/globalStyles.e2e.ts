import { newE2EPage } from "@stencil/core/testing";
import { html } from "./utils";
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
      "calcite-animate__in-scale"
    ];

    globalClasses.forEach((className) => {
      it(`should support rendering component with ${className} animation`, async () => {
        const page = await newE2EPage({ html: snippet });
        const element = await page.find("calcite-notice");
        await element.setProperty("active", true);
        await element.classList.add(className);
        await page.waitForChanges();
        const noticeAnimation = await page.evaluate(() => {
          const noticeEl = document.querySelector("calcite-notice");
          const { animationName, animationDuration, opacity } = window.getComputedStyle(noticeEl);
          return {
            name: animationName,
            duration: animationDuration,
            opacity: opacity
          };
        });
        expect(noticeAnimation.duration).toEqual("0.15s");
        expect(noticeAnimation.name).toEqual(className.slice(className.indexOf("_") + 2));
        expect(noticeAnimation.opacity).not.toBe("0");
      });
    });

    it("should set animation duration to 0ms", async () => {
      const page = await newE2EPage({
        html: snippet
      });
      await page.waitForChanges();
      await page.$eval("calcite-notice", (element: any) => {
        element.style.setProperty("--calcite-animation-timing", 0);
      });
      const noticeAnimation = await page.evaluate(() => {
        const noticeEl = document.querySelector("calcite-notice");
        const { animationName, animationDuration, opacity } = window.getComputedStyle(noticeEl);
        return {
          name: animationName,
          duration: animationDuration,
          opacity: opacity
        };
      });
      expect(noticeAnimation.duration).toEqual("0s");
    });
  });
});
