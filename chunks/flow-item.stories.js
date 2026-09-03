/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as l, o as T, m as P } from "./utils3.js";
import { h as e } from "./formatting.js";
import { A as H } from "./resources34.js";
import { S as i } from "./flow-item.js";
import "./action.js";
import "./action-bar.js";
import "./action-group.js";
import "./alert.js";
import "./button.js";
import "./fab.js";
import "./flow.js";
import "./link.js";
import "./list.js";
import "./list-item.js";
const {
  collapseDirection: q,
  overlayPositioning: $,
  scale: o
} = H, Q = {
  title: "Components/Flow Item",
  args: {
    closed: !1,
    disabled: !1,
    closable: !1,
    collapsible: !1,
    collapsed: !1,
    collapseDirection: q.defaultValue,
    heightScale: o.defaultValue,
    icon: "",
    iconFlipRtl: !1,
    menuOpen: !1,
    overlayPositioning: $.defaultValue,
    scale: o.defaultValue,
    loading: !1,
    selected: !0
  },
  argTypes: {
    collapseDirection: {
      options: q.values,
      control: {
        type: "select"
      }
    },
    heightScale: {
      options: o.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: o.values,
      control: {
        type: "select"
      }
    },
    overlayPositioning: {
      options: $.values,
      control: {
        type: "select"
      }
    }
  }
}, C = `<h3 class="heading" slot="${i.headerContent}">Heading</h3>`, x = e`
  <p>
    Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo
    semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus
    habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non.
    Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti
    consectetur. Non porttitor tempor orci dictumst magna porta vitae.
  </p>
  <p>
    Ipsum nostra tempus etiam augue ullamcorper scelerisque sapien potenti erat nisi gravida. Vehicula sem tristique
    sed. Nullam, sociis imperdiet ullamcorper? Dapibus fames primis ridiculus vulputate, habitant inceptos! Nunc
    torquent lorem urna vehicula volutpat donec nec. Orci massa eu nec donec enim fames, faucibus quam aenean. Laoreet
    tellus tempor quisque ornare lobortis praesent erat senectus natoque consectetur donec imperdiet. Quis sem cum
    gravida dictumst a pretium purus aptent amet id. Orci habitasse, praesent facilisis condimentum. Nec elit turpis
    leo.
  </p>
  <p>
    Tempus per volutpat diam tempor mauris parturient vulputate leo id libero quisque. Mattis aliquam dictum venenatis
    fringilla. Taciti venenatis, ultrices sollicitudin consequat. Sapien fusce est iaculis potenti ut auctor potenti.
    Nisi malesuada feugiat vulputate vitae porttitor. Nullam nullam nullam accumsan quis magna in. Elementum, nascetur
    gravida cras scelerisque inceptos aenean inceptos potenti. Lobortis condimentum accumsan posuere curabitur fermentum
    diam, natoque quisque. Eget placerat sed aptent orci urna fusce magnis. Vel lacus magnis nunc.
  </p>
`, A = e`
  <calcite-button slot="${i.footerStart}" width="half" appearance="outline">Footer start</calcite-button>
  <calcite-button slot="${i.footerEnd}" width="half">Footer end</calcite-button>
`, F = `${C}
  <calcite-action text="Action" label="Action" slot="${i.headerActionsStart}" icon="bluetooth"></calcite-action>
  <calcite-action text="Action" label="Action" slot="${i.headerActionsEnd}" icon="attachment"></calcite-action>
  ${x}
  <calcite-button slot="${i.footer}" width="half" appearance="outline">Footer</calcite-button>
  <calcite-button slot="${i.footer}" width="half">Footer</calcite-button>
  `, c = (t) => e`
  <calcite-flow-item
    ${l("closed", t.closed)}
    ${l("disabled", t.disabled)}
    ${l("closable", t.closable)}
    ${l("collapsible", t.collapsible)}
    ${l("collapsed", t.collapsed)}
    collapse-direction="${t.collapseDirection}"
    height-scale="${t.heightScale}"
    scale="${t.scale}"
    ${l("loading", t.loading)}
    ${l("menu-open", t.menuOpen)}
    overlay-positioning="${t.overlayPositioning}"
    ${l("selected", t.selected)}
    heading="Heading"
    ${T("icon", t.icon)}
    icon-flip-rtl="${t.iconFlipRtl}"
    description="A wonderful flow item description"
  >
    <calcite-action text="Action" label="Action" slot="${i.headerActionsStart}" icon="bluetooth"></calcite-action>
    <calcite-action text="Action" label="Action" slot="${i.headerActionsEnd}" icon="attachment"></calcite-action>
    ${x}
    <calcite-fab slot="fab"></calcite-fab>
    <calcite-button slot="${i.footer}" width="half" appearance="outline">Footer</calcite-button>
    <calcite-button slot="${i.footer}" width="half">Footer</calcite-button>
  </calcite-flow-item>
`, s = () => e`
  <div style="width: 300px;">
    <calcite-flow-item
      selected
      height-scale="s"
      heading-level="2"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="flowItem title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    />
  </div>
`, n = () => e`
  <calcite-flow-item icon="banana" selected heading="Banana"> Hello World! </calcite-flow-item>
`, r = () => e`
  <calcite-flow-item heading="Plain heading fallback" description="Plain description fallback" selected>
    <span slot="heading"><strong>Rich heading</strong> with <calcite-link href="#">markup</calcite-link></span>
    <span slot="description">Description with <em>inline emphasis</em> and <code>HTML</code>.</span>
    <p>Slotted content!</p>
  </calcite-flow-item>
`, d = () => e`
  <calcite-flow-item selected closable heading="Flow item heading">
    <div slot="header-top">Header top content</div>
    <p>Flow item content</p>
  </calcite-flow-item>
`, u = () => e`
  <calcite-flow-item selected collapsed collapsible closable> Hello World! </calcite-flow-item>
`, m = () => e`
  <calcite-flow-item selected collapsed collapsible collapse-direction="up" closable> Hello World! </calcite-flow-item>
`, p = () => e`
  <calcite-flow-item selected style="height: 100%;" heading="Heading" disabled>
    <div id="content" style="height: 100%;">${x}</div>
  </calcite-flow-item>
`, a = () => e`
  <calcite-flow-item selected collapse-direction="down" height-scale="m" dir="rtl" class="calcite-mode-dark">
    ${F}
  </calcite-flow-item>
`;
a.parameters = {
  themes: P
};
const h = () => e`
  <style>
    #container {
      display: flex;
      max-height: 540px;
      width: 300px;
    }

    .content {
      height: 100%;
      display: flex;
      padding: 10px;
      overflow-y: auto; /* Control scrollbar via child */
    }
  </style>
  <div id="container">
    <calcite-flow>
      <calcite-flow-item heading="Example">
        <div>### Sticky Content e.g. toolbar</div>
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sapien lectus, ultricies a molestie nec,
          sollicitudin ac nulla. Pellentesque tincidunt malesuada arcu et placerat. In malesuada neque lectus, at congue
          est malesuada quis. Proin tincidunt lacus laoreet mauris fringilla accumsan. Cras nec enim eu lectus suscipit
          vestibulum a laoreet arcu. Duis posuere nunc vel enim blandit, nec vehicula orci aliquam. Vestibulum hendrerit
          mi vel nisi posuere accumsan. Aenean efficitur est id cursus convallis. Morbi turpis ante, sodales eu tortor
          eu, mattis bibendum purus. Morbi iaculis nisl nunc, quis accumsan quam laoreet vitae. Aliquam ex ligula,
          ornare eu ex vitae, tincidunt venenatis lacus. Phasellus risus quam, elementum sed justo porttitor,
          ullamcorper mattis nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Nulla non dui at metus porta lacinia congue sit amet quam. Mauris viverra diam neque, in blandit leo
          vehicula et. Donec non purus vitae nunc tincidunt egestas. Nunc pretium enim magna, sed fringilla lacus
          viverra in. Nam et pretium nisi. Ut bibendum, ipsum sit amet egestas hendrerit, quam orci sollicitudin purus,
          sit amet finibus mauris erat in eros. Integer est dui, vehicula a ipsum id, pellentesque semper elit. Fusce
          euismod volutpat eros vitae imperdiet. Nam suscipit lacus id posuere pharetra. Cras eros ipsum, feugiat non
          leo non, ornare malesuada eros. Donec egestas purus non quam tempus commodo. Maecenas ex augue, euismod eget
          magna in, dapibus fermentum felis. Phasellus justo felis, sollicitudin ut ex sed, lobortis scelerisque sem.
          Pellentesque semper placerat velit, sit amet viverra tortor ultricies eu. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus feugiat, augue in molestie
          imperdiet, felis turpis facilisis tortor, at tempus purus risus et sapien. Fusce id nisi id orci elementum
          sollicitudin. Nam id libero eu odio efficitur rutrum maximus porta lorem. Nunc tristique interdum augue,
          sodales viverra lectus efficitur vitae. Nam molestie, neque consequat mollis pulvinar, sapien sem semper nunc,
          et euismod enim sem vitae ligula.
        </div>
      </calcite-flow-item>
    </calcite-flow>
  </div>
`, f = () => e` <style>
      .container {
        max-height: 300px;
        width: 300px;
      }
    </style>
    <div class="container">
      <calcite-flow>
        <calcite-flow-item heading="My Panel">
          <calcite-list>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          </calcite-list>
        </calcite-flow-item>
      </calcite-flow>
    </div>`, g = () => e`<div style="width: 300px;">
    <calcite-flow-item selected height-scale="s">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"> </calcite-action>
          <calcite-action text="Save" icon="save"> </calcite-action>
          <calcite-action text="Layers" icon="layers"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <div slot="header-content">Header!</div>
      <div slot="content-top">Content Top!</div>
      <p>Slotted content!</p>
    </calcite-flow-item>
  </div>`, b = () => e` <div style="width: 300px;">
    <calcite-flow-item selected height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <div slot="content-bottom">Content bottom!</div>
      <calcite-button slot="footer" width="half" appearance="outline">Footer 1</calcite-button>
      <calcite-button slot="footer" width="half">Footer 2</calcite-button>
    </calcite-flow-item>
  </div>`, w = () => e`<div style="width: 300px; height: 300px;">
    <calcite-flow-item selected height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <div slot="content-bottom">Content bottom!</div>
      ${A}
    </calcite-flow-item>
  </div>`, v = () => e`<div style="width: 300px;">
    <calcite-flow-item selected height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <div slot="content-bottom">Content bottom!</div>
      <calcite-button slot="footer" width="half" appearance="outline">Footer 1</calcite-button>
      <calcite-button slot="footer" width="half">Footer 2</calcite-button>
      ${A}
    </calcite-flow-item>
  </div>`, y = () => e`<calcite-flow-item
    selected
    style="--calcite-flow-item-header-border-block-end:none;"
    height-scale="s"
    heading="My Panel"
    >Slotted content!</calcite-flow-item
  >`, M = () => e`
  <calcite-flow-item selected height-scale="s" heading="My Panel" style="width: 500px; height:200px">
    Slotted content!
    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">
      <div slot="title">Hello there!</div>
      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
    </calcite-alert>
  </calcite-flow-item>
`, S = () => e`<style>
      calcite-flow {
        height: auto !important;
      }
    </style>
    <calcite-flow>
      <calcite-flow-item heading="Profile" scale="s"> </calcite-flow-item>
      <calcite-flow-item selected heading="Education" scale="s"> </calcite-flow-item>
    </calcite-flow>
    <calcite-flow>
      <calcite-flow-item heading="Profile" scale="m"> </calcite-flow-item>
      <calcite-flow-item selected heading="Education" scale="m"> </calcite-flow-item>
    </calcite-flow>
    <calcite-flow>
      <calcite-flow-item heading="Profile" scale="l"> </calcite-flow-item>
      <calcite-flow-item selected heading="Education" scale="l"> </calcite-flow-item>
    </calcite-flow>`;
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(args: FlowItemStoryArgs): string => html\`
  <calcite-flow-item
    \${boolean("closed", args.closed)}
    \${boolean("disabled", args.disabled)}
    \${boolean("closable", args.closable)}
    \${boolean("collapsible", args.collapsible)}
    \${boolean("collapsed", args.collapsed)}
    collapse-direction="\${args.collapseDirection}"
    height-scale="\${args.heightScale}"
    scale="\${args.scale}"
    \${boolean("loading", args.loading)}
    \${boolean("menu-open", args.menuOpen)}
    overlay-positioning="\${args.overlayPositioning}"
    \${boolean("selected", args.selected)}
    heading="Heading"
    \${optionalAttribute("icon", args.icon)}
    icon-flip-rtl="\${args.iconFlipRtl}"
    description="A wonderful flow item description"
  >
    <calcite-action text="Action" label="Action" slot="\${SLOTS.headerActionsStart}" icon="bluetooth"></calcite-action>
    <calcite-action text="Action" label="Action" slot="\${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>
    \${contentHTML}
    <calcite-fab slot="fab"></calcite-fab>
    <calcite-button slot="\${SLOTS.footer}" width="half" appearance="outline">Footer</calcite-button>
    <calcite-button slot="\${SLOTS.footer}" width="half">Footer</calcite-button>
  </calcite-flow-item>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 300px;">
    <calcite-flow-item
      selected
      height-scale="s"
      heading-level="2"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="flowItem title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    />
  </div>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-flow-item icon="banana" selected heading="Banana"> Hello World! </calcite-flow-item>\n`',
      ...n.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-flow-item heading="Plain heading fallback" description="Plain description fallback" selected>
    <span slot="heading"><strong>Rich heading</strong> with <calcite-link href="#">markup</calcite-link></span>
    <span slot="description">Description with <em>inline emphasis</em> and <code>HTML</code>.</span>
    <p>Slotted content!</p>
  </calcite-flow-item>
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
      originalSource: `(): string => html\`
  <calcite-flow-item selected closable heading="Flow item heading">
    <div slot="header-top">Header top content</div>
    <p>Flow item content</p>
  </calcite-flow-item>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: "(): string => html`\n  <calcite-flow-item selected collapsed collapsible closable> Hello World! </calcite-flow-item>\n`",
      ...u.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`\n  <calcite-flow-item selected collapsed collapsible collapse-direction="up" closable> Hello World! </calcite-flow-item>\n`',
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
  <calcite-flow-item selected style="height: 100%;" heading="Heading" disabled>
    <div id="content" style="height: 100%;">\${contentHTML}</div>
  </calcite-flow-item>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-flow-item selected collapse-direction="down" height-scale="m" dir="rtl" class="calcite-mode-dark">
    \${flowItemContent}
  </calcite-flow-item>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    #container {
      display: flex;
      max-height: 540px;
      width: 300px;
    }

    .content {
      height: 100%;
      display: flex;
      padding: 10px;
      overflow-y: auto; /* Control scrollbar via child */
    }
  </style>
  <div id="container">
    <calcite-flow>
      <calcite-flow-item heading="Example">
        <div>### Sticky Content e.g. toolbar</div>
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sapien lectus, ultricies a molestie nec,
          sollicitudin ac nulla. Pellentesque tincidunt malesuada arcu et placerat. In malesuada neque lectus, at congue
          est malesuada quis. Proin tincidunt lacus laoreet mauris fringilla accumsan. Cras nec enim eu lectus suscipit
          vestibulum a laoreet arcu. Duis posuere nunc vel enim blandit, nec vehicula orci aliquam. Vestibulum hendrerit
          mi vel nisi posuere accumsan. Aenean efficitur est id cursus convallis. Morbi turpis ante, sodales eu tortor
          eu, mattis bibendum purus. Morbi iaculis nisl nunc, quis accumsan quam laoreet vitae. Aliquam ex ligula,
          ornare eu ex vitae, tincidunt venenatis lacus. Phasellus risus quam, elementum sed justo porttitor,
          ullamcorper mattis nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Nulla non dui at metus porta lacinia congue sit amet quam. Mauris viverra diam neque, in blandit leo
          vehicula et. Donec non purus vitae nunc tincidunt egestas. Nunc pretium enim magna, sed fringilla lacus
          viverra in. Nam et pretium nisi. Ut bibendum, ipsum sit amet egestas hendrerit, quam orci sollicitudin purus,
          sit amet finibus mauris erat in eros. Integer est dui, vehicula a ipsum id, pellentesque semper elit. Fusce
          euismod volutpat eros vitae imperdiet. Nam suscipit lacus id posuere pharetra. Cras eros ipsum, feugiat non
          leo non, ornare malesuada eros. Donec egestas purus non quam tempus commodo. Maecenas ex augue, euismod eget
          magna in, dapibus fermentum felis. Phasellus justo felis, sollicitudin ut ex sed, lobortis scelerisque sem.
          Pellentesque semper placerat velit, sit amet viverra tortor ultricies eu. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus feugiat, augue in molestie
          imperdiet, felis turpis facilisis tortor, at tempus purus risus et sapien. Fusce id nisi id orci elementum
          sollicitudin. Nam id libero eu odio efficitur rutrum maximus porta lorem. Nunc tristique interdum augue,
          sodales viverra lectus efficitur vitae. Nam molestie, neque consequat mollis pulvinar, sapien sem semper nunc,
          et euismod enim sem vitae ligula.
        </div>
      </calcite-flow-item>
    </calcite-flow>
  </div>
\``,
      ...h.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <style>
      .container {
        max-height: 300px;
        width: 300px;
      }
    </style>
    <div class="container">
      <calcite-flow>
        <calcite-flow-item heading="My Panel">
          <calcite-list>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
            <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          </calcite-list>
        </calcite-flow-item>
      </calcite-flow>
    </div>\``,
      ...f.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width: 300px;">
    <calcite-flow-item selected height-scale="s">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"> </calcite-action>
          <calcite-action text="Save" icon="save"> </calcite-action>
          <calcite-action text="Layers" icon="layers"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <div slot="header-content">Header!</div>
      <div slot="content-top">Content Top!</div>
      <p>Slotted content!</p>
    </calcite-flow-item>
  </div>\``,
      ...g.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <div style="width: 300px;">
    <calcite-flow-item selected height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <div slot="content-bottom">Content bottom!</div>
      <calcite-button slot="footer" width="half" appearance="outline">Footer 1</calcite-button>
      <calcite-button slot="footer" width="half">Footer 2</calcite-button>
    </calcite-flow-item>
  </div>\``,
      ...b.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width: 300px; height: 300px;">
    <calcite-flow-item selected height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <div slot="content-bottom">Content bottom!</div>
      \${footerHTML}
    </calcite-flow-item>
  </div>\``,
      ...w.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width: 300px;">
    <calcite-flow-item selected height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <div slot="content-bottom">Content bottom!</div>
      <calcite-button slot="footer" width="half" appearance="outline">Footer 1</calcite-button>
      <calcite-button slot="footer" width="half">Footer 2</calcite-button>
      \${footerHTML}
    </calcite-flow-item>
  </div>\``,
      ...v.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-flow-item
    selected
    style="--calcite-flow-item-header-border-block-end:none;"
    height-scale="s"
    heading="My Panel"
    >Slotted content!</calcite-flow-item
  >\``,
      ...y.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-flow-item selected height-scale="s" heading="My Panel" style="width: 500px; height:200px">
    Slotted content!
    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">
      <div slot="title">Hello there!</div>
      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
    </calcite-alert>
  </calcite-flow-item>
\``,
      ...M.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<style>
      calcite-flow {
        height: auto !important;
      }
    </style>
    <calcite-flow>
      <calcite-flow-item heading="Profile" scale="s"> </calcite-flow-item>
      <calcite-flow-item selected heading="Education" scale="s"> </calcite-flow-item>
    </calcite-flow>
    <calcite-flow>
      <calcite-flow-item heading="Profile" scale="m"> </calcite-flow-item>
      <calcite-flow-item selected heading="Education" scale="m"> </calcite-flow-item>
    </calcite-flow>
    <calcite-flow>
      <calcite-flow-item heading="Profile" scale="l"> </calcite-flow-item>
      <calcite-flow-item selected heading="Education" scale="l"> </calcite-flow-item>
    </calcite-flow>\``,
      ...S.parameters?.docs?.source
    }
  }
};
const z = ["simple", "onlyProps", "withIcon", "withRichHeaderSlots", "withHeaderTop", "collapsed", "collapseDirectionUp", "disabledWithStyledSlot", "darkModeRTL", "noDoubleScrollbars", "overflowContent", "withActionBarAndContentTop", "footerPaddingAndContentBottom", "footerStartEndAndContentBottom", "footerSlot", "withNoHeaderBorderBlockEnd", "withAlertsSlot", "scales"];
export {
  z as __namedExportsOrder,
  m as collapseDirectionUp,
  u as collapsed,
  a as darkModeRTL,
  Q as default,
  p as disabledWithStyledSlot,
  b as footerPaddingAndContentBottom,
  v as footerSlot,
  w as footerStartEndAndContentBottom,
  h as noDoubleScrollbars,
  s as onlyProps,
  f as overflowContent,
  S as scales,
  c as simple,
  g as withActionBarAndContentTop,
  M as withAlertsSlot,
  d as withHeaderTop,
  n as withIcon,
  y as withNoHeaderBorderBlockEnd,
  r as withRichHeaderSlots
};
