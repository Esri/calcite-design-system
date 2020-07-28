import { r as registerInstance, h, H as Host, g as getElement } from './index-2cc146ea.js';
var calciteRadioButtonGroupCss = ":host([hidden]){display:none}:host{max-width:100vw}:host([layout=horizontal]){display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}:host([hidden]){display:none}";
var CalciteRadioButtonGroup = /** @class */ (function () {
    function CalciteRadioButtonGroup(hostRef) {
        var _this = this;
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
        this.passPropsToRadioButtons = function () {
            var radioButtons = _this.el.querySelectorAll("calcite-radio-button");
            var firstCheckedRadioButton;
            if (radioButtons.length > 0) {
                radioButtons.forEach(function (radioButton) {
                    radioButton.disabled = _this.disabled;
                    radioButton.hidden = _this.hidden;
                    radioButton.name = _this.name;
                    radioButton.required = _this.required;
                    radioButton.scale = _this.scale;
                    radioButton.theme = _this.theme;
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
    CalciteRadioButtonGroup.prototype.onDisabledChange = function () {
        this.passPropsToRadioButtons();
    };
    CalciteRadioButtonGroup.prototype.onHiddenChange = function () {
        this.passPropsToRadioButtons();
    };
    CalciteRadioButtonGroup.prototype.validateLayout = function (newLayout) {
        var layouts = ["horizontal", "vertical"];
        if (!layouts.includes(newLayout)) {
            this.layout = "horizontal";
            this.passPropsToRadioButtons();
        }
    };
    CalciteRadioButtonGroup.prototype.validateScale = function (newScale) {
        var scales = ["s", "m", "l"];
        if (!scales.includes(newScale)) {
            this.scale = "m";
            this.passPropsToRadioButtons();
        }
    };
    CalciteRadioButtonGroup.prototype.validateTheme = function (newTheme) {
        var themes = ["light", "dark"];
        if (!themes.includes(newTheme)) {
            this.theme = "light";
            this.passPropsToRadioButtons();
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    CalciteRadioButtonGroup.prototype.componentWillLoad = function () {
        this.validateLayout(this.layout);
        this.validateScale(this.scale);
        this.validateTheme(this.theme);
        this.passPropsToRadioButtons();
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    CalciteRadioButtonGroup.prototype.render = function () {
        return (h(Host, { role: "radiogroup" }, h("slot", null)));
    };
    Object.defineProperty(CalciteRadioButtonGroup.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalciteRadioButtonGroup, "watchers", {
        get: function () {
            return {
                "disabled": ["onDisabledChange"],
                "hidden": ["onHiddenChange"],
                "layout": ["validateLayout"],
                "scale": ["validateScale"],
                "theme": ["validateTheme"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CalciteRadioButtonGroup;
}());
CalciteRadioButtonGroup.style = calciteRadioButtonGroupCss;
export { CalciteRadioButtonGroup as calcite_radio_button_group };
