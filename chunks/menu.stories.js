/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as e } from "./formatting.js";
import { A as p } from "./resources34.js";
import "./menu.js";
import "./menu-item.js";
import "./panel.js";
import "./shell-panel.js";
import { m as b } from "./utils3.js";
const {
  layout: x
} = p, S = {
  title: "Components/Menu",
  args: {
    label: "Menu",
    layout: x.defaultValue
  },
  argTypes: {
    layout: {
      options: x.values.filter((t) => t !== "grid" && t !== "inline" && t !== "center" && t !== "auto" && t !== "fixed" && t !== "none" && t !== "horizontal-single"),
      control: {
        type: "select"
      }
    }
  }
}, c = (t) => e`
  <calcite-menu label="${t.label}" layout="${t.layout}">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>
`, m = () => e`<calcite-menu>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 1"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 2"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      icon-end="layer"
      text="Example item 3"
      active
      text-enabled
    ></calcite-menu-item>
  </calcite-menu>`, a = () => e`<calcite-menu layout="vertical">
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 1"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 2"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      icon-end="layer"
      text="Example item 3"
      active
      text-enabled
    ></calcite-menu-item>
  </calcite-menu>`, l = () => e`
  <style>
    .menu-scale-test {
      display: grid;
      gap: 3rem;
    }

    .comparison-section {
      display: grid;
      gap: 1rem;
    }

    .comparison-grid {
      align-items: center;
      column-gap: 1.5rem;
      display: grid;
      gap: 0.75rem;
      grid-template-columns:
        10rem
        minmax(22rem, max-content)
        minmax(22rem, max-content)
        minmax(23rem, max-content);
      row-gap: 1rem;
    }

    .layout-heading {
      grid-column: 1 / -1;
      font-weight: 600;
    }

    .comparison-grid calcite-menu {
      justify-self: start;
    }

    .comparison-grid calcite-menu.vertical-scale-s,
    .comparison-grid calcite-menu.vertical-scale-m {
      inline-size: 232px;
    }

    .comparison-grid calcite-menu.vertical-scale-l {
      inline-size: 314px;
    }

    .column-heading,
    .row-heading {
      font-weight: 600;
    }

    .row-heading {
      padding-block-start: 0.75rem;
    }

    .comparison-section h2 {
      margin-block: 3rem 0;
    }
  </style>

  <div class="menu-scale-test">
    <section class="comparison-section">
      <h2>Horizontal</h2>
      <div class="comparison-grid comparison-grid--horizontal">
        <div></div>
        <div class="column-heading">Scale s</div>
        <div class="column-heading">Scale m</div>
        <div class="column-heading">Scale l</div>

        <div class="row-heading">Default</div>
        <calcite-menu scale="s">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu>
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu scale="l">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>

        <div class="row-heading">Has children</div>
        <calcite-menu scale="s">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu>
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu scale="l">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Has children + href</div>
        <calcite-menu scale="s">
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu>
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu scale="l">
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Has breadcrumbs</div>
        <calcite-menu scale="s">
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu>
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu scale="l">
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>

        <h2 class="layout-heading">Vertical</h2>
        <div></div>
        <div class="column-heading">Scale s</div>
        <div class="column-heading">Scale m</div>
        <div class="column-heading">Scale l</div>

        <div class="row-heading">Default</div>
        <calcite-menu class="vertical-scale-s" layout="vertical" scale="s">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-m" layout="vertical">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-l" layout="vertical" scale="l">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>

        <div class="row-heading">Has children</div>
        <calcite-menu class="vertical-scale-s" layout="vertical" scale="s">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu class="vertical-scale-m" layout="vertical">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu class="vertical-scale-l" layout="vertical" scale="l">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Is child</div>
        <calcite-menu class="vertical-scale-s" layout="vertical" scale="s">
          <calcite-menu-item class="is-child" icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-m" layout="vertical">
          <calcite-menu-item class="is-child" icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-l" layout="vertical" scale="l">
          <calcite-menu-item class="is-child" icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>

        <div class="row-heading">Has children + href</div>
        <calcite-menu class="vertical-scale-s" layout="vertical" scale="s">
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu class="vertical-scale-m" layout="vertical">
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu class="vertical-scale-l" layout="vertical" scale="l">
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Has breadcrumbs</div>
        <calcite-menu class="vertical-scale-s" layout="vertical" scale="s">
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-m" layout="vertical">
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-l" layout="vertical" scale="l">
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
      </div>
    </section>
  </div>
`, u = () => e`
  <style>
    .active-vertical-scales {
      align-items: start;
      display: grid;
      gap: 1.5rem;
      grid-template-columns: repeat(3, minmax(14.5rem, 1fr));
    }

    .active-vertical-scales calcite-menu {
      inline-size: 100%;
    }
  </style>

  <div class="active-vertical-scales">
    <section>
      <h2>Small</h2>
      <calcite-menu label="Small active vertical menu" layout="vertical" scale="s">
        <calcite-menu-item text="Default"></calcite-menu-item>
        <calcite-menu-item active text="Active"></calcite-menu-item>
        <calcite-menu-item active href="#small" text="Linked active" open>
          <calcite-menu-item slot="submenu-item" text="Submenu item"></calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>
    </section>

    <section>
      <h2>Medium</h2>
      <calcite-menu label="Medium active vertical menu" layout="vertical" scale="m">
        <calcite-menu-item text="Default"></calcite-menu-item>
        <calcite-menu-item active text="Active"></calcite-menu-item>
        <calcite-menu-item active href="#medium" text="Linked active" open>
          <calcite-menu-item slot="submenu-item" text="Submenu item"></calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>
    </section>

    <section>
      <h2>Large</h2>
      <calcite-menu label="Large active vertical menu" layout="vertical" scale="l">
        <calcite-menu-item text="Default"></calcite-menu-item>
        <calcite-menu-item active text="Active"></calcite-menu-item>
        <calcite-menu-item active href="#large" text="Linked active" open>
          <calcite-menu-item slot="submenu-item" text="Submenu item"></calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>
    </section>
  </div>
`, s = () => e`<calcite-panel>
    <calcite-menu layout="horizontal">
      <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
      <calcite-menu-item text="Example item 3" text-enabled open>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled></calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>
      </calcite-menu-item>
      <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item></calcite-menu
  ></calcite-panel>`, o = () => e`<calcite-menu>
    <calcite-menu-item text="Item" href="#item" open>
      <calcite-menu-item text="item1" slot="submenu-item" active></calcite-menu-item>
      <calcite-menu-item text="item2" slot="submenu-item"></calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Item 2" href="#item"></calcite-menu-item>
    <calcite-menu-item text="Item 3" href="#item"></calcite-menu-item>
  </calcite-menu>`, r = () => e`<style>
      .vertical-submenu-scales {
        align-items: start;
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(3, minmax(14.5rem, 1fr));
      }
    </style>

    <div class="vertical-submenu-scales">
      <section>
        <h2>Small</h2>
        <calcite-menu layout="vertical" scale="s">
          <calcite-menu-item href="#item" open text="Item">
            <calcite-menu-item active slot="submenu-item" text="item1"></calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="item2"></calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 2"></calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 3"></calcite-menu-item>
        </calcite-menu>
      </section>

      <section>
        <h2>Medium</h2>
        <calcite-menu layout="vertical" scale="m">
          <calcite-menu-item href="#item" open text="Item">
            <calcite-menu-item active slot="submenu-item" text="item1"></calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="item2"></calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 2"></calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 3"></calcite-menu-item>
        </calcite-menu>
      </section>

      <section>
        <h2>Large</h2>
        <calcite-menu layout="vertical" scale="l">
          <calcite-menu-item href="#item" open text="Item">
            <calcite-menu-item active slot="submenu-item" text="item1"></calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="item2"></calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 2"></calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 3"></calcite-menu-item>
        </calcite-menu>
      </section>
    </div>`, i = () => e`<calcite-menu dir="rtl" class="calcite-mode-dark">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>`;
i.parameters = {
  themes: b
};
const d = () => e`<calcite-shell-panel width-scale="l">
    <calcite-panel heading="Extreme nested vertical menu">
      <calcite-menu layout="vertical">
        <calcite-menu-item icon-start="layer" icon-end="layer" text="Home"></calcite-menu-item>
        <calcite-menu-item
          icon-start="layer"
          icon-end="layer"
          href="#"
          text="Example nested"
          icon-start="layer"
          breadcrumb
        >
          <calcite-menu-item icon-end="layer" icon-start="layer" slot="submenu-item" text="Capabilities">
          </calcite-menu-item>
          <calcite-menu-item icon-start="layer" slot="submenu-item" title text="ArcGIS Online" breadcrumb open>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities">
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item text="Example nested" icon-start="layer" icon-end="layer" breadcrumb open>
          <calcite-menu-item slot="submenu-item" title text="ArcGIS Online" breadcrumb open>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" breadcrumb>
            </calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Capabilities" open>
              <calcite-menu-item slot="submenu-item" text="Capabilities" icon-end="layer"></calcite-menu-item>
              <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>
            </calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Something else"></calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Another thing">
              <calcite-menu-item slot="submenu-item" text="Great examples">
                <calcite-menu-item slot="submenu-item" text="Great examples" breadcrumb></calcite-menu-item>
                <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>
                <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
              </calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item href="#" slot="submenu-item" text="It's stupendous" open>
            <calcite-menu-item slot="submenu-item" text="Very nice example"></calcite-menu-item>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Short one" open>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Another thing" open>
                <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" open>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                </calcite-menu-item>
              </calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>
        <calcite-menu-item text="Reference" active></calcite-menu-item>
        <calcite-menu-item text="Reference"></calcite-menu-item>
        <calcite-menu-item text="Reference"></calcite-menu-item>
      </calcite-menu>
    </calcite-panel>
  </calcite-shell-panel>`, n = () => e`<calcite-menu layout="vertical" dir="rtl" class="calcite-mode-dark">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>`;
n.parameters = {
  themes: b
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(args: MenuStoryArgs): string => html\`
  <calcite-menu label="\${args.label}" layout="\${args.layout}">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 1"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 2"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      icon-end="layer"
      text="Example item 3"
      active
      text-enabled
    ></calcite-menu-item>
  </calcite-menu>\``,
      ...m.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu layout="vertical">
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 1"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 2"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      icon-end="layer"
      text="Example item 3"
      active
      text-enabled
    ></calcite-menu-item>
  </calcite-menu>\``,
      ...a.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .menu-scale-test {
      display: grid;
      gap: 3rem;
    }

    .comparison-section {
      display: grid;
      gap: 1rem;
    }

    .comparison-grid {
      align-items: center;
      column-gap: 1.5rem;
      display: grid;
      gap: 0.75rem;
      grid-template-columns:
        10rem
        minmax(22rem, max-content)
        minmax(22rem, max-content)
        minmax(23rem, max-content);
      row-gap: 1rem;
    }

    .layout-heading {
      grid-column: 1 / -1;
      font-weight: 600;
    }

    .comparison-grid calcite-menu {
      justify-self: start;
    }

    .comparison-grid calcite-menu.vertical-scale-s,
    .comparison-grid calcite-menu.vertical-scale-m {
      inline-size: 232px;
    }

    .comparison-grid calcite-menu.vertical-scale-l {
      inline-size: 314px;
    }

    .column-heading,
    .row-heading {
      font-weight: 600;
    }

    .row-heading {
      padding-block-start: 0.75rem;
    }

    .comparison-section h2 {
      margin-block: 3rem 0;
    }
  </style>

  <div class="menu-scale-test">
    <section class="comparison-section">
      <h2>Horizontal</h2>
      <div class="comparison-grid comparison-grid--horizontal">
        <div></div>
        <div class="column-heading">Scale s</div>
        <div class="column-heading">Scale m</div>
        <div class="column-heading">Scale l</div>

        <div class="row-heading">Default</div>
        <calcite-menu scale="s">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu>
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu scale="l">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>

        <div class="row-heading">Has children</div>
        <calcite-menu scale="s">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu>
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu scale="l">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Has children + href</div>
        <calcite-menu scale="s">
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu>
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu scale="l">
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Has breadcrumbs</div>
        <calcite-menu scale="s">
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu>
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu scale="l">
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>

        <h2 class="layout-heading">Vertical</h2>
        <div></div>
        <div class="column-heading">Scale s</div>
        <div class="column-heading">Scale m</div>
        <div class="column-heading">Scale l</div>

        <div class="row-heading">Default</div>
        <calcite-menu class="vertical-scale-s" layout="vertical" scale="s">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-m" layout="vertical">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-l" layout="vertical" scale="l">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>

        <div class="row-heading">Has children</div>
        <calcite-menu class="vertical-scale-s" layout="vertical" scale="s">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu class="vertical-scale-m" layout="vertical">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu class="vertical-scale-l" layout="vertical" scale="l">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Is child</div>
        <calcite-menu class="vertical-scale-s" layout="vertical" scale="s">
          <calcite-menu-item class="is-child" icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-m" layout="vertical">
          <calcite-menu-item class="is-child" icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-l" layout="vertical" scale="l">
          <calcite-menu-item class="is-child" icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>

        <div class="row-heading">Has children + href</div>
        <calcite-menu class="vertical-scale-s" layout="vertical" scale="s">
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu class="vertical-scale-m" layout="vertical">
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu class="vertical-scale-l" layout="vertical" scale="l">
          <calcite-menu-item href="#" icon-end="diamond" icon-start="diamond" text="Menu item">
            <calcite-menu-item icon-end="diamond" icon-start="diamond" slot="submenu-item" text="Menu item" />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Has breadcrumbs</div>
        <calcite-menu class="vertical-scale-s" layout="vertical" scale="s">
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-m" layout="vertical">
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
        <calcite-menu class="vertical-scale-l" layout="vertical" scale="l">
          <calcite-menu-item breadcrumb icon-end="diamond" icon-start="diamond" text="Menu item" />
        </calcite-menu>
      </div>
    </section>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .active-vertical-scales {
      align-items: start;
      display: grid;
      gap: 1.5rem;
      grid-template-columns: repeat(3, minmax(14.5rem, 1fr));
    }

    .active-vertical-scales calcite-menu {
      inline-size: 100%;
    }
  </style>

  <div class="active-vertical-scales">
    <section>
      <h2>Small</h2>
      <calcite-menu label="Small active vertical menu" layout="vertical" scale="s">
        <calcite-menu-item text="Default"></calcite-menu-item>
        <calcite-menu-item active text="Active"></calcite-menu-item>
        <calcite-menu-item active href="#small" text="Linked active" open>
          <calcite-menu-item slot="submenu-item" text="Submenu item"></calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>
    </section>

    <section>
      <h2>Medium</h2>
      <calcite-menu label="Medium active vertical menu" layout="vertical" scale="m">
        <calcite-menu-item text="Default"></calcite-menu-item>
        <calcite-menu-item active text="Active"></calcite-menu-item>
        <calcite-menu-item active href="#medium" text="Linked active" open>
          <calcite-menu-item slot="submenu-item" text="Submenu item"></calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>
    </section>

    <section>
      <h2>Large</h2>
      <calcite-menu label="Large active vertical menu" layout="vertical" scale="l">
        <calcite-menu-item text="Default"></calcite-menu-item>
        <calcite-menu-item active text="Active"></calcite-menu-item>
        <calcite-menu-item active href="#large" text="Linked active" open>
          <calcite-menu-item slot="submenu-item" text="Submenu item"></calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>
    </section>
  </div>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-panel>
    <calcite-menu layout="horizontal">
      <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
      <calcite-menu-item text="Example item 3" text-enabled open>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled></calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>
      </calcite-menu-item>
      <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item></calcite-menu
  ></calcite-panel>\``,
      ...s.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu>
    <calcite-menu-item text="Item" href="#item" open>
      <calcite-menu-item text="item1" slot="submenu-item" active></calcite-menu-item>
      <calcite-menu-item text="item2" slot="submenu-item"></calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Item 2" href="#item"></calcite-menu-item>
    <calcite-menu-item text="Item 3" href="#item"></calcite-menu-item>
  </calcite-menu>\``,
      ...o.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<style>
      .vertical-submenu-scales {
        align-items: start;
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(3, minmax(14.5rem, 1fr));
      }
    </style>

    <div class="vertical-submenu-scales">
      <section>
        <h2>Small</h2>
        <calcite-menu layout="vertical" scale="s">
          <calcite-menu-item href="#item" open text="Item">
            <calcite-menu-item active slot="submenu-item" text="item1"></calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="item2"></calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 2"></calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 3"></calcite-menu-item>
        </calcite-menu>
      </section>

      <section>
        <h2>Medium</h2>
        <calcite-menu layout="vertical" scale="m">
          <calcite-menu-item href="#item" open text="Item">
            <calcite-menu-item active slot="submenu-item" text="item1"></calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="item2"></calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 2"></calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 3"></calcite-menu-item>
        </calcite-menu>
      </section>

      <section>
        <h2>Large</h2>
        <calcite-menu layout="vertical" scale="l">
          <calcite-menu-item href="#item" open text="Item">
            <calcite-menu-item active slot="submenu-item" text="item1"></calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="item2"></calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 2"></calcite-menu-item>
          <calcite-menu-item href="#item" text="Item 3"></calcite-menu-item>
        </calcite-menu>
      </section>
    </div>\``,
      ...r.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu dir="rtl" class="calcite-mode-dark">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>\``,
      ...i.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-shell-panel width-scale="l">
    <calcite-panel heading="Extreme nested vertical menu">
      <calcite-menu layout="vertical">
        <calcite-menu-item icon-start="layer" icon-end="layer" text="Home"></calcite-menu-item>
        <calcite-menu-item
          icon-start="layer"
          icon-end="layer"
          href="#"
          text="Example nested"
          icon-start="layer"
          breadcrumb
        >
          <calcite-menu-item icon-end="layer" icon-start="layer" slot="submenu-item" text="Capabilities">
          </calcite-menu-item>
          <calcite-menu-item icon-start="layer" slot="submenu-item" title text="ArcGIS Online" breadcrumb open>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities">
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item text="Example nested" icon-start="layer" icon-end="layer" breadcrumb open>
          <calcite-menu-item slot="submenu-item" title text="ArcGIS Online" breadcrumb open>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" breadcrumb>
            </calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Capabilities" open>
              <calcite-menu-item slot="submenu-item" text="Capabilities" icon-end="layer"></calcite-menu-item>
              <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>
            </calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Something else"></calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Another thing">
              <calcite-menu-item slot="submenu-item" text="Great examples">
                <calcite-menu-item slot="submenu-item" text="Great examples" breadcrumb></calcite-menu-item>
                <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>
                <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
              </calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item href="#" slot="submenu-item" text="It's stupendous" open>
            <calcite-menu-item slot="submenu-item" text="Very nice example"></calcite-menu-item>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Short one" open>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Another thing" open>
                <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" open>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                </calcite-menu-item>
              </calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>
        <calcite-menu-item text="Reference" active></calcite-menu-item>
        <calcite-menu-item text="Reference"></calcite-menu-item>
        <calcite-menu-item text="Reference"></calcite-menu-item>
      </calcite-menu>
    </calcite-panel>
  </calcite-shell-panel>\``,
      ...d.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-menu layout="vertical" dir="rtl" class="calcite-mode-dark">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>\``,
      ...n.parameters?.docs?.source
    }
  }
};
const I = ["simple", "iconsAndBreadcrumb", "iconsAndBreadcrumbVertical", "allScales", "activeVerticalOpenAllScales", "withNesting", "WithSubmenuOpen", "WithSubmenuOpenInVerticalLayoutAllScales", "darkModeRTL", "verticalComplexUseCase", "verticalLayoutInDarkModeRTL"];
export {
  o as WithSubmenuOpen,
  r as WithSubmenuOpenInVerticalLayoutAllScales,
  I as __namedExportsOrder,
  u as activeVerticalOpenAllScales,
  l as allScales,
  i as darkModeRTL,
  S as default,
  m as iconsAndBreadcrumb,
  a as iconsAndBreadcrumbVertical,
  c as simple,
  d as verticalComplexUseCase,
  n as verticalLayoutInDarkModeRTL,
  s as withNesting
};
