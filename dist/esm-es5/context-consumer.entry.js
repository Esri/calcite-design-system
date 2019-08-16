import { r as registerInstance, g as getElement } from './core-2b8c2af5.js';
var ContextConsumer = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.context = {};
        this.renderer = function () { return null; };
    }
    class_1.prototype.connectedCallback = function () {
        if (this.subscribe != null) {
            this.unsubscribe = this.subscribe(this.el, 'context');
        }
    };
    class_1.prototype.disconnectedCallback = function () {
        if (this.unsubscribe != null) {
            this.unsubscribe();
        }
    };
    class_1.prototype.render = function () {
        return this.renderer(Object.assign({}, this.context));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { ContextConsumer as context_consumer };
