import { newE2EPage } from "@stencil/core/testing";
import { renders } from "../../tests/commonTests";

describe("calcite-rating", () => {
  it("renders", async () => renders("<calcite-rating></calcite-rating>"));

  it("shows loading component", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("renders default props and total number of rating items", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("disables interaction when readonly is requested", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("disables interaction when disabled is requested", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("displays the value when no average is present", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("displays the value when average is present", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("displays the average when value is not present", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("keyboard functionality works to navigate and select items", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("emits expected event when user clicks to choose value", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("emits expected event when user uses enter or space key to choose value", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("does not render the calcite chip when count and average are not present", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("renders the calcite chip and the count span when count is present and average is not", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("renders the calcite chip and the average span when average is present and count is not", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
  it("renders the calcite chip and both the average and count spans when average and count are present", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-rating></calcite-rating>");
  });
});
