/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0-next.9
 */
import{a as n}from"./p-a1b5fdc3.js";import{g as t}from"./p-5e998251.js";import{i as s}from"./p-b19ebab6.js";const o={};async function c(t,s){const c=`${s}_${t}`;if(o[c]){return o[c]}o[c]=fetch(n(`./assets/${s}/t9n/messages_${t}.json`)).then((n=>{if(!n.ok){a()}return n.json()})).catch((()=>a()));return o[c]}function a(){throw new Error("could not fetch component message bundle")}function i(n){n.messages={...n.defaultMessages,...n.messageOverrides}}function r(){}async function e(n){n.defaultMessages=await f(n,n.effectiveLocale);i(n)}async function f(n,o){if(!s()){return{}}const{el:a}=n;const i=a.tagName.toLowerCase();const r=i.replace("calcite-","");return c(t(o,"t9n"),r)}async function u(n,t){n.defaultMessages=await f(n,t);i(n)}function m(n){n.onMessagesChange=b}function p(n){n.onMessagesChange=r}function b(){i(this)}export{m as c,p as d,e as s,u};
//# sourceMappingURL=p-83cd0151.js.map