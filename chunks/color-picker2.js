/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import "./autocomplete-item-group.js";
import "./autocomplete-item.js";
import { S as c } from "./autocomplete.js";
import { h as e } from "./formatting.js";
import "./button.js";
import "./card.js";
import "./link.js";
import { s as a } from "./index3.js";
import "./date-picker.js";
import "./filter2.js";
import "./input.js";
import "./input-number.js";
import "./input-text.js";
import "./label2.js";
import "./progress.js";
import "./segmented-control-item.js";
import "./segmented-control.js";
import "./option.js";
import "./select.js";
import "./text-area.js";
import "./tile.js";
import "./time-picker.js";
import "./action.js";
import "./chip.js";
import "./table-cell.js";
import "./table-header.js";
import "./table-row.js";
import "./table.js";
import "./dropdown-group.js";
import "./dropdown-item.js";
import "./split-button.js";
import "./input-time-zone.js";
import "./color-picker.js";
const $ = {
  calciteAutocompleteBackgroundColor: "",
  calciteAutocompleteBorderColor: "",
  calciteAutocompleteCornerRadius: "",
  calciteAutocompleteDescriptionTextColor: "",
  calciteAutocompleteHeadingTextColor: "",
  calciteAutocompleteTextColor: "",
  calciteAutocompleteInputBackgroundColor: "",
  calciteAutocompleteInputBorderColor: "",
  calciteAutocompleteInputCornerRadius: "",
  calciteAutocompleteInputShadow: "",
  calciteAutocompleteInputIconColor: "",
  calciteAutocompleteInputTextColor: "",
  calciteAutocompleteInputPlaceholderTextColor: "",
  calciteAutocompleteInputActionsBackgroundColor: "",
  calciteAutocompleteInputActionsBackgroundColorHover: "",
  calciteAutocompleteInputActionsBackgroundColorPress: "",
  calciteAutocompleteInputActionsIconColor: "",
  calciteAutocompleteInputActionsIconColorHover: "",
  calciteAutocompleteInputActionsIconColorPress: "",
  calciteAutocompleteInputLoadingBackgroundColor: "",
  calciteAutocompleteInputLoadingFillColor: "",
  calciteAutocompleteInputPrefixBackgroundColor: "",
  calciteAutocompleteInputPrefixTextColor: "",
  calciteAutocompleteInputSuffixBackgroundColor: "",
  calciteAutocompleteInputSuffixTextColor: ""
}, j = e`<calcite-autocomplete label="Pets">
  <div slot="${c.contentTop}">Top</div>
  <div slot="${c.contentBottom}">Bottom</div>
  <calcite-autocomplete-item-group heading="Dogs">
    <calcite-autocomplete-item label="Rover" value="rover" heading="Rover"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Fido" value="one" heading="Fido"></calcite-autocomplete-item>
  </calcite-autocomplete-item-group>
  <calcite-autocomplete-item-group heading="Cats">
    <calcite-autocomplete-item label="Felix" value="felix" heading="Felix"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Garfield" value="garfield" heading="Garfield"></calcite-autocomplete-item>
  </calcite-autocomplete-item-group>
</calcite-autocomplete>`, G = {
  calciteButtonBackgroundColor: "",
  calciteButtonBorderColor: "",
  calciteButtonCornerRadius: "",
  calciteButtonIconColor: "",
  calciteButtonLoaderColor: "",
  calciteButtonTextColor: "",
  calciteButtonShadow: ""
}, Z = e`
  <calcite-button appearance="outline">Outline</calcite-button>
  <calcite-button kind="danger">Danger</calcite-button>
  <calcite-button loading>Loading</calcite-button>
  <calcite-button icon-start="banana">Icon</calcite-button>
`, q = {
  calciteCardAccentColorSelected: "",
  calciteCardBackgroundColor: "",
  calciteCardBorderColor: "",
  calciteCardSelectIndicatorColorHover: "",
  calciteCardSelectIndicatorColor: "",
  calciteCardCornerRadius: "",
  calciteCardShadow: ""
}, i = e`<img
  alt="thumbnail"
  slot="thumbnail"
  src="${a({
  width: 380,
  height: 180
})}"
  style="width: 380px;"
/> `, U = e`<calcite-card selected selectable>
  <img alt="thumbnail" slot="thumbnail" style="width:260px" src="${a({ width: 260, height: 160 })}" />
  <h3 slot="heading">Selectable card</h3>
  <calcite-link slot="footer-start">Lead füt</calcite-link>
  <calcite-link slot="footer-end">Trail füt</calcite-link>
</calcite-card>`, X = e`<div id="card-container" style="width:260px;">
  <calcite-card>
    ${i}
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
</div>`;
var l = Object.freeze, r = Object.defineProperty, n = (t, u) => l(r(t, "raw", { value: l(t.slice()) })), o;
const J = {
  calciteDatePickerBorderColor: "",
  calciteDatePickerCornerRadius: "",
  calciteDatePickerRangeCalendarDividerColor: "",
  calciteDatePickerWeekHeaderTextColor: "",
  calciteDatePickerHeaderActionBackgroundColor: "",
  calciteDatePickerHeaderActionBackgroundColorHover: "",
  calciteDatePickerHeaderActionBackgroundColorPress: "",
  calciteDatePickerHeaderActionTextColor: "",
  calciteDatePickerHeaderActionTextColorPress: "",
  calciteDatePickerYearTextColor: "",
  calciteDatePickerMonthSelectFontSize: "",
  calciteDatePickerMonthSelectTextColor: "",
  calciteDatePickerMonthSelectIconColor: "",
  calciteDatePickerMonthSelectIconColorHover: "",
  calciteDatePickerDayBackgroundColor: "",
  calciteDatePickerDayBackgroundColorHover: "",
  calciteDatePickerDayTextColor: "",
  calciteDatePickerDayTextColorHover: "",
  calciteDatePickerCurrentDayTextColor: "",
  calciteDatePickerDayBackgroundColorSelected: "",
  calciteDatePickerDayTextColorSelected: "",
  calciteDatePickerDayRangeTextColor: "",
  calciteDatePickerDayRangeBackgroundColor: "",
  calciteDatePickerDayOutsideRangeBackgroundColorHover: "",
  calciteDatePickerDayOutsideRangeTextColorHover: ""
}, K = e` <calcite-date-picker value="2020-11-27"></calcite-date-picker> `, Q = e(o || (o = n([`
  <calcite-date-picker range></calcite-date-picker>
  <script>
    const datePicker = document.querySelector("calcite-date-picker[range]");
    datePicker.value = ["2025-01-01", "2025-02-20"];
  <\/script>
`]))), Y = {
  calciteFilterContentSpace: "",
  calciteFilterInputBackgroundColor: "",
  calciteFilterInputBorderColor: "",
  calciteFilterInputCornerRadius: "",
  calciteFilterInputShadow: "",
  calciteFilterInputIconColor: "",
  calciteFilterInputTextColor: "",
  calciteFilterInputPlaceholderTextColor: "",
  calciteFilterInputActionsBackgroundColor: "",
  calciteFilterInputActionsBackgroundColorHover: "",
  calciteFilterInputActionsBackgroundColorPress: "",
  calciteFilterInputActionsIconColor: "",
  calciteFilterInputActionsIconColorHover: "",
  calciteFilterInputActionsIconColorPress: ""
}, ee = e`<calcite-filter></calcite-filter>`, te = {
  calciteInputPrefixSize: "",
  calciteInputSuffixSize: "",
  calciteInputBackgroundColor: "",
  calciteInputBorderColor: "",
  calciteInputCornerRadius: "",
  calciteInputShadow: "",
  calciteInputIconColor: "",
  calciteInputTextColor: "",
  calciteInputPlaceholderTextColor: "",
  calciteInputActionsBackgroundColor: "",
  calciteInputActionsBackgroundColorHover: "",
  calciteInputActionsBackgroundColorPress: "",
  calciteInputActionsIconColor: "",
  calciteInputActionsIconColorHover: "",
  calciteInputActionsIconColorPress: "",
  calciteInputLoadingBackgroundColor: "",
  calciteInputLoadingFillColor: "",
  calciteInputPrefixBackgroundColor: "",
  calciteInputPrefixTextColor: "",
  calciteInputSuffixBackgroundColor: "",
  calciteInputSuffixTextColor: "",
  calciteInputInlineEditBackgroundColorHover: "",
  calciteInputInlineEditControlBackgroundColor: "",
  calciteInputInlineEditControlBackgroundColorHover: "",
  calciteInputInlineEditControlBackgroundColorPress: "",
  calciteInputInlineEditControlCornerRadius: "",
  calciteInputInlineEditControlLoaderColor: "",
  calciteInputInlineEditControlTextColor: "",
  calciteInputInlineEditControlTextColorPress: ""
}, ce = e`<calcite-input
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input>`, le = {
  calciteInputActionsBackgroundColor: "",
  calciteInputActionsBackgroundColorHover: "",
  calciteInputActionsBackgroundColorPress: "",
  calciteInputActionsIconColor: "",
  calciteInputActionsIconColorHover: "",
  calciteInputActionsIconColorPress: "",
  calciteInputLoadingBackgroundColor: "",
  calciteInputLoadingFillColor: "",
  calciteInputNumberBackgroundColor: "",
  calciteInputNumberBorderColor: "",
  calciteInputNumberCornerRadius: "",
  calciteInputNumberIconColor: "",
  calciteInputNumberHeight: "",
  calciteInputNumberPlaceholderTextColor: "",
  calciteInputNumberTextColor: "",
  calciteInputNumberTextColorFocus: "",
  calciteInputPrefixBackgroundColor: "",
  calciteInputPrefixSize: "",
  calciteInputPrefixTextColor: "",
  calciteInputSuffixBackgroundColor: "",
  calciteInputSuffixSize: "",
  calciteInputSuffixTextColor: "",
  calciteInputNumberInlineEditBackgroundColorHover: "",
  calciteInputNumberInlineEditControlBackgroundColor: "",
  calciteInputNumberInlineEditControlBackgroundColorHover: "",
  calciteInputNumberInlineEditControlBackgroundColorPress: "",
  calciteInputNumberInlineEditControlCornerRadius: "",
  calciteInputNumberInlineEditControlLoaderColor: "",
  calciteInputNumberInlineEditControlTextColor: "",
  calciteInputNumberInlineEditControlTextColorPress: ""
}, oe = e` <calcite-input-number placeholder="placeholder"></calcite-input-number>
  <calcite-input-number placeholder="placeholder" number-button-type="horizontal"></calcite-input-number>`, ae = e`<calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
  ></calcite-input-number>
  <calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    number-button-type="horizontal"
  ></calcite-input-number>`, ie = e`<calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    loading
  ></calcite-input-number>
  <calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    loading
    number-button-type="horizontal"
  ></calcite-input-number>`, re = e`<calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
  ></calcite-input-number>
  <calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
    number-button-type="horizontal"
  ></calcite-input-number>`, ne = e`<calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
    read-only
  ></calcite-input-number>
  <calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
    read-only
    number-button-type="horizontal"
  ></calcite-input-number>`, ue = e`<calcite-input-number read-only step="any" value="100"></calcite-input-number>
  <calcite-input-number read-only step="any" value="100" number-button-type="horizontal"></calcite-input-number>`, pe = e`<calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    read-only
  ></calcite-input-number>
  <calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    read-only
    number-button-type="horizontal"
  ></calcite-input-number>`, se = {
  calciteInputActionBackgroundColor: "",
  calciteInputActionBackgroundColorHover: "",
  calciteInputActionBackgroundColorPress: "",
  calciteInputActionIconColor: "",
  calciteInputActionIconColorHover: "",
  calciteInputActionIconColorPress: "",
  calciteInputLoadingBackgroundColor: "",
  calciteInputLoadingFillColor: "",
  calciteInputPrefixBackgroundColor: "",
  calciteInputPrefixSizeX: "",
  calciteInputPrefixTextColor: "",
  calciteInputSuffixBackgroundColor: "",
  calciteInputSuffixSizeX: "",
  calciteInputSuffixTextColor: "",
  calciteInputTextBackgroundColor: "",
  calciteInputTextBorderColor: "",
  calciteInputTextCornerRadius: "",
  calciteInputTextIconColor: "",
  calciteInputTextHeight: "",
  calciteInputTextPlaceholderTextColor: "",
  calciteInputTextTextColor: "",
  calciteInputTextTextColorFocus: "",
  calciteInputTextInlineEditBackgroundColorHover: "",
  calciteInputTextInlineEditControlBackgroundColor: "",
  calciteInputTextInlineEditControlBackgroundColorHover: "",
  calciteInputTextInlineEditControlBackgroundColorPress: "",
  calciteInputTextInlineEditControlCornerRadius: "",
  calciteInputTextInlineEditControlLoaderColor: "",
  calciteInputTextInlineEditControlTextColor: "",
  calciteInputTextInlineEditControlTextColorPress: ""
}, de = e`<calcite-input-text placeholder="Placeholder text"></calcite-input-text>`, Ce = e`<calcite-input-text
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input-text>`, be = e`<calcite-input-text clearable value="Clearable text"></calcite-input-text>`, me = e`<calcite-input-text loading value="Loading text"></calcite-input-text>`, ge = e`<calcite-input-text read-only value="Read only text"></calcite-input-text>`, xe = {
  calciteProgressBackgroundColor: "",
  calciteProgressFillColor: "",
  calciteProgressTextColor: ""
}, Te = e`
  <calcite-label layout="inline">
    <calcite-progress text="optional text" type="determinate" value="50"></calcite-progress>
  </calcite-label>
`, Ie = {
  calciteSegmentedControlColor: "",
  calciteSegmentedControlBackgroundColor: "",
  calciteSegmentedControlBorderColor: "",
  calciteSegmentedControlCornerRadius: "",
  calciteSegmentedControlShadow: "",
  calciteSegmentedControlIconColor: ""
}, ke = e`<calcite-label>
  Segmented Control
  <calcite-segmented-control>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item> </calcite-segmented-control
  ><calcite-label></calcite-label
></calcite-label>`, he = {
  calciteSelectFontSize: "",
  calciteSelectTextColor: "",
  calciteSelectBorderColor: "",
  calciteSelectIconColor: "",
  calciteSelectIconColorHover: "",
  calciteSelectBackgroundColor: "",
  calciteSelectCornerRadius: "",
  calciteSelectShadow: ""
}, Be = e`<calcite-select>
  <calcite-option>uno</calcite-option>
  <calcite-option>dos</calcite-option>
  <calcite-option>tres</calcite-option>
</calcite-select>`, fe = {
  calciteTextAreaBackgroundColor: "",
  calciteTextAreaBorderColor: "",
  calciteTextAreaCharacterLimitTextColor: "",
  calciteTextAreaDividerColor: "",
  calciteTextAreaFontSize: "",
  calciteTextAreaFooterBorderColor: "",
  calciteTextAreaMaxHeight: "",
  calciteTextAreaMinHeight: "",
  calciteTextAreaMaxWidth: "",
  calciteTextAreaMinWidth: "",
  calciteTextAreaTextColor: ""
}, Pe = e`<calcite-text-area placeholder="testing" max-length="10"></calcite-text-area>`, Se = {
  calciteTileAccentColorPress: "",
  calciteTileBackgroundColor: "",
  calciteTileBorderColor: "",
  calciteTileCornerRadius: "",
  calciteTileHeadingTextColor: "",
  calciteTileLinkColor: "",
  calciteTileShadow: "",
  calciteTileTextColor: ""
}, ve = e`
  <calcite-tile
    heading="Tile heading lorem ipsum"
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    icon="layers"
    selected
  ></calcite-tile>
`, Ae = {
  calciteTimePickerBackgroundColor: "",
  calciteTimePickerCornerRadius: "",
  calciteTimePickerButtonBackgroundColorHover: "",
  calciteTimePickerButtonBackgroundColorPress: "",
  calciteTimePickerColor: "",
  calciteTimePickerIconColor: "",
  calciteTimePickerInputBorderColorPress: "",
  calciteTimePickerInputBorderColorHover: "",
  calciteTimePickerBorderColor: ""
}, we = e`<calcite-time-picker></calcite-time-picker>`, De = {
  calciteTableCornerRadius: "",
  calciteTableShadow: "",
  calciteTableBorderColor: "",
  calciteTableRowBackgroundColor: "",
  calciteTableRowBackgroundColorStriped: "",
  calciteTableRowBackgroundColorSelected: "",
  calciteTableRowBorderColorSelected: "",
  calciteTableRowAccentColorSelected: "",
  calciteTableNumberCellBackgroundColor: "",
  calciteTableNumberCellTextColor: "",
  calciteTableSelectionCellBackgroundColor: "",
  calciteTableSelectionCellBackgroundColorSelected: "",
  calciteTableSelectionCellIconColor: "",
  calciteTableSelectionCellIconColorSelected: "",
  calciteTableHeaderBackgroundColor: "",
  calciteTableHeaderHeadingColor: "",
  calciteTableHeaderDescriptionColor: "",
  calciteTableSelectionDismissButtonBackgroundColor: "",
  calciteTableSelectionDismissButtonBorderColor: "",
  calciteTableSelectionDismissButtonCornerRadius: "",
  calciteTableSelectionDismissButtonShadow: "",
  calciteTableSelectionDismissButtonTextColor: "",
  calciteTableSelectionDismissButtonBackgroundColorHover: "",
  calciteTableSelectionDismissButtonBorderColorHover: "",
  calciteTableSelectionDismissButtonTextColorHover: "",
  calciteTableSelectionDismissButtonBackgroundColorActive: "",
  calciteTableSelectionDismissButtonBorderColorActive: "",
  calciteTableSelectionDismissButtonTextColorActive: "",
  calciteTableSelectionChipBackgroundColor: "",
  calciteTableSelectionChipBorderColor: "",
  calciteTableSelectionChipCornerRadius: "",
  calciteTableSelectionChipShadow: "",
  calciteTableSelectionChipTextColor: "",
  calciteTableSelectionChipBackgroundColorSelected: "",
  calciteTableSelectionChipBorderColorSelected: "",
  calciteTableSelectionChipTextColorSelected: "",
  calciteTableSelectionOutOfViewChipBackgroundColor: "",
  calciteTableSelectionOutOfViewChipBorderColor: "",
  calciteTableSelectionOutOfViewChipCornerRadius: "",
  calciteTableSelectionOutOfViewChipShadow: "",
  calciteTableSelectionOutOfViewChipTextColor: "",
  calciteTableSelectionOutOfViewChipIconColor: "",
  calciteTablePaginationColor: "",
  calciteTablePaginationColorHover: "",
  calciteTablePaginationColorBorderHover: "",
  calciteTablePaginationColorBorderActive: "",
  calciteTablePaginationBackgroundColor: "",
  calciteTablePaginationIconColorBackgroundHover: ""
}, He = e`
  <calcite-table
    class="themed"
    bordered
    striped
    selection-mode="multiple"
    numbered
    caption="Theming testing"
    page-size="3"
  >
    <calcite-action slot="selection-actions" icon="trash"></calcite-action>
    <calcite-action slot="selection-actions" icon="send"></calcite-action>
    <calcite-action slot="selection-actions" icon="copy"></calcite-action>
    <calcite-action slot="selection-actions" icon="plus"></calcite-action>
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Example column heading"></calcite-table-header>
      <calcite-table-header heading="Example heading"></calcite-table-header>
      <calcite-table-header heading="Heading example">
        <calcite-chip scale="s" appearance="outline-fill" slot="actions-end">slot</calcite-chip>
      </calcite-table-header>
      <calcite-table-header heading="Example"></calcite-table-header>
      <calcite-table-header heading="Testing" description="With a description"> </calcite-table-header>
      <calcite-table-header heading="Site visits" alignment="end"></calcite-table-header>
      <calcite-table-header heading="Status"></calcite-table-header>
      <calcite-table-header alignment="center" heading="More"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 1</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 2</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 3</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 4</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 5</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 5</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell col-span="5">foot</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>
`, ye = {
  calciteSplitButtonBackgroundColor: "",
  calciteSplitButtonBorderColor: "",
  calciteSplitButtonCornerRadius: "",
  calciteSplitButtonIconColor: "",
  calciteSplitButtonLoaderColor: "",
  calciteSplitButtonTextColor: "",
  calciteSplitButtonShadow: "",
  calciteSplitButtonDividerColor: "",
  calciteSplitButtonDividerBorderColor: "",
  calciteSplitButtonDropdownWidth: "",
  calciteSplitButtonDropdownBackgroundColor: ""
}, Re = e` <calcite-split-button primary-text="Button">
  <calcite-dropdown-group selection-mode="none">
    <calcite-dropdown-item>Option 2</calcite-dropdown-item>
    <calcite-dropdown-item>Option 3</calcite-dropdown-item>
    <calcite-dropdown-item>Option 4</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-split-button>`, Fe = {
  calciteInputTimeZoneCornerRadius: ""
}, Ee = e`
  <calcite-input-time-zone reference-date="2020-01-01" value="-60"></calcite-input-time-zone>
`, Ne = {
  calciteColorPickerBackgroundColor: "",
  calciteColorPickerBorderColor: "",
  calciteColorPickerCornerRadius: "",
  calciteColorPickerTextColor: "",
  calciteColorPickerShadow: "",
  calciteColorPickerInputBackgroundColor: "",
  calciteColorPickerInputBorderColor: "",
  calciteColorPickerInputTextColor: "",
  calciteColorPickerInputPrefixBackgroundColor: "",
  calciteColorPickerInputPrefixTextColor: "",
  calciteColorPickerInputSuffixBackgroundColor: "",
  calciteColorPickerInputSuffixTextColor: "",
  calciteColorPickerTabBorderColor: "",
  calciteColorPickerTabTextColor: "",
  calciteColorPickerTabAccentColorPress: "",
  calciteColorPickerSwatchCornerRadius: "",
  calciteColorPickerActionTextColorPress: "",
  calciteColorPickerActionTextColorHover: "",
  calciteColorPickerActionTextColor: ""
}, Oe = e`<calcite-color-picker alpha-channel></calcite-color-picker>`;
export {
  Ie as A,
  xe as B,
  se as C,
  te as D,
  le as E,
  Y as F,
  J as G,
  q as H,
  G as I,
  $ as J,
  re as K,
  ie as L,
  ae as M,
  ue as N,
  pe as O,
  ne as P,
  be as Q,
  me as R,
  Ce as S,
  ge as T,
  X as U,
  Q as V,
  ke as a,
  Z as b,
  oe as c,
  Ee as d,
  ce as e,
  j as f,
  Be as g,
  ee as h,
  de as i,
  Oe as j,
  K as k,
  we as l,
  U as m,
  ve as n,
  He as o,
  Te as p,
  Ne as q,
  Fe as r,
  Re as s,
  Pe as t,
  ye as u,
  De as v,
  Ae as w,
  Se as x,
  fe as y,
  he as z
};
