import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-30c05663.js';
import { g as getElementDir } from './dom-0361c8d2.js';
import { S as SPACE, b as ENTER } from './keys-1c8b189f.js';
var CalciteSwitch = /** @class */ (function () {
    function CalciteSwitch(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        /** True if the switch is initially on */
        this.switched = false;
        /** The name of the checkbox input */
        this.name = "";
        /** The value of the checkbox input */
        this.value = "";
        /** What color the switch should be */
        this.color = "blue";
        /** The scale of the button */
        this.scale = "m";
        /** The component's theme. */
        this.theme = "light";
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
        this.calciteSwitchChange = createEvent(this, "calciteSwitchChange", 7);
    }
    CalciteSwitch.prototype.onClick = function (e) {
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && e.target === this.inputProxy) ||
            (!this.el.closest("label") && e.target === this.el)) {
            this.switched = !this.switched;
        }
    };
    CalciteSwitch.prototype.keyDownHandler = function (e) {
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            e.preventDefault();
            this.switched = !this.switched;
        }
    };
    CalciteSwitch.prototype.switchWatcher = function () {
        this.calciteSwitchChange.emit();
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
        var theme = ["dark", "light"];
        if (!theme.includes(this.theme))
            this.theme = "light";
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
        return (h(Host, { role: "checkbox", dir: dir, "aria-checked": this.switched.toString(), tabIndex: this.tabIndex }, h("div", { class: "track" }, h("div", { class: "handle" })), h("slot", null)));
    };
    Object.defineProperty(CalciteSwitch.prototype, "tabIndex", {
        get: function () {
            var hasTabIndex = this.el.hasAttribute("tabindex");
            if (hasTabIndex) {
                return Number(this.el.getAttribute("tabindex"));
            }
            return 0;
        },
        enumerable: true,
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
    Object.defineProperty(CalciteSwitch.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteSwitch, "watchers", {
        get: function () {
            return {
                "switched": ["switchWatcher"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteSwitch, "style", {
        get: function () { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{--calcite-switch-track-background:#f3f3f3;--calcite-switch-track-border:#d4d4d4;--calcite-switch-handle-background:#fff;--calcite-switch-handle-border:#959595;--calcite-switch-hover-handle-border:var(--calcite-ui-blue-hover);--calcite-switch-hover-track-background:#eaeaea;--calcite-switch-hover-track-border:#bfbfbf;--calcite-switch-switched-track-background:var(--calcite-ui-blue-hover);--calcite-switch-switched-track-border:var(--calcite-ui-blue-press);--calcite-switch-switched-handle-border:var(--calcite-ui-blue);--calcite-switch-switched-hover-track-background:var(--calcite-ui-blue);--calcite-switch-switched-hover-track-border:var(--calcite-ui-blue-hover);--calcite-switch-switched-hover-handle-border:var(--calcite-ui-blue-press);--calcite-switch-box-shadow-color:hsla(0,0%,45.9%,0.5);--calcite-switch-switched-box-shadow-color:rgba(0,122,194,0.5)}:host([theme=dark]){--calcite-switch-track-background:#353535;--calcite-switch-track-border:#555;--calcite-switch-handle-background:#2b2b2b;--calcite-switch-handle-border:#959595;--calcite-switch-hover-handle-border:var(--calcite-ui-blue-hover);--calcite-switch-hover-track-background:#404040;--calcite-switch-hover-track-border:grey;--calcite-switch-switched-track-background:var(--calcite-ui-blue-hover);--calcite-switch-switched-track-border:var(--calcite-ui-blue);--calcite-switch-switched-handle-border:var(--calcite-ui-blue);--calcite-switch-switched-hover-track-background:var(--calcite-ui-blue);--calcite-switch-switched-hover-track-border:var(--calcite-ui-blue);--calcite-switch-switched-hover-handle-border:var(--calcite-ui-blue-hover);--calcite-switch-switched-box-shadow-color:rgba(0,160,255,0.5)}:host([color=red]){--calcite-switch-switched-track-background:var(--calcite-ui-red-hover);--calcite-switch-switched-track-border:var(--calcite-ui-red);--calcite-switch-hover-handle-border:var(--calcite-ui-red-hover);--calcite-switch-switched-handle-border:var(--calcite-ui-red);--calcite-switch-switched-hover-track-background:var(--calcite-ui-red);--calcite-switch-switched-hover-track-border:var(--calcite-ui-red-hover);--calcite-switch-switched-hover-handle-border:var(--calcite-ui-red-press);--calcite-switch-switched-box-shadow-color:rgba(216,48,32,0.5)}:host([theme=dark][color=red]){--calcite-switch-switched-track-background:var(--calcite-ui-red-hover);--calcite-switch-switched-track-border:var(--calcite-ui-red);--calcite-switch-hover-handle-border:var(--calcite-ui-red-hover);--calcite-switch-switched-handle-border:var(--calcite-ui-red);--calcite-switch-switched-hover-track-background:var(--calcite-ui-red);--calcite-switch-switched-hover-track-border:var(--calcite-ui-red-press);--calcite-switch-switched-hover-handle-border:var(--calcite-ui-red-press);--calcite-switch-switched-box-shadow-color:rgba(254,88,62,0.5)}:host([scale=s]){--calcite-switch-track-width:28px;--calcite-switch-track-height:16px;--calcite-switch-handle-size:14px}:host([scale=m]){--calcite-switch-track-width:36px;--calcite-switch-track-height:20px;--calcite-switch-handle-size:18px}:host([scale=l]){--calcite-switch-track-width:44px;--calcite-switch-track-height:24px;--calcite-switch-handle-size:22px}::slotted(input){display:none}:host{display:inline-block;position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;top:-.1em;tap-highlight-color:transparent;margin-right:.5em}.track{position:relative;display:inline-block;vertical-align:top;width:var(--calcite-switch-track-width);height:var(--calcite-switch-track-height);background-color:var(--calcite-switch-track-background);border-radius:30px;border:1px solid var(--calcite-switch-track-border)}.handle,.track{pointer-events:none;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.handle{position:absolute;display:block;width:var(--calcite-switch-handle-size);height:var(--calcite-switch-handle-size);top:-1px;left:-1px;right:auto;background-color:var(--calcite-switch-handle-background);border-radius:30px;border:2px solid var(--calcite-switch-handle-border)}:host(:focus),:host(:hover){outline:none}:host(:focus) .track,:host(:hover) .track{background-color:var(--calcite-switch-hover-track-background);border-color:var(--calcite-switch-hover-track-border);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.08);box-shadow:0 0 16px 0 rgba(0,0,0,.08)}:host(:focus) .handle,:host(:hover) .handle{border-color:var(--calcite-switch-hover-handle-border);-webkit-box-shadow:0 0 8px 0 rgba(0,0,0,.08);box-shadow:0 0 8px 0 rgba(0,0,0,.08);right:auto}:host([switched]) .track{background-color:var(--calcite-switch-switched-track-background);border-color:var(--calcite-switch-switched-track-border)}:host([switched]) .handle{right:-1px;left:auto;border-color:var(--calcite-switch-switched-handle-border);-webkit-box-shadow:0 0 8px 0 rgba(0,0,0,.08);box-shadow:0 0 8px 0 rgba(0,0,0,.08)}:host([switched]:focus) .track{-webkit-box-shadow:0 0 6px 1px var(--calcite-switch-switched-box-shadow-color);box-shadow:0 0 6px 1px var(--calcite-switch-switched-box-shadow-color)}:host([switched]:hover) .track{background-color:var(--calcite-switch-switched-hover-track-background);border-color:var(--calcite-switch-switched-hover-track-border)}:host([switched]:hover) .handle{border-color:var(--calcite-switch-switched-hover-handle-border)}:host([dir=rtl]){margin-right:0;margin-left:.5em}:host([dir=rtl]) .handle{left:auto;right:-1px}:host([dir=rtl]:hover) .handle{right:1px;left:auto}:host([dir=rtl][switched]) .handle,:host([dir=rtl][switched]:active) .handle,:host([dir=rtl][switched]:focus) .handle{right:auto;left:-1px}"; },
        enumerable: true,
        configurable: true
    });
    return CalciteSwitch;
}());
export { CalciteSwitch as calcite_switch };
