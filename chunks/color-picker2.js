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
import "./input.js";
import "./input-number.js";
import "./input-text.js";
import "./label2.js";
import "./progress.js";
import "./segmented-control-item.js";
import "./segmented-control.js";
import "./option.js";
import "./select.js";
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
const M = {
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
}, W = e`<calcite-autocomplete label="Pets">
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
</calcite-autocomplete>`, $ = {
  calciteButtonBackgroundColor: "",
  calciteButtonBorderColor: "",
  calciteButtonCornerRadius: "",
  calciteButtonIconColor: "",
  calciteButtonLoaderColor: "",
  calciteButtonTextColor: "",
  calciteButtonShadow: ""
}, j = e`
  <calcite-button appearance="outline">Outline</calcite-button>
  <calcite-button kind="danger">Danger</calcite-button>
  <calcite-button loading>Loading</calcite-button>
  <calcite-button icon-start="banana">Icon</calcite-button>
`, G = {
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
/> `, Z = e`<calcite-card selected selectable>
  <img alt="thumbnail" slot="thumbnail" style="width:260px" src="${a({ width: 260, height: 160 })}" />
  <h3 slot="heading">Selectable card</h3>
  <calcite-link slot="footer-start">Lead füt</calcite-link>
  <calcite-link slot="footer-end">Trail füt</calcite-link>
</calcite-card>`, q = e`<div id="card-container" style="width:260px;">
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
const X = {
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
}, J = e` <calcite-date-picker value="2020-11-27"></calcite-date-picker> `, K = e(o || (o = n([`
  <calcite-date-picker range></calcite-date-picker>
  <script>
    const datePicker = document.querySelector("calcite-date-picker[range]");
    datePicker.value = ["2025-01-01", "2025-02-20"];
  <\/script>
`]))), Q = {
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
}, U = e`<calcite-input
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input>`, Y = {
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
}, ee = e` <calcite-input-number placeholder="placeholder"></calcite-input-number>
  <calcite-input-number placeholder="placeholder" number-button-type="horizontal"></calcite-input-number>`, te = e`<calcite-input-number
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
  ></calcite-input-number>`, ce = e`<calcite-input-number
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
  ></calcite-input-number>`, le = e`<calcite-input-number
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
  ></calcite-input-number>`, oe = e`<calcite-input-number
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
  ></calcite-input-number>`, ae = e`<calcite-input-number read-only step="any" value="100"></calcite-input-number>
  <calcite-input-number read-only step="any" value="100" number-button-type="horizontal"></calcite-input-number>`, ie = e`<calcite-input-number
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
  ></calcite-input-number>`, re = {
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
}, ne = e`<calcite-input-text placeholder="Placeholder text"></calcite-input-text>`, ue = e`<calcite-input-text
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input-text>`, pe = e`<calcite-input-text clearable value="Clearable text"></calcite-input-text>`, se = e`<calcite-input-text loading value="Loading text"></calcite-input-text>`, de = e`<calcite-input-text read-only value="Read only text"></calcite-input-text>`, Ce = {
  calciteProgressBackgroundColor: "",
  calciteProgressFillColor: "",
  calciteProgressTextColor: ""
}, be = e`
  <calcite-label layout="inline">
    <calcite-progress text="optional text" type="determinate" value="50"></calcite-progress>
  </calcite-label>
`, me = {
  calciteSegmentedControlColor: "",
  calciteSegmentedControlBackgroundColor: "",
  calciteSegmentedControlBorderColor: "",
  calciteSegmentedControlCornerRadius: "",
  calciteSegmentedControlShadow: "",
  calciteSegmentedControlIconColor: ""
}, ge = e`<calcite-label>
  Segmented Control
  <calcite-segmented-control>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item> </calcite-segmented-control
  ><calcite-label></calcite-label
></calcite-label>`, xe = {
  calciteSelectFontSize: "",
  calciteSelectTextColor: "",
  calciteSelectBorderColor: "",
  calciteSelectIconColor: "",
  calciteSelectIconColorHover: "",
  calciteSelectBackgroundColor: "",
  calciteSelectCornerRadius: "",
  calciteSelectShadow: ""
}, ke = e`<calcite-select>
  <calcite-option>uno</calcite-option>
  <calcite-option>dos</calcite-option>
  <calcite-option>tres</calcite-option>
</calcite-select>`, Te = {
  calciteTileAccentColorPress: "",
  calciteTileBackgroundColor: "",
  calciteTileBorderColor: "",
  calciteTileCornerRadius: "",
  calciteTileHeadingTextColor: "",
  calciteTileLinkColor: "",
  calciteTileShadow: "",
  calciteTileTextColor: ""
}, Ie = e`
  <calcite-tile
    heading="Tile heading lorem ipsum"
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    icon="layers"
    selected
  ></calcite-tile>
`, he = {
  calciteTimePickerBackgroundColor: "",
  calciteTimePickerCornerRadius: "",
  calciteTimePickerButtonBackgroundColorHover: "",
  calciteTimePickerButtonBackgroundColorPress: "",
  calciteTimePickerColor: "",
  calciteTimePickerIconColor: "",
  calciteTimePickerInputBorderColorPress: "",
  calciteTimePickerInputBorderColorHover: "",
  calciteTimePickerBorderColor: ""
}, Be = e`<calcite-time-picker></calcite-time-picker>`, fe = {
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
}, Pe = e`
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
`, Se = {
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
}, ve = e` <calcite-split-button primary-text="Button">
  <calcite-dropdown-group selection-mode="none">
    <calcite-dropdown-item>Option 2</calcite-dropdown-item>
    <calcite-dropdown-item>Option 3</calcite-dropdown-item>
    <calcite-dropdown-item>Option 4</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-split-button>`, Ae = {
  calciteInputTimeZoneCornerRadius: ""
}, we = e`
  <calcite-input-time-zone reference-date="2020-01-01" value="-60"></calcite-input-time-zone>
`, De = {
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
}, ye = e`<calcite-color-picker alpha-channel></calcite-color-picker>`;
export {
  Q as A,
  Y as B,
  X as C,
  G as D,
  $ as E,
  M as F,
  le as G,
  ce as H,
  te as I,
  ae as J,
  ie as K,
  oe as L,
  pe as M,
  se as N,
  ue as O,
  de as P,
  q as Q,
  K as R,
  ge as a,
  j as b,
  ee as c,
  we as d,
  U as e,
  W as f,
  ke as g,
  ye as h,
  ne as i,
  J as j,
  Z as k,
  Ie as l,
  Pe as m,
  De as n,
  Ae as o,
  be as p,
  Se as q,
  fe as r,
  ve as s,
  Be as t,
  he as u,
  Te as v,
  xe as w,
  me as x,
  Ce as y,
  re as z
};
