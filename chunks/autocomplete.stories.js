/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as p } from "./helpers.js";
import { o as l, b as a, m as S } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A as $ } from "./resources34.js";
import { a as F } from "./modes.js";
import "./autocomplete.js";
import "./autocomplete-item.js";
import "./autocomplete-item-group.js";
var u = Object.freeze, T = Object.defineProperty, y = (e, A) => u(T(e, "raw", { value: u(e.slice()) })), v, f;
const {
  scale: g,
  alignment: h,
  menuPlacement: x,
  status: b,
  overlayPositioning: I
} = $, V = {
  title: "Components/Controls/Autocomplete",
  args: {
    alignment: h.defaultValue,
    disabled: !1,
    icon: "",
    iconFlipRtl: !1,
    inputValue: "",
    labelText: "Label text",
    loading: !1,
    maxLength: void 0,
    minLength: void 0,
    open: !0,
    overlayPositioning: I.defaultValue,
    placeholder: "Placeholder text",
    placement: x.defaultValue,
    prefixText: "",
    readOnly: !1,
    required: !1,
    scale: g.defaultValue,
    status: b.defaultValue,
    suffixText: "",
    validationIcon: "",
    validationMessage: "",
    value: ""
  },
  argTypes: {
    alignment: {
      options: h.values.filter((e) => e !== "center"),
      control: {
        type: "select"
      }
    },
    overlayPositioning: {
      options: I.values,
      control: {
        type: "select"
      }
    },
    placement: {
      options: x.values,
      control: {
        type: "select"
      }
    },
    maxLength: {
      control: {
        type: "number"
      }
    },
    minLength: {
      control: {
        type: "number"
      }
    },
    scale: {
      options: g.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: b.values,
      control: {
        type: "select"
      }
    },
    icon: {
      options: ["", ...p],
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: p,
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
}, i = (e) => t(v || (v = y([`
  <div style="width:350px">
    <form class="locate-form">
      <calcite-autocomplete
        `, `
        `, `
        `, `
        `, `
        `, `
        `, `
        alignment="`, `"
        `, `
        input-value="`, `"
        label="`, `"
        `, `
        `, `
        `, `
        overlay-positioning="`, `"
        placeholder="`, `"
        placement="`, `"
        prefix-text="`, `"
        scale="`, `"
        status="`, `"
        suffix-text="`, `"
        `, `
        validation-message="`, `"
        value="`, `"
      >
        <calcite-autocomplete-item-group heading="Dogs">
          <calcite-autocomplete-item label="Rover" value="rover" heading="Rover"></calcite-autocomplete-item>
          <calcite-autocomplete-item label="Fido" value="one" heading="Fido"></calcite-autocomplete-item>
        </calcite-autocomplete-item-group>
        <calcite-autocomplete-item-group heading="Cats">
          <calcite-autocomplete-item label="Felix" value="felix" heading="Felix"></calcite-autocomplete-item>
          <calcite-autocomplete-item label="Garfield" value="garfield" heading="Garfield"></calcite-autocomplete-item>
        </calcite-autocomplete-item-group>
      </calcite-autocomplete>
    </form>
    <script>
      document.querySelectorAll(".locate-form").forEach((form) => {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = new FormData(event.target);
          // eslint-disable-next-line no-console -- test message external to components
          console.log([...data.entries()]);
        });
      });
    <\/script>
  </div>
`])), a("disabled", e.disabled), a("icon-flip-rtl", e.iconFlipRtl), a("loading", e.loading), a("open", e.open), a("read-only", e.readOnly), a("required", e.required), e.alignment, l("icon", e.icon), e.inputValue, e.label, l("label-text", e.labelText), l("max-length", e.maxLength), l("min-length", e.minLength), e.overlayPositioning, e.placeholder, e.placement, e.prefixText, e.scale, e.status, e.suffixText, l("validation-icon", e.validationIcon), e.validationMessage, e.value), o = () => t`
  <calcite-autocomplete open>
    <calcite-autocomplete-item-group heading="Dogs">
      <calcite-autocomplete-item label="Rover" value="rover" heading="Rover"></calcite-autocomplete-item>
      <calcite-autocomplete-item label="Fido" value="one" heading="Fido"></calcite-autocomplete-item>
    </calcite-autocomplete-item-group>
    <calcite-autocomplete-item-group heading="Cats">
      <calcite-autocomplete-item label="Felix" value="felix" heading="Felix"></calcite-autocomplete-item>
      <calcite-autocomplete-item label="Garfield" value="garfield" heading="Garfield"></calcite-autocomplete-item>
    </calcite-autocomplete-item-group>
  </calcite-autocomplete>
`;
o.parameters = {
  chromatic: {
    modes: {
      small: F.widthSmall
    }
  }
};
const m = () => t`
  <div style="width:350px">
    <calcite-autocomplete icon="banana"></calcite-autocomplete>
  </div>
`, n = () => t(f || (f = y([`
  <div style="width:350px">
    <calcite-autocomplete id="autocomplete"></calcite-autocomplete>
  </div>
  <script>
    document.getElementById("autocomplete").icon = false;
  <\/script>
`]))), s = () => t`<div style="width:350px; height: 600px;">
    <calcite-autocomplete label="Item list" id="myAutocomplete" input-value="item" open>
      <calcite-autocomplete-item-group heading="items">
        <calcite-autocomplete-item label="Item one" value="one" heading="Item one"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item two" value="two" heading="Item two"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item three" value="three" heading="Item three"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item four" value="four" heading="Item four"></calcite-autocomplete-item>
        <calcite-autocomplete-item
          disabled
          label="Item five"
          value="five"
          heading="Item five"
        ></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item six" value="six" heading="Item six"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item seven" value="seven" heading="Item seven"></calcite-autocomplete-item>
      </calcite-autocomplete-item-group>
    </calcite-autocomplete>
  </div>`, r = () => t`<div style="width:350px; height: 280px;">
    <calcite-autocomplete label="Item list" open>
      <calcite-autocomplete-item-group heading="Items">
        <calcite-autocomplete-item
          selected
          label="Selected item"
          value="selected-item"
          heading="Selected item"
          description="This item demonstrates selected styling"
        ></calcite-autocomplete-item>
        <calcite-autocomplete-item
          label="Unselected item"
          value="unselected-item"
          heading="Unselected item"
          description="This item remains unselected"
        ></calcite-autocomplete-item>
      </calcite-autocomplete-item-group>
    </calcite-autocomplete>
  </div>`, w = t`
  <style>
    .container {
      width: 1200px;
      height: 1200px;
    }

    .parent {
      display: flex;
      width: 85%;
      align-items: center;
      padding: 15px 0;
    }

    .child {
      flex: 1 0 15%;
      margin: 0 25px;
      color: var(--calcite-color-text-3);
      font-size: var(--calcite-font-size-0);
      font-weight: var(--calcite-font-weight-medium);
    }

    .right-aligned-text {
      text-align: right;
    }

    hr {
      margin: 25px 0;
      border-top: 1px solid var(--calcite-color-border-2);
    }
  </style>
  <div class="container">
    <!-- Header -->
    <div class="parent">
      <div class="child"></div>
      <div class="child">Small</div>
      <div class="child">Medium</div>
      <div class="child">Large</div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Simple</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent" style="margin-bottom:250px">
      <div class="child right-aligned-text">Open</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" open>
            <div slot="content-top">Content top</div>
            <div slot="content-bottom">Content bottom</div>
            <calcite-autocomplete-item
              scale="s"
              label="Item 1"
              value="1"
              heading="Item 1"
              description="Item 1 description"
              icon-start="information"
              icon-end="gear"
            ></calcite-autocomplete-item>
            <calcite-autocomplete-item
              disabled
              scale="s"
              label="Item 2"
              value="2"
              heading="Item 2"
              description="Item 2 description"
            ></calcite-autocomplete-item>
          </calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" open>
            <div slot="content-top">Content top</div>
            <div slot="content-bottom">Content bottom</div>
            <calcite-autocomplete-item
              scale="m"
              label="Item 1"
              value="1"
              heading="Item 1"
              description="Item 1 description"
              icon-start="information"
              icon-end="gear"
            ></calcite-autocomplete-item>
            <calcite-autocomplete-item
              disabled
              scale="m"
              label="Item 2"
              value="2"
              heading="Item 2"
              description="Item 2 description"
            ></calcite-autocomplete-item>
          </calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" open>
            <div slot="content-top">Content top</div>
            <div slot="content-bottom">Content bottom</div>
            <calcite-autocomplete-item
              scale="l"
              label="Item 1"
              value="1"
              heading="Item 1"
              description="Item 1 description"
              icon-start="information"
              icon-end="gear"
            ></calcite-autocomplete-item>
            <calcite-autocomplete-item
              disabled
              scale="l"
              label="Item 2"
              value="2"
              heading="Item 2"
              description="Item 2 description"
            ></calcite-autocomplete-item>
          </calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Content start/end</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Placeholder</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="s"
            placeholder="Find an address"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="m"
            placeholder="Find an address"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="l"
            placeholder="Find an address"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Disabled</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" disabled class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" disabled class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" disabled class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Readonly</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" read-only class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" read-only class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" read-only class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Loading</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" loading class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" loading class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" loading class="locator-autocomplete" name="location"></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Default value</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="s"
            input-value="Hello world!"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="m"
            input-value="Hello world!"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="l"
            input-value="Hello world!"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Custom Icon</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="s"
            icon="banana"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="m"
            icon="banana"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="l"
            icon="banana"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Required</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="s" class="locator-autocomplete" name="location" required></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="m" class="locator-autocomplete" name="location" required></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete scale="l" class="locator-autocomplete" name="location" required></calcite-autocomplete>
        </form>
      </div>
    </div>

    <div class="parent">
      <div class="child right-aligned-text">Prefix & Suffix</div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="s"
            prefix-text="A"
            suffix-text="Z"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="m"
            prefix-text="A"
            suffix-text="Z"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
      <div class="child">
        <form class="locate-form">
          <calcite-autocomplete
            scale="l"
            prefix-text="A"
            suffix-text="Z"
            class="locator-autocomplete"
            name="location"
          ></calcite-autocomplete>
        </form>
      </div>
    </div>
  </div>
`, d = () => w, c = () => `<div dir="rtl">${w}</div>`;
c.parameters = {
  themes: S
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: AutocompleteStoryArgs): string => html\`
  <div style="width:350px">
    <form class="locate-form">
      <calcite-autocomplete
        \${boolean("disabled", args.disabled)}
        \${boolean("icon-flip-rtl", args.iconFlipRtl)}
        \${boolean("loading", args.loading)}
        \${boolean("open", args.open)}
        \${boolean("read-only", args.readOnly)}
        \${boolean("required", args.required)}
        alignment="\${args.alignment}"
        \${optionalAttribute("icon", args.icon)}
        input-value="\${args.inputValue}"
        label="\${args.label}"
        \${optionalAttribute("label-text", args.labelText)}
        \${optionalAttribute("max-length", args.maxLength)}
        \${optionalAttribute("min-length", args.minLength)}
        overlay-positioning="\${args.overlayPositioning}"
        placeholder="\${args.placeholder}"
        placement="\${args.placement}"
        prefix-text="\${args.prefixText}"
        scale="\${args.scale}"
        status="\${args.status}"
        suffix-text="\${args.suffixText}"
        \${optionalAttribute("validation-icon", args.validationIcon)}
        validation-message="\${args.validationMessage}"
        value="\${args.value}"
      >
        <calcite-autocomplete-item-group heading="Dogs">
          <calcite-autocomplete-item label="Rover" value="rover" heading="Rover"></calcite-autocomplete-item>
          <calcite-autocomplete-item label="Fido" value="one" heading="Fido"></calcite-autocomplete-item>
        </calcite-autocomplete-item-group>
        <calcite-autocomplete-item-group heading="Cats">
          <calcite-autocomplete-item label="Felix" value="felix" heading="Felix"></calcite-autocomplete-item>
          <calcite-autocomplete-item label="Garfield" value="garfield" heading="Garfield"></calcite-autocomplete-item>
        </calcite-autocomplete-item-group>
      </calcite-autocomplete>
    </form>
    <script>
      document.querySelectorAll(".locate-form").forEach((form) => {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = new FormData(event.target);
          // eslint-disable-next-line no-console -- test message external to components
          console.log([...data.entries()]);
        });
      });
    <\/script>
  </div>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-autocomplete open>
    <calcite-autocomplete-item-group heading="Dogs">
      <calcite-autocomplete-item label="Rover" value="rover" heading="Rover"></calcite-autocomplete-item>
      <calcite-autocomplete-item label="Fido" value="one" heading="Fido"></calcite-autocomplete-item>
    </calcite-autocomplete-item-group>
    <calcite-autocomplete-item-group heading="Cats">
      <calcite-autocomplete-item label="Felix" value="felix" heading="Felix"></calcite-autocomplete-item>
      <calcite-autocomplete-item label="Garfield" value="garfield" heading="Garfield"></calcite-autocomplete-item>
    </calcite-autocomplete-item-group>
  </calcite-autocomplete>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:350px">
    <calcite-autocomplete icon="banana"></calcite-autocomplete>
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
  <div style="width:350px">
    <calcite-autocomplete id="autocomplete"></calcite-autocomplete>
  </div>
  <script>
    document.getElementById("autocomplete").icon = false;
  <\/script>
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
      originalSource: `(): string => html\`<div style="width:350px; height: 600px;">
    <calcite-autocomplete label="Item list" id="myAutocomplete" input-value="item" open>
      <calcite-autocomplete-item-group heading="items">
        <calcite-autocomplete-item label="Item one" value="one" heading="Item one"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item two" value="two" heading="Item two"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item three" value="three" heading="Item three"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item four" value="four" heading="Item four"></calcite-autocomplete-item>
        <calcite-autocomplete-item
          disabled
          label="Item five"
          value="five"
          heading="Item five"
        ></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item six" value="six" heading="Item six"></calcite-autocomplete-item>
        <calcite-autocomplete-item label="Item seven" value="seven" heading="Item seven"></calcite-autocomplete-item>
      </calcite-autocomplete-item-group>
    </calcite-autocomplete>
  </div>\``,
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:350px; height: 280px;">
    <calcite-autocomplete label="Item list" open>
      <calcite-autocomplete-item-group heading="Items">
        <calcite-autocomplete-item
          selected
          label="Selected item"
          value="selected-item"
          heading="Selected item"
          description="This item demonstrates selected styling"
        ></calcite-autocomplete-item>
        <calcite-autocomplete-item
          label="Unselected item"
          value="unselected-item"
          heading="Unselected item"
          description="This item remains unselected"
        ></calcite-autocomplete-item>
      </calcite-autocomplete-item-group>
    </calcite-autocomplete>
  </div>\``,
      ...r.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: "(): string => kitchenSinkHTML",
      ...d.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => `<div dir="rtl">${kitchenSinkHTML}</div>`',
      ...c.parameters?.docs?.source
    }
  }
};
const E = ["simple", "smallViewport", "customIcon", "noIcon", "matchResults", "selectedItem", "kitchenSink", "kitchenSinkDarkRTL"];
export {
  E as __namedExportsOrder,
  m as customIcon,
  V as default,
  d as kitchenSink,
  c as kitchenSinkDarkRTL,
  s as matchResults,
  n as noIcon,
  r as selectedItem,
  i as simple,
  o as smallViewport
};
