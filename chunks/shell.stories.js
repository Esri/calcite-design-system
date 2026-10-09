/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { s as me } from "./index3.js";
import { b as r, m as Ie } from "./utils3.js";
import { h as e } from "./formatting.js";
import { A as Ne } from "./resources34.js";
import "./action.js";
import "./action-bar.js";
import "./action-group.js";
import "./alert.js";
import "./block.js";
import "./block-section.js";
import "./button.js";
import "./chip.js";
import "./chip-group.js";
import "./dialog.js";
import "./dropdown.js";
import "./dropdown-group.js";
import "./dropdown-item.js";
import "./fab.js";
import "./flow.js";
import "./flow-item.js";
import "./icon.js";
import "./list.js";
import "./list-item.js";
import "./notice.js";
import "./panel.js";
import "./popover.js";
import "./sheet.js";
import "./shell.js";
import "./shell-panel.js";
import "./sortable-list.js";
import "./tab.js";
import "./tab-nav.js";
import "./tab-title.js";
import "./tabs.js";
import "./tooltip.js";
var Ce = Object.freeze, Ue = Object.defineProperty, ge = (t, a) => Ce(Ue(t, "raw", { value: Ce(t.slice()) })), Ae, Te, Me;
const {
  dialogPlacement: We,
  shellDisplayMode: Be,
  position: v,
  scale: $e
} = Ne, Bt = {
  title: "Components/Shell",
  args: {
    centerPanelPosition: v.values[0],
    collapsed: !1,
    displayMode: Be.defaultValue,
    leadingPanelPosition: v.values[0],
    trailingPanelPosition: v.values[1],
    resizable: !0,
    contentBehind: !1,
    detached: !1,
    heightScale: $e.values[0]
  },
  argTypes: {
    centerPanelPosition: {
      options: v.values,
      control: {
        type: "select"
      }
    },
    displayMode: {
      options: Be.values,
      control: {
        type: "select"
      }
    },
    leadingPanelPosition: {
      options: v.values,
      control: {
        type: "select"
      }
    },
    trailingPanelPosition: {
      options: v.values,
      control: {
        type: "select"
      }
    },
    heightScale: {
      options: $e.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      delay: 1e3
    },
    layout: "fullscreen"
  }
}, Oe = e`
  <calcite-action-group>
    <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
    <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
  </calcite-action-group>
`, Ve = e`
  <calcite-action-group>
    <calcite-action text="Idea" label="Add Item" icon="lightbulb"></calcite-action>
    <calcite-action text="Information" label="Save Item" icon="information"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Question" label="View Layers" icon="question"></calcite-action>
  </calcite-action-group>
`, ze = e`
  <calcite-action-bar class="calcite-mode-dark" slot="action-bar"> ${Oe} </calcite-action-bar>
`, Fe = e`
  <calcite-action-bar slot="action-bar"> ${Ve} </calcite-action-bar>
`, o = e`
  ${ze}
  <calcite-panel heading="Leading panel content">
    <div>Content</div>
  </calcite-panel>
`, i = e`
  <calcite-panel heading="Center row content">
    <div>Content</div>
  </calcite-panel>
`, Re = e`
  <calcite-panel heading="Panel bottom content">
    <div>Content</div>
  </calcite-panel>
`, _e = e`
  <calcite-action-bar slot="action-bar">
    <calcite-action-group>
      <calcite-action text="Save" icon="save" indicator> </calcite-action>
      <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
      <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action icon="layers" text="Layers" active> </calcite-action>
      <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
      <calcite-action icon="legend" text="Legend"> </calcite-action>
      <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Share" icon="share"></calcite-action>
      <calcite-action text="Print" icon="print"></calcite-action>
    </calcite-action-group>
    <calcite-action-group slot="actions-end">
      <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
      <calcite-action text="What's next" icon="mega-phone"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
  <calcite-panel heading="Center row content">Panel</calcite-panel>
`, s = e`
  ${Fe}
  <calcite-panel heading="Trailing panel content">
    <div>Content</div>
  </calcite-panel>
`, h = e`
  <header slot="header">
    <h2>My Shell Header</h2>
  </header>
`, g = '<footer slot="footer">My Shell Footer</footer>', c = e`
  <div
    style="
    width:100%;
    height:100%;
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0;
  "
  ></div>
`, be = e`
  ${ze}
  <calcite-panel heading="Advanced panel example">
    <calcite-block expandable open heading="Start Content" description="This is the primary.">
      <calcite-block-content>
        <calcite-action text="Play" text-enabled indicator icon="play"></calcite-action>
        <calcite-action text="Extent" text-enabled icon="extent"></calcite-action>
        <calcite-action text="Chart" text-enabled icon="arrow-up-right"></calcite-action>
      </calcite-block-content>
    </calcite-block>
    <calcite-block expandable open heading="Another Block" description="This is the primary.">
      <calcite-block-content>
        <div style="height: 300px;">
          <p>Cool thing.</p>
        </div>
      </calcite-block-content>
    </calcite-block>
    <calcite-block expandable open heading="Additional Block" description="This is the primary.">
      <calcite-block-content>
        <div style="height: 300px;">
          <p>Cool thing.</p>
        </div>
      </calcite-block-content>
    </calcite-block>
    <calcite-block expandable open heading="More Block" description="This is the primary.">
      <calcite-block-content>
        <div style="height: 300px;">
          <p>Cool thing.</p>
          <p>Cool thing.</p>
        </div>
      </calcite-block-content>
    </calcite-block>
  </calcite-panel>
`, ve = e`
  ${Fe}
  <calcite-flow>
    <calcite-flow-item heading="Layer settings">
      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>
      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>
      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>
      <calcite-block expandable open heading="End Content" description="Select goodness">
        <calcite-block-content>
          <img alt="demo" src="${me({
  width: 640,
  height: 480
})}" width="100%" />
          <calcite-block-section text="Cool things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
          <calcite-block-section text="Neat things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
        </calcite-block-content>
      </calcite-block>
      <calcite-button slot="footer" width="half" appearance="outline">Cancel</calcite-button>
      <calcite-button slot="footer" width="half">Save</calcite-button>
    </calcite-flow-item>
    <calcite-flow-item heading="Deeper flow item">
      <calcite-block expandable open heading="End Content" description="Select goodness">
        <calcite-block-content>
          <calcite-block-section text="Cool things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
          <img alt="demo" src="${me({
  width: 640,
  height: 480
})}" width="100%" />
          <calcite-block-section text="Neat things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
        </calcite-block-content>
      </calcite-block>
      <calcite-block expandable open heading="Even more content" description="Select goodness">
        <calcite-block-content>
          <calcite-block-section text="Cool things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
          <img alt="demo" src="${me({
  width: 640,
  height: 480
})}" width="100%" />
          <calcite-block-section text="Neat things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
        </calcite-block-content>
      </calcite-block>
      <calcite-button slot="footer" width="half" appearance="outline">Cancel</calcite-button>
      <calcite-button slot="footer" width="half">Save</calcite-button>
    </calcite-flow-item>
  </calcite-flow>
`, Ee = `
  <style>
    .shell-set {
      display: flex;
      flex-direction: column;
      gap: 32px;
      background-color: white;
    }

    .shell-set__item {
      position: relative;
      height: 750px;
    }
  </style>`, xe = `
  <style>
    .panel-content {
      font-weight: bold;
      color: black;
      background-color: white;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    .panel-content > div:nth-child(2) {
      justify-self: end;
      align-self: start;
    }

    .panel-content > div:nth-child(3) {
      justify-self: start;
      align-self: end;
    }

    .panel-content > div:nth-child(4) {
      justify-self: end;
      align-self: end;
    }
  </style>
`, fe = e`
  <calcite-action-bar slot="action-bar">
    <calcite-action-group>
      <calcite-action text="Save" icon="save" indicator> </calcite-action>
      <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
      <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action icon="layers" text="Layers" active> </calcite-action>
      <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
      <calcite-action icon="legend" text="Legend"> </calcite-action>
      <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Share" icon="share"></calcite-action>
      <calcite-action text="Print" icon="print"></calcite-action>
    </calcite-action-group>
    <calcite-action-group slot="actions-end">
      <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
      <calcite-action text="What's next" icon="mega-phone"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
`, ye = e`
  <calcite-panel heading="Panel heading">
    <calcite-block expandable heading="Block heading" description="Description">
      <calcite-notice open>
        <div slot="message">The viewers are going to love this</div>
      </calcite-notice>
    </calcite-block>
    <calcite-block expandable heading="Block heading" description="Description">
      <calcite-notice open>
        <div slot="message">The viewers are going to love this</div>
      </calcite-notice>
    </calcite-block>
    <calcite-block expandable heading="Block heading" description="Description">
      <calcite-notice open>
        <div slot="message">The viewers are going to love this</div>
      </calcite-notice>
    </calcite-block>
    <calcite-block expandable heading="Block heading" description="Description">
      <calcite-notice open>
        <div slot="message">The viewers are going to love this</div>
      </calcite-notice>
    </calcite-block>
    <calcite-block expandable heading="Block heading" description="Description">
      <calcite-notice open>
        <div slot="message">The viewers are going to love this</div>
      </calcite-notice>
    </calcite-block>
  </calcite-panel>
`, qe = e`
  <calcite-panel>
    <div class="panel-content">
      <div>ESRI</div>
      <div>ESRI</div>
      <div>ESRI</div>
      <div>ESRI</div>
    </div>
    <div class="media"></div>
  </calcite-panel>
`, C = (t) => e`
  <calcite-shell ${r("content-behind", t.contentBehind)}>
    ${h}
    <calcite-shell-panel
      slot="panel-start"
      ${r("collapsed", t.collapsed)}
      display-mode="${t.displayMode}"
      ${r("resizable", t.resizable)}
    >
      ${be}
    </calcite-shell-panel>
    ${c}
    <calcite-shell-panel
      display-mode="${t.displayMode}"
      height-scale="${t.heightScale}"
      position="${t.centerPanelPosition}"
      slot="panel-bottom"
    >
      ${i}
    </calcite-shell-panel>
    <calcite-shell-panel
      slot="panel-end"
      ${r("collapsed", t.collapsed)}
      display-mode="${t.displayMode}"
      ${r("resizable", t.resizable)}
    >
      ${ve}
    </calcite-shell-panel>
    ${g}
  </calcite-shell>
`, A = () => e`
  <calcite-shell>
    <calcite-shell-panel
      slot="panel-start"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      slot="panel-end"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
`, T = () => e`
  <calcite-shell>
    <calcite-shell-panel
      display-mode="float"
      slot="panel-start"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      display-mode="float"
      slot="panel-end"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
`, M = () => e`
  <calcite-shell>
    <calcite-shell-panel
      display-mode="float-all"
      slot="panel-start"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      display-mode="float-all"
      slot="panel-end"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
`, B = () => e`
  <calcite-shell>
    <calcite-shell-panel
      slot="panel-top"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      slot="panel-bottom"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
`, $ = () => e`
  <calcite-shell>
    <calcite-shell-panel
      display-mode="float"
      slot="panel-top"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      display-mode="float"
      slot="panel-bottom"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
`, z = () => e`
  <calcite-shell>
    <calcite-shell-panel
      display-mode="float-all"
      slot="panel-top"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      display-mode="float-all"
      slot="panel-bottom"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
`, f = () => e`
  <calcite-shell dir="rtl" class="calcite-mode-dark">
    ${h}
    <calcite-shell-panel slot="panel-start" display-mode="dock"> ${be} </calcite-shell-panel>
    ${c}
    <calcite-shell-panel height-scale="s" slot="panel-bottom"> ${i} </calcite-shell-panel>
    ${c}
    <calcite-shell-panel slot="panel-end" display-mode="dock"> ${ve} </calcite-shell-panel>
    ${g}
  </calcite-shell>
`;
f.parameters = {
  themes: Ie
};
const ke = [];
["float", "float-content"].forEach((t, a) => {
  ke[a] = e`<calcite-shell content-behind>
    <calcite-shell-panel slot="panel-start" display-mode="${t}">
      <calcite-action-bar slot="action-bar">
        <calcite-action data-action-id="layers" icon="layers" text="Layers"></calcite-action>
        <calcite-action data-action-id="basemaps" icon="basemap" text="Basemaps"></calcite-action>
        <calcite-action data-action-id="legend" icon="legend" text="Legend"></calcite-action>
        <calcite-action data-action-id="bookmarks" icon="bookmark" text="Bookmarks"></calcite-action>
        <calcite-action data-action-id="print" icon="print" text="Print"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Layers" height-scale="l" data-panel-id="layers" closable closed>
        <div id="layers-container"></div>
      </calcite-panel>
      <calcite-panel heading="Basemaps" height-scale="l" data-panel-id="basemaps" closable closed>
        <div id="basemaps-container"></div>
      </calcite-panel>
      <calcite-panel heading="Legend" height-scale="l" data-panel-id="legend" closable closed>
        <div id="legend-container"></div>
      </calcite-panel>
      <calcite-panel heading="Bookmarks" height-scale="l" data-panel-id="bookmarks" closable closed>
        <div id="bookmarks-container"></div>
      </calcite-panel>
      <calcite-panel heading="Print" height-scale="l" data-panel-id="print" closable closed>
        <div id="print-container"></div>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;
});
const F = () => ke[0], E = () => ke[1], we = [];
["float", "float-content"].forEach((t, a) => {
  we[a] = e`<calcite-shell content-behind>
    <header slot="header">
      <h2>My Shell Header</h2>
    </header>
    <div
      style="
width:100%;
height:100%;
background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
  linear-gradient(-45deg, #ccc 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, #ccc 75%),
  linear-gradient(-45deg, transparent 75%, #ccc 75%);
background-size: 20px 20px;
background-position: 0 0, 0 10px, 10px -10px, -10px 0;
"
    ></div>
    <calcite-shell-panel slot="panel-end" display-mode="${t}">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Idea" label="Add Item" icon="lightbulb" appearance="solid" scale="m"></calcite-action>
          <calcite-action
            text="Information"
            label="Save Item"
            icon="information"
            appearance="solid"
            scale="m"
          ></calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action
            text="Question"
            label="View Layers"
            icon="question"
            appearance="solid"
            scale="m"
          ></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Layer settings">
          <calcite-action
            slot="header-menu-actions"
            text="Cool thing"
            text-enabled
            appearance="solid"
            scale="m"
          ></calcite-action>
          <calcite-action
            slot="header-menu-actions"
            text="Cool thing"
            text-enabled
            appearance="solid"
            scale="m"
          ></calcite-action>
          <calcite-action
            slot="header-menu-actions"
            text="Cool thing"
            text-enabled
            appearance="solid"
            scale="m"
          ></calcite-action>
          <calcite-block expandable open heading="End Content" description="Select goodness">
            <calcite-block-content>
              <img
                alt="demo"
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%3E%20%3Crect%20fill%3D%22%23ddd%22%20width%3D%22640%22%20height%3D%22480%22%2F%3E%20%3Ctext%20fill%3D%22rgba%280%2C0%2C0%2C0.5%29%22%20font-family%3D%22sans-serif%22%20font-size%3D%2296%22%20dy%3D%2233.599999999999994%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E640%C3%97480%3C%2Ftext%3E%20%3C%2Fsvg%3E"
                width="100%"
              />
              <calcite-block-section text="Cool things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
              <calcite-block-section text="Neat things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
            </calcite-block-content>
          </calcite-block>
          <calcite-button slot="footer" width="half" appearance="outline" alignment="center" kind="brand" scale="m">
            Cancel
          </calcite-button>
          <calcite-button slot="footer" width="half" alignment="center" appearance="solid" kind="brand" scale="m">
            Save
          </calcite-button>
        </calcite-flow-item>
        <calcite-flow-item heading="Deeper flow item" show-back-button>
          <calcite-block expandable open heading="End Content" description="Select goodness">
            <calcite-block-content>
              <calcite-block-section text="Cool things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
              <img
                alt="demo"
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%3E%20%3Crect%20fill%3D%22%23ddd%22%20width%3D%22640%22%20height%3D%22480%22%2F%3E%20%3Ctext%20fill%3D%22rgba%280%2C0%2C0%2C0.5%29%22%20font-family%3D%22sans-serif%22%20font-size%3D%2296%22%20dy%3D%2233.599999999999994%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E640%C3%97480%3C%2Ftext%3E%20%3C%2Fsvg%3E"
                width="100%"
              />
              <calcite-block-section text="Neat things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
            </calcite-block-content>
          </calcite-block>
          <calcite-block expandable open heading="Even more content" description="Select goodness">
            <calcite-block-content>
              <calcite-block-section text="Cool things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
              <img
                alt="demo"
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%3E%20%3Crect%20fill%3D%22%23ddd%22%20width%3D%22640%22%20height%3D%22480%22%2F%3E%20%3Ctext%20fill%3D%22rgba%280%2C0%2C0%2C0.5%29%22%20font-family%3D%22sans-serif%22%20font-size%3D%2296%22%20dy%3D%2233.599999999999994%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E640%C3%97480%3C%2Ftext%3E%20%3C%2Fsvg%3E"
                width="100%"
              />
              <calcite-block-section text="Neat things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
            </calcite-block-content>
          </calcite-block>
          <calcite-button slot="footer" width="half" appearance="outline" alignment="center" kind="brand" scale="m">
            Cancel
          </calcite-button>
          <calcite-button slot="footer" width="half" alignment="center" appearance="solid" kind="brand" scale="m">
            Save
          </calcite-button>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <footer slot="footer">My Shell Footer</footer>
  </calcite-shell>`;
});
const D = () => we[0], H = () => we[1], I = () => e` <main>
    <p class="padded-content">
      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
    </p>
    <calcite-shell
      style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
    >
      <div class="global-nav" slot="header">Header Example</div>
      <calcite-dialog open modal slot="dialogs"
        ><span slot="header-content">Dialog slotted in Shell</span></calcite-dialog
      >
      <calcite-alert open slot="alerts" placement="top-end"
        ><span slot="title">Alert slotted in Shell</span>
      </calcite-alert>
      <calcite-shell-panel id="primary-panel" slot="panel-start">
        <calcite-action-bar slot="action-bar">
          <calcite-action-group>
            <calcite-action text="Save" icon="save" indicator> </calcite-action>
            <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
            <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
          </calcite-action-group>
          <calcite-action-group>
            <calcite-action icon="layers" text="Layers" active> </calcite-action>
            <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
            <calcite-action icon="legend" text="Legend"> </calcite-action>
            <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
        <calcite-panel heading="Panel">
          <div class="padded-content">Panel content<br />Padding is fake.</div>
        </calcite-panel>
      </calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">
        <calcite-action-bar slot="action-bar">
          <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
          <calcite-action-group>
            <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
            <calcite-action text="Styles" icon="shapes"> </calcite-action>
            <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
            <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
            <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
            </calcite-action>
            <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
            <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
        <calcite-flow>
          <calcite-flow-item heading="Flow 01">
            <div class="padded-content">Flow 01 content<br />Padding is fake.</div>
          </calcite-flow-item>
          <calcite-flow-item heading="Flow 02">
            <div class="padded-content">Flow 02 content<br />Padding is fake.</div>
          </calcite-flow-item>
        </calcite-flow>
      </calcite-shell-panel>
      <calcite-panel heading="Main content">
        <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>
      </calcite-panel>
      <footer slot="footer">Footer Example</footer>
    </calcite-shell>
    <p class="padded-content">
      <calcite-notice width="full" open><span slot="title">Notice outside of shell</span></calcite-notice>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur.
    </p>
  </main>`, N = () => e(Ae || (Ae = ge([`
  <p class="padded-content">
    <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
    dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
  </p>
  <calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-sheet open slot="sheets" label="libero nunc" position="inline-start" display-mode="overlay">
      <calcite-panel closable heading="Ultrices neque"
        ><p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
        <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
      </calcite-panel>
    </calcite-sheet>
    <calcite-shell-panel id="primary-panel" slot="panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <div class="padded-content">Panel content<br />Padding is fake.</div>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01">
          <div class="padded-content">Flow 01 content<br />Padding is fake.</div>
        </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <div class="padded-content">Flow 02 content<br />Padding is fake.</div>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <calcite-panel heading="Main content">
      <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>
    </calcite-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
  <p class="padded-content">
    <calcite-notice width="full" open><span slot="title">Notice outside of shell</span></calcite-notice>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur.
  </p>
  <script>
    document.addEventListener("calcitePanelClose", () => {
      document.querySelector("calcite-sheet").open = false;
    });
  <\/script>
`]))), Pe = [];
["float", "float-content"].forEach((t, a) => {
  Pe[a] = e(Te || (Te = ge([`
    <p class="padded-content">
      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
    </p>
    <calcite-shell
      style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
    >
      <div class="global-nav" slot="header">Header Example</div>
      <calcite-sheet open slot="sheets" label="libero nunc" position="inline-start" display-mode="`, `">
        <calcite-panel closable heading="Ultrices neque"
          ><p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
          <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
        </calcite-panel>
      </calcite-sheet>
      <calcite-shell-panel id="primary-panel" slot="panel-start">
        <calcite-action-bar slot="action-bar">
          <calcite-action-group>
            <calcite-action text="Save" icon="save" indicator> </calcite-action>
            <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
            <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
          </calcite-action-group>
          <calcite-action-group>
            <calcite-action icon="layers" text="Layers" active> </calcite-action>
            <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
            <calcite-action icon="legend" text="Legend"> </calcite-action>
            <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
        <calcite-panel heading="Panel">
          <div class="padded-content">Panel content<br />Padding is fake.</div>
        </calcite-panel>
      </calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">
        <calcite-action-bar slot="action-bar">
          <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
          <calcite-action-group>
            <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
            <calcite-action text="Styles" icon="shapes"> </calcite-action>
            <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
            <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
            <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
            </calcite-action>
            <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
            <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
        <calcite-flow>
          <calcite-flow-item heading="Flow 01">
            <div class="padded-content">Flow 01 content<br />Padding is fake.</div>
          </calcite-flow-item>
          <calcite-flow-item heading="Flow 02">
            <div class="padded-content">Flow 02 content<br />Padding is fake.</div>
          </calcite-flow-item>
        </calcite-flow>
      </calcite-shell-panel>
      <calcite-panel heading="Main content">
        <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>
      </calcite-panel>
      <footer slot="footer">Footer Example</footer>
    </calcite-shell>
    <p class="padded-content">
      <calcite-notice width="full" open><span slot="title">Notice outside of shell</span></calcite-notice>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur.
    </p>
    <script>
      document.addEventListener("calcitePanelClose", () => {
        document.querySelector("calcite-sheet").open = false;
      });
    <\/script>
  `])), t);
});
const U = () => Pe[0], W = () => Pe[1], O = () => e`<calcite-shell content-behind>
    ${h}
    <calcite-shell-panel slot="panel-start">${o}</calcite-shell-panel>
    ${c}
    <calcite-shell-panel slot="panel-bottom">${i}</calcite-shell-panel>
    <calcite-shell-panel slot="panel-end">${s}</calcite-shell-panel>
    ${g}
  </calcite-shell>`, V = () => e`<calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-shell-panel slot="panel-top">${i}</calcite-shell-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell> `, Se = [];
["float", "float-content"].forEach((t, a) => {
  Se[a] = e`
    <calcite-shell
      content-behind
      style="
      width:700px;
      height:700px;
      position:relative;
      "
    >
      <div
        style="
        width:100%;
        height:100%;
        background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
        linear-gradient(-45deg, #ccc 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #ccc 75%),
        linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
      ></div>
      <calcite-shell-panel slot="panel-bottom" display-mode="${t}">${Re}</calcite-shell-panel>
    </calcite-shell>
  `;
});
const R = () => Se[0], _ = () => Se[1], j = () => e`
  <calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-shell-panel slot="panel-bottom">${i}</calcite-shell-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
`, G = () => e`
  <calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-shell-panel slot="panel-top">${i}</calcite-shell-panel>
    <calcite-shell-panel slot="panel-bottom">${i}</calcite-shell-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
`, Z = () => e`
  <calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-shell-panel slot="panel-start" display-mode="dock" width-scale="m">
      ${be}
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-end" display-mode="dock" width-scale="m">
      ${ve}
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-top">${i}</calcite-shell-panel>
    <calcite-shell-panel slot="panel-bottom">${i}</calcite-shell-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
`, Y = () => e`<calcite-shell content-behind>
    ${h}
    <calcite-shell-panel slot="panel-start">${o}</calcite-shell-panel>
    ${c}
    <calcite-shell-panel slot="panel-bottom">${_e}</calcite-shell-panel>
    <calcite-shell-panel slot="panel-end">${s}</calcite-shell-panel>
    ${g}
  </calcite-shell>`, y = () => e(Me || (Me = ge([` <calcite-shell
      style="
height:400px;
position:relative;
"
    >
      <calcite-shell-panel slot="panel-start" collapsed>
        <calcite-action-bar slot="action-bar">
          <calcite-tooltip slot="expand-tooltip">Expand</calcite-tooltip>
        </calcite-action-bar>
      </calcite-shell-panel>
      <calcite-shell-panel slot="panel-bottom">
        <div style="height: 100%; width: 600px; background-color: black;"></div>
      </calcite-shell-panel>
    </calcite-shell>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelector("calcite-tooltip").open = true;
      });
    <\/script>`])));
y.parameters = {
  chromatic: {
    delay: 800
  }
};
const q = () => e`<calcite-shell
    style="
width:100%;
height:500px;
max-height:80%;
position:relative;
"
  >
    <calcite-shell-panel resizable slot="panel-start">
      <calcite-action-bar slot="action-bar" class="calcite-mode-dark">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers"><p>Start Panel</p></calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel resizable slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow id="flow">
        <calcite-flow-item
          heading="Configure popup"
          description="Popular Demographics in the United States (Beta) - County"
        >
          <p>End Panel</p>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel resizable slot="panel-top">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Top Panel</p>
    </calcite-shell-panel>
    <calcite-shell-panel resizable slot="panel-bottom">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Bottom Panel</p>
    </calcite-shell-panel>
  </calcite-shell>`;
q.parameters = {
  chromatic: {
    delay: 500
  }
};
const k = () => e`<calcite-shell
    dir="rtl"
    style="
width:100%;
height:500px;
max-height:80%;
position:relative;
"
  >
    <calcite-shell-panel resizable slot="panel-start">
      <calcite-action-bar slot="action-bar" class="calcite-mode-dark">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers"><p>Start Panel</p></calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel resizable slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow id="flow">
        <calcite-flow-item
          heading="Configure popup"
          description="Popular Demographics in the United States (Beta) - County"
        >
          <p>End Panel</p>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel resizable slot="panel-top">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Top Panel</p>
    </calcite-shell-panel>
    <calcite-shell-panel resizable slot="panel-bottom">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Bottom Panel</p>
    </calcite-shell-panel>
  </calcite-shell>`;
k.parameters = {
  chromatic: {
    delay: 500
  }
};
const w = () => e`<calcite-shell
    style="
width:800px;
height:600px;
position:relative;
"
  >
    <calcite-shell-panel display-mode="overlay" resizable id="primary-panel" slot="panel-start">
      <calcite-action-bar slot="action-bar" class="calcite-mode-dark">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" height-scale="l" width-scale="m">
        <calcite-fab slot="fab" id="layer-fab" text="Add layers"></calcite-fab>
        <calcite-tooltip label="tooltip" reference-element="layer-fab">Add layers</calcite-tooltip>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="overlay" resizable slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow id="flow">
        <calcite-flow-item
          heading="Configure popup"
          description="Popular Demographics in the United States (Beta) - County"
          width-scale="m"
        >
          <calcite-action slot="header-actions-end" icon="x" text="Close"> </calcite-action>
          <calcite-block heading="Title" description="County: {NAME}" expandable icon-start="title">
            <div class="combo-control">
              <div class="combo-button">
                <button class="combo-button__main">County: {NAME}</button>
                <calcite-action label="code icon" class="combo-action" scale="s" icon="code"></calcite-action>
              </div>
            </div>
          </calcite-block>
          <calcite-sortable-list>
            <calcite-block drag-handle heading="Attributes" description="2/98" expandable icon-start="feature-details">
              <calcite-action label="ellipsis" slot="actions-end" icon="ellipsis" scale="m"></calcite-action>
              <calcite-list drag-enabled>
                <calcite-list-item
                  label="2018 Total Households (Esri)"
                  value="Households"
                  description="{TOTHH_CY}"
                ></calcite-list-item>
                <calcite-list-item
                  label="2018 Average Household Size (Esri)"
                  value="Household"
                  description="{AVGHHSZ_CY}"
                ></calcite-list-item>
              </calcite-list>
              <div class="row">
                <calcite-button id="attribute-add" round icon="plus" scale="s" width="full" kind="neutral"
                  >Select attributes</calcite-button
                >
              </div>
            </calcite-block>
            <calcite-block drag-handle heading="Image" expandable icon-start="image">
              <calcite-action label="ellipsis" slot="actions-end" icon="ellipsis" scale="m"></calcite-action>
              <section class="form-section">
                <label>
                  URL
                  <input type="text" value="https://ca-times.brightspotcdn.com/dims4/default/" />
                </label>
              </section>
              <calcite-block-section text="Options">
                <section class="form-section">
                  <label>
                    Title
                    <input type="text" placeholder="My cool title" />
                  </label>
                  <label>
                    Caption
                    <input type="text" placeholder="My cool caption" />
                  </label>
                  <label>
                    State
                    <select placeholder="My cool caption">
                      <option value="Denial">Denial</option>
                      <option value="Grace">Grace</option>
                      <option value="Confusion">Confusion</option>
                    </select>
                  </label>
                </section>
              </calcite-block-section>
              <calcite-block-section text="Advanced options">
                <section class="form-section">
                  <label>
                    Title
                    <input type="text" placeholder="My cool title" />
                  </label>
                  <label>
                    Caption
                    <input type="text" placeholder="My cool caption" />
                  </label>
                  <label>
                    State
                    <select placeholder="My cool caption">
                      <option value="Denial">Denial</option>
                      <option value="Grace">Grace</option>
                      <option value="Confusion">Confusion</option>
                    </select>
                  </label>
                </section>
              </calcite-block-section>
            </calcite-block>
            <calcite-block
              drag-handle
              heading="Text"
              description="Cool. he {expression/..."
              expandable
              icon-start="image"
            >
              <calcite-action label="ellipsis" slot="actions-end" icon="ellipsis" scale="m"></calcite-action>
              <button class="multiline-button">Cool. he {expression/expr1} population is {expression/expr2}%...</button>
            </calcite-block>
          </calcite-sortable-list>
          <calcite-fab slot="fab" id="label-fab" text="Add label class"></calcite-fab>
          <calcite-tooltip label="tooltip" reference-element="label-fab"> Add label class </calcite-tooltip>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel collapsed display-mode="overlay" resizable slot="panel-top">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example"> Example </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel collapsed display-mode="overlay" resizable slot="panel-bottom">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example"> Example </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;
w.parameters = {
  chromatic: {
    delay: 500
  }
};
const Q = () => e`<calcite-shell>
    <calcite-shell-panel slot="panel-end" width-scale="l" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action text="Save" icon="save" indicator></calcite-action>
        <calcite-action active icon="map" text="Map"></calcite-action>
        <calcite-action icon="layer" text="Layer"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Map Options">
        <calcite-button width="half" slot="footer"> Next </calcite-button>
        <calcite-block
          expandable
          heading="Layer effects"
          description="Adjust blur, highlight, and more"
          icon-start="effects"
        >
          <calcite-notice open>
            <div slot="message">Use layer effects sparingly, for emphasis</div>
          </calcite-notice>
        </calcite-block>
        <calcite-block
          expandable
          heading="Symbology"
          description="Select type, color, and transparency"
          icon-start="map-pin"
        >
          <calcite-notice open>
            <div slot="message">The viewers are going to love this</div>
          </calcite-notice>
        </calcite-block>
        <calcite-fab slot="fab"></calcite-fab>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`, J = () => e`<calcite-shell>
    <calcite-shell-panel slot="panel-top" display-mode="float-all" width-scale="m">
      <calcite-action-bar slot="action-bar" expand-toggle-disabled layout="horizontal" overlay-positioning="absolute">
        <calcite-action-group layout="horizontal" overlay-positioning="absolute">
          <calcite-action text="Save" icon="save" indicator appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="map" text="New" appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="collection" text="Open" appearance="solid" scale="m"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="horizontal" overlay-positioning="absolute">
          <calcite-action icon="layers" text="Layers" active appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps" appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="legend" text="Legend" appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks" appearance="solid" scale="m"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="horizontal" overlay-positioning="absolute">
          <calcite-action text="Share" icon="share" appearance="solid" scale="m"></calcite-action>
          <calcite-action text="Print" icon="print" appearance="solid" scale="m"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end" layout="horizontal" overlay-positioning="absolute">
          <calcite-action text="Feedback" icon="speech-bubble-plus" appearance="solid" scale="m"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone" appearance="solid" scale="m"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable id="panel-top" overlay-positioning="absolute" scale="m">
        <calcite-block open heading="Preview display-mode" overlay-positioning="absolute">
          <calcite-chip-group id="chip-group-panel-top" selection-mode="single-persist" scale="m">
            <calcite-chip value="dock" appearance="solid" kind="neutral" scale="m">dock</calcite-chip>
            <calcite-chip value="float-content" appearance="solid" kind="neutral" scale="m">float content</calcite-chip>
            <calcite-chip value="overlay" appearance="solid" kind="neutral" scale="m">overlay</calcite-chip>
            <calcite-chip value="float-all" appearance="solid" kind="neutral" scale="m" selected
              >float all</calcite-chip
            >
          </calcite-chip-group>
          <calcite-chip-group id="chip-layout-panel-top" selection-mode="single-persist" scale="m">
            <calcite-chip value="vertical" appearance="solid" kind="neutral" scale="m">Vertical</calcite-chip>
            <calcite-chip selected value="horizontal" appearance="solid" kind="neutral" scale="m"
              >Horizontal</calcite-chip
            >
          </calcite-chip-group>
          <div class="tall-content-example" style="display: none"></div>
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`, K = () => e`<calcite-shell>
    <calcite-shell-panel slot="panel-top" display-mode="float-all" width-scale="m">
      <calcite-action-bar slot="action-bar" expand-toggle-disabled layout="vertical" overlay-positioning="absolute">
        <calcite-action-group layout="vertical" overlay-positioning="absolute">
          <calcite-action text="Save" icon="save" indicator appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="map" text="New" appearance="solid" scale="m" text-enabled slot="menu-actions">
          </calcite-action>
          <calcite-action icon="collection" text="Open" appearance="solid" scale="m" text-enabled slot="menu-actions">
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="vertical" overlay-positioning="absolute">
          <calcite-action icon="layers" text="Layers" active appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps" appearance="solid" scale="m" text-enabled slot="menu-actions">
          </calcite-action>
          <calcite-action icon="legend" text="Legend" appearance="solid" scale="m" text-enabled slot="menu-actions">
          </calcite-action>
          <calcite-action
            icon="bookmark"
            text="Bookmarks"
            appearance="solid"
            scale="m"
            text-enabled
            slot="menu-actions"
          >
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="vertical" overlay-positioning="absolute">
          <calcite-action text="Share" icon="share" appearance="solid" scale="m"></calcite-action>
          <calcite-action text="Print" icon="print" appearance="solid" scale="m"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end" layout="vertical" overlay-positioning="absolute">
          <calcite-action text="Feedback" icon="speech-bubble-plus" appearance="solid" scale="m"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone" appearance="solid" scale="m"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable id="panel-top" overlay-positioning="absolute" scale="m">
        <calcite-block open heading="Preview display-mode" overlay-positioning="absolute">
          <calcite-chip-group id="chip-group-panel-top" selection-mode="single-persist" scale="m">
            <calcite-chip value="dock" appearance="solid" kind="neutral" scale="m">dock</calcite-chip>
            <calcite-chip value="float-content" appearance="solid" kind="neutral" scale="m">float content</calcite-chip>
            <calcite-chip value="overlay" appearance="solid" kind="neutral" scale="m">overlay</calcite-chip>
            <calcite-chip value="float-all" appearance="solid" kind="neutral" scale="m" selected
              >float all</calcite-chip
            >
          </calcite-chip-group>
          <calcite-chip-group id="chip-layout-panel-top" selection-mode="single-persist" scale="m">
            <calcite-chip value="vertical" appearance="solid" kind="neutral" scale="m" selected>Vertical</calcite-chip>
            <calcite-chip value="horizontal" appearance="solid" kind="neutral" scale="m">Horizontal</calcite-chip>
          </calcite-chip-group>
          <div class="tall-content-example" style="display: none"></div>
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`, X = () => e` <calcite-shell>
    <calcite-shell-panel id="panel-start" slot="panel-start" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator></calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel 1">
        <calcite-block heading="Block 1" expandable></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Main content"></calcite-panel>
    <calcite-shell-panel id="panel-end" slot="panel-end" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator></calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel 1">
        <calcite-block heading="Block 1" expandable></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`, ee = () => e`<calcite-shell>
    <calcite-shell-panel slot="panel-start" id="shell-panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
          <calcite-action active text="Layers" indicator icon="layers"></calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Undo" icon="undo"></calcite-action>
          <calcite-action text="Redo" indicator icon="redo"></calcite-action>
          <calcite-action text="Save" disabled icon="save"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" icon="question"></calcite-action>
          <calcite-action text="Settings" indicator icon="gear"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" id="panel-start" closable>
        <calcite-block
          expandable
          heading="Symbology"
          description="Select type, color, and transparency"
          icon-start="map-pin"
        >
          <calcite-notice open>
            <div slot="message">The viewers are going to love this</div>
          </calcite-notice>
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-bottom">
      <calcite-panel heading="Content">
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title selected> Watercraft </calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
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
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-end">
      <calcite-panel heading="Content">
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title selected> Watercraft </calcite-tab-title>
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
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`, te = () => e` <style>
      #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: gray;
      }
    </style>
    <calcite-shell content-behind>
      <div id="viewDiv"></div>
      <calcite-shell-panel slot="panel-start"></calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">
        <calcite-flow>
          <calcite-flow-item heading="panel header">
            <calcite-button id="button" style="margin-top:20px">open popover</calcite-button>
          </calcite-flow-item>
        </calcite-flow>
      </calcite-shell-panel> </calcite-shell
    ><calcite-popover open reference-element="button" offset-distance="-50" offset-skidding="15" style="z-index: 100">
      <calcite-panel height-scale="m" heading="popover panel header" style="height: 400px;"> </calcite-panel
    ></calcite-popover>`, ae = () => e`<calcite-shell>
    <calcite-shell-panel slot="panel-start" id="shell-panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action id="target-element" text="Save" icon="save" indicator></calcite-action>
        <calcite-action active icon="map" text="Map"></calcite-action>
        <calcite-action icon="layer" text="Layer"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Map" id="panel-start">
        <calcite-block heading="Block 1" expandable></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>

    <!--  Popover here  -->
    <calcite-popover overlay-positioning="fixed" reference-element="target-element" open
      ><p>This is a popover</p></calcite-popover
    >

    <calcite-shell-panel slot="panel-end" id="shell-panel-end" collapsed>
      <calcite-action-bar slot="action-bar">
        <calcite-action text="Layer" icon="sliders-horizontal"></calcite-action>
        <calcite-action text="Styles" icon="shapes"></calcite-action>
        <calcite-action text="Filter" icon="layer-filter"></calcite-action>
        <calcite-action text="Configure" icon="popup"></calcite-action>
      </calcite-action-bar>
      <calcite-panel id="panel-end" closable closed>
        <calcite-block heading="Block 1" expandable></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>`, ie = () => e` <calcite-shell content-behind>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel display-mode="float-all" slot="panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel closable heading="Layers" height-scale="l" width-scale="m">
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" slot="panel-end" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
        </calcite-action>
        <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
        <calcite-action text-enabled text="Tables" icon="table" slot="menu-actions"> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Tips" icon="lightbulb" slot="actions-end"> </calcite-action>
      </calcite-action-bar>
      <calcite-panel
        closable
        heading="Configure popup"
        description="Popular Demographics in the United States (Beta) - County"
        width-scale="m"
      >
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all"  slot="panel-top" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable>
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all"  slot="panel-bottom" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-action text="Save" icon="save" indicator> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Feedback" icon="speech-bubble-plus" slot="actions-end"></calcite-action>
        <calcite-action text="What's next" icon="mega-phone" slot="actions-end"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable>
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`, ce = () => e`<calcite-shell>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel slot="panel-start" id="shell-panel-start" resizable width="s">
      <calcite-action-bar slot="action-bar">
        <calcite-action text="Save" icon="save" indicator text-enabled></calcite-action>
        <calcite-action active icon="map" text="Map" text-enabled></calcite-action>
        <calcite-action icon="layer" text="Layer" text-enabled></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Map" id="panel-start">
        <calcite-dropdown open width="m" overlay-positioning="fixed">
          <calcite-button slot="trigger">Select landform</calcite-button>
          <calcite-dropdown-group group-title="Natural places">
            <calcite-dropdown-item>Mountain</calcite-dropdown-item>
            <calcite-dropdown-item>River</calcite-dropdown-item>
            <calcite-dropdown-item>Waterfall</calcite-dropdown-item>
            <calcite-dropdown-item>Rainforest</calcite-dropdown-item>
            <calcite-dropdown-item>Tundra</calcite-dropdown-item>
            <calcite-dropdown-item>Desert</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`, le = () => e` <calcite-shell content-behind>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel display-mode="float-all" slot="panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel closable heading="Layers" height-scale="l" width-scale="m">
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" slot="panel-end" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
        </calcite-action>
        <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
        <calcite-action text-enabled text="Tables" icon="table" slot="menu-actions"> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Tips" icon="lightbulb" slot="actions-end"> </calcite-action>
      </calcite-action-bar>
      <calcite-panel
        closable
        heading="Configure popup"
        description="Popular Demographics in the United States (Beta) - County"
        width-scale="m"
      >
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all"  slot="panel-top" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example">
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all"  slot="panel-bottom" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-action text="Save" icon="save" indicator> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Feedback" icon="speech-bubble-plus" slot="actions-end"></calcite-action>
        <calcite-action text="What's next" icon="mega-phone" slot="actions-end"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable>
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`, P = () => e` <calcite-shell content-behind>
    <div
      style="
            width:100%;
            height:100%;
            background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel slot="panel-bottom">
      <calcite-panel heading="Panel">
        <p>
          Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
          facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
          hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
          commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
          etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
          inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
          enim.
        </p>
        <p>
          Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
          blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
          fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
          curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
          Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
          pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
        </p>
        <p>
          Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis vivamus
          primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis lacinia
          consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id imperdiet magna
          imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin adipiscing lacinia.
          Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa facilisis nibh congue at
          torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
        </p>
        <p>
          Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
          hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras consectetur
          et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu sed gravida.
          Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
        </p>
        <p>
          Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
          pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
          risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
          consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl nunc
          porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
        </p>
        <p>
          Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
          ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel quisque.
          Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus sollicitudin
          integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem litora, feugiat
          velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus suscipit sed risus.
          Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet lacinia nullam
          ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
        </p>
        <p>
          Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
          ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum eu
          lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad suspendisse
          maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam himenaeos sem
          cras velit inceptos nisl metus? Dignissim.
        </p>
        <p>
          Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
          aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
          condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
          varius? Elementum imperdiet suscipit nulla! Primis a leo.
        </p>
        <p>
          Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
          maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
          hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
          sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
          semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
        </p>
        <p>
          Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
          Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
          posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
          risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
          pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
          sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
          curabitur!
        </p>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-start">
      <calcite-action-bar overflow-actions-disabled slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <p>
          Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
          facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
          hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
          commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
          etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
          inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
          enim.
        </p>
        <p>
          Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
          blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
          fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
          curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
          Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
          pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
        </p>
        <p>
          Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis vivamus
          primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis lacinia
          consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id imperdiet magna
          imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin adipiscing lacinia.
          Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa facilisis nibh congue at
          torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
        </p>
        <p>
          Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
          hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras consectetur
          et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu sed gravida.
          Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
        </p>
        <p>
          Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
          pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
          risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
          consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl nunc
          porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
        </p>
        <p>
          Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
          ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel quisque.
          Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus sollicitudin
          integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem litora, feugiat
          velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus suscipit sed risus.
          Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet lacinia nullam
          ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
        </p>
        <p>
          Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
          ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum eu
          lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad suspendisse
          maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam himenaeos sem
          cras velit inceptos nisl metus? Dignissim.
        </p>
        <p>
          Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
          aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
          condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
          varius? Elementum imperdiet suscipit nulla! Primis a leo.
        </p>
        <p>
          Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
          maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
          hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
          sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
          semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
        </p>
        <p>
          Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
          Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
          posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
          risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
          pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
          sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
          curabitur!
        </p>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01"> </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <p>
            Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
            facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
            hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
            commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
            etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
            inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
            enim.
          </p>
          <p>
            Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
            blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
            fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
            curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
            Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
            pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
          </p>
          <p>
            Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis
            vivamus primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis
            lacinia consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id
            imperdiet magna imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin
            adipiscing lacinia. Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa
            facilisis nibh congue at torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
          </p>
          <p>
            Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
            hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras
            consectetur et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu
            sed gravida. Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
          </p>
          <p>
            Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
            pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
            risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
            consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl
            nunc porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
          </p>
          <p>
            Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
            ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel
            quisque. Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus
            sollicitudin integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem
            litora, feugiat velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus
            suscipit sed risus. Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet
            lacinia nullam ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
          </p>
          <p>
            Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
            ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum
            eu lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad
            suspendisse maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam
            himenaeos sem cras velit inceptos nisl metus? Dignissim.
          </p>
          <p>
            Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
            aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
            condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
            varius? Elementum imperdiet suscipit nulla! Primis a leo.
          </p>
          <p>
            Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
            maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
            hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
            sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
            semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
          </p>
          <p>
            Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
            Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
            posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
            risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
            pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
            sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
            curabitur!
          </p>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
  </calcite-shell>`;
P.parameters = {
  chromatic: {
    modes: {
      specific: {
        viewport: {
          width: 1200,
          height: 400
        }
      }
    },
    cropToViewport: !0
  }
};
const S = () => e`<style>
      #start,
      #end {
        border: 1px solid red;
      }

      #bottom {
        --calcite-shell-panel-height: 200px;
        --calcite-shell-panel-max-height: 200px;
        --calcite-shell-panel-min-height: 200px;
        border: 1px solid green;
      }

      #viewDiv {
        height: 100%;
        width: 100%;
        background-color: #c3e3cc;
      }</style
    ><calcite-shell content-behind>
      <div id="viewDiv"></div>
      <calcite-shell-panel id="start" slot="panel-start">Start</calcite-shell-panel>
      <calcite-shell-panel id="bottom" slot="panel-bottom">
        <calcite-panel id="panel">
          <div>The panel should fill the entire bottom half of the bounding box.</div>
        </calcite-panel>
      </calcite-shell-panel>
      <calcite-shell-panel id="end" slot="panel-end">End</calcite-shell-panel>
    </calcite-shell>`;
S.parameters = {
  chromatic: {
    modes: {
      specific: {
        viewport: {
          width: 1200,
          height: 1200
        }
      }
    },
    cropToViewport: !0
  }
};
const ne = () => e` <calcite-shell content-behind>
    <div
      style="
              width:100%;
              height:100%;
              background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
              linear-gradient(-45deg, #ccc 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #ccc 75%),
              linear-gradient(-45deg, transparent 75%, #ccc 75%);
              background-size: 20px 20px;
              background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <div
      slot="panel-bottom"
      style="height:66%; --calcite-shell-panel-max-height: auto;
    --calcite-shell-panel-min-height: auto;
    --calcite-shell-panel-height: auto;"
    >
      <calcite-shell-panel display-mode="float" width-scale="l" slot="panel-bottom" style="height: 100%;">
        <calcite-panel heading="Panel">
          <div style="display: flex; flex-direction: row; height: 100%; width:100%">
            <calcite-action-bar
              overflow-actions-disabled
              style="display: flex; flex-direction: column; height: 100%; border-right: 1px solid var(--calcite-color-border-2); overflow-x: hidden;"
              layout="vertical"
              overlay-positioning="absolute"
              scale="m"
            >
              <slot name="custom-action-top"></slot
              ><calcite-action-group layout="vertical" overlay-positioning="absolute" scale="m">
                <div><calcite-action icon="gear" id="editChart" appearance="solid" scale="m"></calcite-action></div>
                <div>
                  <calcite-action id="legend" appearance="solid" disabled scale="m" aria-disabled="true"
                    ><calcite-icon icon="legend" scale="s" flip-rtl aria-hidden="true"></calcite-icon
                  ></calcite-action>
                </div>
                <div>
                  <calcite-action icon="rotate" id="rotateChart" appearance="solid" scale="m"></calcite-action>
                </div> </calcite-action-group
              ><calcite-action-group layout="vertical" overlay-positioning="absolute" scale="m">
                <div>
                  <calcite-action
                    icon="selection-filter"
                    id="filterBySelection"
                    appearance="solid"
                    disabled
                    scale="m"
                    aria-disabled="true"
                  ></calcite-action>
                </div>
                <div>
                  <calcite-action
                    icon="extent-filter"
                    id="filterByExtent"
                    appearance="solid"
                    scale="m"
                    aria-describedby="calcite-tooltip-4ece6511-9e21-cf51-f2a2-5d94d7ce0b49"
                  ></calcite-action>
                </div> </calcite-action-group
              ><calcite-action-group layout="vertical" overlay-positioning="absolute" scale="m">
                <div>
                  <calcite-action
                    icon="erase"
                    id="clearSelection"
                    appearance="solid"
                    disabled
                    scale="m"
                    aria-disabled="true"
                  ></calcite-action>
                </div>

                <div>
                  <calcite-action
                    icon="arrow-right-left"
                    id="switchSelection"
                    appearance="solid"
                    scale="m"
                  ></calcite-action>
                </div>
              </calcite-action-group>
              <slot name="custom-action-below"></slot>
            </calcite-action-bar>
            <div
              style="flex-grow: 1;
    overflow-y: hidden;"
            >
              <div style="width: 100%; height: 100%; position: static; left: 0.195313px; top: -0.5px;">
                <img
                  alt="placeholder image"
                  src="${me({
  width: 631,
  height: 297
})}"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </calcite-panel>
      </calcite-shell-panel>
    </div>
    <calcite-shell-panel display-mode="float-all" slot="panel-start">
      <calcite-action-bar overflow-actions-disabled slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <p>
          Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
          facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
          hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
          commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
          etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
          inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
          enim.
        </p>
        <p>
          Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
          blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
          fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
          curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
          Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
          pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
        </p>
        <p>
          Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis vivamus
          primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis lacinia
          consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id imperdiet magna
          imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin adipiscing lacinia.
          Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa facilisis nibh congue at
          torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
        </p>
        <p>
          Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
          hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras consectetur
          et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu sed gravida.
          Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
        </p>
        <p>
          Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
          pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
          risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
          consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl nunc
          porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
        </p>
        <p>
          Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
          ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel quisque.
          Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus sollicitudin
          integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem litora, feugiat
          velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus suscipit sed risus.
          Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet lacinia nullam
          ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
        </p>
        <p>
          Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
          ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum eu
          lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad suspendisse
          maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam himenaeos sem
          cras velit inceptos nisl metus? Dignissim.
        </p>
        <p>
          Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
          aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
          condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
          varius? Elementum imperdiet suscipit nulla! Primis a leo.
        </p>
        <p>
          Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
          maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
          hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
          sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
          semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
        </p>
        <p>
          Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
          Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
          posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
          risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
          pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
          sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
          curabitur!
        </p>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01"> </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <p>
            Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
            facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
            hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
            commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
            etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
            inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
            enim.
          </p>
          <p>
            Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
            blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
            fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
            curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
            Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
            pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
          </p>
          <p>
            Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis
            vivamus primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis
            lacinia consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id
            imperdiet magna imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin
            adipiscing lacinia. Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa
            facilisis nibh congue at torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
          </p>
          <p>
            Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
            hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras
            consectetur et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu
            sed gravida. Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
          </p>
          <p>
            Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
            pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
            risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
            consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl
            nunc porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
          </p>
          <p>
            Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
            ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel
            quisque. Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus
            sollicitudin integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem
            litora, feugiat velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus
            suscipit sed risus. Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet
            lacinia nullam ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
          </p>
          <p>
            Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
            ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum
            eu lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad
            suspendisse maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam
            himenaeos sem cras velit inceptos nisl metus? Dignissim.
          </p>
          <p>
            Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
            aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
            condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
            varius? Elementum imperdiet suscipit nulla! Primis a leo.
          </p>
          <p>
            Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
            maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
            hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
            sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
            semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
          </p>
          <p>
            Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
            Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
            posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
            risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
            pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
            sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
            curabitur!
          </p>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
  </calcite-shell>`, De = (t) => e`
  <style>
    calcite-shell {
      position: relative;
      width: 1200px;
      max-width: 90%;
      max-height: 90%;
      height: 600px;
      margin: 0 auto;
    }
    .padded-content {
      padding: 0.75rem;
    }
    .padded-content calcite-notice {
      margin-block-end: 0.75rem;
    }
  </style>
  <main>
    <p class="padded-content">
      <calcite-notice width="full" open>
        <span slot="title">Other page content outside of shell</span>
      </calcite-notice>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua...
    </p>
    ${t()}
    <p class="padded-content">
      <calcite-notice width="full" open>
        <span slot="title">Notice outside of shell</span>
      </calcite-notice>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua...
    </p>
  </main>
`, L = () => e`
  <calcite-shell>
    <div slot="header">Header Example</div>
    <calcite-dialog open modal slot="dialogs"
      ><span slot="header-content">Dialog slotted in Shell</span></calcite-dialog
    >
    <calcite-alert open slot="alerts" placement="top-end"
      ><span slot="title">Alert slotted in Shell</span>
    </calcite-alert>
    <calcite-sheet open slot="sheets" label="libero nunc" position="inline-start" display-mode="overlay">
      <calcite-panel closable heading="Ultrices neque"
        ><p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
        <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
      </calcite-panel>
    </calcite-sheet>
    <calcite-shell-panel id="primary-panel" slot="panel-start" position="start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <div class="padded-content">Panel content<br />Padding is fake.</div>
      </calcite-panel>
    </calcite-shell-panel>

    <calcite-shell-panel slot="panel-end" position="end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01">
          <div class="padded-content">Flow 01 content<br />Padding is fake.</div>
        </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <div class="padded-content">Flow 02 content<br />Padding is fake.</div>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>

    <calcite-panel heading="Main content">
      <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>
    </calcite-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
`;
L.decorators = [De];
const u = (t) => e`
  <calcite-shell>
    <div slot="header">Header Example</div>
    <calcite-dialog
      slot="dialogs"
      modal
      open
      placement="${t.dialogPlacement}"
      style="--calcite-dialog-size-x: ${t.dialogWidth}; --calcite-dialog-size-y: ${t.dialogHeight}"
    >
      <h3 slot="header-content">Test custom dialog sizes in slotted dialog in shell</h3>
      Expected behavior: none: css var for height + width adhered to. Below width, goes to fullscreen. fullscreen:
      ignores css var for height + width. docked: css var for height + width adhered to. Below width, docks, with
      provided height
      <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    </calcite-dialog>
    <calcite-alert open slot="alerts" placement="top-end"
      ><span slot="title">Alert slotted in Shell</span>
    </calcite-alert>
    <calcite-shell-panel slot="panel-start" position="start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <div class="padded-content">Panel content<br />Padding is fake.</div>
      </calcite-panel>
    </calcite-shell-panel>

    <calcite-shell-panel slot="panel-end" position="end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01">
          <div class="padded-content">Flow 01 content<br />Padding is fake.</div>
        </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <div class="padded-content">Flow 02 content<br />Padding is fake.</div>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>

    <calcite-panel heading="Main content">
      <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>
    </calcite-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
`, oe = () => e`
  <h3>layout="vertical" & display-mode="float-all" & height="s"</h3>
  <div style="position:relative; height: 180px">
    <calcite-shell>
      <calcite-shell-panel layout="vertical" display-mode="float-all" height="s">
        <calcite-panel heading="Example" description="example" closable> </calcite-panel>
      </calcite-shell-panel>
    </calcite-shell>
  </div>
  <br />
  <h3>layout="horizontal" & display-mode="float-all" & height-scale="m"</h3>
  <div style="position:relative; height: 280px">
    <calcite-shell>
      <calcite-shell-panel layout="horizontal" display-mode="float-all" height-scale="m">
        <calcite-panel heading="Example" description="example" closable> </calcite-panel>
      </calcite-shell-panel>
    </calcite-shell>
  </div>
  <br/ >
  <h3>layout="vertical" & display-mode="float-all" & height="l"</h3>
  <div style="position:relative; height: 350px">
    <calcite-shell>
      <calcite-shell-panel layout="vertical" display-mode="float-all" height="l">
        <calcite-panel heading="Example" description="example" closable> </calcite-panel>
      </calcite-shell-panel>
    </calcite-shell>
  </div>
`, se = () => e`
  <style>
    .corner-radius-and-box-shadow {
      display: grid;
      gap: var(--calcite-space-3xl);
      padding: var(--calcite-space-3xl);
    }
    .corner-radius-and-box-shadow > calcite-shell {
      position: relative;
      inline-size: auto;
      block-size: auto;
    }
  </style>
  <div class="corner-radius-and-box-shadow">
    <calcite-shell style="--calcite-shell-corner-radius: var(--calcite-size-xs);">
      ${h}
      <calcite-shell-panel slot="panel-start">${o}</calcite-shell-panel>
      ${c}
      <calcite-shell-panel slot="panel-bottom">${i}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">${s}</calcite-shell-panel>
      ${g}
    </calcite-shell>
    <calcite-shell style="--calcite-shell-corner-radius: var(--calcite-size-xs);">
      <calcite-shell-panel slot="panel-start">${o}</calcite-shell-panel>
      ${c}
      <calcite-shell-panel slot="panel-bottom">${i}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">${s}</calcite-shell-panel>
    </calcite-shell>
    <calcite-shell style="--calcite-shell-shadow: var(--calcite-shadow-md);">
      ${h}
      <calcite-shell-panel slot="panel-start">${o}</calcite-shell-panel>
      ${c}
      <calcite-shell-panel slot="panel-bottom">${i}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">${s}</calcite-shell-panel>
      ${g}
    </calcite-shell>
    <calcite-shell style="--calcite-shell-shadow: var(--calcite-shadow-md);">
      <calcite-shell-panel slot="panel-start">${o}</calcite-shell-panel>
      ${c}
      <calcite-shell-panel slot="panel-bottom">${i}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">${s}</calcite-shell-panel>
    </calcite-shell>
    <calcite-shell
      style="--calcite-shell-corner-radius: var(--calcite-size-xs); --calcite-shell-shadow: var(--calcite-shadow-md);"
    >
      ${h}
      <calcite-shell-panel slot="panel-start">${o}</calcite-shell-panel>
      ${c}
      <calcite-shell-panel slot="panel-bottom">${i}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">${s}</calcite-shell-panel>
      ${g}
    </calcite-shell>
    <calcite-shell
      style="--calcite-shell-corner-radius: var(--calcite-size-xs); --calcite-shell-shadow: var(--calcite-shadow-md);"
    >
      <calcite-shell-panel slot="panel-start">${o}</calcite-shell-panel>
      ${c}
      <calcite-shell-panel slot="panel-bottom">${i}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">${s}</calcite-shell-panel>
    </calcite-shell>
  </div>
`;
u.args = {
  dialogPlacement: "center",
  dialogHeight: "300px",
  dialogWidth: "800px"
};
u.argTypes = {
  dialogPlacement: {
    control: {
      type: "select"
    },
    options: We.values
  },
  dialogWidth: {
    control: "text"
  },
  dialogHeight: {
    control: "text"
  }
};
u.decorators = [De];
const d = (t) => {
  const a = t.shellPanelSlot === "panel-top" || t.shellPanelSlot === "panel-bottom", l = t.shellPanelSlot === "panel-end" || t.shellPanelSlot === "panel-bottom" ? "end" : "start";
  return e`
    ${xe}
    <calcite-shell
      style="
        --calcite-shell-panel-height: 400px; 
        --calcite-shell-panel-min-height: 200px; 
        --calcite-shell-panel-max-height: 900px; 
        --calcite-shell-panel-min-width: 200px; 
        --calcite-shell-panel-max-width: 900px;
        ${t.applyShellBorderColor ? "--calcite-shell-border-color: red;" : ""}"
    >
      <calcite-shell-panel
        id="shellPanel"
        slot="${t.shellPanelSlot}"
        action-bar-position="${t.actionBarPosition}"
        layout="${a ? "horizontal" : "vertical"}"
        position="${l}"
        width="l"
        ${r("resizable", t.isResizable)}
      >
        ${t.includeActionBar ? fe : ""} ${ye}
      </calcite-shell-panel>
      ${qe}
    </calcite-shell>
  `;
};
d.args = {
  shellPanelSlot: "panel-start",
  actionBarPosition: "start",
  applyShellBorderColor: !1,
  includeActionBar: !0,
  isResizable: !0
};
d.argTypes = {
  shellPanelSlot: {
    options: ["panel-start", "panel-end", "panel-top", "panel-bottom"],
    control: {
      type: "inline-radio"
    }
  },
  actionBarPosition: {
    options: ["start", "end", "top", "bottom"],
    control: {
      type: "inline-radio"
    }
  },
  includeActionBar: {
    control: {
      type: "boolean"
    }
  },
  applyShellBorderColor: {
    control: {
      type: "boolean"
    }
  },
  isResizable: {
    name: "resizable",
    control: {
      type: "boolean"
    }
  },
  resizable: {
    table: {
      disable: !0
    },
    control: !1
  }
};
d.parameters = {
  chromatic: {
    modes: {
      specific: {
        viewport: {
          width: 1200,
          height: 700
        }
      }
    },
    cropToViewport: !0
  },
  controls: {
    include: ["shellPanelSlot", "actionBarPosition", "applyShellBorderColor", "includeActionBar", "resizable"],
    sort: "none"
  }
};
function je(t) {
  return e`
    <calcite-shell
      class="shell-set__item"
      id="${t.shellId}"
      style="
        --calcite-shell-panel-height: 400px;
        --calcite-shell-panel-min-height: 200px;
        --calcite-shell-panel-max-height: 900px;
        --calcite-shell-panel-min-width: 200px;
        --calcite-shell-panel-max-width: 900px;
        ${t.applyShellBorderColor ? "--calcite-shell-border-color: red;" : ""}
      "
    >
      <calcite-shell-panel
        id="${t.id}"
        slot="${t.slot}"
        action-bar-position="${t.actionBarPosition}"
        layout="${t.layout}"
        position="${t.position}"
        ${t.sizeAttribute}
        ${r("resizable", t.resizable)}
      >
        ${fe} ${ye}
      </calcite-shell-panel>
      ${qe}
    </calcite-shell>
  `;
}
const Ge = ["start", "end", "top", "bottom"], Ze = {
  chromatic: {
    modes: {
      specific: {
        viewport: {
          width: 1200,
          height: 6112
          // height of 8 panels plus 7 gaps (8 * 750 + 112)
        }
      }
    },
    cropToViewport: !0
  },
  controls: {
    include: ["applyShellBorderColor"]
  }
};
function Ye(t, a, l, n = !1) {
  const b = Ge.flatMap((p) => [!1, !0].map((x) => {
    const Le = `${t}-${p}-${x ? "resizable" : "fixed"}`, He = a === "horizontal" ? 'height-scale="m"' : 'width="l"';
    return {
      id: `shellPanel-${Le}`,
      shellId: `shell-${Le}`,
      slot: t,
      actionBarPosition: p,
      applyShellBorderColor: n,
      layout: a,
      position: l,
      resizable: x,
      sizeAttribute: He
    };
  }));
  return e` ${Ee} ${xe}
    <div class="shell-set">
      ${b.map((p) => je(p)).join("")}
    </div>`;
}
function he(t, a, l) {
  const n = (({
    applyShellBorderColor: b
  }) => Ye(t, a, l, b));
  return n.args = {
    applyShellBorderColor: !1
  }, n.argTypes = {
    applyShellBorderColor: {
      control: {
        type: "boolean"
      }
    }
  }, n.parameters = Ze, n;
}
const re = he("panel-start", "vertical", "start"), pe = he("panel-end", "vertical", "end"), ue = he("panel-top", "horizontal", "start"), de = he("panel-bottom", "horizontal", "end"), m = ({
  applyShellBorderColor: t
}) => {
  const a = [["panel-start", "start"], ["panel-end", "end"]].flatMap(([l, n]) => ["top", "bottom"].flatMap((b) => [!1, !0].map((p) => {
    const x = `${l}-${b}-${p ? "resizable" : "fixed"}`;
    return e`
          <calcite-shell
            class="shell-set__item"
            id="shell-${x}"
            style="
              --calcite-shell-panel-width: 300px;
              ${t ? "--calcite-shell-border-color: red;" : ""}
            "
          >
            <calcite-shell-panel
              id="shellPanel-${x}"
              slot="${l}"
              action-bar-position="${b}"
              layout="vertical"
              position="${n}"
              width="l"
              ${r("resizable", p)}
            >
              ${fe} ${ye}
            </calcite-shell-panel>
            ${qe}
          </calcite-shell>
        `;
  })));
  return e` ${Ee} ${xe}
    <div class="shell-set">${a.join("")}</div>`;
};
m.args = {
  applyShellBorderColor: !1
};
m.argTypes = {
  applyShellBorderColor: {
    control: {
      type: "boolean"
    }
  }
};
m.parameters = {
  controls: {
    include: ["applyShellBorderColor"]
  }
};
C.parameters = {
  ...C.parameters,
  docs: {
    ...C.parameters?.docs,
    source: {
      originalSource: `(args: ShellStoryArgs): string => html\`
  <calcite-shell \${boolean("content-behind", args.contentBehind)}>
    \${headerHTML}
    <calcite-shell-panel
      slot="panel-start"
      \${boolean("collapsed", args.collapsed)}
      display-mode="\${args.displayMode}"
      \${boolean("resizable", args.resizable)}
    >
      \${advancedLeadingPanelHTML}
    </calcite-shell-panel>
    \${contentHTML}
    <calcite-shell-panel
      display-mode="\${args.displayMode}"
      height-scale="\${args.heightScale}"
      position="\${args.centerPanelPosition}"
      slot="panel-bottom"
    >
      \${centerPanelHTML}
    </calcite-shell-panel>
    <calcite-shell-panel
      slot="panel-end"
      \${boolean("collapsed", args.collapsed)}
      display-mode="\${args.displayMode}"
      \${boolean("resizable", args.resizable)}
    >
      \${advancedTrailingPanelHTMl}
    </calcite-shell-panel>
    \${footerHTML}
  </calcite-shell>
\``,
      ...C.parameters?.docs?.source
    }
  }
};
A.parameters = {
  ...A.parameters,
  docs: {
    ...A.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell>
    <calcite-shell-panel
      slot="panel-start"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      slot="panel-end"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
\``,
      ...A.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell>
    <calcite-shell-panel
      display-mode="float"
      slot="panel-start"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      display-mode="float"
      slot="panel-end"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
\``,
      ...T.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell>
    <calcite-shell-panel
      display-mode="float-all"
      slot="panel-start"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      display-mode="float-all"
      slot="panel-end"
      resizable
      style="
        --calcite-shell-panel-min-width: 0;
        --calcite-shell-panel-max-width: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
\``,
      ...M.parameters?.docs?.source
    }
  }
};
B.parameters = {
  ...B.parameters,
  docs: {
    ...B.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell>
    <calcite-shell-panel
      slot="panel-top"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      slot="panel-bottom"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
\``,
      ...B.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell>
    <calcite-shell-panel
      display-mode="float"
      slot="panel-top"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      display-mode="float"
      slot="panel-bottom"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
\``,
      ...$.parameters?.docs?.source
    }
  }
};
z.parameters = {
  ...z.parameters,
  docs: {
    ...z.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell>
    <calcite-shell-panel
      display-mode="float-all"
      slot="panel-top"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      display-mode="float-all"
      slot="panel-bottom"
      resizable
      style="
        --calcite-shell-panel-min-height: 0;
        --calcite-shell-panel-max-height: 100%;
      "
    >
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" closable>
        <calcite-block heading="Symbology" description="Select type, color, and transparency" icon-start="map-pin">
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>
\``,
      ...z.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell dir="rtl" class="calcite-mode-dark">
    \${headerHTML}
    <calcite-shell-panel slot="panel-start" display-mode="dock"> \${advancedLeadingPanelHTML} </calcite-shell-panel>
    \${contentHTML}
    <calcite-shell-panel height-scale="s" slot="panel-bottom"> \${centerPanelHTML} </calcite-shell-panel>
    \${contentHTML}
    <calcite-shell-panel slot="panel-end" display-mode="dock"> \${advancedTrailingPanelHTMl} </calcite-shell-panel>
    \${footerHTML}
  </calcite-shell>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
F.parameters = {
  ...F.parameters,
  docs: {
    ...F.parameters?.docs,
    source: {
      originalSource: "(): string => closedPanelsHtml[0]",
      ...F.parameters?.docs?.source
    }
  }
};
E.parameters = {
  ...E.parameters,
  docs: {
    ...E.parameters?.docs,
    source: {
      originalSource: "(): string => closedPanelsHtml[1]",
      ...E.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
    source: {
      originalSource: "(): string => endPanelHtml[0]",
      ...D.parameters?.docs?.source
    }
  }
};
H.parameters = {
  ...H.parameters,
  docs: {
    ...H.parameters?.docs,
    source: {
      originalSource: "(): string => endPanelHtml[1]",
      ...H.parameters?.docs?.source
    }
  }
};
I.parameters = {
  ...I.parameters,
  docs: {
    ...I.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <main>
    <p class="padded-content">
      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
    </p>
    <calcite-shell
      style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
    >
      <div class="global-nav" slot="header">Header Example</div>
      <calcite-dialog open modal slot="dialogs"
        ><span slot="header-content">Dialog slotted in Shell</span></calcite-dialog
      >
      <calcite-alert open slot="alerts" placement="top-end"
        ><span slot="title">Alert slotted in Shell</span>
      </calcite-alert>
      <calcite-shell-panel id="primary-panel" slot="panel-start">
        <calcite-action-bar slot="action-bar">
          <calcite-action-group>
            <calcite-action text="Save" icon="save" indicator> </calcite-action>
            <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
            <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
          </calcite-action-group>
          <calcite-action-group>
            <calcite-action icon="layers" text="Layers" active> </calcite-action>
            <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
            <calcite-action icon="legend" text="Legend"> </calcite-action>
            <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
        <calcite-panel heading="Panel">
          <div class="padded-content">Panel content<br />Padding is fake.</div>
        </calcite-panel>
      </calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">
        <calcite-action-bar slot="action-bar">
          <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
          <calcite-action-group>
            <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
            <calcite-action text="Styles" icon="shapes"> </calcite-action>
            <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
            <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
            <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
            </calcite-action>
            <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
            <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
        <calcite-flow>
          <calcite-flow-item heading="Flow 01">
            <div class="padded-content">Flow 01 content<br />Padding is fake.</div>
          </calcite-flow-item>
          <calcite-flow-item heading="Flow 02">
            <div class="padded-content">Flow 02 content<br />Padding is fake.</div>
          </calcite-flow-item>
        </calcite-flow>
      </calcite-shell-panel>
      <calcite-panel heading="Main content">
        <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>
      </calcite-panel>
      <footer slot="footer">Footer Example</footer>
    </calcite-shell>
    <p class="padded-content">
      <calcite-notice width="full" open><span slot="title">Notice outside of shell</span></calcite-notice>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur.
    </p>
  </main>\``,
      ...I.parameters?.docs?.source
    }
  }
};
N.parameters = {
  ...N.parameters,
  docs: {
    ...N.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <p class="padded-content">
    <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
    dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
  </p>
  <calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-sheet open slot="sheets" label="libero nunc" position="inline-start" display-mode="overlay">
      <calcite-panel closable heading="Ultrices neque"
        ><p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
        <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
      </calcite-panel>
    </calcite-sheet>
    <calcite-shell-panel id="primary-panel" slot="panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <div class="padded-content">Panel content<br />Padding is fake.</div>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01">
          <div class="padded-content">Flow 01 content<br />Padding is fake.</div>
        </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <div class="padded-content">Flow 02 content<br />Padding is fake.</div>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <calcite-panel heading="Main content">
      <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>
    </calcite-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
  <p class="padded-content">
    <calcite-notice width="full" open><span slot="title">Notice outside of shell</span></calcite-notice>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur.
  </p>
  <script>
    document.addEventListener("calcitePanelClose", () => {
      document.querySelector("calcite-sheet").open = false;
    });
  <\/script>
\``,
      ...N.parameters?.docs?.source
    }
  }
};
U.parameters = {
  ...U.parameters,
  docs: {
    ...U.parameters?.docs,
    source: {
      originalSource: "(): string => slottedSheetHtml[0]",
      ...U.parameters?.docs?.source
    }
  }
};
W.parameters = {
  ...W.parameters,
  docs: {
    ...W.parameters?.docs,
    source: {
      originalSource: "(): string => slottedSheetHtml[1]",
      ...W.parameters?.docs?.source
    }
  }
};
O.parameters = {
  ...O.parameters,
  docs: {
    ...O.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-shell content-behind>\n    ${headerHTML}\n    <calcite-shell-panel slot="panel-start">${leadingPanelHTML}</calcite-shell-panel>\n    ${contentHTML}\n    <calcite-shell-panel slot="panel-bottom">${centerPanelHTML}</calcite-shell-panel>\n    <calcite-shell-panel slot="panel-end">${trailingPanelHTML}</calcite-shell-panel>\n    ${footerHTML}\n  </calcite-shell>`',
      ...O.parameters?.docs?.source
    }
  }
};
V.parameters = {
  ...V.parameters,
  docs: {
    ...V.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-shell-panel slot="panel-top">\${centerPanelHTML}</calcite-shell-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell> \``,
      ...V.parameters?.docs?.source
    }
  }
};
R.parameters = {
  ...R.parameters,
  docs: {
    ...R.parameters?.docs,
    source: {
      originalSource: "(): string => contentBehindPanelBottomHtml[0]",
      ...R.parameters?.docs?.source
    }
  }
};
_.parameters = {
  ..._.parameters,
  docs: {
    ..._.parameters?.docs,
    source: {
      originalSource: "(): string => contentBehindPanelBottomHtml[1]",
      ..._.parameters?.docs?.source
    }
  }
};
j.parameters = {
  ...j.parameters,
  docs: {
    ...j.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-shell-panel slot="panel-bottom">\${centerPanelHTML}</calcite-shell-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
\``,
      ...j.parameters?.docs?.source
    }
  }
};
G.parameters = {
  ...G.parameters,
  docs: {
    ...G.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-shell-panel slot="panel-top">\${centerPanelHTML}</calcite-shell-panel>
    <calcite-shell-panel slot="panel-bottom">\${centerPanelHTML}</calcite-shell-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
\``,
      ...G.parameters?.docs?.source
    }
  }
};
Z.parameters = {
  ...Z.parameters,
  docs: {
    ...Z.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-shell-panel slot="panel-start" display-mode="dock" width-scale="m">
      \${advancedLeadingPanelHTML}
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-end" display-mode="dock" width-scale="m">
      \${advancedTrailingPanelHTMl}
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-top">\${centerPanelHTML}</calcite-shell-panel>
    <calcite-shell-panel slot="panel-bottom">\${centerPanelHTML}</calcite-shell-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
\``,
      ...Z.parameters?.docs?.source
    }
  }
};
Y.parameters = {
  ...Y.parameters,
  docs: {
    ...Y.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-shell content-behind>\n    ${headerHTML}\n    <calcite-shell-panel slot="panel-start">${leadingPanelHTML}</calcite-shell-panel>\n    ${contentHTML}\n    <calcite-shell-panel slot="panel-bottom">${centerPanelWithActionBarHTML}</calcite-shell-panel>\n    <calcite-shell-panel slot="panel-end">${trailingPanelHTML}</calcite-shell-panel>\n    ${footerHTML}\n  </calcite-shell>`',
      ...Y.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-shell
      style="
height:400px;
position:relative;
"
    >
      <calcite-shell-panel slot="panel-start" collapsed>
        <calcite-action-bar slot="action-bar">
          <calcite-tooltip slot="expand-tooltip">Expand</calcite-tooltip>
        </calcite-action-bar>
      </calcite-shell-panel>
      <calcite-shell-panel slot="panel-bottom">
        <div style="height: 100%; width: 600px; background-color: black;"></div>
      </calcite-shell-panel>
    </calcite-shell>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelector("calcite-tooltip").open = true;
      });
    <\/script>\``,
      ...y.parameters?.docs?.source
    }
  }
};
q.parameters = {
  ...q.parameters,
  docs: {
    ...q.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-shell
    style="
width:100%;
height:500px;
max-height:80%;
position:relative;
"
  >
    <calcite-shell-panel resizable slot="panel-start">
      <calcite-action-bar slot="action-bar" class="calcite-mode-dark">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers"><p>Start Panel</p></calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel resizable slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow id="flow">
        <calcite-flow-item
          heading="Configure popup"
          description="Popular Demographics in the United States (Beta) - County"
        >
          <p>End Panel</p>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel resizable slot="panel-top">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Top Panel</p>
    </calcite-shell-panel>
    <calcite-shell-panel resizable slot="panel-bottom">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Bottom Panel</p>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...q.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-shell
    dir="rtl"
    style="
width:100%;
height:500px;
max-height:80%;
position:relative;
"
  >
    <calcite-shell-panel resizable slot="panel-start">
      <calcite-action-bar slot="action-bar" class="calcite-mode-dark">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers"><p>Start Panel</p></calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel resizable slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow id="flow">
        <calcite-flow-item
          heading="Configure popup"
          description="Popular Demographics in the United States (Beta) - County"
        >
          <p>End Panel</p>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel resizable slot="panel-top">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Top Panel</p>
    </calcite-shell-panel>
    <calcite-shell-panel resizable slot="panel-bottom">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Bottom Panel</p>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...k.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-shell
    style="
width:800px;
height:600px;
position:relative;
"
  >
    <calcite-shell-panel display-mode="overlay" resizable id="primary-panel" slot="panel-start">
      <calcite-action-bar slot="action-bar" class="calcite-mode-dark">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" height-scale="l" width-scale="m">
        <calcite-fab slot="fab" id="layer-fab" text="Add layers"></calcite-fab>
        <calcite-tooltip label="tooltip" reference-element="layer-fab">Add layers</calcite-tooltip>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="overlay" resizable slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow id="flow">
        <calcite-flow-item
          heading="Configure popup"
          description="Popular Demographics in the United States (Beta) - County"
          width-scale="m"
        >
          <calcite-action slot="header-actions-end" icon="x" text="Close"> </calcite-action>
          <calcite-block heading="Title" description="County: {NAME}" expandable icon-start="title">
            <div class="combo-control">
              <div class="combo-button">
                <button class="combo-button__main">County: {NAME}</button>
                <calcite-action label="code icon" class="combo-action" scale="s" icon="code"></calcite-action>
              </div>
            </div>
          </calcite-block>
          <calcite-sortable-list>
            <calcite-block drag-handle heading="Attributes" description="2/98" expandable icon-start="feature-details">
              <calcite-action label="ellipsis" slot="actions-end" icon="ellipsis" scale="m"></calcite-action>
              <calcite-list drag-enabled>
                <calcite-list-item
                  label="2018 Total Households (Esri)"
                  value="Households"
                  description="{TOTHH_CY}"
                ></calcite-list-item>
                <calcite-list-item
                  label="2018 Average Household Size (Esri)"
                  value="Household"
                  description="{AVGHHSZ_CY}"
                ></calcite-list-item>
              </calcite-list>
              <div class="row">
                <calcite-button id="attribute-add" round icon="plus" scale="s" width="full" kind="neutral"
                  >Select attributes</calcite-button
                >
              </div>
            </calcite-block>
            <calcite-block drag-handle heading="Image" expandable icon-start="image">
              <calcite-action label="ellipsis" slot="actions-end" icon="ellipsis" scale="m"></calcite-action>
              <section class="form-section">
                <label>
                  URL
                  <input type="text" value="https://ca-times.brightspotcdn.com/dims4/default/" />
                </label>
              </section>
              <calcite-block-section text="Options">
                <section class="form-section">
                  <label>
                    Title
                    <input type="text" placeholder="My cool title" />
                  </label>
                  <label>
                    Caption
                    <input type="text" placeholder="My cool caption" />
                  </label>
                  <label>
                    State
                    <select placeholder="My cool caption">
                      <option value="Denial">Denial</option>
                      <option value="Grace">Grace</option>
                      <option value="Confusion">Confusion</option>
                    </select>
                  </label>
                </section>
              </calcite-block-section>
              <calcite-block-section text="Advanced options">
                <section class="form-section">
                  <label>
                    Title
                    <input type="text" placeholder="My cool title" />
                  </label>
                  <label>
                    Caption
                    <input type="text" placeholder="My cool caption" />
                  </label>
                  <label>
                    State
                    <select placeholder="My cool caption">
                      <option value="Denial">Denial</option>
                      <option value="Grace">Grace</option>
                      <option value="Confusion">Confusion</option>
                    </select>
                  </label>
                </section>
              </calcite-block-section>
            </calcite-block>
            <calcite-block
              drag-handle
              heading="Text"
              description="Cool. he {expression/..."
              expandable
              icon-start="image"
            >
              <calcite-action label="ellipsis" slot="actions-end" icon="ellipsis" scale="m"></calcite-action>
              <button class="multiline-button">Cool. he {expression/expr1} population is {expression/expr2}%...</button>
            </calcite-block>
          </calcite-sortable-list>
          <calcite-fab slot="fab" id="label-fab" text="Add label class"></calcite-fab>
          <calcite-tooltip label="tooltip" reference-element="label-fab"> Add label class </calcite-tooltip>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel collapsed display-mode="overlay" resizable slot="panel-top">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example"> Example </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel collapsed display-mode="overlay" resizable slot="panel-bottom">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example"> Example </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...w.parameters?.docs?.source
    }
  }
};
Q.parameters = {
  ...Q.parameters,
  docs: {
    ...Q.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-shell>
    <calcite-shell-panel slot="panel-end" width-scale="l" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action text="Save" icon="save" indicator></calcite-action>
        <calcite-action active icon="map" text="Map"></calcite-action>
        <calcite-action icon="layer" text="Layer"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Map Options">
        <calcite-button width="half" slot="footer"> Next </calcite-button>
        <calcite-block
          expandable
          heading="Layer effects"
          description="Adjust blur, highlight, and more"
          icon-start="effects"
        >
          <calcite-notice open>
            <div slot="message">Use layer effects sparingly, for emphasis</div>
          </calcite-notice>
        </calcite-block>
        <calcite-block
          expandable
          heading="Symbology"
          description="Select type, color, and transparency"
          icon-start="map-pin"
        >
          <calcite-notice open>
            <div slot="message">The viewers are going to love this</div>
          </calcite-notice>
        </calcite-block>
        <calcite-fab slot="fab"></calcite-fab>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...Q.parameters?.docs?.source
    }
  }
};
J.parameters = {
  ...J.parameters,
  docs: {
    ...J.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-shell>
    <calcite-shell-panel slot="panel-top" display-mode="float-all" width-scale="m">
      <calcite-action-bar slot="action-bar" expand-toggle-disabled layout="horizontal" overlay-positioning="absolute">
        <calcite-action-group layout="horizontal" overlay-positioning="absolute">
          <calcite-action text="Save" icon="save" indicator appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="map" text="New" appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="collection" text="Open" appearance="solid" scale="m"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="horizontal" overlay-positioning="absolute">
          <calcite-action icon="layers" text="Layers" active appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps" appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="legend" text="Legend" appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks" appearance="solid" scale="m"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="horizontal" overlay-positioning="absolute">
          <calcite-action text="Share" icon="share" appearance="solid" scale="m"></calcite-action>
          <calcite-action text="Print" icon="print" appearance="solid" scale="m"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end" layout="horizontal" overlay-positioning="absolute">
          <calcite-action text="Feedback" icon="speech-bubble-plus" appearance="solid" scale="m"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone" appearance="solid" scale="m"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable id="panel-top" overlay-positioning="absolute" scale="m">
        <calcite-block open heading="Preview display-mode" overlay-positioning="absolute">
          <calcite-chip-group id="chip-group-panel-top" selection-mode="single-persist" scale="m">
            <calcite-chip value="dock" appearance="solid" kind="neutral" scale="m">dock</calcite-chip>
            <calcite-chip value="float-content" appearance="solid" kind="neutral" scale="m">float content</calcite-chip>
            <calcite-chip value="overlay" appearance="solid" kind="neutral" scale="m">overlay</calcite-chip>
            <calcite-chip value="float-all" appearance="solid" kind="neutral" scale="m" selected
              >float all</calcite-chip
            >
          </calcite-chip-group>
          <calcite-chip-group id="chip-layout-panel-top" selection-mode="single-persist" scale="m">
            <calcite-chip value="vertical" appearance="solid" kind="neutral" scale="m">Vertical</calcite-chip>
            <calcite-chip selected value="horizontal" appearance="solid" kind="neutral" scale="m"
              >Horizontal</calcite-chip
            >
          </calcite-chip-group>
          <div class="tall-content-example" style="display: none"></div>
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...J.parameters?.docs?.source
    }
  }
};
K.parameters = {
  ...K.parameters,
  docs: {
    ...K.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-shell>
    <calcite-shell-panel slot="panel-top" display-mode="float-all" width-scale="m">
      <calcite-action-bar slot="action-bar" expand-toggle-disabled layout="vertical" overlay-positioning="absolute">
        <calcite-action-group layout="vertical" overlay-positioning="absolute">
          <calcite-action text="Save" icon="save" indicator appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="map" text="New" appearance="solid" scale="m" text-enabled slot="menu-actions">
          </calcite-action>
          <calcite-action icon="collection" text="Open" appearance="solid" scale="m" text-enabled slot="menu-actions">
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="vertical" overlay-positioning="absolute">
          <calcite-action icon="layers" text="Layers" active appearance="solid" scale="m"> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps" appearance="solid" scale="m" text-enabled slot="menu-actions">
          </calcite-action>
          <calcite-action icon="legend" text="Legend" appearance="solid" scale="m" text-enabled slot="menu-actions">
          </calcite-action>
          <calcite-action
            icon="bookmark"
            text="Bookmarks"
            appearance="solid"
            scale="m"
            text-enabled
            slot="menu-actions"
          >
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="vertical" overlay-positioning="absolute">
          <calcite-action text="Share" icon="share" appearance="solid" scale="m"></calcite-action>
          <calcite-action text="Print" icon="print" appearance="solid" scale="m"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end" layout="vertical" overlay-positioning="absolute">
          <calcite-action text="Feedback" icon="speech-bubble-plus" appearance="solid" scale="m"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone" appearance="solid" scale="m"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable id="panel-top" overlay-positioning="absolute" scale="m">
        <calcite-block open heading="Preview display-mode" overlay-positioning="absolute">
          <calcite-chip-group id="chip-group-panel-top" selection-mode="single-persist" scale="m">
            <calcite-chip value="dock" appearance="solid" kind="neutral" scale="m">dock</calcite-chip>
            <calcite-chip value="float-content" appearance="solid" kind="neutral" scale="m">float content</calcite-chip>
            <calcite-chip value="overlay" appearance="solid" kind="neutral" scale="m">overlay</calcite-chip>
            <calcite-chip value="float-all" appearance="solid" kind="neutral" scale="m" selected
              >float all</calcite-chip
            >
          </calcite-chip-group>
          <calcite-chip-group id="chip-layout-panel-top" selection-mode="single-persist" scale="m">
            <calcite-chip value="vertical" appearance="solid" kind="neutral" scale="m" selected>Vertical</calcite-chip>
            <calcite-chip value="horizontal" appearance="solid" kind="neutral" scale="m">Horizontal</calcite-chip>
          </calcite-chip-group>
          <div class="tall-content-example" style="display: none"></div>
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...K.parameters?.docs?.source
    }
  }
};
X.parameters = {
  ...X.parameters,
  docs: {
    ...X.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-shell>
    <calcite-shell-panel id="panel-start" slot="panel-start" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator></calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel 1">
        <calcite-block heading="Block 1" expandable></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Main content"></calcite-panel>
    <calcite-shell-panel id="panel-end" slot="panel-end" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator></calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel 1">
        <calcite-block heading="Block 1" expandable></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...X.parameters?.docs?.source
    }
  }
};
ee.parameters = {
  ...ee.parameters,
  docs: {
    ...ee.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-shell>
    <calcite-shell-panel slot="panel-start" id="shell-panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
          <calcite-action active text="Layers" indicator icon="layers"></calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Undo" icon="undo"></calcite-action>
          <calcite-action text="Redo" indicator icon="redo"></calcite-action>
          <calcite-action text="Save" disabled icon="save"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" icon="question"></calcite-action>
          <calcite-action text="Settings" indicator icon="gear"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" id="panel-start" closable>
        <calcite-block
          expandable
          heading="Symbology"
          description="Select type, color, and transparency"
          icon-start="map-pin"
        >
          <calcite-notice open>
            <div slot="message">The viewers are going to love this</div>
          </calcite-notice>
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-bottom">
      <calcite-panel heading="Content">
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title selected> Watercraft </calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
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
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-end">
      <calcite-panel heading="Content">
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title selected> Watercraft </calcite-tab-title>
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
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...ee.parameters?.docs?.source
    }
  }
};
te.parameters = {
  ...te.parameters,
  docs: {
    ...te.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <style>
      #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: gray;
      }
    </style>
    <calcite-shell content-behind>
      <div id="viewDiv"></div>
      <calcite-shell-panel slot="panel-start"></calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">
        <calcite-flow>
          <calcite-flow-item heading="panel header">
            <calcite-button id="button" style="margin-top:20px">open popover</calcite-button>
          </calcite-flow-item>
        </calcite-flow>
      </calcite-shell-panel> </calcite-shell
    ><calcite-popover open reference-element="button" offset-distance="-50" offset-skidding="15" style="z-index: 100">
      <calcite-panel height-scale="m" heading="popover panel header" style="height: 400px;"> </calcite-panel
    ></calcite-popover>\``,
      ...te.parameters?.docs?.source
    }
  }
};
ae.parameters = {
  ...ae.parameters,
  docs: {
    ...ae.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-shell>
    <calcite-shell-panel slot="panel-start" id="shell-panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action id="target-element" text="Save" icon="save" indicator></calcite-action>
        <calcite-action active icon="map" text="Map"></calcite-action>
        <calcite-action icon="layer" text="Layer"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Map" id="panel-start">
        <calcite-block heading="Block 1" expandable></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>

    <!--  Popover here  -->
    <calcite-popover overlay-positioning="fixed" reference-element="target-element" open
      ><p>This is a popover</p></calcite-popover
    >

    <calcite-shell-panel slot="panel-end" id="shell-panel-end" collapsed>
      <calcite-action-bar slot="action-bar">
        <calcite-action text="Layer" icon="sliders-horizontal"></calcite-action>
        <calcite-action text="Styles" icon="shapes"></calcite-action>
        <calcite-action text="Filter" icon="layer-filter"></calcite-action>
        <calcite-action text="Configure" icon="popup"></calcite-action>
      </calcite-action-bar>
      <calcite-panel id="panel-end" closable closed>
        <calcite-block heading="Block 1" expandable></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>\``,
      ...ae.parameters?.docs?.source
    }
  }
};
ie.parameters = {
  ...ie.parameters,
  docs: {
    ...ie.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-shell content-behind>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel display-mode="float-all" slot="panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel closable heading="Layers" height-scale="l" width-scale="m">
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" slot="panel-end" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
        </calcite-action>
        <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
        <calcite-action text-enabled text="Tables" icon="table" slot="menu-actions"> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Tips" icon="lightbulb" slot="actions-end"> </calcite-action>
      </calcite-action-bar>
      <calcite-panel
        closable
        heading="Configure popup"
        description="Popular Demographics in the United States (Beta) - County"
        width-scale="m"
      >
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all"  slot="panel-top" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable>
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all"  slot="panel-bottom" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-action text="Save" icon="save" indicator> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Feedback" icon="speech-bubble-plus" slot="actions-end"></calcite-action>
        <calcite-action text="What's next" icon="mega-phone" slot="actions-end"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable>
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...ie.parameters?.docs?.source
    }
  }
};
ce.parameters = {
  ...ce.parameters,
  docs: {
    ...ce.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-shell>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel slot="panel-start" id="shell-panel-start" resizable width="s">
      <calcite-action-bar slot="action-bar">
        <calcite-action text="Save" icon="save" indicator text-enabled></calcite-action>
        <calcite-action active icon="map" text="Map" text-enabled></calcite-action>
        <calcite-action icon="layer" text="Layer" text-enabled></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Map" id="panel-start">
        <calcite-dropdown open width="m" overlay-positioning="fixed">
          <calcite-button slot="trigger">Select landform</calcite-button>
          <calcite-dropdown-group group-title="Natural places">
            <calcite-dropdown-item>Mountain</calcite-dropdown-item>
            <calcite-dropdown-item>River</calcite-dropdown-item>
            <calcite-dropdown-item>Waterfall</calcite-dropdown-item>
            <calcite-dropdown-item>Rainforest</calcite-dropdown-item>
            <calcite-dropdown-item>Tundra</calcite-dropdown-item>
            <calcite-dropdown-item>Desert</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...ce.parameters?.docs?.source
    }
  }
};
le.parameters = {
  ...le.parameters,
  docs: {
    ...le.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-shell content-behind>
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel display-mode="float-all" slot="panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel closable heading="Layers" height-scale="l" width-scale="m">
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" slot="panel-end" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
        </calcite-action>
        <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
        <calcite-action text-enabled text="Tables" icon="table" slot="menu-actions"> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Tips" icon="lightbulb" slot="actions-end"> </calcite-action>
      </calcite-action-bar>
      <calcite-panel
        closable
        heading="Configure popup"
        description="Popular Demographics in the United States (Beta) - County"
        width-scale="m"
      >
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all"  slot="panel-top" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example">
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all"  slot="panel-bottom" >
      <calcite-action-bar slot="action-bar" expand-toggle-disabled>
        <calcite-action text="Save" icon="save" indicator> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Feedback" icon="speech-bubble-plus" slot="actions-end"></calcite-action>
        <calcite-action text="What's next" icon="mega-phone" slot="actions-end"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable>
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...le.parameters?.docs?.source
    }
  }
};
P.parameters = {
  ...P.parameters,
  docs: {
    ...P.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-shell content-behind>
    <div
      style="
            width:100%;
            height:100%;
            background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <calcite-shell-panel slot="panel-bottom">
      <calcite-panel heading="Panel">
        <p>
          Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
          facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
          hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
          commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
          etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
          inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
          enim.
        </p>
        <p>
          Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
          blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
          fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
          curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
          Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
          pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
        </p>
        <p>
          Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis vivamus
          primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis lacinia
          consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id imperdiet magna
          imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin adipiscing lacinia.
          Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa facilisis nibh congue at
          torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
        </p>
        <p>
          Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
          hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras consectetur
          et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu sed gravida.
          Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
        </p>
        <p>
          Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
          pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
          risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
          consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl nunc
          porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
        </p>
        <p>
          Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
          ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel quisque.
          Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus sollicitudin
          integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem litora, feugiat
          velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus suscipit sed risus.
          Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet lacinia nullam
          ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
        </p>
        <p>
          Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
          ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum eu
          lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad suspendisse
          maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam himenaeos sem
          cras velit inceptos nisl metus? Dignissim.
        </p>
        <p>
          Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
          aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
          condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
          varius? Elementum imperdiet suscipit nulla! Primis a leo.
        </p>
        <p>
          Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
          maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
          hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
          sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
          semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
        </p>
        <p>
          Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
          Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
          posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
          risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
          pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
          sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
          curabitur!
        </p>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-start">
      <calcite-action-bar overflow-actions-disabled slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <p>
          Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
          facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
          hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
          commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
          etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
          inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
          enim.
        </p>
        <p>
          Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
          blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
          fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
          curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
          Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
          pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
        </p>
        <p>
          Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis vivamus
          primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis lacinia
          consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id imperdiet magna
          imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin adipiscing lacinia.
          Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa facilisis nibh congue at
          torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
        </p>
        <p>
          Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
          hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras consectetur
          et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu sed gravida.
          Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
        </p>
        <p>
          Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
          pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
          risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
          consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl nunc
          porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
        </p>
        <p>
          Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
          ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel quisque.
          Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus sollicitudin
          integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem litora, feugiat
          velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus suscipit sed risus.
          Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet lacinia nullam
          ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
        </p>
        <p>
          Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
          ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum eu
          lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad suspendisse
          maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam himenaeos sem
          cras velit inceptos nisl metus? Dignissim.
        </p>
        <p>
          Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
          aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
          condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
          varius? Elementum imperdiet suscipit nulla! Primis a leo.
        </p>
        <p>
          Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
          maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
          hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
          sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
          semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
        </p>
        <p>
          Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
          Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
          posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
          risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
          pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
          sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
          curabitur!
        </p>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01"> </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <p>
            Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
            facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
            hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
            commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
            etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
            inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
            enim.
          </p>
          <p>
            Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
            blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
            fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
            curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
            Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
            pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
          </p>
          <p>
            Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis
            vivamus primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis
            lacinia consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id
            imperdiet magna imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin
            adipiscing lacinia. Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa
            facilisis nibh congue at torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
          </p>
          <p>
            Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
            hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras
            consectetur et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu
            sed gravida. Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
          </p>
          <p>
            Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
            pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
            risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
            consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl
            nunc porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
          </p>
          <p>
            Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
            ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel
            quisque. Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus
            sollicitudin integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem
            litora, feugiat velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus
            suscipit sed risus. Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet
            lacinia nullam ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
          </p>
          <p>
            Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
            ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum
            eu lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad
            suspendisse maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam
            himenaeos sem cras velit inceptos nisl metus? Dignissim.
          </p>
          <p>
            Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
            aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
            condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
            varius? Elementum imperdiet suscipit nulla! Primis a leo.
          </p>
          <p>
            Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
            maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
            hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
            sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
            semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
          </p>
          <p>
            Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
            Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
            posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
            risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
            pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
            sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
            curabitur!
          </p>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...P.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<style>
      #start,
      #end {
        border: 1px solid red;
      }

      #bottom {
        --calcite-shell-panel-height: 200px;
        --calcite-shell-panel-max-height: 200px;
        --calcite-shell-panel-min-height: 200px;
        border: 1px solid green;
      }

      #viewDiv {
        height: 100%;
        width: 100%;
        background-color: #c3e3cc;
      }</style
    ><calcite-shell content-behind>
      <div id="viewDiv"></div>
      <calcite-shell-panel id="start" slot="panel-start">Start</calcite-shell-panel>
      <calcite-shell-panel id="bottom" slot="panel-bottom">
        <calcite-panel id="panel">
          <div>The panel should fill the entire bottom half of the bounding box.</div>
        </calcite-panel>
      </calcite-shell-panel>
      <calcite-shell-panel id="end" slot="panel-end">End</calcite-shell-panel>
    </calcite-shell>\``,
      ...S.parameters?.docs?.source
    }
  }
};
ne.parameters = {
  ...ne.parameters,
  docs: {
    ...ne.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-shell content-behind>
    <div
      style="
              width:100%;
              height:100%;
              background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
              linear-gradient(-45deg, #ccc 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #ccc 75%),
              linear-gradient(-45deg, transparent 75%, #ccc 75%);
              background-size: 20px 20px;
              background-position: 0 0, 0 10px, 10px -10px, -10px 0;"
    ></div>
    <div
      slot="panel-bottom"
      style="height:66%; --calcite-shell-panel-max-height: auto;
    --calcite-shell-panel-min-height: auto;
    --calcite-shell-panel-height: auto;"
    >
      <calcite-shell-panel display-mode="float" width-scale="l" slot="panel-bottom" style="height: 100%;">
        <calcite-panel heading="Panel">
          <div style="display: flex; flex-direction: row; height: 100%; width:100%">
            <calcite-action-bar
              overflow-actions-disabled
              style="display: flex; flex-direction: column; height: 100%; border-right: 1px solid var(--calcite-color-border-2); overflow-x: hidden;"
              layout="vertical"
              overlay-positioning="absolute"
              scale="m"
            >
              <slot name="custom-action-top"></slot
              ><calcite-action-group layout="vertical" overlay-positioning="absolute" scale="m">
                <div><calcite-action icon="gear" id="editChart" appearance="solid" scale="m"></calcite-action></div>
                <div>
                  <calcite-action id="legend" appearance="solid" disabled scale="m" aria-disabled="true"
                    ><calcite-icon icon="legend" scale="s" flip-rtl aria-hidden="true"></calcite-icon
                  ></calcite-action>
                </div>
                <div>
                  <calcite-action icon="rotate" id="rotateChart" appearance="solid" scale="m"></calcite-action>
                </div> </calcite-action-group
              ><calcite-action-group layout="vertical" overlay-positioning="absolute" scale="m">
                <div>
                  <calcite-action
                    icon="selection-filter"
                    id="filterBySelection"
                    appearance="solid"
                    disabled
                    scale="m"
                    aria-disabled="true"
                  ></calcite-action>
                </div>
                <div>
                  <calcite-action
                    icon="extent-filter"
                    id="filterByExtent"
                    appearance="solid"
                    scale="m"
                    aria-describedby="calcite-tooltip-4ece6511-9e21-cf51-f2a2-5d94d7ce0b49"
                  ></calcite-action>
                </div> </calcite-action-group
              ><calcite-action-group layout="vertical" overlay-positioning="absolute" scale="m">
                <div>
                  <calcite-action
                    icon="erase"
                    id="clearSelection"
                    appearance="solid"
                    disabled
                    scale="m"
                    aria-disabled="true"
                  ></calcite-action>
                </div>

                <div>
                  <calcite-action
                    icon="arrow-right-left"
                    id="switchSelection"
                    appearance="solid"
                    scale="m"
                  ></calcite-action>
                </div>
              </calcite-action-group>
              <slot name="custom-action-below"></slot>
            </calcite-action-bar>
            <div
              style="flex-grow: 1;
    overflow-y: hidden;"
            >
              <div style="width: 100%; height: 100%; position: static; left: 0.195313px; top: -0.5px;">
                <img
                  alt="placeholder image"
                  src="\${placeholderImage({
  width: 631,
  height: 297
})}"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </calcite-panel>
      </calcite-shell-panel>
    </div>
    <calcite-shell-panel display-mode="float-all" slot="panel-start">
      <calcite-action-bar overflow-actions-disabled slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <p>
          Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
          facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
          hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
          commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
          etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
          inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
          enim.
        </p>
        <p>
          Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
          blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
          fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
          curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
          Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
          pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
        </p>
        <p>
          Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis vivamus
          primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis lacinia
          consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id imperdiet magna
          imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin adipiscing lacinia.
          Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa facilisis nibh congue at
          torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
        </p>
        <p>
          Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
          hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras consectetur
          et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu sed gravida.
          Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
        </p>
        <p>
          Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
          pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
          risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
          consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl nunc
          porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
        </p>
        <p>
          Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
          ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel quisque.
          Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus sollicitudin
          integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem litora, feugiat
          velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus suscipit sed risus.
          Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet lacinia nullam
          ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
        </p>
        <p>
          Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
          ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum eu
          lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad suspendisse
          maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam himenaeos sem
          cras velit inceptos nisl metus? Dignissim.
        </p>
        <p>
          Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
          aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
          condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
          varius? Elementum imperdiet suscipit nulla! Primis a leo.
        </p>
        <p>
          Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
          maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
          hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
          sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
          semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
        </p>
        <p>
          Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
          Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
          posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
          risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
          pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
          sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
          curabitur!
        </p>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" slot="panel-end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01"> </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <p>
            Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
            facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
            hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
            commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
            etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
            inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
            enim.
          </p>
          <p>
            Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
            blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
            fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
            curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
            Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
            pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
          </p>
          <p>
            Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis
            vivamus primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis
            lacinia consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id
            imperdiet magna imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin
            adipiscing lacinia. Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa
            facilisis nibh congue at torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
          </p>
          <p>
            Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
            hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras
            consectetur et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu
            sed gravida. Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
          </p>
          <p>
            Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
            pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
            risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
            consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl
            nunc porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
          </p>
          <p>
            Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
            ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel
            quisque. Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus
            sollicitudin integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem
            litora, feugiat velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus
            suscipit sed risus. Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet
            lacinia nullam ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
          </p>
          <p>
            Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
            ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum
            eu lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad
            suspendisse maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam
            himenaeos sem cras velit inceptos nisl metus? Dignissim.
          </p>
          <p>
            Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
            aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
            condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
            varius? Elementum imperdiet suscipit nulla! Primis a leo.
          </p>
          <p>
            Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
            maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
            hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
            sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
            semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
          </p>
          <p>
            Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
            Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
            posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
            risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
            pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
            sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
            curabitur!
          </p>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
  </calcite-shell>\``,
      ...ne.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell>
    <div slot="header">Header Example</div>
    <calcite-dialog open modal slot="dialogs"
      ><span slot="header-content">Dialog slotted in Shell</span></calcite-dialog
    >
    <calcite-alert open slot="alerts" placement="top-end"
      ><span slot="title">Alert slotted in Shell</span>
    </calcite-alert>
    <calcite-sheet open slot="sheets" label="libero nunc" position="inline-start" display-mode="overlay">
      <calcite-panel closable heading="Ultrices neque"
        ><p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
        <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
      </calcite-panel>
    </calcite-sheet>
    <calcite-shell-panel id="primary-panel" slot="panel-start" position="start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <div class="padded-content">Panel content<br />Padding is fake.</div>
      </calcite-panel>
    </calcite-shell-panel>

    <calcite-shell-panel slot="panel-end" position="end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01">
          <div class="padded-content">Flow 01 content<br />Padding is fake.</div>
        </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <div class="padded-content">Flow 02 content<br />Padding is fake.</div>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>

    <calcite-panel heading="Main content">
      <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>
    </calcite-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
\``,
      ...L.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(args: ShellSlottedElementsStoryArgs): string => html\`
  <calcite-shell>
    <div slot="header">Header Example</div>
    <calcite-dialog
      slot="dialogs"
      modal
      open
      placement="\${args.dialogPlacement}"
      style="--calcite-dialog-size-x: \${args.dialogWidth}; --calcite-dialog-size-y: \${args.dialogHeight}"
    >
      <h3 slot="header-content">Test custom dialog sizes in slotted dialog in shell</h3>
      Expected behavior: none: css var for height + width adhered to. Below width, goes to fullscreen. fullscreen:
      ignores css var for height + width. docked: css var for height + width adhered to. Below width, docks, with
      provided height
      <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    </calcite-dialog>
    <calcite-alert open slot="alerts" placement="top-end"
      ><span slot="title">Alert slotted in Shell</span>
    </calcite-alert>
    <calcite-shell-panel slot="panel-start" position="start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
          <calcite-action icon="legend" text="Legend"> </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <div class="padded-content">Panel content<br />Padding is fake.</div>
      </calcite-panel>
    </calcite-shell-panel>

    <calcite-shell-panel slot="panel-end" position="end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip">Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01">
          <div class="padded-content">Flow 01 content<br />Padding is fake.</div>
        </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <div class="padded-content">Flow 02 content<br />Padding is fake.</div>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>

    <calcite-panel heading="Main content">
      <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>
    </calcite-panel>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
oe.parameters = {
  ...oe.parameters,
  docs: {
    ...oe.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <h3>layout="vertical" & display-mode="float-all" & height="s"</h3>
  <div style="position:relative; height: 180px">
    <calcite-shell>
      <calcite-shell-panel layout="vertical" display-mode="float-all" height="s">
        <calcite-panel heading="Example" description="example" closable> </calcite-panel>
      </calcite-shell-panel>
    </calcite-shell>
  </div>
  <br />
  <h3>layout="horizontal" & display-mode="float-all" & height-scale="m"</h3>
  <div style="position:relative; height: 280px">
    <calcite-shell>
      <calcite-shell-panel layout="horizontal" display-mode="float-all" height-scale="m">
        <calcite-panel heading="Example" description="example" closable> </calcite-panel>
      </calcite-shell-panel>
    </calcite-shell>
  </div>
  <br/ >
  <h3>layout="vertical" & display-mode="float-all" & height="l"</h3>
  <div style="position:relative; height: 350px">
    <calcite-shell>
      <calcite-shell-panel layout="vertical" display-mode="float-all" height="l">
        <calcite-panel heading="Example" description="example" closable> </calcite-panel>
      </calcite-shell-panel>
    </calcite-shell>
  </div>
\``,
      ...oe.parameters?.docs?.source
    }
  }
};
se.parameters = {
  ...se.parameters,
  docs: {
    ...se.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .corner-radius-and-box-shadow {
      display: grid;
      gap: var(--calcite-space-3xl);
      padding: var(--calcite-space-3xl);
    }
    .corner-radius-and-box-shadow > calcite-shell {
      position: relative;
      inline-size: auto;
      block-size: auto;
    }
  </style>
  <div class="corner-radius-and-box-shadow">
    <calcite-shell style="--calcite-shell-corner-radius: var(--calcite-size-xs);">
      \${headerHTML}
      <calcite-shell-panel slot="panel-start">\${leadingPanelHTML}</calcite-shell-panel>
      \${contentHTML}
      <calcite-shell-panel slot="panel-bottom">\${centerPanelHTML}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">\${trailingPanelHTML}</calcite-shell-panel>
      \${footerHTML}
    </calcite-shell>
    <calcite-shell style="--calcite-shell-corner-radius: var(--calcite-size-xs);">
      <calcite-shell-panel slot="panel-start">\${leadingPanelHTML}</calcite-shell-panel>
      \${contentHTML}
      <calcite-shell-panel slot="panel-bottom">\${centerPanelHTML}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">\${trailingPanelHTML}</calcite-shell-panel>
    </calcite-shell>
    <calcite-shell style="--calcite-shell-shadow: var(--calcite-shadow-md);">
      \${headerHTML}
      <calcite-shell-panel slot="panel-start">\${leadingPanelHTML}</calcite-shell-panel>
      \${contentHTML}
      <calcite-shell-panel slot="panel-bottom">\${centerPanelHTML}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">\${trailingPanelHTML}</calcite-shell-panel>
      \${footerHTML}
    </calcite-shell>
    <calcite-shell style="--calcite-shell-shadow: var(--calcite-shadow-md);">
      <calcite-shell-panel slot="panel-start">\${leadingPanelHTML}</calcite-shell-panel>
      \${contentHTML}
      <calcite-shell-panel slot="panel-bottom">\${centerPanelHTML}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">\${trailingPanelHTML}</calcite-shell-panel>
    </calcite-shell>
    <calcite-shell
      style="--calcite-shell-corner-radius: var(--calcite-size-xs); --calcite-shell-shadow: var(--calcite-shadow-md);"
    >
      \${headerHTML}
      <calcite-shell-panel slot="panel-start">\${leadingPanelHTML}</calcite-shell-panel>
      \${contentHTML}
      <calcite-shell-panel slot="panel-bottom">\${centerPanelHTML}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">\${trailingPanelHTML}</calcite-shell-panel>
      \${footerHTML}
    </calcite-shell>
    <calcite-shell
      style="--calcite-shell-corner-radius: var(--calcite-size-xs); --calcite-shell-shadow: var(--calcite-shadow-md);"
    >
      <calcite-shell-panel slot="panel-start">\${leadingPanelHTML}</calcite-shell-panel>
      \${contentHTML}
      <calcite-shell-panel slot="panel-bottom">\${centerPanelHTML}</calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">\${trailingPanelHTML}</calcite-shell-panel>
    </calcite-shell>
  </div>
\``,
      ...se.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(args: PanelWithActionBarPositionStoryArgs): string => {
  const isHorizontal = args.shellPanelSlot === "panel-top" || args.shellPanelSlot === "panel-bottom";
  const panelPosition = args.shellPanelSlot === "panel-end" || args.shellPanelSlot === "panel-bottom" ? "end" : "start";
  return html\`
    \${shellSampleContentStyles}
    <calcite-shell
      style="
        --calcite-shell-panel-height: 400px; 
        --calcite-shell-panel-min-height: 200px; 
        --calcite-shell-panel-max-height: 900px; 
        --calcite-shell-panel-min-width: 200px; 
        --calcite-shell-panel-max-width: 900px;
        \${args.applyShellBorderColor ? "--calcite-shell-border-color: red;" : ""}"
    >
      <calcite-shell-panel
        id="shellPanel"
        slot="\${args.shellPanelSlot}"
        action-bar-position="\${args.actionBarPosition}"
        layout="\${isHorizontal ? "horizontal" : "vertical"}"
        position="\${panelPosition}"
        width="l"
        \${boolean("resizable", args.isResizable)}
      >
        \${args.includeActionBar ? actionBarHTML : ""} \${panelHTML}
      </calcite-shell-panel>
      \${actionBarPositionPanelHTML}
    </calcite-shell>
  \`;
}`,
      ...d.parameters?.docs?.source
    }
  }
};
re.parameters = {
  ...re.parameters,
  docs: {
    ...re.parameters?.docs,
    source: {
      originalSource: 'createShellPanelWithActionBarPositionPanelSlotStory("panel-start", "vertical", "start")',
      ...re.parameters?.docs?.source
    }
  }
};
pe.parameters = {
  ...pe.parameters,
  docs: {
    ...pe.parameters?.docs,
    source: {
      originalSource: 'createShellPanelWithActionBarPositionPanelSlotStory("panel-end", "vertical", "end")',
      ...pe.parameters?.docs?.source
    }
  }
};
ue.parameters = {
  ...ue.parameters,
  docs: {
    ...ue.parameters?.docs,
    source: {
      originalSource: 'createShellPanelWithActionBarPositionPanelSlotStory("panel-top", "horizontal", "start")',
      ...ue.parameters?.docs?.source
    }
  }
};
de.parameters = {
  ...de.parameters,
  docs: {
    ...de.parameters?.docs,
    source: {
      originalSource: 'createShellPanelWithActionBarPositionPanelSlotStory("panel-bottom", "horizontal", "end")',
      ...de.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `({
  applyShellBorderColor
}: ShellPanelWithActionBarPositionPanelSlotStoryArgs): string => {
  const items = ([["panel-start", "start"], ["panel-end", "end"]] as const).flatMap(([slot, position]) => (["top", "bottom"] as const).flatMap(actionBarPosition => [false, true].map(resizable => {
    const itemId = \`\${slot}-\${actionBarPosition}-\${resizable ? "resizable" : "fixed"}\`;
    return html\`
          <calcite-shell
            class="shell-set__item"
            id="shell-\${itemId}"
            style="
              --calcite-shell-panel-width: 300px;
              \${applyShellBorderColor ? "--calcite-shell-border-color: red;" : ""}
            "
          >
            <calcite-shell-panel
              id="shellPanel-\${itemId}"
              slot="\${slot}"
              action-bar-position="\${actionBarPosition}"
              layout="vertical"
              position="\${position}"
              width="l"
              \${boolean("resizable", resizable)}
            >
              \${actionBarHTML} \${panelHTML}
            </calcite-shell-panel>
            \${actionBarPositionPanelHTML}
          </calcite-shell>
        \`;
  })));
  return html\` \${shellSetStyles} \${shellSampleContentStyles}
    <div class="shell-set">\${items.join("")}</div>\`;
}`,
      ...m.parameters?.docs?.source
    }
  }
};
const $t = ["simple", "fullResizeHorizontal", "fullResizeHorizontalFloat", "fullResizeHorizontalFloatAll", "fullResizeVertical", "fullResizeVerticalFloat", "fullResizeVerticalFloatAll", "darkModeRTL", "closedPanelsFloat", "closedPanelsFloatContent", "endPanelFloat", "endPanelFloatContent", "slottedDialogAndAlert", "slottedSheetOverlay", "slottedSheetFloat", "slottedSheetFloatContent", "contentBehind", "slottedPanelTop", "contentBehindPanelBottomFloat", "contentBehindPanelBottomFloatContent", "slottedPanelBottom", "slottedPanelTopAndBottom", "slottedPanelTopAndBottomAndSides", "shellCenterRowWithActionBar", "shellPanelZIndex", "resizableShellPanels", "resizableShellPanelsRTL", "overlayDisplayMode", "panelEndWithPositionStart", "panelTopFloatHorizontal", "panelTopFloatVertical", "resizeHandlePositioning", "shellPanelWithTabs", "panelWithPopoverZIndex", "popoverZIndex", "floatAllArrangements", "resizableShellPanelWithDropdown", "floatAllArrangementsStart", "panelsWithOverflowingContent", "panelsWithHeightsDefined", "customPanelWithOverflowingContent", "embeddedSlots", "embeddedSlotsInteractive", "floatAllHeights", "cornerRadiusAndBoxShadow", "shellPanelWithActionBarPositionProp", "shellPanelWithActionBarPositionAndPanelStart", "shellPanelWithActionBarPositionAndPanelEnd", "shellPanelWithActionBarPositionAndPanelTop", "shellPanelWithActionBarPositionAndPanelBottom", "shellPanelWithActionBarPositionOverflow"];
export {
  $t as __namedExportsOrder,
  F as closedPanelsFloat,
  E as closedPanelsFloatContent,
  O as contentBehind,
  R as contentBehindPanelBottomFloat,
  _ as contentBehindPanelBottomFloatContent,
  se as cornerRadiusAndBoxShadow,
  ne as customPanelWithOverflowingContent,
  f as darkModeRTL,
  Bt as default,
  L as embeddedSlots,
  u as embeddedSlotsInteractive,
  D as endPanelFloat,
  H as endPanelFloatContent,
  ie as floatAllArrangements,
  le as floatAllArrangementsStart,
  oe as floatAllHeights,
  A as fullResizeHorizontal,
  T as fullResizeHorizontalFloat,
  M as fullResizeHorizontalFloatAll,
  B as fullResizeVertical,
  $ as fullResizeVerticalFloat,
  z as fullResizeVerticalFloatAll,
  w as overlayDisplayMode,
  Q as panelEndWithPositionStart,
  J as panelTopFloatHorizontal,
  K as panelTopFloatVertical,
  te as panelWithPopoverZIndex,
  S as panelsWithHeightsDefined,
  P as panelsWithOverflowingContent,
  ae as popoverZIndex,
  ce as resizableShellPanelWithDropdown,
  q as resizableShellPanels,
  k as resizableShellPanelsRTL,
  X as resizeHandlePositioning,
  Y as shellCenterRowWithActionBar,
  de as shellPanelWithActionBarPositionAndPanelBottom,
  pe as shellPanelWithActionBarPositionAndPanelEnd,
  re as shellPanelWithActionBarPositionAndPanelStart,
  ue as shellPanelWithActionBarPositionAndPanelTop,
  m as shellPanelWithActionBarPositionOverflow,
  d as shellPanelWithActionBarPositionProp,
  ee as shellPanelWithTabs,
  y as shellPanelZIndex,
  C as simple,
  I as slottedDialogAndAlert,
  j as slottedPanelBottom,
  V as slottedPanelTop,
  G as slottedPanelTopAndBottom,
  Z as slottedPanelTopAndBottomAndSides,
  U as slottedSheetFloat,
  W as slottedSheetFloatContent,
  N as slottedSheetOverlay
};
