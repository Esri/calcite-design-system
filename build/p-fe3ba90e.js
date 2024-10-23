/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.14.0-next.17
 */
import{f as n}from"./p-433a4cd1.js";import{i as a}from"./p-19831888.js";const e=new WeakMap;const r=new WeakMap;function s(n){r.set(n,new Promise((a=>e.set(n,a))))}function t(n){e.get(n)()}function o(n){return r.get(n)}async function i(e){await o(e);if(!a()){return}n(e);return new Promise((n=>requestAnimationFrame((()=>n()))))}export{t as a,o as b,i as c,s};
//# sourceMappingURL=p-fe3ba90e.js.map