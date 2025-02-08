import { boolean } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { TileGroup } from "./tile-group";

const { dir, layout, scale } = ATTRIBUTES;

interface TileGroupStoryArgs extends Pick<TileGroup, "disabled" | "layout" | "scale"> {
  dir: string;
}

export default {
  title: "Components/Tiles/Tile Group",
  args: {
    dir: dir.defaultValue,
    disabled: false,
    layout: layout.defaultValue,
    scale: scale.defaultValue,
  },
  argTypes: {
    dir: {
      options: dir.values,
      control: { type: "select" },
    },
    layout: {
      options: layout.values.filter(
        (option) =>
          option !== "grid" &&
          option !== "inline" &&
          option !== "center" &&
          option !== "auto" &&
          option !== "fixed" &&
          option !== "none" &&
          option !== "horizontal-single",
      ),
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: { delay: 10000, viewports: [1728] },
  },
};

export const simple = (args: TileGroupStoryArgs): string => html`
  <calcite-tile-group
    dir="${args.dir}"
    ${boolean("disabled", args.disabled)}
    layout="${args.layout}"
    scale="${args.scale}"
  >
    <calcite-tile
      heading="Tile heading lorem ipsum"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      icon="layers"
    ></calcite-tile>
    <calcite-tile
      heading="Tile heading lorem ipsum"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
      icon="layers"
    ></calcite-tile>
    <calcite-tile
      heading="Tile heading lorem ipsum"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      icon="layers"
    ></calcite-tile>
    <calcite-tile
      heading="Tile heading lorem ipsum"
      description="Iterative approaches to corporate strategy foster collab."
      icon="layers"
    ></calcite-tile>
  </calcite-tile-group>
`;

export const allVariantsHorizontal = (): string => html`
  <style>
    .parent {
      display: flex;
      color: var(--calcite-color-text-3);
      font-family: var(--calcite-sans-family);
      font-size: var(--calcite-font-size-0);
      font-weight: var(--calcite-font-weight-medium);
    }

    .child {
      display: inline-flex;
      flex-direction: column;
      flex: 0 1 50%;
      padding: 15px;
    }

    .right-aligned-text {
      text-align: right;
      flex: 0 0 21%;
    }

    .screenshot-test {
      gap: 1em;
      padding: 0 1em;
    }

    .spaced-column {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    hr {
      margin: 25px 0;
      border-top: 1px solid var(--calcite-color-border-2);
    }
  </style>

  <!-- screenshot test area -->
  <div class="screenshot-test parent">
    <div class="spaced-column">
      <span>single</span>
      <calcite-tile-group scale="s" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="m" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="l" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="spaced-column">
      <span>multiple</span>
      <calcite-tile-group scale="s" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="m" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="l" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="spaced-column">
      <span>none</span>
      <calcite-tile-group scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="m">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- horizontal -->
  <div class="parent">
    <div class="child right-aligned-text"><h2>horizontal</h2></div>
  </div>

  <div class="parent">
    <div class="child"></div>
    <div class="child">small</div>
    <div class="child">medium</div>
    <div class="child">large</div>
  </div>

  <!-- single selection-appearance="border" -->
  <div class="parent">
    <div class="child right-aligned-text">single selection-appearance="border"</div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="single" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="single" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- multiple selection-appearance="border" -->
  <div class="parent">
    <div class="child right-aligned-text">multiple selection-appearance="border"</div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="multiple" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="multiple" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- single-persist -->
  <div class="parent">
    <div class="child right-aligned-text">single-persist</div>
    <div class="child">
      <calcite-tile-group selection-mode="single-persist" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-mode="single-persist">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-mode="single-persist" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- none -->
  <div class="parent">
    <div class="child right-aligned-text">none</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- center alignment -->
  <div class="parent">
    <div class="child right-aligned-text">center alignment</div>
    <div class="child">
      <calcite-tile-group alignment="center" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" scale="s" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" scale="s" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group alignment="center">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group alignment="center" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" scale="l" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" scale="l" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- links -->
  <div class="parent">
    <div class="child right-aligned-text">links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- disabled -->
  <div class="parent">
    <div class="child right-aligned-text">disabled</div>
    <div class="child">
      <calcite-tile-group scale="s" disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l" disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- disabled links -->
  <div class="parent">
    <div class="child right-aligned-text">disabled links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading -->
  <div class="parent">
    <div class="child right-aligned-text">heading</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading links -->
  <div class="parent">
    <div class="child right-aligned-text">heading links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- description -->
  <div class="parent">
    <div class="child right-aligned-text">description</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- description links -->
  <div class="parent">
    <div class="child right-aligned-text">description links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading and description -->
  <div class="parent">
    <div class="child right-aligned-text">heading and description</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading and description links -->
  <div class="parent">
    <div class="child right-aligned-text">heading and description links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- icon and heading (large visual) -->
  <div class="parent">
    <div class="child right-aligned-text">icon and heading (large visual)</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- icon and heading (large visual) links -->
  <div class="parent">
    <div class="child right-aligned-text">icon and heading (large visual) links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- content-top slotted images -->
  <div class="parent">
    <div class="child right-aligned-text">content-top slotted images</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- content-bottom slotted images -->
  <div class="parent">
    <div class="child right-aligned-text">content-bottom slotted images</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- slotted images in both slots -->
  <div class="parent">
    <div class="child right-aligned-text">slotted images in both slots</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
          <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
  </div>
`;

export const allVariantsVertical = (): string => html`
  <style>
    .parent {
      display: flex;
      color: var(--calcite-color-text-3);
      font-family: var(--calcite-sans-family);
      font-size: var(--calcite-font-size-0);
      font-weight: var(--calcite-font-weight-medium);
    }

    .child {
      display: inline-flex;
      flex-direction: column;
      flex: 0 1 50%;
      padding: 15px;
    }

    .right-aligned-text {
      text-align: right;
      flex: 0 0 21%;
    }

    .screenshot-test {
      gap: 1em;
      padding: 0 1em;
    }

    .spaced-column {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    hr {
      margin: 25px 0;
      border-top: 1px solid var(--calcite-color-border-2);
    }
  </style>

  <!-- Vertical -->
  <div class="parent">
    <div class="child right-aligned-text"><h2>vertical</h2></div>
  </div>

  <div class="parent">
    <div class="child"></div>
    <div class="child">small</div>
    <div class="child">medium</div>
    <div class="child">large</div>
  </div>

  <!-- single -->
  <div class="parent">
    <div class="child right-aligned-text">single</div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- single selection-appearance="border" -->
  <div class="parent">
    <div class="child right-aligned-text">single selection-appearance="border"</div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-appearance="border" selection-mode="single" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-appearance="border" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-appearance="border" selection-mode="single" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- multiple -->
  <div class="parent">
    <div class="child right-aligned-text">multiple</div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="multiple" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="multiple" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- single-persist -->
  <div class="parent">
    <div class="child right-aligned-text">single-persist</div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single-persist" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single-persist">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single-persist" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- none -->
  <div class="parent">
    <div class="child right-aligned-text">none</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- links -->
  <div class="parent">
    <div class="child right-aligned-text">links</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- disabled -->
  <div class="parent">
    <div class="child right-aligned-text">disabled</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s" disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l" disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading -->
  <div class="parent">
    <div class="child right-aligned-text">heading</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading links -->
  <div class="parent">
    <div class="child right-aligned-text">heading links</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- description -->
  <div class="parent">
    <div class="child right-aligned-text">description</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- description links -->
  <div class="parent">
    <div class="child right-aligned-text">description links</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading and description -->
  <div class="parent">
    <div class="child right-aligned-text">heading and description</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading and description links -->
  <div class="parent">
    <div class="child right-aligned-text">heading and description links</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- icon and heading (large visual) -->
  <div class="parent">
    <div class="child right-aligned-text">icon and heading (large visual)</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- icon and heading (large visual) links -->
  <div class="parent">
    <div class="child right-aligned-text">icon and heading (large visual) links</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>
`;
