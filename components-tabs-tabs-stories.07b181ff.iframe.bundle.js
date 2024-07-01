"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[6905],{"./src/components/tabs/tabs.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Tab100PercentHeightNoVerticalScroll:()=>Tab100PercentHeightNoVerticalScroll,Tab200PercentHeightWithVerticalScroll:()=>Tab200PercentHeightWithVerticalScroll,__namedExportsOrder:()=>__namedExportsOrder,bordered:()=>bordered,borderedDarkModeRTL_TestOnly:()=>borderedDarkModeRTL_TestOnly,centerBorderedScale_TestOnly:()=>centerBorderedScale_TestOnly,centerBorderedVariedTabWidthScale_TestOnly:()=>centerBorderedVariedTabWidthScale_TestOnly,centerScale_TestOnly:()=>centerScale_TestOnly,centerVariedTabWidthScale_TestOnly:()=>centerVariedTabWidthScale_TestOnly,centeredBorderedClosable_TestOnly:()=>centeredBorderedClosable_TestOnly,centeredClosable_TestOnly:()=>centeredClosable_TestOnly,centeredTabsAreEvenlyJustifiedAcrossNavWidth_TestOnly:()=>centeredTabsAreEvenlyJustifiedAcrossNavWidth_TestOnly,centered_TestOnly:()=>centered_TestOnly,closable:()=>closable,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabledTabsAndMediumIconsForLargeTabsTitle_TestOnly:()=>disabledTabsAndMediumIconsForLargeTabsTitle_TestOnly,fixedHeightNoVerticalScrollbar_TestOnly:()=>fixedHeightNoVerticalScrollbar_TestOnly,inlineBorderedScale_TestOnly:()=>inlineBorderedScale_TestOnly,inlineBorderedVariedTabWidthScale_TestOnly:()=>inlineBorderedVariedTabWidthScale_TestOnly,inlineScale_TestOnly:()=>inlineScale_TestOnly,inlineTabsJustifyAgainstTheStartOfTheNavWidth_TestOnly:()=>inlineTabsJustifyAgainstTheStartOfTheNavWidth_TestOnly,inlineVariedTabWidthScale_TestOnly:()=>inlineVariedTabWidthScale_TestOnly,noVerticalScrollbarInsideShellPanel_TestOnly:()=>noVerticalScrollbarInsideShellPanel_TestOnly,paddingPropOverrideAtElementLevel:()=>paddingPropOverrideAtElementLevel,paddingPropOverrideAtRootLevel:()=>paddingPropOverrideAtRootLevel,responsiveTabs:()=>responsiveTabs,setWidth:()=>setWidth,simpleDarkModeRTL_TestOnly:()=>simpleDarkModeRTL_TestOnly,updateIndicatorOffset_TestOnly:()=>updateIndicatorOffset_TestOnly,withIcons:()=>withIcons});var _storybook_helpers__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/helpers.ts"),_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./.storybook/placeholderImage.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/resources.ts");const{layout,position,scale}=_storybook_resources__WEBPACK_IMPORTED_MODULE_3__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Tabs",args:{layout:layout.values[3],position:position.values[2],scale:scale.defaultValue},argTypes:{layout:{options:layout.values.filter((option=>"auto"!==option&&"fixed"!==option&&"none"!==option&&"horizontal-single"!==option)),control:{type:"select"}},position:{options:position.values.filter((option=>"start"!==option&&"end"!==option)),control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}}}},simpleDarkModeRTL_TestOnly=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs
    dir="rtl"
    class="calcite-mode-dark"
    layout="${args.layout}"
    position="${args.position}"
    scale="${args.scale}"
  >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled>Disabled Tab</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`;simpleDarkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.At,chromatic:{delay:500}};const bordered=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs layout="inline" position="top" scale="m" bordered>
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`,closable=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs layout="inline" position="top" scale="m">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1" closable> Tab 1 Title </calcite-tab-title>
      <calcite-tab-title tab="tab2" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" closable selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`,borderedDarkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs layout="inline" position="top" scale="m" bordered dir="rtl" class="calcite-mode-dark">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>
    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>
    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>
    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>
  </calcite-tabs>
`;borderedDarkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.At};const selectedIcon=_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k[0],withIcons=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs layout="inline" position="top" scale="m">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected icon-start="${selectedIcon}">Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="${selectedIcon}">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="${selectedIcon}" icon-end="${selectedIcon}">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="${selectedIcon}"></calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`,setWidth=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <div style="width: 400px;">
    <calcite-tabs
    layout="inline"
    position="top"
    scale="m"
    >
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title id="reference-element">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab selected>
      <p>Tab 1 Content</p><br />
    </calcite-tab>
    <calcite-tab><p>Tab 2 Content</p>
    <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:1e3,height:200})}"></img>
    </calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
    </calcite-tabs>
  </div>
`,TabNavHTMLSimple=_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tab-nav slot="title-group">
    <calcite-tab-title>Tab 1 Title</calcite-tab-title>
    <calcite-tab-title>Tab 2 Title</calcite-tab-title>
    <calcite-tab-title>Tab 3 Title</calcite-tab-title>
    <calcite-tab-title selected>Tab 4 Title</calcite-tab-title>
  </calcite-tab-nav>
  <calcite-tab>Tab 1 Content</calcite-tab>
  <calcite-tab>Tab 2 Content</calcite-tab>
  <calcite-tab>Tab 3 Content</calcite-tab>
  <calcite-tab selected>Tab 4 Content</calcite-tab>
`,TabNavHTMLVariedTabWidth=_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tab-nav slot="title-group">
    <calcite-tab-title icon-start="arrow-left">Tab 1 Title</calcite-tab-title>
    <calcite-tab-title icon-end="arrow-right">Tab 2 Title</calcite-tab-title>
    <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
    <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
  </calcite-tab-nav>
  <calcite-tab>Tab 1 Content</calcite-tab>
  <calcite-tab>Tab 2 Content</calcite-tab>
  <calcite-tab>Tab 3 Content</calcite-tab>
  <calcite-tab selected>Tab 4 Content</calcite-tab>
`,tabStyles=_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <style>
    calcite-tabs {
      margin: 20px;
    }
  </style>
`,centerScale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${tabStyles}
  <calcite-tabs layout="center" scale="s">${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="center" scale="m">${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="center" scale="l">${TabNavHTMLSimple}</calcite-tabs>
`,centerVariedTabWidthScale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${tabStyles}
  <calcite-tabs layout="center" scale="s">${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="center" scale="m">${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="center" scale="l">${TabNavHTMLVariedTabWidth}</calcite-tabs>
`,centerBorderedScale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${tabStyles}
  <calcite-tabs layout="center" scale="s" bordered>${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="center" scale="m" bordered>${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="center" scale="l" bordered>${TabNavHTMLSimple}</calcite-tabs>
`,centerBorderedVariedTabWidthScale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${tabStyles}
  <calcite-tabs layout="center" scale="s" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="center" scale="m" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="center" scale="l" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
`,inlineScale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${tabStyles}
  <calcite-tabs layout="inline" scale="s">${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m">${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l">${TabNavHTMLSimple}</calcite-tabs>
`,inlineVariedTabWidthScale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${tabStyles}
  <calcite-tabs layout="inline" scale="s">${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m">${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l">${TabNavHTMLVariedTabWidth}</calcite-tabs>
`,inlineBorderedScale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${tabStyles}
  <calcite-tabs layout="inline" scale="s" bordered>${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m" bordered>${TabNavHTMLSimple}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l" bordered>${TabNavHTMLSimple}</calcite-tabs>
`,inlineBorderedVariedTabWidthScale_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  ${tabStyles}
  <calcite-tabs layout="inline" scale="s" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="inline" scale="m" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
  <calcite-tabs layout="inline" scale="l" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>
`,disabledTabsAndMediumIconsForLargeTabsTitle_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs scale="l">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title disabled icon-start="arrow-left">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title disabled icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
    </calcite-tab-nav>

    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
`,centered_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" selected>Tab 4 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`,centeredClosable_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 4 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`,centeredBorderedClosable_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs layout="center" bordered>
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 3 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 4 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
    <calcite-tab><p>Tab 4 Content</p></calcite-tab>
  </calcite-tabs>
`,centeredTabsAreEvenlyJustifiedAcrossNavWidth_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs layout="center">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 3 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
`,inlineTabsJustifyAgainstTheStartOfTheNavWidth_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs layout="inline">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>
      <calcite-tab-title icon-end="arrow-right" closable>Tab 2 Title</calcite-tab-title>
      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected
        >Tab 3 Title</calcite-tab-title
      >
    </calcite-tab-nav>
    <calcite-tab><p>Tab 1 Content</p></calcite-tab>
    <calcite-tab><p>Tab 2 Content</p></calcite-tab>
    <calcite-tab><p>Tab 3 Content</p></calcite-tab>
  </calcite-tabs>
`,Tab100PercentHeightNoVerticalScroll=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs style="height: 250px;">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Boats</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab style="background: pink;">
      <div style="background: red; height: 100%;">Tab 1 content</div>
    </calcite-tab>
  </calcite-tabs>
`;Tab100PercentHeightNoVerticalScroll.parameters={chromatic:{delay:1e3}};const Tab200PercentHeightWithVerticalScroll=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs style="height: 250px;">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected>Boats</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab style="background: pink;">
      <div style="background: linear-gradient(to bottom, red, transparent); height: 200%;">Tab 1 content</div>
    </calcite-tab>
  </calcite-tabs>
`;Tab200PercentHeightWithVerticalScroll.parameters={chromatic:{delay:1e3}};const updateIndicatorOffset_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`<calcite-tabs>
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title id="tab-title">Boats</calcite-tab-title>
        <calcite-tab-title selected>Ships</calcite-tab-title>
        <calcite-tab-title>Yachts</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab>Tab 1 content</calcite-tab>
      <calcite-tab>Tab 2 content</calcite-tab>
      <calcite-tab>Tab 3 content</calcite-tab>
    </calcite-tabs>
    <script>
      const tabTitle = document.getElementById("tab-title");
      setTimeout(() => (tabTitle.iconStart = "bullet-point"), 300);
    </script>`;updateIndicatorOffset_TestOnly.parameters={chromatic:{delay:1e3}};const fixedHeightNoVerticalScrollbar_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs style="height: 400px">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title selected> Watercraft </calcite-tab-title>
      <calcite-tab-title>Automobiles</calcite-tab-title>
      <calcite-tab-title>Aircrafts</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected>
      <calcite-notice icon="embark" open>
        <div slot="message">Recommended for coastal use</div>
      </calcite-notice>
      <calcite-notice icon="embark" open>
        <div slot="message">Why is there a vertical scroll bar in this panel?</div>
      </calcite-notice>
    </calcite-tab>
    <calcite-tab>
      <calcite-notice icon="car" open>
        <div slot="message">A good choice for inland adventure</div>
      </calcite-notice>
      <calcite-notice icon="car" open>
        <div slot="message">A good choice for inland adventure 2</div>
      </calcite-notice>
    </calcite-tab>
    <calcite-tab>
      <calcite-notice icon="plane" open>
        <div slot="message">Cross continents quickly</div>
      </calcite-notice>
    </calcite-tab>
  </calcite-tabs>
`,noVerticalScrollbarInsideShellPanel_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-shell content-behind>
    <calcite-shell-panel slot="panel-end" width-scale="l" position="end" display-mode="float">
      <calcite-panel heading="Panel with Tabs >> vertical scrollbar">
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title selected> Watercraft </calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircrafts</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab selected>
            <calcite-notice icon="embark" open>
              <div slot="message">Recommended for coastal use</div>
            </calcite-notice>
            <calcite-notice icon="embark" open>
              <div slot="message">Why is there a vertical scroll bar in this panel?</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure 2</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="plane" open>
              <div slot="message">Cross continents quickly</div>
            </calcite-notice>
          </calcite-tab>
        </calcite-tabs>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>
`,responsiveTabs=()=>(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.DY)(_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
    <style>
      .breakpoint-story-container {
        flex-direction: column;
      }
    </style>
    <calcite-tabs scale="{scale}">
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
          <calcite-tab-title>Tab 5 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
          <calcite-tab-title>Tab 8 Title</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab selected>Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab selected>Tab 4 Content</calcite-tab>
        <calcite-tab>Tab 5 Content</calcite-tab>
        <calcite-tab>Tab 6 Content</calcite-tab>
        <calcite-tab>Tab 7 Content</calcite-tab>
        <calcite-tab>Tab 8 Content</calcite-tab>
      </calcite-tabs>
    </calcite-tabs>
    
    <calcite-tabs layout="center" scale="{scale}">
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
          <calcite-tab-title>Tab 5 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
          <calcite-tab-title>Tab 8 Title</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab selected>Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab selected>Tab 4 Content</calcite-tab>
        <calcite-tab>Tab 5 Content</calcite-tab>
        <calcite-tab>Tab 6 Content</calcite-tab>
        <calcite-tab>Tab 7 Content</calcite-tab>
        <calcite-tab>Tab 8 Content</calcite-tab>
      </calcite-tabs>
    </calcite-tabs>
    
    <calcite-tabs bordered scale="{scale}">
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
          <calcite-tab-title>Tab 5 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
          <calcite-tab-title>Tab 8 Title</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab>Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab selected>Tab 4 Content</calcite-tab>
        <calcite-tab>Tab 5 Content</calcite-tab>
        <calcite-tab>Tab 6 Content</calcite-tab>
        <calcite-tab>Tab 7 Content</calcite-tab>
        <calcite-tab>Tab 8 Content</calcite-tab>
      </calcite-tabs>
    </calcite-tabs>
    
    <calcite-tabs bordered layout="center" scale="{scale}">
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>
          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>
          <calcite-tab-title>Tab 5 Title</calcite-tab-title>
          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>
          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>
          <calcite-tab-title>Tab 8 Title</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab >Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab selected>Tab 4 Content</calcite-tab>
        <calcite-tab>Tab 5 Content</calcite-tab>
        <calcite-tab>Tab 6 Content</calcite-tab>
        <calcite-tab>Tab 7 Content</calcite-tab>
        <calcite-tab>Tab 8 Content</calcite-tab>
      </calcite-tabs>
    </calcite-tabs>
  `),paddingPropOverrideAtRootLevel=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <style>
    :root {
      --calcite-tab-content-block-padding: 0;
    }
  </style>
  <calcite-tabs>
    <calcite-tabs>
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab>
        <div>Tab 1 Content</div>
      </calcite-tab>
    </calcite-tabs>
  </calcite-tabs>
`,paddingPropOverrideAtElementLevel=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tabs>
    <calcite-tabs>
      <calcite-tab-nav slot="title-group">
        <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
      </calcite-tab-nav>
      <calcite-tab style="--calcite-tab-content-block-padding: 0;">
        <div>Tab 1 Content</div>
      </calcite-tab>
    </calcite-tabs>
  </calcite-tabs>
`;simpleDarkModeRTL_TestOnly.parameters={...simpleDarkModeRTL_TestOnly.parameters,docs:{...simpleDarkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(args: TabsStoryArgs): string => html`\n  <calcite-tabs\n    dir="rtl"\n    class="calcite-mode-dark"\n    layout="${args.layout}"\n    position="${args.position}"\n    scale="${args.scale}"\n  >\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>\n      <calcite-tab-title>Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title disabled>Disabled Tab</calcite-tab-title>\n      <calcite-tab-title>Tab 4 Title</calcite-tab-title>\n    </calcite-tab-nav>\n    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 2 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 3 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 4 Content</p></calcite-tab>\n  </calcite-tabs>\n`',...simpleDarkModeRTL_TestOnly.parameters?.docs?.source}}},bordered.parameters={...bordered.parameters,docs:{...bordered.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs layout="inline" position="top" scale="m" bordered>\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>\n      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>\n      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>\n    </calcite-tab-nav>\n    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>\n    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>\n    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>\n    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>\n  </calcite-tabs>\n`',...bordered.parameters?.docs?.source}}},closable.parameters={...closable.parameters,docs:{...closable.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs layout="inline" position="top" scale="m">\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title tab="tab1" closable> Tab 1 Title </calcite-tab-title>\n      <calcite-tab-title tab="tab2" closable>Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title tab="tab3" closable>Tab 3 Title</calcite-tab-title>\n      <calcite-tab-title tab="tab4" closable selected>Tab 4 Title</calcite-tab-title>\n    </calcite-tab-nav>\n    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>\n    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>\n    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>\n    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>\n  </calcite-tabs>\n`',...closable.parameters?.docs?.source}}},borderedDarkModeRTL_TestOnly.parameters={...borderedDarkModeRTL_TestOnly.parameters,docs:{...borderedDarkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs layout="inline" position="top" scale="m" bordered dir="rtl" class="calcite-mode-dark">\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title tab="tab1">Tab 1 Title</calcite-tab-title>\n      <calcite-tab-title tab="tab2">Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title tab="tab3">Tab 3 Title</calcite-tab-title>\n      <calcite-tab-title tab="tab4" selected>Tab 4 Title</calcite-tab-title>\n    </calcite-tab-nav>\n    <calcite-tab tab="tab1">Tab 1 Content</calcite-tab>\n    <calcite-tab tab="tab2">Tab 2 Content</calcite-tab>\n    <calcite-tab tab="tab3">Tab 3 Content</calcite-tab>\n    <calcite-tab tab="tab4" selected>Tab 4 Content</calcite-tab>\n  </calcite-tabs>\n`',...borderedDarkModeRTL_TestOnly.parameters?.docs?.source}}},withIcons.parameters={...withIcons.parameters,docs:{...withIcons.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs layout="inline" position="top" scale="m">\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title selected icon-start="${selectedIcon}">Tab 1 Title</calcite-tab-title>\n      <calcite-tab-title icon-end="${selectedIcon}">Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title icon-start="${selectedIcon}" icon-end="${selectedIcon}">Tab 3 Title</calcite-tab-title>\n      <calcite-tab-title icon-start="${selectedIcon}"></calcite-tab-title>\n    </calcite-tab-nav>\n\n    <calcite-tab selected><p>Tab 1 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 2 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 3 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 4 Content</p></calcite-tab>\n  </calcite-tabs>\n`',...withIcons.parameters?.docs?.source}}},setWidth.parameters={...setWidth.parameters,docs:{...setWidth.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width: 400px;">\n    <calcite-tabs\n    layout="inline"\n    position="top"\n    scale="m"\n    >\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>\n      <calcite-tab-title id="reference-element">Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title>Tab 3 Title</calcite-tab-title>\n      <calcite-tab-title>Tab 4 Title</calcite-tab-title>\n    </calcite-tab-nav>\n\n    <calcite-tab selected>\n      <p>Tab 1 Content</p><br />\n    </calcite-tab>\n    <calcite-tab><p>Tab 2 Content</p>\n    <img src="${placeholderImage({\n  width: 1000,\n  height: 200\n})}"></img>\n    </calcite-tab>\n    <calcite-tab><p>Tab 3 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 4 Content</p></calcite-tab>\n    </calcite-tabs>\n  </div>\n`',...setWidth.parameters?.docs?.source}}},centerScale_TestOnly.parameters={...centerScale_TestOnly.parameters,docs:{...centerScale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="center" scale="s">${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="center" scale="m">${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="center" scale="l">${TabNavHTMLSimple}</calcite-tabs>\n`',...centerScale_TestOnly.parameters?.docs?.source}}},centerVariedTabWidthScale_TestOnly.parameters={...centerVariedTabWidthScale_TestOnly.parameters,docs:{...centerVariedTabWidthScale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="center" scale="s">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="center" scale="m">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="center" scale="l">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n`',...centerVariedTabWidthScale_TestOnly.parameters?.docs?.source}}},centerBorderedScale_TestOnly.parameters={...centerBorderedScale_TestOnly.parameters,docs:{...centerBorderedScale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="center" scale="s" bordered>${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="center" scale="m" bordered>${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="center" scale="l" bordered>${TabNavHTMLSimple}</calcite-tabs>\n`',...centerBorderedScale_TestOnly.parameters?.docs?.source}}},centerBorderedVariedTabWidthScale_TestOnly.parameters={...centerBorderedVariedTabWidthScale_TestOnly.parameters,docs:{...centerBorderedVariedTabWidthScale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="center" scale="s" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="center" scale="m" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="center" scale="l" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n`',...centerBorderedVariedTabWidthScale_TestOnly.parameters?.docs?.source}}},inlineScale_TestOnly.parameters={...inlineScale_TestOnly.parameters,docs:{...inlineScale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="inline" scale="s">${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="m">${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="l">${TabNavHTMLSimple}</calcite-tabs>\n`',...inlineScale_TestOnly.parameters?.docs?.source}}},inlineVariedTabWidthScale_TestOnly.parameters={...inlineVariedTabWidthScale_TestOnly.parameters,docs:{...inlineVariedTabWidthScale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="inline" scale="s">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="m">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="l">${TabNavHTMLVariedTabWidth}</calcite-tabs>\n`',...inlineVariedTabWidthScale_TestOnly.parameters?.docs?.source}}},inlineBorderedScale_TestOnly.parameters={...inlineBorderedScale_TestOnly.parameters,docs:{...inlineBorderedScale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="inline" scale="s" bordered>${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="m" bordered>${TabNavHTMLSimple}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="l" bordered>${TabNavHTMLSimple}</calcite-tabs>\n`',...inlineBorderedScale_TestOnly.parameters?.docs?.source}}},inlineBorderedVariedTabWidthScale_TestOnly.parameters={...inlineBorderedVariedTabWidthScale_TestOnly.parameters,docs:{...inlineBorderedVariedTabWidthScale_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  ${tabStyles}\n  <calcite-tabs layout="inline" scale="s" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="m" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n  <calcite-tabs layout="inline" scale="l" bordered>${TabNavHTMLVariedTabWidth}</calcite-tabs>\n`',...inlineBorderedVariedTabWidthScale_TestOnly.parameters?.docs?.source}}},disabledTabsAndMediumIconsForLargeTabsTitle_TestOnly.parameters={...disabledTabsAndMediumIconsForLargeTabsTitle_TestOnly.parameters,docs:{...disabledTabsAndMediumIconsForLargeTabsTitle_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs scale="l">\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>\n      <calcite-tab-title disabled icon-start="arrow-left">Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title disabled icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>\n    </calcite-tab-nav>\n\n    <calcite-tab><p>Tab 1 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 2 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 3 Content</p></calcite-tab>\n  </calcite-tabs>\n`',...disabledTabsAndMediumIconsForLargeTabsTitle_TestOnly.parameters?.docs?.source}}},centered_TestOnly.parameters={...centered_TestOnly.parameters,docs:{...centered_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs layout="center">\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title>Tab 1 Title</calcite-tab-title>\n      <calcite-tab-title icon-start="arrow-left">Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title icon-end="arrow-right">Tab 3 Title</calcite-tab-title>\n      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" selected>Tab 4 Title</calcite-tab-title>\n    </calcite-tab-nav>\n    <calcite-tab><p>Tab 1 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 2 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 3 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 4 Content</p></calcite-tab>\n  </calcite-tabs>\n`',...centered_TestOnly.parameters?.docs?.source}}},centeredClosable_TestOnly.parameters={...centeredClosable_TestOnly.parameters,docs:{...centeredClosable_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs layout="center">\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>\n      <calcite-tab-title icon-start="arrow-left" closable>Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title icon-end="arrow-right" closable>Tab 3 Title</calcite-tab-title>\n      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected\n        >Tab 4 Title</calcite-tab-title\n      >\n    </calcite-tab-nav>\n    <calcite-tab><p>Tab 1 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 2 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 3 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 4 Content</p></calcite-tab>\n  </calcite-tabs>\n`',...centeredClosable_TestOnly.parameters?.docs?.source}}},centeredBorderedClosable_TestOnly.parameters={...centeredBorderedClosable_TestOnly.parameters,docs:{...centeredBorderedClosable_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs layout="center" bordered>\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>\n      <calcite-tab-title icon-start="arrow-left" closable>Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title icon-end="arrow-right" closable>Tab 3 Title</calcite-tab-title>\n      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected\n        >Tab 4 Title</calcite-tab-title\n      >\n    </calcite-tab-nav>\n    <calcite-tab><p>Tab 1 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 2 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 3 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 4 Content</p></calcite-tab>\n  </calcite-tabs>\n`',...centeredBorderedClosable_TestOnly.parameters?.docs?.source}}},centeredTabsAreEvenlyJustifiedAcrossNavWidth_TestOnly.parameters={...centeredTabsAreEvenlyJustifiedAcrossNavWidth_TestOnly.parameters,docs:{...centeredTabsAreEvenlyJustifiedAcrossNavWidth_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs layout="center">\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>\n      <calcite-tab-title icon-end="arrow-right" closable>Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected\n        >Tab 3 Title</calcite-tab-title\n      >\n    </calcite-tab-nav>\n    <calcite-tab><p>Tab 1 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 2 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 3 Content</p></calcite-tab>\n  </calcite-tabs>\n`',...centeredTabsAreEvenlyJustifiedAcrossNavWidth_TestOnly.parameters?.docs?.source}}},inlineTabsJustifyAgainstTheStartOfTheNavWidth_TestOnly.parameters={...inlineTabsJustifyAgainstTheStartOfTheNavWidth_TestOnly.parameters,docs:{...inlineTabsJustifyAgainstTheStartOfTheNavWidth_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs layout="inline">\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title closable>Tab 1 Title</calcite-tab-title>\n      <calcite-tab-title icon-end="arrow-right" closable>Tab 2 Title</calcite-tab-title>\n      <calcite-tab-title icon-start="arrow-left" icon-end="arrow-right" closable selected\n        >Tab 3 Title</calcite-tab-title\n      >\n    </calcite-tab-nav>\n    <calcite-tab><p>Tab 1 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 2 Content</p></calcite-tab>\n    <calcite-tab><p>Tab 3 Content</p></calcite-tab>\n  </calcite-tabs>\n`',...inlineTabsJustifyAgainstTheStartOfTheNavWidth_TestOnly.parameters?.docs?.source}}},Tab100PercentHeightNoVerticalScroll.parameters={...Tab100PercentHeightNoVerticalScroll.parameters,docs:{...Tab100PercentHeightNoVerticalScroll.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs style="height: 250px;">\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title selected>Boats</calcite-tab-title>\n    </calcite-tab-nav>\n    <calcite-tab style="background: pink;">\n      <div style="background: red; height: 100%;">Tab 1 content</div>\n    </calcite-tab>\n  </calcite-tabs>\n`',...Tab100PercentHeightNoVerticalScroll.parameters?.docs?.source}}},Tab200PercentHeightWithVerticalScroll.parameters={...Tab200PercentHeightWithVerticalScroll.parameters,docs:{...Tab200PercentHeightWithVerticalScroll.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs style="height: 250px;">\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title selected>Boats</calcite-tab-title>\n    </calcite-tab-nav>\n    <calcite-tab style="background: pink;">\n      <div style="background: linear-gradient(to bottom, red, transparent); height: 200%;">Tab 1 content</div>\n    </calcite-tab>\n  </calcite-tabs>\n`',...Tab200PercentHeightWithVerticalScroll.parameters?.docs?.source}}},updateIndicatorOffset_TestOnly.parameters={...updateIndicatorOffset_TestOnly.parameters,docs:{...updateIndicatorOffset_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-tabs>\n      <calcite-tab-nav slot="title-group">\n        <calcite-tab-title id="tab-title">Boats</calcite-tab-title>\n        <calcite-tab-title selected>Ships</calcite-tab-title>\n        <calcite-tab-title>Yachts</calcite-tab-title>\n      </calcite-tab-nav>\n      <calcite-tab>Tab 1 content</calcite-tab>\n      <calcite-tab>Tab 2 content</calcite-tab>\n      <calcite-tab>Tab 3 content</calcite-tab>\n    </calcite-tabs>\n    <script>\n      const tabTitle = document.getElementById("tab-title");\n      setTimeout(() => (tabTitle.iconStart = "bullet-point"), 300);\n    <\/script>`',...updateIndicatorOffset_TestOnly.parameters?.docs?.source}}},fixedHeightNoVerticalScrollbar_TestOnly.parameters={...fixedHeightNoVerticalScrollbar_TestOnly.parameters,docs:{...fixedHeightNoVerticalScrollbar_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs style="height: 400px">\n    <calcite-tab-nav slot="title-group">\n      <calcite-tab-title selected> Watercraft </calcite-tab-title>\n      <calcite-tab-title>Automobiles</calcite-tab-title>\n      <calcite-tab-title>Aircrafts</calcite-tab-title>\n    </calcite-tab-nav>\n    <calcite-tab selected>\n      <calcite-notice icon="embark" open>\n        <div slot="message">Recommended for coastal use</div>\n      </calcite-notice>\n      <calcite-notice icon="embark" open>\n        <div slot="message">Why is there a vertical scroll bar in this panel?</div>\n      </calcite-notice>\n    </calcite-tab>\n    <calcite-tab>\n      <calcite-notice icon="car" open>\n        <div slot="message">A good choice for inland adventure</div>\n      </calcite-notice>\n      <calcite-notice icon="car" open>\n        <div slot="message">A good choice for inland adventure 2</div>\n      </calcite-notice>\n    </calcite-tab>\n    <calcite-tab>\n      <calcite-notice icon="plane" open>\n        <div slot="message">Cross continents quickly</div>\n      </calcite-notice>\n    </calcite-tab>\n  </calcite-tabs>\n`',...fixedHeightNoVerticalScrollbar_TestOnly.parameters?.docs?.source}}},noVerticalScrollbarInsideShellPanel_TestOnly.parameters={...noVerticalScrollbarInsideShellPanel_TestOnly.parameters,docs:{...noVerticalScrollbarInsideShellPanel_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-shell content-behind>\n    <calcite-shell-panel slot="panel-end" width-scale="l" position="end" display-mode="float">\n      <calcite-panel heading="Panel with Tabs >> vertical scrollbar">\n        <calcite-tabs>\n          <calcite-tab-nav slot="title-group">\n            <calcite-tab-title selected> Watercraft </calcite-tab-title>\n            <calcite-tab-title>Automobiles</calcite-tab-title>\n            <calcite-tab-title>Aircrafts</calcite-tab-title>\n          </calcite-tab-nav>\n          <calcite-tab selected>\n            <calcite-notice icon="embark" open>\n              <div slot="message">Recommended for coastal use</div>\n            </calcite-notice>\n            <calcite-notice icon="embark" open>\n              <div slot="message">Why is there a vertical scroll bar in this panel?</div>\n            </calcite-notice>\n          </calcite-tab>\n          <calcite-tab>\n            <calcite-notice icon="car" open>\n              <div slot="message">A good choice for inland adventure</div>\n            </calcite-notice>\n            <calcite-notice icon="car" open>\n              <div slot="message">A good choice for inland adventure 2</div>\n            </calcite-notice>\n          </calcite-tab>\n          <calcite-tab>\n            <calcite-notice icon="plane" open>\n              <div slot="message">Cross continents quickly</div>\n            </calcite-notice>\n          </calcite-tab>\n        </calcite-tabs>\n      </calcite-panel>\n    </calcite-shell-panel>\n  </calcite-shell>\n`',...noVerticalScrollbarInsideShellPanel_TestOnly.parameters?.docs?.source}}},responsiveTabs.parameters={...responsiveTabs.parameters,docs:{...responsiveTabs.parameters?.docs,source:{originalSource:'(): string => createBreakpointStories(html`\n    <style>\n      .breakpoint-story-container {\n        flex-direction: column;\n      }\n    </style>\n    <calcite-tabs scale="{scale}">\n        <calcite-tab-nav slot="title-group">\n          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>\n          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>\n          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>\n          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>\n          <calcite-tab-title>Tab 5 Title</calcite-tab-title>\n          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>\n          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>\n          <calcite-tab-title>Tab 8 Title</calcite-tab-title>\n        </calcite-tab-nav>\n        <calcite-tab selected>Tab 1 Content</calcite-tab>\n        <calcite-tab>Tab 2 Content</calcite-tab>\n        <calcite-tab>Tab 3 Content</calcite-tab>\n        <calcite-tab selected>Tab 4 Content</calcite-tab>\n        <calcite-tab>Tab 5 Content</calcite-tab>\n        <calcite-tab>Tab 6 Content</calcite-tab>\n        <calcite-tab>Tab 7 Content</calcite-tab>\n        <calcite-tab>Tab 8 Content</calcite-tab>\n      </calcite-tabs>\n    </calcite-tabs>\n    \n    <calcite-tabs layout="center" scale="{scale}">\n        <calcite-tab-nav slot="title-group">\n          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>\n          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>\n          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>\n          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>\n          <calcite-tab-title>Tab 5 Title</calcite-tab-title>\n          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>\n          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>\n          <calcite-tab-title>Tab 8 Title</calcite-tab-title>\n        </calcite-tab-nav>\n        <calcite-tab selected>Tab 1 Content</calcite-tab>\n        <calcite-tab>Tab 2 Content</calcite-tab>\n        <calcite-tab>Tab 3 Content</calcite-tab>\n        <calcite-tab selected>Tab 4 Content</calcite-tab>\n        <calcite-tab>Tab 5 Content</calcite-tab>\n        <calcite-tab>Tab 6 Content</calcite-tab>\n        <calcite-tab>Tab 7 Content</calcite-tab>\n        <calcite-tab>Tab 8 Content</calcite-tab>\n      </calcite-tabs>\n    </calcite-tabs>\n    \n    <calcite-tabs bordered scale="{scale}">\n        <calcite-tab-nav slot="title-group">\n          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>\n          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>\n          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>\n          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>\n          <calcite-tab-title>Tab 5 Title</calcite-tab-title>\n          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>\n          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>\n          <calcite-tab-title>Tab 8 Title</calcite-tab-title>\n        </calcite-tab-nav>\n        <calcite-tab>Tab 1 Content</calcite-tab>\n        <calcite-tab>Tab 2 Content</calcite-tab>\n        <calcite-tab>Tab 3 Content</calcite-tab>\n        <calcite-tab selected>Tab 4 Content</calcite-tab>\n        <calcite-tab>Tab 5 Content</calcite-tab>\n        <calcite-tab>Tab 6 Content</calcite-tab>\n        <calcite-tab>Tab 7 Content</calcite-tab>\n        <calcite-tab>Tab 8 Content</calcite-tab>\n      </calcite-tabs>\n    </calcite-tabs>\n    \n    <calcite-tabs bordered layout="center" scale="{scale}">\n        <calcite-tab-nav slot="title-group">\n          <calcite-tab-title icon-start="tabbed-view" icon-end="pen" closable>Tab 1 Title</calcite-tab-title>\n          <calcite-tab-title icon-start="tabbed-view">Tab 2 Title</calcite-tab-title>\n          <calcite-tab-title>An Ultramarathon of a Tab Title, why not.</calcite-tab-title>\n          <calcite-tab-title closable selected>Tab 4 Title</calcite-tab-title>\n          <calcite-tab-title>Tab 5 Title</calcite-tab-title>\n          <calcite-tab-title icon-start="tabbed-view" icon-end="pen">Tab 6 Title</calcite-tab-title>\n          <calcite-tab-title closable>Tab 7 Title</calcite-tab-title>\n          <calcite-tab-title>Tab 8 Title</calcite-tab-title>\n        </calcite-tab-nav>\n        <calcite-tab >Tab 1 Content</calcite-tab>\n        <calcite-tab>Tab 2 Content</calcite-tab>\n        <calcite-tab>Tab 3 Content</calcite-tab>\n        <calcite-tab selected>Tab 4 Content</calcite-tab>\n        <calcite-tab>Tab 5 Content</calcite-tab>\n        <calcite-tab>Tab 6 Content</calcite-tab>\n        <calcite-tab>Tab 7 Content</calcite-tab>\n        <calcite-tab>Tab 8 Content</calcite-tab>\n      </calcite-tabs>\n    </calcite-tabs>\n  `)',...responsiveTabs.parameters?.docs?.source}}},paddingPropOverrideAtRootLevel.parameters={...paddingPropOverrideAtRootLevel.parameters,docs:{...paddingPropOverrideAtRootLevel.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    :root {\n      --calcite-tab-content-block-padding: 0;\n    }\n  </style>\n  <calcite-tabs>\n    <calcite-tabs>\n      <calcite-tab-nav slot="title-group">\n        <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>\n      </calcite-tab-nav>\n      <calcite-tab>\n        <div>Tab 1 Content</div>\n      </calcite-tab>\n    </calcite-tabs>\n  </calcite-tabs>\n`',...paddingPropOverrideAtRootLevel.parameters?.docs?.source}}},paddingPropOverrideAtElementLevel.parameters={...paddingPropOverrideAtElementLevel.parameters,docs:{...paddingPropOverrideAtElementLevel.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tabs>\n    <calcite-tabs>\n      <calcite-tab-nav slot="title-group">\n        <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>\n      </calcite-tab-nav>\n      <calcite-tab style="--calcite-tab-content-block-padding: 0;">\n        <div>Tab 1 Content</div>\n      </calcite-tab>\n    </calcite-tabs>\n  </calcite-tabs>\n`',...paddingPropOverrideAtElementLevel.parameters?.docs?.source}}};const __namedExportsOrder=["simpleDarkModeRTL_TestOnly","bordered","closable","borderedDarkModeRTL_TestOnly","withIcons","setWidth","centerScale_TestOnly","centerVariedTabWidthScale_TestOnly","centerBorderedScale_TestOnly","centerBorderedVariedTabWidthScale_TestOnly","inlineScale_TestOnly","inlineVariedTabWidthScale_TestOnly","inlineBorderedScale_TestOnly","inlineBorderedVariedTabWidthScale_TestOnly","disabledTabsAndMediumIconsForLargeTabsTitle_TestOnly","centered_TestOnly","centeredClosable_TestOnly","centeredBorderedClosable_TestOnly","centeredTabsAreEvenlyJustifiedAcrossNavWidth_TestOnly","inlineTabsJustifyAgainstTheStartOfTheNavWidth_TestOnly","Tab100PercentHeightNoVerticalScroll","Tab200PercentHeightWithVerticalScroll","updateIndicatorOffset_TestOnly","fixedHeightNoVerticalScrollbar_TestOnly","noVerticalScrollbarInsideShellPanel_TestOnly","responsiveTabs","paddingPropOverrideAtRootLevel","paddingPropOverrideAtElementLevel"]},"./.storybook/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>iconNames});var _esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@esri/calcite-ui-icons/index.js");const iconNames=Object.keys(_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))).sort(((a,b)=>{const iPrefixedNumberIconNamePattern=/^i(\d)/;return a.replace(iPrefixedNumberIconNamePattern,"$1").localeCompare(b.replace(iPrefixedNumberIconNamePattern,"$1"))}))},"./.storybook/placeholderImage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function placeholderImage({width=300,height=150,text=`${width}×${height}`,fontFamily="sans-serif",fontWeight="bold",fontSize=Math.floor(.2*Math.min(width,height)),dy=.35*fontSize,bgColor="#ddd",textColor="rgba(0,0,0,0.5)",dataUri=!0,charset="UTF-8"}){const cleaned=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    <rect fill="${bgColor}" width="${width}" height="${height}"/>\n    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>\n  </svg>`.replace(/[\t\n\r]/gim,"").replace(/\s\s+/g," ").replace(/'/gim,"\\i");if(dataUri){return`data:image/svg+xml;charset=${charset},${encodeURIComponent(cleaned).replace(/\(/g,"%28").replace(/\)/g,"%29")}`}return cleaned}__webpack_require__.d(__webpack_exports__,{j:()=>placeholderImage})},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-tabs-tabs-stories.07b181ff.iframe.bundle.js.map