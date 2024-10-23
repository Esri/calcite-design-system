"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[4626],{"./src/custom-theme.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>custom_theme_stories,theming:()=>theming,themingInteractive:()=>themingInteractive});var cssTokenValues=__webpack_require__("./src/tests/utils/cssTokenValues.ts"),formatting=__webpack_require__("./support/formatting.ts");const actionBar=formatting.q`<calcite-action-bar layout="horizontal" style="width:100%">
  <calcite-action-group>
    <calcite-action text="Add" icon="plus"> </calcite-action>
    <calcite-action text="Save" icon="save"> </calcite-action>
    <calcite-action text="Layers" icon="layers"> </calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Add" icon="plus"> </calcite-action>
    <calcite-action text="Save" active icon="save"> </calcite-action>
    <calcite-action text="Layers" icon="layers"> </calcite-action>
  </calcite-action-group>
  <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
  <!-- The "bottom-actions" slot is deprecated -->
  <calcite-action slot="bottom-actions" text="hello world 2" icon="information"> </calcite-action>
</calcite-action-bar>`,actionMenu=formatting.q`<calcite-action-menu open>
  <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
  <calcite-action-group>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action
    ><calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
  </calcite-action-group>
  <calcite-action-group> <calcite-action text="Table" icon="table" text-enabled></calcite-action></calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Save" icon="save" text-enabled></calcite-action>
  </calcite-action-group>
</calcite-action-menu>`,actionPad=formatting.q`<calcite-action-pad expanded>
  <calcite-action-group>
    <calcite-action text="Add to my custom action pad application" icon="plus"></calcite-action>
    <calcite-action text="Save to my custom action pad application" icon="save"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Layers in my custom action pad application" icon="layers"></calcite-action>
  </calcite-action-group>
</calcite-action-pad>`,SLOTS_title="title",SLOTS_message="message",alert_alert=formatting.q`<calcite-alert label="this is a default alert" scale="s" open>
  <div slot="${SLOTS_title}">Test title</div>
  <div slot="${SLOTS_message}">Test message</div>
</calcite-alert>`;var placeholder_image=__webpack_require__("./.storybook/placeholder-image.ts");const tree=formatting.q`<calcite-tree lines>
  <calcite-tree-item> Child 1 </calcite-tree-item>
  <calcite-tree-item>
    Child 2
    <calcite-tree slot="children">
      <calcite-tree-item> Grandchild 1 </calcite-tree-item>
      <calcite-tree-item>
        Grandchild 2
        <calcite-tree slot="children">
          <calcite-tree-item> Great-Grandchild 1 </calcite-tree-item>
          <calcite-tree-item> Great-Grandchild 2 </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item> Child 3 </calcite-tree-item>
</calcite-tree>`,accordion=formatting.q`<style>
    calcite-accordion-item:hover {
      --calcite-accordion-item-background-color: white;
    }
    calcite-accordion-item[expanded] {
      --calcite-accordion-item-header-background-color: #ccc;
    }</style
  ><calcite-accordion>
    ${[0,1,2,3,4].map((idx=>(idx=>formatting.q`<calcite-accordion-item heading="${0===idx?"Accordion Item":`Accordion Item ${idx+1}`}"
    ><img src="${(0,placeholder_image.j)({width:300,height:200})}" />
  </calcite-accordion-item>`)(idx))).join("\n")}
    <calcite-accordion-item heading="Accordion Item 5" expanded>${tree}</calcite-accordion-item>
  </calcite-accordion>`,buttonProps=["",""],button_button=props=>{const[buttonArgs,content]=Object.entries(props).filter((([key,value])=>key&&value&&""!==value)).reduce((([args,content],[key,value])=>[args+=`${key}="${value}" `,content+=`${value} `]),buttonProps);return formatting.q`<calcite-button ${buttonArgs.trim()}>${content.trim()}</calcite-button>`},buttons=formatting.q`${button_button({appearance:"outline"})} ${button_button({kind:"danger"})}`,calciteSwitch=formatting.q`
  <calcite-label layout="inline">
    <calcite-switch scale="m" checked></calcite-switch>
    Red switch scale medium
  </calcite-label>
`,thumbnailHtml=formatting.q`<img
  alt="thumbnail"
  slot="thumbnail"
  src="${(0,placeholder_image.j)({width:380,height:180})}"
  style="width: 380px;"
/> `,card=formatting.q`<calcite-card selected selectable>
  <img alt="thumbnail" slot="thumbnail" style="width:260px" src="${(0,placeholder_image.j)({width:260,height:160})}" />
  <h3 slot="title">Selectable card</h3>
  <calcite-link slot="footer-start">Lead füt</calcite-link>
  <calcite-link slot="footer-end">Trail füt</calcite-link>
</calcite-card>`,cardThumbnail=formatting.q`<div id="card-container" style="width:260px;">
  <calcite-card>
    ${thumbnailHtml}
    <h3 slot="heading">Portland Businesses</h3>
    <span slot="description"
      >by
      <calcite-link>example_user</calcite-link>
    </span>
    <div>
      Created: Apr 22, 2019
      <br />
      Updated: Dec 9, 2019
      <br />
      View Count: 0
    </div>
    <calcite-button
      slot="footer-start"
      kind="neutral"
      scale="s"
      id="card-icon-test-1"
      icon-start="circle"
    ></calcite-button>
  </calcite-card>
</div>`,checkbox_checkbox=formatting.q`<label>
  <calcite-checkbox indeterminate></calcite-checkbox>
  Initially indeterminate and unchecked
</label>`,chips=formatting.q`<div>
    <calcite-chip>Neutral</calcite-chip>
    <calcite-chip kind="inverse">Inverse</calcite-chip>
    <calcite-chip kind="brand">Brand</calcite-chip>
  </div>
  <div>
    <calcite-chip appearance="outline-fill">Neutral</calcite-chip>
    <calcite-chip appearance="outline-fill" kind="inverse">Inverse</calcite-chip>
    <calcite-chip appearance="outline-fill" kind="brand">Brand</calcite-chip>
  </div>
  <div>
    <calcite-chip appearance="outline">Neutral</calcite-chip>
    <calcite-chip appearance="outline" kind="inverse">Inverse</calcite-chip>
    <calcite-chip appearance="outline" kind="brand">Brand</calcite-chip>
  </div>`,datePicker=formatting.q`<calcite-date-picker scale="m" value="2020-11-27"></calcite-date-picker>`,dropdown=formatting.q`<calcite-dropdown>
  <calcite-button slot="trigger">Primary</calcite-button>
  <calcite-dropdown-group group-title="View">
    <calcite-dropdown-item icon-start="list-bullet" selected>List</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="grid">Grid</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>`,handle=formatting.q`<calcite-handle></calcite-handle>`,icon=formatting.q`<calcite-icon icon="3d-glasses"></calcite-icon>`,input=formatting.q`<calcite-input
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input>`,inputNumber=formatting.q`<calcite-input-number
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input-number>`,inputText=formatting.q`<calcite-input-text
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input-text>`,loader=formatting.q`<calcite-loader class="chromatic-ignore"></calcite-loader>`,notice=({kind,message,title})=>formatting.q`<calcite-notice kind=${kind} scale="s" open closable>
    <div slot="title">${title}</div>
    <div slot="message">${message}</div>
    ${"danger"===kind?formatting.q`<calcite-link slot="link" title="my action">Retry</calcite-link>`:null}
  </calcite-notice>`,notices=formatting.q`${notice({kind:"danger",message:"There was an error while performing the task.",title:"Something failed"})}
${notice({kind:"success",message:"That thing you wanted to do worked as expected",title:"Something worked"})}`,pagination=formatting.q`<calcite-pagination
  total-items="1200"
  page-size="100"
  start-item="1"
></calcite-pagination>`,popover=formatting.q`
  <calcite-label layout="inline">
    <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button>
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="l"
    >
      <div style="width: 300px; padding:12px 16px;">
        <b>I am a title!</b> <br />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </div>
    </calcite-popover>
  </calcite-label>
`,progress=formatting.q`
  <calcite-label layout="inline">
    <calcite-progress text="optional text" type="determinate" value="0.5"></calcite-progress>
  </calcite-label>
`,segmentedControl=formatting.q`<calcite-label>
  Segmented Control
  <calcite-segmented-control>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item> </calcite-segmented-control
  ><calcite-label></calcite-label
></calcite-label>`,slider=formatting.q`<calcite-slider
  min="0"
  max="100"
  min-value="50"
  max-value="85"
  step="1"
  min-label="Temperature range (lower)"
  max-label="Temperature range (upper)"
></calcite-slider>`,tabs=formatting.q`<calcite-tabs>
  <calcite-tab-nav slot="title-group">
    <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
    <calcite-tab-title>Tab 2 Title</calcite-tab-title>
    <calcite-tab-title>Tab 3 Title</calcite-tab-title>
    <calcite-tab-title>Tab 4 Title</calcite-tab-title>
  </calcite-tab-nav>
</calcite-tabs>`,textArea=formatting.q`<calcite-text-area placeholder="testing" max-length="10"></calcite-text-area>`,avatarInitials=formatting.q`<calcite-avatar full-name="Urbano Monti"></calcite-avatar>`,avatarIcon=formatting.q`<calcite-avatar user-id="umonti"></calcite-avatar>`,avatarThumbnail=formatting.q`<calcite-avatar
  thumbnail="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
></calcite-avatar>`,globalTokens={calciteColorBrand:"#007ac2",calciteColorBrandHover:"#00619b",calciteColorBrandPress:"#004874",calciteColorStatusInfo:"#00619b",calciteColorStatusSuccess:"#35ac46",calciteColorStatusWarning:"#edd317",calciteColorStatusDanger:"#d83020",calciteColorStatusDangerHover:"#a82b1e",calciteColorStatusDangerPress:"#7c1d13",calciteColorBackground:"#f8f8f8",calciteColorForeground1:"#ffffff",calciteColorForeground2:"#f3f3f3",calciteColorForeground3:"#eaeaea",calciteColorText1:"#151515",calciteColorText2:"#4a4a4a",calciteColorText3:"#6a6a6a",calciteColorTextInverse:"#ffffff",calciteColorTextLink:"#00619b",calciteColorBorder1:"#cacaca",calciteColorBorder2:"#d4d4d4",calciteColorBorder3:"#dfdfdf",calciteColorBorderInput:"#949494",calciteUiIconColor:"currentColor"};function convertToParamCase(str){return str.replace(/([A-Z])/g,"-$1").toLowerCase()}const kitchenSink=(args,useTestValues=!1)=>formatting.q`<div style="${function customTheme(args,useTestValues=!1){if(useTestValues){const tokensAsCSSVars=Object.keys(args).map((tokenName=>`--${convertToParamCase(tokenName)}`));return(0,cssTokenValues.z)(tokensAsCSSVars," ")}return Object.entries(args).map((([tokenName,tokenValue])=>tokenValue&&""!==tokenValue?`--${convertToParamCase(tokenName)}: ${tokenValue};`:null)).filter((token=>token)).join("")}(args,useTestValues)}">
    <style>
      .demo {
        display: flex;
        align-items: flex-start;
      }
      .demo-column {
        flex: 0;
        width: 320px;
      }
      .demo-column + .demo-column {
        margin-left: 4rem;
      }
      .demo-column > * {
        margin-bottom: 2rem;
      }
    </style>
    <div class="demo">
        <div class="demo-column">
          ${accordion} ${actionBar} ${notices} ${segmentedControl}
          <div style="display: flex">
            ${actionPad}
            <div style="width: 40px; height: 40px;">${actionMenu}</div>
            ${icon}
          </div>
          ${input} ${inputNumber} ${inputText}
        </div>
        <div class="demo-column">
          <div>${card}</div>
          ${cardThumbnail}
          <div>${dropdown} ${buttons}</div>
          <div>${checkbox_checkbox}</div>
          ${chips} ${pagination} ${slider}
        </div>
        <div class="demo-column">${datePicker} ${tabs} ${loader} ${calciteSwitch} ${avatarIcon} ${avatarInitials} ${avatarThumbnail} ${progress} ${handle} ${textArea} ${popover}</div>
        ${alert_alert}
      </div>
    </div>
  </div>`,componentTokens={...globalTokens,CalciteAccordionBorderColor:"",CalciteAccordionBackgroundColor:"",calciteAccordionItemBackgroundColor:"",calciteAccordionItemBorderColor:"",calciteAccordionItemContentSpace:"",calciteAccordionItemEndIconColor:"",calciteAccordionItemExpandIconColor:"",calciteAccordionItemHeaderBackgroundColor:"",calciteAccordionItemHeadingTextColor:"",calciteAccordionItemIconColor:"",calciteAccordionItemStartIconColor:"",calciteAccordionItemTextColor:"",calciteActionIndicatorColor:"",calciteActionBackgroundColor:"",calciteActionBackgroundColorHover:"",calciteActionBackgroundColorPressed:"",calciteActionTextColor:"",calciteActionTextColorPressed:"",calciteActionBarExpandedMaxWidth:"",calciteActionBarItemsSpace:"",calciteActionGroupBorderColor:"",calciteActionGroupColumns:"",calciteActionMenuItemsSpace:"",calciteActionPadCornerRadius:"",calciteActionPadExpandedMaxWidth:"",calciteActionPadItemsSpace:"",calciteAvatarCornerRadius:"",calciteAvatarColor:"",calciteAvatarBackgroundColor:"",calciteCardAccentColorSelected:"",calciteCardBackgroundColor:"",calciteCardBorderColor:"",calciteCardSelectIndicatorColorHover:"",calciteCardSelectIndicatorColor:"",calciteCardCornerRadius:"",calciteCardShadow:"",calciteAlertWidth:"",calciteAlertBackgroundColor:"",calciteAlertCornerRadius:"",calciteAlertShadow:"",calciteChipBackgroundColor:"",calciteChipBorderColor:"",calciteChipCornerRadius:"",calciteChipTextColor:"",calciteChipIconColor:"",calciteChipCloseIconColor:"",calciteChipSelectIconColor:"",calciteChipSelectIconColorPressed:"",calciteCheckboxSize:"",calciteCheckboxColor:"",calciteCheckboxBorderColor:"",calciteHandleBackgroundColor:"",calciteHandleBackgroundColorHover:"",calciteHandleBackgroundColorSelected:"",calciteHandleIconColor:"",calciteHandleIconColorHover:"",calciteHandleIconColorSelected:"",calcitePopoverBackgroundColor:"",calcitePopoverBorderColor:"",calcitePopoverCornerRadius:"",calcitePopoverTextColor:"",calcitePopoverZIndex:"",calciteProgressBackgroundColor:"",calciteProgressFillColor:"",calciteProgressTextColor:"",calciteInputPrefixSize:"",calciteInputSuffixSize:"",calciteTextAreaBackgroundColor:"",calciteTextAreaBorderColor:"",calciteTextAreaCharacterLimitTextColor:"",calciteTextAreaDividerColor:"",calciteTextAreaFontSize:"",calciteTextAreaFooterBorderColor:"",calciteTextAreaMaxHeight:"",calciteTextAreaMinHeight:"",calciteTextAreaMaxWidth:"",calciteTextAreaMinWidth:"",calciteTextAreaTextColor:""},custom_theme_stories={title:"Theming/Custom Theme",args:{...globalTokens,...componentTokens}},themingInteractive=args=>kitchenSink(args),theming=()=>kitchenSink({...componentTokens},!0),__namedExportsOrder=["themingInteractive","theming"];themingInteractive.parameters={...themingInteractive.parameters,docs:{...themingInteractive.parameters?.docs,source:{originalSource:"(args: Record<string, string>): string => {\n  return kitchenSink(args);\n}",...themingInteractive.parameters?.docs?.source}}},theming.parameters={...theming.parameters,docs:{...theming.parameters?.docs,source:{originalSource:"(): string => {\n  return kitchenSink({\n    ...componentTokens\n  }, true);\n}",...theming.parameters?.docs?.source}}}},"./.storybook/placeholder-image.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function placeholderImage({width=300,height=150,text=`${width}×${height}`,fontFamily="sans-serif",fontWeight="bold",fontSize=Math.floor(.2*Math.min(width,height)),dy=.35*fontSize,bgColor="#ddd",textColor="rgba(0,0,0,0.5)",dataUri=!0,charset="UTF-8"}){const cleaned=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    <rect fill="${bgColor}" width="${width}" height="${height}"/>\n    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>\n  </svg>`.replace(/[\t\n\r]/gim,"").replace(/\s\s+/g," ").replace(/'/gim,"\\i");if(dataUri){return`data:image/svg+xml;charset=${charset},${encodeURIComponent(cleaned).replace(/\(/g,"%28").replace(/\)/g,"%29")}`}return cleaned}__webpack_require__.d(__webpack_exports__,{j:()=>placeholderImage})},"./src/tests/utils/cssTokenValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function setCSSVariables(tokens,join="\n"){return tokens.map((token=>`${token}: ${function getTokenValue(token){const tokenValueMap={background$:"rgb(252, 244, 52)","text-color$":"rgb(239, 118, 39)","border-color$":"rgb(156, 89, 209)","background-color$":"rgb(252, 244, 52)",color$:"rgb(0, 191, 255)",hover$:"rgb(255, 105, 180)",pressed$:"rgb(44, 44, 44)",selected$:"rgb(156, 89, 209)",shadow$:"rgb(255, 255, 255) 0px 0px 0px 4px, rgb(255, 105, 180) 0px 0px 0px 5px inset, rgb(0, 191, 255) 0px 0px 0px 9px","(z-index)$":"42","(columns|gap|height|offset|radius|size|size-y|size-x|space|space-x|space-y|width)":"42px"},match=Object.entries(tokenValueMap).find((([regexStr])=>new RegExp(regexStr,"g").test(token)));return match?match[1]:(console.warn("token not found in tokenValueMap",token),tokenValueMap.color$)}(token)};`)).join(join)}__webpack_require__.d(__webpack_exports__,{z:()=>setCSSVariables})}}]);
//# sourceMappingURL=custom-theme-stories.5a413d7e.iframe.bundle.js.map