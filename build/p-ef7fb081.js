/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.7.0-next.17
 */
import{a as n}from"./p-7dfe275c.js";import{g as t}from"./p-c01c1e2d.js";const c={};async function s(t,s){const e=`${s}_${t}`;if(c[e]){return c[e]}c[e]=fetch(n(`./assets/${s}/t9n/messages_${t}.json`)).then((n=>{if(!n.ok){o()}return n.json()})).catch((()=>o()));return c[e]}function o(){throw new Error("could not fetch component message bundle")}function e(n){n.messages={...n.defaultMessages,...n.messageOverrides}}async function a(n){n.defaultMessages=await i(n,n.effectiveLocale);e(n)}async function i(n,c){const{el:o}=n;const e=o.tagName.toLowerCase();const a=e.replace("calcite-","");return s(t(c,"t9n"),a)}async function f(n,t){n.defaultMessages=await i(n,t);e(n)}function r(n){n.onMessagesChange=d}function u(n){n.onMessagesChange=undefined}function d(){e(this)}export{r as c,u as d,a as s,f as u};
//# sourceMappingURL=p-ef7fb081.js.map