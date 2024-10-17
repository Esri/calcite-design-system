/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.14.0-next.14
 */
import{h as n}from"./p-1381b46f.js";function t(){const{disabled:n}=this;if(!n){HTMLElement.prototype.click.call(this)}}function i(n){const t=n.target;if(t.disabled){n.preventDefault()}}const o=["mousedown","mouseup","click"];function c(n){const t=n.target;if(t.disabled){n.stopImmediatePropagation();n.preventDefault()}}const e={capture:true};function s(n){if(n.disabled){n.el.setAttribute("aria-disabled","true");if(n.el.contains(document.activeElement)){document.activeElement.blur()}u(n);return}a(n);n.el.removeAttribute("aria-disabled")}function u(n){n.el.click=t;r(n.el)}function r(n){n.addEventListener("pointerdown",i,e);o.forEach((t=>n.addEventListener(t,c,e)))}function a(n){delete n.el.click;d(n.el)}function d(n){n.removeEventListener("pointerdown",i,e);o.forEach((t=>n.removeEventListener(t,c,e)))}const f={container:"interaction-container"};const l=({disabled:t},i)=>n("div",{class:f.container,inert:t},...i);export{l as I,s as u};
//# sourceMappingURL=p-606c0801.js.map