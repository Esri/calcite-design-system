import { newE2EPage } from "@stencil/core/testing";
import { renders, accessible, focusable, labelable, formAssociated, disabled, hidden } from "../../tests/commonTests";

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
  });

  describe("rendering", () => {
    it("should render the expected UI when a value is set", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
      const partialStarContainer = await page.find("calcite-rating >>> .fraction");

      expect(partialStarContainer).toBeNull();
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

    it("should render with expected average rating when a value is not present", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=2></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
      const partialStarContainer = await page.find("calcite-rating >>> .fraction");
      expect(partialStarContainer).toBeNull();
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
    });

    it("should render with the expected rating when average and the value are present", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=3 value=1></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
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

    it("should display a partial star when average is present and contains a partial value", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=3.45></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");
      const partialStarContainer = await page.find("calcite-rating >>> .fraction");
      expect(partialStarContainer).not.toBeNull();
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
      expect(labels[0]).toHaveClass("average");
      expect(labels[1]).toHaveClass("average");
      expect(labels[2]).toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
    });

    it("should render without the calcite chip when count and average are not present", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating show-chip></calcite-rating>");
      const calciteChip = await page.find("calcite-rating >>> calcite-chip");
      expect(calciteChip).toBeNull();
    });

    it("should not render the calcite chip when show-chip is false", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating count=240 average=3 value=2></calcite-rating>");
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

    it("should render with the calcite chip and the average span when average attribute is present and  count attribute is not", async () => {
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

  describe("mouse interaction", () => {
    it("should update the rating on a click event triggers on a rating label", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const element = await page.find("calcite-rating");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");

      await labels[2].click();
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
    });

    it("should remove displayed average and partial average when input label is clicked", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=3.5></calcite-rating>");
      const element = await page.find("calcite-rating");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");

      await labels[3].click();
      await page.waitForChanges();

      const partialStarContainer = await page.find("calcite-rating >>> .fraction");
      expect(partialStarContainer).toBeNull();
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
      expect(labels[0]).not.toHaveClass("average");
      expect(labels[1]).not.toHaveClass("average");
      expect(labels[2]).not.toHaveClass("average");
      expect(labels[3]).not.toHaveClass("average");
      expect(labels[4]).not.toHaveClass("average");
      expect(element).toEqualAttribute("value", "4");
    });

    it("should update the rating on a hover event triggers on a rating label", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");

      await labels[3].hover();
      await page.waitForChanges();
      expect(icons[0]).toEqualAttribute("icon", "star");
      expect(icons[1]).toEqualAttribute("icon", "star");
      expect(icons[2]).toEqualAttribute("icon", "star");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).toHaveClass("hovered");
      expect(labels[1]).toHaveClass("hovered");
      expect(labels[2]).toHaveClass("hovered");
      expect(labels[3]).toHaveClass("hovered");
      expect(labels[4]).not.toHaveClass("hovered");
    });

    it("should update the rating on a hover event triggers on a rating label on a value has been set", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=3></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");

      await labels[3].hover();
      await page.waitForChanges();

      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star-f");
      expect(icons[3]).toEqualAttribute("icon", "star");
      expect(icons[4]).toEqualAttribute("icon", "star");

      expect(labels[0]).toHaveClass("hovered");
      expect(labels[1]).toHaveClass("hovered");
      expect(labels[2]).toHaveClass("hovered");
      expect(labels[3]).toHaveClass("hovered");
      expect(labels[4]).not.toHaveClass("hovered");
    });

    it("should update the rating on a hover event triggers on a rating label when the average has been set", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating average=4.2></calcite-rating>");
      const icons = await page.findAll("calcite-rating >>> .icon");
      const labels = await page.findAll("calcite-rating >>> .star");

      await labels[4].hover();
      await page.waitForChanges();
      const partialStarContainer = await page.find("calcite-rating >>> .fraction");
      expect(partialStarContainer).toBeNull();
      expect(icons[0]).toEqualAttribute("icon", "star-f");
      expect(icons[1]).toEqualAttribute("icon", "star-f");
      expect(icons[2]).toEqualAttribute("icon", "star-f");
      expect(icons[3]).toEqualAttribute("icon", "star-f");
      expect(icons[4]).toEqualAttribute("icon", "star");
      expect(labels[0]).toHaveClass("hovered");
      expect(labels[1]).toHaveClass("hovered");
      expect(labels[2]).toHaveClass("hovered");
      expect(labels[3]).toHaveClass("hovered");
      expect(labels[4]).toHaveClass("hovered");
    });

    it("should emits the expected event on a click event", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const element = await page.find("calcite-rating");
      const labels = await page.findAll("calcite-rating >>> .star");

      const changeEvent = await element.spyOnEvent("calciteRatingChange");
      expect(changeEvent).toHaveReceivedEventTimes(0);
      await labels[0].click();
      expect(element).toEqualAttribute("value", "1");
      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(changeEvent).toHaveReceivedEventDetail({
        value: 1
      });
      await labels[3].click();
      expect(element).toEqualAttribute("value", "4");
      expect(changeEvent).toHaveReceivedEventTimes(2);
      expect(changeEvent).toHaveReceivedEventDetail({
        value: 4
      });
      await labels[3].click();
      expect(element).toEqualAttribute("value", "0");
      expect(changeEvent).toHaveReceivedEventTimes(3);
      expect(changeEvent).toHaveReceivedEventDetail({
        value: 0
      });
    });

    it("should not update the rating on a click event when the readonly attribute is set", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating value=4 read-only></calcite-rating>");
      const element = await page.find("calcite-rating");
      const ratingItem1 = await page.find("calcite-rating >>> .star");
      expect(element).toEqualAttribute("value", "4");
      await ratingItem1.click();
      expect(element).toEqualAttribute("value", "4");
    });
  });

  describe("keyboard interaction", () => {
    it("should update the rating when the element's focusedIn event is triggered", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const element = await page.find("calcite-rating");
      const changeEvent = await element.spyOnEvent("calciteRatingChange");
      await page.keyboard.press("Tab");
      expect(changeEvent).toHaveReceivedEventTimes(0);
      await element.press(" ");
      expect(changeEvent).toHaveReceivedEventTimes(1);
      expect(changeEvent).toHaveReceivedEventDetail({
        value: 0
      });
      await page.keyboard.press("ArrowRight");
      expect(changeEvent).toHaveReceivedEventTimes(2);
      expect(changeEvent).toHaveReceivedEventDetail({
        value: 2
      });
      await page.keyboard.press("ArrowLeft");
      expect(changeEvent).toHaveReceivedEventTimes(3);
      expect(changeEvent).toHaveReceivedEventDetail({
        value: 1
      });
      await page.keyboard.press("ArrowLeft");
      expect(changeEvent).toHaveReceivedEventTimes(4);
      expect(changeEvent).toHaveReceivedEventDetail({
        value: 5
      });
      await page.keyboard.press("ArrowRight");
      expect(changeEvent).toHaveReceivedEventTimes(5);
      expect(changeEvent).toHaveReceivedEventDetail({
        value: 1
      });
      await page.keyboard.press("Enter");
      expect(changeEvent).toHaveReceivedEventTimes(6);
      expect(changeEvent).toHaveReceivedEventDetail({
        value: 0
      });
    });

    it("should update the rating when the space-bar key is pressed", async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-rating></calcite-rating>");
      const element = await page.find("calcite-rating");
      element.setProperty("required", true);
      await page.waitForChanges();
      const changeEvent = await element.spyOnEvent("calciteRatingChange");
      await element.press(" ");
      await element.press("Enter");
      expect(changeEvent).toHaveReceivedEventTimes(0);
    });
  });
});
