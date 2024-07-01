"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[8499],{"./src/components/accordion/accordion.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,longHeading_MediumIconForLargeAccordionItem_TestOnly:()=>longHeading_MediumIconForLargeAccordionItem_TestOnly,simple:()=>simple,transparentAppearance_TestOnly:()=>transparentAppearance_TestOnly,withActions:()=>withActions,withIconStartAndEnd_TestOnly:()=>withIconStartAndEnd_TestOnly});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./.storybook/placeholderImage.ts"),_storybook_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/helpers.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/resources.ts");const{scale,appearance,selectionMode}=_storybook_resources__WEBPACK_IMPORTED_MODULE_3__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Accordion",args:{scale:scale.defaultValue,appearance:appearance.defaultValue,selectionMode:selectionMode.defaultValue,heading:"Heading",description:"Description for item",iconStart:"",iconEnd:""},argTypes:{scale:{options:scale.values,control:{type:"select"}},appearance:{options:appearance.values.filter((option=>"outline"!==option&&"outline-fill"!==option)),control:{type:"select"}},selectionMode:{options:selectionMode.values.filter((option=>"none"!==option&&"children"!==option&&"multichildren"!==option&&"ancestors"!==option)),control:{type:"select"}},iconStart:{options:_storybook_helpers__WEBPACK_IMPORTED_MODULE_1__.k,control:{type:"select"}},iconEnd:{options:_storybook_helpers__WEBPACK_IMPORTED_MODULE_1__.k,control:{type:"select"}}},parameters:{backgrounds:{values:[{name:"transparent",value:"#0000ffff"}]}}},accordionItemContent=`Custom content here<br/><img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:200,height:133})}"><br/>More custom content here`,simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-accordion scale="${args.scale}" appearance="${args.appearance}" selection-mode="${args.selectionMode}">
    <calcite-accordion-item
      heading="${args.heading}"
      description="${args.description}"
      icon-start="${args.iconStart}"
      icon-end="${args.iconEnd}"
    >
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${args.heading}"
      description="${args.description}"
      icon-start="${args.iconStart}"
      icon-end="${args.iconEnd}"
    >
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${args.heading}"
      description="${args.description}"
      icon-start="${args.iconStart}"
      icon-end="${args.iconEnd}"
    >
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="${args.heading}"
      description="${args.description}"
      icon-start="${args.iconStart}"
      icon-end="${args.iconEnd}"
      expanded
    >
      ${accordionItemContent}
    </calcite-accordion-item>
  </calcite-accordion>
`,withActions=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-accordion scale="s">
    <calcite-accordion-item scale="m" heading="Accordion Item 1">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${accordionItemContent}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 2" expanded>
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      >${accordionItemContent}
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-start"></calcite-action>
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
    <calcite-accordion-item scale="m" heading="Accordion Item 3">
      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action
      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>
      >${accordionItemContent}
      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>
    </calcite-accordion-item>
  </calcite-accordion>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-accordion scale="m" appearance="solid" selection-mode="multiple" class="calcite-mode-dark" dir="rtl">
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
      ${accordionItemContent}
    </calcite-accordion-item>
  </calcite-accordion>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const transparentAppearance_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item">
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" expanded>
      ${accordionItemContent}
    </calcite-accordion-item>
  </calcite-accordion>
`,withIconStartAndEnd_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-end="cars">
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="plane" icon-end="plane">
      ${accordionItemContent}
    </calcite-accordion-item>
    <calcite-accordion-item
      heading="Heading"
      description="Description for item"
      icon-start="biking"
      icon-end="biking"
      expanded
    >
      ${accordionItemContent}
    </calcite-accordion-item>
  </calcite-accordion>
`,accordionItemsIconHeaderUseCases=[{icon:"",heading:"Simple item with heading",description:""},{icon:"",heading:"Simple item with heading",description:"Simple item with description"},{icon:"embark",heading:"Embark_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_",description:"Extra long heading with underscores and icons m /scale l"},{icon:"car",heading:"Extra long description with underscores and icons m /scale l",description:"Car_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_Watercraft_title_is_super_long_what_do_we_do_now_"},{icon:"plane",heading:"Extra long description and icons m /scale l",description:"Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets. Planes, helicopters, and jets."}].map((useCase=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`<calcite-accordion-item
        icon-start="${useCase.icon}"
        icon-end="${useCase.icon}"
        scale="l"
        heading="${useCase.heading}"
        description="${useCase.description}"
      ></calcite-accordion-item>`)).join(""),longHeading_MediumIconForLargeAccordionItem_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-accordion scale="l" style="width: 600px"> ${accordionItemsIconHeaderUseCases} </calcite-accordion>
`;simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: AccordionStoryArgs): string => html`\n  <calcite-accordion scale="${args.scale}" appearance="${args.appearance}" selection-mode="${args.selectionMode}">\n    <calcite-accordion-item\n      heading="${args.heading}"\n      description="${args.description}"\n      icon-start="${args.iconStart}"\n      icon-end="${args.iconEnd}"\n    >\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item\n      heading="${args.heading}"\n      description="${args.description}"\n      icon-start="${args.iconStart}"\n      icon-end="${args.iconEnd}"\n    >\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item\n      heading="${args.heading}"\n      description="${args.description}"\n      icon-start="${args.iconStart}"\n      icon-end="${args.iconEnd}"\n    >\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item\n      heading="${args.heading}"\n      description="${args.description}"\n      icon-start="${args.iconStart}"\n      icon-end="${args.iconEnd}"\n      expanded\n    >\n      ${accordionItemContent}\n    </calcite-accordion-item>\n  </calcite-accordion>\n`',...simple.parameters?.docs?.source}}},withActions.parameters={...withActions.parameters,docs:{...withActions.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-accordion scale="s">\n    <calcite-accordion-item scale="m" heading="Accordion Item 1">\n      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action\n      >${accordionItemContent}\n      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>\n      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>\n    </calcite-accordion-item>\n    <calcite-accordion-item scale="m" heading="Accordion Item 2" expanded>\n      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action\n      >${accordionItemContent}\n      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-start"></calcite-action>\n      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>\n    </calcite-accordion-item>\n    <calcite-accordion-item scale="m" heading="Accordion Item 3">\n      <calcite-action scale="s" icon="brush-tip" label="Paint" slot="actions-start"></calcite-action\n      <calcite-action scale="s" icon="banana" label="Banana" slot="actions-end"></calcite-action>\n      >${accordionItemContent}\n      <calcite-action scale="s" icon="sound" label="Volume" slot="actions-end"></calcite-action>\n    </calcite-accordion-item>\n  </calcite-accordion>\n`',...withActions.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-accordion scale="m" appearance="solid" selection-mode="multiple" class="calcite-mode-dark" dir="rtl">\n    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana">\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>\n      ${accordionItemContent}\n    </calcite-accordion-item>\n  </calcite-accordion>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},transparentAppearance_TestOnly.parameters={...transparentAppearance_TestOnly.parameters,docs:{...transparentAppearance_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">\n    <calcite-accordion-item heading="Heading" description="Description for item">\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item heading="Heading" description="Description for item">\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item heading="Heading" description="Description for item">\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item heading="Heading" description="Description for item" expanded>\n      ${accordionItemContent}\n    </calcite-accordion-item>\n  </calcite-accordion>\n`',...transparentAppearance_TestOnly.parameters?.docs?.source}}},withIconStartAndEnd_TestOnly.parameters={...withIconStartAndEnd_TestOnly.parameters,docs:{...withIconStartAndEnd_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-accordion scale="m" selection-mode="multiple" appearance="transparent">\n    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="banana" expanded>\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item heading="Heading" description="Description for item" icon-end="cars">\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item heading="Heading" description="Description for item" icon-start="plane" icon-end="plane">\n      ${accordionItemContent}\n    </calcite-accordion-item>\n    <calcite-accordion-item\n      heading="Heading"\n      description="Description for item"\n      icon-start="biking"\n      icon-end="biking"\n      expanded\n    >\n      ${accordionItemContent}\n    </calcite-accordion-item>\n  </calcite-accordion>\n`',...withIconStartAndEnd_TestOnly.parameters?.docs?.source}}},longHeading_MediumIconForLargeAccordionItem_TestOnly.parameters={...longHeading_MediumIconForLargeAccordionItem_TestOnly.parameters,docs:{...longHeading_MediumIconForLargeAccordionItem_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-accordion scale="l" style="width: 600px"> ${accordionItemsIconHeaderUseCases} </calcite-accordion>\n`',...longHeading_MediumIconForLargeAccordionItem_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["simple","withActions","darkModeRTL_TestOnly","transparentAppearance_TestOnly","withIconStartAndEnd_TestOnly","longHeading_MediumIconForLargeAccordionItem_TestOnly"]},"./.storybook/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>iconNames});var _esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@esri/calcite-ui-icons/index.js");const iconNames=Object.keys(_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))).sort(((a,b)=>{const iPrefixedNumberIconNamePattern=/^i(\d)/;return a.replace(iPrefixedNumberIconNamePattern,"$1").localeCompare(b.replace(iPrefixedNumberIconNamePattern,"$1"))}))},"./.storybook/placeholderImage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function placeholderImage({width=300,height=150,text=`${width}×${height}`,fontFamily="sans-serif",fontWeight="bold",fontSize=Math.floor(.2*Math.min(width,height)),dy=.35*fontSize,bgColor="#ddd",textColor="rgba(0,0,0,0.5)",dataUri=!0,charset="UTF-8"}){const cleaned=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    <rect fill="${bgColor}" width="${width}" height="${height}"/>\n    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>\n  </svg>`.replace(/[\t\n\r]/gim,"").replace(/\s\s+/g," ").replace(/'/gim,"\\i");if(dataUri){return`data:image/svg+xml;charset=${charset},${encodeURIComponent(cleaned).replace(/\(/g,"%28").replace(/\)/g,"%29")}`}return cleaned}__webpack_require__.d(__webpack_exports__,{j:()=>placeholderImage})},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-accordion-accordion-stories.5ed1c0c1.iframe.bundle.js.map