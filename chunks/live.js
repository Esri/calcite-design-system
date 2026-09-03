/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { e as s, i as T, t, r as l, E as n, A as p, p as u } from "./index.js";
const c = s(class extends T {
  constructor(e) {
    if (super(e), e.type !== t.PROPERTY && e.type !== t.ATTRIBUTE && e.type !== t.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!l(e)) throw Error("`live` bindings can only contain a single expression");
  }
  render(e) {
    return e;
  }
  update(e, [r]) {
    if (r === n || r === p) return r;
    const i = e.element, o = e.name;
    if (e.type === t.PROPERTY) {
      if (r === i[o]) return n;
    } else if (e.type === t.BOOLEAN_ATTRIBUTE) {
      if (!!r === i.hasAttribute(o)) return n;
    } else if (e.type === t.ATTRIBUTE && i.getAttribute(o) === r + "") return n;
    return u(e), r;
  }
});
export {
  c as l
};
