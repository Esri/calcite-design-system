import { p as h } from "./placeholder-image.js";
import { k as i, h as t, j as b } from "./index.js";
import { A as g } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  logicalFlowPosition: m
} = g, S = {
  title: "Components/Card",
  args: {
    loading: !1,
    selected: !1,
    thumbnailPosition: m.defaultValue
  },
  argTypes: {
    thumbnailPosition: {
      options: m.values,
      control: {
        type: "select"
      }
    }
  }
}, p = t`
  <h3 slot="heading">ArcGIS Online: Gallery and Organization pages</h3>
  <span slot="description">
    A great example of a study description that might wrap to a line or two, but isn't overly verbose.
  </span>
`, v = t` <calcite-button slot="footer-start" width="full">Go</calcite-button> `, f = t`<span slot="footer-start">Nov 25, 2018</span>`, w = t`
  <calcite-link class="calcite-mode-dark" slot="footer-start">Lead footer</calcite-link>
  <calcite-link class="calcite-mode-dark" slot="footer-end">Trail footer</calcite-link>
`, u = t`<img
  alt="thumbnail"
  slot="thumbnail"
  src="${h({
  width: 380,
  height: 180
})}"
  style="width: 380px;"
/> `, x = t`
  <div slot="footer-end">
    <calcite-button id="card-icon-test-6" scale="s" appearance="transparent" kind="neutral" icon-start="circle">
    </calcite-button>
    <calcite-button id="card-icon-test-7" scale="s" appearance="transparent" kind="neutral" icon-start="circle">
    </calcite-button>
  </div>
`, a = (e) => t`
  <div style="width: 260px">
    <calcite-card
      ${i("loading", e.loading)}
      ${i("selected", e.selected)}
      thumbnail-position="${e.thumbnailPosition}"
    >
      ${p}
    </calcite-card>
  </div>
`, c = (e) => t`
  <div style="width:260px">
    <calcite-card
      ${i("loading", e.loading)}
      ${i("selected", e.selected)}
      thumbnail-position="${e.thumbnailPosition}"
    >
      ${p}${w}
    </calcite-card>
  </div>
`, n = (e) => t`
  <div style="width:260px">
    <calcite-card
      ${i("loading", e.loading)}
      ${i("selected", e.selected)}
      thumbnail-position="${e.thumbnailPosition}"
    >
      ${p}${v}
    </calcite-card>
  </div>
`, l = () => t`
  <div style="width:260px">
    <calcite-card>
      ${u}
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button
        slot="footer-start"
        kind="neutral"
        scale="s"
        id="card-icon-test-1"
        icon-start="circle"
      ></calcite-button>
      <div slot="footer-end">
        <calcite-button scale="s" kind="neutral" id="card-icon-test-2" icon-start="circle"></calcite-button>
        <calcite-button scale="s" kind="neutral" id="card-icon-test-3" icon-start="circle"></calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button
            id="card-icon-test-5"
            slot="trigger"
            scale="s"
            kind="neutral"
            icon-start="circle"
          ></calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
    <calcite-tooltip placement="bottom-start" reference-element="card-icon-test-1"
      >My great tooltip example
    </calcite-tooltip>
    <calcite-tooltip placement="bottom-start" reference-element="card-icon-test-2">Sharing level: 2 </calcite-tooltip>
    <calcite-tooltip placement="top-end" reference-element="card-icon-test-3">More... </calcite-tooltip>
    <calcite-tooltip placement="top-start" reference-element="card-icon-test-5">More options </calcite-tooltip>
  </div>
`, r = () => t`
  <calcite-card selectable style="width:260px">
    <h3 slot="heading">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
    <span slot="description"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</span
    >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </calcite-card>
`, s = () => t`
  <calcite-card selectable style="width:260px">
    <h3 slot="title">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
    <span slot="subtitle"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</span
    >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </calcite-card>
`, d = () => t`
  <div id="card-container" style="width:260px;">
    <calcite-card>
      ${u}
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-chip slot="footer-start" value="calcite chip" kind="brand" icon="clock-forward">Recent</calcite-chip>
      <calcite-chip slot="footer-end" value="calcite chip" icon="walking">Recreation</calcite-chip>
    </calcite-card>
  </div>
`, o = () => t`
  <div dir="rtl" style="width:260px;">
    <calcite-card>${u}${p}${f}${x}</calcite-card>
  </div>
`;
o.parameters = {
  themes: b
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: CardStoryArgs): string => html\`
  <div style="width: 260px">
    <calcite-card
      \${boolean("loading", args.loading)}
      \${boolean("selected", args.selected)}
      thumbnail-position="\${args.thumbnailPosition}"
    >
      \${titleHtml}
    </calcite-card>
  </div>
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
      originalSource: `(args: CardStoryArgs): string => html\`
  <div style="width:260px">
    <calcite-card
      \${boolean("loading", args.loading)}
      \${boolean("selected", args.selected)}
      thumbnail-position="\${args.thumbnailPosition}"
    >
      \${titleHtml}\${footerLinksHtml}
    </calcite-card>
  </div>
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
      originalSource: `(args: CardStoryArgs): string => html\`
  <div style="width:260px">
    <calcite-card
      \${boolean("loading", args.loading)}
      \${boolean("selected", args.selected)}
      thumbnail-position="\${args.thumbnailPosition}"
    >
      \${titleHtml}\${footerButtonHtml}
    </calcite-card>
  </div>
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
      originalSource: `(): string => html\`
  <div style="width:260px">
    <calcite-card>
      \${thumbnailHtml}
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button
        slot="footer-start"
        kind="neutral"
        scale="s"
        id="card-icon-test-1"
        icon-start="circle"
      ></calcite-button>
      <div slot="footer-end">
        <calcite-button scale="s" kind="neutral" id="card-icon-test-2" icon-start="circle"></calcite-button>
        <calcite-button scale="s" kind="neutral" id="card-icon-test-3" icon-start="circle"></calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button
            id="card-icon-test-5"
            slot="trigger"
            scale="s"
            kind="neutral"
            icon-start="circle"
          ></calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
    <calcite-tooltip placement="bottom-start" reference-element="card-icon-test-1"
      >My great tooltip example
    </calcite-tooltip>
    <calcite-tooltip placement="bottom-start" reference-element="card-icon-test-2">Sharing level: 2 </calcite-tooltip>
    <calcite-tooltip placement="top-end" reference-element="card-icon-test-3">More... </calcite-tooltip>
    <calcite-tooltip placement="top-start" reference-element="card-icon-test-5">More options </calcite-tooltip>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-card selectable style="width:260px">
    <h3 slot="heading">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
    <span slot="description"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</span
    >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </calcite-card>
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
  <calcite-card selectable style="width:260px">
    <h3 slot="title">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>
    <span slot="subtitle"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</span
    >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </calcite-card>
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
  <div id="card-container" style="width:260px;">
    <calcite-card>
      \${thumbnailHtml}
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-chip slot="footer-start" value="calcite chip" kind="brand" icon="clock-forward">Recent</calcite-chip>
      <calcite-chip slot="footer-end" value="calcite chip" icon="walking">Recreation</calcite-chip>
    </calcite-card>
  </div>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <div dir="rtl" style="width:260px;">\n    <calcite-card>${thumbnailHtml}${titleHtml}${footerStartTextHtml}${footerEndButtonsHtml}</calcite-card>\n  </div>\n`',
      ...o.parameters?.docs?.source
    }
  }
};
const q = ["simple", "simpleWithFooterLinks", "simpleWithFooterButton", "thumbnail", "headerDoesNotOverlapWithCheckboxDeprecated_TestOnly", "deprecatedSlotsSelectable_TestOnly", "slottedFooterItems_TestOnly", "darkModeRTL_TestOnly"];
export {
  q as __namedExportsOrder,
  o as darkModeRTL_TestOnly,
  S as default,
  s as deprecatedSlotsSelectable_TestOnly,
  r as headerDoesNotOverlapWithCheckboxDeprecated_TestOnly,
  a as simple,
  n as simpleWithFooterButton,
  c as simpleWithFooterLinks,
  d as slottedFooterItems_TestOnly,
  l as thumbnail
};
