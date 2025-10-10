import { i as S } from "./helpers.js";
import { h as t, k as v, j as $ } from "./index.js";
import { A as x } from "./resources16.js";
import { m as g } from "./floating-ui.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var y = Object.freeze, _ = Object.defineProperty, T = (e, C) => y(_(e, "raw", { value: y(e.slice()) })), k, h;
const {
  scale: A,
  duration: w,
  kind: b,
  numberingSystem: f,
  queue: D
} = x, M = {
  title: "Components/Alert",
  args: {
    autoClose: !1,
    autoCloseDuration: w.defaultValue,
    icon: "",
    iconFlipRtl: !1,
    kind: b.defaultValue,
    label: "Alert",
    numberingSystem: f[2],
    open: !0,
    placement: g[4],
    scale: "m",
    queue: "last"
  },
  argTypes: {
    autoCloseDuration: {
      options: w.values,
      control: {
        type: "select"
      }
    },
    icon: {
      options: S,
      control: {
        type: "select"
      }
    },
    kind: {
      options: b.values.filter((e) => e !== "inverse" && e !== "neutral"),
      control: {
        type: "select"
      }
    },
    numberingSystem: {
      options: f,
      control: {
        type: "select"
      }
    },
    placement: {
      options: g,
      control: {
        type: "select"
      }
    },
    queue: {
      options: D.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: A.values,
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
}, a = t`
  <style>
    .wrapper {
      width: 640px;
      height: 800px;
      padding: 64px;
      max-width: 100%;
    }
  </style>
`, c = (e) => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      ${v("auto-close", e.autoClose)}
      ${v("open", e.open)}
      ${v("icon-flip-rtl", e.iconFlipRtl)}
      queue="${e.queue}"
      auto-close-duration="${e.autoCloseDuration}"
      scale="${e.scale}"
      kind="${e.kind}"
      icon="${e.icon}"
      label="${e.label}"
      numbering-system="${e.numberingSystem}"
      placement="${e.placement}"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action">Take action</calcite-link>
    </calcite-alert>
  </div>
`, i = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="brand"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action">Take action</calcite-link>
    </calcite-alert>
  </div>
`;
i.storyName = "Title, message, link";
const l = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="danger"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Something failed</div>
      <div slot="message">That thing you wanted to do didn't work as expected</div>
    </calcite-alert>
  </div>
`;
l.storyName = "Title, message";
const n = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="success"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
  </div>
`;
n.storyName = "Message, link";
const s = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="warning"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Network connection interruption detected</div>
    </calcite-alert>
  </div>
`, r = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      icon="${S[0]}"
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="success"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
  </div>
`, o = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      class="calcite-mode-dark"
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="danger"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Something failed</div>
      <div slot="message">That thing you wanted to do didn't work as expected</div>
      <calcite-link slot="link" title="my action">My action</calcite-link>
    </calcite-alert>
  </div>
`;
o.parameters = {
  themes: $
};
const d = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      label="this is a default danger with icon and link"
      scale="l"
      kind="danger"
      icon
      open
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Hello there!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
  </div>
`, m = () => t(k || (k = T([`
  `, `
  <div class="wrapper">
    <calcite-alert id="one" label="One" scale="l" kind="danger" icon open style="--calcite-alert-width:450px;">
      <div slot="title">Hello there, alert one!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
    <calcite-alert id="two" label="Two" scale="l" kind="danger" icon style="--calcite-alert-width:450px;">
      <div slot="title">Hello there, alert two!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
    <script>
      setTimeout(() => {
        document.querySelector("#two").open = true;
      }, 250);
    <\/script>
  </div>
`])), a), p = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      icon="rangefinder"
      kind="brand"
      open
      scale="s"
      label="A report alert"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Trail Camera Report</div>
      <div slot="message">We thought you might want to take a look</div>
      <calcite-link slot="link">Take action</calcite-link>
    </calcite-alert>
  </div>
`, u = () => t(h || (h = T([`
  `, `
  <div class="wrapper">
    <calcite-alert id="one" kind="brand" open>
      <div slot="title">Open by default</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <calcite-alert id="two" queue="immediate" kind="danger">
      <div slot="title">Immediate Alert</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <calcite-alert id="three" kind="success">
      <div slot="title">Third Alert</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <script>
      setTimeout(() => {
        document.querySelector("#two").open = true;
      }, 100);
      setTimeout(() => {
        document.querySelector("#three").open = true;
      }, 250);
    <\/script>
  </div>
`])), a);
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(args: AlertStoryArgs): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      \${boolean("auto-close", args.autoClose)}
      \${boolean("open", args.open)}
      \${boolean("icon-flip-rtl", args.iconFlipRtl)}
      queue="\${args.queue}"
      auto-close-duration="\${args.autoCloseDuration}"
      scale="\${args.scale}"
      kind="\${args.kind}"
      icon="\${args.icon}"
      label="\${args.label}"
      numbering-system="\${args.numberingSystem}"
      placement="\${args.placement}"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action">Take action</calcite-link>
    </calcite-alert>
  </div>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="brand"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action">Take action</calcite-link>
    </calcite-alert>
  </div>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="danger"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Something failed</div>
      <div slot="message">That thing you wanted to do didn't work as expected</div>
    </calcite-alert>
  </div>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="success"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
  </div>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="warning"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Network connection interruption detected</div>
    </calcite-alert>
  </div>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon="\${iconNames[0]}"
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="success"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
  </div>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      class="calcite-mode-dark"
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="danger"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Something failed</div>
      <div slot="message">That thing you wanted to do didn't work as expected</div>
      <calcite-link slot="link" title="my action">My action</calcite-link>
    </calcite-alert>
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      label="this is a default danger with icon and link"
      scale="l"
      kind="danger"
      icon
      open
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Hello there!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
  </div>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert id="one" label="One" scale="l" kind="danger" icon open style="--calcite-alert-width:450px;">
      <div slot="title">Hello there, alert one!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
    <calcite-alert id="two" label="Two" scale="l" kind="danger" icon style="--calcite-alert-width:450px;">
      <div slot="title">Hello there, alert two!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
    <script>
      setTimeout(() => {
        document.querySelector("#two").open = true;
      }, 250);
    <\/script>
  </div>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon="rangefinder"
      kind="brand"
      open
      scale="s"
      label="A report alert"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Trail Camera Report</div>
      <div slot="message">We thought you might want to take a look</div>
      <calcite-link slot="link">Take action</calcite-link>
    </calcite-alert>
  </div>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert id="one" kind="brand" open>
      <div slot="title">Open by default</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <calcite-alert id="two" queue="immediate" kind="danger">
      <div slot="title">Immediate Alert</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <calcite-alert id="three" kind="success">
      <div slot="title">Third Alert</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <script>
      setTimeout(() => {
        document.querySelector("#two").open = true;
      }, 100);
      setTimeout(() => {
        document.querySelector("#three").open = true;
      }, 250);
    <\/script>
  </div>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
const R = ["simple", "titleMessageLink", "titleMessage", "messageLink", "message", "customIcon", "darkModeRTL_TestOnly", "actionsEndNoQueue_TestOnly", "actionsEndQueued_TestOnly", "textAlignDoesNotAffectComponentAlignment_TestOnly", "withQueue"];
export {
  R as __namedExportsOrder,
  d as actionsEndNoQueue_TestOnly,
  m as actionsEndQueued_TestOnly,
  r as customIcon,
  o as darkModeRTL_TestOnly,
  M as default,
  s as message,
  n as messageLink,
  c as simple,
  p as textAlignDoesNotAffectComponentAlignment_TestOnly,
  l as titleMessage,
  i as titleMessageLink,
  u as withQueue
};
