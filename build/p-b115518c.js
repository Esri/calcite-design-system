/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0-next.9
 */
import{d as e,a as t}from"./p-073dd2e4.js";import{s as o}from"./p-a9daa695.js";import{i as s}from"./p-b19ebab6.js";function n(){const{classList:o}=document.body;const s=window.matchMedia("(prefers-color-scheme: dark)").matches;const n=()=>o.contains(e)||o.contains(t)&&s?"dark":"light";const r=e=>document.body.dispatchEvent(new CustomEvent("calciteModeChange",{bubbles:true,detail:{mode:e}}));const a=e=>{c!==e&&r(e);c=e};let c=n();r(c);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(e=>a(e.matches?"dark":"light")));new MutationObserver((()=>a(n()))).observe(document.body,{attributes:true,attributeFilter:["class"]})}function r(){if(s()){if(document.readyState==="interactive"){n()}else{document.addEventListener("DOMContentLoaded",(()=>n()),{once:true})}}o()}const a=r;export{a as g};
//# sourceMappingURL=p-b115518c.js.map