"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[1019],{"./src/components/menu/menu.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WithSubmenuOpenInVerticalLayout_TestOnly:()=>WithSubmenuOpenInVerticalLayout_TestOnly,WithSubmenuOpen_TestOnly:()=>WithSubmenuOpen_TestOnly,__namedExportsOrder:()=>__namedExportsOrder,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,iconsAndBreadcrumb:()=>iconsAndBreadcrumb,iconsAndBreadcrumbVertical_TestOnly:()=>iconsAndBreadcrumbVertical_TestOnly,simple:()=>simple,verticalComplexUseCase_TestOnly:()=>verticalComplexUseCase_TestOnly,verticalLayoutInDarkModeRTL_TestOnly:()=>verticalLayoutInDarkModeRTL_TestOnly,withNesting:()=>withNesting});var _support_formatting__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/resources.ts");const{layout}=_storybook_resources__WEBPACK_IMPORTED_MODULE_1__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Menu",args:{layout:layout.defaultValue},argTypes:{layout:{options:layout.values.filter((option=>"grid"!==option&&"inline"!==option&&"center"!==option&&"auto"!==option&&"fixed"!==option&&"none"!==option&&"horizontal-single"!==option)),control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-menu layout="${args.layout}">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>
`,iconsAndBreadcrumb=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-menu>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 1"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 2"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      icon-end="layer"
      text="Example item 3"
      active
      text-enabled
    ></calcite-menu-item>
  </calcite-menu>`,iconsAndBreadcrumbVertical_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-menu layout="vertical">
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 1"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 2"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      icon-end="layer"
      text="Example item 3"
      active
      text-enabled
    ></calcite-menu-item>
  </calcite-menu>`,withNesting=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-panel>
    <calcite-menu layout="horizontal">
      <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
      <calcite-menu-item text="Example item 3" text-enabled open>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled></calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>
      </calcite-menu-item>
      <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item></calcite-menu
  ></calcite-panel>`,WithSubmenuOpen_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-menu>
    <calcite-menu-item text="Item" href="#item" open>
      <calcite-menu-item text="item1" slot="submenu-item" active></calcite-menu-item>
      <calcite-menu-item text="item2" slot="submenu-item"></calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Item 2" href="#item"></calcite-menu-item>
    <calcite-menu-item text="Item 3" href="#item"></calcite-menu-item>
  </calcite-menu>`,WithSubmenuOpenInVerticalLayout_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-menu layout="vertical">
    <calcite-menu-item text="Item" href="#item" open>
      <calcite-menu-item text="item1" slot="submenu-item" active></calcite-menu-item>
      <calcite-menu-item text="item2" slot="submenu-item"></calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Item 2" href="#item"></calcite-menu-item>
    <calcite-menu-item text="Item 3" href="#item"></calcite-menu-item>
  </calcite-menu>`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-menu dir="rtl" class="calcite-mode-dark">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>`,verticalComplexUseCase_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-shell-panel width-scale="l">
    <calcite-panel heading="Extreme nested vertical menu">
      <calcite-menu layout="vertical">
        <calcite-menu-item icon-start="layer" icon-end="layer" text="Home"></calcite-menu-item>
        <calcite-menu-item
          icon-start="layer"
          icon-end="layer"
          href="#"
          text="Example nested"
          icon-start="layer"
          breadcrumb
        >
          <calcite-menu-item icon-end="layer" icon-start="layer" slot="submenu-item" text="Capabilities">
          </calcite-menu-item>
          <calcite-menu-item icon-start="layer" slot="submenu-item" title text="ArcGIS Online" breadcrumb open>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities">
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item text="Example nested" icon-start="layer" icon-end="layer" breadcrumb open>
          <calcite-menu-item slot="submenu-item" title text="ArcGIS Online" breadcrumb open>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" breadcrumb>
            </calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Capabilities" open>
              <calcite-menu-item slot="submenu-item" text="Capabilities" icon-end="layer"></calcite-menu-item>
              <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>
            </calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Something else"></calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Another thing">
              <calcite-menu-item slot="submenu-item" text="Great examples">
                <calcite-menu-item slot="submenu-item" text="Great examples" breadcrumb></calcite-menu-item>
                <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>
                <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
              </calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item href="#" slot="submenu-item" text="It's stupendous" open>
            <calcite-menu-item slot="submenu-item" text="Very nice example"></calcite-menu-item>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Short one" open>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Another thing" open>
                <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" open>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                </calcite-menu-item>
              </calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>
        <calcite-menu-item text="Reference" active></calcite-menu-item>
        <calcite-menu-item text="Reference"></calcite-menu-item>
        <calcite-menu-item text="Reference"></calcite-menu-item>
      </calcite-menu>
    </calcite-panel>
  </calcite-shell-panel>`,verticalLayoutInDarkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-menu layout="vertical" dir="rtl" class="calcite-mode-dark">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>`,__namedExportsOrder=["simple","iconsAndBreadcrumb","iconsAndBreadcrumbVertical_TestOnly","withNesting","WithSubmenuOpen_TestOnly","WithSubmenuOpenInVerticalLayout_TestOnly","darkModeRTL_TestOnly","verticalComplexUseCase_TestOnly","verticalLayoutInDarkModeRTL_TestOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: MenuStoryArgs): string => html`\n  <calcite-menu layout="${args.layout}">\n    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>\n    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>\n    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>\n  </calcite-menu>\n`',...simple.parameters?.docs?.source}}},iconsAndBreadcrumb.parameters={...iconsAndBreadcrumb.parameters,docs:{...iconsAndBreadcrumb.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu>\n    <calcite-menu-item\n      icon-start="layer"\n      breadcrumb\n      icon-end="layer"\n      text="Example item 1"\n      text-enabled\n    ></calcite-menu-item>\n    <calcite-menu-item\n      icon-start="layer"\n      breadcrumb\n      icon-end="layer"\n      text="Example item 2"\n      text-enabled\n    ></calcite-menu-item>\n    <calcite-menu-item\n      icon-start="layer"\n      icon-end="layer"\n      text="Example item 3"\n      active\n      text-enabled\n    ></calcite-menu-item>\n  </calcite-menu>`',...iconsAndBreadcrumb.parameters?.docs?.source}}},iconsAndBreadcrumbVertical_TestOnly.parameters={...iconsAndBreadcrumbVertical_TestOnly.parameters,docs:{...iconsAndBreadcrumbVertical_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu layout="vertical">\n    <calcite-menu-item\n      icon-start="layer"\n      breadcrumb\n      icon-end="layer"\n      text="Example item 1"\n      text-enabled\n    ></calcite-menu-item>\n    <calcite-menu-item\n      icon-start="layer"\n      breadcrumb\n      icon-end="layer"\n      text="Example item 2"\n      text-enabled\n    ></calcite-menu-item>\n    <calcite-menu-item\n      icon-start="layer"\n      icon-end="layer"\n      text="Example item 3"\n      active\n      text-enabled\n    ></calcite-menu-item>\n  </calcite-menu>`',...iconsAndBreadcrumbVertical_TestOnly.parameters?.docs?.source}}},withNesting.parameters={...withNesting.parameters,docs:{...withNesting.parameters?.docs,source:{originalSource:'(): string => html`<calcite-panel>\n    <calcite-menu layout="horizontal">\n      <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>\n      <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>\n      <calcite-menu-item text="Example item 3" text-enabled open>\n        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>\n        <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>\n          <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>\n          <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled></calcite-menu-item>\n          <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>\n        </calcite-menu-item>\n        <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>\n      </calcite-menu-item>\n      <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item></calcite-menu\n  ></calcite-panel>`',...withNesting.parameters?.docs?.source}}},WithSubmenuOpen_TestOnly.parameters={...WithSubmenuOpen_TestOnly.parameters,docs:{...WithSubmenuOpen_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu>\n    <calcite-menu-item text="Item" href="#item" open>\n      <calcite-menu-item text="item1" slot="submenu-item" active></calcite-menu-item>\n      <calcite-menu-item text="item2" slot="submenu-item"></calcite-menu-item>\n    </calcite-menu-item>\n    <calcite-menu-item text="Item 2" href="#item"></calcite-menu-item>\n    <calcite-menu-item text="Item 3" href="#item"></calcite-menu-item>\n  </calcite-menu>`',...WithSubmenuOpen_TestOnly.parameters?.docs?.source}}},WithSubmenuOpenInVerticalLayout_TestOnly.parameters={...WithSubmenuOpenInVerticalLayout_TestOnly.parameters,docs:{...WithSubmenuOpenInVerticalLayout_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu layout="vertical">\n    <calcite-menu-item text="Item" href="#item" open>\n      <calcite-menu-item text="item1" slot="submenu-item" active></calcite-menu-item>\n      <calcite-menu-item text="item2" slot="submenu-item"></calcite-menu-item>\n    </calcite-menu-item>\n    <calcite-menu-item text="Item 2" href="#item"></calcite-menu-item>\n    <calcite-menu-item text="Item 3" href="#item"></calcite-menu-item>\n  </calcite-menu>`',...WithSubmenuOpenInVerticalLayout_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu dir="rtl" class="calcite-mode-dark">\n    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>\n    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>\n    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>\n  </calcite-menu>`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},verticalComplexUseCase_TestOnly.parameters={...verticalComplexUseCase_TestOnly.parameters,docs:{...verticalComplexUseCase_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-shell-panel width-scale="l">\n    <calcite-panel heading="Extreme nested vertical menu">\n      <calcite-menu layout="vertical">\n        <calcite-menu-item icon-start="layer" icon-end="layer" text="Home"></calcite-menu-item>\n        <calcite-menu-item\n          icon-start="layer"\n          icon-end="layer"\n          href="#"\n          text="Example nested"\n          icon-start="layer"\n          breadcrumb\n        >\n          <calcite-menu-item icon-end="layer" icon-start="layer" slot="submenu-item" text="Capabilities">\n          </calcite-menu-item>\n          <calcite-menu-item icon-start="layer" slot="submenu-item" title text="ArcGIS Online" breadcrumb open>\n            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities">\n              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>\n              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>\n              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>\n            </calcite-menu-item>\n          </calcite-menu-item>\n        </calcite-menu-item>\n        <calcite-menu-item text="Example nested" icon-start="layer" icon-end="layer" breadcrumb open>\n          <calcite-menu-item slot="submenu-item" title text="ArcGIS Online" breadcrumb open>\n            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" breadcrumb>\n            </calcite-menu-item>\n            <calcite-menu-item slot="submenu-item" text="Capabilities" open>\n              <calcite-menu-item slot="submenu-item" text="Capabilities" icon-end="layer"></calcite-menu-item>\n              <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>\n            </calcite-menu-item>\n            <calcite-menu-item slot="submenu-item" text="Something else"></calcite-menu-item>\n            <calcite-menu-item slot="submenu-item" text="Another thing">\n              <calcite-menu-item slot="submenu-item" text="Great examples">\n                <calcite-menu-item slot="submenu-item" text="Great examples" breadcrumb></calcite-menu-item>\n                <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>\n                <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>\n              </calcite-menu-item>\n            </calcite-menu-item>\n          </calcite-menu-item>\n          <calcite-menu-item href="#" slot="submenu-item" text="It\'s stupendous" open>\n            <calcite-menu-item slot="submenu-item" text="Very nice example"></calcite-menu-item>\n            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Short one" open>\n              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Another thing" open>\n                <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" open>\n                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>\n                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>\n                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>\n                </calcite-menu-item>\n              </calcite-menu-item>\n            </calcite-menu-item>\n          </calcite-menu-item>\n          <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>\n        </calcite-menu-item>\n        <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>\n        <calcite-menu-item text="Reference" active></calcite-menu-item>\n        <calcite-menu-item text="Reference"></calcite-menu-item>\n        <calcite-menu-item text="Reference"></calcite-menu-item>\n      </calcite-menu>\n    </calcite-panel>\n  </calcite-shell-panel>`',...verticalComplexUseCase_TestOnly.parameters?.docs?.source}}},verticalLayoutInDarkModeRTL_TestOnly.parameters={...verticalLayoutInDarkModeRTL_TestOnly.parameters,docs:{...verticalLayoutInDarkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu layout="vertical" dir="rtl" class="calcite-mode-dark">\n    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>\n    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>\n    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>\n  </calcite-menu>`',...verticalLayoutInDarkModeRTL_TestOnly.parameters?.docs?.source}}}},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-menu-menu-stories.d24f0641.iframe.bundle.js.map