var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { a as getElementProp, g as getElementDir } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';
var calciteInputCss = ":host([hidden]){display:none}calcite-input[scale=s] textarea,calcite-input[scale=s] input,calcite-input[scale=s] .calcite-input-prefix,calcite-input[scale=s] .calcite-input-suffix{padding:8px;font-size:12px;height:32px}calcite-input[scale=s] textarea{min-height:32px}calcite-input[scale=s] .calcite-input-number-button-wrapper,calcite-input[scale=s] .calcite-input-action-wrapper calcite-button,calcite-input[scale=s] .calcite-input-action-wrapper calcite-button button{height:32px}calcite-input[scale=s] textarea,calcite-input[scale=s] input[type=file]{height:auto}calcite-input[scale=m] textarea,calcite-input[scale=m] input,calcite-input[scale=m] .calcite-input-prefix,calcite-input[scale=m] .calcite-input-suffix{padding:12px;font-size:16px;height:44px}calcite-input[scale=m] textarea{min-height:44px}calcite-input[scale=m] .calcite-input-number-button-wrapper,calcite-input[scale=m] .calcite-input-action-wrapper calcite-button,calcite-input[scale=m] .calcite-input-action-wrapper calcite-button button{height:44px}calcite-input[scale=m] textarea,calcite-input[scale=m] input[type=file]{height:auto}calcite-input[scale=l] textarea,calcite-input[scale=l] input,calcite-input[scale=l] .calcite-input-prefix,calcite-input[scale=l] .calcite-input-suffix{padding:16px;font-size:20px;height:56px}calcite-input[scale=l] textarea{min-height:56px}calcite-input[scale=l] .calcite-input-number-button-wrapper,calcite-input[scale=l] .calcite-input-action-wrapper calcite-button,calcite-input[scale=l] .calcite-input-action-wrapper calcite-button button{height:56px}calcite-input[scale=l] textarea,calcite-input[scale=l] input[type=file]{height:auto}calcite-input[disabled] textarea,calcite-input[disabled] input{pointer-events:none;opacity:0.4}calcite-input textarea,calcite-input input{display:-ms-flexbox;display:flex;position:relative;min-width:20%;max-width:100%;max-height:100%;-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;font-family:inherit;-webkit-transition:150ms ease-in-out, height 0s;transition:150ms ease-in-out, height 0s;-webkit-box-shadow:0 0 0 0 transparent;box-shadow:0 0 0 0 transparent;outline:0;margin:0;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-1);font-weight:400}calcite-input input[type=search]::-webkit-search-decoration{-webkit-appearance:none}calcite-input textarea,calcite-input input{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}calcite-input textarea:focus,calcite-input input:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}calcite-input input,calcite-input textarea{color:var(--calcite-ui-text-1);border:1px solid var(--calcite-ui-border-1)}calcite-input input:-ms-input-placeholder,calcite-input textarea:-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}calcite-input input::-ms-input-placeholder,calcite-input textarea::-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}calcite-input input::placeholder,calcite-input input:-ms-input-placeholder,calcite-input input::-ms-input-placeholder,calcite-input textarea::placeholder,calcite-input textarea:-ms-input-placeholder,calcite-input textarea::-ms-input-placeholder{color:var(--calcite-ui-text-3);font-weight:400}calcite-input input:focus,calcite-input textarea:focus{border-color:var(--calcite-ui-blue-1);color:var(--calcite-ui-text-1)}calcite-input input[readonly],calcite-input textarea[readonly]{background-color:var(--calcite-ui-background)}calcite-input input[readonly]:focus,calcite-input textarea[readonly]:focus{color:var(--calcite-ui-text-1)}calcite-input calcite-icon{color:var(--calcite-ui-text-1)}calcite-input slot:not[name=input-message]{display:block;margin-bottom:0.375rem;color:var(--calcite-ui-text-2);font-weight:500}calcite-input[icon] input{padding-left:2.25rem}calcite-input[dir=rtl][icon] input{padding-right:2.25rem;padding-left:0.75rem}calcite-input[dir=rtl][icon][scale=l] input{padding-right:3rem;padding-left:0.75rem}calcite-input[icon][scale=l] input{padding-left:3rem}.calcite-input-element-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex:1;flex:1;min-width:20%;position:relative;-ms-flex-order:3;order:3}.calcite-input-icon{display:block;position:absolute;pointer-events:none;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;top:calc(50% - 9px);left:0.75rem;margin:1px auto 0;z-index:1}calcite-input[scale=l] .calcite-input-icon{top:calc(50% - 12px)}calcite-input[dir=rtl] .calcite-input-icon{left:unset;right:0.75rem}input[type=text]::-ms-clear{display:none;width:0;height:0}input[type=text]::-ms-reveal{display:none;width:0;height:0}input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration,input[type=date]::-webkit-clear-button,input[type=time]::-webkit-clear-button{display:none}.calcite-input-clear-button{display:-ms-flexbox;display:flex;-ms-flex-item-align:stretch;align-self:stretch;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;min-height:100%;padding:0 0.75rem;border:1px solid var(--calcite-ui-border-1);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;pointer-events:initial;background-color:var(--calcite-ui-foreground-1);border-left:none;-ms-flex-order:4;order:4}.calcite-input-clear-button:hover,.calcite-input-clear-button:focus{background-color:var(--calcite-ui-foreground-2)}.calcite-input-clear-button:active{background-color:var(--calcite-ui-foreground-3)}.calcite-input-clear-button{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.calcite-input-clear-button:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.calcite-input-loading{display:block;pointer-events:none;position:absolute;top:1px;left:1px;right:1px}.calcite-input-action-wrapper{display:-ms-flexbox;display:flex;-ms-flex-order:7;order:7}.calcite-input-prefix,.calcite-input-suffix{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;height:auto;min-height:100%;word-break:break-word;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;font-weight:500;border:1px solid var(--calcite-ui-border-1);background-color:var(--calcite-ui-background);color:var(--calcite-ui-text-2);line-height:1}.calcite-input-prefix{-ms-flex-order:2;order:2;border-right-width:0px}.calcite-input-suffix{-ms-flex-order:5;order:5;border-left-width:0px}calcite-input[dir=rtl] .calcite-input-prefix{border-right-width:1px;border-left-width:0px}calcite-input[dir=rtl] .calcite-input-suffix{border-left-width:1px;border-right-width:0px}calcite-input[readonly] .calcite-input-number-button-item{pointer-events:none}calcite-input[alignment=start] textarea,calcite-input[alignment=start] input{text-align:left}calcite-input[alignment=end] textarea,calcite-input[alignment=end] input{text-align:right}calcite-input[dir=rtl][alignment=start] textarea,calcite-input[dir=rtl][alignment=start] input{text-align:right}calcite-input[dir=rtl][alignment=end] textarea,calcite-input[dir=rtl][alignment=end] input{text-align:left}calcite-input input[type=number]::-webkit-inner-spin-button,calcite-input input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}calcite-input input[type=number]{-moz-appearance:textfield}.calcite-input-number-button-wrapper{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;box-sizing:border-box;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;pointer-events:none;-ms-flex-order:6;order:6}calcite-input[number-button-type=vertical] .calcite-input-wrapper{-ms-flex-direction:row;flex-direction:row;display:-ms-flexbox;display:flex}calcite-input[number-button-type=vertical] input,calcite-input[number-button-type=vertical] textarea{-ms-flex-order:2;order:2}calcite-input[dir=rtl][number-button-type=horizontal] .calcite-input-number-button-item[data-adjustment=down] calcite-icon{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}calcite-input[dir=rtl][number-button-type=horizontal] .calcite-input-number-button-item[data-adjustment=up] calcite-icon{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up],.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down]{min-height:100%;max-height:100%;-ms-flex-order:1;order:1;-ms-flex-item-align:auto;align-self:auto}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up] calcite-icon,.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down] calcite-icon{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down]{border-left:1px solid var(--calcite-ui-border-1);border-right:0px}.calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up]{-ms-flex-order:5;order:5}calcite-input[dir=rtl] .calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=down]{border-right:1px solid var(--calcite-ui-border-1);border-left:0px}calcite-input[dir=rtl] .calcite-input-number-button-item.number-button-item-horizontal[data-adjustment=up]{border-left:1px solid var(--calcite-ui-border-1);border-right:0px}calcite-input[number-button-type=vertical] .calcite-input-number-button-item[data-adjustment=down]{border-top:0}.calcite-input-number-button-item{display:-ms-flexbox;display:flex;-ms-flex-item-align:center;align-self:center;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;max-height:50%;min-height:50%;padding:0 0.75rem;border:1px solid var(--calcite-ui-border-1);-webkit-transition:background-color 0.15s ease-in-out;transition:background-color 0.15s ease-in-out;pointer-events:initial;background-color:var(--calcite-ui-foreground-1);border-left:none}.calcite-input-number-button-item calcite-icon{pointer-events:none;width:14px;height:auto}.calcite-input-number-button-item:hover,.calcite-input-number-button-item:focus{background-color:var(--calcite-ui-foreground-2)}.calcite-input-number-button-item:active{background-color:var(--calcite-ui-foreground-3)}calcite-input[dir=rtl][number-button-type=vertical] .calcite-input-number-button-item{border-right:none;border-left:1px solid var(--calcite-ui-border-1)}.calcite-input-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;position:relative}calcite-input input::-webkit-calendar-picker-indicator{display:none}calcite-input input[type=date]::-webkit-input-placeholder{visibility:hidden !important}calcite-input textarea::-webkit-resizer{-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;bottom:0;right:0;padding:0 0.375rem}@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){.calcite-input-resize-icon-wrapper{display:none}}.calcite-input-resize-icon-wrapper{background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-3);position:absolute;z-index:1;bottom:2px;right:2px;pointer-events:none;width:16px;height:16px}.calcite-input-resize-icon-wrapper calcite-icon{bottom:4px;right:4px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}calcite-input[dir=rtl] calcite-input textarea::-webkit-resizer{left:0;right:unset}calcite-input[dir=rtl] .calcite-input-resize-icon{left:10px;right:unset;-webkit-transform:rotate(45deg);transform:rotate(45deg)}calcite-input[type=file] input,calcite-input[type=file] textarea{cursor:pointer;padding:1.5rem;border:1px dashed #d4d4d4;background-color:#f8f8f8;text-align:center}calcite-input[status=invalid] .calcite-input-icon{color:var(--calcite-ui-red-1)}calcite-input[status=valid] .calcite-input-icon{color:var(--calcite-ui-green-1)}calcite-input[status=idle] .calcite-input-icon{color:var(--calcite-ui-text-2)}";
var CalciteInput = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.calciteInputFocus = createEvent(this, "calciteInputFocus", 7);
        this.calciteInputBlur = createEvent(this, "calciteInputBlur", 7);
        this.calciteInputInput = createEvent(this, "calciteInputInput", 7);
        /** specify if the input is in loading state */
        this.loading = false;
        /** specify the alignment of the value of the input */
        this.alignment = "start";
        /** input value */
        this.value = "";
        /** for recognized input types, show an icon if applicable */
        this.icon = false;
        /** specify the input type */
        this.type = "text";
        /** specify the placement of the number buttons */
        this.numberButtonType = "vertical";
        /** is the input required */
        this.required = false;
        /** should the input autofocus */
        this.autofocus = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** keep track of the rendered child type */
        this.childElType = "input";
        /** determine if there is a slotted action for styling purposes */
        this.hasAction = false;
        /** track if the input is clearable */
        this.isClearable = false;
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        /** map icons to colors */
        this.iconTypeDefaults = {
            tel: "phone",
            password: "lock",
            email: "send",
            date: "calendar",
            time: "clock",
            search: "search",
        };
        this.updateNumberValue = function (e) {
            // todo, when dropping ie11 support, refactor to use stepup/stepdown
            // prevent blur and re-focus of input on mousedown
            e.preventDefault();
            if (_this.childElType === "input" && _this.type === "number") {
                var inputMax = _this.maxString ? parseFloat(_this.maxString) : null;
                var inputMin = _this.minString ? parseFloat(_this.minString) : null;
                var inputStep = _this.stepString ? parseFloat(_this.stepString) : 1;
                var inputVal = _this.value && _this.value !== "" ? parseFloat(_this.value) : 0;
                switch (e.target.dataset.adjustment) {
                    case "up":
                        if ((!inputMax && inputMax !== 0) || inputVal < inputMax)
                            _this.childEl.value = (inputVal += inputStep).toString();
                        break;
                    case "down":
                        if ((!inputMin && inputMin !== 0) || inputVal > inputMin)
                            _this.childEl.value = (inputVal -= inputStep).toString();
                        break;
                }
                _this.value = _this.childEl.value.toString();
            }
        };
    }
    /** watcher to update number-to-string for min max */
    class_1.prototype.minWatcher = function () {
        this.minString = this.min.toString() || null;
    };
    class_1.prototype.maxWatcher = function () {
        this.maxString = this.max.toString() || null;
    };
    class_1.prototype.stepWatcher = function () {
        this.maxString = this.max.toString() || null;
    };
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.connectedCallback = function () {
        // validate props
        var status = ["invalid", "valid", "idle"];
        var foundStatus = getElementProp(this.el, "status", "idle");
        if (!status.includes(this.status))
            this.status = !status.includes(foundStatus) ? "idle" : foundStatus;
        var scale = ["s", "m", "l"];
        var foundScale = getElementProp(this.el, "scale", "m");
        if (!scale.includes(this.scale)) {
            this.scale = !scale.includes(foundScale) ? "m" : foundScale;
        }
        var alignment = ["start", "end"];
        if (!alignment.includes(this.alignment))
            this.alignment = "start";
        var type = [
            "color",
            "date",
            "datetime-local",
            "email",
            "file",
            "image",
            "month",
            "number",
            "password",
            "search",
            "tel",
            "text",
            "textarea",
            "time",
            "url",
            "week",
        ];
        if (!type.includes(this.type))
            this.type = "text";
        var numberButtonType = ["vertical", "horizontal", "none"];
        if (!numberButtonType.includes(this.numberButtonType))
            this.numberButtonType = "vertical";
        // if an icon string is not provided, but icon is true and a default icon is present
        // for the requested type, set that as the icon
        var typesWithIcons = ["date", "email", "password", "search", "tel", "time"];
        this.icon = this.icon
            ? this.icon
            : this.icon !== false && typesWithIcons.includes(this.type)
                ? this.iconTypeDefaults[this.type]
                : false;
        this.determineClearable();
    };
    class_1.prototype.componentDidLoad = function () {
        var _a, _b, _c;
        this.minString = (_a = this.min) === null || _a === void 0 ? void 0 : _a.toString();
        this.maxString = (_b = this.max) === null || _b === void 0 ? void 0 : _b.toString();
        this.stepString = (_c = this.step) === null || _c === void 0 ? void 0 : _c.toString();
        this.slottedActionEl = this.el.querySelector("[slot=input-action]");
    };
    class_1.prototype.componentWillLoad = function () {
        this.childElType = this.type === "textarea" ? "textarea" : "input";
        this.hasAction = !!this.el.querySelector("[slot=input-action]");
    };
    class_1.prototype.componentWillUpdate = function () {
        this.calciteInputInput.emit({
            element: this.childEl,
            value: this.value,
        });
        this.determineClearable();
    };
    class_1.prototype.render = function () {
        var _this = this;
        var dir = getElementDir(this.el);
        var attributes = this.getAttributes();
        var inputClearButton = (h("div", { class: "calcite-input-clear-button", onClick: function () { return _this.clearInputValue(); } }, h("calcite-icon", { theme: this.theme, icon: "x", scale: "s" })));
        var loader = (h("div", { class: "calcite-input-loading" }, h("calcite-progress", { type: "indeterminate" })));
        var numberButtonClassModifier = this.numberButtonType === "horizontal"
            ? "number-button-item-horizontal"
            : null;
        var numberButtonsHorizontalUp = (h("div", { class: "calcite-input-number-button-item " + numberButtonClassModifier, onMouseDown: this.updateNumberValue, "data-adjustment": "up" }, h("calcite-icon", { theme: this.theme, icon: "chevron-up" })));
        var numberButtonsHorizontalDown = (h("div", { class: "calcite-input-number-button-item " + numberButtonClassModifier, onMouseDown: this.updateNumberValue, "data-adjustment": "down" }, h("calcite-icon", { theme: this.theme, icon: "chevron-down" })));
        var numberButtonsVertical = (h("div", { class: "calcite-input-number-button-wrapper" }, numberButtonsHorizontalUp, numberButtonsHorizontalDown));
        var iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";
        var iconEl = (h("calcite-icon", { class: "calcite-input-icon", scale: iconScale, theme: this.theme, icon: this.icon }));
        var inputAction = (h("div", { class: "calcite-input-action-wrapper" }, h("slot", { name: "input-action" })));
        var prefixText = (h("div", { class: "calcite-input-prefix" }, this.prefixText));
        var suffixText = (h("div", { class: "calcite-input-suffix" }, this.suffixText));
        var childEl = this.childElType !== "textarea" ? (h("input", Object.assign({}, attributes, { onBlur: function () { return _this.inputBlurHandler(); }, onFocus: function (e) { return _this.inputFocusHandler(e); }, onInput: function (e) { return _this.inputInputHandler(e); }, type: this.type, min: this.minString, max: this.maxString, step: this.stepString, value: this.value, placeholder: this.placeholder || "", required: this.required ? true : null, autofocus: this.autofocus ? true : null, disabled: this.disabled ? true : null, tabIndex: this.disabled ? -1 : null, ref: function (el) { return (_this.childEl = el); } }))) : ([
            h("textarea", Object.assign({}, attributes, { onBlur: function () { return _this.inputBlurHandler(); }, onFocus: function (e) { return _this.inputFocusHandler(e); }, onInput: function (e) { return _this.inputInputHandler(e); }, required: this.required ? true : null, placeholder: this.placeholder || "", autofocus: this.autofocus ? true : null, disabled: this.disabled ? true : null, tabIndex: this.disabled ? -1 : null, ref: function (el) { return (_this.childEl = el); } }), h("slot", null)),
            h("div", { class: "calcite-input-resize-icon-wrapper" }, h("calcite-icon", { icon: "chevron-down", scale: "s" })),
        ]);
        return (h(Host, { dir: dir, onClick: function (e) { return _this.inputFocusHandler(e); } }, h("div", { class: "calcite-input-wrapper" }, this.type === "number" && this.numberButtonType === "horizontal"
            ? numberButtonsHorizontalDown
            : null, this.prefixText ? prefixText : null, h("div", { class: "calcite-input-element-wrapper" }, childEl, this.isClearable ? inputClearButton : null, this.icon ? iconEl : null, this.loading ? loader : null), this.hasAction ? inputAction : null, this.type === "number" && this.numberButtonType === "vertical"
            ? numberButtonsVertical
            : null, this.suffixText ? suffixText : null, this.type === "number" && this.numberButtonType === "horizontal"
            ? numberButtonsHorizontalUp
            : null)));
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    class_1.prototype.handleLabelFocus = function (e) {
        if (e.detail.labelEl.contains(this.el) ||
            e.detail.labelEl.shadowRoot.contains(this.el) ||
            e.detail.requestedInput === this.el.id) {
            this.childEl.focus();
        }
    };
    class_1.prototype.keyDownHandler = function (e) {
        if (this.isClearable && getKey(e.key) === "Escape") {
            this.clearInputValue();
        }
    };
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** focus the rendered child element */
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_d) {
                (_a = this.childEl) === null || _a === void 0 ? void 0 : _a.focus();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.inputInputHandler = function (e) {
        this.value = e.target.value;
        this.calciteInputInput.emit({
            element: this.childEl,
            value: this.value,
        });
    };
    class_1.prototype.inputBlurHandler = function () {
        this.calciteInputBlur.emit({
            element: this.childEl,
            value: this.value,
        });
    };
    class_1.prototype.inputFocusHandler = function (e) {
        if (e.target !== this.slottedActionEl)
            this.setFocus();
        this.calciteInputFocus.emit({
            element: this.childEl,
            value: this.value,
        });
    };
    class_1.prototype.determineClearable = function () {
        this.isClearable =
            this.type !== "textarea" &&
                (this.clearable ||
                    this.type === "search" ||
                    this.type === "time" ||
                    this.type === "date") &&
                this.value.length > 0;
    };
    class_1.prototype.getAttributes = function () {
        // spread attributes from the component to rendered child, filtering out props
        var props = [
            "alignment",
            "dir",
            "clearable",
            "min",
            "max",
            "step",
            "value",
            "icon",
            "loading",
            "prefix-text",
            "scale",
            "status",
            "suffix-text",
            "theme",
            "number-button-type",
        ];
        return Array.from(this.el.attributes)
            .filter(function (a) { return a && !props.includes(a.name); })
            .reduce(function (acc, _d) {
            var _e;
            var name = _d.name, value = _d.value;
            return (Object.assign(Object.assign({}, acc), (_e = {}, _e[name] = value, _e)));
        }, {});
    };
    class_1.prototype.clearInputValue = function () {
        this.value = "";
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "min": ["minWatcher"],
                "max": ["maxWatcher"],
                "step": ["stepWatcher"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
CalciteInput.style = calciteInputCss;
export { CalciteInput as calcite_input };
