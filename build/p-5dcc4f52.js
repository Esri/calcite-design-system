/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0-next.9
 */
import{i as t}from"./p-b19ebab6.js";function n(n,i,e){if(!t()){return undefined}const r=s(n);return new r(i,e)}function s(t){class n extends window.MutationObserver{constructor(t){super(t);this.observedEntry=[];this.callback=t}observe(t,n){this.observedEntry.push({target:t,options:n});return super.observe(t,n)}unobserve(t){const n=this.observedEntry.filter((n=>n.target!==t));this.observedEntry=[];this.callback(super.takeRecords(),this);this.disconnect();n.forEach((t=>this.observe(t.target,t.options)))}}return function(){return t==="intersection"?window.IntersectionObserver:t==="mutation"?n:window.ResizeObserver}()}export{n as c};
//# sourceMappingURL=p-5dcc4f52.js.map