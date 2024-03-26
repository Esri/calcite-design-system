/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.7.0-next.17
 */
import{d as e,a as t}from"./p-95e72c17.js";function o(){const{classList:o}=document.body;const n=window.matchMedia("(prefers-color-scheme: dark)").matches;const c=()=>o.contains(e)||o.contains(t)&&n?"dark":"light";const d=e=>document.body.dispatchEvent(new CustomEvent("calciteModeChange",{bubbles:true,detail:{mode:e}}));const i=e=>{s!==e&&d(e);s=e};let s=c();d(s);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(e=>i(e.matches?"dark":"light")));new MutationObserver((()=>i(c()))).observe(document.body,{attributes:true,attributeFilter:["class"]})}function n(){const e=typeof window!=="undefined"&&typeof location!=="undefined"&&typeof document!=="undefined"&&window.location===location&&window.document===document;if(e){if(document.readyState==="interactive"){o()}else{document.addEventListener("DOMContentLoaded",(()=>o()),{once:true})}}}const c=n;export{c as g};
//# sourceMappingURL=p-cc4186ee.js.map