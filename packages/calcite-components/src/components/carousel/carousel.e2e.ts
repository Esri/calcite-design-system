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
    it("should render", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example"><calcite-carousel-item label="Slide 1"><p>slide content</p></calcite-carousel-item><calcite-carousel-item label="Slide 2"><p>slide content</p></calcite-carousel-item></calcite-carousel>`,
      );
      const carousel = await page.find("calcite-carousel");
      expect(carousel).not.toBeNull();
      const isVisible = await carousel.isVisible();
      expect(isVisible).toBe(true);
    });

    it("should pre-select the correct item if the selected attribute is set", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      await page.waitForChanges();
      const carousel = await page.find("calcite-carousel");
      const selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
    });

    it("should render arrow items near pagination items as default", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      await page.waitForChanges();
      const container = await page.find(`calcite-carousel >>> .${CSS.container}`);

      expect(container).not.toHaveClass(CSS.isEdges);
    });

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

    it("should render arrow items at edges when requested", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example" arrow-type="edges">
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      await page.waitForChanges();
      const container = await page.find(`calcite-carousel >>> .${CSS.container}`);

      expect(container).toHaveClass(CSS.isEdges);
    });
  });

  describe("events", () => {
    it("emit event on arrow click", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      const carousel = await page.find("calcite-carousel");
      const eventSpy = await page.spyOnEvent("calciteCarouselChange", "window");
      const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);
      const prevButton = await page.find(`calcite-carousel >>> .${CSS.pagePrevious}`);

      expect(eventSpy).not.toHaveReceivedEvent();
      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await nextButton.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(1);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await nextButton.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(2);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      await prevButton.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(3);
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
      const eventSpy = await page.spyOnEvent("calciteCarouselChange", "window");
      const slide1Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(1)`);
      const slide2Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(2)`);
      const slide3Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(3)`);

      expect(eventSpy).not.toHaveReceivedEvent();
      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await slide1Button.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(1);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      await slide1Button.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(1);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      await slide3Button.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(2);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await slide2Button.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(3);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await slide2Button.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(3);
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
      const eventSpy = await page.spyOnEvent("calciteCarouselChange", "window");
      const rotationEventSpy = await page.spyOnEvent("calciteCarouselRotatingChange", "window");
      const rotationControl = await page.find(`calcite-carousel >>> .${CSS.rotationControl}`);

      expect(eventSpy).not.toHaveReceivedEvent();
      expect(rotationEventSpy).not.toHaveReceivedEvent();

      await rotationControl.click();
      await page.waitForChanges();
      expect(eventSpy).not.toHaveReceivedEvent();
      expect(rotationEventSpy).toHaveReceivedEventTimes(1);
      expect(carousel).toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(eventSpy).not.toHaveReceivedEvent();
      expect(rotationEventSpy).toHaveReceivedEventTimes(2);
      expect(carousel).not.toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(eventSpy).not.toHaveReceivedEvent();
      expect(rotationEventSpy).toHaveReceivedEventTimes(3);
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
      const eventSpy = await page.spyOnEvent("calciteCarouselChange", "window");

      const slide1Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(1)`);
      const slide2Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(2)`);
      const slide3Button = await page.find(`calcite-carousel >>> .${CSS.paginationItemIndividual}:nth-child(3)`);

      const rotationEventSpy = await page.spyOnEvent("calciteCarouselRotatingChange", "window");
      const rotationControl = await page.find(`calcite-carousel >>> .${CSS.rotationControl}`);

      expect(eventSpy).not.toHaveReceivedEvent();
      expect(rotationEventSpy).not.toHaveReceivedEvent();

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await rotationControl.click();
      await page.waitForChanges();
      expect(eventSpy).not.toHaveReceivedEvent();
      expect(rotationEventSpy).toHaveReceivedEventTimes(1);
      expect(carousel).toHaveAttribute("rotating");

      await page.waitForChanges();
      await slide1Button.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(1);
      expect(rotationEventSpy).toHaveReceivedEventTimes(2);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
      expect(carousel).not.toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(1);
      expect(rotationEventSpy).toHaveReceivedEventTimes(3);
      expect(carousel).toHaveAttribute("rotating");

      await slide2Button.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(2);
      expect(rotationEventSpy).toHaveReceivedEventTimes(4);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(carousel).not.toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(2);
      expect(rotationEventSpy).toHaveReceivedEventTimes(5);
      expect(carousel).toHaveAttribute("rotating");

      await slide3Button.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(3);
      expect(rotationEventSpy).toHaveReceivedEventTimes(6);
      expect(carousel).not.toHaveAttribute("rotating");
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await rotationControl.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(3);
      expect(rotationEventSpy).toHaveReceivedEventTimes(7);
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
      const eventSpy = await page.spyOnEvent("calciteCarouselChange", "window");

      const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);
      const prevButton = await page.find(`calcite-carousel >>> .${CSS.pagePrevious}`);

      const rotationEventSpy = await page.spyOnEvent("calciteCarouselRotatingChange", "window");
      const rotationControl = await page.find(`calcite-carousel >>> .${CSS.rotationControl}`);

      expect(eventSpy).not.toHaveReceivedEvent();
      expect(rotationEventSpy).not.toHaveReceivedEvent();

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      await rotationControl.click();
      await page.waitForChanges();
      expect(eventSpy).not.toHaveReceivedEvent();
      expect(rotationEventSpy).toHaveReceivedEventTimes(1);
      expect(carousel).toHaveAttribute("rotating");

      await page.waitForChanges();
      await nextButton.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(1);
      expect(rotationEventSpy).toHaveReceivedEventTimes(2);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");
      expect(carousel).not.toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(1);
      expect(rotationEventSpy).toHaveReceivedEventTimes(3);
      expect(carousel).toHaveAttribute("rotating");

      await nextButton.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(2);
      expect(rotationEventSpy).toHaveReceivedEventTimes(4);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
      expect(carousel).not.toHaveAttribute("rotating");

      await rotationControl.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(2);
      expect(rotationEventSpy).toHaveReceivedEventTimes(5);
      expect(carousel).toHaveAttribute("rotating");

      await prevButton.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(3);
      expect(rotationEventSpy).toHaveReceivedEventTimes(6);
      expect(carousel).not.toHaveAttribute("rotating");

      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await rotationControl.click();
      await page.waitForChanges();
      expect(eventSpy).toHaveReceivedEventTimes(3);
      expect(rotationEventSpy).toHaveReceivedEventTimes(7);
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
      const rotationEventSpy = await page.spyOnEvent("calciteCarouselRotatingChange", "window");

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(rotationEventSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");
      expect(rotationEventSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
      expect(rotationEventSpy).not.toHaveReceivedEvent();
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
      const rotationEventSpy = await page.spyOnEvent("calciteCarouselRotatingChange", "window");
      const customSlideDurationWaitTimer = parseInt(carousel.getAttribute("rotation-duration")) + 250;

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(rotationEventSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(customSlideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");
      expect(rotationEventSpy).not.toHaveReceivedEvent();

      await page.waitForTimeout(customSlideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
      expect(rotationEventSpy).not.toHaveReceivedEvent();
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
      const rotationEventSpy = await page.spyOnEvent("calciteCarouselRotatingChange", "window");

      let selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
      expect(rotationEventSpy).not.toHaveReceivedEvent();
      expect(carousel).toHaveAttribute("rotating");

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await rotationControl.click();
      await page.waitForChanges();

      expect(rotationEventSpy).toHaveReceivedEventTimes(1);
      expect(carousel).not.toHaveAttribute("rotating");
      expect(selectedItem.id).toEqual("three");

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("three");

      await rotationControl.click();
      await page.waitForChanges();

      expect(rotationEventSpy).toHaveReceivedEventTimes(2);
      expect(carousel).toHaveAttribute("rotating");
      expect(selectedItem.id).toEqual("three");

      await page.waitForTimeout(slideDurationWaitTimer);
      selectedItem = await carousel.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
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
        const mgr = document.querySelector("calcite-carousel");
        const newItem = mgr.querySelector("calcite-carousel-item:last-child").cloneNode(true);
        (newItem as HTMLElement).id = newId;
        mgr.appendChild(newItem);
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
