/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as s } from "./index2.js";
const d = (l) => s((e) => {
  function i(r) {
    const { form: t } = e.elementInternals;
    if (!(r.defaultPrevented || e.disabled || l?.disabled?.() || !t || e.type === "button")) {
      if (e.type === "submit") {
        t.requestSubmit();
        return;
      }
      t.reset();
    }
  }
  e.listen("luminaFormAssociatedCallback", ({ detail: [r] }) => {
    r ? e.el.addEventListener("click", i) : e.el.removeEventListener("click", i);
  });
});
export {
  d as u
};
