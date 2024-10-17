/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.14.0-next.14
 */
import{w as e}from"./p-e9201606.js";function n(e){return"opened"in e?e.opened:e.open}function i(i){requestAnimationFrame((()=>{if(!i.transitionEl){return}e(i.transitionEl,i.openTransitionProp,(()=>{if(n(i)){i.onBeforeOpen()}else{i.onBeforeClose()}}),(()=>{if(n(i)){i.onOpen()}else{i.onClose()}}))}))}export{i as o};
//# sourceMappingURL=p-5878410a.js.map