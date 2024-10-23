/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.14.0-next.17
 */
import{d as t,a as e}from"./p-a65a9581.js";import{s as o}from"./p-2fd8d2bb.js";import{i as s}from"./p-19831888.js";function n(){const{classList:o}=document.body;const s=window.matchMedia("(prefers-color-scheme: dark)").matches;const n=()=>o.contains(t)||o.contains(e)&&s?"dark":"light";const r=t=>document.body.dispatchEvent(new CustomEvent("calciteModeChange",{bubbles:true,detail:{mode:t}}));const c=t=>{a!==t&&r(t);a=t};let a=n();r(a);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(t=>c(t.matches?"dark":"light")));new MutationObserver((()=>c(n()))).observe(document.body,{attributes:true,attributeFilter:["class"]})}function r(){if(s()){if(document.readyState==="interactive"){n()}else{document.addEventListener("DOMContentLoaded",(()=>n()),{once:true})}}o()}const c=r;export{c as g};
//# sourceMappingURL=p-ee1de8ab.js.map