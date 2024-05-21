import { iconNames } from "../../../.storybook/helpers";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { scale } = ATTRIBUTES;
interface TileArgs {
  active: boolean;
  description: string;
  disabled: boolean;
  heading: string;
  hidden: boolean;
  href: string;
  icon: string;
  scale: string;
}

export default {
  title: "Components/Tiles/Tile",
  args: {
    active: false,
    description:
      "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.",
    disabled: false,
    heading: "Tile heading lorem ipsum",
    hidden: false,
    href: "#",
    icon: "layer",
    scale: scale.defaultValue,
  },
  argTypes: {
    icon: {
      options: iconNames,
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: TileArgs): string => html`
  <calcite-tile
    ${args.active ? "active" : ""}
    description="${args.description}"
    ${args.disabled ? "disabled" : ""}
    heading="${args.heading}"
    ${args.hidden ? "hidden" : ""}
    href="${args.href}"
    icon="${args.icon}"
    scale="${args.scale}"
  >
  </calcite-tile>
`;

export const allVariants = (): string => html`
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

    hr {
      margin: 25px 0;
      border-top: 1px solid var(--calcite-color-border-2);
    }
    calcite-chip.new {
      background-color: #d8efda;
      color: #13631f;
    }
  </style>
  <div class="parent">
    <div class="child right-aligned-text">scale</div>
    <div class="child">small</div>
    <div class="child">medium</div>
    <div class="child">large</div>
  </div>

  <!-- heading only -->
  <div class="parent">
    <div class="child right-aligned-text">heading only</div>

    <div class="child">
      <calcite-tile heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- heading only with link -->
  <div class="parent">
    <div class="child right-aligned-text">heading only with link</div>

    <div class="child">
      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- basic -->
  <div class="parent">
    <div class="child right-aligned-text">basic</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- link -->
  <div class="parent">
    <div class="child right-aligned-text">link</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- large visual -->
  <div class="parent">
    <div class="child right-aligned-text">large visual</div>

    <div class="child">
      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- link large visual -->
  <div class="parent">
    <div class="child right-aligned-text">link large visual</div>

    <div class="child">
      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- content-top slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-top slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-bottom slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-top slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-top slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-bottom slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- only content-top slot -->
  <div class="parent">
    <div class="child right-aligned-text">only content-top slot</div>

    <div class="child">
      <calcite-tile scale="s">
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
      </calcite-tile>
    </div>
  </div>

  <!-- only content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">only content-bottom slot</div>

    <div class="child">
      <calcite-tile scale="s">
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
      </calcite-tile>
    </div>
  </div>

  <!-- only content-top and content-bottom slots -->
  <div class="parent">
    <div class="child right-aligned-text">only content-top and content-bottom slots</div>

    <div class="child">
      <calcite-tile scale="s">
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-top" />
        <img src="${placeholderImage({ width: 500, height: 500 })}" slot="content-bottom" />
      </calcite-tile>
    </div>
  </div>

  <!-- content-start slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-start slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-start slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-start slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- content-end slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-end slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-end slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-end slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- content-start & content-end slots -->
  <div class="parent">
    <div class="child right-aligned-text">content-start & content-end slots (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-start & content-end slots -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-start & content-end slots (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <hr />

  <!-- heading only centered -->
  <div class="parent">
    <div class="child right-aligned-text">heading only centered</div>

    <div class="child">
      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- heading only with link centered -->
  <div class="parent">
    <div class="child right-aligned-text">heading only with link centered</div>

    <div class="child">
      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- basic centered -->
  <div class="parent">
    <div class="child right-aligned-text">basic centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        mode="dark"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- link centered -->
  <div class="parent">
    <div class="child right-aligned-text">link centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- content-start & content-end slot centered (deprecated) -->
  <div class="parent">
    <div class="child right-aligned-text">content-start & content-end slot centered (deprecated)</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-start & content-end slot centered (deprecated) -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-start & content-end slot centered (deprecated)</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-tile
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile heading lorem ipsum"
    href="#"
    icon="layer"
    class="calcite-mode-dark"
    dir="rtl"
  >
  </calcite-tile>
`;
darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const contentTopBotton_TestOnly = (): string => html`
  <calcite-tile description="polygon layer" heading="Percent of population that carpool to work" icon="layers">
    <calcite-icon slot="content-top" icon="polygon"></calcite-icon>
    <calcite-icon slot="content-bottom" icon="launch"></calcite-icon>
  </calcite-tile>
`;

export const contentStartRTL_TestOnly = (): string => html`
  <calcite-tile description="polygon layer" heading="Percent of population that carpool to work" dir="rtl">
    <calcite-icon scale="s" slot="content-start" icon="polygon"></calcite-icon>
    <calcite-icon scale="s" slot="content-end" icon="launch"></calcite-icon>
  </calcite-tile>
`;

export const overflowingContent_TestOnly = (): string => html`
  <calcite-tile
    icon="2d-explore"
    heading="Example tile headinghfjkdlsahfjklsdahfjklsadhfjkldsahfjldkashfjdkalshfds;ahfjkldshafljkdsahfljksdahfdlsajkfhsadkljfhsdajklfhsdalkjfhdsalkjfhdsalf"
    description="Example tile description contenthfjdkslahfjkdsalhf sdajklfh ksdjahfljksadhfljkdsahfjklsdahfjlkdsahflkjdsahfjkdsahflkdjsahfldksajhfdsklajhfdsljkahfdsajkfhsadlkjfsadhfdsa"
    style="width:200px"
  ></calcite-tile>
`;

export const disabled_TestOnly = (): string => html`
  <calcite-tile
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    disabled
    heading="Tile heading lorem ipsum"
    icon="layer"
  >
  </calcite-tile>
`;

export const widthSetToBreakpoints_TestOnly = (): string =>
  createBreakpointStories(
    html` <calcite-tile
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      scale="{scale}"
    ></calcite-tile>`,
  );
