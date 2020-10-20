import { newE2EPage } from "@stencil/core/testing";
import { renders, hidden, accessible } from "../../tests/commonTests";

describe("calcite-combobox", () => {
  it("renders", async () => renders("calcite-video"));
  it("honors hidden attribute", async () => hidden("calcite-video"));
  it("is accessible", async () =>
    accessible(`
      <calcite-video></calcite-video>
  `));

  it("does something", async () => {
    const page = await newE2EPage();

    await page.setContent(` <calcite-video></calcite-video>`);
  });
});

// scrubbing works (check updated time val)?
// pause / play works
// fullscreen works enter and exit
// play on hover / focus works
// space on scrubber pauses video
// playing another video pauses playing video
// loading shows until ready state is good to go
// volume levels work
// changing subtitle track work
