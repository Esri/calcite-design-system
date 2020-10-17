import { newE2EPage } from "@stencil/core/testing";
import { renders, accessible } from "../../tests/commonTests";

describe("calcite-rating", () => {
  it("renders", async () => renders("<calcite-rating></calcite-rating>"));

  it("should be accessible", async () => {
    await accessible(`<calcite-rating></calcite-rating>`);
  });

  it("renders default props and total number of rating items", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    const ratingItem2 = await page.find("calcite-rating >>> calcite-icon:nth-child(2)");
    const ratingItem3 = await page.find("calcite-rating >>> calcite-icon:nth-child(3)");
    const ratingItem4 = await page.find("calcite-rating >>> calcite-icon:nth-child(4)");
    const ratingItem5 = await page.find("calcite-rating >>> calcite-icon:nth-child(5)");
    const partialStarContainer = await page.find("calcite-rating >>> .partial-rating-star-container");

    expect(partialStarContainer).toBeNull;
    expect(ratingItem1).toEqualAttribute("icon", "star");
    expect(ratingItem2).toEqualAttribute("icon", "star");
    expect(ratingItem3).toEqualAttribute("icon", "star");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "false");
    expect(ratingItem2).toEqualAttribute("data-selected", "false");
    expect(ratingItem3).toEqualAttribute("data-selected", "false");
    expect(ratingItem4).toEqualAttribute("data-selected", "false");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
    expect(ratingItem1).toEqualAttribute("data-hovered", "false");
    expect(ratingItem2).toEqualAttribute("data-hovered", "false");
    expect(ratingItem3).toEqualAttribute("data-hovered", "false");
    expect(ratingItem4).toEqualAttribute("data-hovered", "false");
    expect(ratingItem5).toEqualAttribute("data-hovered", "false");
  });

  it("displays the value when no average is present and assigns correct data attributes and icon", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating value=3></calcite-rating>");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    const ratingItem2 = await page.find("calcite-rating >>> calcite-icon:nth-child(2)");
    const ratingItem3 = await page.find("calcite-rating >>> calcite-icon:nth-child(3)");
    const ratingItem4 = await page.find("calcite-rating >>> calcite-icon:nth-child(4)");
    const ratingItem5 = await page.find("calcite-rating >>> calcite-icon:nth-child(5)");
    const partialStarContainer = await page.find("calcite-rating >>> .partial-rating-star-container");

    expect(partialStarContainer).toBeNull;
    expect(ratingItem1).toEqualAttribute("icon", "star-f");
    expect(ratingItem2).toEqualAttribute("icon", "star-f");
    expect(ratingItem3).toEqualAttribute("icon", "star-f");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "true");
    expect(ratingItem2).toEqualAttribute("data-selected", "true");
    expect(ratingItem3).toEqualAttribute("data-selected", "true");
    expect(ratingItem4).toEqualAttribute("data-selected", "false");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
  });

  it("displays the average when value is not present and assigns correct data attributes and icon", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating average=2></calcite-rating>");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    const ratingItem2 = await page.find("calcite-rating >>> calcite-icon:nth-child(2)");
    const ratingItem3 = await page.find("calcite-rating >>> calcite-icon:nth-child(3)");
    const ratingItem4 = await page.find("calcite-rating >>> calcite-icon:nth-child(4)");
    const ratingItem5 = await page.find("calcite-rating >>> calcite-icon:nth-child(5)");
    const partialStarContainer = await page.find("calcite-rating >>> .partial-rating-star-container");

    expect(partialStarContainer).toBeNull;
    expect(ratingItem1).toEqualAttribute("icon", "star-f");
    expect(ratingItem2).toEqualAttribute("icon", "star-f");
    expect(ratingItem3).toEqualAttribute("icon", "star");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "false");
    expect(ratingItem2).toEqualAttribute("data-selected", "false");
    expect(ratingItem3).toEqualAttribute("data-selected", "false");
    expect(ratingItem4).toEqualAttribute("data-selected", "false");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
    expect(ratingItem1).toEqualAttribute("data-average", "true");
    expect(ratingItem2).toEqualAttribute("data-average", "true");
    expect(ratingItem3).toEqualAttribute("data-average", "false");
    expect(ratingItem4).toEqualAttribute("data-average", "false");
    expect(ratingItem5).toEqualAttribute("data-average", "false");
  });
  it("displays the value when average and value are present and assigns correct data attributes and icon", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating average=3 value=1></calcite-rating>");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    const ratingItem2 = await page.find("calcite-rating >>> calcite-icon:nth-child(2)");
    const ratingItem3 = await page.find("calcite-rating >>> calcite-icon:nth-child(3)");
    const ratingItem4 = await page.find("calcite-rating >>> calcite-icon:nth-child(4)");
    const ratingItem5 = await page.find("calcite-rating >>> calcite-icon:nth-child(5)");
    const partialStarContainer = await page.find("calcite-rating >>> .partial-rating-star-container");

    expect(partialStarContainer).toBeNull;
    expect(ratingItem1).toEqualAttribute("icon", "star-f");
    expect(ratingItem2).toEqualAttribute("icon", "star");
    expect(ratingItem3).toEqualAttribute("icon", "star");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "true");
    expect(ratingItem2).toEqualAttribute("data-selected", "false");
    expect(ratingItem3).toEqualAttribute("data-selected", "false");
    expect(ratingItem4).toEqualAttribute("data-selected", "false");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
    expect(ratingItem1).toEqualAttribute("data-average", "false");
    expect(ratingItem2).toEqualAttribute("data-average", "false");
    expect(ratingItem3).toEqualAttribute("data-average", "false");
    expect(ratingItem4).toEqualAttribute("data-average", "false");
    expect(ratingItem5).toEqualAttribute("data-average", "false");
  });

  it("displays a partial star when average is present and contains a partial value", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating average=3.45></calcite-rating>");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    const ratingItem2 = await page.find("calcite-rating >>> calcite-icon:nth-child(2)");
    const ratingItem3 = await page.find("calcite-rating >>> calcite-icon:nth-child(3)");
    const ratingItem4 = await page.find("calcite-rating >>> calcite-icon:nth-child(4)");
    const ratingItem5 = await page.find("calcite-rating >>> calcite-icon:nth-child(5)");
    const partialStarContainer = await page.find("calcite-rating >>> .partial-rating-star-container");

    expect(partialStarContainer).not.toBeNull();
    expect(ratingItem1).toEqualAttribute("icon", "star-f");
    expect(ratingItem2).toEqualAttribute("icon", "star-f");
    expect(ratingItem3).toEqualAttribute("icon", "star-f");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "false");
    expect(ratingItem2).toEqualAttribute("data-selected", "false");
    expect(ratingItem3).toEqualAttribute("data-selected", "false");
    expect(ratingItem4).toEqualAttribute("data-selected", "false");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
    expect(ratingItem1).toEqualAttribute("data-average", "true");
    expect(ratingItem2).toEqualAttribute("data-average", "true");
    expect(ratingItem3).toEqualAttribute("data-average", "true");
    expect(ratingItem4).toEqualAttribute("data-average", "false");
    expect(ratingItem5).toEqualAttribute("data-average", "false");
    expect(ratingItem4).toEqualAttribute("data-partialparent", "true");
  });

  it("clicking on an icon will correctly set the value", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
    const element = await page.find("calcite-rating");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    const ratingItem2 = await page.find("calcite-rating >>> calcite-icon:nth-child(2)");
    const ratingItem3 = await page.find("calcite-rating >>> calcite-icon:nth-child(3)");
    const ratingItem4 = await page.find("calcite-rating >>> calcite-icon:nth-child(4)");
    const ratingItem5 = await page.find("calcite-rating >>> calcite-icon:nth-child(5)");
    const partialStarContainer = await page.find("calcite-rating >>> .partial-rating-star-container");

    expect(partialStarContainer).toBeNull;
    expect(ratingItem1).toEqualAttribute("icon", "star");
    expect(ratingItem2).toEqualAttribute("icon", "star");
    expect(ratingItem3).toEqualAttribute("icon", "star");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "false");
    expect(ratingItem2).toEqualAttribute("data-selected", "false");
    expect(ratingItem3).toEqualAttribute("data-selected", "false");
    expect(ratingItem4).toEqualAttribute("data-selected", "false");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
    expect(element).toEqualAttribute("value", "0");
    await ratingItem3.click();
    await page.waitForChanges();
    expect(ratingItem1).toEqualAttribute("icon", "star-f");
    expect(ratingItem2).toEqualAttribute("icon", "star-f");
    expect(ratingItem3).toEqualAttribute("icon", "star-f");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "true");
    expect(ratingItem2).toEqualAttribute("data-selected", "true");
    expect(ratingItem3).toEqualAttribute("data-selected", "true");
    expect(ratingItem4).toEqualAttribute("data-selected", "false");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
    expect(element).toEqualAttribute("value", "3");
  });

  it("setting a value will remove displayed average and partial average", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating average=3.5></calcite-rating>");
    const element = await page.find("calcite-rating");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    const ratingItem2 = await page.find("calcite-rating >>> calcite-icon:nth-child(2)");
    const ratingItem3 = await page.find("calcite-rating >>> calcite-icon:nth-child(3)");
    const ratingItem4 = await page.find("calcite-rating >>> calcite-icon:nth-child(4)");
    const ratingItem5 = await page.find("calcite-rating >>> calcite-icon:nth-child(5)");
    const partialStarContainer = await page.find("calcite-rating >>> .partial-rating-star-container");
    expect(partialStarContainer).not.toBeNull();
    expect(ratingItem1).toEqualAttribute("icon", "star-f");
    expect(ratingItem2).toEqualAttribute("icon", "star-f");
    expect(ratingItem3).toEqualAttribute("icon", "star-f");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "false");
    expect(ratingItem2).toEqualAttribute("data-selected", "false");
    expect(ratingItem3).toEqualAttribute("data-selected", "false");
    expect(ratingItem4).toEqualAttribute("data-selected", "false");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
    expect(partialStarContainer).toEqualAttribute("data-partialhidden", "false");
    expect(ratingItem1).toEqualAttribute("data-average", "true");
    expect(ratingItem2).toEqualAttribute("data-average", "true");
    expect(ratingItem3).toEqualAttribute("data-average", "true");
    expect(ratingItem4).toEqualAttribute("data-average", "false");
    expect(ratingItem5).toEqualAttribute("data-average", "false");
    expect(element).toEqualAttribute("value", "0");
    expect(ratingItem4).toEqualAttribute("data-partialparent", "true");
    await ratingItem4.click();
    await page.waitForChanges();
    expect(partialStarContainer).toBeNull;
    expect(ratingItem1).toEqualAttribute("icon", "star-f");
    expect(ratingItem2).toEqualAttribute("icon", "star-f");
    expect(ratingItem3).toEqualAttribute("icon", "star-f");
    expect(ratingItem4).toEqualAttribute("icon", "star-f");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "true");
    expect(ratingItem2).toEqualAttribute("data-selected", "true");
    expect(ratingItem3).toEqualAttribute("data-selected", "true");
    expect(ratingItem4).toEqualAttribute("data-selected", "true");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
    expect(element).toEqualAttribute("value", "4");
  });

  it("uses the correct data attributes while hovering over an unselected star with no value", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    const ratingItem2 = await page.find("calcite-rating >>> calcite-icon:nth-child(2)");
    const ratingItem3 = await page.find("calcite-rating >>> calcite-icon:nth-child(3)");
    const ratingItem4 = await page.find("calcite-rating >>> calcite-icon:nth-child(4)");
    const ratingItem5 = await page.find("calcite-rating >>> calcite-icon:nth-child(5)");
    expect(ratingItem1).toEqualAttribute("icon", "star");
    expect(ratingItem2).toEqualAttribute("icon", "star");
    expect(ratingItem3).toEqualAttribute("icon", "star");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-hovered", "false");
    expect(ratingItem2).toEqualAttribute("data-hovered", "false");
    expect(ratingItem3).toEqualAttribute("data-hovered", "false");
    expect(ratingItem4).toEqualAttribute("data-hovered", "false");
    expect(ratingItem5).toEqualAttribute("data-hovered", "false");
    await ratingItem4.hover();
    await page.waitForChanges();
    expect(ratingItem1).toEqualAttribute("icon", "star");
    expect(ratingItem2).toEqualAttribute("icon", "star");
    expect(ratingItem3).toEqualAttribute("icon", "star");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-hovered", "true");
    expect(ratingItem2).toEqualAttribute("data-hovered", "true");
    expect(ratingItem3).toEqualAttribute("data-hovered", "true");
    expect(ratingItem4).toEqualAttribute("data-hovered", "true");
    expect(ratingItem5).toEqualAttribute("data-hovered", "false");
  });
  it("uses the correct data attributes while hovering over an unselected star with value", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating value=3></calcite-rating>");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    const ratingItem2 = await page.find("calcite-rating >>> calcite-icon:nth-child(2)");
    const ratingItem3 = await page.find("calcite-rating >>> calcite-icon:nth-child(3)");
    const ratingItem4 = await page.find("calcite-rating >>> calcite-icon:nth-child(4)");
    const ratingItem5 = await page.find("calcite-rating >>> calcite-icon:nth-child(5)");
    expect(ratingItem1).toEqualAttribute("icon", "star-f");
    expect(ratingItem2).toEqualAttribute("icon", "star-f");
    expect(ratingItem3).toEqualAttribute("icon", "star-f");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "true");
    expect(ratingItem2).toEqualAttribute("data-selected", "true");
    expect(ratingItem3).toEqualAttribute("data-selected", "true");
    expect(ratingItem4).toEqualAttribute("data-selected", "false");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
    expect(ratingItem1).toEqualAttribute("data-hovered", "false");
    expect(ratingItem2).toEqualAttribute("data-hovered", "false");
    expect(ratingItem3).toEqualAttribute("data-hovered", "false");
    expect(ratingItem4).toEqualAttribute("data-hovered", "false");
    expect(ratingItem5).toEqualAttribute("data-hovered", "false");
    await ratingItem4.hover();
    await page.waitForChanges();
    expect(ratingItem1).toEqualAttribute("icon", "star-f");
    expect(ratingItem2).toEqualAttribute("icon", "star-f");
    expect(ratingItem3).toEqualAttribute("icon", "star-f");
    expect(ratingItem4).toEqualAttribute("icon", "star");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "true");
    expect(ratingItem2).toEqualAttribute("data-selected", "true");
    expect(ratingItem3).toEqualAttribute("data-selected", "true");
    expect(ratingItem4).toEqualAttribute("data-selected", "false");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
    expect(ratingItem1).toEqualAttribute("data-hovered", "true");
    expect(ratingItem2).toEqualAttribute("data-hovered", "true");
    expect(ratingItem3).toEqualAttribute("data-hovered", "true");
    expect(ratingItem4).toEqualAttribute("data-hovered", "true");
    expect(ratingItem5).toEqualAttribute("data-hovered", "false");
  });
  it("uses the correct data attributes while hovering over an unselected star with average", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating average=4.2></calcite-rating>");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    const ratingItem2 = await page.find("calcite-rating >>> calcite-icon:nth-child(2)");
    const ratingItem3 = await page.find("calcite-rating >>> calcite-icon:nth-child(3)");
    const ratingItem4 = await page.find("calcite-rating >>> calcite-icon:nth-child(4)");
    const ratingItem5 = await page.find("calcite-rating >>> calcite-icon:nth-child(5)");
    const partialStarContainer = await page.find("calcite-rating >>> .partial-rating-star-container");
    expect(partialStarContainer).not.toBeNull();
    expect(ratingItem1).toEqualAttribute("icon", "star-f");
    expect(ratingItem2).toEqualAttribute("icon", "star-f");
    expect(ratingItem3).toEqualAttribute("icon", "star-f");
    expect(ratingItem4).toEqualAttribute("icon", "star-f");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-selected", "false");
    expect(ratingItem2).toEqualAttribute("data-selected", "false");
    expect(ratingItem3).toEqualAttribute("data-selected", "false");
    expect(ratingItem4).toEqualAttribute("data-selected", "false");
    expect(ratingItem5).toEqualAttribute("data-selected", "false");
    expect(ratingItem1).toEqualAttribute("data-hovered", "false");
    expect(ratingItem2).toEqualAttribute("data-hovered", "false");
    expect(ratingItem3).toEqualAttribute("data-hovered", "false");
    expect(ratingItem4).toEqualAttribute("data-hovered", "false");
    expect(ratingItem5).toEqualAttribute("data-hovered", "false");
    expect(partialStarContainer).toEqualAttribute("data-partialhidden", "false");
    await ratingItem5.hover();
    await page.waitForChanges();
    expect(partialStarContainer).toBeNull;
    expect(ratingItem1).toEqualAttribute("icon", "star-f");
    expect(ratingItem2).toEqualAttribute("icon", "star-f");
    expect(ratingItem3).toEqualAttribute("icon", "star-f");
    expect(ratingItem4).toEqualAttribute("icon", "star-f");
    expect(ratingItem5).toEqualAttribute("icon", "star");
    expect(ratingItem1).toEqualAttribute("data-hovered", "true");
    expect(ratingItem2).toEqualAttribute("data-hovered", "true");
    expect(ratingItem3).toEqualAttribute("data-hovered", "true");
    expect(ratingItem4).toEqualAttribute("data-hovered", "true");
    expect(ratingItem5).toEqualAttribute("data-hovered", "true");
  });

  it("keyboard functionality works to navigate and select items", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
    const element = await page.find("calcite-rating");
    expect(element).toEqualAttribute("value", "0");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(element).toEqualAttribute("value", "1");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await page.waitForChanges();
    expect(element).toEqualAttribute("value", "3");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("Space");
    await page.waitForChanges();
    expect(element).toEqualAttribute("value", "2");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(element).toEqualAttribute("value", "1");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(element).toEqualAttribute("value", "4");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(element).toEqualAttribute("value", "1");
    await page.keyboard.press("End");
    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(element).toEqualAttribute("value", "5");
    await page.keyboard.press("Home");
    await page.keyboard.press("Space");
    await page.waitForChanges();
    expect(element).toEqualAttribute("value", "1");
  });

  it("emits expected event when user clicks to choose value", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
    const element = await page.find("calcite-rating");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    const ratingItem4 = await page.find("calcite-rating >>> calcite-icon:nth-child(4)");

    const changeEvent = await element.spyOnEvent("calciteRatingChange");
    expect(changeEvent).toHaveReceivedEventTimes(0);
    await ratingItem1.click();
    expect(element).toEqualAttribute("value", "1");
    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveReceivedEventDetail({
      value: 1
    });
    await ratingItem4.click();
    expect(element).toEqualAttribute("value", "4");
    expect(changeEvent).toHaveReceivedEventTimes(2);
    expect(changeEvent).toHaveReceivedEventDetail({
      value: 4
    });
  });

  it("emits expected event when user uses enter or space key to choose value", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
    const element = await page.find("calcite-rating");
    const changeEvent = await element.spyOnEvent("calciteRatingChange");
    await page.keyboard.press("Tab");
    expect(changeEvent).toHaveReceivedEventTimes(0);
    await page.keyboard.press("Enter");
    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveReceivedEventDetail({
      value: 1
    });
    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    expect(changeEvent).toHaveReceivedEventTimes(2);
    expect(changeEvent).toHaveReceivedEventDetail({
      value: 2
    });
  });

  it("disables click interaction when readonly is requested", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating value=4 read-only></calcite-rating>");
    const element = await page.find("calcite-rating");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    expect(element).toEqualAttribute("value", "4");
    await ratingItem1.click();
    expect(element).toEqualAttribute("value", "4");
  });
  it("disables click interaction when disabled is requested", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating disabled></calcite-rating>");
    const element = await page.find("calcite-rating");
    const ratingItem1 = await page.find("calcite-rating >>> calcite-icon:nth-child(1)");
    expect(element).toEqualAttribute("value", "0");
    await ratingItem1.click();
    expect(element).toEqualAttribute("value", "0");
  });

  it("does not render the calcite chip when count and average are not present", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
    const calciteChip = await page.find("calcite-rating >>> calcite-chip");
    expect(calciteChip).toBeNull;
  });

  it("renders the calcite chip and the count span when count is present and average is not", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating count=15></calcite-rating>");
    const calciteChip = await page.find("calcite-rating >>> calcite-chip");
    const countSpan = await page.find("calcite-rating >>> calcite-chip >>> .calcite-rating-count");
    const averageSpan = await page.find("calcite-rating >>> calcite-chip >>> .calcite-rating-average");
    expect(calciteChip).not.toBeNull();
    expect(countSpan).not.toBeNull();
    expect(averageSpan).toBeNull;
  });
  it("renders the calcite chip and the average span when average is present and count is not", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating average=4.2></calcite-rating>");
    const calciteChip = await page.find("calcite-rating >>> calcite-chip");
    const countSpan = await page.find("calcite-rating >>> calcite-chip >>> .calcite-rating-count");
    const averageSpan = await page.find("calcite-rating >>> calcite-chip >>> .calcite-rating-average");
    expect(calciteChip).not.toBeNull();
    expect(countSpan).toBeNull;
    expect(averageSpan).not.toBeNull();
  });
  it("renders the calcite chip and both the average and count spans when average and count are present", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating count=15 average=4.2></calcite-rating>");
    const calciteChip = await page.find("calcite-rating >>> calcite-chip");
    const countSpan = await page.find("calcite-rating >>> calcite-chip >>> .calcite-rating-count");
    const averageSpan = await page.find("calcite-rating >>> calcite-chip >>> .calcite-rating-average");
    expect(calciteChip).not.toBeNull();
    expect(countSpan).not.toBeNull();
    expect(averageSpan).not.toBeNull();
  });
});
