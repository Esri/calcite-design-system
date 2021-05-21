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
    <calcite-input-message status="valid" type="floating">Text</calcite-input-message>
    `);

    const element = await page.find("calcite-input-message");
    expect(element).toEqualAttribute("status", "valid");
    expect(element).toEqualAttribute("type", "floating");
  });

  it("inherits requested props when from wrapping calcite-label when props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label status="invalid">
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
});
