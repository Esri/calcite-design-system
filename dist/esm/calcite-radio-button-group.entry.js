import { r as registerInstance, h, H as Host, g as getElement } from './index-d518aa55.js';

const calciteRadioButtonGroupCss = ":host([hidden]){display:none}:host{max-width:100vw}:host([layout=horizontal]){display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}:host([hidden]){display:none}";

const CalciteRadioButtonGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /** The disabled state of the radio button group. */
        this.disabled = false;
        /** The radio button group's hidden status.  When a radio button group is hidden none of its options are focusable or checkable. */
        this.hidden = false;
        /** The layout direction of the radio buttons in a group. */
        this.layout = "horizontal";
        /** Requires that a value is selected for the radio button group before the parent form will submit. */
        this.required = false;
        /** The scale (size) of the radio button group. */
        this.scale = "m";
        /** The color theme of the radio button group. */
        this.theme = "light";
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.passPropsToRadioButtons = () => {
            const radioButtons = this.el.querySelectorAll("calcite-radio-button");
            let firstCheckedRadioButton;
            if (radioButtons.length > 0) {
                radioButtons.forEach((radioButton) => {
                    radioButton.disabled = this.disabled;
                    radioButton.hidden = this.hidden;
                    radioButton.name = this.name;
                    radioButton.required = this.required;
                    radioButton.scale = this.scale;
                    radioButton.theme = this.theme;
                    if (firstCheckedRadioButton) {
                        radioButton.checked = false;
                    }
                    else if (radioButton.checked) {
                        firstCheckedRadioButton = radioButton;
                    }
                    return radioButton;
                });
            }
        };
    }
    onDisabledChange() {
        this.passPropsToRadioButtons();
    }
    onHiddenChange() {
        this.passPropsToRadioButtons();
    }
    validateLayout(newLayout) {
        const layouts = ["horizontal", "vertical"];
        if (!layouts.includes(newLayout)) {
            this.layout = "horizontal";
            this.passPropsToRadioButtons();
        }
    }
    validateScale(newScale) {
        const scales = ["s", "m", "l"];
        if (!scales.includes(newScale)) {
            this.scale = "m";
            this.passPropsToRadioButtons();
        }
    }
    validateTheme(newTheme) {
        const themes = ["light", "dark"];
        if (!themes.includes(newTheme)) {
            this.theme = "light";
            this.passPropsToRadioButtons();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.validateLayout(this.layout);
        this.validateScale(this.scale);
        this.validateTheme(this.theme);
        this.passPropsToRadioButtons();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (h(Host, { role: "radiogroup" }, h("slot", null)));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "disabled": ["onDisabledChange"],
        "hidden": ["onHiddenChange"],
        "layout": ["validateLayout"],
        "scale": ["validateScale"],
        "theme": ["validateTheme"]
    }; }
};
CalciteRadioButtonGroup.style = calciteRadioButtonGroupCss;

export { CalciteRadioButtonGroup as calcite_radio_button_group };
