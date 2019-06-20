var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
import { f as h, d as registerInstance, e as createEvent, g as Host, h as getElement } from './calcite-22a6f87b.js';
// File generated automatically by path-data.js, do not edit directly
var checkCircle24F = "M23 11.5A11.5 11.5 0 1 1 11.5 0 11.5 11.5 0 0 1 23 11.5zm-5.5-6.018l-8.5 8.5-3.5-3.5-2 2L9.018 18l.018-.018L11.018 16l8.5-8.5z";
var exclamationMarkTriangle24F = "M22.3 19.795l-9-17.901a1.5 1.5 0 0 0-2.597 0L1.7 19.795a1.502 1.502 0 0 0 0 1.502A1.456 1.456 0 0 0 2.998 22H21a1.458 1.458 0 0 0 1.299-.703 1.506 1.506 0 0 0 .001-1.502zM13 19h-2v-2h2zm0-3h-2V8h2z";
var lightbulb24F = "M11 13h1v4h-1zm3.895 5.45a.311.311 0 0 0-.12-.27l-.232-.18h-6.19l-.232.18a.312.312 0 0 0 .04.518l1.387.771-1.367.76a.311.311 0 0 0-.028.526l3.09 2.18a.356.356 0 0 0 .41 0l3.09-2.18a.311.311 0 0 0-.029-.527l-1.366-.759 1.388-.77a.312.312 0 0 0 .159-.25zM11.59 0l-.173.002L11.244 0a6.2 6.2 0 0 0-6.182 6.698c.31 2.575 2.784 5.207 2.939 6.134.13.78.116 1.844.199 2.472A2.542 2.542 0 0 0 9.088 17H10v-4.412L8.83 9.37l.94-.342L10.85 12h1.3l1.08-2.97.94.341L13 12.588V17h.745a2.542 2.542 0 0 0 .889-1.696c.083-.628.068-1.692.199-2.472.154-.927 2.628-3.559 2.938-6.134A6.2 6.2 0 0 0 11.59 0z";
var x32 = "M16.707 16l10.607 10.606-.708.707L16 16.707 5.394 27.313l-.708-.707L15.293 16 4.686 5.394l.708-.707L16 15.293 26.606 4.687l.708.707z";
var createProviderConsumer = function (defaultState, consumerRender) {
    var listeners = new Map();
    var currentState = defaultState;
    var updateListener = function (fields, instance) {
        if (Array.isArray(fields)) {
            fields.slice().forEach(function (fieldName) {
                instance[fieldName] = currentState[fieldName];
            });
        }
        else {
            instance[fields] = Object.assign({}, currentState);
        }
    };
    var subscribe = function (instance, propList) {
        if (!listeners.has(instance)) {
            listeners.set(instance, propList);
            updateListener(propList, instance);
        }
    };
    var Provider = function (_a, children) {
        var state = _a.state;
        currentState = state;
        listeners.forEach(updateListener);
        return children;
    };
    var Consumer = function (props, children) {
        // The casting on subscribe is to allow for crossover through the stencil compiler
        // In the future we should allow for generics in components.
        return consumerRender(subscribe, children[0]);
    };
    var injectProps = function (Cstr, fieldList) {
        var CstrPrototype = Cstr.prototype;
        var cstrComponentWillLoad = CstrPrototype.componentWillLoad;
        var cstrComponentDidUnload = CstrPrototype.componentDidUnload;
        CstrPrototype.componentWillLoad = function () {
            subscribe(this, fieldList);
            if (cstrComponentWillLoad) {
                return cstrComponentWillLoad.call(this);
            }
        };
        CstrPrototype.componentDidUnload = function () {
            listeners.delete(this);
            if (cstrComponentDidUnload) {
                cstrComponentDidUnload.call(this);
            }
        };
    };
    return {
        Provider: Provider,
        Consumer: Consumer,
        injectProps: injectProps
    };
};
var AlertInterface = createProviderConsumer({
    currentAlert: "",
    queueLength: 0
}, function (subscribe, child) { return (h("context-consumer", { subscribe: subscribe, renderer: child })); });
/** Alerts are not meant to be used inline with content, or be present in view on page load.
 * As such, calcite-alert relies on calcite-alerts for positioning - displaying an alert on its own
 * will lead to unexpected and potentially undesireable results
 */
/**
 * @slot alert-title - Title of the alert (optional)
 * @slot alert-message - Main text of the alert
 * @slot alert-link - Optional action to take from the alert (undo, try again, etc.)
 */
var CalciteAlert = /** @class */ (function () {
    function CalciteAlert(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Is the alert currently active or not
         */
        this.active = false;
        /**
         * Close the alert automatically (recommended for passive, non-blocking alerts)
         */
        this.dismiss = false;
        /**
         * Length before autodismissal (only used with `dismiss`)
         */
        this.duration = this.dismiss
            ? "medium"
            : null;
        /**
         * Color for the alert (will apply to top border and icon)
         */
        this.color = "blue";
        /**
         * Select theme (light or dark)
         */
        this.theme = "light";
        /**
         * If false, no icon will be shown in the alert
         */
        this.icon = false;
        /**
         * Unique ID for this alert
         */
        this.id = "1";
        /**
         * @internal
         */
        this.currentAlert = "";
        /**
         * @internal
         */
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
    /**
     * watch for changes to currentAlert passed from <calcite-alerts>
     */
    CalciteAlert.prototype.watchCurrentAlert = function () {
        var _this = this;
        this.active = this.currentAlert === this.id;
        if (this.active)
            this.openCalciteAlert();
        if (this.active && this.dismiss)
            setTimeout(function () { return _this.closeCalciteAlert(); }, this.durationDefaults[this.duration]);
    };
    /**
     * emit the `calciteAlerClose` event - <calcite-alerts> listens for this, if the alert is not active, but is the queue, this will remove it from the queue
     */
    CalciteAlert.prototype.closeCalciteAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.calciteAlertClose.emit(this.id);
                return [2 /*return*/];
            });
        });
    };
    /**
     * emit the `calciteAlertOpen` event - <calcite-alerts> listens for this, and determines if it should open the alert or add it to the queue
     */
    CalciteAlert.prototype.openCalciteAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.calciteAlertOpen.emit(this.id);
                return [2 /*return*/];
            });
        });
    };
    CalciteAlert.prototype.connectedCallback = function () {
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
    CalciteAlert.prototype.setIcon = function () {
        var path = this.iconDefaults[this.color];
        return (h("div", { class: "alert-icon" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 24 24" }, h("path", { d: path }))));
    };
    CalciteAlert.prototype.render = function () {
        var _this = this;
        var closeButton = (h("button", { class: "alert-close", "aria-label": "close", onClick: function () { return _this.closeCalciteAlert(); } }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "32", width: "32", viewBox: "0 0 32 32" }, h("path", { d: x32 }))));
        var close = !this.dismiss ? closeButton : "";
        var icon = this.icon ? this.setIcon() : "";
        var count = (h("div", { class: (this.queueLength > 0 ? "active " : "") + "alert-count" }, "+", this.queueLength > 0 ? this.queueLength : 1));
        var progress = this.active && this.dismiss ? h("div", { class: "alert-dismiss" }) : "";
        return (h(Host, { theme: this.theme, active: !!this.active, duration: this.duration }, icon, h("div", { class: "alert-content" }, h("slot", { name: "alert-title" }), h("slot", { name: "alert-message" }), h("slot", { name: "alert-link" })), count, close, progress));
    };
    Object.defineProperty(CalciteAlert.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteAlert, "watchers", {
        get: function () {
            return {
                "currentAlert": ["watchCurrentAlert"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteAlert, "style", {
        get: function () { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}calcite-tabs{display:block}:host{display:-ms-flexbox;display:flex;position:relative;-ms-flex-pack:center;justify-content:center;pointer-events:none;z-index:102;margin:0 auto;width:50em;max-width:90%;max-height:0;background-color:#fff;-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15);border-radius:2px;opacity:0;-webkit-transform:translate3d(0,1.5rem,0);transform:translate3d(0,1.5rem,0);-webkit-transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;-webkit-border-before:0 solid transparent;border-block-start:0 solid transparent}\@media only screen and (max-width:860px){:host{max-width:100%;border-radius:2px 2px 0 0;-webkit-box-shadow:0 -8px 16px 0 rgba(0,0,0,.15);box-shadow:0 -8px 16px 0 rgba(0,0,0,.15)}}:host:host([active]){visibility:visible;opacity:1;max-height:100%;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transform:translate3d(0,-1.5rem,0);transform:translate3d(0,-1.5rem,0);pointer-events:auto;border-block-start-width:3px}\@media only screen and (max-width:860px){:host:host([active]){-webkit-transform:translateZ(0);transform:translateZ(0)}}:host slot[name=alert-title]::slotted(div){font-size:1rem;line-height:1.5;font-weight:500}:host slot[name=alert-link]::slotted(a){font-size:.9375rem;line-height:1.5;color:#007ac2;margin-left:.75rem}:host slot[name=alert-message]::slotted(div){font-size:.9375rem;line-height:1.5;color:#555;display:inline}.alert-content{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;-webkit-padding-before:.75rem;padding-block-start:.75rem;-webkit-padding-after:.75rem;padding-block-end:.75rem;-webkit-padding-end:.75rem;padding-inline-end:.75rem;-webkit-padding-start:0;padding-inline-start:0}.alert-content svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-content{padding:1.5rem}}.alert-content:first-of-type{-webkit-padding-start:1.5rem;padding-inline-start:1.5rem}\@media only screen and (max-width:860px){.alert-content{-webkit-padding-before:1.5rem;padding-block-start:1.5rem;-webkit-padding-after:1.5rem;padding-block-end:1.5rem;-webkit-padding-end:.75rem;padding-inline-end:.75rem;-webkit-padding-start:0;padding-inline-start:0}}.alert-icon{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.alert-icon svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-icon{padding:1.5rem}}.alert-close{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;border-radius:0 0 2px 0}.alert-close svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-close{padding:1.5rem}}.alert-close svg{fill:#151515}.alert-close:focus,.alert-close:hover{background-color:#f3f3f3}.alert-close:active{background-color:#eaeaea}.alert-close:last-child{border-radius:0 0 2px 0}\@media only screen and (max-width:860px){.alert-close{border-radius:0}}.alert-count{font-size:.875rem;line-height:1.5;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:space-evenly;justify-content:space-evenly;overflow:hidden;width:0;visibility:hidden;font-weight:500;text-align:center;color:#404040;opacity:0;-webkit-border-start:0 solid transparent;border-inline-start:0 solid transparent;-webkit-border-end:0 solid transparent;border-inline-end:0 solid transparent;cursor:default;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.alert-count.active{visibility:visible;-webkit-transition-delay:.3s;transition-delay:.3s;opacity:1;padding:0 .375rem;width:3rem;-webkit-border-start:1px solid #f3f3f3;border-inline-start:1px solid #f3f3f3;-webkit-border-end:1px solid #f3f3f3;border-inline-end:1px solid #f3f3f3}.alert-count.active:last-child{-webkit-border-end:0 solid transparent;border-inline-end:0 solid transparent}\@media only screen and (max-width:860px){.alert-count{border-radius:0}}.alert-dismiss{left:0;top:0;width:100%;z-index:103}.alert-dismiss,.alert-dismiss:after{display:block;position:absolute;right:0;height:3px}.alert-dismiss:after{top:-3px;border-radius:2px 2px 0 0;content:\"\";background-color:hsla(0,0%,100%,.6);-webkit-transition:all .3s linear;transition:all .3s linear;z-index:104}:host([theme=dark]){background-color:#2b2b2b}:host([theme=dark]) slot[name=alert-title]::slotted(div){color:#f8f8f8}:host([theme=dark]) slot[name=alert-message]::slotted(div){color:#f3f3f3}:host([theme=dark]) .alert-close svg{fill:#d4d4d4}:host([theme=dark]) .alert-close:focus,:host([theme=dark]) .alert-close:hover{background-color:#202020}:host([theme=dark]) .alert-close:active{background-color:#151515}:host([theme=dark]) .alert-count{color:#d4d4d4}:host([theme=dark]) .alert-count.active{border-left:1px solid #202020;border-right:1px solid #202020}:host([theme=dark]) .alert-dismiss:after{background-color:rgba(43,43,43,.6)}:host([dir=rtl]) .alert-close:last-child{border-radius:0 0 0 2px}:host([dir=rtl]) slot[name=alert-link]::slotted(a){margin-left:unset;margin-right:.75rem}:host([color=blue]){border-block-start-color:#007ac2}:host([color=blue]) .alert-icon svg{fill:#007ac2}:host([color=red]){border-block-start-color:#d83020}:host([color=red]) .alert-icon svg{fill:#d83020}:host([color=yellow]){border-block-start-color:#edd317}:host([color=yellow]) .alert-icon svg{fill:#edd317}:host([color=green]){border-block-start-color:#35ac46}:host([color=green]) .alert-icon svg{fill:#35ac46}:host([duration=fast]) .alert-dismiss:after{-webkit-animation:dismissProgress 6s linear;animation:dismissProgress 6s linear}:host([duration=medium]) .alert-dismiss:after{-webkit-animation:dismissProgress 10s linear;animation:dismissProgress 10s linear}:host([duration=slow]) .alert-dismiss:after{-webkit-animation:dismissProgress 14s linear;animation:dismissProgress 14s linear}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}"; },
        enumerable: true,
        configurable: true
    });
    return CalciteAlert;
}());
AlertInterface.injectProps(CalciteAlert, ["currentAlert", "queueLength"]);
var CalciteAlerts = /** @class */ (function () {
    function CalciteAlerts(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Unique ID for this instance of calcite-alerts
         */
        this.id = "1";
        this.currentAlert = "";
        this.active = false;
        this.alertQueue = [];
        this.calciteAlertsClose = createEvent(this, "calciteAlertsClose", 7);
        this.calciteAlertsOpen = createEvent(this, "calciteAlertsOpen", 7);
    }
    /**
     * Adds the requested alert to the alert queue, if not present
     */
    CalciteAlerts.prototype.updateQueueOnOpen = function (event) {
        var requestedAlert = event.target.id;
        if (!this.alertQueue.includes(requestedAlert)) {
            this.active = true;
            this.currentAlert = requestedAlert;
            this.alertQueue.push(requestedAlert);
            this.calciteAlertsOpen.emit({
                id: this.id,
                currentAlert: this.currentAlert,
                alertQueue: this.alertQueue
            });
        }
    };
    /**
     * Closes the requested alert and removes from the queue
     */
    CalciteAlerts.prototype.updateQueueOnClose = function (event) {
        var _this = this;
        var requestedAlert = event.target.id;
        if (this.alertQueue.includes(requestedAlert))
            this.alertQueue = this.alertQueue.filter(function (e) { return e !== requestedAlert; });
        if (this.alertQueue.length < 1)
            setTimeout(function () {
                _this.active = false;
            }, 300);
        this.calciteAlertsClose.emit({
            id: this.id,
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
        return (h(Host, { active: !!this.active }, h(AlertInterface.Provider, { state: alertState }, h("slot", null))));
    };
    Object.defineProperty(CalciteAlerts.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteAlerts, "style", {
        get: function () { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}calcite-tabs{display:block}:host{display:none;position:fixed;left:0;right:0;bottom:0;pointer-events:none;z-index:101}:host:host([active]){display:block}"; },
        enumerable: true,
        configurable: true
    });
    return CalciteAlerts;
}());
export { CalciteAlert as calcite_alert, CalciteAlerts as calcite_alerts };
