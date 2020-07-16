import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-2cc146ea.js';
import { h as hasLabel, g as getElementDir } from './dom-084e3cc4.js';
import { g as getKey } from './key-3b974aad.js';
var calciteSwitchCss = ":host([hidden]){display:none}:host-context([theme=dark]){--calcite-ui-blue-1:#00A0FF;--calcite-ui-blue-2:#0087D7;--calcite-ui-blue-3:#47BBFF;--calcite-ui-green-1:#36DA43;--calcite-ui-green-2:#11AD1D;--calcite-ui-green-3:#44ED51;--calcite-ui-yellow-1:#FFC900;--calcite-ui-yellow-2:#F4B000;--calcite-ui-yellow-3:#FFE24D;--calcite-ui-red-1:#FE583E;--calcite-ui-red-2:#F3381B;--calcite-ui-red-3:#FF7465;--calcite-ui-background:#202020;--calcite-ui-foreground-1:#2b2b2b;--calcite-ui-foreground-2:#353535;--calcite-ui-foreground-3:#404040;--calcite-ui-text-1:#ffffff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-4:#757575;--calcite-ui-border-5:#9f9f9f}:host{--calcite-switch-hover-handle-border:var(--calcite-ui-blue-2);--calcite-switch-switched-track-background:var(--calcite-ui-blue-2);--calcite-switch-switched-track-border:var(--calcite-ui-blue-2);--calcite-switch-switched-handle-border:var(--calcite-ui-blue-1);--calcite-switch-switched-hover-track-background:var(--calcite-ui-blue-2);--calcite-switch-switched-hover-track-border:var(--calcite-ui-blue-2);--calcite-switch-switched-hover-handle-border:var(--calcite-ui-blue-3)}:host([color=red]){--calcite-switch-switched-track-background:var(--calcite-ui-red-2);--calcite-switch-switched-track-border:var(--calcite-ui-red-1);--calcite-switch-hover-handle-border:var(--calcite-ui-red-2);--calcite-switch-switched-handle-border:var(--calcite-ui-red-1);--calcite-switch-switched-hover-track-background:var(--calcite-ui-red-1);--calcite-switch-switched-hover-track-border:var(--calcite-ui-red-2);--calcite-switch-switched-hover-handle-border:var(--calcite-ui-red-3)}:host([scale=s]){--calcite-switch-track-width:28px;--calcite-switch-track-height:16px;--calcite-switch-handle-size:14px}:host([scale=m]){--calcite-switch-track-width:36px;--calcite-switch-track-height:20px;--calcite-switch-handle-size:18px}:host([scale=l]){--calcite-switch-track-width:44px;--calcite-switch-track-height:24px;--calcite-switch-handle-size:22px}::slotted(input){display:none}:host{display:inline-block;position:relative;width:auto;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;tap-highlight-color:transparent}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;width:auto}:host(:focus){outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}.track{position:relative;display:inline-block;vertical-align:top;width:var(--calcite-switch-track-width);height:var(--calcite-switch-track-height);background-color:var(--calcite-ui-foreground-2);border-radius:30px;border:1px solid var(--calcite-ui-border-2);pointer-events:none;-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}.handle{position:absolute;display:block;width:var(--calcite-switch-handle-size);height:var(--calcite-switch-handle-size);top:-1px;left:-1px;right:auto;background-color:var(--calcite-ui-foreground-1);border-radius:30px;border:2px solid var(--calcite-ui-border-4);pointer-events:none;-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}:host(:hover) .track,:host(:focus) .track{background-color:var(--calcite-ui-foreground-3);border-color:var(--calcite-ui-border-1)}:host(:hover) .handle,:host(:focus) .handle{border-color:var(--calcite-switch-hover-handle-border);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-switch-hover-handle-border);box-shadow:inset 0 0 0 1px var(--calcite-switch-hover-handle-border);right:auto}:host([switched]) .track{background-color:var(--calcite-switch-switched-track-background);border-color:var(--calcite-switch-switched-track-border)}:host([switched]) .handle{right:-1px;left:auto;border-color:var(--calcite-switch-switched-handle-border)}:host([switched]:hover) .track{background-color:var(--calcite-switch-switched-hover-track-background);border-color:var(--calcite-switch-switched-hover-track-border)}:host([switched]:hover) .handle{border-color:var(--calcite-switch-switched-hover-handle-border);-webkit-box-shadow:inset 0 0 0 1px var(--calcite-switch-switched-hover-handle-border);box-shadow:inset 0 0 0 1px var(--calcite-switch-switched-hover-handle-border)}:host([dir=rtl]){margin-right:0;margin-left:0.5em}:host([dir=rtl]) .handle{left:auto;right:-1px}:host([dir=rtl][switched]) .handle{right:auto;left:-1px}:host([dir=rtl][switched]:active) .handle,:host([dir=rtl][switched]:focus) .handle{right:auto;left:-1px}";
var CalciteSwitch = /** @class */ (function () {
    function CalciteSwitch(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.calciteSwitchChange = createEvent(this, "calciteSwitchChange", 7);
        /** True if the switch is initially on */
        this.switched = false;
        /** The name of the checkbox input */
        this.name = "";
        /** The value of the checkbox input */
        this.value = "";
        /** What color the switch should be */
        this.color = "blue";
        /** The scale of the switch */
        this.scale = "m";
        this.syncThisToProxyInput = function () {
            _this.switched = _this.inputProxy.hasAttribute("checked");
            _this.name = _this.inputProxy.name;
            _this.value = _this.inputProxy.value;
        };
        this.syncProxyInputToThis = function () {
            _this.switched
                ? _this.inputProxy.setAttribute("checked", "")
                : _this.inputProxy.removeAttribute("checked");
            _this.inputProxy.setAttribute("name", _this.name);
            _this.inputProxy.setAttribute("value", _this.value);
        };
    }
    CalciteSwitch.prototype.handleLabelFocus = function (e) {
        if (!this.el.contains(e.detail.interactedEl) &&
            hasLabel(e.detail.labelEl, this.el)) {
            this.updateSwitch(event);
            this.el.focus();
        }
        else
            return;
    };
    CalciteSwitch.prototype.onClick = function (e) {
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && e.target === this.inputProxy) ||
            (!this.el.closest("label") && e.target === this.el)) {
            this.updateSwitch(e);
        }
    };
    CalciteSwitch.prototype.keyDownHandler = function (e) {
        var key = getKey(e.key);
        if (key === " " || key === "Enter") {
            this.updateSwitch(e);
        }
    };
    CalciteSwitch.prototype.switchWatcher = function () {
        this.switched
            ? this.inputProxy.setAttribute("checked", "")
            : this.inputProxy.removeAttribute("checked");
    };
    CalciteSwitch.prototype.connectedCallback = function () {
        // prop validations
        var color = ["blue", "red"];
        if (!color.includes(this.color))
            this.color = "blue";
        var scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        this.setupProxyInput();
    };
    CalciteSwitch.prototype.disconnectedCallback = function () {
        this.observer.disconnect();
    };
    CalciteSwitch.prototype.componentWillRender = function () {
        this.syncProxyInputToThis();
    };
    CalciteSwitch.prototype.render = function () {
        var dir = getElementDir(this.el);
        return (h(Host, { dir: dir, role: "checkbox", "aria-checked": this.switched.toString(), tabIndex: this.tabIndex }, h("div", { class: "track" }, h("div", { class: "handle" }))));
    };
    Object.defineProperty(CalciteSwitch.prototype, "tabIndex", {
        get: function () {
            var hasTabIndex = this.el.hasAttribute("tabindex");
            if (hasTabIndex) {
                return Number(this.el.getAttribute("tabindex"));
            }
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    CalciteSwitch.prototype.setupProxyInput = function () {
        // check for a proxy input
        this.inputProxy = this.el.querySelector("input");
        // if the user didn't pass a proxy input create one for them
        if (!this.inputProxy) {
            this.inputProxy = document.createElement("input");
            this.inputProxy.type = "checkbox";
            this.syncProxyInputToThis();
            this.el.appendChild(this.inputProxy);
        }
        this.syncThisToProxyInput();
        {
            this.observer = new MutationObserver(this.syncThisToProxyInput);
            this.observer.observe(this.inputProxy, { attributes: true });
        }
    };
    CalciteSwitch.prototype.updateSwitch = function (e) {
        e.preventDefault();
        this.switched = !this.switched;
        this.calciteSwitchChange.emit({
            switched: this.switched,
        });
    };
    Object.defineProperty(CalciteSwitch.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalciteSwitch, "watchers", {
        get: function () {
            return {
                "switched": ["switchWatcher"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return CalciteSwitch;
}());
CalciteSwitch.style = calciteSwitchCss;
export { CalciteSwitch as calcite_switch };
