import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, renders, themed } from "../../tests/commonTests";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { html } from "../../../support/formatting";

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
    expect(style).toEqual("background-color: rgb(214, 232, 245);");
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
    expect(style).toEqual("background-color: rgb(245, 219, 214);");
  });

  it("renders default icon when no information is passed", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-avatar></calcite-avatar>");
    const icon = await page.find("calcite-avatar >>> .icon");
    const visible = await icon.isVisible();
    expect(visible).toBe(true);
  });

  describe("theme", () => {
    describe("thumbnail", () => {
      themed(
        html`<calcite-avatar
          thumbnail="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
        ></calcite-avatar>`,
        {
          "--calcite-avatar-corner-radius": {
            shadowSelector: `.thumbnail`,
            targetProp: "borderRadius",
          },
        },
      );
    });

    describe("icon", () => {
      themed(html`<calcite-avatar user-id="umonti"></calcite-avatar>`, {
        "--calcite-avatar-icon-color": {
          shadowSelector: `.icon`,
          targetProp: "color",
        },
        "--calcite-avatar-corner-radius": {
          shadowSelector: `.background`, // needs to support multiple selectors (e.g., host + background), maybe this can be done with existing array args?
          targetProp: "borderRadius",
        },
      });
    });

    describe("initials", () => {
      themed(html`<calcite-avatar full-name="Urbano Monti"></calcite-avatar>`, {
        "--calcite-avatar-text-color": {
          shadowSelector: `.initials`,
          targetProp: "color",
        },
        "--calcite-avatar-corner-radius": {
          shadowSelector: `.background`,
          targetProp: "borderRadius",
        },
      });
    });
  });
});
