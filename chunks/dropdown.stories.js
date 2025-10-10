import { h as e, k as _, j as C } from "./index.js";
import { m as $, d as o } from "./floating-ui.js";
import { A as P } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var x = Object.freeze, R = Object.defineProperty, B = (t, G) => x(R(t, "raw", { value: x(t.slice()) })), M;
const {
  scale: l,
  clickType: A,
  selectionMode: L
} = P, W = {
  title: "Components/Buttons/Dropdown",
  args: {
    placement: o,
    scale: l.defaultValue,
    widthScale: l.defaultValue,
    type: A.defaultValue,
    closeOnSelectDisabled: !1,
    disabled: !1,
    selectionMode: L.values[0]
  },
  argTypes: {
    placement: {
      options: $,
      control: {
        type: "select"
      }
    },
    scale: {
      options: l.values,
      control: {
        type: "select"
      }
    },
    widthScale: {
      options: l.values,
      control: {
        type: "select"
      }
    },
    type: {
      options: A.values,
      control: {
        type: "select"
      }
    },
    selectionMode: {
      options: L.values.filter((t) => t !== "children" && t !== "single-persist" && t !== "multichildren" && t !== "ancestors"),
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 500
    }
  }
}, a = (t) => e`
  <calcite-dropdown
    open
    placement="${t.placement}"
    scale="${t.scale}"
    width-scale="${t.widthScale}"
    type="${t.type}"
    ${_("close-on-select-disabled", t.closeOnSelectDisabled)}
    ${_("disabled", t.disabled)}
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="${t.selectionMode}" group-title="Sort by">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`, c = () => e`
  <calcite-dropdown open>
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Sort by">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;
c.parameters = {
  chromatic: {
    viewports: [300, 300]
  }
};
const p = () => e`
  <calcite-dropdown open placement="${o}" scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Sort by">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`, w = () => e`
  <div style="width: 500px;">
    <calcite-dropdown
      style="width:100%"
      open
      placement="${o}"
      scale="m"
      width-scale="m"
      type="click"
    >
      <calcite-button width="full" slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="single" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`, m = () => e`
  <calcite-dropdown open placement="${o}" scale="m" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Icon Start">
      <calcite-dropdown-item icon-start="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group selection-mode="single" group-title="Icon End">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group selection-mode="single" group-title="Icon Both">
      <calcite-dropdown-item icon-start="list" icon-end="data-check">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" icon-end="data-check" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table" icon-end="data-check">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`, s = () => e`
  <calcite-dropdown open placement="${o}" scale="m" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Select one">
      <calcite-dropdown-item>Apple</calcite-dropdown-item>
      <calcite-dropdown-item selected>Orange</calcite-dropdown-item>
      <calcite-dropdown-item>Grape</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select multi" selection-mode="multiple">
      <calcite-dropdown-item>Asparagus</calcite-dropdown-item>
      <calcite-dropdown-item selected>Potato</calcite-dropdown-item>
      <calcite-dropdown-item selected>Yam</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
      <calcite-dropdown-item>Plant beans</calcite-dropdown-item>
      <calcite-dropdown-item>Add peas</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`, g = () => e`
  <calcite-dropdown open placement="${o}" scale="m" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="none" group-title="Select one">
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Throw Apples</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Visit Oranges</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Eat Grapes</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-start="camera-flash-on"
        >Plant beans</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-end="camera-flash-on"
        >Add peas</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
`, i = () => e`
  <calcite-dropdown
    dir="rtl"
    open
    class="calcite-mode-dark"
    placement="${o}"
    scale="m"
    width-scale="m"
    type="click"
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Select one">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select multi" selection-mode="multiple">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
`;
i.parameters = {
  themes: C
};
const d = () => e`
  <calcite-dropdown
    open
    class="calcite-mode-dark"
    placement="${o}"
    scale="m"
    width-scale="m"
    type="click"
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="none" group-title="Select one">
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Throw Apples</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Visit Oranges</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Eat Grapes</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-start="camera-flash-on"
        >Plant beans</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-end="camera-flash-on"
        >Add peas</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
`;
d.parameters = {
  themes: C
};
const n = () => e`
  <!-- we use large scale to test max viewport height-->
  <calcite-dropdown open placement="${o}" max-items="7" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Third group">
      <calcite-dropdown-item>11</calcite-dropdown-item>
      <calcite-dropdown-item>12</calcite-dropdown-item>
      <calcite-dropdown-item>13</calcite-dropdown-item>
      <calcite-dropdown-item>14</calcite-dropdown-item>
      <calcite-dropdown-item>15</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;
n.parameters = {
  chromatic: {
    delay: 1500
  }
};
const u = () => e`
  <!-- we use large scale to test max viewport height-->
  <calcite-dropdown open>
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Sort by">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Third group">
      <calcite-dropdown-item>11</calcite-dropdown-item>
      <calcite-dropdown-item>12</calcite-dropdown-item>
      <calcite-dropdown-item>13</calcite-dropdown-item>
      <calcite-dropdown-item>14</calcite-dropdown-item>
      <calcite-dropdown-item>15</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`, b = () => e` <calcite-dropdown max-items="3" open>
    <calcite-button slot="trigger">Activate Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Selection Mode: Single">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>`, h = () => e`
  <calcite-dropdown disabled>
    <calcite-button slot="trigger">Disabled dropdown</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>

  <calcite-dropdown open>
    <calcite-button slot="trigger">Disabled dropdown items</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item disabled>2</calcite-dropdown-item>
      <calcite-dropdown-item disabled>3</calcite-dropdown-item>
      <calcite-dropdown-item disabled>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`, r = () => e`
  <div style="margin:10px;">
    <calcite-dropdown width-scale="m" placement="top" open>
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group>
        <calcite-dropdown-item>1</calcite-dropdown-item>
        <calcite-dropdown-item>2</calcite-dropdown-item>
        <calcite-dropdown-item>3</calcite-dropdown-item>
        <calcite-dropdown-item>4</calcite-dropdown-item>
        <calcite-dropdown-item>5</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`;
r.parameters = {
  layout: "fullscreen"
};
const y = () => e`
  <div style="text-align:center">
    <calcite-dropdown open placement="${o}" scale="m" width-scale="m" type="click">
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="single" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`, f = () => e`
  <div dir="rtl" style="text-align:center">
    <calcite-dropdown open placement="${o}" scale="m" width-scale="m" type="click">
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="single" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`, v = () => e(M || (M = B([`
  <style>
    .my-dropdown {
      margin-top: 50px;
    }
  </style>
  <style>
    .my-dropdown {
      margin-top: 50px;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <calcite-dropdown class="my-dropdown" open>
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
  <script>
    document.querySelector(".my-dropdown").flipPlacements = ["right"];
  <\/script>
`]))), T = () => e`
  <calcite-dropdown scale="l" width-scale="m" open>
    <calcite-dropdown-group group-title="View">
      <calcite-dropdown-item scale="l">Table</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" scale="l">Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" icon-end="grid" scale="l">Grid</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`, S = () => e`<div style="width:300px;">
<calcite-dropdown scale="m">
  <calcite-button slot="trigger" alignment="icon-end-space-between" appearance="transparent" icon-end="chevronDown"
    scale="m" type="button" width="full">BirdObservationCommentBirdObservationComment</calcite-button>
  <calcite-dropdown-group role="group" selection-mode="single">
    <calcite-dropdown-item>BirdObservationComment</calcite-dropdown-item>
    <calcite-dropdown-item>BirdObservationComment-BirdObservationComment</calcite-dropdown-item>
    <calcite-dropdown-item>BirdObservationCommentBirdObservationComment</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-item>BirdObservationComment BirdObservationComment</calcite-dropdown-item>
  <calcite-dropdown-item>Bird_Observation_Comment_Bird_Observation_Comment</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>
</div>`, k = () => e`<div style="width: 300px; border: solid">
    <calcite-dropdown style="width: 100%;">
      <calcite-button width="full" slot="trigger"
        >This is some really long text that will eventually overrun the container</calcite-button
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
  </div>`, O = () => e`
  <style>
    .container {
      display: inline-flex;
      flex-direction: column;
      width: 10rem;
      padding: 25px;
      flex-basis: 200px;
    }
  </style>
  <div class="container">
    <calcite-dropdown scale="s" width-scale="s" open>
      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale S</calcite-button>
      <calcite-dropdown-group group-title="View">
        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>
        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>

  <div class="container">
    <calcite-dropdown scale="m" width-scale="s" open>
      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale M</calcite-button>
      <calcite-dropdown-group group-title="View">
        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>
        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>

  <div class="container">
    <calcite-dropdown scale="l" width-scale="s" open>
      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale L</calcite-button>
      <calcite-dropdown-group group-title="View">
        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>
        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`, D = () => e`
  <calcite-dropdown offset-skidding="10" offset-distance="10" open placement="leading">
    <calcite-button icon-start="rectangle-plus" slot="trigger"></calcite-button>
    <calcite-dropdown-group group-title="Add to new...">
      <calcite-dropdown-item icon-start="nodes-link" selected>Link Chart</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="map">Map</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Add to existing...">
      <calcite-dropdown-item icon-start="nodes-link" selected>My Link Chart 1</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="nodes-link" selected>My Link Chart 2</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="map">My Map 1</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="map">My Map 2</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: DropdownStoryArgs): string => html\`
  <calcite-dropdown
    open
    placement="\${args.placement}"
    scale="\${args.scale}"
    width-scale="\${args.widthScale}"
    type="\${args.type}"
    \${boolean("close-on-select-disabled", args.closeOnSelectDisabled)}
    \${boolean("disabled", args.disabled)}
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="\${args.selectionMode}" group-title="Sort by">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dropdown open>
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Sort by">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dropdown open placement="\${defaultMenuPlacement}" scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Sort by">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 500px;">
    <calcite-dropdown
      style="width:100%"
      open
      placement="\${defaultMenuPlacement}"
      scale="m"
      width-scale="m"
      type="click"
    >
      <calcite-button width="full" slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="single" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
\``,
      ...w.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dropdown open placement="\${defaultMenuPlacement}" scale="m" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Icon Start">
      <calcite-dropdown-item icon-start="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group selection-mode="single" group-title="Icon End">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group selection-mode="single" group-title="Icon Both">
      <calcite-dropdown-item icon-start="list" icon-end="data-check">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" icon-end="data-check" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table" icon-end="data-check">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dropdown open placement="\${defaultMenuPlacement}" scale="m" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Select one">
      <calcite-dropdown-item>Apple</calcite-dropdown-item>
      <calcite-dropdown-item selected>Orange</calcite-dropdown-item>
      <calcite-dropdown-item>Grape</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select multi" selection-mode="multiple">
      <calcite-dropdown-item>Asparagus</calcite-dropdown-item>
      <calcite-dropdown-item selected>Potato</calcite-dropdown-item>
      <calcite-dropdown-item selected>Yam</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
      <calcite-dropdown-item>Plant beans</calcite-dropdown-item>
      <calcite-dropdown-item>Add peas</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dropdown open placement="\${defaultMenuPlacement}" scale="m" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="none" group-title="Select one">
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Throw Apples</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Visit Oranges</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Eat Grapes</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-start="camera-flash-on"
        >Plant beans</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-end="camera-flash-on"
        >Add peas</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dropdown
    dir="rtl"
    open
    class="calcite-mode-dark"
    placement="\${defaultMenuPlacement}"
    scale="m"
    width-scale="m"
    type="click"
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Select one">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select multi" selection-mode="multiple">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dropdown
    open
    class="calcite-mode-dark"
    placement="\${defaultMenuPlacement}"
    scale="m"
    width-scale="m"
    type="click"
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="none" group-title="Select one">
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Throw Apples</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Visit Oranges</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Eat Grapes</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-start="camera-flash-on"
        >Plant beans</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-end="camera-flash-on"
        >Add peas</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <!-- we use large scale to test max viewport height-->
  <calcite-dropdown open placement="\${defaultMenuPlacement}" max-items="7" width-scale="m" type="click">
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Third group">
      <calcite-dropdown-item>11</calcite-dropdown-item>
      <calcite-dropdown-item>12</calcite-dropdown-item>
      <calcite-dropdown-item>13</calcite-dropdown-item>
      <calcite-dropdown-item>14</calcite-dropdown-item>
      <calcite-dropdown-item>15</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <!-- we use large scale to test max viewport height-->
  <calcite-dropdown open>
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Sort by">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Third group">
      <calcite-dropdown-item>11</calcite-dropdown-item>
      <calcite-dropdown-item>12</calcite-dropdown-item>
      <calcite-dropdown-item>13</calcite-dropdown-item>
      <calcite-dropdown-item>14</calcite-dropdown-item>
      <calcite-dropdown-item>15</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-dropdown max-items="3" open>
    <calcite-button slot="trigger">Activate Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="single" group-title="Selection Mode: Single">
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>\``,
      ...b.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dropdown disabled>
    <calcite-button slot="trigger">Disabled dropdown</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>

  <calcite-dropdown open>
    <calcite-button slot="trigger">Disabled dropdown items</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item disabled>2</calcite-dropdown-item>
      <calcite-dropdown-item disabled>3</calcite-dropdown-item>
      <calcite-dropdown-item disabled>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...h.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="margin:10px;">
    <calcite-dropdown width-scale="m" placement="top" open>
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group>
        <calcite-dropdown-item>1</calcite-dropdown-item>
        <calcite-dropdown-item>2</calcite-dropdown-item>
        <calcite-dropdown-item>3</calcite-dropdown-item>
        <calcite-dropdown-item>4</calcite-dropdown-item>
        <calcite-dropdown-item>5</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="text-align:center">
    <calcite-dropdown open placement="\${defaultMenuPlacement}" scale="m" width-scale="m" type="click">
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="single" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
\``,
      ...y.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div dir="rtl" style="text-align:center">
    <calcite-dropdown open placement="\${defaultMenuPlacement}" scale="m" width-scale="m" type="click">
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group selection-mode="single" group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .my-dropdown {
      margin-top: 50px;
    }
  </style>
  <style>
    .my-dropdown {
      margin-top: 50px;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <calcite-dropdown class="my-dropdown" open>
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
  <script>
    document.querySelector(".my-dropdown").flipPlacements = ["right"];
  <\/script>
\``,
      ...v.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dropdown scale="l" width-scale="m" open>
    <calcite-dropdown-group group-title="View">
      <calcite-dropdown-item scale="l">Table</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" scale="l">Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" icon-end="grid" scale="l">Grid</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...T.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:300px;">
<calcite-dropdown scale="m">
  <calcite-button slot="trigger" alignment="icon-end-space-between" appearance="transparent" icon-end="chevronDown"
    scale="m" type="button" width="full">BirdObservationCommentBirdObservationComment</calcite-button>
  <calcite-dropdown-group role="group" selection-mode="single">
    <calcite-dropdown-item>BirdObservationComment</calcite-dropdown-item>
    <calcite-dropdown-item>BirdObservationComment-BirdObservationComment</calcite-dropdown-item>
    <calcite-dropdown-item>BirdObservationCommentBirdObservationComment</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-item>BirdObservationComment BirdObservationComment</calcite-dropdown-item>
  <calcite-dropdown-item>Bird_Observation_Comment_Bird_Observation_Comment</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>
</div>\``,
      ...S.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width: 300px; border: solid">
    <calcite-dropdown style="width: 100%;">
      <calcite-button width="full" slot="trigger"
        >This is some really long text that will eventually overrun the container</calcite-button
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
  </div>\``,
      ...k.parameters?.docs?.source
    }
  }
};
O.parameters = {
  ...O.parameters,
  docs: {
    ...O.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      display: inline-flex;
      flex-direction: column;
      width: 10rem;
      padding: 25px;
      flex-basis: 200px;
    }
  </style>
  <div class="container">
    <calcite-dropdown scale="s" width-scale="s" open>
      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale S</calcite-button>
      <calcite-dropdown-group group-title="View">
        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>
        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>

  <div class="container">
    <calcite-dropdown scale="m" width-scale="s" open>
      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale M</calcite-button>
      <calcite-dropdown-group group-title="View">
        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>
        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>

  <div class="container">
    <calcite-dropdown scale="l" width-scale="s" open>
      <calcite-button icon-end="hamburger" appearance="outline" slot="trigger">Scale L</calcite-button>
      <calcite-dropdown-group group-title="View">
        <calcite-dropdown-item icon-end="list-bullet" selected>List</calcite-dropdown-item>
        <calcite-dropdown-item icon-end="grid">Grid</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
\``,
      ...O.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-dropdown offset-skidding="10" offset-distance="10" open placement="leading">
    <calcite-button icon-start="rectangle-plus" slot="trigger"></calcite-button>
    <calcite-dropdown-group group-title="Add to new...">
      <calcite-dropdown-item icon-start="nodes-link" selected>Link Chart</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="map">Map</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Add to existing...">
      <calcite-dropdown-item icon-start="nodes-link" selected>My Link Chart 1</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="nodes-link" selected>My Link Chart 2</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="map">My Map 1</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="map">My Map 2</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
\``,
      ...D.parameters?.docs?.source
    }
  }
};
const E = ["simple", "smallViewport", "simpleAutoWidth", "simpleFullWidth", "withIcons", "groupsAndSelectionModes", "itemsAsLinks", "darkModeRTL_TestOnly", "itemsAsLinksDarkMode", "scrollingAfterCertainItems_TestOnly", "scrollingWithoutMaxItems_TestOnly", "noScrollingWhenMaxItemsEqualsItems_TestOnly", "disabled_TestOnly", "flipPositioning_TestOnly", "alignedCenter_TestOnly", "alignedCenterRTL_TestOnly", "flipPlacements_TestOnly", "mediumIconForLargeDropdownItem_TestOnly", "triggerWordBreak_TestOnly", "settingFullWidthEnablesTriggerTruncation_TestOnly", "openInAllScales", "offsetPlacement"];
export {
  E as __namedExportsOrder,
  f as alignedCenterRTL_TestOnly,
  y as alignedCenter_TestOnly,
  i as darkModeRTL_TestOnly,
  W as default,
  h as disabled_TestOnly,
  v as flipPlacements_TestOnly,
  r as flipPositioning_TestOnly,
  s as groupsAndSelectionModes,
  g as itemsAsLinks,
  d as itemsAsLinksDarkMode,
  T as mediumIconForLargeDropdownItem_TestOnly,
  b as noScrollingWhenMaxItemsEqualsItems_TestOnly,
  D as offsetPlacement,
  O as openInAllScales,
  n as scrollingAfterCertainItems_TestOnly,
  u as scrollingWithoutMaxItems_TestOnly,
  k as settingFullWidthEnablesTriggerTruncation_TestOnly,
  a as simple,
  p as simpleAutoWidth,
  w as simpleFullWidth,
  c as smallViewport,
  S as triggerWordBreak_TestOnly,
  m as withIcons
};
