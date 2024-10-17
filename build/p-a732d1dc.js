/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.14.0-next.14
 */
import{timeZones as t}from"./p-8ac85fdb.js";import{extractRegion as n}from"./p-66acccfa.js";import"./p-a182db6d.js";const o=t=>t.map((t=>{const{label:o}=t;const c=n(o);return{...t,continent:c}}));async function c(){const n=[];const c=t.map((t=>({label:t})));const e=o(c);for(const t of e){const{label:o,continent:c}=t;if(t.visited){continue}t.visited=true;const s={label:c,tzs:[{label:o}]};for(const t of e.filter((t=>!t.visited))){const{label:n,continent:o}=t;if(c===o){const o={label:n};s.tzs.push(o);t.visited=true}}n.push(s)}return n.map((t=>{t.tzs=t.tzs.sort(((t,n)=>t.label.localeCompare(n.label)));return{label:t.label,tzs:t.tzs.map((t=>t.label))}})).sort(((t,n)=>t.label.localeCompare(n.label)))}export{c as groupByRegion};
//# sourceMappingURL=p-a732d1dc.js.map