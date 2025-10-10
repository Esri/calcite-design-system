import { i as P } from "./helpers.js";
import { p as R } from "./placeholder-image.js";
import { n as D, h as t, j as I } from "./index.js";
import { A as U } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  layout: V,
  position: B,
  scale: x
} = U, j = {
  title: "Components/Tabs",
  args: {
    layout: V.values[3],
    position: B.values[2],
    scale: x.defaultValue
  },
  argTypes: {
    layout: {
      options: V.values.filter((c) => c !== "auto" && c !== "fixed" && c !== "none" && c !== "horizontal-single"),
      control: {
        type: "select"
      }
    },
    position: {
      options: B.values.filter((c) => c !== "start" && c !== "end"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: x.values,
      control: {
        type: "select"
      }
    }
  }
}, r = (c) => t`
  <calcite-tabs layout="${c.layout}" position="${c.position}" scale="${c.scale}">
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
  themes: I,
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
  themes: I
};
const i = P[0], p = () => t`
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
    <img src="${R({
  width: 1e3,
  height: 200
})}"></img>
    </calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
    </calcite-tabs>
  </div>
`, a = t`
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
`, e = t`
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
  <calcite-tabs layout="center" scale="s">${a}</calcite-tabs>
  <calcite-tabs layout="center" scale="m">${a}</calcite-tabs>
  <calcite-tabs layout="center" scale="l">${a}</calcite-tabs>
`, v = () => t`
  ${l}
  <calcite-tabs layout="center" scale="s">${e}</calcite-tabs>
  <calcite-tabs layout="center" scale="m">${e}</calcite-tabs>
  <calcite-tabs layout="center" scale="l">${e}</calcite-tabs>
`, g = () => t`
  ${l}
  <calcite-tabs layout="center" scale="s" bordered>${a}</calcite-tabs>
  <calcite-tabs layout="center" scale="m" bordered>${a}</calcite-tabs>
  <calcite-tabs layout="center" scale="l" bordered>${a}</calcite-tabs>
`, h = () => t`
  ${l}
  <calcite-tabs layout="center" scale="s" bordered>${e}</calcite-tabs>
  <calcite-tabs layout="center" scale="m" bordered>${e}</calcite-tabs>
  <calcite-tabs layout="center" scale="l" bordered>${e}</calcite-tabs>
`, y = () => t`
  ${l}
  <calcite-tabs layout="inline" scale="s">${a}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m">${a}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l">${a}</calcite-tabs>
`, C = () => t`
  ${l}
  <calcite-tabs layout="inline" scale="s">${e}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m">${e}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l">${e}</calcite-tabs>
`, w = () => t`
  ${l}
  <calcite-tabs layout="inline" scale="s" bordered>${a}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m" bordered>${a}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l" bordered>${a}</calcite-tabs>
`, S = () => t`
  ${l}
  <calcite-tabs layout="inline" scale="s" bordered>${e}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m" bordered>${e}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l" bordered>${e}</calcite-tabs>
`, $ = () => t`
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
`, O = () => t`
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
`, k = () => t`
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
`, A = () => t`
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
`, _ = () => t`
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
const W = () => t`
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
`, L = () => t`
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
`, N = () => D(t`
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
  `), H = () => t`
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
`, M = () => t`
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
  <calcite-tabs layout="\${args.layout}" position="\${args.position}" scale="\${args.scale}">
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
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="inline" scale="s">${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="m">${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="l">${TabNavHTMLSimple}</calcite-tabs>\n`',
      ...y.parameters?.docs?.source
    }
  }
};
C.parameters = {
  ...C.parameters,
  docs: {
    ...C.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="inline" scale="s">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="m">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="l">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n`',
      ...C.parameters?.docs?.source
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
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="inline" scale="s" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="m" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="l" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n`',
      ...S.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
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
      ...$.parameters?.docs?.source
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
O.parameters = {
  ...O.parameters,
  docs: {
    ...O.parameters?.docs,
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
      ...O.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
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
      ...A.parameters?.docs?.source
    }
  }
};
_.parameters = {
  ..._.parameters,
  docs: {
    ..._.parameters?.docs,
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
      ..._.parameters?.docs?.source
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
W.parameters = {
  ...W.parameters,
  docs: {
    ...W.parameters?.docs,
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
      ...L.parameters?.docs?.source
    }
  }
};
N.parameters = {
  ...N.parameters,
  docs: {
    ...N.parameters?.docs,
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
      ...H.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
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
      ...M.parameters?.docs?.source
    }
  }
};
const z = ["simple", "simpleDarkModeRTL_TestOnly", "bordered", "closable", "borderedDarkModeRTL_TestOnly", "withIcons", "setWidth", "centerScale_TestOnly", "centerVariedTabWidthScale_TestOnly", "centerBorderedScale_TestOnly", "centerBorderedVariedTabWidthScale_TestOnly", "inlineScale_TestOnly", "inlineVariedTabWidthScale_TestOnly", "inlineBorderedScale_TestOnly", "inlineBorderedVariedTabWidthScale_TestOnly", "disabledTabsAndMediumIconsForLargeTabsTitle_TestOnly", "centered_TestOnly", "centeredClosable_TestOnly", "centeredBorderedClosable_TestOnly", "centeredTabsAreEvenlyJustifiedAcrossNavWidth_TestOnly", "inlineTabsJustifyAgainstTheStartOfTheNavWidth_TestOnly", "Tab100PercentHeightNoVerticalScroll", "Tab200PercentHeightWithVerticalScroll", "fixedHeightNoVerticalScrollbar_TestOnly", "noVerticalScrollbarInsideShellPanel_TestOnly", "responsiveTabs", "paddingPropOverrideAtRootLevel", "paddingPropOverrideAtElementLevel"];
export {
  o as Tab100PercentHeightNoVerticalScroll,
  s as Tab200PercentHeightWithVerticalScroll,
  z as __namedExportsOrder,
  T as bordered,
  n as borderedDarkModeRTL_TestOnly,
  g as centerBorderedScale_TestOnly,
  h as centerBorderedVariedTabWidthScale_TestOnly,
  u as centerScale_TestOnly,
  v as centerVariedTabWidthScale_TestOnly,
  k as centeredBorderedClosable_TestOnly,
  O as centeredClosable_TestOnly,
  A as centeredTabsAreEvenlyJustifiedAcrossNavWidth_TestOnly,
  f as centered_TestOnly,
  d as closable,
  j as default,
  $ as disabledTabsAndMediumIconsForLargeTabsTitle_TestOnly,
  W as fixedHeightNoVerticalScrollbar_TestOnly,
  w as inlineBorderedScale_TestOnly,
  S as inlineBorderedVariedTabWidthScale_TestOnly,
  y as inlineScale_TestOnly,
  _ as inlineTabsJustifyAgainstTheStartOfTheNavWidth_TestOnly,
  C as inlineVariedTabWidthScale_TestOnly,
  L as noVerticalScrollbarInsideShellPanel_TestOnly,
  M as paddingPropOverrideAtElementLevel,
  H as paddingPropOverrideAtRootLevel,
  N as responsiveTabs,
  m as setWidth,
  r as simple,
  b as simpleDarkModeRTL_TestOnly,
  p as withIcons
};
