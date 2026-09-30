/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as u } from "./helpers.js";
import { b as l, o as y, c as w, m as b } from "./utils3.js";
import { h as t } from "./formatting.js";
import { s as i } from "./index3.js";
import { A as k } from "./resources34.js";
import "./chip.js";
import "./icon.js";
import "./tile.js";
import "./tile-group.js";
const {
  alignment: m,
  scale: f
} = k, R = {
  title: "Components/Tiles/Tile",
  args: {
    active: !1,
    alignment: m.defaultValue,
    description: "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.",
    disabled: !1,
    embed: !1,
    heading: "Tile heading lorem ipsum",
    hidden: !1,
    href: "#",
    icon: "layer",
    scale: f.defaultValue,
    selected: !1
  },
  argTypes: {
    alignment: {
      options: m.values.filter((e) => e !== "end"),
      control: {
        type: "select"
      }
    },
    icon: {
      options: u,
      control: {
        type: "select"
      }
    },
    scale: {
      options: f.values,
      control: {
        type: "select"
      }
    }
  }
}, c = (e) => t`
  <calcite-tile
    ${l("active", e.active)}
    alignment="${e.alignment}"
    description="${e.description}"
    ${l("disabled", e.disabled)}
    ${l("embed", e.embed)}
    heading="${e.heading}"
    ${l("hidden", e.hidden)}
    href="${e.href}"
    ${y("icon", e.icon)}
    scale="${e.scale}"
    ${l("selected", e.selected)}
  >
  </calcite-tile>
`, n = () => t`
  <style>
    .container {
      display: flex;
      gap: 25px;
    }

    .scale-container {
      display: flex;
      flex-direction: column;
    }
  </style>
  <div class="container">
    <div class="scale-container">
      <h2>Small</h2>
      <calcite-tile-group scale="s" layout="vertical">
        <calcite-tile heading="No Heading Level" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 1" heading-level="1" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 2" heading-level="2" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 3" heading-level="3" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 4" heading-level="4" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 5" heading-level="5" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 6" heading-level="6" description="Description for item"></calcite-tile>
      </calcite-tile-group>
    </div>

    <div class="scale-container">
      <h2>Medium</h2>
      <calcite-tile-group scale="m" layout="vertical">
        <calcite-tile heading="No Heading Level" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 1" heading-level="1" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 2" heading-level="2" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 3" heading-level="3" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 4" heading-level="4" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 5" heading-level="5" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 6" heading-level="6" description="Description for item"></calcite-tile>
      </calcite-tile-group>
    </div>

    <div class="scale-container">
      <h2>Large</h2>
      <calcite-tile-group scale="l" layout="vertical">
        <calcite-tile heading="No Heading Level" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 1" heading-level="1" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 2" heading-level="2" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 3" heading-level="3" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 4" heading-level="4" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 5" heading-level="5" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 6" heading-level="6" description="Description for item"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>
`, o = () => t`
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
      --calcite-chip-background-color: #d8efda;
      --calcite-chip-text-color: #13631f;
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-top" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-top" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-top" />
      </calcite-tile>
    </div>
  </div>

  <!-- only content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">only content-bottom slot</div>

    <div class="child">
      <calcite-tile scale="s">
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-bottom" />
      </calcite-tile>
    </div>
  </div>

  <!-- only content-top and content-bottom slots -->
  <div class="parent">
    <div class="child right-aligned-text">only content-top and content-bottom slots</div>

    <div class="child">
      <calcite-tile scale="s">
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-top" />
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-top" />
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-top" />
        <img src="${i({
  width: 500,
  height: 500
})}" slot="content-bottom" />
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- content-top slot centered -->
  <div class="parent">
    <div class="child right-aligned-text">content-top slot centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- content-bottom slot centered-->
  <div class="parent">
    <div class="child right-aligned-text">content-bottom slot centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- link centered -->
  <div class="parent">
    <div class="child right-aligned-text">link centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>
`, a = () => t`
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
a.parameters = {
  themes: b
};
const r = () => t`
  <calcite-tile description="polygon layer" heading="Percent of population that carpool to work" icon="layers">
    <calcite-icon slot="content-top" icon="polygon"></calcite-icon>
    <calcite-icon slot="content-bottom" icon="launch"></calcite-icon>
  </calcite-tile>
`, s = () => t`
  <style>
    .slotted {
      display: inline-flex;
      justify-content: space-between;
    }
    .full-width {
      inline-size: 100%;
    }
  </style>
  <calcite-tile
    icon="rangefinder"
    heading="Field operator"
    description="This role allows users in the field to create new Reports, and view and edit existing Reports and Attachments"
  >
    <div slot="content-top" class="slotted full-width">
      <div>left side</div>
      <div>right side</div>
    </div>
    <div slot="content-bottom" class="slotted">
      <div>left side</div>
      <div>right side</div>
    </div>
  </calcite-tile>
`, d = () => t`
  <style>
    .slotted {
      display: inline-flex;
      justify-content: space-between;
    }
    .full-width {
      inline-size: 100%;
    }
  </style>
  <calcite-tile
    icon="rangefinder"
    heading="Field operator"
    description="This role allows users in the field to create new Reports, and view and edit existing Reports and Attachments"
  >
    <div slot="content-top" class="slotted">
      <div>left side</div>
      <div>right side</div>
    </div>
    <div slot="content-bottom" class="slotted full-width">
      <div>left side</div>
      <div>right side</div>
    </div>
  </calcite-tile>
`, h = () => t`
  <calcite-tile description="polygon layer" heading="Percent of population that carpool to work" dir="rtl">
    <calcite-icon scale="s" slot="content-top" icon="polygon"></calcite-icon>
    <calcite-icon scale="s" slot="content-bottom" icon="launch"></calcite-icon>
  </calcite-tile>
`, v = () => t`
  <calcite-tile
    icon="2d-explore"
    heading="Example long tile heading........................................................................................................................"
    description="Example tile description content........................................................................................................................................"
    style="width:200px"
  ></calcite-tile>
`, p = () => t`
  <calcite-tile
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    disabled
    heading="Tile heading lorem ipsum"
    icon="layer"
  >
  </calcite-tile>
`, g = () => w(t` <calcite-tile
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      scale="{scale}"
    ></calcite-tile>`);
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(args: TileStoryArgs): string => html\`
  <calcite-tile
    \${boolean("active", args.active)}
    alignment="\${args.alignment}"
    description="\${args.description}"
    \${boolean("disabled", args.disabled)}
    \${boolean("embed", args.embed)}
    heading="\${args.heading}"
    \${boolean("hidden", args.hidden)}
    href="\${args.href}"
    \${optionalAttribute("icon", args.icon)}
    scale="\${args.scale}"
    \${boolean("selected", args.selected)}
  >
  </calcite-tile>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      display: flex;
      gap: 25px;
    }

    .scale-container {
      display: flex;
      flex-direction: column;
    }
  </style>
  <div class="container">
    <div class="scale-container">
      <h2>Small</h2>
      <calcite-tile-group scale="s" layout="vertical">
        <calcite-tile heading="No Heading Level" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 1" heading-level="1" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 2" heading-level="2" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 3" heading-level="3" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 4" heading-level="4" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 5" heading-level="5" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 6" heading-level="6" description="Description for item"></calcite-tile>
      </calcite-tile-group>
    </div>

    <div class="scale-container">
      <h2>Medium</h2>
      <calcite-tile-group scale="m" layout="vertical">
        <calcite-tile heading="No Heading Level" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 1" heading-level="1" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 2" heading-level="2" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 3" heading-level="3" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 4" heading-level="4" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 5" heading-level="5" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 6" heading-level="6" description="Description for item"></calcite-tile>
      </calcite-tile-group>
    </div>

    <div class="scale-container">
      <h2>Large</h2>
      <calcite-tile-group scale="l" layout="vertical">
        <calcite-tile heading="No Heading Level" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 1" heading-level="1" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 2" heading-level="2" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 3" heading-level="3" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 4" heading-level="4" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 5" heading-level="5" description="Description for item"></calcite-tile>
        <calcite-tile heading="Heading Level = 6" heading-level="6" description="Description for item"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
      --calcite-chip-background-color: #d8efda;
      --calcite-chip-text-color: #13631f;
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-top" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-top" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-top" />
      </calcite-tile>
    </div>
  </div>

  <!-- only content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">only content-bottom slot</div>

    <div class="child">
      <calcite-tile scale="s">
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-bottom" />
      </calcite-tile>
    </div>
  </div>

  <!-- only content-top and content-bottom slots -->
  <div class="parent">
    <div class="child right-aligned-text">only content-top and content-bottom slots</div>

    <div class="child">
      <calcite-tile scale="s">
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-top" />
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-top" />
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-top" />
        <img src="\${placeholderImage({
  width: 500,
  height: 500
})}" slot="content-bottom" />
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- content-top slot centered -->
  <div class="parent">
    <div class="child right-aligned-text">content-top slot centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- content-bottom slot centered-->
  <div class="parent">
    <div class="child right-aligned-text">content-bottom slot centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- link centered -->
  <div class="parent">
    <div class="child right-aligned-text">link centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
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
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tile
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile heading lorem ipsum"
    href="#"
    icon="layer"
    class="calcite-mode-dark"
    dir="rtl"
  >
  </calcite-tile>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tile description="polygon layer" heading="Percent of population that carpool to work" icon="layers">
    <calcite-icon slot="content-top" icon="polygon"></calcite-icon>
    <calcite-icon slot="content-bottom" icon="launch"></calcite-icon>
  </calcite-tile>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .slotted {
      display: inline-flex;
      justify-content: space-between;
    }
    .full-width {
      inline-size: 100%;
    }
  </style>
  <calcite-tile
    icon="rangefinder"
    heading="Field operator"
    description="This role allows users in the field to create new Reports, and view and edit existing Reports and Attachments"
  >
    <div slot="content-top" class="slotted full-width">
      <div>left side</div>
      <div>right side</div>
    </div>
    <div slot="content-bottom" class="slotted">
      <div>left side</div>
      <div>right side</div>
    </div>
  </calcite-tile>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .slotted {
      display: inline-flex;
      justify-content: space-between;
    }
    .full-width {
      inline-size: 100%;
    }
  </style>
  <calcite-tile
    icon="rangefinder"
    heading="Field operator"
    description="This role allows users in the field to create new Reports, and view and edit existing Reports and Attachments"
  >
    <div slot="content-top" class="slotted">
      <div>left side</div>
      <div>right side</div>
    </div>
    <div slot="content-bottom" class="slotted full-width">
      <div>left side</div>
      <div>right side</div>
    </div>
  </calcite-tile>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tile description="polygon layer" heading="Percent of population that carpool to work" dir="rtl">
    <calcite-icon scale="s" slot="content-top" icon="polygon"></calcite-icon>
    <calcite-icon scale="s" slot="content-bottom" icon="launch"></calcite-icon>
  </calcite-tile>
\``,
      ...h.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tile
    icon="2d-explore"
    heading="Example long tile heading........................................................................................................................"
    description="Example tile description content........................................................................................................................................"
    style="width:200px"
  ></calcite-tile>
\``,
      ...v.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tile
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    disabled
    heading="Tile heading lorem ipsum"
    icon="layer"
  >
  </calcite-tile>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(html\` <calcite-tile
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      scale="{scale}"
    ></calcite-tile>\`)`,
      ...g.parameters?.docs?.source
    }
  }
};
const A = ["simple", "headingLevelAllScales", "allVariants", "darkModeRTL", "contentTopButton", "contentTopFullWidth", "contentBottomFullWidth", "contentStartRTL", "overflowingContent", "disabled", "widthSetToBreakpoints"];
export {
  A as __namedExportsOrder,
  o as allVariants,
  d as contentBottomFullWidth,
  h as contentStartRTL,
  r as contentTopButton,
  s as contentTopFullWidth,
  a as darkModeRTL,
  R as default,
  p as disabled,
  n as headingLevelAllScales,
  v as overflowingContent,
  c as simple,
  g as widthSetToBreakpoints
};
