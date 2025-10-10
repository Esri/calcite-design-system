import { k as l, h as a, j as r } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const o = {
  title: "Components/Scrim",
  loading: !1
}, t = (u) => a`
  <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim ${l("loading", u.loading)}></calcite-scrim>
    <div style="width: 400px; height: 400px; overflow: auto">
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>
      <ul>
        <li>
          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed
          arcu. Cras consequat.
        </li>
        <li>
          Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.
          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
        </li>
        <li>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus.
          Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
        </li>
        <li>
          Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
        </li>
      </ul>
    </div>
  </div>
`, e = () => a`
  <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim dir="rtl" class="calcite-mode-dark"></calcite-scrim>
    <div style="width: 400px; height: 400px; overflow: auto">
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>
      <ul>
        <li>
          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed
          arcu. Cras consequat.
        </li>
        <li>
          Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.
          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
        </li>
        <li>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus.
          Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
        </li>
        <li>
          Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
        </li>
      </ul>
    </div>
  </div>
`;
e.parameters = {
  themes: r
};
const i = () => a` <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim>This is a test.</calcite-scrim>
  </div>`, s = () => a` <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim></calcite-scrim>
  </div>`;
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(args: ScrimStoryArgs): string => html\`
  <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim \${boolean("loading", args.loading)}></calcite-scrim>
    <div style="width: 400px; height: 400px; overflow: auto">
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>
      <ul>
        <li>
          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed
          arcu. Cras consequat.
        </li>
        <li>
          Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.
          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
        </li>
        <li>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus.
          Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
        </li>
        <li>
          Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
        </li>
      </ul>
    </div>
  </div>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
e.parameters = {
  ...e.parameters,
  docs: {
    ...e.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim dir="rtl" class="calcite-mode-dark"></calcite-scrim>
    <div style="width: 400px; height: 400px; overflow: auto">
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>
      <ul>
        <li>
          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed
          arcu. Cras consequat.
        </li>
        <li>
          Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.
          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
        </li>
        <li>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus.
          Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
        </li>
        <li>
          Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
        </li>
      </ul>
    </div>
  </div>
\``,
      ...e.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html` <div tabindex="0" style="position: relative; width: 400px; height: 400px">\n    <calcite-scrim>This is a test.</calcite-scrim>\n  </div>`',
      ...i.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html` <div tabindex="0" style="position: relative; width: 400px; height: 400px">\n    <calcite-scrim></calcite-scrim>\n  </div>`',
      ...s.parameters?.docs?.source
    }
  }
};
const c = ["simple", "darkModeRTL_TestOnly", "textContent_TestOnly", "noContent_TestOnly"];
export {
  c as __namedExportsOrder,
  e as darkModeRTL_TestOnly,
  o as default,
  s as noContent_TestOnly,
  t as simple,
  i as textContent_TestOnly
};
