'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8fc102d1.js');
const guid = require('./guid-0a2e4f7f.js');

const calciteRadioButtonCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{display:grid;grid-gap:8px;-ms-flex-align:center;align-items:center;cursor:pointer;--calcite-label-margin-bottom:0}:host .radio{border-radius:100%;-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1);cursor:pointer;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out}:host(:hover) .radio{-webkit-box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 2px var(--calcite-ui-blue-1)}:host([disabled]){cursor:default;opacity:0.4}:host([disabled]) .radio,:host([disabled]) label{cursor:default}:host(:hover[disabled]) .radio{-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-1)}:host([scale=s]){grid-template-columns:12px 1fr 4px;grid-template-rows:16px 1fr}:host([scale=s]) .radio{height:12px;min-width:12px;max-width:12px}:host([scale=s][checked]) .radio,:host(:hover[scale=s][checked][disabled]) .radio{-webkit-box-shadow:inset 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 4px var(--calcite-ui-blue-1)}:host([scale=s][focused]) .radio{-webkit-box-shadow:inset 0 0 0 4px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 4px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1)}:host([scale=m]){grid-template-columns:16px 1fr 4px;grid-template-rows:20px 1fr}:host([scale=m]) .radio{height:16px;min-width:16px;max-width:16px}:host([scale=m][checked]) .radio,:host(:hover[scale=m][checked][disabled]) .radio{-webkit-box-shadow:inset 0 0 0 5px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 5px var(--calcite-ui-blue-1)}:host([scale=m][focused]) .radio{-webkit-box-shadow:inset 0 0 0 5px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 5px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1)}:host([scale=l]){grid-gap:12px;grid-template-columns:20px 1fr 4px;grid-template-rows:24px 1fr}:host([scale=l]) .radio{height:20px;min-width:20px;max-width:20px}:host([scale=l][checked]) .radio,:host(:hover[scale=l][checked][disabled]) .radio{-webkit-box-shadow:inset 0 0 0 6px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 6px var(--calcite-ui-blue-1)}:host([scale=l][focused]) .radio{-webkit-box-shadow:inset 0 0 0 6px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1);box-shadow:inset 0 0 0 6px var(--calcite-ui-blue-1), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-blue-1)}";

const CalciteRadioButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** The checked state of the radio button. */
        this.checked = false;
        /** The disabled state of the radio button. */
        this.disabled = false;
        /** The focused state of the radio button. */
        this.focused = false;
        /** The id attribute of the radio button.  When omitted, a globally unique identifier is used. */
        this.guid = this.el.id || `calcite-radio-button-${guid.guid()}`;
        /** The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable. */
        this.hidden = false;
        /** Requires that a value is selected for the radio button group before the parent form will submit. */
        this.required = false;
        /** The scale (size) of the radio button.  <code>scale</code> is passed as a property automatically from <code><calcite-radio-button-group></code>. */
        this.scale = "m";
        /** The color theme of the radio button, <code>theme</code> is passed as a property automatically from <code><calcite-radio-button-group></code>. */
        this.theme = "light";
        this.calciteRadioButtonChange = index.createEvent(this, "calciteRadioButtonChange", 7);
    }
    checkedChanged(newChecked, oldChecked) {
        if (newChecked === true && oldChecked === false) {
            this.uncheckOtherRadioButtonsInGroup();
        }
        this.input.checked = newChecked;
        this.calciteRadioButtonChange.emit();
    }
    disabledChanged(disabled) {
        this.input.disabled = disabled;
    }
    focusedChanged(focused) {
        if (focused && !this.el.hasAttribute("hidden")) {
            this.input.focus();
        }
        else {
            this.input.blur();
        }
    }
    hiddenChanged(newHidden) {
        this.input.hidden = newHidden;
    }
    nameChanged(newName) {
        this.input.name = newName;
    }
    requiredChanged(required) {
        this.input.required = required;
    }
    validateScale(newScale) {
        const scales = ["s", "m", "l"];
        if (!scales.includes(newScale))
            this.scale = "m";
    }
    validateTheme(newTheme) {
        const themes = ["light", "dark"];
        if (!themes.includes(newTheme))
            this.theme = "light";
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    checkFirstRadioButton() {
        let radioButtons = document.querySelectorAll(`calcite-radio-button[name=${this.name}]`);
        let firstCheckedRadioButton;
        if (radioButtons && radioButtons.length > 0) {
            radioButtons.forEach((radioButton) => {
                if (firstCheckedRadioButton) {
                    radioButton.checked = false;
                }
                else if (radioButton.checked) {
                    firstCheckedRadioButton = radioButton;
                }
                return radioButton;
            });
        }
    }
    setupTitleAttributeObserver() {
        this.titleAttributeObserver = new MutationObserver(() => {
            this.input.title = this.el.getAttribute("title");
        });
        this.titleAttributeObserver.observe(this.el, {
            attributes: true,
            attributeFilter: ["title"],
        });
    }
    uncheckOtherRadioButtonsInGroup() {
        const otherRadioButtons = document.querySelectorAll(`calcite-radio-button[name=${this.name}]:not([guid="${this.guid}"])`);
        otherRadioButtons.forEach((otherRadioButton) => {
            if (otherRadioButton.checked) {
                otherRadioButton.checked = false;
            }
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    check() {
        if (!this.disabled && !this.hidden) {
            this.uncheckOtherRadioButtonsInGroup();
            this.focused = true;
            this.checked = true;
        }
    }
    onInputBlur() {
        this.focused = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.renderHiddenRadioInput();
        this.setupTitleAttributeObserver();
    }
    componentWillLoad() {
        this.validateScale(this.scale);
        this.validateTheme(this.theme);
        if (this.name) {
            this.checkFirstRadioButton();
        }
    }
    disconnectedCallback() {
        this.input.parentNode.removeChild(this.input);
        this.titleAttributeObserver.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHiddenRadioInput() {
        // Rendering a hidden radio input outside Shadow DOM so it can participate in form submissions
        // @link https://www.hjorthhansen.dev/shadow-dom-form-participation/
        this.input = this.el.ownerDocument.createElement("input");
        this.input.setAttribute("aria-label", this.value || this.guid);
        this.input.checked = this.checked;
        this.input.disabled = this.disabled;
        this.input.hidden = this.hidden;
        this.input.id = this.guid;
        if (this.name) {
            this.input.name = this.name;
        }
        this.input.onfocus = this.check.bind(this);
        this.input.onblur = this.onInputBlur.bind(this);
        // We're using option #3 explained here to hide the radio input without compromising accessibility
        // @link https://blog.bitsrc.io/customise-radio-buttons-without-compromising-accessibility-b03061b5ba93
        // The only difference is we're using "fixed" instead of "absolute" positioning thanks to this StackOverflow:
        // @link https://stackoverflow.com/questions/24299567/radio-button-causes-browser-to-jump-to-the-top/24323870
        this.input.style.opacity = "0";
        this.input.style.position = "fixed";
        this.input.style.zIndex = "-1";
        if (this.value) {
            this.input.value = this.value;
        }
        this.input.required = this.required;
        if (this.el.getAttribute("title")) {
            this.input.title = this.el.getAttribute("title");
        }
        else if (this.name && this.value) {
            this.input.title = `Radio button with name of ${this.name} and value of ${this.value}`;
        }
        else {
            this.input.title = this.guid;
        }
        this.input.type = "radio";
        // This renders the input as a sibling of calcite-radio-button because as it turns out
        // doing appendChild as hjorthhansen suggests doesn't really keep it out of the
        // shadow DOM as far as slot behavior goes.  This is required to render {this.value} as fallback slot content.
        this.el.insertAdjacentElement("afterend", this.input);
    }
    render() {
        return (index.h(index.Host, { "aria-checked": this.checked.toString(), "aria-disabled": this.disabled }, index.h("div", { class: "radio" }), index.h("calcite-label", { dir: document.documentElement.getAttribute("dir"), scale: this.scale }, index.h("slot", null, this.value))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "checked": ["checkedChanged"],
        "disabled": ["disabledChanged"],
        "focused": ["focusedChanged"],
        "hidden": ["hiddenChanged"],
        "name": ["nameChanged"],
        "required": ["requiredChanged"],
        "scale": ["validateScale"],
        "theme": ["validateTheme"]
    }; }
};
CalciteRadioButton.style = calciteRadioButtonCss;

exports.calcite_radio_button = CalciteRadioButton;
