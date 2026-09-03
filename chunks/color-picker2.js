/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import "./button.js";
import { h as e } from "./formatting.js";
import "./card.js";
import "./link.js";
import { s as a } from "./index3.js";
import "./date-picker.js";
import "./input.js";
import "./input-number.js";
import "./input-text.js";
import "./label2.js";
import "./segmented-control-item.js";
import "./segmented-control.js";
import "./option.js";
import "./select.js";
import "./slider.js";
import "./tile.js";
import "./menu-item.js";
import "./menu.js";
import "./combobox-item-group.js";
import "./combobox-item.js";
import "./combobox.js";
import "./action.js";
import "./chip.js";
import "./table-cell.js";
import "./table-header.js";
import "./table-row.js";
import "./table.js";
import "./dropdown-group.js";
import "./dropdown-item.js";
import "./split-button.js";
import "./input-time-picker.js";
import "./input-time-zone.js";
import "./color-picker.js";
const W = {
  calciteButtonBackgroundColor: "",
  calciteButtonBorderColor: "",
  calciteButtonCornerRadius: "",
  calciteButtonIconColor: "",
  calciteButtonLoaderColor: "",
  calciteButtonTextColor: "",
  calciteButtonShadow: ""
}, $ = e`
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
}, o = e`<img
  alt="thumbnail"
  slot="thumbnail"
  src="${a({
  width: 380,
  height: 180
})}"
  style="width: 380px;"
/> `, j = e`<calcite-card selected selectable>
  <img alt="thumbnail" slot="thumbnail" style="width:260px" src="${a({ width: 260, height: 160 })}" />
  <h3 slot="heading">Selectable card</h3>
  <calcite-link slot="footer-start">Lead füt</calcite-link>
  <calcite-link slot="footer-end">Trail füt</calcite-link>
</calcite-card>`, Z = e`<div id="card-container" style="width:260px;">
  <calcite-card>
    ${o}
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
var t = Object.freeze, r = Object.defineProperty, n = (c, u) => t(r(c, "raw", { value: t(c.slice()) })), l;
const U = {
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
}, X = e` <calcite-date-picker value="2020-11-27"></calcite-date-picker> `, J = e(l || (l = n([`
  <calcite-date-picker range></calcite-date-picker>
  <script>
    const datePicker = document.querySelector("calcite-date-picker[range]");
    datePicker.value = ["2025-01-01", "2025-02-20"];
  <\/script>
`]))), K = {
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
  calciteInputInlineEditableBackgroundColorHover: "",
  calciteInputInlineEditableControlBackgroundColor: "",
  calciteInputInlineEditableControlBackgroundColorHover: "",
  calciteInputInlineEditableControlBackgroundColorPress: "",
  calciteInputInlineEditableControlCornerRadius: "",
  calciteInputInlineEditableControlLoaderColor: "",
  calciteInputInlineEditableControlTextColor: "",
  calciteInputInlineEditableControlTextColorPress: ""
}, Q = e`<calcite-input
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
  calciteInputNumberInlineEditableBackgroundColorHover: "",
  calciteInputNumberInlineEditableControlBackgroundColor: "",
  calciteInputNumberInlineEditableControlBackgroundColorHover: "",
  calciteInputNumberInlineEditableControlBackgroundColorPress: "",
  calciteInputNumberInlineEditableControlCornerRadius: "",
  calciteInputNumberInlineEditableControlLoaderColor: "",
  calciteInputNumberInlineEditableControlTextColor: "",
  calciteInputNumberInlineEditableControlTextColorPress: ""
}, ee = e` <calcite-input-number placeholder="placeholder"></calcite-input-number>
  <calcite-input-number placeholder="placeholder" number-button-type="horizontal"></calcite-input-number>`, ce = e`<calcite-input-number
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
  ></calcite-input-number>`, te = e`<calcite-input-number
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
  ></calcite-input-number>`, ie = e`<calcite-input-number
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
  <calcite-input-number read-only step="any" value="100" number-button-type="horizontal"></calcite-input-number>`, oe = e`<calcite-input-number
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
  calciteInputTextInlineEditableBackgroundColorHover: "",
  calciteInputTextInlineEditableControlBackgroundColor: "",
  calciteInputTextInlineEditableControlBackgroundColorHover: "",
  calciteInputTextInlineEditableControlBackgroundColorPress: "",
  calciteInputTextInlineEditableControlCornerRadius: "",
  calciteInputTextInlineEditableControlLoaderColor: "",
  calciteInputTextInlineEditableControlTextColor: "",
  calciteInputTextInlineEditableControlTextColorPress: ""
}, ne = e`<calcite-input-text placeholder="Placeholder text"></calcite-input-text>`, ue = e`<calcite-input-text
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input-text>`, se = e`<calcite-input-text clearable value="Clearable text"></calcite-input-text>`, de = e`<calcite-input-text loading value="Loading text"></calcite-input-text>`, be = e`<calcite-input-text read-only value="Read only text"></calcite-input-text>`, pe = {
  calciteSegmentedControlColor: "",
  calciteSegmentedControlBackgroundColor: "",
  calciteSegmentedControlBorderColor: "",
  calciteSegmentedControlCornerRadius: "",
  calciteSegmentedControlShadow: "",
  calciteSegmentedControlIconColor: ""
}, me = e`<calcite-label>
  Segmented Control
  <calcite-segmented-control>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item> </calcite-segmented-control
  ><calcite-label></calcite-label
></calcite-label>`, Ce = {
  calciteSelectFontSize: "",
  calciteSelectTextColor: "",
  calciteSelectBorderColor: "",
  calciteSelectIconColor: "",
  calciteSelectIconColorHover: "",
  calciteSelectBackgroundColor: "",
  calciteSelectCornerRadius: "",
  calciteSelectShadow: ""
}, xe = e`<calcite-select>
  <calcite-option>uno</calcite-option>
  <calcite-option>dos</calcite-option>
  <calcite-option>tres</calcite-option>
</calcite-select>`, ge = {
  calciteSliderTextColor: "",
  calciteSliderTrackColor: "",
  calciteSliderTrackFillColor: "",
  calciteSliderHandleFillColor: "",
  calciteSliderHandleExtensionColor: "",
  calciteSliderAccentColor: "",
  calciteSliderTickColor: "",
  calciteSliderTickBorderColor: "",
  calciteSliderTickSelectedColor: "",
  calciteSliderGraphColor: ""
}, Ie = e`<calcite-slider
  min="0"
  max="100"
  min-value="50"
  max-value="85"
  step="1"
  min-label="Temperature range (lower)"
  max-label="Temperature range (upper)"
  precise
></calcite-slider>`, Te = {
  calciteTileAccentColorPress: "",
  calciteTileBackgroundColor: "",
  calciteTileBorderColor: "",
  calciteTileCornerRadius: "",
  calciteTileHeadingTextColor: "",
  calciteTileLinkColor: "",
  calciteTileShadow: "",
  calciteTileTextColor: ""
}, ke = e`
  <calcite-tile
    heading="Tile heading lorem ipsum"
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    icon="layers"
    selected
  ></calcite-tile>
`, he = {
  calciteMenuItemAccentColor: "",
  calciteMenuBackgroundColor: "",
  calciteMenuItemSubMenuBorderColor: "",
  calciteMenuItemSubMenuCornerRadius: "",
  calciteMenuTextColor: ""
}, i = (c) => e`<calcite-menu layout="${c}">
    <calcite-menu-item text="Ideas" breadcrumb icon-start="layers" icon-end="layers" open>
      <calcite-menu-item
        href="#calcite-navigation-slots"
        icon-start="add-in"
        slot="submenu-item"
        text="Slots"
        active
      ></calcite-menu-item>
      <calcite-menu-item
        href="#calcite-navigation-css-vars"
        icon-start="multiple-variables"
        slot="submenu-item"
        text="Css vars"
      ></calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Ideas"> </calcite-menu-item>
    <calcite-menu-item text="calcite-navigation" href="#calcite-menu" open>
      <calcite-menu-item
        href="#calcite-navigation-slots"
        icon-start="add-in"
        slot="submenu-item"
        text="Slots"
        active
      ></calcite-menu-item>
      <calcite-menu-item
        href="#calcite-navigation-css-vars"
        icon-start="multiple-variables"
        slot="submenu-item"
        text="Css vars"
      ></calcite-menu-item>
    </calcite-menu-item>
  </calcite-menu>`, Be = e` ${i("horizontal")} ${i("vertical")} `, Se = {
  calciteComboboxInputHeight: "",
  calciteComboboxInputBackgroundColor: "",
  calciteComboboxInputTextColor: "",
  calciteComboboxInputBorderColor: "",
  calciteComboboxIconColor: "",
  calciteComboboxIconColorHover: "",
  calciteComboboxBackgroundColor: "",
  calciteComboboxCornerRadius: "",
  calciteChipBackgroundColor: "",
  calciteChipTextColor: "",
  calciteChipIconColor: "",
  calciteChipCloseIconColor: "",
  calciteChipCornerRadius: "",
  calciteComboboxItemGroupTextColor: "",
  calciteComboboxItemGroupBorderColor: ""
}, Pe = e`<calcite-combobox label="test" max-items="6" open>
  <calcite-combobox-item-group value="Trees" label="Trees">
    <calcite-combobox-item value="Pine" heading="Pine">
      <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
  <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`, fe = e`<calcite-combobox label="test" selection-mode="single">
  <calcite-combobox-item value="Trees" heading="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`, ve = e`<calcite-combobox label="test" placeholder-icon="layers">
  <calcite-combobox-item value="Trees" heading="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
</calcite-combobox>`;
e`
  <calcite-combobox open filter-text="Three" selection-mode="single">
    <calcite-combobox-item value="one" heading="One"></calcite-combobox-item>
    <calcite-combobox-item value="two" heading="Two"></calcite-combobox-item>
  </calcite-combobox>
`;
const we = {
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
}, De = e`
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
`, He = {
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
}, ye = e` <calcite-split-button primary-text="Button">
  <calcite-dropdown-group selection-mode="none">
    <calcite-dropdown-item>Option 2</calcite-dropdown-item>
    <calcite-dropdown-item>Option 3</calcite-dropdown-item>
    <calcite-dropdown-item>Option 4</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-split-button>`, Ae = {
  calciteInputTimePickerBackgroundColor: "",
  calciteInputTimePickerBorderColor: "",
  calciteInputTimePickerTextColor: "",
  calciteInputTimePickerIconColor: "",
  calciteInputTimePickerIconColorHover: "",
  calciteInputTimePickerShadow: "",
  calciteInputTimePickerInputBackgroundColor: "",
  calciteInputTimePickerInputBorderColor: "",
  calciteInputTimePickerInputTextColor: "",
  calciteInputTimePickerInputShadow: "",
  calciteInputTimePickerInputCornerRadius: "",
  calciteInputTimePickerDigitTextColor: "",
  calciteInputTimePickerDigitIconColor: "",
  calciteInputTimePickerDigitBorderColorPress: "",
  calciteInputTimePickerDigitBorderColorHover: "",
  calciteInputTimePickerActionBackgroundColorHover: "",
  calciteInputTimePickerActionBackgroundColorPress: "",
  calciteInputTimePickerInputActionBackgroundColor: "",
  calciteInputTimePickerInputActionBackgroundColorHover: "",
  calciteInputTimePickerInputActionBackgroundColorPress: "",
  calciteInputTimePickerInputActionIconColor: "",
  calciteInputTimePickerInputActionIconColorHover: "",
  calciteInputTimePickerInputActionIconColorPress: ""
}, Re = e`<calcite-input-time-picker open></calcite-input-time-picker>`, Ee = {
  calciteInputTimeZoneCornerRadius: ""
}, Ne = e`
  <calcite-input-time-zone reference-date="2020-01-01" value="-60"></calcite-input-time-zone>
`, Oe = {
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
}, ze = e`<calcite-color-picker alpha-channel></calcite-color-picker>`;
export {
  pe as A,
  re as B,
  K as C,
  Y as D,
  U as E,
  Se as F,
  G,
  W as H,
  fe as I,
  le as J,
  te as K,
  ce as L,
  ae as M,
  oe as N,
  ie as O,
  se as P,
  de as Q,
  ue as R,
  be as S,
  ve as T,
  Z as U,
  J as V,
  ze as a,
  $ as b,
  j as c,
  X as d,
  ne as e,
  Re as f,
  Ne as g,
  Q as h,
  ee as i,
  Pe as j,
  me as k,
  Ie as l,
  ye as m,
  Be as n,
  De as o,
  Oe as p,
  Ee as q,
  Ae as r,
  xe as s,
  ke as t,
  He as u,
  we as v,
  he as w,
  Te as x,
  ge as y,
  Ce as z
};
