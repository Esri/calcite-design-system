# Roles

<!--toc:start-->

- [Roles](#roles)
  - [1. Widget Roles](#1-widget-roles)
  - [2. Abstract Roles](#2-abstract-roles)
  - [3. Composite Roles](#3-composite-roles) - [i. combobox](#i-combobox) - [Combobox example](#combobox-example) - [Combobox code](#combobox-code) - [Keyboard functionality for Combobox](#keyboard-functionality-for-combobox) - [ii. grid](#ii-grid) - [Grid Example](#grid-example) - [Grid Code](#grid-code) - [Keyboard functionality for Grid](#keyboard-functionality-for-grid) - [iii. listbox](#iii-listbox) - [Listbox Example](#listbox-example) - [Listbox Code](#listbox-code) - [Keyboard functionality for Listbox](#keyboard-functionality-for-listbox) - [iv. menu](#iv-menu) - [Menu Example](#menu-example) - [Menu Code](#menu-code) - [Keyboard functionality for Menu](#keyboard-functionality-for-menu) - [v. menubar](#v-menubar) - [Menubar Example](#menubar-example) - [Menubar Code](#menubar-code) - [Keyboard functionality for Menubar](#keyboard-functionality-for-menubar) - [vi. radiogroup](#vi-radiogroup) - [Radiogroup Example](#radiogroup-example) - [a. Radiogroup Code](#a-radiogroup-code) - [b. Radiogroup Code in Semantic HTML](#b-radiogroup-code-in-semantic-html) - [Keyboard functionality for Radiogroup](#keyboard-functionality-for-radiogroup) - [vii. tablist](#vii-tablist) - [Tablist Example](#tablist-example) - [Tablist Code](#tablist-code) - [Keyboard functionality for Tablist](#keyboard-functionality-for-tablist) - [viii. tree](#viii-tree) - [Tree Example](#tree-example) - [Tree Code](#tree-code) - [Keyboard functionality for Tree](#keyboard-functionality-for-tree) - [ix. treegrid](#ix-treegrid) - [Treegrid Example](#treegrid-example) - [Treegrid Code](#treegrid-code) - [Keyboard functionality for Treegrid](#keyboard-functionality-for-treegrid)
  <!--toc:end-->

## 1. Widget Roles

Standalone user interface widgets or as part of larger, composite widgets.

| Widget Role Name             | Description                                                                                                                                                                    | Resources                                                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| button                       | An `input` that allows for user-triggered actions when clicked or pressed. Reference related `link` widget role.                                                               | [W3C](https://www.w3.org/TR/wai-aria-1.1/#button), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)                     |
| checkbox                     | A checkable `input` that has three possible values: `true`, `false`, or `mixed`.                                                                                               | [W3C](https://www.w3.org/TR/wai-aria-1.1/#checkbox), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role)                 |
| gridcell                     | A cell in a `grid` or `treegrid`.                                                                                                                                              | [W3C](https://www.w3.org/TR/wai-aria-1.1/#gridcell), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/gridcell_role)                 |
| link                         | An interactive reference to an internal or external resource that, when activated, causes the user agent to navigate to that resource. Reference related `button` widget role. | [W3C](https://www.w3.org/TR/wai-aria-1.1/#link), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/link_role)                         |
| menuitem                     | An option in a set of choices contained by a `menu` or `menubar`.                                                                                                              | [W3C](https://www.w3.org/TR/wai-aria-1.1/#menuitem), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitem_role)                 |
| menuitemcheckbox             | A `menuitem` with a checkable state whose possible values are `true`, `false`, or `mixed`.                                                                                     | [W3C](https://www.w3.org/TR/wai-aria-1.1/#menuitemcheckbox), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitemcheckbox_role) |
| menuitemradio                | A checkable `menuitem` in a set of elements with the same role, only one of which can be checked at a time.                                                                    | [W3C](https://www.w3.org/TR/wai-aria-1.1/#menuitemradio), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitemradio_role)       |
| option                       | A selectable item in a `select` list.                                                                                                                                          | [W3C](https://www.w3.org/TR/wai-aria-1.1/#option), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/option_role)                     |
| progressbar                  | An element that displays the progress status for tasks that take a long time.                                                                                                  | [W3C](https://www.w3.org/TR/wai-aria-1.1/#progressbar), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role)           |
| radio                        | A checkable input in a group of elements with the same role, only one of which can be checked at a time.                                                                       | [W3C](https://www.w3.org/TR/wai-aria-1.1/#radio), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radio_role)                       |
| scrollbar                    | A graphical object that controls the scrolling of content within a viewing area, regardless of whether the content is fully displayed within the viewing area.                 | [W3C](https://www.w3.org/TR/wai-aria-1.1/#scrollbar), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/scrollbar_role)               |
| searchbox                    | A type of textbox intended for specifying search criteria. See related `textbox` and `search`.                                                                                 | [W3C](https://www.w3.org/TR/wai-aria-1.1/#searchbox), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/searchbox_role)               |
| separator (_when focusable_) | A divider that separates and distinguishes sections of content or groups of menuitems.                                                                                         | [W3C](https://www.w3.org/TR/wai-aria-1.1/#separator), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role)               |
| slider                       | A user input where the user selects a value from within a given range.                                                                                                         | [W3C](https://www.w3.org/TR/wai-aria-1.1/#slider), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/slider_role)                     |
| spinbutton                   | A form of `range` that expects the user to select from among discrete choices.                                                                                                 | [W3C](https://www.w3.org/TR/wai-aria-1.1/#spinbutton), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/spinbutton_role)             |
| switch                       | A type of checkbox that represents on/off values, as opposed to checked/unchecked values. Reference related `checkbox` widget role.                                            | [W3C](https://www.w3.org/TR/wai-aria-1.1/#switch), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/switch_role)                     |
| tab                          | A grouping label providing a mechanism for selecting the tab content that is to be rendered to the user.                                                                       | [W3C](https://www.w3.org/TR/wai-aria-1.1/#tab), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role)                           |
| tabpanel                     | A container for the resources associated with a `tab`, where each `tab` is contained in a `tablist`.                                                                           | [W3C](https://www.w3.org/TR/wai-aria-1.1/#tabpanel), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tabpanel_role)                 |
| textbox                      | A type of input that allows free-form text as its value.                                                                                                                       | [W3C](https://www.w3.org/TR/wai-aria-1.1/#textbox), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/textbox_role)                   |
| treeitem                     | An option item of a `tree`. This is an element within a tree that may be expanded or collapsed if it contains a sub-level group of tree item elements.                         | [W3C](https://www.w3.org/TR/wai-aria-1.1/#treeitem), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/treeitem_role)                 |

[scroll to top](#3-composite-roles)

## 2. Abstract Roles

Defining general role concepts, used for existence purposes only. **Authors must not use abstract roles in content.**

| Abstract Role Name | Description                                                                                                                                                                                                                                                                                                                                       | Resources                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| command            | A form of widget that performs an action but does not receive input data.                                                                                                                                                                                                                                                                         | [W3C](https://www.w3.org/TR/wai-aria-1.1/#command), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/composite_role)       |
| composite          | A widget that may contain navigable descendants or owned children.                                                                                                                                                                                                                                                                                | [W3C](https://www.w3.org/TR/wai-aria-1.1/#composite), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/composite_role)     |
| input              | A generic type of widget that allows user input.                                                                                                                                                                                                                                                                                                  | [W3C](https://www.w3.org/TR/wai-aria-1.1/#input), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/input_role)             |
| landmark           | A perceivable section containing content that is relevant to a specific, author-specified purpose and sufficiently important that users will likely want to be able to navigate to the section easily and to have it listed in a summary of the page. Such a page summary could be generated dynamically by a user agent or assistive technology. | [W3C](https://www.w3.org/TR/wai-aria-1.1/#landmark), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role)       |
| range              | An input representing a range of values that can be set by the user.                                                                                                                                                                                                                                                                              | [W3C](https://www.w3.org/TR/wai-aria-1.1/#range), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/range_role)             |
| roletype           | The base role from which all other roles in this taxonomy inherit.                                                                                                                                                                                                                                                                                | [W3C](https://www.w3.org/TR/wai-aria-1.1/#roletype), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/roletype_role)       |
| section            | A renderable structural containment unit in a document or application.                                                                                                                                                                                                                                                                            | [W3C](https://www.w3.org/TR/wai-aria-1.1/#section), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/section_role)         |
| sectionhead        | A structure that labels or summarizes the topic of its related section.                                                                                                                                                                                                                                                                           | [W3C](https://www.w3.org/TR/wai-aria-1.1/#sectionhead), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/sectionhead_role) |
| select             | A form widget that allows the user to make selections from a set of choices.                                                                                                                                                                                                                                                                      | [W3C](https://www.w3.org/TR/wai-aria-1.1/#select), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/select_role)           |
| structure          | A document structural element.                                                                                                                                                                                                                                                                                                                    | [W3C](https://www.w3.org/TR/wai-aria-1.1/#structure), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/structure_role)     |
| widget             | An interactive component of a graphical user interface (GUI).                                                                                                                                                                                                                                                                                     | [W3C](https://www.w3.org/TR/wai-aria-1.1/#widget), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/widget_role)           |
| window             | A browser or application window.                                                                                                                                                                                                                                                                                                                  | [W3C](https://www.w3.org/TR/wai-aria-1.1/#window), [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/window_role)           |

[scroll to top](#3-composite-roles)

## 3. Composite Roles

### i. combobox

The `combobox` role is for input that controls another element, such as a listbox or grid, that can dynamically pop up to help the user set the value of the input.
The popup can be a `listbox`, `grid`, `tree`, or `dialog`. Superclass role of `select`.

Learn more about the combobox role on [W3C](https://www.w3.org/TR/wai-aria-1.1/#combobox) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/combobox_role).

#### Combobox example

<img src="https://user-images.githubusercontent.com/5023024/165993726-b047c80a-9a7c-443b-b1b0-7a9ddf6498b2.svg" alt="" />

#### Combobox code

```html
<!-- Combobox role example -->
<label for="season-input">Season</label>
<input
  id="season-input"
  type="text"
  role="combobox"
  aria-autocomplete="list"
  aria-expanded="false"
  aria-controls="season-listbox"
/>
<ul id="season-listbox" role="listbox" aria-label="Seasons">
  <li id="opt-winter" role="option">Winter</li>
  <li id="opt-spring" role="option">Spring</li>
  <li id="opt-summer" role="option">Summer</li>
  <li id="opt-autumn" role="option">Autumn</li>
</ul>
```

#### Keyboard functionality for Combobox

| Key                      | Function                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `↓`                      | Moves focus to the next option, or to the first option if none was selected.                                                                                                                                                                                                                                                                                                                                                                    |
| `Alt` + `↓` (_Optional_) | If the popup is available but not displayed, displays the popup without moving focus.                                                                                                                                                                                                                                                                                                                                                           |
| `↑`                      | Moves focus to the previous option. Moving focus to the first option if focus was originally on the last option.                                                                                                                                                                                                                                                                                                                                |
| `Alt` + `↑` (_Optional_) | If the popup has focus, returns focus to the combobox, otherwise it closes the popup.                                                                                                                                                                                                                                                                                                                                                           |
| `Enter`                  | If the combobox is editable and an autocomplete suggestion is selected in the popup, accepts the suggestion either by placing the input cursor at the end of the accepted value in the combobox or by performing a default action on the value. For example, in a messaging application, the default action may be to add the accepted value to a list of message recipients and then clear the combobox so the user can add another recipient. |

[scroll to top](#roles)

### ii. grid

The `grid` role contains one or more rows of cells. The position of each cell is significant and can be focused using keyboard input.

Learn more about the grid role on [W3C](https://www.w3.org/TR/wai-aria-1.1/#grid) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/grid_role).

#### Grid Example

<img src="https://user-images.githubusercontent.com/5023024/166739351-25082a7f-c7b9-47fe-91bb-353fb554a180.svg" alt="" />

#### Grid Code

```html
<!-- Grid role example
     Code pen example: https://codepen.io/geospatialem/pen/OJzwWKm
-->
<table role="grid" aria-labelledby="grid-header">
  <caption id="grid-header">
    WCAG Criterion and Versions
  </caption>
  <thead role="rowgroup">
    <tr role="row">
      <td></td>
      <th role="columnheader" aria-label="Criterion">Criterion</th>
      <th role="columnheader" aria-label="Version">Version</th>
    </tr>
  </thead>
  <tbody role="rowgroup">
    <tr role="row">
      <th scope="row" role="rowheader" class="sr-only">Item 1</th>
      <!-- Note: for keyboard accessibility, all td elements, such as an input must contain a tabindex of 0 -->
      <!-- example 1:
           <input tabindex="0" type="checkbox" id="{{WCAG 2.0 1.4.1}}-select">
           <label for="{{WCAG 2.0 1.4.1}}-select">{{WCAG 2.0 1.4.1}}</label>
      -->
      <!-- example 2:
           <button tabindex="0">Success Criterion <span class="sr-only">{{WCAG 2.0 1.4.1}}</span></button>
      -->
      <td role="gridcell" tabindex="-1">1.4.1</td>
      <td role="gridcell" tabindex="-1">WCAG 2.0</td>
    </tr>
    <tr role="row">
      <th scope="row" role="rowheader" class="sr-only">Item 2</th>
      <td role="gridcell" tabindex="-1">1.4.10</td>
      <td role="gridcell" tabindex="-1">WCAG 2.1</td>
    </tr>
    <tr role="row">
      <th scope="row" role="rowheader" class="sr-only">Item 3</th>
      <td role="gridcell" tabindex="-1">1.4.10</td>
      <td role="gridcell" tabindex="-1">WCAG 2.1</td>
    </tr>
    <!-- … Additional Rows … -->
  </tbody>
</table>
```

#### Keyboard functionality for Grid

When a keyboard user encounters a `grid`, they navigate the rows and columns using the `←`, `→`, `↑` and `↓` keys.

To activate the interactive component, they will use the `return` and `space` keys.

| Key             | Function                                                                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `→`             | Moves focus one cell to the right. If focus is on the right-most cell in the row, focus does not move.                                                                                                                                |
| `←`             | Moves focus one cell to the left. If focus is on the left-most cell in the row, focus does not move.                                                                                                                                  |
| `↓`             | Moves focus one cell down. If focus is on the bottom cell in the column, focus does not move.                                                                                                                                         |
| `↑`             | Moves focus one cell up. If focus is on the top cell in the column, focus does not move.                                                                                                                                              |
| `Page down`     | Moves focus down an author-determined number of rows, typically scrolling so the bottom row in the currently visible set of rows becomes one of the first visible rows. If focus is in the last row of the grid, focus does not move. |
| `Page up`       | Moves focus up an author-determined number of rows, typically scrolling so the top row in the currently visible set of rows becomes one of the last visible rows. If focus is in the first row of the grid, focus does not move.      |
| `Home`          | Moves focus to the first cell in the row that contains focus.                                                                                                                                                                         |
| `End`           | Moves focus to the last cell in the row that contains focus.                                                                                                                                                                          |
| `ctrl` + `Home` | Moves focus to the first cell in the first row.                                                                                                                                                                                       |
| `ctrl` + `End`  | Moves focus to the last cell in the last row.                                                                                                                                                                                         |

[scroll to top](#roles)

### iii. listbox

The `listbox` role is used for lists from which a user may select one or more items which are static, unlike HTML `<select>` elements, may contain images.

Learn more about the listbox role on [W3C](https://www.w3.org/TR/wai-aria-1.1/#listbox) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role).

#### Listbox Example

<img src="https://user-images.githubusercontent.com/5023024/166012949-d4e16d17-48c2-40a1-a856-35676eb9c884.svg" alt="" />

#### Listbox Code

```html
<!-- Listbox role example -->
<p id="listbox-label" role="label">Season</p>
<input
  type="text"
  aria-labelledby="listbox-label"
  role="combobox"
  aria-expanded="true"
  aria-autocomplete="list"
  aria-owns="season-listbox"
  aria-activedescendant="selected-option"
/>
<ul role="listbox" id="season-listbox">
  <li role="option">Winter</li>
  <li role="option" id="selected-option">Spring</li>
  <li role="option">Summer</li>
  <li role="option">Autumn</li>
</ul>
```

#### Keyboard functionality for Listbox

_Single selection_:

If none of the options are selected before the `listbox` receives focus, the first option receives focus. Optionally, the first option may be automatically selected. If an option is selected before the `listbox` receives focus, focus is set on the selected option.

| Key                 | Function                                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `↓`                 | Moves focus to the next option. Optionally, in a single-select listbox, selection may also move with focus.                                                                                 |
| `↑`                 | Moves focus to the previous option. Optionally, in a single-select listbox, selection may also move with focus.                                                                             |
| `Home` (_Optional_) | Moves focus to first option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
| `End` (_Optional_)  | Moves focus to last option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options.  |

_Multiple selection_:

If none of the options are selected before the `listbox` receives focus, focus is set on the first option and there is no automatic change in the selected state. If one or more options are selected before the `listbox` receives focus, focus is set on the first option in the list that is selected.

Recommended selection model, holding modifier keys, such as `Shift` or `ctrl`, is not necessary:

| Key                                    | Function                                                                                                        |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `space`                                | Changes the selection state of the focused option.                                                              |
| `Shift` + `↓` (_Optional_)             | Moves focus to and toggles the selected state of the next option.                                               |
| `Shift` + `↑` (_Optional_)             | Moves focus to and toggles the selected state of the previous option.                                           |
| `Shift` + `space` (_Optional_)         | Selects contiguous items from the most recently selected item to the focused item.                              |
| `ctrl` + `Shift` + `Home` (_Optional_) | Selects the focused option and all options up to the first option. Optionally, moves focus to the first option. |
| `ctrl` + `Shift` + `End` (_Optional_)  | Selects the focused option and all options down to the last option. Optionally, moves focus to the last option. |
| `ctrl` + `A` (_Optional_)              | Selects all options in the list. Optionally, if all options are selected, it may also unselect all options.     |

[scroll to top](#roles)

### iv. menu

The `menu` role offers a list of choices to the user, often a list of common actions or functions that the user can invoke. Appropriate when a list of items is presented in a manner similar to a menu on a desktop application.

For keyboard accessibility, authors **should** manage focus of descendants for all instances of this role. Elements within the role menu have an implicit `aria-orientation` value of `vertical`.

Learn more about the menu role on [W3C](https://www.w3.org/TR/wai-aria-1.1/#menu) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menu_role).

#### Menu Example

<img src="https://user-images.githubusercontent.com/5023024/166055572-44d789c3-b0eb-40d0-9986-e82f6d1fd701.svg" alt="" />

#### Menu Code

```html
<!-- Menu role example -->
<div class="dropdown">
  <button type="button" id="dropdown-menu">
    Actions
    <span class="caret"></span>
  </button>
  <!-- Selection mode: Single -->
  <ul role="menu">
    Create
    <li><a role="menuitemradio" class="dropdown-item">Event</a></li>
    <li><a role="menuitemradio" class="dropdown-item" aria-checked="true">Survey</a></li>
    <li><a role="menuitemradio" class="dropdown-item">Poll</a></li>
  </ul>
  <ul class="dropdown-separator" role="separator"></ul>
  <!-- Selection mode: Multi -->
  <ul role="menu">
    Save
    <li><a role="menuitemcheckbox" class="dropdown-item">Save</a></li>
    <li><a role="menuitemcheckbox" class="dropdown-item">Duplicate</a></li>
  </ul>
</div>
```

#### Keyboard functionality for Menu

| Key                   | Function                                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `space` <br/> `enter` | Activates the menu item, which is equivalent to activating the link element from which the menu item is made.                                              |
| `Esc`                 | - Closes the menu. <br/> - Sets focus to the menu.                                                                                                         |
| `↑`                   | - Moves focus to the previous menu item. <br/> - Focus is on the first menu item, moves focus to the last menu item.                                       |
| `↓`                   | - Moves focus to the next menu item. <br/> - If focus is on the last menu item, moves focus to the first menu item.                                        |
| `Home`                | Moves focus to the first menu item.                                                                                                                        |
| `End`                 | Moves focus to the last menu item.                                                                                                                         |
| `A-Z` <br/> `a-z`     | - Moves focus to the next menu item with a label that starts with the typed character if such an menu item exists. <br/> - Otherwise, focus does not move. |

[scroll to top](#roles)

### v. menubar

The `menubar` role is a presentation of a menu that usually remains visible and usually is presented horizontally. Superclass role of `menu`, and related to `toolbar`.

Learn more about the menubar role on [W3C](https://www.w3.org/TR/wai-aria-1.1/#menubar) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menubar_role).

#### Menubar Example

<img src="https://user-images.githubusercontent.com/5023024/166061531-f27ffc8b-14fd-45e2-bc14-04609987e420.svg" alt="" />

#### Menubar Code

```html
<!-- Menubar role example -->
<nav aria-label="Menubar example">
  <ul class="menubar-navigation" role="menubar" aria-label="Menubar example">
    <li role="none">
      <a role="menuitem" aria-haspopup="true" aria-expanded="true">
        Create
        <span class="caret"></span>
      </a>
      <!-- Selection mode: Single -->
      <ul role="menu" aria-label="Create">
        <li role="none">
          <a role="menuitemradio" aria-checked="false">Event</a>
        </li>
        <li role="none">
          <a role="menuitemradio" aria-checked="true">Survey</a>
        </li>
        <li role="none">
          <a role="menuitemradio" aria-checked="false">Poll</a>
        </li>
      </ul>
    </li>
    <li role="none">
      <a role="menuitem" aria-haspopup="true" aria-expanded="false">
        Save
        <span class="caret"></span>
      </a>
      <ul role="menu" aria-label="Save">
        <li role="none">
          <a role="menuitem">Save As...</a>
        </li>
      </ul>
    </li>
  </ul>
</nav>
```

#### Keyboard functionality for Menubar

| Key                   | Function                                                                                                                                                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `space` <br/> `enter` | - If the item is a parent menu item, opens submenu and moves focus to first item in the submenu. <br/> - Otherwise, activates the menu item, which loads new content and places focus on the heading that titles the content. |
| `→`                   | - Moves focus to the next item in the menubar. <br/> - If focus is on the last item, moves focus to the first item.                                                                                                           |
| `←`                   | - Moves focus to the previous item in the menubar. <br/> - If focus is on the first item, moves focus to the last item.                                                                                                       |
| `↓`                   | Opens submenu and moves focus to first item in the submenu.                                                                                                                                                                   |
| `↑`                   | Opens submenu and moves focus to last item in the submenu.                                                                                                                                                                    |
| `Home`                | Moves focus to first item in the menubar.                                                                                                                                                                                     |
| `End`                 | Moves focus to last item in the menubar.                                                                                                                                                                                      |
| `A-Z` <br/> `a-z`     | - Moves focus to next item in the menubar having a name that starts with the typed character. <br/> - If none of the items have a name starting with the typed character, focus does not move.                                |

[scroll to top](#roles)

### vi. radiogroup

The `radiogroup` role is a group of radio buttons.

**Note**: Some situations can be written using semantic HTML, which requires no CSS or JavaScript. Below are two examples, one with the `radiogroup` role, and the other with semantic HTML.

Learn more about the radiogroup role on [W3C](https://www.w3.org/TR/wai-aria-1.1/#radiogroup) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radiogroup_role).

#### Radiogroup Example

<img src="https://user-images.githubusercontent.com/5023024/166739360-091a7211-e230-46b5-9bdf-01f44d108599.svg" alt="" />

#### a. Radiogroup Code

```html
<!-- Radiogroup role example -->
<span id="segmented-control-label">What is the study of physical features on Earth?</span>
<ul
  id="segmented-control"
  class="radiogroup"
  role="radiogroup"
  aria-labelledby="segmented-control-label"
  aria-activedescendant="radio-geography"
  tabindex="0"
>
  <li id="radio-maps" role="radio" aria-checked="false">Maps</li>
  <li id="radio-layer" role="radio" aria-checked="false">Layer</li>
  <li id="radio-data" role="radio" aria-checked="false">Data</li>
  <li id="radio-geography" role="radio" aria-checked="true">Geography</li>
</ul>
```

#### b. Radiogroup Code in Semantic HTML

```html
<fieldset>
  <legend>What is the study of physical features on Earth?</legend>
  <p>
    <input name="radioOption" type="radio" id="Maps" />
    <label for="Maps">Maps</label>
  </p>
  <p>
    <input name="radioOption" type="radio" id="Layer" />
    <label for="Layer">Layer</label>
  </p>
  <p>
    <input name="radioOption" type="radio" id="Data" />
    <label for="Data">Data</label>
  </p>
  <p>
    <input name="radioOption" type="radio" id="Geography" checked />
    <label for="Geography">Geography</label>
  </p>
</fieldset>
```

#### Keyboard functionality for Radiogroup

| Key             | Function                            |
| --------------- | ----------------------------------- |
| `tab`           | Moves keyboard focus to radiogroup. |
| `←` `→` `↑` `↓` | Moves up and down radio options.    |

[scroll to top](#roles)

### vii. tablist

The `tablist` role identifies the element that serves as the container for a set of `tabs`. The tab content are referred to as `tabpanel` elements.

Each `tab` in a `tablist` serves as a label for one `tabpanel` and can be activated to display that panel. The `tablist` is the containing element for the set of tab elements contained.

Learn more about the tablist role on [W3C](https://www.w3.org/TR/wai-aria-1.1/#tablist) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tablist_role).

#### Tablist Example

<img src="https://user-images.githubusercontent.com/5023024/166065017-5d961407-f1cc-48f0-90ba-42b03941c586.svg" alt="" />

#### Tablist Code

```html
<!-- Tablist role example -->
<!-- tablist > tab roles -->
<ul role="tablist">
  <li role="tab" aria-selected="false" aria-setsize="3" aria-posinset="2" tabindex="0">Maps</li>
  <li class="active" role="tab" aria-selected="true" aria-setsize="3" aria-posinset="1" tabindex="0">Layers</li>
  <li role="tab" aria-selected="false" aria-setsize="3" aria-posinset="3" tabindex="0">Data</li>
</ul>
<!-- Tabpanel roles -->
<div class="panels">
  <article role="tabpanel" aria-hidden="true">..Maps panel content..</article>
  <article class="active-panel" role="tabpanel" aria-hidden="false">..Layers panel content..</article>
  <article role="tabpanel" aria-hidden="true">..Data panel content..</article>
</div>
```

#### Keyboard functionality for Tablist

If the `tablist` is horizontal, it does not listen for `↓` or `↑` so those keys can provide their normal browser scrolling functions even when focus is inside the `tablist`.

| Key                   | Function                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tab`                 | Moves keyboard focus in the tablist.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `←`                   | moves focus to the previous tab. If focus is on the first tab, moves focus to the last tab. Optionally, activates the newly focused tab.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `→`                   | Moves focus to the next tab. If focus is on the last tab element, moves focus to the first tab. Optionally, activates the newly focused tab.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `↑`                   | Moves focus to the previous tab. If focus is on the first tab, moves focus to the last tab. Optionally, activates the newly focused tab.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `↓`                   | Moves focus to the next tab. If focus is on the last tab element, moves focus to the first tab. Optionally, activates the newly focused tab.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `space` <br/> `Enter` | Activates the tab if it was not activated automatically on focus.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `Home` (_optional_)   | Moves focus to the first tab. Optionally, activates the newly focused tab.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `End` (_optional_)    | Moves focus to the last tab. Optionally, activates the newly focused tab.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Shift` + `F10`       | If the tab has an associated popup menu, opens the menu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `Delete` (_optional_) | If deletion is allowed, deletes (closes) the current tab element and its associated tab panel, sets focus on the tab following the tab that was closed, and optionally activates the newly focused tab. If there is not a tab that followed the tab that was deleted, e.g., the deleted tab was the right-most tab in a left-to-right horizontal tab list, sets focus on and optionally activates the tab that preceded the deleted tab. If the application allows all tabs to be deleted, and the user deletes the last remaining tab in the tab list, the application moves focus to another element that provides a logical work flow. As an alternative to Delete, or in addition to supporting Delete, the delete function is available in a context menu. |

[scroll to top](#roles)

### viii. tree

A `tree` is a widget that allows the user to select one or more items from a hierarchically organized collection. Any item in the hierarchy may have child tree items, `treeitem`. Tree items can be expanded or collapsed, showing and hiding their children.

Learn more about the tree role on [W3C](https://www.w3.org/TR/wai-aria-1.1/#tree) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tree_role).

#### Tree Example

<img src="https://user-images.githubusercontent.com/5023024/166065082-975ba9a2-2951-4bf5-854d-240dbd9d0fe6.svg" alt="" />

#### Tree Code

```html
<!-- Tree role example -->
<nav aria-label="Tree role example">
  <ul class="treeview-navigation" role="tree" aria-label="Tree role example">
    <!-- Maps tree item -->
    <li role="none">
      <a role="treeitem">
        <span class="label">Maps</span>
      </a>
    </li>
    <!-- Layers tree item (parent) -->
    <li role="none">
      <a role="treeitem" aria-expanded="true" aria-owns="id-layers-subtree">
        <span class="label">
          <span class="caret"></span>
          Layers
        </span>
      </a>
      <!-- Subtree items (children) -->
      <ul id="id-layers-subtree" role="group" aria-label="layers">
        <li role="none">
          <a role="treeitem">
            <span class="label">Feature layers</span>
          </a>
        </li>
        <!-- Tile layers subtree item (child), selected via aria-current -->
        <li role="none">
          <a role="treeitem" aria-current>
            <span class="label">Tile layers</span>
          </a>
        </li>

        <li role="none">
          <a role="treeitem">
            <span class="label">Map image layers</span>
          </a>
        </li>

        <li role="none">
          <a role="treeitem">
            <span class="label">Scene layers</span>
          </a>
        </li>
      </ul>
      <!-- end Layers subtree -->
    </li>
    <!-- end Layers tree -->

    <li role="none">
      <a role="treeitem">
        <span class="label">Scenes</span>
      </a>
    </li>

    <li role="none">
      <a role="treeitem">
        <span class="label">Apps</span>
      </a>
    </li>

    <li role="none">
      <a role="treeitem">
        <span class="label">Tools</span>
      </a>
    </li>
  </ul>
</nav>
```

#### Keyboard functionality for Tree

For a vertically oriented `tree`, which is the default orientation:

| Key                | Function                                                                                                                                                                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `→`                | - When focus is on a closed node, opens the node; focus does not move. <br/> - When focus is on a open node, moves focus to the first child node.<br/> - When focus is on an end node (a tree item with no children), does nothing.            |
| `←`                | - When focus is on an open node, closes the node. <br/> - When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.<br/> - When focus is on a closed `tree`, does nothing.               |
| `↓`                | Moves focus to the next node that is focusable without opening or closing a node.                                                                                                                                                              |
| `↑`                | Moves focus to the previous node that is focusable without opening or closing a node.                                                                                                                                                          |
| `Home`             | Moves focus to the first node in the tree without opening or closing a node.                                                                                                                                                                   |
| `End`              | Moves focus to the first node in the tree without opening or closing a node.                                                                                                                                                                   |
| `Enter`            | Performs the default action of the currently focused node. For parent nodes, it opens or closes the node. In single-select trees, if the node has no children, selects the current node if not already selected (which is the default action). |
| Type a character\* | - Focus moves to the next node with a name that starts with the typed character. <br/> - If multiple characters are typed in rapid succession, focus moves to the next node with a name that starts with the string of characters typed.       |
| `*` (_optional_)   | Expands all siblings that are at the same level as the current node.                                                                                                                                                                           |

`*` Type-ahead is recommended for all trees, especially for trees with more than 7 root nodes.

[scroll to top](#roles)

### ix. treegrid

The `treegrid` role identifies an element as being grid whose rows can be expanded and collapsed in the same manner as for a tree.

It is important for all cells to be able to receive or contain keyboard focus because screen readers are generally in application reading mode, rather than their document reading mode, when users are interacting with the grid. While in application mode, a screen reader user hears only focusable elements and content that labels focusable elements. If content can't receive focus, screen reader users may unknowingly overlook elements contained in the `treegrid`.

Learn more about the treegrid role on [W3C](https://www.w3.org/TR/wai-aria-1.1/#treegrid) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/treegrid_role).

#### Treegrid Example

<img src="https://user-images.githubusercontent.com/5023024/166065105-033dce9e-52e0-4a69-b879-849edd1ec711.svg" alt="" />

##### Treegrid Code

```html
<!-- Treegrid role example -->
<table id="treegrid" role="treegrid" aria-label="Project hours">
  <colgroup>
    <col id="treegrid-column1" />
    <col id="treegrid-column2" />
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Project Name</th>
      <th scope="col">Hours Done</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row" aria-level="1" aria-posinset="1" aria-setsize="1" aria-expanded="true">
      <td role="gridcell">All Projects</td>
      <td role="gridcell">360</td>
    </tr>
    <tr role="row" aria-level="2" aria-posinset="1" aria-setsize="3" aria-expanded="false">
      <td role="gridcell">Year 2010</td>
      <td role="gridcell">56</td>
    </tr>
    <tr role="row" aria-level="2" aria-posinset="1" aria-setsize="3" aria-expanded="true">
      <td role="gridcell">Year 2011</td>
      <td role="gridcell">188</td>
    </tr>
    <tr role="row" aria-level="3" aria-posinset="1" aria-setsize="3" aria-expanded="false">
      <td role="gridcell">Q1</td>
      <td role="gridcell">30</td>
    </tr>
    <tr role="row" aria-level="3" aria-posinset="1" aria-setsize="3" aria-expanded="true">
      <td role="gridcell">Q2</td>
      <td role="gridcell">95</td>
    </tr>
    <tr role="row" aria-level="4" aria-posinset="1" aria-setsize="3">
      <td role="gridcell">Website Re-brand</td>
      <td role="gridcell">95</td>
    </tr>
    <tr role="row" aria-level="3" aria-posinset="1" aria-setsize="3" aria-expanded="false">
      <td role="gridcell">Q3</td>
      <td role="gridcell">42</td>
    </tr>
  </tbody>
</table>
```

#### Keyboard functionality for Treegrid

Recommended selection model, holding modifier keys, such as `Shift` or `ctrl`, is not necessary:

| Key                          | Function                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Enter`                      | If cell-only focus is enabled and focus is on the first cell with the `aria-expanded` property, opens or closes the child rows. Otherwise, performs the default action for the cell.                                                                                                                                                                                                                                                                                                                                                                    |
| `tab`                        | If the row containing focus contains focusable elements such as an `<input>`, `<button>` or `<a>`, ,moves the focus to the next input in the row. If focus is on the last focusable element in the row, moves focus out of the treegrid widget to the next focusable element.                                                                                                                                                                                                                                                                           |
| `→`                          | If focus is on a collapsed row, expand the row. If focus is on an expanded row or is on a row that does not have child rows, moves focus to the first cell in the row. If focus is on the right-most cell in a row, focus does not move. If focus is on any other cell, moves focus one cell to the right.                                                                                                                                                                                                                                              |
| `←`                          | If focus is on an expanded row, collapses the row. If focus is on a collapsed row or on a row that does not have child rows, focus does not move. If focus is on the first cell in a row and row focus is supported, moves focus to the row. If focus is on the first cell in a row and row focus is not supported, focus does not move. If focus is on any other cell, moves focus one cell to the left.                                                                                                                                               |
| `↓`                          | If focus is on a row, moves focus one row down. If focus is on the last row, focus does not move. If focus is on a cell, moves focus one cell down. If focus is on the bottom cell in the column, focus does not move.                                                                                                                                                                                                                                                                                                                                  |
| `↑`                          | If focus is on a row, moves focus one row up. If focus is on the first row, focus does not move. If focus is on a cell, moves focus one cell up. If focus is on the top cell in the column, focus does not move.                                                                                                                                                                                                                                                                                                                                        |
| `Page Down`                  | If focus is on a row or cell, moves focus down a predetermined number of rows or cells. Usually, it moves down the equivalent of the height of the treegrid, scrolling so the bottom row in the currently visible set of rows becomes one of the first visible rows. If focus is in the last row , focus does not move.                                                                                                                                                                                                                                 |
| `Page Up`                    | If focus is on a row or cell, moves focus up an predetermined number of rows. Usually, it moves up the equivalent of the height of the treegrid, scrolling so the top row in the currently visible set of rows becomes one of the last visible rows. If focus is in the first row, focus does not move.                                                                                                                                                                                                                                                 |
| `Home` /<br> `Ctrl` + `Home` | If focus is on a row, moves focus to the first row. If focus is in the first row, focus does not move. If focus is on a cell, moves focus to the first cell in the row. If focus is in the first cell of the row, focus does not move.                                                                                                                                                                                                                                                                                                                  |
| `End` /<br> `Ctrl` + `End`   | If focus is on a row, moves focus to the last row. If focus is in the last row, focus does not move. If focus is on a cell, moves focus to the last cell in the row. If focus is in the last cell of the row, focus does not move. If not all rows are present in the DOM, this can be used to focus on the last row present in the DOM, or on the last row available if the entire database were present in the DOM. <br/><br/> If a treegrid supports selection of cells, rows, or columns, the following keys are commonly used for these functions. |
| `Ctrl` + `space`             | If focus is on a row, selects all cells. If focus is on a cell, selects the column that contains the focus.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `Shift` + `space`            | If focus is on a row, select the row. If focus is on a cell, select the row that contains the focus. If the treegrid includes a column with checkboxes for selecting rows, this key can also be used as a shortcut for checking the box when focus is not on the checkbox.                                                                                                                                                                                                                                                                              |
| `Ctrl` + `A`                 | Selects all cells.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `Shift` + `→`                | If focus is on a cell, extends selection one cell to the right.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `Shift` + `←`                | If focus is on a cell, extends selection one cell to the left.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `Shift` + `↓`                | If focus is on a row, extends selection to all the cells in the next row. If focus is on a cell, extends selection one cell down.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Shift` + `↑`                | If focus is on a row, extends selection to all the cells in the previous row. If focus is on a cell, extends selection one cell up.                                                                                                                                                                                                                                                                                                                                                                                                                     |

If navigation functions can dynamically add more rows or columns to the DOM, key events that move focus to the beginning or end of the grid, such as `ctrl` + `End`, may move focus to the last row in the DOM rather than the last available row in the back-end data.

While navigation keys, such as arrow keys, are moving focus from cell to cell, they are not available to do something like operate a `combobox` or move an editing caret inside of a cell.

[scroll to top](#roles)
