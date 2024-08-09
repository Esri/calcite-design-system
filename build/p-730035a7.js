/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0-next.9
 */
const t=["date","datetime-local","month","number","range","time","week"];const e=["email","password","search","tel","text","url"];const n=["email","password","search","tel","text","textarea","url"];function s(t,e,n,s){const a=n.toLowerCase();const o=t[n];if(s&&o!=null){e.setAttribute(a,`${o}`)}else{e.removeAttribute(a)}}function a(a,o,c){c.type=a==="textarea"?"text":a;const r=t.includes(a);const l=o;s(l,c,"min",r);s(l,c,"max",r);s(l,c,"step",r);const m=n.includes(a);const i=o;s(i,c,"minLength",m);s(i,c,"maxLength",m);const x=e.includes(a);s(i,c,"pattern",x)}export{a as s};
//# sourceMappingURL=p-730035a7.js.map