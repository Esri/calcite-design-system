import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { a as getElementProp, h as hasLabel, g as getElementDir } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';

const calciteRadioGroupCss = ":host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;margin-top:0.25rem}:host([layout=vertical]){-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:start;-ms-flex-item-align:start;align-self:flex-start}:host([width=auto]){width:auto}:host([width=full]){width:100%;display:-ms-flexbox;display:flex}:host([width=full]) ::slotted(calcite-radio-group-item){-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-pack:center;justify-content:center}:host([width=full][layout=vertical]) ::slotted(calcite-radio-group-item){-ms-flex-pack:start;justify-content:start}::slotted(calcite-radio-group-item[checked]),::slotted(calcite-radio-group-item:focus){z-index:0}";

const CalciteRadioGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteRadioGroupChange = createEvent(this, "calciteRadioGroupChange", 7);
        /** specify the appearance style of the radio group, defaults to solid. */
        this.appearance = "solid";
        /** specify the layout of the radio group, defaults to horizontal */
        this.layout = "horizontal";
        /** specify the width of the group, defaults to auto */
        this.width = "auto";
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
            .filter((item) => item === newItem)
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
            this.scale = getElementProp(this.el.parentElement, "scale", "m");
        let appearance = ["solid", "outline"];
        if (!appearance.includes(this.appearance))
            this.appearance = "solid";
        let layout = ["horizontal", "vertical"];
        if (!layout.includes(this.layout))
            this.layout = "horizontal";
        let width = ["auto", "full"];
        if (!width.includes(this.width))
            this.width = "auto";
        const items = this.getItems();
        let lastChecked = Array.from(items)
            .filter((item) => item.checked)
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
        return (h(Host, { role: "radiogroup" }, h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleLabelFocus(e) {
        if (hasLabel(e.detail.labelEl, this.el)) {
            this.setFocus();
        }
    }
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
        const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
        const key = getKey(event.key);
        const { el, selectedItem } = this;
        if (keys.indexOf(key) === -1) {
            return;
        }
        let adjustedKey = key;
        if (getElementDir(el) === "rtl") {
            if (key === "ArrowRight") {
                adjustedKey = "ArrowLeft";
            }
            if (key === "ArrowLeft") {
                adjustedKey = "ArrowRight";
            }
        }
        const items = this.getItems();
        let selectedIndex = -1;
        items.forEach((item, index) => {
            if (item === selectedItem) {
                selectedIndex = index;
            }
        });
        switch (adjustedKey) {
            case "ArrowLeft":
            case "ArrowUp":
                event.preventDefault();
                const previous = selectedIndex < 1
                    ? items.item(items.length - 1)
                    : items.item(selectedIndex - 1);
                this.selectItem(previous);
                return;
            case "ArrowRight":
            case "ArrowDown":
                event.preventDefault();
                const next = selectedIndex === -1
                    ? items.item(1)
                    : items.item(selectedIndex + 1) || items.item(0);
                this.selectItem(next);
                return;
            case " ":
                event.preventDefault();
                this.selectItem(event.target);
                return;
            default:
                return;
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Focuses the selected item. If there is no selection, it focuses the first item. */
    async setFocus() {
        var _a;
        (_a = (this.selectedItem || this.getItems()[0])) === null || _a === void 0 ? void 0 : _a.focus();
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
        items.forEach((item) => {
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "name": ["handleNameChange"],
        "selectedItem": ["handleSelectedItemChange"]
    }; }
};
CalciteRadioGroup.style = calciteRadioGroupCss;

const calciteRadioGroupItemCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:-ms-flexbox;display:flex;-ms-flex-item-align:stretch;align-self:stretch;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-3);cursor:pointer;line-height:1.25;margin:0 -1px 0 0;border:1px solid var(--calcite-ui-border-1);-webkit-box-shadow:inset 0 0 0 1px transparent;box-shadow:inset 0 0 0 1px transparent;-webkit-box-sizing:border-box;box-sizing:border-box;font-weight:400;-webkit-transition:background 0.1s ease-in-out, border-color 0.1s ease-in-out;transition:background 0.1s ease-in-out, border-color 0.1s ease-in-out;cursor:pointer}:host([layout=vertical]){margin:0 0 -1px 0}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}:host([scale=s]){font-size:0.8125rem;line-height:1.5;padding:0.25rem 0.75rem}:host([scale=m]){font-size:0.9375rem;line-height:1.5;padding:0.4rem 1rem}:host([scale=l]){font-size:1rem;line-height:1.5;padding:0.5rem 1.5rem}:host(:hover){background-color:var(--calcite-ui-foreground-2)}:host(:active){background-color:var(--calcite-ui-foreground-3)}:host([checked]){background-color:var(--calcite-ui-blue-1);border-color:var(--calcite-ui-blue-1);color:var(--calcite-ui-background);cursor:default}:host([appearance=outline][checked]){background-color:var(--calcite-ui-foreground-1);border-color:var(--calcite-ui-blue-1);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-blue-1);color:var(--calcite-ui-blue-1)}label{pointer-events:none;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}::slotted(input){display:none}.radio-group-item-icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin:0;line-height:inherit;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out}:host([icon-position=start]) .radio-group-item-icon{margin-right:0.5rem}:host([icon-position=start][dir=rtl]) .radio-group-item-icon{margin-right:0;margin-left:0.5rem}:host([icon-position=end]) .radio-group-item-icon{margin-left:0.5rem}:host([icon-position=end][dir=rtl]) .radio-group-item-icon{margin-left:0;margin-right:0.5rem}";

const CalciteRadioGroupItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteRadioGroupItemChange = createEvent(this, "calciteRadioGroupItemChange", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** Indicates whether the control is checked. */
        this.checked = false;
        /** optionally used with icon, select where to position the icon */
        this.iconPosition = "start";
        this.mutationObserver = this.getMutationObserver();
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
        // prop validations
        let iconPosition = ["start", "end"];
        if (this.icon !== null && !iconPosition.includes(this.iconPosition))
            this.iconPosition = "start";
    }
    disconnectedCallback() {
        this.mutationObserver.disconnect();
    }
    componentWillLoad() {
        // only use default slot content in browsers that support shadow dom
        // or if ie11 has no label provided (#374)
        const label = this.el.querySelector("label");
        this.useFallback = !label || label.textContent === "";
    }
    render() {
        const { checked, useFallback, value } = this;
        const scale = getElementProp(this.el, "scale", "m");
        const appearance = getElementProp(this.el, "appearance", "m");
        const layout = getElementProp(this.el, "layout", "m");
        const iconEl = (h("calcite-icon", { class: "radio-group-item-icon", icon: this.icon, scale: "s" }));
        return (h(Host, { role: "radio", "aria-checked": checked.toString(), scale: scale, appearance: appearance, layout: layout }, h("label", null, this.icon && this.iconPosition === "start" ? iconEl : null, h("slot", null, useFallback ? value : ""), h("slot", { name: "input" }), this.icon && this.iconPosition === "end" ? iconEl : null)));
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
        if (this.checked) {
            this.inputProxy.setAttribute("checked", "true");
        }
        else {
            this.inputProxy.removeAttribute("checked");
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
};
CalciteRadioGroupItem.style = calciteRadioGroupItemCss;

export { CalciteRadioGroup as calcite_radio_group, CalciteRadioGroupItem as calcite_radio_group_item };
