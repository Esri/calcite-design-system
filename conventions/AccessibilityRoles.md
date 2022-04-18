# Composite Roles

1. [combobox](#1-combobox)
2. [grid](#2-grid)
3. [listbox](#3-listbox)
4. [menu](#4-menu)
5. [menubar](#5-menubar)
6. [radiogroup](#6-radiogroup)
7. [tablist](#7-tablist)
8. [tree](#8-tree)
9. [treegrid](#9-treegrid)

## 1. combobox

The `combobox` role is for input that controls another element, such as a listbox or grid, that can dynamically pop up to help the user set the value of the input.
The popup can be a `listbox`, `grid`, `tree`, or `dialog`. Superclass role of `select`.

### Demo

<label for="ex1-input" id="ex1-label" class="combobox-label">Fruit or Vegetable</label>

<div class="combobox-wrapper">
<div role="combobox" aria-expanded="false" aria-owns="ex1-listbox" aria-haspopup="listbox"
  id="ex1-combobox">
<input type="text"
    aria-autocomplete="list"
    aria-controls="ex1-listbox"
    id="ex1-input">
</div>
<ul aria-labelledby="ex1-label"
  role="listbox"
  id="ex1-listbox"
  class="listbox hidden">
</ul>
</div>

### Code

```html
<label for="ex1-input" id="ex1-label" class="combobox-label"> Choice 1 Fruit or Vegetable</label>
<div class="combobox-wrapper">
  <div role="combobox" aria-expanded="false" aria-owns="ex1-listbox" aria-haspopup="listbox" id="ex1-combobox">
    <input type="text" aria-autocomplete="list" aria-controls="ex1-listbox" id="ex1-input" />
  </div>
  <ul aria-labelledby="ex1-label" role="listbox" id="ex1-listbox" class="listbox hidden"></ul>
</div>
```

### Keyboard functionality

| Key                      | Function                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `↓`                      | Moves focus to the next option, or to the first option if none was selected.                                                                                                                                                                                                                                                                                                                                                                    |
| `Alt` + `↓` (_Optional_) | If the popup is available but not displayed, displays the popup without moving focus.                                                                                                                                                                                                                                                                                                                                                           |
| `↑`                      | Moves focus to the previous option. Moving focus to the first option if focus was originally on the last option.                                                                                                                                                                                                                                                                                                                                |
| `Alt` + `↑` (_Optional_) | If the popup has focus, returns focus to the combobox, otherwise it closes the popup.                                                                                                                                                                                                                                                                                                                                                           |
| `Enter`                  | If the combobox is editable and an autocomplete suggestion is selected in the popup, accepts the suggestion either by placing the input cursor at the end of the accepted value in the combobox or by performing a default action on the value. For example, in a messaging application, the default action may be to add the accepted value to a list of message recipients and then clear the combobox so the user can add another recipient. |

[scroll to top](#composite-roles)

## 2. grid

The `grid` role contains one or more rows of cells. The position of each cell is significant and can be focused using keyboard input.

### Demo

<table role="grid" aria-labelledby="id-select-your-seat">
  <caption id="id-select-your-seat">Select your seat</caption>
  <tbody role="presentation">
    <tr role="presentation">
      <td></td>
      <th>Row A</th>
      <th>Row B</th>
    </tr>
    <tr>
      <th scope="row">Aisle 1</th>
      <td tabindex="0">
        <button id="1a" tabindex="-1">1A</button>
      </td>
      <td tabindex="-1">
        <button id="1b" tabindex="-1">1B</button>
      </td>
      <!-- More Columns -->
    </tr>
    <tr>
      <th scope="row">Aisle 2</th>
      <td tabindex="-1">
        <button id="2a" tabindex="-1">2A</button>
      </td>
      <td tabindex="-1">
        <button id="2b" tabindex="-1">2B</button>
      </td>
      <!-- More Columns -->
    </tr>
  </tbody>
</table>

### Code

```html
<table role="grid" aria-labelledby="id-select-your-seat">
  <caption id="id-select-your-seat">
    Select your seat
  </caption>
  <tbody role="presentation">
    <tr role="presentation">
      <td></td>
      <th>Row A</th>
      <th>Row B</th>
    </tr>
    <tr>
      <th scope="row">Aisle 1</th>
      <td tabindex="0">
        <button id="1a" tabindex="-1">1A</button>
      </td>
      <td tabindex="-1">
        <button id="1b" tabindex="-1">1B</button>
      </td>
      <!-- More Columns -->
    </tr>
    <tr>
      <th scope="row">Aisle 2</th>
      <td tabindex="-1">
        <button id="2a" tabindex="-1">2A</button>
      </td>
      <td tabindex="-1">
        <button id="2b" tabindex="-1">2B</button>
      </td>
      <!-- More Columns -->
    </tr>
  </tbody>
</table>
```

### Keyboard functionality

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

[scroll to top](#composite-roles)

## 3. listbox

The `listbox` role is used for lists from which a user may select one or more items which are static, unlike HTML `<select>` elements, may contain images.

### Demo

<p id="listbox1label" role="label">Select a color:</p>
<div role="listbox" tabindex="0" id="listbox1" aria-labelledby="listbox1label"
  onclick="return listItemClick(event);"
  onkeydown="return listItemKeyEvent(event);"
  onkeypress="return listItemKeyEvent(event);"
  aria-activedescendant="listbox1-1">
    <div role="option" id="listbox1-1" class="selected" aria-selected="true">Green</div>
    <div role="option" id="listbox1-2">Orange</div>
    <div role="option" id="listbox1-3">Red</div>
    <div role="option" id="listbox1-4">Blue</div>
    <div role="option" id="listbox1-5">Violet</div>
    <div role="option" id="listbox1-6">Periwinkle</div>
</div>

### Code

```html
<p id="listbox1label" role="label">Select a color:</p>
<div
  role="listbox"
  tabindex="0"
  id="listbox1"
  aria-labelledby="listbox1label"
  onclick="return listItemClick(event);"
  onkeydown="return listItemKeyEvent(event);"
  onkeypress="return listItemKeyEvent(event);"
  aria-activedescendant="listbox1-1"
>
  <div role="option" id="listbox1-1" class="selected" aria-selected="true">Green</div>
  <div role="option" id="listbox1-2">Orange</div>
  <div role="option" id="listbox1-3">Red</div>
  <div role="option" id="listbox1-4">Blue</div>
  <div role="option" id="listbox1-5">Violet</div>
  <div role="option" id="listbox1-6">Periwinkle</div>
</div>
```

### Keyboard functionality

#### Single selection

If none of the options are selected before the `listbox` receives focus, the first option receives focus. Optionally, the first option may be automatically selected. If an option is selected before the `listbox` receives focus, focus is set on the selected option.
| Key | Function |
| ----------- | ----------- |
| `↓` | Moves focus to the next option. Optionally, in a single-select listbox, selection may also move with focus. |
| `↑` | Moves focus to the previous option. Optionally, in a single-select listbox, selection may also move with focus. |
| `Home` (_Optional_) | Moves focus to first option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
| `End` (_Optional_) | Moves focus to last option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |

#### Multiple selection

If none of the options are selected before the `listbox` receives focus, focus is set on the first option and there is no automatic change in the selected state. If one or more options are selected before the `listbox` receives focus, focus is set on the first option in the list that is selected.

Recommended selection model, holding modifier keys, such as `Shift` or `ctrl`, is not necessary:
| Key | Function |
| ----------- | ----------- |
| `space` | Changes the selection state of the focused option. |
| `Shift` + `↓` (_Optional_) | Moves focus to and toggles the selected state of the next option. |
| `Shift` + `↑` (_Optional_) | Moves focus to and toggles the selected state of the previous option. |
| `Shift` + `space` (_Optional_) | Selects contiguous items from the most recently selected item to the focused item. |
| `ctrl` + `Shift` + `Home` (_Optional_) | Selects the focused option and all options up to the first option. Optionally, moves focus to the first option. |
| `ctrl` + `Shift` + `End` (_Optional_) | Selects the focused option and all options down to the last option. Optionally, moves focus to the last option. |
| `ctrl` + `A` (_Optional_) | Selects all options in the list. Optionally, if all options are selected, it may also unselect all options. |

[scroll to top](#composite-roles)

## 4. menu

The `menu` role offers a list of choices to the user, often a list of common actions or functions that the user can invoke. Appropriate when a list of items is presented in a manner similar tto a menu on a desktop application.

For keyboard accessibility, authors **should** manage focus of descendants for all instances of this role. Elements within the role menu have an implicit `aria-orientation` value of `vertical`.

### Code

```html
<ul role="menu">
  <li role="menuitem">New</li>
  <li role="menuitem">Open</li>
  <li role="menuitem">Save</li>
  <li role="menuitem">Close</li>
</ul>
```

### Keyboard functionality

| Key                   | Function                                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `space` <br/> `enter` | Activates the menu item, which is equivalent to activating the link element from which the menu item is made.                                              |
| `Esc`                 | - Closes the menu. <br/> - Sets focus to the menu.                                                                                                         |
| `↑`                   | - Moves focus to the previous menu item. <br/> - Focus is on the first menu item, moves focus to the last menu item.                                       |
| `↓`                   | - Moves focus to the next menu item. <br/> - If focus is on the last menu item, moves focus to the first menu item.                                        |
| `Home`                | Moves focus to the first menu item.                                                                                                                        |
| `End`                 | Moves focus to the last menu item.                                                                                                                         |
| `A-Z` <br/> `a-z`     | - Moves focus to the next menu item with a label that starts with the typed character if such an menu item exists. <br/> - Otherwise, focus does not move. |

[scroll to top](#composite-roles)

## 5. menubar

The `menubar` role is a presentation of a menu that usually remains visible and usually is presented horizontally. Superclass role of `menu`, and related to `toolbar`.

### Code

```html
<div role="menubar">
  <div role="menuitem" aria-haspopup="true" id="fileMenu">File</div>
  <div role="menu" aria-labelledby="fileMenu">
    <div role="menuitem">Open</div>
    <div role="menuitem">Save</div>
    <div role="menuitem">Save as ...</div>
  </div>
</div>
```

### Keyboard functionality

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

[scroll to top](#composite-roles)

## 6. radiogroup

The `radiogroup` role is a group of radio buttons.

**Note**: Some situations can be written using semantic HTML, which requires no CSS or JavaScript. Below are two examples, one with the `radiogroup` role, and the other with semantic HTML.

### Demo

<fieldset>
  <legend>Which is the best color?</legend>
  <p>
    <input name="colorOption" type="radio" id="purple">
    <label for="purple">Purple</label>
  </p>
  <p>
    <input name="colorOption" type="radio" id="aubergine">
    <label for="aubergine">Aubergine</label>
  </p>
  <p>
    <input name="colorOption" type="radio" id="magenta">
    <label for="magenta">Magenta</label>
  </p>
  <p>
    <input name="colorOption" type="radio" id="all">
    <label for="all">All of the above</label>
  </p>
</fieldset>

### i. Code: `radiogroup` role

```html
<div role="radiogroup" aria-labelledby="question">
  <div id="question">Which is the best color?</div>
  <div id="radioGroup">
    <p>
      <span id="colorOption_0" tabindex="0" role="radio" aria-checked="false" aria-labelledby="purple"></span>
      <span id="purple">Purple</span>
    </p>
    <p>
      <span id="colorOption_1" tabindex="-1" role="radio" aria-checked="false" aria-labelledby="aubergine"></span>
      <span id="aubergine">Aubergine</span>
    </p>
    <p>
      <span id="colorOption_2" tabindex="-1" role="radio" aria-checked="false" aria-labelledby="magenta"></span>
      <span id="magenta">Magenta</span>
    </p>
    <p>
      <span id="colorOption_3" tabindex="-1" role="radio" aria-checked="false" aria-labelledby="all"></span>
      <span id="all">All of the above</span>
    </p>
  </div>
</div>
```

### ii. Code: Semantic HTML

```html
<fieldset>
  <legend>Which is the best color?</legend>
  <p>
    <input name="colorOption" type="radio" id="purple" />
    <label for="purple">Purple</label>
  </p>
  <p>
    <input name="colorOption" type="radio" id="aubergine" />
    <label for="aubergine">Aubergine</label>
  </p>
  <p>
    <input name="colorOption" type="radio" id="magenta" />
    <label for="magenta">Magenta</label>
  </p>
  <p>
    <input name="colorOption" type="radio" id="all" />
    <label for="all">All of the above</label>
  </p>
</fieldset>
```

### Keyboard functionality

| Key             | Function                            |
| --------------- | ----------------------------------- |
| `tab`           | Moves keyboard focus to radiogroup. |
| `←` `→` `↑` `↓` | Moves up and down radio options.    |

[scroll to top](#composite-roles)

## 7. tablist

The `tablist` role identifies the element that serves as the container for a set of `tabs`. The tab content are referred to as `tabpanel` elements.

Each `tab` in a `tablist` serves as a label for one `tabpanel` and can be activated to display that panel. The `tablist` is the containing element for the set of tab elements contained.

### Demo

<ul role="tablist">
  <li class="active" role="tab" aria-selected="true" aria-setsize="3" aria-posinset="1" tabindex="0">Active panel tab</li>
  <li role="tab" aria-selected="false" aria-setsize="3" aria-posinset="2" tabindex="0">Panel 2 tab</li>
  <li role="tab" aria-selected="false" aria-setsize="3" aria-posinset="3" tabindex="0">Panel 3 tab</li>
</ul>
<div class="panels">
  <article class="active-panel" role="tabpanel" aria-hidden="false">
  ..Active panel content..
  </article>
  <article role="tabpanel" aria-hidden="true">
  ..Panel #2 content..
  </article>
  <article role="tabpanel" aria-hidden="true">
  ..Panel #3 content..
  </article>
</div>

### Code

```html
<!-- tablist > tab roles -->
<ul role="tablist">
  <li class="active" role="tab" aria-selected="true" aria-setsize="3" aria-posinset="1" tabindex="0">
    Active panel tab
  </li>
  <li role="tab" aria-selected="false" aria-setsize="3" aria-posinset="2" tabindex="0">Panel 2 tab</li>
  <li role="tab" aria-selected="false" aria-setsize="3" aria-posinset="3" tabindex="0">Panel 3 tab</li>
</ul>
<!-- Tabpanel roles -->
<div class="panels">
  <article class="active-panel" role="tabpanel" aria-hidden="false">..Active panel content..</article>
  <article role="tabpanel" aria-hidden="true">..Panel #2 content..</article>
  <article role="tabpanel" aria-hidden="true">..Panel #3 content..</article>
</div>
```

### Keyboard functionality

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

[scroll to top](#composite-roles)

## 8. tree

A `tree` is a widget that allows the user to select one or more items from a hierarchically organized collection. Any item in the hierarchy may have child tree items, `treeitem`. Tree items can be expanded or collapsed, showing and hiding their children.

### Screenshot

![tree example screenshot](https://user-images.githubusercontent.com/5023024/163067614-0c5cc400-28ac-4ff0-bf19-9318b28f79f4.png)

### Code

```html
<ul role="tree">
  <li role="presentation">
    <a role="treeitem" aria-expanded="true">An expanded tree node</a>
  </li>
  …
</ul>
```

### Keyboard functionality

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

[scroll to top](#composite-roles)

## 9. treegrid

The `treegrid` role identifies an element as being grid whose rows can be expanded and collapsed in the same manner as for a tree.

It is important for all cells to be able to receive or contain keyboard focus because screen readers are generally in application reading mode, rather than their document reading mode, when users are interacting with the grid. While in application mode, a screen reader user hears only focusable elements and content that labels focusable elements. If content can't receive focus, screen reader users may unknowingly overlook elements contained in the `treegrid`.

### Screenshot

![screenshot of treegrid](https://user-images.githubusercontent.com/5023024/163043189-a2dde80c-f37d-4366-93e9-7256f4b1f318.png)

#### Code

```html
<table id="treegrid" role="treegrid" aria-label="Inbox">
  <colgroup>
    <col id="treegrid-col1" />
    <col id="treegrid-col2" />
    <col id="treegrid-col3" />
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Subject</th>
      <th scope="col">Summary</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row" aria-level="1" aria-posinset="1" aria-setsize="1" aria-expanded="true">
      <td role="gridcell">Treegrids are awesome</td>
      <td role="gridcell">Want to learn how to use them?</td>
      <td role="gridcell"><a href="mailto:aaron@thegoogle.rocks">aaron@thegoogle.rocks</a></td>
    </tr>
    <tr role="row" aria-level="2" aria-posinset="1" aria-setsize="3">
      <td role="gridcell">re: Treegrids are awesome</td>
      <td role="gridcell">I agree with you, they are the shizzle</td>
      <td role="gridcell"><a href="mailto:joe@blahblahblah.blahblah">joe@blahblahblah.blahblah</a></td>
    </tr>
    <tr role="row" aria-level="2" aria-posinset="2" aria-setsize="3" aria-expanded="false">
      <td role="gridcell">re: Treegrids are awesome</td>
      <td role="gridcell">They are great for showing a lot of data, like a grid</td>
      <td role="gridcell"><a href="mailto:billy@dangerous.fish">billy@dangerous.fish</a></td>
    </tr>
    <tr role="row" aria-level="3" aria-posinset="1" aria-setsize="1" class="hidden">
      <td role="gridcell">re: Treegrids are awesome</td>
      <td role="gridcell">Cool, we've been needing an example and documentation</td>
      <td role="gridcell"><a href="mailto:doris@rufflazydogs.sleep">doris@rufflazydogs.sleep</a></td>
    </tr>
    <tr role="row" aria-level="2" aria-posinset="3" aria-setsize="3" aria-expanded="false">
      <td role="gridcell">re: Treegrids are awesome</td>
      <td role="gridcell">I hear the Fancytree library is going to align with this example!</td>
      <td role="gridcell"><a href="mailto:someone@please-do-it.company">someone@please-do-it.company</a></td>
    </tr>
    <tr role="row" aria-level="3" aria-posinset="1" aria-setsize="1" aria-expanded="false" class="hidden">
      <td role="gridcell">re: Treegrids are awesome</td>
      <td role="gridcell">Sometimes they are more like trees, others are more like grids</td>
      <td role="gridcell"><a href="mailto:mari@beingpractical.com">mari@beingpractical.com</a></td>
    </tr>
    <tr role="row" aria-level="4" aria-posinset="1" aria-setsize="2" class="hidden">
      <td role="gridcell">re: Treegrids are awesome</td>
      <td role="gridcell">Cool, when it's a tree, let's keep left/right to collapse/expand</td>
      <td role="gridcell"><a href="mailto:issie@imadeadcatsadly.wascute">issie@imadeadcatsadly.wascute</a></td>
    </tr>
    <tr role="row" aria-level="4" aria-posinset="2" aria-setsize="2" class="hidden">
      <td role="gridcell">re: Treegrids are awesome</td>
      <td role="gridcell">I see, sometimes right arrow moves by column</td>
      <td role="gridcell"><a href="mailto:kitten@kittenseason.future">kitten@kittenseason.future</a></td>
    </tr>
  </tbody>
</table>
```

### Keyboard functionality

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

[scroll to top](#composite-roles)
