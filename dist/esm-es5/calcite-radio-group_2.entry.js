import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './chunk-5f99f9d5.js';
import { g as getElementDir } from './chunk-6bb56f1f.js';
var navigationKeys = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
    space: " "
};
var CalciteRadioGroup = /** @class */ (function () {
    function CalciteRadioGroup(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        /**
         * The component's theme.
         */
        this.theme = "light";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.hiddenInput = (function () {
            var input = document.createElement("input");
            input.type = "hidden";
            _this.el.appendChild(input);
            return input;
        })();
        this.calciteRadioGroupChange = createEvent(this, "calciteRadioGroupChange", 7);
    }
    CalciteRadioGroup.prototype.handleNameChange = function (value) {
        this.hiddenInput.name = value;
    };
    CalciteRadioGroup.prototype.handleSelectedItemChange = function (newItem, oldItem) {
        if (newItem === oldItem) {
            return;
        }
        var match;
        var items = this.getItems();
        items.forEach(function (item) {
            var matches = item === newItem;
            if (matches) {
                match = item;
            }
        });
        if (match) {
            this.selectItem(match);
            this.calciteRadioGroupChange.emit();
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteRadioGroup.prototype.connectedCallback = function () {
        var items = this.getItems();
        var lastChecked;
        items.forEach(function (item, index) {
            item.tabIndex = -1;
            var next = items[index + 1];
            if (item.checked) {
                lastChecked = item;
            }
            if (next && next.checked && item.checked) {
                item.checked = false;
            }
        });
        if (lastChecked) {
            this.selectItem(lastChecked);
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
        var hiddenInput = this.hiddenInput;
        if (this.name) {
            hiddenInput.name = this.name;
        }
        if (lastChecked) {
            hiddenInput.value = lastChecked.value;
        }
    };
    CalciteRadioGroup.prototype.render = function () {
        return (h(Host, { role: "radiogroup" }, h("slot", null)));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    CalciteRadioGroup.prototype.handleClick = function (event) {
        if (event.target.localName === "calcite-radio-group-item") {
            this.selectItem(event.target);
        }
    };
    CalciteRadioGroup.prototype.handleSelected = function (event) {
        event.stopPropagation();
        event.preventDefault();
        this.selectItem(event.target);
    };
    CalciteRadioGroup.prototype.handleKeyDown = function (event) {
        var key = event.key;
        if (Object.values(navigationKeys).indexOf(key) === -1) {
            return;
        }
        event.preventDefault();
        var _a = this, el = _a.el, selectedItem = _a.selectedItem;
        var dir = getElementDir(el);
        var moveBackwardKey = (dir === "rtl"
            ? key === navigationKeys.right
            : key === navigationKeys.left) || key === navigationKeys.up;
        var items = this.getItems();
        var selectedIndex = -1;
        items.forEach(function (item, index) {
            if (item === selectedItem) {
                selectedIndex = index;
            }
        });
        if (moveBackwardKey) {
            var previous = selectedIndex === -1 || selectedIndex === 0
                ? items.item(items.length - 1)
                : items.item(selectedIndex - 1);
            this.selectItem(previous);
            return;
        }
        var moveForwardKey = (dir === "rtl"
            ? key === navigationKeys.left
            : key === navigationKeys.right) || key === navigationKeys.down;
        if (moveForwardKey) {
            var next = selectedIndex === -1
                ? items.item(1)
                : items.item(selectedIndex + 1) || items.item(0);
            this.selectItem(next);
            return;
        }
        if (key === navigationKeys.space) {
            this.selectItem(event.target);
            return;
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    CalciteRadioGroup.prototype.getItems = function () {
        return this.el.querySelectorAll("calcite-radio-group-item");
    };
    CalciteRadioGroup.prototype.selectItem = function (selected) {
        if (selected === this.selectedItem) {
            return;
        }
        var items = this.getItems();
        var match = null;
        items.forEach(function (item) {
            var matches = item.value === selected.value;
            item.checked = matches;
            item.tabIndex = matches ? 0 : -1;
            if (matches) {
                match = item;
            }
        });
        this.selectedItem = match;
        this.syncWithInputProxy(match);
        match && match.focus();
    };
    CalciteRadioGroup.prototype.syncWithInputProxy = function (item) {
        this.hiddenInput.value = item ? item.value : "";
    };
    Object.defineProperty(CalciteRadioGroup.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteRadioGroup, "watchers", {
        get: function () {
            return {
                "name": ["handleNameChange"],
                "selectedItem": ["handleSelectedItemChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteRadioGroup, "style", {
        get: function () { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}:host,calcite-tabs{display:block}:host{--calcite-radio-group-color:#fff;--calcite-radio-group-border-color:#757575;--calcite-radio-group-color-active:#007ac2;--calcite-radio-group-text-color:#000;--calcite-radio-group-text-color-active:#fff;--calcite-radio-group-color-hover:#f8f8f8;font-size:.9375rem;line-height:1.5}:host([theme=dark]){--calcite-radio-group-color:#2b2b2b;--calcite-radio-group-border-color:#202020;--calcite-radio-group-color-active:#009af2;--calcite-radio-group-text-color:#fff;--calcite-radio-group-text-color-active:#fff;--calcite-radio-group-color-hover:#353535}::slotted(calcite-radio-group-item:focus),::slotted(calcite-radio-group-item[checked]){z-index:0}slot{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row}"; },
        enumerable: true,
        configurable: true
    });
    return CalciteRadioGroup;
}());
var CalciteRadioGroupItem = /** @class */ (function () {
    function CalciteRadioGroupItem(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Indicates whether the control is checked.
         */
        this.checked = false;
        this.mutationObserver = new MutationObserver(function () { return _this.syncFromExternalInput(); });
        this.calciteRadioGroupItemChange = createEvent(this, "calciteRadioGroupItemChange", 7);
    }
    CalciteRadioGroupItem.prototype.handleCheckedChange = function () {
        this.calciteRadioGroupItemChange.emit();
        this.syncToExternalInput();
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteRadioGroupItem.prototype.connectedCallback = function () {
        var inputProxy = this.el.querySelector("input[slot=\"input\"]");
        if (inputProxy) {
            this.value = inputProxy.value;
            this.checked = inputProxy.checked;
            this.mutationObserver.observe(inputProxy, { attributes: true });
        }
        this.inputProxy = inputProxy;
    };
    CalciteRadioGroupItem.prototype.disconnectedCallback = function () {
        this.mutationObserver.disconnect();
    };
    CalciteRadioGroupItem.prototype.render = function () {
        var _a = this, checked = _a.checked, value = _a.value;
        return (h(Host, { role: "radio", "aria-checked": checked ? "true" : "false" }, h("label", null, h("slot", null, value), h("slot", { name: "input" }))));
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    CalciteRadioGroupItem.prototype.syncFromExternalInput = function () {
        if (this.inputProxy) {
            this.value = this.inputProxy.value;
            this.checked = this.inputProxy.checked;
        }
    };
    ;
    CalciteRadioGroupItem.prototype.syncToExternalInput = function () {
        if (!this.inputProxy) {
            return;
        }
        this.inputProxy.value = this.value;
        this.inputProxy.toggleAttribute("checked", this.checked);
    };
    Object.defineProperty(CalciteRadioGroupItem.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteRadioGroupItem, "watchers", {
        get: function () {
            return {
                "checked": ["handleCheckedChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteRadioGroupItem, "style", {
        get: function () { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tabs{display:block}:host{display:-ms-flexbox;display:flex;background-color:var(--calcite-radio-group-color);color:var(--calcite-radio-group-text-color);padding:.5rem 1rem;line-height:1.25;margin:.25rem -1px 0 0;border:1px solid var(--calcite-radio-group-border-color);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:background .1s ease-in-out,border-color .1s ease-in-out;transition:background .1s ease-in-out,border-color .1s ease-in-out;cursor:pointer}:host(:hover){background-color:var(--calcite-radio-group-color-hover)}:host([checked]){background-color:var(--calcite-radio-group-color-active);border-color:var(--calcite-radio-group-color-active);color:var(--calcite-radio-group-text-color-active);cursor:default}label{cursor:pointer}::slotted(input){display:none}"; },
        enumerable: true,
        configurable: true
    });
    return CalciteRadioGroupItem;
}());
export { CalciteRadioGroup as calcite_radio_group, CalciteRadioGroupItem as calcite_radio_group_item };
