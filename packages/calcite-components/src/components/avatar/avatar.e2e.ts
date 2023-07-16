import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, renders } from "../../tests/commonTests";

describe("calcite-avatar", () => {
  describe("renders", () => {
    renders("calcite-avatar", { display: "inline-block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-avatar");
  });

  describe("accessible", () => {
    accessible("calcite-avatar");
    accessible("<calcite-avatar thumbnail='http://placekitten.com/120/120'></calcite-avatar>");
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
    await page.setContent("<calcite-avatar thumbnail='http://placekitten.com/120/120'></calcite-avatar>");
    const thumbnail = await page.find("calcite-avatar >>> .thumbnail");
    expect(thumbnail).toEqualAttribute("src", "http://placekitten.com/120/120");
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
});
