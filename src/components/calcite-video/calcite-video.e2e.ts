import { newE2EPage } from "@stencil/core/testing";
import { renders } from "../../tests/commonTests";

describe("calcite-accordion-item", () => {
  it("renders", async () => renders("calcite-accordion-item"));
});

it("renders requested props", async () => {
  const page = await newE2EPage();
  await page.setContent(`<calcite-video theme="dark"></calcite-video>`);

  const element = await page.find("calcite-video");
  expect(element).toEqualAttribute("theme", "dark");
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
