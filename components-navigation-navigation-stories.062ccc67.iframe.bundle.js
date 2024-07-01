"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[8193],{"./src/components/navigation/navigation.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WithNoSlottedContent_TestOnly:()=>WithNoSlottedContent_TestOnly,__namedExportsOrder:()=>__namedExportsOrder,allSlots_TestOnly:()=>allSlots_TestOnly,allSlots_darkModeRTL_TestOnly:()=>allSlots_darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,primaryAndSecondarySlots_TestOnly:()=>primaryAndSecondarySlots_TestOnly,primarySlots_TestOnly:()=>primarySlots_TestOnly,primaryWithAllLogoAndUserSlots_TestOnly:()=>primaryWithAllLogoAndUserSlots_TestOnly,simple:()=>simple,withBothNavActionPropAndSlot_TestOnly:()=>withBothNavActionPropAndSlot_TestOnly});var _support_formatting__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./support/formatting.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Navigation/Navigation"},simple=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-navigation>
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
`,primarySlots_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-navigation>
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-center">
      <calcite-menu-item text="Contact"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
`,primaryAndSecondarySlots_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
    </calcite-navigation-logo>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Potatoes"></calcite-menu-item>
      <calcite-menu-item active text="Chips"></calcite-menu-item>
      <calcite-menu-item text="Employees"></calcite-menu-item>
      <calcite-menu-item text="Suppliers"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" text-enabled full-name="Walt McChipson"></calcite-navigation-user>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation slot="navigation-secondary">
      <calcite-menu slot="content-start">
        <calcite-menu-item icon-start="dashboard" text="Dashboard"></calcite-menu-item>
        <calcite-menu-item icon-start="utility-network-trace" text="Distributors"></calcite-menu-item>
        <calcite-menu-item icon-start="legend" text="Stockists"></calcite-menu-item>
        <calcite-menu-item active icon-start="credit-card" text="Sales"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="US Sales"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="International Sales"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
  </calcite-navigation>
`,primaryWithAllLogoAndUserSlots_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
      <calcite-navigation style="--calcite-color-brand: #bf390f">
        <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
        </calcite-navigation-logo>
        <calcite-menu slot="content-start">
          <calcite-menu-item text="Potatoes"></calcite-menu-item>
          <calcite-menu-item active text="Chips"></calcite-menu-item>
          <calcite-menu-item text="Employees"></calcite-menu-item>
          <calcite-menu-item text="Suppliers"></calcite-menu-item>
        </calcite-menu>
        <calcite-navigation-user slot="user" full-name="Walt McChipson" username="m_chipson></calcite-navigation-user>
      </calcite-navigation>
    `,allSlots_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
    </calcite-navigation-logo>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Potatoes"></calcite-menu-item>
      <calcite-menu-item active text="Chips"></calcite-menu-item>
      <calcite-menu-item text="Employees"></calcite-menu-item>
      <calcite-menu-item text="Suppliers"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Walt McChipson"></calcite-navigation-user>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation slot="navigation-secondary">
      <calcite-menu slot="content-start">
        <calcite-menu-item icon-start="app-launcher" text="All" breadcrumb></calcite-menu-item>
        <calcite-menu-item icon-start="apps" text="Testing Flavors" breadcrumb></calcite-menu-item>
        <calcite-menu-item active text="Sorel Pesto"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item icon-start="book" text="Tasting Notes"></calcite-menu-item>
        <calcite-menu-item icon-start="legend" text="Ingredients"></calcite-menu-item>
        <calcite-menu-item active icon-start="activity-monitor" text="Health Benefits"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
    <calcite-navigation slot="navigation-tertiary">
      <calcite-menu slot="content-start">
        <calcite-menu-item text="Vitamins"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="Vitamins"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
  </calcite-navigation>
`,allSlots_darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <div class="calcite-mode-dark" dir="rtl">
    <calcite-navigation style="--calcite-color-brand: #bf390f">
      <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
      </calcite-navigation-logo>
      <calcite-menu slot="content-start">
        <calcite-menu-item text="Potatoes"></calcite-menu-item>
        <calcite-menu-item active text="Chips"></calcite-menu-item>
        <calcite-menu-item text="Employees"></calcite-menu-item>
        <calcite-menu-item text="Suppliers"></calcite-menu-item>
      </calcite-menu>
      <calcite-navigation-user slot="user" full-name="Walt McChipson"></calcite-navigation-user>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="Support"></calcite-menu-item>
      </calcite-menu>
      <calcite-navigation slot="navigation-secondary">
        <calcite-menu slot="content-start">
          <calcite-menu-item icon-start="app-launcher" text="All" breadcrumb></calcite-menu-item>
          <calcite-menu-item icon-start="apps" text="Testing Flavors" breadcrumb></calcite-menu-item>
          <calcite-menu-item active text="Sorel Pesto"> </calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="content-end">
          <calcite-menu-item icon-start="book" text="Tasting Notes"></calcite-menu-item>
          <calcite-menu-item icon-start="legend" text="Ingredients"></calcite-menu-item>
          <calcite-menu-item active icon-start="activity-monitor" text="Health Benefits"></calcite-menu-item>
        </calcite-menu>
      </calcite-navigation>
      <calcite-navigation slot="navigation-tertiary">
        <calcite-menu slot="content-start">
          <calcite-menu-item text="Vitamins"></calcite-menu-item>
          <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="content-end">
          <calcite-menu-item text="Vitamins"></calcite-menu-item>
          <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
        </calcite-menu>
      </calcite-navigation>
    </calcite-navigation>
  </div>
`,withBothNavActionPropAndSlot_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`
  <calcite-navigation navigation-action>
    <calcite-action icon="layers" appearance="solid" slot="navigation-action" text="anvesh" scale="m"></calcite-action>
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
`,WithNoSlottedContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_0__.q`<calcite-navigation></calcite-navigation>`;simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-navigation>\n    <calcite-navigation-logo slot="logo" heading="Walt\'s Chips"></calcite-navigation-logo>\n    <calcite-menu slot="content-end">\n      <calcite-menu-item text="Support"></calcite-menu-item>\n      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>\n    </calcite-menu>\n    <calcite-menu slot="content-start">\n      <calcite-menu-item text="Groups"></calcite-menu-item>\n      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>\n      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>\n      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>\n    </calcite-menu>\n    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>\n  </calcite-navigation>\n`',...simple.parameters?.docs?.source}}},primarySlots_TestOnly.parameters={...primarySlots_TestOnly.parameters,docs:{...primarySlots_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-navigation>\n    <calcite-navigation-logo slot="logo" heading="Walt\'s Chips"></calcite-navigation-logo>\n    <calcite-menu slot="content-end">\n      <calcite-menu-item text="Support"></calcite-menu-item>\n      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>\n    </calcite-menu>\n    <calcite-menu slot="content-start">\n      <calcite-menu-item text="Groups"></calcite-menu-item>\n      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>\n      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>\n      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>\n    </calcite-menu>\n    <calcite-menu slot="content-center">\n      <calcite-menu-item text="Contact"></calcite-menu-item>\n    </calcite-menu>\n    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>\n  </calcite-navigation>\n`',...primarySlots_TestOnly.parameters?.docs?.source}}},primaryAndSecondarySlots_TestOnly.parameters={...primaryAndSecondarySlots_TestOnly.parameters,docs:{...primaryAndSecondarySlots_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-navigation style="--calcite-color-brand: #bf390f">\n    <calcite-navigation-logo heading="Walt\'s Chips" description="Eastern Potato Chip Company" slot="logo">\n    </calcite-navigation-logo>\n    <calcite-menu slot="content-start">\n      <calcite-menu-item text="Potatoes"></calcite-menu-item>\n      <calcite-menu-item active text="Chips"></calcite-menu-item>\n      <calcite-menu-item text="Employees"></calcite-menu-item>\n      <calcite-menu-item text="Suppliers"></calcite-menu-item>\n    </calcite-menu>\n    <calcite-navigation-user slot="user" text-enabled full-name="Walt McChipson"></calcite-navigation-user>\n    <calcite-menu slot="content-end">\n      <calcite-menu-item text="Support"></calcite-menu-item>\n    </calcite-menu>\n    <calcite-navigation slot="navigation-secondary">\n      <calcite-menu slot="content-start">\n        <calcite-menu-item icon-start="dashboard" text="Dashboard"></calcite-menu-item>\n        <calcite-menu-item icon-start="utility-network-trace" text="Distributors"></calcite-menu-item>\n        <calcite-menu-item icon-start="legend" text="Stockists"></calcite-menu-item>\n        <calcite-menu-item active icon-start="credit-card" text="Sales"></calcite-menu-item>\n      </calcite-menu>\n      <calcite-menu slot="content-end">\n        <calcite-menu-item text="US Sales"></calcite-menu-item>\n        <calcite-menu-item active text-enabled text="International Sales"></calcite-menu-item>\n      </calcite-menu>\n    </calcite-navigation>\n  </calcite-navigation>\n`',...primaryAndSecondarySlots_TestOnly.parameters?.docs?.source}}},primaryWithAllLogoAndUserSlots_TestOnly.parameters={...primaryWithAllLogoAndUserSlots_TestOnly.parameters,docs:{...primaryWithAllLogoAndUserSlots_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n      <calcite-navigation style="--calcite-color-brand: #bf390f">\n        <calcite-navigation-logo heading="Walt\'s Chips" description="Eastern Potato Chip Company" slot="logo">\n        </calcite-navigation-logo>\n        <calcite-menu slot="content-start">\n          <calcite-menu-item text="Potatoes"></calcite-menu-item>\n          <calcite-menu-item active text="Chips"></calcite-menu-item>\n          <calcite-menu-item text="Employees"></calcite-menu-item>\n          <calcite-menu-item text="Suppliers"></calcite-menu-item>\n        </calcite-menu>\n        <calcite-navigation-user slot="user" full-name="Walt McChipson" username="m_chipson></calcite-navigation-user>\n      </calcite-navigation>\n    `',...primaryWithAllLogoAndUserSlots_TestOnly.parameters?.docs?.source}}},allSlots_TestOnly.parameters={...allSlots_TestOnly.parameters,docs:{...allSlots_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-navigation style="--calcite-color-brand: #bf390f">\n    <calcite-navigation-logo heading="Walt\'s Chips" description="Eastern Potato Chip Company" slot="logo">\n    </calcite-navigation-logo>\n    <calcite-menu slot="content-start">\n      <calcite-menu-item text="Potatoes"></calcite-menu-item>\n      <calcite-menu-item active text="Chips"></calcite-menu-item>\n      <calcite-menu-item text="Employees"></calcite-menu-item>\n      <calcite-menu-item text="Suppliers"></calcite-menu-item>\n    </calcite-menu>\n    <calcite-navigation-user slot="user" full-name="Walt McChipson"></calcite-navigation-user>\n    <calcite-menu slot="content-end">\n      <calcite-menu-item text="Support"></calcite-menu-item>\n    </calcite-menu>\n    <calcite-navigation slot="navigation-secondary">\n      <calcite-menu slot="content-start">\n        <calcite-menu-item icon-start="app-launcher" text="All" breadcrumb></calcite-menu-item>\n        <calcite-menu-item icon-start="apps" text="Testing Flavors" breadcrumb></calcite-menu-item>\n        <calcite-menu-item active text="Sorel Pesto"></calcite-menu-item>\n      </calcite-menu>\n      <calcite-menu slot="content-end">\n        <calcite-menu-item icon-start="book" text="Tasting Notes"></calcite-menu-item>\n        <calcite-menu-item icon-start="legend" text="Ingredients"></calcite-menu-item>\n        <calcite-menu-item active icon-start="activity-monitor" text="Health Benefits"></calcite-menu-item>\n      </calcite-menu>\n    </calcite-navigation>\n    <calcite-navigation slot="navigation-tertiary">\n      <calcite-menu slot="content-start">\n        <calcite-menu-item text="Vitamins"></calcite-menu-item>\n        <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>\n      </calcite-menu>\n      <calcite-menu slot="content-end">\n        <calcite-menu-item text="Vitamins"></calcite-menu-item>\n        <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>\n      </calcite-menu>\n    </calcite-navigation>\n  </calcite-navigation>\n`',...allSlots_TestOnly.parameters?.docs?.source}}},allSlots_darkModeRTL_TestOnly.parameters={...allSlots_darkModeRTL_TestOnly.parameters,docs:{...allSlots_darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div class="calcite-mode-dark" dir="rtl">\n    <calcite-navigation style="--calcite-color-brand: #bf390f">\n      <calcite-navigation-logo heading="Walt\'s Chips" description="Eastern Potato Chip Company" slot="logo">\n      </calcite-navigation-logo>\n      <calcite-menu slot="content-start">\n        <calcite-menu-item text="Potatoes"></calcite-menu-item>\n        <calcite-menu-item active text="Chips"></calcite-menu-item>\n        <calcite-menu-item text="Employees"></calcite-menu-item>\n        <calcite-menu-item text="Suppliers"></calcite-menu-item>\n      </calcite-menu>\n      <calcite-navigation-user slot="user" full-name="Walt McChipson"></calcite-navigation-user>\n      <calcite-menu slot="content-end">\n        <calcite-menu-item text="Support"></calcite-menu-item>\n      </calcite-menu>\n      <calcite-navigation slot="navigation-secondary">\n        <calcite-menu slot="content-start">\n          <calcite-menu-item icon-start="app-launcher" text="All" breadcrumb></calcite-menu-item>\n          <calcite-menu-item icon-start="apps" text="Testing Flavors" breadcrumb></calcite-menu-item>\n          <calcite-menu-item active text="Sorel Pesto"> </calcite-menu-item>\n        </calcite-menu>\n        <calcite-menu slot="content-end">\n          <calcite-menu-item icon-start="book" text="Tasting Notes"></calcite-menu-item>\n          <calcite-menu-item icon-start="legend" text="Ingredients"></calcite-menu-item>\n          <calcite-menu-item active icon-start="activity-monitor" text="Health Benefits"></calcite-menu-item>\n        </calcite-menu>\n      </calcite-navigation>\n      <calcite-navigation slot="navigation-tertiary">\n        <calcite-menu slot="content-start">\n          <calcite-menu-item text="Vitamins"></calcite-menu-item>\n          <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>\n        </calcite-menu>\n        <calcite-menu slot="content-end">\n          <calcite-menu-item text="Vitamins"></calcite-menu-item>\n          <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>\n        </calcite-menu>\n      </calcite-navigation>\n    </calcite-navigation>\n  </div>\n`',...allSlots_darkModeRTL_TestOnly.parameters?.docs?.source}}},withBothNavActionPropAndSlot_TestOnly.parameters={...withBothNavActionPropAndSlot_TestOnly.parameters,docs:{...withBothNavActionPropAndSlot_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-navigation navigation-action>\n    <calcite-action icon="layers" appearance="solid" slot="navigation-action" text="anvesh" scale="m"></calcite-action>\n    <calcite-navigation-logo slot="logo" heading="Walt\'s Chips"></calcite-navigation-logo>\n    <calcite-menu slot="content-end">\n      <calcite-menu-item text="Support"></calcite-menu-item>\n      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>\n    </calcite-menu>\n    <calcite-menu slot="content-start">\n      <calcite-menu-item text="Groups"></calcite-menu-item>\n      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>\n      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>\n      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>\n    </calcite-menu>\n    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>\n  </calcite-navigation>\n`',...withBothNavActionPropAndSlot_TestOnly.parameters?.docs?.source}}},WithNoSlottedContent_TestOnly.parameters={...WithNoSlottedContent_TestOnly.parameters,docs:{...WithNoSlottedContent_TestOnly.parameters?.docs,source:{originalSource:"(): string => html`<calcite-navigation></calcite-navigation>`",...WithNoSlottedContent_TestOnly.parameters?.docs?.source}}};const __namedExportsOrder=["simple","primarySlots_TestOnly","primaryAndSecondarySlots_TestOnly","primaryWithAllLogoAndUserSlots_TestOnly","allSlots_TestOnly","allSlots_darkModeRTL_TestOnly","withBothNavActionPropAndSlot_TestOnly","WithNoSlottedContent_TestOnly"]}}]);
//# sourceMappingURL=components-navigation-navigation-stories.062ccc67.iframe.bundle.js.map