import { newE2EPage } from "@stencil/core/testing";

describe("calcite-alert", () => {
  it("renders with a close button and default props", async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <calcite-alert id="alert">
    <div slot="alert-title">Title Text</div>
    <div slot="alert-message"Message Text</div>
    <a slot="alert-link" href="">Action</a>
    </calcite-alert>`);

    const element = await page.find("#alert");
    const closeButton = await page.find("#alert .alert-close");
    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("theme", "light");
    expect(closeButton);
  });
});

describe("calcite-alert", () => {
  it("renders requested props", async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <calcite-alert theme="dark" color="yellow" duration="fast" dismiss id="alert" >
    <div slot="alert-title">Title Text</div>
    <div slot="alert-message"Message Text</div>
    <a slot="alert-link" href="">Action</a>
    </calcite-alert>`);

    const element = await page.find("#alert");
    const closeButton = await page.find("#alert .alert-close");
    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "yellow");
    expect(element).toEqualAttribute("duration", "fast");
    expect(element).toEqualAttribute("theme", "dark");
    expect(closeButton).toBeNull();
  });
});

describe("calcite-alert", () => {
  it("validates incorrect props", async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <calcite-alert color="zip" duration="zot" theme="zat" dismiss id="alert">
    <div slot="alert-title">Title Text</div>
    <div slot="alert-message"Message Text</div>
    <a slot="alert-link" href="">Action</a>
    </calcite-alert>`);

    const element = await page.find("#alert");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("duration", "medium");
    expect(element).toEqualAttribute("theme", "light");
  });
});
