/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as g } from "./helpers.js";
import { o as a, b as t, m as w } from "./utils3.js";
import { h as n } from "./formatting.js";
import { A as y } from "./resources34.js";
import "./action.js";
import "./link.js";
import "./notice.js";
const {
  appearance: $,
  scale: c,
  width: k,
  kind: v
} = y, I = {
  title: "Components/Notice",
  args: {
    showIcon: !0,
    open: !0,
    closable: !0,
    appearance: "outline-fill",
    noticeScale: c.defaultValue,
    width: k.defaultValue,
    kind: v.defaultValue,
    icon: g[0],
    actionScale: c.defaultValue
  },
  argTypes: {
    noticeScale: {
      options: c.values,
      control: {
        type: "select"
      }
    },
    width: {
      options: k.values,
      control: {
        type: "select"
      }
    },
    kind: {
      options: v.values.filter((e) => e !== "inverse" && e !== "neutral"),
      control: {
        type: "select"
      }
    },
    appearance: {
      options: $.values.filter((e) => e === "outline-fill" || e === "transparent"),
      control: {
        type: "select"
      }
    },
    icon: {
      options: g,
      control: {
        type: "select"
      }
    },
    actionScale: {
      options: c.values,
      control: {
        type: "select"
      }
    }
  }
}, s = (e) => n`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      ${t("icon", e.showIcon)}
      ${t("open", e.open)}
      ${t("closable", e.closable)}
      scale="${e.noticeScale}"
      width="${e.width}"
      kind="${e.kind}"
      appearance="${e.appearance}"
      ${a("icon", e.icon)}
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action" href="http://google.com">Learn more</calcite-link>
      <calcite-action label="Retry" icon="reset" scale="${e.actionScale}" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
`, l = (e) => n`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      ${t("icon", e.showIcon)}
      ${t("open", e.open)}
      ${t("closable", e.closable)}
      scale="${e.noticeScale}"
      width="${e.width}"
      kind="${e.kind}"
      ${a("icon", e.icon)}
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
      <calcite-action label="Retry" icon="reset" scale="${e.actionScale}" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
`, r = (e) => n`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      ${t("icon", e.showIcon)}
      ${t("open", e.open)}
      ${t("closable", e.closable)}
      scale="${e.noticeScale}"
      width="${e.width}"
      kind="${e.kind}"
      ${a("icon", e.icon)}
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action" href="http://google.com"
        >Lorem ipsum odor amet, consectetur adipiscing elit. Egestas magnis porta tristique</calcite-link
      >
      <calcite-action label="Retry" icon="reset" scale="${e.actionScale}" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
`, d = (e) => n`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      ${t("icon", e.showIcon)}
      ${t("open", e.open)}
      ${t("closable", e.closable)}
      scale="${e.noticeScale}"
      width="${e.width}"
      kind="${e.kind}"
      ${a("icon", e.icon)}
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action"
        >Lorem ipsum odor amet, consectetur adipiscing elit. Egestas magnis porta tristique</calcite-link
      >
      <calcite-action label="Retry" icon="reset" scale="${e.actionScale}" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
`, p = (e) => n`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice ${a("icon", e.icon)} open closable scale="m" width="auto" kind="brand">
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
    </calcite-notice>
  </div>
`, m = () => n`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice icon open scale="m" width="auto" kind="danger">
      <div slot="title">Notice with action</div>
      <div slot="message">This shows a notice with a custom action</div>
      <calcite-action label="Retry" icon="reset" scale="m" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
`, i = () => n`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice dir="rtl" class="calcite-mode-dark" icon open scale="m" width="auto" kind="danger">
      <div slot="title">This is a destructive action</div>
      <div slot="message">Be sure you know what you are doing, folks.</div>
    </calcite-notice>
  </div>
`;
i.parameters = {
  themes: w
};
const x = ["outline-fill", "transparent"], b = ["brand", "neutral", "danger", "info", "success", "warning"], f = (e, o) => `
  <div class="story-container"> 
  <calcite-notice open kind="${e}" appearance="${o}" icon closable>
        <div slot="title">Try this trick next time</div>
        <div slot="message">Level up your skills - Select and take action on multiple layers at once.</div>
        <calcite-link slot="link" title="my action"> Read more </calcite-link>
      </calcite-notice>
      </div>`, h = () => {
  let e = "";
  for (const o of x) {
    e += '<div class="appearance-container">', e += n`<strong>appearance = ${o} </strong>`;
    for (const u of b)
      e += n`<p>kind = ${u}</p>`, e += f(u, o);
    e += "</div>";
  }
  return n`<style>
      .stories-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .appearance-container {
        display: flex;
        flex-direction: column;
        margin: 20px;
      }
      .story-container {
        margin: 10px;
      }
    </style>
    <div class="stories-container">${e}</div> `;
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
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
      appearance="\${args.appearance}"
      \${optionalAttribute("icon", args.icon)}
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action" href="http://google.com">Learn more</calcite-link>
      <calcite-action label="Retry" icon="reset" scale="\${args.actionScale}" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
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
      \${optionalAttribute("icon", args.icon)}
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
      <calcite-action label="Retry" icon="reset" scale="\${args.actionScale}" slot="actions-end"></calcite-action>
    </calcite-notice>
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
      originalSource: `(args: NoticeStoryArgs): string => html\`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      \${boolean("icon", args.showIcon)}
      \${boolean("open", args.open)}
      \${boolean("closable", args.closable)}
      scale="\${args.noticeScale}"
      width="\${args.width}"
      kind="\${args.kind}"
      \${optionalAttribute("icon", args.icon)}
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action" href="http://google.com"
        >Lorem ipsum odor amet, consectetur adipiscing elit. Egestas magnis porta tristique</calcite-link
      >
      <calcite-action label="Retry" icon="reset" scale="\${args.actionScale}" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
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
      \${optionalAttribute("icon", args.icon)}
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action"
        >Lorem ipsum odor amet, consectetur adipiscing elit. Egestas magnis porta tristique</calcite-link
      >
      <calcite-action label="Retry" icon="reset" scale="\${args.actionScale}" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(args: NoticeStoryArgs): string => html\`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice \${optionalAttribute("icon", args.icon)} open closable scale="m" width="auto" kind="brand">
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
    </calcite-notice>
  </div>
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
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice icon open scale="m" width="auto" kind="danger">
      <div slot="title">Notice with action</div>
      <div slot="message">This shows a notice with a custom action</div>
      <calcite-action label="Retry" icon="reset" scale="m" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice dir="rtl" class="calcite-mode-dark" icon open scale="m" width="auto" kind="danger">
      <div slot="title">This is a destructive action</div>
      <div slot="message">Be sure you know what you are doing, folks.</div>
    </calcite-notice>
  </div>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => {
  let storyHTML = "";
  for (const appearance of appearances) {
    storyHTML += \`<div class="appearance-container">\`;
    storyHTML += html\`<strong>appearance = \${appearance} </strong>\`;
    for (const kind of kinds) {
      storyHTML += html\`<p>kind = \${kind}</p>\`;
      storyHTML += allKindsAndAppearancesHTML(kind, appearance);
    }
    storyHTML += \`</div>\`;
  }
  return html\`<style>
      .stories-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .appearance-container {
        display: flex;
        flex-direction: column;
        margin: 20px;
      }
      .story-container {
        margin: 10px;
      }
    </style>
    <div class="stories-container">\${storyHTML}</div> \`;
}`,
      ...h.parameters?.docs?.source
    }
  }
};
const M = ["simple", "linkNoHref", "longLinkText", "longLinkTextNoHref", "customIcon", "withAction", "darkModeRTL", "allKindsAndAppearances"];
export {
  M as __namedExportsOrder,
  h as allKindsAndAppearances,
  p as customIcon,
  i as darkModeRTL,
  I as default,
  l as linkNoHref,
  r as longLinkText,
  d as longLinkTextNoHref,
  s as simple,
  m as withAction
};
