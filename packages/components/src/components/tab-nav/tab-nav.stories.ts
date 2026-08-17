import type { Meta, StoryObj } from "@storybook/web-components-vite";

const meta: Meta = {
  title: "Components/TabNav",
};

export default meta;

export const slottedTabTilesInNarrowLayout: StoryObj = {
  render: () => `<calcite-tab-nav layout="center" style="width: 200px">
      <calcite-tab-title id="1" tabindex="0" selected="" layout="center">Body začátku a konce</calcite-tab-title>
      <calcite-tab-title id="2" tabindex="-1" layout="center">Časový interval</calcite-tab-title>
      <calcite-tab-title tabindex="-1" layout="center">Přehrávání</calcite-tab-title>
    </calcite-tab-nav>`,
  play: async ({ canvas, userEvent, step }) => {
    const nextButton = await canvas.findByShadowLabelText("Next tab titles");
    await step("Click the next button", async () => {
      await userEvent.click(nextButton);
    });
    await step("Click the next button again", async () => {
      await userEvent.click(nextButton);
    });
    await step("Click the next button to scroll to the end", async () => {
      await userEvent.click(nextButton);
    });
  },
};
