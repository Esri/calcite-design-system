/**
 * All functions adapted from "Simple cookie framework": https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework
 */

export function getCookie(name: string) {
  if (!name) {
    return;
  }
  return (
    JSON.parse(
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      )
    ) || null
  );
}

export function setCookie(
  name: string,
  value: any,
  end?: Date,
  path?: string,
  domain?: string,
  secure?: boolean
) {
  if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) {
    return;
  }

  var expires = "";

  if (end) {
    expires = "; expires=" + end.toUTCString();
  }

  document.cookie =
    encodeURIComponent(name) +
    "=" +
    encodeURIComponent(JSON.stringify(value)) +
    expires +
    (domain ? "; domain=" + domain : "") +
    (path ? "; path=" + path : "") +
    (secure ? "; secure" : "");

  return true;
}

export function removeCookie(name: string, path: string, domain: string) {
  if (!this.has(name)) {
    return;
  }

  document.cookie =
    encodeURIComponent(name) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
    (domain ? "; domain=" + domain : "") +
    (path ? "; path=" + path : "");
}

export function hasCookie(name: string) {
  if (!name) {
    return;
  }
  return new RegExp(
    "(?:^|;\\s*)" +
      encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") +
      "\\s*\\="
  ).test(document.cookie);
}

export function getAllCookieNames() {
  var aKeys = document.cookie
    .replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "")
    .split(/\s*(?:=[^;]*)?;\s*/);

  for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
  }

  return aKeys;
}
