"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[4977],{"./src/components/flow/flow.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,noDoubleScrollbars_TestOnly:()=>noDoubleScrollbars_TestOnly,scales:()=>scales,simple:()=>simple});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_panel_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/panel/resources.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Flow",args:{disabled:!1,heading:"Heading",loading:!1,menuOpen:!1,description:"Description"}},menuActionsHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-action
    slot="${_panel_resources__WEBPACK_IMPORTED_MODULE_2__._f.headerMenuActions}"
    text-enabled
    text="Add"
    label="Add Item"
    icon="plus"
  ></calcite-action>
  <calcite-action
    slot="${_panel_resources__WEBPACK_IMPORTED_MODULE_2__._f.headerMenuActions}"
    text-enabled
    text="Save"
    label="Save Item"
    icon="save"
  ></calcite-action>
  <calcite-action
    slot="${_panel_resources__WEBPACK_IMPORTED_MODULE_2__._f.headerMenuActions}"
    text-enabled
    text="Layers"
    label="View Layers"
    icon="layers"
  ></calcite-action>
`,footerActionsHTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-button slot="${_panel_resources__WEBPACK_IMPORTED_MODULE_2__._f.footerActions}" width="half" appearance="outline">Cancel</calcite-button>
  <calcite-button slot="${_panel_resources__WEBPACK_IMPORTED_MODULE_2__._f.footerActions}" width="half">Save</button>
`;function createItemHTML(content){return`${menuActionsHTML}${content}${footerActionsHTML}`}const item1HTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
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
  <p>
    Magna ligula neque phasellus. Velit duis auctor etiam nullam sociis nam neque quis. Donec fusce bibendum quam
    egestas sociosqu orci tempus vulputate egestas penatibus urna sociosqu. Nulla nam potenti diam egestas litora
    lobortis tristique maecenas pulvinar maecenas vitae tortor. Lacus purus facilisi est accumsan varius gravida
    facilisis rutrum tortor potenti rhoncus id. Ipsum praesent tristique blandit taciti morbi torquent pharetra
    fermentum aenean!
  </p>
  <p>
    Congue eu duis integer nisl molestie nostra dis auctor lobortis tellus parturient. Porttitor dis curae; maecenas
    quis praesent ridiculus posuere mus. Dictumst, vivamus fames semper congue fusce! Nunc placerat enim fermentum
    posuere magna justo habitasse. Tristique placerat mauris, per nulla gravida dui urna ut nec venenatis! Non lacus
    iaculis quisque, neque erat integer. Duis tortor ad habitant turpis dis eu mollis at facilisis. Tellus nisl amet
    morbi fringilla mus dui neque himenaeos maecenas platea venenatis. Tristique nisl quisque ad aliquam senectus
    pulvinar litora.
  </p>
`,item2HTML=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <ul>
    <li>
      Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed
      arcu. Cras consequat.
    </li>
    <li>
      Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam
      erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
    </li>
    <li>
      Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus. Nam
      nulla quam, gravida non, commodo a, sodales sit amet, nisi.
    </li>
    <li>
      Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
    </li>
  </ul>
`,simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-flow>
    <calcite-flow-item
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
      heading="${args.heading}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("loading",args.loading)}
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("menu-open",args.menuOpen)}
      description="${args.description}"
    >
      ${createItemHTML(item1HTML)}
    </calcite-flow-item>
    <calcite-flow-item
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
      heading="${args.heading}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("loading",args.loading)}
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("menu-open",args.menuOpen)}
      description="${args.description}"
    >
      ${createItemHTML(item2HTML)}
    </calcite-flow-item>
  </calcite-flow>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-flow class="calcite-mode-dark" dir="rtl">
    <calcite-flow-item heading="Heading" description="Description"> ${createItemHTML(item1HTML)} </calcite-flow-item>
    <calcite-flow-item heading="Heading" description="Description"> ${createItemHTML(item2HTML)} </calcite-flow-item>
  </calcite-flow>
`,noDoubleScrollbars_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
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
`,scales=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-flow style="height: 100px; width: 300px;">
    <calcite-flow-item heading="Flow-item heading" description="Flow-item description" scale="s" />
  </calcite-flow>

  <calcite-flow style="height: 100px">
    <calcite-flow-item heading="Flow-item heading" description="Flow-item description" scale="m" />
  </calcite-flow>

  <calcite-flow style="height: 100px">
    <calcite-flow-item heading="Flow-item heading" description="Flow-item description" scale="l" />
  </calcite-flow>
`,__namedExportsOrder=["simple","darkModeRTL_TestOnly","noDoubleScrollbars_TestOnly","scales"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: FlowStoryArgs): string => html`\n  <calcite-flow>\n    <calcite-flow-item\n      ${boolean("disabled", args.disabled)}\n      heading="${args.heading}"\n      ${boolean("loading", args.loading)}\n      ${boolean("menu-open", args.menuOpen)}\n      description="${args.description}"\n    >\n      ${createItemHTML(item1HTML)}\n    </calcite-flow-item>\n    <calcite-flow-item\n      ${boolean("disabled", args.disabled)}\n      heading="${args.heading}"\n      ${boolean("loading", args.loading)}\n      ${boolean("menu-open", args.menuOpen)}\n      description="${args.description}"\n    >\n      ${createItemHTML(item2HTML)}\n    </calcite-flow-item>\n  </calcite-flow>\n`',...simple.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-flow class="calcite-mode-dark" dir="rtl">\n    <calcite-flow-item heading="Heading" description="Description"> ${createItemHTML(item1HTML)} </calcite-flow-item>\n    <calcite-flow-item heading="Heading" description="Description"> ${createItemHTML(item2HTML)} </calcite-flow-item>\n  </calcite-flow>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},noDoubleScrollbars_TestOnly.parameters={...noDoubleScrollbars_TestOnly.parameters,docs:{...noDoubleScrollbars_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    #container {\n      display: flex;\n      max-height: 540px;\n      width: 300px;\n    }\n    .content {\n      height: 100%;\n      display: flex;\n      padding: 10px;\n      overflow-y: auto; /* Control scrollbar via child */\n    }\n  </style>\n  <div id="container">\n    <calcite-flow>\n      <calcite-flow-item heading="Example">\n        <div>### Sticky Content e.g. toolbar</div>\n        <div class="content">\n          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sapien lectus, ultricies a molestie nec,\n          sollicitudin ac nulla. Pellentesque tincidunt malesuada arcu et placerat. In malesuada neque lectus, at congue\n          est malesuada quis. Proin tincidunt lacus laoreet mauris fringilla accumsan. Cras nec enim eu lectus suscipit\n          vestibulum a laoreet arcu. Duis posuere nunc vel enim blandit, nec vehicula orci aliquam. Vestibulum hendrerit\n          mi vel nisi posuere accumsan. Aenean efficitur est id cursus convallis. Morbi turpis ante, sodales eu tortor\n          eu, mattis bibendum purus. Morbi iaculis nisl nunc, quis accumsan quam laoreet vitae. Aliquam ex ligula,\n          ornare eu ex vitae, tincidunt venenatis lacus. Phasellus risus quam, elementum sed justo porttitor,\n          ullamcorper mattis nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia\n          curae; Nulla non dui at metus porta lacinia congue sit amet quam. Mauris viverra diam neque, in blandit leo\n          vehicula et. Donec non purus vitae nunc tincidunt egestas. Nunc pretium enim magna, sed fringilla lacus\n          viverra in. Nam et pretium nisi. Ut bibendum, ipsum sit amet egestas hendrerit, quam orci sollicitudin purus,\n          sit amet finibus mauris erat in eros. Integer est dui, vehicula a ipsum id, pellentesque semper elit. Fusce\n          euismod volutpat eros vitae imperdiet. Nam suscipit lacus id posuere pharetra. Cras eros ipsum, feugiat non\n          leo non, ornare malesuada eros. Donec egestas purus non quam tempus commodo. Maecenas ex augue, euismod eget\n          magna in, dapibus fermentum felis. Phasellus justo felis, sollicitudin ut ex sed, lobortis scelerisque sem.\n          Pellentesque semper placerat velit, sit amet viverra tortor ultricies eu. Pellentesque habitant morbi\n          tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus feugiat, augue in molestie\n          imperdiet, felis turpis facilisis tortor, at tempus purus risus et sapien. Fusce id nisi id orci elementum\n          sollicitudin. Nam id libero eu odio efficitur rutrum maximus porta lorem. Nunc tristique interdum augue,\n          sodales viverra lectus efficitur vitae. Nam molestie, neque consequat mollis pulvinar, sapien sem semper nunc,\n          et euismod enim sem vitae ligula.\n        </div>\n      </calcite-flow-item>\n    </calcite-flow>\n  </div>\n`',...noDoubleScrollbars_TestOnly.parameters?.docs?.source}}},scales.parameters={...scales.parameters,docs:{...scales.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-flow style="height: 100px; width: 300px;">\n    <calcite-flow-item heading="Flow-item heading" description="Flow-item description" scale="s" />\n  </calcite-flow>\n\n  <calcite-flow style="height: 100px">\n    <calcite-flow-item heading="Flow-item heading" description="Flow-item description" scale="m" />\n  </calcite-flow>\n\n  <calcite-flow style="height: 100px">\n    <calcite-flow-item heading="Flow-item heading" description="Flow-item description" scale="l" />\n  </calcite-flow>\n`',...scales.parameters?.docs?.source}}}},"./src/components/panel/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_f:()=>SLOTS});const SLOTS={actionBar:"action-bar",alerts:"alerts",contentBottom:"content-bottom",contentTop:"content-top",headerActionsStart:"header-actions-start",headerActionsEnd:"header-actions-end",headerMenuActions:"header-menu-actions",headerContent:"header-content",fab:"fab",footer:"footer",footerEnd:"footer-end",footerStart:"footer-start",footerActions:"footer-actions"}}}]);
//# sourceMappingURL=components-flow-flow-stories.e469746f.iframe.bundle.js.map