import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { within } from "shadow-dom-testing-library";
import { waitFor, expect } from "storybook/test";
const meta: Meta = {
  title: "Components/TabNav",
};

export default meta;

const waitForScrollEnd = (container: HTMLElement): Promise<void> =>
  new Promise((resolve) => {
    const handleScrollEnd = () => {
      container.removeEventListener("scrollend", handleScrollEnd);
      resolve();
    };

    container.addEventListener("scrollend", handleScrollEnd);
  });

export const slottedTabTilesInNarrowLayout: StoryObj = {
  render: () => `<calcite-tab-nav layout="center" style="width: 200px">
      <calcite-tab-title id="1" tabindex="0" selected="" layout="center">Body začátku a konce</calcite-tab-title>
      <calcite-tab-title id="2" tabindex="-1" layout="center">Časový interval</calcite-tab-title>
      <calcite-tab-title tabindex="-1" layout="center">Přehrávání</calcite-tab-title>
    </calcite-tab-nav>`,
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement);
    const container = await canvas.findByShadowTestId("tab-title-container");
    const nextButton = await canvas.findByShadowLabelText("Next tab titles");

    await step("Wait for firs tab title to render", async () => {
      const scrollEndPromise = waitForScrollEnd(container);
      expect(await waitFor(() => canvas.findByShadowText("Body začátku a konce"))).toBeInTheDocument();
      await scrollEndPromise;
    });
    await step("Click the next button", async () => {
      const scrollEndPromise = waitForScrollEnd(container);
      await userEvent.click(nextButton);
      await scrollEndPromise;
    });
    await step("Click the next button to scroll to the second title", async () => {
      const scrollEndPromise = waitForScrollEnd(container);
      await userEvent.click(nextButton);
      await scrollEndPromise;
    });
    await step("Click the next button to scroll to the end", async () => {
      const scrollEndPromise = waitForScrollEnd(container);
      await userEvent.click(nextButton);
      await scrollEndPromise;
    });
  },
};
