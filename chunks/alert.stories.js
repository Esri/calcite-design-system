/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as N } from "./helpers.js";
import { b as h, o as D, m as M } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A as C } from "./resources34.js";
import "./alert.js";
import "./link.js";
import "./action.js";
var w = Object.freeze, q = Object.defineProperty, A = (e, W) => w(q(e, "raw", { value: w(e.slice()) })), f, b;
const {
  scale: S,
  duration: x,
  kind: $,
  menuPlacement: T,
  numberingSystem: H,
  queue: L
} = C, I = {
  title: "Components/Alert",
  args: {
    autoClose: !1,
    autoCloseDuration: x.defaultValue,
    icon: "lightbulb",
    iconFlipRtl: !1,
    kind: $.defaultValue,
    label: "Alert",
    numberingSystem: H.defaultValue,
    open: !0,
    placement: T.values[4],
    scale: S.defaultValue,
    queue: L.defaultValue
  },
  argTypes: {
    autoCloseDuration: {
      options: x.values,
      control: {
        type: "select"
      }
    },
    icon: {
      options: N,
      control: {
        type: "select"
      }
    },
    kind: {
      options: $.values.filter((e) => e !== "inverse" && e !== "neutral"),
      control: {
        type: "select"
      }
    },
    numberingSystem: {
      options: H.values,
      control: {
        type: "select"
      }
    },
    placement: {
      options: T.values,
      control: {
        type: "select"
      }
    },
    queue: {
      options: L.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: S.values,
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
`, r = (e) => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      ${h("auto-close", e.autoClose)}
      ${h("open", e.open)}
      ${h("icon-flip-rtl", e.iconFlipRtl)}
      queue="${e.queue}"
      auto-close-duration="${e.autoCloseDuration}"
      scale="${e.scale}"
      kind="${e.kind}"
      ${D("icon", e.icon)}
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
const d = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="danger"
      style="--calcite-alert-width:350px;"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action" href="http://google.com"
        >Take action with this link made up of a very long text string</calcite-link
      >
    </calcite-alert>
  </div>
`, m = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert icon auto-close-duration="medium" placement="bottom" open scale="m" kind="danger">
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action" href="http://google.com"
        >Take action with this link made up of a very long text string</calcite-link
      >
    </calcite-alert>
  </div>
`, n = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="danger"
      style="--calcite-alert-width:350px;"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action"
        >Take action with this link made up of a very long text string</calcite-link
      >
    </calcite-alert>
  </div>
`;
n.storyName = "Title, message, long link no href";
const l = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert icon auto-close-duration="medium" placement="bottom" open scale="m" kind="danger">
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action"
        >Take action with this link made up of a very long text string</calcite-link
      >
    </calcite-alert>
  </div>
`;
l.storyName = "Title, message, long link no href natural width";
const o = () => t`
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
o.storyName = "Title, message";
const c = () => t`
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
c.storyName = "Message, link";
const p = () => t`
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
`, u = () => t`
  ${a}
  <div class="wrapper">
    <calcite-alert
      icon="${N[0]}"
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
`, s = () => t`
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
s.parameters = {
  themes: M
};
const v = () => t`
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
`, g = () => t(f || (f = A([`
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
`])), a), k = () => t`
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
`, y = () => t(b || (b = A([`
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
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
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
      \${optionalAttribute("icon", args.icon)}
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
      ...r.parameters?.docs?.source
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
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
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
      style="--calcite-alert-width:350px;"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action" href="http://google.com"
        >Take action with this link made up of a very long text string</calcite-link
      >
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
    <calcite-alert icon auto-close-duration="medium" placement="bottom" open scale="m" kind="danger">
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action" href="http://google.com"
        >Take action with this link made up of a very long text string</calcite-link
      >
    </calcite-alert>
  </div>
\``,
      ...m.parameters?.docs?.source
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
      kind="danger"
      style="--calcite-alert-width:350px;"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action"
        >Take action with this link made up of a very long text string</calcite-link
      >
    </calcite-alert>
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
  \${wrapperStyles}
  <div class="wrapper">
    <calcite-alert icon auto-close-duration="medium" placement="bottom" open scale="m" kind="danger">
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action"
        >Take action with this link made up of a very long text string</calcite-link
      >
    </calcite-alert>
  </div>
\``,
      ...l.parameters?.docs?.source
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
      ...o.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      ...c.parameters?.docs?.source
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
      ...u.parameters?.docs?.source
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
      ...s.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
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
      ...v.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
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
      ...g.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
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
      ...k.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
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
      ...y.parameters?.docs?.source
    }
  }
};
const F = ["simple", "titleMessageLink", "titleMessageLongLink", "titleMessageLongLinkNaturalWidth", "titleMessageLongLinkNoHref", "titleMessageLongLinkNoHrefNaturalWidth", "titleMessage", "messageLink", "message", "customIcon", "darkModeRTL", "actionsEndNoQueue", "actionsEndQueued", "textAlignDoesNotAffectComponentAlignment", "withQueue"];
export {
  F as __namedExportsOrder,
  v as actionsEndNoQueue,
  g as actionsEndQueued,
  u as customIcon,
  s as darkModeRTL,
  I as default,
  p as message,
  c as messageLink,
  r as simple,
  k as textAlignDoesNotAffectComponentAlignment,
  o as titleMessage,
  i as titleMessageLink,
  d as titleMessageLongLink,
  m as titleMessageLongLinkNaturalWidth,
  n as titleMessageLongLinkNoHref,
  l as titleMessageLongLinkNoHrefNaturalWidth,
  y as withQueue
};
