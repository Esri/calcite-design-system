import { newE2EPage } from "@stencil/core/testing";
import {
  accessible,
  disabled,
  focusable,
  formAssociated,
  hidden,
  labelable,
  renders,
  t9n
} from "../../tests/commonTests";

describe("calcite-rating", () => {
  describe("common tests", () => {
    it("renders", async () => renders("<calcite-rating></calcite-rating>", { display: "flex" }));

    it("honors hidden attribute", async () => hidden("calcite-rating"));

    describe("accessibile", () => {
      accessible(`<calcite-rating></calcite-rating>`);
    });

    it("is labelable", async () => labelable("calcite-rating"));

    it("can be disabled", () => disabled("<calcite-rating value='3'></calcite-rating>"));

    it("supports translations", () => t9n("calcite-rating"));

    it("should focus input element in shadow DOM", () =>
      focusable("calcite-rating", {
        shadowFocusTargetSelector: "input"
      }));

    it("focuses the first star when the label is clicked and no-rating value exists", () =>
      labelable("calcite-rating", {
        shadowFocusTargetSelector: "input[value='1']"
      }));

    it("focuses the value-matching star when the label is clicked", () =>
      labelable("<calcite-rating value='3'></calcite-rating>", {
        shadowFocusTargetSelector: "input[value='3']"
      }));

    it("is form-associated", () => formAssociated("calcite-rating", { testValue: 3 }));
  });

  describe("rendering", () => {
    it("should render a rating", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");
      const element = await page.find("calcite-rating");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      expect(await page.find("calcite-rating >>> .fraction")).toBeNull();
      expect(await page.find("calcite-rating >>> .partial")).toBeNull();
      expect(hoveredEl.length).toBe(0);
      expect(focusedEl.length).toBe(0);
      expect(selectedEl.length).toBe(0);
      expect(element).toEqualAttribute("value", "0");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      expect(icons[0]).toEqualAttribute("icon", "star");
      expect(icons[1]).toEqualAttribute("icon", "star");
      expect(icons[2]).toEqualAttribute("icon", "star");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).not.toHaveClass("selected");
      expect(labels[1]).not.toHaveClass("selected");
      expect(labels[2]).not.toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[0]).not.toHaveClass("hovered");
      expect(labels[1]).not.toHaveClass("hovered");
      expect(labels[2]).not.toHaveClass("hovered");
      expect(labels[3]).not.toHaveClass("hovered");
      expect(labels[4]).not.toHaveClass("hovered");
      expect(labels[0]).not.toHaveClass("average");
      expect(labels[1]).not.toHaveClass("average");
      expect(labels[2]).not.toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
      expect(labels[0]).not.toHaveClass("partial");
      expect(labels[1]).not.toHaveClass("partial");
      expect(labels[2]).not.toHaveClass("partial");
      expect(labels[3]).not.toHaveClass("partial");
      expect(labels[4]).not.toHaveClass("partial");
      expect(hoveredEl.length).toBe(0);
      expect(focusedEl.length).toBe(0);
      expect(selectedEl.length).toBe(0);
    });

    it("should render a rating with an average", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=3.4></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");
      const element = await page.find("calcite-rating");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      expect(await page.find("calcite-rating >>> .fraction")).not.toBeNull();
      expect(await page.find("calcite-rating >>> .partial")).not.toBeNull();
      expect(hoveredEl.length).toBe(0);
      expect(focusedEl.length).toBe(0);
      expect(selectedEl.length).toBe(0);
      expect(element).toEqualAttribute("value", "0");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      expect(await page.find("calcite-rating >>> .fraction")).not.toBeNull();
      expect(await page.find("calcite-rating >>> .partial")).not.toBeNull();
      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star-f");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).not.toHaveClass("selected");
      expect(labels[1]).not.toHaveClass("selected");
      expect(labels[2]).not.toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[0]).not.toHaveClass("hovered");
      expect(labels[1]).not.toHaveClass("hovered");
      expect(labels[2]).not.toHaveClass("hovered");
      expect(labels[3]).not.toHaveClass("hovered");
      expect(labels[4]).not.toHaveClass("hovered");
      expect(labels[0]).toHaveClass("average");
      expect(labels[1]).toHaveClass("average");
      expect(labels[2]).toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
      expect(labels[0]).not.toHaveClass("partial");
      expect(labels[1]).not.toHaveClass("partial");
      expect(labels[2]).not.toHaveClass("partial");
      expect(labels[3]).toHaveClass("partial");
      expect(labels[4]).not.toHaveClass("partial");
    });

    it("should render a rating with a value", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=4></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");
      const element = await page.find("calcite-rating");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      expect(await page.find("calcite-rating >>> .fraction")).toBeNull();
      expect(await page.find("calcite-rating >>> .partial")).toBeNull();
      expect(hoveredEl.length).toBe(0);
      expect(focusedEl.length).toBe(0);
      expect(selectedEl.length).toBe(4);
      expect(element).toEqualAttribute("value", "4");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      expect(await page.find("calcite-rating >>> .fraction")).toBeNull();
      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star-f");
      expect(icons[3]).toEqualAttribute("icon", "star-f");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).toHaveClass("selected");
      expect(labels[1]).toHaveClass("selected");
      expect(labels[2]).toHaveClass("selected");
      expect(labels[3]).toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[0]).not.toHaveClass("hovered");
      expect(labels[1]).not.toHaveClass("hovered");
      expect(labels[2]).not.toHaveClass("hovered");
      expect(labels[3]).not.toHaveClass("hovered");
      expect(labels[4]).not.toHaveClass("hovered");
      expect(labels[0]).not.toHaveClass("average");
      expect(labels[1]).not.toHaveClass("average");
      expect(labels[2]).not.toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
      expect(labels[0]).not.toHaveClass("partial");
      expect(labels[1]).not.toHaveClass("partial");
      expect(labels[2]).not.toHaveClass("partial");
      expect(labels[3]).not.toHaveClass("partial");
      expect(labels[4]).not.toHaveClass("partial");
    });

    it("should render a rating with a value when an average is set", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=3 average=4.2></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");
      const element = await page.find("calcite-rating");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      expect(await page.find("calcite-rating >>> .fraction")).toBeNull();
      expect(await page.find("calcite-rating >>> .partial")).toBeNull();
      expect(hoveredEl.length).toBe(0);
      expect(focusedEl.length).toBe(0);
      expect(selectedEl.length).toBe(3);
      expect(element).toEqualAttribute("value", "3");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      expect(await page.find("calcite-rating >>> .fraction")).toBeNull();
      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star-f");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).toHaveClass("selected");
      expect(labels[1]).toHaveClass("selected");
      expect(labels[2]).toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[0]).not.toHaveClass("hovered");
      expect(labels[1]).not.toHaveClass("hovered");
      expect(labels[2]).not.toHaveClass("hovered");
      expect(labels[3]).not.toHaveClass("hovered");
      expect(labels[4]).not.toHaveClass("hovered");
      expect(labels[0]).not.toHaveClass("average");
      expect(labels[1]).not.toHaveClass("average");
      expect(labels[2]).not.toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
      expect(labels[0]).not.toHaveClass("partial");
      expect(labels[1]).not.toHaveClass("partial");
      expect(labels[2]).not.toHaveClass("partial");
      expect(labels[3]).not.toHaveClass("partial");
      expect(labels[4]).not.toHaveClass("partial");
    });

    it("should render a calcite chip", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating show-chip average=3 count=200></calcite-rating>");
      const calciteChip = await page.find("calcite-rating >>> calcite-chip");
      const countSpan = await page.find("calcite-rating >>> .number--count");
      const averageSpan = await page.find("calcite-rating >>> .number--average");

      expect(calciteChip).not.toBeNull();
      expect(countSpan).not.toBeNull();
      expect(averageSpan).not.toBeNull();
    });

    it("should render a calcite chip when count is missing", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating show-chip average=3></calcite-rating>");
      const calciteChip = await page.find("calcite-rating >>> calcite-chip");
      const countSpan = await page.find("calcite-rating >>> .number--count");
      const averageSpan = await page.find("calcite-rating >>> .number--average");
      expect(calciteChip).not.toBeNull();
      expect(countSpan).toBeNull();
      expect(averageSpan).not.toBeNull();
    });

    it("should not render a calcite chip when average is missing", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating show-chip count=200></calcite-rating>");
      const calciteChip = await page.find("calcite-rating >>> calcite-chip");
      const countSpan = await page.find("calcite-rating >>> .number--count");
      const averageSpan = await page.find("calcite-rating >>> .number--average");

      expect(calciteChip).not.toBeNull();
      expect(countSpan).not.toBeNull();
      expect(averageSpan).toBeNull();
    });
  });

  describe("set props", () => {
    it("should render the expected UI when the value is updated programatically without emitting an event", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const element = await page.find("calcite-rating");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      await element.setProperty("value", 3);
      await page.waitForChanges();

      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star-f");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).toHaveClass("selected");
      expect(labels[1]).toHaveClass("selected");
      expect(labels[2]).toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(element).toEqualAttribute("value", "3");
      expect(changeEvent).toHaveReceivedEventTimes(0);
    });

    it("should render the expected UI when the value is updated programatically after an average is already set", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=4.25></calcite-rating>");
      const element = await page.find("calcite-rating");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");

      await element.setProperty("value", 3);
      await page.waitForChanges();

      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star-f");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).toHaveClass("selected");
      expect(labels[1]).toHaveClass("selected");
      expect(labels[2]).toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("partial");
      expect(element).toEqualAttribute("value", "3");
    });

    it("should not reset the rating when rating is required", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=3 required></calcite-rating>");
      const element = await page.find("calcite-rating");

      await element.setProperty("value", 3);
      await page.waitForChanges();

      expect(await element.getProperty("value")).toBe(3);
    });
  });

  describe("mouse interaction", () => {
    it("should update the rating and emit an event when a click event triggers on a rating label", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=3.5></calcite-rating>");
      const element = await page.find("calcite-rating");
      const labels = await page.findAll("calcite-rating >>> .star");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");
      const icons = await page.findAll("calcite-rating >>> .icon");

      await labels[2].click();
      await page.waitForChanges();

      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");

      expect(await page.find("calcite-rating >>> .fraction")).toBeNull();
      expect(await page.find("calcite-rating >>> .partial")).toBeNull();
      expect(hoveredEl.length).toBe(3);
      expect(focusedEl.length).toBe(0);
      expect(selectedEl.length).toBe(3);
      expect(element).toEqualAttribute("value", "3");
      expect(changeEvent).toHaveReceivedEventTimes(1);

      expect(await page.find("calcite-rating >>> .fraction")).toBeNull();
      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star-f");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).toHaveClass("selected");
      expect(labels[1]).toHaveClass("selected");
      expect(labels[2]).toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[0]).toHaveClass("hovered");
      expect(labels[1]).toHaveClass("hovered");
      expect(labels[2]).toHaveClass("hovered");
      expect(labels[3]).not.toHaveClass("hovered");
      expect(labels[4]).not.toHaveClass("hovered");
      expect(labels[0]).not.toHaveClass("average");
      expect(labels[1]).not.toHaveClass("average");
      expect(labels[2]).not.toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
      expect(labels[0]).not.toHaveClass("partial");
      expect(labels[1]).not.toHaveClass("partial");
      expect(labels[2]).not.toHaveClass("partial");
      expect(labels[3]).not.toHaveClass("partial");
      expect(labels[4]).not.toHaveClass("partial");
    });

    it("should update the ui of the rating when a hover event triggers on a rating label", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=3.5></calcite-rating>");
      const element = await page.find("calcite-rating");
      const labels = await page.findAll("calcite-rating >>> .star");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");
      const icons = await page.findAll("calcite-rating >>> .icon");

      await labels[2].hover();
      await page.waitForChanges();

      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");

      expect(await page.find("calcite-rating >>> .fraction")).toBeNull();
      expect(await page.find("calcite-rating >>> .partial")).toBeNull();
      expect(hoveredEl.length).toBe(3);
      expect(focusedEl.length).toBe(0);
      expect(selectedEl.length).toBe(0);
      expect(element).toEqualAttribute("value", "0");
      expect(changeEvent).toHaveReceivedEventTimes(0);

      expect(await page.find("calcite-rating >>> .fraction")).toBeNull();
      expect(icons[0]).toEqualAttribute("icon", "star");
      expect(icons[1]).toEqualAttribute("icon", "star");
      expect(icons[2]).toEqualAttribute("icon", "star");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).not.toHaveClass("selected");
      expect(labels[1]).not.toHaveClass("selected");
      expect(labels[2]).not.toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[0]).toHaveClass("hovered");
      expect(labels[1]).toHaveClass("hovered");
      expect(labels[2]).toHaveClass("hovered");
      expect(labels[3]).not.toHaveClass("hovered");
      expect(labels[4]).not.toHaveClass("hovered");
      expect(labels[0]).not.toHaveClass("average");
      expect(labels[1]).not.toHaveClass("average");
      expect(labels[2]).not.toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
      expect(labels[0]).not.toHaveClass("partial");
      expect(labels[1]).not.toHaveClass("partial");
      expect(labels[2]).not.toHaveClass("partial");
      expect(labels[3]).not.toHaveClass("partial");
      expect(labels[4]).not.toHaveClass("partial");
    });

    it("should update the UI when a hover event triggers on a rating label after a value has been set", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=3></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");

      await labels[3].hover();
      await page.waitForChanges();

      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");

      expect(focusedEl.length).toEqual(0);
      expect(hoveredEl.length).toEqual(4);
      expect(selectedEl.length).toEqual(3);
      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star-f");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).toHaveClass("selected");
      expect(labels[1]).toHaveClass("selected");
      expect(labels[2]).toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[0]).toHaveClass("hovered");
      expect(labels[1]).toHaveClass("hovered");
      expect(labels[2]).toHaveClass("hovered");
      expect(labels[3]).toHaveClass("hovered");
      expect(labels[4]).not.toHaveClass("hovered");
      expect(labels[0]).not.toHaveClass("average");
      expect(labels[1]).not.toHaveClass("average");
      expect(labels[2]).not.toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
      expect(labels[0]).not.toHaveClass("partial");
      expect(labels[1]).not.toHaveClass("partial");
      expect(labels[2]).not.toHaveClass("partial");
      expect(labels[3]).not.toHaveClass("partial");
      expect(labels[4]).not.toHaveClass("partial");
    });

    it("should not update the rating when a click event triggers after the read-only attribute is set", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=4 read-only></calcite-rating>");
      const element = await page.find("calcite-rating");
      const ratingItem1 = await page.find("calcite-rating >>> .star");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      await ratingItem1.click();

      expect(element).toEqualAttribute("value", "4");
      expect(changeEvent).toHaveReceivedEventTimes(0);
    });

    it("should reset the rating when the current value is equal to the value of the clicked input", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=3></calcite-rating>");
      const element = await page.find("calcite-rating");
      const labels = await page.findAll("calcite-rating >>> .star");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      await labels[2].click();
      await page.waitForChanges();

      expect(await element.getProperty("value")).toBe(0);
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("should not allow rating to be cleared/reset when required props is set true", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating required></calcite-rating>");
      const element = await page.find("calcite-rating");
      const labels = await page.findAll("calcite-rating >>> .star");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      await labels[2].click();
      await labels[2].click();
      await page.waitForChanges();

      expect(await element.getProperty("value")).toBe(3);
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("should not allow click interaction when read-only is set", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=4 read-only></calcite-rating>");
      const element = await page.find("calcite-rating");
      const ratingItem1 = await page.find("calcite-rating >>> .star");

      await ratingItem1.click();
      expect(element).toEqualAttribute("value", "4");
    });
  });

  describe("keyboard interaction", () => {
    it("should update the UI when the element's focusedIn event is triggered", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=3></calcite-rating>");
      const element = await page.find("calcite-rating");

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");

      expect(hoveredEl.length).toBe(3);
      expect(focusedEl.length).toBe(1);
      expect(selectedEl.length).toBe(3);
      expect(element).toEqualAttribute("value", "3");
    });

    it("should update the UI when the element's blur event is triggered", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const element = await page.find("calcite-rating");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.waitForTimeout(200);
      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");

      expect(hoveredEl.length).toBe(0);
      expect(focusedEl.length).toBe(0);
      expect(selectedEl.length).toBe(0);
      expect(element).toEqualAttribute("value", "0");
    });

    it("should retain the rating value when the element's blur event is triggered and then the element is re-focused", async () => {
      const page = await newE2EPage();
      await page.setContent('<calcite-rating value="3"></calcite-rating>');
      const element = await page.find("calcite-rating");

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      await page.waitForChanges();

      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");

      expect(hoveredEl.length).toBe(3);
      expect(focusedEl.length).toBe(1);
      expect(selectedEl.length).toBe(3);
      expect(element).toEqualAttribute("value", "3");
    });

    it("should select the first star when tabbing into a rating with an average set", async () => {
      const page = await newE2EPage();
      await page.setContent('<calcite-rating average="3"></calcite-rating>');
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");

      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(icons[0]).toEqualAttribute("icon", "star");
      expect(icons[1]).toEqualAttribute("icon", "star");
      expect(icons[2]).toEqualAttribute("icon", "star");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).not.toHaveClass("selected");
      expect(labels[1]).not.toHaveClass("selected");
      expect(labels[2]).not.toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[1]).not.toHaveClass("average");
      expect(labels[1]).not.toHaveClass("average");
      expect(labels[2]).not.toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
    });

    it("should update the UI when the arrow keys are pressed", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const element = await page.find("calcite-rating");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      await page.keyboard.press("Tab");
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();

      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).toHaveClass("hovered");
      expect(labels[1]).toHaveClass("hovered");
      expect(labels[2]).not.toHaveClass("hovered");
      expect(labels[3]).not.toHaveClass("hovered");
      expect(labels[4]).not.toHaveClass("hovered");
      expect(labels[0]).toHaveClass("selected");
      expect(labels[1]).toHaveClass("selected");
      expect(labels[2]).not.toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[0]).not.toHaveClass("focused");
      expect(labels[1]).toHaveClass("focused");
      expect(labels[2]).not.toHaveClass("focused");
      expect(labels[3]).not.toHaveClass("focused");
      expect(labels[4]).not.toHaveClass("focused");
      expect(element).toEqualAttribute("value", "2");
      expect(changeEvent).toHaveReceivedEventTimes(3);
    });

    it("should update the rating when a number key is pressed", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const element = await page.find("calcite-rating");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      await page.keyboard.press("Tab");
      await page.keyboard.press("5");
      await page.keyboard.press("1");
      await page.keyboard.press("3");
      await page.waitForChanges();

      expect(element).toEqualAttribute("value", "3");
      expect(changeEvent).toHaveReceivedEventTimes(3);
    });

    it("should update the rating when the enter key is pressed", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const element = await page.find("calcite-rating");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");
      await page.keyboard.press("Tab");
      await element.press("Enter");
      expect(element).toEqualAttribute("value", "1");
      expect(changeEvent).toHaveReceivedEventTimes(1);
    });

    it("should reset the rating when the enter key is triggered on an element with the same value as the current value", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=3></calcite-rating>");
      const element = await page.find("calcite-rating");

      await page.keyboard.press("Tab");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(await element.getProperty("value")).toBe(0);
    });

    it("should not allow the rating to be cleared/reset when required props is set true", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating required></calcite-rating>");
      const element = await page.find("calcite-rating");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      await page.keyboard.press("Tab");
      await page.keyboard.press("Enter");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(element).toEqualAttribute("value", "1");
    });

    it("should not allow keybaord events on the rating when read-only is set true", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=2 read-only></calcite-rating>");
      const element = await page.find("calcite-rating");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

      await page.keyboard.press("Tab");
      await page.keyboard.press("Enter");
      await page.waitForChanges();

      expect(changeEvent).toHaveReceivedEventTimes(0);
      expect(element).toEqualAttribute("value", "2");
    });
  });
});
