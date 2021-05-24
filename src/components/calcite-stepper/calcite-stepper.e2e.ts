import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

// todo test the automatic setting of first item to active
describe("calcite-stepper", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-stepper>
      <calcite-stepper-item item-title="Step 1" id="step-1">
        <div>Step 1 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 2" id="step-2">
        <div>Step 2 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 3" id="step-3">
        <div>Step 3 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 4" id="step-4">
        <div>Step 4 content</div>
      </calcite-stepper-item>
    </calcite-stepper>`);
    const element = await page.find("calcite-stepper");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-stepper>
      <calcite-stepper-item item-title="Step 1" id="step-1">
        <div>Step 1 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 2" id="step-2">
        <div>Step 2 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 3" id="step-3">
        <div>Step 3 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 4" id="step-4">
        <div>Step 4 content</div>
      </calcite-stepper-item>
    </calcite-stepper>`);
    const element = await page.find("calcite-stepper");
    expect(element).toEqualAttribute("layout", "horizontal");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).not.toHaveAttribute("numbered");
    expect(element).not.toHaveAttribute("icon");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-stepper layout="vertical" scale="l" numbered icon>
      <calcite-stepper-item item-title="Step 1" id="step-1">
        <div>Step 1 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 2" id="step-2">
        <div>Step 2 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 3" id="step-3">
        <div>Step 3 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 4" id="step-4">
        <div>Step 4 content</div>
      </calcite-stepper-item>
    </calcite-stepper>`);
    const element = await page.find("calcite-stepper");
    expect(element).toEqualAttribute("layout", "vertical");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toHaveAttribute("numbered");
    expect(element).toHaveAttribute("icon");
  });

  it("adds active attribute to requested item", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-stepper layout="vertical" scale="l" numbered icon>
      <calcite-stepper-item item-title="Step 1" id="step-1">
        <div>Step 1 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 2" id="step-2">
        <div>Step 2 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 3" id="step-3" active>
        <div>Step 3 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 4" id="step-4">
        <div>Step 4 content</div>
      </calcite-stepper-item>
    </calcite-stepper>`);
    const step1 = await page.find("#step-1");
    const step2 = await page.find("#step-2");
    const step3 = await page.find("#step-3");
    const step4 = await page.find("#step-4");
    expect(step1).not.toHaveAttribute("active");
    expect(step2).not.toHaveAttribute("active");
    expect(step3).toHaveAttribute("active");
    expect(step4).not.toHaveAttribute("active");
  });

  it("adds active attribute to first item if none are requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-stepper layout="vertical" scale="l" numbered icon>
      <calcite-stepper-item item-title="Step 1" id="step-1">
        <div>Step 1 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 2" id="step-2">
        <div>Step 2 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 3" id="step-3">
        <div>Step 3 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 4" id="step-4">
        <div>Step 4 content</div>
      </calcite-stepper-item>
    </calcite-stepper>`);
    const step1 = await page.find("#step-1");
    const step2 = await page.find("#step-2");
    const step3 = await page.find("#step-3");
    const step4 = await page.find("#step-4");
    expect(step1).toHaveAttribute("active");
    expect(step2).not.toHaveAttribute("active");
    expect(step3).not.toHaveAttribute("active");
    expect(step4).not.toHaveAttribute("active");
  });

  it("navigates correctly with nextStep and prevStep methods", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-stepper>
      <calcite-stepper-item item-title="Step 1" id="step-1">
        <div>Step 1 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 2" id="step-2" active>
        <div>Step 2 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 3" id="step-3">
        <div>Step 3 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item item-title="Step 4" id="step-4">
        <div>Step 4 content</div>
      </calcite-stepper-item>
    </calcite-stepper>`);
    const element = await page.find("calcite-stepper");
    const step1 = await page.find("#step-1");
    const step2 = await page.find("#step-2");
    const step3 = await page.find("#step-3");
    const step4 = await page.find("#step-4");
    expect(step1).not.toHaveAttribute("active");
    expect(step2).toHaveAttribute("active");
    expect(step3).not.toHaveAttribute("active");
    expect(step4).not.toHaveAttribute("active");
    await element.callMethod("nextStep");
    await page.waitForChanges();
    expect(step1).not.toHaveAttribute("active");
    expect(step2).not.toHaveAttribute("active");
    expect(step3).toHaveAttribute("active");
    expect(step4).not.toHaveAttribute("active");
    await element.callMethod("prevStep");
    await page.waitForChanges();
    expect(step1).not.toHaveAttribute("active");
    expect(step2).toHaveAttribute("active");
    expect(step3).not.toHaveAttribute("active");
    expect(step4).not.toHaveAttribute("active");
  });

  it("navigates correctly with startStep and endStep methods", async () => {
    const page = await newE2EPage();
    await page.setContent(`
  <calcite-stepper>
    <calcite-stepper-item item-title="Step 1" id="step-1">
      <div>Step 1 content</div>
    </calcite-stepper-item>
    <calcite-stepper-item item-title="Step 2" id="step-2">
      <div>Step 2 content</div>
    </calcite-stepper-item>
    <calcite-stepper-item item-title="Step 3" id="step-3">
      <div>Step 3 content</div>
    </calcite-stepper-item>
    <calcite-stepper-item item-title="Step 4" id="step-4">
      <div>Step 4 content</div>
    </calcite-stepper-item>
  </calcite-stepper>`);
    const element = await page.find("calcite-stepper");
    const step1 = await page.find("#step-1");
    const step2 = await page.find("#step-2");
    const step3 = await page.find("#step-3");
    const step4 = await page.find("#step-4");
    expect(step1).toHaveAttribute("active");
    expect(step2).not.toHaveAttribute("active");
    expect(step3).not.toHaveAttribute("active");
    expect(step4).not.toHaveAttribute("active");
    await element.callMethod("startStep");
    await page.waitForChanges();
    expect(step1).toHaveAttribute("active");
    expect(step2).not.toHaveAttribute("active");
    expect(step3).not.toHaveAttribute("active");
    expect(step4).not.toHaveAttribute("active");
    await element.callMethod("endStep");
    await page.waitForChanges();
    expect(step1).not.toHaveAttribute("active");
    expect(step2).not.toHaveAttribute("active");
    expect(step3).not.toHaveAttribute("active");
    expect(step4).toHaveAttribute("active");
  });
  it("navigates to requested step with goToStep method", async () => {
    const page = await newE2EPage();
    await page.setContent(`
  <calcite-stepper>
    <calcite-stepper-item item-title="Step 1" id="step-1">
      <div>Step 1 content</div>
    </calcite-stepper-item>
    <calcite-stepper-item item-title="Step 2" id="step-2">
      <div>Step 2 content</div>
    </calcite-stepper-item>
    <calcite-stepper-item item-title="Step 3" id="step-3">
      <div>Step 3 content</div>
    </calcite-stepper-item>
    <calcite-stepper-item item-title="Step 4" id="step-4">
      <div>Step 4 content</div>
    </calcite-stepper-item>
  </calcite-stepper>`);
    const element = await page.find("calcite-stepper");
    const step1 = await page.find("#step-1");
    const step2 = await page.find("#step-2");
    const step3 = await page.find("#step-3");
    const step4 = await page.find("#step-4");
    expect(step1).toHaveAttribute("active");
    expect(step2).not.toHaveAttribute("active");
    expect(step3).not.toHaveAttribute("active");
    expect(step4).not.toHaveAttribute("active");
    await element.callMethod("goToStep", 4);
    await page.waitForChanges();
    expect(step1).not.toHaveAttribute("active");
    expect(step2).not.toHaveAttribute("active");
    expect(step3).not.toHaveAttribute("active");
    expect(step4).toHaveAttribute("active");
    await element.callMethod("goToStep", 2);
    await page.waitForChanges();
    expect(step1).not.toHaveAttribute("active");
    expect(step2).toHaveAttribute("active");
    expect(step3).not.toHaveAttribute("active");
    expect(step4).not.toHaveAttribute("active");
  });
});
