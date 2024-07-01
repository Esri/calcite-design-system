"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[9061],{"./src/components/tile-group/tile-group.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,allVariantsHorizontal:()=>allVariantsHorizontal,allVariantsVertical:()=>allVariantsVertical,default:()=>__WEBPACK_DEFAULT_EXPORT__,simple:()=>simple});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/placeholderImage.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/resources.ts");const{dir,layout,scale}=_storybook_resources__WEBPACK_IMPORTED_MODULE_2__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Tiles/Tile Group",args:{dir:dir.defaultValue,disabled:!1,layout:layout.defaultValue,scale:scale.defaultValue},argTypes:{dir:{options:dir.values,control:{type:"select"}},layout:{options:layout.values.filter((option=>"grid"!==option&&"inline"!==option&&"center"!==option&&"auto"!==option&&"fixed"!==option&&"none"!==option&&"horizontal-single"!==option)),control:{type:"select"}},scale:{options:scale.values,control:{type:"select"}}},parameters:{chromatic:{delay:1e4,viewports:[1728]}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-tile-group
    dir="${args.dir}"
    ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
    layout="${args.layout}"
    scale="${args.scale}"
  >
    <calcite-tile
      heading="Tile heading lorem ipsum"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      icon="layers"
    ></calcite-tile>
    <calcite-tile
      heading="Tile heading lorem ipsum"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
      icon="layers"
    ></calcite-tile>
    <calcite-tile
      heading="Tile heading lorem ipsum"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
      icon="layers"
    ></calcite-tile>
    <calcite-tile
      heading="Tile heading lorem ipsum"
      description="Iterative approaches to corporate strategy foster collab."
      icon="layers"
    ></calcite-tile>
  </calcite-tile-group>
`,allVariantsHorizontal=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
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

    .screenshot-test {
      gap: 1em;
      padding: 0 1em;
    }

    .spaced-column {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    hr {
      margin: 25px 0;
      border-top: 1px solid var(--calcite-color-border-2);
    }
  </style>

  <!-- screenshot test area -->
  <div class="screenshot-test parent">
    <div class="spaced-column">
      <span>single</span>
      <calcite-tile-group scale="s" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="m" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="l" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="spaced-column">
      <span>multiple</span>
      <calcite-tile-group scale="s" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="m" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="l" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="spaced-column">
      <span>none</span>
      <calcite-tile-group scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="m">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- horizontal -->
  <div class="parent">
    <div class="child right-aligned-text"><h2>horizontal</h2></div>
  </div>

  <div class="parent">
    <div class="child"></div>
    <div class="child">small</div>
    <div class="child">medium</div>
    <div class="child">large</div>
  </div>

  <!-- single selection-appearance="border" -->
  <div class="parent">
    <div class="child right-aligned-text">single selection-appearance="border"</div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="single" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="single" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- multiple selection-appearance="border" -->
  <div class="parent">
    <div class="child right-aligned-text">multiple selection-appearance="border"</div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="multiple" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-appearance="border" selection-mode="multiple" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- single-persist -->
  <div class="parent">
    <div class="child right-aligned-text">single-persist</div>
    <div class="child">
      <calcite-tile-group selection-mode="single-persist" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-mode="single-persist">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group selection-mode="single-persist" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
          selected
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
          selected
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- none -->
  <div class="parent">
    <div class="child right-aligned-text">none</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- center alignment -->
  <div class="parent">
    <div class="child right-aligned-text">center alignment</div>
    <div class="child">
      <calcite-tile-group alignment="center" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" scale="s" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" scale="s" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group alignment="center">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group alignment="center" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" scale="l" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
      <calcite-tile-group alignment="center" scale="l" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- links -->
  <div class="parent">
    <div class="child right-aligned-text">links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- disabled -->
  <div class="parent">
    <div class="child right-aligned-text">disabled</div>
    <div class="child">
      <calcite-tile-group scale="s" disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l" disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- disabled links -->
  <div class="parent">
    <div class="child right-aligned-text">disabled links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          disabled
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading -->
  <div class="parent">
    <div class="child right-aligned-text">heading</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading links -->
  <div class="parent">
    <div class="child right-aligned-text">heading links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- description -->
  <div class="parent">
    <div class="child right-aligned-text">description</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- description links -->
  <div class="parent">
    <div class="child right-aligned-text">description links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading and description -->
  <div class="parent">
    <div class="child right-aligned-text">heading and description</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading and description links -->
  <div class="parent">
    <div class="child right-aligned-text">heading and description links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- icon and heading (large visual) -->
  <div class="parent">
    <div class="child right-aligned-text">icon and heading (large visual)</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- icon and heading (large visual) links -->
  <div class="parent">
    <div class="child right-aligned-text">icon and heading (large visual) links</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- content-top slotted images -->
  <div class="parent">
    <div class="child right-aligned-text">content-top slotted images</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- content-bottom slotted images -->
  <div class="parent">
    <div class="child right-aligned-text">content-bottom slotted images</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- slotted images in both slots -->
  <div class="parent">
    <div class="child right-aligned-text">slotted images in both slots</div>
    <div class="child">
      <calcite-tile-group scale="s">
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group scale="l">
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
        <calcite-tile>
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-top" />
          <img src="${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:500,height:500})}" slot="content-bottom" />
        </calcite-tile>
      </calcite-tile-group>
    </div>
  </div>
`,allVariantsVertical=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
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

    .screenshot-test {
      gap: 1em;
      padding: 0 1em;
    }

    .spaced-column {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    hr {
      margin: 25px 0;
      border-top: 1px solid var(--calcite-color-border-2);
    }
  </style>

  <!-- Vertical -->
  <div class="parent">
    <div class="child right-aligned-text"><h2>vertical</h2></div>
  </div>

  <div class="parent">
    <div class="child"></div>
    <div class="child">small</div>
    <div class="child">medium</div>
    <div class="child">large</div>
  </div>

  <!-- single -->
  <div class="parent">
    <div class="child right-aligned-text">single</div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- single selection-appearance="border" -->
  <div class="parent">
    <div class="child right-aligned-text">single selection-appearance="border"</div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-appearance="border" selection-mode="single" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-appearance="border" selection-mode="single">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-appearance="border" selection-mode="single" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- multiple -->
  <div class="parent">
    <div class="child right-aligned-text">multiple</div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="multiple" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="multiple">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="multiple" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- single-persist -->
  <div class="parent">
    <div class="child right-aligned-text">single-persist</div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single-persist" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single-persist">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" selection-mode="single-persist" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- none -->
  <div class="parent">
    <div class="child right-aligned-text">none</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Iterative approaches to corporate strategy foster collab."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- links -->
  <div class="parent">
    <div class="child right-aligned-text">links</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          href="/"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- disabled -->
  <div class="parent">
    <div class="child right-aligned-text">disabled</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s" disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l" disabled>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
        <calcite-tile
          heading="Tile heading lorem ipsum"
          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."
          icon="layers"
        ></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading -->
  <div class="parent">
    <div class="child right-aligned-text">heading</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
        <calcite-tile heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading links -->
  <div class="parent">
    <div class="child right-aligned-text">heading links</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
        <calcite-tile href="/" heading="Tile title"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- description -->
  <div class="parent">
    <div class="child right-aligned-text">description</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
        <calcite-tile description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- description links -->
  <div class="parent">
    <div class="child right-aligned-text">description links</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
        <calcite-tile href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading and description -->
  <div class="parent">
    <div class="child right-aligned-text">heading and description</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- heading and description links -->
  <div class="parent">
    <div class="child right-aligned-text">heading and description links</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- icon and heading (large visual) -->
  <div class="parent">
    <div class="child right-aligned-text">icon and heading (large visual)</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>

  <!-- icon and heading (large visual) links -->
  <div class="parent">
    <div class="child right-aligned-text">icon and heading (large visual) links</div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="s">
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical">
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
    <div class="child">
      <calcite-tile-group layout="vertical" scale="l">
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>
      </calcite-tile-group>
    </div>
  </div>
`;simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: TileGroupStoryArgs): string => html`\n  <calcite-tile-group\n    dir="${args.dir}"\n    ${boolean("disabled", args.disabled)}\n    layout="${args.layout}"\n    scale="${args.scale}"\n  >\n    <calcite-tile\n      heading="Tile heading lorem ipsum"\n      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n      icon="layers"\n    ></calcite-tile>\n    <calcite-tile\n      heading="Tile heading lorem ipsum"\n      description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n      icon="layers"\n    ></calcite-tile>\n    <calcite-tile\n      heading="Tile heading lorem ipsum"\n      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n      icon="layers"\n    ></calcite-tile>\n    <calcite-tile\n      heading="Tile heading lorem ipsum"\n      description="Iterative approaches to corporate strategy foster collab."\n      icon="layers"\n    ></calcite-tile>\n  </calcite-tile-group>\n`',...simple.parameters?.docs?.source}}},allVariantsHorizontal.parameters={...allVariantsHorizontal.parameters,docs:{...allVariantsHorizontal.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .parent {\n      display: flex;\n      color: var(--calcite-color-text-3);\n      font-family: var(--calcite-sans-family);\n      font-size: var(--calcite-font-size-0);\n      font-weight: var(--calcite-font-weight-medium);\n    }\n\n    .child {\n      display: inline-flex;\n      flex-direction: column;\n      flex: 0 1 50%;\n      padding: 15px;\n    }\n\n    .right-aligned-text {\n      text-align: right;\n      flex: 0 0 21%;\n    }\n\n    .screenshot-test {\n      gap: 1em;\n      padding: 0 1em;\n    }\n\n    .spaced-column {\n      display: flex;\n      flex-direction: column;\n      gap: 1em;\n    }\n\n    hr {\n      margin: 25px 0;\n      border-top: 1px solid var(--calcite-color-border-2);\n    }\n  </style>\n\n  \x3c!-- screenshot test area --\x3e\n  <div class="screenshot-test parent">\n    <div class="spaced-column">\n      <span>single</span>\n      <calcite-tile-group scale="s" selection-mode="single">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group scale="m" selection-mode="single">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group scale="l" selection-mode="single">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="spaced-column">\n      <span>multiple</span>\n      <calcite-tile-group scale="s" selection-mode="multiple">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group scale="m" selection-mode="multiple">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group scale="l" selection-mode="multiple">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="spaced-column">\n      <span>none</span>\n      <calcite-tile-group scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group scale="m">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- horizontal --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text"><h2>horizontal</h2></div>\n  </div>\n\n  <div class="parent">\n    <div class="child"></div>\n    <div class="child">small</div>\n    <div class="child">medium</div>\n    <div class="child">large</div>\n  </div>\n\n  \x3c!-- single selection-appearance="border" --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">single selection-appearance="border"</div>\n    <div class="child">\n      <calcite-tile-group selection-appearance="border" selection-mode="single" scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group selection-appearance="border" selection-mode="single">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group selection-appearance="border" selection-mode="single" scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n          selected\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- multiple selection-appearance="border" --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">multiple selection-appearance="border"</div>\n    <div class="child">\n      <calcite-tile-group selection-appearance="border" selection-mode="multiple" scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group selection-appearance="border" selection-mode="multiple">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n          selected\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group selection-appearance="border" selection-mode="multiple" scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n          selected\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- single-persist --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">single-persist</div>\n    <div class="child">\n      <calcite-tile-group selection-mode="single-persist" scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group selection-mode="single-persist">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group selection-mode="single-persist" scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n          selected\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n          selected\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- none --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">none</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- center alignment --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">center alignment</div>\n    <div class="child">\n      <calcite-tile-group alignment="center" scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group alignment="center" scale="s" selection-mode="single">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group alignment="center" scale="s" selection-mode="multiple">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group alignment="center">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group alignment="center" selection-mode="single">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group alignment="center" selection-mode="multiple">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group alignment="center" scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group alignment="center" scale="l" selection-mode="single">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n      <calcite-tile-group alignment="center" scale="l" selection-mode="multiple">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- links --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">links</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- disabled --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">disabled</div>\n    <div class="child">\n      <calcite-tile-group scale="s" disabled>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group disabled>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l" disabled>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- disabled links --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">disabled links</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          disabled\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- heading --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- heading links --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading links</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- description --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">description</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- description links --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">description links</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- heading and description --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading and description</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- heading and description links --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading and description links</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- icon and heading (large visual) --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">icon and heading (large visual)</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- icon and heading (large visual) links --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">icon and heading (large visual) links</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- content-top slotted images --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">content-top slotted images</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n        </calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- content-bottom slotted images --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">content-bottom slotted images</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- slotted images in both slots --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">slotted images in both slots</div>\n    <div class="child">\n      <calcite-tile-group scale="s">\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group scale="l">\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n        <calcite-tile>\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-top" />\n          <img src="${placeholderImage({\n  width: 500,\n  height: 500\n})}" slot="content-bottom" />\n        </calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n`',...allVariantsHorizontal.parameters?.docs?.source}}},allVariantsVertical.parameters={...allVariantsVertical.parameters,docs:{...allVariantsVertical.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .parent {\n      display: flex;\n      color: var(--calcite-color-text-3);\n      font-family: var(--calcite-sans-family);\n      font-size: var(--calcite-font-size-0);\n      font-weight: var(--calcite-font-weight-medium);\n    }\n\n    .child {\n      display: inline-flex;\n      flex-direction: column;\n      flex: 0 1 50%;\n      padding: 15px;\n    }\n\n    .right-aligned-text {\n      text-align: right;\n      flex: 0 0 21%;\n    }\n\n    .screenshot-test {\n      gap: 1em;\n      padding: 0 1em;\n    }\n\n    .spaced-column {\n      display: flex;\n      flex-direction: column;\n      gap: 1em;\n    }\n\n    hr {\n      margin: 25px 0;\n      border-top: 1px solid var(--calcite-color-border-2);\n    }\n  </style>\n\n  \x3c!-- Vertical --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text"><h2>vertical</h2></div>\n  </div>\n\n  <div class="parent">\n    <div class="child"></div>\n    <div class="child">small</div>\n    <div class="child">medium</div>\n    <div class="child">large</div>\n  </div>\n\n  \x3c!-- single --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">single</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-mode="single" scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-mode="single">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-mode="single" scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- single selection-appearance="border" --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">single selection-appearance="border"</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-appearance="border" selection-mode="single" scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-appearance="border" selection-mode="single">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-appearance="border" selection-mode="single" scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- multiple --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">multiple</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-mode="multiple" scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-mode="multiple">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-mode="multiple" scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- single-persist --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">single-persist</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-mode="single-persist" scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-mode="single-persist">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" selection-mode="single-persist" scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- none --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">none</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Iterative approaches to corporate strategy foster collab."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- links --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">links</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="s">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="l">\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          href="/"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- disabled --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">disabled</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="s" disabled>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" disabled>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="l" disabled>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n        <calcite-tile\n          heading="Tile heading lorem ipsum"\n          description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collab on thinking to further the overall."\n          icon="layers"\n        ></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- heading --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="s">\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical">\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="l">\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n        <calcite-tile heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- heading links --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading links</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="s">\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical">\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="l">\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n        <calcite-tile href="/" heading="Tile title"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- description --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">description</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="s">\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical">\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="l">\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n        <calcite-tile description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- description links --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">description links</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="s">\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical">\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="l">\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n        <calcite-tile href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- heading and description --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading and description</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="s">\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical">\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="l">\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- heading and description links --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">heading and description links</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="s">\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical">\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="l">\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n        <calcite-tile heading="Tile title" href="/" description="Tile description"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- icon and heading (large visual) --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">icon and heading (large visual)</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="s">\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical">\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="l">\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n\n  \x3c!-- icon and heading (large visual) links --\x3e\n  <div class="parent">\n    <div class="child right-aligned-text">icon and heading (large visual) links</div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="s">\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical">\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n    <div class="child">\n      <calcite-tile-group layout="vertical" scale="l">\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n        <calcite-tile heading="Tile heading lorem ipsum" href="/" icon="layers"></calcite-tile>\n      </calcite-tile-group>\n    </div>\n  </div>\n`',...allVariantsVertical.parameters?.docs?.source}}};const __namedExportsOrder=["simple","allVariantsHorizontal","allVariantsVertical"]},"./.storybook/placeholderImage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function placeholderImage({width=300,height=150,text=`${width}×${height}`,fontFamily="sans-serif",fontWeight="bold",fontSize=Math.floor(.2*Math.min(width,height)),dy=.35*fontSize,bgColor="#ddd",textColor="rgba(0,0,0,0.5)",dataUri=!0,charset="UTF-8"}){const cleaned=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    <rect fill="${bgColor}" width="${width}" height="${height}"/>\n    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>\n  </svg>`.replace(/[\t\n\r]/gim,"").replace(/\s\s+/g," ").replace(/'/gim,"\\i");if(dataUri){return`data:image/svg+xml;charset=${charset},${encodeURIComponent(cleaned).replace(/\(/g,"%28").replace(/\)/g,"%29")}`}return cleaned}__webpack_require__.d(__webpack_exports__,{j:()=>placeholderImage})},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-tile-group-tile-group-stories.1446f0d5.iframe.bundle.js.map