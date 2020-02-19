import { h, Host, Build } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
const navigationKeys = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
    space: " "
};
export class CalciteRadioGroup {
    constructor() {
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
        return (h(Host, { role: "radiogroup" },
            h("slot", null)));
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
        const dir = getElementDir(el);
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
        if (Build.isBrowser && match) {
            match.focus();
        }
    }
    syncWithInputProxy(item) {
        this.hiddenInput.value = item ? item.value : "";
    }
    static get is() { return "calcite-radio-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-radio-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-radio-group.css"]
    }; }
    static get properties() { return {
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The group's name. Gets submitted with the form."
            },
            "attribute": "name",
            "reflect": false
        },
        "selectedItem": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLCalciteRadioGroupItemElement",
                "resolved": "HTMLCalciteRadioGroupItemElement",
                "references": {
                    "HTMLCalciteRadioGroupItemElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The group's selected item."
            }
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"light\" | \"dark\"",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The component's theme."
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
        },
        "scale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"s\" | \"m\" | \"l\"",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The scale of the button"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        }
    }; }
    static get events() { return [{
            "method": "calciteRadioGroupChange",
            "name": "calciteRadioGroupChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "name",
            "methodName": "handleNameChange"
        }, {
            "propName": "selectedItem",
            "methodName": "handleSelectedItemChange"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "handleClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteRadioGroupItemChange",
            "method": "handleSelected",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleKeyDown",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
