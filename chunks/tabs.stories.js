/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as D } from "./helpers.js";
import { s as U } from "./index3.js";
import { c as O, b as E, m as R } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A as q } from "./resources34.js";
import "./notice.js";
import "./panel.js";
import "./shell.js";
import "./shell-panel.js";
import "./tab.js";
import "./tab-nav.js";
import "./tab-title.js";
import "./tabs.js";
const {
  layout: x,
  position: I,
  scale: P
} = q, et = {
  title: "Components/Tabs",
  args: {
    bordered: !1,
    layout: x.values[3],
    position: I.values[2],
    scale: P.defaultValue
  },
  argTypes: {
    layout: {
      options: x.values.filter((a) => a !== "auto" && a !== "fixed" && a !== "none" && a !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    position: {
      options: I.values.filter((a) => a !== "start" && a !== "end"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: P.values,
      control: {
        type: "select"
      }
    }
  }
}, r = (a) => t`
  <calcite-tabs
    ${E("bordered", a.bordered)}
    layout="${a.layout}"
    position="${a.position}"
    scale="${a.scale}"
  >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled>Disabled Tab</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`, b = () => t`
  <calcite-tabs dir="rtl" class="calcite-mode-dark">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled>Disabled Tab</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;
b.parameters = {
  themes: R,
  chromatic: {
    delay: 500
  }
};
const T = () => t`
  <calcite-tabs layout="inline" position="top" scale="m" bordered>
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`, d = () => t`
  <calcite-tabs layout="inline" position="top" scale="m">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1" closable> Tab 1 Title </calcite-tab-title>
      <calcite-tab-title tab="tab2" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" closable selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`, n = () => t`
  <calcite-tabs layout="inline" position="top" scale="m" bordered dir="rtl" class="calcite-mode-dark">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`;
n.parameters = {
  themes: R
};
const i = D[0], p = () => t`
  <calcite-tabs layout="inline" position="top" scale="m">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected icon-start="${i}">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="${i}">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="${i}" icon-end="${i}">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="${i}"></calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`, m = () => t`
  <div style="width: 400px;">
    <calcite-tabs
    layout="inline"
    position="top"
    scale="m"
    >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title id="reference-element">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab selected>
      <p>Tab 1 Content</p><br />
    </calcite-tab>
    <calcite-tab><p>Tab 2 Content</p>
    <img src="${U({
  width: 1e3,
  height: 200
})}"></img>
    </calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
    </calcite-tabs>
  </div>
`, e = t`
  <calcite-tab-nav slot="title-group">
    <calcite-tab-title>Tab 1 Title</calcite-tab-title>
    <calcite-tab-title>Tab 2 Title</calcite-tab-title>
    <calcite-tab-title>Tab 3 Title</calcite-tab-title>
    <calcite-tab-title selected>Tab 4 Title</calcite-tab-title>
  </calcite-tab-nav>
  <calcite-tab>Tab 1 Content</calcite-tab>
  <calcite-tab>Tab 2 Content</calcite-tab>
  <calcite-tab>Tab 3 Content</calcite-tab>
  <calcite-tab selected>Tab 4 Content</calcite-tab>
`, c = t`
  <calcite-tab-nav slot="title-group">
    <calcite-tab-title icon-start="arrow-left">Tab 1 Title</calcite-tab-title>
    <calcite-tab-title icon-end="arrow-right">Tab 2 Title</calcite-tab-title>
    <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
    <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
  </calcite-tab-nav>
  <calcite-tab>Tab 1 Content</calcite-tab>
  <calcite-tab>Tab 2 Content</calcite-tab>
  <calcite-tab>Tab 3 Content</calcite-tab>
  <calcite-tab selected>Tab 4 Content</calcite-tab>
`, l = t`
  <style>
    calcite-tabs {
      margin: 20px;
    }
  </style>
`, u = () => t`
  ${l}
  <calcite-tabs layout="center" scale="s">${e}</calcite-tabs>
  <calcite-tabs layout="center" scale="m">${e}</calcite-tabs>
  <calcite-tabs layout="center" scale="l">${e}</calcite-tabs>
`, v = () => t`
  ${l}
  <calcite-tabs layout="center" scale="s">${c}</calcite-tabs>
  <calcite-tabs layout="center" scale="m">${c}</calcite-tabs>
  <calcite-tabs layout="center" scale="l">${c}</calcite-tabs>
`, g = () => t`
  ${l}
  <calcite-tabs layout="center" scale="s" bordered>${e}</calcite-tabs>
  <calcite-tabs layout="center" scale="m" bordered>${e}</calcite-tabs>
  <calcite-tabs layout="center" scale="l" bordered>${e}</calcite-tabs>
`, h = () => t`
  ${l}
  <calcite-tabs layout="center" scale="s" bordered>${c}</calcite-tabs>
  <calcite-tabs layout="center" scale="m" bordered>${c}</calcite-tabs>
  <calcite-tabs layout="center" scale="l" bordered>${c}</calcite-tabs>
`, C = () => t`
  ${l}
  <calcite-tabs layout="inline" scale="s">${e}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m">${e}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l">${e}</calcite-tabs>
`, y = () => t`
  ${l}
  <calcite-tabs layout="inline" scale="s">${c}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m">${c}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l">${c}</calcite-tabs>
`, w = () => t`
  ${l}
  <calcite-tabs layout="inline" scale="s" bordered>${e}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m" bordered>${e}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l" bordered>${e}</calcite-tabs>
`, $ = () => t`
  ${l}
  <calcite-tabs layout="inline" scale="s" bordered>${c}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m" bordered>${c}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l" bordered>${c}</calcite-tabs>
`, S = () => t`
  <calcite-tabs scale="l">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title disabled icon-start="arrow-left">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
`, f = () => t`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`, k = () => t`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 4 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`, A = () => t`
  <calcite-tabs layout="center" bordered>
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 4 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`, W = () => t`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 3 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
`, L = () => t`
  <calcite-tabs layout="inline">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 3 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
`, o = () => t`
  <calcite-tabs style="height: 250px;">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Boats</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab style="background: pink;">
      <div style="background: red; height: 100%;">Tab 1 content</div>
    </calcite-tab>
  </calcite-tabs>
`;
o.parameters = {
  chromatic: {
    delay: 1e3
  }
};
const s = () => t`
  <calcite-tabs style="height: 250px;">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Boats</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab style="background: pink;">
      <div style="background: linear-gradient(to bottom, red, transparent); height: 200%;">Tab 1 content</div>
    </calcite-tab>
  </calcite-tabs>
`;
s.parameters = {
  chromatic: {
    delay: 1e3
  }
};
const N = () => t`
  <calcite-tabs style="height: 400px">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected> Watercraft </calcite-tab-title>
      <calcite-tab-title>Automobiles</calcite-tab-title>
      <calcite-tab-title>Aircraft</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected>
      <calcite-notice icon="embark" open>
        <div slot="message">Recommended for coastal use</div>
      </calcite-notice>
      <calcite-notice icon="embark" open>
        <div slot="message">Why is there a vertical scroll bar in this panel?</div>
      </calcite-notice>
    </calcite-tab>
    <calcite-tab>
      <calcite-notice icon="car" open>
        <div slot="message">A good choice for inland adventure</div>
      </calcite-notice>
      <calcite-notice icon="car" open>
        <div slot="message">A good choice for inland adventure 2</div>
      </calcite-notice>
    </calcite-tab>
    <calcite-tab>
      <calcite-notice icon="plane" open>
        <div slot="message">Cross continents quickly</div>
      </calcite-notice>
    </calcite-tab>
  </calcite-tabs>
`, H = () => t`
  <calcite-shell content-behind>
    <calcite-shell-panel slot="panel-end" width-scale="l" position="end" display-mode="float">
      <calcite-panel heading="Panel with Tabs >> vertical scrollbar">
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
            <calcite-notice icon="embark" open>
              <div slot="message">Why is there a vertical scroll bar in this panel?</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure 2</div>
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
  </calcite-shell>
`, M = () => O(t`
    <style>
      .breakpoint-story-container {
        flex-direction: column;
      }
    </style>
    <calcite-tabs scale="{scale}">
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
        <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
        <calcite-tab-title>Tab 5 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
        <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
        <calcite-tab-title>Tab 8 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab selected>Tab 1 Content</calcite-tab>
      <calcite-tab>Tab 2 Content</calcite-tab>
      <calcite-tab>Tab 3 Content</calcite-tab>
      <calcite-tab selected>Tab 4 Content</calcite-tab>
      <calcite-tab>Tab 5 Content</calcite-tab>
      <calcite-tab>Tab 6 Content</calcite-tab>
      <calcite-tab>Tab 7 Content</calcite-tab>
      <calcite-tab>Tab 8 Content</calcite-tab>
    </calcite-tabs>

    <calcite-tabs layout="center" scale="{scale}">
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
        <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
        <calcite-tab-title>Tab 5 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
        <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
        <calcite-tab-title>Tab 8 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab selected>Tab 1 Content</calcite-tab>
      <calcite-tab>Tab 2 Content</calcite-tab>
      <calcite-tab>Tab 3 Content</calcite-tab>
      <calcite-tab selected>Tab 4 Content</calcite-tab>
      <calcite-tab>Tab 5 Content</calcite-tab>
      <calcite-tab>Tab 6 Content</calcite-tab>
      <calcite-tab>Tab 7 Content</calcite-tab>
      <calcite-tab>Tab 8 Content</calcite-tab>
    </calcite-tabs>

    <calcite-tabs bordered scale="{scale}">
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
        <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
        <calcite-tab-title>Tab 5 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
        <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
        <calcite-tab-title>Tab 8 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab>Tab 1 Content</calcite-tab>
      <calcite-tab>Tab 2 Content</calcite-tab>
      <calcite-tab>Tab 3 Content</calcite-tab>
      <calcite-tab selected>Tab 4 Content</calcite-tab>
      <calcite-tab>Tab 5 Content</calcite-tab>
      <calcite-tab>Tab 6 Content</calcite-tab>
      <calcite-tab>Tab 7 Content</calcite-tab>
      <calcite-tab>Tab 8 Content</calcite-tab>
    </calcite-tabs>

    <calcite-tabs bordered layout="center" scale="{scale}">
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
        <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
        <calcite-tab-title>Tab 5 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
        <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
        <calcite-tab-title>Tab 8 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab>Tab 1 Content</calcite-tab>
      <calcite-tab>Tab 2 Content</calcite-tab>
      <calcite-tab>Tab 3 Content</calcite-tab>
      <calcite-tab selected>Tab 4 Content</calcite-tab>
      <calcite-tab>Tab 5 Content</calcite-tab>
      <calcite-tab>Tab 6 Content</calcite-tab>
      <calcite-tab>Tab 7 Content</calcite-tab>
      <calcite-tab>Tab 8 Content</calcite-tab>
    </calcite-tabs>
  `), V = () => t`
  <style>
    :root {
      --calcite-tab-content-block-padding: 0;
    }
  </style>
  <calcite-tabs>
    <calcite-tabs>
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab>
        <div>Tab 1 Content</div>
      </calcite-tab>
    </calcite-tabs>
  </calcite-tabs>
`, B = () => t`
  <calcite-tabs>
    <calcite-tabs>
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab style="--calcite-tab-content-block-padding: 0;">
        <div>Tab 1 Content</div>
      </calcite-tab>
    </calcite-tabs>
  </calcite-tabs>
`;
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(args: TabsStoryArgs): string => html\`
  <calcite-tabs
    \${boolean("bordered", args.bordered)}
    layout="\${args.layout}"
    position="\${args.position}"
    scale="\${args.scale}"
  >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled>Disabled Tab</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs dir="rtl" class="calcite-mode-dark">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled>Disabled Tab</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
\``,
      ...b.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs layout="inline" position="top" scale="m" bordered>
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
\``,
      ...T.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs layout="inline" position="top" scale="m">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1" closable> Tab 1 Title </calcite-tab-title>
      <calcite-tab-title tab="tab2" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" closable selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
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
  <calcite-tabs layout="inline" position="top" scale="m" bordered dir="rtl" class="calcite-mode-dark">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs layout="inline" position="top" scale="m">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected icon-start="\${selectedIcon}">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="\${selectedIcon}">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="\${selectedIcon}" icon-end="\${selectedIcon}">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="\${selectedIcon}"></calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 400px;">
    <calcite-tabs
    layout="inline"
    position="top"
    scale="m"
    >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title id="reference-element">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab selected>
      <p>Tab 1 Content</p><br />
    </calcite-tab>
    <calcite-tab><p>Tab 2 Content</p>
    <img src="\${placeholderImage({
  width: 1000,
  height: 200
})}"></img>
    </calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
    </calcite-tabs>
  </div>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="center" scale="s">${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="center" scale="m">${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="center" scale="l">${TabNavHTMLSimple}</calcite-tabs>\n`',
      ...u.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="center" scale="s">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="center" scale="m">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="center" scale="l">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n`',
      ...v.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="center" scale="s" bordered>${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="center" scale="m" bordered>${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="center" scale="l" bordered>${TabNavHTMLSimple}</calcite-tabs>\n`',
      ...g.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="center" scale="s" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="center" scale="m" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="center" scale="l" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n`',
      ...h.parameters?.docs?.source
    }
  }
};
C.parameters = {
  ...C.parameters,
  docs: {
    ...C.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="inline" scale="s">${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="m">${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="l">${TabNavHTMLSimple}</calcite-tabs>\n`',
      ...C.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="inline" scale="s">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="m">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="l">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n`',
      ...y.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="inline" scale="s" bordered>${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="m" bordered>${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="l" bordered>${TabNavHTMLSimple}</calcite-tabs>\n`',
      ...w.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="inline" scale="s" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="m" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="l" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n`',
      ...$.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs scale="l">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title disabled icon-start="arrow-left">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
\``,
      ...S.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 4 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
\``,
      ...k.parameters?.docs?.source
    }
  }
};
A.parameters = {
  ...A.parameters,
  docs: {
    ...A.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs layout="center" bordered>
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 4 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
\``,
      ...A.parameters?.docs?.source
    }
  }
};
W.parameters = {
  ...W.parameters,
  docs: {
    ...W.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 3 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
\``,
      ...W.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs layout="inline">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 3 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
\``,
      ...L.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs style="height: 250px;">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Boats</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab style="background: pink;">
      <div style="background: red; height: 100%;">Tab 1 content</div>
    </calcite-tab>
  </calcite-tabs>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs style="height: 250px;">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Boats</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab style="background: pink;">
      <div style="background: linear-gradient(to bottom, red, transparent); height: 200%;">Tab 1 content</div>
    </calcite-tab>
  </calcite-tabs>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
N.parameters = {
  ...N.parameters,
  docs: {
    ...N.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs style="height: 400px">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected> Watercraft </calcite-tab-title>
      <calcite-tab-title>Automobiles</calcite-tab-title>
      <calcite-tab-title>Aircraft</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected>
      <calcite-notice icon="embark" open>
        <div slot="message">Recommended for coastal use</div>
      </calcite-notice>
      <calcite-notice icon="embark" open>
        <div slot="message">Why is there a vertical scroll bar in this panel?</div>
      </calcite-notice>
    </calcite-tab>
    <calcite-tab>
      <calcite-notice icon="car" open>
        <div slot="message">A good choice for inland adventure</div>
      </calcite-notice>
      <calcite-notice icon="car" open>
        <div slot="message">A good choice for inland adventure 2</div>
      </calcite-notice>
    </calcite-tab>
    <calcite-tab>
      <calcite-notice icon="plane" open>
        <div slot="message">Cross continents quickly</div>
      </calcite-notice>
    </calcite-tab>
  </calcite-tabs>
\``,
      ...N.parameters?.docs?.source
    }
  }
};
H.parameters = {
  ...H.parameters,
  docs: {
    ...H.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-shell content-behind>
    <calcite-shell-panel slot="panel-end" width-scale="l" position="end" display-mode="float">
      <calcite-panel heading="Panel with Tabs >> vertical scrollbar">
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
            <calcite-notice icon="embark" open>
              <div slot="message">Why is there a vertical scroll bar in this panel?</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure 2</div>
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
  </calcite-shell>
\``,
      ...H.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: `(): string => createBreakpointStories(html\`
    <style>
      .breakpoint-story-container {
        flex-direction: column;
      }
    </style>
    <calcite-tabs scale="{scale}">
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
        <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
        <calcite-tab-title>Tab 5 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
        <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
        <calcite-tab-title>Tab 8 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab selected>Tab 1 Content</calcite-tab>
      <calcite-tab>Tab 2 Content</calcite-tab>
      <calcite-tab>Tab 3 Content</calcite-tab>
      <calcite-tab selected>Tab 4 Content</calcite-tab>
      <calcite-tab>Tab 5 Content</calcite-tab>
      <calcite-tab>Tab 6 Content</calcite-tab>
      <calcite-tab>Tab 7 Content</calcite-tab>
      <calcite-tab>Tab 8 Content</calcite-tab>
    </calcite-tabs>

    <calcite-tabs layout="center" scale="{scale}">
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
        <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
        <calcite-tab-title>Tab 5 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
        <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
        <calcite-tab-title>Tab 8 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab selected>Tab 1 Content</calcite-tab>
      <calcite-tab>Tab 2 Content</calcite-tab>
      <calcite-tab>Tab 3 Content</calcite-tab>
      <calcite-tab selected>Tab 4 Content</calcite-tab>
      <calcite-tab>Tab 5 Content</calcite-tab>
      <calcite-tab>Tab 6 Content</calcite-tab>
      <calcite-tab>Tab 7 Content</calcite-tab>
      <calcite-tab>Tab 8 Content</calcite-tab>
    </calcite-tabs>

    <calcite-tabs bordered scale="{scale}">
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
        <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
        <calcite-tab-title>Tab 5 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
        <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
        <calcite-tab-title>Tab 8 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab>Tab 1 Content</calcite-tab>
      <calcite-tab>Tab 2 Content</calcite-tab>
      <calcite-tab>Tab 3 Content</calcite-tab>
      <calcite-tab selected>Tab 4 Content</calcite-tab>
      <calcite-tab>Tab 5 Content</calcite-tab>
      <calcite-tab>Tab 6 Content</calcite-tab>
      <calcite-tab>Tab 7 Content</calcite-tab>
      <calcite-tab>Tab 8 Content</calcite-tab>
    </calcite-tabs>

    <calcite-tabs bordered layout="center" scale="{scale}">
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
        <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
        <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
        <calcite-tab-title>Tab 5 Title</calcite-tab-title>
        <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
        <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
        <calcite-tab-title>Tab 8 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab>Tab 1 Content</calcite-tab>
      <calcite-tab>Tab 2 Content</calcite-tab>
      <calcite-tab>Tab 3 Content</calcite-tab>
      <calcite-tab selected>Tab 4 Content</calcite-tab>
      <calcite-tab>Tab 5 Content</calcite-tab>
      <calcite-tab>Tab 6 Content</calcite-tab>
      <calcite-tab>Tab 7 Content</calcite-tab>
      <calcite-tab>Tab 8 Content</calcite-tab>
    </calcite-tabs>
  \`)`,
      ...M.parameters?.docs?.source
    }
  }
};
V.parameters = {
  ...V.parameters,
  docs: {
    ...V.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    :root {
      --calcite-tab-content-block-padding: 0;
    }
  </style>
  <calcite-tabs>
    <calcite-tabs>
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab>
        <div>Tab 1 Content</div>
      </calcite-tab>
    </calcite-tabs>
  </calcite-tabs>
\``,
      ...V.parameters?.docs?.source
    }
  }
};
B.parameters = {
  ...B.parameters,
  docs: {
    ...B.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-tabs>
    <calcite-tabs>
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab style="--calcite-tab-content-block-padding: 0;">
        <div>Tab 1 Content</div>
      </calcite-tab>
    </calcite-tabs>
  </calcite-tabs>
\``,
      ...B.parameters?.docs?.source
    }
  }
};
const ct = ["simple", "simpleDarkModeRTL", "bordered", "closable", "borderedDarkModeRTL", "withIcons", "setWidth", "centerScale", "centerVariedTabWidthScale", "centerBorderedScale", "centerBorderedVariedTabWidthScale", "inlineScale", "inlineVariedTabWidthScale", "inlineBorderedScale", "inlineBorderedVariedTabWidthScale", "disabledTabsAndMediumIconsForLargeTabsTitle", "centered", "centeredClosable", "centeredBorderedClosable", "centeredTabsAreEvenlyJustifiedAcrossNavWidth", "inlineTabsJustifyAgainstTheStartOfTheNavWidth", "Tab100PercentHeightNoVerticalScroll", "Tab200PercentHeightWithVerticalScroll", "fixedHeightNoVerticalScrollbar", "noVerticalScrollbarInsideShellPanel", "responsiveTabs", "paddingPropOverrideAtRootLevel", "paddingPropOverrideAtElementLevel"];
export {
  o as Tab100PercentHeightNoVerticalScroll,
  s as Tab200PercentHeightWithVerticalScroll,
  ct as __namedExportsOrder,
  T as bordered,
  n as borderedDarkModeRTL,
  g as centerBorderedScale,
  h as centerBorderedVariedTabWidthScale,
  u as centerScale,
  v as centerVariedTabWidthScale,
  f as centered,
  A as centeredBorderedClosable,
  k as centeredClosable,
  W as centeredTabsAreEvenlyJustifiedAcrossNavWidth,
  d as closable,
  et as default,
  S as disabledTabsAndMediumIconsForLargeTabsTitle,
  N as fixedHeightNoVerticalScrollbar,
  w as inlineBorderedScale,
  $ as inlineBorderedVariedTabWidthScale,
  C as inlineScale,
  L as inlineTabsJustifyAgainstTheStartOfTheNavWidth,
  y as inlineVariedTabWidthScale,
  H as noVerticalScrollbarInsideShellPanel,
  B as paddingPropOverrideAtElementLevel,
  V as paddingPropOverrideAtRootLevel,
  M as responsiveTabs,
  m as setWidth,
  r as simple,
  b as simpleDarkModeRTL,
  p as withIcons
};
