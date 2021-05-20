import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders } from "../../tests/commonTests";
import { StatusIconDefaults } from "./interfaces";

describe("calcite-input-message", () => {
  it("renders", async () => renders("calcite-input-message", false));

  it("is accessible", async () => accessible(`<calcite-input-message>Text</calcite-input-message>`));
  it("is accessible with icon", async () => accessible(`<calcite-input-message icon>Text</calcite-input-message>`));

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input-message></calcite-input-message>
    `);

    const element = await page.find("calcite-input-message");
    expect(element).toEqualAttribute("status", "idle");
    expect(element).toEqualAttribute("type", "default");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input-message status="valid" theme="dark" type="floating">Text</calcite-input-message>
    `);

    const element = await page.find("calcite-input-message");
    expect(element).toEqualAttribute("status", "valid");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toEqualAttribute("type", "floating");
  });

  it("inherits requested props when from wrapping calcite-label when props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label status="invalid" theme="dark">
    Label text
    <calcite-input-message>Text</calcite-input-message>
    </calcite-label>
    `);

    const element = await page.find("calcite-input-message");
    expect(element).toEqualAttribute("status", "invalid");
  });

  it("does not render an icon if not requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-input-message>Text</calcite-input-message>
    `);

    const icon = await page.find("calcite-input-message >>> .calcite-input-message-icon");
    expect(icon).toBeNull();
  });

  describe("when icon prop is provided", () => {
    let page;
    let element;
    let iconEl;
    let requestedIcon;

    beforeEach(async () => {
      page = await newE2EPage();
    });

    describe("when it's a boolean type", () => {
      describe("when value is true", () => {
        it("should render the default status icon", async () => {
          await page.setContent(`
          <calcite-input-message icon>Text</calcite-input-message>
          `);
          iconEl = await page.find("calcite-input-message >>> .calcite-input-message-icon");
          requestedIcon = await iconEl.getAttribute("icon");
          expect(requestedIcon).toEqual(StatusIconDefaults.idle);
          expect(iconEl).not.toBeNull();
        });

        describe("when element status is changed", () => {
          it("should render icon based on new status", async () => {
            await page.setContent(`
              <calcite-input-message icon status="invalid">An example with icon</calcite-input-message>
            `);
            element = await page.find("calcite-input-message");
            iconEl = await page.find("calcite-input-message >>> .calcite-input-message-icon");
            requestedIcon = await iconEl.getAttribute("icon");
            expect(requestedIcon).toEqual(StatusIconDefaults.invalid);
            expect(iconEl).not.toBeNull();

            await element.setAttribute("status", "valid");
            await page.waitForChanges();

            iconEl = await page.find("calcite-input-message >>> .calcite-input-message-icon");
            requestedIcon = await iconEl.getAttribute("icon");
            expect(requestedIcon).toEqual(StatusIconDefaults.valid);
            expect(iconEl).not.toBeNull();
          });
        });
      });

      describe("when value is false", () => {
        it("should render no icon", async () => {
          const page = await newE2EPage();
          await page.setContent(`
          <calcite-input-message !icon>Text</calcite-input-message>
          `);
          iconEl = await page.find("calcite-input-message >>> .calcite-input-message-icon");
          expect(iconEl).toBeNull();
        });
      });
    });

    describe("when it's a string type", () => {
      it("should render the requested custom icon", async () => {
        await page.setContent("<calcite-input-message icon='banana'>Nah</calcite-input-message>");
        element = await page.find("calcite-input-message");
        iconEl = await page.find("calcite-input-message >>> .calcite-input-message-icon");
        requestedIcon = await iconEl.getAttribute("icon");
        expect(requestedIcon).toEqual("banana");
      });

      describe("when the icon is changed", () => {
        it("should render the new icon", async () => {
          await page.setContent("<calcite-input-message icon='information'>More info</calcite-input-message>");
          element = await page.find("calcite-input-message");
          iconEl = await page.find("calcite-input-message >>> .calcite-input-message-icon");
          requestedIcon = await iconEl.getAttribute("icon");
          expect(requestedIcon).toEqual(StatusIconDefaults.idle);

          await element.setAttribute("icon", "banana");
          await page.waitForChanges();

          iconEl = await page.find("calcite-input-message >>> .calcite-input-message-icon");
          requestedIcon = await iconEl.getAttribute("icon");
          expect(requestedIcon).toEqual("banana");

          await element.setAttribute("icon", "view-hide");
          await page.waitForChanges();

          iconEl = await page.find("calcite-input-message >>> .calcite-input-message-icon");
          requestedIcon = await iconEl.getAttribute("icon");
          expect(requestedIcon).toEqual("view-hide");
        });
      });
    });
  });

  describe("CSS properties for light/dark themes", () => {
    const inputMessageHtml = `
    <calcite-input placeholder="Enter your information"></calcite-input>
    <calcite-input-message active type="floating">
      That's not going to work out.
      <calcite-button appearance="inline" href="">Learn more</calcite-button>
    </calcite-input-message>
    `;
    let page;
    let inputMessage;
    let inputMessageStyles;
    let backgroundColorStyle;

    it("should have defined CSS custom properties", async () => {
      page = await newE2EPage({ html: inputMessageHtml });
      backgroundColorStyle = await page.evaluate(() => {
        inputMessage = document.querySelector("calcite-input-message");
        inputMessage.style.setProperty("--calcite-input-message-floating-background", "gold");
        return window.getComputedStyle(inputMessage).getPropertyValue("--calcite-input-message-floating-background");
      });
      expect(backgroundColorStyle).toEqual("gold");
    });

    describe("when theme attribute is not provided", () => {
      it("should render floating input message background with default value tied to light theme", async () => {
        page = await newE2EPage({
          html: `
          <calcite-label>My great label
            ${inputMessageHtml}
          </calcite-label>
        `
        });
        inputMessage = await page.find("calcite-input-message");
        inputMessageStyles = await inputMessage.getComputedStyle();
        backgroundColorStyle = await inputMessageStyles.getPropertyValue("background-color");
        expect(backgroundColorStyle).toEqual("rgba(255, 255, 255, 0.96)");
      });
    });

    describe("when theme attribute is dark", () => {
      it("should render floating input message background with value tied to dark theme", async () => {
        page = await newE2EPage({
          html: `
          <calcite-label theme="dark">My great label
            ${inputMessageHtml}
          </calcite-label>
        `
        });
        inputMessage = await page.find("calcite-input-message");
        inputMessageStyles = await inputMessage.getComputedStyle();
        backgroundColorStyle = await inputMessageStyles.getPropertyValue("background-color");
        expect(backgroundColorStyle).toEqual("rgba(43, 43, 43, 0.96)");
      });
    });

    it.skip("should allow the CSS custom property to be overridden", async () => {
      const overrideStyle = "rgba(0, 0, 0, 0.4)";
      page = await newE2EPage({
        html: `
        <style>
          :root {
            --calcite-input-message-floating-background: ${overrideStyle};
          }
        </style>
        <calcite-label>My great label
          ${inputMessageHtml}
        </calcite-label>
        `
      });
      inputMessage = await page.find("calcite-input-message");
      inputMessageStyles = await inputMessage.getComputedStyle();
      expect(await inputMessageStyles.getPropertyValue("background-color")).toEqual(overrideStyle);
    });
  });
});
