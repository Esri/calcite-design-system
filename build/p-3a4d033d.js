/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0-next.9
 */
const n=new Set(["Europe","Asia","America","America/Argentina","Africa","Australia","Pacific","Atlantic","Antarctica","Arctic","Indian"]);function t(n,t=false){if(n.includes("Istanbul")){return"Europe"}const a=t?"indexOf":"lastIndexOf";const i=n[a]("/");return i===-1?n:n.slice(0,i)}function a(t){return n.has(t)}export{t as e,a as i};
//# sourceMappingURL=p-3a4d033d.js.map