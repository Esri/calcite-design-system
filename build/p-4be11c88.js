/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.14.0-next.14
 */
import{d as e,a as t}from"./p-5a099211.js";import{s as o}from"./p-8d9e577e.js";import{i as s}from"./p-86450c53.js";function n(){const{classList:o}=document.body;const s=window.matchMedia("(prefers-color-scheme: dark)").matches;const n=()=>o.contains(e)||o.contains(t)&&s?"dark":"light";const r=e=>document.body.dispatchEvent(new CustomEvent("calciteModeChange",{bubbles:true,detail:{mode:e}}));const c=e=>{a!==e&&r(e);a=e};let a=n();r(a);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(e=>c(e.matches?"dark":"light")));new MutationObserver((()=>c(n()))).observe(document.body,{attributes:true,attributeFilter:["class"]})}function r(){if(s()){if(document.readyState==="interactive"){n()}else{document.addEventListener("DOMContentLoaded",(()=>n()),{once:true})}}o()}const c=r;export{c as g};
//# sourceMappingURL=p-4be11c88.js.map