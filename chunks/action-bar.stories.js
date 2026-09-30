/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { w as _ } from "./without.js";
import { b as D, m as W } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A as C } from "./resources34.js";
import "./action-bar.js";
import "./action.js";
import "./action-group.js";
import "./tooltip.js";
var F = Object.freeze, G = Object.defineProperty, U = (c, j) => F(G(c, "raw", { value: F(c.slice()) })), O;
const {
  layout: E,
  position: H,
  scale: N,
  selectionAppearance: V
} = C, ct = {
  title: "Components/Action Bar",
  args: {
    expandToggleDisabled: !1,
    expanded: !1,
    layout: E.values[1],
    position: H.defaultValue,
    expandPosition: "end",
    floating: !1,
    scale: N.defaultValue,
    selectionAppearance: V.values[2]
  },
  argTypes: {
    layout: {
      options: E.values,
      control: {
        type: "select"
      }
    },
    position: {
      options: H.values.filter((c) => c !== "top" && c !== "bottom"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: N.values,
      control: {
        type: "select"
      }
    },
    expandPosition: {
      options: H.values.filter((c) => c !== "top" && c !== "bottom"),
      control: {
        type: "select"
      }
    },
    selectionAppearance: {
      options: _(V.values, "icon", "border"),
      control: {
        type: "select"
      }
    }
  }
}, s = (c) => t`
  <calcite-action-bar
    ${D("expand-toggle-disabled", c.expandToggleDisabled)}
    ${D("expanded", c.expanded)}
    ${D("floating", c.floating)}
    layout="${c.layout}"
    position="${c.position}"
    expand-position="${c.expandPosition}"
    scale="${c.scale}"
    selection-appearance="${c.selectionAppearance}"
  >
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
`, d = (c) => t`<div style="padding:20px;">
    <calcite-action-bar position="${c.position}" floating>
      <calcite-action-group>
        <calcite-action text="Undo" label="Undo Action" icon="undo"></calcite-action>
        <calcite-action text="Redo" label="Redo Action" icon="redo"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Delete" label="Delete Item" icon="trash"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div> `, p = () => t`
  <style>
    calcite-action-bar {
      --calcite-action-bar-expanded-max-width: 150px;
    }
  </style>
  <div style="padding:20px;">
    <calcite-action-bar floating expanded>
      <calcite-action-group expanded>
        <calcite-action text-enabled text="Add to my custom action bar application" icon="plus"></calcite-action>
        <calcite-action text-enabled text="Save to my custom action bar application" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group expanded>
        <calcite-action text-enabled text="Layers in my custom action bar application" icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
`, x = () => t`<div style="padding:20px;">
    <calcite-action-bar floating layout="horizontal">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" appearance="solid" scale="m"></calcite-action>
        <calcite-action text="Save" icon="save" appearance="solid" scale="m"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" icon="layers" appearance="solid" scale="m"></calcite-action>
        <calcite-action text="Basemaps" icon="layer-basemap" appearance="solid" scale="m"></calcite-action>
      </calcite-action-group>
      <calcite-tooltip
        slot="expand-tooltip"
        id="calcite-tooltip-c19274e3-ff3b-6168-ef1e-8a700b056e1c"
        role="tooltip"
        overlay-positioning="absolute"
        placement="auto"
        style="visibility: hidden; pointer-events: none; position: absolute;"
        >Toggle Action bar</calcite-tooltip
      >
    </calcite-action-bar>
  </div>`, a = t`<calcite-action text-enabled text="Add" icon="plus"></calcite-action>
  <calcite-action text-enabled text="Save" icon="save"></calcite-action>
  <calcite-action slot="actions-start" text-enabled text="Layers" icon="layers"></calcite-action>
  <calcite-action slot="actions-end" text-enabled text="Basemaps" icon="layer-basemap"></calcite-action>
  <calcite-tooltip slot="expand-tooltip">Toggle Action Bar</calcite-tooltip>`, u = () => t`<style>
      calcite-action-bar[layout="horizontal"] {
        width: 600px;
      }
    </style>
    <h2>position="start" expand-position="start"</h2>
    <calcite-action-bar position="start" expand-position="start" expanded layout="horizontal">
      ${a}
    </calcite-action-bar>
    <h2>position="start" expand-position="start" & RTL</h2>
    <calcite-action-bar position="start" expand-position="start" dir="rtl" expanded layout="horizontal">
      ${a}
    </calcite-action-bar>
    <h2>position="start" expand-position="end"</h2>
    <calcite-action-bar position="start" expand-position="end" expanded layout="horizontal">
      ${a}
    </calcite-action-bar>
    <h2>position="start" expand-position="end" & RTL</h2>
    <calcite-action-bar position="start" expand-position="end" dir="rtl" expanded layout="horizontal">
      ${a}
    </calcite-action-bar>
    <h2>position="end" expand-position="end"</h2>
    <calcite-action-bar position="end" expand-position="end" expanded layout="horizontal">
      ${a}
    </calcite-action-bar>
    <h2>position="end" expand-position="end" & RTL</h2>
    <calcite-action-bar position="end" expand-position="end" dir="rtl" expanded layout="horizontal">
      ${a}
    </calcite-action-bar>
    <h2>position="end" expand-position="start"</h2>
    <calcite-action-bar position="end" expand-position="start" expanded layout="horizontal">
      ${a}
    </calcite-action-bar>
    <h2>position="end" expand-position="start" & RTL</h2>
    <calcite-action-bar position="end" expand-position="start" dir="rtl" expanded layout="horizontal">
      ${a}
    </calcite-action-bar>`, m = () => t`<style>
      calcite-action-bar[layout="vertical"] {
        height: 300px;
      }
    </style>
    <h2>position="start" expand-position="start"</h2>
    <calcite-action-bar position="start" expand-position="start" expanded layout="vertical">
      ${a}
    </calcite-action-bar>
    <h2>position="start" expand-position="start" & RTL</h2>
    <calcite-action-bar position="start" expand-position="start" dir="rtl" expanded layout="vertical">
      ${a}
    </calcite-action-bar>
    <h2>position="start" expand-position="end"</h2>
    <calcite-action-bar position="start" expand-position="end" expanded layout="vertical">
      ${a}
    </calcite-action-bar>
    <h2>position="start" expand-position="end" & RTL</h2>
    <calcite-action-bar position="start" expand-position="end" dir="rtl" expanded layout="vertical">
      ${a}
    </calcite-action-bar>
    <h2>position="end" expand-position="end"</h2>
    <calcite-action-bar position="end" expand-position="end" expanded layout="vertical">
      ${a}
    </calcite-action-bar>
    <h2>position="end" expand-position="end" & RTL</h2>
    <calcite-action-bar position="end" expand-position="end" dir="rtl" expanded layout="vertical">
      ${a}
    </calcite-action-bar>
    <h2>position="end" expand-position="start"</h2>
    <calcite-action-bar position="end" expand-position="start" expanded layout="vertical">
      ${a}
    </calcite-action-bar>
    <h2>position="end" expand-position="start" & RTL</h2>
    <calcite-action-bar position="end" expand-position="start" dir="rtl" expanded layout="vertical">
      ${a}
    </calcite-action-bar>`, i = () => t`<div style="padding:20px;">
    <calcite-action-bar floating position="start" dir="rtl" class="calcite-mode-dark">
      <calcite-action-group>
        <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
        <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>`;
i.parameters = {
  themes: W
};
const g = () => t`
  <div style="width: 500px;">
    <calcite-action-bar layout="horizontal" style="width:100%">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
    </calcite-action-bar>
  </div>
`, b = () => t`
  <div style="width: 250px;">
    <calcite-action-bar layout="horizontal" style="width:100%">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
    </calcite-action-bar>
  </div>
`, h = () => t`
  <div style="width: 450px; display:flex;">
    <calcite-action-bar layout="horizontal" expand-toggle-disabled style="flex:1;">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Help" icon="question"></calcite-action>
        <calcite-action
          text-enabled
          text="Wide action with a super long title that is unreasonable in my opinion"
          icon="banana"
        ></calcite-action>
        <calcite-action
          text-enabled
          text="Wide action with a super long title that is unreasonable in my opinion"
          icon="banana"
        ></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
`, y = () => t`
  <div style="width: 300px; display:flex;">
    <calcite-action-bar layout="horizontal" expand-toggle-disabled style="flex:1;">
      <calcite-action-group overflow-actions-disabled>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" active icon="save"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" active icon="save"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
`, e = () => t`
  <style>
    .nested-action-menu-overflow-story {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .nested-action-menu-overflow-story-column {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 220px;
    }

    .nested-action-menu-overflow-story-label {
      font-family: sans-serif;
      font-size: 0.75rem;
      margin: 0;
    }

    .nested-action-menu-overflow-story-holder {
      border: 1px dashed var(--calcite-ui-border-3, #999);
      display: flex;
      height: 160px;
      overflow: hidden;
    }

    .nested-action-menu-overflow-story-bar {
      height: 100%;
    }
  </style>
  <div class="nested-action-menu-overflow-story">
    <div class="nested-action-menu-overflow-story-column">
      <p class="nested-action-menu-overflow-story-label">Baseline</p>
      <div class="nested-action-menu-overflow-story-holder">
        <calcite-action-bar expanded class="nested-action-menu-overflow-story-bar">
          <calcite-action-group>
            <calcite-action icon="plus" text="Add"></calcite-action>
            <calcite-action icon="save" text="Save"></calcite-action>
            <calcite-action icon="ellipsis" text="More"></calcite-action>
            <calcite-action icon="bookmark" text="Bookmarks"></calcite-action>
            <calcite-action icon="gear" text="Settings"></calcite-action>
            <calcite-action icon="information" text="Info"></calcite-action>
            <calcite-action icon="link" text="Share"></calcite-action>
            <calcite-action icon="table" text="Table"></calcite-action>
            <calcite-action icon="measure" text="Measure"></calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
      </div>
    </div>
    <div class="nested-action-menu-overflow-story-column">
      <p class="nested-action-menu-overflow-story-label">Nested action-menu in group</p>
      <div class="nested-action-menu-overflow-story-holder">
        <calcite-action-bar expanded class="nested-action-menu-overflow-story-bar">
          <calcite-action-group>
            <calcite-action icon="plus" text="Add"></calcite-action>
            <calcite-action icon="save" text="Save"></calcite-action>
            <calcite-action-menu label="More actions">
              <calcite-action icon="ellipsis" slot="trigger" text="More"></calcite-action>
              <calcite-action icon="layers" text="Layers"></calcite-action>
              <calcite-action icon="layer-basemap" text="Basemaps"></calcite-action>
            </calcite-action-menu>
            <calcite-action icon="bookmark" text="Bookmarks"></calcite-action>
            <calcite-action icon="gear" text="Settings"></calcite-action>
            <calcite-action icon="information" text="Info"></calcite-action>
            <calcite-action icon="link" text="Share"></calcite-action>
            <calcite-action icon="table" text="Table"></calcite-action>
            <calcite-action icon="measure" text="Measure"></calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
      </div>
    </div>
  </div>
`;
e.parameters = {
  chromatic: {
    delay: 500
  }
};
const o = () => t(O || (O = U([`
  <script>
    if (!customElements.get("action-bar-shadow-component")) {
      class ActionBarShadowComponent extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML =
            '<calcite-action-bar layout="horizontal" style="width: 100%;">' + "<slot></slot>" + "</calcite-action-bar>";
        }
      }

      customElements.define("action-bar-shadow-component", ActionBarShadowComponent);
    }
  <\/script>
  <div style="width: 420px; display: flex;">
    <action-bar-shadow-component style="width: 100%; display: block;">
      <calcite-action-group>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
      </calcite-action-group>
    </action-bar-shadow-component>
  </div>
`])));
o.parameters = {
  chromatic: {
    delay: 500
  }
};
const v = () => t`
  <style>
    calcite-action-bar {
      --calcite-action-bar-expanded-max-width: 150px;
    }
  </style>
  <calcite-action-bar expanded>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Add to my custom action bar application" icon="plus"></calcite-action>
      <calcite-action text-enabled text="Save to my custom action bar application" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Layers in my custom action bar application" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
`, f = () => t`<div style="padding:20px;">
    <calcite-action-bar layout="grid" expand-toggle-disabled overflow-actions-disabled floating>
      <calcite-action-group>
        <calcite-action text="Northwest" icon="chevron-up-left"></calcite-action>
        <calcite-action text="North" icon="chevron-up"></calcite-action>
        <calcite-action text="Northeast" icon="chevron-up-right"></calcite-action>
        <calcite-action text="West" icon="chevron-left"></calcite-action>
        <calcite-action text="Center" icon="gps-on"></calcite-action>
        <calcite-action text="East" icon="chevron-right"></calcite-action>
        <calcite-action text="Southwest" icon="chevron-down-left"></calcite-action>
        <calcite-action text="South" icon="chevron-down"></calcite-action>
        <calcite-action text="Southeast" icon="chevron-down-right"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>`, w = () => t`<div style="width: 360px;">
    <calcite-action-bar layout="horizontal" overflow-mode="wrap">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" icon="save"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Measure" icon="measure"></calcite-action>
        <calcite-action text="Share" icon="share"></calcite-action>
        <calcite-action text="Print" icon="print"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Search" icon="search"></calcite-action>
        <calcite-action text="About" icon="information"></calcite-action>
        <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      </calcite-action-group>
      <calcite-action-group slot="actions-end">
        <calcite-action text="Settings" icon="gear"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>`, S = () => t`<div style="width: 360px;">
    <calcite-action-bar layout="horizontal" overflow-mode="wrap">
      <calcite-action text="Add" icon="plus"></calcite-action>
      <calcite-action text="Save" icon="save"></calcite-action>
      <calcite-action text="Layers" icon="layers"></calcite-action>
      <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
      <calcite-action text="Measure" icon="measure"></calcite-action>
      <calcite-action text="Share" icon="share"></calcite-action>
      <calcite-action text="Print" icon="print"></calcite-action>
      <calcite-action text="Search" icon="search"></calcite-action>
      <calcite-action text="About" icon="information"></calcite-action>
      <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      <calcite-action text="Settings" icon="gear" slot="actions-end"></calcite-action>
    </calcite-action-bar>
  </div>`, k = () => t`<calcite-action-bar layout="vertical" overflow-mode="wrap" style="height: 260px;">
    <calcite-action-group>
      <calcite-action text="Add" icon="plus"></calcite-action>
      <calcite-action text="Save" icon="save"></calcite-action>
      <calcite-action text="Layers" icon="layers"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
      <calcite-action text="Measure" icon="measure"></calcite-action>
      <calcite-action text="Share" icon="share"></calcite-action>
      <calcite-action text="Print" icon="print"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Search" icon="search"></calcite-action>
      <calcite-action text="About" icon="information"></calcite-action>
      <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
    </calcite-action-group>
    <calcite-action-group slot="actions-end">
      <calcite-action text="Settings" icon="gear"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>`, A = () => t`<div style="display: flex; gap: 1rem;">
    <div style="width: 360px;">
      <calcite-action-bar layout="horizontal" overflow-mode="wrap">
        <calcite-action-group slot="actions-start">
          <calcite-action text="Home" icon="home"></calcite-action>
          <calcite-action text="Locate" icon="compass"></calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
          <calcite-action text="Save" icon="save"></calcite-action>
          <calcite-action text="Layers" icon="layers"></calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
          <calcite-action text="Measure" icon="measure"></calcite-action>
          <calcite-action text="Share" icon="share"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Settings" icon="gear"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
    </div>
    <calcite-action-bar layout="vertical" overflow-mode="wrap" style="height: 260px;">
      <calcite-action-group slot="actions-start">
        <calcite-action text="Home" icon="home"></calcite-action>
        <calcite-action text="Locate" icon="compass"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" icon="save"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Measure" icon="measure"></calcite-action>
        <calcite-action text="Share" icon="share"></calcite-action>
      </calcite-action-group>
      <calcite-action-group slot="actions-end">
        <calcite-action text="Settings" icon="gear"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>`, n = () => t`
  <calcite-action-bar position="start" dir="rtl" class="calcite-mode-dark">
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
`;
n.parameters = {
  themes: W
};
const l = () => t`<div style="width: 360px;">
    <calcite-action-bar layout="horizontal" overflow-mode="wrap" dir="rtl" class="calcite-mode-dark">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" icon="save"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Measure" icon="measure"></calcite-action>
        <calcite-action text="Share" icon="share"></calcite-action>
        <calcite-action text="Print" icon="print"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Search" icon="search"></calcite-action>
        <calcite-action text="About" icon="information"></calcite-action>
        <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      </calcite-action-group>
      <calcite-action-group slot="actions-end">
        <calcite-action text="Settings" icon="gear"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>`;
l.parameters = {
  themes: W
};
const r = () => t`<calcite-action-bar
    layout="vertical"
    overflow-mode="wrap"
    dir="rtl"
    class="calcite-mode-dark"
    style="height: 260px;"
  >
    <calcite-action-group>
      <calcite-action text="Add" icon="plus"></calcite-action>
      <calcite-action text="Save" icon="save"></calcite-action>
      <calcite-action text="Layers" icon="layers"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
      <calcite-action text="Measure" icon="measure"></calcite-action>
      <calcite-action text="Share" icon="share"></calcite-action>
      <calcite-action text="Print" icon="print"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Search" icon="search"></calcite-action>
      <calcite-action text="About" icon="information"></calcite-action>
      <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
    </calcite-action-group>
    <calcite-action-group slot="actions-end">
      <calcite-action text="Settings" icon="gear"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>`;
r.parameters = {
  themes: W
};
const L = () => t`
  <div style="display:flex; height:500px; width: 200px;">
    <calcite-action-bar>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" id="add"></calcite-action>
        <calcite-tooltip placement="right" reference-element="add">Add</calcite-tooltip>
        <calcite-action text="Save" icon="save" id="save"></calcite-action>
        <calcite-tooltip placement="right" reference-element="save">Save</calcite-tooltip>
        <calcite-action text="Layers" icon="layers" id="layers"></calcite-action>
        <calcite-tooltip placement="right" reference-element="layers">Layers</calcite-tooltip>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" id="add-2"></calcite-action>
        <calcite-tooltip placement="right" reference-element="add-2">Add</calcite-tooltip>
        <calcite-action text="Save" active icon="save" id="save-2"></calcite-action>
        <calcite-tooltip placement="right" reference-element="save-2">Save</calcite-tooltip>
        <calcite-action text="Layers" icon="layers" id="layers-2"></calcite-action>
        <calcite-tooltip placement="right" reference-element="layers-2">Layers</calcite-tooltip>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers" id="hello-world"></calcite-action>
      <calcite-tooltip placement="right" reference-element="hello-world">hello world</calcite-tooltip>
    </calcite-action-bar>
  </div>
`, B = () => `<calcite-action-bar expanded lang="he">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, z = () => `<calcite-action-bar expanded lang="nb">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, $ = () => `<calcite-action-bar expanded lang="fr">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, T = () => `<calcite-action-bar expanded lang="zh-HK">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, P = () => `<calcite-action-bar expanded lang="uk">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, M = () => `<calcite-action-bar expanded lang="bs">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>`, I = () => t`
  <style>
    .container {
      display: flex;
      flex-flow: column;
      width: 800px;
      margin-block: 2rem;
    }
  </style>
  <div class="container">
    <calcite-action-bar layout="horizontal">
      <calcite-action text="Add" icon="plus" width="full"> </calcite-action>
      <calcite-action text="Remove" icon="minus" width="full"> </calcite-action>
      <calcite-action text="Copy" icon="plus" width="full"> </calcite-action>
    </calcite-action-bar>
  </div>
`, R = () => t`
  <style>
    .overflow-disabled-story-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .overflow-disabled-story-label {
      font-family: sans-serif;
      font-size: 0.875rem;
    }
  </style>
  <div class="overflow-disabled-story-group">
    <p class="overflow-disabled-story-label">
      Horizontal — width unconstrained. First three actions have <code>overflow-disabled</code>; all actions are
      visible.
    </p>
    <calcite-action-bar layout="horizontal" expand-toggle-disabled>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" overflow-disabled></calcite-action>
        <calcite-action text="Save" icon="save" overflow-disabled></calcite-action>
        <calcite-action text="Layers" icon="layers" overflow-disabled></calcite-action>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <p class="overflow-disabled-story-label">
      Horizontal — width constrained. First three actions stay visible; the rest overflow into the menu.
      <code>action-bar</code> cannot collapse further because the <code>overflow-disabled</code> actions set its minimum
      width.
    </p>
    <div style="width: 100px; display: flex;">
      <calcite-action-bar layout="horizontal" expand-toggle-disabled style="flex: 1;">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus" overflow-disabled></calcite-action>
          <calcite-action text="Save" icon="save" overflow-disabled></calcite-action>
          <calcite-action text="Layers" icon="layers" overflow-disabled></calcite-action>
          <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
          <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
    </div>
  </div>
`;
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(args: ActionBarStoryArgs): string => html\`
  <calcite-action-bar
    \${boolean("expand-toggle-disabled", args.expandToggleDisabled)}
    \${boolean("expanded", args.expanded)}
    \${boolean("floating", args.floating)}
    layout="\${args.layout}"
    position="\${args.position}"
    expand-position="\${args.expandPosition}"
    scale="\${args.scale}"
    selection-appearance="\${args.selectionAppearance}"
  >
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
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
      originalSource: `(args: ActionBarStoryArgs): string => html\`<div style="padding:20px;">
    <calcite-action-bar position="\${args.position}" floating>
      <calcite-action-group>
        <calcite-action text="Undo" label="Undo Action" icon="undo"></calcite-action>
        <calcite-action text="Redo" label="Redo Action" icon="redo"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Delete" label="Delete Item" icon="trash"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div> \``,
      ...d.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    calcite-action-bar {
      --calcite-action-bar-expanded-max-width: 150px;
    }
  </style>
  <div style="padding:20px;">
    <calcite-action-bar floating expanded>
      <calcite-action-group expanded>
        <calcite-action text-enabled text="Add to my custom action bar application" icon="plus"></calcite-action>
        <calcite-action text-enabled text="Save to my custom action bar application" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group expanded>
        <calcite-action text-enabled text="Layers in my custom action bar application" icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="padding:20px;">
    <calcite-action-bar floating layout="horizontal">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" appearance="solid" scale="m"></calcite-action>
        <calcite-action text="Save" icon="save" appearance="solid" scale="m"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" icon="layers" appearance="solid" scale="m"></calcite-action>
        <calcite-action text="Basemaps" icon="layer-basemap" appearance="solid" scale="m"></calcite-action>
      </calcite-action-group>
      <calcite-tooltip
        slot="expand-tooltip"
        id="calcite-tooltip-c19274e3-ff3b-6168-ef1e-8a700b056e1c"
        role="tooltip"
        overlay-positioning="absolute"
        placement="auto"
        style="visibility: hidden; pointer-events: none; position: absolute;"
        >Toggle Action bar</calcite-tooltip
      >
    </calcite-action-bar>
  </div>\``,
      ...x.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<style>
      calcite-action-bar[layout="horizontal"] {
        width: 600px;
      }
    </style>
    <h2>position="start" expand-position="start"</h2>
    <calcite-action-bar position="start" expand-position="start" expanded layout="horizontal">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="start" expand-position="start" & RTL</h2>
    <calcite-action-bar position="start" expand-position="start" dir="rtl" expanded layout="horizontal">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="start" expand-position="end"</h2>
    <calcite-action-bar position="start" expand-position="end" expanded layout="horizontal">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="start" expand-position="end" & RTL</h2>
    <calcite-action-bar position="start" expand-position="end" dir="rtl" expanded layout="horizontal">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="end" expand-position="end"</h2>
    <calcite-action-bar position="end" expand-position="end" expanded layout="horizontal">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="end" expand-position="end" & RTL</h2>
    <calcite-action-bar position="end" expand-position="end" dir="rtl" expanded layout="horizontal">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="end" expand-position="start"</h2>
    <calcite-action-bar position="end" expand-position="start" expanded layout="horizontal">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="end" expand-position="start" & RTL</h2>
    <calcite-action-bar position="end" expand-position="start" dir="rtl" expanded layout="horizontal">
      \${expandPositionActions}
    </calcite-action-bar>\``,
      ...u.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<style>
      calcite-action-bar[layout="vertical"] {
        height: 300px;
      }
    </style>
    <h2>position="start" expand-position="start"</h2>
    <calcite-action-bar position="start" expand-position="start" expanded layout="vertical">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="start" expand-position="start" & RTL</h2>
    <calcite-action-bar position="start" expand-position="start" dir="rtl" expanded layout="vertical">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="start" expand-position="end"</h2>
    <calcite-action-bar position="start" expand-position="end" expanded layout="vertical">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="start" expand-position="end" & RTL</h2>
    <calcite-action-bar position="start" expand-position="end" dir="rtl" expanded layout="vertical">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="end" expand-position="end"</h2>
    <calcite-action-bar position="end" expand-position="end" expanded layout="vertical">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="end" expand-position="end" & RTL</h2>
    <calcite-action-bar position="end" expand-position="end" dir="rtl" expanded layout="vertical">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="end" expand-position="start"</h2>
    <calcite-action-bar position="end" expand-position="start" expanded layout="vertical">
      \${expandPositionActions}
    </calcite-action-bar>
    <h2>position="end" expand-position="start" & RTL</h2>
    <calcite-action-bar position="end" expand-position="start" dir="rtl" expanded layout="vertical">
      \${expandPositionActions}
    </calcite-action-bar>\``,
      ...m.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="padding:20px;">
    <calcite-action-bar floating position="start" dir="rtl" class="calcite-mode-dark">
      <calcite-action-group>
        <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
        <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>\``,
      ...i.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 500px;">
    <calcite-action-bar layout="horizontal" style="width:100%">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
    </calcite-action-bar>
  </div>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 250px;">
    <calcite-action-bar layout="horizontal" style="width:100%">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
    </calcite-action-bar>
  </div>
\``,
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
  <div style="width: 450px; display:flex;">
    <calcite-action-bar layout="horizontal" expand-toggle-disabled style="flex:1;">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" active icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Help" icon="question"></calcite-action>
        <calcite-action
          text-enabled
          text="Wide action with a super long title that is unreasonable in my opinion"
          icon="banana"
        ></calcite-action>
        <calcite-action
          text-enabled
          text="Wide action with a super long title that is unreasonable in my opinion"
          icon="banana"
        ></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
\``,
      ...h.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 300px; display:flex;">
    <calcite-action-bar layout="horizontal" expand-toggle-disabled style="flex:1;">
      <calcite-action-group overflow-actions-disabled>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" active icon="save"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" active icon="save"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>
\``,
      ...y.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .nested-action-menu-overflow-story {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .nested-action-menu-overflow-story-column {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 220px;
    }

    .nested-action-menu-overflow-story-label {
      font-family: sans-serif;
      font-size: 0.75rem;
      margin: 0;
    }

    .nested-action-menu-overflow-story-holder {
      border: 1px dashed var(--calcite-ui-border-3, #999);
      display: flex;
      height: 160px;
      overflow: hidden;
    }

    .nested-action-menu-overflow-story-bar {
      height: 100%;
    }
  </style>
  <div class="nested-action-menu-overflow-story">
    <div class="nested-action-menu-overflow-story-column">
      <p class="nested-action-menu-overflow-story-label">Baseline</p>
      <div class="nested-action-menu-overflow-story-holder">
        <calcite-action-bar expanded class="nested-action-menu-overflow-story-bar">
          <calcite-action-group>
            <calcite-action icon="plus" text="Add"></calcite-action>
            <calcite-action icon="save" text="Save"></calcite-action>
            <calcite-action icon="ellipsis" text="More"></calcite-action>
            <calcite-action icon="bookmark" text="Bookmarks"></calcite-action>
            <calcite-action icon="gear" text="Settings"></calcite-action>
            <calcite-action icon="information" text="Info"></calcite-action>
            <calcite-action icon="link" text="Share"></calcite-action>
            <calcite-action icon="table" text="Table"></calcite-action>
            <calcite-action icon="measure" text="Measure"></calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
      </div>
    </div>
    <div class="nested-action-menu-overflow-story-column">
      <p class="nested-action-menu-overflow-story-label">Nested action-menu in group</p>
      <div class="nested-action-menu-overflow-story-holder">
        <calcite-action-bar expanded class="nested-action-menu-overflow-story-bar">
          <calcite-action-group>
            <calcite-action icon="plus" text="Add"></calcite-action>
            <calcite-action icon="save" text="Save"></calcite-action>
            <calcite-action-menu label="More actions">
              <calcite-action icon="ellipsis" slot="trigger" text="More"></calcite-action>
              <calcite-action icon="layers" text="Layers"></calcite-action>
              <calcite-action icon="layer-basemap" text="Basemaps"></calcite-action>
            </calcite-action-menu>
            <calcite-action icon="bookmark" text="Bookmarks"></calcite-action>
            <calcite-action icon="gear" text="Settings"></calcite-action>
            <calcite-action icon="information" text="Info"></calcite-action>
            <calcite-action icon="link" text="Share"></calcite-action>
            <calcite-action icon="table" text="Table"></calcite-action>
            <calcite-action icon="measure" text="Measure"></calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
      </div>
    </div>
  </div>
\``,
      ...e.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <script>
    if (!customElements.get("action-bar-shadow-component")) {
      class ActionBarShadowComponent extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML =
            '<calcite-action-bar layout="horizontal" style="width: 100%;">' + "<slot></slot>" + "</calcite-action-bar>";
        }
      }

      customElements.define("action-bar-shadow-component", ActionBarShadowComponent);
    }
  <\/script>
  <div style="width: 420px; display: flex;">
    <action-bar-shadow-component style="width: 100%; display: block;">
      <calcite-action-group>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
        <calcite-action icon="information" text="Before actions"></calcite-action>
      </calcite-action-group>
    </action-bar-shadow-component>
  </div>
\``,
      ...o.parameters?.docs?.source
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
    calcite-action-bar {
      --calcite-action-bar-expanded-max-width: 150px;
    }
  </style>
  <calcite-action-bar expanded>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Add to my custom action bar application" icon="plus"></calcite-action>
      <calcite-action text-enabled text="Save to my custom action bar application" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group expanded>
      <calcite-action text-enabled text="Layers in my custom action bar application" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
\``,
      ...v.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="padding:20px;">
    <calcite-action-bar layout="grid" expand-toggle-disabled overflow-actions-disabled floating>
      <calcite-action-group>
        <calcite-action text="Northwest" icon="chevron-up-left"></calcite-action>
        <calcite-action text="North" icon="chevron-up"></calcite-action>
        <calcite-action text="Northeast" icon="chevron-up-right"></calcite-action>
        <calcite-action text="West" icon="chevron-left"></calcite-action>
        <calcite-action text="Center" icon="gps-on"></calcite-action>
        <calcite-action text="East" icon="chevron-right"></calcite-action>
        <calcite-action text="Southwest" icon="chevron-down-left"></calcite-action>
        <calcite-action text="South" icon="chevron-down"></calcite-action>
        <calcite-action text="Southeast" icon="chevron-down-right"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>\``,
      ...f.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width: 360px;">
    <calcite-action-bar layout="horizontal" overflow-mode="wrap">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" icon="save"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Measure" icon="measure"></calcite-action>
        <calcite-action text="Share" icon="share"></calcite-action>
        <calcite-action text="Print" icon="print"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Search" icon="search"></calcite-action>
        <calcite-action text="About" icon="information"></calcite-action>
        <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      </calcite-action-group>
      <calcite-action-group slot="actions-end">
        <calcite-action text="Settings" icon="gear"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>\``,
      ...w.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width: 360px;">
    <calcite-action-bar layout="horizontal" overflow-mode="wrap">
      <calcite-action text="Add" icon="plus"></calcite-action>
      <calcite-action text="Save" icon="save"></calcite-action>
      <calcite-action text="Layers" icon="layers"></calcite-action>
      <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
      <calcite-action text="Measure" icon="measure"></calcite-action>
      <calcite-action text="Share" icon="share"></calcite-action>
      <calcite-action text="Print" icon="print"></calcite-action>
      <calcite-action text="Search" icon="search"></calcite-action>
      <calcite-action text="About" icon="information"></calcite-action>
      <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      <calcite-action text="Settings" icon="gear" slot="actions-end"></calcite-action>
    </calcite-action-bar>
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
      originalSource: `(): string => html\`<calcite-action-bar layout="vertical" overflow-mode="wrap" style="height: 260px;">
    <calcite-action-group>
      <calcite-action text="Add" icon="plus"></calcite-action>
      <calcite-action text="Save" icon="save"></calcite-action>
      <calcite-action text="Layers" icon="layers"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
      <calcite-action text="Measure" icon="measure"></calcite-action>
      <calcite-action text="Share" icon="share"></calcite-action>
      <calcite-action text="Print" icon="print"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Search" icon="search"></calcite-action>
      <calcite-action text="About" icon="information"></calcite-action>
      <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
    </calcite-action-group>
    <calcite-action-group slot="actions-end">
      <calcite-action text="Settings" icon="gear"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>\``,
      ...k.parameters?.docs?.source
    }
  }
};
A.parameters = {
  ...A.parameters,
  docs: {
    ...A.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="display: flex; gap: 1rem;">
    <div style="width: 360px;">
      <calcite-action-bar layout="horizontal" overflow-mode="wrap">
        <calcite-action-group slot="actions-start">
          <calcite-action text="Home" icon="home"></calcite-action>
          <calcite-action text="Locate" icon="compass"></calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
          <calcite-action text="Save" icon="save"></calcite-action>
          <calcite-action text="Layers" icon="layers"></calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
          <calcite-action text="Measure" icon="measure"></calcite-action>
          <calcite-action text="Share" icon="share"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Settings" icon="gear"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
    </div>
    <calcite-action-bar layout="vertical" overflow-mode="wrap" style="height: 260px;">
      <calcite-action-group slot="actions-start">
        <calcite-action text="Home" icon="home"></calcite-action>
        <calcite-action text="Locate" icon="compass"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" icon="save"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Measure" icon="measure"></calcite-action>
        <calcite-action text="Share" icon="share"></calcite-action>
      </calcite-action-group>
      <calcite-action-group slot="actions-end">
        <calcite-action text="Settings" icon="gear"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>\``,
      ...A.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-action-bar position="start" dir="rtl" class="calcite-mode-dark">
    <calcite-action-group>
      <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width: 360px;">
    <calcite-action-bar layout="horizontal" overflow-mode="wrap" dir="rtl" class="calcite-mode-dark">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"></calcite-action>
        <calcite-action text="Save" icon="save"></calcite-action>
        <calcite-action text="Layers" icon="layers"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Measure" icon="measure"></calcite-action>
        <calcite-action text="Share" icon="share"></calcite-action>
        <calcite-action text="Print" icon="print"></calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Search" icon="search"></calcite-action>
        <calcite-action text="About" icon="information"></calcite-action>
        <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      </calcite-action-group>
      <calcite-action-group slot="actions-end">
        <calcite-action text="Settings" icon="gear"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </div>\``,
      ...l.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-action-bar
    layout="vertical"
    overflow-mode="wrap"
    dir="rtl"
    class="calcite-mode-dark"
    style="height: 260px;"
  >
    <calcite-action-group>
      <calcite-action text="Add" icon="plus"></calcite-action>
      <calcite-action text="Save" icon="save"></calcite-action>
      <calcite-action text="Layers" icon="layers"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
      <calcite-action text="Measure" icon="measure"></calcite-action>
      <calcite-action text="Share" icon="share"></calcite-action>
      <calcite-action text="Print" icon="print"></calcite-action>
    </calcite-action-group>
    <calcite-action-group>
      <calcite-action text="Search" icon="search"></calcite-action>
      <calcite-action text="About" icon="information"></calcite-action>
      <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
    </calcite-action-group>
    <calcite-action-group slot="actions-end">
      <calcite-action text="Settings" icon="gear"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>\``,
      ...r.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="display:flex; height:500px; width: 200px;">
    <calcite-action-bar>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" id="add"></calcite-action>
        <calcite-tooltip placement="right" reference-element="add">Add</calcite-tooltip>
        <calcite-action text="Save" icon="save" id="save"></calcite-action>
        <calcite-tooltip placement="right" reference-element="save">Save</calcite-tooltip>
        <calcite-action text="Layers" icon="layers" id="layers"></calcite-action>
        <calcite-tooltip placement="right" reference-element="layers">Layers</calcite-tooltip>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" id="add-2"></calcite-action>
        <calcite-tooltip placement="right" reference-element="add-2">Add</calcite-tooltip>
        <calcite-action text="Save" active icon="save" id="save-2"></calcite-action>
        <calcite-tooltip placement="right" reference-element="save-2">Save</calcite-tooltip>
        <calcite-action text="Layers" icon="layers" id="layers-2"></calcite-action>
        <calcite-tooltip placement="right" reference-element="layers-2">Layers</calcite-tooltip>
      </calcite-action-group>
      <calcite-action slot="actions-end" text="hello world" icon="layers" id="hello-world"></calcite-action>
      <calcite-tooltip placement="right" reference-element="hello-world">hello world</calcite-tooltip>
    </calcite-action-bar>
  </div>
\``,
      ...L.parameters?.docs?.source
    }
  }
};
B.parameters = {
  ...B.parameters,
  docs: {
    ...B.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="he">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...B.parameters?.docs?.source
    }
  }
};
z.parameters = {
  ...z.parameters,
  docs: {
    ...z.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="nb">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...z.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="fr">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...$.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="zh-HK">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...T.parameters?.docs?.source
    }
  }
};
P.parameters = {
  ...P.parameters,
  docs: {
    ...P.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="uk">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...P.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: `(): string => \`<calcite-action-bar expanded lang="bs">
<calcite-action text-enabled text="Information" icon="information"></calcite-action>
<calcite-action text-enabled text="Feedback" slot="actions-end" icon="mega-phone"></calcite-action>
</calcite-action-bar>\``,
      ...M.parameters?.docs?.source
    }
  }
};
I.parameters = {
  ...I.parameters,
  docs: {
    ...I.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      display: flex;
      flex-flow: column;
      width: 800px;
      margin-block: 2rem;
    }
  </style>
  <div class="container">
    <calcite-action-bar layout="horizontal">
      <calcite-action text="Add" icon="plus" width="full"> </calcite-action>
      <calcite-action text="Remove" icon="minus" width="full"> </calcite-action>
      <calcite-action text="Copy" icon="plus" width="full"> </calcite-action>
    </calcite-action-bar>
  </div>
\``,
      ...I.parameters?.docs?.source
    }
  }
};
R.parameters = {
  ...R.parameters,
  docs: {
    ...R.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .overflow-disabled-story-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .overflow-disabled-story-label {
      font-family: sans-serif;
      font-size: 0.875rem;
    }
  </style>
  <div class="overflow-disabled-story-group">
    <p class="overflow-disabled-story-label">
      Horizontal — width unconstrained. First three actions have <code>overflow-disabled</code>; all actions are
      visible.
    </p>
    <calcite-action-bar layout="horizontal" expand-toggle-disabled>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus" overflow-disabled></calcite-action>
        <calcite-action text="Save" icon="save" overflow-disabled></calcite-action>
        <calcite-action text="Layers" icon="layers" overflow-disabled></calcite-action>
        <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
        <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <p class="overflow-disabled-story-label">
      Horizontal — width constrained. First three actions stay visible; the rest overflow into the menu.
      <code>action-bar</code> cannot collapse further because the <code>overflow-disabled</code> actions set its minimum
      width.
    </p>
    <div style="width: 100px; display: flex;">
      <calcite-action-bar layout="horizontal" expand-toggle-disabled style="flex: 1;">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus" overflow-disabled></calcite-action>
          <calcite-action text="Save" icon="save" overflow-disabled></calcite-action>
          <calcite-action text="Layers" icon="layers" overflow-disabled></calcite-action>
          <calcite-action text="Basemaps" icon="layer-basemap"></calcite-action>
          <calcite-action text="Bookmarks" icon="bookmark"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
    </div>
  </div>
\``,
      ...R.parameters?.docs?.source
    }
  }
};
const at = ["simple", "floating", "floatingWithDefinedWidths", "floatingWithGroups", "expandPositionHorizontal", "expandPositionVertical", "floatingDarkModeRTL", "horizontal", "horizontalSmall", "horizontalOverflow", "horizontalOverflowPerGroupDisabled", "nestedActionMenuOverflow", "shadowSlottedHorizontal", "withDefinedWidths", "gridLayout", "horizontalWrap", "horizontalWrapNoGroups", "verticalWrap", "wrapWithActionsStartGroups", "darkModeRTL", "horizontalWrapDarkModeRTL", "verticalWrapDarkModeRTL", "adjacentTooltipsOpenQuickly", "hebrewLocale", "norwegianLocale", "FrenchLocale", "hongKongLocale", "ukrainianLocale", "bosnianLocale", "fullWidthActions", "overflowDisabledActions"];
export {
  $ as FrenchLocale,
  at as __namedExportsOrder,
  L as adjacentTooltipsOpenQuickly,
  M as bosnianLocale,
  n as darkModeRTL,
  ct as default,
  u as expandPositionHorizontal,
  m as expandPositionVertical,
  d as floating,
  i as floatingDarkModeRTL,
  p as floatingWithDefinedWidths,
  x as floatingWithGroups,
  I as fullWidthActions,
  f as gridLayout,
  B as hebrewLocale,
  T as hongKongLocale,
  g as horizontal,
  h as horizontalOverflow,
  y as horizontalOverflowPerGroupDisabled,
  b as horizontalSmall,
  w as horizontalWrap,
  l as horizontalWrapDarkModeRTL,
  S as horizontalWrapNoGroups,
  e as nestedActionMenuOverflow,
  z as norwegianLocale,
  R as overflowDisabledActions,
  o as shadowSlottedHorizontal,
  s as simple,
  P as ukrainianLocale,
  k as verticalWrap,
  r as verticalWrapDarkModeRTL,
  v as withDefinedWidths,
  A as wrapWithActionsStartGroups
};
