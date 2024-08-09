"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[7507],{"./src/components/flow-item/flow-item.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,collapseDirectionUp_TestOnly:()=>collapseDirectionUp_TestOnly,collapsed_TestOnly:()=>collapsed_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>flow_item_stories,disabledWithStyledSlot_TestOnly:()=>disabledWithStyledSlot_TestOnly,footerPaddingAndContentBottom:()=>footerPaddingAndContentBottom,footerSlot:()=>footerSlot,footerStartEndAndContentBottom:()=>footerStartEndAndContentBottom,noDoubleScrollbars_TestOnly:()=>noDoubleScrollbars_TestOnly,onlyProps:()=>onlyProps,overflowContent_TestOnly:()=>overflowContent_TestOnly,simple:()=>simple,withActionBarAndContentTop_TestOnly:()=>withActionBarAndContentTop_TestOnly,withAlertsSlot:()=>withAlertsSlot,withNoHeaderBorderBlockEnd_TestOnly:()=>withNoHeaderBorderBlockEnd_TestOnly});var utils=__webpack_require__("./.storybook/utils.ts"),formatting=__webpack_require__("./support/formatting.ts"),resources=__webpack_require__("./.storybook/resources.ts");const SLOTS_headerActionsStart="header-actions-start",SLOTS_headerActionsEnd="header-actions-end",SLOTS_headerContent="header-content",SLOTS_footer="footer",SLOTS_footerEnd="footer-end",SLOTS_footerStart="footer-start",{collapseDirection,scale}=resources.i,flow_item_stories={title:"Components/Flow Item",args:{closed:!1,disabled:!1,closable:!1,collapsible:!1,collapsed:!1,collapseDirection:collapseDirection.defaultValue,heightScale:scale.defaultValue,scale:scale.defaultValue,loading:!1},argTypes:{collapseDirection:{options:collapseDirection.values,control:{type:"select"}},heightScale:{options:scale.values,control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}}}},headerHTML=`<h3 class="heading" slot="${SLOTS_headerContent}">Heading</h3>`,contentHTML=formatting.q`
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
`,footerHTML=formatting.q`
  <calcite-button slot="${SLOTS_footerStart}" width="half" appearance="outline">Footer start</calcite-button>
  <calcite-button slot="${SLOTS_footerEnd}" width="half">Footer end</calcite-button>
`,flowItemContent=`${headerHTML}\n  <calcite-action text="Action" label="Action" slot="${SLOTS_headerActionsStart}" icon="bluetooth"></calcite-action>\n  <calcite-action text="Action" label="Action" slot="${SLOTS_headerActionsEnd}" icon="attachment"></calcite-action>\n  ${contentHTML}\n  <calcite-button slot="${SLOTS_footer}" width="half" appearance="outline">Footer</calcite-button>\n  <calcite-button slot="${SLOTS_footer}" width="half">Footer</calcite-button>\n  `,simple=args=>formatting.q`
  <calcite-flow-item
    ${(0,utils.zM)("closed",args.closed)}
    ${(0,utils.zM)("disabled",args.disabled)}
    ${(0,utils.zM)("closable",args.closable)}
    ${(0,utils.zM)("collapsible",args.collapsible)}
    ${(0,utils.zM)("collapsed",args.collapsed)}
    collapse-direction="${args.collapseDirection}"
    height-scale="${args.heightScale}"
    scale="${args.scale}"
    ${(0,utils.zM)("loading",args.loading)}
    heading="Heading"
    description="A wonderful flow item description"
  >
    <calcite-action text="Action" label="Action" slot="${SLOTS_headerActionsStart}" icon="bluetooth"></calcite-action>
    <calcite-action text="Action" label="Action" slot="${SLOTS_headerActionsEnd}" icon="attachment"></calcite-action>
    ${contentHTML}
    <calcite-fab slot="fab"></calcite-fab>
    <calcite-button slot="${SLOTS_footer}" width="half" appearance="outline">Footer</calcite-button>
    <calcite-button slot="${SLOTS_footer}" width="half">Footer</calcite-button>
  </calcite-flow-item>
`,onlyProps=()=>formatting.q`
  <div style="width: 300px;">
    <calcite-flow-item
      height-scale="s"
      heading-level="2"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="flowItem title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    />
  </div>
`,collapsed_TestOnly=()=>formatting.q`
  <calcite-flow-item collapsed collapsible closable> Hello World! </calcite-flow-item>
`,collapseDirectionUp_TestOnly=()=>formatting.q`
  <calcite-flow-item collapsed collapsible collapse-direction="up" closable> Hello World! </calcite-flow-item>
`,disabledWithStyledSlot_TestOnly=()=>formatting.q`
  <calcite-flow-item style="height: 100%;" heading="Heading" disabled>
    <div id="content" style="height: 100%;">${contentHTML}</div>
  </calcite-flow-item>
`,darkModeRTL_TestOnly=()=>formatting.q`
  <calcite-flow-item collapse-direction="down" height-scale="m" dir="rtl" class="calcite-mode-dark">
    ${flowItemContent}
  </calcite-flow-item>
`;darkModeRTL_TestOnly.parameters={themes:utils.At};const noDoubleScrollbars_TestOnly=()=>formatting.q`
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
`,overflowContent_TestOnly=()=>formatting.q` <style>
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
    </div>`,withActionBarAndContentTop_TestOnly=()=>formatting.q`<div style="width: 300px;">
    <calcite-flow-item height-scale="s">
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
  </div>`,footerPaddingAndContentBottom=()=>formatting.q` <div style="width: 300px;">
    <calcite-flow-item height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <div slot="content-bottom">Content bottom!</div>
      <calcite-button slot="footer" width="half" appearance="outline">Footer 1</calcite-button>
      <calcite-button slot="footer" width="half">Footer 2</calcite-button>
    </calcite-flow-item>
  </div>`,footerStartEndAndContentBottom=()=>formatting.q`<div style="width: 300px; height: 300px;">
    <calcite-flow-item height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <div slot="content-bottom">Content bottom!</div>
      ${footerHTML}
    </calcite-flow-item>
  </div>`,footerSlot=()=>formatting.q`<div style="width: 300px;">
    <calcite-flow-item height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <div slot="content-bottom">Content bottom!</div>
      <calcite-button slot="footer" width="half" appearance="outline">Footer 1</calcite-button>
      <calcite-button slot="footer" width="half">Footer 2</calcite-button>
      ${footerHTML}
    </calcite-flow-item>
  </div>`,withNoHeaderBorderBlockEnd_TestOnly=()=>formatting.q`<calcite-flow-item style="--calcite-flow-item-header-border-block-end:none;" height-scale="s" heading="My Panel"
    >Slotted content!</calcite-flow-item
  >`,withAlertsSlot=()=>formatting.q`
  <calcite-flow-item height-scale="s" heading="My Panel" style="width: 500px; height:200px">
    Slotted content!
    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">
      <div slot="title">Hello there!</div>
      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
    </calcite-alert>
  </calcite-flow-item>
`,__namedExportsOrder=["simple","onlyProps","collapsed_TestOnly","collapseDirectionUp_TestOnly","disabledWithStyledSlot_TestOnly","darkModeRTL_TestOnly","noDoubleScrollbars_TestOnly","overflowContent_TestOnly","withActionBarAndContentTop_TestOnly","footerPaddingAndContentBottom","footerStartEndAndContentBottom","footerSlot","withNoHeaderBorderBlockEnd_TestOnly","withAlertsSlot"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: FlowItemStoryArgs): string => html`\n  <calcite-flow-item\n    ${boolean("closed", args.closed)}\n    ${boolean("disabled", args.disabled)}\n    ${boolean("closable", args.closable)}\n    ${boolean("collapsible", args.collapsible)}\n    ${boolean("collapsed", args.collapsed)}\n    collapse-direction="${args.collapseDirection}"\n    height-scale="${args.heightScale}"\n    scale="${args.scale}"\n    ${boolean("loading", args.loading)}\n    heading="Heading"\n    description="A wonderful flow item description"\n  >\n    <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsStart}" icon="bluetooth"></calcite-action>\n    <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>\n    ${contentHTML}\n    <calcite-fab slot="fab"></calcite-fab>\n    <calcite-button slot="${SLOTS.footer}" width="half" appearance="outline">Footer</calcite-button>\n    <calcite-button slot="${SLOTS.footer}" width="half">Footer</calcite-button>\n  </calcite-flow-item>\n`',...simple.parameters?.docs?.source}}},onlyProps.parameters={...onlyProps.parameters,docs:{...onlyProps.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 300px;">\n    <calcite-flow-item\n      height-scale="s"\n      heading-level="2"\n      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."\n      heading="flowItem title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"\n    />\n  </div>\n`',...onlyProps.parameters?.docs?.source}}},collapsed_TestOnly.parameters={...collapsed_TestOnly.parameters,docs:{...collapsed_TestOnly.parameters?.docs,source:{originalSource:"(): string => html`\n  <calcite-flow-item collapsed collapsible closable> Hello World! </calcite-flow-item>\n`",...collapsed_TestOnly.parameters?.docs?.source}}},collapseDirectionUp_TestOnly.parameters={...collapseDirectionUp_TestOnly.parameters,docs:{...collapseDirectionUp_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-flow-item collapsed collapsible collapse-direction="up" closable> Hello World! </calcite-flow-item>\n`',...collapseDirectionUp_TestOnly.parameters?.docs?.source}}},disabledWithStyledSlot_TestOnly.parameters={...disabledWithStyledSlot_TestOnly.parameters,docs:{...disabledWithStyledSlot_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-flow-item style="height: 100%;" heading="Heading" disabled>\n    <div id="content" style="height: 100%;">${contentHTML}</div>\n  </calcite-flow-item>\n`',...disabledWithStyledSlot_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-flow-item collapse-direction="down" height-scale="m" dir="rtl" class="calcite-mode-dark">\n    ${flowItemContent}\n  </calcite-flow-item>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},noDoubleScrollbars_TestOnly.parameters={...noDoubleScrollbars_TestOnly.parameters,docs:{...noDoubleScrollbars_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    #container {\n      display: flex;\n      max-height: 540px;\n      width: 300px;\n    }\n\n    .content {\n      height: 100%;\n      display: flex;\n      padding: 10px;\n      overflow-y: auto; /* Control scrollbar via child */\n    }\n  </style>\n  <div id="container">\n    <calcite-flow>\n      <calcite-flow-item heading="Example">\n        <div>### Sticky Content e.g. toolbar</div>\n        <div class="content">\n          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sapien lectus, ultricies a molestie nec,\n          sollicitudin ac nulla. Pellentesque tincidunt malesuada arcu et placerat. In malesuada neque lectus, at congue\n          est malesuada quis. Proin tincidunt lacus laoreet mauris fringilla accumsan. Cras nec enim eu lectus suscipit\n          vestibulum a laoreet arcu. Duis posuere nunc vel enim blandit, nec vehicula orci aliquam. Vestibulum hendrerit\n          mi vel nisi posuere accumsan. Aenean efficitur est id cursus convallis. Morbi turpis ante, sodales eu tortor\n          eu, mattis bibendum purus. Morbi iaculis nisl nunc, quis accumsan quam laoreet vitae. Aliquam ex ligula,\n          ornare eu ex vitae, tincidunt venenatis lacus. Phasellus risus quam, elementum sed justo porttitor,\n          ullamcorper mattis nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia\n          curae; Nulla non dui at metus porta lacinia congue sit amet quam. Mauris viverra diam neque, in blandit leo\n          vehicula et. Donec non purus vitae nunc tincidunt egestas. Nunc pretium enim magna, sed fringilla lacus\n          viverra in. Nam et pretium nisi. Ut bibendum, ipsum sit amet egestas hendrerit, quam orci sollicitudin purus,\n          sit amet finibus mauris erat in eros. Integer est dui, vehicula a ipsum id, pellentesque semper elit. Fusce\n          euismod volutpat eros vitae imperdiet. Nam suscipit lacus id posuere pharetra. Cras eros ipsum, feugiat non\n          leo non, ornare malesuada eros. Donec egestas purus non quam tempus commodo. Maecenas ex augue, euismod eget\n          magna in, dapibus fermentum felis. Phasellus justo felis, sollicitudin ut ex sed, lobortis scelerisque sem.\n          Pellentesque semper placerat velit, sit amet viverra tortor ultricies eu. Pellentesque habitant morbi\n          tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus feugiat, augue in molestie\n          imperdiet, felis turpis facilisis tortor, at tempus purus risus et sapien. Fusce id nisi id orci elementum\n          sollicitudin. Nam id libero eu odio efficitur rutrum maximus porta lorem. Nunc tristique interdum augue,\n          sodales viverra lectus efficitur vitae. Nam molestie, neque consequat mollis pulvinar, sapien sem semper nunc,\n          et euismod enim sem vitae ligula.\n        </div>\n      </calcite-flow-item>\n    </calcite-flow>\n  </div>\n`',...noDoubleScrollbars_TestOnly.parameters?.docs?.source}}},overflowContent_TestOnly.parameters={...overflowContent_TestOnly.parameters,docs:{...overflowContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <style>\n      .container {\n        max-height: 300px;\n        width: 300px;\n      }\n    </style>\n    <div class="container">\n      <calcite-flow>\n        <calcite-flow-item heading="My Panel">\n          <calcite-list>\n            <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n            <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n            <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n            <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n            <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n            <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n            <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n            <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n            <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n            <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n            <calcite-list-item label="My list item" description="My description"></calcite-list-item>\n          </calcite-list>\n        </calcite-flow-item>\n      </calcite-flow>\n    </div>`',...overflowContent_TestOnly.parameters?.docs?.source}}},withActionBarAndContentTop_TestOnly.parameters={...withActionBarAndContentTop_TestOnly.parameters,docs:{...withActionBarAndContentTop_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<div style="width: 300px;">\n    <calcite-flow-item height-scale="s">\n      <calcite-action-bar slot="action-bar">\n        <calcite-action-group>\n          <calcite-action text="Add" icon="plus"> </calcite-action>\n          <calcite-action text="Save" icon="save"> </calcite-action>\n          <calcite-action text="Layers" icon="layers"> </calcite-action>\n        </calcite-action-group>\n      </calcite-action-bar>\n      <div slot="header-content">Header!</div>\n      <div slot="content-top">Content Top!</div>\n      <p>Slotted content!</p>\n    </calcite-flow-item>\n  </div>`',...withActionBarAndContentTop_TestOnly.parameters?.docs?.source}}},footerPaddingAndContentBottom.parameters={...footerPaddingAndContentBottom.parameters,docs:{...footerPaddingAndContentBottom.parameters?.docs,source:{originalSource:'(): string => html` <div style="width: 300px;">\n    <calcite-flow-item height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">\n      <div slot="header-content">Header!</div>\n      <p>Slotted content!</p>\n      <div slot="content-bottom">Content bottom!</div>\n      <calcite-button slot="footer" width="half" appearance="outline">Footer 1</calcite-button>\n      <calcite-button slot="footer" width="half">Footer 2</calcite-button>\n    </calcite-flow-item>\n  </div>`',...footerPaddingAndContentBottom.parameters?.docs?.source}}},footerStartEndAndContentBottom.parameters={...footerStartEndAndContentBottom.parameters,docs:{...footerStartEndAndContentBottom.parameters?.docs,source:{originalSource:'(): string => html`<div style="width: 300px; height: 300px;">\n    <calcite-flow-item height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">\n      <div slot="header-content">Header!</div>\n      <p>Slotted content!</p>\n      <div slot="content-bottom">Content bottom!</div>\n      ${footerHTML}\n    </calcite-flow-item>\n  </div>`',...footerStartEndAndContentBottom.parameters?.docs?.source}}},footerSlot.parameters={...footerSlot.parameters,docs:{...footerSlot.parameters?.docs,source:{originalSource:'(): string => html`<div style="width: 300px;">\n    <calcite-flow-item height-scale="s" style="--calcite-flow-item-footer-padding: 20px;">\n      <div slot="header-content">Header!</div>\n      <p>Slotted content!</p>\n      <div slot="content-bottom">Content bottom!</div>\n      <calcite-button slot="footer" width="half" appearance="outline">Footer 1</calcite-button>\n      <calcite-button slot="footer" width="half">Footer 2</calcite-button>\n      ${footerHTML}\n    </calcite-flow-item>\n  </div>`',...footerSlot.parameters?.docs?.source}}},withNoHeaderBorderBlockEnd_TestOnly.parameters={...withNoHeaderBorderBlockEnd_TestOnly.parameters,docs:{...withNoHeaderBorderBlockEnd_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-flow-item style="--calcite-flow-item-header-border-block-end:none;" height-scale="s" heading="My Panel"\n    >Slotted content!</calcite-flow-item\n  >`',...withNoHeaderBorderBlockEnd_TestOnly.parameters?.docs?.source}}},withAlertsSlot.parameters={...withAlertsSlot.parameters,docs:{...withAlertsSlot.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-flow-item height-scale="s" heading="My Panel" style="width: 500px; height:200px">\n    Slotted content!\n    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">\n      <div slot="title">Hello there!</div>\n      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>\n    </calcite-alert>\n  </calcite-flow-item>\n`',...withAlertsSlot.parameters?.docs?.source}}}},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-flow-item-flow-item-stories.cf393912.iframe.bundle.js.map