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
import { h, r as registerInstance, c as createEvent, H as Host, g as getElement } from './core-2154eb68.js';
import { g as getElementDir } from './dom-e9ddd61f.js';
import { d as checkCircle24F, e as exclamationMarkTriangle24F, l as lightbulb24F, f as x32 } from './index-596f4e61.js';
import { c as createProviderConsumer } from './index-9ff8bd5c.js';
var AlertInterface = createProviderConsumer({
    currentAlert: "",
    queueLength: 0
}, function (subscribe, child) { return (h("context-consumer", { subscribe: subscribe, renderer: child })); });
var CalciteAlert = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** Is the alert currently active or not */
        this.active = false;
        /** Close the alert automatically (recommended for passive, non-blocking alerts) */
        this.dismiss = false;
        /** Length before autodismissal (only used with `dismiss`) */
        this.duration = this.dismiss
            ? "medium"
            : null;
        /** Color for the alert (will apply to top border and icon) */
        this.color = "blue";
        /** Select theme (light or dark) */
        this.theme = "light";
        /** If false, no icon will be shown in the alert */
        this.icon = false;
        /** Unique ID for this alert */
        /** @internal */
        this.alertId = this.el.id;
        /** @internal */
        this.currentAlert = "";
        /** @internal */
        this.queueLength = 0;
        this.durationDefaults = {
            slow: 14000,
            medium: 10000,
            fast: 6000
        };
        this.iconDefaults = {
            green: checkCircle24F,
            yellow: exclamationMarkTriangle24F,
            red: exclamationMarkTriangle24F,
            blue: lightbulb24F
        };
        this.calciteAlertClose = createEvent(this, "calciteAlertClose", 7);
        this.calciteAlertOpen = createEvent(this, "calciteAlertOpen", 7);
    }
    /** watch for changes to currentAlert passed from <calcite-alerts> */
    class_1.prototype.watchCurrentAlert = function () {
        var _this = this;
        if (!this.active && this.currentAlert === this.alertId) {
            if (this.dismiss)
                setTimeout(function () { return _this.closeCalciteAlert(); }, this.durationDefaults[this.duration]);
            setTimeout(function () { return (_this.active = true); }, 300);
        }
        else {
            this.active = false;
        }
    };
    /** emit the `calciteAlertClose` event - <calcite-alerts> listens for this */
    class_1.prototype.closeCalciteAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.calciteAlertClose.emit({ requestedAlert: this.alertId });
                return [2 /*return*/];
            });
        });
    };
    /**  emit the `calciteAlertOpen` event - <calcite-alerts> listens for this  */
    class_1.prototype.openCalciteAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.calciteAlertOpen.emit({ requestedAlert: this.alertId });
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.connectedCallback = function () {
        // prop validations
        var colors = ["blue", "red", "green", "yellow"];
        if (!colors.includes(this.color))
            this.color = "blue";
        var durations = ["slow", "medium", "fast"];
        if (this.duration !== null && !durations.includes(this.duration))
            this.duration = "medium";
        var themes = ["dark", "light"];
        if (!themes.includes(this.theme))
            this.theme = "light";
    };
    class_1.prototype.setIcon = function () {
        var path = this.iconDefaults[this.color];
        return (h("div", { class: "alert-icon" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 24 24" }, h("path", { d: path }))));
    };
    class_1.prototype.render = function () {
        var _this = this;
        var dir = getElementDir(this.el);
        var closeButton = (h("button", { class: "alert-close", "aria-label": "close", onClick: function () { return _this.closeCalciteAlert(); } }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "32", width: "32", viewBox: "0 0 32 32" }, h("path", { d: x32 }))));
        var close = !this.dismiss ? closeButton : "";
        var icon = this.icon ? this.setIcon() : "";
        var count = (h("div", { class: (this.queueLength > 0 ? "active " : "") + "alert-count" }, "+", this.queueLength > 0 ? this.queueLength : 1));
        var progress = this.active && this.dismiss ? h("div", { class: "alert-dismiss" }) : "";
        return (h(Host, { active: this.active, dir: dir }, icon, h("div", { class: "alert-content" }, h("slot", { name: "alert-title" }), h("slot", { name: "alert-message" }), h("slot", { name: "alert-link" })), count, close, progress));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "currentAlert": ["watchCurrentAlert"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-alert-background:#fff;--calcite-alert-title-text:#404040;--calcite-alert-message-text:#555;--calcite-alert-icon-fill:#151515;--calcite-alert-close-background-hover:#f3f3f3;--calcite-alert-close-background-pressed:#eaeaea;--calcite-alert-count-text:#404040;--calcite-alert-count-border:#f3f3f3;--calcite-alert-dismiss-background:hsla(0,0%,100%,0.8);--calcite-alert-border-blue:#007ac2;--calcite-alert-border-green:#35ac46;--calcite-alert-border-red:#d83020;--calcite-alert-border-yellow:#edd317}:host([theme=dark]){--calcite-alert-background:#2b2b2b;--calcite-alert-title-text:#f8f8f8;--calcite-alert-message-text:#f3f3f3;--calcite-alert-icon-fill:#d4d4d4;--calcite-alert-close-background-hover:#202020;--calcite-alert-close-background-pressed:#151515;--calcite-alert-count-text:#d4d4d4;--calcite-alert-count-border:#202020;--calcite-alert-dismiss-background:rgba(43,43,43,0.8);--calcite-alert-border-blue:#00a0ff;--calcite-alert-border-green:#36da43;--calcite-alert-border-red:#fe583e;--calcite-alert-border-yellow:#ffc900}:host{display:-ms-flexbox;display:flex;position:relative;-ms-flex-pack:center;justify-content:center;pointer-events:none;z-index:102;margin:0 auto;width:50em;max-width:90%;max-height:0;background-color:var(--calcite-alert-background);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15);border-radius:2px;opacity:0;-webkit-transform:translate3d(0,1.5rem,0);transform:translate3d(0,1.5rem,0);-webkit-transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;border-top:0 solid transparent}\@media only screen and (max-width:860px){:host{width:100%;max-width:100%;border-radius:2px 2px 0 0;-webkit-box-shadow:0 -8px 16px 0 rgba(0,0,0,.15);box-shadow:0 -8px 16px 0 rgba(0,0,0,.15)}}:host:host(.hydrated){visibility:hidden!important}:host([active]){opacity:1;max-height:100%;-webkit-transform:translate3d(0,-1.5rem,0);transform:translate3d(0,-1.5rem,0);pointer-events:auto;border-top-width:3px}:host([active]):host(.hydrated){visibility:visible!important}\@media only screen and (max-width:860px){:host([active]){-webkit-transform:translateZ(0);transform:translateZ(0)}}div::slotted([slot=alert-title]),slot[name=alert-title]::slotted(div){font-size:1rem;line-height:1.5;color:var(--calcite-alert-title-text);font-weight:500}::slotted(calcite-button){font-size:.9375rem;line-height:1.5}div::slotted([slot=alert-message]),slot[name=alert-message]::slotted(div){display:inline;margin-right:.75rem;font-size:.9375rem;line-height:1.5;color:var(--calcite-alert-message-text)}:host([dir=rtl]) div::slotted([slot=alert-message]),:host([dir=rtl]) slot[name=alert-message]::slotted(div){margin-right:unset;margin-left:.75rem}.alert-content{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;padding:.75rem .75rem .75rem 0}.alert-content svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-content{padding:1.5rem}}.alert-content:first-of-type{padding-left:1.5rem}\@media only screen and (max-width:860px){.alert-content{padding:1.5rem .75rem 1.5rem 0}}:host([dir=rtl]) .alert-content:first-of-type{padding-right:1.5rem;padding-left:none}\@media only screen and (max-width:860px){:host([dir=rtl]) .alert-content{padding:1.5rem 0 1.5rem .75rem}}.alert-icon{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.alert-icon svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-icon{padding:1.5rem}}.alert-close{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;border-radius:0 0 2px 0}.alert-close svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-close{padding:1.5rem}}.alert-close svg{fill:var(--calcite-alert-icon-fill)}.alert-close:focus,.alert-close:hover{background-color:var(--calcite-alert-close-background-hover)}.alert-close:active{background-color:var(--calcite-alert-close-background-pressed)}:host([dir=rtl]) .alert-close{border-radius:0 0 0 2px}\@media only screen and (max-width:860px){:host([dir=rtl]) .alert-close{border-radius:0}}.alert-count{font-size:.875rem;line-height:1.5;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around;overflow:hidden;width:0;visibility:hidden;font-weight:500;text-align:center;color:var(--calcite-alert-count-text);opacity:0;border-left:0 solid transparent;border-right:0 solid transparent;cursor:default;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.alert-count.active{visibility:visible;opacity:1;padding:0 .375rem;width:3rem;border-left:1px solid var(--calcite-alert-count-border);border-right:1px solid var(--calcite-alert-count-border)}.alert-count.active:last-child{border-right:0 solid transparent}\@media only screen and (max-width:860px){.alert-count{border-radius:0}}:host([dir=rtl]).active:last-child{border-left:1px solid var(--calcite-alert-count-border);border-right:0 solid transparent}.alert-dismiss{left:0;top:0;width:100%;z-index:103}.alert-dismiss,.alert-dismiss:after{display:block;position:absolute;right:0;height:3px}.alert-dismiss:after{top:-3px;border-radius:2px 2px 0 0;content:\"\";background-color:var(--calcite-alert-dismiss-background);z-index:104}:host([color=blue]){border-top-color:var(--calcite-alert-border-blue)}:host([color=blue]) .alert-icon svg{fill:var(--calcite-alert-border-blue)}:host([color=red]){border-top-color:var(--calcite-alert-border-red)}:host([color=red]) .alert-icon svg{fill:var(--calcite-alert-border-red)}:host([color=yellow]){border-top-color:var(--calcite-alert-border-yellow)}:host([color=yellow]) .alert-icon svg{fill:var(--calcite-alert-border-yellow)}:host([color=green]){border-top-color:var(--calcite-alert-border-green)}:host([color=green]) .alert-icon svg{fill:var(--calcite-alert-border-green)}:host([duration=fast]) .alert-dismiss:after{-webkit-animation:dismissProgress 6s ease-out;animation:dismissProgress 6s ease-out}:host([duration=medium]) .alert-dismiss:after{-webkit-animation:dismissProgress 10s ease-out;animation:dismissProgress 10s ease-out}:host([duration=slow]) .alert-dismiss:after{-webkit-animation:dismissProgress 14s ease-out;animation:dismissProgress 14s ease-out}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:.8}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:.8}to{width:100%;opacity:1}}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
AlertInterface.injectProps(CalciteAlert, ["currentAlert", "queueLength"]);
var CalciteAlerts = /** @class */ (function () {
    function CalciteAlerts(hostRef) {
        registerInstance(this, hostRef);
        this.currentAlert = "";
        this.active = false;
        this.alertQueue = [];
        this.calciteAlertsClose = createEvent(this, "calciteAlertsClose", 7);
        this.calciteAlertsOpen = createEvent(this, "calciteAlertsOpen", 7);
    }
    /** Adds the requested alert to the alert queue, if not present */
    CalciteAlerts.prototype.updateQueueOnOpen = function (event) {
        if (!this.alertQueue.includes(event.detail.requestedAlert)) {
            this.active = true;
            this.currentAlert = event.detail.requestedAlert;
            this.alertQueue.push(event.detail.requestedAlert);
            this.calciteAlertsOpen.emit({
                currentAlert: this.currentAlert,
                alertQueue: this.alertQueue
            });
        }
    };
    /** Closes the requested alert and removes from the queue, or removes from queue if not active */
    CalciteAlerts.prototype.updateQueueOnClose = function (event) {
        var _this = this;
        if (this.alertQueue.includes(event.detail.requestedAlert))
            this.alertQueue = this.alertQueue.filter(function (e) { return e !== event.detail.requestedAlert; });
        if (this.alertQueue.length < 1)
            setTimeout(function () {
                _this.active = false;
            }, 400);
        this.calciteAlertsClose.emit({
            currentAlert: this.currentAlert,
            alertQueue: this.alertQueue
        });
    };
    CalciteAlerts.prototype.componentWillUpdate = function () {
        this.currentAlert = this.alertQueue.length > 0 ? this.alertQueue[0] : "";
    };
    CalciteAlerts.prototype.render = function () {
        var alertState = {
            currentAlert: this.currentAlert,
            queueLength: this.alertQueue.length >= 2 ? this.alertQueue.length - 1 : 0
        };
        return (h(Host, { active: this.active }, h(AlertInterface.Provider, { state: alertState }, h("slot", null))));
    };
    Object.defineProperty(CalciteAlerts.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteAlerts, "style", {
        get: function () { return ":root{--calcite-global-ui-blue:#007ac2;--calcite-global-ui-blue-hover:#2890ce;--calcite-global-ui-blue-pressed:#00619b;--calcite-global-ui-green:#35ac46;--calcite-global-ui-green-hover:#50ba5f;--calcite-global-ui-green-pressed:#288835;--calcite-global-ui-yellow:#edd317;--calcite-global-ui-yellow-hover:#f9e54e;--calcite-global-ui-yellow-pressed:#d9bc00;--calcite-global-ui-red:#d83020;--calcite-global-ui-red-hover:#e65240;--calcite-global-ui-red-pressed:#a82b1e;--calcite-global-ui-background:#f8f8f8;--calcite-global-ui-foreground:#fff;--calcite-global-ui-foreground-hover:#f3f3f3;--calcite-global-ui-foreground-pressed:#eaeaea;--calcite-global-ui-text-1:#151515;--calcite-global-ui-text-2:#4a4a4a;--calcite-global-ui-text-3:#6a6a6a}:host([theme=dark]){--calcite-global-ui-blue-dark:$d-bb-420;--calcite-global-ui-blue-hover-dark:$d-bb-430;--calcite-global-ui-blue-pressed-dark:$d-bb-410;--calcite-global-ui-green-dark:$d-gg-420;--calcite-global-ui-green-hover-dark:$d-gg-430;--calcite-global-ui-green-pressed-dark:$d-gg-410;--calcite-global-ui-yellow-dark:$d-yy-420;--calcite-global-ui-yellow-hover-dark:$d-yy-430;--calcite-global-ui-yellow-pressed-dark:$d-yy-410;--calcite-global-ui-red-dark:$d-rr-420;--calcite-global-ui-red-hover-dark:$d-rr-430;--calcite-global-ui-red-pressed-dark:$d-rr-410;--calcite-global-ui-background-dark:$blk-210;--calcite-global-ui-foreground-dark:$blk-200;--calcite-global-ui-foreground-hover-dark:$blk-190;--calcite-global-ui-foreground-pressed-dark:$blk-180;--calcite-global-ui-text-1-dark:$blk-000;--calcite-global-ui-text-2-dark:$blk-060;--calcite-global-ui-text-3-dark:$blk-090}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{display:none;position:fixed;left:0;right:0;bottom:0;pointer-events:none;z-index:101}:host([active]){display:block}"; },
        enumerable: true,
        configurable: true
    });
    return CalciteAlerts;
}());
export { CalciteAlert as calcite_alert, CalciteAlerts as calcite_alerts };
