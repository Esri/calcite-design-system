import { newE2EPage } from "@stencil/core/testing";
import {
  renders,
  accessible,
  focusable,
  labelable,
  formAssociated,
  disabled,
  hidden,
  t9n
} from "../../tests/commonTests";

describe("calcite-rating", () => {
  describe("common tests", () => {
    it("renders", async () => renders("<calcite-rating></calcite-rating>", { display: "flex" }));
    it("honors hidden attribute", async () => hidden("calcite-rating"));
    it("is accessible", async () => accessible(`<calcite-rating></calcite-rating>`));
    it("is labelable", async () => labelable("calcite-rating"));
    it("should focuses on the first star when the label is clicked and no-rating value exists", () =>
      labelable("calcite-rating", {
        shadowFocusTargetSelector: "input[value='1']"
      }));
    it("should focuses on the value-matching star when the label is clicked", () =>
      labelable("<calcite-rating value='3'></calcite-rating>", {
        shadowFocusTargetSelector: "input[value='3']"
      }));
    it("is disablable", () => disabled("<calcite-rating value='3'></calcite-rating>"));
    it("is form-associated", () => formAssociated("calcite-rating", { testValue: 3 }));
    it("should focus input element in shadow DOM", () =>
      focusable("calcite-rating", {
        shadowFocusTargetSelector: "input"
      }));
    it("supports translations", () => t9n("calcite-rating"));
  });

  describe("rendering", () => {
    it("should render the expected UI when a value is set", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");

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
      expect(hoveredEl.length).toBe(0);
      expect(focusedEl.length).toBe(0);
      expect(selectedEl.length).toBe(0);
    });

    it("should display the correct stars as filled and selected when called with a value", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=3></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
      const partialStarContainer = await page.find("calcite-rating >>> .fraction");

      expect(partialStarContainer).toBeNull();
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
    });

    it("should render the expected UI when an average (including partial) is set and value is not present", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=2.35></calcite-rating>");

      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");

      expect(await page.find("calcite-rating >>> .fraction")).not.toBeNull();
      expect(await page.find("calcite-rating >>> calcite-chip")).toBeNull();
      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).not.toHaveClass("selected");
      expect(labels[1]).not.toHaveClass("selected");
      expect(labels[2]).not.toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[0]).toHaveClass("average");
      expect(labels[1]).toHaveClass("average");
      expect(labels[2]).not.toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
      expect(labels[0]).not.toHaveClass("partial");
      expect(labels[1]).not.toHaveClass("partial");
      expect(labels[2]).toHaveClass("partial");
      expect(labels[3]).not.toHaveClass("partial");
      expect(labels[4]).not.toHaveClass("partial");
    });

    it("should render with the expected UI when average and the value are present", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=3 value=1></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");

      expect(await page.find("calcite-rating >>> .fraction")).toBeNull();
      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star");
      expect(icons[2]).toEqualAttribute("icon", "star");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).toHaveClass("selected");
      expect(labels[1]).not.toHaveClass("selected");
      expect(labels[2]).not.toHaveClass("selected");
      expect(labels[3]).not.toHaveClass("selected");
      expect(labels[4]).not.toHaveClass("selected");
      expect(labels[0]).not.toHaveClass("average");
      expect(labels[1]).not.toHaveClass("average");
      expect(labels[2]).not.toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
    });

    it("should render without the calcite chip when count and average are not present", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating show-chip></calcite-rating>");
      const calciteChip = await page.find("calcite-rating >>> calcite-chip");
      expect(calciteChip).toBeNull();
    });

    it("should render with the calcite chip and the count span when count attribute is present and average attribute is not", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-rating count=15 show-chip></calcite-rating>`);
      const calciteChip = await page.find("calcite-rating >>> calcite-chip");
      const countSpan = await page.find("calcite-rating >>> .number--count");
      const averageSpan = await page.find("calcite-rating >>> .number--average");
      expect(calciteChip).not.toBeNull();
      expect(countSpan).not.toBeNull();
      expect(averageSpan).toBeNull();
    });

    it("should render with the calcite chip and the average span when average attribute is present and count attribute is not", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=4.2 show-chip></calcite-rating>");
      const calciteChip = await page.find("calcite-rating >>> calcite-chip");
      const countSpan = await page.find("calcite-rating >>> .number---count");
      const averageSpan = await page.find("calcite-rating >>> .number--average");
      expect(calciteChip).not.toBeNull();
      expect(countSpan).toBeNull();
      expect(averageSpan).not.toBeNull();
    });

    it("should render the calcite chip with both the average and count spans when the average and count attributes are present", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating count=15 average=4.2 show-chip></calcite-rating>");
      const calciteChip = await page.find("calcite-rating >>> calcite-chip");
      const countSpan = await page.find("calcite-rating >>> .number--count");
      const averageSpan = await page.find("calcite-rating >>> .number--average");
      expect(calciteChip).not.toBeNull();
      expect(countSpan).not.toBeNull();
      expect(averageSpan).not.toBeNull();
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
    it("should update the rating when a click event triggers on a rating label and emit an event", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=3.5></calcite-rating>");
      const element = await page.find("calcite-rating");
      const labels = await page.findAll("calcite-rating >>> .star");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");

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
    });

    it("should update the rating when a hover event triggers on a rating label", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const labels = await page.findAll("calcite-rating >>> .star");

      await labels[3].hover();
      await page.waitForChanges();

      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");

      expect(focusedEl.length).toEqual(0);
      expect(hoveredEl.length).toEqual(4);
      expect(selectedEl.length).toEqual(0);
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
    });

    it("should update the UI when a hover event triggers on a rating label after the average has been set", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=4.2></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");

      await labels[4].hover();
      await page.waitForChanges();

      const focusedEl = await page.findAll("calcite-rating >>> .star.focused");
      const hoveredEl = await page.findAll("calcite-rating >>> .star.hovered");
      const selectedEl = await page.findAll("calcite-rating >>> .star.selected");

      expect(focusedEl.length).toEqual(0);
      expect(hoveredEl.length).toEqual(5);
      expect(selectedEl.length).toEqual(0);
      expect(await page.find("calcite-rating >>> .fraction")).toBeNull();
      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star-f");
      expect(icons[3]).toEqualAttribute("icon", "star-f");
      expect(icons[4]).toEqualAttribute("icon", "star");
    });

    it("should not update the rating when a click event triggers after the readonly attribute is set", async () => {
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

      await labels[2].click();
      await page.waitForChanges();

      expect(await element.getProperty("value")).toBe(0);
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
      expect(changeEvent).toHaveReceivedEventDetail({
        value: 3
      });
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
  });
});
