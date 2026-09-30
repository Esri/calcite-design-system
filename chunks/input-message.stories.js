/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as o } from "./helpers.js";
import { o as c, b as l } from "./utils3.js";
import { h as n } from "./formatting.js";
import { A as r } from "./resources34.js";
import "./input-message.js";
const {
  scale: a,
  status: i
} = r, f = {
  title: "Components/InputMessage",
  args: {
    icon: "information",
    iconFlipRtl: !1,
    message: "Message",
    scale: a.defaultValue,
    status: i.defaultValue
  },
  argTypes: {
    icon: {
      options: ["", ...o],
      control: {
        type: "select"
      }
    },
    scale: {
      options: a.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: i.values,
      control: {
        type: "select"
      }
    }
  }
}, e = (s) => n`
  <calcite-input-message
    ${c("icon", s.icon)}
    ${l("icon-flip-rtl", s.iconFlipRtl)}
    scale="${s.scale}"
    status="${s.status}"
    >${s.message}</calcite-input-message
  >
`, t = () => n`
  <calcite-input-message status="invalid" icon="frown">Message</calcite-input-message>
  <calcite-input-message status="valid" icon="smile">Message</calcite-input-message>
  <calcite-input-message status="idle" icon="information">Message</calcite-input-message>
`;
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(args: InputMessageStoryArgs): string => html\`
  <calcite-input-message
    \${optionalAttribute("icon", args.icon)}
    \${boolean("icon-flip-rtl", args.iconFlipRtl)}
    scale="\${args.scale}"
    status="\${args.status}"
    >\${args.message}</calcite-input-message
  >
\``,
      ...e.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-input-message status="invalid" icon="frown">Message</calcite-input-message>
  <calcite-input-message status="valid" icon="smile">Message</calcite-input-message>
  <calcite-input-message status="idle" icon="information">Message</calcite-input-message>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
const M = ["simple", "status"];
export {
  M as __namedExportsOrder,
  f as default,
  e as simple,
  t as status
};
