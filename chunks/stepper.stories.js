import { k as c, h as t, j as h } from "./index.js";
import { A as g } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  layout: d,
  scale: m
} = g, C = {
  title: "Components/Stepper",
  args: {
    layout: d.defaultValue,
    scale: m.defaultValue,
    numbered: !0,
    icon: !0,
    heading1: "Choose method",
    description1: "Add members without sending invitations",
    heading2: "Compile member list",
    description2: "",
    heading3: "Set member properties",
    description3: "",
    heading4: "Confirm and complete",
    description4: "Disabled example"
  },
  argTypes: {
    layout: {
      options: d.values.filter((e) => e !== "grid" && e !== "inline" && e !== "center" && e !== "auto" && e !== "fixed" && e !== "none"),
      control: {
        type: "select"
      }
    },
    scale: {
      options: m.values,
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
}, n = (e) => t`
  <h1>Default</h1>
  <calcite-stepper
    layout="${e.layout}"
    scale="${e.scale}"
    ${c("numbered", e.numbered)}
    ${c("icon", e.icon)}
  >
    <calcite-stepper-item heading="${e.heading1}" description="${e.description1}" complete>
      <calcite-notice open width="full"><div slot="message">Step 1 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${e.heading2}" description="${e.description2}" complete error>
      <calcite-notice open width="full"><div slot="message">Step 2 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${e.heading3}" description="${e.description3}" selected>
      <calcite-notice open width="full"><div slot="message">Step 3 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${e.heading4}" description="${e.description4}" disabled>
      <calcite-notice open width="full"><div slot="message">Step 4 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>
  <h1>No Content</h1>
  <calcite-stepper
    layout="${e.layout}"
    scale="${e.scale}"
    ${c("numbered", e.numbered)}
    ${c("icon", e.icon)}
  >
    <calcite-stepper-item heading="${e.heading1}" description="${e.description1}" complete>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${e.heading2}" description="${e.description2}" complete error>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${e.heading3}" description="${e.description3}" selected>
    </calcite-stepper-item>
    <calcite-stepper-item heading="${e.heading4}" description="${e.description4}" disabled>
    </calcite-stepper-item>
  </calcite-stepper>
`, i = () => t`
  <div dir="rtl">
    <calcite-stepper
    class="calcite-mode-dark"
      layout="horizontal"
      scale="m"
      numbered
      icon
    >
      <calcite-stepper-item
        heading="Choose method"
        description="Add members without sending invitations"
        complete
      >
        <calcite-notice open width="full"><div slot=message">Step 1 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item
        heading="Compile member list"
        complete
        error
      >
        <calcite-notice open width="full"><div slot="message">Step 2 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item
        heading="Set member properties"
        selected
      >
        <calcite-notice open width="full"><div slot="message">Step 3 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item
        heading="Confirm and complete"
        description="Disabled example"
        disabled
      >
        <calcite-notice open width="full"><div slot="message">Step 4 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>
  </div>
`;
i.parameters = {
  themes: h
};
const s = () => t` <calcite-stepper numbered style="width: 50vw">
    <calcite-stepper-item heading="Choose method" description="Add members without sending invitations" complete>
      <calcite-notice open width="full">
        <div slot="message">Step 1 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Compile member list" complete error>
      <calcite-notice open width="full">
        <div slot="message">Step 2 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Set member properties" selected>
      <calcite-notice open width="full">
        <div slot="message">Step 3 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Confirm and complete" description="Disabled example" disabled>
      <calcite-notice open width="full">
        <div slot="message">Step 4 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>`, a = () => t`<calcite-stepper>
    <calcite-stepper-item heading="item1" complete disabled>1</calcite-stepper-item>
    <calcite-stepper-item heading="item2">2</calcite-stepper-item>
  </calcite-stepper>`, l = () => t` <calcite-stepper numbered numbering-system="arab" lang="ar" dir="rtl" scale="s">
    <calcite-stepper-item heading="الخطوةالاولى" complete>
      <calcite-notice open width="full">
        <div slot="message">الخطوة الأولى للمحتوى هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="الخطوة الثانية" complete>
      <calcite-notice open width="full">
        <div slot="message">الخطوة الثانية للمحتوى هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="الخطوة الثالثة" description="بعض النصوص الفرعية" selected>
      <calcite-notice open width="full">
        <div slot="message">الخطوة الثالثة المحتوى يذهب هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="الخطوة الرابعة">
      <calcite-notice open width="full">
        <div slot="message">الخطوة الرابعة المحتوى يذهب هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>`, p = () => t`<calcite-stepper layout="vertical" scale="s">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        >Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="vertical">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go" selected
        >Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="vertical" scale="l">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        >Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item
        heading="Rivers"
        description="The Rivers are calling and I must go"
        selected
      ></calcite-stepper-item>
    </calcite-stepper>`, o = () => t`
  <div style="display: flex; flex-direction: column; gap: 1em;">
    <calcite-stepper layout="horizontal-single" numbered icon scale="s">
      <calcite-stepper-item heading="Choose method">
        <calcite-notice open width="full">
          <div slot="message">Step 1 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Compile member list">
        <calcite-notice open width="full">
          <div slot="message">Step 2 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Set member properties" description="Some subtext">
        <calcite-notice open width="full">
          <div slot="message">Step 3 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Confirm and complete">
        <calcite-notice open width="full">
          <div slot="message">Step 4 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="horizontal-single" numbered icon scale="m">
      <calcite-stepper-item heading="Choose method">
        <calcite-notice open width="full">
          <div slot="message">Step 1 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Compile member list" selected>
        <calcite-notice open width="full">
          <div slot="message">Step 2 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Set member properties" description="Some subtext">
        <calcite-notice open width="full">
          <div slot="message">Step 3 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Confirm and complete">
        <calcite-notice open width="full">
          <div slot="message">Step 4 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="horizontal-single" numbered icon scale="l">
      <calcite-stepper-item heading="Choose method">
        <calcite-notice open width="full">
          <div slot="message">Step 1 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Compile member list">
        <calcite-notice open width="full">
          <div slot="message">Step 2 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Set member properties" description="Some subtext" selected>
        <calcite-notice open width="full">
          <div slot="message">Step 3 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Confirm and complete">
        <calcite-notice open width="full">
          <div slot="message">Step 4 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>
  </div>
`, r = () => t`<calcite-stepper layout="vertical" scale="s">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        ><calcite-notice open icon="tree" width="full">
          <div slot="title">Popular Mountains</div>
          <div slot="message">Mount Everest, Mount Rainier, Mount Mckinley</div>
      </calcite-notice></calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        > Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
      </calcite-stepper-item>
    </calcite-stepper>

   <calcite-stepper layout="vertical" >
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        ><calcite-notice open icon="tree" width="full">
          <div slot="title">Popular Mountains</div>
          <div slot="message">Mount Everest, Mount Rainier, Mount Mckinley</div>
      </calcite-notice></calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        selected> Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
      </calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="vertical" scale="l">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        ><calcite-notice open icon="tree" width="full">
          <div slot="title">Popular Mountains</div>
          <div slot="message">Mount Everest, Mount Rainier, Mount Mckinley</div>
      </calcite-notice></calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        > Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go" selected></calcite-stepper-item>
      </calcite-stepper-item>
    </calcite-stepper>`;
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: StepperStoryArgs): string => html\`
  <h1>Default</h1>
  <calcite-stepper
    layout="\${args.layout}"
    scale="\${args.scale}"
    \${boolean("numbered", args.numbered)}
    \${boolean("icon", args.icon)}
  >
    <calcite-stepper-item heading="\${args.heading1}" description="\${args.description1}" complete>
      <calcite-notice open width="full"><div slot="message">Step 1 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="\${args.heading2}" description="\${args.description2}" complete error>
      <calcite-notice open width="full"><div slot="message">Step 2 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="\${args.heading3}" description="\${args.description3}" selected>
      <calcite-notice open width="full"><div slot="message">Step 3 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="\${args.heading4}" description="\${args.description4}" disabled>
      <calcite-notice open width="full"><div slot="message">Step 4 Content Goes Here</div></calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>
  <h1>No Content</h1>
  <calcite-stepper
    layout="\${args.layout}"
    scale="\${args.scale}"
    \${boolean("numbered", args.numbered)}
    \${boolean("icon", args.icon)}
  >
    <calcite-stepper-item heading="\${args.heading1}" description="\${args.description1}" complete>
    </calcite-stepper-item>
    <calcite-stepper-item heading="\${args.heading2}" description="\${args.description2}" complete error>
    </calcite-stepper-item>
    <calcite-stepper-item heading="\${args.heading3}" description="\${args.description3}" selected>
    </calcite-stepper-item>
    <calcite-stepper-item heading="\${args.heading4}" description="\${args.description4}" disabled>
    </calcite-stepper-item>
  </calcite-stepper>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div dir="rtl">
    <calcite-stepper
    class="calcite-mode-dark"
      layout="horizontal"
      scale="m"
      numbered
      icon
    >
      <calcite-stepper-item
        heading="Choose method"
        description="Add members without sending invitations"
        complete
      >
        <calcite-notice open width="full"><div slot=message">Step 1 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item
        heading="Compile member list"
        complete
        error
      >
        <calcite-notice open width="full"><div slot="message">Step 2 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item
        heading="Set member properties"
        selected
      >
        <calcite-notice open width="full"><div slot="message">Step 3 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item
        heading="Confirm and complete"
        description="Disabled example"
        disabled
      >
        <calcite-notice open width="full"><div slot="message">Step 4 Content Goes Here</div></calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>
  </div>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-stepper numbered style="width: 50vw">
    <calcite-stepper-item heading="Choose method" description="Add members without sending invitations" complete>
      <calcite-notice open width="full">
        <div slot="message">Step 1 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Compile member list" complete error>
      <calcite-notice open width="full">
        <div slot="message">Step 2 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Set member properties" selected>
      <calcite-notice open width="full">
        <div slot="message">Step 3 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="Confirm and complete" description="Disabled example" disabled>
      <calcite-notice open width="full">
        <div slot="message">Step 4 Content Goes Here</div>
      </calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>\``,
      ...s.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-stepper>
    <calcite-stepper-item heading="item1" complete disabled>1</calcite-stepper-item>
    <calcite-stepper-item heading="item2">2</calcite-stepper-item>
  </calcite-stepper>\``,
      ...a.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-stepper numbered numbering-system="arab" lang="ar" dir="rtl" scale="s">
    <calcite-stepper-item heading="الخطوةالاولى" complete>
      <calcite-notice open width="full">
        <div slot="message">الخطوة الأولى للمحتوى هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="الخطوة الثانية" complete>
      <calcite-notice open width="full">
        <div slot="message">الخطوة الثانية للمحتوى هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="الخطوة الثالثة" description="بعض النصوص الفرعية" selected>
      <calcite-notice open width="full">
        <div slot="message">الخطوة الثالثة المحتوى يذهب هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
    <calcite-stepper-item heading="الخطوة الرابعة">
      <calcite-notice open width="full">
        <div slot="message">الخطوة الرابعة المحتوى يذهب هنا</div>
      </calcite-notice>
    </calcite-stepper-item>
  </calcite-stepper>\``,
      ...l.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-stepper layout="vertical" scale="s">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        >Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="vertical">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go" selected
        >Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="vertical" scale="l">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        >Step 1 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        >Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item
        heading="Rivers"
        description="The Rivers are calling and I must go"
        selected
      ></calcite-stepper-item>
    </calcite-stepper>\``,
      ...p.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="display: flex; flex-direction: column; gap: 1em;">
    <calcite-stepper layout="horizontal-single" numbered icon scale="s">
      <calcite-stepper-item heading="Choose method">
        <calcite-notice open width="full">
          <div slot="message">Step 1 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Compile member list">
        <calcite-notice open width="full">
          <div slot="message">Step 2 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Set member properties" description="Some subtext">
        <calcite-notice open width="full">
          <div slot="message">Step 3 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Confirm and complete">
        <calcite-notice open width="full">
          <div slot="message">Step 4 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="horizontal-single" numbered icon scale="m">
      <calcite-stepper-item heading="Choose method">
        <calcite-notice open width="full">
          <div slot="message">Step 1 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Compile member list" selected>
        <calcite-notice open width="full">
          <div slot="message">Step 2 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Set member properties" description="Some subtext">
        <calcite-notice open width="full">
          <div slot="message">Step 3 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Confirm and complete">
        <calcite-notice open width="full">
          <div slot="message">Step 4 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="horizontal-single" numbered icon scale="l">
      <calcite-stepper-item heading="Choose method">
        <calcite-notice open width="full">
          <div slot="message">Step 1 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Compile member list">
        <calcite-notice open width="full">
          <div slot="message">Step 2 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Set member properties" description="Some subtext" selected>
        <calcite-notice open width="full">
          <div slot="message">Step 3 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Confirm and complete">
        <calcite-notice open width="full">
          <div slot="message">Step 4 Content Goes Here</div>
        </calcite-notice>
      </calcite-stepper-item>
    </calcite-stepper>
  </div>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-stepper layout="vertical" scale="s">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        ><calcite-notice open icon="tree" width="full">
          <div slot="title">Popular Mountains</div>
          <div slot="message">Mount Everest, Mount Rainier, Mount Mckinley</div>
      </calcite-notice></calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        > Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
      </calcite-stepper-item>
    </calcite-stepper>

   <calcite-stepper layout="vertical" >
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        ><calcite-notice open icon="tree" width="full">
          <div slot="title">Popular Mountains</div>
          <div slot="message">Mount Everest, Mount Rainier, Mount Mckinley</div>
      </calcite-notice></calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        selected> Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go"></calcite-stepper-item>
      </calcite-stepper-item>
    </calcite-stepper>

    <calcite-stepper layout="vertical" scale="l">
      <calcite-stepper-item heading="Mountains" description="The Mountains are calling and I must go"
        ><calcite-notice open icon="tree" width="full">
          <div slot="title">Popular Mountains</div>
          <div slot="message">Mount Everest, Mount Rainier, Mount Mckinley</div>
      </calcite-notice></calcite-stepper-item
      >
      <calcite-stepper-item heading="Beaches" description="The Beaches are calling and I must go"
        > Step 2 Content Goes Here</calcite-stepper-item
      >
      <calcite-stepper-item heading="Rivers" description="The Rivers are calling and I must go" selected></calcite-stepper-item>
      </calcite-stepper-item>
    </calcite-stepper>\``,
      ...r.parameters?.docs?.source
    }
  }
};
const S = ["simple", "darkModeRTL_TestOnly", "overriddenWidth_TestOnly", "disabled_TestOnly", "arabicNumberingSystem_TestOnly", "verticalLayout_TestOnly", "horizontalSingleLayout_TestOnly", "verticalLayoutFullWidth"];
export {
  S as __namedExportsOrder,
  l as arabicNumberingSystem_TestOnly,
  i as darkModeRTL_TestOnly,
  C as default,
  a as disabled_TestOnly,
  o as horizontalSingleLayout_TestOnly,
  s as overriddenWidth_TestOnly,
  n as simple,
  r as verticalLayoutFullWidth,
  p as verticalLayout_TestOnly
};
