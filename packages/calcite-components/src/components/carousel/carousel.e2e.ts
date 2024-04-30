import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders, t9n } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS, DURATION } from "./resources";

const slideDurationWaitTimer = DURATION + 250;

describe("calcite-carousel", () => {
  describe("renders", () => {
    renders(
      html`<calcite-carousel label="Carousel example"
        ><calcite-carousel-item label="Slide 1"><p>slide content</p></calcite-carousel-item
        ><calcite-carousel-item label="Slide 2"><p>slide content</p></calcite-carousel-item></calcite-carousel
      >`,
      {
        display: "flex",
      },
    );
  });

  describe("honors hidden attribute", () => {
    hidden(
      html`<calcite-carousel hidden label="Carousel example"
        ><calcite-carousel-item label="Slide 1"><p>slide content</p></calcite-carousel-item
        ><calcite-carousel-item label="Slide 2"><p>slide content</p></calcite-carousel-item></calcite-carousel
      >`,
    );
  });

  describe("accessible", () => {
    accessible(
      html`<calcite-carousel label="Carousel example"
        ><calcite-carousel-item label="Slide 1"><p>slide content</p></calcite-carousel-item
        ><calcite-carousel-item label="Slide 2"><p>slide content</p></calcite-carousel-item></calcite-carousel
      >`,
    );
  });

  describe("accessible with rotation", () => {
    accessible(
      html`<calcite-carousel rotation label="Carousel example"
        ><calcite-carousel-item label="Slide 1"><p>slide content</p></calcite-carousel-item
        ><calcite-carousel-item label="Slide 2"><p>slide content</p></calcite-carousel-item></calcite-carousel
      >`,
    );
  });

  describe("accessible with rotation when rotating", () => {
    accessible(
      html`<calcite-carousel rotation rotating label="Carousel example"
        ><calcite-carousel-item label="Slide 1"><p>slide content</p></calcite-carousel-item
        ><calcite-carousel-item label="Slide 2"><p>slide content</p></calcite-carousel-item></calcite-carousel
      >`,
    );
  });

  describe("translation support", () => {
    t9n("calcite-combobox");
  });

  describe("first render", () => {
    it("should not render arrow items when requested", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example" arrow-type="none">
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
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
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
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

    it("emit event on navigation via direct pagination item click", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" arrow-type="none">
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
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

    it("emit rotation change event but not carousel change on rotation button click", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" rotation>
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const changeSpy = await page.spyOnEvent("calciteCarouselChange");
      const playEventSpy = await page.spyOnEvent("calciteCarouselPlay");
      const pauseEventSpy = await page.spyOnEvent("calciteCarouselStop");
      const rotationControl = await page.find(`calcite-carousel >>> .${CSS.rotationControl}`);

      await page.waitForChanges();
      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();

      await rotationControl.click();
      await page.waitForChanges();
      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playEventSpy).toHaveReceivedEventTimes(1);
      expect(pauseEventSpy).not.toHaveReceivedEvent();
      expect(carousel).toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playEventSpy).toHaveReceivedEventTimes(1);
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      expect(carousel).not.toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playEventSpy).toHaveReceivedEventTimes(2);
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      expect(carousel).toHaveAttribute("rotating");
    });

    it("when rotating, should stop rotation and emit rotation change event when item clicked", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" rotation>
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const changeSpy = await page.spyOnEvent("calciteCarouselChange");

      const slide1Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(1)`);
      const slide2Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(2)`);
      const slide3Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(3)`);

      const playEventSpy = await page.spyOnEvent("calciteCarouselPlay");
      const pauseEventSpy = await page.spyOnEvent("calciteCarouselStop");
      const rotationControl = await page.find(`calcite-carousel >>> .${CSS.rotationControl}`);

      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await rotationControl.click();
      await page.waitForChanges();
      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playEventSpy).toHaveReceivedEventTimes(1);
      expect(pauseEventSpy).not.toHaveReceivedEvent();
      expect(carousel).toHaveAttribute("rotating");

      await page.waitForChanges();
      await slide1Button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(playEventSpy).toHaveReceivedEventTimes(1);
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
      expect(carousel).not.toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(playEventSpy).toHaveReceivedEventTimes(2);
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      expect(carousel).toHaveAttribute("rotating");

      await slide2Button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      expect(playEventSpy).toHaveReceivedEventTimes(2);
      expect(pauseEventSpy).toHaveReceivedEventTimes(2);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(carousel).not.toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      expect(playEventSpy).toHaveReceivedEventTimes(3);
      expect(pauseEventSpy).toHaveReceivedEventTimes(2);
      expect(carousel).toHaveAttribute("rotating");

      await slide3Button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      expect(playEventSpy).toHaveReceivedEventTimes(3);
      expect(pauseEventSpy).toHaveReceivedEventTimes(3);
      expect(carousel).not.toHaveAttribute("rotating");
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await rotationControl.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      expect(playEventSpy).toHaveReceivedEventTimes(4);
      expect(pauseEventSpy).toHaveReceivedEventTimes(3);
      expect(carousel).toHaveAttribute("rotating");
    });

    it("when rotating, should stop rotation and emit rotation change event when arrow clicked", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" rotation>
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const changeSpy = await page.spyOnEvent("calciteCarouselChange");

      const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);
      const prevButton = await page.find(`calcite-carousel >>> .${CSS.pagePrevious}`);

      const playEventSpy = await page.spyOnEvent("calciteCarouselPlay");
      const pauseEventSpy = await page.spyOnEvent("calciteCarouselStop");
      const rotationControl = await page.find(`calcite-carousel >>> .${CSS.rotationControl}`);

      expect(changeSpy).not.toHaveReceivedEvent();
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await rotationControl.click();
      await page.waitForChanges();
      expect(playEventSpy).toHaveReceivedEventTimes(1);
      expect(pauseEventSpy).not.toHaveReceivedEvent();
      expect(carousel).toHaveAttribute("rotating");

      await page.waitForChanges();
      await nextButton.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(playEventSpy).toHaveReceivedEventTimes(1);
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");
      expect(carousel).not.toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(playEventSpy).toHaveReceivedEventTimes(2);
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      expect(carousel).toHaveAttribute("rotating");

      await nextButton.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      expect(playEventSpy).toHaveReceivedEventTimes(2);
      expect(pauseEventSpy).toHaveReceivedEventTimes(2);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
      expect(carousel).not.toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      expect(playEventSpy).toHaveReceivedEventTimes(3);
      expect(pauseEventSpy).toHaveReceivedEventTimes(2);
      expect(carousel).toHaveAttribute("rotating");

      await prevButton.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      expect(playEventSpy).toHaveReceivedEventTimes(3);
      expect(pauseEventSpy).toHaveReceivedEventTimes(3);
      expect(carousel).not.toHaveAttribute("rotating");

      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await rotationControl.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(3);
      expect(playEventSpy).toHaveReceivedEventTimes(4);
      expect(pauseEventSpy).toHaveReceivedEventTimes(3);
      expect(carousel).toHaveAttribute("rotating");
    });

    it("correctly rotates to a new slide after duration elapses", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" rotation rotating>
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const playEventSpy = await page.spyOnEvent("calciteCarouselPlay");
      const pauseEventSpy = await page.spyOnEvent("calciteCarouselStop");

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();
    });

    it("correctly rotates to a new slide after custom duration elapses", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" rotation rotating rotation-duration="2000">
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const playEventSpy = await page.spyOnEvent("calciteCarouselPlay");
      const pauseEventSpy = await page.spyOnEvent("calciteCarouselStop");
      const customSlideDurationWaitTimer = parseInt(await carousel.getProperty("rotationDuration")) + 250;

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(customSlideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(customSlideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();
    });

    it("correctly stops and starts rotation after control clicked", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" rotation rotating>
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const rotationControl = await page.find(`calcite-carousel >>> .${CSS.rotationControl}`);
      const playEventSpy = await page.spyOnEvent("calciteCarouselPlay");
      const pauseEventSpy = await page.spyOnEvent("calciteCarouselStop");

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();
      expect(carousel).toHaveAttribute("rotating");

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await rotationControl.click();
      await page.waitForChanges();
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      expect(carousel).not.toHaveAttribute("rotating");
      expect(selectedItem.id).toEqual("three");

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await rotationControl.click();
      await page.waitForChanges();
      expect(playEventSpy).toHaveReceivedEventTimes(1);
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      expect(carousel).toHaveAttribute("rotating");
      expect(selectedItem.id).toEqual("three");

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
    });

    it("correctly stops and starts rotation after keyboard play and pause", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example" rotation rotating id="example-carousel>
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const playEventSpy = await page.spyOnEvent("calciteCarouselPlay");
      const pauseEventSpy = await page.spyOnEvent("calciteCarouselStop");
      const suspendStartSpy = await page.spyOnEvent("calciteCarouselPause");
      const suspendEndSpy = await page.spyOnEvent("calciteCarouselResume");

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();
      expect(suspendStartSpy).not.toHaveReceivedEvent();
      expect(suspendEndSpy).not.toHaveReceivedEvent();
      expect(carousel).toHaveAttribute("rotating");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(selectedItem.id).toEqual("two");
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).not.toHaveReceivedEvent();
      expect(suspendStartSpy).toHaveReceivedEventTimes(1);
      expect(suspendEndSpy).not.toHaveReceivedEvent();
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(carousel.id);

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(playEventSpy).not.toHaveReceivedEvent();
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      expect(suspendStartSpy).toHaveReceivedEventTimes(1);
      expect(suspendEndSpy).not.toHaveReceivedEvent();
      expect(carousel).not.toHaveAttribute("rotating");
      expect(selectedItem.id).toEqual("two");

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await page.keyboard.press("Space");
      await page.waitForChanges();
      expect(playEventSpy).toHaveReceivedEventTimes(1);
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      expect(suspendStartSpy).toHaveReceivedEventTimes(1);
      expect(suspendEndSpy).not.toHaveReceivedEvent();
      expect(carousel).toHaveAttribute("rotating");
      expect(selectedItem.id).toEqual("two");

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(playEventSpy).toHaveReceivedEventTimes(1);
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      expect(suspendStartSpy).toHaveReceivedEventTimes(1);
      expect(suspendEndSpy).toHaveReceivedEventTimes(1);
      expect(carousel).toHaveAttribute("rotating");
      expect(selectedItem.id).toEqual("two");

      await page.waitForChanges();
      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(playEventSpy).toHaveReceivedEventTimes(1);
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      expect(suspendStartSpy).toHaveReceivedEventTimes(1);
      expect(suspendEndSpy).toHaveReceivedEventTimes(1);
      expect(carousel).toHaveAttribute("rotating");
      expect(selectedItem.id).toEqual("three");

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(playEventSpy).toHaveReceivedEventTimes(1);
      expect(pauseEventSpy).toHaveReceivedEventTimes(1);
      expect(suspendStartSpy).toHaveReceivedEventTimes(2);
      expect(suspendEndSpy).toHaveReceivedEventTimes(1);
      expect(carousel).toHaveAttribute("rotating");
      expect(selectedItem.id).toEqual("three");
    });
  });

  describe("pagination", () => {
    it("should select the first item by default and change the selectedIndex when the previous or next buttons are clicked", async () => {
      const page = await newE2EPage({
        html: `<calcite-carousel label="Carousel example">
      <calcite-carousel-item label="Slide 1" id="one"><p>first item default selected</p></calcite-carousel-item>
      <calcite-carousel-item label="Slide 2" id="two"><p>next/prev behavior</p></calcite-carousel-item>
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
          ><calcite-carousel-item label="Slide 1" id="one"
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
      <calcite-carousel-item label="Slide 1"><p>dynamically adding/removing items</p></calcite-carousel-item>
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

      const items = await page.findAll("calcite-carousel calcite-carousel-item");
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
});
