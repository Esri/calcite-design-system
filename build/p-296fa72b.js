/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.10.2-next.2
 */
const i=globalThis["calciteConfig"];const n=i?.focusTrapStack||[];const e="2.10.2-next.2";function o(){if(i&&i.version){console.warn(`[calcite-components] while initializing v${e}, an existing configuration with version "${i.version}" was found. This may cause unexpected behavior. The version will not be added to the existing global configuration.`);return}const n=i||globalThis["calciteConfig"]||{};Object.defineProperty(n,"version",{value:e,writable:false});globalThis["calciteConfig"]=n}export{n as f,o as s};
//# sourceMappingURL=p-296fa72b.js.map