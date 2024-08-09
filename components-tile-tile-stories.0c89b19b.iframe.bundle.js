"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[2893],{"./src/components/tile/tile.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,allVariants:()=>allVariants,contentStartRTL_TestOnly:()=>contentStartRTL_TestOnly,contentTopBotton_TestOnly:()=>contentTopBotton_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled_TestOnly:()=>disabled_TestOnly,overflowingContent_TestOnly:()=>overflowingContent_TestOnly,simple:()=>simple,widthSetToBreakpoints_TestOnly:()=>widthSetToBreakpoints_TestOnly});var _storybook_helpers__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/helpers.ts"),_storybook_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./support/formatting.ts"),_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./.storybook/placeholderImage.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/resources.ts");const{scale}=_storybook_resources__WEBPACK_IMPORTED_MODULE_3__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Tiles/Tile",args:{active:!1,description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.",disabled:!1,heading:"Tile heading lorem ipsum",hidden:!1,href:"#",icon:"layer",scale:scale.defaultValue},argTypes:{icon:{options:_storybook_helpers__WEBPACK_IMPORTED_MODULE_0__.k,control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tile
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("active",args.active)}
    description="${args.description}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("disabled",args.disabled)}
    heading="${args.heading}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.zM)("hidden",args.hidden)}
    href="${args.href}"
    icon="${args.icon}"
    scale="${args.scale}"
  >
  </calcite-tile>
`,allVariants=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <style>
    .parent {
      display: flex;
      color: var(--calcite-color-text-3);
      font-family: var(--calcite-sans-family);
      font-size: var(--calcite-font-size-0);
      font-weight: var(--calcite-font-weight-medium);
    }

    .child {
      display: inline-flex;
      flex-direction: column;
      flex: 0 1 50%;
      padding: 15px;
    }

    .right-aligned-text {
      text-align: right;
      flex: 0 0 21%;
    }

    hr {
      margin: 25px 0;
      border-top: 1px solid var(--calcite-color-border-2);
    }
    calcite-chip.new {
      background-color: #d8efda;
      color: #13631f;
    }
  </style>
  <div class="parent">
    <div class="child right-aligned-text">scale</div>
    <div class="child">small</div>
    <div class="child">medium</div>
    <div class="child">large</div>
  </div>

  <!-- heading only -->
  <div class="parent">
    <div class="child right-aligned-text">heading only</div>

    <div class="child">
      <calcite-tile heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- heading only with link -->
  <div class="parent">
    <div class="child right-aligned-text">heading only with link</div>

    <div class="child">
      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- basic -->
  <div class="parent">
    <div class="child right-aligned-text">basic</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- link -->
  <div class="parent">
    <div class="child right-aligned-text">link</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- large visual -->
  <div class="parent">
    <div class="child right-aligned-text">large visual</div>

    <div class="child">
      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- link large visual -->
  <div class="parent">
    <div class="child right-aligned-text">link large visual</div>

    <div class="child">
      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- content-top slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-top slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-bottom slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-top slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-top slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-bottom slot</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- only content-top slot -->
  <div class="parent">
    <div class="child right-aligned-text">only content-top slot</div>

    <div class="child">
      <calcite-tile scale="s">
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-top" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-top" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-top" />
      </calcite-tile>
    </div>
  </div>

  <!-- only content-bottom slot -->
  <div class="parent">
    <div class="child right-aligned-text">only content-bottom slot</div>

    <div class="child">
      <calcite-tile scale="s">
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-bottom" />
      </calcite-tile>
    </div>
  </div>

  <!-- only content-top and content-bottom slots -->
  <div class="parent">
    <div class="child right-aligned-text">only content-top and content-bottom slots</div>

    <div class="child">
      <calcite-tile scale="s">
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-top" />
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="m">
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-top" />
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-bottom" />
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile scale="l">
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-top" />
        <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_4__.j)({width:500,height:500})}" slot="content-bottom" />
      </calcite-tile>
    </div>
  </div>

  <!-- content-start slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-start slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-start slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-start slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- content-end slot -->
  <div class="parent">
    <div class="child right-aligned-text">content-end slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-end slot -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-end slot (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- content-start & content-end slots -->
  <div class="parent">
    <div class="child right-aligned-text">content-start & content-end slots (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-start & content-end slots -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-start & content-end slots (deprecated)</div>

    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-start" icon="banana"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <hr />

  <!-- heading only centered -->
  <div class="parent">
    <div class="child right-aligned-text">heading only centered</div>

    <div class="child">
      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- heading only with link centered -->
  <div class="parent">
    <div class="child right-aligned-text">heading only with link centered</div>

    <div class="child">
      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="s"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="m"></calcite-tile>
    </div>
    <div class="child">
      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="l"></calcite-tile>
    </div>
  </div>

  <!-- basic centered -->
  <div class="parent">
    <div class="child right-aligned-text">basic centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        mode="dark"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- content-top slot centered -->
  <div class="parent">
    <div class="child right-aligned-text">content-top slot centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- content-bottom slot centered-->
  <div class="parent">
    <div class="child right-aligned-text">content-bottom slot centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>
      </calcite-tile>
    </div>
  </div>

  <!-- link centered -->
  <div class="parent">
    <div class="child right-aligned-text">link centered</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
      </calcite-tile>
    </div>
  </div>

  <!-- content-start & content-end slot centered (deprecated) -->
  <div class="parent">
    <div class="child right-aligned-text">content-start & content-end slot centered (deprecated)</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>

  <!-- link with content-start & content-end slot centered (deprecated) -->
  <div class="parent">
    <div class="child right-aligned-text">link with content-start & content-end slot centered (deprecated)</div>

    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="s"
      >
        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="m"
      >
        <calcite-icon slot="content-end" icon="banana"></calcite-icon>
      </calcite-tile>
    </div>
    <div class="child">
      <calcite-tile
        alignment="center"
        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
        heading="Tile title lorem ipsum"
        href="/"
        icon="layers"
        scale="l"
      >
        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>
        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>
      </calcite-tile>
    </div>
  </div>
`,darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tile
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    heading="Tile heading lorem ipsum"
    href="#"
    icon="layer"
    class="calcite-mode-dark"
    dir="rtl"
  >
  </calcite-tile>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.At};const contentTopBotton_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tile description="polygon layer" heading="Percent of population that carpool to work" icon="layers">
    <calcite-icon slot="content-top" icon="polygon"></calcite-icon>
    <calcite-icon slot="content-bottom" icon="launch"></calcite-icon>
  </calcite-tile>
`,contentStartRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tile description="polygon layer" heading="Percent of population that carpool to work" dir="rtl">
    <calcite-icon scale="s" slot="content-start" icon="polygon"></calcite-icon>
    <calcite-icon scale="s" slot="content-end" icon="launch"></calcite-icon>
  </calcite-tile>
`,overflowingContent_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tile
    icon="2d-explore"
    heading="Example tile headinghfjkdlsahfjklsdahfjklsadhfjkldsahfjldkashfjdkalshfds;ahfjkldshafljkdsahfljksdahfdlsajkfhsadkljfhsdajklfhsdalkjfhdsalkjfhdsalf"
    description="Example tile description contenthfjdkslahfjkdsalhf sdajklfh ksdjahfljksadhfljkdsahfjklsdahfjlkdsahflkjdsahfjkdsahflkdjsahfldksajhfdsklajhfdsljkahfdsajkfhsadlkjfsadhfdsa"
    style="width:200px"
  ></calcite-tile>
`,disabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q`
  <calcite-tile
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    disabled
    heading="Tile heading lorem ipsum"
    icon="layer"
  >
  </calcite-tile>
`,widthSetToBreakpoints_TestOnly=()=>(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_1__.DY)(_support_formatting__WEBPACK_IMPORTED_MODULE_2__.q` <calcite-tile
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      heading="Tile title lorem ipsum"
      icon="layers"
      scale="{scale}"
    ></calcite-tile>`),__namedExportsOrder=["simple","allVariants","darkModeRTL_TestOnly","contentTopBotton_TestOnly","contentStartRTL_TestOnly","overflowingContent_TestOnly","disabled_TestOnly","widthSetToBreakpoints_TestOnly"];simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: TileStoryArgs): string => html`\n  <calcite-tile\n    ${boolean("active", args.active)}\n    description="${args.description}"\n    ${boolean("disabled", args.disabled)}\n    heading="${args.heading}"\n    ${boolean("hidden", args.hidden)}\n    href="${args.href}"\n    icon="${args.icon}"\n    scale="${args.scale}"\n  >\n  </calcite-tile>\n`',...simple.parameters?.docs?.source}}},allVariants.parameters={...allVariants.parameters,docs:{...allVariants.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .parent {\n      display: flex;\n      color: var(--calcite-color-text-3);\n      font-family: var(--calcite-sans-family);\n      font-size: var(--calcite-font-size-0);\n      font-weight: var(--calcite-font-weight-medium);\n    }\n\n    .child {\n      display: inline-flex;\n      flex-direction: column;\n      flex: 0 1 50%;\n      padding: 15px;\n    }\n\n    .right-aligned-text {\n      text-align: right;\n      flex: 0 0 21%;\n    }\n\n    hr {\n      margin: 25px 0;\n      border-top: 1px solid var(--calcite-color-border-2);\n    }\n    calcite-chip.new {\n      background-color: #d8efda;\n      color: #13631f;\n    }\n  </style>\n  <div class="parent">\n    <div class="child right-aligned-text">scale</div>\n    <div class="child">small</div>\n    <div class="child">medium</div>\n    <div class="child">large</div>\n  </div>\n\n  \x3c!-- heading only --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading only</div>\n\n    <div class="child">\n      <calcite-tile heading="Tile title lorem ipsum" scale="s"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile heading="Tile title lorem ipsum" scale="m"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile heading="Tile title lorem ipsum" scale="l"></calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- heading only with link --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading only with link</div>\n\n    <div class="child">\n      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="s"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="m"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile href="/" heading="Tile title lorem ipsum" scale="l"></calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- basic --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">basic</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="s"\n      >\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="m"\n      >\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="l"\n      >\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- link --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">link</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="s"\n      >\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="m"\n      >\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="l"\n      >\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- large visual --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">large visual</div>\n\n    <div class="child">\n      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="s"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="m"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile icon="layers" heading="Tile title lorem ipsum" scale="l"></calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- link large visual --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">link large visual</div>\n\n    <div class="child">\n      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="s"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="m"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile href="/" icon="layers" heading="Tile title lorem ipsum" scale="l"></calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- content-top slot --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">content-top slot</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- content-bottom slot --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">content-bottom slot</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- link with content-top slot --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">link with content-top slot</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- link with content-bottom slot --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">link with content-bottom slot</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- only content-top slot --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">only content-top slot</div>\n\n    <div class="child">\n      <calcite-tile scale="s">\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile scale="m">\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile scale="l">\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- only content-bottom slot --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">only content-bottom slot</div>\n\n    <div class="child">\n      <calcite-tile scale="s">\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile scale="m">\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile scale="l">\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- only content-top and content-bottom slots --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">only content-top and content-bottom slots</div>\n\n    <div class="child">\n      <calcite-tile scale="s">\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile scale="m">\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile scale="l">\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- content-start slot --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">content-start slot (deprecated)</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-icon slot="content-start" icon="banana"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- link with content-start slot --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">link with content-start slot (deprecated)</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-icon slot="content-start" icon="banana"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- content-end slot --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">content-end slot (deprecated)</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-icon slot="content-end" icon="banana"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- link with content-end slot --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">link with content-end slot (deprecated)</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-icon slot="content-end" icon="banana"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- content-start & content-end slots --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">content-start & content-end slots (deprecated)</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>\n        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-icon slot="content-start" icon="banana"></calcite-icon>\n        <calcite-icon slot="content-end" icon="banana"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>\n        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- link with content-start & content-end slots --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">link with content-start & content-end slots (deprecated)</div>\n\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>\n        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-icon slot="content-start" icon="banana"></calcite-icon>\n        <calcite-icon slot="content-end" icon="banana"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>\n        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>\n      </calcite-tile>\n    </div>\n  </div>\n\n  <hr />\n\n  \x3c!-- heading only centered --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading only centered</div>\n\n    <div class="child">\n      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="s"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="m"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile alignment="center" heading="Tile title lorem ipsum" scale="l"></calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- heading only with link centered --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading only with link centered</div>\n\n    <div class="child">\n      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="s"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="m"></calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile alignment="center" href="/" heading="Tile title lorem ipsum" scale="l"></calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- basic centered --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">basic centered</div>\n\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        mode="dark"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="s"\n      >\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="m"\n      >\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="l"\n      >\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- content-top slot centered --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">content-top slot centered</div>\n\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-top" scale="s">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-top">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-top" scale="l">New</calcite-chip>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- content-bottom slot centered--\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">content-bottom slot centered</div>\n\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="s">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-bottom">New</calcite-chip>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-chip class="new" kind="brand" slot="content-bottom" scale="l">New</calcite-chip>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- link centered --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">link centered</div>\n\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="s"\n      >\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="m"\n      >\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="l"\n      >\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- content-start & content-end slot centered (deprecated) --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">content-start & content-end slot centered (deprecated)</div>\n\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>\n        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-icon slot="content-end" icon="banana"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>\n        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>\n      </calcite-tile>\n    </div>\n  </div>\n\n  \x3c!-- link with content-start & content-end slot centered (deprecated) --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">link with content-start & content-end slot centered (deprecated)</div>\n\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="s"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="s"></calcite-icon>\n        <calcite-icon slot="content-end" icon="banana" scale="s"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="m"\n      >\n        <calcite-icon slot="content-end" icon="banana"></calcite-icon>\n      </calcite-tile>\n    </div>\n    <div class="child">\n      <calcite-tile\n        alignment="center"\n        description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n        heading="Tile title lorem ipsum"\n        href="/"\n        icon="layers"\n        scale="l"\n      >\n        <calcite-icon slot="content-start" icon="banana" scale="l"></calcite-icon>\n        <calcite-icon slot="content-end" icon="banana" scale="l"></calcite-icon>\n      </calcite-tile>\n    </div>\n  </div>\n`',...allVariants.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tile\n    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."\n    heading="Tile heading lorem ipsum"\n    href="#"\n    icon="layer"\n    class="calcite-mode-dark"\n    dir="rtl"\n  >\n  </calcite-tile>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},contentTopBotton_TestOnly.parameters={...contentTopBotton_TestOnly.parameters,docs:{...contentTopBotton_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tile description="polygon layer" heading="Percent of population that carpool to work" icon="layers">\n    <calcite-icon slot="content-top" icon="polygon"></calcite-icon>\n    <calcite-icon slot="content-bottom" icon="launch"></calcite-icon>\n  </calcite-tile>\n`',...contentTopBotton_TestOnly.parameters?.docs?.source}}},contentStartRTL_TestOnly.parameters={...contentStartRTL_TestOnly.parameters,docs:{...contentStartRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tile description="polygon layer" heading="Percent of population that carpool to work" dir="rtl">\n    <calcite-icon scale="s" slot="content-start" icon="polygon"></calcite-icon>\n    <calcite-icon scale="s" slot="content-end" icon="launch"></calcite-icon>\n  </calcite-tile>\n`',...contentStartRTL_TestOnly.parameters?.docs?.source}}},overflowingContent_TestOnly.parameters={...overflowingContent_TestOnly.parameters,docs:{...overflowingContent_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tile\n    icon="2d-explore"\n    heading="Example tile headinghfjkdlsahfjklsdahfjklsadhfjkldsahfjldkashfjdkalshfds;ahfjkldshafljkdsahfljksdahfdlsajkfhsadkljfhsdajklfhsdalkjfhdsalkjfhdsalf"\n    description="Example tile description contenthfjdkslahfjkdsalhf sdajklfh ksdjahfljksadhfljkdsahfjklsdahfjlkdsahflkjdsahfjkdsahflkdjsahfldksajhfdsklajhfdsljkahfdsajkfhsadlkjfsadhfdsa"\n    style="width:200px"\n  ></calcite-tile>\n`',...overflowingContent_TestOnly.parameters?.docs?.source}}},disabled_TestOnly.parameters={...disabled_TestOnly.parameters,docs:{...disabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-tile\n    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."\n    disabled\n    heading="Tile heading lorem ipsum"\n    icon="layer"\n  >\n  </calcite-tile>\n`',...disabled_TestOnly.parameters?.docs?.source}}},widthSetToBreakpoints_TestOnly.parameters={...widthSetToBreakpoints_TestOnly.parameters,docs:{...widthSetToBreakpoints_TestOnly.parameters?.docs,source:{originalSource:'(): string => createBreakpointStories(html` <calcite-tile\n      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n      heading="Tile title lorem ipsum"\n      icon="layers"\n      scale="{scale}"\n    ></calcite-tile>`)',...widthSetToBreakpoints_TestOnly.parameters?.docs?.source}}}},"./.storybook/helpers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>iconNames});var _esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../calcite-ui-icons/index.js");const iconNames=Object.keys(_esri_calcite_ui_icons__WEBPACK_IMPORTED_MODULE_0__).filter((iconName=>iconName.endsWith("16"))).map((iconName=>iconName.replace("16",""))).sort(((a,b)=>{const iPrefixedNumberIconNamePattern=/^i(\d)/;return a.replace(iPrefixedNumberIconNamePattern,"$1").localeCompare(b.replace(iPrefixedNumberIconNamePattern,"$1"))}))},"./.storybook/placeholderImage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function placeholderImage({width=300,height=150,text=`${width}×${height}`,fontFamily="sans-serif",fontWeight="bold",fontSize=Math.floor(.2*Math.min(width,height)),dy=.35*fontSize,bgColor="#ddd",textColor="rgba(0,0,0,0.5)",dataUri=!0,charset="UTF-8"}){const cleaned=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    <rect fill="${bgColor}" width="${width}" height="${height}"/>\n    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>\n  </svg>`.replace(/[\t\n\r]/gim,"").replace(/\s\s+/g," ").replace(/'/gim,"\\i");if(dataUri){return`data:image/svg+xml;charset=${charset},${encodeURIComponent(cleaned).replace(/\(/g,"%28").replace(/\)/g,"%29")}`}return cleaned}__webpack_require__.d(__webpack_exports__,{j:()=>placeholderImage})},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],overlayPositioningOptions=["absolute","fixed"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},overlayPositioning:{values:overlayPositioningOptions,defaultValue:overlayPositioningOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-tile-tile-stories.0c89b19b.iframe.bundle.js.map