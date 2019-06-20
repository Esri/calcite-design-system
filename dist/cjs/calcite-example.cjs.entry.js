'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./calcite-8834ad67.js');

class CalciteExample {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        /**
         * Be sure to add a jsdoc comment describing your propery for the generated readme file.
         * If your property should be hidden from documentation, you can use the `@internal` tag
         */
        this.property = "default";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        this.state = "default";
        this.open = __chunk_1.createEvent(this, "open", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillUpdate() { }
    render() {
        console.log(this.state);
        return __chunk_1.h(__chunk_1.Host, null);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick(e) {
        console.log(e);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Add a jsdoc comment describing your method and it's parameters (use `@param`).
     */
    async doThing() {
        return Promise.resolve(this.privateMethod());
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    privateMethod() { }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}calcite-tabs{display:block}"; }
}

exports.calcite_example = CalciteExample;
