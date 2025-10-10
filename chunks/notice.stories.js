import { i as l } from "./helpers.js";
import { k as s, h as c, j as m } from "./index.js";
import { A as h } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  scale: i,
  width: d,
  kind: r
} = h, w = {
  title: "Components/Notice",
  args: {
    showIcon: !0,
    open: !0,
    closable: !0,
    noticeScale: i.defaultValue,
    width: d.defaultValue,
    kind: r.defaultValue,
    icon: l[0],
    actionScale: i.defaultValue
  },
  argTypes: {
    noticeScale: {
      options: i.values,
      control: {
        type: "select"
      }
    },
    width: {
      options: d.values,
      control: {
        type: "select"
      }
    },
    kind: {
      options: r.values.filter((t) => t !== "inverse" && t !== "neutral"),
      control: {
        type: "select"
      }
    },
    icon: {
      options: l,
      control: {
        type: "select"
      }
    },
    actionScale: {
      options: i.values,
      control: {
        type: "select"
      }
    }
  }
}, o = (t) => c`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      ${s("icon", t.showIcon)}
      ${s("open", t.open)}
      ${s("closable", t.closable)}
      scale="${t.noticeScale}"
      width="${t.width}"
      kind="${t.kind}"
      icon="${t.icon}"
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
      <calcite-action label="Retry" icon="reset" scale="${t.actionScale}" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
`, a = (t) => c`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice icon="${t.icon}" open closable scale="m" width="auto" kind="brand">
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
    </calcite-notice>
  </div>
`, n = () => c`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice icon open scale="m" width="auto" kind="danger">
      <div slot="title">Notice with action</div>
      <div slot="message">This shows a notice with a custom action</div>
      <calcite-action label="Retry" icon="reset" scale="m" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
`, e = () => c`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice dir="rtl" class="calcite-mode-dark" icon open scale="m" width="auto" kind="danger">
      <div slot="title">This is a destructive action</div>
      <div slot="message">Be sure you know what you are doing, folks.</div>
    </calcite-notice>
  </div>
`;
e.parameters = {
  themes: m
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(args: NoticeStoryArgs): string => html\`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      \${boolean("icon", args.showIcon)}
      \${boolean("open", args.open)}
      \${boolean("closable", args.closable)}
      scale="\${args.noticeScale}"
      width="\${args.width}"
      kind="\${args.kind}"
      icon="\${args.icon}"
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
      <calcite-action label="Retry" icon="reset" scale="\${args.actionScale}" slot="actions-end"></calcite-action>
    </calcite-notice>
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
      originalSource: `(args: NoticeStoryArgs): string => html\`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice icon="\${args.icon}" open closable scale="m" width="auto" kind="brand">
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
    </calcite-notice>
  </div>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice icon open scale="m" width="auto" kind="danger">
      <div slot="title">Notice with action</div>
      <div slot="message">This shows a notice with a custom action</div>
      <calcite-action label="Retry" icon="reset" scale="m" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice dir="rtl" class="calcite-mode-dark" icon open scale="m" width="auto" kind="danger">
      <div slot="title">This is a destructive action</div>
      <div slot="message">Be sure you know what you are doing, folks.</div>
    </calcite-notice>
  </div>
\``,
      ...e.parameters?.docs?.source
    }
  }
};
const k = ["simple", "customIcon", "withAction", "darkModeRTL_TestOnly"];
export {
  k as __namedExportsOrder,
  a as customIcon,
  e as darkModeRTL_TestOnly,
  w as default,
  o as simple,
  n as withAction
};
