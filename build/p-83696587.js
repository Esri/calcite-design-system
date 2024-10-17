/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.14.0-next.14
 */
import{f as n}from"./p-1381b46f.js";import{i as a}from"./p-86450c53.js";const e=new WeakMap;const r=new WeakMap;function s(n){r.set(n,new Promise((a=>e.set(n,a))))}function t(n){e.get(n)()}function o(n){return r.get(n)}async function i(e){await o(e);if(!a()){return}n(e);return new Promise((n=>requestAnimationFrame((()=>n()))))}export{t as a,o as b,i as c,s};
//# sourceMappingURL=p-83696587.js.map