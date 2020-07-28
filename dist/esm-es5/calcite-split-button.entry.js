import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { g as getElementDir } from './dom-084e3cc4.js';
var calciteSplitButtonCss = ":host([hidden]){display:none}:host{--calcite-button-light:#eaeaea;--calcite-button-light-text:#151515;--calcite-button-dark:#404040;--calcite-button-dark-text:#0b0b0b}:host .split-button__container{display:-ms-flexbox;display:flex}:host .split-button__container>calcite-dropdown>calcite-button{height:100%}:host([color=blue]) .split-button__divider-container{background-color:var(--calcite-ui-blue-1)}:host([color=blue]):host([theme=dark]) .split-button__divider{background-color:var(--calcite-button-dark-text)}:host([color=red]) .split-button__divider-container{background-color:var(--calcite-ui-red-1)}:host([color=red]):host([theme=dark]) .split-button__divider{background-color:var(--calcite-button-dark-text)}:host([color=light]) .split-button__divider-container{background-color:var(--calcite-button-light)}:host([color=light]) .split-button__divider{background-color:var(--calcite-button-light-text)}:host([color=dark]) .split-button__divider-container{background-color:var(--calcite-button-dark)}:host([disabled]) .split-button__divider-container{opacity:0.4}:host([disabled]) calcite-dropdown>calcite-button{pointer-events:none}.split-button__divider-container{width:1px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out}.split-button__divider{width:1px;height:66.666%;display:inline-block;background-color:white}";
var CalciteSplitButton = /** @class */ (function () {
    function CalciteSplitButton(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.calciteSplitButtonPrimaryClick = createEvent(this, "calciteSplitButtonPrimaryClick", 7);
        /** specify the color of the control, defaults to blue */
        this.color = "blue";
        /** specify the scale of the control, defaults to m */
        this.scale = "m";
        /** specify the icon used for the dropdown menu, defaults to chevron */
        this.dropdownIconType = "chevron";
        /** optionally add a calcite-loader component to the control,
          disabling interaction. with the primary button */
        this.loading = false;
        this.calciteSplitButtonPrimaryClickHandler = function (e) { return _this.calciteSplitButtonPrimaryClick.emit(e); };
    }
    CalciteSplitButton.prototype.validateColor = function () {
        var color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
    };
    CalciteSplitButton.prototype.validateScale = function () {
        var scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    };
    CalciteSplitButton.prototype.validateTheme = function () {
        var theme = ["dark", "light"];
        if (!theme.includes(this.theme))
            this.theme = "light";
    };
    CalciteSplitButton.prototype.validateDropdownIconType = function () {
        var dropdownIconType = ["chevron", "caret", "ellipsis", "overflow"];
        if (!dropdownIconType.includes(this.dropdownIconType))
            this.dropdownIconType = "chevron";
    };
    CalciteSplitButton.prototype.connectedCallback = function () {
        this.validateColor();
        this.validateScale();
        this.validateTheme();
        this.validateDropdownIconType();
    };
    CalciteSplitButton.prototype.render = function () {
        var dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("div", { class: "split-button__container" }, h("calcite-button", { dir: dir, "aria-label": this.primaryLabel, color: this.color, scale: this.scale, loading: this.loading, "icon-start": this.primaryIconStart ? this.primaryIconStart : null, "icon-end": this.primaryIconEnd ? this.primaryIconEnd : null, disabled: this.disabled, theme: this.theme, onClick: this.calciteSplitButtonPrimaryClickHandler }, this.primaryText), h("div", { class: "split-button__divider-container" }, h("div", { class: "split-button__divider" })), h("calcite-dropdown", { alignment: "end", dir: dir, theme: this.theme, scale: this.scale, width: this.scale }, h("calcite-button", { dir: dir, "aria-label": this.dropdownLabel, slot: "dropdown-trigger", scale: this.scale, color: this.color, disabled: this.disabled, theme: this.theme, "icon-start": this.dropdownIcon }), h("slot", null)))));
    };
    Object.defineProperty(CalciteSplitButton.prototype, "dropdownIcon", {
        get: function () {
            return this.dropdownIconType === "chevron"
                ? "chevronDown"
                : this.dropdownIconType === "caret"
                    ? "caretDown"
                    : this.dropdownIconType === "ellipsis"
                        ? "ellipsis"
                        : "handle-vertical";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalciteSplitButton.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalciteSplitButton, "watchers", {
        get: function () {
            return {
                "color": ["validateColor"],
                "scale": ["validateScale"],
                "theme": ["validateTheme"],
                "dropdownIconType": ["validateDropdownIconType"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CalciteSplitButton;
}());
CalciteSplitButton.style = calciteSplitButtonCss;
export { CalciteSplitButton as calcite_split_button };
