// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, defaults, hidden, renders, themed } from "../../tests/commonTests";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import { CSS } from "./resources";

const placeholderUrl = placeholderImage({
  width: 120,
  height: 120,
});

describe("calcite-avatar", () => {
  describe("renders", () => {
    renders("calcite-avatar", { display: "inline-block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-avatar");
  });

  describe("accessible", () => {
    accessible("calcite-avatar");
    accessible(`<calcite-avatar thumbnail="${placeholderUrl}"></calcite-avatar>`);
  });

  describe("defaults", () => {
    defaults("calcite-avatar", [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ]);
  });

  it("renders thumbnail when provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-avatar thumbnail="${placeholderUrl}"></calcite-avatar>`);
    const thumbnail = await page.find("calcite-avatar >>> .thumbnail");
    expect(thumbnail).toEqualAttribute("src", placeholderUrl);
  });

  it("renders initials when no thumbnail is provided", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-avatar full-name='My Dude'></calcite-avatar>");
    const initials = await page.find("calcite-avatar >>> .initials");
    expect(initials).toEqualText("MD");
  });

  it("computes a background fill color based on user id", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-avatar user-id='25684463a00c449585dbb32a065f6b74'></calcite-avatar>");
    const style = await page.evaluate(() => {
      const background = document.querySelector("calcite-avatar").shadowRoot.querySelector(".background");
      return background.getAttribute("style");
    });
    expect(style).toEqual("background-color:var(--calcite-avatar-background-color, hsl(206, 60%, 90%));");
  });

  it("computes a background fill if id is not a valid hex", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-avatar user-id='for sure not a hex' username='THaverford'></calcite-avatar>");
    const initials = await page.find("calcite-avatar >>> .initials");
    expect(initials).toEqualText("TH");
    const style = await page.evaluate(() => {
      const background = document.querySelector("calcite-avatar").shadowRoot.querySelector(".background");
      return background.getAttribute("style");
    });
    expect(style).toEqual("background-color:var(--calcite-avatar-background-color, hsl(317, 60%, 90%));");
  });

  it("renders default icon when no information is passed", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-avatar></calcite-avatar>");
    const icon = await page.find("calcite-avatar >>> .icon");
    const visible = await icon.isVisible();
    expect(visible).toBe(true);
  });

  it("generates unique background if names are similar", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-avatar full-name="John Doe" username="john_doe"></calcite-avatar>
      <calcite-avatar full-name="John Doe 1" username="john_doe1"></calcite-avatar>
      <calcite-avatar full-name="John Doe 2" username="john_doe2"></calcite-avatar>
    `);

    const avatars = [
      await page.find(`calcite-avatar:nth-child(1) >>> .${CSS.background}`),
      await page.find(`calcite-avatar:nth-child(2) >>> .${CSS.background}`),
      await page.find(`calcite-avatar:nth-child(3) >>> .${CSS.background}`),
    ];

    const [firstBgColor, secondBgColor, thirdBgColor] = await Promise.all(
      avatars.map((avatar) => avatar.getComputedStyle().then(({ backgroundColor }) => backgroundColor)),
    );

    expect(firstBgColor).not.toEqual(secondBgColor);
    expect(secondBgColor).not.toEqual(thirdBgColor);
    expect(firstBgColor).not.toEqual(thirdBgColor);
  });

  describe("theme", () => {
    describe("thumbnail", () => {
      themed(
        html`<calcite-avatar
          thumbnail="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
        ></calcite-avatar>`,
        {
          "--calcite-avatar-corner-radius": [
            {
              targetProp: "borderRadius",
            },
            {
              shadowSelector: `.${CSS.thumbnail}`,
              targetProp: "borderRadius",
            },
          ],
        },
      );
    });

    describe("icon", () => {
      themed(html`<calcite-avatar user-id="umonti"></calcite-avatar>`, {
        "--calcite-avatar-background-color": {
          shadowSelector: `.${CSS.background}`,
          targetProp: "backgroundColor",
        },
        "--calcite-avatar-color": {
          shadowSelector: `.${CSS.icon}`,
          targetProp: "color",
        },
        "--calcite-avatar-corner-radius": [
          {
            targetProp: "borderRadius",
          },
          {
            shadowSelector: `.${CSS.background}`,
            targetProp: "borderRadius",
          },
        ],
      });
    });

    describe("initials", () => {
      themed(html`<calcite-avatar full-name="Urbano Monti"></calcite-avatar>`, {
        "--calcite-avatar-background-color": {
          shadowSelector: `.${CSS.background}`,
          targetProp: "backgroundColor",
        },
        "--calcite-avatar-color": {
          shadowSelector: `.${CSS.initials}`,
          targetProp: "color",
        },
        "--calcite-avatar-corner-radius": {
          shadowSelector: `.${CSS.background}`,
          targetProp: "borderRadius",
        },
      });
    });
  });
});
