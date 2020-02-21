import { newE2EPage } from "@stencil/core/testing";

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
    expect(element).toHaveClass("hydrated");
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
    expect(element).toEqualAttribute("theme", "light");
    expect(element).not.toHaveAttribute("numbered");
    expect(element).not.toHaveAttribute("icon");
  });

  it("renders default props when invalid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-stepper layout="zot" scale="zip" theme="zat" numbered="zom" icon="zar">
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
    expect(element).toEqualAttribute("theme", "light");
    expect(element).toEqualAttribute("numbered", "");
    expect(element).toEqualAttribute("icon", "");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-stepper layout="vertical" scale="l" theme="dark" numbered icon>
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
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toHaveAttribute("numbered");
    expect(element).toHaveAttribute("icon");
  });

  // renders active item based on attribute in dom
  // renders and adds active attribute to first item if none are requested
  // when horizontal, the content container div contains the contents of the requested step
  // when vertical, the content container in the requested step is visible
  // it accurately prevents navigating to a disabled step (prev or next) with keys or click (or methods?)
  // it accurately moves to the correct position with goto
  // it accurately moves to the correct position with first step
  // it accurately moves to the correct position with next step
  // it accurately moves to the correct position with last step
  // it accurately moves to the correct position with end step
});
