import { newE2EPage } from "@stencil/core/testing";

describe("my-component", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<my-component></my-component>");
    const element = await page.find("my-component");
    expect(element).toHaveClass("hydrated");
  });

  it.skip("has a default color", async () => {});

  it.skip("emits color selection change", async () => {});

  it.skip("uses local storage to keep colors", async () => {});

  it.skip("uses local storage to keep colors", async () => {});
});
