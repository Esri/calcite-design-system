/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { s as h } from "./index3.js";
import { h as t } from "./formatting.js";
import { b as i, m as b } from "./utils3.js";
import { A as g } from "./resources34.js";
import "./card.js";
import "./link.js";
import "./button.js";
import "./dropdown.js";
import "./dropdown-item.js";
import "./dropdown-group.js";
import "./tooltip.js";
import "./chip.js";
const {
  scale: m,
  logicalFlowPosition: u
} = g, T = {
  title: "Components/Card",
  args: {
    disabled: !1,
    loading: !1,
    scale: m.defaultValue,
    selectable: !1,
    selected: !1,
    thumbnailPosition: u.defaultValue
  },
  argTypes: {
    scale: {
      options: m.values,
      control: {
        type: "select"
      }
    },
    thumbnailPosition: {
      options: u.values,
      control: {
        type: "select"
      }
    }
  }
}, d = t`
  <h3 slot="heading">ArcGIS Online: Gallery and Organization pages</h3>
  <span slot="description">
    A great example of a study description that might wrap to a line or two, but isn't overly verbose.
  </span>
`, v = t` <calcite-button slot="footer-start" width="full">Go</calcite-button> `, $ = t`<span slot="footer-start">Nov 25, 2018</span>`, f = t`
  <calcite-link class="calcite-mode-dark" slot="footer-start">Lead footer</calcite-link>
  <calcite-link class="calcite-mode-dark" slot="footer-end">Trail footer</calcite-link>
`, p = t`<img
  alt="thumbnail"
  slot="thumbnail"
  src="${h({
  width: 380,
  height: 180
})}"
  style="width: 380px;"
/> `, w = t`
  <div slot="footer-end">
    <calcite-button id="card-icon-test-6" scale="s" appearance="transparent" kind="neutral" icon-start="circle">
    </calcite-button>
    <calcite-button id="card-icon-test-7" scale="s" appearance="transparent" kind="neutral" icon-start="circle">
    </calcite-button>
  </div>
`, o = (e) => t`
  <div style="width: 260px">
    <calcite-card
      ${i("disabled", e.disabled)}
      ${i("loading", e.loading)}
      scale="${e.scale}"
      ${i("selectable", e.selectable)}
      ${i("selected", e.selected)}
      thumbnail-position="${e.thumbnailPosition}"
    >
      ${d}
    </calcite-card>
  </div>
`, c = (e) => t`
  <div style="width:260px">
    <calcite-card
      ${i("disabled", e.disabled)}
      ${i("loading", e.loading)}
      scale="${e.scale}"
      ${i("selected", e.selected)}
      thumbnail-position="${e.thumbnailPosition}"
    >
      ${d}${f}
    </calcite-card>
  </div>
`, n = (e) => t`
  <div style="width:260px">
    <calcite-card
      ${i("disabled", e.disabled)}
      ${i("loading", e.loading)}
      scale="${e.scale}"
      ${i("selected", e.selected)}
      thumbnail-position="${e.thumbnailPosition}"
    >
      ${d}${v}
    </calcite-card>
  </div>
`, l = () => t`
  <div style="width:260px">
    <calcite-card>
      ${p}
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
  <div id="card-container" style="width:260px;">
    <calcite-card>
      ${p}
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
`, a = () => t`
  <div dir="rtl" style="width:260px;">
    <calcite-card
      >${p}${d}${$}${w}</calcite-card
    >
  </div>
`;
a.parameters = {
  themes: b
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: CardStoryArgs): string => html\`
  <div style="width: 260px">
    <calcite-card
      \${boolean("disabled", args.disabled)}
      \${boolean("loading", args.loading)}
      scale="\${args.scale}"
      \${boolean("selectable", args.selectable)}
      \${boolean("selected", args.selected)}
      thumbnail-position="\${args.thumbnailPosition}"
    >
      \${headingAndDescriptionHtml}
    </calcite-card>
  </div>
\``,
      ...o.parameters?.docs?.source
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
      \${boolean("disabled", args.disabled)}
      \${boolean("loading", args.loading)}
      scale="\${args.scale}"
      \${boolean("selected", args.selected)}
      thumbnail-position="\${args.thumbnailPosition}"
    >
      \${headingAndDescriptionHtml}\${footerLinksHtml}
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
      \${boolean("disabled", args.disabled)}
      \${boolean("loading", args.loading)}
      scale="\${args.scale}"
      \${boolean("selected", args.selected)}
      thumbnail-position="\${args.thumbnailPosition}"
    >
      \${headingAndDescriptionHtml}\${footerButtonHtml}
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
      ...s.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <div dir="rtl" style="width:260px;">\n    <calcite-card\n      >${thumbnailHtml}${headingAndDescriptionHtml}${footerStartTextHtml}${footerEndButtonsHtml}</calcite-card\n    >\n  </div>\n`',
      ...a.parameters?.docs?.source
    }
  }
};
const M = ["simple", "simpleWithFooterLinks", "simpleWithFooterButton", "thumbnail", "headerDoesNotOverlapWithCheckboxDeprecated", "slottedFooterItems", "darkModeRTL"];
export {
  M as __namedExportsOrder,
  a as darkModeRTL,
  T as default,
  r as headerDoesNotOverlapWithCheckboxDeprecated,
  o as simple,
  n as simpleWithFooterButton,
  c as simpleWithFooterLinks,
  s as slottedFooterItems,
  l as thumbnail
};
