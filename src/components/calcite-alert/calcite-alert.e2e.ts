import { newE2EPage } from "@stencil/core/testing";

describe("calcite-alert", () => {
  it("renders with a close button and default props", async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <calcite-alert>
    <div slot="alert-title">Title Text</div>
    <div slot="alert-message">Message Text</div>
    <a slot="alert-link" href="">Action</a>
    </calcite-alert>`);

    const element = await page.find("calcite-alert");
    const close = await page.find("calcite-alert >>> .alert-close");
    const icon = await page.find("calcite-alert >>> .alert-icon");

    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("theme", "light");
    expect(close).not.toBeNull();
    expect(icon).toBeNull();
  });

  it("renders requested props with dismiss and no alert-link present", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert theme="dark" color="yellow" duration="fast" dismiss>
    <div slot="alert-title">Title Text</div>
    <div slot="alert-message">Message Text</div>
    </calcite-alert>`);

    const element = await page.find("calcite-alert");
    const close = await page.find("calcite-alert >>> .alert-close");
    const icon = await page.find("calcite-alert >>> .alert-icon");

    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "yellow");
    expect(element).toEqualAttribute("duration", "fast");
    expect(element).toEqualAttribute("theme", "dark");
    expect(close).toBeNull();
    expect(icon).toBeNull();
  });

  it("forces close button when dismiss and link are present", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert theme="dark" color="yellow" duration="fast" dismiss>
    <div slot="alert-title">Title Text</div>
    <div slot="alert-message">Message Text</div>
    <a slot="alert-link" href="">Action</a>
    </calcite-alert>`);

    const element = await page.find("calcite-alert");
    const close = await page.find("calcite-alert >>> .alert-close");
    const icon = await page.find("calcite-alert >>> .alert-icon");

    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "yellow");
    expect(element).toEqualAttribute("duration", "fast");
    expect(element).toEqualAttribute("theme", "dark");
    expect(close).not.toBeNull();
    expect(icon).toBeNull();
  });

  it("renders with an icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert icon>
    <div slot="alert-title">Title Text</div>
    <div slot="alert-message">Message Text</div>
    <a slot="alert-link" href="">Action</a>
    </calcite-alert>`);

    const element = await page.find("calcite-alert");
    const close = await page.find("calcite-alert >>> .alert-close");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(element).toHaveClass("hydrated");
    expect(close).not.toBeNull();
    expect(icon).not.toBeNull();
  });

  it("validates incorrect props and forces close button with dismiss and alert-link present", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert color="zip" duration="zot" theme="zat" dismiss>
    <div slot="alert-title">Title Text</div>
    <div slot="alert-message">Message Text</div>
    <a slot="alert-link" href="">Action</a>
    </calcite-alert>`);

    const element = await page.find("calcite-alert");
    const close = await page.find("calcite-alert >>> .alert-close");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("duration", "medium");
    expect(element).toEqualAttribute("theme", "light");
    expect(close).not.toBeNull();
    expect(icon).toBeNull();
  });

  it("validates incorrect props with dismiss and no alert-link", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert color="zip" duration="zot" theme="zat" dismiss>
    <div slot="alert-title">Title Text</div>
    <div slot="alert-message">Message Text</div>
    </calcite-alert>`);

    const element = await page.find("calcite-alert");
    const close = await page.find("calcite-alert >>> .alert-close");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("duration", "medium");
    expect(element).toEqualAttribute("theme", "light");
    expect(close).toBeNull();
    expect(icon).toBeNull();
  });

  it("validates incorrect props with close and icon", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-alert color="zip" duration="zot" theme="zat" icon>
    <div slot="alert-title">Title Text</div>
    <div slot="alert-message">Message Text</div>
    <a slot="alert-link" href="">Action</a>
    </calcite-alert>`);

    const element = await page.find("calcite-alert");
    const close = await page.find("calcite-alert >>> .alert-close");
    const icon = await page.find("calcite-alert >>> .alert-icon");
    expect(element).toHaveClass("hydrated");
    expect(element).toEqualAttribute("color", "blue");
    expect(element).toEqualAttribute("theme", "light");
    expect(element).not.toHaveAttribute("dismiss");
    expect(close).not.toBeNull();
    expect(icon).not.toBeNull();
  });
});
