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
import { g as getElementDir } from './dom-084e3cc4.js';
var TEXT = {
    intlClose: "close"
};
var calciteAlertCss = ":host([hidden]){display:none}:host{--calcite-alert-dismiss-progress-background:rgba(255, 255, 255, 0.8)}:host([theme=dark]){--calcite-alert-dismiss-progress-background:rgba(43, 43, 43, 0.8)}:host([scale=s]){--calcite-alert-width:40em;--calcite-alert-spacing-token-small:0.75rem;--calcite-alert-spacing-token-large:1rem}:host([scale=s]) slot[name=alert-title]::slotted(*),:host([scale=s]) *::slotted([slot=alert-title]){font-size:0.875rem;line-height:1.5}:host([scale=s]) slot[name=alert-message]::slotted(*),:host([scale=s]) *::slotted([slot=alert-message]){font-size:0.8125rem;line-height:1.5}:host([scale=s]) ::slotted(calcite-link){font-size:0.8125rem;line-height:1.5}:host([scale=m]){--calcite-alert-width:50em;--calcite-alert-spacing-token-small:1rem;--calcite-alert-spacing-token-large:1.5rem}:host([scale=m]) slot[name=alert-title]::slotted(*),:host([scale=m]) *::slotted([slot=alert-title]){font-size:0.9375rem;line-height:1.5}:host([scale=m]) slot[name=alert-message]::slotted(*),:host([scale=m]) *::slotted([slot=alert-message]){font-size:0.875rem;line-height:1.5}:host([scale=m]) ::slotted(calcite-link){font-size:0.875rem;line-height:1.5}:host([scale=l]){--calcite-alert-width:60em;--calcite-alert-spacing-token-small:1.2rem;--calcite-alert-spacing-token-large:1.875rem}:host([scale=l]) slot[name=alert-title]::slotted(*),:host([scale=l]) *::slotted([slot=alert-title]){font-size:1rem;line-height:1.5}:host([scale=l]) slot[name=alert-message]::slotted(*),:host([scale=l]) *::slotted([slot=alert-message]){font-size:0.9375rem;line-height:1.5}:host([scale=l]) ::slotted(calcite-link){font-size:0.9375rem;line-height:1.5}:host{display:-ms-flexbox;display:flex;position:fixed;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;pointer-events:none;margin:0 auto;width:var(--calcite-alert-width);max-width:90%;max-height:0;background-color:var(--calcite-ui-foreground-1);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:var(--calcite-border-radius);opacity:0;left:0;right:0;bottom:0;pointer-events:none;z-index:101;-webkit-transform:translate3d(0, 1.5rem, 0);transform:translate3d(0, 1.5rem, 0);-webkit-transition:300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;transition:300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;border-top:0px solid transparent}@media only screen and (max-width: 860px){:host{width:100%;max-width:100%;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}}.alert-close{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.alert-close:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host([active]:not([queued])){opacity:1;max-height:100%;-webkit-transform:translate3d(0, -1.5rem, 0);transform:translate3d(0, -1.5rem, 0);pointer-events:initial;border-top-width:3px}@media only screen and (max-width: 860px){:host([active]:not([queued])){-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}slot[name=alert-title]::slotted(*),*::slotted([slot=alert-title]){font-size:1rem;line-height:1.5;color:var(--calcite-ui-text-1);margin:0;font-weight:500}slot[name=alert-message]::slotted(*),*::slotted([slot=alert-message]){display:inline;margin:0;margin-right:0.75rem;font-weight:400;font-size:0.9375rem;line-height:1.5;color:var(--calcite-ui-text-2)}:host([dir=rtl]) slot[name=alert-message]::slotted(*),:host([dir=rtl]) *::slotted([slot=alert-message]){margin-right:unset;margin-left:0.75rem}.alert-content{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small) 0}@media only screen and (max-width: 860px){.alert-content{padding:1.5rem}}.alert-content:first-of-type:not(:only-child){padding-left:var(--calcite-alert-spacing-token-large)}.alert-content:only-child{padding:var(--calcite-alert-spacing-token-small)}@media only screen and (max-width: 860px){.alert-content{padding:var(--calcite-alert-spacing-token-large) var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large) 0}}:host([dir=rtl]) .alert-content{padding:var(--calcite-alert-spacing-token-small) 0 var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small)}:host([dir=rtl]) .alert-content:first-of-type:not(:only-child){padding-right:var(--calcite-alert-spacing-token-large)}@media only screen and (max-width: 860px){:host([dir=rtl]) .alert-content{padding:var(--calcite-alert-spacing-token-large) 0 var(--calcite-alert-spacing-token-large) var(--calcite-alert-spacing-token-small)}}.alert-icon{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;padding-top:0;padding-bottom:0;display:-ms-flexbox;display:flex;-ms-flex-item-align:stretch;align-self:stretch;-ms-flex-align:center;align-items:center}@media only screen and (max-width: 860px){.alert-icon{padding:1.5rem}}.alert-close{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;padding-top:0;padding-bottom:0;-ms-flex-item-align:stretch;align-self:stretch;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;color:var(--calcite-ui-text-3);overflow:hidden;border-radius:0 0 var(--calcite-border-radius) 0}@media only screen and (max-width: 860px){.alert-close{padding:1.5rem}}.alert-close:hover,.alert-close:focus{background-color:var(--calcite-ui-foreground-2)}.alert-close:active{background-color:var(--calcite-ui-foreground-3)}@media only screen and (max-width: 860px){.alert-close{border-radius:0}}:host([dir=rtl]) .alert-close{border-radius:0 0 0 var(--calcite-border-radius)}.alert-queue-count{font-size:0.875rem;line-height:1.5;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around;-ms-flex-item-align:stretch;align-self:stretch;overflow:hidden;width:0;visibility:hidden;font-weight:500;text-align:center;color:var(--calcite-ui-text-2);opacity:0;border-left:0px solid transparent;border-right:0px solid transparent;cursor:default;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;overflow:hidden}.alert-queue-count.active{visibility:visible;opacity:1;padding:0 0.375rem;width:3rem;border-left:1px solid var(--calcite-ui-border-3);border-right:1px solid var(--calcite-ui-border-3)}@media only screen and (max-width: 860px){.alert-queue-count{border-radius:0}}:host([auto-dismiss])>.alert-queue-count{border-right:0px solid transparent}:host([auto-dismiss][dir=rtl])>.alert-queue-count{border-left:0px solid transparent}.alert-dismiss-progress{display:block;position:absolute;left:0;right:0;top:-3px;width:100%;height:3px;z-index:103;overflow:hidden;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}.alert-dismiss-progress:after{height:3px;top:0;right:0;display:block;position:absolute;content:\"\";background-color:var(--calcite-alert-dismiss-progress-background);z-index:104}:host([dir=rtl]) .alert-dismiss-progress:after{left:0;right:initial}:host([color=blue]){border-top-color:var(--calcite-ui-blue-1)}:host([color=blue]) .alert-icon{color:var(--calcite-ui-blue-1)}:host([color=red]){border-top-color:var(--calcite-ui-red-1)}:host([color=red]) .alert-icon{color:var(--calcite-ui-red-1)}:host([color=yellow]){border-top-color:var(--calcite-ui-yellow-1)}:host([color=yellow]) .alert-icon{color:var(--calcite-ui-yellow-1)}:host([color=green]){border-top-color:var(--calcite-ui-green-1)}:host([color=green]) .alert-icon{color:var(--calcite-ui-green-1)}:host([auto-dismiss-duration=fast]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 6000ms ease-out;animation:dismissProgress 6000ms ease-out}:host([auto-dismiss-duration=medium]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 10000ms ease-out;animation:dismissProgress 10000ms ease-out}:host([auto-dismiss-duration=slow]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 14000ms ease-out;animation:dismissProgress 14000ms ease-out}@-webkit-keyframes dismissProgress{0%{width:0;opacity:0.8}100%{width:100%;opacity:1}}@keyframes dismissProgress{0%{width:0;opacity:0.8}100%{width:100%;opacity:1}}";
var CalciteAlert = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.calciteAlertClose = createEvent(this, "calciteAlertClose", 7);
        this.calciteAlertOpen = createEvent(this, "calciteAlertOpen", 7);
        this.calciteAlertSync = createEvent(this, "calciteAlertSync", 7);
        this.calciteAlertRegister = createEvent(this, "calciteAlertRegister", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //---------------------------------------------------------------------------
        /** Is the alert currently active or not */
        this.active = false;
        /** Close the alert automatically (recommended for passive, non-blocking alerts) */
        this.autoDismiss = false;
        /** Duration of autoDismiss (only used with `autoDismiss`) */
        this.autoDismissDuration = this
            .autoDismiss
            ? "medium"
            : null;
        /** Color for the alert (will apply to top border and icon) */
        this.color = "blue";
        /** specify the scale of the button, defaults to m */
        this.scale = "m";
        /** specify if the alert should display an icon */
        this.icon = false;
        /** string to override English close text */
        this.intlClose = TEXT.intlClose;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** the list of queued alerts */
        this.queue = [];
        /** the count of queued alerts */
        this.queueLength = 0;
        /** is the alert queued */
        this.queued = false;
        /** map dismissal durations */
        this.autoDismissDurations = {
            slow: 14000,
            medium: 10000,
            fast: 6000
        };
        /** map icon strings */
        this.iconDefaults = {
            green: "checkCircle",
            yellow: "exclamationMarkTriangle",
            red: "exclamationMarkTriangle",
            blue: "lightbulb"
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    class_1.prototype.connectedCallback = function () {
        // prop validations
        var colors = ["blue", "red", "green", "yellow"];
        if (!colors.includes(this.color))
            this.color = "blue";
        var scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        var durations = ["slow", "medium", "fast"];
        if (this.autoDismissDuration !== null && !durations.includes(this.autoDismissDuration)) {
            this.autoDismissDuration = "medium";
        }
        if (this.active && !this.queued)
            this.calciteAlertRegister.emit();
    };
    class_1.prototype.componentDidLoad = function () {
        this.alertLinkEl = this.el.querySelectorAll("calcite-link")[0];
    };
    class_1.prototype.watchActive = function () {
        var _this = this;
        if (this.active && !this.queued)
            this.calciteAlertRegister.emit();
        if (!this.active) {
            this.queue = this.queue.filter(function (e) { return e !== _this.el; });
            this.calciteAlertSync.emit({ queue: this.queue });
        }
    };
    class_1.prototype.render = function () {
        var _this = this;
        var dir = getElementDir(this.el);
        var closeButton = (h("button", { class: "alert-close", type: "button", "aria-label": this.intlClose, onClick: function () { return _this.closeAlert(); }, ref: function (el) { return (_this.closeButton = el); } }, h("calcite-icon", { icon: "x", scale: "m" })));
        var queueCount = (h("div", { class: (this.queueLength > 1 ? "active " : "") + "alert-queue-count" }, "+", this.queueLength > 2 ? this.queueLength - 1 : 1));
        var progress = h("div", { class: "alert-dismiss-progress" });
        var role = this.autoDismiss ? "alert" : "alertdialog";
        var hidden = this.active ? "false" : "true";
        return (h(Host, { active: this.active, queued: this.queued, role: role, dir: dir, "aria-hidden": hidden }, this.icon ? this.setIcon() : null, h("div", { class: "alert-content" }, h("slot", { name: "alert-title" }), h("slot", { name: "alert-message" }), h("slot", { name: "alert-link" })), queueCount, !this.autoDismiss ? closeButton : null, this.active && !this.queued && this.autoDismiss ? progress : null));
    };
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** focus either the slotted alert-link or the close button */
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (!this.closeButton && !this.alertLinkEl)
                    return [2 /*return*/];
                else if (this.alertLinkEl)
                    this.alertLinkEl.setFocus();
                else if (this.closeButton)
                    this.closeButton.focus();
                return [2 /*return*/];
            });
        });
    };
    // when an alert is opened or closed, update queue and determine active alert
    class_1.prototype.alertSync = function (event) {
        if (this.queue !== event.detail.queue) {
            this.queue = event.detail.queue;
        }
        this.queueLength = this.queue.length;
        this.determineActiveAlert();
    };
    // when an alert is first registered, trigger a queue sync to get queue
    class_1.prototype.alertRegister = function () {
        if (this.active && !this.queue.includes(this.el)) {
            this.queued = true;
            this.queue.push(this.el);
        }
        this.calciteAlertSync.emit({ queue: this.queue });
        this.determineActiveAlert();
    };
    /** emit the opened alert and the queue */
    class_1.prototype.openAlert = function () {
        var _this = this;
        setTimeout(function () { return (_this.queued = false); }, 300);
        this.calciteAlertOpen.emit({
            el: this.el,
            queue: this.queue
        });
    };
    /** close and emit the closed alert and the queue */
    class_1.prototype.closeAlert = function () {
        var _this = this;
        this.queued = false;
        this.active = false;
        this.queue = this.queue.filter(function (e) { return e !== _this.el; });
        this.determineActiveAlert();
        this.calciteAlertSync.emit({ queue: this.queue });
        this.calciteAlertClose.emit({
            el: this.el,
            queue: this.queue
        });
    };
    /** determine which alert is active */
    class_1.prototype.determineActiveAlert = function () {
        var _this = this;
        var _a;
        if (((_a = this.queue) === null || _a === void 0 ? void 0 : _a[0]) === this.el) {
            this.openAlert();
            if (this.autoDismiss) {
                setTimeout(function () { return _this.closeAlert(); }, this.autoDismissDurations[this.autoDismissDuration]);
            }
        }
        else
            return;
    };
    class_1.prototype.setIcon = function () {
        var path = this.iconDefaults[this.color];
        return (h("div", { class: "alert-icon" }, h("calcite-icon", { icon: path, scale: "m" })));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "active": ["watchActive"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
CalciteAlert.style = calciteAlertCss;
export { CalciteAlert as calcite_alert };
