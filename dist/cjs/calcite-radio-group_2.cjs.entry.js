'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-67746296.js');
const dom = require('./dom-801460f3.js');

const navigationKeys = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
    space: " "
};
const CalciteRadioGroup = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** The component's theme. */
        this.theme = "light";
        /** The scale of the button */
        this.scale = "m";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.hiddenInput = (() => {
            const input = document.createElement("input");
            input.type = "hidden";
            this.el.appendChild(input);
            return input;
        })();
        this.calciteRadioGroupChange = core.createEvent(this, "calciteRadioGroupChange", 7);
    }
    handleNameChange(value) {
        this.hiddenInput.name = value;
    }
    handleSelectedItemChange(newItem, oldItem) {
        if (newItem === oldItem) {
            return;
        }
        const items = this.getItems();
        const match = Array.from(items)
            .filter(item => item === newItem)
            .pop();
        if (match) {
            this.selectItem(match);
            this.calciteRadioGroupChange.emit();
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let theme = ["dark", "light"];
        if (!theme.includes(this.theme))
            this.theme = "light";
        const items = this.getItems();
        let lastChecked = Array.from(items)
            .filter(item => item.checked)
            .pop();
        if (lastChecked) {
            this.selectItem(lastChecked);
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
        const { hiddenInput, name } = this;
        if (name) {
            hiddenInput.name = name;
        }
        if (lastChecked) {
            hiddenInput.value = lastChecked.value;
        }
    }
    componentDidLoad() {
        this.hasLoaded = true;
    }
    render() {
        return (core.h(core.Host, { role: "radiogroup" }, core.h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleClick(event) {
        if (event.target.localName === "calcite-radio-group-item") {
            this.selectItem(event.target);
        }
    }
    handleSelected(event) {
        // only fire after initial setup to prevent semi-infinite loops
        if (this.hasLoaded) {
            event.stopPropagation();
            event.preventDefault();
            this.selectItem(event.target);
        }
    }
    handleKeyDown(event) {
        const { key } = event;
        if (Object.values(navigationKeys).indexOf(key) === -1) {
            return;
        }
        event.preventDefault();
        const { el, selectedItem } = this;
        const dir = dom.getElementDir(el);
        const moveBackwardKey = (dir === "rtl"
            ? key === navigationKeys.right
            : key === navigationKeys.left) || key === navigationKeys.up;
        const items = this.getItems();
        let selectedIndex = -1;
        items.forEach((item, index) => {
            if (item === selectedItem) {
                selectedIndex = index;
            }
        });
        if (moveBackwardKey) {
            const previous = selectedIndex === -1 || selectedIndex === 0
                ? items.item(items.length - 1)
                : items.item(selectedIndex - 1);
            this.selectItem(previous);
            return;
        }
        const moveForwardKey = (dir === "rtl"
            ? key === navigationKeys.left
            : key === navigationKeys.right) || key === navigationKeys.down;
        if (moveForwardKey) {
            const next = selectedIndex === -1
                ? items.item(1)
                : items.item(selectedIndex + 1) || items.item(0);
            this.selectItem(next);
            return;
        }
        if (key === navigationKeys.space) {
            this.selectItem(event.target);
            return;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getItems() {
        return this.el.querySelectorAll("calcite-radio-group-item");
    }
    selectItem(selected) {
        if (selected === this.selectedItem) {
            return;
        }
        const items = this.getItems();
        let match = null;
        items.forEach(item => {
            const matches = item.value === selected.value;
            if ((matches && !item.checked) || (!matches && item.checked)) {
                item.checked = matches;
            }
            item.tabIndex = matches ? 0 : -1;
            if (matches) {
                match = item;
            }
        });
        this.selectedItem = match;
        this.syncWithInputProxy(match);
        if ( match) {
            match.focus();
        }
    }
    syncWithInputProxy(item) {
        this.hiddenInput.value = item ? item.value : "";
    }
    get el() { return core.getElement(this); }
    static get watchers() { return {
        "name": ["handleNameChange"],
        "selectedItem": ["handleSelectedItemChange"]
    }; }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{display:-ms-flexbox;display:flex;--calcite-radio-group-text-color-active:#fff;--calcite-radio-group-padding:0.5rem 1rem}:host([scale=s]){--calcite-radio-group-padding:0.25rem 0.75rem}:host([scale=m]){--calcite-radio-group-padding:0.4rem 1rem}:host([scale=l]){--calcite-radio-group-padding:0.5rem 1.5rem}:host([theme=dark]){--calcite-radio-group-text-color-active:#0b0b0b}::slotted(calcite-radio-group-item:focus),::slotted(calcite-radio-group-item[checked]){z-index:0}"; }
};

const CalciteRadioGroupItem = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Indicates whether the control is checked.
         */
        this.checked = false;
        this.mutationObserver = this.getMutationObserver();
        this.calciteRadioGroupItemChange = core.createEvent(this, "calciteRadioGroupItemChange", 7);
    }
    handleCheckedChange() {
        this.calciteRadioGroupItemChange.emit();
        this.syncToExternalInput();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        let inputProxy = this.el.querySelector(`input[slot="input"]`);
        if (inputProxy) {
            this.value = inputProxy.value;
            this.checked = inputProxy.checked;
            {
                this.mutationObserver.observe(inputProxy, { attributes: true });
            }
        }
        this.inputProxy = inputProxy;
    }
    disconnectedCallback() {
        this.mutationObserver.disconnect();
    }
    render() {
        const { checked, value } = this;
        const scale = dom.getElementProp(this.el, "scale", "m");
        return (core.h(core.Host, { role: "radio", "aria-checked": checked.toString(), scale: scale }, core.h("label", null, core.h("slot", null, value), core.h("slot", { name: "input" }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getMutationObserver() {
        return (            new MutationObserver(() => this.syncFromExternalInput()));
    }
    syncFromExternalInput() {
        if (this.inputProxy) {
            this.value = this.inputProxy.value;
            this.checked = this.inputProxy.checked;
        }
    }
    syncToExternalInput() {
        if (!this.inputProxy) {
            return;
        }
        this.inputProxy.value = this.value;
        this.inputProxy.toggleAttribute("checked", this.checked);
    }
    get el() { return core.getElement(this); }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{display:-ms-flexbox;display:flex;background-color:var(--calcite-ui-foreground);color:var(--calcite-ui-text-3);padding:var(--calcite-radio-group-padding);line-height:1.25;margin:.25rem -1px 0 0;border:1px solid var(--calcite-ui-border-1);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:background .1s ease-in-out,border-color .1s ease-in-out;transition:background .1s ease-in-out,border-color .1s ease-in-out;cursor:pointer}:host([scale=s]){font-size:.8125rem;line-height:1.5}:host([scale=m]){font-size:.9375rem;line-height:1.5}:host([scale=l]){font-size:1rem;line-height:1.5}:host(:hover){background-color:var(--calcite-ui-foreground-hover)}:host(:active){background-color:var(--calcite-ui-foreground-press)}:host([checked]){background-color:var(--calcite-ui-blue);border-color:var(--calcite-ui-blue);color:var(--calcite-radio-group-text-color-active);cursor:default}label{pointer-events:none}::slotted(input){display:none}"; }
};

exports.calcite_radio_group = CalciteRadioGroup;
exports.calcite_radio_group_item = CalciteRadioGroupItem;
