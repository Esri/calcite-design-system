import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { Typography } from "./typography";
import type { StoryContext } from "@storybook/web-components-vite";

type TypographyStoryArgs = Pick<Typography, "maxLines" | "tooltipEnabled" | "truncatePosition"> & {
  text: string;
  containerWidth: number;
};

export default {
  title: "Components/Typography",
  args: {
    containerWidth: 200,
  },
  argTypes: {
    containerWidth: {
      control: { type: "number" },
    },
  },
  decorators: [
    (story: () => string, context: StoryContext): string => {
      const { containerWidth } = context.args;
      if (context.parameters.disableDecorators) {
        return story();
      }
      return html`
        <div style="width: ${containerWidth}px; border: 1px solid var(--calcite-color-border-3); padding: 8px;">
          ${story()}
        </div>
      `;
    },
  ],
};

export const simple = (args: TypographyStoryArgs): string => html`
  <calcite-typography
    truncate-position="${args.truncatePosition}"
    max-lines="${args.maxLines}"
    ${boolean("tooltip-enabled", args.tooltipEnabled)}
    >The Rocky Mountain range spans multiple states and includes several major peaks and protected
    ecosystems.</calcite-typography
  >
`;

simple.args = {
  maxLines: 1,
  tooltipEnabled: false,
  truncatePosition: "end",
};

simple.argTypes = {
  truncatePosition: {
    options: ["end", "middle"],
    control: { type: "select" },
  },
  maxLines: {
    control: { type: "number" },
  },
};

export const middleTruncation = (): string => html`
  <calcite-typography truncate-position="middle" max-lines="0">
    https://example.com/trails/north-america/rocky-mountains/alpine-lakes-route
  </calcite-typography>
`;

export const endTruncationMultiLine = (): string => html`
  <calcite-typography max-lines="2">
    The Mississippi River is one of the world&apos;s major river systems and drains much of the central United States.
  </calcite-typography>
`;

export const tooltipEnabled = (): string => html`
  <calcite-typography tooltip-enabled max-lines="1" truncate-position="middle">
    Andes-Mountain-Observatory-Annual-Climate-Report-Archive-2026
  </calcite-typography>
`;

export const truncationSandBox = (): string => html`
  <style>
    calcite-chip {
      max-width: 500px;
    }
    calcite-tab-title {
      max-width: 100px;
    }
    .container {
      display: flex;
      flex-direction: row;
      width: 250px;
    }
    .button-container {
      display: flex;
      flex-direction: row;
    }
    .dropdown-container,
    calcite-dropdown,
    calcite-button,
    calcite-dropdown-item {
      overflow: hidden;
    }
  </style>
  <calcite-button width="half">
    <calcite-typography wrap>
      This is a long placeholder paragraph written in plain English for drafts, mockups, and early content planning. It
      is designed to look natural on the page while remaining generic enough to replace later with final copy. Teams
      often use text like this to check spacing, hierarchy, alignment, and overall reading flow before real messaging is
      approved. Because the language is neutral and broadly understandable, it works well across landing pages, internal
      tools, product cards, help content, and presentation materials where realistic line length
      matters.</calcite-typography
    >
  </calcite-button>
  <calcite-chip-group label="demo-group-label">
    <calcite-chip value="biome-a" label="Biome A">
      <calcite-typography>
        This is a long placeholder paragraph written in plain English for drafts, mockups, and early content planning.
        It is designed to look natural on the page while remaining generic enough to replace later with final copy.
        Teams often use text like this to check spacing, hierarchy, alignment, and overall reading flow before real
        messaging is approved. Because the language is neutral and broadly understandable, it works well across landing
        pages, internal tools, product cards, help content, and presentation materials where realistic line length
        matters.
      </calcite-typography></calcite-chip
    >
    <calcite-chip value="biome-b" label="Biome B">Biome B</calcite-chip>
    <calcite-chip value="biome-d" label="Biome C">Biome C</calcite-chip>
    <calcite-chip value="biome-d" label="Biome D">Biome D</calcite-chip>
    <calcite-chip value="biome-e" label="Biome E">Biome E</calcite-chip>
  </calcite-chip-group>

  <calcite-tabs>
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title
        ><calcite-typography
          >This is a long placeholder paragraph written in plain English for drafts, mockups, and early content
          planning. It is designed to look natural on the page while remaining generic enough to replace later with
          final copy. Teams often use text like this to check spacing, hierarchy, alignment, and overall reading flow
          before real messaging is approved. Because the language is neutral and broadly understandable, it works well
          across landing pages, internal tools, product cards, help content, and presentation materials where realistic
          line length matters.</calcite-typography
        >
      </calcite-tab-title>
      <calcite-tab-title>Automobiles</calcite-tab-title>
      <calcite-tab-title>Aircraft</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected>
      <calcite-notice icon="embark" open>
        <div slot="message">Recommended for coastal use</div>
      </calcite-notice>
    </calcite-tab>
    <calcite-tab>
      <calcite-notice icon="car" open>
        <div slot="message">A good choice for inland adventure</div>
      </calcite-notice>
    </calcite-tab>
    <calcite-tab>
      <calcite-notice icon="plane" open>
        <div slot="message">Cross continents quickly</div>
      </calcite-notice>
    </calcite-tab>
  </calcite-tabs>
  <div class="container">
    <div class="dropdown-container"></div>
    <calcite-dropdown width="m">
      <calcite-button slot="trigger" icon-end="chevron-down"
        ><calcite-typography>Select land from the list</calcite-typography></calcite-button
      >
      <calcite-dropdown-group group-title="Natural places">
        <calcite-dropdown-item>Mountain</calcite-dropdown-item>
        <calcite-dropdown-item>River</calcite-dropdown-item>
        <calcite-dropdown-item>Waterfall</calcite-dropdown-item>
        <calcite-dropdown-item>Rainforest</calcite-dropdown-item>
        <calcite-dropdown-item>Tundra</calcite-dropdown-item>
        <calcite-dropdown-item>Desert</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
    <div class="button-container">
      <calcite-button icon-end="banana"></calcite-button>
      <calcite-button icon-end="banana"></calcite-button>
      <calcite-button icon-end="banana"></calcite-button>
    </div>
    <calcite-dropdown width="m" class="dropdown">
      <calcite-button slot="trigger">Select landform</calcite-button>
      <calcite-dropdown-group group-title="Natural places">
        <calcite-dropdown-item
          ><calcite-typography>MountainWithAVeryLongTranslationString</calcite-typography></calcite-dropdown-item
        >
        <calcite-dropdown-item>River</calcite-dropdown-item>
        <calcite-dropdown-item>Waterfall</calcite-dropdown-item>
        <calcite-dropdown-item>Rainforest</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`;
truncationSandBox.parameters = {
  disableDecorators: true,
};
