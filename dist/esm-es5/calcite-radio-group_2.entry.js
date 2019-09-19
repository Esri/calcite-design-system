import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-26bd2899.js';
import { g as getElementDir, b as getElementProp } from './dom-73b84262.js';
var navigationKeys = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
    space: " "
};
var CalciteRadioGroup = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        /** The component's theme. */
        this.theme = "light";
        /** The scale of the button */
        this.scale = "m";
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
    class_1.prototype.handleNameChange = function (value) {
        this.hiddenInput.name = value;
    };
    class_1.prototype.handleSelectedItemChange = function (newItem, oldItem) {
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
    class_1.prototype.connectedCallback = function () {
        // prop validations
        var scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        var theme = ["dark", "light"];
        if (!theme.includes(this.theme))
            this.theme = "light";
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
    class_1.prototype.render = function () {
        return (h(Host, { role: "radiogroup" }, h("slot", null)));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    class_1.prototype.handleClick = function (event) {
        if (event.target.localName === "calcite-radio-group-item") {
            this.selectItem(event.target);
        }
    };
    class_1.prototype.handleSelected = function (event) {
        event.stopPropagation();
        event.preventDefault();
        this.selectItem(event.target);
    };
    class_1.prototype.handleKeyDown = function (event) {
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
    class_1.prototype.getItems = function () {
        return this.el.querySelectorAll("calcite-radio-group-item");
    };
    class_1.prototype.selectItem = function (selected) {
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
    class_1.prototype.syncWithInputProxy = function (item) {
        this.hiddenInput.value = item ? item.value : "";
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "name": ["handleNameChange"],
                "selectedItem": ["handleSelectedItemChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{display:-ms-flexbox;display:flex;--calcite-radio-group-color:#fff;--calcite-radio-group-border-color:#d4d4d4;--calcite-radio-group-color-active:#007ac2;--calcite-radio-group-text-color:#000;--calcite-radio-group-text-color-active:#fff;--calcite-radio-group-color-hover:#f8f8f8;--calcite-radio-group-padding:0.5rem 1rem}:host([scale=s]){--calcite-radio-group-padding:0.25rem 0.75rem}:host([scale=m]){--calcite-radio-group-padding:0.4rem 1rem}:host([scale=l]){--calcite-radio-group-padding:0.5rem 1.5rem}:host([theme=dark]){--calcite-radio-group-color:#2b2b2b;--calcite-radio-group-border-color:#353535;--calcite-radio-group-color-active:#009af2;--calcite-radio-group-text-color:#fff;--calcite-radio-group-text-color-active:#fff;--calcite-radio-group-color-hover:#353535}::slotted(calcite-radio-group-item:focus),::slotted(calcite-radio-group-item[checked]){z-index:0}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
var CalciteRadioGroupItem = /** @class */ (function () {
    function class_2(hostRef) {
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
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.hasLabel = false;
        this.mutationObserver = new MutationObserver(function () { return _this.syncFromExternalInput(); });
        this.calciteRadioGroupItemChange = createEvent(this, "calciteRadioGroupItemChange", 7);
    }
    class_2.prototype.handleCheckedChange = function () {
        this.calciteRadioGroupItemChange.emit();
        this.syncToExternalInput();
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_2.prototype.connectedCallback = function () {
        var inputProxy = this.el.querySelector("input[slot=\"input\"]");
        if (inputProxy) {
            this.value = inputProxy.value;
            this.checked = inputProxy.checked;
            this.mutationObserver.observe(inputProxy, { attributes: true });
        }
        this.inputProxy = inputProxy;
        var futureSlotted = Array.from(this.el.childNodes);
        this.hasLabel = futureSlotted.some(function (child) { return child.nodeType === Node.TEXT_NODE; });
    };
    class_2.prototype.disconnectedCallback = function () {
        this.mutationObserver.disconnect();
    };
    class_2.prototype.render = function () {
        var _a = this, checked = _a.checked, value = _a.value;
        var scale = getElementProp(this.el, "scale", "m");
        return (h(Host, { role: "radio", "aria-checked": checked ? "true" : "false", scale: scale }, h("label", null, this.hasLabel ? h("slot", null) : value, h("slot", { name: "input" }))));
    };
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    class_2.prototype.syncFromExternalInput = function () {
        if (this.inputProxy) {
            this.value = this.inputProxy.value;
            this.checked = this.inputProxy.checked;
        }
    };
    class_2.prototype.syncToExternalInput = function () {
        if (!this.inputProxy) {
            return;
        }
        this.inputProxy.value = this.value;
        this.inputProxy.toggleAttribute("checked", this.checked);
    };
    Object.defineProperty(class_2.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_2, "watchers", {
        get: function () {
            return {
                "checked": ["handleCheckedChange"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_2, "style", {
        get: function () { return ":host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{display:-ms-flexbox;display:flex;background-color:var(--calcite-radio-group-color);color:var(--calcite-radio-group-text-color);padding:var(--calcite-radio-group-padding);line-height:1.25;margin:.25rem -1px 0 0;border:1px solid var(--calcite-radio-group-border-color);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:background .1s ease-in-out,border-color .1s ease-in-out;transition:background .1s ease-in-out,border-color .1s ease-in-out;cursor:pointer}:host([scale=s]){font-size:.8125rem;line-height:1.5}:host([scale=m]){font-size:.9375rem;line-height:1.5}:host([scale=l]){font-size:1rem;line-height:1.5}:host(:hover){background-color:var(--calcite-radio-group-color-hover)}:host([checked]){background-color:var(--calcite-radio-group-color-active);border-color:var(--calcite-radio-group-color-active);color:var(--calcite-radio-group-text-color-active);cursor:default}label{cursor:pointer}::slotted(input){display:none}"; },
        enumerable: true,
        configurable: true
    });
    return class_2;
}());
export { CalciteRadioGroup as calcite_radio_group, CalciteRadioGroupItem as calcite_radio_group_item };
