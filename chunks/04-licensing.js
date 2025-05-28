import { j as Z, M as a, e as B } from "./index2.js";
import { useMDXComponents as X } from "./index3.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.10 */
const b = "data:text/markdown;base64,IyBMaWNlbnNpbmcKCkNPUFlSSUdIVCDCqSAyMDI1IEVzcmkKCkFsbCByaWdodHMgcmVzZXJ2ZWQgdW5kZXIgdGhlIGNvcHlyaWdodCBsYXdzIG9mIHRoZSBVbml0ZWQgU3RhdGVzIGFuZCBhcHBsaWNhYmxlIGludGVybmF0aW9uYWwgbGF3cywgdHJlYXRpZXMsIGFuZCBjb252ZW50aW9ucy4KClRoaXMgbWF0ZXJpYWwgaXMgbGljZW5zZWQgZm9yIHVzZSB1bmRlciB0aGUgRXNyaSBNYXN0ZXIgTGljZW5zZSBBZ3JlZW1lbnQgKE1MQSksIGFuZCBpcyBib3VuZCBieSB0aGUgdGVybXMgb2YgdGhhdCBhZ3JlZW1lbnQuIFlvdSBtYXkgcmVkaXN0cmlidXRlIGFuZCB1c2UgdGhpcyBjb2RlIHdpdGhvdXQgbW9kaWZpY2F0aW9uLCBwcm92aWRlZCB5b3UgYWRoZXJlIHRvIHRoZSB0ZXJtcyBvZiB0aGUgTUxBIGFuZCBpbmNsdWRlIHRoaXMgY29weXJpZ2h0IG5vdGljZS4KClNlZSB1c2UgcmVzdHJpY3Rpb25zIGF0IDxodHRwOi8vd3d3LmVzcmkuY29tL2xlZ2FsL3BkZnMvbWxhX2UyMDRfZTMwMC9lbmdsaXNoPgoKRm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24sIHJlZmVyIHRvIFtDYWxjaXRlJ3MgbGljZW5zaW5nXShodHRwczovL2RldmVsb3BlcnMuYXJjZ2lzLmNvbS9jYWxjaXRlLWRlc2lnbi1zeXN0ZW0vcmVzb3VyY2VzL2xpY2Vuc2luZykgYW5kIGNvbnRhY3Q6IEVudmlyb25tZW50YWwgU3lzdGVtcyBSZXNlYXJjaCBJbnN0aXR1dGUsIEluYy4gQXR0bjogQ29udHJhY3RzIGFuZCBMZWdhbCBTZXJ2aWNlcyBEZXBhcnRtZW50IDM4MCBOZXcgWW9yayBTdHJlZXQgUmVkbGFuZHMsIENhbGlmb3JuaWEsIFVTQSA5MjM3MyBVU0EKCmVtYWlsOiA8Y29udHJhY3RzQGVzcmkuY29tPgo=";
function W(l) {
  return Z.jsxs(Z.Fragment, {
    children: [Z.jsx(a, {
      title: "Overview/Licensing"
    }), `
`, `
`, Z.jsx(B, {
      children: b
    })]
  });
}
function n(l = {}) {
  const { wrapper: d } = {
    ...X(),
    ...l.components
  };
  return d ? Z.jsx(d, {
    ...l,
    children: Z.jsx(W, {
      ...l
    })
  }) : W();
}
export {
  n as default
};
