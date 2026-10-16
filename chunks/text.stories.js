/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as s } from "./formatting.js";
const c = {
  title: "Components/Text",
  args: {
    containerWidth: 200
  },
  argTypes: {
    containerWidth: {
      control: {
        type: "number"
      }
    }
  },
  decorators: [(e, i) => {
    const {
      containerWidth: o
    } = i.args;
    return s`
        <style>
          .text-container {
            display: grid;
            gap: 8px;
          }
          .text-container > calcite-text {
            width: ${o}px;
            border: 1px solid var(--calcite-color-border-3);
            padding: 4px;
          }
        </style>
        <div class="text-container">${e()}</div>
      `;
  }]
}, t = (e) => s`
  <calcite-text truncate-position="${e.truncatePosition}">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>
`;
t.argTypes = {
  truncatePosition: {
    options: ["end", "middle"],
    control: {
      type: "select"
    }
  }
};
const n = () => s`
  <p>truncatePosition="end"</p>
  <calcite-text truncate-position="end">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>

  <p>truncatePosition="middle"</p>
  <calcite-text truncate-position="middle">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>
`, a = (e) => s`
  <p>maxLines="${e.maxLines}"</p>
  <calcite-text max-lines="${e.maxLines}">
    The Appalachian Mountains are a system of mountains in eastern North America, extending from Canada to Alabama.
  </calcite-text>
  <p>maxLines="${e.maxLines}" & truncatePosition="middle"</p>
  <calcite-text max-lines="${e.maxLines}" truncate-position="middle">
    The Appalachian Mountains are a system of mountains in eastern North America, extending from Canada to Alabama.
  </calcite-text>
  <calcite-notice open appearance="transparent">
    <div slot="message">Note: truncate-position has no effect on max-lines</div>
  </calcite-notice>
`;
a.args = {
  maxLines: 3
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: TextStoryArgs): string => html\`
  <calcite-text truncate-position="\${args.truncatePosition}">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <p>truncatePosition="end"</p>
  <calcite-text truncate-position="end">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>

  <p>truncatePosition="middle"</p>
  <calcite-text truncate-position="middle">
    The Rocky Mountain range spans multiple states and includes several major peaks and protected ecosystems.
  </calcite-text>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(args: TextStoryArgs): string => html\`
  <p>maxLines="\${args.maxLines}"</p>
  <calcite-text max-lines="\${args.maxLines}">
    The Appalachian Mountains are a system of mountains in eastern North America, extending from Canada to Alabama.
  </calcite-text>
  <p>maxLines="\${args.maxLines}" & truncatePosition="middle"</p>
  <calcite-text max-lines="\${args.maxLines}" truncate-position="middle">
    The Appalachian Mountains are a system of mountains in eastern North America, extending from Canada to Alabama.
  </calcite-text>
  <calcite-notice open appearance="transparent">
    <div slot="message">Note: truncate-position has no effect on max-lines</div>
  </calcite-notice>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
const p = ["simple", "truncatePosition", "maxLines"];
export {
  p as __namedExportsOrder,
  c as default,
  a as maxLines,
  t as simple,
  n as truncatePosition
};
