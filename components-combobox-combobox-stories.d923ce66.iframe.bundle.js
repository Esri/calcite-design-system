"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[3823],{"./src/components/combobox/combobox.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,clearDisabled_TestOnly:()=>clearDisabled_TestOnly,darkModeRTL_TestOnly:()=>darkModeRTL_TestOnly,default:()=>__WEBPACK_DEFAULT_EXPORT__,disabled_TestOnly:()=>disabled_TestOnly,filterHighlighting:()=>filterHighlighting,flipPlacements_TestOnly:()=>flipPlacements_TestOnly,flipPositioning_TestOnly:()=>flipPositioning_TestOnly,longItemsAllSelectionModes:()=>longItemsAllSelectionModes,mediumIconForLargeComboboxItem_TestOnly:()=>mediumIconForLargeComboboxItem_TestOnly,multiple:()=>multiple,nestedGroups_TestOnly:()=>nestedGroups_TestOnly,nestedItems:()=>nestedItems,openInAllScales_TestOnly:()=>openInAllScales_TestOnly,openWithPlaceholderIconInAllScales_TestOnly:()=>openWithPlaceholderIconInAllScales_TestOnly,optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed_TestOnly:()=>optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed_TestOnly,readOnlyAllModes:()=>readOnlyAllModes,scrollingWithoutMaxItems_TestOnly:()=>scrollingWithoutMaxItems_TestOnly,single:()=>single,singleLongLabel_TestOnly:()=>singleLongLabel_TestOnly,validationMessageInAllScales_TestOnly:()=>validationMessageInAllScales_TestOnly,withPlaceholderIcon_TestOnly:()=>withPlaceholderIcon_TestOnly,withSelectorIndicatorAndIcons_TestOnly:()=>withSelectorIndicatorAndIcons_TestOnly,withoutPlaceholderIcon_TestOnly:()=>withoutPlaceholderIcon_TestOnly});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Controls/Combobox"},single=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox
      selection-display="all"
      selection-mode="single"
      label="demo"
      max-items="0"
      placeholder="placeholder"
      scale="m"
      status="idle"
    >
      <calcite-combobox-item icon="altitude" value="altitude" text-label="Altitude" selected></calcite-combobox-item>
      <calcite-combobox-item icon="article" value="article" text-label="Article"></calcite-combobox-item>
      <calcite-combobox-item icon="attachment" value="attachment" text-label="Attachment"></calcite-combobox-item>
      <calcite-combobox-item icon="banana" value="banana" text-label="Banana"></calcite-combobox-item>
      <calcite-combobox-item icon="battery3" value="battery" text-label="Batterycharging"></calcite-combobox-item>
      <calcite-combobox-item icon="beaker" value="beaker" text-label="Beaker"></calcite-combobox-item>
      <calcite-combobox-item icon="bell" value="bell" text-label="Bell"></calcite-combobox-item>
      <calcite-combobox-item icon="bookmark" value="bookmark" text-label="Bookmark"></calcite-combobox-item>
      <calcite-combobox-item icon="brightness" value="brightness" text-label="Brightness"></calcite-combobox-item>
      <calcite-combobox-item icon="calendar" value="calendar" text-label="Calendar"></calcite-combobox-item>
      <calcite-combobox-item icon="camera" value="camera" text-label="Camera"></calcite-combobox-item>
      <calcite-combobox-item icon="car" value="car" text-label="Car"></calcite-combobox-item>
      <calcite-combobox-item icon="clock" value="clock" text-label="Clock"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`,multiple=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <h2>selection-display="all" (default)</h2>
    <calcite-label>
      Some selected
      <calcite-combobox label="test" placeholder="Select items" max-items="10" scale="m" placeholder-icon="car">
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected
      <calcite-combobox label="test" placeholder="Select items" max-items="10" scale="m" placeholder-icon="car">
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>

    <h2>selection-display="fit"</h2>
    <calcite-label>
      Some selected with multiple visible chips
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      Some selected with multiple visible chips and overflow chip
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected with multiple visible chips and overflow chip
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      Some selected as a condensed indicator chip
      <calcite-combobox
        label="test"
        placeholder="Select any items you want"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected as a condensed indicator chip
      <calcite-combobox
        label="test"
        placeholder="Select any items you want"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" selected></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      Some selected as a compact indicator chip
      <calcite-combobox
        label="test"
        placeholder="this is an unusually long string of placeholder text"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected as a compact indicator chip
      <calcite-combobox
        label="test"
        placeholder="this is an unusually long string of placeholder text"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" selected></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>

    <h2>selection-display="single"</h2>
    <calcite-label>
      Some selected
      <calcite-combobox
        label="test"
        placeholder="Select any items"
        max-items="10"
        scale="m"
        selection-display="single"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected
      <calcite-combobox
        label="test"
        placeholder="Select any items"
        max-items="10"
        scale="m"
        selection-display="single"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      Some selected with compact indicator chip
      <calcite-combobox
        label="test"
        placeholder="Select any items you want to your heart's content"
        max-items="10"
        scale="m"
        selection-display="single"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected with compact indicator chip
      <calcite-combobox
        label="test"
        placeholder="Select any items you want to your heart's content"
        max-items="10"
        scale="m"
        selection-display="single"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
  </div>
`,nestedItems=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox
      open
      label="demo combobox"
      selection-mode="multiple"
      placeholder="placeholder"
      label="demo"
      scale="m"
      max-items="0"
      status="idle"
    >
      <calcite-combobox-item value="ITEM-0-0" text-label="Level 1">
        <calcite-combobox-item value="ITEM-0-1" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-0-2" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-0-3" text-label="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-1-0" text-label="Level 1">
        <calcite-combobox-item value="ITEM-1-1" text-label="Level 2">
          <calcite-combobox-item value="ITEM-1-1-0" text-label="Level 3"></calcite-combobox-item>
          <calcite-combobox-item value="ITEM-1-1-1" text-label="Level 3">
            <calcite-combobox-item value="ITEM-1-1-1-0" text-label="Level 4"></calcite-combobox-item>
            <calcite-combobox-item value="ITEM-1-1-1-1" text-label="Level 4"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="ITEM-1-2" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-1-3" text-label="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-2-0" text-label="Level 1">
        <calcite-combobox-item value="ITEM-2-1" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-2-2" text-label="Level 2">
          <calcite-combobox-item value="ITEM-2-2-0" text-label="Level 3"></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="ITEM-2-3" text-label="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-4" text-label="Level 1"></calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-5" text-label="Level 1"></calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-6" text-label="Level 1"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`,style=_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <style>
    calcite-combobox {
      width: 260px;
    }
    calcite-combobox-item {
      width: 260px;
    }
  </style>
`,longItemsAllSelectionModes=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  ${style}
  <div style="display: flex; flex-direction: column;"> 
    <div style="display: flex; flex-direction: row; margin-block-end: 160px;"> 
      <calcite-combobox open selection-mode="single" style="margin-right: 20px;">
        <calcite-combobox-item text-label="Layers">
        <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item>ß</calcite-combobox-item>
      </calcite-combobox>

      <calcite-combobox open selection-mode="single-persist">
        <calcite-combobox-item text-label="Layers">
        <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>
      </calcite-combobox>
    </div>

    <div style="display: flex; flex-direction: row;"> 
      <calcite-combobox open selection-mode="multiple" style="margin-right: 20px;">
        <calcite-combobox-item-group label="First item group">
          <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        </calcite-combobox-item-group>
        <calcite-combobox-item-group label="Last item group">
          <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>

      <calcite-combobox open selection-mode="ancestors">
        <calcite-combobox-item-group label="First item group">
          <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        </calcite-combobox-item-group>
        <calcite-combobox-item-group label="Last item group">
          <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>
    </div> 
  <div> 
`,disabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<calcite-combobox disabled>
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" text-label="Flowers" disabled>
      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>`,flipPlacements_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <style>
    .my-combobox {
      position: unset;
      margin-top: 50px;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <calcite-combobox class="my-combobox" placeholder="placeholder" open>
      <calcite-combobox-item value="Trees" text-label="Trees" aria-hidden="true">
        <calcite-combobox-item value="Pine" text-label="Pine" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers" aria-hidden="true">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item
          value="Black Eyed Susan"
          text-label="Black Eyed Susan"
          aria-hidden="true"
        ></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals" aria-hidden="true">
        <calcite-combobox-item value="Birds" text-label="Birds" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers" aria-hidden="true"></calcite-combobox-item>
    </calcite-combobox>
  </div>
  <script>
    document.querySelector(".my-combobox").flipPlacements = ["right"];
  </script>
`,flipPositioning_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="position: absolute; bottom: 10px; left: 10px;">
    <calcite-combobox max-items="6" placeholder="placeholder" label="demo" selection-mode="multiple" scale="m" open>
      <calcite-combobox-item value="Trees" text-label="Trees">
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;flipPositioning_TestOnly.parameters={layout:"fullscreen"};const darkModeRTL_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width:400px;max-width:100%;padding:100px">
    <calcite-combobox
      label="demo combobox"
      selection-mode="multiple"
      class="calcite-mode-dark"
      placeholder="placeholder"
      label="demo"
      validation-message="This should not appear because the status is not 'invalid'"
    >
      <calcite-combobox-item value="Trees" text-label="Trees">
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;darkModeRTL_TestOnly.parameters={themes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At};const singleLongLabel_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-combobox open selection-mode="single" allow-custom-values>
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item
        value="CommercialDamageAssessment - Damage to Commercial Buildings"
        text-label="CommercialDamageAssessment - Damage to Commercial Buildings &  Damage to Residential Buildings "
      ></calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" text-label="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
  </calcite-combobox>
`,withPlaceholderIcon_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <calcite-combobox
    id="labelFour"
    label="test"
    placeholder="select folder"
    placeholder-icon="select"
    max-items="6"
    selection-mode="single"
    scale="s"
  >
    <calcite-combobox-item value="root" text-label="username" icon="home"></calcite-combobox-item>
    <calcite-combobox-item value="1" text-label="Folder 1" icon="folder"></calcite-combobox-item>
    <calcite-combobox-item value="2" text-label="Folder 2" icon="folder"></calcite-combobox-item>
  </calcite-combobox>`,withoutPlaceholderIcon_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox placeholder="select folder" selection-mode="multiple" open>
      <calcite-combobox-item value="root" text-label="username" icon="home" selected></calcite-combobox-item>
      <calcite-combobox-item value="1" text-label="Folder 1" icon="folder"></calcite-combobox-item>
      <calcite-combobox-item value="2" text-label="Folder 2" icon="folder"></calcite-combobox-item>
    </calcite-combobox>
  </div>`,scrollingWithoutMaxItems_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox label="demo combobox" open>
      <calcite-combobox-item value="Trees" text-label="Trees" selected>
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
      <calcite-combobox-item value="Trees" text-label="Trees" selected>
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`,optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <style>
    .wrapper {
      display: flex;
      width: 100%;
    }

    calcite-combobox {
      width: 400px;
      margin: 0 auto;
    }
  </style>
  <div class="wrapper">
    <calcite-combobox placeholder="placeholder" overlay-positioning="fixed" placement="bottom" open>
      <calcite-combobox-item value="Trees" text-label="Trees" aria-hidden="true">
        <calcite-combobox-item value="Pine" text-label="Pine" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers" aria-hidden="true">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item
          value="Black Eyed Susan"
          text-label="Black Eyed Susan"
          aria-hidden="true"
        ></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals" aria-hidden="true">
        <calcite-combobox-item value="Birds" text-label="Birds" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers" aria-hidden="true"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`,mediumIconForLargeComboboxItem_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-combobox open scale="l">
    <calcite-combobox-item
      icon="altitude"
      value="altitude"
      text-label="Altitude"
      selected
      scale="l"
    ></calcite-combobox-item>
    <calcite-combobox-item icon="article" value="article" text-label="Article" scale="l"></calcite-combobox-item>
    <calcite-combobox-item value="altitude" text-label="Altitude" scale="l"></calcite-combobox-item>
    <calcite-combobox-item value="article" text-label="Article" scale="l"></calcite-combobox-item>
  </calcite-combobox>
`,withSelectorIndicatorAndIcons_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-combobox label="test" placeholder="select folder" selection-mode="multiple" open>
    <calcite-combobox-item text-label="Folder 1" icon="folder" selected>
      <calcite-combobox-item text-label="Sub Folder 1" icon="folder" selected>
        <calcite-combobox-item text-label="Sub Folder 2 " icon="folder" selected></calcite-combobox-item>
      </calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item text-label="Folder 2" icon="folder"></calcite-combobox-item>
    <calcite-combobox-item text-label="Folder 3" icon="folder"></calcite-combobox-item>
    <calcite-combobox-item text-label="Folder 4"></calcite-combobox-item>
    <calcite-combobox-item-group label="Files">
      <calcite-combobox-item text-label="File 1" icon="file" selected>
        <calcite-combobox-item text-label="file 2" icon="file" selected></calcite-combobox-item>
      </calcite-combobox-item>
    </calcite-combobox-item-group>
  </calcite-combobox>
`,nestedGroups_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-combobox label="test" placeholder="placeholder" max-items="10" scale="m" open>
    <calcite-combobox-item-group label="First item group">
      <calcite-combobox-item value="Pikachu" text-label="Pikachu"></calcite-combobox-item>
      <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>

      <calcite-combobox-item-group label="Cutest Pokémon">
        <calcite-combobox-item value="Bulbasaur" text-label="Bulbasaur"></calcite-combobox-item>
        <calcite-combobox-item-group label="No Pokémon 🙃"></calcite-combobox-item-group>

        <calcite-combobox-item-group label="Cutest Pokémon">
          <calcite-combobox-item value="Squirtle" text-label="Squirtle">
            <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox-item-group>
    </calcite-combobox-item-group>

    <calcite-combobox-item-group label="Last item group">
      <calcite-combobox-item value="Squirtle" text-label="Squirtle">
        <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>
      </calcite-combobox-item>
    </calcite-combobox-item-group>
  </calcite-combobox>
`,clearDisabled_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-combobox clear-disabled selection-mode="single" style="width:400px">
    <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
    <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>
  <br />
  <calcite-combobox clear-disabled selection-mode="multiple" style="width:400px">
    <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
    <calcite-combobox-item selected id="two" value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item selected id="three" value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>
  <br />
  <calcite-combobox clear-disabled selection-mode="ancestors" style="width:400px">
    <calcite-combobox-item value="parent" text-label="parent">
      <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
      <calcite-combobox-item selected value="child2" text-label="child2"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>
`,openInAllScales_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="display: flex">
    <calcite-combobox open placeholder="choose a number" scale="s">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" scale="m">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" scale="l">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`,openWithPlaceholderIconInAllScales_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <div style="display: flex">
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="s">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="m">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="l">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`,validationMessageInAllScales_TestOnly=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <div class="container">
    <calcite-combobox
      placeholder="choose a number"
      placeholder-icon="number"
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon
    >
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      placeholder="choose a number"
      placeholder-icon="number"
      scale="m"
      status="invalid"
      validation-message="This field is required."
      validation-icon
    >
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      placeholder="choose a number"
      placeholder-icon="number"
      scale="l"
      status="invalid"
      validation-message="This field is required."
      validation-icon
    >
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`,readOnlyAllModes=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <h1>read-only</h1>

  <h2>single</h2>
  <calcite-combobox read-only selection-mode="single">
    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>single-persist</h2>
  <calcite-combobox read-only selection-mode="single-persist">
    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>multiple</h2>
  <calcite-combobox read-only selection-mode="multiple">
    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" text-label="two" selected></calcite-combobox-item>
    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>ancestors</h2>
  <calcite-combobox read-only selection-mode="ancestors">
    <calcite-combobox-item value="parent" text-label="parent">
      <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
      <calcite-combobox-item selected value="child2" text-label="child2"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>
`,filterHighlighting=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`
  <calcite-combobox filter-text="Susan" max-items="6" open>
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item value="Pine" text-label="Pine">
        <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" text-label="Flowers">
      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Animals" text-label="Animals">
      <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
      <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
      <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
    <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
    <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
  </calcite-combobox>
`;single.parameters={...single.parameters,docs:{...single.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width:400px;max-width:100%;background-color:white;padding:100px">\n    <calcite-combobox\n      selection-display="all"\n      selection-mode="single"\n      label="demo"\n      max-items="0"\n      placeholder="placeholder"\n      scale="m"\n      status="idle"\n    >\n      <calcite-combobox-item icon="altitude" value="altitude" text-label="Altitude" selected></calcite-combobox-item>\n      <calcite-combobox-item icon="article" value="article" text-label="Article"></calcite-combobox-item>\n      <calcite-combobox-item icon="attachment" value="attachment" text-label="Attachment"></calcite-combobox-item>\n      <calcite-combobox-item icon="banana" value="banana" text-label="Banana"></calcite-combobox-item>\n      <calcite-combobox-item icon="battery3" value="battery" text-label="Batterycharging"></calcite-combobox-item>\n      <calcite-combobox-item icon="beaker" value="beaker" text-label="Beaker"></calcite-combobox-item>\n      <calcite-combobox-item icon="bell" value="bell" text-label="Bell"></calcite-combobox-item>\n      <calcite-combobox-item icon="bookmark" value="bookmark" text-label="Bookmark"></calcite-combobox-item>\n      <calcite-combobox-item icon="brightness" value="brightness" text-label="Brightness"></calcite-combobox-item>\n      <calcite-combobox-item icon="calendar" value="calendar" text-label="Calendar"></calcite-combobox-item>\n      <calcite-combobox-item icon="camera" value="camera" text-label="Camera"></calcite-combobox-item>\n      <calcite-combobox-item icon="car" value="car" text-label="Car"></calcite-combobox-item>\n      <calcite-combobox-item icon="clock" value="clock" text-label="Clock"></calcite-combobox-item>\n    </calcite-combobox>\n  </div>\n`',...single.parameters?.docs?.source}}},multiple.parameters={...multiple.parameters,docs:{...multiple.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width:400px;max-width:100%;background-color:white;padding:100px">\n    <h2>selection-display="all" (default)</h2>\n    <calcite-label>\n      Some selected\n      <calcite-combobox label="test" placeholder="Select items" max-items="10" scale="m" placeholder-icon="car">\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n    <calcite-label>\n      All selected\n      <calcite-combobox label="test" placeholder="Select items" max-items="10" scale="m" placeholder-icon="car">\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n\n    <h2>selection-display="fit"</h2>\n    <calcite-label>\n      Some selected with multiple visible chips\n      <calcite-combobox\n        label="test"\n        placeholder="Select items"\n        max-items="10"\n        scale="m"\n        selection-display="fit"\n        placeholder-icon="car"\n      >\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n    <calcite-label>\n      Some selected with multiple visible chips and overflow chip\n      <calcite-combobox\n        label="test"\n        placeholder="Select items"\n        max-items="10"\n        scale="m"\n        selection-display="fit"\n        placeholder-icon="car"\n      >\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n    <calcite-label>\n      All selected with multiple visible chips and overflow chip\n      <calcite-combobox\n        label="test"\n        placeholder="Select items"\n        max-items="10"\n        scale="m"\n        selection-display="fit"\n        placeholder-icon="car"\n      >\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n    <calcite-label>\n      Some selected as a condensed indicator chip\n      <calcite-combobox\n        label="test"\n        placeholder="Select any items you want"\n        max-items="10"\n        scale="m"\n        selection-display="fit"\n        placeholder-icon="car"\n      >\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n    <calcite-label>\n      All selected as a condensed indicator chip\n      <calcite-combobox\n        label="test"\n        placeholder="Select any items you want"\n        max-items="10"\n        scale="m"\n        selection-display="fit"\n        placeholder-icon="car"\n      >\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" selected></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n    <calcite-label>\n      Some selected as a compact indicator chip\n      <calcite-combobox\n        label="test"\n        placeholder="this is an unusually long string of placeholder text"\n        max-items="10"\n        scale="m"\n        selection-display="fit"\n        placeholder-icon="car"\n      >\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n    <calcite-label>\n      All selected as a compact indicator chip\n      <calcite-combobox\n        label="test"\n        placeholder="this is an unusually long string of placeholder text"\n        max-items="10"\n        scale="m"\n        selection-display="fit"\n        placeholder-icon="car"\n      >\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" selected></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n\n    <h2>selection-display="single"</h2>\n    <calcite-label>\n      Some selected\n      <calcite-combobox\n        label="test"\n        placeholder="Select any items"\n        max-items="10"\n        scale="m"\n        selection-display="single"\n        placeholder-icon="car"\n      >\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n    <calcite-label>\n      All selected\n      <calcite-combobox\n        label="test"\n        placeholder="Select any items"\n        max-items="10"\n        scale="m"\n        selection-display="single"\n        placeholder-icon="car"\n      >\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n    <calcite-label>\n      Some selected with compact indicator chip\n      <calcite-combobox\n        label="test"\n        placeholder="Select any items you want to your heart\'s content"\n        max-items="10"\n        scale="m"\n        selection-display="single"\n        placeholder-icon="car"\n      >\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n    <calcite-label>\n      All selected with compact indicator chip\n      <calcite-combobox\n        label="test"\n        placeholder="Select any items you want to your heart\'s content"\n        max-items="10"\n        scale="m"\n        selection-display="single"\n        placeholder-icon="car"\n      >\n        <calcite-combobox-item value="Trees" text-label="Trees" selected>\n          <calcite-combobox-item selected value="Pine" selected text-label="Pine">\n            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>\n          </calcite-combobox-item>\n          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>\n        </calcite-combobox-item>\n      </calcite-combobox>\n    </calcite-label>\n  </div>\n`',...multiple.parameters?.docs?.source}}},nestedItems.parameters={...nestedItems.parameters,docs:{...nestedItems.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width:400px;max-width:100%;background-color:white;padding:100px">\n    <calcite-combobox\n      open\n      label="demo combobox"\n      selection-mode="multiple"\n      placeholder="placeholder"\n      label="demo"\n      scale="m"\n      max-items="0"\n      status="idle"\n    >\n      <calcite-combobox-item value="ITEM-0-0" text-label="Level 1">\n        <calcite-combobox-item value="ITEM-0-1" text-label="Level 2"></calcite-combobox-item>\n        <calcite-combobox-item value="ITEM-0-2" text-label="Level 2"></calcite-combobox-item>\n        <calcite-combobox-item value="ITEM-0-3" text-label="Level 2"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="ITEM-1-0" text-label="Level 1">\n        <calcite-combobox-item value="ITEM-1-1" text-label="Level 2">\n          <calcite-combobox-item value="ITEM-1-1-0" text-label="Level 3"></calcite-combobox-item>\n          <calcite-combobox-item value="ITEM-1-1-1" text-label="Level 3">\n            <calcite-combobox-item value="ITEM-1-1-1-0" text-label="Level 4"></calcite-combobox-item>\n            <calcite-combobox-item value="ITEM-1-1-1-1" text-label="Level 4"></calcite-combobox-item>\n          </calcite-combobox-item>\n        </calcite-combobox-item>\n        <calcite-combobox-item value="ITEM-1-2" text-label="Level 2"></calcite-combobox-item>\n        <calcite-combobox-item value="ITEM-1-3" text-label="Level 2"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="ITEM-2-0" text-label="Level 1">\n        <calcite-combobox-item value="ITEM-2-1" text-label="Level 2"></calcite-combobox-item>\n        <calcite-combobox-item value="ITEM-2-2" text-label="Level 2">\n          <calcite-combobox-item value="ITEM-2-2-0" text-label="Level 3"></calcite-combobox-item>\n        </calcite-combobox-item>\n        <calcite-combobox-item value="ITEM-2-3" text-label="Level 2"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="ITEM-0-4" text-label="Level 1"></calcite-combobox-item>\n      <calcite-combobox-item value="ITEM-0-5" text-label="Level 1"></calcite-combobox-item>\n      <calcite-combobox-item value="ITEM-0-6" text-label="Level 1"></calcite-combobox-item>\n    </calcite-combobox>\n  </div>\n`',...nestedItems.parameters?.docs?.source}}},longItemsAllSelectionModes.parameters={...longItemsAllSelectionModes.parameters,docs:{...longItemsAllSelectionModes.parameters?.docs,source:{originalSource:'(): string => html`\n  ${style}\n  <div style="display: flex; flex-direction: column;"> \n    <div style="display: flex; flex-direction: row; margin-block-end: 160px;"> \n      <calcite-combobox open selection-mode="single" style="margin-right: 20px;">\n        <calcite-combobox-item text-label="Layers">\n        <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>\n        <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item>ß</calcite-combobox-item>\n      </calcite-combobox>\n\n      <calcite-combobox open selection-mode="single-persist">\n        <calcite-combobox-item text-label="Layers">\n        <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>\n        <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>\n      </calcite-combobox>\n    </div>\n\n    <div style="display: flex; flex-direction: row;"> \n      <calcite-combobox open selection-mode="multiple" style="margin-right: 20px;">\n        <calcite-combobox-item-group label="First item group">\n          <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>\n        </calcite-combobox-item-group>\n        <calcite-combobox-item-group label="Last item group">\n          <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>\n        </calcite-combobox-item-group>\n      </calcite-combobox>\n\n      <calcite-combobox open selection-mode="ancestors">\n        <calcite-combobox-item-group label="First item group">\n          <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>\n        </calcite-combobox-item-group>\n        <calcite-combobox-item-group label="Last item group">\n          <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item>\n          </calcite-combobox-item>\n        </calcite-combobox-item-group>\n      </calcite-combobox>\n    </div> \n  <div> \n`',...longItemsAllSelectionModes.parameters?.docs?.source}}},disabled_TestOnly.parameters={...disabled_TestOnly.parameters,docs:{...disabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`<calcite-combobox disabled>\n    <calcite-combobox-item value="Trees" text-label="Trees">\n      <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>\n      <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n    </calcite-combobox-item>\n    <calcite-combobox-item value="Flowers" text-label="Flowers" disabled>\n      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>\n      <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>\n      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>\n    </calcite-combobox-item>\n  </calcite-combobox>`',...disabled_TestOnly.parameters?.docs?.source}}},flipPlacements_TestOnly.parameters={...flipPlacements_TestOnly.parameters,docs:{...flipPlacements_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .my-combobox {\n      position: unset;\n      margin-top: 50px;\n    }\n  </style>\n  <div style="height: 100px; overflow:scroll;">\n    <calcite-combobox class="my-combobox" placeholder="placeholder" open>\n      <calcite-combobox-item value="Trees" text-label="Trees" aria-hidden="true">\n        <calcite-combobox-item value="Pine" text-label="Pine" aria-hidden="true"></calcite-combobox-item>\n        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" aria-hidden="true"></calcite-combobox-item>\n        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" aria-hidden="true"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Flowers" text-label="Flowers" aria-hidden="true">\n        <calcite-combobox-item value="Daffodil" text-label="Daffodil" aria-hidden="true"></calcite-combobox-item>\n        <calcite-combobox-item\n          value="Black Eyed Susan"\n          text-label="Black Eyed Susan"\n          aria-hidden="true"\n        ></calcite-combobox-item>\n        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium" aria-hidden="true"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Animals" text-label="Animals" aria-hidden="true">\n        <calcite-combobox-item value="Birds" text-label="Birds" aria-hidden="true"></calcite-combobox-item>\n        <calcite-combobox-item value="Reptiles" text-label="Reptiles" aria-hidden="true"></calcite-combobox-item>\n        <calcite-combobox-item value="Amphibians" text-label="Amphibians" aria-hidden="true"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Rocks" text-label="Rocks" aria-hidden="true"></calcite-combobox-item>\n      <calcite-combobox-item value="Insects" text-label="Insects" aria-hidden="true"></calcite-combobox-item>\n      <calcite-combobox-item value="Rivers" text-label="Rivers" aria-hidden="true"></calcite-combobox-item>\n    </calcite-combobox>\n  </div>\n  <script>\n    document.querySelector(".my-combobox").flipPlacements = ["right"];\n  <\/script>\n`',...flipPlacements_TestOnly.parameters?.docs?.source}}},flipPositioning_TestOnly.parameters={...flipPositioning_TestOnly.parameters,docs:{...flipPositioning_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="position: absolute; bottom: 10px; left: 10px;">\n    <calcite-combobox max-items="6" placeholder="placeholder" label="demo" selection-mode="multiple" scale="m" open>\n      <calcite-combobox-item value="Trees" text-label="Trees">\n        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>\n        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Flowers" text-label="Flowers">\n        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>\n        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>\n        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Animals" text-label="Animals">\n        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>\n        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>\n        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>\n      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>\n      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>\n    </calcite-combobox>\n  </div>\n`',...flipPositioning_TestOnly.parameters?.docs?.source}}},darkModeRTL_TestOnly.parameters={...darkModeRTL_TestOnly.parameters,docs:{...darkModeRTL_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width:400px;max-width:100%;padding:100px">\n    <calcite-combobox\n      label="demo combobox"\n      selection-mode="multiple"\n      class="calcite-mode-dark"\n      placeholder="placeholder"\n      label="demo"\n      validation-message="This should not appear because the status is not \'invalid\'"\n    >\n      <calcite-combobox-item value="Trees" text-label="Trees">\n        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>\n        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Flowers" text-label="Flowers">\n        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>\n        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>\n        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Animals" text-label="Animals">\n        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>\n        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>\n        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>\n      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>\n      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>\n    </calcite-combobox>\n  </div>\n`',...darkModeRTL_TestOnly.parameters?.docs?.source}}},singleLongLabel_TestOnly.parameters={...singleLongLabel_TestOnly.parameters,docs:{...singleLongLabel_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-combobox open selection-mode="single" allow-custom-values>\n    <calcite-combobox-item value="Trees" text-label="Trees">\n      <calcite-combobox-item\n        value="CommercialDamageAssessment - Damage to Commercial Buildings"\n        text-label="CommercialDamageAssessment - Damage to Commercial Buildings &  Damage to Residential Buildings "\n      ></calcite-combobox-item>\n      <calcite-combobox-item value="Sequoia" text-label="Sequoia"></calcite-combobox-item>\n      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n    </calcite-combobox-item>\n    <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>\n  </calcite-combobox>\n`',...singleLongLabel_TestOnly.parameters?.docs?.source}}},withPlaceholderIcon_TestOnly.parameters={...withPlaceholderIcon_TestOnly.parameters,docs:{...withPlaceholderIcon_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <calcite-combobox\n    id="labelFour"\n    label="test"\n    placeholder="select folder"\n    placeholder-icon="select"\n    max-items="6"\n    selection-mode="single"\n    scale="s"\n  >\n    <calcite-combobox-item value="root" text-label="username" icon="home"></calcite-combobox-item>\n    <calcite-combobox-item value="1" text-label="Folder 1" icon="folder"></calcite-combobox-item>\n    <calcite-combobox-item value="2" text-label="Folder 2" icon="folder"></calcite-combobox-item>\n  </calcite-combobox>`',...withPlaceholderIcon_TestOnly.parameters?.docs?.source}}},withoutPlaceholderIcon_TestOnly.parameters={...withoutPlaceholderIcon_TestOnly.parameters,docs:{...withoutPlaceholderIcon_TestOnly.parameters?.docs,source:{originalSource:'(): string => html` <div style="width:400px;max-width:100%;background-color:white;padding:100px">\n    <calcite-combobox placeholder="select folder" selection-mode="multiple" open>\n      <calcite-combobox-item value="root" text-label="username" icon="home" selected></calcite-combobox-item>\n      <calcite-combobox-item value="1" text-label="Folder 1" icon="folder"></calcite-combobox-item>\n      <calcite-combobox-item value="2" text-label="Folder 2" icon="folder"></calcite-combobox-item>\n    </calcite-combobox>\n  </div>`',...withoutPlaceholderIcon_TestOnly.parameters?.docs?.source}}},scrollingWithoutMaxItems_TestOnly.parameters={...scrollingWithoutMaxItems_TestOnly.parameters,docs:{...scrollingWithoutMaxItems_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="width:400px;max-width:100%;background-color:white;padding:100px">\n    <calcite-combobox label="demo combobox" open>\n      <calcite-combobox-item value="Trees" text-label="Trees" selected>\n        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>\n        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Flowers" text-label="Flowers">\n        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>\n        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>\n        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Animals" text-label="Animals">\n        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>\n        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>\n        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>\n      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>\n      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>\n      <calcite-combobox-item value="Trees" text-label="Trees" selected>\n        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>\n        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Flowers" text-label="Flowers">\n        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>\n        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>\n        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Animals" text-label="Animals">\n        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>\n        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>\n        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>\n      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>\n      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>\n    </calcite-combobox>\n  </div>\n`',...scrollingWithoutMaxItems_TestOnly.parameters?.docs?.source}}},optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed_TestOnly.parameters={...optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed_TestOnly.parameters,docs:{...optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .wrapper {\n      display: flex;\n      width: 100%;\n    }\n\n    calcite-combobox {\n      width: 400px;\n      margin: 0 auto;\n    }\n  </style>\n  <div class="wrapper">\n    <calcite-combobox placeholder="placeholder" overlay-positioning="fixed" placement="bottom" open>\n      <calcite-combobox-item value="Trees" text-label="Trees" aria-hidden="true">\n        <calcite-combobox-item value="Pine" text-label="Pine" aria-hidden="true"></calcite-combobox-item>\n        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" aria-hidden="true"></calcite-combobox-item>\n        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" aria-hidden="true"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Flowers" text-label="Flowers" aria-hidden="true">\n        <calcite-combobox-item value="Daffodil" text-label="Daffodil" aria-hidden="true"></calcite-combobox-item>\n        <calcite-combobox-item\n          value="Black Eyed Susan"\n          text-label="Black Eyed Susan"\n          aria-hidden="true"\n        ></calcite-combobox-item>\n        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium" aria-hidden="true"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Animals" text-label="Animals" aria-hidden="true">\n        <calcite-combobox-item value="Birds" text-label="Birds" aria-hidden="true"></calcite-combobox-item>\n        <calcite-combobox-item value="Reptiles" text-label="Reptiles" aria-hidden="true"></calcite-combobox-item>\n        <calcite-combobox-item value="Amphibians" text-label="Amphibians" aria-hidden="true"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Rocks" text-label="Rocks" aria-hidden="true"></calcite-combobox-item>\n      <calcite-combobox-item value="Insects" text-label="Insects" aria-hidden="true"></calcite-combobox-item>\n      <calcite-combobox-item value="Rivers" text-label="Rivers" aria-hidden="true"></calcite-combobox-item>\n    </calcite-combobox>\n  </div>\n`',...optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed_TestOnly.parameters?.docs?.source}}},mediumIconForLargeComboboxItem_TestOnly.parameters={...mediumIconForLargeComboboxItem_TestOnly.parameters,docs:{...mediumIconForLargeComboboxItem_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-combobox open scale="l">\n    <calcite-combobox-item\n      icon="altitude"\n      value="altitude"\n      text-label="Altitude"\n      selected\n      scale="l"\n    ></calcite-combobox-item>\n    <calcite-combobox-item icon="article" value="article" text-label="Article" scale="l"></calcite-combobox-item>\n    <calcite-combobox-item value="altitude" text-label="Altitude" scale="l"></calcite-combobox-item>\n    <calcite-combobox-item value="article" text-label="Article" scale="l"></calcite-combobox-item>\n  </calcite-combobox>\n`',...mediumIconForLargeComboboxItem_TestOnly.parameters?.docs?.source}}},withSelectorIndicatorAndIcons_TestOnly.parameters={...withSelectorIndicatorAndIcons_TestOnly.parameters,docs:{...withSelectorIndicatorAndIcons_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-combobox label="test" placeholder="select folder" selection-mode="multiple" open>\n    <calcite-combobox-item text-label="Folder 1" icon="folder" selected>\n      <calcite-combobox-item text-label="Sub Folder 1" icon="folder" selected>\n        <calcite-combobox-item text-label="Sub Folder 2 " icon="folder" selected></calcite-combobox-item>\n      </calcite-combobox-item>\n    </calcite-combobox-item>\n    <calcite-combobox-item text-label="Folder 2" icon="folder"></calcite-combobox-item>\n    <calcite-combobox-item text-label="Folder 3" icon="folder"></calcite-combobox-item>\n    <calcite-combobox-item text-label="Folder 4"></calcite-combobox-item>\n    <calcite-combobox-item-group label="Files">\n      <calcite-combobox-item text-label="File 1" icon="file" selected>\n        <calcite-combobox-item text-label="file 2" icon="file" selected></calcite-combobox-item>\n      </calcite-combobox-item>\n    </calcite-combobox-item-group>\n  </calcite-combobox>\n`',...withSelectorIndicatorAndIcons_TestOnly.parameters?.docs?.source}}},nestedGroups_TestOnly.parameters={...nestedGroups_TestOnly.parameters,docs:{...nestedGroups_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-combobox label="test" placeholder="placeholder" max-items="10" scale="m" open>\n    <calcite-combobox-item-group label="First item group">\n      <calcite-combobox-item value="Pikachu" text-label="Pikachu"></calcite-combobox-item>\n      <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>\n\n      <calcite-combobox-item-group label="Cutest Pokémon">\n        <calcite-combobox-item value="Bulbasaur" text-label="Bulbasaur"></calcite-combobox-item>\n        <calcite-combobox-item-group label="No Pokémon 🙃"></calcite-combobox-item-group>\n\n        <calcite-combobox-item-group label="Cutest Pokémon">\n          <calcite-combobox-item value="Squirtle" text-label="Squirtle">\n            <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>\n          </calcite-combobox-item>\n        </calcite-combobox-item-group>\n      </calcite-combobox-item-group>\n    </calcite-combobox-item-group>\n\n    <calcite-combobox-item-group label="Last item group">\n      <calcite-combobox-item value="Squirtle" text-label="Squirtle">\n        <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>\n      </calcite-combobox-item>\n    </calcite-combobox-item-group>\n  </calcite-combobox>\n`',...nestedGroups_TestOnly.parameters?.docs?.source}}},clearDisabled_TestOnly.parameters={...clearDisabled_TestOnly.parameters,docs:{...clearDisabled_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-combobox clear-disabled selection-mode="single" style="width:400px">\n    <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>\n    <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>\n    <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>\n  </calcite-combobox>\n  <br />\n  <calcite-combobox clear-disabled selection-mode="multiple" style="width:400px">\n    <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>\n    <calcite-combobox-item selected id="two" value="two" text-label="two"></calcite-combobox-item>\n    <calcite-combobox-item selected id="three" value="three" text-label="three"></calcite-combobox-item>\n  </calcite-combobox>\n  <br />\n  <calcite-combobox clear-disabled selection-mode="ancestors" style="width:400px">\n    <calcite-combobox-item value="parent" text-label="parent">\n      <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>\n      <calcite-combobox-item selected value="child2" text-label="child2"></calcite-combobox-item>\n    </calcite-combobox-item>\n  </calcite-combobox>\n`',...clearDisabled_TestOnly.parameters?.docs?.source}}},openInAllScales_TestOnly.parameters={...openInAllScales_TestOnly.parameters,docs:{...openInAllScales_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="display: flex">\n    <calcite-combobox open placeholder="choose a number" scale="s">\n      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>\n      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>\n      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n    </calcite-combobox>\n    <br />\n    <calcite-combobox open placeholder="choose a number" scale="m">\n      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>\n      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>\n      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n    </calcite-combobox>\n    <br />\n    <calcite-combobox open placeholder="choose a number" scale="l">\n      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>\n      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>\n      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n    </calcite-combobox>\n  </div>\n`',...openInAllScales_TestOnly.parameters?.docs?.source}}},openWithPlaceholderIconInAllScales_TestOnly.parameters={...openWithPlaceholderIconInAllScales_TestOnly.parameters,docs:{...openWithPlaceholderIconInAllScales_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <div style="display: flex">\n    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="s">\n      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>\n      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>\n      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n    </calcite-combobox>\n    <br />\n    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="m">\n      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>\n      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>\n      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n    </calcite-combobox>\n    <br />\n    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="l">\n      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>\n      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>\n      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n    </calcite-combobox>\n  </div>\n`',...openWithPlaceholderIconInAllScales_TestOnly.parameters?.docs?.source}}},validationMessageInAllScales_TestOnly.parameters={...validationMessageInAllScales_TestOnly.parameters,docs:{...validationMessageInAllScales_TestOnly.parameters?.docs,source:{originalSource:'(): string => html`\n  <style>\n    .container {\n      display: flex;\n      flex-direction: column;\n      width: 400px;\n      height: 200px;\n      gap: 20px;\n    }\n  </style>\n  <div class="container">\n    <calcite-combobox\n      placeholder="choose a number"\n      placeholder-icon="number"\n      scale="s"\n      status="invalid"\n      validation-message="This field is required."\n      validation-icon\n    >\n      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>\n      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>\n      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n    </calcite-combobox>\n\n    <calcite-combobox\n      placeholder="choose a number"\n      placeholder-icon="number"\n      scale="m"\n      status="invalid"\n      validation-message="This field is required."\n      validation-icon\n    >\n      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>\n      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>\n      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n    </calcite-combobox>\n\n    <calcite-combobox\n      placeholder="choose a number"\n      placeholder-icon="number"\n      scale="l"\n      status="invalid"\n      validation-message="This field is required."\n      validation-icon\n    >\n      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>\n      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>\n      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n    </calcite-combobox>\n  </div>\n`',...validationMessageInAllScales_TestOnly.parameters?.docs?.source}}},readOnlyAllModes.parameters={...readOnlyAllModes.parameters,docs:{...readOnlyAllModes.parameters?.docs,source:{originalSource:'(): string => html`\n  <h1>read-only</h1>\n\n  <h2>single</h2>\n  <calcite-combobox read-only selection-mode="single">\n    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>\n    <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>\n    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n  </calcite-combobox>\n\n  <h2>single-persist</h2>\n  <calcite-combobox read-only selection-mode="single-persist">\n    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>\n    <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>\n    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n  </calcite-combobox>\n\n  <h2>multiple</h2>\n  <calcite-combobox read-only selection-mode="multiple">\n    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>\n    <calcite-combobox-item value="two" text-label="two" selected></calcite-combobox-item>\n    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>\n  </calcite-combobox>\n\n  <h2>ancestors</h2>\n  <calcite-combobox read-only selection-mode="ancestors">\n    <calcite-combobox-item value="parent" text-label="parent">\n      <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>\n      <calcite-combobox-item selected value="child2" text-label="child2"></calcite-combobox-item>\n    </calcite-combobox-item>\n  </calcite-combobox>\n`',...readOnlyAllModes.parameters?.docs?.source}}},filterHighlighting.parameters={...filterHighlighting.parameters,docs:{...filterHighlighting.parameters?.docs,source:{originalSource:'(): string => html`\n  <calcite-combobox filter-text="Susan" max-items="6" open>\n    <calcite-combobox-item value="Trees" text-label="Trees">\n      <calcite-combobox-item value="Pine" text-label="Pine">\n        <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>\n      </calcite-combobox-item>\n      <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>\n      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>\n    </calcite-combobox-item>\n    <calcite-combobox-item value="Flowers" text-label="Flowers">\n      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>\n      <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>\n      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>\n    </calcite-combobox-item>\n    <calcite-combobox-item value="Animals" text-label="Animals">\n      <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>\n      <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>\n      <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>\n    </calcite-combobox-item>\n    <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>\n    <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>\n    <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>\n  </calcite-combobox>\n`',...filterHighlighting.parameters?.docs?.source}}};const __namedExportsOrder=["single","multiple","nestedItems","longItemsAllSelectionModes","disabled_TestOnly","flipPlacements_TestOnly","flipPositioning_TestOnly","darkModeRTL_TestOnly","singleLongLabel_TestOnly","withPlaceholderIcon_TestOnly","withoutPlaceholderIcon_TestOnly","scrollingWithoutMaxItems_TestOnly","optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed_TestOnly","mediumIconForLargeComboboxItem_TestOnly","withSelectorIndicatorAndIcons_TestOnly","nestedGroups_TestOnly","clearDisabled_TestOnly","openInAllScales_TestOnly","openWithPlaceholderIconInAllScales_TestOnly","validationMessageInAllScales_TestOnly","readOnlyAllModes","filterHighlighting"]}}]);
//# sourceMappingURL=components-combobox-combobox-stories.d923ce66.iframe.bundle.js.map