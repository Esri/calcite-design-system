/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as u } from "./index2.js";
let n = 0, r = "";
const f = () => {
  function t() {
    n++, n === 1 && (r = document.documentElement.style.overflow, document.documentElement.style.overflow = "hidden");
  }
  function o() {
    n--, n === 0 && (document.documentElement.style.overflow = r);
  }
  return u((e, l) => {
    l.onConnected(() => {
      e.opened && e.preventDocumentScroll && t();
    }), l.onUpdate((d) => {
      e.hasUpdated && (d.has("opened") && e.preventDocumentScroll ? e.opened ? t() : o() : d.has("preventDocumentScroll") && e.opened && (e.preventDocumentScroll ? t() : o()));
    }), l.onDisconnected(() => {
      e.opened && e.preventDocumentScroll && o();
    });
  });
};
export {
  f as u
};
