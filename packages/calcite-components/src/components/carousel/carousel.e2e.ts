// @ts-strict-ignore
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, focusable, hidden, renders, t9n, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { breakpoints } from "../../utils/responsive";
import { findAll } from "../../tests/utils/puppeteer";
import { centerItemsByBreakpoint, CSS } from "./resources";

const customDuration = 1000;

describe("calcite-carousel", () => {
  describe("renders", () => {
    renders(
      html`<calcite-carousel label="Carousel example"
        ><calcite-carousel-item label="Carousel Item 1"><p>carousel item content</p></calcite-carousel-item
        ><calcite-carousel-item label="Carousel Item 2"
          ><p>carousel item content</p></calcite-carousel-item
        ></calcite-carousel
      >`,
      {
        display: "flex",
      },
    );
  });

  describe("honors hidden attribute", () => {
    hidden(
      html`<calcite-carousel hidden label="Carousel example"
        ><calcite-carousel-item label="Carousel Item 1"><p>carousel item content</p></calcite-carousel-item
        ><calcite-carousel-item label="Carousel Item 2"
          ><p>carousel item content</p></calcite-carousel-item
        ></calcite-carousel
      >`,
    );
  });

  describe("focusable", () => {
    focusable(
      html`<calcite-carousel label="Carousel example"
        ><calcite-carousel-item label="Carousel Item 1"><p>carousel item content</p></calcite-carousel-item
        ><calcite-carousel-item label="Carousel Item 2"
          ><p>carousel item content</p></calcite-carousel-item
        ></calcite-carousel
      >`,
    );
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(
        html`<calcite-carousel label="Carousel example"
          ><calcite-carousel-item label="Carousel Item 1"><p>carousel item content</p></calcite-carousel-item
          ><calcite-carousel-item label="Carousel Item 2"
            ><p>carousel item content</p></calcite-carousel-item
          ></calcite-carousel
        >`,
      );
    });

    describe("with autoplay paused", () => {
      accessible(
        html`<calcite-carousel autoplay="paused" label="Carousel example" autoplay-duration="${customDuration}"
          ><calcite-carousel-item label="Carousel Item 1"><p>carousel item content</p></calcite-carousel-item
          ><calcite-carousel-item label="Carousel Item 2"
            ><p>carousel item content</p></calcite-carousel-item
          ></calcite-carousel
        >`,
      );
    });

    describe("with autoplay when autoplay", () => {
      accessible(
        html`<calcite-carousel autoplay label="Carousel example" autoplay-duration="${customDuration}"
          ><calcite-carousel-item label="Carousel Item 1"><p>carousel item content</p></calcite-carousel-item
          ><calcite-carousel-item label="Carousel Item 2"
            ><p>carousel item content</p></calcite-carousel-item
          ></calcite-carousel
        >`,
      );
    });
  });

  describe("translation support", () => {
    t9n("calcite-carousel");
  });

  describe("first render", () => {
    it("should not render arrow items when requested", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example" arrow-type="none">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      await page.waitForChanges();

      const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);
      const prevButton = await page.find(`calcite-carousel >>> .${CSS.pagePrevious}`);

      expect(nextButton).toBeNull();
      expect(prevButton).toBeNull();
    });
  });

  describe("events", () => {
    it("emit change event on arrow click", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const changeSpy = await page.spyOnEvent("calciteCarouselChange");
      const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);
      const prevButton = await page.find(`calcite-carousel >>> .${CSS.pagePrevious}`);

      expect(changeSpy).not.toHaveReceivedEvent();
      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await nextButton.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await nextButton.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      await prevButton.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");
    });

    it("emit change event on keyboard movement", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const changeSpy = await page.spyOnEvent("calciteCarouselChange");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(carousel.id);
      expect(changeSpy).not.toHaveReceivedEvent();
      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await page.keyboard.press("Home");
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(4);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      await page.keyboard.press("End");
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(5);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(6);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
    });

    it("emit event on navigation via direct pagination item click", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" arrow-type="none">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const changeSpy = await page.spyOnEvent("calciteCarouselChange");
      const slide1Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(1)`);
      const slide2Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(2)`);
      const slide3Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(3)`);

      expect(changeSpy).not.toHaveReceivedEvent();
      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await slide1Button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      await slide1Button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      await slide3Button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await slide2Button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await slide2Button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
    });
  });

  describe("autoplay", () => {
    it("emit autoplay change event but not carousel change on autoplay button click", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" autoplay  autoplay-duration="${customDuration}">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const changeSpy = await page.spyOnEvent("calciteCarouselChange");
      const playSpy = await page.spyOnEvent("calciteCarouselPlay");
      const stopSpy = await page.spyOnEvent("calciteCarouselStop");
      const autoplayControl = await page.find(`calcite-carousel >>> .${CSS.autoplayControl}`);

      await page.waitForChanges();
      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(false);

      await autoplayControl.click();
      await page.waitForChanges();
      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(true);

      await autoplayControl.click();
      await page.waitForChanges();
      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(false);

      await autoplayControl.click();
      await page.waitForChanges();
      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(2);
      expect(await carousel.getProperty("paused")).toBe(true);
    });

    it("when autoplay, should stop autoplay and emit autoplay change event when item clicked", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" autoplay  autoplay-duration="${customDuration}">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const changeSpy = await page.spyOnEvent("calciteCarouselChange");

      const slide1Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(1)`);
      const slide2Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(2)`);
      const slide3Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(3)`);

      const playSpy = await page.spyOnEvent("calciteCarouselPlay");
      const stopSpy = await page.spyOnEvent("calciteCarouselStop");
      const autoplayControl = await page.find(`calcite-carousel >>> .${CSS.autoplayControl}`);

      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(false);

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await autoplayControl.click();
      await page.waitForChanges();
      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(true);

      await page.waitForChanges();
      await slide1Button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).toHaveReceivedEventTimes(1);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
      expect(await carousel.getProperty("paused")).toBe(true);

      await autoplayControl.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(false);

      await slide2Button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(2);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(await carousel.getProperty("paused")).toBe(true);

      await autoplayControl.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      expect(playSpy).toHaveReceivedEventTimes(2);
      expect(stopSpy).toHaveReceivedEventTimes(2);
      expect(await carousel.getProperty("paused")).toBe(false);

      await slide3Button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      expect(playSpy).toHaveReceivedEventTimes(2);
      expect(stopSpy).toHaveReceivedEventTimes(3);
      expect(await carousel.getProperty("paused")).toBe(true);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await autoplayControl.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      expect(playSpy).toHaveReceivedEventTimes(3);
      expect(stopSpy).toHaveReceivedEventTimes(3);
      expect(await carousel.getProperty("paused")).toBe(false);
    });

    it("when autoplay, should stop autoplay and emit autoplay change event when arrow clicked", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" autoplay autoplay-duration="${customDuration}">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const changeSpy = await page.spyOnEvent("calciteCarouselChange");

      const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);
      const prevButton = await page.find(`calcite-carousel >>> .${CSS.pagePrevious}`);

      const playSpy = await page.spyOnEvent("calciteCarouselPlay");
      const stopSpy = await page.spyOnEvent("calciteCarouselStop");
      const autoplayControl = await page.find(`calcite-carousel >>> .${CSS.autoplayControl}`);

      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(false);

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await autoplayControl.click();
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(true);

      await page.waitForChanges();
      await nextButton.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).toHaveReceivedEventTimes(1);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");
      expect(await carousel.getProperty("paused")).toBe(true);

      await autoplayControl.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(false);

      await nextButton.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(2);
      expect(await carousel.getProperty("paused")).toBe(true);

      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      await autoplayControl.click();
      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      expect(playSpy).toHaveReceivedEventTimes(2);
      expect(stopSpy).toHaveReceivedEventTimes(2);
      expect(await carousel.getProperty("paused")).toBe(false);

      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await prevButton.click();
      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      expect(playSpy).toHaveReceivedEventTimes(2);
      expect(stopSpy).toHaveReceivedEventTimes(3);
      expect(await carousel.getProperty("paused")).toBe(true);

      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      await autoplayControl.click();
      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      expect(playSpy).toHaveReceivedEventTimes(3);
      expect(stopSpy).toHaveReceivedEventTimes(3);
      expect(await carousel.getProperty("paused")).toBe(false);

      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
    });

    it("correctly rotates to a new carousel item after duration elapses", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" autoplay autoplay-duration="${customDuration}">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const playSpy = await page.spyOnEvent("calciteCarouselPlay");
      const stopSpy = await page.spyOnEvent("calciteCarouselStop");

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
    });

    it("correctly rotates to a new carousel item after default duration elapses", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" autoplay>
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const playSpy = await page.spyOnEvent("calciteCarouselPlay");
      const stopSpy = await page.spyOnEvent("calciteCarouselStop");
      const defaultSlideDurationWaitTimer = parseInt(await carousel.getProperty("autoplayDuration")) + 250;

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(defaultSlideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(defaultSlideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
    });

    it("correctly stops and starts autoplay after control clicked", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" autoplay autoplay-duration="${customDuration}">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const autoplayControl = await page.find(`calcite-carousel >>> .${CSS.autoplayControl}`);
      const playSpy = await page.spyOnEvent("calciteCarouselPlay");
      const stopSpy = await page.spyOnEvent("calciteCarouselStop");

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(false);

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await autoplayControl.click();
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(true);
      expect(selectedItem.id).toEqual("three");

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await autoplayControl.click();
      await page.waitForChanges();
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(false);

      expect(selectedItem.id).toEqual("three");

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
    });

    it("correctly stops and starts autoplay after keyboard play and pause", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" autoplay="paused" id="example-carousel"  autoplay-duration="${customDuration}">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const playSpy = await page.spyOnEvent("calciteCarouselPlay");
      const stopSpy = await page.spyOnEvent("calciteCarouselStop");
      const pauseSpy = await page.spyOnEvent("calciteCarouselPause");
      const resumeSpy = await page.spyOnEvent("calciteCarouselResume");

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(selectedItem.id).toEqual("two");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(carousel.id);

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(false);
      expect(selectedItem.id).toEqual("two");

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(true);

      expect(selectedItem.id).toEqual("three");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(true);
      expect(selectedItem.id).toEqual("three");

      await page.waitForChanges();
      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(true);
      expect(selectedItem.id).toEqual("three");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(true);
      expect(selectedItem.id).toEqual("three");

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(playSpy).toHaveReceivedEventTimes(2);
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(false);
      expect(selectedItem.id).toEqual("three");
    });

    it("does not begin autoplay after keyboard interaction if not enabled via property", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" id="example-carousel">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const playSpy = await page.spyOnEvent("calciteCarouselPlay");
      const stopSpy = await page.spyOnEvent("calciteCarouselStop");
      const pauseSpy = await page.spyOnEvent("calciteCarouselPause");
      const resumeSpy = await page.spyOnEvent("calciteCarouselResume");

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(undefined);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(selectedItem.id).toEqual("two");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(carousel.id);

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(selectedItem.id).toEqual("two");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(undefined);
      expect(selectedItem.id).toEqual("two");

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(undefined);

      expect(selectedItem.id).toEqual("two");

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(pauseSpy).not.toHaveReceivedEvent();
      expect(resumeSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(undefined);
      expect(selectedItem.id).toEqual("two");
    });
  });

  describe("pagination", () => {
    it("should select the first item by default and change the selectedIndex when the previous or next buttons are clicked", async () => {
      const page = await newE2EPage({
        html: `<calcite-carousel label="Carousel example">
      <calcite-carousel-item label="Carousel Item 1" id="one"><p>first item default selected</p></calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2" id="two"><p>next/prev behavior</p></calcite-carousel-item>
    </calcite-carousel>`,
      });

      await page.waitForChanges();

      const carousel = await page.find("calcite-carousel");
      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);
      await nextButton.click();
      await page.waitForChanges();

      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      const previousButton = await page.find(`calcite-carousel >>> .${CSS.pagePrevious}`);
      await previousButton.click();
      await page.waitForChanges();

      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
    });

    it("pagination should be hidden if there is 1 or fewer items", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-carousel label="Carousel example"
          ><calcite-carousel-item label="Carousel Item 1" id="one"
            ><p>first item default selected</p></calcite-carousel-item
          ></calcite-carousel
        >`,
      );

      const pagination = await page.find(`calcite-carousel >>> .${CSS.pagination}`);
      expect(pagination).toBeNull();
    });
  });

  describe("handling dom updates after initial render", () => {
    it("should update if items are added after initial load", async () => {
      const page = await newE2EPage({
        html: `<calcite-carousel label="Carousel example">
      <calcite-carousel-item label="Carousel Item 1"><p>dynamically adding/removing items</p></calcite-carousel-item>
    </calcite-carousel>`,
      });

      const carousel = await page.find("calcite-carousel");
      const newItemId = "newItem";
      await page.evaluate((newId) => {
        const carousel = document.querySelector("calcite-carousel");
        const newItem = carousel.querySelector("calcite-carousel-item:last-child").cloneNode(true);
        (newItem as HTMLElement).id = newId;
        carousel.appendChild(newItem);
      }, newItemId);
      await page.waitForChanges();

      const items = await findAll(page, "calcite-carousel calcite-carousel-item");
      expect(items.length).toBe(2);

      const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);
      await nextButton.click();
      await page.waitForChanges();

      const selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual(newItemId);
    });

    it("should update visible item if selected item is removed", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example">
          <calcite-carousel-item id="one"><p>dynamically adding/removing items</p></calcite-carousel-item>
          <calcite-carousel-item id="two"><p>dynamically adding/removing items</p></calcite-carousel-item>
        </calcite-carousel>`,
      );
      const carousel = await page.find("calcite-carousel");

      await page.evaluate(() => {
        document.querySelector("calcite-carousel-item:first-child").remove();
      });
      await page.waitForChanges();

      const selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
    });
  });

  describe("public methods", () => {
    it("plays and stops correctly when autoplay", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example" autoplay  autoplay-duration="${customDuration}">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );
      const carousel = await page.find("calcite-carousel");

      const playSpy = await page.spyOnEvent("calciteCarouselPlay");
      const stopSpy = await page.spyOnEvent("calciteCarouselStop");
      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(false);

      await carousel.callMethod("play");
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(false);

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await carousel.callMethod("play");
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(false);

      await carousel.callMethod("stop");
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(true);

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await carousel.callMethod("stop");
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(true);

      await carousel.callMethod("play");
      await page.waitForChanges();
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(false);

      await carousel.callMethod("stop");
      await page.waitForChanges();
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(2);
      expect(await carousel.getProperty("paused")).toBe(true);
    });

    it("plays and stops correctly when autoplay is paused", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example" autoplay="paused" autoplay-duration="${customDuration}">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );
      const carousel = await page.find("calcite-carousel");

      const playSpy = await page.spyOnEvent("calciteCarouselPlay");
      const stopSpy = await page.spyOnEvent("calciteCarouselStop");
      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(true);

      await carousel.callMethod("play");
      await page.waitForChanges();
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(false);

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await carousel.callMethod("stop");
      await page.waitForChanges();
      expect(playSpy).toHaveReceivedEventTimes(1);
      expect(stopSpy).toHaveReceivedEventTimes(1);
      expect(await carousel.getProperty("paused")).toBe(true);

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");
    });
    it("correctly does not play or stop when autoplay not present", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Carousel Item 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );
      const carousel = await page.find("calcite-carousel");
      await page.waitForChanges();
      const playSpy = await page.spyOnEvent("calciteCarouselPlay");
      const stopSpy = await page.spyOnEvent("calciteCarouselStop");
      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(undefined);

      await carousel.callMethod("play");
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(undefined);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await carousel.callMethod("stop");
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(undefined);
      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await carousel.callMethod("play");
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(undefined);

      await carousel.callMethod("stop");
      await page.waitForChanges();
      expect(playSpy).not.toHaveReceivedEvent();
      expect(stopSpy).not.toHaveReceivedEvent();
      expect(await carousel.getProperty("paused")).toBe(undefined);

      await page.waitForTimeout(customDuration);
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
    });
  });

  it("item slide animation finishes between paging/selection", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html` <style>
          :root {
            /* speeds up animations without preventing them from being triggered in test */
            --calcite-duration-factor: 0.1;
          }
        </style>
        <calcite-carousel label="carousel">
          <calcite-carousel-item label="item 1" selected><p>first</p></calcite-carousel-item>
          <calcite-carousel-item label="item 2"><p>second</p></calcite-carousel-item>
          <calcite-carousel-item label="item 3"><p>third</p></calcite-carousel-item>
        </calcite-carousel>`,
    );

    const container = await page.find(`calcite-carousel >>> .${CSS.container}`);
    const animationStartEventSpy = await container.spyOnEvent("animationstart");
    const animationEndEventSpy = await container.spyOnEvent("animationend");
    const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);

    await nextButton.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();
    await nextButton.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();

    expect(animationStartEventSpy).toHaveReceivedEventTimes(2);
    expect(animationEndEventSpy).toHaveReceivedEventTimes(2);

    const previousButton = await page.find(`calcite-carousel >>> .${CSS.pagePrevious}`);
    await previousButton.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();
    await previousButton.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();

    expect(animationStartEventSpy).toHaveReceivedEventTimes(4);
    expect(animationEndEventSpy).toHaveReceivedEventTimes(4);

    const [item1, item2, item3] = await findAll(page, `calcite-carousel >>> .${CSS.paginationItemIndividual}`);

    await item2.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();
    await item3.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();

    expect(animationStartEventSpy).toHaveReceivedEventTimes(6);
    expect(animationEndEventSpy).toHaveReceivedEventTimes(6);

    await item2.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();
    await item1.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();

    expect(animationStartEventSpy).toHaveReceivedEventTimes(8);
    expect(animationEndEventSpy).toHaveReceivedEventTimes(8);
  });

  it("item slide animation finishes between paging/selection with autoplay", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-carousel label="carousel" autoplay autoplay-duration="${customDuration}">
        <calcite-carousel-item label="item 1" selected><p>first</p></calcite-carousel-item>
        <calcite-carousel-item label="item 2"><p>second</p></calcite-carousel-item>
        <calcite-carousel-item label="item 3"><p>third</p></calcite-carousel-item>
      </calcite-carousel>`,
    );

    const container = await page.find(`calcite-carousel >>> .${CSS.container}`);
    const animationStartEventSpy = await container.spyOnEvent("animationstart");
    const animationEndEventSpy = await container.spyOnEvent("animationend");
    const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);

    await nextButton.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();

    expect(animationStartEventSpy).toHaveReceivedEventTimes(1);
    expect(animationEndEventSpy).toHaveReceivedEventTimes(1);

    const previousButton = await page.find(`calcite-carousel >>> .${CSS.pagePrevious}`);
    await previousButton.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();

    expect(animationStartEventSpy).toHaveReceivedEventTimes(2);
    expect(animationEndEventSpy).toHaveReceivedEventTimes(2);

    const [item1, item2, item3] = await findAll(page, `calcite-carousel >>> .${CSS.paginationItemIndividual}`);

    await item2.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();

    expect(animationStartEventSpy).toHaveReceivedEventTimes(3);
    expect(animationEndEventSpy).toHaveReceivedEventTimes(3);

    await item3.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();

    expect(animationStartEventSpy).toHaveReceivedEventTimes(4);
    expect(animationEndEventSpy).toHaveReceivedEventTimes(4);

    await item1.click();
    await animationStartEventSpy.next();
    await animationEndEventSpy.next();

    expect(animationStartEventSpy).toHaveReceivedEventTimes(5);
    expect(animationEndEventSpy).toHaveReceivedEventTimes(5);
  });
});

describe("renders the expected number of pagination items when overflowing", () => {
  it("correctly limits the number of slide pagination items shown when overflowing xxsmall first selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-carousel label="carousel" style="width:12.5rem")">
        <calcite-carousel-item label="item 1" selected><p>first</p></calcite-carousel-item>
        <calcite-carousel-item label="item 2"><p>second</p></calcite-carousel-item>
        <calcite-carousel-item label="item 3"><p>third</p></calcite-carousel-item>
        <calcite-carousel-item label="item 4"><p>fourth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 5"><p>fifth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 6"><p>sixth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 7"><p>seventh</p></calcite-carousel-item>
        <calcite-carousel-item label="item 8"><p>eighth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 9"><p>ninth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 10"><p>tenth</p></calcite-carousel-item>
      </calcite-carousel>`,
    );

    const items = await findAll(page, `calcite-carousel >>> .${CSS.paginationItemVisible}`);
    expect(items).toHaveLength(centerItemsByBreakpoint["xxsmall"] + 2);
  });

  it("correctly limits the number of slide pagination items shown when overflowing xsmall first selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-carousel label="carousel" style="width:${breakpoints.width["xxsmall"]}px">
        <calcite-carousel-item label="item 1" selected><p>first</p></calcite-carousel-item>
        <calcite-carousel-item label="item 2"><p>second</p></calcite-carousel-item>
        <calcite-carousel-item label="item 3"><p>third</p></calcite-carousel-item>
        <calcite-carousel-item label="item 4"><p>fourth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 5"><p>fifth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 6"><p>sixth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 7"><p>seventh</p></calcite-carousel-item>
        <calcite-carousel-item label="item 8"><p>eighth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 9"><p>ninth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 10"><p>tenth</p></calcite-carousel-item>
      </calcite-carousel>`,
    );

    const items = await findAll(page, `calcite-carousel >>> .${CSS.paginationItemVisible}`);
    expect(items).toHaveLength(centerItemsByBreakpoint["xsmall"] + 2);
  });
  it("correctly limits the number of slide pagination items shown when overflowing xsmall middle selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-carousel label="carousel" style="width:${breakpoints.width["xsmall"]}px">
        <calcite-carousel-item label="item 1"><p>first</p></calcite-carousel-item>
        <calcite-carousel-item label="item 2"><p>second</p></calcite-carousel-item>
        <calcite-carousel-item label="item 3"><p>third</p></calcite-carousel-item>
        <calcite-carousel-item label="item 4" selected><p>fourth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 5"><p>fifth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 6"><p>sixth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 7"><p>seventh</p></calcite-carousel-item>
        <calcite-carousel-item label="item 8"><p>eighth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 9"><p>ninth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 10"><p>tenth</p></calcite-carousel-item>
      </calcite-carousel>`,
    );

    const items = await findAll(page, `calcite-carousel >>> .${CSS.paginationItemVisible}`);
    expect(items).toHaveLength(centerItemsByBreakpoint["small"] + 2);
  });
  it("correctly limits the number of slide pagination items shown when overflowing small last selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-carousel label="carousel" style="width:${breakpoints.width["small"]}px">
        <calcite-carousel-item label="item 1"><p>first</p></calcite-carousel-item>
        <calcite-carousel-item label="item 2"><p>second</p></calcite-carousel-item>
        <calcite-carousel-item label="item 3"><p>third</p></calcite-carousel-item>
        <calcite-carousel-item label="item 4"><p>fourth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 5"><p>fifth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 6"><p>sixth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 7"><p>seventh</p></calcite-carousel-item>
        <calcite-carousel-item label="item 8"><p>eighth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 9"><p>ninth</p></calcite-carousel-item>
        <calcite-carousel-item label="item 10" selected><p>tenth</p></calcite-carousel-item>
      </calcite-carousel>`,
    );

    const items = await findAll(page, `calcite-carousel >>> .${CSS.paginationItemVisible}`);
    expect(items).toHaveLength(centerItemsByBreakpoint["medium"] + 2);
  });

  describe("themed", () => {
    describe("default", () => {
      themed(
        html` <calcite-carousel autoplay>
          <calcite-carousel-item label="Carousel Item 1">
            <calcite-card>
              <span slot="title">Some kind of carousel item content</span>
              <span slot="subtitle">In this case, in a card</span>
              <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
            </calcite-card>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <calcite-card>
              <span slot="title">Some kind of carousel item content</span>
              <span slot="subtitle">In this case, in a card</span>
              <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
            </calcite-card>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 3">
            <calcite-card>
              <span slot="title">Some kind of carousel item content</span>
              <span slot="subtitle">In this case, in a card</span>
              <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
            </calcite-card>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 4">
            <calcite-card>
              <span slot="title">Some kind of carousel item content</span>
              <span slot="subtitle">In this case, in a card</span>
              <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
            </calcite-card>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 5">
            <calcite-card>
              <span slot="title">Some kind of carousel item content</span>
              <span slot="subtitle">In this case, in a card</span>
              <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
            </calcite-card>
          </calcite-carousel-item>
        </calcite-carousel>`,
        {
          "--calcite-carousel-pagination-background-color": [
            {
              shadowSelector: `.${CSS.paginationItem}`,
              targetProp: "backgroundColor",
            },
            {
              shadowSelector: `.${CSS.pageNext}`,
              targetProp: "backgroundColor",
            },
            {
              shadowSelector: `.${CSS.pagePrevious}`,
              targetProp: "backgroundColor",
            },
          ],
          "--calcite-carousel-pagination-background-color-hover": [
            {
              shadowSelector: `.${CSS.paginationItem}`,
              targetProp: "backgroundColor",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.pageNext}`,
              targetProp: "backgroundColor",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.pagePrevious}`,
              targetProp: "backgroundColor",
              state: "hover",
            },
          ],
          "--calcite-carousel-pagination-background-color-press": [
            {
              shadowSelector: `.${CSS.paginationItem}`,
              targetProp: "backgroundColor",
              state: "focus",
            },
            {
              shadowSelector: `.${CSS.autoplayControl}`,
              targetProp: "backgroundColor",
              state: "focus",
            },
            {
              shadowSelector: `.${CSS.pageNext}`,
              targetProp: "backgroundColor",
              state: "focus",
            },
            {
              shadowSelector: `.${CSS.pagePrevious}`,
              targetProp: "backgroundColor",
              state: "focus",
            },
          ],
          "--calcite-carousel-pagination-background-color-selected": {
            shadowSelector: `.${CSS.paginationItemSelected}`,
            targetProp: "backgroundColor",
          },
          "--calcite-carousel-pagination-icon-color": {
            shadowSelector: `.${CSS.paginationItem}`,
            targetProp: "color",
          },
          "--calcite-carousel-pagination-icon-color-hover": {
            shadowSelector: `.${CSS.paginationItem}`,
            targetProp: "color",
            state: "hover",
          },
          "--calcite-carousel-pagination-icon-color-selected": {
            shadowSelector: `.${CSS.paginationItemSelected}`,
            targetProp: "color",
            state: "hover",
          },
          "--calcite-carousel-control-icon-color": [
            {
              shadowSelector: `.${CSS.autoplayControl}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.pageNext}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.pagePrevious}`,
              targetProp: "color",
            },
          ],
          "--calcite-carousel-control-icon-color-hover": [
            {
              shadowSelector: `.${CSS.autoplayControl}`,
              targetProp: "color",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.pageNext}`,
              targetProp: "color",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.pagePrevious}`,
              targetProp: "color",
              state: "hover",
            },
          ],
          "--calcite-carousel-autoplay-progress-background-color": {
            shadowSelector: `.${CSS.autoplayProgress}`,
            targetProp: "--calcite-progress-background-color",
          },
          "--calcite-carousel-autoplay-progress-fill-color": {
            shadowSelector: `.${CSS.autoplayProgress}`,
            targetProp: "--calcite-progress-fill-color",
          },
        },
      );
    });
  });
});
