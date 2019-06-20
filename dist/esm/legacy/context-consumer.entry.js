import { d as registerInstance, h as getElement } from './calcite-22a6f87b.js';
var ContextConsumer = /** @class */ (function () {
    function ContextConsumer(hostRef) {
        registerInstance(this, hostRef);
        this.context = {};
        this.renderer = function () { return null; };
    }
    ContextConsumer.prototype.componentWillLoad = function () {
        var _this = this;
        this.unsubscribe = function () {
            if (_this.subscribe != null) {
                _this.subscribe(_this.el, 'context');
            }
        };
    };
    ContextConsumer.prototype.componentDidUnload = function () {
        if (this.unsubscribe != null) {
            this.unsubscribe();
        }
    };
    ContextConsumer.prototype.render = function () {
        return this.renderer(Object.assign({}, this.context));
    };
    Object.defineProperty(ContextConsumer.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return ContextConsumer;
}());
export { ContextConsumer as context_consumer };
