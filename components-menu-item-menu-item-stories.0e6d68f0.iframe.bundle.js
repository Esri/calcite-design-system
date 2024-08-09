"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[5823],{"./src/components/menu-item/menu-item.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,allIconsAndSubMenuVertical_TestOnly:()=>allIconsAndSubMenuVertical_TestOnly,allIconsAndSubMenu_TestOnly:()=>allIconsAndSubMenu_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,iconEnd:()=>iconEnd,iconStart:()=>iconStart,iconsBoth:()=>iconsBoth,simple:()=>simple});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_storybook_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/helpers.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./support/formatting.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Menu Item",args:{text:"Menu item",src:"",href:"",rel:"",target:"",label:"",active:!1,breadcrumb:!1}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-menu>
    <calcite-menu-item
      text="${args.text}"
      src="${args.src}"
      href="${args.href}"
      rel="${args.rel}"
      target="${args.target}"
      label="${args.label}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("active",args.active)}
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("breadcrumb",args.breadcrumb)}
    />
  </calcite-menu>
`,iconStart=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-start="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_1__.k[0]}" />
  </calcite-menu>`,iconEnd=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-end="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_1__.k[0]}" />
  </calcite-menu>`,iconsBoth=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`<calcite-menu>
    <calcite-menu-item text="Menu item" icon-end="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_1__.k[0]}" icon-start="${_storybook_helpers__WEBPACK_IMPORTED_MODULE_1__.k[0]}" />
  </calcite-menu>`,allIconsAndSubMenu_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`<calcite-menu>
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item
  ></calcite-menu>`,allIconsAndSubMenuVertical_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`<calcite-menu layout="vertical">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
      </calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item>
  </calcite-menu>`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`<calcite-menu-item
    text="Menu item"
    active
    dir="rtl"
    class="calcite-mode-dark"
    icon-start="layer"
    icon-end="layer"
  />`,__namedExportsOrder=["simple","iconStart","iconEnd","iconsBoth","allIconsAndSubMenu_TestOnly","allIconsAndSubMenuVertical_TestOnly","darkModeRTL_TestOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: MenuItemStoryArgs): string => html`\n  <calcite-menu>\n    <calcite-menu-item\n      text="${args.text}"\n      src="${args.src}"\n      href="${args.href}"\n      rel="${args.rel}"\n      target="${args.target}"\n      label="${args.label}"\n      ${boolean("active", args.active)}\n      ${boolean("breadcrumb", args.breadcrumb)}\n    />\n  </calcite-menu>\n`',...simple.parameters?.docs?.source}}},iconStart.parameters={...iconStart.parameters,docs:{...iconStart.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu>\n    <calcite-menu-item text="Menu item" icon-start="${iconNames[0]}" />\n  </calcite-menu>`',...iconStart.parameters?.docs?.source}}},iconEnd.parameters={...iconEnd.parameters,docs:{...iconEnd.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu>\n    <calcite-menu-item text="Menu item" icon-end="${iconNames[0]}" />\n  </calcite-menu>`',...iconEnd.parameters?.docs?.source}}},iconsBoth.parameters={...iconsBoth.parameters,docs:{...iconsBoth.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu>\n    <calcite-menu-item text="Menu item" icon-end="${iconNames[0]}" icon-start="${iconNames[0]}" />\n  </calcite-menu>`',...iconsBoth.parameters?.docs?.source}}},allIconsAndSubMenu_TestOnly.parameters={...allIconsAndSubMenu_TestOnly.parameters,docs:{...allIconsAndSubMenu_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu>\n    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>\n    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>\n    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>\n      <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>\n      <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>\n        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>\n      </calcite-menu-item>\n    </calcite-menu-item>\n    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item\n  ></calcite-menu>`',...allIconsAndSubMenu_TestOnly.parameters?.docs?.source}}},allIconsAndSubMenuVertical_TestOnly.parameters={...allIconsAndSubMenuVertical_TestOnly.parameters,docs:{...allIconsAndSubMenuVertical_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu layout="vertical">\n    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>\n    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>\n    <calcite-menu-item text="Example item 3" text-enabled icon-start="layer" icon-end="layer" breadcrumb>\n      <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>\n      <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>\n        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>\n      </calcite-menu-item>\n    </calcite-menu-item>\n    <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item>\n  </calcite-menu>`',...allIconsAndSubMenuVertical_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-menu-item\n    text="Menu item"\n    active\n    dir="rtl"\n    class="calcite-mode-dark"\n    icon-start="layer"\n    icon-end="layer"\n  />`',...darkModeRTL_TestOnly.parameters?.docs?.source}}}},"./.storybook/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>iconNames});var _esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../calcite-ui-icons/index.js");const iconNames=Object.keys(_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))).sort(((a,b)=>{const iPrefixedNumberIconNamePattern=/^i(\d)/;return a.replace(iPrefixedNumberIconNamePattern,"$1").localeCompare(b.replace(iPrefixedNumberIconNamePattern,"$1"))}))}}]);
//# sourceMappingURL=components-menu-item-menu-item-stories.0e6d68f0.iframe.bundle.js.map